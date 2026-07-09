"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Video,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { SpotlightTour, type SpotlightTourHandle } from "@/components/ui/SpotlightTour";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isGuestMode, markGuestLessonComplete } from "@/lib/guestProgress";
import { DesignModePanel } from "@/components/lesson/DesignModePanel";
import { NpcChallengeMode } from "@/components/lesson/NpcChallengeMode";
import { CodeTextarea } from "@/components/lesson/CodeTextarea";
import {
  defaultDesignState,
  generatePythonStarterCode,
  type DesignState,
} from "@/lib/designMode";
import { runMiniPython, type MiniRunResult, type MiniValue } from "@/lib/pythonRunner";

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

  // Optional: Week 7+ "Design Mode" (generate starter code from a plan).
  designMode?: boolean;
  designModePromptVersion?: string; // for migrations
  scratchTemplateCode?: string; // used by "Reset to Template"

  // Optional: Week 7+ "NPC Challenge Mode" (guided game-like practice).
  npcChallengeMode?: boolean;
  npcChallengePromptVersion?: string; // for migrations

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

  // Optional: lightweight "Instructor" panel for live classes.
  // Zoom meetings often cannot be embedded due to X-Frame-Options; use joinUrl as the primary path.
  instructorLive?: {
    label?: string;
    joinUrl?: string;
    embedUrl?: string;
    mode?: "link_only" | "iframe" | "zoom_sdk_preview" | "zoom_sdk_pip_preview";
    corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    note?: string;
  };

  // Optional: Spotlight tutorial behavior (useful for /learn/demo).
  tourRemember?: boolean;
  tourFadeMs?: number;
  tourMoveMs?: number;
  tourRecomputeDelayMs?: number;
  localStatePersistence?: boolean;

  // Optional: Coach's note accountability gate (timed confirmation checkpoint).
  coachNoteGateEnabled?: boolean;
  coachNoteGateSeconds?: number;

  // Optional: show a success CTA card after a successful Submit (useful for /learn/demo).
  completionCta?: {
    title: string;
    body: string;
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };

  // Optional: redirect after a successful Submit (useful for /learn/demo).
  completionRedirectHref?: string;

  // Optional: override the "Dashboard" button destination (useful for demo mode).
  dashboardHref?: string;

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
  for: { variant: "yellow" },
  "range()": { variant: "yellow" },
  indentation: { variant: "yellow" },
  loop: { variant: "yellow" },
  pattern: { variant: "yellow" },
  predict: { variant: "yellow" },
  condition: { variant: "yellow" },
  iteration: { variant: "yellow" },
  list: { variant: "yellow" },
  memory: { variant: "yellow" },
  append: { variant: "yellow" },
  remove: { variant: "yellow" },
  dictionary: { variant: "yellow" },
  function: { variant: "yellow" },
  def: { variant: "yellow" },
  call: { variant: "yellow" },
  reuse: { variant: "yellow" },
  key: { variant: "yellow" },
  keys: { variant: "yellow" },
  value: { variant: "yellow" },
  values: { variant: "yellow" },
  "organized memory": { variant: "yellow" },
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
      /\bcase-sensitive\b|\bvariable\b|\bliteral\b|\bSubmit\b|\bRun\b|\btest\b|\bindentation\b|\bloop\b|\bpattern\b|\bpredict\b|\bcondition\b|\biteration\b|\blist\b|\bmemory\b|\bappend\b|\bremove\b|\bdictionary\b|\bkey\b|\bkeys\b|\bvalue\b|\bvalues\b|\borganized memory\b|\bfunction\b|\bparameter\b|\bparameters\b|\bargument\b|\barguments\b|\bplaceholder\b|\boutput\b|\bdef\b|\bcall\b|\breuse\b|\bif\b|\belif\b|\belse\b|\bwhile\b|\bfor\b|\bTrue\b|\bFalse\b|input\(\)|print\(\)|range\(\)/g;

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

    // Simple fenced code blocks for coach notes:
    // ```
    // code here
    // ```
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
      <p key={`ln-${key++}`} className="leading-relaxed">
        {renderCoachInline(line)}
      </p>
    );
  }

  // If they forgot to close a fence, render what we have.
  flushCode();

  return <div className="space-y-2">{out}</div>;
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

export function LessonCanvas({ lesson }: { lesson: LessonConfig }) {
  const router = useRouter();
  const tourRef = React.useRef<SpotlightTourHandle | null>(null);
  const hubScrollRef = React.useRef<HTMLDivElement | null>(null);
  const coachNoteRef = React.useRef<HTMLDivElement | null>(null);
  const [activeHubSection, setActiveHubSection] = React.useState<string>("flow");
  const terminalPrompt = lesson.terminalPrompt ?? "kanam-bot@python ~$";
  const lessonTourStorageKey = React.useMemo(
    () => `kanam_tour_lesson_${lesson.id}_v2_done`,
    [lesson.id]
  );
  const localStatePersistence = lesson.localStatePersistence ?? true;
  const tourRemember = lesson.tourRemember ?? false;

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
  const [guidedHasRun, setGuidedHasRun] = React.useState<boolean>(false);
  const [guidedRunSuccessful, setGuidedRunSuccessful] = React.useState<boolean>(false);
  const [scratchRunSuccessful, setScratchRunSuccessful] = React.useState<boolean>(false);
  const [guidedOutput, setGuidedOutput] = React.useState<string>(
    asTerminal(terminalPrompt, "Press Run (guided) to see output here.")
  );

  const coachGateEnabled = lesson.coachNoteGateEnabled ?? true;
  const coachGateSeconds = Math.max(0, Math.min(60, lesson.coachNoteGateSeconds ?? 8));
  const [coachGateStartedAt, setCoachGateStartedAt] = React.useState<number | null>(null);
  const [coachGateRemainingMs, setCoachGateRemainingMs] = React.useState<number>(
    coachGateSeconds * 1000
  );
  const [coachConfirmed, setCoachConfirmed] = React.useState<boolean>(false);
  const [lastRunForExplanation, setLastRunForExplanation] = React.useState<{
    editor: "guided" | "scratch";
    code: string;
    runtime: Record<string, string>;
    run: MiniRunResult;
  } | null>(null);
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
  const [, setStudentName] = React.useState<string>("");
  const [userId, setUserId] = React.useState<string>("");
  const [studentDbId, setStudentDbId] = React.useState<string>("");
  const [animateIn, setAnimateIn] = React.useState(false);
  const [, setSuccessBurst] = React.useState(false);
  const [, setCfuBurst] = React.useState(false);
  const [instructorOpen, setInstructorOpen] = React.useState(false);
  const [pipHidden, setPipHidden] = React.useState(false);
  const [pipMode, setPipMode] = React.useState<"min" | "expanded">("min");
  const [pipPos, setPipPos] = React.useState<{ x: number; y: number } | null>(null);
  const [pipDragging, setPipDragging] = React.useState(false);
  const pipDragOffset = React.useRef<{ dx: number; dy: number } | null>(null);
  const [zoomPreviewChatOpen, setZoomPreviewChatOpen] = React.useState(false);
  const [zoomPreviewParticipantsOpen, setZoomPreviewParticipantsOpen] = React.useState(false);
  const [zoomPreviewMuted, setZoomPreviewMuted] = React.useState(true);
  const [zoomPreviewCamOff, setZoomPreviewCamOff] = React.useState(false);
  const [isInstructorView, setIsInstructorView] = React.useState(false);
  const [tutorialDone, setTutorialDone] = React.useState<boolean>(false);

  const coachConfirmStorageKey = React.useMemo(() => {
    const id = userId || deviceId || "anon";
    return `kanam.coachRead:v1:${lesson.id}:${id}`;
  }, [lesson.id, userId, deviceId]);

  React.useEffect(() => {
    if (!tourRemember || !localStatePersistence) {
      setTutorialDone(false);
      return;
    }
    try {
      const done = window.localStorage.getItem(lessonTourStorageKey) === "1";
      setTutorialDone(done);
    } catch {
      setTutorialDone(false);
    }
  }, [tourRemember, localStatePersistence, lessonTourStorageKey]);

  React.useEffect(() => {
    if (!coachGateEnabled || !localStatePersistence) return;
    try {
      const ok = window.localStorage.getItem(coachConfirmStorageKey) === "1";
      if (ok) setCoachConfirmed(true);
    } catch {
      // ignore
    }
  }, [coachGateEnabled, localStatePersistence, coachConfirmStorageKey]);

  // Start the timer only after tutorial is complete and Coach's note is visible.
  React.useEffect(() => {
    if (!coachGateEnabled) return;
    if (coachConfirmed) return;
    if (!tutorialDone) return;
    if (coachGateSeconds <= 0) {
      setCoachGateRemainingMs(0);
      return;
    }
    const el = coachNoteRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting && (e.intersectionRatio ?? 0) >= 0.45) {
          setCoachGateStartedAt((prev) => prev ?? Date.now());
        }
      },
      { threshold: [0, 0.25, 0.45, 0.65, 1] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [coachGateEnabled, coachConfirmed, tutorialDone, coachGateSeconds]);

  React.useEffect(() => {
    if (!coachGateEnabled) return;
    if (coachConfirmed) return;
    if (coachGateSeconds <= 0) {
      setCoachGateRemainingMs(0);
      return;
    }
    if (!coachGateStartedAt) return;
    const tick = () => {
      const elapsed = Date.now() - coachGateStartedAt;
      const remaining = Math.max(0, coachGateSeconds * 1000 - elapsed);
      setCoachGateRemainingMs(remaining);
    };
    tick();
    const t = window.setInterval(tick, 200);
    return () => window.clearInterval(t);
  }, [coachGateEnabled, coachConfirmed, coachGateSeconds, coachGateStartedAt]);

  const designEnabled = Boolean(lesson.designMode);
  const [design, setDesign] = React.useState<DesignState>(defaultDesignState());
  const [designToast, setDesignToast] = React.useState<string | null>(null);
  const [designLoadedKey, setDesignLoadedKey] = React.useState<string>("");

  const npcEnabled = Boolean(lesson.npcChallengeMode);

  const showInstructorPip = lesson.instructorLive?.mode === "zoom_sdk_pip_preview" && !pipHidden;
  const pipCorner = lesson.instructorLive?.corner ?? "bottom-left";

  const pipMinSize = { w: 320, h: 240 }; // includes header + controls; video is aspect-video
  const pipExpandedSize = React.useMemo(() => {
    if (typeof window === "undefined") return { w: 720, h: 420 };
    const w = Math.max(520, Math.min(Math.floor(window.innerWidth * 0.5), 980));
    const h = Math.max(360, Math.min(Math.floor(window.innerHeight * 0.5), 640));
    return { w, h };
  }, []);

  const activePipSize = pipMode === "expanded" ? pipExpandedSize : pipMinSize;

  const clampPipPos = React.useCallback(
    (pos: { x: number; y: number }, size: { w: number; h: number }) => {
      if (typeof window === "undefined") return pos;
      const maxX = Math.max(8, window.innerWidth - size.w - 8);
      const maxY = Math.max(8, window.innerHeight - size.h - 8);
      return {
        x: Math.max(8, Math.min(maxX, pos.x)),
        y: Math.max(8, Math.min(maxY, pos.y)),
      };
    },
    []
  );

  // Initialize PiP position (bottom-left by default) and keep it clamped on resize.
  React.useEffect(() => {
    if (!showInstructorPip) return;
    if (typeof window === "undefined") return;
    if (pipPos) return;
    const pad = 12;
    const size = activePipSize;
    const initial =
      pipCorner === "bottom-right"
        ? { x: window.innerWidth - size.w - pad, y: window.innerHeight - size.h - pad }
        : pipCorner === "top-left"
          ? { x: pad, y: 80 }
          : pipCorner === "top-right"
            ? { x: window.innerWidth - size.w - pad, y: 80 }
            : { x: pad, y: window.innerHeight - size.h - pad };
    setPipPos(clampPipPos(initial, size));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showInstructorPip]);

  React.useEffect(() => {
    if (!showInstructorPip) return;
    const onResize = () => {
      setPipPos((p) => {
        if (!p) return p;
        return clampPipPos(p, activePipSize);
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [showInstructorPip, activePipSize, clampPipPos]);

  const beginPipDrag = (e: React.PointerEvent) => {
    if (!pipPos) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest("button,a,input,textarea")) return;
    setPipDragging(true);
    pipDragOffset.current = { dx: e.clientX - pipPos.x, dy: e.clientY - pipPos.y };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPipPointerMove = (e: React.PointerEvent) => {
    if (!pipDragging || !pipDragOffset.current) return;
    const next = { x: e.clientX - pipDragOffset.current.dx, y: e.clientY - pipDragOffset.current.dy };
    setPipPos(clampPipPos(next, activePipSize));
  };

  const endPipDrag = () => {
    setPipDragging(false);
    pipDragOffset.current = null;
  };

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
    try {
      const qs = new URLSearchParams(window.location.search);
      const fromQuery = qs.get("instructor") === "1";
      const fromStorage = window.localStorage.getItem("kanam.instructorView") === "1";
      setIsInstructorView(fromQuery || fromStorage);
    } catch {
      // ignore
    }
  }, []);

  React.useEffect(() => {
    if (isGuestMode()) return;
    (async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        if (!supabase) return;
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
        const fallback = (student as { display_name?: string } | null)?.display_name;
        if (fallback) setStudentName(fallback);
      } catch {
        // ignore
      }
    })();
  }, []);

  const designStorageKey = React.useMemo(() => {
    if (!designEnabled || !localStatePersistence) return "";
    const uid = userId || deviceId || "anon";
    const v = lesson.designModePromptVersion ?? "v1";
    return `kanam.designDraft:${v}:${lesson.id}:${uid}`;
  }, [designEnabled, localStatePersistence, lesson.designModePromptVersion, lesson.id, userId, deviceId]);

  const npcUserKey = React.useMemo(() => {
    return userId || deviceId || "anon";
  }, [userId, deviceId]);

  const runNpcChallengeCode = React.useCallback(
    (code: string, runtime: Record<string, string>) => {
      const run = runMiniPython(code, runtime);
      const body = run.error
        ? `❌ ${run.error}`
        : run.stdout.length
          ? run.stdout.join("\n")
          : "(no output)\nTip: add print(...) to see output.";
      return { ok: !run.error, output: asTerminal(terminalPrompt, body) };
    },
    [terminalPrompt]
  );

  React.useEffect(() => {
    if (!designEnabled) return;
    if (!designStorageKey) return;
    if (designLoadedKey === designStorageKey) return;
    setDesignLoadedKey(designStorageKey);
    try {
      const raw = window.localStorage.getItem(designStorageKey);
      if (!raw) {
        setDesign(defaultDesignState());
        return;
      }
      const parsed = JSON.parse(raw) as Partial<DesignState>;
      setDesign({
        ...defaultDesignState(),
        ...parsed,
        inputsNeeded: Array.isArray(parsed.inputsNeeded) ? parsed.inputsNeeded : [],
        memoryToStore: Array.isArray(parsed.memoryToStore) ? parsed.memoryToStore : [],
      });
    } catch {
      setDesign(defaultDesignState());
    }
  }, [designEnabled, designStorageKey, designLoadedKey]);

  React.useEffect(() => {
    if (!designEnabled) return;
    if (!designStorageKey) return;
    if (designLoadedKey !== designStorageKey) return;
    const t = window.setTimeout(() => {
      try {
        window.localStorage.setItem(designStorageKey, JSON.stringify(design));
      } catch {
        // ignore
      }
    }, 450);
    return () => window.clearTimeout(t);
  }, [designEnabled, designStorageKey, designLoadedKey, design]);

  const trackProgress = React.useCallback(
    async (eventType: string, payload?: unknown) => {
      if (isGuestMode()) {
        if (eventType === "lesson_success") markGuestLessonComplete(lesson.id);
        return;
      }
      if (!deviceId || !userId || !studentDbId) return;
      try {
        const supabase = createSupabaseBrowserClient();
        if (!supabase) return;
        const now = new Date().toISOString();

        // Always write event log
        await supabase.from("progress_events").insert({
          student_id: studentDbId,
          device_id: deviceId,
          lesson_id: lesson.id,
          event_type: eventType,
          payload: (payload ?? {}) as Record<string, unknown>,
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
          const p = (payload ?? {}) as { revealedCount?: number; total?: number };
          if (typeof p.revealedCount === "number") patch.cfu_revealed_count = p.revealedCount;
          if (typeof p.total === "number") patch.cfu_total = p.total;
        }
        await supabase.from("lesson_progress").upsert(patch, {
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

  // If learners change code after a successful run, require another successful run.
  React.useEffect(() => {
    setGuidedRunSuccessful(false);
  }, [guidedCode]);

  React.useEffect(() => {
    setScratchRunSuccessful(false);
  }, [scratchCode]);

  const activeCode = activeEditor === "guided" ? guidedCode : scratchCode;
  const readyToSubmitScratch = lesson.isSubmissionValid(scratchCode, runtime);
  const guidedTouched = guidedCode.trim() !== lesson.starterCode.trim();
  const scratchTouched = scratchCode.trim() !== "";
  const guidedEditorLocked = coachGateEnabled && !coachConfirmed;
  const scratchEditorLocked = !guidedRunSuccessful;
  const coachCheckpointReady = !coachConfirmed && coachGateRemainingMs <= 0;

  const scratchProgressPercent = React.useMemo(() => {
    return scratchRunSuccessful ? 100 : 0;
  }, [scratchRunSuccessful]);

  const coachProgressPercent = React.useMemo(() => {
    // If the coach gate is enabled, this third completes when learner confirms the note.
    // If it is disabled for a lesson, treat this third as already complete.
    if (!coachGateEnabled) return 100;
    return coachConfirmed ? 100 : 0;
  }, [coachGateEnabled, coachConfirmed]);

  const guidedProgressPercent = React.useMemo(() => {
    // Guided third only completes after a successful guided Run.
    return guidedRunSuccessful ? 100 : 0;
  }, [guidedRunSuccessful]);

  const progressPercent = React.useMemo(() => {
    // Overall progress is split equally across three core tasks:
    // 1) Coach note confirmation, 2) guided fill/run, 3) from-scratch work.
    if (submitted) return 100;
    const blended = (coachProgressPercent + guidedProgressPercent + scratchProgressPercent) / 3;
    return Math.round(Math.max(0, Math.min(100, blended)));
  }, [
    submitted,
    coachProgressPercent,
    guidedProgressPercent,
    scratchProgressPercent,
  ]);
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
    if (coachGateEnabled && !coachConfirmed) {
      return "Start at the top: read Coach’s note (then click Got it, let's go!).";
    }
    if (!guidedTouched && !scratchTouched && !hasRun && !guidedHasRun) {
      return "Start at the top: read Coach’s note + Quick explainer.";
    }
    if (!hasRun) {
      return "Press Run to test your code in the console.";
    }
    if (!scratchTouched) {
      return "Check the Console Output + explanation, then try it again from scratch (no hints).";
    }
    return "Submit from scratch to earn Success.";
  }, [
    coachGateEnabled,
    coachConfirmed,
    guidedTouched,
    scratchTouched,
    hasRun,
    guidedHasRun,
    submitted,
    lesson.nextHref,
  ]);

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
    const outputOk = lesson.isOutputCorrect
      ? lesson.isOutputCorrect(run.stdout, run.env, runtime)
      : true;
    if (activeEditor === "guided") {
      // Guided completion should reflect "filled blanks + successful run",
      // not full scratch-level submission constraints.
      const guidedOk =
        !run.error &&
        !guidedCode.includes("____") &&
        outputOk;
      setGuidedRunSuccessful(guidedOk);
    } else {
      const scratchOk =
        !run.error &&
        !scratchCode.includes("____") &&
        lesson.isSubmissionValid(scratchCode, runtime) &&
        outputOk;
      setScratchRunSuccessful(scratchOk);
    }
    setLastRunForExplanation({
      editor: activeEditor,
      code: activeCode,
      runtime: { ...(runtime ?? {}) },
      run,
    });
    const body = run.error
      ? `❌ ${run.error}`
      : run.stdout.length
        ? run.stdout.join("\n")
        : "(no output)\nTip: add print(...) to see output.";
    setOutput(asTerminal(terminalPrompt, body));
  };

  const onRunGuided = () => {
    setGuidedHasRun(true);
    trackProgress("guided_run");
    const run = runMiniPython(guidedCode, runtime);
    const guidedOutputOk = lesson.isOutputCorrect
      ? lesson.isOutputCorrect(run.stdout, run.env, runtime)
      : true;
    // Guided completion should reflect "filled blanks + successful run",
    // not full scratch-level submission constraints.
    const guidedOk =
      !run.error &&
      !guidedCode.includes("____") &&
      guidedOutputOk;
    setGuidedRunSuccessful(guidedOk);
    const body = run.error
      ? `❌ ${run.error}`
      : run.stdout.length
        ? run.stdout.join("\n")
        : "(no output)\nTip: add print(...) to see output.";
    setGuidedOutput(asTerminal(terminalPrompt, body));
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
    setGuidedHasRun(false);
    setGuidedRunSuccessful(false);
    setScratchRunSuccessful(false);
    setGuidedOutput(asTerminal(terminalPrompt, "Press Run (guided) to see output here."));
    setRuntime(runtimeDefaultValues);
    setRevealedCfu(Array.from({ length: lesson.cfu.length }, () => false));
  };

  const onGenerateFromDesign = () => {
    const code = generatePythonStarterCode(design);
    setScratchCode(code);
    setActiveEditor("scratch");
    setDesignToast("Starter code added!");
    window.setTimeout(() => setDesignToast(null), 2200);
  };

  const onResetScratchToTemplate = () => {
    const template = lesson.scratchTemplateCode ?? "";
    setScratchCode(template);
    setActiveEditor("scratch");
    setDesignToast("Template restored.");
    window.setTimeout(() => setDesignToast(null), 2200);
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
      if (lesson.completionRedirectHref) {
        // Let UI paint the success state, then redirect.
        window.setTimeout(() => router.push(lesson.completionRedirectHref!), 350);
      }
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

    // Completion is tracked in Supabase (`lesson_progress.success`) per authenticated user.
  };

  const LessonHeader = (
    <div className="w-full">
      {/* Top row: brand + chips + actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Image
            src="/images/Logo.png"
            alt="Kanam Academy logo"
            width={30}
            height={30}
            className="drop-shadow-sm"
          />
          <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-slate-600">
            Lesson Hub
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <Badge
            variant="secondary"
            className="border border-slate-200 bg-white px-3 py-1 shadow-sm"
          >
            <Zap className="mr-1 h-4 w-4 text-[var(--accent)]" />
            {lesson.xpReward} XP
          </Badge>
          <Badge
            variant={submitted ? "success" : "outline"}
            className={[
              "border border-slate-200 bg-white px-3 py-1 shadow-sm",
              submitted ? "animate-pulse" : "",
            ].join(" ")}
          >
            {lesson.badge}
          </Badge>

          <div className="mx-1 hidden h-6 w-px bg-slate-200/70 sm:block" />

          <Button asChild variant="outline" size="sm">
            <Link href={lesson.dashboardHref ?? "/dashboard"}>Dashboard</Link>
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
      </div>

      {/* Title row: full width */}
      <div className="mt-3">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
          {lesson.title}
        </h1>
        <p className="mt-2 max-w-4xl text-base leading-relaxed text-slate-600 md:text-lg">
          {lesson.goal}
        </p>
      </div>
    </div>
  );

  const LearnContent = (
    <div className="space-y-4">
      <Card
        id="hub-flow"
        data-hub="flow"
        className="scroll-mt-24 border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md"
      >
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3" data-tour="lesson-flow">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/15">
              <ListOrdered className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div className="min-w-0">
              <p className="text-base font-extrabold tracking-tight text-slate-900 md:text-lg">
                Learning path
              </p>
              <p className="mt-0.5 text-sm text-slate-600">
                Follow these steps and you’ll always know what to do next.
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
              done={
                coachGateEnabled
                  ? coachConfirmed || submitted
                  : guidedTouched || scratchTouched || hasRun || guidedHasRun || submitted
              }
              active={
                coachGateEnabled
                  ? !coachConfirmed && !submitted
                  : !guidedTouched && !scratchTouched && !hasRun && !guidedHasRun && !submitted
              }
              hint="This tells you the goal and the vibe."
            />
            <FlowRow
              num={2}
              label="Read the Quick explainer"
              done={guidedTouched || scratchTouched || hasRun || guidedHasRun || submitted}
              active={!guidedTouched && !scratchTouched && !hasRun && !guidedHasRun && !submitted}
              hint="Learn the idea before you code."
            />
            <FlowRow
              num={3}
              label="Fill in the blanks (guided)"
              done={guidedHasRun || hasRun || submitted}
              active={!guidedEditorLocked && !hasRun && (guidedTouched || activeEditor === "guided")}
              hint={
                guidedEditorLocked
                  ? "Locked until you read Coach’s note and click “Got it, let's go!”"
                  : "Practice with hints first."
              }
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
            {false ? (
              <>
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
              </>
            ) : null}
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
        ref={coachNoteRef as React.RefObject<HTMLDivElement>}
      >
        <CardHeader className="pb-4">
          <SectionHeader
            icon={<Sparkles className="h-5 w-5 text-[var(--accent)]" />}
            title="Coach’s note"
            subtitle="Read this first — it explains the goal + how to think about the code."
          />
        </CardHeader>
        <CardContent className="pt-0 text-base text-slate-700">
          {renderCoachNote(lesson.instructorScript)}

          {coachGateEnabled ? (
            <div className="mt-4 rounded-xl border border-[rgb(var(--accent-rgb)/0.55)] bg-gradient-to-r from-[rgb(var(--brand-rgb)/0.10)] via-white/70 to-[rgb(var(--accent-rgb)/0.14)] p-4">
              <p className="text-base font-extrabold tracking-tight text-slate-900">
                Coach’s note checkpoint
              </p>
              <p className="mt-1 text-base text-slate-700">
                Take a moment to read. When the timer finishes, click{" "}
                <span className="font-semibold">Got it, let&apos;s go!</span>.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="default"
                  className={cn(
                    "h-12 px-5 text-base font-black tracking-tight ring-2 transition-all",
                    coachConfirmed
                      ? "bg-emerald-600 text-white ring-emerald-500"
                      : coachCheckpointReady
                        ? "bg-emerald-600 text-white ring-emerald-500 shadow-lg shadow-emerald-500/40 hover:bg-emerald-700 animate-pulse"
                        : "bg-slate-200 text-slate-600 ring-slate-300"
                  )}
                  disabled={coachConfirmed || coachGateRemainingMs > 0}
                  onClick={() => {
                    setCoachConfirmed(true);
                    trackProgress("coach_note_confirmed", { seconds: coachGateSeconds });
                    if (localStatePersistence) {
                      try {
                        window.localStorage.setItem(coachConfirmStorageKey, "1");
                      } catch {
                        // ignore
                      }
                    }
                  }}
                >
                  {coachConfirmed
                    ? "Done"
                    : coachGateRemainingMs > 0
                      ? `Reading… ${Math.ceil(coachGateRemainingMs / 1000)}s`
                      : "Got it, let's go!"}
                </Button>
                <p className="text-sm text-slate-600">
                  This helps us make sure everyone starts on the same page.
                </p>
              </div>
            </div>
          ) : null}

          <p className="mt-3 leading-relaxed text-slate-600">
            Read the steps, fill the blanks, then press{" "}
            <span className="font-semibold text-slate-900">Run</span>.
          </p>
        </CardContent>
      </Card>

      {npcEnabled ? (
        <NpcChallengeMode
          hubId="hub-npc"
          hubDataId="npc"
          lessonId={lesson.id}
          userKey={npcUserKey}
          promptVersion={lesson.npcChallengePromptVersion ?? "v1"}
          isInstructorView={isInstructorView}
          onTrackEvent={(eventType, payload) => trackProgress(eventType, payload)}
          onRunCode={runNpcChallengeCode}
        />
      ) : null}

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
      {false ? (
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
      ) : null}

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
        <div className="space-y-3">
          <div className="rounded-md border border-slate-200 bg-white p-3">
            <div className="rounded-xl border border-[rgb(var(--accent-rgb)/0.55)] bg-gradient-to-r from-[rgb(var(--brand-rgb)/0.14)] via-white/70 to-[rgb(var(--accent-rgb)/0.18)] p-4">
              <p className="text-sm font-extrabold tracking-tight text-slate-900">
                Your mission (guided)
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                Fill in the blanks, then press <span className="font-semibold">Run</span> to see the output.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {[
                  `Replace the ____ blanks (there are ${(lesson.starterCode.match(/____/g) ?? []).length || 0}).`,
                  "Press Run and read the console.",
                  "If something breaks, fix one blank at a time.",
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">
                Fill in the blanks (guided)
              </p>
              {guidedEditorLocked ? (
                <Badge variant="outline" className="border-slate-300 text-slate-500">
                  Locked
                </Badge>
              ) : activeEditor === "guided" ? (
                <Badge variant="secondary">Using this</Badge>
              ) : (
                <Badge variant="outline">Click to use</Badge>
              )}
            </div>
            {guidedEditorLocked ? (
              <p className="mt-1 text-xs font-semibold text-slate-600">
                Read Coach’s note and click{" "}
                <span className="font-extrabold">Got it, let&apos;s go!</span> to unlock this section.
              </p>
            ) : (
              <p className="mt-1 text-xs text-slate-500">
                Edit this version first. Then try writing it again below without help.
              </p>
            )}
            <div className="relative mt-2">
              <CodeTextarea
                value={guidedCode}
                onChange={setGuidedCode}
                onFocus={() => {
                  if (!guidedEditorLocked) setActiveEditor("guided");
                }}
                disabled={guidedEditorLocked}
                ariaLabel="Guided Python code editor"
                data-tour="guided-editor"
                showLineNumbers
                minHeightPx={220}
                maxHeightPx={560}
                className={[
                  "min-h-[220px] w-full border-2 shadow-sm",
                  "focus-within:ring-4",
                  guidedEditorLocked ? "border-slate-200 bg-slate-100/80 opacity-70" : "bg-white",
                  activeEditor === "guided"
                    ? submitted
                      ? "border-[var(--brand)] focus-within:ring-[var(--brand)]/25"
                      : "border-[var(--accent)] focus-within:ring-[var(--accent)]/25"
                    : "border-slate-200 focus-within:ring-slate-200/25",
                ].join(" ")}
              />
              {guidedEditorLocked ? (
                <div className="pointer-events-none absolute inset-0 grid place-items-center rounded-md bg-white/75">
                  <div className="rounded-xl border border-emerald-200 bg-white px-4 py-3 text-center shadow-sm">
                    <p className="text-sm font-extrabold text-slate-900">
                      Have you read the Coach’s note?
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-700">
                      Click <span className="text-emerald-700">“Got it, let’s go!”</span> to unlock
                      this section.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={onRunGuided}
                className="h-11 px-4 text-sm font-extrabold tracking-tight"
                disabled={guidedEditorLocked}
              >
                Run (guided)
              </Button>
              <p className="text-xs text-slate-600">
                {guidedEditorLocked
                  ? "Read Coach’s note and click “Got it, let's go!” to unlock guided practice."
                  : "This runs the guided box only."}
              </p>
            </div>

            {guidedHasRun ? (
              <pre className="mt-3 max-h-[220px] overflow-auto rounded-xl border border-slate-200 bg-slate-950 p-3 text-xs text-slate-50 kanam-hide-scrollbar">
{guidedOutput}
              </pre>
            ) : null}
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-3">
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

            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">
                Try it from scratch (no hints)
              </p>
              {scratchEditorLocked ? (
                <Badge variant="outline" className="border-slate-300 text-slate-500">
                  Locked
                </Badge>
              ) : activeEditor === "scratch" ? (
                <Badge variant="secondary">Using this</Badge>
              ) : (
                <Badge variant="outline">Click to use</Badge>
              )}
            </div>
            {scratchEditorLocked ? (
              <p className="mt-1 text-xs font-semibold text-slate-600">
                Run the guided box successfully first to unlock this section.
              </p>
            ) : (
              <p className="mt-1 text-xs text-slate-500">
                Start with a blank page. If you get stuck, click back into the guided
                version.
              </p>
            )}
            <p className="mt-2 text-xs text-slate-600">
              <span className="font-semibold">Submit checks this box.</span> (Guided is for practice.)
            </p>

            {designEnabled ? (
              <div className="mt-3 space-y-3">
                {isInstructorView ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs font-extrabold tracking-tight text-slate-900">
                      Design Summary (Instructor view)
                    </p>
                    <div className="mt-2 space-y-1 text-xs text-slate-700">
                      <p>
                        <span className="font-semibold">Purpose:</span>{" "}
                        {design.purpose?.trim() ? design.purpose.trim() : "—"}
                      </p>
                      <p>
                        <span className="font-semibold">Target user:</span> {design.targetUser}
                      </p>
                      <p className="mt-2 font-semibold">Rules (top 3):</p>
                      <ul className="list-disc space-y-1 pl-5">
                        {(design.rulesPlainEnglish ?? "")
                          .split(/\r?\n/g)
                          .map((x) => x.trim())
                          .filter(Boolean)
                          .slice(0, 3)
                          .map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        {!design.rulesPlainEnglish?.trim() ? <li className="text-slate-500">—</li> : null}
                      </ul>
                    </div>
                    <p className="mt-2 text-[11px] text-slate-500">
                      Tip: Add <span className="font-semibold">?instructor=1</span> to the URL to show this block.
                    </p>
                  </div>
                ) : null}

                <DesignModePanel
                  design={design}
                  onChange={(patch) => setDesign((d) => ({ ...d, ...patch }))}
                  onGenerateStarterCode={onGenerateFromDesign}
                  onResetToTemplate={onResetScratchToTemplate}
                  generatedToast={designToast}
                />
              </div>
            ) : null}

            <div className="relative mt-2">
              <CodeTextarea
                value={scratchCode}
                onChange={setScratchCode}
                onFocus={() => {
                  if (!scratchEditorLocked) setActiveEditor("scratch");
                }}
                disabled={scratchEditorLocked}
                ariaLabel="From-scratch Python code editor"
                data-tour="scratch-editor"
                placeholder={lesson.editorPlaceholder ?? '# Start here:\n# print("Hello!")\n'}
                minHeightPx={220}
                maxHeightPx={560}
                className={[
                  "min-h-[220px] w-full border-2 bg-white shadow-sm",
                  "focus-within:ring-4",
                  scratchEditorLocked ? "border-slate-200 bg-slate-100/80 opacity-70" : "",
                  activeEditor === "scratch"
                    ? submitted
                      ? "border-[var(--brand)] focus-within:ring-[var(--brand)]/25"
                      : "border-[var(--accent)] focus-within:ring-[var(--accent)]/25"
                    : "border-slate-200 focus-within:ring-slate-200/25",
                ].join(" ")}
              />
              {scratchEditorLocked ? (
                <div className="pointer-events-none absolute inset-0 grid place-items-center rounded-md bg-white/75">
                  <div className="rounded-xl border border-emerald-200 bg-white px-4 py-3 text-center shadow-sm">
                    <p className="text-sm font-extrabold text-slate-900">
                      Have you passed the guided run?
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-700">
                      Run your fill-in-the-blanks code successfully to unlock scratch mode.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {/* Removed: "What would you type?" panel. Inputs are currently auto-filled using lesson defaults. */}
        <div className="mt-auto rounded-md border border-slate-200 bg-white p-3">
          <div className="flex flex-wrap items-center gap-2">
            {lesson.instructorLive ? (
              <Dialog open={instructorOpen} onOpenChange={setInstructorOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Video className="h-4 w-4" />
                    {lesson.instructorLive.label ?? "Instructor"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{lesson.instructorLive.label ?? "Instructor"}</DialogTitle>
                    <DialogDescription>
                      Join the live instructor while you code in the Lesson Canvas.
                    </DialogDescription>
                  </DialogHeader>

                  <p className="text-sm text-slate-600">
                    {lesson.instructorLive.note ??
                      "If the video doesn’t appear embedded, click Join Zoom (Zoom often blocks embedding)."}
                  </p>

                  {lesson.instructorLive.mode === "zoom_sdk_preview" ? (
                    <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
                      <div className="relative aspect-video w-full">
                        {/* Fake video canvas */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
                        <div className="absolute left-3 top-3 flex items-center gap-2">
                          <span className="rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white">
                            LIVE
                          </span>
                          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/90">
                            Zoom SDK preview
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 rounded-xl bg-white/10 px-3 py-2 text-sm text-white/90 backdrop-blur">
                          <div className="font-semibold">Instructor</div>
                          <div className="text-xs text-white/70">
                            {zoomPreviewMuted ? "Muted" : "Unmuted"} ·{" "}
                            {zoomPreviewCamOff ? "Camera off" : "Camera on"}
                          </div>
                        </div>

                        {/* Right-side panels (preview) */}
                        {zoomPreviewParticipantsOpen ? (
                          <div className="absolute right-3 top-3 h-[calc(100%-5.25rem)] w-[260px] overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur">
                            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                              <p className="text-xs font-semibold text-white/90">Participants</p>
                              <button
                                type="button"
                                className="text-xs text-white/70 hover:text-white"
                                onClick={() => setZoomPreviewParticipantsOpen(false)}
                              >
                                Close
                              </button>
                            </div>
                            <div className="space-y-2 p-3 text-xs text-white/85">
                              <div className="flex items-center justify-between">
                                <span>Instructor (Host)</span>
                                <span className="text-white/60">🎤</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>You</span>
                                <span className="text-white/60">🎧</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Kanam TA</span>
                                <span className="text-white/60">🎧</span>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {zoomPreviewChatOpen ? (
                          <div className="absolute right-3 top-3 h-[calc(100%-5.25rem)] w-[320px] overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur">
                            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                              <p className="text-xs font-semibold text-white/90">Chat</p>
                              <button
                                type="button"
                                className="text-xs text-white/70 hover:text-white"
                                onClick={() => setZoomPreviewChatOpen(false)}
                              >
                                Close
                              </button>
                            </div>
                            <div className="flex h-full flex-col">
                              <div className="flex-1 space-y-2 overflow-auto p-3 text-xs text-white/85">
                                <div className="rounded-lg bg-white/5 p-2">
                                  <span className="font-semibold">Instructor:</span>{" "}
                                  Today we’re learning parameters — same skill, new details.
                                </div>
                                <div className="rounded-lg bg-white/5 p-2">
                                  <span className="font-semibold">You:</span> Got it!
                                </div>
                              </div>
                              <div className="border-t border-white/10 p-2">
                                <div className="rounded-lg bg-white/5 px-2 py-2 text-white/60">
                                  Type message… (preview)
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {/* Bottom controls */}
                        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-white/10 bg-black/40 p-2 backdrop-blur">
                          <button
                            type="button"
                            onClick={() => setZoomPreviewMuted((v) => !v)}
                            className={[
                              "rounded-xl px-3 py-2 text-xs font-semibold",
                              zoomPreviewMuted
                                ? "bg-white/10 text-white hover:bg-white/15"
                                : "bg-emerald-500/90 text-slate-950 hover:bg-emerald-500",
                            ].join(" ")}
                          >
                            {zoomPreviewMuted ? "Unmute" : "Mute"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setZoomPreviewCamOff((v) => !v)}
                            className={[
                              "rounded-xl px-3 py-2 text-xs font-semibold",
                              zoomPreviewCamOff
                                ? "bg-white/10 text-white hover:bg-white/15"
                                : "bg-emerald-500/90 text-slate-950 hover:bg-emerald-500",
                            ].join(" ")}
                          >
                            {zoomPreviewCamOff ? "Start video" : "Stop video"}
                          </button>
                          <button
                            type="button"
                            className="rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/15"
                            onClick={() => {
                              setZoomPreviewParticipantsOpen((v) => !v);
                              setZoomPreviewChatOpen(false);
                            }}
                          >
                            Participants
                          </button>
                          <button
                            type="button"
                            className="rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/15"
                            onClick={() => {
                              setZoomPreviewChatOpen((v) => !v);
                              setZoomPreviewParticipantsOpen(false);
                            }}
                          >
                            Chat
                          </button>
                          <button
                            type="button"
                            className="rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-500"
                            onClick={() => setInstructorOpen(false)}
                          >
                            Leave
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : lesson.instructorLive.embedUrl ? (
                    <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      <div className="aspect-video w-full">
                        <iframe
                          title="Instructor live"
                          src={lesson.instructorLive.embedUrl}
                          className="h-full w-full"
                          allow="camera; microphone; fullscreen; display-capture"
                        />
                      </div>
                    </div>
                  ) : null}

                  <DialogFooter>
                    {lesson.instructorLive.joinUrl ? (
                      <Button asChild>
                        <a href={lesson.instructorLive.joinUrl} target="_blank" rel="noreferrer">
                          Join Zoom
                        </a>
                      </Button>
                    ) : (
                      <Button disabled title="Set NEXT_PUBLIC_ZOOM_JOIN_URL to enable">
                        Join Zoom (not configured)
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : null}
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

          {submitted && lesson.completionCta ? (
            <div className="mt-4 rounded-2xl border border-[rgb(var(--accent-rgb)/0.55)] bg-gradient-to-r from-[rgb(var(--brand-rgb)/0.12)] via-white/80 to-[rgb(var(--accent-rgb)/0.16)] p-4">
              <p className="text-sm font-extrabold tracking-tight text-slate-900">
                {lesson.completionCta.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                {lesson.completionCta.body}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button asChild className="h-11 px-4 text-sm font-extrabold tracking-tight">
                  <Link href={lesson.completionCta.primary.href}>
                    {lesson.completionCta.primary.label}
                  </Link>
                </Button>
                {lesson.completionCta.secondary ? (
                  <Button asChild variant="outline" className="h-11 px-4 text-sm font-semibold">
                    <Link href={lesson.completionCta.secondary.href}>
                      {lesson.completionCta.secondary.label}
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>
          ) : null}
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

  const scratchRunAnalysis = React.useMemo(() => {
    if (!lastRunForExplanation) return null;
    if (lastRunForExplanation.editor !== "scratch") return null;
    if (!lastRunForExplanation.code.trim()) return null;
    const run = lastRunForExplanation.run;
    const vars = Object.entries(run.env)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => ({ key, value }));
    return {
      code: lastRunForExplanation.code,
      vars,
      printed: run.error ? [`❌ ${run.error}`] : run.stdout,
      summary: run.error
        ? "Your scratch code hit an error. Fix it and press Run again."
        : "This explains the output from your last Scratch Run (best-effort Python runner).",
      tips: run.error
        ? ["Check colons (:), indentation, and spelling of variable names."]
        : [],
    };
  }, [lastRunForExplanation]);

  const OutputExplanation = (
    <Card className="border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md">
      <CardHeader className="pb-4">
        <SectionHeader
          icon={<Terminal className="h-5 w-5 text-[var(--accent)]" />}
          title="Console output explanation"
          subtitle="This only explains output after you press Run from the Scratch editor."
        />
      </CardHeader>
      <CardContent className="space-y-3">
        {!scratchRunAnalysis ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white/90 p-3 text-sm text-slate-600">
            Press <span className="font-semibold">Run</span> while you’re in{" "}
            <span className="font-semibold">Try it from scratch</span>. Then this box will explain what printed
            and what your variables were.
          </div>
        ) : (
          <>
            <div className="rounded-xl border border-[rgb(var(--accent-rgb)/0.55)] bg-white/90 p-3">
              <p className="text-sm font-semibold text-slate-900">What your code did:</p>
              <p className="mt-1 text-sm text-slate-700">{scratchRunAnalysis.summary}</p>
              {scratchRunAnalysis.tips?.length ? (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-600">
                  {scratchRunAnalysis.tips.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              <div className="rounded-xl border border-[rgb(var(--accent-rgb)/0.55)] bg-white/90 p-3">
                <p className="text-sm font-extrabold tracking-tight text-slate-900">
                  Your code (from Scratch Run)
                </p>
                <div className="mt-2 max-h-56 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50/80 p-2 font-mono text-xs text-slate-900">
                  <pre className="whitespace-pre-wrap">{scratchRunAnalysis.code.trim()}</pre>
                </div>
              </div>

              <div className="rounded-xl border border-[rgb(var(--accent-rgb)/0.55)] bg-white/90 p-3">
                <p className="text-sm font-extrabold tracking-tight text-slate-900">
                  Memory boxes (variables)
                </p>
                <div className="mt-2 space-y-1 text-sm text-slate-800">
                  {scratchRunAnalysis.vars?.length ? (
                    scratchRunAnalysis.vars.map(({ key, value }) => (
                      <div key={key} className="flex items-start justify-between gap-3">
                        <span className="font-semibold">{key}</span>
                        <span className="font-mono text-xs text-slate-700">
                          {Array.isArray(value)
                            ? JSON.stringify(value)
                            : typeof value === "string"
                              ? `"${value}"`
                              : String(value)}
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
                  {(scratchRunAnalysis.printed?.length
                    ? scratchRunAnalysis.printed.join("\n")
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
      { id: "flow", label: "Learning path" },
      { id: "coach", label: "Coach’s note" },
      ...(npcEnabled ? [{ id: "npc", label: "NPC Challenge Mode" }] : []),
      { id: "explainer", label: "Quick explainer" },
      ...(hasWordHelp ? [{ id: "words", label: "Word help" }] : []),
      { id: "safety", label: "AI safety" },
      { id: "steps", label: "Steps" },
      ...(lesson.tryThis.length ? [{ id: "try", label: "Try This" }] : []),
    ];
    return items;
  }, [lesson, npcEnabled]);

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

          {false ? (
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
        storageKey={lessonTourStorageKey}
        remember={tourRemember && localStatePersistence}
        fadeMs={lesson.tourFadeMs ?? 220}
        moveMs={Math.min(lesson.tourMoveMs ?? 120, 140)}
        recomputeDelayMs={Math.min(lesson.tourRecomputeDelayMs ?? 120, 160)}
        onDone={() => setTutorialDone(true)}
        steps={[
          {
            id: "order",
            selector: '[data-tour="lesson-flow"]',
            title: "Welcome — I’m here with you",
            body: "Your instructor will be with you the whole time. Use this Learning Path like a checklist. Do it in order, and you’ll always know what to do next.",
            emoji: "👀",
            padding: 8,
          },
          {
            id: "coach",
            selector: '[data-tour="coach-note"]',
            title: "Step 1: Coach’s note (read first)",
            body: "This is where your instructor explains the goal and the biggest mistake to avoid. Take your time — then click the checkpoint when it unlocks.",
            emoji: "✨",
            padding: 12,
          },
          {
            id: "explain",
            selector: '[data-tour="quick-explainer"]',
            title: "Step 2: Quick explainer",
            body: "Quick, clear explanation — so the code feels easier when you start typing.",
            emoji: "📚",
            padding: 10,
          },
          {
            id: "guided",
            selector: '[data-tour="guided-editor"]',
            title: "Step 3: Fill in the blanks",
            body: "Start here with hints. Fix the ____ blanks one by one. You can run the guided box to check your work.",
            emoji: "🧩",
            padding: 12,
          },
          {
            id: "run",
            selector: '[data-tour="run-button"]',
            title: "Step 4: Press Run",
            body: "Run means test. The console shows what your code printed — that’s how you know what actually happened.",
            emoji: "▶️",
            padding: 10,
          },
          {
            id: "scratch",
            selector: '[data-tour="scratch-editor"]',
            title: "Step 5: Try it from scratch",
            body: "Now rebuild it without hints. This is the one that counts for Submit.",
            emoji: "🧠",
            padding: 12,
          },
          {
            id: "submit",
            selector: '[data-tour="submit-button"]',
            title: "Step 6: Submit",
            body: "When your scratch code works, hit Submit. If it doesn’t work yet, that’s normal — adjust your code and test again.",
            emoji: "🏁",
            padding: 10,
          },
        ]}
      />

      {/* Instructor video (PiP preview): shown under the header corner (Lesson-config controlled) */}
      {showInstructorPip ? (
        <div
          className={[
            "fixed z-40 hidden md:block",
          ].join(" ")}
          style={{
            left: pipPos?.x ?? 12,
            top: pipPos?.y ?? 12,
            width: activePipSize.w,
          }}
          onPointerMove={onPipPointerMove}
          onPointerUp={endPipDrag}
          onPointerCancel={endPipDrag}
        >
          <div
            className={[
              "overflow-hidden rounded-2xl border border-white/20 bg-slate-950 shadow-2xl",
              pipDragging ? "ring-2 ring-white/20" : "",
            ].join(" ")}
          >
            <div
              className="flex cursor-move items-center justify-between gap-2 border-b border-white/10 bg-black/40 px-3 py-2"
              onPointerDown={beginPipDrag}
            >
              <p className="text-xs font-semibold text-white/90">
                {lesson.instructorLive?.label ?? "Instructor"}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-md bg-white/10 px-2 py-1 text-[11px] font-semibold text-white/90 hover:bg-white/15"
                  onClick={() => setPipMode((m) => (m === "min" ? "expanded" : "min"))}
                >
                  {pipMode === "min" ? "Expand" : "Shrink"}
                </button>
                <button
                  type="button"
                  className="rounded-md bg-white/10 px-2 py-1 text-[11px] font-semibold text-white/90 hover:bg-white/15"
                  onClick={() => setPipHidden(true)}
                >
                  Close
                </button>
              </div>
            </div>

            <div className="relative w-full" style={{ height: pipMode === "expanded" ? activePipSize.h - 84 : 180 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
              <div className="absolute left-2 top-2 flex items-center gap-2">
                <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                  LIVE
                </span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/80">
                  Zoom SDK preview
                </span>
              </div>
              <div className="absolute bottom-2 left-2 rounded-lg bg-white/10 px-2 py-1 text-[11px] text-white/90 backdrop-blur">
                Instructor · {zoomPreviewMuted ? "Muted" : "Unmuted"} ·{" "}
                {zoomPreviewCamOff ? "Cam off" : "Cam on"}
              </div>

              {pipMode === "expanded" ? (
                <div className="absolute right-2 top-2 flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-md bg-white/10 px-2 py-1 text-[11px] font-semibold text-white/90 hover:bg-white/15"
                    onClick={() => {
                      setZoomPreviewParticipantsOpen((v) => !v);
                      setZoomPreviewChatOpen(false);
                    }}
                  >
                    Participants
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-white/10 px-2 py-1 text-[11px] font-semibold text-white/90 hover:bg-white/15"
                    onClick={() => {
                      setZoomPreviewChatOpen((v) => !v);
                      setZoomPreviewParticipantsOpen(false);
                    }}
                  >
                    Chat
                  </button>
                  {lesson.instructorLive?.joinUrl ? (
                    <a
                      className="rounded-md bg-emerald-500/90 px-2 py-1 text-[11px] font-semibold text-slate-950 hover:bg-emerald-500"
                      href={lesson.instructorLive.joinUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Join
                    </a>
                  ) : null}
                </div>
              ) : null}

              {pipMode === "expanded" && zoomPreviewParticipantsOpen ? (
                <div className="absolute right-2 top-10 h-[calc(100%-3rem)] w-[260px] overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur">
                  <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                    <p className="text-xs font-semibold text-white/90">Participants</p>
                    <button
                      type="button"
                      className="text-xs text-white/70 hover:text-white"
                      onClick={() => setZoomPreviewParticipantsOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                  <div className="space-y-2 p-3 text-xs text-white/85">
                    <div className="flex items-center justify-between">
                      <span>Instructor (Host)</span>
                      <span className="text-white/60">🎤</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>You</span>
                      <span className="text-white/60">🎧</span>
                    </div>
                  </div>
                </div>
              ) : null}

              {pipMode === "expanded" && zoomPreviewChatOpen ? (
                <div className="absolute right-2 top-10 h-[calc(100%-3rem)] w-[320px] overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur">
                  <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                    <p className="text-xs font-semibold text-white/90">Chat</p>
                    <button
                      type="button"
                      className="text-xs text-white/70 hover:text-white"
                      onClick={() => setZoomPreviewChatOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                  <div className="flex h-full flex-col">
                    <div className="flex-1 space-y-2 overflow-auto p-3 text-xs text-white/85">
                      <div className="rounded-lg bg-white/5 p-2">
                        <span className="font-semibold">Instructor:</span>{" "}
                        Same skill. Different info. Different output.
                      </div>
                    </div>
                    <div className="border-t border-white/10 p-2">
                      <div className="rounded-lg bg-white/5 px-2 py-2 text-white/60">
                        Type message… (preview)
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-black/30 px-3 py-2">
              <button
                type="button"
                onClick={() => setZoomPreviewMuted((v) => !v)}
                className={[
                  "rounded-lg px-2 py-1 text-[11px] font-semibold",
                  zoomPreviewMuted
                    ? "bg-white/10 text-white hover:bg-white/15"
                    : "bg-emerald-500/90 text-slate-950 hover:bg-emerald-500",
                ].join(" ")}
              >
                {zoomPreviewMuted ? "Unmute" : "Mute"}
              </button>
              <button
                type="button"
                onClick={() => setZoomPreviewCamOff((v) => !v)}
                className={[
                  "rounded-lg px-2 py-1 text-[11px] font-semibold",
                  zoomPreviewCamOff
                    ? "bg-white/10 text-white hover:bg-white/15"
                    : "bg-emerald-500/90 text-slate-950 hover:bg-emerald-500",
                ].join(" ")}
              >
                {zoomPreviewCamOff ? "Start video" : "Stop video"}
              </button>
              <button
                type="button"
                className="rounded-lg bg-red-600 px-2 py-1 text-[11px] font-semibold text-white hover:bg-red-500"
                onClick={() => setPipHidden(true)}
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div
        className={[
          "flex min-h-[calc(100dvh-var(--kanam-header-height,4.75rem))] w-full items-start justify-start px-3 py-3 sm:px-4 sm:py-4 md:px-10",
          "transition-all duration-300 ease-out",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        ].join(" ")}
      >
        <div className="w-full space-y-4 [&_.text-xs]:text-sm [&_.text-sm]:text-[15px]">
          {/* Phone + tablet portrait: Tabs */}
          <div className="lg:hidden">
            <Tabs defaultValue="learn">
              <TabsList className="h-auto w-full gap-1 bg-white p-1.5 shadow-sm">
                <TabsTrigger value="learn" className="min-h-11 flex-1 text-xs sm:text-sm">
                  Lesson Hub
                </TabsTrigger>
                <TabsTrigger value="code" className="min-h-11 flex-1 text-xs sm:text-sm">
                  Code
                </TabsTrigger>
                <TabsTrigger value="review" className="min-h-11 flex-1 text-xs sm:text-sm">
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

          {/* Desktop / large tablet landscape: 40% lesson / 60% interactivity */}
          <div className="hidden lg:block">
            <div className="grid gap-4 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] lg:items-start">
              {/* Separate, styled Hub rail */}
              <div className="sticky top-[calc(var(--kanam-header-height,4.75rem)+0.75rem)] self-start">
                <div className="max-h-[calc(100dvh-var(--kanam-header-height,4.75rem)-2rem)] overflow-y-auto pr-1">
                  {HubNav}
                </div>
              </div>

              {/* Main lesson surface */}
            <div className="overflow-hidden rounded-2xl border border-[rgb(var(--accent-rgb)/0.65)] bg-white shadow-xl">
                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                  {/* Hub content */}
                  <div className="bg-white/92">
                    <div
                      ref={hubScrollRef}
                      className="max-h-[calc(100dvh-var(--kanam-header-height,4.75rem)-2rem)] overflow-y-auto p-4 xl:p-6"
                    >
                      <div className="space-y-4">
                        {LessonHeader}
                        {LearnContent}
                        {ReviewContent}
                      </div>
                    </div>
                  </div>

                  {/* Coding lab */}
                  <div className="border-t border-slate-200 bg-white/92 xl:border-l xl:border-t-0">
                    <div className="max-h-[calc(100dvh-var(--kanam-header-height,4.75rem)-2rem)] overflow-y-auto p-4 xl:p-6">
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

