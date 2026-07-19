import { NextResponse } from "next/server";

import {
  getHouseholdForOwner,
  householdConsentGate,
  isParentRole,
  setActiveStudentMetadata,
  verifyPin,
} from "@/lib/households";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type Body = {
  studentId: string;
  pin?: string;
};

function s(x: unknown) {
  return typeof x === "string" ? x.trim() : "";
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }
  if (!isParentRole(data.user)) {
    return NextResponse.json({ ok: false, error: "Parent account required." }, { status: 403 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const studentId = s(body.studentId);
  const pin = s(body.pin);
  if (!studentId) {
    return NextResponse.json({ ok: false, error: "studentId is required." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const household = await getHouseholdForOwner(admin, data.user.id);
  if (!household?.id) {
    return NextResponse.json({ ok: false, error: "No household found." }, { status: 404 });
  }

  const consent = householdConsentGate(household);
  if (consent.needsParentalConsent) {
    return NextResponse.json(
      {
        ok: false,
        error: "Complete verifiable parental consent before opening learning for a child.",
        code: "PARENTAL_CONSENT_REQUIRED",
        consent,
      },
      { status: 403 }
    );
  }

  const { data: kid, error: kidErr } = await admin
    .from("students")
    .select("id, display_name, pin_hash")
    .eq("id", studentId)
    .eq("household_id", household.id)
    .maybeSingle();

  if (kidErr) {
    return NextResponse.json({ ok: false, error: kidErr.message }, { status: 500 });
  }
  if (!kid?.id) {
    return NextResponse.json({ ok: false, error: "Child not found in your household." }, { status: 404 });
  }

  // PIN required when switching to a different child that has a PIN set.
  const currentActive = household.active_student_id
    ? String(household.active_student_id)
    : null;
  const switching = currentActive !== kid.id;
  if (switching && kid.pin_hash) {
    if (!pin || !verifyPin(pin, String(kid.pin_hash))) {
      return NextResponse.json(
        { ok: false, error: "Enter the correct PIN for this child." },
        { status: 401 }
      );
    }
  }

  await setActiveStudentMetadata(admin, data.user.id, kid.id);

  // Refresh session JWT so browser sees updated active_student_id metadata.
  try {
    await supabase.auth.refreshSession();
  } catch {
    // client can refresh on next navigation
  }

  return NextResponse.json(
    {
      ok: true,
      student: { id: kid.id, display_name: kid.display_name },
    },
    { status: 200 }
  );
}
