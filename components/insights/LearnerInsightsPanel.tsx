"use client";

import type { ReactNode } from "react";
import {
  Activity,
  Award,
  BookOpen,
  Clock3,
  Flame,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DownloadCsvButton } from "@/components/insights/DownloadCsvButton";
import { formatDate, formatDateTime, formatDuration, shortDay } from "@/components/insights/format";
import type { LearnerInsights } from "@/lib/insights/types";
import { cn } from "@/lib/utils";

function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-500">
          {label}
        </p>
        <span className="text-emerald-700">{icon}</span>
      </div>
      <p className="mt-2 text-2xl font-black tracking-tight text-slate-900">{value}</p>
      {hint ? <p className="mt-1 text-xs font-medium text-slate-500">{hint}</p> : null}
    </div>
  );
}

function ProgressBar({ percent, className }: { percent: number; className?: string }) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-slate-200", className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500"
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  );
}

export function LearnerInsightsPanel({
  insights,
  className,
  csvHref,
}: {
  insights: LearnerInsights;
  className?: string;
  /** When set, shows a CSV download for this learner report. */
  csvHref?: string;
}) {
  const s = insights.summary;
  const chartData = insights.dailyActivity.map((d) => ({
    ...d,
    label: shortDay(d.date),
  }));

  return (
    <div className={cn("space-y-6", className)}>
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-emerald-800">
            Learner insights
          </p>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            {insights.displayName}
            {insights.grade ? (
              <span className="ml-2 text-base font-bold text-slate-500">
                Grade {insights.grade}
              </span>
            ) : null}
          </h2>
          <p className="text-sm text-slate-600">
            Last active {formatDateTime(s.lastActiveAt)} · Updated{" "}
            {formatDateTime(insights.generatedAt)}
          </p>
        </div>
        {csvHref ? <DownloadCsvButton href={csvHref} label="Download CSV" /> : null}
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Overall progress"
          value={`${s.progressPercent}%`}
          hint={`${s.lessonsCompleted} of ${s.lessonsTotal} lessons`}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          label="Total XP"
          value={`${s.totalXp}`}
          hint={`${s.lessonsInProgress} in progress`}
          icon={<Award className="h-4 w-4" />}
        />
        <StatCard
          label="Time on task"
          value={formatDuration(s.timeSpentSeconds)}
          hint={
            s.timeSpentEstimated
              ? "Estimated from activity events"
              : s.timeSpentSeconds > 0
                ? "Tracked active time"
                : "Will grow as they learn"
          }
          icon={<Clock3 className="h-4 w-4" />}
        />
        <StatCard
          label="Activity streak"
          value={`${s.activityStreakDays}d`}
          hint={`Longest ${s.longestStreakDays}d · ${s.activeDaysLast30} active days (30d)`}
          icon={<Flame className="h-4 w-4" />}
        />
        <StatCard
          label="Quiz accuracy"
          value={s.quizAccuracyPercent != null ? `${s.quizAccuracyPercent}%` : "—"}
          hint={
            s.quizAttempts > 0
              ? `${s.quizCorrect} correct of ${s.quizAttempts} attempts`
              : "Accuracy tracking starts on new quiz answers"
          }
          icon={<Target className="h-4 w-4" />}
        />
        <StatCard
          label="Activities done"
          value={`${s.activitiesCompleted}`}
          hint={`${s.lessonsOpened} lessons opened`}
          icon={<BookOpen className="h-4 w-4" />}
        />
        <StatCard
          label="Exam average"
          value={s.examAveragePercent != null ? `${s.examAveragePercent}%` : "—"}
          hint={s.examsTaken > 0 ? `${s.examsTaken} exam(s) submitted` : "No exams yet"}
          icon={<Award className="h-4 w-4" />}
        />
        <StatCard
          label="First active"
          value={formatDate(s.firstActiveAt)}
          hint="Account learning start"
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-end justify-between gap-2">
          <div>
            <h3 className="text-base font-black text-slate-900">Activity (30 days)</h3>
            <p className="text-xs text-slate-500">Events logged while learning</p>
          </div>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: "#64748b" }}
                interval="preserveStartEnd"
                minTickGap={24}
              />
              <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "#64748b" }} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
                formatter={(value, name) => {
                  const n = typeof value === "number" ? value : Number(value ?? 0);
                  const label =
                    name === "events"
                      ? "Events"
                      : name === "completions"
                        ? "Completions"
                        : String(name);
                  return [n, label];
                }}
              />
              <Bar dataKey="events" fill="#059669" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completions" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-base font-black text-slate-900">Progress by track</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {insights.tracks.map((track) => (
            <div
              key={track.trackId}
              className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold text-slate-900">
                    <span className="mr-1.5">{track.icon}</span>
                    {track.trackTitle}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {track.completedCount}/{track.totalCount} lessons · {track.xp} XP
                    {track.inProgressCount > 0 ? ` · ${track.inProgressCount} in progress` : ""}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-black text-emerald-700">{track.percent}%</span>
              </div>
              <ProgressBar percent={track.percent} className="mt-3" />
              {track.assessmentTotal > 0 ? (
                <p className="mt-2 text-xs font-semibold text-slate-600">
                  Assessments: {track.assessmentCompleted}/{track.assessmentTotal}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {insights.weakTracks.length > 0 ? (
        <section className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4">
          <h3 className="text-sm font-black text-amber-950">Needs attention</h3>
          <p className="mt-1 text-xs text-amber-900/80">
            Lowest completion among tracks they’ve started
          </p>
          <ul className="mt-3 space-y-2">
            {insights.weakTracks.map((t) => (
              <li
                key={t.trackId}
                className="flex items-center justify-between gap-2 text-sm font-semibold text-amber-950"
              >
                <span>
                  {t.icon} {t.trackTitle}
                </span>
                <span>{t.percent}%</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {insights.exams.length > 0 ? (
        <section className="space-y-3">
          <h3 className="text-base font-black text-slate-900">Exam scores</h3>
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Exam</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {insights.exams.map((exam) => (
                  <tr key={exam.lessonId} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-semibold text-slate-900">{exam.title}</td>
                    <td className="px-4 py-3 font-black text-emerald-700">
                      {exam.percent}%{" "}
                      <span className="font-semibold text-slate-500">
                        ({exam.correct}/{exam.total})
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{formatDate(exam.completedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        <h3 className="text-base font-black text-slate-900">Recent lesson activity</h3>
        {insights.recentLessons.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-4 text-sm text-slate-600">
            No lesson activity yet.
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Lesson</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Last event</th>
                </tr>
              </thead>
              <tbody>
                {insights.recentLessons.map((lesson) => (
                  <tr key={lesson.lessonId} className="border-t border-slate-100">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-900">{lesson.title}</p>
                      <p className="text-xs text-slate-500">{lesson.trackTitle}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide",
                          lesson.status === "completed" && "bg-emerald-100 text-emerald-800",
                          lesson.status === "in_progress" && "bg-amber-100 text-amber-900",
                          lesson.status === "not_started" && "bg-slate-100 text-slate-600"
                        )}
                      >
                        {lesson.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDateTime(lesson.lastEventAt ?? lesson.successAt ?? lesson.openedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
