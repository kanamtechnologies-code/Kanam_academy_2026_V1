"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpenCheck, Flame, Sparkles, Trophy } from "lucide-react";

import { TrackCarousel } from "@/components/dashboard/TrackCarousel";
import { TrackRoadmap } from "@/components/dashboard/TrackRoadmap";
import { TrackIcon } from "@/components/tracks/TrackIcon";
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
import {
  isGuestMode,
} from "@/lib/guestProgress";
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

/** Dashboard display order — premier paths first for the carousel. */
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
    classRestricted: false,
    entitlementRestricted: false,
    enabledLessonIds: null,
    classIds: [],
    isAsyncCohort: false,
    hasActiveSubscription: false,
    unlockedTrackSlugs: [],
  });
  const [isParentAccount, setIsParentAccount] = React.useState(false);

  React.useEffect(() => {
    if (isGuestMode()) {
      router.replace("/demo");
    }
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
    if (!lessonAccess.entitlementRestricted || lessonAccess.classRestricted) return set;
    for (const track of dashboardTracks) {
      if (!isTrackUnlockedForAccess(track.id, lessonAccess)) set.add(track.id);
    }
    return set;
  }, [dashboardTracks, lessonAccess]);

  const totalXp = totalXpAcrossTracks(completedIds);
  const activeTrack =
    dashboardTracks.find((t) => t.id === activeTab) ?? dashboardTracks[0]!;
  const activeTrackProgress = trackProgress(completedIds, activeTrack.lessons, {
    openLessonIds,
  });

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
      } else {
        setHasSavedProgress(false);
        setCompletedIds([]);
      }

      try {
        const accessRes = await fetch("/api/student/lesson-access");
        const accessJson = (await accessRes.json()) as {
          access?: StudentLessonAccess;
        };
        if (accessRes.ok && accessJson.access) {
          setLessonAccess(accessJson.access);
        }
      } catch {
        // ignore
      }
    })();
  }, [router]);

  return (
    <div className="kanam-dashboard-shell min-h-dvh px-3 py-4 text-slate-900 sm:px-4 sm:py-6 md:px-10">
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
                    ? "Pick up where you left off, track your streak, and jump into your next lesson faster."
                    : "You're all set — pick a track below and start your first lesson."}
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-11 w-full border-white/40 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
                  asChild
                >
                  <Link href="/parent">
                    {isParentAccount ? "Switch child" : "Upgrade to family"}
                  </Link>
                </Button>
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
                  Active track
                </p>
                <p className="mt-1 flex items-center gap-2 text-lg font-black text-white">
                  <Trophy className="h-5 w-5 text-[var(--accent)]" />
                  {activeTrack.title}
                </p>
                <p className="mt-1 text-xs font-semibold text-white/80">
                  {activeTrackProgress.percent}% complete
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              {activeTrackProgress.nextLesson?.href &&
              !activeTrackProgress.nextLesson.comingSoon &&
              isLessonOpenForStudent(
                activeTrackProgress.nextLesson.id,
                Boolean(lessonAccess.classRestricted),
                lessonAccess.enabledLessonIds,
                completedIds,
                Boolean(lessonAccess.entitlementRestricted)
              ) ? (
                <Button
                  asChild
                  className="h-auto min-h-11 w-full whitespace-normal bg-white px-4 py-3 text-left text-[var(--brand-2)] hover:bg-white/95 sm:w-auto"
                >
                  <Link href={activeTrackProgress.nextLesson.href} className="flex items-start gap-2">
                    <Flame className="mt-0.5 h-4 w-4 shrink-0" />
                    <span className="min-w-0">
                      <span className="line-clamp-2 font-extrabold">
                        Continue: {activeTrackProgress.nextLesson.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-[var(--brand)]/80">
                        ({weekSessionLabel(activeTrackProgress.nextLesson)})
                      </span>
                    </span>
                  </Link>
                </Button>
              ) : null}
              <Badge className="flex w-fit items-center gap-1.5 border border-white/35 bg-white/15 px-3 py-1.5 text-white">
                <TrackIcon trackId={activeTrack.id} className="h-3.5 w-3.5 text-white" />
                <span className="hidden sm:inline">{activeTrack.subtitle}</span>
                <span className="sm:hidden">{activeTrack.title}</span>
              </Badge>
            </div>
          </div>
        </section>

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

        {lessonAccess.classRestricted ? (
          <Notice variant="info" title="Class assignments control access">
            Your instructor chooses which lessons are open. Locked lessons show as{" "}
            <span className="font-semibold text-slate-800">Not assigned</span>.
          </Notice>
        ) : lessonAccess.hasActiveSubscription ? (
          <Notice
            variant="success"
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
        ) : lessonAccess.entitlementRestricted ? (
          <Notice
            variant="lock"
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
        ) : lessonAccess.isAsyncCohort ? (
          <Notice variant="info" title="Self-paced learning">
            Go at your own speed — unlock tracks from Billing when you&apos;re ready.
          </Notice>
        ) : null}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TrackCarousel
            tracks={dashboardTracks}
            activeId={activeTab}
            onSelect={setActiveTab}
            completedIds={completedIds}
            lockedTrackIds={lockedTrackIds}
          />

          {dashboardTracks.map((track) => {
            const trackUnlocked = isTrackUnlockedForAccess(track.id, lessonAccess);
            const paywallLocked =
              Boolean(lessonAccess.entitlementRestricted) &&
              !lessonAccess.classRestricted &&
              !trackUnlocked;
            return (
              <TabsContent key={track.id} value={track.id}>
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
        </Tabs>
      </div>
    </div>
  );
}
