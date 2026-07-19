import {
  activeStudentIdFromUser,
  getHouseholdForOwner,
  householdConsentGate,
  isParentRole,
  listHouseholdKids,
  setActiveStudentMetadata,
} from "@/lib/households";
import type { UserWithRole } from "@/lib/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type ResolvedLearner = {
  studentId: string | null;
  displayName: string | null;
  isParent: boolean;
  householdId: string | null;
  billingUserId: string;
  needsParentalConsent: boolean;
};

/**
 * Resolve which student profile should learn / store progress.
 * Parents use active_student_id (+ household); students use their own row.
 * If a parent has exactly one kid and no active selection, auto-select and persist.
 * Learning is blocked until household parental consent is verified.
 */
export async function resolveLearnerForUser(
  user: NonNullable<UserWithRole> & { id: string },
  admin: ReturnType<typeof createSupabaseAdminClient> = createSupabaseAdminClient()
): Promise<ResolvedLearner> {
  const billingUserId = user.id;
  const parent = isParentRole(user);

  if (parent) {
    const household = await getHouseholdForOwner(admin, user.id);
    if (!household?.id) {
      return {
        studentId: null,
        displayName: null,
        isParent: true,
        householdId: null,
        billingUserId,
        needsParentalConsent: false,
      };
    }

    const consent = householdConsentGate(household);
    if (consent.needsParentalConsent) {
      return {
        studentId: null,
        displayName: null,
        isParent: true,
        householdId: household.id,
        billingUserId,
        needsParentalConsent: true,
      };
    }

    let studentId =
      activeStudentIdFromUser(user) ||
      (household.active_student_id ? String(household.active_student_id) : null);

    if (studentId) {
      const { data: kid } = await admin
        .from("students")
        .select("id, display_name, household_id")
        .eq("id", studentId)
        .eq("household_id", household.id)
        .maybeSingle();
      if (kid?.id) {
        return {
          studentId: String(kid.id),
          displayName: kid.display_name ? String(kid.display_name) : null,
          isParent: true,
          householdId: household.id,
          billingUserId,
          needsParentalConsent: false,
        };
      }
      studentId = null;
    }

    const kids = await listHouseholdKids(admin, household.id);
    if (kids.length === 1) {
      const only = kids[0];
      try {
        await setActiveStudentMetadata(admin, user.id, only.id);
      } catch {
        // Still return the kid so access/progress work this request.
      }
      return {
        studentId: only.id,
        displayName: only.display_name,
        isParent: true,
        householdId: household.id,
        billingUserId,
        needsParentalConsent: false,
      };
    }

    return {
      studentId: null,
      displayName: null,
      isParent: true,
      householdId: household.id,
      billingUserId,
      needsParentalConsent: false,
    };
  }

  const { data: student } = await admin
    .from("students")
    .select("id, display_name")
    .eq("user_id", user.id)
    .maybeSingle();

  return {
    studentId: student?.id ? String(student.id) : null,
    displayName: student?.display_name ? String(student.display_name) : null,
    isParent: false,
    householdId: null,
    billingUserId,
    needsParentalConsent: false,
  };
}

/** Browser helper: ensure-profile then return active learner id. */
export async function fetchActiveLearnerStudentId(): Promise<{
  studentId: string;
  displayName: string;
} | null> {
  try {
    const res = await fetch("/api/auth/ensure-profile", { method: "POST" });
    const json = (await res.json()) as {
      ok?: boolean;
      student?: { id?: string; display_name?: string };
      needsChildSelect?: boolean;
      needsParentalConsent?: boolean;
    };
    if (!res.ok || !json?.ok) return null;
    if (json.needsParentalConsent || json.needsChildSelect) return null;
    const studentId = String(json.student?.id ?? "");
    if (!studentId) return null;
    return {
      studentId,
      displayName: String(json.student?.display_name ?? "Learner"),
    };
  } catch {
    return null;
  }
}
