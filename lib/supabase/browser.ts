import { createBrowserClient } from "@supabase/ssr";

/** True when the public Supabase env vars are present in this build. */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * Returns a Supabase browser client, or `null` when Supabase isn't configured.
 *
 * Returning `null` (instead of throwing) lets the app run in a Supabase-free
 * "guest / demo" mode: callers simply skip auth + remote progress and fall back
 * to local storage. Always null-check the result before use.
 */
export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  // Use the SSR helper so auth persists via cookies (server routes can read the session).
  return createBrowserClient(url, anonKey);
}
