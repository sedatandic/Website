# Peninsula Agritrade LLC — Corporate Website

## Original Problem Statement
Refine a professional, multi-page corporate website for "Peninsula Agritrade LLC" (Qatar-based agri-commodity trading house). Goal: "simpler but elegant." Built with React + FastAPI + MongoDB.

## Theme
- **Brand color: Qatar Maroon `#8A1538`** (darker `#6E0F2A`). Light theme site-wide (white header, light footer, maroon CTA/accents). Logo recolored to maroon (purple backup at `public/logo_purple_backup.png`).

## Architecture
```
/app
├── backend/
│   ├── server.py        # FastAPI app: public APIs + auth + admin CRUD + resume upload
│   ├── auth.py          # bcrypt hashing + JWT (Bearer) helpers
│   ├── storage.py       # Emergent object storage helpers (init/put/get)
│   ├── seed_data.py     # seeds insights/jobs/partners/memberships
│   ├── pdf_generator.py
│   └── tests/           # test_api.py (9), test_admin_auth.py (20)
└── frontend/
    ├── public/  logo.png (maroon), og-banner.png (1200x630 share image), index.html (SEO+OG)
    └── src/
        ├── App.js                 # Layout splits public vs /admin (no marketing chrome on admin)
        ├── context/AuthContext.jsx
        ├── components/  Header.jsx, Footer.jsx, ProtectedRoute.jsx, PageTitle.jsx
        ├── lib/api.js             # axios + Bearer interceptor
        └── pages/
            ├── (public pages)
            └── admin/ AdminLoginPage.jsx, AdminDashboard.jsx
```

## Auth / Admin
- JWT Bearer (token in localStorage `pa_admin_token`). Admin seeded from `backend/.env` (`ADMIN_EMAIL`/`ADMIN_PASSWORD`).
- Admin: `admin@peninsulaagritrade.com` / `Peninsula@2026` (see `/app/memory/test_credentials.md`).
- Admin panel: CRUD for Insights/Jobs/Partners/Memberships + read-only inboxes (Contacts, Career Inquiries, Job Applications with resume download).

## Key API Endpoints
- Public: GET `/api/insights`, `/api/jobs`, `/api/partners`, `/api/memberships`; POST `/api/contact`, `/api/careers/inquiry`, `/api/jobs/apply` (multipart, optional resume)
- Auth: POST `/api/auth/login`, GET `/api/auth/me`
- Admin (Bearer): GET/POST `/api/admin/{coll}`, PUT/DELETE `/api/admin/{coll}/{id}`, GET `/api/admin/inbox/{contacts|inquiries|applications}`, GET `/api/admin/applications/{id}/resume`

## Completed (2026-06-28)
- Hero carousel text-wrap fixes (Slides 1/2/3); removed "Latest Insights" homepage section.
- Full purple→Qatar maroon migration + dark→light theme; logo recolor.
- Code-quality pass: stable React keys (HomePage/AboutPage/CommoditiesPage).
- SEO: branded per-route titles (PageTitle), meta description/keywords/robots, Open Graph + Twitter tags, favicon, 1200x630 OG banner.
- **Spam protection**: honeypot `website` field on contact/inquiry/apply + per-IP rate limit (8/10min).
- **Admin panel**: JWT auth, full content CRUD, submissions inboxes.
- **Resume upload**: PDF/DOC/DOCX ≤10MB on job applications via Emergent object storage; admin download.
- Verified: testing_agent iteration_10 — backend 29/29, frontend 100%.

## Completed (2026-07-17)
- **Partners page — all 20 real logos + stat line**: self-hosted every partner logo in `frontend/public/partners/` (incl. QNB, CQUR, QDB, QFC, Qatar Chamber supplied by user) and wired into the `/partners` marquee. Added maroon "Trusted by 20+ banking, inspection & logistics partners across 3 continents" stat line above the wall. Verified 0 broken images.
- Global Presence tab, Mercator-calibrated `AnimatedOfficeMap`, header typography upscale — all confirmed live.

## Backlog (P1/P2)
- (Optional) Tighten CORS origins for production (currently `*`).
- Rate limiter is in-memory/single-process — move to MongoDB/Redis if scaled to multiple workers.
- Email notifications for new contact/application submissions (e.g., Resend/SendGrid).
- Richer admin: pagination/search on inboxes, image upload for insights/partner logos.

## Notes
- Backend uses **synchronous pymongo** (no Motor/await). Auth via Bearer header (no cookies).
- Object storage is REAL (Emergent objstore via EMERGENT_LLM_KEY).
