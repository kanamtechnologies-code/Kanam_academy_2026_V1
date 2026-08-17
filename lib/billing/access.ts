import type { SupabaseClient } from "@supabase/supabase-js";

import type { StudentLessonAccess } from "@/lib/classAssignments";
import { TRACKS, type Track } from "@/lib/tracks";

export type BillingEntitlements = {
  hasActiveSubscription: boolean;
  unlockedTrackSlugs: Track["id"][];
};

/** Included at no extra charge once the learner has any paid purchase. */
export const BUNDLED_FREE_WITH_PURCHASE_TRACK: Track["id"] = "financial-literacy";

const TRACK_ID_SET = new Set<string>(TRACKS.map((t) => t.id));

function isTrackId(slug: string): slug is Track["id"] {
  return TRACK_ID_SET.has(slug);
}

/**
 * Financial Literacy unlocks automatically with any paid access:
 * family subscription, any track purchase, or tutoring credits.
 */
export function withPurchaseBundles(
  entitlements: BillingEntitlements,
  opts?: { hasPaidPurchase?: boolean }
): BillingEntitlements {
  const hasPurchase =
    Boolean(opts?.hasPaidPurchase) ||
    entitlements.hasActiveSubscription ||
    entitlements.unlockedTrackSlugs.length > 0;

  if (!hasPurchase) return entitlements;
  if (entitlements.unlockedTrackSlugs.includes(BUNDLED_FREE_WITH_PURCHASE_TRACK)) {
    return entitlements;
  }

  return {
    ...entitlements,
    unlockedTrackSlugs: [
      ...entitlements.unlockedTrackSlugs,
      BUNDLED_FREE_WITH_PURCHASE_TRACK,
    ],
  };
}

/** Load family sub + active track purchases for a Supabase Auth user. */
export async function loadBillingEntitlements(
  admin: SupabaseClient,
  userId: string
): Promise<BillingEntitlements> {
  const [{ data: subscriptions }, { data: tracks }, { data: tutoring }] = await Promise.all([
    admin
      .from("billing_subscriptions")
      .select("status, current_period_end")
      .eq("user_id", userId)
      .in("status", ["active", "trialing"]),
    admin
      .from("track_entitlements")
      .select("track_slug")
      .eq("user_id", userId)
      .eq("active", true),
    admin.from("tutoring_credits").select("id").eq("user_id", userId).limit(1),
  ]);

  const now = Date.now();
  const hasActiveSubscription = (subscriptions ?? []).some((row) => {
    const status = String(row.status ?? "");
    if (status !== "active" && status !== "trialing") return false;
    if (row.current_period_end) {
      const end = new Date(String(row.current_period_end)).getTime();
      if (!Number.isNaN(end) && end <= now) return false;
    }
    return true;
  });

  const unlockedTrackSlugs = Array.from(
    new Set(
      (tracks ?? [])
        .map((row) => String(row.track_slug ?? ""))
        .filter(isTrackId)
    )
  );

  return withPurchaseBundles(
    { hasActiveSubscription, unlockedTrackSlugs },
    { hasPaidPurchase: (tutoring ?? []).length > 0 }
  );
}

/** All lesson ids belonging to the given track slugs. */
export function lessonIdsForTrackSlugs(slugs: Track["id"][]): string[] {
  const set = new Set(slugs);
  return TRACKS.filter((t) => set.has(t.id)).flatMap((t) => t.lessons.map((l) => l.id));
}

export function trackIdForLesson(lessonId: string): Track["id"] | null {
  for (const track of TRACKS) {
    if (track.lessons.some((l) => l.id === lessonId)) return track.id;
  }
  return null;
}

/** Dashboard deep-link that restores the learner on the correct training path. */
export function dashboardHrefForLesson(lessonId: string): string {
  const trackId = trackIdForLesson(lessonId);
  return trackId ? `/dashboard?track=${encodeURIComponent(trackId)}` : "/dashboard";
}

export function dashboardHrefForTrack(trackId: Track["id"]): string {
  return `/dashboard?track=${encodeURIComponent(trackId)}`;
}

/** Whether a whole track should appear unlocked on the dashboard. */
export function isTrackUnlockedForAccess(
  trackId: Track["id"],
  access: Pick<
    StudentLessonAccess,
    | "hasActiveSubscription"
    | "entitlementRestricted"
    | "unlockedTrackSlugs"
    | "classRestricted"
    | "enabledLessonIds"
  >
): boolean {
  if (access.hasActiveSubscription) return true;
  if (access.classRestricted) {
    const enabled = new Set(access.enabledLessonIds ?? []);
    const track = TRACKS.find((t) => t.id === trackId);
    return Boolean(track?.lessons.some((l) => enabled.has(l.id)));
  }
  if (!access.entitlementRestricted) return true;
  return (access.unlockedTrackSlugs ?? []).includes(trackId);
}

/**
 * Apply billing entitlements when the learner is not in a teacher-gated class.
 * - Active family sub → full catalog
 * - Track purchases → only those tracks' lessons
 * - Neither → locked (buy on /billing)
 */
export function accessFromEntitlements(
  base: Pick<StudentLessonAccess, "classIds" | "isAsyncCohort">,
  entitlements: BillingEntitlements
): StudentLessonAccess {
  if (entitlements.hasActiveSubscription) {
    return {
      classRestricted: false,
      entitlementRestricted: false,
      enabledLessonIds: null,
      classIds: base.classIds,
      isAsyncCohort: base.isAsyncCohort,
      hasActiveSubscription: true,
      unlockedTrackSlugs: TRACKS.map((t) => t.id),
    };
  }

  const unlockedTrackSlugs = entitlements.unlockedTrackSlugs;
  return {
    classRestricted: false,
    entitlementRestricted: true,
    enabledLessonIds: lessonIdsForTrackSlugs(unlockedTrackSlugs),
    classIds: base.classIds,
    isAsyncCohort: base.isAsyncCohort,
    hasActiveSubscription: false,
    unlockedTrackSlugs,
  };
}
