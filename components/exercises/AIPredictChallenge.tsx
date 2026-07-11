"use client";

import * as React from "react";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";

import { PredictionInput } from "@/components/exercises/PredictionInput";
import { Button } from "@/components/ui/button";
import { predictionSoftMatches } from "@/lib/exercises/normalizePrediction";

export type AIPredictChallengeProps = {
  prompt: string;
  /** Scenario / stimulus shown before predicting (answer stays hidden). */
  scenario?: string;
  imageSrc?: string;
  imageAlt?: string;
  acceptedAnswers: string[];
  explanation: string;
  placeholder?: string;
  completed: boolean;
  onComplete: () => void;
};

/**
 * Predict-before-reveal for AI literacy.
 * The correct answer is never shown until the learner's prediction matches.
 */
export function AIPredictChallenge({
  prompt,
  scenario,
  imageSrc,
  imageAlt,
  acceptedAnswers,
  explanation,
  placeholder,
  completed,
  onComplete,
}: AIPredictChallengeProps) {
  const [value, setValue] = React.useState("");
  const [feedback, setFeedback] = React.useState<"idle" | "wrong" | "right">(
    completed ? "right" : "idle"
  );

  React.useEffect(() => {
    if (completed) setFeedback("right");
  }, [completed]);

  const check = () => {
    if (completed) return;
    if (!value.trim()) {
      setFeedback("wrong");
      return;
    }
    if (predictionSoftMatches(value, acceptedAnswers)) {
      setFeedback("right");
      onComplete();
    } else {
      setFeedback("wrong");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2 rounded-xl border border-violet-200 bg-violet-50/80 px-3 py-2 text-sm text-violet-950">
        <EyeOff className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          <strong>No peeking:</strong> write your prediction first. The real answer stays hidden until
          you get it right.
        </p>
      </div>

      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={imageAlt ?? ""}
          className="mx-auto max-h-48 w-auto rounded-xl border border-slate-200 bg-white object-contain p-2"
        />
      ) : null}

      {scenario ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Scenario</p>
          <pre className="mt-2 whitespace-pre-wrap font-sans text-sm text-slate-800">{scenario}</pre>
        </div>
      ) : null}

      <PredictionInput
        prompt={prompt}
        value={value}
        onChange={(next) => {
          setValue(next);
          if (feedback !== "right") setFeedback("idle");
        }}
        disabled={completed || feedback === "right"}
        placeholder={placeholder ?? "Type your prediction…"}
      />

      {feedback !== "right" && !completed ? (
        <Button type="button" className="h-11" onClick={check}>
          <Eye className="h-4 w-4" />
          Check prediction
        </Button>
      ) : null}

      {feedback === "wrong" ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950" role="alert">
          <p className="font-semibold">Not quite — rethink and try again.</p>
          <p className="mt-1">We won&apos;t show the answer yet. Use the scenario and try a clearer prediction.</p>
        </div>
      ) : null}

      {feedback === "right" ? (
        <div className="kanam-data-success-banner" role="status">
          <CheckCircle2 className="kanam-data-success-icon" aria-hidden />
          <div>
            <p className="kanam-data-success-title">Nice prediction!</p>
            <p className="kanam-data-success-body">{explanation}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
