export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
}

export function getSupabaseAnonKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    ""
  );
}

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase() || "";
}

type AuthClaims = {
  email?: unknown;
  app_metadata?: { role?: unknown } | null;
};

export function isAdminClaims(claims: unknown): boolean {
  if (!claims || typeof claims !== "object") return false;

  const { email, app_metadata } = claims as AuthClaims;
  if (app_metadata && typeof app_metadata === "object" && app_metadata.role === "admin") {
    return true;
  }

  const adminEmail = getAdminEmail();
  const claimEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  return Boolean(adminEmail && claimEmail && claimEmail === adminEmail);
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}

export const SUPABASE_NOT_CONFIGURED =
  "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY).";
