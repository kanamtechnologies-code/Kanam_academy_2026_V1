"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const COACH_HIGHLIGHT: Record<string, { variant: "yellow" | "green" }> = {
  "input()": { variant: "yellow" },
  "print()": { variant: "yellow" },
  if: { variant: "yellow" },
  elif: { variant: "yellow" },
  else: { variant: "yellow" },
  while: { variant: "yellow" },
  for: { variant: "yellow" },
  "range()": { variant: "yellow" },
  indentation: { variant: "yellow" },
  loop: { variant: "yellow" },
  list: { variant: "yellow" },
  memory: { variant: "yellow" },
  dictionary: { variant: "yellow" },
  function: { variant: "yellow" },
  def: { variant: "yellow" },
  variable: { variant: "yellow" },
  Run: { variant: "green" },
};

function CoachHighlight({
  variant,
  children,
}: {
  variant: "yellow" | "green";
  children: React.ReactNode;
}) {
  const styles =
    variant === "yellow"
      ? "bg-gradient-to-r from-yellow-200/90 via-yellow-100/70 to-transparent text-slate-900 ring-yellow-300/50"
      : "bg-gradient-to-r from-emerald-200/90 via-emerald-100/70 to-transparent text-slate-900 ring-emerald-300/50";
  return (
    <span className={cn("inline-flex items-baseline rounded-md px-1.5 py-0.5 font-semibold ring-1", styles)}>
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
        <strong key={`b-${key++}`} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
      continue;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      nodes.push(
        <code
          key={`c-${key++}`}
          className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[0.95em] text-slate-900"
        >
          {part.slice(1, -1)}
        </code>
      );
      continue;
    }
    if (part.startsWith("==") && part.endsWith("==")) {
      nodes.push(
        <CoachHighlight key={`y-${key++}`} variant="yellow">
          {part.slice(2, -2)}
        </CoachHighlight>
      );
      continue;
    }
    if (part.startsWith("[[") && part.endsWith("]]")) {
      nodes.push(
        <CoachHighlight key={`g-${key++}`} variant="green">
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
        className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 font-mono text-xs text-slate-900 shadow-inner"
      >
        <pre className="whitespace-pre-wrap">{codeLines.join("\n")}</pre>
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
      out.push(<div key={`sp-${key++}`} className="h-2" />);
      continue;
    }
    out.push(
      <p key={`ln-${key++}`} className="leading-relaxed text-slate-700">
        {renderCoachInline(line)}
      </p>
    );
  }
  flushCode();
  return <div className="space-y-2">{out}</div>;
}
