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
 * Completes email OTP / recovery links, then redirects.
 * Supports:
 * - token_hash + type (email template {{ .TokenHash }} flow)
 * - code (PKCE redirect from Supabase verify → redirectTo)
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

  try {
    const supabase = await createSupabaseServerClient();

    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        const msg = /expired|invalid/i.test(error.message)
          ? "This reset link was already used or expired. Request a new one and open it once in your browser."
          : error.message;
        return failRedirect(origin, msg);
      }
      return NextResponse.redirect(new URL(next, origin));
    }

    if (token_hash && type) {
      const { error } = await supabase.auth.verifyOtp({ type, token_hash });
      if (error) {
        const msg = /expired|invalid/i.test(error.message)
          ? "This reset link was already used or expired. Request a new one and open it once in your browser."
          : error.message;
        return failRedirect(origin, msg);
      }
      return NextResponse.redirect(new URL(next, origin));
    }

    return failRedirect(origin, "Reset link is missing info. Request a new password reset.");
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Could not verify the reset link.";
    return failRedirect(origin, message);
  }
}
