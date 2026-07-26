import { NextResponse } from "next/server";

import {
  PARENTAL_CONSENT_NOTICE_VERSION,
  looksLikeMissingConsentColumn,
} from "@/lib/coppa/parentalConsent";
import {
  getHouseholdForOwner,
  setActiveStudentMetadata,
} from "@/lib/households";
import { isInstructorRole, isParentRole, readUserRole } from "@/lib/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type Body = {
  householdName?: string;
};

function s(x: unknown) {
  return typeof x === "string" ? x.trim() : "";
}

/**
 * One-time upgrade: wrap the signed-in student's profile in a household
 * and switch Auth role to parent (billing stays on this user_id).
 */
export async function POST(req: Request) {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    // empty body ok
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
  const user = data.user;
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  if (isInstructorRole(user)) {
    return NextResponse.json(
      { ok: false, error: "Instructor accounts cannot convert to a family account." },
      { status: 400 }
    );
  }

  const admin = createSupabaseAdminClient();

  const existingHh = await getHouseholdForOwner(admin, user.id);
  if (existingHh?.id || isParentRole(user)) {
    return NextResponse.json(
      { ok: true, alreadyParent: true, householdId: existingHh?.id ?? null },
      { status: 200 }
    );
  }

  const { data: student, error: studentErr } = await admin
    .from("students")
    .select("id, display_name, first_name, last_name")
    .eq("user_id", user.id)
    .maybeSingle();

  if (studentErr) {
    return NextResponse.json({ ok: false, error: studentErr.message }, { status: 500 });
  }
  if (!student?.id) {
    return NextResponse.json(
      { ok: false, error: "No learner profile found to convert." },
      { status: 400 }
    );
  }

  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const parentName =
    [meta.first_name, meta.last_name].filter(Boolean).join(" ").trim() ||
    String(student.display_name ?? "Parent");
  const householdName = s(body.householdName) || `${parentName}'s family`;
  const consentAt = new Date().toISOString();
  // Adult self-signup converting their own account — treat as verified VPC so
  // learning is not locked behind a surprise pending-consent gate.
  const consentFields = {
    parental_consent_status: "verified" as const,
    parental_consent_method: "legacy_pre_vpc" as const,
    parental_consent_at: consentAt,
    parental_consent_signer_name: parentName,
    parental_consent_notice_version: PARENTAL_CONSENT_NOTICE_VERSION,
    parental_consent_parent_email: (user.email ?? "").toLowerCase() || null,
  };

  let household: { id: string } | null = null;
  {
    const withConsent = await admin
      .from("households")
      .insert({
        owner_user_id: user.id,
        name: householdName,
        active_student_id: student.id,
        ...consentFields,
      })
      .select("id")
      .single();

    if (!withConsent.error && withConsent.data?.id) {
      household = { id: String(withConsent.data.id) };
    } else if (
      withConsent.error &&
      looksLikeMissingConsentColumn(withConsent.error.message)
    ) {
      const basic = await admin
        .from("households")
        .insert({
          owner_user_id: user.id,
          name: householdName,
          active_student_id: student.id,
        })
        .select("id")
        .single();
      if (basic.error || !basic.data?.id) {
        return NextResponse.json(
          {
            ok: false,
            error:
              basic.error?.message ||
              "Could not create household. Apply supabase/households.sql first.",
          },
          { status: 500 }
        );
      }
      household = { id: String(basic.data.id) };
    } else {
      return NextResponse.json(
        {
          ok: false,
          error:
            withConsent.error?.message ||
            "Could not create household. Apply supabase/households.sql first.",
        },
        { status: 500 }
      );
    }
  }

  if (!household?.id) {
    return NextResponse.json(
      { ok: false, error: "Could not create household." },
      { status: 500 }
    );
  }

  const { error: memberErr } = await admin.from("household_members").insert({
    household_id: household.id,
    user_id: user.id,
    role: "parent",
  });
  if (memberErr) {
    return NextResponse.json({ ok: false, error: memberErr.message }, { status: 500 });
  }

  // Detach Auth 1:1 link so this row becomes a household kid profile.
  const { error: moveErr } = await admin
    .from("students")
    .update({
      household_id: household.id,
      user_id: null,
      parent_name: parentName,
      parent_email: user.email ?? null,
    })
    .eq("id", student.id);

  if (moveErr) {
    return NextResponse.json({ ok: false, error: moveErr.message }, { status: 500 });
  }

  const nextUserMeta: Record<string, unknown> = { ...meta, active_student_id: student.id };
  delete nextUserMeta.role;
  delete nextUserMeta.user_role;

  const { error: roleErr } = await admin.auth.admin.updateUserById(user.id, {
    app_metadata: {
      ...((user.app_metadata ?? {}) as Record<string, unknown>),
      role: "parent",
    },
    user_metadata: nextUserMeta,
  });

  if (roleErr) {
    return NextResponse.json({ ok: false, error: roleErr.message }, { status: 500 });
  }

  try {
    await setActiveStudentMetadata(admin, user.id, student.id);
  } catch {
    // metadata already set above
  }

  return NextResponse.json(
    {
      ok: true,
      householdId: household.id,
      childId: student.id,
      previousRole: readUserRole(user),
    },
    { status: 200 }
  );
}
