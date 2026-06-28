import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function hasNoLists(code: string): boolean {
  return !/\=\s*\[\s*\]/.test(code) && !/\.\s*append\s*\(/.test(code);
}

function npcCapstoneValid(code: string, run: MiniRunResult): boolean {
  if (rejectsUppercasePrint(code)) return false;
  if (!/\bnpc_memory\s*=\s*\{/.test(code)) return false;
  if (!/\bdef\s+npc\s*\(\s*[A-Za-z_]\w*\s*\)\s*:/.test(code)) return false;
  if (!/\n[ \t]+if\s+/.test(code)) return false;
  if (!/\n[ \t]+elif\s+/.test(code)) return false;
  if (!/\n[ \t]+else\s*:/.test(code)) return false;
  const hasNameStore =
    /npc_memory\[\s*["']name["']\s*\]\s*=/.test(code) || /["']name["']\s*:/.test(code);
  if (!hasNameStore) return false;
  if (!/npc_memory\[\s*["']name["']\s*\]/.test(code)) return false;
  if (!/\bnpc\s*\(\s*.+\s*\)\s*/.test(code)) return false;
  if (!hasNoLists(code)) return false;
  return run.stdout.length >= 1;
}

export const lesson13: PythonLessonConfig = {
  id: "lesson-13",
  title: "13. Build Your AI NPC",
  goal: "Modify a rule-based NPC, add memory, and explain which rule ran — like a real game AI builder.",
  xpReward: 700,
  badge: "🎨 Designer",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
  prevHref: "/learn/12",
  nextHref: undefined,
  instructorScript:
    "**Coach's note**\nRead this first — it explains the goal + how to think about the code.\n**Coach's note**:\nToday you're building an **adventure NPC**.\n\nYour NPC is not \"smart\" on its own.\nIt follows **rules** you write.\nIt can also use **npc_memory** (a dictionary) to remember a character profile.\n\nHere's the loop you're building:\n- Message (what the player says)\n- Rules (if/elif/else)\n- Memory (npc_memory)\n- Output (what the NPC prints)\n\nToday, we're not using input().\nWe test by changing variables like player_text = \"hello\".\n\nWhen you test your NPC, always ask:\n**Which rule ran, and why?**\n\n**Mini goal**:\nCreate a character profile in npc_memory, then make the NPC talk like it's a quest.\nPress [[Run]] to test your code, then improve it.",
  commandReference: [
    {
      command: "npc_memory = {...}",
      summary: "A dictionary storing the character profile — name, class, home, and more.",
      example: 'npc_memory = {"name": "Alex", "class": "knight"}',
    },
    {
      command: "def npc(player_input):",
      summary: "The NPC brain — a function that checks rules based on what the player says.",
      example: "def npc(player_input):",
    },
    {
      command: "if / elif / else",
      summary: "Rules inside npc() decide which message prints. elif adds a second special case.",
      example: 'if "hello" in player_input.lower():',
    },
    {
      command: 'npc_memory["name"]',
      summary: "Read stored character info inside NPC messages for personalized output.",
      example: 'print("Welcome, " + npc_memory["name"] + "!")',
    },
  ],
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
        "Real AI builders don't just change code — they can explain which rule ran and why.",
    },
  ],
  steps: [
    "Fill in the blanks in the guided NPC (keywords + fallback message).",
    "Press Run and test with different messages (hello/game/anything else).",
    "In scratch, rebuild the NPC without hints.",
    'Ask for a name and store it in `npc_memory["name"]`.',
    'Use `npc_memory["name"]` in an NPC message.',
    "Improve the fallback message so it's helpful.",
  ],
  cfu: [
    {
      question: "Why do we design rules before we code?",
      answer:
        "Because rules decide how the helper behaves. Planning first makes the code clearer and easier to test.",
    },
    {
      question: "Who is responsible for the helper's behavior?",
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
  exercises: [
    {
      id: "ex-npc-memory",
      title: "Exercise 1 — Character memory",
      focusCommand: "npc_memory = {...}",
      commandExplain:
        "Build a character profile dictionary. Include at least a name key stored in npc_memory.",
      goal: "Create npc_memory with a name entry.",
      starterCode: `# Fill in the blanks 👇
player_name = "Alex"

npc_memory = {
    "name": ____,
    "class": "____",
    "home": "____"
}
`,
      hint: 'Use player_name or a quoted name for the "name" value.',
      successMessage: "Profile stored! npc_memory holds your character details.",
      failureMessage: 'Create npc_memory = {...} with a "name" key and value.',
      validate: (code: string) => {
        if (rejectsUppercasePrint(code)) return false;
        return (
          /\bnpc_memory\s*=\s*\{/.test(code) &&
          (/npc_memory\[\s*["']name["']\s*\]\s*=/.test(code) ||
            /["']name["']\s*:/.test(code))
        );
      },
    },
    {
      id: "ex-npc-def-if",
      title: "Exercise 2 — NPC function + if rule",
      focusCommand: "def npc + if",
      commandExplain:
        "Define npc(player_input) and add an if rule that checks what the player said.",
      goal: "Define def npc(...) with an if rule and a print inside it.",
      starterCode: `# Fill in the blanks 👇
player_name = "Alex"
npc_memory = {"name": player_name, "class": "knight", "home": "Riverdale"}

def npc(player_input):
    if "____" in player_input.lower():
        print("Welcome, " + npc_memory["name"] + "!")
`,
      hint: 'Check for a greeting word like "hello" in player_input.lower().',
      successMessage: "NPC brain started! Your first rule responds to player input.",
      failureMessage: "Define def npc(player_input): with an if rule and indented print.",
      validate: (code: string) => {
        if (rejectsUppercasePrint(code)) return false;
        return (
          /\bdef\s+npc\s*\(\s*[A-Za-z_]\w*\s*\)\s*:/.test(code) &&
          /\n[ \t]+if\s+/.test(code) &&
          /npc_memory\[\s*["']name["']\s*\]/.test(code)
        );
      },
    },
    {
      id: "ex-npc-elif-else",
      title: "Exercise 3 — elif and else rules",
      focusCommand: "elif + else",
      commandExplain:
        "Add elif for a second special case and else as a helpful fallback when nothing matches.",
      goal: "Add elif and else branches with print statements inside npc().",
      starterCode: `# Fill in the blanks 👇
player_name = "Alex"
npc_memory = {"name": player_name, "class": "knight", "home": "Riverdale"}

def npc(player_input):
    if "hello" in player_input.lower():
        print("Welcome, " + npc_memory["name"] + "!")
    elif "____" in player_input.lower():
        print("A quest, you say? I'll remember this.")
    else:
        print("____")

player_text = "hello"
npc(player_text)
`,
      hint: "Add a quest keyword in elif and a helpful fallback message in else.",
      successMessage: "All three rule branches ready — if, elif, and else!",
      failureMessage: "Add elif and else branches with indented print lines inside npc().",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        return (
          /\bdef\s+npc\s*\(\s*[A-Za-z_]\w*\s*\)\s*:/.test(code) &&
          /\n[ \t]+if\s+/.test(code) &&
          /\n[ \t]+elif\s+/.test(code) &&
          /\n[ \t]+else\s*:/.test(code) &&
          /\bnpc\s*\(\s*.+\s*\)\s*/.test(code) &&
          run.stdout.length >= 1
        );
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Build your AI NPC",
      focusCommand: "npc capstone",
      commandExplain:
        "Put it all together: npc_memory profile, def npc with if/elif/else, name in messages, and a test call. No lists!",
      goal: "Build a complete NPC with memory, rules, and a test call.",
      starterCode: `# Fill in the blanks 👇
player_name = "____"

npc_memory = {
    "name": player_name,
    "class": "____",
    "home": "____",
    "____": "____"
}

def npc(player_input):
    if "____" in player_input.lower():
        print("Welcome, " + npc_memory["name"] + " the " + npc_memory["class"] + "!")
        print("From " + npc_memory["home"] + ", right? The road has been rough...")
    elif "____" in player_input.lower():
        print("A quest, you say? I'll remember this: " + npc_memory["____"] + ".")
        print("If you're ready, speak your plan.")
    else:
        print("____")

player_text = "____"
npc(player_text)
`,
      hint: "Fill keywords (hello/quest), use npc_memory in messages, and test with player_text.",
      successMessage: "Submitted! Your NPC uses input, rules, npc_memory, and output — like game AI. 🎮",
      failureMessage:
        'Need npc_memory, def npc with if/elif/else, npc_memory["name"] in a message, npc(...) call, and no lists.',
      validate: (code: string, run: MiniRunResult) => npcCapstoneValid(code, run),
    },
  ],
};
