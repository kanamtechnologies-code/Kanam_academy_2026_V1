import { getAsyncClassCode } from "@/lib/asyncClass";
import { accessFromEntitlements, loadBillingEntitlements } from "@/lib/billing/access";
import type { StudentLessonAccess } from "@/lib/classAssignments";
import { unionEnabledLessonIds } from "@/lib/classAssignments";
import { isAllLessonsUnlocked } from "@/lib/devUnlock";
import { resolveLearnerForUser } from "@/lib/resolveLearner";
import { TRACKS } from "@/lib/tracks";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export type LessonAccessResolveResult = {
  access: StudentLessonAccess;
  user: User | null;
  needsParentalConsent?: boolean;
  needsChildSelect?: boolean;
  unlockedForTesting?: boolean;
  error?: string;
  status: number;
};

function unlockAllForTesting() {
  return isAllLessonsUnlocked();
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
    return accessFromEntitlements(base, {
      hasActiveSubscription: false,
      unlockedTrackSlugs: [],
    });
  }
}

/**
 * Shared server-side lesson access resolution (API + gated lesson pages).
 */
export async function resolveStudentLessonAccess(): Promise<LessonAccessResolveResult> {
  if (unlockAllForTesting()) {
    return {
      status: 200,
      user: null,
      unlockedForTesting: true,
      access: openCatalogAccess({
        classIds: [],
        isAsyncCohort: true,
        hasActiveSubscription: true,
      }),
    };
  }

  let supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  try {
    supabase = await createSupabaseServerClient();
  } catch (e: unknown) {
    return {
      status: 500,
      user: null,
      access: accessFromEntitlements(
        { classIds: [], isAsyncCohort: false },
        { hasActiveSubscription: false, unlockedTrackSlugs: [] }
      ),
      error: e instanceof Error ? e.message : "Server misconfigured.",
    };
  }

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return {
      status: 401,
      user: null,
      access: accessFromEntitlements(
        { classIds: [], isAsyncCohort: false },
        { hasActiveSubscription: false, unlockedTrackSlugs: [] }
      ),
      error: error.message,
    };
  }
  const user = data.user;
  if (!user) {
    return {
      status: 401,
      user: null,
      access: accessFromEntitlements(
        { classIds: [], isAsyncCohort: false },
        { hasActiveSubscription: false, unlockedTrackSlugs: [] }
      ),
      error: "Not signed in.",
    };
  }

  let admin: ReturnType<typeof createSupabaseAdminClient>;
  try {
    admin = createSupabaseAdminClient();
  } catch (e: unknown) {
    return {
      status: 500,
      user,
      access: accessFromEntitlements(
        { classIds: [], isAsyncCohort: false },
        { hasActiveSubscription: false, unlockedTrackSlugs: [] }
      ),
      error: e instanceof Error ? e.message : "Server misconfigured.",
    };
  }

  let learner;
  try {
    learner = await resolveLearnerForUser(user, admin);
  } catch (e: unknown) {
    return {
      status: 500,
      user,
      access: accessFromEntitlements(
        { classIds: [], isAsyncCohort: false },
        { hasActiveSubscription: false, unlockedTrackSlugs: [] }
      ),
      error: e instanceof Error ? e.message : "Could not resolve learner.",
    };
  }

  const billingUserId = learner.billingUserId;

  if (learner.needsParentalConsent) {
    const access = await withEntitlements(admin, billingUserId, {
      classIds: [],
      isAsyncCohort: false,
    });
    return { status: 200, user, access, needsParentalConsent: true, needsChildSelect: false };
  }

  if (!learner.studentId) {
    const access = await withEntitlements(admin, billingUserId, {
      classIds: [],
      isAsyncCohort: false,
    });
    return {
      status: 200,
      user,
      access,
      needsChildSelect: learner.isParent,
    };
  }

  const { data: enrollments, error: enrollErr } = await admin
    .from("class_enrollments")
    .select("class_id")
    .eq("student_id", learner.studentId);

  if (enrollErr) {
    return {
      status: 500,
      user,
      access: accessFromEntitlements(
        { classIds: [], isAsyncCohort: false },
        { hasActiveSubscription: false, unlockedTrackSlugs: [] }
      ),
      error: enrollErr.message,
    };
  }

  const classIds = (enrollments ?? [])
    .map((row) => String(row.class_id ?? ""))
    .filter(Boolean);

  if (classIds.length === 0) {
    const access = await withEntitlements(admin, billingUserId, {
      classIds: [],
      isAsyncCohort: false,
    });
    return { status: 200, user, access };
  }

  const { data: classRows, error: classErr } = await admin
    .from("classes")
    .select("id, code, is_async")
    .in("id", classIds);

  let rows: Array<{ id: string; code?: string | null; is_async?: boolean | null }> =
    (classRows as Array<{ id: string; code?: string | null; is_async?: boolean | null }> | null) ??
    [];
  if (classErr) {
    const msg = classErr.message.toLowerCase();
    if (msg.includes("is_async") || msg.includes("column")) {
      const fallback = await admin.from("classes").select("id, code").in("id", classIds);
      if (fallback.error) {
        return {
          status: 500,
          user,
          access: accessFromEntitlements(
            { classIds: [], isAsyncCohort: false },
            { hasActiveSubscription: false, unlockedTrackSlugs: [] }
          ),
          error: fallback.error.message,
        };
      }
      rows = (fallback.data ?? []).map((c) => ({
        id: c.id,
        code: c.code,
        is_async: isAsyncClassRow({ code: c.code, is_async: false }),
      }));
    } else {
      return {
        status: 500,
        user,
        access: accessFromEntitlements(
          { classIds: [], isAsyncCohort: false },
          { hasActiveSubscription: false, unlockedTrackSlugs: [] }
        ),
        error: classErr.message,
      };
    }
  }

  const teacherClassIds = rows.filter((c) => !isAsyncClassRow(c)).map((c) => String(c.id));
  const asyncClassIds = rows.filter((c) => isAsyncClassRow(c)).map((c) => String(c.id));

  if (teacherClassIds.length === 0) {
    const access = await withEntitlements(admin, billingUserId, {
      classIds,
      isAsyncCohort: asyncClassIds.length > 0,
    });
    return { status: 200, user, access };
  }

  const { data: assignmentRows, error: assignErr } = await admin
    .from("class_lesson_assignments")
    .select("lesson_id, enabled")
    .in("class_id", teacherClassIds);

  if (assignErr) {
    return {
      status: 500,
      user,
      access: accessFromEntitlements(
        { classIds: [], isAsyncCohort: false },
        { hasActiveSubscription: false, unlockedTrackSlugs: [] }
      ),
      error: assignErr.message,
    };
  }

  const enabledLessonIds = unionEnabledLessonIds(
    (assignmentRows ?? []) as Array<{ lesson_id: string; enabled: boolean }>
  );

  if (enabledLessonIds.length === 0) {
    const access = await withEntitlements(admin, billingUserId, {
      classIds,
      isAsyncCohort: false,
    });
    return { status: 200, user, access };
  }

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

  return { status: 200, user, access };
}
