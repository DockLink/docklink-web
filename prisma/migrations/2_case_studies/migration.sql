-- CreateTable
CREATE TABLE "case_study_listing" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "seo_title" TEXT NOT NULL,
    "seo_description" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "subhead" TEXT NOT NULL,
    "cta_headline" TEXT NOT NULL,
    "cta_sub" TEXT NOT NULL,
    "cta_button_label" TEXT NOT NULL DEFAULT 'Book a Consultation',
    "cta_href" TEXT NOT NULL DEFAULT '/contact',
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "case_study_listing_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "case_study_listing_id_check" CHECK (id = 'default')
);

-- CreateTable
CREATE TABLE "case_studies" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "gradient" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "subhead" TEXT NOT NULL,
    "seo_title" TEXT NOT NULL,
    "seo_description" TEXT NOT NULL,
    "quote_text" TEXT NOT NULL,
    "quote_name" TEXT NOT NULL,
    "quote_title" TEXT NOT NULL,
    "visual_key" TEXT NOT NULL DEFAULT '',
    "avatar_initials" TEXT NOT NULL,
    "avatar_color" TEXT NOT NULL,
    "photo_caption" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "case_studies_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "case_studies_slug_format_check" CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
    CONSTRAINT "case_studies_slug_reserved_check" CHECK (slug NOT IN ('new', 'listing'))
);

-- CreateTable
CREATE TABLE "case_study_stats" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "case_study_id" UUID NOT NULL,
    "number" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "case_study_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_study_sections" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "case_study_id" UUID NOT NULL,
    "heading" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "case_study_sections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "case_studies_slug_key" ON "case_studies"("slug");

-- CreateIndex
CREATE INDEX "case_studies_sort_order_idx" ON "case_studies"("sort_order");

-- CreateIndex
CREATE INDEX "case_study_stats_case_study_id_idx" ON "case_study_stats"("case_study_id");

-- CreateIndex
CREATE INDEX "case_study_sections_case_study_id_idx" ON "case_study_sections"("case_study_id");

-- AddForeignKey
ALTER TABLE "case_study_stats" ADD CONSTRAINT "case_study_stats_case_study_id_fkey" FOREIGN KEY ("case_study_id") REFERENCES "case_studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_study_sections" ADD CONSTRAINT "case_study_sections_case_study_id_fkey" FOREIGN KEY ("case_study_id") REFERENCES "case_studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- updated_at trigger
CREATE TRIGGER case_study_listing_set_updated_at
BEFORE UPDATE ON public.case_study_listing
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER case_studies_set_updated_at
BEFORE UPDATE ON public.case_studies
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE public.case_study_listing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_study_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_study_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY case_study_listing_anon_select
  ON public.case_study_listing FOR SELECT TO anon USING (true);

CREATE POLICY case_study_listing_auth_all
  ON public.case_study_listing FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY case_studies_anon_select
  ON public.case_studies FOR SELECT TO anon USING (published = true);

CREATE POLICY case_studies_auth_all
  ON public.case_studies FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY case_study_stats_anon_select
  ON public.case_study_stats FOR SELECT TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.case_studies cs
      WHERE cs.id = case_study_id AND cs.published = true
    )
  );

CREATE POLICY case_study_stats_auth_all
  ON public.case_study_stats FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY case_study_sections_anon_select
  ON public.case_study_sections FOR SELECT TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.case_studies cs
      WHERE cs.id = case_study_id AND cs.published = true
    )
  );

CREATE POLICY case_study_sections_auth_all
  ON public.case_study_sections FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Seed: current live copy
INSERT INTO public.case_study_listing (
  id, seo_title, seo_description, eyebrow, headline, subhead,
  cta_headline, cta_sub, cta_button_label, cta_href
) VALUES (
  'default',
  'Case Studies',
  'Real results from DocLink deployments across Sri Lanka.',
  'Case Studies',
  'Real Businesses, Real Results',
  'Four Sri Lankan businesses that replaced paper, spreadsheets, and guesswork with software that works.',
  'Want results like this?',
  'Tell us what you''re running on today. A 20-minute call is all it takes to know whether we can help.',
  'Book a Consultation',
  '/contact'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.case_studies (
  id, slug, client, industry, location, date, gradient, headline, subhead,
  seo_title, seo_description, quote_text, quote_name, quote_title, visual_key,
  avatar_initials, avatar_color, photo_caption, published, sort_order
) VALUES
  (
    '20000000-0000-4000-8000-000000000010',
    'emaar',
    'Emaar',
    'Real Estate',
    'Colombo, Sri Lanka',
    'March 2024',
    'from-[#1e3a8a] to-[#1D4ED8]',
    'How Emaar automated payroll for 300 employees and cut processing time to minutes',
    'A real estate company running payroll for 300 staff on spreadsheets. One ERP deployment later, a five-day job became a 20-minute task.',
    'Emaar',
    'A real estate company running payroll for 300 staff on spreadsheets. One ERP deployment later, a five-day job became a 20-minute task.',
    'What used to take my team five days now takes twenty minutes. I can see the total payroll cost by department before I approve it — something I couldn''t do before even if I spent a whole day on Excel.',
    'Asanka Ratnayake',
    'CFO, Emaar Holdings',
    'emaar',
    'AR',
    'from-[#1e3a8a] to-[#1D4ED8]',
    'Asanka Ratnayake — CFO, Emaar Holdings, Colombo',
    true,
    1
  ),
  (
    '20000000-0000-4000-8000-000000000020',
    'street82',
    'Street82',
    'Retail',
    'Colombo & Kandy, Sri Lanka',
    'August 2023',
    'from-[#1D4ED8] to-[#0284c7]',
    'How Street82 cut stock discrepancies to near zero across three retail branches',
    'A multi-branch fashion retailer counting stock by hand and reconciling on spreadsheets. After a three-week POS deployment, inventory variance dropped to under 0.2%.',
    'Street82',
    'A multi-branch fashion retailer counting stock by hand and reconciling on spreadsheets. After a three-week POS deployment, inventory variance dropped to under 0.2%.',
    'I used to spend every first weekend of the month fixing inventory mistakes. Now I check the app on my phone before breakfast and I already know what sold yesterday and what to reorder. It changed how I run the business.',
    'Dilini Jayawardena',
    'CEO, Street82',
    'street82',
    'DJ',
    'from-[#1D4ED8] to-[#0284c7]',
    'Dilini Jayawardena — CEO, Street82, Colombo',
    true,
    2
  ),
  (
    '20000000-0000-4000-8000-000000000030',
    'grid',
    'GRID',
    'Technology',
    'Colombo, Sri Lanka',
    'November 2023',
    'from-[#1e3a8a] to-[#1D4ED8]',
    'How GRID replaced six internal tools with one custom platform — and got their whole team to actually use it',
    'A technology consultancy juggling six different SaaS tools for project management, CRM, invoicing, HR, inventory, and reporting. One custom build. One login. One source of truth.',
    'GRID',
    'A technology consultancy juggling six different SaaS tools for project management, CRM, invoicing, HR, inventory, and reporting. One custom build. One login. One source of truth.',
    'We were paying for six tools and still losing information between them. DocLink built us something that actually connects all the dots. The LKR 490k we spent paid for itself in the first quarter.',
    'Chathura Wickramasinghe',
    'Managing Director, GRID Corp',
    'grid',
    'CW',
    'from-[#1e3a8a] to-[#1D4ED8]',
    'Chathura Wickramasinghe — Managing Director, GRID Corp, Colombo',
    true,
    3
  ),
  (
    '20000000-0000-4000-8000-000000000040',
    'a-design',
    'A-Design',
    'Interior Design',
    'Colombo, Sri Lanka',
    'June 2023',
    'from-[#1D4ED8] to-[#0284c7]',
    'How A-Design went from a single project management build to an ongoing Phase 2 retainer — and hasn''t lost an invoice since',
    'A boutique interior design studio tracking 12 active projects, 38 clients, and LKR 4.8M in annual revenue — all without losing a single invoice or missing a deadline.',
    'A-Design',
    'A boutique interior design studio tracking 12 active projects, 38 clients, and LKR 4.8M in annual revenue — all without losing a single invoice or missing a deadline.',
    'We found LKR 280,000 in unpaid invoices in the first month. That alone paid for the entire Phase 1 build. But what keeps us on retainer is that the system keeps getting better — it''s not a one-time project, it''s a tool that grows with us.',
    'Amara Perera',
    'Principal Designer & Founder, A-Design Studio',
    'a-design',
    'AP',
    'from-[#1D4ED8] to-[#0284c7]',
    'Amara Perera — Founder, A-Design Studio, Colombo',
    true,
    4
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.case_study_stats (id, case_study_id, number, label, sort_order) VALUES
  ('20000000-0000-4000-8000-000000000201', '20000000-0000-4000-8000-000000000010', '300', 'employees on automated payroll', 1),
  ('20000000-0000-4000-8000-000000000202', '20000000-0000-4000-8000-000000000010', '200 hrs', 'saved per month, across HR and finance', 2),
  ('20000000-0000-4000-8000-000000000203', '20000000-0000-4000-8000-000000000010', 'LKR 0', 'in payroll errors since deployment', 3),
  ('20000000-0000-4000-8000-000000000204', '20000000-0000-4000-8000-000000000010', '3 wks', 'from kickoff to go-live', 4),
  ('20000000-0000-4000-8000-000000000221', '20000000-0000-4000-8000-000000000020', '94%', 'reduction in inventory counting errors', 1),
  ('20000000-0000-4000-8000-000000000222', '20000000-0000-4000-8000-000000000020', '3 wks', 'from first call to fully live across all branches', 2),
  ('20000000-0000-4000-8000-000000000223', '20000000-0000-4000-8000-000000000020', '3', 'branches on real-time shared inventory', 3),
  ('20000000-0000-4000-8000-000000000224', '20000000-0000-4000-8000-000000000020', '1,248', 'SKUs now tracked without a single spreadsheet', 4),
  ('20000000-0000-4000-8000-000000000231', '20000000-0000-4000-8000-000000000030', '6', 'separate tools replaced by one platform', 1),
  ('20000000-0000-4000-8000-000000000232', '20000000-0000-4000-8000-000000000030', 'LKR 490k', 'total build cost for all six modules', 2),
  ('20000000-0000-4000-8000-000000000233', '20000000-0000-4000-8000-000000000030', '4 mo', 'full delivery including training and handover', 3),
  ('20000000-0000-4000-8000-000000000234', '20000000-0000-4000-8000-000000000030', '28', 'team members active on the system daily', 4),
  ('20000000-0000-4000-8000-000000000241', '20000000-0000-4000-8000-000000000040', '100%', 'of active projects tracked digitally — zero spreadsheets', 1),
  ('20000000-0000-4000-8000-000000000242', '20000000-0000-4000-8000-000000000040', 'LKR 0', 'in invoices lost or uncollected since launch', 2),
  ('20000000-0000-4000-8000-000000000243', '20000000-0000-4000-8000-000000000040', '12', 'concurrent projects managed from one dashboard', 3),
  ('20000000-0000-4000-8000-000000000244', '20000000-0000-4000-8000-000000000040', 'Phase 2', 'ongoing retainer for new modules', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.case_study_sections (id, case_study_id, heading, body, sort_order) VALUES
  (
    '20000000-0000-4000-8000-000000000301',
    '20000000-0000-4000-8000-000000000010',
    'Moving 300 employees off spreadsheet payroll',
    'Before DocLink, Emaar''s HR team maintained a master Excel workbook with 300 rows — one per employee. Every month, the payroll officer spent four to five days cross-referencing attendance logs, updating salaries, calculating EPF and ETF manually, and sending individual payslips by email. Errors were caught after the fact. Corrections were made by hand. The CFO had no real-time view of payroll cost by department.',
    1
  ),
  (
    '20000000-0000-4000-8000-000000000302',
    '20000000-0000-4000-8000-000000000010',
    'Building the system around Emaar''s existing approval flow',
    'The discovery call revealed Emaar had a two-tier approval structure: department heads approved their team''s timesheets by the 25th, the CFO approved the total before release. We built that exact flow into the ERP — no workaround, no approximation. Staff records, pay grades, and tax tables were migrated in week one. By week two, the first test payroll run processed all 300 employees in under 90 seconds.',
    2
  ),
  (
    '20000000-0000-4000-8000-000000000303',
    '20000000-0000-4000-8000-000000000010',
    'Go-live in three weeks, zero payroll interruptions',
    'We ran parallel payrolls for the first two months — the old spreadsheet and the new system side by side — until both figures matched consistently. When Emaar flipped to the new system in full, there was no disruption. Payslips now generate and distribute automatically on the 28th of every month. The payroll officer''s role shifted from data entry to exception handling — exactly as it should be.',
    3
  ),
  (
    '20000000-0000-4000-8000-000000000304',
    '20000000-0000-4000-8000-000000000010',
    'Phase 2: expense management and leave tracking',
    'Six months after the payroll launch, Emaar commissioned Phase 2: an expense claims module with photo-based receipt upload, and a leave management calendar integrated with payroll. Both shipped in four weeks. Emaar is now exploring a self-service employee portal as Phase 3.',
    4
  ),
  (
    '20000000-0000-4000-8000-000000000321',
    '20000000-0000-4000-8000-000000000020',
    'The problem with counting stock by hand across three locations',
    'Street82 runs three retail branches — Colombo 07, Kandy, and Galle. Before DocLink POS, each branch manager kept a physical stock ledger and a separate Excel sheet. End-of-month reconciliation required the owner to collect three files, merge them manually, and spend a weekend chasing discrepancies. Shrinkage was invisible until it was too late. Transfers between branches weren''t tracked consistently.',
    1
  ),
  (
    '20000000-0000-4000-8000-000000000322',
    '20000000-0000-4000-8000-000000000020',
    'Deploying POS across three branches in under three weeks',
    'All 1,248 SKUs were imported from the existing spreadsheets in day one. Hardware — receipt printers and barcode scanners — was installed at each branch by our team. Cashiers were trained in under two hours per location. By the end of week three, all three branches were running live sales through DocLink POS, with inventory syncing across locations in real time.',
    2
  ),
  (
    '20000000-0000-4000-8000-000000000323',
    '20000000-0000-4000-8000-000000000020',
    'From 6% variance to 0.2% — in the first full month',
    'The previous month''s stock count had shown a 6.1% variance — roughly LKR 220,000 in unaccounted stock. The first month on DocLink POS brought that down to 0.2%. The main driver was simple: every sale now deducts from stock automatically. No more end-of-day manual entry, no more missed transactions, no more transfers without a record.',
    3
  ),
  (
    '20000000-0000-4000-8000-000000000324',
    '20000000-0000-4000-8000-000000000020',
    'What the owner can see now that she couldn''t before',
    'The CEO now opens the DocLink dashboard every morning on her phone and sees yesterday''s sales by branch, current stock levels, and which items are approaching reorder. She makes buying decisions on data. She hasn''t physically counted stock since the system launched.',
    4
  ),
  (
    '20000000-0000-4000-8000-000000000331',
    '20000000-0000-4000-8000-000000000030',
    'Building a six-module ERP/CRM system for LKR 490k',
    'GRID came to DocLink with a clear brief: replace Trello, HubSpot, QuickBooks, an HR spreadsheet, a stock sheet, and a Power BI dashboard with a single system that their 28-person team could use from one login. The total budget was LKR 490,000. We scoped six modules — CRM, Project Management, Invoicing, HR, Inventory, and Reporting — and delivered all six within that figure over four months.',
    1
  ),
  (
    '20000000-0000-4000-8000-000000000332',
    '20000000-0000-4000-8000-000000000030',
    'Why six tools become one problem',
    'The issue wasn''t any one tool — it was the gaps between them. A deal won in HubSpot had to be manually entered into Trello as a project. An invoice in QuickBooks had no link to the project it came from. HR data lived in a Google Sheet that only the director could edit. By the time information moved from one tool to another, it was either outdated or wrong. GRID was paying six subscription fees and still losing data.',
    2
  ),
  (
    '20000000-0000-4000-8000-000000000333',
    '20000000-0000-4000-8000-000000000030',
    'Adoption was the real challenge — and the real win',
    'The most common failure mode for enterprise software isn''t the build — it''s adoption. We addressed this by involving three team leads in the design sprint before a line of code was written. They signed off on workflows, named their own modules, and trained their own teams. By go-live, 28 of 30 staff were active users within the first week. The remaining two were onboarded by their peers, not by us.',
    3
  ),
  (
    '20000000-0000-4000-8000-000000000334',
    '20000000-0000-4000-8000-000000000030',
    'Six months on: 34% year-on-year revenue growth, tracked',
    'GRID closed its books for the first time with complete revenue data across all projects. The Reporting module showed a 34% year-on-year increase in invoiced revenue — a number the leadership team had suspected but never been able to confirm. The CRM pipeline, project timelines, and invoicing are now fully linked. When a deal closes, a project is created automatically. When a project hits a milestone, an invoice drafts itself.',
    4
  ),
  (
    '20000000-0000-4000-8000-000000000341',
    '20000000-0000-4000-8000-000000000040',
    'Starting with project management for a 38-client studio',
    'A-Design runs a boutique interior design practice with a small core team and a rotating roster of contractors. Before DocLink, every project was a folder — physical and digital — with no central view of which stage each one was at, which invoices had been sent, or which contractors were still waiting to be paid. The principal designer was spending two hours a week just answering the question: what''s the current status of project X?',
    1
  ),
  (
    '20000000-0000-4000-8000-000000000342',
    '20000000-0000-4000-8000-000000000040',
    'The first phase: project tracking and invoicing',
    'Phase 1 was scoped tightly: a project board showing every active engagement by stage, a client directory, and an invoicing module. Nothing more. We delivered in six weeks. In the first month of use, A-Design found three invoices that had been sent but never followed up — a combined LKR 280,000 that was recovered within 30 days of the system going live.',
    2
  ),
  (
    '20000000-0000-4000-8000-000000000343',
    '20000000-0000-4000-8000-000000000040',
    'From a single project to an ongoing partnership',
    'Three months after Phase 1 launched, A-Design came back. The studio had grown — three new hires, a second location, and a contractor management problem. Phase 2 added a contractor database with linked payment records, a materials procurement tracker, and a client portal where customers could log in and see the live status of their project. Phase 2 shipped over eight weeks, on a monthly retainer that covers ongoing support and feature additions.',
    3
  ),
  (
    '20000000-0000-4000-8000-000000000344',
    '20000000-0000-4000-8000-000000000040',
    'What ongoing retainer actually means',
    'A-Design is now on a monthly support retainer — not for bug fixes, but for active product development. Every month, the principal designer flags two or three new requirements. We prioritise them, build them, and deploy them. The software grows as the business grows. There''s no big-bang upgrade, no migration, no renegotiation. Just a steady, trusted working relationship.',
    4
  )
ON CONFLICT (id) DO NOTHING;
