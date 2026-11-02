import { adminAuthResponse, requireAdminClient } from "@/lib/cms/admin";
import { revalidateServicePages } from "@/lib/cms/revalidate";
import { getServiceBySlug, saveService } from "@/lib/cms/services";
import { isServiceSlug } from "@/lib/cms/types";
import { validateService } from "@/lib/cms/validate";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!isServiceSlug(slug)) {
    return Response.json({ error: "Unknown service." }, { status: 404 });
  }
  const service = await getServiceBySlug(slug);
  return Response.json(service);
}

export async function PUT(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!isServiceSlug(slug)) {
    return Response.json({ error: "Unknown service." }, { status: 404 });
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

  const parsed = validateService(slug, body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const service = await saveService(supabase, parsed.data);
    revalidateServicePages();
    return Response.json(service);
  } catch (err) {
    console.error("[cms] save service:", err);
    return Response.json({ error: "Could not save this service." }, { status: 500 });
  }
}
