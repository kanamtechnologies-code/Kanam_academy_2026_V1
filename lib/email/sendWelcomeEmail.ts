import { Resend } from "resend";

import {
  renderWelcomeEmailHtml,
  renderWelcomeEmailText,
  welcomeEmailSubject,
  type WelcomeEmailRole,
} from "@/lib/email/welcomeEmailHtml";

export type SendWelcomeEmailArgs = {
  to: string;
  firstName: string;
  role: WelcomeEmailRole;
  appOrigin: string;
  needsEmailConfirmation?: boolean;
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
 * Sends a branded welcome email. Never throws to callers — signup must succeed
 * even if mail delivery fails. Returns ok:false when unset/misconfigured.
 */
export async function sendWelcomeEmail(
  args: SendWelcomeEmailArgs
): Promise<{ ok: true; id?: string } | { ok: false; error: string; skipped?: boolean }> {
  const to = args.to.trim().toLowerCase();
  if (!to || !to.includes("@")) {
    return { ok: false, error: "Valid email is required." };
  }

  const resend = getResendClient();
  if (!resend) {
    console.warn("[welcome-email] RESEND_API_KEY not set — skipping welcome email.");
    return { ok: false, error: "RESEND_API_KEY not configured.", skipped: true };
  }

  const payload = {
    firstName: args.firstName,
    role: args.role,
    appOrigin: args.appOrigin,
    needsEmailConfirmation: args.needsEmailConfirmation,
  };

  try {
    const { data, error } = await resend.emails.send({
      from: getFromAddress(),
      to: [to],
      subject: welcomeEmailSubject(args.role, args.firstName),
      html: renderWelcomeEmailHtml(payload),
      text: renderWelcomeEmailText(payload),
    });

    if (error) {
      console.error("[welcome-email] Resend error:", error.message);
      return { ok: false, error: error.message };
    }

    return { ok: true, id: data?.id };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not send welcome email.";
    console.error("[welcome-email] failed:", message);
    return { ok: false, error: message };
  }
}

/** Fire-and-forget wrapper for signup routes. */
export function queueWelcomeEmail(args: SendWelcomeEmailArgs) {
  void sendWelcomeEmail(args);
}
