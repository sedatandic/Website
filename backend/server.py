import os
from dotenv import load_dotenv
load_dotenv()

import datetime
import time
import uuid
from collections import defaultdict
from contextlib import asynccontextmanager

from fastapi import (
    FastAPI, HTTPException, Query, Depends, Header, Request,
    Form, File, UploadFile, Body, Response,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from pymongo import MongoClient
from bson import ObjectId

from seed_data import seed_database
from pdf_generator import generate_company_profile
from auth import hash_password, verify_password, create_access_token, decode_token
import storage

from bson.errors import InvalidId


def parse_object_id(item_id: str) -> ObjectId:
    try:
        return ObjectId(item_id)
    except (InvalidId, TypeError):
        raise HTTPException(status_code=404, detail="Not found")

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "globalagri_db")

client = MongoClient(MONGO_URL)
db = client[DB_NAME]

ALLOWED_RESUME_EXT = {"pdf", "doc", "docx"}
MAX_RESUME_BYTES = 10 * 1024 * 1024

# ── Simple in-memory rate limiter (per IP) ──
_rate_log = defaultdict(list)
RATE_WINDOW = 600  # seconds
RATE_MAX = 8


def check_rate_limit(ip: str):
    now = time.time()
    hits = [t for t in _rate_log[ip] if now - t < RATE_WINDOW]
    if len(hits) >= RATE_MAX:
        raise HTTPException(status_code=429, detail="Too many requests. Please try again later.")
    hits.append(now)
    _rate_log[ip] = hits


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


def seed_admin():
    email = os.environ.get("ADMIN_EMAIL", "admin@example.com").lower()
    password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = db.users.find_one({"email": email})
    if existing is None:
        db.users.insert_one({
            "email": email,
            "password_hash": hash_password(password),
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.datetime.now(datetime.timezone.utc),
        })
    elif not verify_password(password, existing.get("password_hash", "")):
        db.users.update_one({"email": email}, {"$set": {"password_hash": hash_password(password)}})


@asynccontextmanager
async def lifespan(app: FastAPI):
    seed_database(db)
    seed_admin()
    db.users.create_index("email", unique=True)
    pdf_path = "/app/backend/static/GlobalAgri_Company_Profile.pdf"
    if not os.path.exists(pdf_path):
        os.makedirs("/app/backend/static", exist_ok=True)
        generate_company_profile(pdf_path)
    try:
        storage.init_storage()
    except Exception as e:
        print(f"Storage init failed: {e}")
    yield
    client.close()


app = FastAPI(title="Peninsula Agritrade API", lifespan=lifespan)

_cors_env = os.environ.get("CORS_ORIGINS", "*")
_cors_origins = ["*"] if _cors_env.strip() == "*" else [o.strip() for o in _cors_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ACCESS_COOKIE = "pa_access_token"
CSRF_COOKIE = "pa_csrf_token"
_COOKIE_MAX_AGE = 12 * 60 * 60


def _set_auth_cookies(response: Response, token: str) -> str:
    csrf = uuid.uuid4().hex
    response.set_cookie(ACCESS_COOKIE, token, httponly=True, secure=True, samesite="lax", max_age=_COOKIE_MAX_AGE, path="/")
    response.set_cookie(CSRF_COOKIE, csrf, httponly=False, secure=True, samesite="lax", max_age=_COOKIE_MAX_AGE, path="/")
    return csrf


def _clear_auth_cookies(response: Response) -> None:
    response.set_cookie(ACCESS_COOKIE, "", max_age=0, httponly=True, secure=True, samesite="lax", path="/")
    response.set_cookie(CSRF_COOKIE, "", max_age=0, httponly=False, secure=True, samesite="lax", path="/")


# ── Auth dependency ──
def get_current_admin(request: Request, authorization: str = Header(None)):
    # Explicit Bearer header takes precedence (API clients / tests) — no CSRF required.
    # Otherwise fall back to the httpOnly cookie session with CSRF double-submit.
    from_cookie = False
    token = None
    if authorization and authorization.startswith("Bearer "):
        token = authorization[7:]
    else:
        cookie_token = request.cookies.get(ACCESS_COOKIE)
        if cookie_token:
            token = cookie_token
            from_cookie = True
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    # CSRF: double-submit token check only for cookie-based, state-changing requests
    if from_cookie and request.method in ("POST", "PUT", "PATCH", "DELETE"):
        header_csrf = request.headers.get("X-CSRF-Token")
        cookie_csrf = request.cookies.get(CSRF_COOKIE)
        if not header_csrf or not cookie_csrf or header_csrf != cookie_csrf:
            raise HTTPException(status_code=403, detail="CSRF token missing or invalid")
    try:
        payload = decode_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    try:
        user = db.users.find_one({"_id": ObjectId(payload["sub"])})
    except Exception:
        user = None
    if not user or user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return serialize_doc({k: v for k, v in user.items() if k != "password_hash"})


# ── Pydantic Models ──
class ContactSubmission(BaseModel):
    name: str = Field(..., min_length=1)
    company: str = ""
    email: EmailStr
    phone: str = ""
    country: str = ""
    product_interest: str = ""
    message: str = Field(..., min_length=1)
    website: str = ""  # honeypot


class CareerInquiry(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    message: str = Field(..., min_length=1)
    website: str = ""  # honeypot


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)


# ── Health ──
@app.get("/api/health")
async def health():
    return {"status": "ok"}


# ── Auth ──
@app.post("/api/auth/login")
async def login(data: LoginRequest, response: Response):
    user = db.users.find_one({"email": data.email.lower()})
    if not user or not verify_password(data.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(str(user["_id"]), user["email"])
    csrf = _set_auth_cookies(response, token)
    return {
        "token": token,
        "csrf_token": csrf,
        "user": {"id": str(user["_id"]), "email": user["email"], "name": user.get("name", ""), "role": user.get("role", "")},
    }


@app.post("/api/auth/logout")
async def logout(response: Response):
    _clear_auth_cookies(response)
    return {"status": "ok"}


@app.get("/api/auth/me")
async def me(admin: dict = Depends(get_current_admin)):
    return admin


# ── Contact ──
@app.post("/api/contact")
async def submit_contact(data: ContactSubmission, request: Request):
    check_rate_limit(request.client.host if request.client else "unknown")
    if data.website:  # honeypot tripped — pretend success, drop silently
        return {"success": True}
    doc = data.model_dump()
    doc.pop("website", None)
    doc["created_at"] = datetime.datetime.now(datetime.timezone.utc)
    result = db.contact_submissions.insert_one(doc)
    return {"success": True, "id": str(result.inserted_id)}


# ── Insights ──
@app.get("/api/insights")
async def get_insights(category: Optional[str] = Query(None), search: Optional[str] = Query(None)):
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
async def get_jobs(location: Optional[str] = Query(None), department: Optional[str] = Query(None)):
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
async def apply_job(
    request: Request,
    job_id: str = Form(...),
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(""),
    linkedin: str = Form(""),
    cover_letter: str = Form(""),
    website: str = Form(""),  # honeypot
    resume: Optional[UploadFile] = File(None),
):
    check_rate_limit(request.client.host if request.client else "unknown")
    if website:
        return {"success": True}
    if not name.strip() or not email.strip():
        raise HTTPException(status_code=422, detail="Name and email are required")

    doc = {
        "job_id": job_id,
        "name": name,
        "email": email,
        "phone": phone,
        "linkedin": linkedin,
        "cover_letter": cover_letter,
        "created_at": datetime.datetime.now(datetime.timezone.utc),
    }

    if resume is not None and resume.filename:
        ext = resume.filename.rsplit(".", 1)[-1].lower() if "." in resume.filename else ""
        if ext not in ALLOWED_RESUME_EXT:
            raise HTTPException(status_code=422, detail="Resume must be a PDF, DOC, or DOCX file")
        data = await resume.read()
        if len(data) > MAX_RESUME_BYTES:
            raise HTTPException(status_code=422, detail="Resume must be under 10MB")
        path = f"{storage.APP_NAME}/resumes/{uuid.uuid4()}.{ext}"
        try:
            result = storage.put_object(path, data, resume.content_type or "application/octet-stream")
            doc["resume_path"] = result["path"]
            doc["resume_filename"] = resume.filename
            doc["resume_content_type"] = resume.content_type or "application/octet-stream"
        except Exception as e:
            raise HTTPException(status_code=502, detail=f"Failed to store resume: {e}")

    result = db.job_applications.insert_one(doc)
    return {"success": True, "id": str(result.inserted_id)}


# ── Career Inquiry ──
@app.post("/api/careers/inquiry")
async def submit_career_inquiry(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...),
    website: str = Form(""),  # honeypot
    resume: Optional[UploadFile] = File(None),
):
    check_rate_limit(request.client.host if request.client else "unknown")
    if website:
        return {"success": True}
    if not name.strip() or not email.strip() or not message.strip():
        raise HTTPException(status_code=422, detail="Name, email and message are required")

    doc = {
        "name": name,
        "email": email,
        "message": message,
        "created_at": datetime.datetime.now(datetime.timezone.utc),
    }

    if resume is not None and resume.filename:
        ext = resume.filename.rsplit(".", 1)[-1].lower() if "." in resume.filename else ""
        if ext not in ALLOWED_RESUME_EXT:
            raise HTTPException(status_code=422, detail="Resume must be a PDF, DOC, or DOCX file")
        data = await resume.read()
        if len(data) > MAX_RESUME_BYTES:
            raise HTTPException(status_code=422, detail="Resume must be under 10MB")
        path = f"{storage.APP_NAME}/resumes/{uuid.uuid4()}.{ext}"
        try:
            result = storage.put_object(path, data, resume.content_type or "application/octet-stream")
            doc["resume_path"] = result["path"]
            doc["resume_filename"] = resume.filename
            doc["resume_content_type"] = resume.content_type or "application/octet-stream"
        except Exception as e:
            raise HTTPException(status_code=502, detail=f"Failed to store resume: {e}")

    result = db.career_inquiries.insert_one(doc)
    return {"success": True, "id": str(result.inserted_id)}


# ── PDF Download ──
@app.get("/api/download/profile")
async def download_profile():
    pdf_path = "/app/backend/static/GlobalAgri_Company_Profile.pdf"
    if not os.path.exists(pdf_path):
        os.makedirs("/app/backend/static", exist_ok=True)
        generate_company_profile(pdf_path)
    return FileResponse(pdf_path, media_type="application/pdf", filename="Peninsula_Agritrade_Company_Profile.pdf")


# ── Partners / Memberships ──
@app.get("/api/partners")
async def get_partners():
    return [serialize_doc(p) for p in db.partners.find()]


@app.get("/api/memberships")
async def get_memberships():
    return [serialize_doc(m) for m in db.memberships.find()]


# ══════════════════════════════════════════════════════════════
#  ADMIN PANEL — protected content management
# ══════════════════════════════════════════════════════════════
CONTENT_COLLECTIONS = {
    "insights": db.insights,
    "jobs": db.jobs,
    "partners": db.partners,
    "memberships": db.memberships,
}
DATE_FIELDS = {"insights": "date", "jobs": "posted_at"}
SORT_FIELDS = {"insights": "date", "jobs": "posted_at"}


def _coerce_dates(coll: str, body: dict):
    field = DATE_FIELDS.get(coll)
    if field and body.get(field) and isinstance(body[field], str):
        try:
            body[field] = datetime.datetime.fromisoformat(body[field].replace("Z", "+00:00"))
        except ValueError:
            try:
                body[field] = datetime.datetime.strptime(body[field], "%Y-%m-%d")
            except ValueError:
                pass
    return body


@app.get("/api/admin/{coll}")
async def admin_list(coll: str, admin: dict = Depends(get_current_admin)):
    if coll not in CONTENT_COLLECTIONS:
        raise HTTPException(status_code=404, detail="Unknown collection")
    sort_field = SORT_FIELDS.get(coll)
    cursor = CONTENT_COLLECTIONS[coll].find()
    if sort_field:
        cursor = cursor.sort(sort_field, -1)
    return [serialize_doc(d) for d in cursor]


@app.post("/api/admin/{coll}")
async def admin_create(coll: str, body: dict = Body(...), admin: dict = Depends(get_current_admin)):
    if coll not in CONTENT_COLLECTIONS:
        raise HTTPException(status_code=404, detail="Unknown collection")
    body.pop("id", None)
    body.pop("_id", None)
    body = _coerce_dates(coll, body)
    result = CONTENT_COLLECTIONS[coll].insert_one(body)
    return serialize_doc(CONTENT_COLLECTIONS[coll].find_one({"_id": result.inserted_id}))


@app.put("/api/admin/{coll}/{item_id}")
async def admin_update(coll: str, item_id: str, body: dict = Body(...), admin: dict = Depends(get_current_admin)):
    if coll not in CONTENT_COLLECTIONS:
        raise HTTPException(status_code=404, detail="Unknown collection")
    body.pop("id", None)
    body.pop("_id", None)
    body = _coerce_dates(coll, body)
    CONTENT_COLLECTIONS[coll].update_one({"_id": ObjectId(item_id)}, {"$set": body})
    doc = CONTENT_COLLECTIONS[coll].find_one({"_id": ObjectId(item_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Item not found")
    return serialize_doc(doc)


@app.delete("/api/admin/{coll}/{item_id}")
async def admin_delete(coll: str, item_id: str, admin: dict = Depends(get_current_admin)):
    if coll not in CONTENT_COLLECTIONS:
        raise HTTPException(status_code=404, detail="Unknown collection")
    CONTENT_COLLECTIONS[coll].delete_one({"_id": ObjectId(item_id)})
    return {"success": True}


@app.get("/api/admin/inbox/contacts")
async def admin_contacts(admin: dict = Depends(get_current_admin)):
    return [serialize_doc(c) for c in db.contact_submissions.find().sort("created_at", -1)]


@app.get("/api/admin/inbox/inquiries")
async def admin_inquiries(admin: dict = Depends(get_current_admin)):
    out = []
    for c in db.career_inquiries.find().sort("created_at", -1):
        c = serialize_doc(c)
        c["has_resume"] = bool(c.get("resume_path"))
        out.append(c)
    return out


@app.get("/api/admin/inquiries/{item_id}/resume")
async def admin_download_inquiry_resume(item_id: str, admin: dict = Depends(get_current_admin)):
    rec = db.career_inquiries.find_one({"_id": parse_object_id(item_id)})
    if not rec or not rec.get("resume_path"):
        raise HTTPException(status_code=404, detail="Resume not found")
    data = None
    content_type = None
    try:
        data, content_type = storage.get_object(rec["resume_path"])
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to fetch resume: {e}")
    filename = rec.get("resume_filename", "resume")
    return Response(
        content=data,
        media_type=rec.get("resume_content_type", content_type),
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@app.get("/api/admin/inbox/applications")
async def admin_applications(admin: dict = Depends(get_current_admin)):
    apps = list(db.job_applications.find().sort("created_at", -1))
    out = []
    for a in apps:
        a = serialize_doc(a)
        a["has_resume"] = bool(a.get("resume_path"))
        out.append(a)
    return out


@app.get("/api/admin/applications/{item_id}/resume")
async def admin_download_resume(item_id: str, admin: dict = Depends(get_current_admin)):
    rec = db.job_applications.find_one({"_id": parse_object_id(item_id)})
    if not rec or not rec.get("resume_path"):
        raise HTTPException(status_code=404, detail="Resume not found")
    data = None
    content_type = None
    try:
        data, content_type = storage.get_object(rec["resume_path"])
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to fetch resume: {e}")
    filename = rec.get("resume_filename", "resume")
    return Response(
        content=data,
        media_type=rec.get("resume_content_type", content_type),
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
