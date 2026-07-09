"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpenCheck, Flame, Sparkles, Trophy } from "lucide-react";

import { TrackRoadmap } from "@/components/dashboard/TrackRoadmap";
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
  GUEST_PROGRESS_EVENT,
  getGuestCompletedIds,
  getGuestName,
  isGuestMode,
  resetGuestProgress,
} from "@/lib/guestProgress";
import {
  DATA_ANALYST_PREREQUISITES,
  isDataAnalystTrackUnlocked,
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
  });

  const openLessonIds = React.useMemo(() => {
    if (!lessonAccess.classRestricted || lessonAccess.enabledLessonIds == null) return null;
    const set = new Set(lessonAccess.enabledLessonIds);
    for (const id of completedIds) set.add(id);
    return set;
  }, [lessonAccess, completedIds]);

  const aiTrack = TRACKS.find((t) => t.id === "ai-literacy")!;
  const digitalTrack = TRACKS.find((t) => t.id === "digital-literacy")!;
  const pythonTrack = TRACKS.find((t) => t.id === "python-starter")!;
  const dataTrack = TRACKS.find((t) => t.id === "data-analyst")!;
  const dataUnlocked = isDataAnalystTrackUnlocked(completedIds);
  const totalXp = totalXpAcrossTracks(completedIds);
  const activeTrack = TRACKS.find((t) => t.id === activeTab) ?? aiTrack;
  const activeTrackProgress = trackProgress(completedIds, activeTrack.lessons, {
    openLessonIds,
  });

  const resetProgress = async () => {
    if (isGuestMode()) {
      resetGuestProgress();
      setHasSavedProgress(true);
      setCompletedIds([]);
      return;
    }
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
    if (!isGuestMode()) return;
    const refresh = () => setCompletedIds(getGuestCompletedIds());
    window.addEventListener(GUEST_PROGRESS_EVENT, refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener(GUEST_PROGRESS_EVENT, refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  React.useEffect(() => {
    (async () => {
      // Guest / demo mode: everything lives in local storage, no Supabase.
      if (isGuestMode()) {
        setStudentName(getGuestName());
        setCompletedIds(getGuestCompletedIds());
        setHasSavedProgress(true);
        return;
      }

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

  const prereqLabels = DATA_ANALYST_PREREQUISITES.map((id) => {
    const lesson = pythonTrack.lessons.find((l) => l.id === id);
    return lesson?.title ?? id;
  });

  return (
    <div className="kanam-dashboard-shell min-h-dvh px-4 py-6 text-slate-900 md:px-10">
      <div className="mx-auto w-full max-w-[1320px] space-y-6">
        <section className="kanam-dashboard-hero rounded-[30px] p-6 md:p-8">
          <div className="kanam-dashboard-hero-overlay" />
          <div className="relative z-10 space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-white/85">
                  Kanam Academy · Learning hub
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">
                  Welcome back, {studentName}!
                </h1>
                <p className="mt-2 max-w-2xl text-sm font-medium text-white/85 md:text-base">
                  Pick up where you left off, track your streak, and jump into your next lesson
                  faster.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-white/40 bg-white/10 text-white hover:bg-white/20"
                onClick={() => setResetOpen(true)}
              >
                Reset progress
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
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

            <div className="flex flex-wrap items-center gap-2">
              {activeTrackProgress.nextLesson?.href &&
              !activeTrackProgress.nextLesson.comingSoon &&
              isLessonOpenForStudent(
                activeTrackProgress.nextLesson.id,
                lessonAccess.classRestricted,
                lessonAccess.enabledLessonIds,
                completedIds
              ) ? (
                <Button asChild className="bg-white text-[var(--brand-2)] hover:bg-white/95">
                  <Link href={activeTrackProgress.nextLesson.href}>
                    <Flame className="h-4 w-4" />
                    Continue: {activeTrackProgress.nextLesson.title}
                    <span className="text-xs text-[var(--brand)]/80">
                      ({weekSessionLabel(activeTrackProgress.nextLesson)})
                    </span>
                  </Link>
                </Button>
              ) : null}
              <Badge className="border border-white/35 bg-white/15 px-3 py-1 text-white">
                {activeTrack.icon} {activeTrack.subtitle}
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
        ) : null}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="kanam-track-tabs h-auto w-full flex-wrap gap-2 p-2 md:w-auto">
            <TabsTrigger value="ai-literacy" className="gap-2 px-5 py-2.5">
              <span>{aiTrack.icon}</span>
              {aiTrack.title}
              {aiTrack.lessons.some((l) => l.hasLesson) ? (
                <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                  📖 Guided lessons
                </span>
              ) : null}
            </TabsTrigger>
            <TabsTrigger value="digital-literacy" className="gap-2 px-5 py-2.5">
              <span>{digitalTrack.icon}</span>
              {digitalTrack.title}
              {digitalTrack.lessons.some((l) => l.hasLesson) ? (
                <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                  📖 Guided lessons
                </span>
              ) : null}
            </TabsTrigger>
            <TabsTrigger value="python-starter" className="gap-2 px-5 py-2.5">
              <span>{pythonTrack.icon}</span>
              {pythonTrack.title}
              {pythonTrack.lessons.some((l) => l.hasLesson) ? (
                <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                  📖 Guided lessons
                </span>
              ) : null}
            </TabsTrigger>
            <TabsTrigger value="data-analyst" className="gap-2 px-5 py-2.5">
              <span>{dataTrack.icon}</span>
              {dataTrack.title}
              {!dataUnlocked ? (
                <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                  Locked
                </span>
              ) : dataTrack.lessons.some((l) => l.hasLesson) ? (
                <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                  📖 Guided lessons
                </span>
              ) : null}
            </TabsTrigger>
          </TabsList>

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
              locked={!dataUnlocked}
              lockMessage={`Complete these Python lessons first: ${prereqLabels.join(", ")}.`}
              lockCtaHref="/learn/1"
              lockCtaLabel="Start Python lesson 1"
              classRestricted={lessonAccess.classRestricted}
              enabledLessonIds={lessonAccess.enabledLessonIds}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
