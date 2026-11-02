export const PRODUCT_SLUGS = ["erp", "pos", "doctor"] as const;
export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export const TRUST_VARIANTS = ["default", "security"] as const;
export type TrustVariant = (typeof TRUST_VARIANTS)[number];

export const CONTENT_SIDES = ["left", "right"] as const;
export type ContentSide = (typeof CONTENT_SIDES)[number];

export const RESERVED_CASE_STUDY_SLUGS = ["new", "listing"] as const;
export const CASE_STUDY_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type CtaFields = {
  headline: string;
  sub: string;
  buttonLabel: string;
  href: string;
};

export type ProductListing = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  cta: CtaFields;
  updatedAt?: string;
};

export type ProductSummary = {
  id: string;
  slug: ProductSlug;
  name: string;
  icon: string;
  navBenefit: string;
  listingDesc: string;
  listingCta: string;
  listingBg: string;
  published: boolean;
  sortOrder: number;
  updatedAt?: string;
};

export type ModuleDetailBlock = {
  id: string;
  caption: string;
  side: ContentSide;
  visualKey: string;
  sortOrder: number;
};

export type ModuleDetail = {
  id: string;
  title: string;
  sub: string;
  blocks: ModuleDetailBlock[];
};

export type ProductModule = {
  id: string;
  slug: string;
  icon: string;
  name: string;
  benefit: string;
  sortOrder: number;
  detail: ModuleDetail | null;
};

export type ProductModuleGroup = {
  id: string;
  label: string;
  title: string;
  intro: string;
  columns: number;
  sortOrder: number;
  modules: ProductModule[];
};

export type ProductFeature = {
  id: string;
  label: string;
  title: string;
  body: string;
  side: ContentSide;
  visualKey: string;
  sortOrder: number;
};

export type ProductDocument = ProductSummary & {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  trustVariant: TrustVariant;
  relatedCaseStudyId: string | null;
  cta: CtaFields;
  moduleGroups: ProductModuleGroup[];
  features: ProductFeature[];
};

export function isProductSlug(value: string): value is ProductSlug {
  return (PRODUCT_SLUGS as readonly string[]).includes(value);
}

export const SERVICE_SLUGS = ["software", "web", "mobile"] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type ServiceListingStat = {
  id: string;
  value: string;
  label: string;
  sortOrder: number;
};

export type ServiceListing = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  cta: CtaFields;
  stats: ServiceListingStat[];
  updatedAt?: string;
};

export type ServiceSummary = {
  id: string;
  slug: ServiceSlug;
  name: string;
  icon: string;
  flagship: boolean;
  tagline: string;
  listingDesc: string;
  listingCta: string;
  published: boolean;
  sortOrder: number;
  updatedAt?: string;
};

export type ServiceFeature = {
  id: string;
  label: string;
  title: string;
  body: string;
  side: ContentSide;
  visualKey: string;
  sortOrder: number;
};

export type ServiceProcessStep = {
  id: string;
  title: string;
  sub: string;
  sortOrder: number;
};

export type ServiceDocument = ServiceSummary & {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  processEyebrow: string;
  processHeadline: string;
  processSub: string;
  cta: CtaFields;
  features: ServiceFeature[];
  processSteps: ServiceProcessStep[];
};

export function isServiceSlug(value: string): value is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(value);
}

export type CaseStudyListing = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  cta: CtaFields;
  updatedAt?: string;
};

export type CaseStudyStat = {
  id: string;
  number: string;
  label: string;
  sortOrder: number;
};

export type CaseStudySection = {
  id: string;
  heading: string;
  body: string;
  sortOrder: number;
};

export type CaseStudySummary = {
  id: string;
  slug: string;
  client: string;
  industry: string;
  location: string;
  date: string;
  gradient: string;
  headline: string;
  subhead: string;
  published: boolean;
  sortOrder: number;
  stats: CaseStudyStat[];
  updatedAt?: string;
};

export type CaseStudyDocument = CaseStudySummary & {
  seoTitle: string;
  seoDescription: string;
  quoteText: string;
  quoteName: string;
  quoteTitle: string;
  visualKey: string;
  avatarInitials: string;
  avatarColor: string;
  photoCaption: string;
  sections: CaseStudySection[];
};

export function isReservedCaseStudySlug(value: string) {
  return (RESERVED_CASE_STUDY_SLUGS as readonly string[]).includes(value);
}

export function isValidCaseStudySlug(value: string) {
  return CASE_STUDY_SLUG_PATTERN.test(value) && !isReservedCaseStudySlug(value);
}
