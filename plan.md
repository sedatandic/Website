# plan.md — GlobalAgri Commodities Corporate Website (Updated After Phase 8 Cargill/Andersons/Scoular Enhancements + Seed Data Expansion)

## 1) Objectives
- **Deliver V1 (completed):** A working corporate website (React + shadcn/ui) with full backend integrations for insights, careers, contact, partners, memberships, and downloadable company profile PDF.
- **Deliver working backend (completed):** FastAPI + MongoDB APIs for contact submissions, market insights, careers (jobs + applications + inquiries), partners, memberships, and a downloadable company profile PDF.
- **Content strategy (updated, completed):** Pre-populated Insights + Jobs via seed script; **no admin panel**; **no newsletter**.
- **Major design direction update (completed):** Redesign the site to **match the Dome Agribusiness reference style**:
  - Full-screen **hero carousel** on homepage
  - **Tabbed About** section (Who We Are, Strengths, Key Facts, Memberships)
  - **Tabbed Commodities** section (At A Glance, Grains & Feeds, Oilseeds, Pulses & Beans, Sugar & Rice, Coffee) with **image grids**
  - **Partners** page with logo/card grid
  - Simplified **Contact** page layout + **Google Maps embed**
  - Footer evolved from simplified → multi-column (see Phase 8)
- **Homepage refinement update (completed):** Add **Mediterra-inspired** homepage sections while preserving Dome-style IA:
  - Commodity category cards with **icon badges**
  - **Sustainability** banner section
  - **Auto-scrolling partners carousel**
- **Navigation polish update (completed):** Adopt **Quadra-inspired** navigation/submenu styles:
  - Desktop mega-dropdown menus with **white panel**, **arrow pointer**, **two-column layout (description + links)**
  - Uppercase submenu links with subtle hover animation
  - Orange accent bottom border on mega-dropdown
  - Orange underline for active nav item
  - Mobile submenu expansion with orange left-border accent + a “Get In Touch” CTA
  - **Mobile Sheet white border removed** (border-l overridden)
- **Homepage storytelling update (completed):** Adopt **Agrocorp-inspired** homepage patterns:
  - Alternating **Mission / Vision** sections (large image + text) and **accent bars**
  - Clean **bordered value-chain cards** with centered icons and numbered titles
  - Prominent **Download Corporate Brochure** CTA (reuses Company Profile PDF download)
  - **Diamond image mosaic** treatment in the founder/leadership quote section
- **Phase 8 design expansion (completed):** Incorporate ideas from **Cargill / Andersons / Scoular**:
  - Cargill-style **People / Products / Planet** pillar triptych
  - Scoular-style **Who We Serve** icon grid
  - Cargill/Andersons-style **Latest Market Insights** (dynamic from `/api/insights`)
  - Andersons-style **Employee Testimonial** section
  - Footer upgraded to **multi-column corporate footer** (brand + navigation + contact details + policy bar)
- **Seed data strategy update (completed):** Expand seeded content to support richer homepage storytelling and listings:
  - **Insights: 8** total
  - **Jobs: 6** total
- **Quality bar (completed):** Smooth navigation, responsive UI, form validation, loading/empty states, stable end-to-end data flow.
- **Testing status (updated, completed):**
  - Iteration 4 regression after Mediterra homepage enhancements: **backend 100% / frontend 100% / integration 100%**
  - Iteration 5 regression after Agrocorp homepage changes: **backend 100% / frontend 95%** (LOW-priority automated selector mismatch)
  - Iteration 6 regression after Phase 8 + seed expansion: initially flagged missing data due to DB mismatch; after fix, **APIs return full dataset and UI listings render correctly**.

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
- Seed script implemented (idempotent):
  - Insights seeded (initially 6)
  - Jobs seeded (initially 4)
- PDF generation implemented:
  - Auto-generates and serves `GlobalAgri_Company_Profile.pdf`
- CORS enabled + request validation via Pydantic.

**Frontend (React + react-router-dom + shadcn/ui)** ✅
- App shell implemented:
  - Sticky header navigation with dropdowns and mobile Sheet menu
  - Scroll-to-top on route change
  - Footer with corporate content
- Pages implemented per initial sitemap:
  - Home
  - About
  - Commodities + commodity detail routes
  - Partners
  - Market Insights (list + filters/search + detail)
  - Careers (jobs list + job detail + apply + inquiry)
  - Contact
- UX essentials implemented:
  - Loading/empty states for Insights and Jobs
  - Client-side validation for forms + toast notifications (sonner)
  - Subtle entrance animations (framer-motion)
- API integration:
  - Centralized axios client in `src/lib/api.js`

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

- Updated global navigation:
  - Home
  - About GlobalAgri (dropdown)
  - Our Commodities (dropdown)
  - Our Partners
  - Market Insights
  - Careers
  - Contact Us
- Homepage redesign:
  - Full-screen hero carousel, orange CTA, carousel dots
- About redesign:
  - Tabbed layout (Who We Are / Strengths / Key Facts / Memberships)
- Commodities redesign:
  - Tabbed layout + image grids
- Partners + Contact redesign:
  - Partners grid from backend
  - Contact form + map embed
- Footer redesign:
  - Initially simplified to single-line footer (later upgraded in Phase 8)
- Testing agent run after redesign:
  - **Backend: 100% / Frontend: 100%**

### Phase 4 — Mediterra-Inspired Homepage Enhancements ✅ COMPLETED
- Added icon commodity cards, sustainability banner, and auto-scrolling partners carousel.
- Routing re-validation confirmed Careers → Job Detail works (no bug).
- Regression test: **backend 100% / frontend 100% / integration 100%**

### Phase 5 — Project Closeout / Delivery Confirmation ✅ COMPLETED
- Confirmed all routes, APIs, forms, and PDF download functioning end-to-end.

### Phase 6 — Quadra-Inspired Header Mega-Dropdowns ✅ COMPLETED
- Desktop mega-dropdown panel (white, arrow, two-column, uppercase links, orange accent border)
- Active nav orange underline
- Mobile: orange left-border submenu accent + “Get In Touch” CTA
- **Fix:** Removed mobile Sheet white border by overriding `border-l`.

### Phase 7 — Agrocorp-Inspired Homepage Enhancements ✅ COMPLETED
- Mission/Vision alternating sections
- Bordered value chain cards
- Brochure CTA
- Diamond mosaic in quote section
- Testing agent run:
  - **Backend: 100% / Frontend: 95%** (LOW-priority automated selector note)

### Phase 8 — Cargill/Andersons/Scoular-Inspired Enhancements + Dome Agribusiness Tone ✅ COMPLETED

**Goal:** Add enterprise-grade storytelling sections and corporate polish inspired by Cargill/Andersons/Scoular, while maintaining the Dome-style IA.

**Frontend updates** ✅
- Homepage new sections:
  - **People / Products / Planet** pillar triptych (Cargill-inspired)
  - **Who We Serve** icon grid (Scoular-inspired)
  - **Latest Market Insights** (dynamic cards fetching from `/api/insights`) (Cargill/Andersons-inspired)
  - **Employee Testimonial** section (Andersons-inspired)
- Footer upgrade:
  - Replaced simplified footer with a **multi-column corporate footer** (brand + About + Commodities + Company + contact details + policy bar)
- Copywriting:
  - Strengthened homepage and section copy to a **Dome Agribusiness corporate tone**.

**Backend updates** ✅
- Seed data expanded:
  - Insights increased from 6 → **8**
  - Jobs increased from 4 → **6**
- **Database alignment fix** ✅
  - Identified runtime DB mismatch: backend defaults to `globalagri_db` (DB_NAME env not set).
  - Reseeded **`globalagri_db`** so API returns complete dataset.

**Verification** ✅
- Confirmed:
  - `/api/insights` returns 8 items
  - `/api/jobs` returns 6 items
  - Careers page lists all 6 jobs
  - Insights page lists all 8 insights

## 3) Next Actions
- **Delivery ready:** confirm final branding assets (logo), real contact details, and final copy revisions.
- Confirm whether to keep the orange accent (`#e67e22`) as primary brand accent or adjust to navy/gold.
- (Optional) Standardize automated test selectors across forms if strict selector expectations are required (LOW priority).
- (Optional) Run one final recorded regression after any further copy/styling changes.
- (Optional) Set `DB_NAME` explicitly in backend environment to avoid future DB mismatches.

## 4) Success Criteria
- ✅ All routes render correctly, are responsive, and match the Dome Agribusiness-inspired design system.
- ✅ Homepage includes Mediterra + Agrocorp + Cargill/Andersons/Scoular-inspired enhancements without regressions.
- ✅ Navigation includes Quadra-inspired mega-dropdowns + mobile enhancements.
- ✅ APIs work end-to-end with MongoDB; **seed data appears correctly in UI**.
- ✅ Contact, job application, and career inquiry forms validate and submit successfully.
- ✅ Market insights list/detail flows work with filtering/search + loading/empty states.
- ✅ Company profile PDF downloads successfully (`/api/download/profile`).
- ✅ Partners and Memberships load from backend (`/api/partners`, `/api/memberships`).
- ✅ Latest dataset targets met: **8 insights / 6 jobs** and visible in UI.
