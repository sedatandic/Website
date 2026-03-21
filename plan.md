# plan.md — GlobalAgri Commodities Corporate Website

## 1) Objectives
- Deliver a polished, responsive multi-page corporate website (React + shadcn/ui) reflecting GlobalAgri branding (navy `#0b3c5d`, gold `#d9a441`, bg `#f5f5f7`).
- Implement working backend APIs (FastAPI + MongoDB) for contact submissions, market insights, careers (jobs + applications + inquiries), and company profile PDF download.
- Pre-populate Insights + Jobs via seed script; no admin panel; skip newsletter.
- Ensure smooth navigation, strong UI/UX, form validation, and stable end-to-end data flow.

## 2) Implementation Steps

### Phase 1 — POC (Skipped)
- No POC required (no external integrations, no auth, no complex workflows). Proceed directly to V1 build with incremental testing.

### Phase 2 — V1 App Development (Core build)
**Backend (FastAPI + MongoDB)**
- Define Mongo models/collections:
  - `contact_submissions` (name, company, email, phone, country, product_interest, message, created_at)
  - `insights` (id/slug, title, excerpt, content, category, date, hero_image(optional))
  - `jobs` (id/slug, title, location, department, type, description, requirements, posted_at)
  - `job_applications` (job_id, name, email, phone, linkedin/url, cover_letter, created_at)
  - `career_inquiries` (name, email, message, created_at)
- Implement endpoints:
  - `POST /api/contact`, `GET /api/contact`
  - `GET /api/insights`, `GET /api/insights/{id_or_slug}`
  - `GET /api/jobs`, `GET /api/jobs/{id_or_slug}`
  - `POST /api/jobs/apply`
  - `POST /api/careers/inquiry`
  - `GET /api/download/profile` (serve static generated PDF)
- Add seed script to insert sample Insights + Jobs (idempotent).
- Add CORS + request validation (Pydantic), consistent error shapes.

**Frontend (React + react-router-dom + shadcn/ui)**
- App shell: top nav (multi-level Products menu), footer (multi-column), route transitions.
- Pages per sitemap:
  - Home (hero + CTAs, 7 commodity cards, 3 pillars, map teaser, sustainability teaser, insights teaser, footer)
  - About (who we are, vision, values, leadership)
  - Products & Markets (overview + 7 subpages/sections)
  - Risk Management & Logistics
  - Sustainability & Compliance
  - Market Insights (list + detail view; filters by category)
  - Global Presence (world map with hubs/regions)
  - Careers (jobs list + job detail + apply form + inquiry form)
  - Contact (validated form)
- UX essentials:
  - Loading/empty/error states for insights/jobs
  - Client-side validation on forms; toast confirmations
  - Smooth animations (subtle section reveals), accessible components
- Integrate with backend via a typed API client module.

**Company Profile PDF**
- Generate a simple branded PDF (1–2 pages) during build/startup or store as a static asset; serve via `/api/download/profile`.
- Home hero CTA downloads the PDF.

**V1 End-to-End Test (mandatory at end of phase)**
- Run the app; verify:
  - Insights list → detail loads
  - Jobs list → detail → apply submission success
  - Careers inquiry submission success
  - Contact form submission success
  - PDF download works

**Phase 2 user stories**
1. As a visitor, I want clear navigation across all pages so I can quickly find information about products, logistics, and compliance.
2. As a visitor, I want to read market insights in a list and open a detailed article so I can understand current trends.
3. As a candidate, I want to browse open roles and view role details so I can decide what to apply for.
4. As a candidate, I want to submit a job application and see confirmation so I know it was received.
5. As a potential partner, I want to submit a contact inquiry with product interest so GlobalAgri can respond appropriately.

### Phase 3 — Hardening + Content/UX Enhancements
- Improve SEO: meta tags, OpenGraph, sitemap basics, semantic headings.
- Refine UI consistency: spacing, typography scale, reusable section components.
- Expand seed content (more insights, richer job descriptions, leadership bios).
- Add advanced filtering/search:
  - Insights: category filter + keyword search
  - Jobs: location/department filter
- Add simple spam mitigation (honeypot field + server-side rate limit) for forms.
- Enhance Global Presence map: hover tooltips, list of hubs alongside map.

**Phase 3 test pass (mandatory at end of phase)**
- Re-test all Phase 2 flows + filters/search + spam mitigation behaviors.

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
- Confirm sample content set (number of insights/jobs; regions/hubs list) and provide any must-have copy/logo assets.
- Implement backend models + endpoints + seed script.
- Implement frontend routing + page templates + API integration.
- Generate and wire up the downloadable PDF profile.
- Run first end-to-end verification of forms, listings, detail pages, and downloads.

## 4) Success Criteria
- All routes in the sitemap render correctly, are responsive, and match the navy/gold brand.
- APIs work end-to-end with MongoDB; seed data appears in UI.
- Contact, job application, and career inquiry forms validate inputs and submit successfully.
- Market insights list/detail flows work with loading/empty/error states.
- Company profile PDF downloads successfully from the Home hero CTA.
- One full regression pass completes with no broken navigation or critical UI/layout issues.
