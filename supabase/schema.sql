-- DocLink Products + Services + Case Studies CMS
-- Kept as a readable snapshot. Live schema is applied by Prisma:
--   prisma/migrations/0_init/migration.sql
--   prisma/migrations/1_services/migration.sql
--   prisma/migrations/2_case_studies/migration.sql
--   prisma/migrations/3_users/migration.sql
-- Paste this into the Supabase SQL editor only if you are not using Prisma migrate.

create extension if not exists pgcrypto;

-- ─── updated_at ───────────────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ─── users (CMS admin profile; password lives in auth.users) ──────────────────

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  role text not null default 'admin',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at
before update on public.users
for each row execute function public.set_updated_at();

grant select, insert, update, delete on table public.users to authenticated;
grant all on table public.users to service_role;

-- ─── listing (singleton) ──────────────────────────────────────────────────────

create table if not exists public.product_listing (
  id text primary key default 'default' check (id = 'default'),
  seo_title text not null,
  seo_description text not null,
  eyebrow text not null,
  headline text not null,
  subhead text not null,
  cta_headline text not null,
  cta_sub text not null,
  cta_button_label text not null default 'Book a Demo',
  cta_href text not null default '/contact',
  updated_at timestamptz not null default now()
);

drop trigger if exists product_listing_set_updated_at on public.product_listing;
create trigger product_listing_set_updated_at
before update on public.product_listing
for each row execute function public.set_updated_at();

-- ─── products ─────────────────────────────────────────────────────────────────

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug in ('erp', 'pos', 'doctor')),
  name text not null,
  icon text not null,
  nav_benefit text not null default '',
  listing_desc text not null,
  listing_cta text not null,
  listing_bg text not null default '',
  seo_title text not null,
  seo_description text not null,
  eyebrow text not null,
  headline text not null,
  subhead text not null,
  primary_cta_label text not null default 'Book a Demo',
  primary_cta_href text not null default '/contact',
  trust_variant text not null default 'default' check (trust_variant in ('default', 'security')),
  related_case_study_id text,
  cta_headline text not null,
  cta_sub text not null,
  cta_button_label text not null default 'Book a Demo',
  cta_href text not null default '/contact',
  published boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists products_sort_order_idx on public.products (sort_order);

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

-- ─── ERP module groups ────────────────────────────────────────────────────────

create table if not exists public.product_module_groups (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  label text not null,
  title text not null,
  intro text not null,
  columns integer not null default 2,
  sort_order integer not null default 0
);

create index if not exists product_module_groups_product_id_idx
  on public.product_module_groups (product_id);

-- ─── ERP modules ──────────────────────────────────────────────────────────────

create table if not exists public.product_modules (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.product_module_groups (id) on delete cascade,
  slug text not null,
  icon text not null,
  name text not null,
  benefit text not null,
  sort_order integer not null default 0
);

create index if not exists product_modules_group_id_idx
  on public.product_modules (group_id);

-- ─── ERP module details ───────────────────────────────────────────────────────

create table if not exists public.product_module_details (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null unique references public.product_modules (id) on delete cascade,
  title text not null,
  sub text not null
);

create index if not exists product_module_details_module_id_idx
  on public.product_module_details (module_id);

create table if not exists public.product_module_detail_blocks (
  id uuid primary key default gen_random_uuid(),
  detail_id uuid not null references public.product_module_details (id) on delete cascade,
  caption text not null,
  side text not null check (side in ('left', 'right')),
  visual_key text not null default '',
  sort_order integer not null default 0
);

create index if not exists product_module_detail_blocks_detail_id_idx
  on public.product_module_detail_blocks (detail_id);

-- ─── POS / Doctor feature blocks ──────────────────────────────────────────────

create table if not exists public.product_features (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  label text not null,
  title text not null,
  body text not null,
  side text not null check (side in ('left', 'right')),
  visual_key text not null default '',
  sort_order integer not null default 0
);

create index if not exists product_features_product_id_idx
  on public.product_features (product_id);

-- ─── RLS ──────────────────────────────────────────────────────────────────────

create or replace function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.users enable row level security;

drop policy if exists users_self_select on public.users;
create policy users_self_select
  on public.users for select to authenticated
  using (id = auth.uid());

drop policy if exists users_admin_all on public.users;
create policy users_admin_all
  on public.users for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

alter table public.product_listing enable row level security;
alter table public.products enable row level security;
alter table public.product_module_groups enable row level security;
alter table public.product_modules enable row level security;
alter table public.product_module_details enable row level security;
alter table public.product_module_detail_blocks enable row level security;
alter table public.product_features enable row level security;

drop policy if exists product_listing_anon_select on public.product_listing;
create policy product_listing_anon_select
  on public.product_listing for select to anon using (true);

drop policy if exists product_listing_auth_all on public.product_listing;
create policy product_listing_auth_all
  on public.product_listing for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists products_anon_select on public.products;
create policy products_anon_select
  on public.products for select to anon using (published = true);

drop policy if exists products_auth_all on public.products;
create policy products_auth_all
  on public.products for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists product_module_groups_anon_select on public.product_module_groups;
create policy product_module_groups_anon_select
  on public.product_module_groups for select to anon
  using (
    exists (
      select 1 from public.products p
      where p.id = product_id and p.published = true
    )
  );

drop policy if exists product_module_groups_auth_all on public.product_module_groups;
create policy product_module_groups_auth_all
  on public.product_module_groups for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists product_modules_anon_select on public.product_modules;
create policy product_modules_anon_select
  on public.product_modules for select to anon
  using (
    exists (
      select 1
      from public.product_module_groups g
      join public.products p on p.id = g.product_id
      where g.id = group_id and p.published = true
    )
  );

drop policy if exists product_modules_auth_all on public.product_modules;
create policy product_modules_auth_all
  on public.product_modules for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists product_module_details_anon_select on public.product_module_details;
create policy product_module_details_anon_select
  on public.product_module_details for select to anon
  using (
    exists (
      select 1
      from public.product_modules m
      join public.product_module_groups g on g.id = m.group_id
      join public.products p on p.id = g.product_id
      where m.id = module_id and p.published = true
    )
  );

drop policy if exists product_module_details_auth_all on public.product_module_details;
create policy product_module_details_auth_all
  on public.product_module_details for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists product_module_detail_blocks_anon_select on public.product_module_detail_blocks;
create policy product_module_detail_blocks_anon_select
  on public.product_module_detail_blocks for select to anon
  using (
    exists (
      select 1
      from public.product_module_details d
      join public.product_modules m on m.id = d.module_id
      join public.product_module_groups g on g.id = m.group_id
      join public.products p on p.id = g.product_id
      where d.id = detail_id and p.published = true
    )
  );

drop policy if exists product_module_detail_blocks_auth_all on public.product_module_detail_blocks;
create policy product_module_detail_blocks_auth_all
  on public.product_module_detail_blocks for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists product_features_anon_select on public.product_features;
create policy product_features_anon_select
  on public.product_features for select to anon
  using (
    exists (
      select 1 from public.products p
      where p.id = product_id and p.published = true
    )
  );

drop policy if exists product_features_auth_all on public.product_features;
create policy product_features_auth_all
  on public.product_features for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ─── Seed: current live copy ──────────────────────────────────────────────────
-- IDs are stable so re-running does not duplicate rows.

insert into public.product_listing (
  id, seo_title, seo_description, eyebrow, headline, subhead,
  cta_headline, cta_sub, cta_button_label, cta_href
) values (
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
) on conflict (id) do nothing;

insert into public.products (
  id, slug, name, icon, nav_benefit, listing_desc, listing_cta, listing_bg,
  seo_title, seo_description, eyebrow, headline, subhead,
  primary_cta_label, primary_cta_href, trust_variant, related_case_study_id,
  cta_headline, cta_sub, cta_button_label, cta_href, published, sort_order
) values
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
on conflict (slug) do nothing;

insert into public.product_module_groups (id, product_id, label, title, intro, columns, sort_order) values
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
on conflict (id) do nothing;

insert into public.product_modules (id, group_id, slug, icon, name, benefit, sort_order) values
  ('00000000-0000-4000-8000-000000000021', '00000000-0000-4000-8000-000000000010', 'crm', 'crm', 'CRM', 'Never lose a lead', 1),
  ('00000000-0000-4000-8000-000000000022', '00000000-0000-4000-8000-000000000010', 'estimate-generation', 'estimate', 'Estimate Generation', 'Quote in minutes', 2),
  ('00000000-0000-4000-8000-000000000023', '00000000-0000-4000-8000-000000000010', 'invoice-generation', 'invoice', 'Invoice Generation', 'Get paid faster', 3),
  ('00000000-0000-4000-8000-000000000024', '00000000-0000-4000-8000-000000000010', 'accounting', 'accounting', 'Accounting', 'Books close themselves', 4),
  ('00000000-0000-4000-8000-000000000025', '00000000-0000-4000-8000-000000000011', 'inventory-management', 'inventory', 'Inventory Management', 'Always know what you have', 1),
  ('00000000-0000-4000-8000-000000000026', '00000000-0000-4000-8000-000000000011', 'stock-management', 'stock', 'Stock Management', 'Zero-variance counts', 2),
  ('00000000-0000-4000-8000-000000000027', '00000000-0000-4000-8000-000000000011', 'rental-management', 'rental', 'Rental Management', 'Track assets in real time', 3),
  ('00000000-0000-4000-8000-000000000028', '00000000-0000-4000-8000-000000000012', 'hr-management', 'hr', 'HR Management', 'One file per employee', 1),
  ('00000000-0000-4000-8000-000000000029', '00000000-0000-4000-8000-000000000012', 'payroll-management', 'payroll', 'Payroll Management', 'Pay day in one click', 2)
on conflict (id) do nothing;

insert into public.product_module_details (id, module_id, title, sub) values
  ('00000000-0000-4000-8000-000000000031', '00000000-0000-4000-8000-000000000021', 'CRM', 'Every lead, contact, and deal in one place.'),
  ('00000000-0000-4000-8000-000000000032', '00000000-0000-4000-8000-000000000023', 'Invoice Generation', 'From estimate to tax invoice in two clicks.'),
  ('00000000-0000-4000-8000-000000000033', '00000000-0000-4000-8000-000000000024', 'Accounting', 'Real-time books — no month-end panic.'),
  ('00000000-0000-4000-8000-000000000034', '00000000-0000-4000-8000-000000000025', 'Inventory Management', 'Know exactly what you have, where it is, and when it runs out.'),
  ('00000000-0000-4000-8000-000000000035', '00000000-0000-4000-8000-000000000029', 'Payroll Management', 'Run payroll for your entire team in under five minutes.')
on conflict (id) do nothing;

insert into public.product_module_detail_blocks (id, detail_id, caption, side, visual_key, sort_order) values
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
on conflict (id) do nothing;

insert into public.product_features (id, product_id, label, title, body, side, visual_key, sort_order) values
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
on conflict (id) do nothing;

-- ─── Services listing (singleton) ─────────────────────────────────────────────

create table if not exists public.service_listing (
  id text primary key default 'default' check (id = 'default'),
  seo_title text not null,
  seo_description text not null,
  eyebrow text not null,
  headline text not null,
  subhead text not null,
  cta_headline text not null,
  cta_sub text not null,
  cta_button_label text not null default 'Get a Quote',
  cta_href text not null default '/contact',
  updated_at timestamptz not null default now()
);

drop trigger if exists service_listing_set_updated_at on public.service_listing;
create trigger service_listing_set_updated_at
before update on public.service_listing
for each row execute function public.set_updated_at();

create table if not exists public.service_listing_stats (
  id uuid primary key default gen_random_uuid(),
  listing_id text not null default 'default' references public.service_listing (id) on delete cascade,
  value text not null,
  label text not null,
  sort_order integer not null default 0
);

create index if not exists service_listing_stats_listing_id_idx
  on public.service_listing_stats (listing_id);

-- ─── Services ─────────────────────────────────────────────────────────────────

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug in ('software', 'web', 'mobile')),
  name text not null,
  icon text not null,
  flagship boolean not null default false,
  tagline text not null default '',
  listing_desc text not null,
  listing_cta text not null,
  seo_title text not null,
  seo_description text not null,
  eyebrow text not null,
  headline text not null,
  subhead text not null,
  primary_cta_label text not null default 'Get a Quote',
  primary_cta_href text not null default '/contact',
  process_eyebrow text not null,
  process_headline text not null,
  process_sub text not null,
  cta_headline text not null,
  cta_sub text not null,
  cta_button_label text not null default 'Get a Quote',
  cta_href text not null default '/contact',
  published boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists services_sort_order_idx on public.services (sort_order);

drop trigger if exists services_set_updated_at on public.services;
create trigger services_set_updated_at
before update on public.services
for each row execute function public.set_updated_at();

create table if not exists public.service_features (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services (id) on delete cascade,
  label text not null,
  title text not null,
  body text not null,
  side text not null check (side in ('left', 'right')),
  visual_key text not null default '',
  sort_order integer not null default 0
);

create index if not exists service_features_service_id_idx
  on public.service_features (service_id);

create table if not exists public.service_process_steps (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services (id) on delete cascade,
  title text not null,
  sub text not null,
  sort_order integer not null default 0
);

create index if not exists service_process_steps_service_id_idx
  on public.service_process_steps (service_id);

-- ─── Services RLS ─────────────────────────────────────────────────────────────

alter table public.service_listing enable row level security;
alter table public.service_listing_stats enable row level security;
alter table public.services enable row level security;
alter table public.service_features enable row level security;
alter table public.service_process_steps enable row level security;

drop policy if exists service_listing_anon_select on public.service_listing;
create policy service_listing_anon_select
  on public.service_listing for select to anon using (true);

drop policy if exists service_listing_auth_all on public.service_listing;
create policy service_listing_auth_all
  on public.service_listing for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists service_listing_stats_anon_select on public.service_listing_stats;
create policy service_listing_stats_anon_select
  on public.service_listing_stats for select to anon using (true);

drop policy if exists service_listing_stats_auth_all on public.service_listing_stats;
create policy service_listing_stats_auth_all
  on public.service_listing_stats for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists services_anon_select on public.services;
create policy services_anon_select
  on public.services for select to anon using (published = true);

drop policy if exists services_auth_all on public.services;
create policy services_auth_all
  on public.services for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists service_features_anon_select on public.service_features;
create policy service_features_anon_select
  on public.service_features for select to anon
  using (
    exists (
      select 1 from public.services s
      where s.id = service_id and s.published = true
    )
  );

drop policy if exists service_features_auth_all on public.service_features;
create policy service_features_auth_all
  on public.service_features for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists service_process_steps_anon_select on public.service_process_steps;
create policy service_process_steps_anon_select
  on public.service_process_steps for select to anon
  using (
    exists (
      select 1 from public.services s
      where s.id = service_id and s.published = true
    )
  );

drop policy if exists service_process_steps_auth_all on public.service_process_steps;
create policy service_process_steps_auth_all
  on public.service_process_steps for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ─── Seed: current live services copy ─────────────────────────────────────────

insert into public.service_listing (
  id, seo_title, seo_description, eyebrow, headline, subhead,
  cta_headline, cta_sub, cta_button_label, cta_href
) values (
  'default',
  'Services',
  'Custom software, web, and mobile app development from DocLink Technologies.',
  'Our Services',
  'Custom Software, Built Around Your Business',
  'Three disciplines. One team. We build the software your business actually needs — not what fits a pre-packaged template.',
  'Tell us what you need to build.',
  'We''ll come back with a scope, timeline, and price.',
  'Get a Quote',
  '/contact'
) on conflict (id) do nothing;

insert into public.service_listing_stats (id, listing_id, value, label, sort_order) values
  ('10000000-0000-4000-8000-000000000001', 'default', '2–6 wks', 'MVP delivery window', 1),
  ('10000000-0000-4000-8000-000000000002', 'default', '20+', 'Projects delivered', 2),
  ('10000000-0000-4000-8000-000000000003', 'default', '7+', 'Years building software', 3),
  ('10000000-0000-4000-8000-000000000004', 'default', '99.9%', 'Uptime on hosted platforms', 4)
on conflict (id) do nothing;

insert into public.services (
  id, slug, name, icon, flagship, tagline, listing_desc, listing_cta,
  seo_title, seo_description, eyebrow, headline, subhead,
  primary_cta_label, primary_cta_href, process_eyebrow, process_headline, process_sub,
  cta_headline, cta_sub, cta_button_label, cta_href, published, sort_order
) values
  (
    '10000000-0000-4000-8000-000000000010',
    'software',
    'Software Development',
    'software',
    true,
    'Flagship Service',
    'Tailored business systems built from the ground up — no templates, no compromises.',
    'Explore',
    'Software Development',
    'Bespoke systems built around your workflow — DocLink software development.',
    'Software Development',
    'Business Software Built Around How You Actually Work',
    'Not a generic template with your logo on it. A system scoped to your workflow, built from scratch.',
    'Get a Quote',
    '/contact',
    'Our Process',
    'MVP in 2 to 6 Weeks',
    'From first call to working software — a structured process that removes guesswork on both sides.',
    'Let''s build something that actually fits.',
    'Tell us your workflow — we''ll design the system around it.',
    'Get a Quote',
    '/contact',
    true,
    1
  ),
  (
    '10000000-0000-4000-8000-000000000020',
    'web',
    'Web Development',
    'web',
    false,
    '',
    'Modern, SEO-optimized websites that convert visitors into customers.',
    'Explore',
    'Web Development',
    'Sites and apps that actually convert — DocLink web development.',
    'Web Development',
    'A Website That Actually Brings You Customers',
    'Fast, search-optimised, and designed to convert — not just to look good on Behance.',
    'Get a Quote',
    '/contact',
    'Timeline',
    'Live in 2 to 6 Weeks',
    'Depending on scope — a landing page ships in two weeks, a full marketing site in six.',
    'Ready to stop losing customers to a slow website?',
    'We''ll scope and price your project in one call.',
    'Get a Quote',
    '/contact',
    true,
    2
  ),
  (
    '10000000-0000-4000-8000-000000000030',
    'mobile',
    'Mobile App Development',
    'mobile',
    false,
    '',
    'Native and cross-platform apps that put your business in your customers'' pocket.',
    'Explore',
    'Mobile App Development',
    'iOS and Android — one codebase, full native feel.',
    'Mobile App Development',
    'Take Your Business Mobile',
    'iOS and Android — one codebase, native performance, and a UX your team will actually use.',
    'Get a Quote',
    '/contact',
    'Timeline',
    'In Users'' Hands in 6 to 12 Weeks',
    'End-to-end — from first wireframe to App Store approval.',
    'Your business deserves a proper mobile app.',
    'We''ll scope it, price it, and build it end-to-end.',
    'Get a Quote',
    '/contact',
    true,
    3
  )
on conflict (slug) do nothing;

insert into public.service_features (id, service_id, label, title, body, side, visual_key, sort_order) values
  (
    '10000000-0000-4000-8000-000000000101',
    '10000000-0000-4000-8000-000000000010',
    'Custom Workflow Design',
    'Your process. Not someone else''s default.',
    'We map your actual workflow in the discovery session, then build the software around it. No forcing your team to adapt to a system designed for a different kind of business.',
    'left',
    'software-workflow',
    1
  ),
  (
    '10000000-0000-4000-8000-000000000102',
    '10000000-0000-4000-8000-000000000010',
    'Role-based Access & Permissions',
    'Staff see exactly what they need — nothing more.',
    'A granular permissions matrix means your finance team sees financial data, your warehouse team sees stock, and nobody accidentally deletes something critical.',
    'right',
    'software-rbac',
    2
  ),
  (
    '10000000-0000-4000-8000-000000000103',
    '10000000-0000-4000-8000-000000000010',
    'Integrations with Existing Tools',
    'Connects to the software you already run.',
    'We integrate with accounting tools, payment gateways, WhatsApp Business API, Google Workspace, and most REST APIs. We''ve rarely encountered a system we couldn''t connect.',
    'left',
    'software-integrations',
    3
  ),
  (
    '10000000-0000-4000-8000-000000000104',
    '10000000-0000-4000-8000-000000000010',
    'Ongoing Support & Iteration',
    'The relationship doesn''t end at launch.',
    'Most clients stay on a monthly support retainer. We handle bug fixes, performance improvements, and new feature requests — so the software grows as your business does.',
    'right',
    'software-support',
    4
  ),
  (
    '10000000-0000-4000-8000-000000000105',
    '10000000-0000-4000-8000-000000000010',
    'Security-first Architecture',
    'Enterprise-grade protection at SME pricing.',
    'Every system we build ships with encrypted data at rest and in transit, daily automated backups, a full audit log, and role-based access controls. Security isn''t an add-on — it''s the default.',
    'left',
    'software-security',
    5
  ),
  (
    '10000000-0000-4000-8000-000000000201',
    '10000000-0000-4000-8000-000000000020',
    'Technical SEO Foundation',
    'Google finds you before your competitors.',
    'Semantic HTML, structured data, optimised meta tags, auto-generated sitemaps, and canonical URLs wired in from day one — not bolted on after launch.',
    'left',
    'web-seo',
    1
  ),
  (
    '10000000-0000-4000-8000-000000000202',
    '10000000-0000-4000-8000-000000000020',
    'Core Web Vitals',
    'Loads in under two seconds on mobile.',
    'We optimise images, minify assets, and implement code-splitting as standard. Our sites score 90+ on PageSpeed Insights — which Google rewards with higher rankings.',
    'right',
    'web-cwv',
    2
  ),
  (
    '10000000-0000-4000-8000-000000000203',
    '10000000-0000-4000-8000-000000000020',
    'Conversion-focused UX',
    'Visitors become enquiries, not bounces.',
    'We design every page around a single next action — a call, a form, a WhatsApp message. Clear hierarchy, minimal friction, and strategic CTA placement backed by real analytics.',
    'left',
    'web-conversion',
    3
  ),
  (
    '10000000-0000-4000-8000-000000000204',
    '10000000-0000-4000-8000-000000000020',
    'Responsive, Mobile-first Build',
    'Perfect on every screen — by default.',
    'We build mobile-first and test on real devices before handoff. Because 70% of your visitors in Sri Lanka are on a phone, not a desktop.',
    'right',
    'web-responsive',
    4
  ),
  (
    '10000000-0000-4000-8000-000000000301',
    '10000000-0000-4000-8000-000000000030',
    'Native & Cross-platform Builds',
    'One app. Both stores. Half the build cost.',
    'We build with Flutter — Google''s cross-platform framework — which delivers native performance on iOS and Android from a single codebase. You get both platforms without paying twice.',
    'left',
    'mobile-cross-platform',
    1
  ),
  (
    '10000000-0000-4000-8000-000000000302',
    '10000000-0000-4000-8000-000000000030',
    'Polished UI/UX',
    'An app that feels like it belongs on the store.',
    'We follow platform design guidelines — iOS HIG and Material 3 — so the app feels native to each platform. Smooth animations, accessible tap targets, and a visual language that matches your brand.',
    'right',
    'mobile-ui',
    2
  ),
  (
    '10000000-0000-4000-8000-000000000303',
    '10000000-0000-4000-8000-000000000030',
    'Offline-first / Real-time Sync',
    'Works without a signal. Syncs the moment it returns.',
    'Field teams, delivery drivers, and clinicians can''t wait for good WiFi. We build offline-first — data is stored locally and synced automatically the moment connectivity returns, with conflict resolution handled automatically.',
    'left',
    'mobile-offline',
    3
  ),
  (
    '10000000-0000-4000-8000-000000000304',
    '10000000-0000-4000-8000-000000000030',
    'App Store Deployment & Support',
    'Published, rated, and maintained by us.',
    'We handle the entire submission process — developer accounts, store listings, screenshots, privacy policy. And after launch, we manage updates, OS compatibility patches, and review responses on your behalf.',
    'right',
    'mobile-app-stores',
    4
  )
on conflict (id) do nothing;

insert into public.service_process_steps (id, service_id, title, sub, sort_order) values
  ('10000000-0000-4000-8000-000000000111', '10000000-0000-4000-8000-000000000010', 'Discovery', 'We map your workflow, pain points, and must-haves in one focused session.', 1),
  ('10000000-0000-4000-8000-000000000112', '10000000-0000-4000-8000-000000000010', 'Scope & Proposal', 'Fixed-price quote, feature list, and a delivery timeline — in writing.', 2),
  ('10000000-0000-4000-8000-000000000113', '10000000-0000-4000-8000-000000000010', 'Build', 'Agile sprints, weekly demos, and a shared Slack channel.', 3),
  ('10000000-0000-4000-8000-000000000114', '10000000-0000-4000-8000-000000000010', 'Test', 'UAT with your team on real data before anything goes live.', 4),
  ('10000000-0000-4000-8000-000000000115', '10000000-0000-4000-8000-000000000010', 'Launch', 'Deployment, staff training, and a go-live checklist.', 5),
  ('10000000-0000-4000-8000-000000000116', '10000000-0000-4000-8000-000000000010', 'Support', 'Ongoing retainer for updates, features, and incidents.', 6),
  ('10000000-0000-4000-8000-000000000211', '10000000-0000-4000-8000-000000000020', 'Discovery', 'Goals, audience, pages', 1),
  ('10000000-0000-4000-8000-000000000212', '10000000-0000-4000-8000-000000000020', 'Design', 'Wireframes & visual design', 2),
  ('10000000-0000-4000-8000-000000000213', '10000000-0000-4000-8000-000000000020', 'Build', 'Coded, tested, optimised', 3),
  ('10000000-0000-4000-8000-000000000214', '10000000-0000-4000-8000-000000000020', 'Launch', 'Domain, hosting, go live', 4),
  ('10000000-0000-4000-8000-000000000311', '10000000-0000-4000-8000-000000000030', 'Discovery', 'Platform, features, user flows', 1),
  ('10000000-0000-4000-8000-000000000312', '10000000-0000-4000-8000-000000000030', 'Design', 'UI/UX prototypes & sign-off', 2),
  ('10000000-0000-4000-8000-000000000313', '10000000-0000-4000-8000-000000000030', 'Build', 'Flutter codebase, weekly demos', 3),
  ('10000000-0000-4000-8000-000000000314', '10000000-0000-4000-8000-000000000030', 'Test', 'Device testing & UAT', 4),
  ('10000000-0000-4000-8000-000000000315', '10000000-0000-4000-8000-000000000030', 'Submit', 'App Store & Play Store', 5)
on conflict (id) do nothing;

-- ─── Case study listing (singleton) ───────────────────────────────────────────

create table if not exists public.case_study_listing (
  id text primary key default 'default' check (id = 'default'),
  seo_title text not null,
  seo_description text not null,
  eyebrow text not null,
  headline text not null,
  subhead text not null,
  cta_headline text not null,
  cta_sub text not null,
  cta_button_label text not null default 'Book a Consultation',
  cta_href text not null default '/contact',
  updated_at timestamptz not null default now()
);

drop trigger if exists case_study_listing_set_updated_at on public.case_study_listing;
create trigger case_study_listing_set_updated_at
before update on public.case_study_listing
for each row execute function public.set_updated_at();

-- ─── Case studies ─────────────────────────────────────────────────────────────

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
    check (slug not in ('new', 'listing')),
  client text not null,
  industry text not null,
  location text not null,
  date text not null,
  gradient text not null,
  headline text not null,
  subhead text not null,
  seo_title text not null,
  seo_description text not null,
  quote_text text not null,
  quote_name text not null,
  quote_title text not null,
  visual_key text not null default '',
  avatar_initials text not null,
  avatar_color text not null,
  photo_caption text not null,
  published boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists case_studies_sort_order_idx on public.case_studies (sort_order);

drop trigger if exists case_studies_set_updated_at on public.case_studies;
create trigger case_studies_set_updated_at
before update on public.case_studies
for each row execute function public.set_updated_at();

create table if not exists public.case_study_stats (
  id uuid primary key default gen_random_uuid(),
  case_study_id uuid not null references public.case_studies (id) on delete cascade,
  number text not null,
  label text not null,
  sort_order integer not null default 0
);

create index if not exists case_study_stats_case_study_id_idx
  on public.case_study_stats (case_study_id);

create table if not exists public.case_study_sections (
  id uuid primary key default gen_random_uuid(),
  case_study_id uuid not null references public.case_studies (id) on delete cascade,
  heading text not null,
  body text not null,
  sort_order integer not null default 0
);

create index if not exists case_study_sections_case_study_id_idx
  on public.case_study_sections (case_study_id);

-- ─── Case studies RLS ─────────────────────────────────────────────────────────

alter table public.case_study_listing enable row level security;
alter table public.case_studies enable row level security;
alter table public.case_study_stats enable row level security;
alter table public.case_study_sections enable row level security;

drop policy if exists case_study_listing_anon_select on public.case_study_listing;
create policy case_study_listing_anon_select
  on public.case_study_listing for select to anon using (true);

drop policy if exists case_study_listing_auth_all on public.case_study_listing;
create policy case_study_listing_auth_all
  on public.case_study_listing for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists case_studies_anon_select on public.case_studies;
create policy case_studies_anon_select
  on public.case_studies for select to anon using (published = true);

drop policy if exists case_studies_auth_all on public.case_studies;
create policy case_studies_auth_all
  on public.case_studies for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists case_study_stats_anon_select on public.case_study_stats;
create policy case_study_stats_anon_select
  on public.case_study_stats for select to anon
  using (
    exists (
      select 1 from public.case_studies cs
      where cs.id = case_study_id and cs.published = true
    )
  );

drop policy if exists case_study_stats_auth_all on public.case_study_stats;
create policy case_study_stats_auth_all
  on public.case_study_stats for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists case_study_sections_anon_select on public.case_study_sections;
create policy case_study_sections_anon_select
  on public.case_study_sections for select to anon
  using (
    exists (
      select 1 from public.case_studies cs
      where cs.id = case_study_id and cs.published = true
    )
  );

drop policy if exists case_study_sections_auth_all on public.case_study_sections;
create policy case_study_sections_auth_all
  on public.case_study_sections for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ─── Case studies seed (same as prisma/migrations/2_case_studies/migration.sql) ─
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
