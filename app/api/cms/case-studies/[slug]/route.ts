import { adminAuthResponse, requireAdminClient } from "@/lib/cms/admin";
import { deleteCaseStudy, getCaseStudyBySlug, saveCaseStudy } from "@/lib/cms/caseStudies";
import { revalidateCaseStudyPages, revalidateProductPages } from "@/lib/cms/revalidate";
import { isValidCaseStudySlug } from "@/lib/cms/types";
import { validateCaseStudy } from "@/lib/cms/validate";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!isValidCaseStudySlug(slug)) {
    return Response.json({ error: "Unknown case study." }, { status: 404 });
  }
  const study = await getCaseStudyBySlug(slug);
  if (!study) {
    return Response.json({ error: "Unknown case study." }, { status: 404 });
  }
  return Response.json(study);
}

export async function PUT(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!isValidCaseStudySlug(slug)) {
    return Response.json({ error: "Unknown case study." }, { status: 404 });
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

  const parsed = validateCaseStudy(slug, body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const study = await saveCaseStudy(supabase, parsed.data);
    revalidateCaseStudyPages(slug);
    revalidateProductPages();
    return Response.json(study);
  } catch (err) {
    console.error("[cms] save case study:", err);
    return Response.json({ error: "Could not save this case study." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!isValidCaseStudySlug(slug)) {
    return Response.json({ error: "Unknown case study." }, { status: 404 });
  }

  const { supabase, error } = await requireAdminClient();
  if (error || !supabase) {
    return adminAuthResponse(error ?? "unauthorized");
  }

  try {
    const deleted = await deleteCaseStudy(supabase, slug);
    if (!deleted) {
      return Response.json({ error: "Unknown case study." }, { status: 404 });
    }
    revalidateCaseStudyPages(slug);
    revalidateProductPages();
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[cms] delete case study:", err);
    return Response.json({ error: "Could not delete this case study." }, { status: 500 });
  }
}
