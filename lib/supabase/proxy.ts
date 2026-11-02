import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAnonKey, getSupabaseUrl, isAdminClaims, isSupabaseConfigured } from "./env";

function copySession(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((cookie) => to.cookies.set(cookie));
  for (const header of ["cache-control", "expires", "pragma"]) {
    const value = from.headers.get(header);
    if (value) to.headers.set(header, value);
  }
  return to;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  if (!isSupabaseConfigured()) {
    return supabaseResponse;
  }

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
        Object.entries(headers).forEach(([key, value]) => {
          supabaseResponse.headers.set(key, value);
        });
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const isAdminUser = isAdminClaims(data?.claims);

  const path = request.nextUrl.pathname;
  const isAdminPath = path.startsWith("/admin");
  const isLogin = path === "/admin/login";

  if (isAdminPath && !isLogin && !isAdminUser) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", path);
    return copySession(supabaseResponse, NextResponse.redirect(url));
  }

  if (isLogin && isAdminUser) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return copySession(supabaseResponse, NextResponse.redirect(url));
  }

  return supabaseResponse;
}
