"use client";

import * as React from "react";
import { Bug, CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type AIDebugChallengeProps = {
  prompt: string;
  /** The broken prompt, process, or claim learners inspect. */
  buggyContent: string;
  /** Optional caption above the buggy block. */
  contentLabel?: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  /** Optional tip shown after a wrong pick (does not reveal the answer). */
  hint?: string;
  imageSrc?: string;
  imageAlt?: string;
  completed: boolean;
  onComplete: () => void;
};

/** Spot-the-bug challenge for AI literacy (no code runner required). */
export function AIDebugChallenge({
  prompt,
  buggyContent,
  contentLabel = "Broken example",
  choices,
  correctIndex,
  explanation,
  hint,
  imageSrc,
  imageAlt,
  completed,
  onComplete,
}: AIDebugChallengeProps) {
  const [selected, setSelected] = React.useState<number | null>(completed ? correctIndex : null);
  const [checked, setChecked] = React.useState(completed);

  React.useEffect(() => {
    if (completed) {
      setSelected(correctIndex);
      setChecked(true);
    }
  }, [completed, correctIndex]);

  const isCorrect = checked && selected === correctIndex;

  const submit = () => {
    if (selected === null || completed) return;
    setChecked(true);
    if (selected === correctIndex) onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Bug className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-amber-900">Debug a real bug</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{prompt}</p>
        </div>
      </div>

      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={imageAlt ?? ""}
          className="mx-auto max-h-48 w-auto rounded-xl border border-slate-200 bg-white object-contain p-2"
        />
      ) : null}

      <div>
        <p className="mb-1.5 text-xs font-black uppercase tracking-wide text-slate-500">
          {contentLabel}
        </p>
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl border border-amber-200 bg-slate-900 p-3 font-mono text-xs leading-relaxed text-amber-100">
          {buggyContent}
        </pre>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">What&apos;s the bug?</p>
        {choices.map((choice, ci) => {
          const isChosen = selected === ci;
          const showCorrect = checked && ci === correctIndex;
          const showWrong = checked && isChosen && ci !== correctIndex;
          return (
            <button
              key={ci}
              type="button"
              disabled={completed || isCorrect}
              onClick={() => {
                setSelected(ci);
                setChecked(false);
              }}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border-2 px-3 py-2.5 text-left text-sm font-medium transition-colors",
                showCorrect
                  ? "border-emerald-400 bg-emerald-50 text-slate-900"
                  : showWrong
                    ? "border-red-300 bg-red-50 text-slate-900"
                    : isChosen
                      ? "border-amber-400 bg-amber-50 text-slate-900"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              )}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold">
                {showCorrect ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                ) : showWrong ? (
                  <XCircle className="h-4 w-4 text-red-600" />
                ) : (
                  String.fromCharCode(65 + ci)
                )}
              </span>
              <span>{choice}</span>
            </button>
          );
        })}
      </div>

      {!completed && !isCorrect ? (
        <Button type="button" className="h-11" disabled={selected === null} onClick={submit}>
          Check bug
        </Button>
      ) : null}

      {checked && !isCorrect ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950" role="alert">
          <p className="font-semibold">Not that bug — look again.</p>
          {hint ? <p className="mt-1">{hint}</p> : null}
        </div>
      ) : null}

      {isCorrect ? (
        <div className="kanam-data-success-banner" role="status">
          <CheckCircle2 className="kanam-data-success-icon" aria-hidden />
          <div>
            <p className="kanam-data-success-title">Bug found!</p>
            <p className="kanam-data-success-body">{explanation}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
