import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseConfigured } from "./env";

export function createBrowserSupabaseClient() {
  if (!isSupabaseConfigured()) return null;
  return createBrowserClient(getSupabaseUrl(), getSupabaseAnonKey());
}
