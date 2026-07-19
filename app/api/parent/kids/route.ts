import { NextResponse } from "next/server";

import { enrollStudentInClassByCode, getAsyncClassCode } from "@/lib/asyncClass";
import { PARENTAL_CONSENT_NOTICE_VERSION } from "@/lib/coppa/parentalConsent";
import {
  getHouseholdForOwner,
  hashPin,
  householdConsentGate,
  isParentRole,
  isValidPin,
  kidDeviceId,
  listHouseholdKids,
  setActiveStudentMetadata,
} from "@/lib/households";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type AddBody = {
  firstName: string;
  lastName?: string;
  grade?: string;
  pin?: string;
  classCode?: string;
};

function s(x: unknown) {
  return typeof x === "string" ? x.trim() : "";
}

async function requireParent() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return { error: NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 }) };
  }
  if (!isParentRole(data.user)) {
    return {
      error: NextResponse.json(
        { ok: false, error: "Parent account required." },
        { status: 403 }
      ),
    };
  }
  return { user: data.user };
}

export async function GET() {
  const auth = await requireParent();
  if ("error" in auth && auth.error) return auth.error;
  const user = auth.user!;

  const admin = createSupabaseAdminClient();
  const household = await getHouseholdForOwner(admin, user.id);
  if (!household?.id) {
    return NextResponse.json(
      { ok: false, error: "No household found. Convert or re-sign up as a parent." },
      { status: 404 }
    );
  }

  const kids = await listHouseholdKids(admin, household.id);
  const consent = householdConsentGate(household);
  return NextResponse.json(
    {
      ok: true,
      household: {
        id: household.id,
        name: household.name,
        active_student_id: household.active_student_id,
      },
      consent,
      noticeVersion: PARENTAL_CONSENT_NOTICE_VERSION,
      kids,
    },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  const auth = await requireParent();
  if ("error" in auth && auth.error) return auth.error;
  const user = auth.user!;

  let body: AddBody;
  try {
    body = (await req.json()) as AddBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const firstName = s(body.firstName);
  const lastName = s(body.lastName);
  const grade = s(body.grade) || null;
  const pin = s(body.pin);
  const classCode = (s(body.classCode) || getAsyncClassCode()).toUpperCase();

  if (!firstName) {
    return NextResponse.json({ ok: false, error: "Child first name is required." }, { status: 400 });
  }
  if (pin && !isValidPin(pin)) {
    return NextResponse.json(
      { ok: false, error: "PIN must be 4–6 digits." },
      { status: 400 }
    );
  }

  const admin = createSupabaseAdminClient();
  const household = await getHouseholdForOwner(admin, user.id);
  if (!household?.id) {
    return NextResponse.json({ ok: false, error: "No household found." }, { status: 404 });
  }

  const consent = householdConsentGate(household);
  if (consent.needsParentalConsent) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Complete verifiable parental consent before adding a child profile.",
        code: "PARENTAL_CONSENT_REQUIRED",
        consent,
      },
      { status: 403 }
    );
  }

  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const parentName =
    [meta.first_name, meta.last_name].filter(Boolean).join(" ").trim() ||
    String(meta.display_name ?? "Parent");

  const { data: child, error: childErr } = await admin
    .from("students")
    .insert({
      user_id: null,
      household_id: household.id,
      display_name: firstName,
      first_name: firstName,
      last_name: lastName || null,
      grade,
      parent_name: parentName,
      parent_email: user.email ?? null,
      pin_hash: pin ? hashPin(pin) : null,
      device_id: kidDeviceId(household.id, firstName),
    })
    .select("id, display_name")
    .single();

  if (childErr || !child?.id) {
    return NextResponse.json(
      { ok: false, error: childErr?.message || "Could not add child." },
      { status: 500 }
    );
  }

  await enrollStudentInClassByCode({
    studentId: child.id,
    classCode,
    admin,
  });

  // If no active child yet, make this one active.
  if (!household.active_student_id) {
    try {
      await setActiveStudentMetadata(admin, user.id, child.id);
    } catch {
      // ignore
    }
  }

  const kids = await listHouseholdKids(admin, household.id);
  return NextResponse.json({ ok: true, child, kids }, { status: 200 });
}
