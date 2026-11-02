-- Apply-once: restrict CMS writes to the seeded admin (app_metadata.role = 'admin').
-- Run in the Supabase SQL editor or via `supabase db query`.

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

drop policy if exists product_listing_auth_all on public.product_listing;
create policy product_listing_auth_all
  on public.product_listing for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists products_auth_all on public.products;
create policy products_auth_all
  on public.products for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists product_module_groups_auth_all on public.product_module_groups;
create policy product_module_groups_auth_all
  on public.product_module_groups for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists product_modules_auth_all on public.product_modules;
create policy product_modules_auth_all
  on public.product_modules for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists product_module_details_auth_all on public.product_module_details;
create policy product_module_details_auth_all
  on public.product_module_details for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists product_module_detail_blocks_auth_all on public.product_module_detail_blocks;
create policy product_module_detail_blocks_auth_all
  on public.product_module_detail_blocks for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists product_features_auth_all on public.product_features;
create policy product_features_auth_all
  on public.product_features for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists service_listing_auth_all on public.service_listing;
create policy service_listing_auth_all
  on public.service_listing for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists service_listing_stats_auth_all on public.service_listing_stats;
create policy service_listing_stats_auth_all
  on public.service_listing_stats for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists services_auth_all on public.services;
create policy services_auth_all
  on public.services for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists service_features_auth_all on public.service_features;
create policy service_features_auth_all
  on public.service_features for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists service_process_steps_auth_all on public.service_process_steps;
create policy service_process_steps_auth_all
  on public.service_process_steps for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists case_study_listing_auth_all on public.case_study_listing;
create policy case_study_listing_auth_all
  on public.case_study_listing for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists case_studies_auth_all on public.case_studies;
create policy case_studies_auth_all
  on public.case_studies for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists case_study_stats_auth_all on public.case_study_stats;
create policy case_study_stats_auth_all
  on public.case_study_stats for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists case_study_sections_auth_all on public.case_study_sections;
create policy case_study_sections_auth_all
  on public.case_study_sections for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
