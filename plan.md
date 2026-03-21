# plan.md — GlobalAgri Commodities Corporate Website (Updated)

## 1) Objectives
- **Deliver V1 (completed):** A polished, responsive multi-page corporate website (React + shadcn/ui) reflecting GlobalAgri branding (navy `#0b3c5d`, gold `#d9a441`, bg `#f5f5f7`).
- **Deliver working backend (completed):** FastAPI + MongoDB APIs for contact submissions, market insights, careers (jobs + applications + inquiries), and a downloadable company profile PDF.
- **Content strategy (completed):** Pre-populated Insights + Jobs via seed script; **no admin panel**; **no newsletter**.
- **Quality bar (completed):** Smooth navigation, professional UI/UX, form validation, loading/empty states, and stable end-to-end data flow.
- **Testing status (completed):** End-to-end testing executed; **backend 100% pass**, **frontend 98% pass** with a **minor accessibility warning fixed** for the mobile navigation.

## 2) Implementation Steps

### Phase 1 — POC (Skipped)
- No POC required (no external integrations, no auth, no complex workflows). Proceeded directly to V1 build with incremental validation.

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
  - Sticky header navigation with Products dropdown (7 categories) + mobile Sheet menu
  - Footer with multi-column links and corporate contact info
  - Route-based navigation with scroll-to-top behavior
- Pages implemented per sitemap:
  - Home (hero + CTAs, 7 commodity cards, 3 pillars, global presence teaser, sustainability teaser, insights teaser, CTA band)
  - About (who we are, vision, values, leadership)
  - Products & Markets (overview + 7 product detail pages)
  - Risk Management & Logistics
  - Sustainability & Compliance
  - Market Insights (list + filters/search + detail view)
  - Global Presence (lightweight SVG map + hubs/offices + markets served)
  - Careers (jobs list + job detail + apply form + general inquiry form)
  - Contact (validated form with Country + Product Interest dropdowns)
- UX essentials implemented:
  - Loading/empty states for Insights and Jobs
  - Client-side validation for forms + toast notifications (sonner)
  - Subtle entrance animations (framer-motion)
- API integration:
  - Centralized axios client in `src/lib/api.js`

**Accessibility note (post-test fix applied)** ✅
- Minor testing-agent warning: mobile navigation Sheet/Dialog missing accessible title/description.
- Fix applied by adding a screen-reader-only title within the mobile menu content.

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

### Phase 3 — Hardening + Content/UX Enhancements (Next / Optional)
- Improve SEO: meta tags, OpenGraph, basic sitemap + semantic headings.
- Expand seed content (more insights, richer job descriptions, leadership bios).
- Add advanced filtering/search:
  - Insights: category filter + keyword search (basic search already present; can be enhanced)
  - Jobs: location/department filtering UI (backend supports location/department queries)
- Add simple spam mitigation (honeypot + server-side rate limiting) for forms.
- Enhance Global Presence map:
  - Tooltips and/or interactive hub list syncing
  - More regions and operational notes

**Phase 3 test pass (mandatory at end of phase)**
- Re-test all Phase 2 flows + enhanced filters/search + spam mitigation behaviors.

**Phase 3 user stories**
1. As a visitor, I want faster scanning of insights using filters/search so I can find relevant analysis.
2. As a candidate, I want to filter jobs by location/department so I can find suitable roles.
3. As a visitor, I want a clearer global hubs view (map + list) so I understand coverage.
4. As a business user, I want contact submissions protected from spam so the inbox stays clean.
5. As a visitor, I want pages to look polished on mobile and desktop so the brand feels trustworthy.

### Phase 4 — Optional Next (only if requested)
- Authentication + admin panel for managing Insights/Jobs (deferred; ask before implementing).
- File upload for resumes (requires storage strategy).
- CMS integration (if content owners need self-serve editing).

**Phase 4 user stories**
1. As an admin, I want to create/edit insights so content stays current without deployments.
2. As an admin, I want to create/edit job listings so hiring stays accurate.
3. As a candidate, I want to upload a resume so I can apply faster.
4. As an admin, I want to export submissions/applications so I can process them externally.
5. As a content owner, I want drafts and scheduled publishing so updates are controlled.

## 3) Next Actions
- **V1 delivery ready:** Confirm final branding assets (logo, real contact details) and content adjustments.
- (Optional) Implement Phase 3 hardening items (SEO, spam mitigation, enhanced filters, richer content).
- (Optional) Add admin/content management only if requested.

## 4) Success Criteria
- ✅ All routes in the sitemap render correctly, are responsive, and match the navy/gold brand.
- ✅ APIs work end-to-end with MongoDB; seed data appears in UI.
- ✅ Contact, job application, and career inquiry forms validate inputs and submit successfully.
- ✅ Market insights list/detail flows work with loading/empty/error states.
- ✅ Company profile PDF downloads successfully from the Home hero CTA.
- ✅ End-to-end test pass completed with no critical UI/layout or integration issues (minor accessibility warning fixed).