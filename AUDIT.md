# DocLink website: design audit (Phase 1)

Audited 26 October 2026 against the brief: white base, DocLink blue as the working colour, deep navy for contrast, gradient only on the hero background, primary buttons and stat highlights. No invented content, no emoji icons, no gradient words in headlines, no fake dashboards, no repeated section template, mobile-first, subtle motion.

Method: I read every page and shared component, ran the site locally (`next dev`) and took full-page screenshots of all 13 routes at 1440 and 390 with headless Chrome. They are in [`audit/screenshots/`](audit/screenshots/), named `{page}-{width}.png`. I also checked a few views live in the browser.

Content rule used here: every client name, figure, quote, team member and address counts as **unverified** until you confirm it. The full list, with file and line, is in [TODO.md](TODO.md).

---

## 1. Codebase map

| Area | Finding |
|---|---|
| Framework | Next.js 16.3.6 (App Router, Turbopack), React 19.2, TypeScript |
| Routes | `/`, `/products`, `/products/{erp,pos,doctor}`, `/services`, `/services/{software,web,mobile}`, `/case-studies`, `/case-studies/[id]` (emaar, street82, grid, a-design), `/about`, `/contact`, `POST /api/contact`, `robots.ts`, `sitemap.ts` |
| Page pattern | Each `app/**/page.tsx` is an ~11-line wrapper (metadata + one component) that renders `components/pages/*.tsx`. **All 13 page components are `'use client'`** |
| Styling | Tailwind v4 via `@tailwindcss/postcss`. Partial `@theme inline` tokens in `app/globals.css` (brand, ink, muted, border, surface), but components bypass them: **300 hard-coded hex classes** (`#1D4ED8` appears 208×), **549 arbitrary `text-[Npx]` sizes in 51 distinct values**, and 10 different `rounded-[Npx]` radii (14–40px) |
| Design tokens | Only the 8 colours above. No type scale, spacing, radius, shadow or motion tokens |
| Fonts | `next/font/google`: Plus Jakarta Sans (body) and Manrope (display, weights 500–800). Headlines ask for `font-black` (900), **which isn't loaded** |
| Icons | `components/icons/DocLinkIcons.tsx` (24 consistent 1.75-stroke icons), plus many ad-hoc inline Heroicons paths, plus emoji. Lucide is not installed |
| Motion | Keyframes in `globals.css`: blob morph, three float loops, fade-up ×5, marquee, reveal ×4. Also the `hooks/useScrollReveal.ts` observer and a three.js / react-three-fiber hero (`components/HeroScene.tsx`). There's a global `prefers-reduced-motion` guard (good) |
| Images | `public/doclink-logo.png` (1.3 MB) and `doclink-logo-trim.png` (353 KB), remote Unsplash stock photos in the carousel, unused `public/ned desing.png` and `new desing.png` (2.1 MB), and unused Next starter SVGs |
| Data | `data/company.ts` (facts, `companyStats`, phone marked TODO), `data/caseStudies.tsx` (4 cases, quotes, emoji UI). Stats are **duplicated** in `components/DeliveredWorkCarousel.tsx`, `components/CaseStudyCard.tsx`, `components/pages/CaseStudies.tsx` and `components/pages/ServiceSoftware.tsx` |
| Leftovers | `Design DocLink Technologies Homepage/` (the Figma Make / Vite export the Next app was ported from), `tsconfig.tsbuildinfo`, `yarn.lock` alongside `package-lock.json` |
| Backend | `app/api/contact/route.ts` posts leads to `CONTACT_WEBHOOK_URL`. It has a honeypot and returns an honest 503 when unconfigured. **Out of scope; leave unchanged** |

---

## 2. Scorecard

| Page | Score | Reason |
|---|---|---|
| Home `/` | 5/10 | Clear promise, but gradient word in H1, a decorative 3D globe that says nothing about ERP, two marquees, a stats band with unverified numbers and the eyebrow/headline/cards pattern repeated |
| Products `/products` | 4/10 | Three identical stacked cards, each with a hand-drawn fake UI. Gradient phrase in H1 |
| ERP `/products/erp` | 4/10 | Sensible module grouping, but a fake dashboard (with "Emaar PVT" inside it), five more fake screens, 9–11px text and a 5-line H1 at 1440 |
| POS `/products/pos` | 4/10 | Fake POS UI and unsourced metrics ("8.2 sec", "99.8%") |
| Doctor `/products/doctor` | 4/10 | Fake phone mockups and a generic trust strip |
| Services `/services` | 4/10 | The flagship card works. The greyed-out "Coming soon: Marketing" card is noise, and the stats use gradient numerals |
| Software `/services/software` | 4/10 | Emoji permission matrix (✅ ❌ 👁), a fake release log and a fake KPI dashboard |
| Web `/services/web` | 4/10 | Fake analytics and funnel numbers. Unsourced "90+ PageSpeed" and "70% on a phone" claims |
| Mobile `/services/mobile` | 3/10 | **Scrolls sideways on phones** (page is 571–579px wide at 375–390). Emoji store badges with invented ratings |
| About `/about` | 3/10 | Unverified team shown as gradient initials tiles, and the tiles are **clipped**. The "team" graphic shows 6 people and the list shows 4. Two gradient bands stack into one block. Gradient phrase in H1 |
| Case Studies `/case-studies` | 4/10 | Gradient headers with the client's first letter instead of logos or screenshots. Identical cards |
| Case Study detail | 5/10 | The best structure on the site (problem, approach, quote), but the quote is unverified and the "Platform" block uses emoji UI |
| Contact `/contact` | 5/10 | Solid multi-step form and API. Fake SVG map, pulsing "accepting projects" dot, placeholder phone and social links |

---

## 3. Issues

Format: **location** → problem → why it matters → **fix**.

### A. Hard-rule violations

1. **`Home.tsx` Hero H1, plus the H1s in `Products.tsx`, `Services.tsx`, `About.tsx`, `CaseStudies.tsx` and `Contact.tsx`** → a gradient-coloured phrase inside the headline (10 `gradient-text` uses including step numerals) → breaks the brief and is the most recognisable generated-page tell → **solid ink headlines, delete `.gradient-text` from `globals.css`. Size and weight carry emphasis.**
2. **Fake product UI**: `Products.tsx` (`ERPMockup`, `POSMockup`, `DoctorMockup`), `ProductERP.tsx` (`ERPScreenshot` and five module screens), `ProductPOS.tsx`, `ProductDoctor.tsx`, `ServiceSoftware.tsx`, `ServiceWeb.tsx`, `ServiceMobile.tsx`, the platform blocks in `data/caseStudies.tsx`, `components/FeatureBlock.tsx`, `components/MiniScreen.tsx` → hand-drawn dashboards full of invented figures and client names, with 6.5–10px text → visitors read them as real product, and they can't be read on a phone → **a single `ProductShot` component (`next/image`, fixed aspect ratio, caption). It shows a labelled placeholder ("ERP: inventory screen, 16:10") until the real file lands in `public/screens/`. Delete every mockup component.**
3. **Emoji as icons**: `ServiceSoftware.tsx:88–92, 178`, `ServiceMobile.tsx:18, 188–189`, `data/caseStudies.tsx:120–125`, `Contact.tsx:43` (`𝕏`) → they render differently on each OS, screen readers announce them, and they clash with the line icons → **Lucide icons (`Check`, `X`, `Eye`, `Signal`) with `aria-hidden` and a visible text label.**
4. **Unverified content** across `data/company.ts`, the carousel, case studies, About, POS, Web, Mobile, FAQ and Contact (see TODO.md) → the brief forbids invented numbers, clients, testimonials and contact details → **one source of truth in `data/` with a `verified` flag. Unverified items render as `[TBC]` or are hidden, per your decision on each.** NovaCare, Harbour Bites and Apex Works appear only in the carousel and link nowhere specific.
5. **Repeated hero and closing template**: 12 of 13 pages use pulsing pill, H1, paragraph, button, morphing blob and dot grid (copy-pasted SVG patterns). 9 pages end on the same `ProductCTA` gradient band. Eyebrow, headline and 3 equal cards repeats on Home, Products, Services and About → every page looks the same and nothing feels made for its content → **page-specific layouts (see the plan below), with the gradient CTA band only where it's the page's real conclusion.**

### B. Typography

6. **`app/layout.tsx`** → Jakarta and Manrope are near-identical geometric sans, so pairing them adds a request without adding contrast. `font-black` (900) is used but Manrope loads only 500–800 → headings render at a weight you didn't choose → **one family, or a clearly contrasting pair (see directions), with exactly the weights used.**
7. **Everywhere** → 51 distinct font sizes, from 6.5px (mockups) to 80px, with labels at 10.5–11.5px → no rhythm, and text under 12px is illegible at 390 → **a 10-step type scale as tokens (12/14/16/18/20/24/32/44/60/76). Arbitrary `text-[…]` values are banned in review.**
8. **`Home.tsx` `Label`, every page's section kicker, footer `h5`s (32 instances)** → tracked-out ALL-CAPS eyebrows above nearly every heading → template chrome that labels things that don't need labels → **remove most of them. Where a kicker helps, use sentence case at 14px in the muted colour.**
9. **Headline casing** → Title Case ("Run Your Business Without the Paper Trail", "Frequently Asked Questions") mixed with sentence case ("Built for teams near and far") → inconsistent voice → **sentence case for all headings and buttons.**
10. **`ProductERP.tsx` H1 at 1440** → 5 lines at `max-w-[640px]` and 58px → slow to read and pushes the product below the fold → **shorter headline ("Accounting, stock and payroll in one place") or a wider measure. Max 3 lines at desktop.**
11. **`About.tsx` story and "Why Sri Lankan SMEs" paragraphs** → about 90–95 characters per line at 1440 → hurts readability → **cap body at 65ch.**

### C. Colour and contrast

12. **`text-slate-400` (#94A3B8, about 2.6:1 on white), 92 uses**: team bios, card captions, form helper text, mockup labels, "Est. 2019" → fails WCAG AA for body text → **a `muted` token at #475569 (7.6:1). Slate-400 only for disabled UI.**
13. **Default body colour `text-slate-500` (#64748B, 4.8:1)** → passes, but looks faint at 14px on a phone → **body at `ink-2` #334155, muted at #475569.**
14. **Gradient use**: buttons, CTA bands, the About stats band, avatar tiles, case-study headers, icon tiles, the timeline line, step numerals and the form success badge → far beyond "hero background, primary buttons, stat highlights" → **one `--gradient-brand` token used in those three places only. Everything else is flat blue or navy.**
15. **`ProductCTA.tsx`, the `Home.tsx` CTA band** → `text-blue-100/80` subcopy on the gradient is around 4:1 at the light end → borderline at 15px → **white at 90%, 16px minimum.**

### D. Components

16. **Buttons** → at least 6 visual variants and 6 names for the same action ("Book a Consultation", "Book a Free Consultation", "Book a Demo", "Get a Quote", "Start the Conversation", "Explore →") → inconsistency reads as unfinished, and visitors can't tell if these are different actions → **a `Button` primitive (primary, secondary, ghost; md and lg; 44px minimum height) and one name per action.**
17. **Cards** → 10 radii, three shadow styles, and `card-hover` lift-and-shadow on every card → the "SaaS card kit" look → **two radii (8px controls, 16px surfaces), a hairline border, no lift. Link cards change border colour on hover and show a focus ring.**
18. **`Navbar.tsx` mega-menus** → open only on CSS `:hover` or `:focus-within`. The triggers have `aria-haspopup` but no `aria-expanded` and no click handler → unreliable on touch laptops and tablets at the `lg` breakpoint, and screen readers can't tell the state → **a click and Escape disclosure with `aria-expanded` and `aria-controls`. The FLAGSHIP badge goes from 9px to 12px sentence case.**
19. **`Footer.tsx`** → email, phone and address hard-coded (not from `data/company.ts`). Social, Privacy and Terms links are `href="#"`. `h5` skips heading levels. `→` glyphs used as list bullets → stale data risk, dead links and a broken outline → **read from `company.ts`, hide links until real URLs exist ([TBC] in TODO.md), use proper heading levels and drop the arrows.**
20. **`components/find-your-fit/*` inputs** → labels, honeypot and error path are good. Styling is one-off (`rounded-xl`, `#E5E7EB`) → **restyle only through an `Input` primitive (44px height, token focus ring). No logic changes.**
21. **`About.tsx` team cards** → the initials badge sits half outside its header strip, and `overflow-hidden` on the card cuts it in half ("NS" is clipped in `about-1440.png`) → looks broken → **resolved by real photos or removing the avatars; at minimum, move the badge inside the card's flow.**
22. **`About.tsx` stats band followed immediately by `ProductCTA`** → two gradient bands merge into one tall blue block (see `about-1440.png`) → no visual break, and it doubles the gradient → **one closing band per page.**

### E. Generic / "AI-made" tells

23. **Every hero** → morphing radial-gradient blob, 3% dot grid, pulsing dot in a pill badge → default decoration repeated on 12 pages → **remove.**
24. **`HeroScene.tsx`** → a three.js network globe with orbit rings. Abstract "connected nodes" that say nothing about ERP or POS, hidden on mobile, and it ships three, fiber and drei (several hundred KB of JS) → **replace with the chosen direction's hero device; drop the three.js dependencies.**
25. **`Home.tsx`** → middle-dot meta string "ERP · POS · Custom Software · Sri Lanka", `→` appended to links, and 01/02/03 numbering on the services list, which isn't a sequence → template chrome → **remove. Numbering only for real sequences (process steps).**
26. **`Home.tsx` `ClientLogos` and `OurTechnologies`** → two infinite marquees. Client names are plain grey text, and the tech stack ("MongoDB", "Tailwind CSS") means nothing to an SME owner → noise and motion without information → **a static row of real client logos (pending verification). Drop the tech marquee, or move the stack to the Services pages as a plain list.**
27. **`CaseStudies.tsx`, `CaseStudyCard.tsx`, `About.tsx`** → gradient header plus initial letter, and gradient initials tiles for people → placeholder art passing as design → **real logos, screenshots and photos, or a plain text card until assets exist.**
28. **`Services.tsx`** → greyed-out "Marketing: Coming soon" card → advertises something you don't sell → **remove.**

### F. Motion

29. **`globals.css`, `useScrollReveal`** → nearly every section fades up on scroll, on top of the hero load sequence, blobs, floats, marquees, pulsing dots and the 3D scene → scattered motion with no purpose. Content stays invisible until JS runs, so screenshots, slow devices and crawlers can see blank bands → **one hero load moment plus motion that answers actions (menu, accordion, tabs). Remove scroll reveals and the blob, float, pulse and marquee keyframes. Keep the reduced-motion guard.**

### G. Responsiveness

30. **`ServiceMobile.tsx` line 260 block ("One app. Both stores.")** → the side-by-side iOS/Android phone mockup has a ~500px minimum width. Inside `FeatureBlock`'s single-column grid, it stretches the page to 571px on a 375px phone → **horizontal scroll on mobile** → **removed with the mockups (issue 2). Grid columns use `minmax(0,1fr)` in the new `Section` primitive.**
31. **Home at 390** → the 3D scene is hidden, so the first screen is text, three buttons/badges and empty space → the hero has no product presence on the most common device → **the chosen direction's hero must work at 390 first.**
32. **Carousel (`DeliveredWorkCarousel.tsx`)** → three copies of seven cards, drag-to-scroll with pointer capture, 8px-tall dot buttons → controls fail the 44px touch target, and the drag logic fights native scrolling → **native `scroll-snap` row (or a static grid for 4 verified cases) with real-size controls.**

### H. Performance

33. **All 13 `components/pages/*.tsx` are `'use client'`** → every word of every page ships as JS and hydrates → slower mobile LCP and TBT → **server components by default. Only the nav, FAQ accordion, carousel, tabs and contact form become client islands.**
34. **`app/layout.tsx` OG image and JSON-LD logo** → the 1.3 MB `doclink-logo.png` (1754×1063, wrong ratio for OG). The nav logo is a 353 KB PNG drawn at 36px tall → wasted bytes, and social cards crop badly → **an SVG wordmark for nav and footer, plus 1200×630 OG images (one default and one per main page).**
35. **Carousel images** → remote Unsplash stock photos → slow, off-brand and implies they're client photos → **local AVIF/WebP of real work or labelled placeholders.**
36. **Repo hygiene** → `Design DocLink Technologies Homepage/`, `public/ned desing.png`, `public/new desing.png`, the starter SVGs, `tsconfig.tsbuildinfo` and the stray `yarn.lock` → clutter, plus 2 MB of unused images in `public/` → **remove or `.gitignore`, with your OK.**

### I. Accessibility

37. **`Contact.tsx` map** → a decorative SVG "map" with a fake pin → looks interactive, but only the small "Open in Maps" button works → **a plain address block with an "Open in Google Maps" link (address pending verification).**
38. **`Contact.tsx` "Currently accepting new projects"** → a perpetually pulsing green dot → implies a live status that isn't wired to anything → **static text, or remove.**
39. **Heading outline** → section `h2`s are fine, but the footer uses `h5` with no `h3`/`h4`, and module cards use `div`s for titles → screen-reader navigation by heading is uneven → **the `Heading` primitive enforces levels.**
40. **Focus** → the global `:focus-visible` ring is good. Cards that change background on hover have no matching focus style beyond the outline → **the same visual treatment for hover and focus on link cards.**

### J. SEO

41. **Metadata** → every route has a title and description (good). Product and service descriptions are 30–60 characters, there are no per-page OG images, and case-study pages have no OG → weak snippets and shares → **descriptions of 120–155 characters and per-page OG.**
42. **`app/sitemap.ts`** → `lastModified: new Date()` on every request → tells crawlers everything changes constantly → **a fixed date per route, or derive it from the content.**

---

## 4. Prioritised plan

**P1: biggest visual impact**
1. Tokens in `globals.css` `@theme`: colour, type scale, spacing, radius, shadow and motion. Load the chosen fonts. Delete `gradient-text`, the blob, float, pulse and marquee keyframes, and `.reveal`.
2. Primitives: `Button`, `Container`/`Section`, `Heading`, `Text`, `Card`, `Input`, `ProductShot` (placeholder-aware), `Nav`, `Footer`. Add a `/styleguide` route.
3. Homepage, one section at a time, starting with the hero (no 3D, no gradient word, works at 390).
4. Swap every fake mockup for `ProductShot` placeholders. Remove all emoji. Fix the `/services/mobile` overflow.
5. Move unverified content into `data/` with `[TBC]` handling.

**P2**
6. ERP, POS and Doctor pages and the Products index, each with a layout shaped by its content.
7. The Services index and the three service pages. Process steps become a real sequence.
8. Case-study list and detail: logo and screenshot slots, quotes shown only when verified.
9. Server-component conversion and client islands.

**P3**
10. About (team gated on verification) and Contact (restyle only, form logic untouched).
11. OG images, descriptions and sitemap dates.
12. Repo cleanup (with your OK), Lighthouse mobile pass, consistency sweep.

---

## 5. Three visual directions

All three keep the brief's constraints: white base, DocLink blue as the working colour, deep navy for contrast, and the blue gradient only on the hero background, primary buttons and stat highlights. The ui-ux-pro-max design-system search for this product suggested glassmorphism, an orange CTA and Plus Jakarta Sans. That's the generic SaaS default and it conflicts with the brief, so I set it aside. These are my proposals.

### A: "Working system" (product-led precision)
- **Display + body:** Geist for both (one family, weights 400 / 500 / 600). Display at 60–76px with −0.03em tracking, body at 16–17px.
- **Layout:** Strict 12-column grid, left-aligned. The hero is a short plain headline with a large, real ERP screenshot directly under it at full container width. Sections alternate text-left/screenshot-right with full-width shots. The ERP page has a module tab bar that swaps the screenshot.
- **Motion:** One hero load (headline, then the screenshot rising 12px). Tab changes crossfade at 180ms. Nothing animates on scroll.
- **Reference:** [linear.app](https://linear.app)
- **Choose it if:** you can supply strong product screenshots soon. The product does the selling.

### B: "Off the spreadsheet" (editorial before/after)
- **Display + body:** Newsreader (serif, display only, weight 500, optical sizing) with Hanken Grotesk for body and UI.
- **Layout:** Asymmetric. A wide column of type with a narrow column of facts. The hero tells the brief's story in three plain rows (paper, Excel, WhatsApp), each resolving to what DocLink replaces it with. Case studies read like short articles. Products are a calm two-column list, not cards.
- **Motion:** A single hero sequence where the three "before" rows resolve to "after" once. Everything else is static. Accordions and menus animate on use.
- **Reference:** [mercury.com](https://mercury.com)
- **Choose it if:** you want to stand apart from other dev shops and speak to owner-operators more than CTOs.

### C: "Blueprint" (structural, navy-led)
- **Display + body:** Bricolage Grotesque for display (weight 600, uses its width and optical-size axes) with Figtree for body.
- **Layout:** Alternating full-bleed bands. The hero is a deep-navy band with the blue gradient and one clean SVG diagram of a real SME flow (order → stock → invoice → payroll). Below it, white sections with two-column content. A bento grid appears only on the ERP modules section, where the content really is modular.
- **Motion:** The hero diagram's connecting lines draw once on load (about 1.2s; static under reduced motion). Everything else is static.
- **Reference:** [stripe.com](https://stripe.com) (its product-flow diagrams)
- **Choose it if:** screenshots will take a while. The diagram explains the product without fake UI.

---

## Screenshots

`audit/screenshots/` holds 26 files, 13 pages × 2 widths: `home`, `products`, `products-erp`, `products-pos`, `products-doctor`, `services`, `services-software`, `services-web`, `services-mobile`, `case-studies`, `case-study-emaar`, `about`, `contact`, each at `-1440.png` and `-390.png`. They were taken with the viewport stretched to the full page height, so scroll-reveal sections render. In a normal browser they appear as you scroll.
