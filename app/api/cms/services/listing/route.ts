import { adminAuthResponse, requireAdminClient } from "@/lib/cms/admin";
import { revalidateServicePages } from "@/lib/cms/revalidate";
import { getServiceListing, saveServiceListing } from "@/lib/cms/services";
import { validateServiceListing } from "@/lib/cms/validate";

export async function GET() {
  const listing = await getServiceListing();
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

  const parsed = validateServiceListing(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const listing = await saveServiceListing(supabase, parsed.data);
    revalidateServicePages();
    return Response.json(listing);
  } catch (err) {
    console.error("[cms] save service listing:", err);
    return Response.json({ error: "Could not save the listing page." }, { status: 500 });
  }
}
