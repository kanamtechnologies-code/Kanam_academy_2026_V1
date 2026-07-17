import type { SupabaseClient } from "@supabase/supabase-js";

import type { StudentLessonAccess } from "@/lib/classAssignments";
import { TRACKS, type Track } from "@/lib/tracks";

export type BillingEntitlements = {
  hasActiveSubscription: boolean;
  unlockedTrackSlugs: Track["id"][];
};

const TRACK_ID_SET = new Set<string>(TRACKS.map((t) => t.id));

function isTrackId(slug: string): slug is Track["id"] {
  return TRACK_ID_SET.has(slug);
}

/** Load family sub + active track purchases for a Supabase Auth user. */
export async function loadBillingEntitlements(
  admin: SupabaseClient,
  userId: string
): Promise<BillingEntitlements> {
  const [{ data: subscriptions }, { data: tracks }] = await Promise.all([
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

  return { hasActiveSubscription, unlockedTrackSlugs };
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
