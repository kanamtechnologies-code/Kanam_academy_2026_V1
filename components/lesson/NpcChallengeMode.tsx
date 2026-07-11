import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { CodeTextarea } from "@/components/lesson/CodeTextarea";

export type NpcDraftState = {
  code: string;
  testPlayerText: string;
  completed: { c1: boolean; c2: boolean; c3: boolean };
  reflection: string;
  lastRun: { ok: boolean; output: string; ranAt: number } | null;
};

export const NPC_STARTER_CODE = `# This dictionary is the NPC's memory.
# It stores information so the NPC can remember things later.
npc_memory = {}

# This function is the NPC's "brain".
# It runs every time the player says something.
def npc(player_input):

    # This rule checks if the player says hello.
    # .lower() makes everything lowercase so the check is easier.
    if "hello" in player_input.lower():
        print("Hey traveler! What brings you here?")

    # This rule runs ONLY if the first rule did not match.
    # It checks if the player talks about games.
    elif "game" in player_input.lower():
        print("Ah, a gamer! What kind of games do you like?")

    # This rule runs if none of the rules above matched.
    # It is the NPC's fallback behavior.
    else:
        print("I don't understand yet. Tell me more.")

# This line asks the player to type a message.
player_text = input("Say something to the NPC: ")

# This line sends the player's message into the NPC's brain.
npc(player_text)
`;

function clampPct(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function reflectionLooksValid(s: string) {
  const t = (s ?? "").trim();
  if (t.length < 15) return false;
  // one-sentence minimum: has at least one space and ends-ish like a sentence
  if (!/\s/.test(t)) return false;
  return true;
}

function findNameInputVar(code: string) {
  // Find something like: name = input("...")
  const matches = Array.from(code.matchAll(/^\s*([A-Za-z_]\w*)\s*=\s*input\s*\(/gm)).map((m) => m[1]);
  const filtered = matches.filter((v) => v !== "player_text");
  return filtered[0] ?? null;
}

function getCurrentChallenge(completed: NpcDraftState["completed"]) {
  if (!completed.c1) return 1;
  if (!completed.c2) return 2;
  if (!completed.c3) return 3;
  return 4;
}

export function NpcChallengeMode({
  hubId,
  hubDataId,
  lessonId,
  userKey,
  promptVersion,
  isInstructorView,
  onTrackEvent,
  onRunCode,
}: {
  hubId?: string;
  hubDataId?: string;
  lessonId: string;
  userKey: string;
  promptVersion: string;
  isInstructorView: boolean;
  onTrackEvent?: (eventType: string, payload?: unknown) => void;
  onRunCode: (code: string, runtime: Record<string, string>) => { ok: boolean; output: string };
}) {
  const storageKey = React.useMemo(() => {
    return `kanam.npcDraft:${promptVersion}:${lessonId}:${userKey}`;
  }, [promptVersion, lessonId, userKey]);

  const [draft, setDraft] = React.useState<NpcDraftState>(() => ({
    code: NPC_STARTER_CODE,
    testPlayerText: "hello",
    completed: { c1: false, c2: false, c3: false },
    reflection: "",
    lastRun: null,
  }));
  const [loadedKey, setLoadedKey] = React.useState("");
  const [toast, setToast] = React.useState<string | null>(null);

  // Load
  React.useEffect(() => {
    if (!storageKey) return;
    if (loadedKey === storageKey) return;
    setLoadedKey(storageKey);
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<NpcDraftState>;
      if (typeof parsed.code === "string") {
        setDraft((d) => ({
          ...d,
          ...parsed,
          completed: {
            c1: Boolean(parsed.completed?.c1),
            c2: Boolean(parsed.completed?.c2),
            c3: Boolean(parsed.completed?.c3),
          },
          lastRun: parsed.lastRun ?? null,
        }));
      }
    } catch {
      // ignore
    }
  }, [storageKey, loadedKey]);

  // Autosave (debounced)
  React.useEffect(() => {
    if (!storageKey) return;
    if (loadedKey !== storageKey) return;
    const t = window.setTimeout(() => {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(draft));
      } catch {
        // ignore
      }
    }, 450);
    return () => window.clearTimeout(t);
  }, [draft, storageKey, loadedKey]);

  const progress = React.useMemo(() => {
    const base =
      (draft.completed.c1 ? 30 : 0) +
      (draft.completed.c2 ? 30 : 0) +
      (draft.completed.c3 ? 30 : 0) +
      (draft.completed.c3 && reflectionLooksValid(draft.reflection) ? 10 : 0);
    return clampPct(base);
  }, [draft.completed, draft.reflection]);

  const current = getCurrentChallenge(draft.completed);

  const setToastSafe = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  };

  const runAndCheck = () => {
    const nameVar = findNameInputVar(draft.code);
    const runtime: Record<string, string> = {
      player_text: draft.testPlayerText,
    };
    if (nameVar) runtime[nameVar] = "Alex";

    const result = onRunCode(draft.code, runtime);
    setDraft((d) => ({
      ...d,
      lastRun: { ok: result.ok, output: result.output, ranAt: Date.now() },
    }));

    if (!result.ok) return;

    // Challenge checks are intentionally simple + kid-friendly.
    if (current === 1) {
      const hasElif = /\belif\b/.test(draft.code);
      const checksNamePhrase =
        /my name is/i.test(draft.code) &&
        /\bin\b/.test(draft.code) &&
        /player_input/.test(draft.code);
      const ranNameTest = onRunCode(draft.code, { player_text: "my name is Alex" });
      const changedOutput = ranNameTest.ok && !/I don't understand yet\. Tell me more\./.test(ranNameTest.output);
      if (hasElif && checksNamePhrase && changedOutput) {
        setDraft((d) => ({ ...d, completed: { ...d.completed, c1: true } }));
        onTrackEvent?.("npc_challenge_complete", { challenge: 1 });
        setToastSafe("🟢 Challenge unlocked! Rule added.");
      }
    } else if (current === 2) {
      const nameVar2 = findNameInputVar(draft.code);
      const hasMemoryAssign = /npc_memory\[\s*["']name["']\s*\]\s*=/.test(draft.code);
      const usesMemoryName = /npc_memory\[\s*["']name["']\s*\]/.test(draft.code);
      if (!nameVar2) return;
      const ran = onRunCode(draft.code, { player_text: "hello", [nameVar2]: "Alex" });
      const includesName = ran.ok && /\bAlex\b/.test(ran.output);
      if (hasMemoryAssign && usesMemoryName && includesName) {
        setDraft((d) => ({ ...d, completed: { ...d.completed, c2: true } }));
        onTrackEvent?.("npc_challenge_complete", { challenge: 2 });
        setToastSafe("🟡 NPC upgraded! Memory added.");
      }
    } else if (current === 3) {
      const changedFallback = !/print\(\s*["']I don't understand yet\. Tell me more\.["']\s*\)/.test(draft.code);
      const ran = onRunCode(draft.code, { player_text: "banana" });
      const ok = changedFallback && ran.ok;
      if (ok) {
        setDraft((d) => ({ ...d, completed: { ...d.completed, c3: true } }));
        onTrackEvent?.("npc_challenge_complete", { challenge: 3 });
        setToastSafe("🔵 Nice! Fallback improved.");
      }
    }
  };

  React.useEffect(() => {
    if (!draft.completed.c3) return;
    if (!reflectionLooksValid(draft.reflection)) return;
    const t = window.setTimeout(() => {
      onTrackEvent?.("npc_reflection_saved", { len: draft.reflection.trim().length });
    }, 600);
    return () => window.clearTimeout(t);
  }, [draft.completed.c3, draft.reflection, onTrackEvent]);

  const renderInstruction = () => {
    if (current === 1) {
      return (
        <div className="space-y-2">
          <p className="text-sm font-extrabold tracking-tight text-slate-900">
            🟢 Challenge 1 — Add a New Rule
          </p>
          <p className="text-sm text-slate-700">
            Add a new rule so the NPC responds when the player says their name.
          </p>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <p className="font-semibold">Hint</p>
            <p className="mt-1">Check if the message includes <span className="font-semibold">&quot;my name is&quot;</span>.</p>
            <p className="mt-2 text-xs text-slate-500">
              Success: you add an <span className="font-semibold">elif</span>, and the output changes for{" "}
              <span className="font-semibold">my name is ...</span>
            </p>
          </div>
        </div>
      );
    }
    if (current === 2) {
      return (
        <div className="space-y-2">
          <p className="text-sm font-extrabold tracking-tight text-slate-900">
            🟡 Challenge 2 — Give the NPC Memory
          </p>
          <p className="text-sm text-slate-700">
            Make the NPC remember the player’s name so it can respond differently later.
          </p>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <p className="font-semibold">Hints</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
              <li>Use the <span className="font-semibold">npc_memory</span> dictionary</li>
              <li>Store something using the key <span className="font-semibold">&quot;name&quot;</span></li>
              <li>Tip: use <span className="font-semibold">name = input(...)</span>, then <span className="font-semibold">npc_memory[&quot;name&quot;] = name</span></li>
            </ul>
            <p className="mt-2 text-xs text-slate-500">
              Success: memory stores a name, and the NPC prints the name (we’ll test with “Alex”).
            </p>
          </div>
        </div>
      );
    }
    if (current === 3) {
      return (
        <div className="space-y-2">
          <p className="text-sm font-extrabold tracking-tight text-slate-900">
            🔵 Challenge 3 — Improve the Fallback Rule
          </p>
          <p className="text-sm text-slate-700">
            Rewrite the fallback message to sound more helpful and less confusing.
          </p>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <p className="font-semibold">Success</p>
            <p className="mt-1">Change the <span className="font-semibold">else</span> message, and make sure it runs with no errors.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-2">
        <p className="text-sm font-extrabold tracking-tight text-slate-900">
          🏆 NPC Challenge Mode Complete
        </p>
        <p className="text-sm text-slate-700">
          Your NPC has rules + memory + a helpful fallback. Now explain what happened.
        </p>
      </div>
    );
  };

  const instructorHints = React.useMemo(() => {
    const missingMemory = !/npc_memory\[\s*["']name["']\s*\]\s*=/.test(draft.code);
    const fallbackUnchanged = /print\(\s*["']I don't understand yet\. Tell me more\.["']\s*\)/.test(draft.code);
    return { missingMemory, fallbackUnchanged };
  }, [draft.code]);

  return (
    <Card
      id={hubId}
      data-hub={hubDataId}
      className="w-full scroll-mt-24 border-[rgb(var(--accent-rgb)/0.55)] bg-white shadow-md"
    >
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <CardTitle className="text-base">NPC Challenge Mode</CardTitle>
            <p className="mt-1 text-sm text-slate-600">Upgrade your NPC like a game quest: rules → memory → better fallback.</p>
          </div>
          <div className="w-full max-w-sm">
            <div className="mb-1 flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold">Quest progress</span>
              <span className="font-semibold">{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {toast ? (
          <div className="rounded-xl border border-[var(--brand)]/20 bg-[var(--brand)]/10 px-4 py-2 text-sm font-semibold text-[var(--brand)]">
            {toast}
          </div>
        ) : null}

        {isInstructorView ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={draft.completed.c1 ? "secondary" : "outline"}>C1 {draft.completed.c1 ? "done" : "missing"}</Badge>
              <Badge variant={draft.completed.c2 ? "secondary" : "outline"}>C2 {draft.completed.c2 ? "done" : "missing"}</Badge>
              <Badge variant={draft.completed.c3 ? "secondary" : "outline"}>C3 {draft.completed.c3 ? "done" : "missing"}</Badge>
              {instructorHints.missingMemory ? (
                <Badge variant="outline">⚠ missing npc_memory[&quot;name&quot;]</Badge>
              ) : null}
              {instructorHints.fallbackUnchanged ? (
                <Badge variant="outline">⚠ fallback not improved</Badge>
              ) : null}
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Reflection:{" "}
              <span className={reflectionLooksValid(draft.reflection) ? "font-semibold text-slate-900" : "font-semibold text-red-700"}>
                {draft.reflection?.trim() ? draft.reflection.trim() : "—"}
              </span>
            </p>
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            {renderInstruction()}
            <div className="mt-3 space-y-2">
              <p className="text-xs font-semibold text-slate-700">Test message</p>
              <Input
                value={draft.testPlayerText}
                onChange={(e) => setDraft((d) => ({ ...d, testPlayerText: e.target.value }))}
                placeholder='Try: hello / game / "my name is Alex"'
              />
              <div className="flex flex-wrap items-center gap-2">
                <Button type="button" onClick={runAndCheck} className="shadow-sm">
                  Run NPC
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDraft((d) => ({
                      ...d,
                      code: NPC_STARTER_CODE,
                      completed: { c1: false, c2: false, c3: false },
                      reflection: "",
                      lastRun: null,
                    }));
                    onTrackEvent?.("npc_reset");
                    setToastSafe("Reset NPC to starter.");
                  }}
                >
                  Reset NPC
                </Button>
              </div>
              <p className="text-[11px] text-slate-500">
                Tip: You can edit code, then press Run again to test the next upgrade.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">NPC Code (edit me)</p>
              <CodeTextarea
                value={draft.code}
                onChange={(next) => setDraft((d) => ({ ...d, code: next }))}
                ariaLabel="NPC Python code editor"
                showLineNumbers
                minHeightPx={320}
                maxHeightPx={680}
                className="mt-2 min-h-[320px] w-full border-2 border-slate-200 bg-white shadow-sm focus-within:ring-4 focus-within:ring-[var(--accent)]/25"
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-950 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white/90">NPC Console</p>
                {draft.lastRun ? (
                  <Badge variant="secondary">{draft.lastRun.ok ? "Ran" : "Error"}</Badge>
                ) : (
                  <Badge variant="outline">Not run yet</Badge>
                )}
              </div>
              <pre className="mt-3 max-h-[240px] overflow-auto whitespace-pre-wrap rounded-lg bg-black/40 p-3 text-xs text-white/85">
{draft.lastRun?.output ?? "Press Run NPC to see output here."}
              </pre>
            </div>

            {draft.completed.c3 ? (
              <div className="rounded-xl border border-[rgb(var(--accent-rgb)/0.55)] bg-white p-4 shadow-sm">
                <p className="text-sm font-extrabold tracking-tight text-slate-900">
                  AI Understanding Check (Required)
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  Explain which rule ran the last time you tested your NPC, and why.
                </p>
                <Textarea
                  value={draft.reflection}
                  onChange={(e) => {
                    const next = e.target.value;
                    setDraft((d) => ({ ...d, reflection: next }));
                    onTrackEvent?.("npc_reflection_draft", { len: next.length });
                  }}
                  placeholder="Example: The hello rule ran because my message included 'hello' (case doesn’t matter because of .lower())."
                  className={[
                    "mt-2 min-h-[110px] w-full resize-none border-2 bg-white shadow-sm focus-visible:ring-4",
                    reflectionLooksValid(draft.reflection)
                      ? "border-slate-200 focus-visible:ring-[var(--accent)]/25"
                      : "border-red-300 focus-visible:ring-red-500/25",
                  ].join(" ")}
                />
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>
                    {reflectionLooksValid(draft.reflection)
                      ? "Saved automatically."
                      : "Write at least 1 full sentence."}
                  </span>
                  <span>{(draft.reflection ?? "").trim().length} chars</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

