import { TRACKS } from "@/lib/tracks";

import { computeLearnerInsights } from "./computeLearnerInsights";
import type {
  ClassInsights,
  ClassLearnerSummary,
  DailyActivityPoint,
  ProgressEventRow,
  ProgressRow,
} from "./types";

function avg(nums: number[]): number {
  if (nums.length === 0) return 0;
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

function avgNullable(nums: Array<number | null>): number | null {
  const vals = nums.filter((n): n is number => n != null);
  if (vals.length === 0) return null;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

export function computeClassInsights(input: {
  classId: string;
  className: string;
  learners: Array<{ id: string; display_name: string | null; grade: string | null }>;
  progress: ProgressRow[];
  events: ProgressEventRow[];
}): ClassInsights {
  const progressByStudent = new Map<string, ProgressRow[]>();
  const eventsByStudent = new Map<string, ProgressEventRow[]>();

  for (const row of input.progress) {
    const sid = String(row.student_id ?? "");
    if (!sid) continue;
    const arr = progressByStudent.get(sid) ?? [];
    arr.push(row);
    progressByStudent.set(sid, arr);
  }
  for (const ev of input.events) {
    const sid = String(ev.student_id ?? "");
    if (!sid) continue;
    const arr = eventsByStudent.get(sid) ?? [];
    arr.push(ev);
    eventsByStudent.set(sid, arr);
  }

  const learnerInsights = input.learners.map((learner) =>
    computeLearnerInsights({
      studentId: learner.id,
      displayName: learner.display_name || "Learner",
      grade: learner.grade,
      progress: progressByStudent.get(learner.id) ?? [],
      events: eventsByStudent.get(learner.id) ?? [],
    })
  );

  const summaries: ClassLearnerSummary[] = learnerInsights.map((li) => ({
    studentId: li.studentId,
    displayName: li.displayName,
    grade: li.grade,
    progressPercent: li.summary.progressPercent,
    lessonsCompleted: li.summary.lessonsCompleted,
    totalXp: li.summary.totalXp,
    lastActiveAt: li.summary.lastActiveAt,
    activityStreakDays: li.summary.activityStreakDays,
    timeSpentSeconds: li.summary.timeSpentSeconds,
    quizAccuracyPercent: li.summary.quizAccuracyPercent,
    examAveragePercent: li.summary.examAveragePercent,
  }));

  const now = Date.now();
  const d7 = now - 7 * 86_400_000;
  const d30 = now - 30 * 86_400_000;

  let activeLast7Days = 0;
  let activeLast30Days = 0;
  let neverActive = 0;
  for (const s of summaries) {
    if (!s.lastActiveAt) {
      neverActive += 1;
      continue;
    }
    const t = new Date(s.lastActiveAt).getTime();
    if (t >= d7) activeLast7Days += 1;
    if (t >= d30) activeLast30Days += 1;
  }

  const tracks = TRACKS.map((track) => {
    const percents: number[] = [];
    let learnersStarted = 0;
    let learnersCompleted = 0;
    for (const li of learnerInsights) {
      const t = li.tracks.find((x) => x.trackId === track.id);
      if (!t) continue;
      percents.push(t.percent);
      if (t.completedCount > 0 || t.inProgressCount > 0) learnersStarted += 1;
      if (t.totalCount > 0 && t.completedCount >= t.totalCount) learnersCompleted += 1;
    }
    return {
      trackId: track.id,
      trackTitle: track.title,
      icon: track.icon,
      avgPercent: avg(percents),
      learnersStarted,
      learnersCompleted,
    };
  });

  const dailyMap = new Map<string, DailyActivityPoint>();
  for (const li of learnerInsights) {
    for (const d of li.dailyActivity) {
      const cur = dailyMap.get(d.date) ?? {
        date: d.date,
        events: 0,
        lessonsTouched: 0,
        completions: 0,
      };
      cur.events += d.events;
      cur.lessonsTouched += d.lessonsTouched;
      cur.completions += d.completions;
      dailyMap.set(d.date, cur);
    }
  }
  const dailyActivity = [...dailyMap.values()].sort((a, b) => a.date.localeCompare(b.date));

  const examsTaken = learnerInsights.reduce((s, li) => s + li.summary.examsTaken, 0);

  const days = Array.from({ length: 14 }, (_, i) =>
    new Date(Date.now() - (13 - i) * 86_400_000).toISOString().slice(0, 10)
  );

  const heatmapRows = learnerInsights.map((li) => {
    const byDay: Record<string, number> = {};
    for (const day of days) byDay[day] = 0;
    for (const d of li.dailyActivity) {
      if (d.date in byDay) byDay[d.date] = d.events;
    }
    const max = Math.max(0, ...Object.values(byDay));
    return {
      studentId: li.studentId,
      displayName: li.displayName,
      byDay,
      max,
    };
  });
  const maxCell = Math.max(0, ...heatmapRows.map((r) => r.max));

  const trackIds = TRACKS.map((t) => t.id);
  const trackTitles = TRACKS.map((t) => t.title);
  const trackHeatmapRows = learnerInsights.map((li) => {
    const byTrack: Record<string, number> = {};
    for (const t of li.tracks) byTrack[t.trackId] = t.percent;
    for (const id of trackIds) {
      if (byTrack[id] == null) byTrack[id] = 0;
    }
    return {
      studentId: li.studentId,
      displayName: li.displayName,
      byTrack,
    };
  });

  return {
    classId: input.classId,
    className: input.className,
    generatedAt: new Date().toISOString(),
    learnerCount: input.learners.length,
    summary: {
      avgProgressPercent: avg(summaries.map((s) => s.progressPercent)),
      avgXp: avg(summaries.map((s) => s.totalXp)),
      avgStreakDays: avg(summaries.map((s) => s.activityStreakDays)),
      avgTimeSpentSeconds: avg(summaries.map((s) => s.timeSpentSeconds)),
      avgQuizAccuracyPercent: avgNullable(summaries.map((s) => s.quizAccuracyPercent)),
      activeLast7Days,
      activeLast30Days,
      neverActive,
      examsTaken,
      avgExamPercent: avgNullable(summaries.map((s) => s.examAveragePercent)),
    },
    tracks,
    learners: summaries.sort((a, b) => b.progressPercent - a.progressPercent),
    dailyActivity,
    heatmap: { days, rows: heatmapRows, maxCell },
    trackHeatmap: {
      trackIds,
      trackTitles,
      rows: trackHeatmapRows,
    },
  };
}
