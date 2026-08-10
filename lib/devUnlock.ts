/**
 * Local/dev unlock for curriculum capture and QA.
 * Enable with NEXT_PUBLIC_UNLOCK_ALL_LESSONS=true (or legacy KANAM_UNLOCK_ALL_LESSONS)
 * in .env.local only.
 *
 * Never honored on Vercel Production (or other NODE_ENV=production hosts).
 * Preview deployments can still use the flags for QA.
 *
 * NEXT_PUBLIC_ is required for client gates (LessonAccessGate) and middleware.
 */

function unlockFlagsAllowed(): boolean {
  // Vercel Production must stay locked even if env vars were left on.
  if (process.env.VERCEL_ENV === "production") return false;
  // Non-Vercel production hosts (e.g. next start in prod).
  if (!process.env.VERCEL && process.env.NODE_ENV === "production") return false;
  return true;
}

export function isAllLessonsUnlocked(): boolean {
  if (!unlockFlagsAllowed()) return false;
  return (
    process.env.NEXT_PUBLIC_UNLOCK_ALL_LESSONS === "true" ||
    process.env.KANAM_UNLOCK_ALL_LESSONS === "true"
  );
}
