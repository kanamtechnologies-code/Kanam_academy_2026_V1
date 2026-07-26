import { NextResponse } from "next/server";

import { ensureAsyncClass, getAsyncClassCode } from "@/lib/asyncClass";
import {
  AUTH_RATE_LIMITS,
  clientIpFromRequest,
  enforceRateLimits,
} from "@/lib/auth/rateLimit";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

/**
 * Issues the self-paced class code (same code for all solo learners).
 * Ensures the async class row exists in Supabase, then returns the code to auto-fill.
 * No third-party email — Supabase Auth already handles account emails.
 */
export async function POST(req: Request) {
  const ip = clientIpFromRequest(req);
  const limited = enforceRateLimits(
    [{ key: `request-class-code:ip:${ip}`, ...AUTH_RATE_LIMITS.requestClassCodeIp }],
    "Too many requests. Please wait and try again."
  );
  if (limited) return limited;

  try {
    const admin = createSupabaseAdminClient();
    const klass = await ensureAsyncClass(admin);
    const code = getAsyncClassCode();

    return NextResponse.json(
      {
        ok: true,
        classCode: code,
        className: klass.name,
        message: `Your self-paced code is ${code}. We filled it in for you.`,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Could not get a class code right now.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
