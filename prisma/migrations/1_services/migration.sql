-- CreateTable
CREATE TABLE "service_listing" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "seo_title" TEXT NOT NULL,
    "seo_description" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "subhead" TEXT NOT NULL,
    "cta_headline" TEXT NOT NULL,
    "cta_sub" TEXT NOT NULL,
    "cta_button_label" TEXT NOT NULL DEFAULT 'Get a Quote',
    "cta_href" TEXT NOT NULL DEFAULT '/contact',
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_listing_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "service_listing_id_check" CHECK (id = 'default')
);

-- CreateTable
CREATE TABLE "service_listing_stats" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "listing_id" TEXT NOT NULL DEFAULT 'default',
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "service_listing_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "flagship" BOOLEAN NOT NULL DEFAULT false,
    "tagline" TEXT NOT NULL DEFAULT '',
    "listing_desc" TEXT NOT NULL,
    "listing_cta" TEXT NOT NULL,
    "seo_title" TEXT NOT NULL,
    "seo_description" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "subhead" TEXT NOT NULL,
    "primary_cta_label" TEXT NOT NULL DEFAULT 'Get a Quote',
    "primary_cta_href" TEXT NOT NULL DEFAULT '/contact',
    "process_eyebrow" TEXT NOT NULL,
    "process_headline" TEXT NOT NULL,
    "process_sub" TEXT NOT NULL,
    "cta_headline" TEXT NOT NULL,
    "cta_sub" TEXT NOT NULL,
    "cta_button_label" TEXT NOT NULL DEFAULT 'Get a Quote',
    "cta_href" TEXT NOT NULL DEFAULT '/contact',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "services_slug_check" CHECK (slug IN ('software', 'web', 'mobile'))
);

-- CreateTable
CREATE TABLE "service_features" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "service_id" UUID NOT NULL,
    "label" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "visual_key" TEXT NOT NULL DEFAULT '',
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "service_features_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "service_features_side_check" CHECK (side IN ('left', 'right'))
);

-- CreateTable
CREATE TABLE "service_process_steps" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "service_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "service_process_steps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- CreateIndex
CREATE INDEX "services_sort_order_idx" ON "services"("sort_order");

-- CreateIndex
CREATE INDEX "service_listing_stats_listing_id_idx" ON "service_listing_stats"("listing_id");

-- CreateIndex
CREATE INDEX "service_features_service_id_idx" ON "service_features"("service_id");

-- CreateIndex
CREATE INDEX "service_process_steps_service_id_idx" ON "service_process_steps"("service_id");

-- AddForeignKey
ALTER TABLE "service_listing_stats" ADD CONSTRAINT "service_listing_stats_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "service_listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_features" ADD CONSTRAINT "service_features_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_process_steps" ADD CONSTRAINT "service_process_steps_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- updated_at trigger
CREATE TRIGGER service_listing_set_updated_at
BEFORE UPDATE ON public.service_listing
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER services_set_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE public.service_listing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_listing_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_process_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY service_listing_anon_select
  ON public.service_listing FOR SELECT TO anon USING (true);

CREATE POLICY service_listing_auth_all
  ON public.service_listing FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY service_listing_stats_anon_select
  ON public.service_listing_stats FOR SELECT TO anon USING (true);

CREATE POLICY service_listing_stats_auth_all
  ON public.service_listing_stats FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY services_anon_select
  ON public.services FOR SELECT TO anon USING (published = true);

CREATE POLICY services_auth_all
  ON public.services FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY service_features_anon_select
  ON public.service_features FOR SELECT TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.services s
      WHERE s.id = service_id AND s.published = true
    )
  );

CREATE POLICY service_features_auth_all
  ON public.service_features FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY service_process_steps_anon_select
  ON public.service_process_steps FOR SELECT TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.services s
      WHERE s.id = service_id AND s.published = true
    )
  );

CREATE POLICY service_process_steps_auth_all
  ON public.service_process_steps FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Seed: current live copy
INSERT INTO public.service_listing (
  id, seo_title, seo_description, eyebrow, headline, subhead,
  cta_headline, cta_sub, cta_button_label, cta_href
) VALUES (
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
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.service_listing_stats (id, listing_id, value, label, sort_order) VALUES
  ('10000000-0000-4000-8000-000000000001', 'default', '2–6 wks', 'MVP delivery window', 1),
  ('10000000-0000-4000-8000-000000000002', 'default', '20+', 'Projects delivered', 2),
  ('10000000-0000-4000-8000-000000000003', 'default', '7+', 'Years building software', 3),
  ('10000000-0000-4000-8000-000000000004', 'default', '99.9%', 'Uptime on hosted platforms', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.services (
  id, slug, name, icon, flagship, tagline, listing_desc, listing_cta,
  seo_title, seo_description, eyebrow, headline, subhead,
  primary_cta_label, primary_cta_href, process_eyebrow, process_headline, process_sub,
  cta_headline, cta_sub, cta_button_label, cta_href, published, sort_order
) VALUES
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
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.service_features (id, service_id, label, title, body, side, visual_key, sort_order) VALUES
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
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.service_process_steps (id, service_id, title, sub, sort_order) VALUES
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
ON CONFLICT (id) DO NOTHING;
