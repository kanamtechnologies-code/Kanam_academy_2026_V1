"use client";

import { shortDay } from "@/components/insights/format";
import type { ClassInsights } from "@/lib/insights/types";
import { cn } from "@/lib/utils";

function intensityClass(value: number, max: number): string {
  if (value <= 0 || max <= 0) return "bg-slate-100 text-slate-400";
  const t = value / max;
  if (t < 0.2) return "bg-emerald-100 text-emerald-900";
  if (t < 0.4) return "bg-emerald-200 text-emerald-950";
  if (t < 0.6) return "bg-emerald-400 text-emerald-950";
  if (t < 0.8) return "bg-emerald-600 text-white";
  return "bg-emerald-800 text-white";
}

function trackIntensityClass(percent: number): string {
  if (percent <= 0) return "bg-slate-100 text-slate-400";
  if (percent < 25) return "bg-amber-100 text-amber-900";
  if (percent < 50) return "bg-amber-200 text-amber-950";
  if (percent < 75) return "bg-emerald-300 text-emerald-950";
  if (percent < 100) return "bg-emerald-500 text-white";
  return "bg-emerald-700 text-white";
}

export function ClassHeatmap({
  insights,
  onSelectLearner,
}: {
  insights: ClassInsights;
  onSelectLearner?: (studentId: string) => void;
}) {
  const { heatmap, trackHeatmap } = insights;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-3">
          <h3 className="text-base font-black text-slate-900">Activity heatmap (14 days)</h3>
          <p className="text-xs text-slate-500">
            Darker cells mean more learning events that day. Tap a name for the full report.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-1 text-left">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-white px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
                  Learner
                </th>
                {heatmap.days.map((day) => (
                  <th
                    key={day}
                    className="px-0.5 py-1 text-center text-[10px] font-bold text-slate-500"
                    title={day}
                  >
                    {shortDay(day).replace(" ", "\n")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmap.rows.map((row) => (
                <tr key={row.studentId}>
                  <th className="sticky left-0 z-10 max-w-[140px] truncate bg-white px-2 py-0.5 text-left text-xs font-bold text-slate-800">
                    <button
                      type="button"
                      className={cn(
                        "truncate text-left",
                        onSelectLearner && "hover:text-emerald-700 hover:underline"
                      )}
                      onClick={() => onSelectLearner?.(row.studentId)}
                      disabled={!onSelectLearner}
                    >
                      {row.displayName}
                    </button>
                  </th>
                  {heatmap.days.map((day) => {
                    const value = row.byDay[day] ?? 0;
                    return (
                      <td key={day} className="p-0.5">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-md text-[10px] font-bold",
                            intensityClass(value, heatmap.maxCell)
                          )}
                          title={`${row.displayName}: ${value} events on ${day}`}
                        >
                          {value > 0 ? value : ""}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-500">
          <span>Less</span>
          {["bg-slate-100", "bg-emerald-100", "bg-emerald-200", "bg-emerald-400", "bg-emerald-600", "bg-emerald-800"].map(
            (c) => (
              <span key={c} className={cn("h-3 w-5 rounded-sm", c)} />
            )
          )}
          <span>More</span>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-3">
          <h3 className="text-base font-black text-slate-900">Track progress heatmap</h3>
          <p className="text-xs text-slate-500">
            Completion percent by learner and track
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-1 text-left">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-white px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
                  Learner
                </th>
                {trackHeatmap.trackTitles.map((title, i) => (
                  <th
                    key={trackHeatmap.trackIds[i]}
                    className="max-w-[72px] px-0.5 py-1 text-center text-[10px] font-bold leading-tight text-slate-500"
                    title={title}
                  >
                    {title.split(" ")[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trackHeatmap.rows.map((row) => (
                <tr key={row.studentId}>
                  <th className="sticky left-0 z-10 max-w-[140px] truncate bg-white px-2 py-0.5 text-left text-xs font-bold text-slate-800">
                    {row.displayName}
                  </th>
                  {trackHeatmap.trackIds.map((trackId) => {
                    const percent = row.byTrack[trackId] ?? 0;
                    return (
                      <td key={trackId} className="p-0.5">
                        <div
                          className={cn(
                            "flex h-8 min-w-[2.5rem] items-center justify-center rounded-md px-1 text-[10px] font-bold",
                            trackIntensityClass(percent)
                          )}
                          title={`${row.displayName}: ${percent}%`}
                        >
                          {percent > 0 ? `${percent}%` : "—"}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
