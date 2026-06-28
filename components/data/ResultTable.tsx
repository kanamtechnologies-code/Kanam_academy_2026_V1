"use client";

import * as React from "react";

import type { QueryResult } from "@/lib/sqlRunner";
import { cn } from "@/lib/utils";

export function ResultTable({
  result,
  className,
  emptyMessage = "Run a query to see results here.",
}: {
  result: QueryResult | null;
  className?: string;
  emptyMessage?: string;
}) {
  if (!result) {
    return (
      <div
        className={cn(
          "rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500",
          className
        )}
      >
        {emptyMessage}
      </div>
    );
  }

  if (result.rowCount === 0 && result.columns.length === 0) {
    return (
      <div
        className={cn(
          "rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600",
          className
        )}
      >
        Query ran successfully — 0 rows returned.
      </div>
    );
  }

  return (
    <div className={cn("overflow-auto rounded-xl border border-slate-200 bg-white", className)}>
      <table className="min-w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {result.columns.map((col) => (
              <th
                key={col}
                className="whitespace-nowrap px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-slate-600"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result.values.map((row, ri) => (
            <tr
              key={ri}
              className={ri % 2 === 0 ? "bg-white" : "bg-slate-50/80"}
            >
              {row.map((cell, ci) => (
                <td key={ci} className="whitespace-nowrap px-4 py-2 text-slate-800">
                  {cell === null ? (
                    <span className="text-slate-400 italic">NULL</span>
                  ) : (
                    String(cell)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-slate-100 px-4 py-2 text-xs text-slate-500">
        {result.rowCount} row{result.rowCount === 1 ? "" : "s"}
      </p>
    </div>
  );
}
