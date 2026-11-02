import {
  CONTENT_SIDES,
  isProductSlug,
  isServiceSlug,
  isValidCaseStudySlug,
  TRUST_VARIANTS,
  type CaseStudyDocument,
  type CaseStudyListing,
  type ProductDocument,
  type ProductListing,
  type ProductSlug,
  type ServiceDocument,
  type ServiceListing,
  type ServiceSlug,
} from "./types";

function required(value: unknown, field: string, errors: string[]) {
  if (typeof value !== "string" || !value.trim()) {
    errors.push(`${field} is required.`);
  }
}

function optionalUrlPath(value: unknown, field: string, errors: string[]) {
  if (typeof value !== "string" || !value.trim()) {
    errors.push(`${field} is required.`);
    return;
  }
  if (!value.startsWith("/") && !value.startsWith("http://") && !value.startsWith("https://")) {
    errors.push(`${field} must start with / or http.`);
  }
}

export function validateListing(body: unknown): { ok: true; data: ProductListing } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid listing payload." };
  }
  const input = body as Partial<ProductListing> & { cta?: Partial<ProductListing["cta"]> };
  const errors: string[] = [];
  required(input.seoTitle, "SEO title", errors);
  required(input.seoDescription, "SEO description", errors);
  required(input.eyebrow, "Eyebrow", errors);
  required(input.headline, "Headline", errors);
  required(input.subhead, "Subhead", errors);
  required(input.cta?.headline, "CTA headline", errors);
  required(input.cta?.sub, "CTA subhead", errors);
  required(input.cta?.buttonLabel, "CTA button label", errors);
  optionalUrlPath(input.cta?.href, "CTA link", errors);

  if (errors.length) return { ok: false, error: errors[0] };

  return {
    ok: true,
    data: {
      seoTitle: String(input.seoTitle).trim(),
      seoDescription: String(input.seoDescription).trim(),
      eyebrow: String(input.eyebrow).trim(),
      headline: String(input.headline).trim(),
      subhead: String(input.subhead).trim(),
      cta: {
        headline: String(input.cta?.headline).trim(),
        sub: String(input.cta?.sub).trim(),
        buttonLabel: String(input.cta?.buttonLabel).trim(),
        href: String(input.cta?.href).trim(),
      },
    },
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function validateProduct(
  slug: ProductSlug,
  body: unknown,
): { ok: true; data: ProductDocument } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid product payload." };
  }
  const input = body as Partial<ProductDocument>;
  const errors: string[] = [];

  if (input.slug && input.slug !== slug) {
    return { ok: false, error: "Product slug cannot be changed." };
  }
  if (!isProductSlug(slug)) {
    return { ok: false, error: "Unknown product." };
  }

  required(input.id, "Product id", errors);
  required(input.name, "Name", errors);
  required(input.icon, "Icon", errors);
  required(input.listingDesc, "Listing description", errors);
  required(input.listingCta, "Listing CTA", errors);
  required(input.seoTitle, "SEO title", errors);
  required(input.seoDescription, "SEO description", errors);
  required(input.eyebrow, "Eyebrow", errors);
  required(input.headline, "Headline", errors);
  required(input.subhead, "Subhead", errors);
  required(input.primaryCtaLabel, "Primary CTA label", errors);
  optionalUrlPath(input.primaryCtaHref, "Primary CTA link", errors);
  required(input.cta?.headline, "Bottom CTA headline", errors);
  required(input.cta?.sub, "Bottom CTA subhead", errors);
  required(input.cta?.buttonLabel, "Bottom CTA button", errors);
  optionalUrlPath(input.cta?.href, "Bottom CTA link", errors);

  if (input.trustVariant && !TRUST_VARIANTS.includes(input.trustVariant)) {
    errors.push("Trust variant is invalid.");
  }
  const relatedCaseStudyId =
    typeof input.relatedCaseStudyId === "string" && input.relatedCaseStudyId.trim()
      ? input.relatedCaseStudyId.trim()
      : null;
  if (relatedCaseStudyId && !isValidCaseStudySlug(relatedCaseStudyId)) {
    errors.push("Related case study is invalid.");
  }

  const moduleGroups = Array.isArray(input.moduleGroups) ? input.moduleGroups : [];
  const features = Array.isArray(input.features) ? input.features : [];

  for (const group of moduleGroups) {
    required(group.id, "Module group id", errors);
    required(group.label, "Module group label", errors);
    required(group.title, "Module group title", errors);
    required(group.intro, "Module group intro", errors);
    for (const item of group.modules ?? []) {
      required(item.id, "Module id", errors);
      required(item.name, "Module name", errors);
      required(item.icon, "Module icon", errors);
      required(item.benefit, "Module benefit", errors);
      if (item.detail) {
        required(item.detail.id, "Module detail id", errors);
        required(item.detail.title, "Module detail title", errors);
        required(item.detail.sub, "Module detail subhead", errors);
        for (const block of item.detail.blocks ?? []) {
          required(block.id, "Detail block id", errors);
          required(block.caption, "Detail caption", errors);
          if (!CONTENT_SIDES.includes(block.side)) errors.push("Detail block side is invalid.");
        }
      }
    }
  }

  for (const feature of features) {
    required(feature.id, "Feature id", errors);
    required(feature.label, "Feature label", errors);
    required(feature.title, "Feature title", errors);
    required(feature.body, "Feature body", errors);
    if (!CONTENT_SIDES.includes(feature.side)) errors.push("Feature side is invalid.");
  }

  if (errors.length) return { ok: false, error: errors[0] };

  const data: ProductDocument = {
    id: String(input.id),
    slug,
    name: String(input.name).trim(),
    icon: String(input.icon).trim(),
    navBenefit: String(input.navBenefit ?? "").trim(),
    listingDesc: String(input.listingDesc).trim(),
    listingCta: String(input.listingCta).trim(),
    listingBg: String(input.listingBg ?? "").trim(),
    published: Boolean(input.published),
    sortOrder: Number(input.sortOrder) || 0,
    seoTitle: String(input.seoTitle).trim(),
    seoDescription: String(input.seoDescription).trim(),
    eyebrow: String(input.eyebrow).trim(),
    headline: String(input.headline).trim(),
    subhead: String(input.subhead).trim(),
    primaryCtaLabel: String(input.primaryCtaLabel).trim(),
    primaryCtaHref: String(input.primaryCtaHref).trim(),
    trustVariant: input.trustVariant ?? "default",
    relatedCaseStudyId,
    cta: {
      headline: String(input.cta?.headline).trim(),
      sub: String(input.cta?.sub).trim(),
      buttonLabel: String(input.cta?.buttonLabel).trim(),
      href: String(input.cta?.href).trim(),
    },
    moduleGroups: moduleGroups.map((group, groupIndex) => ({
      id: group.id,
      label: group.label.trim(),
      title: group.title.trim(),
      intro: group.intro.trim(),
      columns: Number(group.columns) || 2,
      sortOrder: Number(group.sortOrder) || groupIndex + 1,
      modules: (group.modules ?? []).map((item, moduleIndex) => ({
        id: item.id,
        slug: item.slug?.trim() || slugify(item.name),
        icon: item.icon.trim(),
        name: item.name.trim(),
        benefit: item.benefit.trim(),
        sortOrder: Number(item.sortOrder) || moduleIndex + 1,
        detail: item.detail
          ? {
              id: item.detail.id,
              title: item.detail.title.trim(),
              sub: item.detail.sub.trim(),
              blocks: (item.detail.blocks ?? []).map((block, blockIndex) => ({
                id: block.id,
                caption: block.caption.trim(),
                side: block.side,
                visualKey: String(block.visualKey ?? "").trim(),
                sortOrder: Number(block.sortOrder) || blockIndex + 1,
              })),
            }
          : null,
      })),
    })),
    features: features.map((feature, index) => ({
      id: feature.id,
      label: feature.label.trim(),
      title: feature.title.trim(),
      body: feature.body.trim(),
      side: feature.side,
      visualKey: String(feature.visualKey ?? "").trim(),
      sortOrder: Number(feature.sortOrder) || index + 1,
    })),
  };

  return { ok: true, data };
}

export function validateServiceListing(
  body: unknown,
): { ok: true; data: ServiceListing } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid listing payload." };
  }
  const input = body as Partial<ServiceListing> & { cta?: Partial<ServiceListing["cta"]> };
  const errors: string[] = [];
  required(input.seoTitle, "SEO title", errors);
  required(input.seoDescription, "SEO description", errors);
  required(input.eyebrow, "Eyebrow", errors);
  required(input.headline, "Headline", errors);
  required(input.subhead, "Subhead", errors);
  required(input.cta?.headline, "CTA headline", errors);
  required(input.cta?.sub, "CTA subhead", errors);
  required(input.cta?.buttonLabel, "CTA button label", errors);
  optionalUrlPath(input.cta?.href, "CTA link", errors);

  const stats = Array.isArray(input.stats) ? input.stats : [];
  for (const stat of stats) {
    required(stat.id, "Stat id", errors);
    required(stat.value, "Stat value", errors);
    required(stat.label, "Stat label", errors);
  }

  if (errors.length) return { ok: false, error: errors[0] };

  return {
    ok: true,
    data: {
      seoTitle: String(input.seoTitle).trim(),
      seoDescription: String(input.seoDescription).trim(),
      eyebrow: String(input.eyebrow).trim(),
      headline: String(input.headline).trim(),
      subhead: String(input.subhead).trim(),
      cta: {
        headline: String(input.cta?.headline).trim(),
        sub: String(input.cta?.sub).trim(),
        buttonLabel: String(input.cta?.buttonLabel).trim(),
        href: String(input.cta?.href).trim(),
      },
      stats: stats.map((stat, index) => ({
        id: stat.id,
        value: stat.value.trim(),
        label: stat.label.trim(),
        sortOrder: Number(stat.sortOrder) || index + 1,
      })),
    },
  };
}

export function validateService(
  slug: ServiceSlug,
  body: unknown,
): { ok: true; data: ServiceDocument } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid service payload." };
  }
  const input = body as Partial<ServiceDocument>;
  const errors: string[] = [];

  if (input.slug && input.slug !== slug) {
    return { ok: false, error: "Service slug cannot be changed." };
  }
  if (!isServiceSlug(slug)) {
    return { ok: false, error: "Unknown service." };
  }

  required(input.id, "Service id", errors);
  required(input.name, "Name", errors);
  required(input.icon, "Icon", errors);
  required(input.listingDesc, "Listing description", errors);
  required(input.listingCta, "Listing CTA", errors);
  required(input.seoTitle, "SEO title", errors);
  required(input.seoDescription, "SEO description", errors);
  required(input.eyebrow, "Eyebrow", errors);
  required(input.headline, "Headline", errors);
  required(input.subhead, "Subhead", errors);
  required(input.primaryCtaLabel, "Primary CTA label", errors);
  optionalUrlPath(input.primaryCtaHref, "Primary CTA link", errors);
  required(input.processEyebrow, "Process eyebrow", errors);
  required(input.processHeadline, "Process headline", errors);
  required(input.processSub, "Process subhead", errors);
  required(input.cta?.headline, "Bottom CTA headline", errors);
  required(input.cta?.sub, "Bottom CTA subhead", errors);
  required(input.cta?.buttonLabel, "Bottom CTA button", errors);
  optionalUrlPath(input.cta?.href, "Bottom CTA link", errors);

  const features = Array.isArray(input.features) ? input.features : [];
  const processSteps = Array.isArray(input.processSteps) ? input.processSteps : [];

  for (const feature of features) {
    required(feature.id, "Feature id", errors);
    required(feature.label, "Feature label", errors);
    required(feature.title, "Feature title", errors);
    required(feature.body, "Feature body", errors);
    if (!CONTENT_SIDES.includes(feature.side)) errors.push("Feature side is invalid.");
  }

  for (const step of processSteps) {
    required(step.id, "Process step id", errors);
    required(step.title, "Process step title", errors);
    required(step.sub, "Process step subhead", errors);
  }

  if (errors.length) return { ok: false, error: errors[0] };

  const data: ServiceDocument = {
    id: String(input.id),
    slug,
    name: String(input.name).trim(),
    icon: String(input.icon).trim(),
    flagship: Boolean(input.flagship),
    tagline: String(input.tagline ?? "").trim(),
    listingDesc: String(input.listingDesc).trim(),
    listingCta: String(input.listingCta).trim(),
    published: Boolean(input.published),
    sortOrder: Number(input.sortOrder) || 0,
    seoTitle: String(input.seoTitle).trim(),
    seoDescription: String(input.seoDescription).trim(),
    eyebrow: String(input.eyebrow).trim(),
    headline: String(input.headline).trim(),
    subhead: String(input.subhead).trim(),
    primaryCtaLabel: String(input.primaryCtaLabel).trim(),
    primaryCtaHref: String(input.primaryCtaHref).trim(),
    processEyebrow: String(input.processEyebrow).trim(),
    processHeadline: String(input.processHeadline).trim(),
    processSub: String(input.processSub).trim(),
    cta: {
      headline: String(input.cta?.headline).trim(),
      sub: String(input.cta?.sub).trim(),
      buttonLabel: String(input.cta?.buttonLabel).trim(),
      href: String(input.cta?.href).trim(),
    },
    features: features.map((feature, index) => ({
      id: feature.id,
      label: feature.label.trim(),
      title: feature.title.trim(),
      body: feature.body.trim(),
      side: feature.side,
      visualKey: String(feature.visualKey ?? "").trim(),
      sortOrder: Number(feature.sortOrder) || index + 1,
    })),
    processSteps: processSteps.map((step, index) => ({
      id: step.id,
      title: step.title.trim(),
      sub: step.sub.trim(),
      sortOrder: Number(step.sortOrder) || index + 1,
    })),
  };

  return { ok: true, data };
}

export function validateCaseStudyListing(
  body: unknown,
): { ok: true; data: CaseStudyListing } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid listing payload." };
  }
  const input = body as Partial<CaseStudyListing> & { cta?: Partial<CaseStudyListing["cta"]> };
  const errors: string[] = [];
  required(input.seoTitle, "SEO title", errors);
  required(input.seoDescription, "SEO description", errors);
  required(input.eyebrow, "Eyebrow", errors);
  required(input.headline, "Headline", errors);
  required(input.subhead, "Subhead", errors);
  required(input.cta?.headline, "CTA headline", errors);
  required(input.cta?.sub, "CTA subhead", errors);
  required(input.cta?.buttonLabel, "CTA button label", errors);
  optionalUrlPath(input.cta?.href, "CTA link", errors);

  if (errors.length) return { ok: false, error: errors[0] };

  return {
    ok: true,
    data: {
      seoTitle: String(input.seoTitle).trim(),
      seoDescription: String(input.seoDescription).trim(),
      eyebrow: String(input.eyebrow).trim(),
      headline: String(input.headline).trim(),
      subhead: String(input.subhead).trim(),
      cta: {
        headline: String(input.cta?.headline).trim(),
        sub: String(input.cta?.sub).trim(),
        buttonLabel: String(input.cta?.buttonLabel).trim(),
        href: String(input.cta?.href).trim(),
      },
    },
  };
}

export function validateCreateCaseStudy(
  body: unknown,
): { ok: true; data: { slug: string; client: string } } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid case study payload." };
  }
  const input = body as { slug?: unknown; client?: unknown };
  const errors: string[] = [];
  required(input.client, "Client", errors);
  required(input.slug, "Slug", errors);
  const slug = typeof input.slug === "string" ? input.slug.trim() : "";
  if (slug && !isValidCaseStudySlug(slug)) {
    errors.push("Slug must be lowercase letters, numbers, and hyphens.");
  }
  if (errors.length) return { ok: false, error: errors[0] };

  return {
    ok: true,
    data: {
      slug,
      client: String(input.client).trim(),
    },
  };
}

export function validateCaseStudy(
  slug: string,
  body: unknown,
): { ok: true; data: CaseStudyDocument } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid case study payload." };
  }
  const input = body as Partial<CaseStudyDocument>;
  const errors: string[] = [];

  if (input.slug && input.slug !== slug) {
    return { ok: false, error: "Case study slug cannot be changed." };
  }
  if (!isValidCaseStudySlug(slug)) {
    return { ok: false, error: "Unknown case study." };
  }

  required(input.id, "Case study id", errors);
  required(input.client, "Client", errors);
  required(input.industry, "Industry", errors);
  required(input.location, "Location", errors);
  required(input.date, "Date", errors);
  required(input.gradient, "Gradient", errors);
  required(input.headline, "Headline", errors);
  required(input.subhead, "Subhead", errors);
  required(input.seoTitle, "SEO title", errors);
  required(input.seoDescription, "SEO description", errors);
  required(input.quoteText, "Quote", errors);
  required(input.quoteName, "Quote name", errors);
  required(input.quoteTitle, "Quote title", errors);
  required(input.avatarInitials, "Avatar initials", errors);
  required(input.avatarColor, "Avatar color", errors);
  required(input.photoCaption, "Photo caption", errors);

  const stats = Array.isArray(input.stats) ? input.stats : [];
  const sections = Array.isArray(input.sections) ? input.sections : [];

  for (const stat of stats) {
    required(stat.id, "Stat id", errors);
    required(stat.number, "Stat number", errors);
    required(stat.label, "Stat label", errors);
  }
  for (const section of sections) {
    required(section.id, "Section id", errors);
    required(section.heading, "Section heading", errors);
    required(section.body, "Section body", errors);
  }

  if (errors.length) return { ok: false, error: errors[0] };

  return {
    ok: true,
    data: {
      id: String(input.id),
      slug,
      client: String(input.client).trim(),
      industry: String(input.industry).trim(),
      location: String(input.location).trim(),
      date: String(input.date).trim(),
      gradient: String(input.gradient).trim(),
      headline: String(input.headline).trim(),
      subhead: String(input.subhead).trim(),
      published: Boolean(input.published),
      sortOrder: Number(input.sortOrder) || 0,
      seoTitle: String(input.seoTitle).trim(),
      seoDescription: String(input.seoDescription).trim(),
      quoteText: String(input.quoteText).trim(),
      quoteName: String(input.quoteName).trim(),
      quoteTitle: String(input.quoteTitle).trim(),
      visualKey: String(input.visualKey ?? "").trim(),
      avatarInitials: String(input.avatarInitials).trim(),
      avatarColor: String(input.avatarColor).trim(),
      photoCaption: String(input.photoCaption).trim(),
      stats: stats.map((stat, index) => ({
        id: stat.id,
        number: stat.number.trim(),
        label: stat.label.trim(),
        sortOrder: Number(stat.sortOrder) || index + 1,
      })),
      sections: sections.map((section, index) => ({
        id: section.id,
        heading: section.heading.trim(),
        body: section.body.trim(),
        sortOrder: Number(section.sortOrder) || index + 1,
      })),
    },
  };
}
