import { config } from "dotenv";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

config();
config({ path: ".env.local", override: true });

function requiredEnv(name: string, value: string | undefined) {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) {
    throw new Error(`Missing ${name}. Add it to .env (see .env.example).`);
  }
  return trimmed;
}

function getServiceRoleKey() {
  const secret = process.env.SUPABASE_SECRET_KEY?.trim() || "";
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";
  // Prefer the new secret key when both are set — a leftover JWT from another project
  // would otherwise win and fail Auth Admin with "Invalid API key".
  if (secret.startsWith("sb_secret_")) return secret;
  return secret || serviceRole;
}

function projectRefFromUrl(url: string) {
  try {
    return new URL(url).hostname.split(".")[0] ?? "";
  } catch {
    return "";
  }
}

function jwtClaims(token: string) {
  if (!token.startsWith("eyJ")) return null;
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { ref?: unknown; role?: unknown };
  } catch {
    return null;
  }
}

async function findUserByEmail(
  supabase: SupabaseClient,
  email: string,
) {
  const normalized = email.toLowerCase();
  const perPage = 200;
  let page = 1;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;

    const found = data.users.find((user) => user.email?.toLowerCase() === normalized);
    if (found) return found;
    if (data.users.length < perPage) return null;
    page += 1;
  }
}

async function seed() {
  const url = requiredEnv("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);
  const serviceRoleKey = requiredEnv(
    "SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY)",
    getServiceRoleKey(),
  );
  const email = requiredEnv("ADMIN_EMAIL", process.env.ADMIN_EMAIL).toLowerCase();
  const password = requiredEnv("ADMIN_PASSWORD", process.env.ADMIN_PASSWORD);

  if (password.length < 6) {
    throw new Error("ADMIN_PASSWORD must be at least 6 characters.");
  }

  const urlRef = projectRefFromUrl(url);
  const claims = jwtClaims(serviceRoleKey);
  const keyRef = typeof claims?.ref === "string" ? claims.ref : null;
  if (keyRef && urlRef && keyRef !== urlRef) {
    throw new Error(
      `SUPABASE_SERVICE_ROLE_KEY is for project "${keyRef}", but NEXT_PUBLIC_SUPABASE_URL is "${urlRef}". Copy the secret key (sb_secret_…) or service_role key from that same project: Dashboard → Project Settings → API Keys.`,
    );
  }
  if (claims?.role && claims.role !== "service_role") {
    throw new Error(
      `SUPABASE_SERVICE_ROLE_KEY is a "${String(claims.role)}" key, not service_role. Copy the secret key (sb_secret_…) into SUPABASE_SECRET_KEY, or the service_role key into SUPABASE_SERVICE_ROLE_KEY.`,
    );
  }
  if (serviceRoleKey.startsWith("sb_publishable_")) {
    throw new Error(
      "Seed needs a secret key, not the publishable key. In Dashboard → Project Settings → API Keys, copy the secret key (sb_secret_…) into SUPABASE_SECRET_KEY.",
    );
  }

  const supabase = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const existing = await findUserByEmail(supabase, email);
  const appMetadata = { role: "admin" };

  let userId: string;
  if (existing) {
    const { error } = await supabase.auth.admin.updateUserById(existing.id, {
      password,
      app_metadata: appMetadata,
      email_confirm: true,
    });
    if (error) throw error;
    userId = existing.id;
    console.log(`Updated admin user ${email} (${userId}).`);
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: appMetadata,
    });
    if (error) throw error;
    userId = data.user.id;
    console.log(`Created admin user ${email} (${userId}).`);
  }

  const { error: upsertError } = await supabase.from("users").upsert(
    { id: userId, email, role: "admin" },
    { onConflict: "id" },
  );
  if (upsertError) throw upsertError;
  console.log(`Upserted public.users row for ${email}.`);
}

seed().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Seed failed: ${message}`);
  process.exit(1);
});
