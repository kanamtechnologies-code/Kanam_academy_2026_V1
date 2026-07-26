"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const COACH_HIGHLIGHT: Record<string, { variant: "keyword" | "action" }> = {
  "input()": { variant: "keyword" },
  "print()": { variant: "keyword" },
  if: { variant: "keyword" },
  elif: { variant: "keyword" },
  else: { variant: "keyword" },
  while: { variant: "keyword" },
  for: { variant: "keyword" },
  "range()": { variant: "keyword" },
  indentation: { variant: "keyword" },
  loop: { variant: "keyword" },
  list: { variant: "keyword" },
  memory: { variant: "keyword" },
  dictionary: { variant: "keyword" },
  function: { variant: "keyword" },
  def: { variant: "keyword" },
  variable: { variant: "keyword" },
  Run: { variant: "action" },
};

function CoachHighlight({
  variant,
  children,
}: {
  variant: "keyword" | "action";
  children: React.ReactNode;
}) {
  const styles =
    variant === "keyword"
      ? "bg-[rgb(var(--accent-rgb)/0.22)] text-slate-900 ring-[rgb(var(--accent-rgb)/0.45)]"
      : "bg-[rgb(var(--brand-rgb)/0.12)] text-[var(--brand-2)] ring-[rgb(var(--brand-rgb)/0.28)]";
  return (
    <span
      className={cn(
        "inline-flex items-baseline rounded-md px-1.5 py-0.5 font-semibold ring-1",
        styles
      )}
    >
      {children}
    </span>
  );
}

function renderCoachInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let key = 0;
  const tokenRe = /(\*\*[^*]+\*\*|`[^`]+`|==[^=]+==|\[\[[^\]]+\]\])/g;
  const parts = text.split(tokenRe).filter((p) => p.length > 0);

  for (const part of parts) {
    if (part.startsWith("**") && part.endsWith("**")) {
      nodes.push(
        <strong key={`b-${key++}`} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
      continue;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      nodes.push(
        <code
          key={`c-${key++}`}
          className="rounded-md border border-slate-200/90 bg-slate-50 px-1.5 py-0.5 font-mono text-[0.9em] font-medium text-[var(--brand-2)]"
        >
          {part.slice(1, -1)}
        </code>
      );
      continue;
    }
    if (part.startsWith("==") && part.endsWith("==")) {
      nodes.push(
        <CoachHighlight key={`y-${key++}`} variant="keyword">
          {part.slice(2, -2)}
        </CoachHighlight>
      );
      continue;
    }
    if (part.startsWith("[[") && part.endsWith("]]")) {
      nodes.push(
        <CoachHighlight key={`g-${key++}`} variant="action">
          {part.slice(2, -2)}
        </CoachHighlight>
      );
      continue;
    }

    const autoRe =
      /\bvariable\b|\bRun\b|\bindentation\b|\bloop\b|\blist\b|\bmemory\b|\bdictionary\b|\bfunction\b|\bdef\b|\bif\b|\belif\b|\belse\b|\bwhile\b|\bfor\b|input\(\)|print\(\)|range\(\)/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = autoRe.exec(part)) !== null) {
      const before = part.slice(last, m.index);
      if (before) nodes.push(<React.Fragment key={`t-${key++}`}>{before}</React.Fragment>);
      const token = m[0];
      const meta = COACH_HIGHLIGHT[token];
      if (meta) {
        nodes.push(
          <CoachHighlight key={`h-${key++}`} variant={meta.variant}>
            {token}
          </CoachHighlight>
        );
      } else {
        nodes.push(<React.Fragment key={`t2-${key++}`}>{token}</React.Fragment>);
      }
      last = m.index + m[0].length;
    }
    const rest = part.slice(last);
    if (rest) nodes.push(<React.Fragment key={`t3-${key++}`}>{rest}</React.Fragment>);
  }
  return nodes;
}

function isSectionHeading(trimmed: string) {
  // **Heading** or **Heading — subtitle** as the whole line
  return /^\*\*[^*]+\*\*\s*$/.test(trimmed);
}

export function CoachNoteContent({ text }: { text: string }) {
  const lines = text.split("\n");
  const out: React.ReactNode[] = [];
  let inCode = false;
  let codeLines: string[] = [];
  let key = 0;

  const flushCode = () => {
    if (!codeLines.length) return;
    out.push(
      <div
        key={`code-${key++}`}
        className="overflow-hidden rounded-xl border border-slate-200/90 bg-[#0f1f1a] shadow-sm"
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="ml-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
            Example
          </span>
        </div>
        <pre className="whitespace-pre-wrap px-3 py-2.5 font-mono text-[12px] leading-relaxed text-emerald-50/95">
          {codeLines.join("\n")}
        </pre>
      </div>
    );
    codeLines = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "```") {
      if (inCode) {
        inCode = false;
        flushCode();
      } else {
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeLines.push(line);
      continue;
    }
    if (trimmed.length === 0) {
      out.push(<div key={`sp-${key++}`} className="h-1.5" />);
      continue;
    }
    if (isSectionHeading(trimmed)) {
      const label = trimmed.slice(2, -2).trim();
      out.push(
        <p
          key={`hd-${key++}`}
          className="pt-2 text-[13px] font-bold tracking-tight text-[color:var(--brand-2)] first:pt-0"
        >
          {label}
        </p>
      );
      continue;
    }
    if (/^[-•]\s+/.test(trimmed)) {
      out.push(
        <p
          key={`li-${key++}`}
          className="flex gap-2 text-[14px] leading-[1.65] text-slate-600"
        >
          <span
            className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]"
            aria-hidden
          />
          <span>{renderCoachInline(trimmed.replace(/^[-•]\s+/, ""))}</span>
        </p>
      );
      continue;
    }
    if (/^\d+\.\s+/.test(trimmed)) {
      const num = trimmed.match(/^(\d+)\.\s+/)?.[1] ?? "";
      out.push(
        <p
          key={`ol-${key++}`}
          className="flex gap-2.5 text-[14px] leading-[1.65] text-slate-600"
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[rgb(var(--brand-rgb)/0.1)] text-[11px] font-bold text-[var(--brand-2)]">
            {num}
          </span>
          <span>{renderCoachInline(trimmed.replace(/^\d+\.\s+/, ""))}</span>
        </p>
      );
      continue;
    }
    out.push(
      <p key={`ln-${key++}`} className="text-[14px] leading-[1.7] text-slate-600">
        {renderCoachInline(line)}
      </p>
    );
  }
  flushCode();
  return <div className="space-y-2.5">{out}</div>;
}
