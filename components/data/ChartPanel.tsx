"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

import type { QueryResult } from "@/lib/sqlRunner";
import { cn } from "@/lib/utils";

export type ChartConfig =
  | { type: "bar" | "line" | "pie"; xKey: string; yKey: string; title?: string }
  | { type: "histogram"; valueKey: string; binSize?: number; title?: string }
  | { type: "scatter"; xKey: string; yKey: string; title?: string };

const BRAND = "#18a16d";
const PIE_COLORS = ["#18a16d", "#0f6e57", "#d8c07a", "#64748b", "#38bdf8", "#f97316"];

function columnIndex(result: QueryResult, key: string): number {
  return result.columns.findIndex((c) => c.toLowerCase() === key.toLowerCase());
}

function categoryData(result: QueryResult, xKey: string, yKey: string) {
  const xIdx = columnIndex(result, xKey);
  const yIdx = columnIndex(result, yKey);
  if (xIdx < 0 || yIdx < 0) return [];
  return result.values.map((row) => ({
    name: String(row[xIdx] ?? ""),
    value: Number(row[yIdx]) || 0,
  }));
}

function numericColumn(result: QueryResult, key: string): number[] {
  const idx = columnIndex(result, key);
  if (idx < 0) return [];
  return result.values
    .map((row) => Number(row[idx]))
    .filter((n) => Number.isFinite(n));
}

/** Bin a numeric column into fixed-width buckets for a histogram. */
function histogramData(result: QueryResult, valueKey: string, binSize?: number) {
  const nums = numericColumn(result, valueKey);
  if (!nums.length) return [];
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  const size = binSize && binSize > 0 ? binSize : Math.max(1, Math.ceil((max - min) / 5));
  const start = Math.floor(min / size) * size;
  const bins: { name: string; value: number }[] = [];
  for (let lo = start; lo <= max; lo += size) {
    const hi = lo + size;
    const isLast = hi > max;
    const count = nums.filter((n) => n >= lo && (isLast ? n <= hi : n < hi)).length;
    bins.push({ name: `${lo}–${hi}`, value: count });
  }
  return bins;
}

function scatterData(result: QueryResult, xKey: string, yKey: string) {
  const xIdx = columnIndex(result, xKey);
  const yIdx = columnIndex(result, yKey);
  if (xIdx < 0 || yIdx < 0) return [];
  return result.values
    .map((row) => ({ x: Number(row[xIdx]), y: Number(row[yIdx]) }))
    .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
}

function MissingColumns({ cols, className }: { cols: string[]; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900", className)}>
      Chart needs{" "}
      {cols.map((c, i) => (
        <React.Fragment key={c}>
          {i > 0 ? " and " : ""}
          <strong>{c}</strong>
        </React.Fragment>
      ))}{" "}
      in your query results.
    </div>
  );
}

export function ChartPanel({
  result,
  config,
  className,
}: {
  result: QueryResult | null;
  config?: ChartConfig;
  className?: string;
}) {
  if (!config || !result || result.rowCount === 0) return null;

  let body: React.ReactNode = null;

  if (config.type === "histogram") {
    const data = histogramData(result, config.valueKey, config.binSize);
    if (!data.length) return <MissingColumns cols={[config.valueKey]} className={className} />;
    body = (
      <BarChart data={data} barCategoryGap={1}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill={BRAND} name="count" />
      </BarChart>
    );
  } else if (config.type === "scatter") {
    const data = scatterData(result, config.xKey, config.yKey);
    if (!data.length) return <MissingColumns cols={[config.xKey, config.yKey]} className={className} />;
    body = (
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis type="number" dataKey="x" name={config.xKey} tick={{ fontSize: 12 }} />
        <YAxis type="number" dataKey="y" name={config.yKey} tick={{ fontSize: 12 }} />
        <ZAxis range={[60, 60]} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter data={data} fill={BRAND} name={`${config.yKey} vs ${config.xKey}`} />
      </ScatterChart>
    );
  } else {
    const data = categoryData(result, config.xKey, config.yKey);
    if (!data.length) return <MissingColumns cols={[config.xKey, config.yKey]} className={className} />;
    if (config.type === "line") {
      body = (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke={BRAND} strokeWidth={2} name={config.yKey} />
        </LineChart>
      );
    } else if (config.type === "pie") {
      body = (
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
            {data.map((_, i) => (
              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      );
    } else {
      body = (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill={BRAND} name={config.yKey} radius={[4, 4, 0, 0]} />
        </BarChart>
      );
    }
  }

  return (
    <div className={cn("rounded-xl border border-slate-200 bg-white p-4", className)}>
      {config.title ? (
        <p className="mb-3 text-sm font-semibold text-slate-800">{config.title}</p>
      ) : null}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {body as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
