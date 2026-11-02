import Link from "next/link";
import { getAllCaseStudySummaries, getCaseStudyListing } from "@/lib/cms/caseStudies";
import { getAllProductSummaries, getProductListing } from "@/lib/cms/products";
import { getAllServiceSummaries, getServiceListing } from "@/lib/cms/services";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function AdminDashboardPage() {
  const [productListing, products, serviceListing, services, caseStudyListing, caseStudies] = await Promise.all([
    getProductListing(),
    getAllProductSummaries(),
    getServiceListing(),
    getAllServiceSummaries(),
    getCaseStudyListing(),
    getAllCaseStudySummaries(),
  ]);
  const configured = isSupabaseConfigured();

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          {configured
            ? "Connected to Supabase. Edits go live on the public pages after save."
            : "Supabase is not configured yet — editors will load the current site copy as a fallback."}
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold text-ink">Products</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/admin/products/listing" className="rounded-[16px] border border-line bg-white p-5 hover:border-brand/30">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">Listing</p>
            <h3 className="mt-2 font-display text-xl font-bold text-ink">{productListing.headline}</h3>
            <p className="mt-2 text-sm text-muted">{productListing.subhead}</p>
          </Link>
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/admin/products/${product.slug}`}
              className="rounded-[16px] border border-line bg-white p-5 hover:border-brand/30"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">{product.slug}</p>
                <span className={product.published ? "text-xs font-semibold text-success" : "text-xs font-semibold text-subtle"}>
                  {product.published ? "Published" : "Hidden"}
                </span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold text-ink">{product.name}</h3>
              <p className="mt-2 text-sm text-muted">{product.listingDesc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold text-ink">Services</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/admin/services/listing" className="rounded-[16px] border border-line bg-white p-5 hover:border-brand/30">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">Listing</p>
            <h3 className="mt-2 font-display text-xl font-bold text-ink">{serviceListing.headline}</h3>
            <p className="mt-2 text-sm text-muted">{serviceListing.subhead}</p>
          </Link>
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/admin/services/${service.slug}`}
              className="rounded-[16px] border border-line bg-white p-5 hover:border-brand/30"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">{service.slug}</p>
                <span className={service.published ? "text-xs font-semibold text-success" : "text-xs font-semibold text-subtle"}>
                  {service.published ? "Published" : "Hidden"}
                </span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold text-ink">{service.name}</h3>
              <p className="mt-2 text-sm text-muted">{service.listingDesc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold text-ink">Case Studies</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/admin/case-studies/listing" className="rounded-[16px] border border-line bg-white p-5 hover:border-brand/30">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">Listing</p>
            <h3 className="mt-2 font-display text-xl font-bold text-ink">{caseStudyListing.headline}</h3>
            <p className="mt-2 text-sm text-muted">{caseStudyListing.subhead}</p>
          </Link>
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/admin/case-studies/${study.slug}`}
              className="rounded-[16px] border border-line bg-white p-5 hover:border-brand/30"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">{study.slug}</p>
                <span className={study.published ? "text-xs font-semibold text-success" : "text-xs font-semibold text-subtle"}>
                  {study.published ? "Published" : "Hidden"}
                </span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold text-ink">{study.client}</h3>
              <p className="mt-2 text-sm text-muted">{study.industry}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
