import type { SupabaseClient } from "@supabase/supabase-js";
import {
  blankCaseStudy,
  defaultCaseStudy,
  defaultCaseStudyListing,
  defaultCaseStudySummaries,
} from "./caseStudyDefaults";
import {
  CASE_STUDY_LISTING_SELECT,
  CASE_STUDY_SELECT,
  CASE_STUDY_SUMMARY_SELECT,
  caseStudyListingToRow,
  caseStudyToRow,
  mapCaseStudy,
  mapCaseStudyListing,
  mapCaseStudySummary,
  type CaseStudyListingRow,
  type CaseStudyRow,
} from "./caseStudyMappers";
import type { CaseStudyDocument, CaseStudyListing, CaseStudySummary } from "./types";
import { createPublicSupabaseClient, createServerSupabaseClient } from "@/lib/supabase/server";

function logCmsError(scope: string, error: unknown) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "object" && error && "message" in error
        ? String((error as { message: unknown }).message)
        : String(error);
  console.error(`[cms] ${scope}:`, message);
}

export async function getCaseStudyListing(): Promise<CaseStudyListing> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return defaultCaseStudyListing();

  try {
    const { data, error } = await supabase
      .from("case_study_listing")
      .select(CASE_STUDY_LISTING_SELECT)
      .eq("id", "default")
      .maybeSingle();
    if (error) throw error;
    if (!data) return defaultCaseStudyListing();
    return mapCaseStudyListing(data as CaseStudyListingRow);
  } catch (error) {
    logCmsError("getCaseStudyListing", error);
    return defaultCaseStudyListing();
  }
}

export async function getPublishedCaseStudySummaries(): Promise<CaseStudySummary[]> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return defaultCaseStudySummaries().filter((study) => study.published);

  try {
    const { data, error } = await supabase
      .from("case_studies")
      .select(CASE_STUDY_SUMMARY_SELECT)
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? [])
      .map((row) => mapCaseStudySummary(row as CaseStudyRow))
      .filter((row): row is CaseStudySummary => Boolean(row));
  } catch (error) {
    logCmsError("getPublishedCaseStudySummaries", error);
    return defaultCaseStudySummaries().filter((study) => study.published);
  }
}

export async function getAllCaseStudySummaries(): Promise<CaseStudySummary[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return defaultCaseStudySummaries();

  try {
    const { data, error } = await supabase
      .from("case_studies")
      .select(CASE_STUDY_SUMMARY_SELECT)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? [])
      .map((row) => mapCaseStudySummary(row as CaseStudyRow))
      .filter((row): row is CaseStudySummary => Boolean(row));
  } catch (error) {
    logCmsError("getAllCaseStudySummaries", error);
    return defaultCaseStudySummaries();
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyDocument | null> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return defaultCaseStudy(slug);

  try {
    const { data, error } = await supabase.from("case_studies").select(CASE_STUDY_SELECT).eq("slug", slug).maybeSingle();
    if (error) throw error;
    return data ? mapCaseStudy(data as CaseStudyRow) : null;
  } catch (error) {
    logCmsError(`getCaseStudyBySlug:${slug}`, error);
    return defaultCaseStudy(slug);
  }
}

export async function getCaseStudyBySlugForAdmin(slug: string): Promise<CaseStudyDocument | null> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return defaultCaseStudy(slug);

  try {
    const { data, error } = await supabase.from("case_studies").select(CASE_STUDY_SELECT).eq("slug", slug).maybeSingle();
    if (error) throw error;
    return data ? mapCaseStudy(data as CaseStudyRow) : null;
  } catch (error) {
    logCmsError(`getCaseStudyBySlugForAdmin:${slug}`, error);
    return defaultCaseStudy(slug);
  }
}

function toSummary(study: CaseStudyDocument): CaseStudySummary {
  return {
    id: study.id,
    slug: study.slug,
    client: study.client,
    industry: study.industry,
    location: study.location,
    date: study.date,
    gradient: study.gradient,
    headline: study.headline,
    subhead: study.subhead,
    published: study.published,
    sortOrder: study.sortOrder,
    stats: study.stats,
  };
}

export async function getCaseStudySummaryBySlug(slug: string): Promise<CaseStudySummary | null> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) {
    const fallback = defaultCaseStudy(slug);
    return fallback ? toSummary(fallback) : null;
  }

  try {
    const { data, error } = await supabase
      .from("case_studies")
      .select(CASE_STUDY_SUMMARY_SELECT)
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data ? mapCaseStudySummary(data as CaseStudyRow) : null;
  } catch (error) {
    logCmsError(`getCaseStudySummaryBySlug:${slug}`, error);
    const fallback = defaultCaseStudy(slug);
    return fallback ? toSummary(fallback) : null;
  }
}

export async function getCaseStudySummaryBySlugForAdmin(slug: string): Promise<CaseStudySummary | null> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    const fallback = defaultCaseStudy(slug);
    return fallback ? toSummary(fallback) : null;
  }

  try {
    const { data, error } = await supabase
      .from("case_studies")
      .select(CASE_STUDY_SUMMARY_SELECT)
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data ? mapCaseStudySummary(data as CaseStudyRow) : null;
  } catch (error) {
    logCmsError(`getCaseStudySummaryBySlugForAdmin:${slug}`, error);
    const fallback = defaultCaseStudy(slug);
    return fallback ? toSummary(fallback) : null;
  }
}

export async function saveCaseStudyListing(supabase: SupabaseClient, listing: CaseStudyListing) {
  const { error: listingError } = await supabase
    .from("case_study_listing")
    .upsert(caseStudyListingToRow(listing), { onConflict: "id" });
  if (listingError) throw listingError;

  const { data, error } = await supabase
    .from("case_study_listing")
    .select(CASE_STUDY_LISTING_SELECT)
    .eq("id", "default")
    .single();
  if (error) throw error;
  return mapCaseStudyListing(data as CaseStudyListingRow);
}

async function nextSortOrder(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("case_studies")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (typeof data?.sort_order === "number" ? data.sort_order : 0) + 1;
}

export async function createCaseStudy(supabase: SupabaseClient, input: { slug: string; client: string }) {
  const sortOrder = await nextSortOrder(supabase);
  const study = blankCaseStudy(input.slug, input.client, sortOrder);

  const { error: insertError } = await supabase.from("case_studies").insert({
    id: study.id,
    ...caseStudyToRow(study),
  });
  if (insertError) throw insertError;

  const { data, error } = await supabase.from("case_studies").select(CASE_STUDY_SELECT).eq("id", study.id).single();
  if (error) throw error;
  const mapped = mapCaseStudy(data as CaseStudyRow);
  if (!mapped) throw new Error("Created case study could not be read back.");
  return mapped;
}

async function replaceChildren(supabase: SupabaseClient, study: CaseStudyDocument) {
  const { error: deleteStatsError } = await supabase.from("case_study_stats").delete().eq("case_study_id", study.id);
  if (deleteStatsError) throw deleteStatsError;

  const { error: deleteSectionsError } = await supabase
    .from("case_study_sections")
    .delete()
    .eq("case_study_id", study.id);
  if (deleteSectionsError) throw deleteSectionsError;

  if (study.stats.length) {
    const { error: statsError } = await supabase.from("case_study_stats").insert(
      study.stats.map((stat) => ({
        id: stat.id,
        case_study_id: study.id,
        number: stat.number,
        label: stat.label,
        sort_order: stat.sortOrder,
      })),
    );
    if (statsError) throw statsError;
  }

  if (study.sections.length) {
    const { error: sectionsError } = await supabase.from("case_study_sections").insert(
      study.sections.map((section) => ({
        id: section.id,
        case_study_id: study.id,
        heading: section.heading,
        body: section.body,
        sort_order: section.sortOrder,
      })),
    );
    if (sectionsError) throw sectionsError;
  }
}

export async function saveCaseStudy(supabase: SupabaseClient, study: CaseStudyDocument) {
  const { error: updateError } = await supabase
    .from("case_studies")
    .update(caseStudyToRow(study))
    .eq("id", study.id)
    .eq("slug", study.slug);
  if (updateError) throw updateError;

  await replaceChildren(supabase, study);

  const { data, error } = await supabase.from("case_studies").select(CASE_STUDY_SELECT).eq("id", study.id).single();
  if (error) throw error;
  const mapped = mapCaseStudy(data as CaseStudyRow);
  if (!mapped) throw new Error("Saved case study could not be read back.");
  return mapped;
}

export async function deleteCaseStudy(supabase: SupabaseClient, slug: string) {
  const { error: unlinkError } = await supabase
    .from("products")
    .update({ related_case_study_id: null })
    .eq("related_case_study_id", slug);
  if (unlinkError) throw unlinkError;

  const { data, error } = await supabase.from("case_studies").delete().eq("slug", slug).select("slug").maybeSingle();
  if (error) throw error;
  return Boolean(data);
}
