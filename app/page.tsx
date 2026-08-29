"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpenCheck, ChevronRight, Flame, Sparkles, Trophy, Users } from "lucide-react";

import { ExploreAcademyDrawer } from "@/components/dashboard/TrackCarousel";
import { TrackRoadmap } from "@/components/dashboard/TrackRoadmap";
import { KanamAmbientBackground } from "@/components/brand/KanamAmbientBackground";
import { TrackIconArt } from "@/components/tracks/TrackIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Notice } from "@/components/ui/notice";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isInstructorRole, isParentRole } from "@/lib/roles";
import { isGuestMode, setGuestMode } from "@/lib/guestProgress";
import { isTrackUnlockedForAccess } from "@/lib/billing/access";
import {
  isLessonOpenForStudent,
  trackProgress,
  totalXpAcrossTracks,
  TRACKS,
  type Track,
  weekSessionLabel,
} from "@/lib/tracks";
import type { StudentLessonAccess } from "@/lib/classAssignments";
import { computeStreaks } from "@/lib/insights/computeLearnerInsights";

/** Dashboard display order — class-first studio still uses this for browse list. */
const DASHBOARD_TRACK_ORDER: Track["id"][] = [
  "ap-csp-prep",
  "advanced-ai",
  "ai-literacy",
  "ai-python",
  "data-analyst",
  "cybersecurity",
  "digital-literacy",
  "financial-literacy",
];

const USER_NAME_KEY = "kanam.userName";
const ACTIVE_TRACK_KEY = "kanam.activeTrack";

function isTrackId(value: string | null | undefined): value is Track["id"] {
  return Boolean(value && TRACKS.some((t) => t.id === value));
}

function readStoredActiveTrack(): Track["id"] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ACTIVE_TRACK_KEY);
    return isTrackId(raw) ? raw : null;
  } catch {
    return null;
  }
}

function writeStoredActiveTrack(id: Track["id"]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ACTIVE_TRACK_KEY, id);
  } catch {
    // ignore
  }
}

export default function Home() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center px-4">
          <p className="text-sm font-semibold text-slate-600">Loading dashboard…</p>
        </div>
      }
    >
      <HomeInner />
    </React.Suspense>
  );
}

function HomeInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [studentName, setStudentName] = React.useState<string>("Student");
  const [completedIds, setCompletedIds] = React.useState<string[]>([]);
  const [hasSavedProgress, setHasSavedProgress] = React.useState<boolean>(false);
  const [studentDbId, setStudentDbId] = React.useState<string>("");
  const [resetOpen, setResetOpen] = React.useState<boolean>(false);
  const [resetStep, setResetStep] = React.useState<1 | 2 | 3>(1);
  const [activeTab, setActiveTabState] = React.useState<string>("ai-literacy");

  const setActiveTab = React.useCallback((id: string) => {
    setActiveTabState(id);
    if (isTrackId(id)) writeStoredActiveTrack(id);
  }, []);

  // Restore last path (or ?track= from a lesson "back to dashboard" link).
  React.useEffect(() => {
    const fromQuery = searchParams.get("track");
    if (isTrackId(fromQuery)) {
      setActiveTab(fromQuery);
      return;
    }
    const stored = readStoredActiveTrack();
    if (stored) setActiveTabState(stored);
  }, [searchParams, setActiveTab]);

  const [lessonAccess, setLessonAccess] = React.useState<StudentLessonAccess>({
    // Fail closed until /api/student/lesson-access resolves (avoids false "unlocked").
    classRestricted: false,
    entitlementRestricted: true,
    enabledLessonIds: [],
    classIds: [],
    isAsyncCohort: false,
    hasActiveSubscription: false,
    unlockedTrackSlugs: [],
  });
  const [accessStatus, setAccessStatus] = React.useState<"loading" | "ok" | "error">("loading");
  const [isParentAccount, setIsParentAccount] = React.useState(false);
  const [activityStreakDays, setActivityStreakDays] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!isGuestMode()) return;
      try {
        const supabase = createSupabaseBrowserClient();
        if (supabase) {
          const { data } = await supabase.auth.getSession();
          if (cancelled) return;
          if (data.session) {
            setGuestMode(false);
            return;
          }
        }
      } catch {
        // fall through
      }
      if (!cancelled) router.replace("/demo");
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const lessonRestricted =
    Boolean(lessonAccess.classRestricted) || Boolean(lessonAccess.entitlementRestricted);

  const openLessonIds = React.useMemo(() => {
    if (!lessonRestricted) return null;
    const set = new Set(lessonAccess.enabledLessonIds ?? []);
    for (const id of completedIds) set.add(id);
    return set;
  }, [lessonRestricted, lessonAccess.enabledLessonIds, completedIds]);

  const dashboardTracks = React.useMemo(() => {
    const byId = new Map(TRACKS.map((t) => [t.id, t]));
    const ordered = DASHBOARD_TRACK_ORDER.map((id) => byId.get(id)).filter(
      (t): t is Track => Boolean(t)
    );
    const extras = TRACKS.filter((t) => !DASHBOARD_TRACK_ORDER.includes(t.id));
    return [...ordered, ...extras];
  }, []);

  const lockedTrackIds = React.useMemo(() => {
    const set = new Set<string>();
    if (lessonAccess.classRestricted) {
      for (const track of dashboardTracks) {
        if (!isTrackUnlockedForAccess(track.id, lessonAccess)) set.add(track.id);
      }
      return set;
    }
    if (!lessonAccess.entitlementRestricted) return set;
    for (const track of dashboardTracks) {
      if (!isTrackUnlockedForAccess(track.id, lessonAccess)) set.add(track.id);
    }
    return set;
  }, [dashboardTracks, lessonAccess]);

  // Class learners: land on an assigned track instead of a locked catalog path.
  React.useEffect(() => {
    if (!lessonAccess.classRestricted || accessStatus !== "ok") return;
    const assigned = dashboardTracks.filter((t) =>
      isTrackUnlockedForAccess(t.id, lessonAccess)
    );
    if (assigned.length === 0) return;
    if (!assigned.some((t) => t.id === activeTab)) {
      setActiveTab(assigned[0]!.id);
    }
  }, [lessonAccess, accessStatus, dashboardTracks, activeTab, setActiveTab]);

  const totalXp = totalXpAcrossTracks(completedIds);
  const activeTrack =
    dashboardTracks.find((t) => t.id === activeTab) ?? dashboardTracks[0]!;
  const activeTrackProgress = trackProgress(completedIds, activeTrack.lessons, {
    openLessonIds,
  });

  const assignedBy = React.useMemo(() => {
    if (!lessonAccess.classRestricted || !lessonAccess.enrolledClasses?.length) {
      return null;
    }
    const first = lessonAccess.enrolledClasses[0]!;
    if (lessonAccess.enrolledClasses.length === 1) {
      return first.code ? `${first.name} · code ${first.code}` : first.name;
    }
    return lessonAccess.enrolledClasses
      .map((c) => (c.code ? `${c.name} (${c.code})` : c.name))
      .join(" · ");
  }, [lessonAccess.classRestricted, lessonAccess.enrolledClasses]);

  const nextLessonOpen =
    Boolean(activeTrackProgress.nextLesson?.href) &&
    !activeTrackProgress.nextLesson?.comingSoon &&
    isLessonOpenForStudent(
      activeTrackProgress.nextLesson!.id,
      Boolean(lessonAccess.classRestricted),
      lessonAccess.enabledLessonIds,
      completedIds,
      Boolean(lessonAccess.entitlementRestricted)
    );

  const resetProgress = async () => {
    if (!studentDbId) return;
    try {
      const supabase = createSupabaseBrowserClient();
      if (supabase) {
        await supabase.from("lesson_progress").delete().eq("student_id", studentDbId);
        await supabase.from("progress_events").delete().eq("student_id", studentDbId);
      }
    } catch {
      // ignore
    }
    setHasSavedProgress(true);
    setCompletedIds([]);
  };

  React.useEffect(() => {
    (async () => {
      if (isGuestMode()) return;

      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        router.replace("/welcome");
        return;
      }
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/welcome");
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      if (isInstructorRole(userData.user)) {
        router.replace("/instructor");
        return;
      }

      const ensureRes = await fetch("/api/auth/ensure-profile", { method: "POST" });
      const ensureJson = (await ensureRes.json()) as {
        student?: { id?: string; display_name?: string };
        needsChildSelect?: boolean;
        needsParentalConsent?: boolean;
        role?: string;
      };

      const parentAccount = isParentRole(userData.user);
      setIsParentAccount(parentAccount);

      if (parentAccount && ensureJson.needsParentalConsent) {
        router.replace("/parent?consent=1");
        return;
      }

      if (parentAccount && (ensureJson.needsChildSelect || !ensureJson?.student?.id)) {
        router.replace("/parent?pick=1");
        return;
      }

      const studentId = String(ensureJson?.student?.id ?? "");
      const displayName = String(ensureJson?.student?.display_name ?? "");
      if (studentId) setStudentDbId(studentId);
      if (displayName) {
        setStudentName(displayName);
        try {
          window.localStorage.setItem(USER_NAME_KEY, displayName);
        } catch {
          // ignore
        }
      }

      if (studentId) {
        const { data: rows } = await supabase
          .from("lesson_progress")
          .select("lesson_id, success")
          .eq("student_id", studentId);
        const completed =
          (rows ?? [])
            .filter((r) => Boolean(r?.success))
            .map((r) => String(r?.lesson_id))
            .filter(Boolean) ?? [];
        setCompletedIds(completed);
        setHasSavedProgress(true);

        const since = new Date(Date.now() - 120 * 86_400_000).toISOString();
        const { data: events } = await supabase
          .from("progress_events")
          .select("created_at")
          .eq("student_id", studentId)
          .gte("created_at", since)
          .limit(2000);
        const dayKeys = (events ?? [])
          .map((e) => String(e?.created_at ?? "").slice(0, 10))
          .filter(Boolean);
        setActivityStreakDays(computeStreaks(dayKeys).current);
      } else {
        setHasSavedProgress(false);
        setCompletedIds([]);
        setActivityStreakDays(0);
      }

      try {
        const accessRes = await fetch("/api/student/lesson-access");
        const accessJson = (await accessRes.json()) as {
          access?: StudentLessonAccess;
        };
        if (accessRes.ok && accessJson.access) {
          setLessonAccess(accessJson.access);
          setAccessStatus("ok");
        } else {
          setAccessStatus("error");
        }
      } catch {
        setAccessStatus("error");
      }
    })();
  }, [router]);

  return (
    <KanamAmbientBackground className="px-3 py-4 sm:px-4 sm:py-6 md:px-10">
      <div className="kanam-dashboard-shell min-h-dvh text-slate-900">
      <div className="mx-auto w-full max-w-[1320px] space-y-4 sm:space-y-6">
        <section
          className="kanam-dashboard-hero rounded-[22px] p-4 sm:rounded-[30px] sm:p-6 md:p-8"
        >
          <div className="kanam-dashboard-hero-overlay" />
          <div className="relative z-10 space-y-4 sm:space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/85 sm:text-xs sm:tracking-[0.24em]">
                  Kanam Academy · Learning hub
                </p>
                <h1 className="mt-2 break-words text-2xl font-black tracking-tight text-white sm:text-3xl md:text-5xl">
                  {hasSavedProgress && completedIds.length > 0
                    ? `Welcome back, ${studentName}!`
                    : `Welcome, ${studentName}!`}
                </h1>
                <p className="mt-2 max-w-2xl text-sm font-medium text-white/85 md:text-base">
                  {hasSavedProgress && completedIds.length > 0
                    ? "Pick up where you left off — your next step is ready."
                    : "You're all set — start with the next step in your class."}
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
                {isParentAccount ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="min-h-11 w-full border-white/40 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
                    asChild
                  >
                    <Link href="/parent">Switch child</Link>
                  </Button>
                ) : null}
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-11 w-full border-white/40 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
                  onClick={() => setResetOpen(true)}
                >
                  Reset progress
                </Button>
              </div>
            </div>

            <div className="grid gap-2 sm:gap-3 sm:grid-cols-3">
              <div className="kanam-dashboard-stat rounded-2xl p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/75">
                  Total XP
                </p>
                <p className="mt-1 flex items-center gap-2 text-2xl font-black text-white">
                  <Sparkles className="h-5 w-5 text-[var(--accent)]" />
                  {hasSavedProgress ? totalXp : 0}
                </p>
              </div>
              <div className="kanam-dashboard-stat rounded-2xl p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/75">
                  Lessons complete
                </p>
                <p className="mt-1 flex items-center gap-2 text-2xl font-black text-white">
                  <BookOpenCheck className="h-5 w-5 text-white/90" />
                  {hasSavedProgress ? activeTrackProgress.completedCount : 0}/
                  {activeTrackProgress.totalCount}
                </p>
                <p className="mt-1 text-xs font-semibold text-white/80">
                  in {activeTrack.title}
                </p>
              </div>
              <div className="kanam-dashboard-stat rounded-2xl p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/75">
                  Activity streak
                </p>
                <p className="mt-1 flex items-center gap-2 text-2xl font-black text-white">
                  <Flame className="h-5 w-5 text-[var(--accent)]" />
                  {hasSavedProgress ? activityStreakDays : 0}
                  <span className="text-base font-bold text-white/80">
                    day{activityStreakDays === 1 ? "" : "s"}
                  </span>
                </p>
                <p className="mt-1 text-xs font-semibold text-white/80">
                  <Trophy className="mr-1 inline h-3.5 w-3.5 text-[var(--accent)]" />
                  {activeTrack.title} · {activeTrackProgress.percent}%
                </p>
              </div>
            </div>

            <div className="relative grid gap-4 overflow-hidden rounded-[1.35rem] border border-white/25 bg-black/20 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.22)] backdrop-blur-sm sm:p-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-5">
              <div className="min-w-0 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                    <TrackIconArt
                      trackId={activeTrack.id}
                      className="h-24 w-24 rounded-[1.5rem] shadow-[0_16px_36px_rgba(15,23,42,0.28)] ring-2 ring-white/50 sm:h-28 sm:w-28"
                      alt=""
                    />
                    <div className="min-w-0 pt-0.5">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90 sm:text-xs">
                        {lessonAccess.classRestricted ? "Your class" : "Current focus"}
                      </p>
                      <p className="mt-1 text-xl font-black leading-tight tracking-tight text-white sm:text-2xl">
                        {activeTrack.title}
                      </p>
                      <p className="mt-2 text-base font-bold leading-snug text-[var(--accent)] sm:text-lg">
                        {activeTrack.outcome}
                      </p>
                      {assignedBy ? (
                        <p className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/30 bg-black/25 px-2.5 py-1 text-xs font-semibold text-white/95">
                          <Users className="h-3.5 w-3.5 shrink-0" />
                          <span className="min-w-0 truncate">Assigned by {assignedBy}</span>
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <Badge className="shrink-0 border border-white/40 bg-black/25 px-3 py-1.5 font-bold text-white">
                    {activeTrackProgress.totalXp} XP in this track
                  </Badge>
                </div>

                <div className="rounded-2xl border border-white/20 bg-black/25 p-3.5 sm:p-4">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/90">
                        Track progress
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {activeTrackProgress.completedCount} of{" "}
                        {activeTrackProgress.totalCount} lessons complete
                      </p>
                    </div>
                    <p className="text-2xl font-black tabular-nums text-white">
                      {activeTrackProgress.percent}%
                    </p>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-black/35 ring-1 ring-white/20">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-white transition-[width] duration-500 ease-out"
                      style={{
                        width: `${Math.max(0, Math.min(100, activeTrackProgress.percent))}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="min-w-0">
                {accessStatus === "error" ? (
                  <Button
                    type="button"
                    size="lg"
                    className="h-auto min-h-[4.25rem] w-full whitespace-normal border border-white/40 bg-white px-4 py-3.5 text-left text-[var(--brand-2)] hover:bg-white/95"
                    onClick={() => window.location.reload()}
                  >
                    Couldn’t load lesson access — tap to retry
                  </Button>
                ) : accessStatus === "loading" ? (
                  <div className="flex min-h-[4.25rem] items-center rounded-xl border border-white/25 bg-white/15 px-4 text-sm font-semibold text-white">
                    Checking which lessons are open…
                  </div>
                ) : nextLessonOpen && activeTrackProgress.nextLesson?.href ? (
                  <Link
                    href={activeTrackProgress.nextLesson.href}
                    className="group relative flex min-h-[5.5rem] w-full items-center gap-4 overflow-hidden rounded-[1.35rem] border border-[rgb(var(--accent-rgb)/0.55)] bg-gradient-to-br from-white via-white to-[rgb(var(--accent-rgb)/0.22)] p-4 text-left shadow-[0_18px_40px_rgba(15,23,42,0.22)] ring-1 ring-white/70 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(15,23,42,0.28)] sm:min-h-[6rem] sm:gap-5 sm:p-5"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-80"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-[rgb(var(--accent-rgb)/0.28)] blur-2xl transition group-hover:bg-[rgb(var(--accent-rgb)/0.4)]"
                    />
                    <span className="relative min-w-0 flex-1">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand)] sm:text-[11px]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_0_3px_rgba(216,192,122,0.35)]" />
                        Next step
                      </span>
                      <span className="mt-1.5 block text-lg font-black leading-snug tracking-tight text-[var(--brand-2)] sm:text-xl">
                        {activeTrackProgress.nextLesson.title}
                      </span>
                      <span className="mt-2 inline-flex items-center rounded-full border border-[rgb(var(--brand-rgb)/0.18)] bg-[rgb(var(--brand-rgb)/0.08)] px-2.5 py-1 text-[11px] font-bold text-[var(--brand-2)]/80">
                        {weekSessionLabel(activeTrackProgress.nextLesson)}
                      </span>
                    </span>
                    <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[rgb(var(--brand-rgb)/0.2)] bg-white text-[var(--brand-2)] shadow-[0_6px_14px_rgba(15,23,42,0.14)] transition group-hover:translate-x-0.5 group-hover:bg-[var(--brand-2)] group-hover:text-white">
                      <ChevronRight className="h-5 w-5" />
                    </span>
                  </Link>
                ) : lessonRestricted ? (
                  <Link
                    href={lessonAccess.classRestricted ? "#roadmap" : "/billing"}
                    className="group relative flex min-h-[5.5rem] w-full items-center justify-between gap-4 overflow-hidden rounded-[1.35rem] border border-white/45 bg-gradient-to-br from-white via-white to-[rgb(var(--accent-rgb)/0.18)] px-5 py-4 text-left shadow-[0_16px_36px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(15,23,42,0.24)]"
                  >
                    <span className="min-w-0">
                      <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand)]">
                        {lessonAccess.classRestricted ? "Your roadmap" : "Unlock paths"}
                      </span>
                      <span className="mt-1 block text-base font-black leading-snug text-[var(--brand-2)] sm:text-lg">
                        {lessonAccess.classRestricted
                          ? "See open lessons below"
                          : "View plans to unlock tracks"}
                      </span>
                    </span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--brand-2)] text-white shadow-[0_8px_18px_rgba(15,110,87,0.35)]">
                      <ChevronRight className="h-5 w-5" />
                    </span>
                  </Link>
                ) : (
                  <Button
                    size="lg"
                    disabled
                    className="min-h-[4.25rem] w-full border border-white/25 bg-white/20 text-white"
                  >
                    Track complete!
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        <ExploreAcademyDrawer
          tracks={dashboardTracks}
          activeId={activeTab}
          onSelect={setActiveTab}
          completedIds={completedIds}
          lockedTrackIds={lockedTrackIds}
          openLessonIds={openLessonIds}
          classRestricted={Boolean(lessonAccess.classRestricted)}
        />

        <Dialog
          open={resetOpen}
          onOpenChange={(open) => {
            setResetOpen(open);
            if (!open) setResetStep(1);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {resetStep === 1
                  ? "Reset all progress?"
                  : resetStep === 2
                    ? "Are you REALLY sure?"
                    : "Last warning"}
              </DialogTitle>
              <DialogDescription>
                {resetStep === 1
                  ? "This clears completed lessons across all tracks."
                  : resetStep === 2
                    ? "All badges and XP will reset."
                    : "This action cannot be undone."}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setResetOpen(false)}>
                Cancel
              </Button>
              {resetStep < 3 ? (
                <Button type="button" onClick={() => setResetStep((s) => (s + 1) as 2 | 3)}>
                  Yes, continue
                </Button>
              ) : (
                <Button
                  type="button"
                  className="bg-red-600 text-white hover:bg-red-500"
                  onClick={() => {
                    resetProgress();
                    setResetOpen(false);
                    setResetStep(1);
                  }}
                >
                  Reset forever
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {lessonAccess.hasActiveSubscription ? (
          <Notice
            variant="success"
            className="kanam-lift"
            title="Family subscription active"
            action={
              <Link
                href="/account/billing"
                className="text-sm font-bold text-[var(--brand-2)] underline underline-offset-2"
              >
                Billing hub
              </Link>
            }
          >
            All tracks are unlocked for every learner on this account.
          </Notice>
        ) : !lessonAccess.classRestricted && lessonAccess.entitlementRestricted ? (
          <Notice
            variant="lock"
            className="kanam-lift"
            title={
              (lessonAccess.unlockedTrackSlugs?.length ?? 0) > 0
                ? `${lessonAccess.unlockedTrackSlugs!.length} track${
                    lessonAccess.unlockedTrackSlugs!.length === 1 ? "" : "s"
                  } unlocked`
                : "Tracks are locked"
            }
            action={
              <Link
                href="/billing"
                className="text-sm font-bold text-[var(--brand-2)] underline underline-offset-2"
              >
                View plans
              </Link>
            }
          >
            {(lessonAccess.unlockedTrackSlugs?.length ?? 0) > 0
              ? "Other paths stay locked until you subscribe or buy them."
              : "Subscribe for the Family plan, or buy a learning path to open lessons."}
          </Notice>
        ) : !lessonAccess.classRestricted && lessonAccess.isAsyncCohort ? (
          <Notice variant="info" className="kanam-lift" title="Self-paced learning">
            Go at your own speed — unlock tracks from Billing when you&apos;re ready.
          </Notice>
        ) : null}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="kanam-lift min-w-0 overflow-hidden rounded-[1.35rem] border border-white/80 bg-white/95 p-4 backdrop-blur-sm sm:p-5 md:p-6">
            <div className="min-w-0 px-0.5">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--brand-2)]">
                Lesson roadmap
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600 sm:text-base">
                {lessonAccess.classRestricted
                  ? "Open lessons your instructor has assigned"
                  : "Weeks, sessions, and badges for this path"}
              </p>
            </div>

            <div className="mt-4 space-y-4">
          {dashboardTracks.map((track) => {
            const trackUnlocked = isTrackUnlockedForAccess(track.id, lessonAccess);
            const paywallLocked =
              Boolean(lessonAccess.entitlementRestricted) &&
              !lessonAccess.classRestricted &&
              !trackUnlocked;
            return (
              <TabsContent key={track.id} value={track.id} className="mt-0">
                <TrackRoadmap
                  track={track}
                  completedIds={completedIds}
                  classRestricted={Boolean(lessonAccess.classRestricted)}
                  entitlementRestricted={Boolean(lessonAccess.entitlementRestricted)}
                  enabledLessonIds={lessonAccess.enabledLessonIds}
                  locked={paywallLocked}
                  lockMessage={
                    paywallLocked
                      ? "Subscribe for all tracks, or buy this path to unlock its lessons. Live tutoring is sold separately."
                      : undefined
                  }
                  lockCtaHref={
                    paywallLocked ? `/billing?track=${encodeURIComponent(track.id)}` : undefined
                  }
                  lockCtaLabel={paywallLocked ? "Unlock this track" : undefined}
                />
              </TabsContent>
            );
          })}
            </div>
          </div>
        </Tabs>
      </div>
      </div>
    </KanamAmbientBackground>
  );
}
