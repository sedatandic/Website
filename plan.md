# plan.md — GlobalAgri Commodities Corporate Website (Updated After Phase 7 Agrocorp-Inspired Homepage Enhancements)

## 1) Objectives
- **Deliver V1 (completed):** A working corporate website (React + shadcn/ui) with full backend integrations for insights, careers, contact, partners, memberships, and downloadable company profile PDF.
- **Deliver working backend (completed):** FastAPI + MongoDB APIs for contact submissions, market insights, careers (jobs + applications + inquiries), partners, memberships, and a downloadable company profile PDF.
- **Content strategy (completed):** Pre-populated Insights + Jobs via seed script; **no admin panel**; **no newsletter**.
- **Major design direction update (completed):** Redesign the site to **match the Dome Agribusiness reference style**:
  - Full-screen **hero carousel** on homepage
  - **Tabbed About** section (Who We Are, Strengths, Key Facts, Memberships)
  - **Tabbed Commodities** section (At A Glance, Grains & Feeds, Oilseeds, Pulses & Beans, Sugar & Rice, Coffee) with **image grids**
  - **Partners** page with logo/card grid
  - Simplified **Contact** page layout + **Google Maps embed**
  - Simplified footer (single copyright line)
- **Homepage refinement update (completed):** Add **Mediterra-inspired** homepage sections while preserving Dome-style IA:
  - Commodity category cards with **icon badges**
  - **Sustainability** banner section
  - **Auto-scrolling partners carousel**
- **Navigation polish update (completed):** Adopt **Quadra-inspired** navigation/submenu styles to elevate perceived quality and usability:
  - Desktop mega-dropdown menus with **white panel**, **arrow pointer**, **two-column layout (description + links)**
  - Uppercase submenu links with subtle hover animation
  - Orange accent bottom border on mega-dropdown
  - Orange underline for active nav item
  - Mobile submenu expansion with orange left-border accent + a “Get In Touch” CTA
- **Homepage storytelling update (completed):** Adopt **Agrocorp-inspired** homepage patterns to strengthen corporate narrative and visual hierarchy:
  - Replaced circular About teaser with alternating **Mission / Vision** sections (large image + text) and **accent bars**
  - Rebuilt value-chain section into clean **bordered cards** with centered icons and numbered titles
  - Added prominent **Download Corporate Brochure** CTA (reuses Company Profile PDF download)
  - Added **diamond image mosaic** treatment in the founder/leadership quote section
  - Added orange accent bars under key section headings for consistent hierarchy
- **Quality bar (completed):** Smooth navigation, responsive UI, form validation, loading/empty states, stable end-to-end data flow.
- **Testing status (completed):**
  - Iteration 4 regression after Mediterra homepage enhancements: **backend 100% / frontend 100% / integration 100%**
  - Iteration 5 regression after Agrocorp homepage changes: **backend 100% / frontend 95%**
    - Only note: LOW priority automated-test selector mismatch for forms; forms function correctly and already include `data-testid` attributes.

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

### Phase 4 — Mediterra-Inspired Homepage Enhancements (Homepage-Only UI Layer) ✅ COMPLETED

**Goal:** Improve homepage storytelling and visual richness using Mediterra-like patterns while keeping the Dome-style IA and existing routing.

**Frontend updates** ✅
- Homepage enhancements implemented and verified:
  - Commodity category cards updated to include **icon badges** (visual category markers)
  - Added a dedicated **Sustainability** banner section
  - Implemented an **auto-scrolling partners carousel** section

**Verification (manual)** ✅
- Confirmed all enhanced homepage sections render and behave correctly:
  - Commodity cards (icons and layout)
  - Sustainability banner visibility and styling
  - Partners carousel appears and scrolls as expected

**Routing re-validation** ✅
- Re-investigated previously reported Careers → Job Detail routing issue:
  - Confirmed **no bug** exists
  - All 4 job slugs load correctly:
    - `risk-analyst-singapore`
    - `logistics-coordinator-dubai`
    - `business-development-manager-nairobi`
    - `senior-grains-trader`
  - Confirmed click-through navigation from Careers listing to Job Detail works.

**Full regression test (mandatory at end of phase)** ✅
- Testing agent run after homepage enhancements:
  - **Backend: 100% (16/16 tests passed)**
  - **Frontend: 100% (navigation + UI verified)**
  - **Integration: 100% (contact, career inquiry, job apply forms verified)**

### Phase 5 — Project Closeout / Delivery Confirmation ✅ COMPLETED
- Confirmed:
  - All required routes render correctly and are responsive
  - All APIs work end-to-end with MongoDB and seeded data
  - Forms validate and submit successfully
  - PDF download works (`/api/download/profile`)
  - Partners and Memberships load correctly (`/api/partners`, `/api/memberships`)
  - Post-enhancement regression testing completed at 100%

### Phase 6 — Quadra-Inspired Header Mega-Dropdowns (Navigation UI Upgrade) ✅ COMPLETED

**Goal:** Borrow Quadra-like navigation/submenu patterns to modernize the header, improve scannability, and increase perceived trust/quality.

**Frontend updates** ✅
- Desktop navigation:
  - Replaced basic dropdown lists with **Quadra-style mega dropdowns**:
    - White panel + subtle shadow
    - Arrow pointer aligned to the dropdown
    - Two-column layout: **left description** + **right link columns**
    - Uppercase submenu link styling with right-chevron hover reveal
    - Orange accent bottom border
  - Added orange underline to indicate active top-nav item.
- Mobile navigation:
  - Enhanced submenu expansion styling with orange left-border accent
  - Added a “Get In Touch” CTA button inside the mobile menu

**Verification (manual)** ✅
- Confirmed dropdown open/close behavior and hover intent are stable.
- Confirmed mobile menu open/close and submenu expansion work.
- Confirmed navigation remains correct across key pages (Home/About/Insights), with no regressions.

### Phase 7 — Agrocorp-Inspired Homepage Enhancements (Narrative + Visual Hierarchy) ✅ COMPLETED

**Goal:** Borrow Agrocorp-like homepage storytelling patterns (Mission/Vision emphasis, clean card grids, strong typographic hierarchy, and visual mosaic motifs) while keeping the Dome-style IA and routing.

**Frontend updates** ✅
- Homepage content/structure enhancements:
  - Replaced the prior circular “About teaser” with alternating **Mission** and **Vision** sections:
    - Large image + text composition
    - Clear orange accent bars under headings
  - Added a prominent **Download Our Corporate Brochure** CTA (reuses `/api/download/profile`).
  - Rebuilt the value chain into clean **bordered cards** with centered icons and numbered titles.
  - Added an Agrocorp-inspired **diamond image mosaic** treatment to the founder/leadership quote section.
  - Added orange accent bars under key headings to standardize hierarchy across homepage sections.

**Testing** ✅
- Testing agent run after Phase 7:
  - **Backend: 100%**
  - **Frontend: 95%**
  - LOW-priority testing note: automated selector expectations differ from implementation; forms function correctly.

## 3) Next Actions
- **Delivery ready:** Confirm final branding assets (logo), real contact details, and final copy revisions.
- Decide whether to keep the **orange accent CTA style** (now used as the consistent accent across Dome/Quadra/Agrocorp-inspired elements) or adjust to a different brand accent (e.g., navy/gold).
- (Optional) Add/standardize `data-testid` attributes across any remaining form fields if stricter automated selector patterns are required.
- (Optional) Run one more recorded regression test after any future styling/copy changes.

## 4) Success Criteria
- ✅ All routes render correctly, are responsive, and match the **Dome Agribusiness-inspired** design system.
- ✅ Homepage includes Mediterra-inspired enhancements (commodity icon cards, sustainability banner, partners marquee) without regressions.
- ✅ Navigation supports dropdowns + tabbed internal pages (About, Commodities) and includes **Quadra-inspired mega-dropdowns**.
- ✅ Homepage includes Agrocorp-inspired narrative components (Mission/Vision, brochure CTA, clean value-chain cards, diamond mosaic quote section).
- ✅ APIs work end-to-end with MongoDB; seed data appears in UI.
- ✅ Contact, job application, and career inquiry forms validate and submit successfully.
- ✅ Market insights list/detail flows work with filtering/search + loading/empty states.
- ✅ Company profile PDF downloads successfully (`/api/download/profile`).
- ✅ Partners and Memberships load from backend (`/api/partners`, `/api/memberships`).
- ✅ Latest regression results recorded (Phase 7): backend 100%, frontend 95% with only LOW-priority automated test selector note.