"use client";

import * as React from "react";
import { MessageCircle, RotateCcw, Send, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  buildAdventurePlayCode,
  canPlayAdventure,
  extractLastBotReply,
  extractQuestLogDisplay,
} from "@/lib/pythonLessons/adventurePlay";
import { runMiniPython } from "@/lib/pythonRunner";

export type AdventureChatTurn = {
  id: string;
  role: "player" | "bot" | "system";
  text: string;
};

type AdventurePlayPanelProps = {
  code: string;
  playReady: boolean;
  onPlayTurnsChange?: (turns: number) => void;
  className?: string;
};

export function AdventurePlayPanel({
  code,
  playReady,
  onPlayTurnsChange,
  className,
}: AdventurePlayPanelProps) {
  const [draft, setDraft] = React.useState("");
  const [playerMessages, setPlayerMessages] = React.useState<string[]>([]);
  const [turns, setTurns] = React.useState<AdventureChatTurn[]>([
    {
      id: "welcome",
      role: "system",
      text: "Playtest script: (1) say your greeting keyword, (2) ask for the quest, (3) type nonsense like banana, (4) try help. Watch the quest log grow under the chat. You need 3+ turns.",
    },
  ]);
  const [questLog, setQuestLog] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  const ready = playReady && canPlayAdventure(code);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns, questLog]);

  const resetAdventure = () => {
    setPlayerMessages([]);
    setQuestLog(null);
    setError(null);
    setDraft("");
    setTurns([
      {
        id: `reset-${Date.now()}`,
        role: "system",
        text: "New adventure started — quest log cleared. Try greeting → quest → nonsense again.",
      },
    ]);
    onPlayTurnsChange?.(0);
  };

  const send = () => {
    const msg = draft.trim();
    if (!msg || busy) return;
    if (!ready) {
      setError(
        "Finish the bot brain in Build first: hero dictionary + def respond(player_input) with if / elif / else. Then Run & check and come back."
      );
      return;
    }

    setBusy(true);
    setError(null);
    setDraft("");

    const nextMessages = [...playerMessages, msg];
    const built = buildAdventurePlayCode(code, nextMessages);
    if ("error" in built) {
      setError(built.error);
      setBusy(false);
      return;
    }

    const run = runMiniPython(built.code, {});
    if (run.error) {
      setTurns((prev) => [
        ...prev,
        { id: `p-${Date.now()}`, role: "player", text: msg },
        {
          id: `e-${Date.now()}`,
          role: "system",
          text: `Your bot crashed: ${run.error}. Fix the code in Build, then try again.`,
        },
      ]);
      setBusy(false);
      return;
    }

    const reply = extractLastBotReply(run.stdout);
    const log = extractQuestLogDisplay(run.stdout);

    setPlayerMessages(nextMessages);
    setQuestLog(log);
    setTurns((prev) => [
      ...prev,
      { id: `p-${Date.now()}`, role: "player", text: msg },
      { id: `b-${Date.now()}`, role: "bot", text: reply },
    ]);
    onPlayTurnsChange?.(nextMessages.length);
    setBusy(false);
  };

  return (
    <div
      className={cn(
        "flex min-h-[420px] flex-col overflow-hidden rounded-2xl border-2 border-violet-200 bg-gradient-to-b from-violet-50/80 to-white shadow-inner",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 border-b border-violet-100 bg-white/70 px-4 py-3">
        <div>
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-violet-900">
            <MessageCircle className="h-3.5 w-3.5" />
            Live adventure · product demo
          </p>
          <p className="mt-0.5 text-sm font-semibold text-slate-800">
            Type like a player. Your respond() brain answers. Need 3+ turns to finish the capstone.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={resetAdventure} disabled={busy}>
          <RotateCcw className="h-3.5 w-3.5" />
          New game
        </Button>
      </div>

      {!ready ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-10 text-center">
          <Sparkles className="h-8 w-8 text-violet-400" />
          <p className="text-sm font-bold text-slate-900">Build the brain before you play</p>
          <p className="max-w-md text-sm text-slate-600">
            In <strong>Build</strong>, finish a character dictionary and{" "}
            <code className="rounded bg-slate-100 px-1">def respond(player_input):</code> with{" "}
            <strong>if / elif / else</strong> (each branch should print and append). Press{" "}
            <strong>Run &amp; check</strong>, then return here to chat.
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {turns.map((t) => (
              <div
                key={t.id}
                className={cn(
                  "max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  t.role === "player"
                    ? "ml-auto bg-[var(--brand)] text-white"
                    : t.role === "bot"
                      ? "mr-auto border border-violet-200 bg-white text-slate-900 shadow-sm"
                      : "mx-auto max-w-full bg-violet-100/70 text-center text-xs font-medium text-violet-950"
                )}
              >
                {t.role === "bot" ? (
                  <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-violet-600">
                    Your bot
                  </p>
                ) : null}
                {t.role === "player" ? (
                  <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-white/80">
                    You
                  </p>
                ) : null}
                <p className="whitespace-pre-wrap">{t.text}</p>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {questLog ? (
            <div className="border-t border-violet-100 bg-[rgb(var(--brand-rgb)/0.06)] px-4 py-2">
              <p className="text-[10px] font-black uppercase tracking-wide text-[var(--brand-2)]">
                Quest log (memory)
              </p>
              <p className="mt-0.5 font-mono text-xs text-slate-800">{questLog}</p>
            </div>
          ) : null}

          {error ? (
            <p
              className="border-t border-[rgb(var(--brand-rgb)/0.25)] bg-[rgb(var(--accent-rgb)/0.12)] px-4 py-2 text-xs text-slate-800"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          <form
            className="flex gap-2 border-t border-violet-100 bg-white p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder='Try "hello", "quest", "help", or invent your own…'
              disabled={busy}
              className="min-h-11 flex-1"
              aria-label="Message to your adventure bot"
            />
            <Button type="submit" className="min-h-11 shrink-0" disabled={busy || !draft.trim()}>
              <Send className="h-4 w-4" />
              Send
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
