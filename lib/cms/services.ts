import type { SupabaseClient } from "@supabase/supabase-js";
import { defaultService, defaultServiceListing, defaultServiceSummaries } from "./serviceDefaults";
import {
  mapService,
  mapServiceListing,
  mapServiceSummary,
  SERVICE_LISTING_SELECT,
  SERVICE_SELECT,
  serviceListingToRow,
  serviceToRow,
  type ServiceListingRow,
  type ServiceRow,
} from "./serviceMappers";
import type { ServiceDocument, ServiceListing, ServiceSlug, ServiceSummary } from "./types";
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

export async function getServiceListing(): Promise<ServiceListing> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return defaultServiceListing();

  try {
    const { data, error } = await supabase
      .from("service_listing")
      .select(SERVICE_LISTING_SELECT)
      .eq("id", "default")
      .maybeSingle();
    if (error) throw error;
    if (!data) return defaultServiceListing();
    return mapServiceListing(data as ServiceListingRow);
  } catch (error) {
    logCmsError("getServiceListing", error);
    return defaultServiceListing();
  }
}

export async function getPublishedServiceSummaries(): Promise<ServiceSummary[]> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return defaultServiceSummaries().filter((service) => service.published);

  try {
    const { data, error } = await supabase
      .from("services")
      .select("id, slug, name, icon, flagship, tagline, listing_desc, listing_cta, published, sort_order, updated_at")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    const mapped = (data ?? [])
      .map((row) => mapServiceSummary(row as ServiceRow))
      .filter((row): row is ServiceSummary => Boolean(row));
    return mapped.length ? mapped : defaultServiceSummaries().filter((service) => service.published);
  } catch (error) {
    logCmsError("getPublishedServiceSummaries", error);
    return defaultServiceSummaries().filter((service) => service.published);
  }
}

export async function getAllServiceSummaries(): Promise<ServiceSummary[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return defaultServiceSummaries();

  try {
    const { data, error } = await supabase
      .from("services")
      .select("id, slug, name, icon, flagship, tagline, listing_desc, listing_cta, published, sort_order, updated_at")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    const mapped = (data ?? [])
      .map((row) => mapServiceSummary(row as ServiceRow))
      .filter((row): row is ServiceSummary => Boolean(row));
    return mapped.length ? mapped : defaultServiceSummaries();
  } catch (error) {
    logCmsError("getAllServiceSummaries", error);
    return defaultServiceSummaries();
  }
}

export async function getServiceBySlug(slug: ServiceSlug): Promise<ServiceDocument> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return defaultService(slug);

  try {
    const { data, error } = await supabase.from("services").select(SERVICE_SELECT).eq("slug", slug).maybeSingle();
    if (error) throw error;
    const mapped = data ? mapService(data as ServiceRow) : null;
    return mapped ?? defaultService(slug);
  } catch (error) {
    logCmsError(`getServiceBySlug:${slug}`, error);
    return defaultService(slug);
  }
}

export async function getServiceBySlugForAdmin(slug: ServiceSlug): Promise<ServiceDocument> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return defaultService(slug);

  try {
    const { data, error } = await supabase.from("services").select(SERVICE_SELECT).eq("slug", slug).maybeSingle();
    if (error) throw error;
    const mapped = data ? mapService(data as ServiceRow) : null;
    return mapped ?? defaultService(slug);
  } catch (error) {
    logCmsError(`getServiceBySlugForAdmin:${slug}`, error);
    return defaultService(slug);
  }
}

export async function saveServiceListing(supabase: SupabaseClient, listing: ServiceListing) {
  const { error: listingError } = await supabase
    .from("service_listing")
    .upsert(serviceListingToRow(listing), { onConflict: "id" });
  if (listingError) throw listingError;

  const { error: deleteError } = await supabase.from("service_listing_stats").delete().eq("listing_id", "default");
  if (deleteError) throw deleteError;

  if (listing.stats.length) {
    const { error: statsError } = await supabase.from("service_listing_stats").insert(
      listing.stats.map((stat) => ({
        id: stat.id,
        listing_id: "default",
        value: stat.value,
        label: stat.label,
        sort_order: stat.sortOrder,
      })),
    );
    if (statsError) throw statsError;
  }

  const { data, error } = await supabase
    .from("service_listing")
    .select(SERVICE_LISTING_SELECT)
    .eq("id", "default")
    .single();
  if (error) throw error;
  return mapServiceListing(data as ServiceListingRow);
}

export async function saveService(supabase: SupabaseClient, service: ServiceDocument) {
  const { error: updateError } = await supabase
    .from("services")
    .update(serviceToRow(service))
    .eq("id", service.id)
    .eq("slug", service.slug);
  if (updateError) throw updateError;

  const { error: deleteFeaturesError } = await supabase.from("service_features").delete().eq("service_id", service.id);
  if (deleteFeaturesError) throw deleteFeaturesError;

  const { error: deleteStepsError } = await supabase.from("service_process_steps").delete().eq("service_id", service.id);
  if (deleteStepsError) throw deleteStepsError;

  if (service.features.length) {
    const { error: featuresError } = await supabase.from("service_features").insert(
      service.features.map((feature) => ({
        id: feature.id,
        service_id: service.id,
        label: feature.label,
        title: feature.title,
        body: feature.body,
        side: feature.side,
        visual_key: feature.visualKey,
        sort_order: feature.sortOrder,
      })),
    );
    if (featuresError) throw featuresError;
  }

  if (service.processSteps.length) {
    const { error: stepsError } = await supabase.from("service_process_steps").insert(
      service.processSteps.map((step) => ({
        id: step.id,
        service_id: service.id,
        title: step.title,
        sub: step.sub,
        sort_order: step.sortOrder,
      })),
    );
    if (stepsError) throw stepsError;
  }

  const { data, error } = await supabase.from("services").select(SERVICE_SELECT).eq("id", service.id).single();
  if (error) throw error;
  const mapped = mapService(data as ServiceRow);
  if (!mapped) throw new Error("Saved service could not be read back.");
  return mapped;
}
