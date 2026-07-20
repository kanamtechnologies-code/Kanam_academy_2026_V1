"use client";

import { Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ClassHeatmap } from "@/components/insights/ClassHeatmap";
import { DownloadCsvButton } from "@/components/insights/DownloadCsvButton";
import { formatDateTime, formatDuration, shortDay } from "@/components/insights/format";
import type { ClassInsights } from "@/lib/insights/types";
import { cn } from "@/lib/utils";

export function ClassInsightsPanel({
  insights,
  onSelectLearner,
  className,
}: {
  insights: ClassInsights;
  onSelectLearner?: (studentId: string) => void;
  className?: string;
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
            Class insights
          </p>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            {insights.className}
          </h2>
          <p className="text-sm text-slate-600">
            {insights.learnerCount} learners · Updated {formatDateTime(insights.generatedAt)}
          </p>
        </div>
        <DownloadCsvButton
          href={`/api/instructor/classes/${encodeURIComponent(insights.classId)}/insights/csv`}
          label="Download CSV"
        />
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Avg progress", value: `${s.avgProgressPercent}%` },
          { label: "Avg XP", value: `${s.avgXp}` },
          { label: "Avg time", value: formatDuration(s.avgTimeSpentSeconds) },
          {
            label: "Avg quiz accuracy",
            value: s.avgQuizAccuracyPercent != null ? `${s.avgQuizAccuracyPercent}%` : "—",
          },
          { label: "Active (7d)", value: `${s.activeLast7Days}` },
          { label: "Active (30d)", value: `${s.activeLast30Days}` },
          { label: "Never active", value: `${s.neverActive}` },
          {
            label: "Avg exam score",
            value: s.avgExamPercent != null ? `${s.avgExamPercent}%` : "—",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-500">
              {card.label}
            </p>
            <p className="mt-2 text-2xl font-black tracking-tight text-slate-900">{card.value}</p>
          </div>
        ))}
      </div>

      <ClassHeatmap insights={insights} onSelectLearner={onSelectLearner} />

      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
        <h3 className="mb-4 text-base font-black text-slate-900">Class activity (30 days)</h3>
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
              />
              <Bar dataKey="events" fill="#059669" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completions" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-base font-black text-slate-900">Track averages</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {insights.tracks.map((track) => (
            <div
              key={track.trackId}
              className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-extrabold text-slate-900">
                  <span className="mr-1.5">{track.icon}</span>
                  {track.trackTitle}
                </p>
                <span className="text-sm font-black text-emerald-700">{track.avgPercent}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500"
                  style={{ width: `${Math.min(100, track.avgPercent)}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {track.learnersStarted} started · {track.learnersCompleted} finished track
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-emerald-700" />
          <h3 className="text-base font-black text-slate-900">Learners</h3>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3">XP</th>
                <th className="px-4 py-3">Accuracy</th>
                <th className="px-4 py-3">Streak</th>
                <th className="px-4 py-3">Last active</th>
              </tr>
            </thead>
            <tbody>
              {insights.learners.map((learner) => (
                <tr
                  key={learner.studentId}
                  className={cn(
                    "border-t border-slate-100",
                    onSelectLearner && "cursor-pointer hover:bg-emerald-50/50"
                  )}
                  onClick={() => onSelectLearner?.(learner.studentId)}
                >
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {learner.displayName}
                    {learner.grade ? (
                      <span className="ml-1 text-xs font-medium text-slate-500">
                        · G{learner.grade}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 font-bold text-emerald-700">
                    {learner.progressPercent}%
                  </td>
                  <td className="px-4 py-3 text-slate-700">{learner.totalXp}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {learner.quizAccuracyPercent != null
                      ? `${learner.quizAccuracyPercent}%`
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{learner.activityStreakDays}d</td>
                  <td className="px-4 py-3 text-slate-600">
                    {formatDateTime(learner.lastActiveAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {onSelectLearner ? (
          <p className="text-xs text-slate-500">Tap a learner for their full report.</p>
        ) : null}
      </section>
    </div>
  );
}
