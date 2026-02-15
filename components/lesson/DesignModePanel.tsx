import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import type { DesignState, DesignTargetUser } from "@/lib/designMode";

function countPeriods(s: string) {
  return (s.match(/\./g) ?? []).length;
}

function isPurposeValid(purpose: string) {
  const p = (purpose ?? "").trim();
  if (!p) return false;
  if (p.length > 120) return false;
  // Basic “one sentence” check (keep it friendly, not strict grammar).
  if (countPeriods(p) > 1) return false;
  return true;
}

function rulesCount(rulesPlainEnglish: string) {
  return (rulesPlainEnglish ?? "")
    .split(/\r?\n/g)
    .map((x) => x.trim())
    .filter(Boolean).length;
}

function scoreCompletion(design: DesignState) {
  const purposeOk = isPurposeValid(design.purpose);
  const ruleLines = rulesCount(design.rulesPlainEnglish);
  const rulesOk = ruleLines >= 1;
  const hasInputs = (design.inputsNeeded ?? []).filter(Boolean).length > 0;
  const hasMemory = (design.memoryToStore ?? []).filter(Boolean).length > 0;

  // Weighted for motivation: Purpose + Rules matter most.
  const pct = Math.round(
    (purposeOk ? 40 : 0) +
      (rulesOk ? 40 : 0) +
      (design.targetUser ? 10 : 0) +
      ((hasInputs || hasMemory) ? 10 : 0)
  );
  return Math.max(0, Math.min(100, pct));
}

function ChipInput({
  label,
  value,
  onChange,
  placeholder,
  helper,
}: {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  helper?: string;
}) {
  const [draft, setDraft] = React.useState("");

  const add = (raw: string) => {
    const item = (raw ?? "").trim();
    if (!item) return;
    const next = Array.from(new Set([...(value ?? []), item])).slice(0, 8);
    onChange(next);
    setDraft("");
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="text-xs text-slate-500">{(value ?? []).length}/8</p>
      </div>
      {helper ? <p className="text-xs text-slate-600">{helper}</p> : null}

      <div className="flex flex-wrap gap-2">
        {(value ?? []).map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-800"
          >
            {chip}
            <button
              type="button"
              className="rounded-full px-1 text-slate-500 hover:text-slate-900"
              aria-label={`Remove ${chip}`}
              onClick={() => onChange((value ?? []).filter((x) => x !== chip))}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add(draft);
            }
          }}
        />
        <Button type="button" variant="secondary" onClick={() => add(draft)} disabled={!draft.trim()}>
          Add
        </Button>
      </div>
      <p className="text-[11px] text-slate-500">Tip: press Enter to add a chip.</p>
    </div>
  );
}

export function DesignModePanel({
  design,
  onChange,
  onGenerateStarterCode,
  onResetToTemplate,
  generatedToast,
}: {
  design: DesignState;
  onChange: (patch: Partial<DesignState>) => void;
  onGenerateStarterCode: () => void;
  onResetToTemplate: () => void;
  generatedToast?: string | null;
}) {
  const completion = scoreCompletion(design);
  const purposeOk = isPurposeValid(design.purpose);
  const hasRule = rulesCount(design.rulesPlainEnglish) >= 1;
  const canGenerate = purposeOk && hasRule;

  return (
    <Card className="w-full border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <CardTitle className="text-base">Design Mode (Week 7)</CardTitle>
            <p className="mt-1 text-sm text-slate-600">
              Plan your helper first. Then we’ll generate starter code you can edit.
            </p>
          </div>
          <div className="w-full max-w-sm">
            <div className="mb-1 flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold">Completion</span>
              <span className="font-semibold">{completion}%</span>
            </div>
            <Progress value={completion} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900">
              Purpose <span className="text-red-600">*</span>
            </p>
            <p className="text-xs text-slate-600">
              One sentence. Example: “Help me choose what to do in a game.”
            </p>
            <Input
              value={design.purpose}
              onChange={(e) => onChange({ purpose: e.target.value.slice(0, 120) })}
              placeholder="What is your helper for?"
              className={purposeOk || !design.purpose ? "" : "border-red-300 focus-visible:ring-red-500/25"}
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>{purposeOk ? "Looks good." : "Keep it to one sentence (max 120 chars)."}</span>
              <span>{(design.purpose ?? "").length}/120</span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900">Target user</p>
            <p className="text-xs text-slate-600">Who are you building this for?</p>
            <select
              value={design.targetUser}
              onChange={(e) => onChange({ targetUser: e.target.value as DesignTargetUser })}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)]/25"
            >
              <option value="Student">Student</option>
              <option value="Gamer">Gamer</option>
              <option value="Beginner Coder">Beginner Coder</option>
              <option value="Other">Other</option>
            </select>
            <p className="text-[11px] text-slate-500">
              Tip: picking a target user helps you write better rules.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ChipInput
            label="Inputs needed"
            value={design.inputsNeeded}
            onChange={(next) => onChange({ inputsNeeded: next })}
            placeholder='Examples: "question", "mood", "topic"'
            helper="What info will your helper ask for? (Optional)"
          />
          <ChipInput
            label="Memory to store"
            value={design.memoryToStore}
            onChange={(next) => onChange({ memoryToStore: next })}
            placeholder='Examples: "name", "favorite_color"'
            helper="Only store what you really need. (Optional)"
          />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-900">
            Rules (plain English) <span className="text-red-600">*</span>
          </p>
          <p className="text-xs text-slate-600">
            Write at least 1 rule. Try: “If…, then…”. Example:
            <span className="ml-1 font-semibold text-slate-700">If the message is too short, ask for more.</span>
          </p>
          <Textarea
            value={design.rulesPlainEnglish}
            onChange={(e) => onChange({ rulesPlainEnglish: e.target.value })}
            placeholder={'If the message is too short, ask for more.\nIf they say "homework", give study tips.'}
            className={[
              "min-h-[120px] w-full resize-none border-2 bg-white shadow-sm focus-visible:ring-4",
              hasRule || !design.rulesPlainEnglish
                ? "border-slate-200 focus-visible:ring-[var(--accent)]/25"
                : "border-red-300 focus-visible:ring-red-500/25",
            ].join(" ")}
          />
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>{hasRule ? "Nice — you have at least one rule." : "Add at least one rule to continue."}</span>
            <span>{rulesCount(design.rulesPlainEnglish)} rule(s)</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              onClick={onGenerateStarterCode}
              disabled={!canGenerate}
              className="shadow-sm"
            >
              Generate Starter Code
            </Button>
            <Button type="button" variant="outline" onClick={onResetToTemplate}>
              Reset to Template
            </Button>
          </div>
          <div className="text-sm">
            {generatedToast ? (
              <span className="rounded-full bg-[var(--brand)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                {generatedToast}
              </span>
            ) : !canGenerate ? (
              <span className="text-xs text-slate-600">
                Finish <span className="font-semibold">Purpose</span> + at least{" "}
                <span className="font-semibold">1 Rule</span> to generate.
              </span>
            ) : (
              <span className="text-xs text-slate-600">Ready when you are.</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

