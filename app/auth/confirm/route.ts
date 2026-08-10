import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

function safeNext(nextRaw: string | null, type: EmailOtpType | null) {
  if (nextRaw?.startsWith("/")) return nextRaw;
  if (type === "signup" || type === "email") return "/dashboard";
  return "/welcome/reset-password";
}

function failRedirect(
  origin: string,
  message: string,
  kind: "reset" | "confirm" = "reset"
) {
  const url = new URL("/welcome", origin);
  url.searchParams.set(kind === "confirm" ? "confirm_error" : "reset_error", message);
  return NextResponse.redirect(url);
}

function isSignupConfirmType(type: EmailOtpType | null) {
  return type === "signup" || type === "email";
}

async function postConfirmPath(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  next: string,
  type: EmailOtpType | null
) {
  if (!isSignupConfirmType(type)) return next;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const role = String(
      (user?.app_metadata as { role?: string } | undefined)?.role ??
        (user?.user_metadata as { role?: string } | undefined)?.role ??
        ""
    ).toLowerCase();
    if (role === "parent") return "/parent";
  } catch {
    // keep next
  }
  return next;
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
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = safeNext(searchParams.get("next"), type);

  const errorCode = searchParams.get("error_code") || searchParams.get("error");
  if (errorCode) {
    const desc = searchParams.get("error_description") ?? "";
    const decoded = decodeURIComponent(desc.replace(/\+/g, " "));
    const msg = /otp_expired|access_denied|invalid/i.test(`${errorCode} ${decoded}`)
      ? isSignupConfirmType(type)
        ? "This confirmation link was already used or expired. Request a new confirmation email from signup, then open it once in your browser."
        : "This reset link was already used or expired. Email apps sometimes open links automatically — request a new reset and open it once in your browser."
      : decoded || "This link is invalid. Please request a new one.";
    return failRedirect(origin, msg, isSignupConfirmType(type) ? "confirm" : "reset");
  }

  // Prefer server exchange (works for many email confirmation redirects).
  // If that fails (classic PKCE reset started in another browser), forward
  // the code to the client page that holds the verifier.
  if (code) {
    try {
      const supabase = await createSupabaseServerClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        const dest = await postConfirmPath(supabase, next, type);
        return NextResponse.redirect(new URL(dest, origin));
      }
    } catch {
      // fall through to client hand-off
    }
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
          ? isSignupConfirmType(type)
            ? "This confirmation link was already used or expired. Request a new one and open it once in your browser."
            : "This reset link was already used or expired. Request a new one from Welcome → Forgot password."
          : error.message;
        return failRedirect(origin, msg, isSignupConfirmType(type) ? "confirm" : "reset");
      }
      const dest = await postConfirmPath(supabase, next, type);
      return NextResponse.redirect(new URL(dest, origin));
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : isSignupConfirmType(type)
            ? "Could not verify the confirmation link."
            : "Could not verify the reset link.";
      return failRedirect(origin, message, isSignupConfirmType(type) ? "confirm" : "reset");
    }
  }

  return failRedirect(
    origin,
    "This auth link is missing info. Request a new confirmation or password reset email.",
    "confirm"
  );
}
