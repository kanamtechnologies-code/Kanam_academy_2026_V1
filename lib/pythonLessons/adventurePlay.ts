/** Helpers to turn learner adventure-bot code into a live playable chat. */

const FN_RE = /\bdef\s+(respond|npc|adventure|guide|helper)\s*\(\s*[A-Za-z_]\w*\s*\)\s*:/;

export function findAdventureFnName(code: string): string | null {
  const m = code.match(FN_RE);
  return m?.[1] ?? null;
}

export function canPlayAdventure(code: string): boolean {
  return Boolean(findAdventureFnName(code)) && /\bif\s+/.test(code) && /\belse\s*:/.test(code);
}

function toPythonStringList(messages: string[]): string {
  return `[${messages.map((m) => JSON.stringify(m)).join(", ")}]`;
}

/**
 * Rebuild learner code so test_messages is the live chat history.
 * Preserves quest_log growth across turns by replaying the full conversation.
 */
export function buildAdventurePlayCode(
  source: string,
  messages: string[]
): { code: string } | { error: string } {
  const fn = findAdventureFnName(source);
  if (!fn) {
    return {
      error: "Define a bot brain first — e.g. def respond(player_input): with if/elif/else rules.",
    };
  }
  if (messages.length === 0) {
    return { error: "Type a message to start the adventure." };
  }

  const list = toPythonStringList(messages);

  // Drop existing harness (test list + loop + trailing summary prints).
  let brain = source
    .replace(/\n\s*test_messages\s*=\s*\[[\s\S]*$/m, "\n")
    .replace(/\n\s*#\s*4\)[^\n]*\n[\s\S]*$/m, "\n")
    .replace(/\n\s*#\s*5\)[^\n]*\n[\s\S]*$/m, "\n")
    .replace(/\n\s*for\s+\w+\s+in\s+(test_messages|messages|turns|player_texts)\s*:[\s\S]*$/m, "\n")
    .trimEnd();

  // If a leftover partial test_messages remains mid-file, strip it.
  brain = brain.replace(/\n\s*test_messages\s*=\s*\[[\s\S]*?\](?=\s*\n)/g, "\n");

  const harness = `

# --- Live adventure (auto-built from your chat) ---
test_messages = ${list}
for msg in test_messages:
    print("---")
    print("Player: " + msg)
    ${fn}(msg)

print("Quest log:")
print(quest_log)
`;

  return { code: brain + harness };
}

/** Pull the bot's reply for the latest turn out of a full replay stdout. */
export function extractLastBotReply(stdout: string[]): string {
  const text = stdout.join("\n").trim();
  if (!text) return "(Your bot printed nothing — add print(...) inside your rules.)";

  const chunks = text.split(/\n---\n|\n---$/).map((c) => c.trim()).filter(Boolean);
  const last = chunks[chunks.length - 1] ?? text;

  let reply = last
    .replace(/^Player:.*$/m, "")
    .replace(/^Quest log:\s*$/m, "")
    .replace(/^\[[\s\S]*\]\s*$/m, "")
    .trim();

  // Drop trailing quest-log block if it stuck to the last chunk.
  const qIdx = reply.search(/\nQuest log:/);
  if (qIdx >= 0) reply = reply.slice(0, qIdx).trim();

  return reply || "(No reply text — make sure each rule prints something.)";
}

export function extractQuestLogDisplay(stdout: string[]): string | null {
  const text = stdout.join("\n");
  const labeled = text.match(/Quest log:\s*\n(\[[\s\S]*?\])/);
  if (labeled?.[1]) return labeled[1].trim();

  for (let i = stdout.length - 1; i >= 0; i--) {
    const line = stdout[i]?.trim() ?? "";
    if (/^\[.*\]$/.test(line)) return line;
  }
  return null;
}
