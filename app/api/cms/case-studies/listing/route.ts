import { adminAuthResponse, requireAdminClient } from "@/lib/cms/admin";
import { getCaseStudyListing, saveCaseStudyListing } from "@/lib/cms/caseStudies";
import { revalidateCaseStudyPages } from "@/lib/cms/revalidate";
import { validateCaseStudyListing } from "@/lib/cms/validate";

export async function GET() {
  const listing = await getCaseStudyListing();
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

  const parsed = validateCaseStudyListing(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const listing = await saveCaseStudyListing(supabase, parsed.data);
    revalidateCaseStudyPages();
    return Response.json(listing);
  } catch (err) {
    console.error("[cms] save case study listing:", err);
    return Response.json({ error: "Could not save the listing page." }, { status: 500 });
  }
}
