import { adminAuthResponse, requireAdminClient } from "@/lib/cms/admin";
import { getProductListing, saveListing } from "@/lib/cms/products";
import { revalidateProductPages } from "@/lib/cms/revalidate";
import { validateListing } from "@/lib/cms/validate";

export async function GET() {
  const listing = await getProductListing();
  return Response.json(listing);
}

export async function PUT(request: Request) {
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

  const parsed = validateListing(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const listing = await saveListing(supabase, parsed.data);
    revalidateProductPages();
    return Response.json(listing);
  } catch (err) {
    console.error("[cms] save listing:", err);
    return Response.json({ error: "Could not save the listing page." }, { status: 500 });
  }
}
