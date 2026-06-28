# Test Credentials — Peninsula Agritrade LLC

## Admin Panel (JWT auth)
- URL: `<frontend>/admin/login`
- Email: `admin@peninsulaagritrade.com`
- Password: `Peninsula@2026`
- Role: admin

Seeded automatically on backend startup from `backend/.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`).
Token returned by `POST /api/auth/login` is stored in localStorage key `pa_admin_token` and sent as `Authorization: Bearer <token>`.

## Auth Endpoints
- POST `/api/auth/login` { email, password } → { token, user }
- GET  `/api/auth/me` (Bearer) → admin user

## Admin Endpoints (Bearer required)
- GET/POST `/api/admin/{insights|jobs|partners|memberships}`
- PUT/DELETE `/api/admin/{coll}/{id}`
- GET `/api/admin/inbox/{contacts|inquiries|applications}`
- GET `/api/admin/applications/{id}/resume` (downloads resume from object storage)

## Notes
- Public site has no auth.
- Spam protection: honeypot field `website` on contact/inquiry/apply forms + per-IP rate limit (8 req / 10 min).
- Resume uploads stored via Emergent object storage; metadata in `job_applications` collection.
