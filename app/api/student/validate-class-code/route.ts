import { NextResponse } from "next/server";

import { findClassByCode } from "@/lib/asyncClass";
import {
  AUTH_RATE_LIMITS,
  clientIpFromRequest,
  enforceRateLimits,
} from "@/lib/auth/rateLimit";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type Body = {
  classCode?: string;
};

/**
 * Public onboarding check: does this teacher/self-paced class code exist?
 */
export async function POST(req: Request) {
  const ip = clientIpFromRequest(req);
  const limited = enforceRateLimits(
    [{ key: `validate-class-code:ip:${ip}`, ...AUTH_RATE_LIMITS.classCodeIp }],
    "Too many class code checks. Please wait and try again."
  );
  if (limited) return limited;

  try {
    const body = (await req.json().catch(() => ({}))) as Body;
    const admin = createSupabaseAdminClient();
    const found = await findClassByCode(String(body.classCode ?? ""), admin);

    if (!found.ok) {
      return NextResponse.json({ ok: false, error: found.error }, { status: 404 });
    }

    return NextResponse.json(
      {
        ok: true,
        classCode: found.code,
        className: found.name,
        isAsync: found.isAsync,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Could not check that class code right now.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
