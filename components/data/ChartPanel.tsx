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
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { QueryResult } from "@/lib/sqlRunner";
import { cn } from "@/lib/utils";

export type ChartConfig = {
  type: "bar" | "line" | "pie";
  xKey: string;
  yKey: string;
  title?: string;
};

const PIE_COLORS = ["#18a16d", "#0f6e57", "#d8c07a", "#64748b", "#38bdf8", "#f97316"];

function queryToChartData(result: QueryResult, xKey: string, yKey: string) {
  const xIdx = result.columns.findIndex(
    (c) => c.toLowerCase() === xKey.toLowerCase()
  );
  const yIdx = result.columns.findIndex(
    (c) => c.toLowerCase() === yKey.toLowerCase()
  );
  if (xIdx < 0 || yIdx < 0) return [];

  return result.values.map((row) => ({
    name: String(row[xIdx] ?? ""),
    value: Number(row[yIdx]) || 0,
  }));
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

  const data = queryToChartData(result, config.xKey, config.yKey);
  if (!data.length) {
    return (
      <div className={cn("rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900", className)}>
        Chart needs columns named <strong>{config.xKey}</strong> and{" "}
        <strong>{config.yKey}</strong> in your query results.
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border border-slate-200 bg-white p-4", className)}>
      {config.title ? (
        <p className="mb-3 text-sm font-semibold text-slate-800">{config.title}</p>
      ) : null}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {config.type === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#18a16d" name={config.yKey} radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : config.type === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#18a16d" strokeWidth={2} name={config.yKey} />
            </LineChart>
          ) : (
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {data.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
