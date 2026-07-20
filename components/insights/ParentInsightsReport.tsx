"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BookOpenCheck,
  Clock3,
  Flame,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DownloadCsvButton } from "@/components/insights/DownloadCsvButton";
import {
  formatDate,
  formatDateTime,
  formatDuration,
  shortDay,
} from "@/components/insights/format";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { LearnerInsights } from "@/lib/insights/types";
import { cn } from "@/lib/utils";

const TRACK_COLORS = [
  "#047857",
  "#0d9488",
  "#ca8a04",
  "#b45309",
  "#0369a1",
  "#4d7c0f",
  "#be123c",
  "#6d28d9",
];

function RingStat({
  percent,
  label,
  sub,
}: {
  percent: number;
  label: string;
  sub: string;
}) {
  const data = [{ name: label, value: Math.min(100, Math.max(0, percent)), fill: "#059669" }];
  return (
    <div className="relative mx-auto h-44 w-44">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="72%"
          outerRadius="100%"
          barSize={14}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar background={{ fill: "#e2e8f0" }} dataKey="value" cornerRadius={8} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-3xl font-black tracking-tight text-slate-900">{percent}%</p>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 max-w-[8rem] text-center text-[11px] font-medium text-slate-500">
          {sub}
        </p>
      </div>
    </div>
  );
}

function MetricTile({
  icon,
  label,
  value,
  hint,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur"
    >
      <div className="flex items-center gap-2 text-emerald-800">
        {icon}
        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
          {label}
        </p>
      </div>
      <p className="mt-2 text-2xl font-black tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">{hint}</p>
    </motion.div>
  );
}

function ActivityCalendar({ days }: { days: LearnerInsights["dailyActivity"] }) {
  const max = Math.max(1, ...days.map((d) => d.events));
  return (
    <div>
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {days.map((d) => {
          const t = d.events / max;
          const tone =
            d.events === 0
              ? "bg-slate-100"
              : t < 0.25
                ? "bg-emerald-100"
                : t < 0.5
                  ? "bg-emerald-300"
                  : t < 0.75
                    ? "bg-emerald-500"
                    : "bg-emerald-700";
          return (
            <div
              key={d.date}
              title={`${d.date}: ${d.events} events, ${d.completions} completed`}
              className={cn(
                "aspect-square rounded-md transition-transform hover:scale-105",
                tone
              )}
            />
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-slate-500">
        <span>30 days ago</span>
        <span className="flex items-center gap-1">
          Less
          <span className="h-2.5 w-2.5 rounded-sm bg-slate-100" />
          <span className="h-2.5 w-2.5 rounded-sm bg-emerald-100" />
          <span className="h-2.5 w-2.5 rounded-sm bg-emerald-300" />
          <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
          <span className="h-2.5 w-2.5 rounded-sm bg-emerald-700" />
          More
        </span>
        <span>Today</span>
      </div>
    </div>
  );
}

export function ParentInsightsReport({
  insights,
  csvHref,
}: {
  insights: LearnerInsights;
  csvHref: string;
}) {
  const s = insights.summary;
  const areaData = insights.dailyActivity.map((d) => ({
    ...d,
    label: shortDay(d.date),
  }));
  const trackBars = [...insights.tracks]
    .filter((t) => t.completedCount > 0 || t.inProgressCount > 0 || t.percent > 0)
    .sort((a, b) => b.percent - a.percent)
    .map((t, i) => ({
      name: t.trackTitle.replace(/ Prep$/i, "").replace(/ Literacy$/i, ""),
      fullName: t.trackTitle,
      percent: t.percent,
      completed: t.completedCount,
      total: t.totalCount,
      xp: t.xp,
      fill: TRACK_COLORS[i % TRACK_COLORS.length],
    }));

  const accuracyData = [
    {
      name: "accuracy",
      value: s.quizAccuracyPercent ?? 0,
      fill: (s.quizAccuracyPercent ?? 0) >= 70 ? "#059669" : "#d97706",
    },
  ];

  const headline =
    s.progressPercent >= 75
      ? "Strong momentum — keep the routine going."
      : s.progressPercent >= 35
        ? "Solid progress. A little consistency will compound quickly."
        : s.lessonsOpened > 0
          ? "They’re getting started. Short sessions help build the habit."
          : "No learning activity yet — open a lesson when you’re ready.";

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[28px] border border-emerald-900/10 bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-800 px-5 py-6 text-white shadow-lg sm:px-8 sm:py-8"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-teal-300/15 blur-3xl"
          aria-hidden
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-3">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-emerald-100/80">
              Parent learning report
            </p>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              {insights.displayName}
              {insights.grade ? (
                <span className="ml-2 text-lg font-bold text-emerald-100/80">
                  Grade {insights.grade}
                </span>
              ) : null}
            </h1>
            <p className="text-sm leading-relaxed text-emerald-50/90 sm:text-base">{headline}</p>
            <p className="text-xs font-medium text-emerald-100/70">
              Last active {formatDateTime(s.lastActiveAt)} · Report generated{" "}
              {formatDateTime(insights.generatedAt)}
            </p>
            <div className="pt-1">
              <DownloadCsvButton
                href={csvHref}
                label="Download full CSV"
                className="[&_button]:border-white/30 [&_button]:bg-white/10 [&_button]:text-white [&_button]:hover:bg-white/20"
              />
            </div>
          </div>
          <RingStat
            percent={s.progressPercent}
            label="Complete"
            sub={`${s.lessonsCompleted} of ${s.lessonsTotal} lessons`}
          />
        </div>
      </motion.section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricTile
          icon={<Award className="h-4 w-4" />}
          label="Total XP"
          value={`${s.totalXp}`}
          hint={`${s.lessonsInProgress} lessons in progress`}
        />
        <MetricTile
          icon={<Clock3 className="h-4 w-4" />}
          label="Time learning"
          value={formatDuration(s.timeSpentSeconds)}
          hint={
            s.timeSpentEstimated
              ? "Estimated from activity (improves with new sessions)"
              : "Active time while lessons were open"
          }
        />
        <MetricTile
          icon={<Flame className="h-4 w-4" />}
          label="Streak"
          value={`${s.activityStreakDays} day${s.activityStreakDays === 1 ? "" : "s"}`}
          hint={`Best streak ${s.longestStreakDays}d · ${s.activeDaysLast30} active days this month`}
        />
        <MetricTile
          icon={<Target className="h-4 w-4" />}
          label="Quiz accuracy"
          value={s.quizAccuracyPercent != null ? `${s.quizAccuracyPercent}%` : "—"}
          hint={
            s.quizAttempts > 0
              ? `${s.quizCorrect}/${s.quizAttempts} answers correct`
              : "Shows after they answer quiz questions"
          }
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-2xl bg-slate-100/90 p-1.5">
          <TabsTrigger value="overview" className="rounded-xl px-4 py-2 font-bold">
            Overview
          </TabsTrigger>
          <TabsTrigger value="tracks" className="rounded-xl px-4 py-2 font-bold">
            Tracks
          </TabsTrigger>
          <TabsTrigger value="activity" className="rounded-xl px-4 py-2 font-bold">
            Activity
          </TabsTrigger>
          <TabsTrigger value="detail" className="rounded-xl px-4 py-2 font-bold">
            Lesson detail
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 outline-none">
          <div className="grid gap-4 lg:grid-cols-5">
            <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm lg:col-span-3">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-700" />
                <div>
                  <h2 className="text-base font-black text-slate-900">Learning activity</h2>
                  <p className="text-xs text-slate-500">Events and lesson completions over 30 days</p>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="eventsFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#059669" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#059669" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="compFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d97706" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#d97706" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 10, fill: "#64748b" }}
                      interval="preserveStartEnd"
                      minTickGap={28}
                    />
                    <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "#64748b" }} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #e2e8f0",
                        fontSize: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="events"
                      name="Learning events"
                      stroke="#059669"
                      fill="url(#eventsFill)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="completions"
                      name="Lessons completed"
                      stroke="#d97706"
                      fill="url(#compFill)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm lg:col-span-2">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <h2 className="text-base font-black text-slate-900">At a glance</h2>
              </div>
              <div className="mx-auto h-40 w-40">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="100%"
                    barSize={12}
                    data={accuracyData}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar
                      background={{ fill: "#e2e8f0" }}
                      dataKey="value"
                      cornerRadius={8}
                    >
                      <Cell fill={accuracyData[0].fill} />
                    </RadialBar>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-sm font-bold text-slate-800">
                Quiz accuracy{" "}
                {s.quizAccuracyPercent != null ? `${s.quizAccuracyPercent}%` : "not enough data"}
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-2 border-t border-slate-100 pt-2">
                  <dt className="text-slate-500">Lessons opened</dt>
                  <dd className="font-bold text-slate-900">{s.lessonsOpened}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Practice activities</dt>
                  <dd className="font-bold text-slate-900">{s.activitiesCompleted}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Exams taken</dt>
                  <dd className="font-bold text-slate-900">{s.examsTaken}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Exam average</dt>
                  <dd className="font-bold text-slate-900">
                    {s.examAveragePercent != null ? `${s.examAveragePercent}%` : "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">First active</dt>
                  <dd className="font-bold text-slate-900">{formatDate(s.firstActiveAt)}</dd>
                </div>
              </dl>
            </section>
          </div>

          {insights.weakTracks.length > 0 ? (
            <section className="rounded-[24px] border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50/60 p-5">
              <h2 className="text-sm font-black text-amber-950">Where a little help helps</h2>
              <p className="mt-1 text-xs text-amber-900/80">
                Tracks they’ve started but haven’t finished as far — great conversation starters.
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {insights.weakTracks.map((t) => (
                  <li
                    key={t.trackId}
                    className="rounded-2xl border border-amber-200/80 bg-white/80 px-3 py-3"
                  >
                    <p className="text-sm font-extrabold text-amber-950">
                      {t.icon} {t.trackTitle}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-amber-900/80">
                      {t.percent}% · {t.completedCount}/{t.totalCount} lessons
                      {t.inProgressCount > 0 ? ` · ${t.inProgressCount} open` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </TabsContent>

        <TabsContent value="tracks" className="space-y-4 outline-none">
          <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm">
            <h2 className="text-base font-black text-slate-900">Progress by track</h2>
            <p className="mt-1 text-xs text-slate-500">
              Only tracks with some activity are charted; full list is below.
            </p>
            {trackBars.length > 0 ? (
              <div className="mt-4 h-[min(360px,50vh)] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={trackBars}
                    layout="vertical"
                    margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "#64748b" }} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={110}
                      tick={{ fontSize: 11, fill: "#334155", fontWeight: 600 }}
                    />
                    <Tooltip
                      formatter={(value, _n, item) => {
                        const row = item?.payload as {
                          fullName?: string;
                          completed?: number;
                          total?: number;
                          xp?: number;
                        };
                        return [
                          `${value}% (${row.completed}/${row.total} · ${row.xp} XP)`,
                          row.fullName || "Progress",
                        ];
                      }}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #e2e8f0",
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="percent" radius={[0, 8, 8, 0]} barSize={18}>
                      {trackBars.map((entry) => (
                        <Cell key={entry.fullName} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-600">No track progress yet.</p>
            )}
          </section>

          <div className="grid gap-3 md:grid-cols-2">
            {insights.tracks.map((track) => (
              <div
                key={track.trackId}
                className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">
                      <span className="mr-1.5">{track.icon}</span>
                      {track.trackTitle}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {track.completedCount}/{track.totalCount} lessons · {track.xp} XP
                    </p>
                  </div>
                  <span className="text-sm font-black text-emerald-700">{track.percent}%</span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500"
                    style={{ width: `${Math.min(100, track.percent)}%` }}
                  />
                </div>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold text-slate-500">
                  {track.inProgressCount > 0 ? (
                    <span>{track.inProgressCount} in progress</span>
                  ) : (
                    <span>No open lessons</span>
                  )}
                  {track.assessmentTotal > 0 ? (
                    <span>
                      Assessments {track.assessmentCompleted}/{track.assessmentTotal}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4 outline-none">
          <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm">
            <h2 className="text-base font-black text-slate-900">Activity calendar</h2>
            <p className="mt-1 text-xs text-slate-500">
              Each square is a day. Darker means more learning that day.
            </p>
            <div className="mt-4">
              <ActivityCalendar days={insights.dailyActivity} />
            </div>
          </section>

          {insights.exams.length > 0 ? (
            <section className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <BookOpenCheck className="h-4 w-4 text-emerald-700" />
                <h2 className="text-base font-black text-slate-900">Exam scores</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="pb-2 pr-4">Exam</th>
                      <th className="pb-2 pr-4">Score</th>
                      <th className="pb-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {insights.exams.map((exam) => (
                      <tr key={exam.lessonId} className="border-t border-slate-100">
                        <td className="py-3 pr-4 font-semibold text-slate-900">{exam.title}</td>
                        <td className="py-3 pr-4">
                          <span className="font-black text-emerald-700">{exam.percent}%</span>
                          <span className="ml-1 text-slate-500">
                            ({exam.correct}/{exam.total})
                          </span>
                        </td>
                        <td className="py-3 text-slate-600">{formatDate(exam.completedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : (
            <section className="rounded-[24px] border border-dashed border-slate-300 bg-white/70 p-5 text-sm text-slate-600">
              No practice exams or finals submitted yet.
            </section>
          )}
        </TabsContent>

        <TabsContent value="detail" className="outline-none">
          <section className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-base font-black text-slate-900">Recent lesson activity</h2>
              <p className="text-xs text-slate-500">
                Latest lessons touched, with completion status
              </p>
            </div>
            {insights.recentLessons.length === 0 ? (
              <p className="p-5 text-sm text-slate-600">No lesson activity yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-5 py-3">Lesson</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Opened</th>
                      <th className="px-5 py-3">Last event</th>
                      <th className="px-5 py-3">Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {insights.recentLessons.map((lesson) => (
                      <tr key={lesson.lessonId} className="border-t border-slate-100">
                        <td className="px-5 py-3">
                          <p className="font-semibold text-slate-900">{lesson.title}</p>
                          <p className="text-xs text-slate-500">{lesson.trackTitle}</p>
                        </td>
                        <td className="px-5 py-3">
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
                        <td className="px-5 py-3 text-slate-600">
                          {formatDateTime(lesson.openedAt)}
                        </td>
                        <td className="px-5 py-3 text-slate-600">
                          {formatDateTime(lesson.lastEventAt)}
                        </td>
                        <td className="px-5 py-3 text-slate-600">
                          {formatDateTime(lesson.successAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
