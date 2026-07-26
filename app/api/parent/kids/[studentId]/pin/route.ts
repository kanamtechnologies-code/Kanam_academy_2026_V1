import { NextResponse } from "next/server";

import {
  getHouseholdForOwner,
  hashPin,
  isParentRole,
  isValidPin,
} from "@/lib/households";
import {
  migrateLegacyPrivilegedRole,
  userWithAppRole,
} from "@/lib/auth/privilegedRole";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type Body = { pin: string };

function s(x: unknown) {
  return typeof x === "string" ? x.trim() : "";
}

export async function POST(
  req: Request,
  ctx: { params: Promise<{ studentId: string }> }
) {
  const { studentId } = await ctx.params;
  if (!studentId) {
    return NextResponse.json({ ok: false, error: "Missing student id." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }
  let user = data.user;
  if (!isParentRole(user)) {
    try {
      const migrated = await migrateLegacyPrivilegedRole(createSupabaseAdminClient(), user);
      if (migrated) user = userWithAppRole(user, migrated) as typeof user;
    } catch {
      // ignore
    }
  }
  if (!isParentRole(user)) {
    return NextResponse.json({ ok: false, error: "Parent account required." }, { status: 403 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const pin = s(body.pin);
  if (!isValidPin(pin)) {
    return NextResponse.json(
      { ok: false, error: "PIN must be 4–6 digits." },
      { status: 400 }
    );
  }

  const admin = createSupabaseAdminClient();
  const household = await getHouseholdForOwner(admin, data.user.id);
  if (!household?.id) {
    return NextResponse.json({ ok: false, error: "No household found." }, { status: 404 });
  }

  const { data: kid, error: kidErr } = await admin
    .from("students")
    .select("id")
    .eq("id", studentId)
    .eq("household_id", household.id)
    .maybeSingle();

  if (kidErr) {
    return NextResponse.json({ ok: false, error: kidErr.message }, { status: 500 });
  }
  if (!kid?.id) {
    return NextResponse.json({ ok: false, error: "Child not found in your household." }, { status: 404 });
  }

  const { error: updateErr } = await admin
    .from("students")
    .update({ pin_hash: hashPin(pin) })
    .eq("id", studentId);

  if (updateErr) {
    return NextResponse.json({ ok: false, error: updateErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
