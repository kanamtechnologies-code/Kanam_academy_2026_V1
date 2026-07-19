import { NextResponse } from "next/server";

import { getAsyncClassCode } from "@/lib/asyncClass";
import { accessFromEntitlements, loadBillingEntitlements } from "@/lib/billing/access";
import type { StudentLessonAccess } from "@/lib/classAssignments";
import { unionEnabledLessonIds } from "@/lib/classAssignments";
import { resolveLearnerForUser } from "@/lib/resolveLearner";
import { TRACKS } from "@/lib/tracks";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function unlockAllForTesting() {
  return process.env.KANAM_UNLOCK_ALL_LESSONS === "true";
}

function isAsyncClassRow(row: { is_async?: boolean | null; code?: string | null }) {
  if (row.is_async) return true;
  const code = String(row.code ?? "")
    .trim()
    .toUpperCase();
  return Boolean(code) && code === getAsyncClassCode();
}

function openCatalogAccess(
  partial: Pick<StudentLessonAccess, "classIds" | "isAsyncCohort"> & {
    hasActiveSubscription?: boolean;
  }
): StudentLessonAccess {
  return {
    classRestricted: false,
    entitlementRestricted: false,
    enabledLessonIds: null,
    classIds: partial.classIds,
    isAsyncCohort: partial.isAsyncCohort,
    hasActiveSubscription: partial.hasActiveSubscription ?? false,
    unlockedTrackSlugs: TRACKS.map((t) => t.id),
  };
}

async function withEntitlements(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  userId: string,
  base: Pick<StudentLessonAccess, "classIds" | "isAsyncCohort">
): Promise<StudentLessonAccess> {
  try {
    const entitlements = await loadBillingEntitlements(admin, userId);
    return accessFromEntitlements(base, entitlements);
  } catch {
    // Billing tables missing or query failed — fail closed (no paid unlock).
    return accessFromEntitlements(base, {
      hasActiveSubscription: false,
      unlockedTrackSlugs: [],
    });
  }
}

export async function GET() {
  // Testing override: open the full catalog for every signed-in student.
  if (unlockAllForTesting()) {
    const access = openCatalogAccess({
      classIds: [],
      isAsyncCohort: true,
      hasActiveSubscription: true,
    });
    return NextResponse.json({ ok: true, access, unlockedForTesting: true }, { status: 200 });
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
  const user = data.user;
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  // Use admin for enrollment/assignment/billing reads so RLS does not hide rows.
  let admin: ReturnType<typeof createSupabaseAdminClient>;
  try {
    admin = createSupabaseAdminClient();
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Server misconfigured." },
      { status: 500 }
    );
  }

  // Billing stays on the Auth user (parent payer). Progress/class on active learner.
  let learner;
  try {
    learner = await resolveLearnerForUser(user, admin);
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Could not resolve learner." },
      { status: 500 }
    );
  }

  const billingUserId = learner.billingUserId;

  if (learner.needsParentalConsent) {
    const access = await withEntitlements(admin, billingUserId, {
      classIds: [],
      isAsyncCohort: false,
    });
    return NextResponse.json(
      {
        ok: true,
        access,
        needsParentalConsent: true,
        needsChildSelect: false,
      },
      { status: 200 }
    );
  }

  if (!learner.studentId) {
    const access = await withEntitlements(admin, billingUserId, {
      classIds: [],
      isAsyncCohort: false,
    });
    return NextResponse.json(
      {
        ok: true,
        access,
        needsChildSelect: learner.isParent,
      },
      { status: 200 }
    );
  }

  const { data: enrollments, error: enrollErr } = await admin
    .from("class_enrollments")
    .select("class_id")
    .eq("student_id", learner.studentId);

  if (enrollErr) {
    return NextResponse.json({ ok: false, error: enrollErr.message }, { status: 500 });
  }

  const classIds = (enrollments ?? [])
    .map((row) => String(row.class_id ?? ""))
    .filter(Boolean);

  if (classIds.length === 0) {
    const access = await withEntitlements(admin, billingUserId, {
      classIds: [],
      isAsyncCohort: false,
    });
    return NextResponse.json({ ok: true, access }, { status: 200 });
  }

  const { data: classRows, error: classErr } = await admin
    .from("classes")
    .select("id, code, is_async")
    .in("id", classIds);

  // Before schema migration, is_async may be missing — fall back to id + code.
  let rows: Array<{ id: string; code?: string | null; is_async?: boolean | null }> =
    (classRows as Array<{ id: string; code?: string | null; is_async?: boolean | null }> | null) ??
    [];
  if (classErr) {
    const msg = classErr.message.toLowerCase();
    if (msg.includes("is_async") || msg.includes("column")) {
      const fallback = await admin.from("classes").select("id, code").in("id", classIds);
      if (fallback.error) {
        return NextResponse.json({ ok: false, error: fallback.error.message }, { status: 500 });
      }
      rows = (fallback.data ?? []).map((c) => ({
        id: c.id,
        code: c.code,
        is_async: isAsyncClassRow({ code: c.code, is_async: false }),
      }));
    } else {
      return NextResponse.json({ ok: false, error: classErr.message }, { status: 500 });
    }
  }

  const teacherClassIds = rows.filter((c) => !isAsyncClassRow(c)).map((c) => String(c.id));
  const asyncClassIds = rows.filter((c) => isAsyncClassRow(c)).map((c) => String(c.id));

  // Pure async / self-paced cohort → billing entitlements decide access.
  if (teacherClassIds.length === 0) {
    const access = await withEntitlements(admin, billingUserId, {
      classIds,
      isAsyncCohort: asyncClassIds.length > 0,
    });
    return NextResponse.json({ ok: true, access }, { status: 200 });
  }

  const { data: assignmentRows, error: assignErr } = await admin
    .from("class_lesson_assignments")
    .select("lesson_id, enabled")
    .in("class_id", teacherClassIds);

  if (assignErr) {
    return NextResponse.json({ ok: false, error: assignErr.message }, { status: 500 });
  }

  const enabledLessonIds = unionEnabledLessonIds(
    (assignmentRows ?? []) as Array<{ lesson_id: string; enabled: boolean }>
  );

  // Teacher class with zero assignments: don't brick learners — fall back to entitlements.
  if (enabledLessonIds.length === 0) {
    const access = await withEntitlements(admin, billingUserId, {
      classIds,
      isAsyncCohort: false,
    });
    return NextResponse.json({ ok: true, access }, { status: 200 });
  }

  // Teacher-gated: instructor assignments win (school / program model).
  const entitlements = await loadBillingEntitlements(admin, billingUserId).catch(() => ({
    hasActiveSubscription: false,
    unlockedTrackSlugs: [] as StudentLessonAccess["unlockedTrackSlugs"],
  }));

  const access: StudentLessonAccess = {
    classRestricted: true,
    entitlementRestricted: false,
    enabledLessonIds,
    classIds,
    isAsyncCohort: false,
    hasActiveSubscription: entitlements.hasActiveSubscription,
    unlockedTrackSlugs: entitlements.hasActiveSubscription
      ? TRACKS.map((t) => t.id)
      : entitlements.unlockedTrackSlugs,
  };

  return NextResponse.json({ ok: true, access }, { status: 200 });
}
