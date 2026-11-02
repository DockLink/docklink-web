# TODO: content to confirm and assets needed

Everything below is on the site today but **unverified**. For each item, tick it if it's real, or tell me to remove it or replace it with `[TBC]`. Nothing has been deleted yet.

## Company facts — `data/company.ts`
- [ ] Founded 2019 (line 9). It also drives "7+ years" on About
- [ ] **Phone `+94 11 234 5678` (line 12), marked as a placeholder in the code.** Also hard-coded in `components/Footer.tsx:79` and `components/pages/Contact.tsx:15`
- [ ] Address "42 Bauddhaloka Mawatha, Colombo 07" (lines 15–16). Also in `Footer.tsx:84`, `Contact.tsx:36, 188`, and the maps link `Contact.tsx:37, 193`
- [ ] Email `hello@doclink.lk` (line 10). Also `Footer.tsx`, `Contact.tsx`
- [ ] Stats (lines 25–29): 20+ projects, 15+ clients, 5 countries, 99.9% uptime. Shown on Home (`components/home/ProofBand.tsx`, "Built for teams near and far") and About (stats band and "20+ projects later")

## Clients and results
- [ ] Client list on Home: Emaar, Street82, GRID, A-Design (`data/clients.ts`, shown in `components/home/ProofBand.tsx`). Do you have permission to name them? Logos available?
- [ ] Carousel clients with no case-study page: **NovaCare, Harbour Bites, Apex Works** (`components/DeliveredWorkCarousel.tsx`, `deliveredWork`)
- [ ] Carousel figures (`DeliveredWorkCarousel.tsx`, the `stats` on each card): 300 employees, 200 hrs/month, 94%, 3 wks, 6 tools, 34% revenue growth, 12 projects, LKR 0 lost invoices, 4 clinics, 2.4k appointments, 8 outlets, 40% faster checkout, 12 departments, 8.5k SKUs
- [ ] Carousel photos are Unsplash stock (`DeliveredWorkCarousel.tsx`, the `image` on each card) and are not client photos
- [ ] Case-study figures (`data/caseStudies.tsx`): Emaar 218–221, Street82 262–265, GRID 306–309 (incl. "LKR 490k build cost"), A-Design 350–353. Repeated in `components/pages/CaseStudies.tsx:14–48`, `components/CaseStudyCard.tsx:18–29` and `components/pages/ServiceSoftware.tsx:194, 202`
- [ ] Case-study narratives (`data/caseStudies.tsx:226` and following, `362` and following): "300 rows", "two-tier approval", "LKR 280,000 unpaid invoices", etc.
- [ ] Case-study "photo caption" (CMS field, e.g. "Asanka Ratnayake — CFO, Emaar Holdings, Colombo") is no longer shown: it captioned an initials tile, not a photo. It can come back with a real client photo

## Testimonials (named people)
- [ ] Asanka Ratnayake, CFO, Emaar Holdings (`data/caseStudies.tsx:242–244`)
- [ ] Dilini Jayawardena, CEO, Street82 (`data/caseStudies.tsx:286–288`)
- [ ] Chathura Wickramasinghe, Managing Director, GRID Corp (`data/caseStudies.tsx:330–332`)
- [ ] Amara Perera, Principal Designer & Founder, A-Design Studio (`data/caseStudies.tsx:374–376`)

## Team — `components/pages/About.tsx`
- [ ] Nuwan Samarasinghe, Founder & CEO (line 11)
- [ ] Priya Thilakaratne, Head of Engineering, "10 years…" (line 18)
- [ ] Ravindu Jayasekara, Head of Delivery (line 25)
- [ ] Amali Fernando, Client Success Lead (line 32)
- [ ] Extra initials "KP" and "MF" were in the old team graphic, which is now replaced by a photo slot (`public/about/team.jpg`). Who are they, and should they be in the team list?
- [ ] "the same spreadsheet across a hundred businesses" (line 84)

## Product and service claims
- [ ] POS: "Checkout time avg 8.2 sec", "3.4 items/transaction", "Payment success 99.8%" (`components/pages/ProductPOS.tsx:169`)
- [ ] Web: "Our sites score 90+ on PageSpeed Insights" (`ServiceWeb.tsx:246`), "70% of your visitors in Sri Lanka are on a phone" (`ServiceWeb.tsx:260`)
- [ ] Mobile: "Half the build cost" (`ServiceMobile.tsx:260`), App Store 4.8 / 1.2k reviews and Google Play 4.7 / 2.4k reviews (`ServiceMobile.tsx:188–189`). Whose app is this?
- [ ] Services: "2–6 wks MVP delivery window" (`components/pages/Services.tsx:12`)
- [ ] Software: release note "dashboard loads 40% faster" (`ServiceSoftware.tsx:143`)
- [ ] Home hero promises: "Free 20-minute consultation", "Fixed-price quotes", "Local support in Colombo" (`components/home/Hero.tsx:10`)
- [ ] FAQ: "POS 6–10 weeks, ERP 4–6 months", "30-day warranty" and retainers, "projects in the UAE, UK, Australia and Southeast Asia" (FAQ answers in `components/home/FAQ.tsx`)
- [ ] Contact: "Response time < 1 business day", "Mon–Fri, 9am–6pm LKT" (`Contact.tsx:210–212`), "Currently accepting new projects"
- [ ] Trust strip: "Local Hosting & Support", "LKR Pricing", "Encrypted Patient Data", "Local Compliance Standards" (`components/TrustStrip.tsx`)

## Links that go nowhere
- [ ] X, LinkedIn and Facebook URLs: `Footer.tsx:18–20`, `Contact.tsx:43–45` (all `#`)
- [ ] Privacy Policy and Terms of Service pages: `Footer.tsx:94–95` (both `#`)

## Assets needed from you
- [ ] **Product screenshots** (PNG, at least 2400px wide, real or demo data you're happy to show):
  - Service pages: `public/screens/{software,web}-hero.png` (16:10) and `public/screens/mobile-hero.png` (phone), plus one per CMS screen slot, e.g. `software-workflow.png`, `web-seo.png`, `mobile-ui.png` (`mobile-ui` and `mobile-offline` are phone screens)
  - Product pages: `public/screens/{erp,pos}-hero.png` (16:10) and `public/screens/doctor-hero.png` (phone), plus one per CMS screen slot, named after its visual key, e.g. `public/screens/erp-invoice.png`, `pos-sales.png`, `doctor-records.png` (doctor ones are phone screens). Each placeholder on the page shows the exact file name it needs.
  - Homepage (add the files, then each placeholder's `src` gets set to switch it over): `public/screens/home-hero-erp.png` (ERP main dashboard, 16:10), `public/screens/home-erp.png` (ERP inventory, 16:10), `public/screens/home-pos.png` (POS checkout, 16:10), `public/screens/home-doctor.png` (Doctor App appointments, phone 1290×2796)
  - ERP: inventory, invoices, accounting, payroll, CRM, HR, rental (one per module you want shown)
  - POS: checkout screen, end-of-day report, stock view
  - Doctor App: appointments, patient record, prescription (phone screens, 1290×2796)
  - Case studies: one screen per client build, 16:10, named after the case study slug: `public/screens/case-emaar.png` (payroll), `case-street82.png` (inventory), `case-grid.png` (CRM + projects), `case-a-design.png` (projects + invoices). Used on the case studies list and as the hero of each case study page
  - Service pages: examples of web and mobile builds you can show
- [ ] Logo as **SVG** (wordmark and icon separately), to replace the 1.3 MB PNG
- [ ] Client logos (SVG) for any client you have permission to name
- [ ] Team photos (if the team section stays)
- [ ] Office or team photo for About, 4:3, at `public/about/team.jpg` (the page shows a labelled placeholder until then)
- [ ] Open Graph artwork, or approval for me to generate a 1200×630 card from the chosen design
- [ ] Real phone number, confirmed address, social profile URLs, privacy policy and terms text

## Repo cleanup (needs your OK)
- [ ] Delete `Design DocLink Technologies Homepage/` (old Figma Make export)
- [ ] Delete `public/ned desing.png`, `public/new desing.png`, `public/{file,globe,next,vercel,window}.svg`
- [ ] Keep `package-lock.json` or `yarn.lock` (not both). Add `tsconfig.tsbuildinfo` to `.gitignore`
- [ ] Remove the `three`, `@react-three/fiber` and `@react-three/drei` dependencies once the 3D hero is replaced
