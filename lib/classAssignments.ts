import type { Track } from "@/lib/tracks";

export type StudentLessonAccess = {
  classRestricted: boolean;
  /**
   * When classRestricted or entitlementRestricted, only these lesson ids are open
   * (plus any already completed on the client).
   */
  enabledLessonIds: string[] | null;
  classIds: string[];
  /** Teacher-led classes the learner is enrolled in (excludes async cohort). */
  enrolledClasses?: Array<{ id: string; name: string; code: string }>;
  /** True when the student is only in the shared self-paced / async cohort. */
  isAsyncCohort?: boolean;
  /** Family $30/mo subscription currently active/trialing. */
  hasActiveSubscription?: boolean;
  /** Tracks unlocked via one-time purchase/grant (ignored when hasActiveSubscription). */
  unlockedTrackSlugs?: Track["id"][];
  /**
   * When true (and not classRestricted), access is limited by billing entitlements.
   * enabledLessonIds lists lessons from unlockedTrackSlugs (may be empty).
   */
  entitlementRestricted?: boolean;
};

export function unionEnabledLessonIds(
  rows: Array<{ lesson_id: string; enabled: boolean }>
): string[] {
  const ids = new Set<string>();
  for (const row of rows) {
    if (row.enabled) ids.add(row.lesson_id);
  }
  return Array.from(ids);
}
