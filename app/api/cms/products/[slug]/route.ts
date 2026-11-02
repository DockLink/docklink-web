import { adminAuthResponse, requireAdminClient } from "@/lib/cms/admin";
import { getProductBySlug, saveProduct } from "@/lib/cms/products";
import { revalidateProductPages } from "@/lib/cms/revalidate";
import { isProductSlug } from "@/lib/cms/types";
import { validateProduct } from "@/lib/cms/validate";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!isProductSlug(slug)) {
    return Response.json({ error: "Unknown product." }, { status: 404 });
  }
  const product = await getProductBySlug(slug);
  return Response.json(product);
}

export async function PUT(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!isProductSlug(slug)) {
    return Response.json({ error: "Unknown product." }, { status: 404 });
  }

  const { supabase, error } = await requireAdminClient();
  if (error || !supabase) {
    return adminAuthResponse(error ?? "unauthorized");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = validateProduct(slug, body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const product = await saveProduct(supabase, parsed.data);
    revalidateProductPages();
    return Response.json(product);
  } catch (err) {
    console.error("[cms] save product:", err);
    return Response.json({ error: "Could not save this product." }, { status: 500 });
  }
}
