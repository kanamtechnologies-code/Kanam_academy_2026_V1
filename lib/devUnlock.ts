/**
 * Local/dev unlock for curriculum capture and QA.
 * Enable with NEXT_PUBLIC_UNLOCK_ALL_LESSONS=true (or legacy KANAM_UNLOCK_ALL_LESSONS)
 * in .env.local only. Do not enable on production deploys.
 *
 * NEXT_PUBLIC_ is required for client gates (LessonAccessGate) and middleware.
 */
export function isAllLessonsUnlocked(): boolean {
  return (
    process.env.NEXT_PUBLIC_UNLOCK_ALL_LESSONS === "true" ||
    process.env.KANAM_UNLOCK_ALL_LESSONS === "true"
  );
}
