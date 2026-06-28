# Peninsula Agritrade LLC — Corporate Website

## Original Problem Statement
Refine a professional, multi-page corporate website for "Peninsula Agritrade LLC" (Qatar-based agri-commodity trading house). Goal: "simpler but elegant" design. Built with React + FastAPI + MongoDB.

## Current Theme (as of 2026-06-28)
- **Brand color: Qatar Maroon `#8A1538`** (darker `#6E0F2A` for gradients). Swapped from purple (#8B5CF6/#7C3AED), which itself replaced an earlier maroon.
- **Light theme** across the whole site:
  - Header: white bg, dark gray nav text, maroon active states.
  - Footer: light gray (`#f5f5f7`) with dark text, maroon hover links.
  - Stats band: light maroon tint (`#fdf2f5`) with maroon figures.
  - CTA band: solid Qatar maroon with white "Contact Us" button.
  - Page bodies: white / `#f9fafb`. Hero banners are photo-based with dark overlay (intentional).
- **Logo** (`/app/frontend/public/logo.png`): transparent wheat icon recolored to Qatar maroon (purple backup at `logo_purple_backup.png`). Dark gray wordmark preserved.

## Architecture
```
/app
├── backend/  (server.py FastAPI, seed_data.py, MongoDB via MONGO_URL)
└── frontend/
    ├── public/logo.png  (maroon transparent logo)
    └── src/
        ├── index.css   (light theme tokens; --ga-gold = #8A1538)
        ├── components/ (Header.jsx light, Footer.jsx light)
        └── pages/      (HomePage, ContactPage, AboutPage, CommoditiesPage,
                          CareersPage, PartnersPage, InsightsPage, detail pages)
```

## Key API Endpoints
- GET `/api/insights`, `/api/jobs`, `/api/partners`, `/api/memberships`
- POST `/api/contact`

## Completed (2026-06-28)
- Fixed Homepage hero Slide 1 subtext wrapping (added `whitespace-pre-line`).
- Slide 3 headline: "in trust" kept on line 1 (widened container to max-w-5xl).
- Slide 2 headline: "and daily execution." on line 2; subtext now 2 rows; "20 years" → "25 years".
- Removed "Latest Insights" section from Homepage.
- Full theme migration: purple → Qatar maroon (#8A1538) across all files.
- Dark → Light theme (header, footer, stats, CTA).
- Recolored logo wheat to maroon.
- Regression test passed (iteration_8) before the light-theme change.

## Backlog (P1/P2)
- Update browser tab `<title>` in `frontend/public/index.html` ("Emergent | Fullstack App" → "Peninsula Agritrade LLC") + SEO meta tags / Open Graph.
- Contact form spam protection (reCAPTCHA).
- Backend admin panel for content management.
- Resume/file upload on Careers page.

## Notes
- No third-party integrations. No auth. Public site.
- Preview URL comes from `frontend/.env` REACT_APP_BACKEND_URL.
