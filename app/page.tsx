"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpenCheck, Flame, Sparkles, Trophy } from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isInstructorRole } from "@/lib/roles";
import {
  isGuestMode,
} from "@/lib/guestProgress";
import {
  isLessonOpenForStudent,
  trackProgress,
  totalXpAcrossTracks,
  TRACKS,
  weekSessionLabel,
} from "@/lib/tracks";
import type { StudentLessonAccess } from "@/lib/classAssignments";

const USER_NAME_KEY = "kanam.userName";

export default function Home() {
  const router = useRouter();
  const [studentName, setStudentName] = React.useState<string>("Student");
  const [completedIds, setCompletedIds] = React.useState<string[]>([]);
  const [hasSavedProgress, setHasSavedProgress] = React.useState<boolean>(false);
  const [studentDbId, setStudentDbId] = React.useState<string>("");
  const [resetOpen, setResetOpen] = React.useState<boolean>(false);
  const [resetStep, setResetStep] = React.useState<1 | 2 | 3>(1);
  const [activeTab, setActiveTab] = React.useState<string>("ai-literacy");
  const [lessonAccess, setLessonAccess] = React.useState<StudentLessonAccess>({
    classRestricted: false,
    enabledLessonIds: null,
    classIds: [],
    isAsyncCohort: false,
  });

  React.useEffect(() => {
    if (isGuestMode()) {
      router.replace("/demo");
    }
  }, [router]);

  const openLessonIds = React.useMemo(() => {
    if (!lessonAccess.classRestricted || lessonAccess.enabledLessonIds == null) return null;
    const set = new Set(lessonAccess.enabledLessonIds);
    for (const id of completedIds) set.add(id);
    return set;
  }, [lessonAccess, completedIds]);

  const aiTrack = TRACKS.find((t) => t.id === "ai-literacy")!;
  const digitalTrack = TRACKS.find((t) => t.id === "digital-literacy")!;
  const cyberTrack = TRACKS.find((t) => t.id === "cybersecurity")!;
  const financeTrack = TRACKS.find((t) => t.id === "financial-literacy")!;
  const pythonTrack = TRACKS.find((t) => t.id === "python-starter")!;
  const dataTrack = TRACKS.find((t) => t.id === "data-analyst")!;
  const totalXp = totalXpAcrossTracks(completedIds);
  const activeTrack = TRACKS.find((t) => t.id === activeTab) ?? aiTrack;
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
      };
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
                lessonAccess.classRestricted,
                lessonAccess.enabledLessonIds,
                completedIds
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
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            You&apos;re in a class — your instructor controls which lessons are open. Locked lessons
            show as <span className="font-bold">Not assigned</span>.
          </div>
        ) : lessonAccess.isAsyncCohort ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
            You&apos;re learning <span className="font-bold">self-paced</span> — all lessons are open.
            Go at your own speed.
          </div>
        ) : null}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-end justify-between gap-3 px-0.5">
              <div>
                <p className="kanam-track-tabs-label">Training tracks</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Choose your path — guided lessons with badges and XP
                </p>
              </div>
              <p className="hidden text-xs font-bold uppercase tracking-[0.16em] text-slate-400 sm:block">
                {TRACKS.length} paths
              </p>
            </div>
            <TabsList className="kanam-track-tabs grid h-auto w-full grid-cols-2 gap-2 overflow-visible p-2.5 sm:grid-cols-3 sm:gap-2.5 sm:p-3 lg:grid-cols-6">
              {(
                [
                  { track: aiTrack, label: "AI Literacy" },
                  { track: digitalTrack, label: "Digital Literacy" },
                  { track: cyberTrack, label: "Cybersecurity" },
                  { track: financeTrack, label: "Financial Literacy" },
                  { track: pythonTrack, label: "Python Starter" },
                  { track: dataTrack, label: "Data Analyst" },
                ] as const
              ).map(({ track, label }) => (
                <TabsTrigger
                  key={track.id}
                  value={track.id}
                  title={track.subtitle}
                  className="kanam-track-tab flex h-full min-h-[4.25rem] w-full flex-col items-center justify-center gap-1.5 whitespace-normal rounded-[0.95rem] px-1.5 py-2.5 text-center sm:min-h-[4.5rem] sm:gap-2 sm:px-2"
                >
                  <span className="kanam-track-tab-icon shrink-0">
                    <TrackIcon trackId={track.id} className="h-4 w-4" />
                  </span>
                  <span className="kanam-track-tab-label text-[11px] leading-snug sm:text-xs md:text-[13px]">
                    {label}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="ai-literacy">
            <TrackRoadmap
              track={aiTrack}
              completedIds={completedIds}
              classRestricted={lessonAccess.classRestricted}
              enabledLessonIds={lessonAccess.enabledLessonIds}
            />
          </TabsContent>

          <TabsContent value="digital-literacy">
            <TrackRoadmap
              track={digitalTrack}
              completedIds={completedIds}
              classRestricted={lessonAccess.classRestricted}
              enabledLessonIds={lessonAccess.enabledLessonIds}
            />
          </TabsContent>

          <TabsContent value="cybersecurity">
            <TrackRoadmap
              track={cyberTrack}
              completedIds={completedIds}
              classRestricted={lessonAccess.classRestricted}
              enabledLessonIds={lessonAccess.enabledLessonIds}
            />
          </TabsContent>

          <TabsContent value="financial-literacy">
            <TrackRoadmap
              track={financeTrack}
              completedIds={completedIds}
              classRestricted={lessonAccess.classRestricted}
              enabledLessonIds={lessonAccess.enabledLessonIds}
            />
          </TabsContent>

          <TabsContent value="python-starter">
            <TrackRoadmap
              track={pythonTrack}
              completedIds={completedIds}
              classRestricted={lessonAccess.classRestricted}
              enabledLessonIds={lessonAccess.enabledLessonIds}
            />
          </TabsContent>

          <TabsContent value="data-analyst">
            <TrackRoadmap
              track={dataTrack}
              completedIds={completedIds}
              classRestricted={lessonAccess.classRestricted}
              enabledLessonIds={lessonAccess.enabledLessonIds}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
