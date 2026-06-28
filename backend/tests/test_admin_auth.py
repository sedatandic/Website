"""Backend regression tests for new admin/auth/honeypot/resume features.

Covers:
  * /api/auth/login (success, wrong password)
  * /api/auth/me  (Bearer required, returns admin)
  * /api/admin/* auth gating (401 no token)
  * Admin CRUD on insights/jobs/partners/memberships (create -> list -> update -> delete)
  * Date round-trip on insights
  * Honeypot on /api/contact (filled => silently dropped, empty => stored)
  * Resume upload e2e (apply -> list applications -> download resume)
"""
import io
import os
import time
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://grain-trade-preview.preview.emergentagent.com").rstrip("/")
ADMIN_EMAIL = "admin@peninsulaagritrade.com"
ADMIN_PASSWORD = "Peninsula@2026"

# A tiny but valid PDF byte sequence so the server accepts the upload
MINIMAL_PDF = (
    b"%PDF-1.4\n1 0 obj<<>>endobj\n"
    b"trailer<<>>\n%%EOF\n"
)


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    return s


@pytest.fixture(scope="module")
def admin_token(session):
    r = session.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
        timeout=20,
    )
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    body = r.json()
    assert "token" in body and isinstance(body["token"], str) and len(body["token"]) > 20
    assert body["user"]["email"].lower() == ADMIN_EMAIL.lower()
    assert body["user"]["role"] == "admin"
    return body["token"]


@pytest.fixture(scope="module")
def auth_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}"}


# ---------- AUTH ----------
class TestAuth:
    def test_login_wrong_password(self, session):
        r = session.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": "wrong-bad-pass"},
            timeout=15,
        )
        assert r.status_code == 401
        assert "token" not in r.json()

    def test_me_requires_bearer(self, session):
        r = session.get(f"{BASE_URL}/api/auth/me", timeout=15)
        assert r.status_code == 401

    def test_me_with_token(self, session, auth_headers):
        r = session.get(f"{BASE_URL}/api/auth/me", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        body = r.json()
        assert body["email"].lower() == ADMIN_EMAIL.lower()
        assert body["role"] == "admin"
        assert "_id" not in body


# ---------- ADMIN AUTH GATING ----------
class TestAdminGating:
    @pytest.mark.parametrize("path", [
        "/api/admin/insights",
        "/api/admin/jobs",
        "/api/admin/partners",
        "/api/admin/memberships",
        "/api/admin/inbox/contacts",
        "/api/admin/inbox/inquiries",
        "/api/admin/inbox/applications",
    ])
    def test_admin_endpoints_require_auth(self, session, path):
        r = session.get(f"{BASE_URL}{path}", timeout=15)
        assert r.status_code == 401, f"{path} returned {r.status_code}"

    def test_admin_invalid_token(self, session):
        r = session.get(
            f"{BASE_URL}/api/admin/insights",
            headers={"Authorization": "Bearer not-a-real-token"},
            timeout=15,
        )
        assert r.status_code == 401


# ---------- ADMIN CRUD ----------
class TestAdminCRUDInsights:
    def test_create_list_update_delete_insight(self, session, auth_headers):
        payload = {
            "title": "TEST_Insight",
            "slug": f"test-insight-{uuid.uuid4().hex[:8]}",
            "category": "Market",
            "excerpt": "TEST excerpt",
            "content": "Full TEST content body",
            "read_time": "3 min",
            "date": "2026-01-15",
            "image": "https://example.com/img.jpg",
        }
        # CREATE
        c = session.post(f"{BASE_URL}/api/admin/insights", json=payload, headers=auth_headers, timeout=20)
        assert c.status_code == 200, c.text
        created = c.json()
        assert created["title"] == payload["title"]
        assert created["slug"] == payload["slug"]
        item_id = created["id"]
        # date field should round-trip (ISO string back)
        assert "date" in created and "2026-01-15" in created["date"]

        # LIST contains it
        lr = session.get(f"{BASE_URL}/api/admin/insights", headers=auth_headers, timeout=20)
        assert lr.status_code == 200
        ids = [d["id"] for d in lr.json()]
        assert item_id in ids

        # UPDATE
        upd = {"title": "TEST_Insight_Updated", "excerpt": "Updated excerpt"}
        u = session.put(f"{BASE_URL}/api/admin/insights/{item_id}", json=upd, headers=auth_headers, timeout=20)
        assert u.status_code == 200
        updated = u.json()
        assert updated["title"] == "TEST_Insight_Updated"
        assert updated["excerpt"] == "Updated excerpt"

        # Public endpoint reflects (by slug)
        pub = session.get(f"{BASE_URL}/api/insights/{payload['slug']}", timeout=15)
        assert pub.status_code == 200
        assert pub.json()["title"] == "TEST_Insight_Updated"

        # DELETE
        d = session.delete(f"{BASE_URL}/api/admin/insights/{item_id}", headers=auth_headers, timeout=20)
        assert d.status_code == 200
        # Verify deletion
        pub2 = session.get(f"{BASE_URL}/api/insights/{payload['slug']}", timeout=15)
        assert pub2.status_code == 404


class TestAdminCRUDJobs:
    def test_create_update_delete_job(self, session, auth_headers):
        slug = f"test-job-{uuid.uuid4().hex[:8]}"
        payload = {
            "title": "TEST_Job",
            "slug": slug,
            "department": "Trading",
            "location": "Doha, Qatar",
            "type": "Full-time",
            "summary": "TEST summary",
            "requirements": ["Req 1", "Req 2", "Req 3"],
            "posted_at": "2026-01-10",
        }
        c = session.post(f"{BASE_URL}/api/admin/jobs", json=payload, headers=auth_headers, timeout=20)
        assert c.status_code == 200, c.text
        job = c.json()
        item_id = job["id"]
        assert isinstance(job.get("requirements"), list)
        assert job["requirements"] == ["Req 1", "Req 2", "Req 3"]

        # Update
        u = session.put(
            f"{BASE_URL}/api/admin/jobs/{item_id}",
            json={"title": "TEST_Job_Updated"},
            headers=auth_headers,
            timeout=20,
        )
        assert u.status_code == 200
        assert u.json()["title"] == "TEST_Job_Updated"

        # Delete
        d = session.delete(f"{BASE_URL}/api/admin/jobs/{item_id}", headers=auth_headers, timeout=20)
        assert d.status_code == 200


class TestAdminCRUDPartnersMemberships:
    @pytest.mark.parametrize("coll", ["partners", "memberships"])
    def test_create_update_delete(self, session, auth_headers, coll):
        payload = {"name": f"TEST_{coll}_{uuid.uuid4().hex[:6]}", "logo": "https://example.com/x.png"}
        c = session.post(f"{BASE_URL}/api/admin/{coll}", json=payload, headers=auth_headers, timeout=20)
        assert c.status_code == 200, c.text
        item = c.json()
        item_id = item["id"]
        assert item["name"] == payload["name"]

        u = session.put(
            f"{BASE_URL}/api/admin/{coll}/{item_id}",
            json={"name": payload["name"] + "_UPD"},
            headers=auth_headers,
            timeout=20,
        )
        assert u.status_code == 200
        assert u.json()["name"].endswith("_UPD")

        d = session.delete(f"{BASE_URL}/api/admin/{coll}/{item_id}", headers=auth_headers, timeout=20)
        assert d.status_code == 200


class TestAdminUnknownCollection:
    def test_unknown_coll_404(self, session, auth_headers):
        r = session.get(f"{BASE_URL}/api/admin/widgets", headers=auth_headers, timeout=15)
        assert r.status_code == 404


# ---------- HONEYPOT (silent drop) ----------
class TestHoneypot:
    def test_contact_honeypot_silent_drop(self, session, auth_headers):
        # Snapshot existing contacts count
        before_resp = session.get(f"{BASE_URL}/api/admin/inbox/contacts", headers=auth_headers, timeout=20)
        assert before_resp.status_code == 200
        before_count = len(before_resp.json())

        marker = f"HONEYPOT_TEST_{uuid.uuid4().hex[:8]}"
        payload = {
            "name": "TEST_Spam",
            "email": "spam@example.com",
            "message": marker,
            "website": "http://spam.example.com",  # honeypot tripped
        }
        r = session.post(f"{BASE_URL}/api/contact", json=payload, timeout=15)
        assert r.status_code == 200
        assert r.json().get("success") is True
        # important: no id returned for honeypot-dropped submission
        assert "id" not in r.json()

        # Verify NOT stored in inbox
        after_resp = session.get(f"{BASE_URL}/api/admin/inbox/contacts", headers=auth_headers, timeout=20)
        assert after_resp.status_code == 200
        after = after_resp.json()
        assert len(after) == before_count
        assert not any(c.get("message") == marker for c in after)


# ---------- RESUME UPLOAD E2E ----------
class TestResumeE2E:
    def test_apply_with_resume_and_download(self, session, auth_headers):
        # Pick an existing job
        jobs_r = session.get(f"{BASE_URL}/api/jobs", timeout=15)
        assert jobs_r.status_code == 200
        jobs = jobs_r.json()
        assert len(jobs) > 0
        job = jobs[0]
        job_slug = job.get("slug") or job.get("id")

        marker_name = f"TEST_Applicant_{uuid.uuid4().hex[:8]}"
        files = {
            "resume": ("test_resume.pdf", io.BytesIO(MINIMAL_PDF), "application/pdf"),
        }
        data = {
            "job_id": job_slug,
            "name": marker_name,
            "email": "applicant@example.com",
            "phone": "+97400000000",
            "cover_letter": "TEST cover",
            "website": "",  # honeypot empty
        }
        r = requests.post(f"{BASE_URL}/api/jobs/apply", data=data, files=files, timeout=60)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body.get("success") is True
        assert "id" in body
        app_id = body["id"]

        # Should appear in admin applications inbox
        apps_r = session.get(f"{BASE_URL}/api/admin/inbox/applications", headers=auth_headers, timeout=20)
        assert apps_r.status_code == 200
        apps = apps_r.json()
        mine = [a for a in apps if a.get("id") == app_id]
        assert len(mine) == 1
        assert mine[0]["name"] == marker_name
        assert mine[0]["has_resume"] is True

        # Download resume
        dl = session.get(
            f"{BASE_URL}/api/admin/applications/{app_id}/resume",
            headers=auth_headers,
            timeout=30,
        )
        assert dl.status_code == 200
        assert "application/pdf" in dl.headers.get("content-type", "")
        assert dl.content.startswith(b"%PDF")

    def test_apply_honeypot_blocks_storage(self, session, auth_headers):
        before = session.get(f"{BASE_URL}/api/admin/inbox/applications", headers=auth_headers, timeout=20)
        before_count = len(before.json())

        marker = f"HONEYPOT_APP_{uuid.uuid4().hex[:8]}"
        data = {
            "job_id": "any-slug",
            "name": marker,
            "email": "spam@example.com",
            "website": "spammy",  # honeypot tripped
        }
        r = requests.post(f"{BASE_URL}/api/jobs/apply", data=data, timeout=30)
        assert r.status_code == 200
        assert r.json().get("success") is True
        # should not be persisted
        after = session.get(f"{BASE_URL}/api/admin/inbox/applications", headers=auth_headers, timeout=20)
        assert len(after.json()) == before_count
        assert not any(a.get("name") == marker for a in after.json())

    def test_apply_invalid_extension(self):
        files = {"resume": ("bad.exe", io.BytesIO(b"MZ\x00\x00"), "application/octet-stream")}
        data = {"job_id": "anything", "name": "TEST_X", "email": "x@example.com", "website": ""}
        r = requests.post(f"{BASE_URL}/api/jobs/apply", data=data, files=files, timeout=30)
        assert r.status_code == 422
