"use client";

import * as React from "react";
import { Beaker, CheckCircle2, Calculator } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Notice } from "@/components/ui/notice";
import { cn } from "@/lib/utils";

export type EvalLabCase = {
  id: string;
  /** Short case description */
  label: string;
  /** Ground-truth class (positive | negative) */
  truth: "positive" | "negative";
  /** Model prediction */
  prediction: "positive" | "negative";
};

export type EvalLabProps = {
  title: string;
  prompt: string;
  /** What “positive” means in this lab (e.g. “spam”, “urgent”). */
  positiveLabel: string;
  negativeLabel: string;
  cases: EvalLabCase[];
  /** Cost framing that drives which metric matters. */
  costNote: string;
  /** Which metric is the correct priority. */
  correctMetric: "precision" | "recall" | "accuracy" | "f1";
  metricChoices: Array<{
    id: "precision" | "recall" | "accuracy" | "f1";
    label: string;
    why: string;
  }>;
  /** Follow-up engineering action after metrics. */
  actionPrompt: string;
  actionChoices: string[];
  correctActionIndex: number;
  explanation: string;
  completed?: boolean;
  onComplete: () => void;
};

function countsFromCases(cases: EvalLabCase[]) {
  let tp = 0;
  let fp = 0;
  let tn = 0;
  let fn = 0;
  for (const c of cases) {
    if (c.truth === "positive" && c.prediction === "positive") tp += 1;
    else if (c.truth === "negative" && c.prediction === "positive") fp += 1;
    else if (c.truth === "negative" && c.prediction === "negative") tn += 1;
    else fn += 1;
  }
  return { tp, fp, tn, fn };
}

function metricValue(
  metric: EvalLabProps["correctMetric"],
  c: ReturnType<typeof countsFromCases>
) {
  const { tp, fp, tn, fn } = c;
  if (metric === "precision") return tp + fp === 0 ? 0 : tp / (tp + fp);
  if (metric === "recall") return tp + fn === 0 ? 0 : tp / (tp + fn);
  if (metric === "accuracy") {
    const n = tp + fp + tn + fn;
    return n === 0 ? 0 : (tp + tn) / n;
  }
  const p = tp + fp === 0 ? 0 : tp / (tp + fp);
  const r = tp + fn === 0 ? 0 : tp / (tp + fn);
  return p + r === 0 ? 0 : (2 * p * r) / (p + r);
}

/**
 * Advanced practice: read prediction outcomes, fill a confusion matrix,
 * choose the right metric for the cost of errors, then pick a next action.
 */
export function EvalLab({
  title,
  prompt,
  positiveLabel,
  negativeLabel,
  cases,
  costNote,
  correctMetric,
  metricChoices,
  actionPrompt,
  actionChoices,
  correctActionIndex,
  explanation,
  completed = false,
  onComplete,
}: EvalLabProps) {
  const truth = React.useMemo(() => countsFromCases(cases), [cases]);
  const [tp, setTp] = React.useState("");
  const [fp, setFp] = React.useState("");
  const [tn, setTn] = React.useState("");
  const [fn, setFn] = React.useState("");
  const [metric, setMetric] = React.useState<EvalLabProps["correctMetric"] | null>(null);
  const [actionIndex, setActionIndex] = React.useState<number | null>(null);
  const [phase, setPhase] = React.useState<"matrix" | "metric" | "action" | "done">(
    completed ? "done" : "matrix"
  );
  const [error, setError] = React.useState<string | null>(null);
  const [matrixOk, setMatrixOk] = React.useState(completed);
  const [metricOk, setMetricOk] = React.useState(completed);

  React.useEffect(() => {
    if (completed) {
      setPhase("done");
      setMatrixOk(true);
      setMetricOk(true);
      setTp(String(truth.tp));
      setFp(String(truth.fp));
      setTn(String(truth.tn));
      setFn(String(truth.fn));
      setMetric(correctMetric);
      setActionIndex(correctActionIndex);
    }
  }, [completed, truth, correctMetric, correctActionIndex]);

  const checkMatrix = () => {
    const parsed = {
      tp: Number(tp),
      fp: Number(fp),
      tn: Number(tn),
      fn: Number(fn),
    };
    if (
      [parsed.tp, parsed.fp, parsed.tn, parsed.fn].some((n) => !Number.isFinite(n) || n < 0)
    ) {
      setError("Enter whole numbers ≥ 0 for every cell.");
      return;
    }
    if (
      parsed.tp !== truth.tp ||
      parsed.fp !== truth.fp ||
      parsed.tn !== truth.tn ||
      parsed.fn !== truth.fn
    ) {
      setError(
        "Not quite — recount true positives (predicted positive & actually positive), false positives, true negatives, and false negatives from the case table."
      );
      return;
    }
    setError(null);
    setMatrixOk(true);
    setPhase("metric");
  };

  const checkMetric = () => {
    if (!metric) {
      setError("Choose which metric should drive the decision.");
      return;
    }
    if (metric !== correctMetric) {
      const chosen = metricChoices.find((m) => m.id === metric);
      setError(
        chosen
          ? `“${chosen.label}” isn’t the best fit here. Re-read the cost note.`
          : "Pick a different metric for this cost structure."
      );
      return;
    }
    setError(null);
    setMetricOk(true);
    setPhase("action");
  };

  const checkAction = () => {
    if (actionIndex === null) {
      setError("Choose the strongest next engineering action.");
      return;
    }
    if (actionIndex !== correctActionIndex) {
      setError("That action doesn’t best match the metric and failure pattern. Try again.");
      return;
    }
    setError(null);
    setPhase("done");
    onComplete();
  };

  const computed =
    matrixOk
      ? {
          precision: metricValue("precision", truth),
          recall: metricValue("recall", truth),
          accuracy: metricValue("accuracy", truth),
          f1: metricValue("f1", truth),
        }
      : null;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-800 ring-1 ring-violet-200 dark:bg-violet-950 dark:text-violet-200 dark:ring-violet-500/40">
          <Beaker className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
            Eval lab
          </p>
          <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-slate-50">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{prompt}</p>
        </div>
      </div>

      <Notice compact variant="info" title="Cost of errors">
        {costNote}
      </Notice>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th className="px-3 py-2">Case</th>
              <th className="px-3 py-2">True label</th>
              <th className="px-3 py-2">Model said</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-100">{c.label}</td>
                <td className="px-3 py-2 text-slate-700 dark:text-slate-300">
                  {c.truth === "positive" ? positiveLabel : negativeLabel}
                </td>
                <td
                  className={cn(
                    "px-3 py-2 font-semibold",
                    c.truth === c.prediction
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-rose-700 dark:text-rose-300"
                  )}
                >
                  {c.prediction === "positive" ? positiveLabel : negativeLabel}
                  {c.truth !== c.prediction ? " ✗" : " ✓"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-900/60">
        <p className="mb-3 flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-slate-50">
          <Calculator className="h-4 w-4 text-violet-600" />
          Step 1 — Fill the confusion matrix
          {matrixOk ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : null}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(
            [
              ["TP", tp, setTp, "True positive"],
              ["FP", fp, setFp, "False positive"],
              ["TN", tn, setTn, "True negative"],
              ["FN", fn, setFn, "False negative"],
            ] as const
          ).map(([key, value, setter, hint]) => (
            <label key={key} className="space-y-1">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {key}{" "}
                <span className="font-medium text-slate-400">({hint})</span>
              </span>
              <Input
                inputMode="numeric"
                value={value}
                disabled={matrixOk || completed}
                onChange={(e) => setter(e.target.value.replace(/[^\d]/g, ""))}
                className="h-11"
                aria-label={hint}
              />
            </label>
          ))}
        </div>
        {!matrixOk && !completed ? (
          <Button type="button" className="mt-3 min-h-11" onClick={checkMatrix}>
            Check matrix
          </Button>
        ) : null}
        {computed ? (
          <p className="mt-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
            Computed — precision {(computed.precision * 100).toFixed(0)}% · recall{" "}
            {(computed.recall * 100).toFixed(0)}% · accuracy {(computed.accuracy * 100).toFixed(0)}% ·
            F1 {(computed.f1 * 100).toFixed(0)}%
          </p>
        ) : null}
      </div>

      {(phase === "metric" || phase === "action" || phase === "done") && (
        <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
          <p className="mb-2 text-sm font-extrabold text-slate-900 dark:text-slate-50">
            Step 2 — Which metric should drive the decision?
            {metricOk ? <CheckCircle2 className="ml-2 inline h-4 w-4 text-emerald-600" /> : null}
          </p>
          <div className="grid gap-2">
            {metricChoices.map((m) => (
              <button
                key={m.id}
                type="button"
                disabled={metricOk || completed}
                onClick={() => setMetric(m.id)}
                className={cn(
                  "min-h-11 rounded-xl border px-3.5 py-2.5 text-left text-sm font-semibold transition-colors",
                  metric === m.id
                    ? "border-violet-500 bg-violet-50 text-violet-950 dark:bg-violet-950/50 dark:text-violet-100"
                    : "border-slate-200 bg-white text-slate-800 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                )}
              >
                {m.label}
                <span className="mt-0.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  {m.why}
                </span>
              </button>
            ))}
          </div>
          {!metricOk && !completed ? (
            <Button type="button" className="mt-3 min-h-11" onClick={checkMetric}>
              Check metric
            </Button>
          ) : null}
        </div>
      )}

      {(phase === "action" || phase === "done") && (
        <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
          <p className="mb-2 text-sm font-extrabold text-slate-900 dark:text-slate-50">
            Step 3 — {actionPrompt}
          </p>
          <div className="grid gap-2">
            {actionChoices.map((choice, i) => (
              <button
                key={choice}
                type="button"
                disabled={phase === "done" || completed}
                onClick={() => setActionIndex(i)}
                className={cn(
                  "min-h-11 rounded-xl border px-3.5 py-2.5 text-left text-sm font-semibold transition-colors",
                  actionIndex === i
                    ? "border-violet-500 bg-violet-50 text-violet-950 dark:bg-violet-950/50 dark:text-violet-100"
                    : "border-slate-200 bg-white text-slate-800 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                )}
              >
                {choice}
              </button>
            ))}
          </div>
          {phase !== "done" && !completed ? (
            <Button type="button" className="mt-3 min-h-11" onClick={checkAction}>
              Submit lab
            </Button>
          ) : null}
        </div>
      )}

      {error ? (
        <Notice compact variant="danger" role="alert">
          {error}
        </Notice>
      ) : null}

      {phase === "done" || completed ? (
        <Notice compact variant="success" title="Lab complete">
          {explanation}
        </Notice>
      ) : null}
    </div>
  );
}
