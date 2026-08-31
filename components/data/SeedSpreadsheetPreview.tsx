"use client";

import * as React from "react";
import type { Database } from "sql.js";
import { Table2 } from "lucide-react";

import { ResultTable } from "@/components/data/ResultTable";
import type { QueryResult, SeedTable } from "@/lib/sqlRunner";
import { runSelectQuery } from "@/lib/sqlRunner";
import { cn } from "@/lib/utils";

/**
 * Excel/Sheets-style multi-tab preview of every seeded table in a data lesson.
 */
export function SeedSpreadsheetPreview({
  db,
  seedData,
  preferredTable,
}: {
  db: Database | null;
  seedData: SeedTable[];
  preferredTable?: string;
}) {
  const tableNames = React.useMemo(() => seedData.map((t) => t.name), [seedData]);
  const initial =
    preferredTable && tableNames.includes(preferredTable)
      ? preferredTable
      : tableNames[0] ?? "";
  const [active, setActive] = React.useState(initial);

  React.useEffect(() => {
    if (!tableNames.includes(active) && tableNames[0]) {
      setActive(
        preferredTable && tableNames.includes(preferredTable)
          ? preferredTable
          : tableNames[0]
      );
    }
  }, [active, preferredTable, tableNames]);

  const result: QueryResult | null = React.useMemo(() => {
    if (!db || !active) return null;
    return runSelectQuery(db, `SELECT * FROM ${active}`);
  }, [db, active]);

  if (!tableNames.length) return null;

  return (
    <div className="min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-[#eef6f2] px-3 py-2.5 sm:px-4">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
            <Table2 className="h-4 w-4 shrink-0 text-[var(--brand)]" />
            <span className="truncate">Workbook · sample data</span>
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            Switch sheets and scroll — same idea as Excel or Google Sheets tabs.
          </p>
        </div>
        <p className="hidden shrink-0 text-[11px] font-semibold tabular-nums text-slate-500 sm:block">
          {tableNames.length} sheet{tableNames.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-[#f4f7f5] px-2 pt-2">
        {tableNames.map((name) => {
          const isActive = name === active;
          return (
            <button
              key={name}
              type="button"
              onClick={() => setActive(name)}
              className={cn(
                "relative min-h-9 shrink-0 rounded-t-lg border px-3 py-1.5 text-xs font-bold tracking-tight transition",
                isActive
                  ? "z-[1] -mb-px border-slate-300 border-b-white bg-white text-[color:var(--brand-2)]"
                  : "border-transparent bg-[#e4ebe7] text-slate-600 hover:bg-[#dce6e1]"
              )}
            >
              {name}
            </button>
          );
        })}
      </div>

      <div className="p-2 sm:p-3">
        <ResultTable
          result={result}
          maxHeightClassName="max-h-[min(32rem,60vh)]"
          emptyMessage="Loading spreadsheet…"
        />
      </div>
    </div>
  );
}
