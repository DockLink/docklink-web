import type {
  CaseStudyDocument,
  CaseStudyListing,
  CaseStudySection,
  CaseStudyStat,
  CaseStudySummary,
  CtaFields,
} from "./types";
import { isValidCaseStudySlug } from "./types";

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function num(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function bool(value: unknown, fallback = true) {
  return typeof value === "boolean" ? value : fallback;
}

type StatRow = {
  id?: unknown;
  number?: unknown;
  label?: unknown;
  sort_order?: unknown;
};

type SectionRow = {
  id?: unknown;
  heading?: unknown;
  body?: unknown;
  sort_order?: unknown;
};

export type CaseStudyRow = {
  id?: unknown;
  slug?: unknown;
  client?: unknown;
  industry?: unknown;
  location?: unknown;
  date?: unknown;
  gradient?: unknown;
  headline?: unknown;
  subhead?: unknown;
  seo_title?: unknown;
  seo_description?: unknown;
  quote_text?: unknown;
  quote_name?: unknown;
  quote_title?: unknown;
  visual_key?: unknown;
  avatar_initials?: unknown;
  avatar_color?: unknown;
  photo_caption?: unknown;
  published?: unknown;
  sort_order?: unknown;
  updated_at?: unknown;
  case_study_stats?: StatRow[] | null;
  case_study_sections?: SectionRow[] | null;
};

export type CaseStudyListingRow = {
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
    buttonLabel: text(row.cta_button_label, "Book a Consultation"),
    href: text(row.cta_href, "/contact"),
  };
}

function mapStat(row: StatRow, index: number): CaseStudyStat {
  return {
    id: text(row.id),
    number: text(row.number),
    label: text(row.label),
    sortOrder: num(row.sort_order, index + 1),
  };
}

function mapSection(row: SectionRow, index: number): CaseStudySection {
  return {
    id: text(row.id),
    heading: text(row.heading),
    body: text(row.body),
    sortOrder: num(row.sort_order, index + 1),
  };
}

export function mapCaseStudyListing(row: CaseStudyListingRow): CaseStudyListing {
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

export function mapCaseStudySummary(row: CaseStudyRow): CaseStudySummary | null {
  const slug = text(row.slug);
  if (!isValidCaseStudySlug(slug) || !row.id) return null;
  return {
    id: text(row.id),
    slug,
    client: text(row.client),
    industry: text(row.industry),
    location: text(row.location),
    date: text(row.date),
    gradient: text(row.gradient),
    headline: text(row.headline),
    subhead: text(row.subhead),
    published: bool(row.published, true),
    sortOrder: num(row.sort_order),
    stats: (row.case_study_stats ?? [])
      .map((stat, index) => mapStat(stat, index))
      .filter((stat) => stat.id)
      .sort((a, b) => a.sortOrder - b.sortOrder),
    updatedAt: text(row.updated_at) || undefined,
  };
}

export function mapCaseStudy(row: CaseStudyRow): CaseStudyDocument | null {
  const summary = mapCaseStudySummary(row);
  if (!summary) return null;

  return {
    ...summary,
    seoTitle: text(row.seo_title),
    seoDescription: text(row.seo_description),
    quoteText: text(row.quote_text),
    quoteName: text(row.quote_name),
    quoteTitle: text(row.quote_title),
    visualKey: text(row.visual_key),
    avatarInitials: text(row.avatar_initials),
    avatarColor: text(row.avatar_color),
    photoCaption: text(row.photo_caption),
    sections: (row.case_study_sections ?? [])
      .map((section, index) => mapSection(section, index))
      .filter((section) => section.id)
      .sort((a, b) => a.sortOrder - b.sortOrder),
  };
}

export function caseStudyListingToRow(listing: CaseStudyListing) {
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

export function caseStudyToRow(study: CaseStudyDocument) {
  return {
    slug: study.slug,
    client: study.client,
    industry: study.industry,
    location: study.location,
    date: study.date,
    gradient: study.gradient,
    headline: study.headline,
    subhead: study.subhead,
    seo_title: study.seoTitle,
    seo_description: study.seoDescription,
    quote_text: study.quoteText,
    quote_name: study.quoteName,
    quote_title: study.quoteTitle,
    visual_key: study.visualKey,
    avatar_initials: study.avatarInitials,
    avatar_color: study.avatarColor,
    photo_caption: study.photoCaption,
    published: study.published,
    sort_order: study.sortOrder,
  };
}

export const CASE_STUDY_SELECT = `
  *,
  case_study_stats (*),
  case_study_sections (*)
`;

export const CASE_STUDY_SUMMARY_SELECT = `
  id, slug, client, industry, location, date, gradient, headline, subhead,
  published, sort_order, updated_at, case_study_stats (*)
`;

export const CASE_STUDY_LISTING_SELECT = `*`;
