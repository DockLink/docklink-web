import type {
  ContentSide,
  CtaFields,
  ProductDocument,
  ProductFeature,
  ProductListing,
  ProductModule,
  ProductModuleGroup,
  ProductSummary,
  TrustVariant,
} from "./types";
import { CONTENT_SIDES, isProductSlug, TRUST_VARIANTS } from "./types";

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

function asTrust(value: unknown): TrustVariant {
  return TRUST_VARIANTS.includes(value as TrustVariant) ? (value as TrustVariant) : "default";
}

function asCaseStudy(value: unknown): string | null {
  const slug = text(value);
  return slug || null;
}

type DetailBlockRow = {
  id?: unknown;
  caption?: unknown;
  side?: unknown;
  visual_key?: unknown;
  sort_order?: unknown;
};

type DetailRow = {
  id?: unknown;
  title?: unknown;
  sub?: unknown;
  product_module_detail_blocks?: DetailBlockRow[] | null;
};

type ModuleRow = {
  id?: unknown;
  slug?: unknown;
  icon?: unknown;
  name?: unknown;
  benefit?: unknown;
  sort_order?: unknown;
  product_module_details?: DetailRow[] | DetailRow | null;
};

type GroupRow = {
  id?: unknown;
  label?: unknown;
  title?: unknown;
  intro?: unknown;
  columns?: unknown;
  sort_order?: unknown;
  product_modules?: ModuleRow[] | null;
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

export type ProductRow = {
  id?: unknown;
  slug?: unknown;
  name?: unknown;
  icon?: unknown;
  nav_benefit?: unknown;
  listing_desc?: unknown;
  listing_cta?: unknown;
  listing_bg?: unknown;
  seo_title?: unknown;
  seo_description?: unknown;
  eyebrow?: unknown;
  headline?: unknown;
  subhead?: unknown;
  primary_cta_label?: unknown;
  primary_cta_href?: unknown;
  trust_variant?: unknown;
  related_case_study_id?: unknown;
  cta_headline?: unknown;
  cta_sub?: unknown;
  cta_button_label?: unknown;
  cta_href?: unknown;
  published?: unknown;
  sort_order?: unknown;
  updated_at?: unknown;
  product_module_groups?: GroupRow[] | null;
  product_features?: FeatureRow[] | null;
};

export type ListingRow = {
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
    buttonLabel: text(row.cta_button_label, "Book a Demo"),
    href: text(row.cta_href, "/contact"),
  };
}

function mapDetail(row: DetailRow | null | undefined) {
  if (!row?.id) return null;
  const blocks = (row.product_module_detail_blocks ?? [])
    .map((block, index) => ({
      id: text(block.id),
      caption: text(block.caption),
      side: asSide(block.side),
      visualKey: text(block.visual_key),
      sortOrder: num(block.sort_order, index + 1),
    }))
    .filter((block) => block.id)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return {
    id: text(row.id),
    title: text(row.title),
    sub: text(row.sub),
    blocks,
  };
}

function mapModule(row: ModuleRow, index: number): ProductModule {
  const details = Array.isArray(row.product_module_details)
    ? row.product_module_details[0]
    : row.product_module_details;
  return {
    id: text(row.id),
    slug: text(row.slug),
    icon: text(row.icon),
    name: text(row.name),
    benefit: text(row.benefit),
    sortOrder: num(row.sort_order, index + 1),
    detail: mapDetail(details),
  };
}

function mapGroup(row: GroupRow, index: number): ProductModuleGroup {
  const modules = (row.product_modules ?? [])
    .map((item, moduleIndex) => mapModule(item, moduleIndex))
    .filter((item) => item.id)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return {
    id: text(row.id),
    label: text(row.label),
    title: text(row.title),
    intro: text(row.intro),
    columns: num(row.columns, 2),
    sortOrder: num(row.sort_order, index + 1),
    modules,
  };
}

function mapFeature(row: FeatureRow, index: number): ProductFeature {
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

export function mapListing(row: ListingRow): ProductListing {
  return {
    seoTitle: text(row.seo_title),
    seoDescription: text(row.seo_description),
    eyebrow: text(row.eyebrow),
    headline: text(row.headline),
    subhead: text(row.subhead),
    cta: ctaFrom(row),
    updatedAt: text(row.updated_at) || undefined,
  };
}

export function mapProductSummary(row: ProductRow): ProductSummary | null {
  const slug = text(row.slug);
  if (!isProductSlug(slug) || !row.id) return null;
  return {
    id: text(row.id),
    slug,
    name: text(row.name),
    icon: text(row.icon),
    navBenefit: text(row.nav_benefit),
    listingDesc: text(row.listing_desc),
    listingCta: text(row.listing_cta),
    listingBg: text(row.listing_bg),
    published: bool(row.published, true),
    sortOrder: num(row.sort_order),
    updatedAt: text(row.updated_at) || undefined,
  };
}

export function mapProduct(row: ProductRow): ProductDocument | null {
  const summary = mapProductSummary(row);
  if (!summary) return null;

  return {
    ...summary,
    seoTitle: text(row.seo_title),
    seoDescription: text(row.seo_description),
    eyebrow: text(row.eyebrow),
    headline: text(row.headline),
    subhead: text(row.subhead),
    primaryCtaLabel: text(row.primary_cta_label, "Book a Demo"),
    primaryCtaHref: text(row.primary_cta_href, "/contact"),
    trustVariant: asTrust(row.trust_variant),
    relatedCaseStudyId: asCaseStudy(row.related_case_study_id),
    cta: ctaFrom(row),
    moduleGroups: (row.product_module_groups ?? [])
      .map((group, index) => mapGroup(group, index))
      .filter((group) => group.id)
      .sort((a, b) => a.sortOrder - b.sortOrder),
    features: (row.product_features ?? [])
      .map((feature, index) => mapFeature(feature, index))
      .filter((feature) => feature.id)
      .sort((a, b) => a.sortOrder - b.sortOrder),
  };
}

export function listingToRow(listing: ProductListing) {
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

export function productToRow(product: ProductDocument) {
  return {
    slug: product.slug,
    name: product.name,
    icon: product.icon,
    nav_benefit: product.navBenefit,
    listing_desc: product.listingDesc,
    listing_cta: product.listingCta,
    listing_bg: product.listingBg,
    seo_title: product.seoTitle,
    seo_description: product.seoDescription,
    eyebrow: product.eyebrow,
    headline: product.headline,
    subhead: product.subhead,
    primary_cta_label: product.primaryCtaLabel,
    primary_cta_href: product.primaryCtaHref,
    trust_variant: product.trustVariant,
    related_case_study_id: product.relatedCaseStudyId,
    cta_headline: product.cta.headline,
    cta_sub: product.cta.sub,
    cta_button_label: product.cta.buttonLabel,
    cta_href: product.cta.href,
    published: product.published,
    sort_order: product.sortOrder,
  };
}

export const PRODUCT_SELECT = `
  *,
  product_module_groups (
    *,
    product_modules (
      *,
      product_module_details (
        *,
        product_module_detail_blocks (*)
      )
    )
  ),
  product_features (*)
`;
