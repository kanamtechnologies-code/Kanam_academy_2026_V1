"use client";

import * as React from "react";
import { CheckCircle2, GitBranch } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ScenarioChoice = {
  id: string;
  label: string;
  /** Next node id, or null to end. */
  nextId: string | null;
  /** Optional tone for feedback styling. */
  tone?: "best" | "okay" | "risky";
  feedback?: string;
};

export type ScenarioNode = {
  id: string;
  prompt: string;
  choices: ScenarioChoice[];
  /** If set, this node is an ending (no further choices required). */
  ending?: {
    title: string;
    body: string;
    isSuccess?: boolean;
  };
};

type ScenarioTreeProps = {
  title?: string;
  startId: string;
  nodes: ScenarioNode[];
  completed: boolean;
  onComplete: (pathIds: string[]) => void;
};

const MAX_DEPTH = 8;

/** Shallow branching scenario for ethics / digital citizenship / AI judgment. */
export function ScenarioTree({
  title = "Scenario",
  startId,
  nodes,
  completed,
  onComplete,
}: ScenarioTreeProps) {
  const byId = React.useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const [nodeId, setNodeId] = React.useState(startId);
  const [path, setPath] = React.useState<string[]>([startId]);
  const [lastFeedback, setLastFeedback] = React.useState<string | null>(null);
  const [finished, setFinished] = React.useState(completed);

  React.useEffect(() => {
    if (completed) setFinished(true);
  }, [completed]);

  const node = byId.get(nodeId) ?? byId.get(startId);
  if (!node) {
    return (
      <p className="text-sm text-red-700">This scenario is missing data. Ask your teacher for help.</p>
    );
  }

  const choose = (choice: ScenarioChoice) => {
    if (finished || completed) return;
    if (path.length >= MAX_DEPTH) {
      setLastFeedback("This path is too long — restart the scenario.");
      return;
    }
    setLastFeedback(choice.feedback ?? null);
    if (!choice.nextId) {
      const endPath = [...path, choice.id];
      setPath(endPath);
      setFinished(true);
      onComplete(endPath);
      return;
    }
    const next = byId.get(choice.nextId);
    if (!next) {
      setLastFeedback("Something went wrong with this path. Try another choice.");
      return;
    }
    setPath((p) => [...p, choice.id, choice.nextId!]);
    setNodeId(choice.nextId);
    if (next.ending) {
      const endPath = [...path, choice.id, choice.nextId];
      setFinished(true);
      onComplete(endPath);
    }
  };

  const restart = () => {
    if (completed) return;
    setNodeId(startId);
    setPath([startId]);
    setLastFeedback(null);
    setFinished(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <GitBranch className="h-4 w-4 text-[var(--brand)]" />
        <p className="text-xs font-black uppercase tracking-wide text-[var(--brand-2)]">{title}</p>
      </div>

      {node.ending || (finished && node.ending) ? (
        <div
          className={cn(
            "rounded-2xl border p-4",
            node.ending?.isSuccess !== false
              ? "border-emerald-200 bg-emerald-50"
              : "border-amber-200 bg-amber-50"
          )}
        >
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
            <div>
              <p className="font-bold text-slate-900">{node.ending?.title ?? "Scenario complete"}</p>
              <p className="mt-1 text-sm text-slate-700">{node.ending?.body}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="text-base font-semibold text-slate-900">{node.prompt}</p>
          {lastFeedback ? (
            <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              {lastFeedback}
            </p>
          ) : null}
          <div className="space-y-2">
            {node.choices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                disabled={finished}
                onClick={() => choose(choice)}
                className={cn(
                  "flex min-h-11 w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors",
                  choice.tone === "risky"
                    ? "border-amber-200 bg-amber-50/50 hover:bg-amber-50"
                    : choice.tone === "best"
                      ? "border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                )}
              >
                {choice.label}
              </button>
            ))}
          </div>
        </>
      )}

      {finished && !completed ? (
        <Button type="button" variant="outline" className="h-11" onClick={restart}>
          Try another path
        </Button>
      ) : null}
    </div>
  );
}
