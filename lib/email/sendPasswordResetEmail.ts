import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

import {
  passwordResetEmailSubject,
  renderPasswordResetEmailHtml,
  renderPasswordResetEmailText,
} from "@/lib/email/passwordResetEmailHtml";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type RequestPasswordResetArgs = {
  email: string;
  appOrigin: string;
};

function getResendClient() {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

function getFromAddress() {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Kanam Academy <onboarding@resend.dev>"
  );
}

/**
 * Sends a TokenHash recovery link via Resend (works across browsers/devices).
 * Never reveals whether the email exists. Falls back to Supabase's built-in
 * reset mailer when RESEND_API_KEY is unset (PKCE / same-browser links).
 */
export async function requestPasswordResetEmail(
  args: RequestPasswordResetArgs
): Promise<{
  ok: true;
  mode: "token_hash" | "supabase_pkce" | "noop";
  /** Only returned in development when Resend is not configured. */
  devResetUrl?: string;
}> {
  const email = args.email.trim().toLowerCase();
  const origin = args.appOrigin.replace(/\/$/, "");
  const redirectTo = `${origin}/welcome/reset-password`;

  const resend = getResendClient();
  const admin = createSupabaseAdminClient();

  const { data, error } = await admin.auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo },
  });

  // Anti-enumeration: unknown users look the same as success.
  if (error || !data?.properties?.hashed_token) {
    console.warn(
      "[password-reset] generateLink skipped or failed:",
      error?.message || "missing hashed_token"
    );
    return { ok: true, mode: "noop" };
  }

  const tokenHash = data.properties.hashed_token;
  const resetUrl = `${origin}/auth/confirm?token_hash=${encodeURIComponent(
    tokenHash
  )}&type=recovery&next=${encodeURIComponent("/welcome/reset-password")}`;

  if (resend) {
    const payload = { appOrigin: origin, resetUrl };
    const { error: sendErr } = await resend.emails.send({
      from: getFromAddress(),
      to: [email],
      subject: passwordResetEmailSubject(),
      html: renderPasswordResetEmailHtml(payload),
      text: renderPasswordResetEmailText(payload),
    });

    if (sendErr) {
      console.error("[password-reset] Resend error:", sendErr.message);
      throw new Error(
        "Could not send the reset email. Check RESEND_API_KEY / RESEND_FROM_EMAIL, then try again."
      );
    }

    return { ok: true, mode: "token_hash" };
  }

  // No Resend: still create a TokenHash link. In development, return it so you can
  // open it without email. In production, fall back to Supabase's mailer (often PKCE).
  if (process.env.NODE_ENV !== "production") {
    console.info("[password-reset] RESEND_API_KEY unset — dev reset URL:\n", resetUrl);
    return { ok: true, mode: "token_hash", devResetUrl: resetUrl };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Password reset needs RESEND_API_KEY (recommended) or Supabase public env vars."
    );
  }
  const anon = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { error: mailErr } = await anon.auth.resetPasswordForEmail(email, { redirectTo });
  if (mailErr) {
    console.warn("[password-reset] Supabase fallback:", mailErr.message);
  }
  return { ok: true, mode: "supabase_pkce" };
}
