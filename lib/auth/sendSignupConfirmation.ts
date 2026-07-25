import { createClient } from "@supabase/supabase-js";

/**
 * Sends the Supabase "Confirm signup" email for an unconfirmed user
 * (e.g. after admin.createUser with email_confirm: false).
 *
 * Requires Authentication → Providers → Email → "Confirm email" enabled,
 * and Redirect URLs that include /auth/confirm.
 */
export async function sendSignupConfirmationEmail(params: {
  email: string;
  emailRedirectTo: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return { ok: false, error: "Missing Supabase public env vars." };
  }

  const supabase = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: params.email,
    options: { emailRedirectTo: params.emailRedirectTo },
  });

  if (error) {
    return { ok: false, error: error.message || "Could not send confirmation email." };
  }
  return { ok: true };
}
