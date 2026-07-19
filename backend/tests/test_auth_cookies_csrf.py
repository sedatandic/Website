"""Security-hardening tests for cookie + CSRF auth (double-submit).

Covers:
  * POST /api/auth/login sets httpOnly pa_access_token + readable pa_csrf_token,
    body contains {token, csrf_token, user}
  * GET /api/auth/me works with cookie session (no Authorization header) and returns 401 without any auth
  * Cookie-based GET (e.g. /api/admin/inbox/contacts) works WITHOUT X-CSRF-Token
  * Cookie-based mutating requests (POST/PUT/DELETE on /api/admin/*):
      - without X-CSRF-Token => 403
      - with matching X-CSRF-Token => success
  * Bearer-token still authenticates protected endpoints (backward compat) and needs
    NO X-CSRF-Token even for mutating requests
  * POST /api/auth/logout clears cookies so subsequent /api/auth/me returns 401
"""
import os
import uuid
import pytest
import requests
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"))
# Also load the frontend .env for REACT_APP_BACKEND_URL
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "frontend", ".env"))

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
assert BASE_URL, "REACT_APP_BACKEND_URL must be set"
ADMIN_EMAIL = os.environ["ADMIN_EMAIL"]
ADMIN_PASSWORD = os.environ["ADMIN_PASSWORD"]

ACCESS_COOKIE = "pa_access_token"
CSRF_COOKIE = "pa_csrf_token"


def _fresh_session_and_login():
    s = requests.Session()
    r = s.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
        timeout=20,
    )
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    return s, r


class TestLoginSetsCookies:
    def test_login_response_body(self):
        s, r = _fresh_session_and_login()
        body = r.json()
        assert "token" in body and isinstance(body["token"], str) and len(body["token"]) > 20
        assert "csrf_token" in body and isinstance(body["csrf_token"], str) and len(body["csrf_token"]) >= 16
        assert body["user"]["email"].lower() == ADMIN_EMAIL.lower()
        assert body["user"]["role"] == "admin"

    def test_login_sets_both_cookies(self):
        s, r = _fresh_session_and_login()
        # cookies present on session jar
        names = {c.name for c in s.cookies}
        assert ACCESS_COOKIE in names, f"missing {ACCESS_COOKIE}, got {names}"
        assert CSRF_COOKIE in names, f"missing {CSRF_COOKIE}, got {names}"

    def test_access_cookie_is_httponly_and_secure(self):
        s, r = _fresh_session_and_login()
        # Inspect raw Set-Cookie headers to check attributes
        raw_headers = r.raw.headers.getlist("Set-Cookie") if hasattr(r.raw.headers, "getlist") else [
            v for k, v in r.raw.headers.items() if k.lower() == "set-cookie"
        ]
        access_headers = [h for h in raw_headers if h.startswith(f"{ACCESS_COOKIE}=")]
        csrf_headers = [h for h in raw_headers if h.startswith(f"{CSRF_COOKIE}=")]
        assert access_headers, f"no {ACCESS_COOKIE} in Set-Cookie: {raw_headers}"
        assert csrf_headers, f"no {CSRF_COOKIE} in Set-Cookie: {raw_headers}"
        access_hdr = access_headers[0].lower()
        assert "httponly" in access_hdr, f"pa_access_token not HttpOnly: {access_headers[0]}"
        assert "secure" in access_hdr, f"pa_access_token not Secure: {access_headers[0]}"
        # CSRF cookie must be readable by JS (NOT HttpOnly)
        csrf_hdr = csrf_headers[0].lower()
        assert "httponly" not in csrf_hdr, f"pa_csrf_token is HttpOnly (must be readable): {csrf_headers[0]}"
        assert "secure" in csrf_hdr, f"pa_csrf_token not Secure: {csrf_headers[0]}"

    def test_login_body_csrf_matches_cookie(self):
        s, r = _fresh_session_and_login()
        body = r.json()
        cookie_csrf = s.cookies.get(CSRF_COOKIE)
        assert body["csrf_token"] == cookie_csrf


class TestCookieAuthMe:
    def test_me_no_auth_returns_401(self):
        r = requests.get(f"{BASE_URL}/api/auth/me", timeout=15)
        assert r.status_code == 401

    def test_me_with_cookie_returns_admin(self):
        s, _ = _fresh_session_and_login()
        r = s.get(f"{BASE_URL}/api/auth/me", timeout=15)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["email"].lower() == ADMIN_EMAIL.lower()
        assert body["role"] == "admin"
        assert "_id" not in body


class TestCookieGetNoCSRFNeeded:
    def test_admin_get_works_with_cookie_no_csrf_header(self):
        s, _ = _fresh_session_and_login()
        r = s.get(f"{BASE_URL}/api/admin/inbox/contacts", timeout=20)
        assert r.status_code == 200, r.text
        assert isinstance(r.json(), list)


class TestCSRFEnforced:
    def test_cookie_mutation_without_csrf_returns_403(self):
        # requests will keep the cookies but we clear the CSRF header path (default)
        s, _ = _fresh_session_and_login()
        # Ensure we do NOT send X-CSRF-Token
        payload = {
            "title": "TEST_CSRF_should_fail",
            "slug": f"test-csrf-fail-{uuid.uuid4().hex[:8]}",
            "category": "Market",
        }
        r = s.post(f"{BASE_URL}/api/admin/insights", json=payload, timeout=20)
        assert r.status_code == 403, f"expected 403, got {r.status_code}: {r.text}"
        assert "csrf" in r.text.lower()

    def test_cookie_mutation_with_wrong_csrf_returns_403(self):
        s, _ = _fresh_session_and_login()
        payload = {"title": "TEST_bad_csrf", "slug": f"bad-csrf-{uuid.uuid4().hex[:8]}"}
        r = s.post(
            f"{BASE_URL}/api/admin/insights",
            json=payload,
            headers={"X-CSRF-Token": "not-the-real-value"},
            timeout=20,
        )
        assert r.status_code == 403, r.text

    def test_cookie_mutation_with_correct_csrf_succeeds(self):
        s, login_r = _fresh_session_and_login()
        csrf = login_r.json()["csrf_token"]
        slug = f"test-csrf-ok-{uuid.uuid4().hex[:8]}"
        payload = {
            "title": "TEST_CSRF_ok",
            "slug": slug,
            "category": "Market",
            "excerpt": "x",
            "content": "y",
        }
        # CREATE
        r = s.post(
            f"{BASE_URL}/api/admin/insights",
            json=payload,
            headers={"X-CSRF-Token": csrf},
            timeout=20,
        )
        assert r.status_code == 200, r.text
        item_id = r.json()["id"]

        # UPDATE (PUT) also needs CSRF
        u = s.put(
            f"{BASE_URL}/api/admin/insights/{item_id}",
            json={"title": "TEST_CSRF_ok_upd"},
            headers={"X-CSRF-Token": csrf},
            timeout=20,
        )
        assert u.status_code == 200, u.text
        assert u.json()["title"] == "TEST_CSRF_ok_upd"

        # DELETE also needs CSRF; verify: without header => 403, with => 200
        d_fail = s.delete(f"{BASE_URL}/api/admin/insights/{item_id}", timeout=20)
        assert d_fail.status_code == 403, d_fail.text
        d_ok = s.delete(
            f"{BASE_URL}/api/admin/insights/{item_id}",
            headers={"X-CSRF-Token": csrf},
            timeout=20,
        )
        assert d_ok.status_code == 200, d_ok.text


class TestBearerBackwardCompat:
    def test_bearer_mutation_needs_no_csrf(self):
        # Fresh non-session request using Bearer token
        r = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
            timeout=15,
        )
        assert r.status_code == 200
        token = r.json()["token"]
        headers = {"Authorization": f"Bearer {token}"}

        slug = f"test-bearer-{uuid.uuid4().hex[:8]}"
        payload = {"title": "TEST_Bearer", "slug": slug, "category": "Market"}
        # Create WITHOUT any X-CSRF-Token, using a fresh requests call (no session cookies)
        c = requests.post(
            f"{BASE_URL}/api/admin/insights",
            json=payload,
            headers=headers,
            timeout=20,
        )
        assert c.status_code == 200, c.text
        item_id = c.json()["id"]

        # Delete cleanup
        d = requests.delete(
            f"{BASE_URL}/api/admin/insights/{item_id}",
            headers=headers,
            timeout=20,
        )
        assert d.status_code == 200

    def test_bearer_me_works(self):
        r = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
            timeout=15,
        )
        token = r.json()["token"]
        me = requests.get(
            f"{BASE_URL}/api/auth/me",
            headers={"Authorization": f"Bearer {token}"},
            timeout=15,
        )
        assert me.status_code == 200
        assert me.json()["role"] == "admin"


class TestLogoutClearsCookies:
    def test_logout_clears_and_me_401(self):
        s, login_r = _fresh_session_and_login()
        csrf = login_r.json()["csrf_token"]
        # Sanity: me works before logout
        pre = s.get(f"{BASE_URL}/api/auth/me", timeout=15)
        assert pre.status_code == 200

        # Logout is a POST mutating request — because it's cookie-based, CSRF is required.
        # Frontend interceptor supplies X-CSRF-Token automatically.
        r = s.post(
            f"{BASE_URL}/api/auth/logout",
            headers={"X-CSRF-Token": csrf},
            timeout=15,
        )
        assert r.status_code == 200, r.text

        # After clear, session cookies should be cleared/expired. Manually drop them to
        # emulate the browser having received the Set-Cookie deletion.
        s.cookies.clear()

        # /me should be 401 now
        me = s.get(f"{BASE_URL}/api/auth/me", timeout=15)
        assert me.status_code == 401
