import { NextResponse } from "next/server";

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

  const { data: household, error: hhErr } = await admin
    .from("households")
    .insert({
      owner_user_id: user.id,
      name: householdName,
      active_student_id: student.id,
    })
    .select("id")
    .single();

  if (hhErr || !household?.id) {
    return NextResponse.json(
      {
        ok: false,
        error:
          hhErr?.message ||
          "Could not create household. Apply supabase/households.sql first.",
      },
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

  const { error: roleErr } = await admin.auth.admin.updateUserById(user.id, {
    user_metadata: {
      ...meta,
      role: "parent",
      active_student_id: student.id,
    },
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
