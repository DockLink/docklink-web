import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isAdminClaims, SUPABASE_NOT_CONFIGURED } from "@/lib/supabase/env";

export type AdminAuthError = "not_configured" | "unauthorized" | "forbidden";

export async function requireAdminClient() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { supabase: null, error: "not_configured" as const };

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    return { supabase: null, error: "unauthorized" as const };
  }
  const sub = typeof data.claims.sub === "string" ? data.claims.sub : "";
  if (!sub || !isAdminClaims(data.claims)) {
    return { supabase: null, error: "forbidden" as const };
  }

  const { data: row, error: userError } = await supabase.from("users").select("role").eq("id", sub).maybeSingle();
  if (userError || row?.role !== "admin") {
    return { supabase: null, error: "forbidden" as const };
  }

  return { supabase, error: null };
}

export function adminAuthResponse(error: AdminAuthError) {
  if (error === "not_configured") {
    return Response.json({ error: SUPABASE_NOT_CONFIGURED }, { status: 503 });
  }
  if (error === "forbidden") {
    return Response.json({ error: "Admin access required." }, { status: 403 });
  }
  return Response.json({ error: "Sign in required." }, { status: 401 });
}
