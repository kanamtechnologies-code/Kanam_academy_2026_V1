"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Code2,
  ListOrdered,
  ListChecks,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SpotlightTour, type SpotlightTourHandle } from "@/components/ui/SpotlightTour";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export type LessonCfuItem = {
  question: string;
  answer: string;
};

export type LessonExplainItem = {
  title: string;
  text: string;
};

export type LessonConfig = {
  id: string;
  title: string;
  goal: string;
  xpReward: number;
  badge: string;
  starterCode: string;
  instructorScript: string;
  kidExplain: LessonExplainItem[];
  steps: string[];
  cfu: LessonCfuItem[];
  tryThis: string[];
  aiSafetyMoment: string;

  // What the learner should build in the "Try it from scratch" box.
  assignmentTitle?: string;
  assignmentBody?: string;
  assignmentChecklist?: string[];

  editorPlaceholder?: string;
  terminalPrompt?: string;
  prevHref?: string;
  nextHref?: string;
  runOutputMode?: "replace" | "append";
  initialOutputBody?: string;
  runtimeInputs?: Array<{
    key: string;
    label: string;
    placeholder?: string;
    defaultValue?: string;
  }>;

  getRunOutput: (code: string, runtime?: Record<string, string>) => string;
  getRunBody?: (
    code: string,
    runtime?: Record<string, string>,
    ctx?: { prevOutput: string }
  ) => string;
  isOutputCorrect?: (
    stdout: string[],
    env: Record<string, MiniValue>,
    runtime?: Record<string, string>
  ) => boolean;
  computeProgressPercent: (
    code: string,
    submitted: boolean,
    runtime?: Record<string, string>
  ) => number;
  isSubmissionValid: (code: string, runtime?: Record<string, string>) => boolean;
  getSubmitOutput: (ok: boolean, runtime?: Record<string, string>) => string;
};

function asTerminal(prompt: string, body: string) {
  return `${prompt} python main.py\n${body}\n${prompt}`;
}

function appendToTerminal(prev: string, prompt: string, additionBody: string) {
  const needle = `\n${prompt}`;
  const idx = prev.lastIndexOf(needle);
  const base = idx >= 0 ? prev.slice(0, idx) : prev;
  const trimmedAddition = additionBody.trim();
  const addition = trimmedAddition ? `\n${trimmedAddition}` : "";
  return `${base}${addition}\n${prompt}`;
}

function injectBeforePrompt(terminal: string, prompt: string, injectionBody: string) {
  const needle = `\n${prompt}`;
  const idx = terminal.lastIndexOf(needle);
  if (idx < 0) return `${terminal}\n${injectionBody}`;
  const before = terminal.slice(0, idx);
  const after = terminal.slice(idx);
  return `${before}\n${injectionBody}${after}`;
}

type MiniValue = string | number | boolean;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/15">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-base font-extrabold tracking-tight text-slate-900 md:text-lg">
          {title}
        </p>
        {subtitle ? (
          <p className="mt-0.5 text-sm text-slate-600">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}

const COACH_HIGHLIGHT: Record<
  string,
  { variant: "yellow" | "green"; label?: string }
> = {
  "input()": { variant: "yellow" },
  "print()": { variant: "yellow" },
  if: { variant: "yellow" },
  elif: { variant: "yellow" },
  else: { variant: "yellow" },
  while: { variant: "yellow" },
  True: { variant: "yellow" },
  False: { variant: "yellow" },
  variable: { variant: "yellow" },
  literal: { variant: "yellow" },
  "case-sensitive": { variant: "yellow" },
  Run: { variant: "green" },
  Submit: { variant: "green" },
  test: { variant: "green" },
};

function CoachHighlight({
  variant,
  children,
}: {
  variant: "yellow" | "green";
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-baseline rounded-md px-1.5 py-0.5 font-semibold ring-1";
  const styles =
    variant === "yellow"
      ? "bg-gradient-to-r from-yellow-200/90 via-yellow-100/70 to-transparent text-slate-900 ring-yellow-300/50"
      : "bg-gradient-to-r from-emerald-200/90 via-emerald-100/70 to-transparent text-slate-900 ring-emerald-300/50";
  return <span className={cn(base, styles)}>{children}</span>;
}

function renderCoachInline(text: string): React.ReactNode[] {
  // Supported:
  // - **bold**
  // - `inline code`
  // - ==yellow highlight==
  // - [[green highlight]]
  // Plus: auto-highlight common lesson terms (input(), if, while, Run, Submit, etc.)

  const nodes: React.ReactNode[] = [];
  let key = 0;

  // First pass: split by manual markup tokens.
  const tokenRe = /(\*\*[^*]+\*\*|`[^`]+`|==[^=]+==|\[\[[^\]]+\]\])/g;
  const parts = text.split(tokenRe).filter((p) => p.length > 0);

  for (const part of parts) {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      nodes.push(
        <strong key={`b-${key++}`} className="font-semibold text-slate-900">
          {inner}
        </strong>
      );
      continue;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      const inner = part.slice(1, -1);
      nodes.push(
        <code
          key={`c-${key++}`}
          className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[0.95em] text-slate-900"
        >
          {inner}
        </code>
      );
      continue;
    }
    if (part.startsWith("==") && part.endsWith("==")) {
      const inner = part.slice(2, -2);
      nodes.push(
        <CoachHighlight key={`y-${key++}`} variant="yellow">
          {inner}
        </CoachHighlight>
      );
      continue;
    }
    if (part.startsWith("[[") && part.endsWith("]]")) {
      const inner = part.slice(2, -2);
      nodes.push(
        <CoachHighlight key={`g-${key++}`} variant="green">
          {inner}
        </CoachHighlight>
      );
      continue;
    }

    // Second pass: auto-highlight known tokens inside plain text.
    const autoRe =
      /\bcase-sensitive\b|\bvariable\b|\bliteral\b|\bSubmit\b|\bRun\b|\btest\b|\bif\b|\belif\b|\belse\b|\bwhile\b|\bTrue\b|\bFalse\b|input\(\)|print\(\)/g;

    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = autoRe.exec(part)) !== null) {
      const start = m.index;
      const end = start + m[0].length;
      const before = part.slice(last, start);
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
      last = end;
    }
    const rest = part.slice(last);
    if (rest) nodes.push(<React.Fragment key={`t3-${key++}`}>{rest}</React.Fragment>);
  }

  return nodes;
}

function renderCoachNote(text: string) {
  const lines = text.split("\n");
  return (
    <div className="space-y-2">
      {lines.map((line, idx) => {
        const isBlank = line.trim().length === 0;
        if (isBlank) return <div key={`sp-${idx}`} className="h-2" />;
        return (
          <p key={`ln-${idx}`} className="leading-relaxed">
            {renderCoachInline(line)}
          </p>
        );
      })}
    </div>
  );
}

const WORD_HELP: Array<{
  key: string;
  match: RegExp;
  term: string;
  meaning: string;
}> = [
  {
    key: "literal",
    match: /\bliteral\b/i,
    term: "literal",
    meaning:
      "It means “exact.” The computer takes your words EXACTLY as written — it doesn’t guess what you meant.",
  },
  {
    key: "case_sensitive",
    match: /\bcase[-\s]?sensitive\b/i,
    term: "case‑sensitive",
    meaning: 'Capital letters matter. "Happy" and "happy" are different to Python.',
  },
  {
    key: "variable",
    match: /\bvariable\b/i,
    term: "variable",
    meaning:
      "A named box that stores a value (like a name or a number) so your program can remember it.",
  },
  {
    key: "assign",
    match: /\bassign|\bassignment\b|\b=\b/i,
    term: "assign (=)",
    meaning:
      "To put a value into a variable. Example: name = \"Alex\" puts \"Alex\" into the name box.",
  },
  {
    key: "string",
    match: /\bstring\b|["'][^"']*["']/i,
    term: "string",
    meaning: "Text. In Python, strings are written inside quotes like \"hello\".",
  },
  {
    key: "indent",
    match: /\bindent|\bindentation\b/i,
    term: "indent",
    meaning:
      "Spaces at the start of a line. Indenting tells Python “this line belongs inside this if/else/while.”",
  },
  {
    key: "syntax",
    match: /\bsyntax\b/i,
    term: "syntax",
    meaning:
      "The “grammar rules” of code (like colons, parentheses, and spelling). If syntax is wrong, Python can’t read it.",
  },
  {
    key: "condition",
    match: /\bcondition\b/i,
    term: "condition",
    meaning: "A yes/no question your code checks, like: mood == \"happy\".",
  },
  {
    key: "compare",
    match: /\bcompare|\bcomparison\b|\b==\b/i,
    term: "compare (==)",
    meaning:
      "To ask “are these the same?” Example: if x == 5: checks if x is the number 5.",
  },
  {
    key: "boolean",
    match: /\bboolean\b|\bTrue\b|\bFalse\b/i,
    term: "boolean (True/False)",
    meaning: "A True/False value — like an ON/OFF switch for your code.",
  },
  {
    key: "loop",
    match: /\bwhile\b|\bloop\b/i,
    term: "loop",
    meaning: "A repeating section of code. It runs again and again until the condition becomes False.",
  },
  {
    key: "input",
    match: /\binput\s*\(/i,
    term: "input()",
    meaning:
      "A command that asks the user a question and waits for them to type an answer (then saves it).",
  },
  {
    key: "output",
    match: /\boutput\b|\bprint\s*\(/i,
    term: "output",
    meaning:
      "What your program shows on screen. In Python, print(...) creates output you can read in the console.",
  },
];

function collectLessonText(lesson: LessonConfig) {
  const parts: string[] = [];
  parts.push(lesson.title, lesson.goal, lesson.instructorScript, lesson.aiSafetyMoment);
  parts.push(...lesson.kidExplain.flatMap((x) => [x.title, x.text]));
  parts.push(...lesson.steps);
  parts.push(...lesson.cfu.flatMap((x) => [x.question, x.answer]));
  parts.push(...lesson.tryThis);
  return parts.join("\n");
}

function normalizeForMatch(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizeForMatch(s: string) {
  const stop = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "to",
    "of",
    "in",
    "on",
    "for",
    "with",
    "it",
    "is",
    "are",
    "be",
    "this",
    "that",
    "as",
    "at",
    "by",
    "we",
    "you",
    "your",
    "our",
    "they",
    "them",
    "i",
    "me",
    "my",
    "so",
    "but",
    "because",
    "if",
    "then",
  ]);
  return normalizeForMatch(s)
    .split(" ")
    .filter(Boolean)
    .filter((w) => w.length >= 3 && !stop.has(w));
}

function jaccard(a: string[], b: string[]) {
  const A = new Set(a);
  const B = new Set(b);
  const inter = new Set([...A].filter((x) => B.has(x)));
  const union = new Set([...A, ...B]);
  return union.size ? inter.size / union.size : 0;
}

function aiCheckCfuAnswer(userRaw: string, expectedRaw: string) {
  const user = userRaw.trim();
  if (user.length < 3) {
    return {
      level: "too_short" as const,
      message:
        "Type a real answer (1–2 sentences is perfect), then press **Check my answer**. Even a short try is awesome.",
    };
  }

  const userTokens = tokenizeForMatch(userRaw);
  const expectedTokens = tokenizeForMatch(expectedRaw);
  const score = jaccard(userTokens, expectedTokens);

  const overlap = expectedTokens.filter((t) => userTokens.includes(t)).slice(0, 4);
  const missing = expectedTokens.filter((t) => !userTokens.includes(t)).slice(0, 4);
  const hasSomeOverlap = score >= 0.18 || missing.length < expectedTokens.length;

  // Extra tiny “AI-ish” logic for yes/no style answers.
  const expNorm = normalizeForMatch(expectedRaw);
  const userNorm = normalizeForMatch(userRaw);
  const expectsNo = /\bno\b/.test(expNorm);
  const expectsYes = /\byes\b/.test(expNorm);
  const userSaysNo = /\bno\b/.test(userNorm);
  const userSaysYes = /\byes\b/.test(userNorm);
  if (expectsNo && userSaysYes && !userSaysNo) {
    return {
      level: "not_yet" as const,
      message:
        "Almost — but your answer sounds like **yes**. Re-read the question carefully. The key idea here is actually **no** (and why). Try again in your own words, then check again.",
    };
  }
  if (expectsYes && userSaysNo && !userSaysYes) {
    return {
      level: "not_yet" as const,
      message:
        "Almost — but your answer sounds like **no**. Re-read the question carefully. The key idea here is actually **yes** (and why). Try again in your own words, then check again.",
    };
  }

  if (score >= 0.55) {
    return {
      level: "great" as const,
      message:
        `Nice! ✅ You’ve got the main idea.\n\n` +
        (overlap.length
          ? `You used key words like: ${overlap.map((w) => `"${w}"`).join(", ")}.\n\n`
          : "") +
        "Now click **Show answer** to compare yours to the official one and see if you missed any tiny details.",
    };
  }
  if (hasSomeOverlap || score >= 0.28) {
    return {
      level: "close" as const,
      message:
        "You’re super close. 🌟\n\n" +
        (overlap.length
          ? `What you got right: you mentioned ${overlap.map((w) => `"${w}"`).join(", ")}.\n\n`
          : "") +
        (missing.length
          ? `To make it even better, try adding: ${missing.map((m) => `"${m}"`).join(", ")}.\n\n`
          : "To make it even better, add one more detail.\n\n") +
        "Rewrite your answer (1 more sentence), then press **Check my answer** again.",
    };
  }
  return {
    level: "not_yet" as const,
    message:
      "Not quite yet — but you’re learning. 💪\n\n" +
      (expectedTokens.length
        ? `Try using one of these key words in your answer: ${expectedTokens
            .slice(0, 3)
            .map((w) => `"${w}"`)
            .join(", ")}.\n\n`
        : "") +
      "Answer like you’re explaining it to a friend your age. Then press **Check my answer** again.",
  };
}

function isQuoted(s: string) {
  const t = s.trim();
  return (
    (t.startsWith('"') && t.endsWith('"') && t.length >= 2) ||
    (t.startsWith("'") && t.endsWith("'") && t.length >= 2)
  );
}

function unquote(s: string) {
  const t = s.trim();
  if (!isQuoted(t)) return t;
  return t.slice(1, -1);
}

function splitTopLevelPlus(expr: string) {
  const parts: string[] = [];
  let cur = "";
  let quote: '"' | "'" | null = null;
  let depth = 0;
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (quote) {
      cur += ch;
      if (ch === quote && expr[i - 1] !== "\\") quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      cur += ch;
      continue;
    }
    if (ch === "(") {
      depth++;
      cur += ch;
      continue;
    }
    if (ch === ")") {
      depth = Math.max(0, depth - 1);
      cur += ch;
      continue;
    }
    if (ch === "+" && depth === 0) {
      parts.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  parts.push(cur);
  return parts.map((p) => p.trim()).filter(Boolean);
}

function evalMiniExpr(expr: string, env: Record<string, MiniValue>): string | null {
  const t = expr.trim();
  if (!t) return "";

  if (isQuoted(t)) return unquote(t);

  const strCall = t.match(/^str\s*\(\s*([A-Za-z_]\w*)\s*\)$/);
  if (strCall) {
    const v = env[strCall[1]];
    return v === undefined ? "" : String(v);
  }

  if (/^(True|False)$/.test(t)) return t === "True" ? "True" : "False";

  if (/^-?\d+$/.test(t)) return t;

  if (/^[A-Za-z_]\w*$/.test(t)) {
    const v = env[t];
    return v === undefined ? "" : String(v);
  }

  const parts = splitTopLevelPlus(t);
  if (parts.length > 1) {
    const evaluated = parts.map((p) => evalMiniExpr(p, env));
    if (evaluated.some((x) => x === null)) return null;
    return evaluated.join("");
  }

  return null;
}

type MiniRunResult = {
  stdout: string[];
  env: Record<string, MiniValue>;
  error?: string;
};

function parseIndent(line: string) {
  let count = 0;
  for (const ch of line) {
    if (ch === " ") count += 1;
    else if (ch === "\t") count += 4;
    else break;
  }
  return count;
}

type MiniLine = { indent: number; text: string; raw: string; lineNo: number };

type MiniStmt =
  | { kind: "assign"; name: string; expr: string; lineNo: number }
  | { kind: "print"; expr: string; lineNo: number }
  | { kind: "if"; branches: Array<{ test?: string; body: MiniStmt[] }>; lineNo: number }
  | { kind: "while"; test: string; body: MiniStmt[]; lineNo: number };

function stripInlineComment(s: string) {
  // Keep it simple: strip '#' when not inside quotes.
  let out = "";
  let quote: "'" | '"' | null = null;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (quote) {
      out += ch;
      if (ch === quote && s[i - 1] !== "\\") quote = null;
      continue;
    }
    if (ch === "'" || ch === '"') {
      quote = ch;
      out += ch;
      continue;
    }
    if (ch === "#") break;
    out += ch;
  }
  return out.trimEnd();
}

function preprocessLines(code: string): MiniLine[] {
  const rawLines = code.replace(/\r\n/g, "\n").split("\n");
  const lines: MiniLine[] = [];
  for (let i = 0; i < rawLines.length; i++) {
    const raw = rawLines[i];
    const indent = parseIndent(raw);
    const text = stripInlineComment(raw.slice(Math.min(raw.length, raw.search(/[^\s]/) === -1 ? raw.length : 0)) || raw)
      .trim();
    // Use raw indent slice safely (trim() above loses indentation; we need original non-comment content)
    const cleaned = stripInlineComment(raw).trim();
    if (!cleaned) continue;
    lines.push({ indent, text: cleaned, raw, lineNo: i + 1 });
  }
  return lines;
}

function parseBlock(lines: MiniLine[], startIdx: number, indent: number): { body: MiniStmt[]; nextIdx: number } {
  const body: MiniStmt[] = [];
  let i = startIdx;
  while (i < lines.length) {
    const line = lines[i];
    if (line.indent < indent) break;
    if (line.indent > indent) {
      throw new Error(`IndentationError on line ${line.lineNo}: unexpected indent`);
    }

    const txt = line.text;
    const ifMatch = txt.match(/^if\s+(.+)\s*:\s*$/);
    const whileMatch = txt.match(/^while\s+(.+)\s*:\s*$/);
    if (ifMatch) {
      const branches: Array<{ test?: string; body: MiniStmt[] }> = [];
      const test = ifMatch[1].trim();
      const parsedIfBody = parseBlock(lines, i + 1, indent + 4);
      branches.push({ test, body: parsedIfBody.body });
      i = parsedIfBody.nextIdx;

      while (i < lines.length && lines[i].indent === indent) {
        const t2 = lines[i].text;
        const elifMatch = t2.match(/^elif\s+(.+)\s*:\s*$/);
        const elseMatch = t2.match(/^else\s*:\s*$/);
        if (elifMatch) {
          const elifBody = parseBlock(lines, i + 1, indent + 4);
          branches.push({ test: elifMatch[1].trim(), body: elifBody.body });
          i = elifBody.nextIdx;
          continue;
        }
        if (elseMatch) {
          const elseBody = parseBlock(lines, i + 1, indent + 4);
          branches.push({ test: undefined, body: elseBody.body });
          i = elseBody.nextIdx;
          break;
        }
        break;
      }

      body.push({ kind: "if", branches, lineNo: line.lineNo });
      continue;
    }

    if (whileMatch) {
      const test = whileMatch[1].trim();
      const parsedBody = parseBlock(lines, i + 1, indent + 4);
      body.push({ kind: "while", test, body: parsedBody.body, lineNo: line.lineNo });
      i = parsedBody.nextIdx;
      continue;
    }

    const printMatch = txt.match(/^print\s*\(\s*(.*)\s*\)\s*$/);
    if (printMatch) {
      body.push({ kind: "print", expr: printMatch[1], lineNo: line.lineNo });
      i += 1;
      continue;
    }

    const assignMatch = txt.match(/^([A-Za-z_]\w*)\s*=\s*(.+)$/);
    if (assignMatch) {
      body.push({ kind: "assign", name: assignMatch[1], expr: assignMatch[2].trim(), lineNo: line.lineNo });
      i += 1;
      continue;
    }

    // If they typed `elif`/`else` without a matching if at this level, call it out.
    if (/^(elif|else)\b/.test(txt)) {
      throw new Error(`SyntaxError on line ${line.lineNo}: '${txt.split(/\s+/)[0]}' without a matching if`);
    }

    throw new Error(`SyntaxError on line ${line.lineNo}: I don't understand: ${txt}`);
  }
  return { body, nextIdx: i };
}

function evalMiniValue(expr: string, env: Record<string, MiniValue>): MiniValue {
  const t = expr.trim();
  if (!t) return "";
  if (isQuoted(t)) return unquote(t);
  if (/^(True|False)$/.test(t)) return t === "True";
  if (/^-?\d+$/.test(t)) return Number(t);

  // str(x)
  const strCall = t.match(/^str\s*\(\s*([A-Za-z_]\w*)\s*\)$/);
  if (strCall) {
    const v = env[strCall[1]];
    if (v === undefined) throw new Error(`NameError: name '${strCall[1]}' is not defined`);
    return String(v);
  }

  // input("prompt") or input("prompt").lower()
  const inputCall = t.match(/^input\s*\(\s*(.*?)\s*\)\s*(\.lower\(\))?\s*$/);
  if (inputCall) {
    // This gets handled at execution time (because we need the variable name).
    return "";
  }

  // x + y (numbers) or "a" + name (strings) etc (top-level + only)
  const parts = splitTopLevelPlus(t);
  if (parts.length > 1) {
    let acc: MiniValue | null = null;
    for (const p of parts) {
      const v = evalMiniValue(p, env);
      if (acc === null) {
        acc = v;
        continue;
      }
      if (typeof acc === "number" && typeof v === "number") acc = acc + v;
      else if (typeof acc === "string" && typeof v === "string") acc = acc + v;
      else if (typeof acc === "string" && typeof v !== "string") {
        throw new Error("TypeError: can only concatenate str (not non-str) to str");
      } else if (typeof acc !== "string" && typeof v === "string") {
        throw new Error("TypeError: unsupported operand types for +");
      } else {
        // boolean/other combos not used in our lessons; keep strict.
        throw new Error("TypeError: unsupported operand types for +");
      }
    }
    return acc ?? "";
  }

  // variable name
  if (/^[A-Za-z_]\w*$/.test(t)) {
    const v = env[t];
    if (v === undefined) throw new Error(`NameError: name '${t}' is not defined`);
    return v;
  }

  // x - 1 / x + 1 (common scoring)
  const math = t.match(/^([A-Za-z_]\w*)\s*([+-])\s*(\d+)\s*$/);
  if (math) {
    const left = env[math[1]];
    if (typeof left !== "number") throw new Error("TypeError: math needs numbers");
    const n = Number(math[3]);
    return math[2] === "+" ? left + n : left - n;
  }

  throw new Error(`SyntaxError: can't evaluate expression: ${t}`);
}

function evalCondition(test: string, env: Record<string, MiniValue>): boolean {
  const t = test.trim();
  if (!t) return false;

  // while running   (truthy)
  if (/^[A-Za-z_]\w*$/.test(t)) {
    const v = env[t];
    if (v === undefined) throw new Error(`NameError: name '${t}' is not defined`);
    return Boolean(v);
  }

  const eq = t.match(/^([A-Za-z_]\w*)\s*==\s*(.+)$/);
  if (!eq) throw new Error(`SyntaxError: unsupported condition: ${t}`);
  const leftName = eq[1];
  const left = env[leftName];
  if (left === undefined) throw new Error(`NameError: name '${leftName}' is not defined`);
  const rightVal = evalMiniValue(eq[2], env);
  return left === rightVal;
}

function runMiniPython(code: string, runtime: Record<string, string>, opts?: { maxSteps?: number }): MiniRunResult {
  const env: Record<string, MiniValue> = {};
  const stdout: string[] = [];
  const maxSteps = opts?.maxSteps ?? 500;
  let steps = 0;

  const lines = preprocessLines(code);
  let program: MiniStmt[] = [];
  try {
    program = parseBlock(lines, 0, 0).body;
  } catch (e) {
    return { stdout: [], env, error: (e as Error).message };
  }

  const execStmt = (stmt: MiniStmt) => {
    steps += 1;
    if (steps > maxSteps) throw new Error("RuntimeError: program took too long (possible infinite loop)");

    if (stmt.kind === "assign") {
      // score = score + 1 style
      const inc = stmt.expr.match(/^([A-Za-z_]\w*)\s*([+-])\s*(\d+)\s*$/);
      if (inc && inc[1] === stmt.name && typeof env[stmt.name] === "number") {
        const cur = env[stmt.name] as number;
        const n = Number(inc[3]);
        env[stmt.name] = inc[2] === "+" ? cur + n : cur - n;
        return;
      }

      const inputCall = stmt.expr.match(/^input\s*\(\s*(.*?)\s*\)\s*(\.lower\(\))?\s*$/);
      if (inputCall) {
        const promptExpr = inputCall[1]?.trim();
        const promptStr =
          promptExpr && isQuoted(promptExpr) ? unquote(promptExpr) : promptExpr ? String(promptExpr) : "";
        const answerRaw = (runtime?.[stmt.name] ?? "").toString();
        const answer = inputCall[2] ? answerRaw.toLowerCase() : answerRaw;
        stdout.push(`${promptStr}${answer}`);
        env[stmt.name] = answer;
        return;
      }

      env[stmt.name] = evalMiniValue(stmt.expr, env);
      return;
    }

    if (stmt.kind === "print") {
      const v = evalMiniValue(stmt.expr, env);
      stdout.push(typeof v === "string" ? v : String(v));
      return;
    }

    if (stmt.kind === "if") {
      for (const br of stmt.branches) {
        if (br.test === undefined) {
          for (const s of br.body) execStmt(s);
          return;
        }
        if (evalCondition(br.test, env)) {
          for (const s of br.body) execStmt(s);
          return;
        }
      }
      return;
    }

    if (stmt.kind === "while") {
      let guard = 0;
      while (evalCondition(stmt.test, env)) {
        guard += 1;
        if (guard > 25) throw new Error("RuntimeError: loop ran too many times (did you forget to stop it?)");
        for (const s of stmt.body) execStmt(s);
        // If the loop uses input(), our lessons expect one “turn” per Run.
        if (/\binput\s*\(/.test(code)) break;
      }
      return;
    }
  };

  try {
    for (const s of program) execStmt(s);
    return { stdout, env };
  } catch (e) {
    return { stdout, env, error: (e as Error).message };
  }
}

function analyzeScratch(code: string, runtime: Record<string, string>) {
  const env: Record<string, MiniValue> = {};

  // input(...) assignments: x = input("prompt")
  for (const m of code.matchAll(/\b([A-Za-z_]\w*)\s*=\s*input\s*\(/g)) {
    const name = m[1];
    if (name in runtime) env[name] = runtime[name];
  }

  // basic assignments: x = "text" | 123 | True/False
  for (const m of code.matchAll(
    /^\s*([A-Za-z_]\w*)\s*=\s*(["'][^"']*["']|-?\d+|True|False)\s*$/gm
  )) {
    const name = m[1];
    const raw = m[2].trim();
    if (isQuoted(raw)) env[name] = unquote(raw);
    else if (raw === "True" || raw === "False") env[name] = raw === "True";
    else env[name] = Number(raw);
  }

  // derive printed lines (best-effort, line-based)
  const printed: string[] = [];
  for (const line of code.split("\n")) {
    const idx = line.indexOf("print(");
    if (idx < 0) continue;
    const open = line.indexOf("(", idx);
    const close = line.lastIndexOf(")");
    if (open < 0 || close < 0 || close <= open) continue;
    const inner = line.slice(open + 1, close).trim();
    const out = evalMiniExpr(inner, env);
    printed.push(out === null ? `(couldn't evaluate) ${inner}` : out);
  }

  const vars = Object.entries(env)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => ({ key: k, value: v }));

  const hasWhile = /\bwhile\b/.test(code);
  const hasIf = /\bif\b/.test(code);
  const hasElif = /\belif\b/.test(code);
  const hasElse = /\belse\s*:/.test(code);
  const hasInput = /\binput\s*\(/.test(code);
  const hasPrint = /\bprint\s*\(/.test(code);

  const summaryBits: string[] = [];
  if (hasInput) summaryBits.push("You asked the user a question with input().");
  if (vars.length) summaryBits.push("You saved info into memory boxes (variables).");
  if (hasIf || hasElif || hasElse) summaryBits.push("You used choices (if/elif/else).");
  if (hasWhile) summaryBits.push("You used a loop (while), so parts can repeat.");
  if (hasPrint) summaryBits.push("You printed messages to the console.");

  const summary =
    summaryBits.length > 0
      ? summaryBits.join(" ")
      : "Start by adding a variable or a print statement, then press Run.";

  const tips: string[] = [];
  if (!hasPrint) tips.push("Add print(...) so you can see output in the console.");
  if (hasInput && vars.length === 0)
    tips.push("Tip: save input into a variable like name = input(\"...\").");
  if (hasWhile)
    tips.push("Heads up: loops can print multiple times — your output may repeat while it runs.");

  return { env, vars, printed, summary, tips };
}

const COMPLETED_LESSONS_KEY = "kanam.completedLessonIds";

function loadCompletedLessonIds(): string[] {
  try {
    const raw = window.localStorage.getItem(COMPLETED_LESSONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

function saveCompletedLessonIds(ids: string[]) {
  try {
    window.localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function LessonCanvas({ lesson }: { lesson: LessonConfig }) {
  const tourRef = React.useRef<SpotlightTourHandle | null>(null);
  const hubScrollRef = React.useRef<HTMLDivElement | null>(null);
  const [activeHubSection, setActiveHubSection] = React.useState<string>("flow");
  const terminalPrompt = lesson.terminalPrompt ?? "kanam-bot@python ~$";

  const runtimeDefaultValues = React.useMemo(() => {
    const entries =
      lesson.runtimeInputs?.map((i) => [i.key, i.defaultValue ?? ""] as const) ??
      [];
    return Object.fromEntries(entries) as Record<string, string>;
  }, [lesson.runtimeInputs]);

  const [activeEditor, setActiveEditor] = React.useState<"guided" | "scratch">(
    "guided"
  );
  const [guidedCode, setGuidedCode] = React.useState<string>(lesson.starterCode);
  const [scratchCode, setScratchCode] = React.useState<string>("");
  const [output, setOutput] = React.useState<string>(
    asTerminal(
      terminalPrompt,
      lesson.initialOutputBody ?? "Press Run to see output here."
    )
  );
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [hasRun, setHasRun] = React.useState<boolean>(false);
  const [runtime, setRuntime] = React.useState<Record<string, string>>(
    runtimeDefaultValues
  );
  const [revealedCfu, setRevealedCfu] = React.useState<boolean[]>(
    Array.from({ length: lesson.cfu.length }, () => false)
  );
  const [cfuDraftAnswers, setCfuDraftAnswers] = React.useState<string[]>(
    Array.from({ length: lesson.cfu.length }, () => "")
  );
  const [cfuChecked, setCfuChecked] = React.useState<boolean[]>(
    Array.from({ length: lesson.cfu.length }, () => false)
  );
  const [cfuFeedback, setCfuFeedback] = React.useState<(string | null)[]>(
    Array.from({ length: lesson.cfu.length }, () => null)
  );
  const [deviceId, setDeviceId] = React.useState<string>("");
  const [studentName, setStudentName] = React.useState<string>("");
  const [userId, setUserId] = React.useState<string>("");
  const [studentDbId, setStudentDbId] = React.useState<string>("");
  const [animateIn, setAnimateIn] = React.useState(false);
  const [successBurst, setSuccessBurst] = React.useState(false);
  const [cfuBurst, setCfuBurst] = React.useState(false);

  React.useEffect(() => {
    setAnimateIn(false);
    const t = window.setTimeout(() => setAnimateIn(true), 10);
    return () => window.clearTimeout(t);
  }, [lesson.id]);

  React.useEffect(() => {
    // Identify this device + authenticated learner (for production-grade saving with RLS).
    try {
      const key = "kanam.deviceId";
      const existing = window.localStorage.getItem(key);
      const id = existing || (crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()));
      if (!existing) window.localStorage.setItem(key, id);
      setDeviceId(id);
      setStudentName(window.localStorage.getItem("kanam.userName") ?? "");
    } catch {
      // ignore
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data } = await supabase.auth.getUser();
        const uid = data.user?.id ?? "";
        setUserId(uid);
        if (!uid) return;
        const { data: student } = await supabase
          .from("students")
          .select("id, display_name")
          .eq("user_id", uid)
          .maybeSingle();
        if (student?.id) setStudentDbId(student.id);
        if (student?.display_name) setStudentName(student.display_name);
      } catch {
        // ignore
      }
    })();
  }, []);

  const trackProgress = React.useCallback(
    async (eventType: string, payload?: unknown) => {
      if (!deviceId || !userId || !studentDbId) return;
      try {
        const supabase = createSupabaseBrowserClient();
        const now = new Date().toISOString();

        // Always write event log
        await supabase.from("progress_events").insert({
          student_id: studentDbId,
          device_id: deviceId,
          lesson_id: lesson.id,
          event_type: eventType,
          payload: (payload ?? {}) as any,
        });

        // Best-effort rollup (same logic as API route, but enforced by RLS)
        const patch: Record<string, unknown> = {
          student_id: studentDbId,
          lesson_id: lesson.id,
          last_event_at: now,
        };
        if (eventType === "lesson_opened") patch.opened_at = now;
        if (eventType === "run") patch.has_run = true;
        if (eventType === "guided_touched") patch.guided_touched = true;
        if (eventType === "scratch_touched") patch.scratch_touched = true;
        if (eventType === "lesson_success") {
          patch.success = true;
          patch.success_at = now;
        }
        if (eventType === "cfu_reveal") {
          const p: any = payload as any;
          if (typeof p?.revealedCount === "number") patch.cfu_revealed_count = p.revealedCount;
          if (typeof p?.total === "number") patch.cfu_total = p.total;
        }
        await supabase.from("lesson_progress").upsert(patch as any, {
          onConflict: "student_id,lesson_id",
        });
      } catch {
        // ignore
      }
    },
    [deviceId, userId, studentDbId, lesson.id]
  );

  React.useEffect(() => {
    if (!deviceId || !userId || !studentDbId) return;
    trackProgress("lesson_opened");
  }, [deviceId, userId, studentDbId, lesson.id, trackProgress]);

  React.useEffect(() => {
    if (!deviceId || !userId || !studentDbId) return;
    if (!lesson.cfu.length) return;
    const revealedCount = revealedCfu.filter(Boolean).length;
    trackProgress("cfu_reveal", { revealedCount, total: lesson.cfu.length });
  }, [deviceId, userId, studentDbId, lesson.id, lesson.cfu.length, revealedCfu, trackProgress]);

  React.useEffect(() => {
    if (!submitted) return;
    setSuccessBurst(true);
    const t = window.setTimeout(() => setSuccessBurst(false), 1200);
    return () => window.clearTimeout(t);
  }, [submitted]);

  React.useEffect(() => {
    if (lesson.cfu.length === 0) return;
    const total = lesson.cfu.length;
    const revealed = revealedCfu.filter(Boolean).length;
    const pct = total ? Math.round((revealed / total) * 100) : 0;
    if (pct !== 100) return;
    setCfuBurst(true);
    const t = window.setTimeout(() => setCfuBurst(false), 1200);
    return () => window.clearTimeout(t);
  }, [revealedCfu, lesson.cfu.length]);

  // Keep quiz state aligned if lesson changes or cfu count changes.
  React.useEffect(() => {
    setRevealedCfu(Array.from({ length: lesson.cfu.length }, () => false));
    setCfuDraftAnswers(Array.from({ length: lesson.cfu.length }, () => ""));
    setCfuChecked(Array.from({ length: lesson.cfu.length }, () => false));
    setCfuFeedback(Array.from({ length: lesson.cfu.length }, () => null));
  }, [lesson.cfu.length]);

  const activeCode = activeEditor === "guided" ? guidedCode : scratchCode;
  const readyToSubmitScratch = lesson.isSubmissionValid(scratchCode, runtime);
  const guidedTouched = guidedCode.trim() !== lesson.starterCode.trim();
  const scratchTouched = scratchCode.trim() !== "";
  const progressPercent = React.useMemo(
    () => {
      // Progress is ALWAYS based on "Try it from scratch" (the one that counts).
      if (!scratchCode.trim() && !submitted) return 0;
      const pct = lesson.computeProgressPercent(scratchCode, submitted, runtime);
      return Math.max(0, Math.min(100, pct));
    },
    [scratchCode, submitted, runtime, lesson]
  );
  const cfuBonusPercent = React.useMemo(() => {
    const total = lesson.cfu.length;
    if (!total) return 0;
    const revealed = revealedCfu.filter(Boolean).length;
    return Math.round((revealed / total) * 100);
  }, [revealedCfu, lesson.cfu.length]);
  const hasRevealedAnyCfu = revealedCfu.some(Boolean);
  const cfuBonusComplete = lesson.cfu.length > 0 && cfuBonusPercent === 100;

  const nextAction = React.useMemo(() => {
    if (submitted) {
      return lesson.nextHref ? "Success! When you’re ready, click Next Lesson." : "Success!";
    }
    if (!guidedTouched && !scratchTouched && !hasRun) {
      return "Start at the top: read Coach’s note + Quick explainer.";
    }
    if (!hasRun) {
      return "Press Run to test your code in the console.";
    }
    if (!scratchTouched) {
      return "Check the Console Output + explanation, then try it again from scratch (no hints).";
    }
    return "Submit from scratch to earn Success.";
  }, [guidedTouched, scratchTouched, hasRun, submitted, lesson.nextHref]);

  const FlowRow = ({
    num,
    label,
    done,
    active,
    hint,
  }: {
    num: number;
    label: string;
    done: boolean;
    active: boolean;
    hint?: string;
  }) => {
    return (
      <div
        className={[
          "flex items-start gap-3 rounded-xl border p-3",
          active
            ? "border-[var(--accent)] bg-[var(--accent)]/5"
            : "border-slate-200 bg-white/90",
        ].join(" ")}
      >
        <div
          className={[
            "mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-sm font-extrabold",
            done ? "bg-[var(--brand)] text-white" : "bg-slate-200 text-slate-700",
          ].join(" ")}
        >
          {done ? <CheckCircle2 className="h-4 w-4" /> : num}
        </div>
        <div className="min-w-0">
          <p className="text-base font-extrabold tracking-tight text-slate-900">{label}</p>
          {hint ? <p className="mt-1 text-sm text-slate-600">{hint}</p> : null}
        </div>
      </div>
    );
  };

  const onRun = () => {
    setHasRun(true);
    trackProgress("run");
    if (lesson.runOutputMode === "append" && lesson.getRunBody) {
      setOutput((prev) => {
        const body =
          lesson.getRunBody?.(activeCode, runtime, { prevOutput: prev }) ?? "";
        return appendToTerminal(prev, terminalPrompt, body);
      });
      return;
    }
    const run = runMiniPython(activeCode, runtime);
    const body = run.error
      ? `❌ ${run.error}`
      : run.stdout.length
        ? run.stdout.join("\n")
        : "(no output)\nTip: add print(...) to see output.";
    setOutput(asTerminal(terminalPrompt, body));
  };

  const onReset = () => {
    setGuidedCode(lesson.starterCode);
    setScratchCode("");
    setActiveEditor("guided");
    setOutput(
      asTerminal(terminalPrompt, lesson.initialOutputBody ?? "Press Run to see output here.")
    );
    setSubmitted(false);
    setHasRun(false);
    setRuntime(runtimeDefaultValues);
    setRevealedCfu(Array.from({ length: lesson.cfu.length }, () => false));
  };

  const onSubmit = () => {
    // Success is ONLY based on the "Try it from scratch" editor.
    const run = runMiniPython(scratchCode, runtime);
    const hasPlaceholders = scratchCode.includes("____");
    const structureOk = lesson.isSubmissionValid(scratchCode, runtime);
    const outputOk = lesson.isOutputCorrect
      ? lesson.isOutputCorrect(run.stdout, run.env, runtime)
      : true;
    const inputKeys = lesson.runtimeInputs?.map((i) => i.key) ?? [];
    const missingInputs = inputKeys.filter((k) => {
      const expectsThisInput = new RegExp(`\\b${k}\\s*=\\s*input\\s*\\(`).test(scratchCode);
      if (!expectsThisInput) return false;
      return !(runtime?.[k] ?? "").trim();
    });

    const hasSomePrintOutput =
      !run.error &&
      run.stdout.some((line) => {
        const t = (line ?? "").trim();
        if (!t) return false;
        // if the output still includes blanks, it's not done
        if (t.includes("____")) return false;
        // ignore our own generic placeholder messages
        if (t.startsWith("Tip:")) return false;
        return true;
      });

    const ok =
      !hasPlaceholders &&
      structureOk &&
      !run.error &&
      missingInputs.length === 0 &&
      outputOk &&
      hasSomePrintOutput;
    setSubmitted(ok);
    if (ok) trackProgress("lesson_success");

    const base = lesson.getSubmitOutput(ok, runtime);
    if (ok) {
      setOutput(base);
    } else {
      const reasons: string[] = [];
      if (hasPlaceholders) reasons.push("Fill in every ____ blank.");
      if (missingInputs.length)
        reasons.push(`Some input() answers are missing: ${missingInputs.join(", ")}.`);
      if (run.error) reasons.push(`Fix this error: ${run.error}`);
      if (!structureOk) reasons.push("Your code is missing a required part (check the checklist).");
      if (!outputOk) reasons.push("Your output doesn’t match what this lesson expects yet.");
      if (!hasSomePrintOutput) reasons.push("Make sure your code prints a real message (not blanks).");

      const extra = `\nWhy it’s not Success yet:\n- ${reasons.join("\n- ")}\n`;
      setOutput(injectBeforePrompt(base, terminalPrompt, extra));
    }

    if (ok) {
      const completed = loadCompletedLessonIds();
      if (!completed.includes(lesson.id)) {
        saveCompletedLessonIds([...completed, lesson.id]);
      }
    }
  };

  const LessonHeader = (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Image src="/images/Logo.png" alt="Kanam Academy logo" width={18} height={18} />
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
            Lesson Hub
          </p>
        </div>
        <h1 className="mt-1 truncate text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
          {lesson.title}
        </h1>
        <p className="mt-1 text-sm text-slate-600">{lesson.goal}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/how-to">How to</Link>
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => tourRef.current?.start({ fromBeginning: true })}
            className="border-[var(--accent)]/40 bg-gradient-to-r from-[var(--accent)]/20 via-white to-[var(--brand)]/15 text-slate-900 shadow-sm hover:bg-white"
          >
            <Sparkles className="h-4 w-4 text-[var(--accent)]" />
            Tutorial
          </Button>

          {lesson.prevHref ? (
            <Button asChild variant="secondary" size="sm">
              <Link href={lesson.prevHref}>Prev</Link>
            </Button>
          ) : (
            <Button variant="secondary" size="sm" disabled>
              Prev
            </Button>
          )}

          {lesson.nextHref ? (
            <Button asChild size="sm" className="shadow-sm">
              <Link href={lesson.nextHref}>Next</Link>
            </Button>
          ) : (
            <Button size="sm" disabled>
              Next
            </Button>
          )}
        </div>
        <Badge variant="secondary" className="shrink-0">
          <Zap className="mr-1 h-3.5 w-3.5 text-[var(--accent)]" />
          {lesson.xpReward} XP
        </Badge>
        <Badge
          variant={submitted ? "success" : "outline"}
          className={submitted ? "animate-pulse" : ""}
        >
          {lesson.badge}
        </Badge>
      </div>
    </div>
  );

  const LearnContent = (
    <div className="space-y-4">
      <Card
        id="hub-flow"
        data-tour="lesson-flow"
        data-hub="flow"
        className="scroll-mt-24 border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md"
      >
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/15">
              <ListOrdered className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div className="min-w-0">
              <p className="text-base font-extrabold tracking-tight text-slate-900 md:text-lg">
                Do this in order
              </p>
              <p className="mt-0.5 text-sm text-slate-600">
                Follow these steps and you’ll know exactly what to do next.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="rounded-xl border border-[rgb(var(--accent-rgb)/0.55)] bg-white/90 p-3">
            <p className="text-base font-extrabold tracking-tight text-slate-900">Next up</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">{nextAction}</p>
          </div>
          <div className="mt-3 grid gap-2">
            <FlowRow
              num={1}
              label="Read Coach’s note"
              done={guidedTouched || scratchTouched || hasRun || submitted}
              active={!guidedTouched && !scratchTouched && !hasRun && !submitted}
              hint="This tells you the goal and the vibe."
            />
            <FlowRow
              num={2}
              label="Read the Quick explainer"
              done={guidedTouched || scratchTouched || hasRun || submitted}
              active={!guidedTouched && !scratchTouched && !hasRun && !submitted}
              hint="Learn the idea before you code."
            />
            <FlowRow
              num={3}
              label="Fill in the blanks (guided)"
              done={hasRun || submitted}
              active={!hasRun && (guidedTouched || activeEditor === "guided")}
              hint="Practice with hints first."
            />
            <FlowRow
              num={4}
              label="Press Run"
              done={hasRun || submitted}
              active={!hasRun && (guidedTouched || scratchTouched)}
              hint="See what your code does in the console."
            />
            <FlowRow
              num={5}
              label="Check Console Output"
              done={hasRun || submitted}
              active={hasRun && !scratchTouched && !submitted}
              hint="Look for what your print(...) actually printed."
            />
            <FlowRow
              num={6}
              label="Read Console output explanation"
              done={hasRun || submitted}
              active={hasRun && !scratchTouched && !submitted}
              hint="It shows your variables + the exact printed output."
            />
            <FlowRow
              num={7}
              label="Try it from scratch (no hints)"
              done={scratchTouched || submitted}
              active={hasRun && !scratchTouched}
              hint="This is the real skill-builder."
            />
            <FlowRow
              num={8}
              label="Submit (from scratch)"
              done={submitted}
              active={scratchTouched && !submitted}
              hint="Success only checks your from-scratch box."
            />
            <FlowRow
              num={9}
              label="Check for Understanding (CFU)"
              done={hasRevealedAnyCfu}
              active={submitted && !hasRevealedAnyCfu}
              hint="Try to answer first, then reveal to check yourself."
            />
            <FlowRow
              num={10}
              label="Bonus: expand your knowledge (optional)"
              done={cfuBonusComplete}
              active={submitted && hasRevealedAnyCfu && !cfuBonusComplete}
              hint="Reveal all CFU answers (bonus bar), then try the “Try This” challenges."
            />
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Tip: You can always switch between the two editors — guided is practice, scratch is the
            “real attempt.”
          </p>
        </CardContent>
      </Card>

      <Card
        id="hub-coach"
        data-tour="coach-note"
        data-hub="coach"
        className="scroll-mt-24 border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md"
      >
        <CardHeader className="pb-4">
          <SectionHeader
            icon={<Sparkles className="h-5 w-5 text-[var(--accent)]" />}
            title="Coach’s note"
            subtitle="Read this first — it explains the goal + how to think about the code."
          />
        </CardHeader>
        <CardContent className="pt-0 text-sm text-slate-700">
          {renderCoachNote(lesson.instructorScript)}
          <p className="mt-3 leading-relaxed text-slate-600">
            Read the steps, fill the blanks, then press{" "}
            <span className="font-semibold text-slate-900">Run</span>.
          </p>
        </CardContent>
      </Card>

      <Card
        id="hub-explainer"
        data-tour="quick-explainer"
        data-hub="explainer"
        className="scroll-mt-24 border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md"
      >
        <CardHeader className="pb-4">
          <SectionHeader
            icon={<BookOpen className="h-5 w-5 text-[var(--accent)]" />}
            title="Quick explainer"
            subtitle="Learn the idea in plain English before you code."
          />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid gap-3">
            {lesson.kidExplain.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50/70 to-white/60 p-3"
              >
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {(() => {
        const text = collectLessonText(lesson);
        const matches = WORD_HELP.filter((w) => w.match.test(text)).slice(0, 6);
        if (!matches.length) return null;
        return (
          <Card
            id="hub-words"
            data-hub="words"
            className="scroll-mt-24 border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md"
          >
            <CardHeader className="pb-4">
              <SectionHeader
                icon={<BookOpen className="h-5 w-5 text-[var(--accent)]" />}
                title="Word help"
                subtitle="Quick definitions for tricky words in this lesson."
              />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid gap-2">
                {matches.map((w) => (
                  <div
                    key={w.key}
                    className="rounded-xl border border-[rgb(var(--accent-rgb)/0.55)] bg-white/90 p-3"
                  >
                    <p className="text-sm font-semibold text-slate-900">{w.term}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">{w.meaning}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })()}

      <Card
        id="hub-safety"
        data-hub="safety"
        className="scroll-mt-24 border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md"
      >
        <CardHeader className="pb-4">
          <SectionHeader
            icon={<ShieldCheck className="h-5 w-5 text-[var(--accent)]" />}
            title="AI safety moment"
            subtitle="A quick real-world reminder about using AI responsibly."
          />
        </CardHeader>
        <CardContent className="pt-0 text-sm text-slate-700">
          <p className="leading-relaxed">{lesson.aiSafetyMoment}</p>
        </CardContent>
      </Card>

      <Card
        id="hub-steps"
        data-hub="steps"
        className="scroll-mt-24 border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md"
      >
        <CardHeader className="pb-4">
          <SectionHeader
            icon={<ListChecks className="h-5 w-5 text-[var(--accent)]" />}
            title="Steps"
            subtitle="Do these in order — it’s the fastest path to Success."
          />
        </CardHeader>
        <CardContent className="pt-0">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
            {lesson.steps.map((step) => (
              <li key={step} className="leading-relaxed">
                <span className="font-medium">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );

  const ReviewContent = (
    <div className="space-y-4">
      <Card
        id="hub-cfu"
        data-hub="cfu"
        className="scroll-mt-24 border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md"
      >
        <CardHeader className="pb-4">
          <SectionHeader
            icon={<BadgeCheck className="h-5 w-5 text-[var(--accent)]" />}
            title="Check for Understanding (CFU)"
            subtitle="Type your answer first, then check it, then reveal."
          />
        </CardHeader>
        <CardContent className="space-y-3">
          {lesson.cfu.map((item, idx) => (
            <div
              key={item.question}
              className="rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50/70 to-white/60 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-slate-900">
                  {idx + 1}. {item.question}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!cfuChecked[idx]}
                  onClick={() => {
                    if (!cfuChecked[idx]) return;
                    setRevealedCfu((prev) => prev.map((v, i) => (i === idx ? !v : v)));
                  }}
                >
                  {revealedCfu[idx] ? "Hide" : "Show"} answer
                </Button>
              </div>

              <div className="mt-3 rounded-lg border border-[rgb(var(--accent-rgb)/0.55)] bg-white/90 p-3">
                <p className="text-sm font-extrabold tracking-tight text-slate-900">
                  Your answer (type first)
                </p>
                <Textarea
                  value={cfuDraftAnswers[idx] ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setCfuDraftAnswers((prev) => prev.map((x, i) => (i === idx ? v : x)));
                    // If they edit after checking, require a re-check.
                    setCfuChecked((prev) => prev.map((x, i) => (i === idx ? false : x)));
                    setCfuFeedback((prev) => prev.map((x, i) => (i === idx ? null : x)));
                    setRevealedCfu((prev) => prev.map((x, i) => (i === idx ? false : x)));
                  }}
                  placeholder="Type your best answer here…"
                  className="mt-2 min-h-[90px] bg-white"
                />
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      const res = aiCheckCfuAnswer(cfuDraftAnswers[idx] ?? "", item.answer);
                      setCfuChecked((prev) => prev.map((x, i) => (i === idx ? true : x)));
                      setCfuFeedback((prev) => prev.map((x, i) => (i === idx ? res.message : x)));
                    }}
                    disabled={!(cfuDraftAnswers[idx] ?? "").trim()}
                  >
                    Check my answer
                  </Button>
                  {!cfuChecked[idx] ? (
                    <p className="text-xs text-slate-500">
                      You must check your answer before you can reveal.
                    </p>
                  ) : null}
                </div>
                {cfuFeedback[idx] ? (
                  <div className="mt-2 rounded-md border border-[rgb(var(--accent-rgb)/0.55)] bg-white/90 p-2 text-sm text-slate-700">
                    <span className="font-semibold">Feedback:</span> {cfuFeedback[idx]}
                  </div>
                ) : (
                  <div className="mt-2 rounded-md border border-dashed border-slate-300 bg-white/90 p-2 text-sm text-slate-600">
                    (Waiting — type your answer, then press “Check my answer”.)
                  </div>
                )}
              </div>

              {revealedCfu[idx] ? (
                <div className="mt-2 rounded-md border border-[rgb(var(--accent-rgb)/0.55)] bg-white/90 p-3 text-sm text-slate-700">
                  <p className="text-sm font-extrabold tracking-tight text-slate-900">
                    Official answer
                  </p>
                  <p className="mt-1 leading-relaxed">
                    {item.answer}
                  </p>
                  <p className="mt-3 text-xs text-slate-500">
                    Tip: If your answer was different but had the same meaning, that’s still a win.
                    The goal is understanding, not perfect wording.
                  </p>
                </div>
              ) : (
                <div className="mt-2 rounded-md border border-dashed border-slate-300 bg-white/90 p-2 text-sm text-slate-600">
                  (Hidden — type your answer and check it first.)
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-end">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() =>
                (setRevealedCfu(Array.from({ length: lesson.cfu.length }, () => false)),
                setCfuDraftAnswers(Array.from({ length: lesson.cfu.length }, () => "")),
                setCfuChecked(Array.from({ length: lesson.cfu.length }, () => false)),
                setCfuFeedback(Array.from({ length: lesson.cfu.length }, () => null)))
              }
            >
              Reset quiz
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card
        id="hub-try"
        data-hub="try"
        className="scroll-mt-24 border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md"
      >
        <CardHeader className="pb-4">
          <SectionHeader
            icon={<Sparkles className="h-5 w-5 text-[var(--accent)]" />}
            title="Try This"
            subtitle="Optional power-ups (but they make you better fast)."
          />
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
            {lesson.tryThis.map((challenge) => (
              <li key={challenge} className="leading-relaxed">
                {challenge}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  const Editor = (
    <Card className="flex min-h-[420px] flex-col border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-slate-700" />
          <CardTitle>Write Your Python Code Here</CardTitle>
        </div>
        <CardDescription>
          Start with the guided version, then try it again from scratch.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="rounded-xl border border-[rgb(var(--accent-rgb)/0.55)] bg-gradient-to-r from-[rgb(var(--brand-rgb)/0.14)] via-white/70 to-[rgb(var(--accent-rgb)/0.18)] p-4">
          <p className="text-sm font-extrabold tracking-tight text-slate-900">
            {lesson.assignmentTitle ?? "Your mission"}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">
            {lesson.assignmentBody ?? `Build this from scratch: ${lesson.goal}`}
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {(lesson.assignmentChecklist?.length
              ? lesson.assignmentChecklist
              : [
                  "Use the guided box first if you want help.",
                  "Then rebuild it in the scratch box (that’s the one that counts).",
                  "Press Run to test, then Submit when it works.",
                ]
            ).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-600">
            Tip: <span className="font-semibold">Submit</span> checks your{" "}
            <span className="font-semibold">scratch</span> box, not the guided one.
          </p>
        </div>

        <div className="space-y-3">
          <div className="rounded-md border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">
                Fill in the blanks (guided)
              </p>
              {activeEditor === "guided" ? (
                <Badge variant="secondary">Using this</Badge>
              ) : (
                <Badge variant="outline">Click to use</Badge>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Edit this version first. Then try writing it again below without help.
            </p>
            <Textarea
              value={guidedCode}
              onChange={(e) => setGuidedCode(e.target.value)}
              onFocus={() => setActiveEditor("guided")}
              spellCheck={false}
              aria-label="Guided Python code editor"
              data-tour="guided-editor"
              className={[
                "mt-2 min-h-[220px] w-full resize-none border-2 bg-white shadow-sm",
                "focus-visible:ring-4",
                activeEditor === "guided"
                  ? submitted
                    ? "border-[var(--brand)] focus-visible:ring-[var(--brand)]/25"
                    : "border-[var(--accent)] focus-visible:ring-[var(--accent)]/25"
                  : "border-slate-200 focus-visible:ring-slate-200/25",
              ].join(" ")}
            />
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">
                Try it from scratch (no hints)
              </p>
              {activeEditor === "scratch" ? (
                <Badge variant="secondary">Using this</Badge>
              ) : (
                <Badge variant="outline">Click to use</Badge>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Start with a blank page. If you get stuck, click back into the guided
              version.
            </p>
            <p className="mt-2 text-xs text-slate-600">
              <span className="font-semibold">Submit checks this box.</span> (Guided is for practice.)
            </p>
            <Textarea
              value={scratchCode}
              onChange={(e) => setScratchCode(e.target.value)}
              onFocus={() => setActiveEditor("scratch")}
              spellCheck={false}
              aria-label="From-scratch Python code editor"
              data-tour="scratch-editor"
              placeholder={
                lesson.editorPlaceholder ??
                '# Start here:\n# print("Hello!")\n'
              }
              className={[
                "mt-2 min-h-[220px] w-full resize-none border-2 bg-white shadow-sm",
                "focus-visible:ring-4",
                activeEditor === "scratch"
                  ? submitted
                    ? "border-[var(--brand)] focus-visible:ring-[var(--brand)]/25"
                    : "border-[var(--accent)] focus-visible:ring-[var(--accent)]/25"
                  : "border-slate-200 focus-visible:ring-slate-200/25",
              ].join(" ")}
            />
          </div>
        </div>
        {/* Removed: "What would you type?" panel. Inputs are currently auto-filled using lesson defaults. */}
        <div className="mt-auto rounded-md border border-slate-200 bg-white p-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button data-tour="run-button" onClick={onRun} variant="secondary">
              <Play className="h-4 w-4" />
              Run
            </Button>
            <Button onClick={onReset} variant="outline">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button data-tour="submit-button" onClick={onSubmit} disabled={!scratchCode.trim()}>
              <CheckCircle2 className="h-4 w-4" />
              Submit (from scratch)
            </Button>
            {submitted ? (
              <Badge variant="success" className="ml-auto animate-bounce">
                Success!
              </Badge>
            ) : readyToSubmitScratch ? (
              <Badge variant="secondary" className="ml-auto">
                Ready to submit
              </Badge>
            ) : (
              <Badge variant="outline" className="ml-auto">
                Keep going
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const Output = (
    <Card className="flex min-h-[320px] flex-col border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md">
      <CardHeader>
        <CardTitle>Console Output</CardTitle>
        <CardDescription>Looks like a terminal.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-full min-h-[220px] overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/80 p-3 font-mono text-sm text-slate-900 shadow-inner">
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </CardContent>
    </Card>
  );

  const activeAnalysis = React.useMemo(() => {
    if (!activeCode.trim()) return null;
    const run = runMiniPython(activeCode, runtime);
    const vars = Object.entries(run.env)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => ({ key, value }));
    return {
      editor: activeEditor,
      code: activeCode,
      vars,
      printed: run.error ? [`❌ ${run.error}`] : run.stdout,
      summary: run.error
        ? "Your code hit an error. Fix it and press Run again."
        : "This is the exact output your code printed (best-effort Python runner).",
      tips: run.error
        ? ["Check colons (:), indentation, and spelling of variable names."]
        : [],
    };
  }, [activeCode, activeEditor, runtime]);

  const OutputExplanation = (
    <Card className="border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md">
      <CardHeader className="pb-4">
        <SectionHeader
          icon={<Terminal className="h-5 w-5 text-[var(--accent)]" />}
          title="Console output explanation"
          subtitle={`This explains the output from the editor you’re using right now: ${
            activeEditor === "guided" ? "Fill in the blanks" : "Try it from scratch"
          }.`}
        />
      </CardHeader>
      <CardContent className="space-y-3">
        {!activeCode.trim() ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white/90 p-3 text-sm text-slate-600">
            Write something in the editor, then press Run. This box will explain your output.
          </div>
        ) : (
          <>
            <div className="rounded-xl border border-[rgb(var(--accent-rgb)/0.55)] bg-white/90 p-3">
              <p className="text-sm font-semibold text-slate-900">What your code did:</p>
              <p className="mt-1 text-sm text-slate-700">{activeAnalysis?.summary}</p>
              {activeAnalysis?.tips?.length ? (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-600">
                  {activeAnalysis.tips.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              <div className="rounded-xl border border-[rgb(var(--accent-rgb)/0.55)] bg-white/90 p-3">
                <p className="text-sm font-extrabold tracking-tight text-slate-900">
                  Your code (current editor)
                </p>
                <div className="mt-2 max-h-56 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50/80 p-2 font-mono text-xs text-slate-900">
                  <pre className="whitespace-pre-wrap">{activeCode.trim()}</pre>
                </div>
              </div>

              <div className="rounded-xl border border-[rgb(var(--accent-rgb)/0.55)] bg-white/90 p-3">
                <p className="text-sm font-extrabold tracking-tight text-slate-900">
                  Memory boxes (variables)
                </p>
                <div className="mt-2 space-y-1 text-sm text-slate-800">
                  {activeAnalysis?.vars?.length ? (
                    activeAnalysis.vars.map(({ key, value }) => (
                      <div key={key} className="flex items-start justify-between gap-3">
                        <span className="font-semibold">{key}</span>
                        <span className="font-mono text-xs text-slate-700">
                          {typeof value === "string" ? `"${value}"` : String(value)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-600">(No variables detected yet.)</p>
                  )}
                </div>
                {lesson.runtimeInputs?.length ? (
                  <p className="mt-2 text-xs text-slate-500">
                    Note: input() answers are currently auto-filled for you (based on lesson defaults).
                  </p>
                ) : null}
              </div>
            </div>

            <div className="rounded-xl border border-[rgb(var(--accent-rgb)/0.55)] bg-white/90 p-3">
              <p className="text-sm font-extrabold tracking-tight text-slate-900">
                Print output (from your print statements)
              </p>
              <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50/80 p-2 font-mono text-xs text-slate-900">
                <pre className="whitespace-pre-wrap">
                  {(activeAnalysis?.printed?.length
                    ? activeAnalysis.printed.join("\n")
                    : "(no print output yet)")}
                </pre>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

  const CodingLab = (
    <div className="flex flex-col gap-4">
      {Editor}
      {Output}
      {OutputExplanation}
      {submitted && lesson.nextHref ? (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Nice work!</p>
              <p className="text-sm text-slate-600">Ready for the next lesson?</p>
            </div>
            <Button asChild>
              <Link href={lesson.nextHref}>Next Lesson</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );

  const hubNavItems = React.useMemo(() => {
    const hasWordHelp = WORD_HELP.some((w) => w.match.test(collectLessonText(lesson)));
    const items: Array<{ id: string; label: string }> = [
      { id: "flow", label: "Do this in order" },
      { id: "coach", label: "Coach’s note" },
      { id: "explainer", label: "Quick explainer" },
      ...(hasWordHelp ? [{ id: "words", label: "Word help" }] : []),
      { id: "safety", label: "AI safety" },
      { id: "steps", label: "Steps" },
      ...(lesson.cfu.length ? [{ id: "cfu", label: "CFU" }] : []),
      ...(lesson.tryThis.length ? [{ id: "try", label: "Try This" }] : []),
    ];
    return items;
  }, [lesson]);

  React.useEffect(() => {
    const root = hubScrollRef.current;
    if (!root) return;
    const sections = hubNavItems
      .map((it) => root.querySelector(`[data-hub="${it.id}"]`) as HTMLElement | null)
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        const best = visible[0]?.target as HTMLElement | undefined;
        const id = best?.getAttribute("data-hub") ?? null;
        if (id) setActiveHubSection(id);
      },
      { root, threshold: [0.15, 0.25, 0.35, 0.5, 0.7] }
    );

    sections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [hubNavItems]);

  const HubNav = (
    <div className="kanam-hub-rail p-3">
      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
          Lesson Hub
        </p>
        <div className="mt-3 rounded-xl border border-[rgb(var(--accent-rgb)/0.55)] bg-white/90 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-slate-700">Progress</p>
            <p className="text-xs font-extrabold text-slate-900">{progressPercent}%</p>
          </div>
          <div className="mt-2">
            <Progress
              value={progressPercent}
              className={[submitted ? "h-2.5" : "h-2", "bg-slate-100"].join(" ")}
              indicatorClassName={
                submitted
                  ? [
                      "shadow-[0_0_14px_rgba(16,185,129,0.55)]",
                      "bg-gradient-to-r from-[var(--brand)] via-[var(--accent)] to-[var(--brand)]",
                      "[background-size:200%_200%]",
                      "animate-[kanamShimmer_1.15s_linear_infinite]",
                    ].join(" ")
                  : "bg-[var(--brand)]"
              }
            />
          </div>

          {lesson.cfu.length ? (
            <div className="mt-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-slate-700">Bonus (CFU)</p>
                <p className="text-xs font-extrabold text-slate-900">
                  {revealedCfu.filter(Boolean).length}/{lesson.cfu.length}
                </p>
              </div>
              <div className="mt-2">
                <Progress
                  value={cfuBonusPercent}
                  className={[cfuBonusPercent === 100 ? "h-2.5" : "h-2", "bg-slate-100"].join(" ")}
                  indicatorClassName={
                    cfuBonusPercent === 100
                      ? [
                          "shadow-[0_0_12px_rgba(216,192,122,0.65)]",
                          "bg-gradient-to-r from-[var(--accent)] via-[var(--brand)] to-[var(--accent)]",
                          "[background-size:200%_200%]",
                          "animate-[kanamShimmer_1.15s_linear_infinite]",
                        ].join(" ")
                      : "bg-[var(--accent)]"
                  }
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className="mt-3 grid gap-1">
          {hubNavItems.map((it) => {
            const active = activeHubSection === it.id;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => {
                  const root = hubScrollRef.current;
                  const el = root?.querySelector(`[data-hub="${it.id}"]`) as HTMLElement | null;
                  if (!el) return;
                  el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                }}
                className={[
                  "w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition",
                  active
                    ? "bg-[var(--brand)]/10 text-[var(--brand-2)] ring-1 ring-[var(--brand)]/25"
                    : "text-slate-700 hover:bg-slate-50",
                ].join(" ")}
              >
                {it.label}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Tip: Click a section to jump.
        </p>
      </div>
    </div>
  );

  return (
    <WelcomeBackground>
      <SpotlightTour
        ref={tourRef}
        storageKey={`kanam_tour_lesson_${lesson.id}_v2_done`}
        remember={false}
        steps={[
          {
            id: "order",
            selector: '[data-tour="lesson-flow"]',
            title: "Read: Do this in order",
            body: "This checklist is your map. The tour will follow these exact steps. If you feel stuck later, come back to this box.",
            emoji: "👀",
            padding: 12,
          },
          {
            id: "coach",
            selector: '[data-tour="coach-note"]',
            title: "Step 1: Coach’s note",
            body: "Skim this first. It tells you what you’re building, what it should do, and the #1 mistake to avoid.",
            emoji: "✨",
            padding: 12,
          },
          {
            id: "explain",
            selector: '[data-tour="quick-explainer"]',
            title: "Step 2: Quick explainer",
            body: "Learn the idea in plain English first (then the code will make way more sense).",
            emoji: "📚",
            padding: 10,
          },
          {
            id: "guided",
            selector: '[data-tour="guided-editor"]',
            title: "Step 3: Fill in the blanks (guided)",
            body: "Start here to practice. Fix the ____ blanks, then you’ll be ready to test it.",
            emoji: "🧩",
            padding: 12,
          },
          {
            id: "run",
            selector: '[data-tour="run-button"]',
            title: "Step 4: Press Run",
            body: "Run = test. Look at the console output to see what your code actually printed.",
            emoji: "▶️",
            padding: 10,
          },
          {
            id: "scratch",
            selector: '[data-tour="scratch-editor"]',
            title: "Step 5: Try it from scratch",
            body: "This is the real skill-builder. Success is checked from THIS box (no hints).",
            emoji: "🧠",
            padding: 12,
          },
          {
            id: "submit",
            selector: '[data-tour="submit-button"]',
            title: "Step 6: Submit (from scratch)",
            body: "When your scratch code works and prints the right message, hit Submit to earn Success (and light up the bar).",
            emoji: "🏁",
            padding: 10,
          },
        ]}
      />
      <div
        className={[
          "flex min-h-[calc(100dvh-160px)] w-full items-start justify-start px-4 md:px-10",
          "transition-all duration-300 ease-out",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        ].join(" ")}
      >
        <div className="w-full space-y-4 py-2 md:py-4">
          {/* Mobile / Tablet: Tabs */}
          <div className="md:hidden">
            <Tabs defaultValue="learn">
              <TabsList className="w-full bg-white shadow-sm">
                <TabsTrigger value="learn" className="flex-1">
                  Lesson Hub
                </TabsTrigger>
                <TabsTrigger value="code" className="flex-1">
                  Code
                </TabsTrigger>
                <TabsTrigger value="review" className="flex-1">
                  Review
                </TabsTrigger>
              </TabsList>
              <TabsContent value="learn">
                <Card className="border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md">
                  <CardContent className="space-y-4 pt-6">
                    {LessonHeader}
                    {LearnContent}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="code">{CodingLab}</TabsContent>
              <TabsContent value="review">
                <Card className="border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md">
                  <CardContent className="space-y-4 pt-6">
                    {LessonHeader}
                    {ReviewContent}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop: 40% lesson / 60% interactivity */}
          <div className="hidden md:block">
            <div className="grid gap-4 lg:grid-cols-[300px_1fr] lg:items-start">
              {/* Separate, styled Hub rail */}
              <div className="sticky top-6 self-start">
                <div className="max-h-[calc(100dvh-220px)] overflow-y-auto pr-1">
                  {HubNav}
                </div>
              </div>

              {/* Main lesson surface */}
            <div className="overflow-hidden rounded-2xl border border-[rgb(var(--accent-rgb)/0.65)] bg-white shadow-xl">
                <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                  {/* Hub content */}
                  <div className="bg-white/92">
                    <div
                      ref={hubScrollRef}
                      className="max-h-[calc(100dvh-220px)] overflow-y-auto p-6"
                    >
                      <div className="space-y-4">
                        {LessonHeader}
                        {LearnContent}
                        {ReviewContent}
                      </div>
                    </div>
                  </div>

                  {/* Coding lab */}
                  <div className="border-l border-slate-200 bg-white/92">
                    <div className="max-h-[calc(100dvh-220px)] overflow-y-auto p-6">
                      {CodingLab}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WelcomeBackground>
  );
}

