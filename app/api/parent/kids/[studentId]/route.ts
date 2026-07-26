import { NextResponse } from "next/server";

import {
  eraseHouseholdChild,
  getHouseholdKidForOwner,
} from "@/lib/coppa/childDsar";
import { getHouseholdForOwner, isParentRole } from "@/lib/households";
import {
  migrateLegacyPrivilegedRole,
  userWithAppRole,
} from "@/lib/auth/privilegedRole";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type Body = {
  /** Must match the child's display name (case-insensitive) to confirm deletion. */
  confirmName?: string;
};

function s(x: unknown) {
  return typeof x === "string" ? x.trim() : "";
}

function namesMatch(a: string, b: string) {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

export async function DELETE(
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

  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    // empty body ok — still require confirmName
  }

  const confirmName = s(body.confirmName);
  if (!confirmName) {
    return NextResponse.json(
      {
        ok: false,
        error: "Type the child’s display name to confirm deletion.",
        code: "CONFIRM_NAME_REQUIRED",
      },
      { status: 400 }
    );
  }

  const admin = createSupabaseAdminClient();
  const household = await getHouseholdForOwner(admin, data.user.id);
  if (!household?.id) {
    return NextResponse.json({ ok: false, error: "No household found." }, { status: 404 });
  }

  let kid;
  try {
    kid = await getHouseholdKidForOwner(admin, data.user.id, household.id, studentId);
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Could not load child." },
      { status: 500 }
    );
  }
  if (!kid) {
    return NextResponse.json(
      { ok: false, error: "Child not found in your household." },
      { status: 404 }
    );
  }

  const display = String(kid.display_name ?? "").trim();
  if (!display || !namesMatch(confirmName, display)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Confirmation name does not match this child’s display name.",
        code: "CONFIRM_NAME_MISMATCH",
      },
      { status: 400 }
    );
  }

  // Household kids should not own Auth users; refuse if somehow linked.
  if (kid.user_id) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "This profile is linked to a login and cannot be deleted here. Email info@kanamacademy.com for help.",
        code: "LINKED_AUTH_USER",
      },
      { status: 400 }
    );
  }

  try {
    await eraseHouseholdChild({
      admin,
      ownerUserId: data.user.id,
      householdId: household.id,
      activeStudentId: household.active_student_id
        ? String(household.active_student_id)
        : null,
      kid,
    });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Could not delete child data." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      deletedStudentId: studentId,
      message: "Child profile and learning data were deleted.",
    },
    { status: 200 }
  );
}
