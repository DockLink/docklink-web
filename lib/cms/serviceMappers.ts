import type {
  ContentSide,
  CtaFields,
  ServiceDocument,
  ServiceFeature,
  ServiceListing,
  ServiceListingStat,
  ServiceProcessStep,
  ServiceSummary,
} from "./types";
import { CONTENT_SIDES, isServiceSlug } from "./types";

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function num(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function bool(value: unknown, fallback = true) {
  return typeof value === "boolean" ? value : fallback;
}

function asSide(value: unknown): ContentSide {
  return CONTENT_SIDES.includes(value as ContentSide) ? (value as ContentSide) : "left";
}

type StatRow = {
  id?: unknown;
  value?: unknown;
  label?: unknown;
  sort_order?: unknown;
};

type FeatureRow = {
  id?: unknown;
  label?: unknown;
  title?: unknown;
  body?: unknown;
  side?: unknown;
  visual_key?: unknown;
  sort_order?: unknown;
};

type StepRow = {
  id?: unknown;
  title?: unknown;
  sub?: unknown;
  sort_order?: unknown;
};

export type ServiceRow = {
  id?: unknown;
  slug?: unknown;
  name?: unknown;
  icon?: unknown;
  flagship?: unknown;
  tagline?: unknown;
  listing_desc?: unknown;
  listing_cta?: unknown;
  seo_title?: unknown;
  seo_description?: unknown;
  eyebrow?: unknown;
  headline?: unknown;
  subhead?: unknown;
  primary_cta_label?: unknown;
  primary_cta_href?: unknown;
  process_eyebrow?: unknown;
  process_headline?: unknown;
  process_sub?: unknown;
  cta_headline?: unknown;
  cta_sub?: unknown;
  cta_button_label?: unknown;
  cta_href?: unknown;
  published?: unknown;
  sort_order?: unknown;
  updated_at?: unknown;
  service_features?: FeatureRow[] | null;
  service_process_steps?: StepRow[] | null;
};

export type ServiceListingRow = {
  seo_title?: unknown;
  seo_description?: unknown;
  eyebrow?: unknown;
  headline?: unknown;
  subhead?: unknown;
  cta_headline?: unknown;
  cta_sub?: unknown;
  cta_button_label?: unknown;
  cta_href?: unknown;
  updated_at?: unknown;
  service_listing_stats?: StatRow[] | null;
};

function ctaFrom(row: {
  cta_headline?: unknown;
  cta_sub?: unknown;
  cta_button_label?: unknown;
  cta_href?: unknown;
}): CtaFields {
  return {
    headline: text(row.cta_headline),
    sub: text(row.cta_sub),
    buttonLabel: text(row.cta_button_label, "Get a Quote"),
    href: text(row.cta_href, "/contact"),
  };
}

function mapStat(row: StatRow, index: number): ServiceListingStat {
  return {
    id: text(row.id),
    value: text(row.value),
    label: text(row.label),
    sortOrder: num(row.sort_order, index + 1),
  };
}

function mapFeature(row: FeatureRow, index: number): ServiceFeature {
  return {
    id: text(row.id),
    label: text(row.label),
    title: text(row.title),
    body: text(row.body),
    side: asSide(row.side),
    visualKey: text(row.visual_key),
    sortOrder: num(row.sort_order, index + 1),
  };
}

function mapStep(row: StepRow, index: number): ServiceProcessStep {
  return {
    id: text(row.id),
    title: text(row.title),
    sub: text(row.sub),
    sortOrder: num(row.sort_order, index + 1),
  };
}

export function mapServiceListing(row: ServiceListingRow): ServiceListing {
  return {
    seoTitle: text(row.seo_title),
    seoDescription: text(row.seo_description),
    eyebrow: text(row.eyebrow),
    headline: text(row.headline),
    subhead: text(row.subhead),
    cta: ctaFrom(row),
    stats: (row.service_listing_stats ?? [])
      .map((stat, index) => mapStat(stat, index))
      .filter((stat) => stat.id)
      .sort((a, b) => a.sortOrder - b.sortOrder),
    updatedAt: text(row.updated_at) || undefined,
  };
}

export function mapServiceSummary(row: ServiceRow): ServiceSummary | null {
  const slug = text(row.slug);
  if (!isServiceSlug(slug) || !row.id) return null;
  return {
    id: text(row.id),
    slug,
    name: text(row.name),
    icon: text(row.icon),
    flagship: bool(row.flagship, false),
    tagline: text(row.tagline),
    listingDesc: text(row.listing_desc),
    listingCta: text(row.listing_cta),
    published: bool(row.published, true),
    sortOrder: num(row.sort_order),
    updatedAt: text(row.updated_at) || undefined,
  };
}

export function mapService(row: ServiceRow): ServiceDocument | null {
  const summary = mapServiceSummary(row);
  if (!summary) return null;

  return {
    ...summary,
    seoTitle: text(row.seo_title),
    seoDescription: text(row.seo_description),
    eyebrow: text(row.eyebrow),
    headline: text(row.headline),
    subhead: text(row.subhead),
    primaryCtaLabel: text(row.primary_cta_label, "Get a Quote"),
    primaryCtaHref: text(row.primary_cta_href, "/contact"),
    processEyebrow: text(row.process_eyebrow),
    processHeadline: text(row.process_headline),
    processSub: text(row.process_sub),
    cta: ctaFrom(row),
    features: (row.service_features ?? [])
      .map((feature, index) => mapFeature(feature, index))
      .filter((feature) => feature.id)
      .sort((a, b) => a.sortOrder - b.sortOrder),
    processSteps: (row.service_process_steps ?? [])
      .map((step, index) => mapStep(step, index))
      .filter((step) => step.id)
      .sort((a, b) => a.sortOrder - b.sortOrder),
  };
}

export function serviceListingToRow(listing: ServiceListing) {
  return {
    id: "default",
    seo_title: listing.seoTitle,
    seo_description: listing.seoDescription,
    eyebrow: listing.eyebrow,
    headline: listing.headline,
    subhead: listing.subhead,
    cta_headline: listing.cta.headline,
    cta_sub: listing.cta.sub,
    cta_button_label: listing.cta.buttonLabel,
    cta_href: listing.cta.href,
  };
}

export function serviceToRow(service: ServiceDocument) {
  return {
    slug: service.slug,
    name: service.name,
    icon: service.icon,
    flagship: service.flagship,
    tagline: service.tagline,
    listing_desc: service.listingDesc,
    listing_cta: service.listingCta,
    seo_title: service.seoTitle,
    seo_description: service.seoDescription,
    eyebrow: service.eyebrow,
    headline: service.headline,
    subhead: service.subhead,
    primary_cta_label: service.primaryCtaLabel,
    primary_cta_href: service.primaryCtaHref,
    process_eyebrow: service.processEyebrow,
    process_headline: service.processHeadline,
    process_sub: service.processSub,
    cta_headline: service.cta.headline,
    cta_sub: service.cta.sub,
    cta_button_label: service.cta.buttonLabel,
    cta_href: service.cta.href,
    published: service.published,
    sort_order: service.sortOrder,
  };
}

export const SERVICE_SELECT = `
  *,
  service_features (*),
  service_process_steps (*)
`;

export const SERVICE_LISTING_SELECT = `
  *,
  service_listing_stats (*)
`;
