# Changelog — Peninsula Agritrade LLC

## 2026-07-17 (Global Presence tab + Contact fixes)
- **About → Global Presence** (new tab, before Memberships; added to header dropdown): animated dotted world map (Antarctica cropped, served at /dotted-world-map.png) with Trading Office / Origination / Destination markers, animated trade-flow vessels (16 paths / 8 vessels), Mercator-calibrated positions, slower pulse. Origins: Canada, Brazil, Ukraine, Russia, Kazakhstan, Australia. Destinations: Türkiye, Tunisia, Algeria, Lebanon, Syria, Pakistan, Libya, Malaysia, Sri Lanka, Philippines, Egypt, India, Nepal, Bangladesh, Vietnam, Indonesia. Right column intro (expanded copy) + four framed cards row (Commodities We Trade | Trading Offices | Origination | Destination Markets). Map bottom aligned to intro text.
- **Header**: desktop nav font enlarged 13px→15px.
- **Contact page fix**: removed large empty gap above Trading/Origination office lists (AnimatedOfficeMap root h-full made conditional on `fill`; removed mt-auto). Verified testing_agent iterations 15/16/17 (100% frontend).

## 2026-07-15 (content & layout refinements)
- **Homepage stats band**: expanded to 6 metrics in one full-width row with icons (dollar/boxes/ship/sprout/globe/building) and vertical separators. Values show units: `250M+ USD`, `500K+ MTS`, `200+ VESSELS`, `25+ COMMODITIES`, `25+ DESTINATION`, `4 OFFICES & STAFF`. Descriptor lines below each. Removed redundant middle labels.
- **About → Memberships**: added 4 logos (GAFTA, GPC, FOSFA, Qatar Chamber — replaced ICC) served from `/public/memberships/`; logos 2x size, name/full_name text removed. Seed + DB updated.
- **About page**: Who We Are, Strengths, Memberships headings + text center-aligned. Right image starts at first-paragraph line (marginTop 3.5rem).
- **Commodities → At A Glance**: rebuilt to match Who We Are (left text col-span-3 + tall right image, max-w-7xl left-aligned). New "At A Glance" copy.
- **Commodities product images**: replaced generic/repeated photos with accurate close-ups across grains, oilseeds, pulses, sugar/rice, coffee.
- **Our Partners page**: new 2-paragraph copy, center-aligned + vertically centered left column; right side shows 8 partner-CATEGORY tiles (4 per row, 2 rows equal height) with maroon lucide icons. NOTE: real company logos (SGS/Maersk/etc.) not used — external logo CDNs blocked in env and Wikipedia hotlinks fail in-browser. Awaiting user-uploaded logo files to swap in.

## 2026-06-16 — About: Global Presence tab
- Added "Global Presence" tab on About Us (before Memberships) + header dropdown link.
- AnimatedOfficeMap: destination markers, animated trade-flow vessels (origins→Doha→destinations), Antarctica cropped from map (served locally at /dotted-world-map.png), Mercator-calibrated marker positions, slower pulse.
- Origins now include Canada, Brazil, Ukraine, Russia, Kazakhstan, Australia.
- Destinations: Türkiye, Tunisia, Algeria, Lebanon, Syria, Pakistan, Libya, Malaysia, Sri Lanka, Philippines, Egypt, India, Nepal, Bangladesh, Vietnam, Indonesia (removed Kenya, Nigeria, Saudi Arabia).
- Right column: intro + framed Commodities card + framed legend card (pills matched). Legend chip moved inside map bottom-left.
- Fixed duplicate React key on Key Facts tab. Verified via testing_agent iteration_15 & iteration_16 (100% frontend).

## Pending / Backlog
- Added new "Global Presence" tab on About Us page, positioned before Memberships.
- Enhanced AnimatedOfficeMap: added optional destination markers (navy) + title prop; showDestinations only on this tab (Contact map unchanged).
- Recalibrated all map marker coordinates (Doha HQ now on Persian Gulf; offices/origins/destinations aligned to dotted map).
- Right column beside map shows intro paragraph + grouped legend (Trading Offices / Origination / Destination Markets). Removed the "How We Operate" panel.
- Full-width sections below: Trading Offices, Origins & Sourcing, Destination Markets, Commodities pills.
- Verified via testing_agent (iteration_15) — 100% frontend, no bugs; regressions on other tabs & Contact map pass.

## Pending / Backlog
- P1: Email notifications for new submissions (blocked — needs Resend API key).
- P1: Admin inbox pagination/search + image upload for insights & partner logos.
- P2: Tighten CORS for production; move rate-limiter to MongoDB/Redis.
