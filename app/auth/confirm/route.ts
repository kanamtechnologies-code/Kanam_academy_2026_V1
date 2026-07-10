import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

function safeNext(nextRaw: string | null) {
  const next = nextRaw ?? "/welcome/reset-password";
  return next.startsWith("/") ? next : "/welcome/reset-password";
}

function failRedirect(origin: string, message: string) {
  const url = new URL("/welcome", origin);
  url.searchParams.set("reset_error", message);
  return NextResponse.redirect(url);
}

/**
 * Completes recovery / email confirmation links.
 *
 * - token_hash + type: verified on the server (works across browsers/devices).
 *   Prefer this in the Supabase "Reset password" email template.
 * - code (PKCE): forwarded to the client page. The PKCE code verifier lives in
 *   browser storage/cookies from resetPasswordForEmail — the server cannot use it.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const next = safeNext(searchParams.get("next"));
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const errorCode = searchParams.get("error_code") || searchParams.get("error");
  if (errorCode) {
    const desc = searchParams.get("error_description") ?? "";
    const decoded = decodeURIComponent(desc.replace(/\+/g, " "));
    const msg = /otp_expired|access_denied|invalid/i.test(`${errorCode} ${decoded}`)
      ? "This reset link was already used or expired. Email apps sometimes open links automatically — request a new reset and open it once in your browser."
      : decoded || "This reset link is invalid. Please request a new one.";
    return failRedirect(origin, msg);
  }

  // PKCE: hand the code to the browser that started the reset (has the verifier).
  if (code) {
    const url = new URL(next, origin);
    url.searchParams.set("code", code);
    return NextResponse.redirect(url);
  }

  if (token_hash && type) {
    try {
      const supabase = await createSupabaseServerClient();
      const { error } = await supabase.auth.verifyOtp({ type, token_hash });
      if (error) {
        const msg = /expired|invalid|verifier/i.test(error.message)
          ? "This reset link was already used or expired. Request a new one and open it once in the same browser you used to request it."
          : error.message;
        return failRedirect(origin, msg);
      }
      return NextResponse.redirect(new URL(next, origin));
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Could not verify the reset link.";
      return failRedirect(origin, message);
    }
  }

  return failRedirect(origin, "Reset link is missing info. Request a new password reset.");
}
