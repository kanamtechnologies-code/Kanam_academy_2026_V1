import { NextResponse } from "next/server";

import { passwordLengthError } from "@/lib/auth/password";
import { secretsEqual } from "@/lib/auth/privilegedRole";
import {
  AUTH_RATE_LIMITS,
  clientIpFromRequest,
  enforceRateLimits,
} from "@/lib/auth/rateLimit";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type Body = {
  inviteCode?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
};

function s(x: unknown) {
  return typeof x === "string" ? x.trim() : "";
}

export async function POST(req: Request) {
  const ip = clientIpFromRequest(req);
  const limited = enforceRateLimits(
    [{ key: `admin-invite:ip:${ip}`, ...AUTH_RATE_LIMITS.adminInviteIp }],
    "Too many instructor invite attempts. Please wait and try again."
  );
  if (limited) return limited;

  const expected = s(process.env.INSTRUCTOR_INVITE_CODE);
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "Missing INSTRUCTOR_INVITE_CODE env var." },
      { status: 500 }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const inviteCode = s(body.inviteCode);
  if (!inviteCode || !secretsEqual(inviteCode, expected)) {
    return NextResponse.json({ ok: false, error: "Invalid instructor invite code." }, { status: 403 });
  }

  const email = s(body.email).toLowerCase();
  const password = s(body.password);
  const firstName = s(body.firstName);
  const lastName = s(body.lastName);

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Valid email is required." }, { status: 400 });
  }
  const pwErr = passwordLengthError(password);
  if (pwErr) {
    return NextResponse.json({ ok: false, error: pwErr }, { status: 400 });
  }
  if (!firstName || !lastName) {
    return NextResponse.json(
      { ok: false, error: "First name and last name are required." },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();

  const { data: created, error: createErr } = await supabase.auth.admin.createUser({
    email,
    password,
    // Staff invite still auto-confirms so instructors can sign in immediately;
    // role is stored in app_metadata (not client-writable user_metadata).
    email_confirm: true,
    app_metadata: {
      role: "instructor",
    },
    user_metadata: {
      first_name: firstName,
      last_name: lastName,
    },
  });

  if (createErr) {
    const msg = createErr.message || "Could not create instructor.";
    const status = msg.toLowerCase().includes("already") ? 409 : 400;
    return NextResponse.json({ ok: false, error: msg }, { status });
  }

  const userId = created.user?.id;
  if (!userId) {
    return NextResponse.json({ ok: false, error: "Instructor created but missing id." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, userId }, { status: 200 });
}
