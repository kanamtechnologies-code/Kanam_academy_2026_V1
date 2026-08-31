"use client";

import * as React from "react";

import type { QueryResult } from "@/lib/sqlRunner";
import { cn } from "@/lib/utils";

function colLetter(index: number) {
  let n = index;
  let label = "";
  do {
    label = String.fromCharCode(65 + (n % 26)) + label;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return label;
}

export function ResultTable({
  result,
  className,
  emptyMessage = "Run a query to see results here.",
  /** Cap the grid height so large cafeteria sheets scroll like Excel/Sheets. */
  maxHeightClassName = "max-h-[min(28rem,55vh)]",
  showColumnLetters = true,
  showRowNumbers = true,
}: {
  result: QueryResult | null;
  className?: string;
  emptyMessage?: string;
  maxHeightClassName?: string;
  showColumnLetters?: boolean;
  showRowNumbers?: boolean;
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

  const colCount = result.columns.length;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-slate-300 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 bg-[#eef6f2] px-3 py-1.5">
        <p className="truncate text-[11px] font-bold uppercase tracking-[0.08em] text-[color:var(--brand-2)]">
          Spreadsheet view
        </p>
        <p className="shrink-0 text-[11px] font-semibold tabular-nums text-slate-500">
          {result.rowCount.toLocaleString()} row{result.rowCount === 1 ? "" : "s"} · {colCount}{" "}
          column{colCount === 1 ? "" : "s"}
        </p>
      </div>

      <div className={cn("overflow-auto overscroll-contain", maxHeightClassName)}>
        <table className="min-w-full border-collapse text-left text-[13px] leading-none">
          {showColumnLetters ? (
            <thead className="sticky top-0 z-20">
              <tr className="bg-[#dfe8e3]">
                {showRowNumbers ? (
                  <th
                    className="sticky left-0 z-30 w-10 min-w-10 border-b border-r border-slate-300 bg-[#d0ddd6] px-1 py-1.5 text-center text-[10px] font-bold text-slate-500"
                    aria-hidden
                  />
                ) : null}
                {result.columns.map((_, ci) => (
                  <th
                    key={`letter-${ci}`}
                    className="border-b border-r border-slate-300 px-3 py-1.5 text-center text-[10px] font-bold tracking-wide text-slate-600 last:border-r-0"
                  >
                    {colLetter(ci)}
                  </th>
                ))}
              </tr>
              <tr className="bg-[#0f6e5b] text-white">
                {showRowNumbers ? (
                  <th
                    className="sticky left-0 z-30 w-10 min-w-10 border-b border-r border-[#0b5a4a] bg-[#0c5f4f] px-1 py-2 text-center text-[10px] font-bold text-white/70"
                    scope="col"
                  >
                    #
                  </th>
                ) : null}
                {result.columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="whitespace-nowrap border-b border-r border-[#0b5a4a] px-3 py-2 text-xs font-extrabold tracking-wide last:border-r-0"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
          ) : (
            <thead className="sticky top-0 z-20">
              <tr className="bg-[#0f6e5b] text-white">
                {showRowNumbers ? (
                  <th
                    className="sticky left-0 z-30 w-10 min-w-10 border-b border-r border-[#0b5a4a] bg-[#0c5f4f] px-1 py-2 text-center text-[10px] font-bold text-white/70"
                    scope="col"
                  >
                    #
                  </th>
                ) : null}
                {result.columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="whitespace-nowrap border-b border-r border-[#0b5a4a] px-3 py-2 text-xs font-extrabold tracking-wide last:border-r-0"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {result.values.map((row, ri) => {
              const zebra = ri % 2 === 0;
              return (
                <tr key={ri} className={zebra ? "bg-white" : "bg-[#f7faf8]"}>
                  {showRowNumbers ? (
                    <th
                      scope="row"
                      className={cn(
                        "sticky left-0 z-10 w-10 min-w-10 border-b border-r border-slate-200 px-1 py-2 text-center text-[11px] font-bold tabular-nums text-slate-500",
                        zebra ? "bg-[#eef2f0]" : "bg-[#e4ebe7]"
                      )}
                    >
                      {ri + 1}
                    </th>
                  ) : null}
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="whitespace-nowrap border-b border-r border-slate-200 px-3 py-2 tabular-nums text-slate-800 last:border-r-0"
                    >
                      {cell === null ? (
                        <span className="italic text-slate-400">NULL</span>
                      ) : typeof cell === "number" ? (
                        Number.isInteger(cell) ? (
                          cell
                        ) : (
                          // Keep money-like decimals readable in the sheet.
                          Number(cell).toLocaleString(undefined, {
                            maximumFractionDigits: 4,
                          })
                        )
                      ) : (
                        String(cell)
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] text-slate-500">
        <span>Scroll to explore all rows and columns</span>
        <span className="font-semibold tabular-nums text-slate-600">
          {result.rowCount.toLocaleString()} record{result.rowCount === 1 ? "" : "s"}
        </span>
      </div>
    </div>
  );
}
