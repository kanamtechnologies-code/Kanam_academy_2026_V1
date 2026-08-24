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

export type RequestPasswordResetResult =
  | { ok: true; mode: "token_hash" }
  | { ok: true; mode: "noop" }
  | { ok: true; mode: "dev_link"; devResetUrl: string };

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

function isUnknownUserError(message: string) {
  const m = message.toLowerCase();
  return (
    m.includes("user not found") ||
    m.includes("unable to find user") ||
    m.includes("email not found") ||
    m.includes("user with this email")
  );
}

function tokenFromActionLink(actionLink: string | undefined | null): string | null {
  if (!actionLink) return null;
  try {
    const url = new URL(actionLink);
    return url.searchParams.get("token") || url.searchParams.get("token_hash");
  } catch {
    return null;
  }
}

/**
 * Sends a TokenHash recovery link via Resend (works across browsers/devices).
 * Production requires RESEND_API_KEY — we do not fake success when mail cannot send.
 */
export async function requestPasswordResetEmail(
  args: RequestPasswordResetArgs
): Promise<RequestPasswordResetResult> {
  const email = args.email.trim().toLowerCase();
  const origin = args.appOrigin.replace(/\/$/, "");
  const redirectTo = `${origin}/welcome/reset-password`;

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo },
  });

  if (error) {
    if (isUnknownUserError(error.message)) {
      // Anti-enumeration: unknown emails look like success to the client.
      console.warn("[password-reset] unknown user — returning noop:", email);
      return { ok: true, mode: "noop" };
    }
    console.error("[password-reset] generateLink failed:", error.message);
    throw new Error(
      "Could not start a password reset right now. Please try again in a few minutes."
    );
  }

  const tokenHash =
    data?.properties?.hashed_token ||
    tokenFromActionLink(data?.properties?.action_link);

  if (!tokenHash) {
    console.error("[password-reset] generateLink missing token", data?.properties);
    throw new Error(
      "Could not create a reset link. Please try again, or contact support if this continues."
    );
  }

  const resetUrl = `${origin}/auth/confirm?token_hash=${encodeURIComponent(
    tokenHash
  )}&type=recovery&next=${encodeURIComponent("/welcome/reset-password")}`;

  const resend = getResendClient();
  if (resend) {
    const payload = { appOrigin: origin, resetUrl };
    const { data: sent, error: sendErr } = await resend.emails.send({
      from: getFromAddress(),
      to: [email],
      subject: passwordResetEmailSubject(),
      html: renderPasswordResetEmailHtml(payload),
      text: renderPasswordResetEmailText(payload),
    });

    if (sendErr) {
      console.error("[password-reset] Resend error:", sendErr.message);
      throw new Error(
        "Could not send the reset email. Confirm RESEND_API_KEY and RESEND_FROM_EMAIL are set for a verified domain, then try again."
      );
    }

    console.info("[password-reset] sent via Resend", { id: sent?.id, to: email });
    return { ok: true, mode: "token_hash" };
  }

  // Local/dev without Resend: surface the link so reset still works.
  if (process.env.VERCEL_ENV !== "production" && process.env.NODE_ENV !== "production") {
    console.info("[password-reset] RESEND_API_KEY unset — dev reset URL:\n", resetUrl);
    return { ok: true, mode: "dev_link", devResetUrl: resetUrl };
  }

  // Production (or next start) without Resend cannot reliably email.
  throw new Error(
    "Password reset email is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL on the server, then redeploy."
  );
}
