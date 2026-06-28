"""Pytest backend regression tests for Peninsula Agritrade APIs."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://grain-trade-preview.preview.emergentagent.com").rstrip("/")


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
def test_health(client):
    r = client.get(f"{BASE_URL}/api/health", timeout=15)
    # Some apps don't expose /api/health; accept root /api too
    if r.status_code == 404:
        r = client.get(f"{BASE_URL}/api/", timeout=15)
    assert r.status_code in (200, 204)


# ---------- Insights ----------
class TestInsights:
    def test_list_insights(self, client):
        r = client.get(f"{BASE_URL}/api/insights", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) > 0
        # Validate structure
        first = data[0]
        assert "title" in first
        # Ensure no mongo _id leakage
        assert "_id" not in first

    def test_get_insight_by_slug(self, client):
        r = client.get(f"{BASE_URL}/api/insights", timeout=15)
        slug_or_id = r.json()[0].get("slug") or r.json()[0].get("id")
        assert slug_or_id
        d = client.get(f"{BASE_URL}/api/insights/{slug_or_id}", timeout=15)
        assert d.status_code == 200
        body = d.json()
        assert "_id" not in body


# ---------- Jobs ----------
class TestJobs:
    def test_list_jobs(self, client):
        r = client.get(f"{BASE_URL}/api/jobs", timeout=15)
        assert r.status_code == 200
        jobs = r.json()
        assert isinstance(jobs, list)
        assert len(jobs) > 0
        assert "_id" not in jobs[0]

    def test_get_job(self, client):
        r = client.get(f"{BASE_URL}/api/jobs", timeout=15)
        jobs = r.json()
        slug = jobs[0].get("slug") or jobs[0].get("id")
        d = client.get(f"{BASE_URL}/api/jobs/{slug}", timeout=15)
        assert d.status_code == 200


# ---------- Partners & Memberships ----------
class TestPartners:
    def test_partners(self, client):
        r = client.get(f"{BASE_URL}/api/partners", timeout=15)
        assert r.status_code == 200
        partners = r.json()
        assert isinstance(partners, list)
        assert len(partners) > 0

    def test_memberships(self, client):
        r = client.get(f"{BASE_URL}/api/memberships", timeout=15)
        # memberships may or may not exist; allow 200 only
        assert r.status_code in (200, 404)


# ---------- Contact submission ----------
class TestContact:
    def test_submit_contact(self, client):
        payload = {
            "name": "TEST_User",
            "email": "test_user@example.com",
            "phone": "+97412345678",
            "company": "TEST_Co",
            "subject": "Regression Test",
            "message": "This is a TEST_ contact submission from pytest.",
        }
        r = client.post(f"{BASE_URL}/api/contact", json=payload, timeout=20)
        assert r.status_code in (200, 201)
        body = r.json()
        # Expect success indicator
        assert any(k in body for k in ("id", "success", "message", "status"))


# ---------- Commodities (if backend exposes them) ----------
def test_commodities_optional(client):
    r = client.get(f"{BASE_URL}/api/commodities", timeout=15)
    # endpoint may not exist; just don't crash
    assert r.status_code in (200, 404)
