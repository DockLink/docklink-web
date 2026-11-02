-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "product_listing" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "seo_title" TEXT NOT NULL,
    "seo_description" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "subhead" TEXT NOT NULL,
    "cta_headline" TEXT NOT NULL,
    "cta_sub" TEXT NOT NULL,
    "cta_button_label" TEXT NOT NULL DEFAULT 'Book a Demo',
    "cta_href" TEXT NOT NULL DEFAULT '/contact',
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_listing_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "product_listing_id_check" CHECK (id = 'default')
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "nav_benefit" TEXT NOT NULL DEFAULT '',
    "listing_desc" TEXT NOT NULL,
    "listing_cta" TEXT NOT NULL,
    "listing_bg" TEXT NOT NULL DEFAULT '',
    "seo_title" TEXT NOT NULL,
    "seo_description" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "subhead" TEXT NOT NULL,
    "primary_cta_label" TEXT NOT NULL DEFAULT 'Book a Demo',
    "primary_cta_href" TEXT NOT NULL DEFAULT '/contact',
    "trust_variant" TEXT NOT NULL DEFAULT 'default',
    "related_case_study_id" TEXT,
    "cta_headline" TEXT NOT NULL,
    "cta_sub" TEXT NOT NULL,
    "cta_button_label" TEXT NOT NULL DEFAULT 'Book a Demo',
    "cta_href" TEXT NOT NULL DEFAULT '/contact',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "products_slug_check" CHECK (slug IN ('erp', 'pos', 'doctor')),
    CONSTRAINT "products_trust_variant_check" CHECK (trust_variant IN ('default', 'security'))
);

-- CreateTable
CREATE TABLE "product_module_groups" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_id" UUID NOT NULL,
    "label" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "columns" INTEGER NOT NULL DEFAULT 2,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "product_module_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_modules" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "group_id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "benefit" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "product_modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_module_details" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "module_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "sub" TEXT NOT NULL,

    CONSTRAINT "product_module_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_module_detail_blocks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "detail_id" UUID NOT NULL,
    "caption" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "visual_key" TEXT NOT NULL DEFAULT '',
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "product_module_detail_blocks_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "product_module_detail_blocks_side_check" CHECK (side IN ('left', 'right'))
);

-- CreateTable
CREATE TABLE "product_features" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_id" UUID NOT NULL,
    "label" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "visual_key" TEXT NOT NULL DEFAULT '',
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "product_features_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "product_features_side_check" CHECK (side IN ('left', 'right'))
);

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE INDEX "products_sort_order_idx" ON "products"("sort_order");

-- CreateIndex
CREATE INDEX "product_module_groups_product_id_idx" ON "product_module_groups"("product_id");

-- CreateIndex
CREATE INDEX "product_modules_group_id_idx" ON "product_modules"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_module_details_module_id_key" ON "product_module_details"("module_id");

-- CreateIndex
CREATE INDEX "product_module_details_module_id_idx" ON "product_module_details"("module_id");

-- CreateIndex
CREATE INDEX "product_module_detail_blocks_detail_id_idx" ON "product_module_detail_blocks"("detail_id");

-- CreateIndex
CREATE INDEX "product_features_product_id_idx" ON "product_features"("product_id");

-- AddForeignKey
ALTER TABLE "product_module_groups" ADD CONSTRAINT "product_module_groups_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_modules" ADD CONSTRAINT "product_modules_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "product_module_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_module_details" ADD CONSTRAINT "product_module_details_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "product_modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_module_detail_blocks" ADD CONSTRAINT "product_module_detail_blocks_detail_id_fkey" FOREIGN KEY ("detail_id") REFERENCES "product_module_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_features" ADD CONSTRAINT "product_features_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER product_listing_set_updated_at
BEFORE UPDATE ON public.product_listing
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER products_set_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE public.product_listing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_module_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_module_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_module_detail_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY product_listing_anon_select
  ON public.product_listing FOR SELECT TO anon USING (true);

CREATE POLICY product_listing_auth_all
  ON public.product_listing FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY products_anon_select
  ON public.products FOR SELECT TO anon USING (published = true);

CREATE POLICY products_auth_all
  ON public.products FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY product_module_groups_anon_select
  ON public.product_module_groups FOR SELECT TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_id AND p.published = true
    )
  );

CREATE POLICY product_module_groups_auth_all
  ON public.product_module_groups FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY product_modules_anon_select
  ON public.product_modules FOR SELECT TO anon
  USING (
    EXISTS (
      SELECT 1
      FROM public.product_module_groups g
      JOIN public.products p ON p.id = g.product_id
      WHERE g.id = group_id AND p.published = true
    )
  );

CREATE POLICY product_modules_auth_all
  ON public.product_modules FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY product_module_details_anon_select
  ON public.product_module_details FOR SELECT TO anon
  USING (
    EXISTS (
      SELECT 1
      FROM public.product_modules m
      JOIN public.product_module_groups g ON g.id = m.group_id
      JOIN public.products p ON p.id = g.product_id
      WHERE m.id = module_id AND p.published = true
    )
  );

CREATE POLICY product_module_details_auth_all
  ON public.product_module_details FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY product_module_detail_blocks_anon_select
  ON public.product_module_detail_blocks FOR SELECT TO anon
  USING (
    EXISTS (
      SELECT 1
      FROM public.product_module_details d
      JOIN public.product_modules m ON m.id = d.module_id
      JOIN public.product_module_groups g ON g.id = m.group_id
      JOIN public.products p ON p.id = g.product_id
      WHERE d.id = detail_id AND p.published = true
    )
  );

CREATE POLICY product_module_detail_blocks_auth_all
  ON public.product_module_detail_blocks FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY product_features_anon_select
  ON public.product_features FOR SELECT TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_id AND p.published = true
    )
  );

CREATE POLICY product_features_auth_all
  ON public.product_features FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Seed: current live copy
INSERT INTO public.product_listing (
  id, seo_title, seo_description, eyebrow, headline, subhead,
  cta_headline, cta_sub, cta_button_label, cta_href
) VALUES (
  'default',
  'Products',
  'ERP, POS, and Doctor App — business software built for Sri Lankan companies.',
  'Our Products',
  'Software for the Way Your Business Actually Runs',
  'Three products. One ecosystem. Built for Sri Lankan SMEs who''ve outgrown spreadsheets.',
  'Not sure which product fits?',
  'We''ll tell you in 20 minutes — no sales pitch.',
  'Book a Demo',
  '/contact'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (
  id, slug, name, icon, nav_benefit, listing_desc, listing_cta, listing_bg,
  seo_title, seo_description, eyebrow, headline, subhead,
  primary_cta_label, primary_cta_href, trust_variant, related_case_study_id,
  cta_headline, cta_sub, cta_button_label, cta_href, published, sort_order
) VALUES
  (
    '00000000-0000-4000-8000-000000000001',
    'erp',
    'ERP System',
    'erp',
    'Run every department from one screen',
    'All-in-one system for accounting, inventory, HR and payroll',
    'Explore ERP',
    'from-blue-50 to-indigo-50/60',
    'ERP System',
    'Run every department from one screen with DocLink ERP.',
    'ERP System',
    'Stop Running Accounting, Inventory and Payroll on Separate Spreadsheets',
    'One system. Every department. Always in sync.',
    'Book a Demo',
    '/contact',
    'default',
    'emaar',
    'See DocLink ERP in your browser.',
    'Book a 20-minute demo — we''ll show you your exact workflow.',
    'Book a Demo',
    '/contact',
    true,
    1
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    'pos',
    'POS System',
    'pos',
    'Faster billing, smarter inventory',
    'Smart sales and inventory for retail and restaurants',
    'Explore POS',
    'from-sky-50 to-blue-50/60',
    'POS System',
    'Faster billing and smarter inventory with DocLink POS.',
    'POS System',
    'Stop Reconciling Cash Drawers by Hand',
    'Faster billing, live inventory, and end-of-day reports that close themselves.',
    'Book a Demo',
    '/contact',
    'default',
    'street82',
    'See DocLink POS live at your counter.',
    'Book a demo — we''ll show you your actual products in the system.',
    'Book a Demo',
    '/contact',
    true,
    2
  ),
  (
    '00000000-0000-4000-8000-000000000003',
    'doctor',
    'Doctor App',
    'doctor',
    'Your practice in your pocket',
    'Mobile practice management for clinicians',
    'Explore App',
    'from-slate-50 to-blue-50/40',
    'Doctor App',
    'Your practice in your pocket — DocLink Doctor App.',
    'Doctor App',
    'Manage Your Practice From Your Phone',
    'Patient records, appointments, and prescriptions — always with you.',
    'Book a Demo',
    '/contact',
    'security',
    null,
    'See it running on your own device.',
    'Book a demo — we''ll walk you through a live patient workflow.',
    'Book a Demo',
    '/contact',
    true,
    3
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.product_module_groups (id, product_id, label, title, intro, columns, sort_order) VALUES
  (
    '00000000-0000-4000-8000-000000000010',
    '00000000-0000-4000-8000-000000000001',
    'Sales & Money',
    'The full quote-to-cash and books flow.',
    'From the first conversation with a customer to a closed invoice and a balanced ledger — all in one place.',
    4,
    1
  ),
  (
    '00000000-0000-4000-8000-000000000011',
    '00000000-0000-4000-8000-000000000001',
    'Operations',
    'The physical side of your business.',
    'Know what you have, where it is, and what needs reordering — without counting by hand.',
    3,
    2
  ),
  (
    '00000000-0000-4000-8000-000000000012',
    '00000000-0000-4000-8000-000000000001',
    'People',
    'Managing your team.',
    'Employee records, leave tracking, and payroll calculated automatically every month.',
    2,
    3
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.product_modules (id, group_id, slug, icon, name, benefit, sort_order) VALUES
  ('00000000-0000-4000-8000-000000000021', '00000000-0000-4000-8000-000000000010', 'crm', 'crm', 'CRM', 'Never lose a lead', 1),
  ('00000000-0000-4000-8000-000000000022', '00000000-0000-4000-8000-000000000010', 'estimate-generation', 'estimate', 'Estimate Generation', 'Quote in minutes', 2),
  ('00000000-0000-4000-8000-000000000023', '00000000-0000-4000-8000-000000000010', 'invoice-generation', 'invoice', 'Invoice Generation', 'Get paid faster', 3),
  ('00000000-0000-4000-8000-000000000024', '00000000-0000-4000-8000-000000000010', 'accounting', 'accounting', 'Accounting', 'Books close themselves', 4),
  ('00000000-0000-4000-8000-000000000025', '00000000-0000-4000-8000-000000000011', 'inventory-management', 'inventory', 'Inventory Management', 'Always know what you have', 1),
  ('00000000-0000-4000-8000-000000000026', '00000000-0000-4000-8000-000000000011', 'stock-management', 'stock', 'Stock Management', 'Zero-variance counts', 2),
  ('00000000-0000-4000-8000-000000000027', '00000000-0000-4000-8000-000000000011', 'rental-management', 'rental', 'Rental Management', 'Track assets in real time', 3),
  ('00000000-0000-4000-8000-000000000028', '00000000-0000-4000-8000-000000000012', 'hr-management', 'hr', 'HR Management', 'One file per employee', 1),
  ('00000000-0000-4000-8000-000000000029', '00000000-0000-4000-8000-000000000012', 'payroll-management', 'payroll', 'Payroll Management', 'Pay day in one click', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.product_module_details (id, module_id, title, sub) VALUES
  ('00000000-0000-4000-8000-000000000031', '00000000-0000-4000-8000-000000000021', 'CRM', 'Every lead, contact, and deal in one place.'),
  ('00000000-0000-4000-8000-000000000032', '00000000-0000-4000-8000-000000000023', 'Invoice Generation', 'From estimate to tax invoice in two clicks.'),
  ('00000000-0000-4000-8000-000000000033', '00000000-0000-4000-8000-000000000024', 'Accounting', 'Real-time books — no month-end panic.'),
  ('00000000-0000-4000-8000-000000000034', '00000000-0000-4000-8000-000000000025', 'Inventory Management', 'Know exactly what you have, where it is, and when it runs out.'),
  ('00000000-0000-4000-8000-000000000035', '00000000-0000-4000-8000-000000000029', 'Payroll Management', 'Run payroll for your entire team in under five minutes.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.product_module_detail_blocks (id, detail_id, caption, side, visual_key, sort_order) VALUES
  (
    '00000000-0000-4000-8000-000000000041',
    '00000000-0000-4000-8000-000000000031',
    'See every client interaction at a glance — calls, emails, and follow-up tasks all linked to the same record. No more digging through inboxes.',
    'left',
    'erp-crm-pipeline',
    1
  ),
  (
    '00000000-0000-4000-8000-000000000042',
    '00000000-0000-4000-8000-000000000031',
    'Automated follow-up reminders so your sales team closes deals instead of trying to remember who they called last Tuesday.',
    'right',
    'erp-crm-followups',
    2
  ),
  (
    '00000000-0000-4000-8000-000000000043',
    '00000000-0000-4000-8000-000000000032',
    'Convert an approved estimate to a tax-compliant invoice with one click. The system fills in client details, line items, tax, and bank info automatically.',
    'left',
    'erp-invoice',
    1
  ),
  (
    '00000000-0000-4000-8000-000000000044',
    '00000000-0000-4000-8000-000000000033',
    'Every sale, purchase, and payroll run posts to the ledger automatically. Your accountant gets a live trial balance — not a month-end surprise.',
    'left',
    'erp-accounting',
    1
  ),
  (
    '00000000-0000-4000-8000-000000000045',
    '00000000-0000-4000-8000-000000000034',
    'Real-time stock levels across every location. Reorder alerts fire automatically when items fall below your set threshold — before your team notices they''re out.',
    'left',
    'erp-inventory',
    1
  ),
  (
    '00000000-0000-4000-8000-000000000046',
    '00000000-0000-4000-8000-000000000035',
    'Set up employee pay structures once. Every month, the system calculates EPF, ETF, and tax deductions automatically and generates a payslip for each employee.',
    'left',
    'erp-payroll',
    1
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.product_features (id, product_id, label, title, body, side, visual_key, sort_order) VALUES
  (
    '00000000-0000-4000-8000-000000000051',
    '00000000-0000-4000-8000-000000000002',
    'Sales & Order Management',
    'Bill in under 10 seconds, every time.',
    'Search products by name or barcode, add them to the cart, and charge the customer — card, cash, or QR. The receipt prints automatically. No delays, no errors.',
    'left',
    'pos-sales',
    1
  ),
  (
    '00000000-0000-4000-8000-000000000052',
    '00000000-0000-4000-8000-000000000002',
    'Real-time Inventory Sync',
    'Stock updates the moment you sell.',
    'Every sale deducts from stock in real time across every branch. No separate stock-count step, no end-of-day reconciliation. Out-of-stock items go grey automatically.',
    'right',
    'pos-inventory',
    2
  ),
  (
    '00000000-0000-4000-8000-000000000053',
    '00000000-0000-4000-8000-000000000002',
    'Multi-branch Support',
    'Run three branches like they''re one.',
    'Every cashier in every branch shares the same product catalog and pricing. Transfers between branches are logged and visible to the head office in real time.',
    'left',
    'pos-branches',
    3
  ),
  (
    '00000000-0000-4000-8000-000000000054',
    '00000000-0000-4000-8000-000000000002',
    'End-of-Day Reporting',
    'Close the day in two minutes, not two hours.',
    'The system generates your Z-report, cash variance, and sales-by-category breakdown at shift end. Export to PDF for your accountant or push directly to the ERP ledger.',
    'right',
    'pos-eod',
    4
  ),
  (
    '00000000-0000-4000-8000-000000000061',
    '00000000-0000-4000-8000-000000000003',
    'Patient Records',
    'Every patient. Every visit. One tap away.',
    'Complete medical histories, allergies, diagnoses, vitals, and visit notes are stored securely per patient. No paper files to lose, no illegible handwriting to decipher.',
    'left',
    'doctor-records',
    1
  ),
  (
    '00000000-0000-4000-8000-000000000062',
    '00000000-0000-4000-8000-000000000003',
    'Appointment Scheduling',
    'A fully booked calendar, managed in seconds.',
    'Set your availability once. Patients or staff book appointments into open slots — no phone tag, no double-booking. Reminders fire automatically the night before.',
    'right',
    'doctor-appointments',
    2
  ),
  (
    '00000000-0000-4000-8000-000000000063',
    '00000000-0000-4000-8000-000000000003',
    'Prescriptions',
    'Write a prescription in under a minute.',
    'Search your drug formulary, set dosage and duration, and sign digitally. The prescription is sent to the patient''s pharmacy directly — no paper, no lost slips.',
    'left',
    'doctor-prescriptions',
    3
  ),
  (
    '00000000-0000-4000-8000-000000000064',
    '00000000-0000-4000-8000-000000000003',
    'Mobile-first Workflow',
    'Designed to be used on a ward round.',
    'Large touch targets, offline mode when the wifi drops, and a layout that works with one hand. It feels like a consumer app because your time on the ward is too valuable for clunky software.',
    'right',
    'doctor-ward',
    4
  )
ON CONFLICT (id) DO NOTHING;
