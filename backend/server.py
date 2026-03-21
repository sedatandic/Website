import os
import datetime
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from pymongo import MongoClient
from bson import ObjectId

from seed_data import seed_database
from pdf_generator import generate_company_profile

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "globalagri_db")

client = MongoClient(MONGO_URL)
db = client[DB_NAME]

def serialize_doc(doc):
    if doc is None:
        return None
    doc["id"] = str(doc.pop("_id"))
    for key, value in doc.items():
        if isinstance(value, datetime.datetime):
            doc[key] = value.isoformat()
        elif isinstance(value, ObjectId):
            doc[key] = str(value)
    return doc

@asynccontextmanager
async def lifespan(app: FastAPI):
    seed_database(db)
    pdf_path = "/app/backend/static/GlobalAgri_Company_Profile.pdf"
    if not os.path.exists(pdf_path):
        os.makedirs("/app/backend/static", exist_ok=True)
        generate_company_profile(pdf_path)
    yield
    client.close()

app = FastAPI(title="GlobalAgri Commodities API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Pydantic Models ──
class ContactSubmission(BaseModel):
    name: str = Field(..., min_length=1)
    company: str = ""
    email: EmailStr
    phone: str = ""
    country: str = ""
    product_interest: str = ""
    message: str = Field(..., min_length=1)

class JobApplication(BaseModel):
    job_id: str
    name: str = Field(..., min_length=1)
    email: EmailStr
    phone: str = ""
    linkedin: str = ""
    cover_letter: str = ""

class CareerInquiry(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    message: str = Field(..., min_length=1)

# ── Health ──
@app.get("/api/health")
async def health():
    return {"status": "ok"}

# ── Contact ──
@app.post("/api/contact")
async def submit_contact(data: ContactSubmission):
    doc = data.model_dump()
    doc["created_at"] = datetime.datetime.utcnow()
    result = db.contact_submissions.insert_one(doc)
    return {"success": True, "id": str(result.inserted_id)}

@app.get("/api/contact")
async def get_contacts():
    contacts = list(db.contact_submissions.find().sort("created_at", -1))
    return [serialize_doc(c) for c in contacts]

# ── Insights ──
@app.get("/api/insights")
async def get_insights(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    query = {}
    if category:
        query["category"] = category
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"excerpt": {"$regex": search, "$options": "i"}},
        ]
    insights = list(db.insights.find(query).sort("date", -1))
    return [serialize_doc(i) for i in insights]

@app.get("/api/insights/{insight_id}")
async def get_insight(insight_id: str):
    # Try slug first, then ObjectId
    doc = db.insights.find_one({"slug": insight_id})
    if not doc:
        try:
            doc = db.insights.find_one({"_id": ObjectId(insight_id)})
        except Exception:
            pass
    if not doc:
        raise HTTPException(status_code=404, detail="Insight not found")
    return serialize_doc(doc)

# ── Jobs ──
@app.get("/api/jobs")
async def get_jobs(
    location: Optional[str] = Query(None),
    department: Optional[str] = Query(None)
):
    query = {}
    if location:
        query["location"] = {"$regex": location, "$options": "i"}
    if department:
        query["department"] = department
    jobs = list(db.jobs.find(query).sort("posted_at", -1))
    return [serialize_doc(j) for j in jobs]

@app.get("/api/jobs/{job_id}")
async def get_job(job_id: str):
    doc = db.jobs.find_one({"slug": job_id})
    if not doc:
        try:
            doc = db.jobs.find_one({"_id": ObjectId(job_id)})
        except Exception:
            pass
    if not doc:
        raise HTTPException(status_code=404, detail="Job not found")
    return serialize_doc(doc)

@app.post("/api/jobs/apply")
async def apply_job(data: JobApplication):
    doc = data.model_dump()
    doc["created_at"] = datetime.datetime.utcnow()
    result = db.job_applications.insert_one(doc)
    return {"success": True, "id": str(result.inserted_id)}

# ── Career Inquiry ──
@app.post("/api/careers/inquiry")
async def submit_career_inquiry(data: CareerInquiry):
    doc = data.model_dump()
    doc["created_at"] = datetime.datetime.utcnow()
    result = db.career_inquiries.insert_one(doc)
    return {"success": True, "id": str(result.inserted_id)}

# ── PDF Download ──
@app.get("/api/download/profile")
async def download_profile():
    pdf_path = "/app/backend/static/GlobalAgri_Company_Profile.pdf"
    if not os.path.exists(pdf_path):
        os.makedirs("/app/backend/static", exist_ok=True)
        generate_company_profile(pdf_path)
    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="GlobalAgri_Company_Profile.pdf"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
