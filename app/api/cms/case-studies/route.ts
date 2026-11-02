import { adminAuthResponse, requireAdminClient } from "@/lib/cms/admin";
import { createCaseStudy, getPublishedCaseStudySummaries } from "@/lib/cms/caseStudies";
import { revalidateCaseStudyPages } from "@/lib/cms/revalidate";
import { validateCreateCaseStudy } from "@/lib/cms/validate";

export async function GET() {
  const studies = await getPublishedCaseStudySummaries();
  return Response.json(studies);
}

export async function POST(request: Request) {
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

  const parsed = validateCreateCaseStudy(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const study = await createCaseStudy(supabase, parsed.data);
    revalidateCaseStudyPages(study.slug);
    return Response.json(study, { status: 201 });
  } catch (err) {
    const message =
      err && typeof err === "object" && "code" in err && (err as { code?: string }).code === "23505"
        ? "A case study with this slug already exists."
        : "Could not create this case study.";
    if (message.startsWith("A case study")) {
      return Response.json({ error: message }, { status: 409 });
    }
    console.error("[cms] create case study:", err);
    return Response.json({ error: message }, { status: 500 });
  }
}
