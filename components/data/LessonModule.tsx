"use client";

import * as React from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Rocket,
  TerminalSquare,
} from "lucide-react";

import { ChartPanel, type ChartConfig } from "@/components/data/ChartPanel";
import { ResultTable } from "@/components/data/ResultTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { QueryResult } from "@/lib/sqlRunner";
import { cn } from "@/lib/utils";

export type LessonModuleSection = {
  id: string;
  /** Small label shown above the title, e.g. "Real world". */
  kicker?: string;
  title: string;
  /** Paragraphs separated by newlines. Supports **bold** and `code`. */
  body: string;
  bullets?: string[];
  image?: string;
  imageAlt?: string;
  /** A live-rendered example chart. */
  chart?: { config: ChartConfig; result: QueryResult };
  /** A small sample table preview. */
  table?: QueryResult;
  /** A code example (Python or SQL) shown in a dark editor-style block. */
  code?: string;
  /** Optional caption shown above the code block. */
  codeCaption?: string;
  /** Example console / query output shown in a terminal-style block. */
  output?: string;
  callout?: { label: string; text: string };
};

export type LessonModuleData = {
  durationLabel?: string;
  sections: LessonModuleSection[];
};

function renderRichText(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.trim() === "") return <div key={i} className="h-2" />;
    const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return (
      <p key={i} className="leading-relaxed text-slate-700">
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={j} className="font-semibold text-slate-900">
                {part.slice(2, -2)}
              </strong>
            );
          }
          if (part.startsWith("`") && part.endsWith("`")) {
            return (
              <code
                key={j}
                className="rounded bg-slate-100 px-1 py-0.5 font-mono text-sm text-emerald-800"
              >
                {part.slice(1, -1)}
              </code>
            );
          }
          return <span key={j}>{part}</span>;
        })}
      </p>
    );
  });
}

export function LessonModule({
  module,
  onStart,
}: {
  module: LessonModuleData;
  onStart: () => void;
}) {
  const sections = module.sections;
  const [index, setIndex] = React.useState(0);
  const topRef = React.useRef<HTMLDivElement | null>(null);
  const section = sections[index];
  const isLast = index === sections.length - 1;
  const isFirst = index === 0;

  const goTo = (next: number) => {
    setIndex(Math.max(0, Math.min(sections.length - 1, next)));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Card className="border-slate-200 shadow-md">
      <CardContent className="space-y-6 p-5 md:p-7">
        <div ref={topRef} className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[var(--brand-2)]">
            <BookOpen className="h-4 w-4" />
            Lesson
            {module.durationLabel ? (
              <span className="font-medium text-slate-400">· {module.durationLabel}</span>
            ) : null}
          </div>
          <div className="flex items-center gap-1.5">
            {sections.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to section ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  i === index
                    ? "w-6 bg-[var(--brand)]"
                    : i < index
                      ? "w-2.5 bg-[var(--brand)]/50"
                      : "w-2.5 bg-slate-200"
                )}
              />
            ))}
          </div>
        </div>

        {(() => {
          const media = (
            <>
              {section.image ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <Image
                    src={section.image}
                    alt={section.imageAlt ?? section.title}
                    width={1024}
                    height={683}
                    className="h-auto w-full"
                  />
                </div>
              ) : null}

              {section.chart ? (
                <ChartPanel result={section.chart.result} config={section.chart.config} />
              ) : null}

              {section.table ? (
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <ResultTable result={section.table} />
                </div>
              ) : null}

              {section.code ? (
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-sm">
                  {section.codeCaption ? (
                    <div className="flex items-center gap-2 border-b border-slate-700/70 bg-slate-800/80 px-4 py-2 text-xs font-bold text-slate-300">
                      <BookOpen className="h-3.5 w-3.5" />
                      {section.codeCaption}
                    </div>
                  ) : null}
                  <pre className="overflow-x-auto px-4 py-3 font-mono text-[13px] leading-relaxed text-emerald-100">
                    {section.code}
                  </pre>
                </div>
              ) : null}

              {section.output ? (
                <div>
                  <p className="mb-1 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-slate-500">
                    <TerminalSquare className="h-3.5 w-3.5" />
                    What it prints
                  </p>
                  <pre className="overflow-x-auto rounded-xl bg-slate-950 px-4 py-3 font-mono text-[13px] leading-relaxed text-sky-200">
                    {section.output}
                  </pre>
                </div>
              ) : null}
            </>
          );

          const prose = (
            <>
              <div className="space-y-2 text-[15px]">{renderRichText(section.body)}</div>

              {section.bullets && section.bullets.length > 0 ? (
                <ul className="space-y-2">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-[15px] text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />
                      <span>{renderInline(b)}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.callout ? (
                <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-amber-800">
                      {section.callout.label}
                    </p>
                    <p className="mt-1 text-sm text-amber-900">{renderInline(section.callout.text)}</p>
                  </div>
                </div>
              ) : null}
            </>
          );

          const hasMedia = Boolean(
            section.image || section.chart || section.table || section.code || section.output
          );

          return (
            <div className="space-y-6">
              <div>
                {section.kicker ? (
                  <span className="inline-block rounded-full bg-[var(--brand)]/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-[var(--brand-2)]">
                    {section.kicker}
                  </span>
                ) : null}
                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                  {section.title}
                </h2>
              </div>

              {hasMedia ? (
                <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
                  <div className="space-y-4 lg:order-1">{prose}</div>
                  <div className="space-y-4 lg:order-2 lg:sticky lg:top-[calc(var(--kanam-header-height,4.75rem)+0.75rem)] lg:max-h-[calc(100dvh-var(--kanam-header-height,4.75rem)-1.5rem)] lg:overflow-y-auto">{media}</div>
                </div>
              ) : (
                <div className="mx-auto max-w-3xl space-y-4">{prose}</div>
              )}
            </div>
          );
        })()}

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="min-h-11 w-full sm:w-auto"
            onClick={() => goTo(index - 1)}
            disabled={isFirst}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <p className="order-first text-center text-xs font-semibold text-slate-500 sm:order-none">
            Section {index + 1} of {sections.length}
          </p>

          {isLast ? (
            <Button type="button" className="min-h-11 w-full shadow-sm sm:w-auto" onClick={onStart}>
              <Rocket className="h-4 w-4" />
              Start the exercises
            </Button>
          ) : (
            <Button
              type="button"
              className="min-h-11 w-full shadow-sm sm:w-auto"
              onClick={() => goTo(index + 1)}
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/** Inline-only rich text for list items / callouts (no paragraph wrapping). */
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, j) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={j} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={j} className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[13px] text-emerald-800">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={j}>{part}</React.Fragment>;
  });
}
