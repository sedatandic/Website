# plan.md — GlobalAgri Commodities Corporate Website (Updated After Phase 3 Redesign)

## 1) Objectives
- **Deliver V1 (completed):** A working corporate website (React + shadcn/ui) with full backend integrations for insights, careers, contact, and downloadable company profile PDF.
- **Deliver working backend (completed):** FastAPI + MongoDB APIs for contact submissions, market insights, careers (jobs + applications + inquiries), and a downloadable company profile PDF.
- **Content strategy (completed):** Pre-populated Insights + Jobs via seed script; **no admin panel**; **no newsletter**.
- **Major design direction update (completed):** Redesign the site to **match the Dome Agribusiness reference style**:
  - Full-screen **hero carousel** on homepage
  - **Tabbed About** section (Who We Are, Strengths, Key Facts, Memberships)
  - **Tabbed Commodities** section (At A Glance, Grains & Feeds, Oilseeds, Pulses & Beans, Sugar & Rice, Coffee) with **image grids**
  - **Partners** page with logo/card grid
  - Simplified **Contact** page layout + **Google Maps embed**
  - Simplified footer (single copyright line)
- **Quality bar (completed):** Smooth navigation, responsive UI, form validation, loading/empty states, stable end-to-end data flow.
- **Testing status (completed):** End-to-end testing executed after redesign; **backend 100% pass**, **frontend 100% pass**.

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
  - `GET /api/insights`, `GET /api/insights/{id_or_slug}` (supports slug or ObjectId)
  - `GET /api/jobs`, `GET /api/jobs/{id_or_slug}` (supports slug or ObjectId)
  - `POST /api/jobs/apply`
  - `POST /api/careers/inquiry`
  - `GET /api/download/profile` (serves generated PDF)
  - `GET /api/health`
- Seed script implemented (idempotent):
  - Insights seeded (6 sample articles)
  - Jobs seeded (4 sample roles)
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
  - Products & Markets + product detail pages
  - Risk Management & Logistics
  - Sustainability & Compliance
  - Market Insights (list + filters/search + detail)
  - Global Presence
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

**V1 End-to-End Test (mandatory at end of phase)** ✅
Verified:
- Insights list → detail loads
- Jobs list → detail → apply submission success
- Careers inquiry submission success
- Contact form submission success + required-field validation
- PDF download works (`/api/download/profile` returns 200)

**Phase 2 user stories** ✅
1. As a visitor, I want clear navigation across all pages so I can quickly find information about products, logistics, and compliance.
2. As a visitor, I want to read market insights in a list and open a detailed article so I can understand current trends.
3. As a candidate, I want to browse open roles and view role details so I can decide what to apply for.
4. As a candidate, I want to submit a job application and see confirmation so I know it was received.
5. As a potential partner, I want to submit a contact inquiry with product interest so GlobalAgri can respond appropriately.

### Phase 3 — Dome-Style Redesign (Structure + UI Overhaul) ✅ COMPLETED

**Goal:** Align UI/IA with the provided Dome Agribusiness reference (hero carousel, tabbed internal sections, simplified layouts).

**Backend updates** ✅
- New collections seeded (idempotent):
  - `partners` (name, logo, category)
  - `memberships` (name, full_name, logo)
- New endpoints:
  - `GET /api/partners`
  - `GET /api/memberships`

**Frontend redesign + IA changes** ✅
- Updated global navigation to match reference pattern:
  - Home
  - About GlobalAgri (dropdown → Who We Are / Strengths / Key Facts / Memberships)
  - Our Commodities (dropdown → At A Glance / Grains & Feeds / Oilseeds / Pulses & Beans / Sugar & Rice / Coffee)
  - Our Partners
  - Market Insights
  - Careers
  - Contact Us
- Homepage redesign ✅
  - Full-screen hero **carousel (3 slides)**
  - Orange CTA styling (`#e67e22`) for “Discover Us”
  - Carousel navigation dots
- About redesign ✅
  - Tabbed layout with:
    - Who We Are
    - Strengths
    - Key Facts (stat cards)
    - Memberships (cards populated from backend)
- Commodities redesign ✅
  - Tabbed layout mirroring reference categories
  - Product **image grids** for each commodity tab
  - “At A Glance” tab with overview copy
- Partners page ✅
  - Hero + breadcrumb + partner grid populated from backend
- Contact redesign ✅
  - Simplified contact form (Full Name, Email, Company, Phone, Subject, Message)
  - Left column contact info
  - **Google Maps embed** section
- Footer redesign ✅
  - Simplified footer with single copyright line

**Cleanup** ✅
- Removed obsolete pages/components from Phase 2 structure that no longer match the Dome-style IA:
  - Products overview/detail pages, Risk/Logistics, Sustainability, Global Presence components/pages (retired in favor of tabbed sections + streamlined navigation)

**Phase 3 End-to-End Test (mandatory at end of phase)** ✅
- Testing agent run after redesign:
  - **Backend: 100% (16/16 tests passed)**
  - **Frontend: 100% (all flows verified)**

**Phase 3 user stories** ✅
1. As a visitor, I want a familiar, simple navigation structure with dropdowns and tabs so I can quickly find About and Commodities details.
2. As a visitor, I want to browse commodities visually via image grids so I can understand the product range at a glance.
3. As a visitor, I want to see key company statistics and memberships so I can build trust quickly.
4. As a visitor, I want to view partners to validate execution capability across shipping/inspection/trade finance.
5. As a user, I want a simple contact page with a map so I can easily reach the company.

### Phase 4 — Optional Next (only if requested)
- SEO enhancements: meta tags, OpenGraph, sitemap generation.
- Anti-spam hardening: honeypot + server-side rate limiting for forms.
- Replace placeholder partner/membership logos with brand-approved assets.
- Add CMS/admin (Insights/Jobs/Partners/Memberships) if content needs frequent updates.
- Careers enhancements: resume upload (requires storage decision), job filters.

**Phase 4 user stories**
1. As an admin, I want to manage insights/jobs/partners/memberships without deployments.
2. As a candidate, I want to upload a resume so I can apply faster.
3. As a business user, I want spam protection so contact/career inquiries stay clean.
4. As a marketing user, I want SEO/OG tags so the site shares and ranks better.
5. As a content owner, I want controlled publishing workflows (drafts/scheduling).

## 3) Next Actions
- **Delivery ready:** Confirm final branding assets (logo), real contact details, and final copy revisions.
- Decide whether to keep the **orange accent CTA style** (currently matching reference) or revert to navy/gold branding accents.
- (Optional) Implement Phase 4 items (SEO, spam mitigation, CMS/admin, resume uploads, real partner/membership logos).

## 4) Success Criteria
- ✅ All routes render correctly, are responsive, and match the **Dome Agribusiness-inspired** design system.
- ✅ Navigation supports dropdowns + tabbed internal pages (About, Commodities).
- ✅ APIs work end-to-end with MongoDB; seed data appears in UI.
- ✅ Contact, job application, and career inquiry forms validate and submit successfully.
- ✅ Market insights list/detail flows work with filtering/search + loading/empty states.
- ✅ Company profile PDF downloads successfully (`/api/download/profile`).
- ✅ Partners and Memberships load from backend (`/api/partners`, `/api/memberships`).
- ✅ End-to-end test pass completed with **no critical UI/layout/integration issues** (backend 100%, frontend 100%).
