import { TRACKS, totalXpAcrossTracks, trackProgress } from "@/lib/tracks";

import type {
  DailyActivityPoint,
  ExamInsight,
  LearnerInsights,
  LessonActivityInsight,
  ProgressEventRow,
  ProgressRow,
  TrackInsight,
} from "./types";

function asRecord(payload: ProgressEventRow["payload"]): Record<string, unknown> {
  return payload && typeof payload === "object" ? payload : {};
}

function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

function catalogById() {
  const map = new Map<
    string,
    { title: string; trackId: string; trackTitle: string; kind?: string; xp: number }
  >();
  for (const track of TRACKS) {
    for (const lesson of track.lessons) {
      map.set(lesson.id, {
        title: lesson.title,
        trackId: track.id,
        trackTitle: track.title,
        kind: lesson.kind,
        xp: lesson.xp,
      });
    }
  }
  return map;
}

/** Consecutive calendar days with activity ending on the most recent active day. */
export function computeStreaks(activeDayKeys: string[]): {
  current: number;
  longest: number;
} {
  const days = [...new Set(activeDayKeys)].sort();
  if (days.length === 0) return { current: 0, longest: 0 };

  let longest = 1;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(`${days[i - 1]}T00:00:00Z`).getTime();
    const cur = new Date(`${days[i]}T00:00:00Z`).getTime();
    if (cur - prev === 86_400_000) {
      run += 1;
      longest = Math.max(longest, run);
    } else {
      run = 1;
    }
  }

  const today = dayKey(new Date().toISOString());
  const yesterday = dayKey(new Date(Date.now() - 86_400_000).toISOString());
  const last = days[days.length - 1];
  if (last !== today && last !== yesterday) {
    return { current: 0, longest };
  }

  let current = 1;
  for (let i = days.length - 1; i > 0; i--) {
    const prev = new Date(`${days[i - 1]}T00:00:00Z`).getTime();
    const cur = new Date(`${days[i]}T00:00:00Z`).getTime();
    if (cur - prev === 86_400_000) current += 1;
    else break;
  }
  return { current, longest: Math.max(longest, current) };
}

function estimateTimeFromEvents(events: ProgressEventRow[]): {
  seconds: number;
  estimated: boolean;
} {
  let heartbeatSeconds = 0;
  const byLessonDay = new Map<string, number[]>();

  for (const ev of events) {
    const payload = asRecord(ev.payload);
    if (ev.event_type === "session_heartbeat") {
      const delta = Number(payload.activeSecondsDelta ?? payload.seconds ?? 0);
      if (Number.isFinite(delta) && delta > 0) heartbeatSeconds += Math.min(delta, 120);
      continue;
    }
    if (!ev.lesson_id || !ev.created_at) continue;
    const key = `${ev.lesson_id}|${dayKey(ev.created_at)}`;
    const t = new Date(ev.created_at).getTime();
    if (!Number.isFinite(t)) continue;
    const arr = byLessonDay.get(key) ?? [];
    arr.push(t);
    byLessonDay.set(key, arr);
  }

  if (heartbeatSeconds > 0) {
    return { seconds: heartbeatSeconds, estimated: false };
  }

  let estimated = 0;
  for (const times of byLessonDay.values()) {
    if (times.length < 2) {
      estimated += 60;
      continue;
    }
    times.sort((a, b) => a - b);
    // Cap each inter-event gap at 5 minutes to avoid overnight idle.
    for (let i = 1; i < times.length; i++) {
      const gap = Math.min(times[i] - times[i - 1], 5 * 60_000);
      estimated += gap;
    }
    estimated += 30_000; // buffer for last action
  }
  return { seconds: Math.round(estimated / 1000), estimated: estimated > 0 };
}

function quizStatsFromEvents(events: ProgressEventRow[]): {
  attempts: number;
  correct: number;
} {
  let attempts = 0;
  let correct = 0;
  for (const ev of events) {
    if (ev.event_type !== "run") continue;
    const payload = asRecord(ev.payload);
    if (typeof payload.correct === "boolean") {
      attempts += 1;
      if (payload.correct) correct += 1;
    }
  }
  return { attempts, correct };
}

function examInsights(
  events: ProgressEventRow[],
  progressByLesson: Map<string, ProgressRow>,
  catalog: ReturnType<typeof catalogById>
): ExamInsight[] {
  const byLesson = new Map<string, ExamInsight>();

  for (const [lessonId, row] of progressByLesson) {
    if (row.exam_percent == null && row.exam_total == null) continue;
    const meta = catalog.get(lessonId);
    byLesson.set(lessonId, {
      lessonId,
      title: meta?.title ?? lessonId,
      slug: null,
      correct: Number(row.exam_correct ?? 0),
      total: Number(row.exam_total ?? 0),
      percent: Number(row.exam_percent ?? 0),
      completedAt: row.success_at,
    });
  }

  for (const ev of events) {
    if (ev.event_type !== "lesson_success" || !ev.lesson_id) continue;
    const payload = asRecord(ev.payload);
    if (payload.kind !== "ap_csp_exam") continue;
    const correct = Number(payload.correct ?? 0);
    const total = Number(payload.total ?? 0);
    const percent = Number(
      payload.percent ?? (total > 0 ? Math.round((correct / total) * 100) : 0)
    );
    const meta = catalog.get(ev.lesson_id);
    const prev = byLesson.get(ev.lesson_id);
    // Keep latest / highest percent attempt.
    if (!prev || percent >= prev.percent) {
      byLesson.set(ev.lesson_id, {
        lessonId: ev.lesson_id,
        title: meta?.title ?? ev.lesson_id,
        slug: typeof payload.slug === "string" ? payload.slug : null,
        correct,
        total,
        percent,
        completedAt: ev.created_at,
      });
    }
  }

  return [...byLesson.values()].sort((a, b) =>
    (b.completedAt ?? "").localeCompare(a.completedAt ?? "")
  );
}

function buildDailyActivity(events: ProgressEventRow[]): DailyActivityPoint[] {
  const byDay = new Map<string, DailyActivityPoint>();
  for (const ev of events) {
    if (!ev.created_at) continue;
    const date = dayKey(ev.created_at);
    const point = byDay.get(date) ?? {
      date,
      events: 0,
      lessonsTouched: 0,
      completions: 0,
    };
    point.events += 1;
    if (ev.event_type === "lesson_success") point.completions += 1;
    byDay.set(date, point);
  }

  for (const [date, point] of byDay) {
    const lessons = new Set(
      events
        .filter((e) => e.created_at && dayKey(e.created_at) === date && e.lesson_id)
        .map((e) => e.lesson_id as string)
    );
    point.lessonsTouched = lessons.size;
  }

  const out: DailyActivityPoint[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = dayKey(new Date(Date.now() - i * 86_400_000).toISOString());
    out.push(byDay.get(d) ?? { date: d, events: 0, lessonsTouched: 0, completions: 0 });
  }
  return out;
}

export function computeLearnerInsights(input: {
  studentId: string;
  displayName: string;
  grade?: string | null;
  progress: ProgressRow[];
  events: ProgressEventRow[];
}): LearnerInsights {
  const catalog = catalogById();
  const progressByLesson = new Map<string, ProgressRow>();
  for (const row of input.progress) {
    if (row.lesson_id) progressByLesson.set(row.lesson_id, row);
  }

  const completedIds = input.progress.filter((p) => p.success).map((p) => p.lesson_id);
  const completedSet = new Set(completedIds);

  let lessonsTotal = 0;
  for (const track of TRACKS) {
    lessonsTotal += track.lessons.filter((l) => l.kind !== "assessment").length;
  }

  const lessonsCompleted = TRACKS.reduce((sum, track) => {
    return (
      sum +
      track.lessons.filter((l) => l.kind !== "assessment" && completedSet.has(l.id)).length
    );
  }, 0);

  const tracks: TrackInsight[] = TRACKS.map((track) => {
    const lessons = track.lessons.filter((l) => l.kind !== "assessment");
    const assessments = track.lessons.filter((l) => l.kind === "assessment");
    const prog = trackProgress(completedIds, track.lessons);
    const inProgressCount = lessons.filter((l) => {
      const row = progressByLesson.get(l.id);
      return row && !row.success && (row.opened_at || row.has_run || row.last_event_at);
    }).length;
    return {
      trackId: track.id,
      trackTitle: track.title,
      icon: track.icon,
      completedCount: prog.completedCount,
      totalCount: prog.totalCount,
      percent: prog.percent,
      xp: prog.totalXp,
      inProgressCount,
      assessmentCompleted: assessments.filter((l) => completedSet.has(l.id)).length,
      assessmentTotal: assessments.length,
    };
  }).filter((t) => t.totalCount > 0 || t.assessmentTotal > 0);

  const rollupTime = input.progress.reduce(
    (sum, p) => sum + Math.max(0, Number(p.time_spent_seconds ?? 0)),
    0
  );
  const eventTime = estimateTimeFromEvents(input.events);
  const timeSpentSeconds = rollupTime > 0 ? rollupTime : eventTime.seconds;
  const timeSpentEstimated = rollupTime <= 0 && eventTime.estimated;

  const rollupQuizAttempts = input.progress.reduce(
    (sum, p) => sum + Math.max(0, Number(p.quiz_attempts ?? 0)),
    0
  );
  const rollupQuizCorrect = input.progress.reduce(
    (sum, p) => sum + Math.max(0, Number(p.quiz_correct ?? 0)),
    0
  );
  const eventQuiz = quizStatsFromEvents(input.events);
  const quizAttempts = rollupQuizAttempts > 0 ? rollupQuizAttempts : eventQuiz.attempts;
  const quizCorrect = rollupQuizAttempts > 0 ? rollupQuizCorrect : eventQuiz.correct;
  const quizAccuracyPercent =
    quizAttempts > 0 ? Math.round((quizCorrect / quizAttempts) * 100) : null;

  const activitiesCompleted = input.progress.reduce(
    (sum, p) => sum + Math.max(0, Number(p.activities_completed ?? 0)),
    0
  );
  // Fallback: count activity runs from events when rollup empty.
  const activityFromEvents =
    activitiesCompleted > 0
      ? activitiesCompleted
      : input.events.filter((e) => {
          if (e.event_type !== "run") return false;
          const p = asRecord(e.payload);
          return typeof p.activityId === "string" || p.kind === "bonus";
        }).length;

  const exams = examInsights(input.events, progressByLesson, catalog);
  const examAveragePercent =
    exams.length > 0
      ? Math.round(exams.reduce((s, e) => s + e.percent, 0) / exams.length)
      : null;

  const activeDayKeys: string[] = [];
  let lastActiveAt: string | null = null;
  let firstActiveAt: string | null = null;

  for (const row of input.progress) {
    for (const stamp of [row.last_event_at, row.success_at, row.opened_at]) {
      if (!stamp) continue;
      activeDayKeys.push(dayKey(stamp));
      if (!lastActiveAt || stamp > lastActiveAt) lastActiveAt = stamp;
      if (!firstActiveAt || stamp < firstActiveAt) firstActiveAt = stamp;
    }
  }
  for (const ev of input.events) {
    if (!ev.created_at) continue;
    activeDayKeys.push(dayKey(ev.created_at));
    if (!lastActiveAt || ev.created_at > lastActiveAt) lastActiveAt = ev.created_at;
    if (!firstActiveAt || ev.created_at < firstActiveAt) firstActiveAt = ev.created_at;
  }

  const { current: activityStreakDays, longest: longestStreakDays } =
    computeStreaks(activeDayKeys);
  const last30 = new Set(
    Array.from({ length: 30 }, (_, i) =>
      dayKey(new Date(Date.now() - i * 86_400_000).toISOString())
    )
  );
  const activeDaysLast30 = new Set(
    activeDayKeys.filter((d) => last30.has(d))
  ).size;

  const lessonsInProgress = input.progress.filter(
    (p) => !p.success && (p.opened_at || p.has_run || p.last_event_at)
  ).length;
  const lessonsOpened = input.progress.filter((p) => p.opened_at || p.last_event_at).length;

  const recentLessons: LessonActivityInsight[] = [...input.progress]
    .sort((a, b) =>
      (b.last_event_at ?? b.success_at ?? b.opened_at ?? "").localeCompare(
        a.last_event_at ?? a.success_at ?? a.opened_at ?? ""
      )
    )
    .slice(0, 12)
    .map((row) => {
      const meta = catalog.get(row.lesson_id);
      let status: LessonActivityInsight["status"] = "not_started";
      if (row.success) status = "completed";
      else if (row.opened_at || row.has_run || row.last_event_at) status = "in_progress";
      return {
        lessonId: row.lesson_id,
        title: meta?.title ?? row.lesson_id,
        trackTitle: meta?.trackTitle ?? "Track",
        status,
        openedAt: row.opened_at,
        lastEventAt: row.last_event_at,
        successAt: row.success_at,
        timeSpentSeconds: Math.max(0, Number(row.time_spent_seconds ?? 0)),
        hasRun: !!row.has_run,
      };
    });

  const weakTracks = [...tracks]
    .filter((t) => t.totalCount > 0 && (t.completedCount > 0 || t.inProgressCount > 0))
    .sort((a, b) => a.percent - b.percent)
    .slice(0, 3);

  return {
    studentId: input.studentId,
    displayName: input.displayName,
    grade: input.grade ?? null,
    generatedAt: new Date().toISOString(),
    summary: {
      totalXp: totalXpAcrossTracks(completedIds),
      lessonsCompleted,
      lessonsTotal,
      progressPercent: lessonsTotal
        ? Math.round((lessonsCompleted / lessonsTotal) * 100)
        : 0,
      lessonsInProgress,
      lessonsOpened,
      lastActiveAt,
      firstActiveAt,
      activityStreakDays,
      longestStreakDays,
      activeDaysLast30,
      timeSpentSeconds,
      timeSpentEstimated,
      quizAttempts,
      quizCorrect,
      quizAccuracyPercent,
      activitiesCompleted: activityFromEvents,
      examAveragePercent,
      examsTaken: exams.length,
    },
    tracks,
    exams,
    recentLessons,
    dailyActivity: buildDailyActivity(input.events),
    weakTracks,
  };
}
