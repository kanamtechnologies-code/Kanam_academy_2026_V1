import { NextResponse } from "next/server";

import {
  migrateLegacyPrivilegedRole,
  userWithAppRole,
} from "@/lib/auth/privilegedRole";
import {
  activeStudentIdFromUser,
  getHouseholdForOwner,
  householdConsentGate,
  listHouseholdKids,
  setActiveStudentMetadata,
} from "@/lib/households";
import { isInstructorRole, isParentRole } from "@/lib/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type UserMetadata = {
  first_name?: string;
  display_name?: string;
};

function firstNameFromEmail(email: string) {
  const local = (email.split("@")[0] ?? "").trim();
  if (!local) return "Student";
  const base = local.split(/[._-]/)[0] ?? local;
  const clean = base.replace(/[^a-zA-Z0-9]/g, "");
  const name = clean || "Student";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export async function POST() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
  const user = data.user;
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  let admin: ReturnType<typeof createSupabaseAdminClient>;
  try {
    admin = createSupabaseAdminClient();
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Server misconfigured." },
      { status: 500 }
    );
  }

  // Migrate legacy user_metadata.role → app_metadata (clients can spoof user_metadata).
  let effectiveUser = user;
  try {
    const migrated = await migrateLegacyPrivilegedRole(admin, user);
    if (migrated) effectiveUser = userWithAppRole(user, migrated) as typeof user;
  } catch {
    // Non-fatal; role checks use current JWT claims.
  }

  if (isInstructorRole(effectiveUser)) {
    return NextResponse.json({ ok: true, role: "instructor", student: null }, { status: 200 });
  }

  // Parent: never auto-create a students row on the parent Auth user.
  if (isParentRole(effectiveUser)) {
    const household = await getHouseholdForOwner(admin, user.id);
    if (!household?.id) {
      return NextResponse.json(
        {
          ok: true,
          role: "parent",
          needsHousehold: true,
          student: null,
        },
        { status: 200 }
      );
    }

    const kids = await listHouseholdKids(admin, household.id);
    const consent = householdConsentGate(household);
    let activeId =
      activeStudentIdFromUser(effectiveUser) ||
      (household.active_student_id ? String(household.active_student_id) : null);

    if (activeId && !kids.some((k) => k.id === activeId)) {
      activeId = null;
    }

    if (!activeId && kids.length === 1 && !consent.needsParentalConsent) {
      activeId = kids[0].id;
      try {
        await setActiveStudentMetadata(admin, user.id, activeId);
      } catch {
        // Non-fatal: still return the only kid for this request.
      }
    }

    const active =
      !consent.needsParentalConsent && activeId
        ? kids.find((k) => k.id === activeId)
        : null;

    return NextResponse.json(
      {
        ok: true,
        role: "parent",
        household: { id: household.id, name: household.name },
        kids,
        consent,
        needsParentalConsent: consent.needsParentalConsent,
        needsChildSelect: !consent.needsParentalConsent && !active,
        student: active
          ? { id: active.id, display_name: active.display_name }
          : null,
      },
      { status: 200 }
    );
  }

  // Self-serve student path (unchanged).
  const { data: existing, error: findErr } = await supabase
    .from("students")
    .select("id, display_name")
    .eq("user_id", user.id)
    .maybeSingle();

  if (findErr) {
    return NextResponse.json({ ok: false, error: findErr.message }, { status: 500 });
  }

  if (existing?.id) {
    return NextResponse.json({ ok: true, role: "student", student: existing }, { status: 200 });
  }

  const userMetadata = (user.user_metadata ?? {}) as UserMetadata;
  const first =
    (userMetadata.first_name && String(userMetadata.first_name).trim()) ||
    (userMetadata.display_name && String(userMetadata.display_name).trim()) ||
    firstNameFromEmail(user.email ?? "");

  const { data: inserted, error: insertErr } = await supabase
    .from("students")
    .insert({
      user_id: user.id,
      display_name: String(first),
      device_id: `auth:${user.id}`,
    })
    .select("id, display_name")
    .single();

  if (insertErr) {
    return NextResponse.json(
      {
        ok: false,
        error:
          insertErr.message +
          " (If this mentions 'user_id' missing, run the SQL migration to add students.user_id and reload schema.)",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, role: "student", student: inserted }, { status: 200 });
}
