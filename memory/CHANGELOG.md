# Changelog — Peninsula Agritrade LLC

## 2026-07-15 (content & layout refinements)
- **Homepage stats band**: expanded to 6 metrics in one full-width row with icons (dollar/boxes/ship/sprout/globe/building) and vertical separators. Values show units: `250M+ USD`, `500K+ MTS`, `200+ VESSELS`, `25+ COMMODITIES`, `25+ DESTINATION`, `4 OFFICES & STAFF`. Descriptor lines below each. Removed redundant middle labels.
- **About → Memberships**: added 4 logos (GAFTA, GPC, FOSFA, Qatar Chamber — replaced ICC) served from `/public/memberships/`; logos 2x size, name/full_name text removed. Seed + DB updated.
- **About page**: Who We Are, Strengths, Memberships headings + text center-aligned. Right image starts at first-paragraph line (marginTop 3.5rem).
- **Commodities → At A Glance**: rebuilt to match Who We Are (left text col-span-3 + tall right image, max-w-7xl left-aligned). New "At A Glance" copy.
- **Commodities product images**: replaced generic/repeated photos with accurate close-ups across grains, oilseeds, pulses, sugar/rice, coffee.
- **Our Partners page**: new 2-paragraph copy, center-aligned + vertically centered left column; right side shows 8 partner-CATEGORY tiles (4 per row, 2 rows equal height) with maroon lucide icons. NOTE: real company logos (SGS/Maersk/etc.) not used — external logo CDNs blocked in env and Wikipedia hotlinks fail in-browser. Awaiting user-uploaded logo files to swap in.

## Pending / Backlog
- P1: Email notifications for new submissions (blocked — needs Resend API key).
- P1: Admin inbox pagination/search + image upload for insights & partner logos.
- P2: Tighten CORS for production; move rate-limiter to MongoDB/Redis.
