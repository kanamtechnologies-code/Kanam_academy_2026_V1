import { createClient } from "@supabase/supabase-js";

/**
 * Re-sends the Supabase "Confirm signup" email for an unconfirmed user.
 *
 * Requires Authentication → Providers → Email → "Confirm email" enabled.
 * Default Supabase mailer is capped (~2 emails/hour/recipient) — configure
 * custom SMTP for production (Project Settings → Authentication → SMTP).
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
    const raw = error.message || "Could not send confirmation email.";
    if (/rate limit|over_email_send_rate_limit/i.test(raw)) {
      return {
        ok: false,
        error:
          "Email rate limit hit. Wait up to an hour on Supabase’s free mailer, check spam, or enable custom SMTP in Supabase.",
      };
    }
    return { ok: false, error: raw };
  }
  return { ok: true };
}
