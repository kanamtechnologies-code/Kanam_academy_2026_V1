"use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const lesson13: LessonConfig = {
  id: "lesson-13",
  title: "13. Build Your AI NPC",
  goal: "Modify a rule-based NPC, add memory, and explain which rule ran — like a real game AI builder.",
  xpReward: 700,
  badge: "🎨 Designer",

  assignmentTitle: "Your mission",
  assignmentBody:
    "Build an NPC that responds to player input, remembers a name in `npc_memory`, and has a helpful fallback message.",
  assignmentChecklist: [
    "Add at least 2 rules using `if` and `elif`.",
    'Store a name using `npc_memory["name"] = name`.',
    'Use `npc_memory["name"]` inside a printed NPC message.',
    "Improve the fallback (else) message to be helpful.",
  ],

  starterCode: `# Fill in the blanks (guided) 👇
# Goal: build an adventure NPC that uses input + rules + npc_memory + output.

# No input() today — we’ll test by changing variables.
# Fill in the blank with your character name (keep the quotes).
player_name = "____"

# Character Profile (stored in npc_memory)
# A dictionary looks like this (labels → values):
npc_memory = {
    "name": player_name,
    "class": "____",
    "home": "____",
    "____": "____"
}

# --- NPC brain (rules) ---

def npc(player_input):
    # Rule 1: greeting
    if "____" in player_input.lower():
        print("Welcome, " + npc_memory["name"] + " the " + npc_memory["class"] + "!")
        print("From " + npc_memory["home"] + ", right? The road has been rough...")

    # Rule 2: quest
    elif "____" in player_input.lower():
        print("A quest, you say? I’ll remember this: " + npc_memory["____"] + ".")
        print("If you’re ready, speak your plan.")

    # Fallback rule (always runs if nothing matched)
    else:
        print("____")

# Test the NPC
player_text = "____"
npc(player_text)
`,

  instructorScript:
    "**Coach’s note**\nRead this first — it explains the goal + how to think about the code.\n**Coach’s note**:\nToday you’re building an **adventure NPC**.\n\nYour NPC is not “smart” on its own.\nIt follows **rules** you write.\nIt can also use **npc_memory** (a dictionary) to remember a character profile.\n\nHere’s the loop you’re building:\n- Message (what the player says)\n- Rules (if/elif/else)\n- Memory (npc_memory)\n- Output (what the NPC prints)\n\nToday, we’re not using input().\nWe test by changing variables like player_text = \"hello\".\n\nWhen you test your NPC, always ask:\n**Which rule ran, and why?**\n\n**Mini goal**:\nCreate a character profile in npc_memory, then make the NPC talk like it’s a quest.\nPress [[Run]] to test your code, then improve it.",

  kidExplain: [
    {
      title: "Input → Rules → Output",
      text:
        "Your NPC takes input (what the player says), checks rules, then prints output (what the NPC says).",
    },
    {
      title: "Memory is a dictionary",
      text:
        "A dictionary is like labeled memory. In this lesson we call it `npc_memory`, like `npc_memory[\"name\"]`.",
    },
    {
      title: "Explain what happened",
      text:
        "Real AI builders don’t just change code — they can explain which rule ran and why.",
    },
  ],

  steps: [
    "Fill in the blanks in the guided NPC (keywords + fallback message).",
    "Press Run and test with different messages (hello/game/anything else).",
    "In scratch, rebuild the NPC without hints.",
    'Ask for a name and store it in `npc_memory["name"]`.',
    'Use `npc_memory["name"]` in an NPC message.',
    "Improve the fallback message so it’s helpful.",
  ],

  cfu: [
    {
      question: "Why do we design rules before we code?",
      answer:
        "Because rules decide how the helper behaves. Planning first makes the code clearer and easier to test.",
    },
    {
      question: "Who is responsible for the helper’s behavior?",
      answer: "Humans are — the helper follows the rules we write.",
    },
    {
      question: "Why should memory be minimal?",
      answer:
        "Storing too much can be unsafe or unnecessary. Responsible design stores only what you need.",
    },
  ],

  tryThis: [
    "Add an `elif` rule (a second special case).",
    "Rewrite your messages to be more helpful and kind.",
    "Challenge: Add a rule that handles very short messages safely.",
  ],

  aiSafetyMoment:
    "AI safety: Rules are limits. Clear rules help prevent unsafe behavior. Store only necessary memory, avoid sensitive info, and test your rules with different inputs.",

  editorPlaceholder:
    '# Try rebuilding your NPC from scratch 👇\n# Tip: input → rules → npc_memory → output\n',

  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/12",
  nextHref: undefined,

  getRunOutput: () =>
    asTerminal("Press Run to test your NPC with different inputs."),
  computeProgressPercent: (code, submitted) => {
    if (submitted) return 100;
    const hasNpcMemory = /\bnpc_memory\s*=\s*\{/.test(code);
    const hasDefNpc = /\bdef\s+npc\s*\(\s*[A-Za-z_]\w*\s*\)\s*:/.test(code);
    const hasIf = /\n[ \t]+if\s+/.test(code);
    const hasElif = /\n[ \t]+elif\s+/.test(code);
    const hasElse = /\n[ \t]+else\s*:/.test(code);
    const hasNameStore =
      /npc_memory\[\s*["']name["']\s*\]\s*=/.test(code) || /["']name["']\s*:/.test(code);
    const usesStoredName = /npc_memory\[\s*["']name["']\s*\]/.test(code);
    const hasCall = /\bnpc\s*\(\s*.+\s*\)\s*/.test(code);
    const checks = [
      hasNpcMemory,
      hasDefNpc,
      hasIf,
      hasElif,
      hasElse,
      hasNameStore,
      usesStoredName,
      hasCall,
    ];
    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  },
  isSubmissionValid: (code) => {
    const hasNpcMemory = /\bnpc_memory\s*=\s*\{/.test(code);
    const hasDefNpc = /\bdef\s+npc\s*\(\s*[A-Za-z_]\w*\s*\)\s*:/.test(code);
    const hasIf = /\n[ \t]+if\s+/.test(code);
    const hasElif = /\n[ \t]+elif\s+/.test(code);
    const hasElse = /\n[ \t]+else\s*:/.test(code);
    const hasNameStore =
      /npc_memory\[\s*["']name["']\s*\]\s*=/.test(code) || /["']name["']\s*:/.test(code);
    const usesStoredName = /npc_memory\[\s*["']name["']\s*\]/.test(code);
    const hasCall = /\bnpc\s*\(\s*.+\s*\)\s*/.test(code);
    const hasNoLists = !/\[/.test(code); // keep this lesson list-free
    return (
      hasNpcMemory &&
      hasDefNpc &&
      hasIf &&
      hasElif &&
      hasElse &&
      hasNameStore &&
      usesStoredName &&
      hasCall &&
      hasNoLists &&
      !code.includes("Print(")
    );
  },
  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! Your NPC uses input, rules, npc_memory, and output — like game AI. 🎮")
      : asTerminal(
          "❌ Almost! Make sure your scratch code defines npc(...), uses if/elif/else rules, stores a name in npc_memory[\"name\"], uses it in a message, and calls npc(...). (No lists this week.)"
        ),
};

export default function Lesson13Page() {
  return <LessonCanvas lesson={lesson13} />;
}

