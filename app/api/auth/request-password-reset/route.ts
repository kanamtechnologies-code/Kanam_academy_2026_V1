import { NextResponse } from "next/server";

import {
  AUTH_RATE_LIMITS,
  clientIpFromRequest,
  enforceRateLimits,
} from "@/lib/auth/rateLimit";
import { requestPasswordResetEmail } from "@/lib/email/sendPasswordResetEmail";
import { getAppOrigin } from "@/lib/stripe";

export const runtime = "nodejs";

type Body = {
  email?: string;
};

export async function POST(req: Request) {
  const ip = clientIpFromRequest(req);
  const ipLimited = enforceRateLimits(
    [{ key: `pwreset:ip:${ip}`, ...AUTH_RATE_LIMITS.passwordResetIp }],
    "Too many password reset attempts from this network. Please wait and try again."
  );
  if (ipLimited) return ipLimited;

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = (typeof body.email === "string" ? body.email : "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Valid email is required." }, { status: 400 });
  }

  const emailLimited = enforceRateLimits(
    [{ key: `pwreset:email:${email}`, ...AUTH_RATE_LIMITS.passwordResetEmail }],
    "Too many password reset attempts for this email. Please wait and try again."
  );
  if (emailLimited) return emailLimited;

  try {
    const result = await requestPasswordResetEmail({
      email,
      appOrigin: getAppOrigin(req),
    });
    return NextResponse.json({
      ok: true,
      // Hint for support/debugging only; UI can ignore.
      mode: result.mode,
      ...(result.devResetUrl ? { devResetUrl: result.devResetUrl } : {}),
    });
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "Could not send reset email.";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
