# plan.md — Peninsula Agritrade LLC Corporate Website (Updated After Phase 11 Homepage Simplification)

## 1) Objectives
- **Deliver V1 (completed):** A working corporate website (React + shadcn/ui) with full backend integrations for insights, careers, contact, partners, memberships, and downloadable company profile PDF.
- **Deliver working backend (completed):** FastAPI + MongoDB APIs for contact submissions, market insights, careers (jobs + applications + inquiries), partners, memberships, and a downloadable company profile PDF.
- **Content strategy (completed):** Pre-populated Insights + Jobs via seed script; **no admin panel**; **no newsletter**.

- **Brand + rebrand (completed):**
  - Company name: **Peninsula Agritrade LLC** (fully rebranded from GlobalAgri)
  - Theme: **Maroon accents** (primary accent used throughout: `#7B1E2F`)
  - Logo: **Pure white**, transparent background, **2× larger** (target ~120px height) on dark header

- **Major design direction update (completed historically):** Redesign the site to match the **Dome Agribusiness** reference style:
  - Full-screen hero carousel on homepage
  - Tabbed About section (Who We Are, Strengths, Key Facts, Memberships)
  - Tabbed Commodities section (At A Glance, Grains & Feeds, Oilseeds, Pulses & Beans, Sugar & Rice, Coffee) with image grids
  - Partners page with logo/card grid
  - Simplified Contact page layout + Google Maps embed
  - Footer evolved from simplified → multi-column

- **Navigation polish update (completed):** Quadra-inspired navigation/submenu styles:
  - Desktop mega-dropdown menus (white panel, arrow pointer, two-column layout)
  - Uppercase submenu links with subtle hover animation
  - Mobile submenu expansion with accent styling + “Get In Touch” CTA

- **Quality bar (updated):**
  - Corporate, clean, breathable UI; avoid clutter
  - Smooth navigation, responsive UI, form validation, loading/empty states, stable end-to-end data flow

- **Phase 11 objective (completed):** **Homepage simplification** per user request to make the site **“simpler but elegant”**.
  - Replace accumulated, overly-detailed homepage sections with a clean, executive structure:
    **Hero → Stats → About → Commodities → Differentiators → Insights → CTA**
  - Preserve maroon branding and the large white logo

- **Testing status (updated):**
  - Iteration 4 regression after Mediterra enhancements: **backend 100% / frontend 100% / integration 100%**
  - Iteration 5 regression after Agrocorp changes: **backend 100% / frontend 95%** (LOW-priority automated selector mismatch)
  - Iteration 6 regression after Phase 8 + seed expansion: DB mismatch fixed; APIs and UI listings render correctly
  - Phase 9 verification: manual screenshots; no compilation errors
  - Phase 10 verification: manual screenshot confirmation that hero video renders and carousel works
  - **Iteration 7 regression (Phase 11):** **backend 100% (17/17 endpoints) / frontend 100% / responsive 100% / navigation 100% / integration 100%**

## 2) Implementation Steps

### Phase 1 — POC (Skipped)
- No POC required (no external auth, payments, or complex integrations). Proceeded directly to build and iterative validation.

### Phase 2 — V1 App Development (Core build) ✅ COMPLETED

**Backend (FastAPI + MongoDB)** ✅
- Mongo collections implemented:
  - `contact_submissions` (name, company, email, phone, country, product_interest, message, created_at)
  - `insights` (slug, title, excerpt, content, category, date, read_time, image)
  - `jobs` (slug, title, location, department, type, summary, description, requirements, posted_at)
  - `job_applications` (job_id, name, email, phone, linkedin, cover_letter, created_at)
  - `career_inquiries` (name, email, message, created_at)
- Endpoints implemented:
  - `POST /api/contact`, `GET /api/contact`
  - `GET /api/insights`, `GET /api/insights/{id_or_slug}`
  - `GET /api/jobs`, `GET /api/jobs/{id_or_slug}`
  - `POST /api/jobs/apply`
  - `POST /api/careers/inquiry`
  - `GET /api/download/profile`
  - `GET /api/health`
  - `GET /api/partners`, `GET /api/memberships` (as used by UI)
- Seed script implemented (idempotent) + expanded:
  - Insights seeded to **8**
  - Jobs seeded to **6**
- PDF generation implemented:
  - Auto-generates and serves company profile PDF via `/api/download/profile`
- CORS enabled + request validation via Pydantic.

**Frontend (React + react-router-dom + shadcn/ui)** ✅
- App shell implemented:
  - Sticky header navigation with dropdowns and mobile Sheet menu
  - Scroll-to-top on route change
  - Footer with corporate content (later upgraded)
- Pages implemented per sitemap:
  - Home
  - About
  - Commodities + commodity detail routes
  - Partners
  - Market Insights (list + filters/search + detail)
  - Careers (jobs list + job detail + apply + inquiry)
  - Contact
- UX essentials implemented:
  - Loading/empty states for Insights and Jobs
  - Client-side validation for forms + toast notifications
  - Subtle entrance animations (framer-motion)
- API integration:
  - Centralized client in `src/lib/api.js`

**Accessibility note (post-test fix applied)** ✅
- Mobile navigation Sheet/Dialog accessibility warning fixed by adding an SR-only title.

**V1 End-to-End Test** ✅
Verified:
- Insights list → detail loads
- Jobs list → detail → apply submission success
- Careers inquiry submission success
- Contact form submission success + required-field validation
- PDF download works (`/api/download/profile` returns 200)

### Phase 3 — Dome-Style Redesign (Structure + UI Overhaul) ✅ COMPLETED
**Goal:** Align UI/IA with the provided Dome Agribusiness reference.
- Updated global navigation and page IA
- Homepage full-screen hero carousel
- Tabbed About and Commodities pages
- Partners grid + Contact with map
- Regression test after redesign: **Backend 100% / Frontend 100%**

### Phase 4 — Mediterra-Inspired Homepage Enhancements ✅ COMPLETED
- Added icon commodity cards, sustainability banner, and auto-scrolling partners carousel.
- Regression test: **backend 100% / frontend 100% / integration 100%**

### Phase 5 — Project Closeout / Delivery Confirmation ✅ COMPLETED
- Confirmed all routes, APIs, forms, and PDF download functioning end-to-end.

### Phase 6 — Quadra-Inspired Header Mega-Dropdowns ✅ COMPLETED
- Desktop mega-dropdown panel + mobile menu enhancements
- Fix: removed mobile Sheet white border by overriding `border-l`.

### Phase 7 — Agrocorp-Inspired Homepage Enhancements ✅ COMPLETED
- Mission/Vision alternating sections
- Bordered value chain cards
- Brochure CTA
- Testing: **Backend 100% / Frontend 95%** (LOW-priority automated selector note)

### Phase 8 — Cargill/Andersons/Scoular-Inspired Enhancements + Dome Tone ✅ COMPLETED
- Homepage: People/Products/Planet pillars, Who We Serve, Latest Insights, Employee testimonial
- Footer upgraded to multi-column corporate footer
- Seed data expanded (Insights 8, Jobs 6)
- DB alignment fix to ensure production DB (`globalagri_db`) contains seeded content

### Phase 9 — Bilcanli-Inspired Homepage Visual Sections ✅ COMPLETED
- Added “Close to the Source” and Split-Screen Panorama sections
- Verified by screenshots; no compilation errors

### Phase 10 — InspectSea-Inspired Background Video Hero ✅ COMPLETED
- Introduced looping hero background video with poster fallback and readability overlay
- Verified by screenshots

### Phase 11 — Homepage Simplification (“Simpler but Elegant”) ✅ COMPLETED
**Goal:** Remove homepage clutter accumulated across iterations and return to a clean corporate structure while preserving brand identity.

**Frontend updates** ✅
- Rewrote `/app/frontend/src/pages/HomePage.jsx` to a simplified layout:
  1) Hero carousel (image-based) with 2 CTAs (Discover Us / Company Profile)
  2) Stats band with animated counters
  3) About preview section
  4) Commodities card grid
  5) Differentiators (4 cards)
  6) Latest Insights (top 3 from `/api/insights`)
  7) Final CTA strip

**Verification + testing** ✅
- Compilation validation:
  - `esbuild src/ --loader:.js=jsx --bundle --outfile=/dev/null` (pass)
- Visual verification:
  - Screenshots captured across all homepage sections (hero, stats, about, commodities, differentiators, insights, CTA)
  - Verified maroon accents and large white logo remain correct
- Functional verification:
  - Hero carousel dots clickable
  - Insights fetched successfully from backend
- Full regression:
  - `testing_agent_v3` run → **Iteration 7 report**
  - **All backend endpoints and frontend flows passed** (desktop + tablet + mobile)

## 3) Next Actions
- **Content finalization (delivery-ready):** Confirm real contact details (addresses/phones/emails), finalize copy and any legal/footer policy links.
- **SEO (recommended):** Add meta tags, OpenGraph, and per-page titles/descriptions.
- **Security/anti-spam (recommended):** Add spam protection to Contact form (e.g., reCAPTCHA/hCaptcha) + rate limiting.
- **Admin/content ops (optional):** Add admin panel for managing Insights/Jobs/Partners if required.
- **Careers enhancement (optional):** Implement resume/CV file upload for job applications.
- **Operational hardening (optional):** Explicitly set backend `DB_NAME` in environment to prevent future DB mismatches.

## 4) Success Criteria
- ✅ Brand is fully **Peninsula Agritrade LLC** (maroon accents + large pure white logo).
- ✅ Homepage is **simpler but elegant** with the intended structure: **Hero → Stats → About → Commodities → Differentiators → Insights → CTA**.
- ✅ All routes render correctly, are responsive, and maintain corporate polish.
- ✅ APIs work end-to-end with MongoDB; seeded data visible in UI (**8 insights / 6 jobs**).
- ✅ Contact, job application, and career inquiry forms validate and submit successfully.
- ✅ Company profile PDF downloads successfully (`/api/download/profile`).
- ✅ Regression testing confirms **100% pass** across backend, frontend, navigation, responsiveness, and integration (Iteration 7).