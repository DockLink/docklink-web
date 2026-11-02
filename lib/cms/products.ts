import type { SupabaseClient } from "@supabase/supabase-js";
import { defaultListing, defaultProduct, defaultProductSummaries } from "./defaults";
import {
  listingToRow,
  mapListing,
  mapProduct,
  mapProductSummary,
  PRODUCT_SELECT,
  productToRow,
  type ListingRow,
  type ProductRow,
} from "./mappers";
import type { ProductDocument, ProductListing, ProductSlug, ProductSummary } from "./types";
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

export async function getProductListing(): Promise<ProductListing> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return defaultListing();

  try {
    const { data, error } = await supabase.from("product_listing").select("*").eq("id", "default").maybeSingle();
    if (error) throw error;
    if (!data) return defaultListing();
    return mapListing(data as ListingRow);
  } catch (error) {
    logCmsError("getProductListing", error);
    return defaultListing();
  }
}

export async function getPublishedProductSummaries(): Promise<ProductSummary[]> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return defaultProductSummaries().filter((product) => product.published);

  try {
    const { data, error } = await supabase
      .from("products")
      .select("id, slug, name, icon, nav_benefit, listing_desc, listing_cta, listing_bg, published, sort_order, updated_at")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    const mapped = (data ?? [])
      .map((row) => mapProductSummary(row as ProductRow))
      .filter((row): row is ProductSummary => Boolean(row));
    return mapped.length ? mapped : defaultProductSummaries().filter((product) => product.published);
  } catch (error) {
    logCmsError("getPublishedProductSummaries", error);
    return defaultProductSummaries().filter((product) => product.published);
  }
}

export async function getAllProductSummaries(): Promise<ProductSummary[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return defaultProductSummaries();

  try {
    const { data, error } = await supabase
      .from("products")
      .select("id, slug, name, icon, nav_benefit, listing_desc, listing_cta, listing_bg, published, sort_order, updated_at")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    const mapped = (data ?? [])
      .map((row) => mapProductSummary(row as ProductRow))
      .filter((row): row is ProductSummary => Boolean(row));
    return mapped.length ? mapped : defaultProductSummaries();
  } catch (error) {
    logCmsError("getAllProductSummaries", error);
    return defaultProductSummaries();
  }
}

export async function getProductBySlug(slug: ProductSlug): Promise<ProductDocument> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return defaultProduct(slug);

  try {
    const { data, error } = await supabase.from("products").select(PRODUCT_SELECT).eq("slug", slug).maybeSingle();
    if (error) throw error;
    const mapped = data ? mapProduct(data as ProductRow) : null;
    return mapped ?? defaultProduct(slug);
  } catch (error) {
    logCmsError(`getProductBySlug:${slug}`, error);
    return defaultProduct(slug);
  }
}

export async function getProductBySlugForAdmin(slug: ProductSlug): Promise<ProductDocument> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return defaultProduct(slug);

  try {
    const { data, error } = await supabase.from("products").select(PRODUCT_SELECT).eq("slug", slug).maybeSingle();
    if (error) throw error;
    const mapped = data ? mapProduct(data as ProductRow) : null;
    return mapped ?? defaultProduct(slug);
  } catch (error) {
    logCmsError(`getProductBySlugForAdmin:${slug}`, error);
    return defaultProduct(slug);
  }
}

export async function saveListing(supabase: SupabaseClient, listing: ProductListing) {
  const { data, error } = await supabase
    .from("product_listing")
    .upsert(listingToRow(listing), { onConflict: "id" })
    .select("*")
    .single();
  if (error) throw error;
  return mapListing(data as ListingRow);
}

export async function saveProduct(supabase: SupabaseClient, product: ProductDocument) {
  const { error: updateError } = await supabase.from("products").update(productToRow(product)).eq("id", product.id).eq("slug", product.slug);
  if (updateError) throw updateError;

  const { error: deleteFeaturesError } = await supabase.from("product_features").delete().eq("product_id", product.id);
  if (deleteFeaturesError) throw deleteFeaturesError;

  const { error: deleteGroupsError } = await supabase.from("product_module_groups").delete().eq("product_id", product.id);
  if (deleteGroupsError) throw deleteGroupsError;

  if (product.moduleGroups.length) {
    const { error: groupsError } = await supabase.from("product_module_groups").insert(
      product.moduleGroups.map((group) => ({
        id: group.id,
        product_id: product.id,
        label: group.label,
        title: group.title,
        intro: group.intro,
        columns: group.columns,
        sort_order: group.sortOrder,
      })),
    );
    if (groupsError) throw groupsError;

    const modules = product.moduleGroups.flatMap((group) =>
      group.modules.map((item) => ({
        id: item.id,
        group_id: group.id,
        slug: item.slug,
        icon: item.icon,
        name: item.name,
        benefit: item.benefit,
        sort_order: item.sortOrder,
      })),
    );
    if (modules.length) {
      const { error: modulesError } = await supabase.from("product_modules").insert(modules);
      if (modulesError) throw modulesError;
    }

    const details = product.moduleGroups.flatMap((group) =>
      group.modules
        .filter((item) => item.detail)
        .map((item) => ({
          id: item.detail!.id,
          module_id: item.id,
          title: item.detail!.title,
          sub: item.detail!.sub,
        })),
    );
    if (details.length) {
      const { error: detailsError } = await supabase.from("product_module_details").insert(details);
      if (detailsError) throw detailsError;
    }

    const blocks = product.moduleGroups.flatMap((group) =>
      group.modules.flatMap((item) =>
        (item.detail?.blocks ?? []).map((block) => ({
          id: block.id,
          detail_id: item.detail!.id,
          caption: block.caption,
          side: block.side,
          visual_key: block.visualKey,
          sort_order: block.sortOrder,
        })),
      ),
    );
    if (blocks.length) {
      const { error: blocksError } = await supabase.from("product_module_detail_blocks").insert(blocks);
      if (blocksError) throw blocksError;
    }
  }

  if (product.features.length) {
    const { error: featuresError } = await supabase.from("product_features").insert(
      product.features.map((feature) => ({
        id: feature.id,
        product_id: product.id,
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

  const { data, error } = await supabase.from("products").select(PRODUCT_SELECT).eq("id", product.id).single();
  if (error) throw error;
  const mapped = mapProduct(data as ProductRow);
  if (!mapped) throw new Error("Saved product could not be read back.");
  return mapped;
}
