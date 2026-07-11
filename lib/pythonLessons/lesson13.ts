import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function hasNoLists(code: string): boolean {
  return !/\=\s*\[\s*\]/.test(code) && !/\.\s*append\s*\(/.test(code);
}

function noRunError(run: MiniRunResult): boolean {
  return !run.error;
}

function hasNpcMemory(code: string): boolean {
  return (
    /\bnpc_memory\s*=\s*\{/.test(code) &&
    (/npc_memory\[\s*["']name["']\s*\]\s*=/.test(code) || /["']name["']\s*:/.test(code))
  );
}

function hasNpcDef(code: string): boolean {
  return /\bdef\s+npc\s*\(\s*[A-Za-z_]\w*\s*\)\s*:/.test(code);
}

function hasIfElifElse(code: string): boolean {
  return (
    /\n[ \t]+if\s+/.test(code) &&
    /\n[ \t]+elif\s+/.test(code) &&
    /\n[ \t]+else\s*:/.test(code)
  );
}

function usesNameMemory(code: string): boolean {
  return /npc_memory\[\s*["']name["']\s*\]/.test(code);
}

function hasNpcCall(code: string): boolean {
  return /\bnpc\s*\(\s*.+\s*\)\s*/.test(code);
}

function usesPlayerText(code: string): boolean {
  return /\bplayer_text\s*=/.test(code) && !/\binput\s*\(/.test(code);
}

function npcCapstoneValid(code: string, run: MiniRunResult): boolean {
  if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
  if (!hasNpcMemory(code)) return false;
  if (!hasNpcDef(code)) return false;
  if (!hasIfElifElse(code)) return false;
  if (!usesNameMemory(code)) return false;
  if (!hasNpcCall(code)) return false;
  if (!hasNoLists(code)) return false;
  return run.stdout.length >= 1;
}

export const lesson13: PythonLessonConfig = {
  id: "lesson-13",
  title: "13. Build Your AI NPC",
  goal: "Modify a rule-based NPC, add memory, and explain which rule ran — like a real game AI builder.",
  xpReward: 700,
  badge: "Designer",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
  prevHref: "/learn/12",
  nextHref: "/learn/14",
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
  lessonModule: {
    durationLabel: "~9 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll build today",
        body: `This is the capstone — the project where *everything* you've learned comes together. You'll build an **NPC** (a non-player character) for an adventure game: a character the computer controls and that talks back to the player.\n\nHere's your roadmap for this lesson:\n\n• Combining **everything**: variables, input, dictionaries, functions, and rules.\n• Building an NPC with a memory profile (\`npc_memory\`).\n• Using \`if\` / \`elif\` / \`else\` to react to what the player says.\n• Reading memory back to give your NPC real personality.\n\nBy the end, you won't just be writing code — you'll be *designing behavior*.`,
        image: "/images/lessons/py-13-npc.png",
        imageAlt: "A friendly game character (NPC) standing in a fantasy adventure scene",
        callout: {
          label: "Why it matters",
          text: "Every shopkeeper, quest-giver, and sidekick in a video game is an NPC — driven entirely by rules and memory a designer wrote. By the end of this lesson, *you're* that designer.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "Your NPC isn't magic — it's rules",
        body: `An **NPC** is a game character the computer controls: the blacksmith who sells you armor, the wizard who hands you a quest, the villager who waves as you pass.\n\nHere's the secret: your NPC isn't actually "smart." It follows the **rules you write** and uses the **memory you give it**. When it greets a player by name or offers a quest, that's your code running — not magic.\n\nYou'll build it using *every* skill from this track: variables, input, rules, dictionaries, and functions. You're the designer.`,
        callout: {
          label: "Common misconception",
          text: "An NPC doesn't understand language the way you do. It scans the player's words for keywords it was told to look for, then runs the matching rule. Clever rules make it *feel* smart.",
        },
      },
      {
        id: "loop",
        kicker: "The design",
        title: "Input → Rules → Memory → Output",
        body: `Almost every NPC — and every chatbot — follows the same four-step loop:\n\n• **Input** — what the player says.\n• **Rules** — \`if\` / \`elif\` / \`else\` decide how to react.\n• **Memory** — a dictionary (\`npc_memory\`) holds the character's profile.\n• **Output** — what the NPC says back.\n\nToday you'll test by setting a variable like \`player_text = "hello"\` instead of using \`input()\`, so you can try different messages quickly.`,
        code: `npc_memory = {"name": "Sir Alex", "class": "knight"}\n\ndef npc(player_input):\n    if "hello" in player_input.lower():\n        print("Greetings! I am " + npc_memory["name"] + ".")\n    elif "quest" in player_input.lower():\n        print("Seek the lost crown in the northern caves!")\n    else:\n        print("I do not understand, traveler.")`,
        codeCaption: "An NPC brain: memory + rules",
        output: `npc("hello")  ->  Greetings! I am Sir Alex.\nnpc("any quest?")  ->  Seek the lost crown in the northern caves!`,
        callout: {
          label: "Watch out",
          text: "The rules run **top to bottom**. The first matching branch wins and the rest are skipped — so put your most specific rules first and your `else` fallback last.",
        },
      },
      {
        id: "keywords",
        kicker: "Building block",
        title: "Match keywords with in and .lower()",
        body: `How does the NPC tell what the player wants? It looks for **keywords**. The phrase \`"hello" in player_input.lower()\` asks: *does the player's message contain the word hello?*\n\nTwo helpers make this reliable:\n\n• \`in\` checks whether one piece of text appears inside another.\n• \`.lower()\` converts the message to all-lowercase first, so \`"HELLO"\`, \`"Hello"\`, and \`"hello"\` all match.\n\nWithout \`.lower()\`, a player who types \`"Hello"\` with a capital H might slip right past a rule looking for \`"hello"\`.`,
        callout: {
          label: "Pro tip",
          text: "Always lowercase the player's input before checking keywords. Players type in all kinds of ways, and `.lower()` makes your rules forgiving.",
        },
      },
      {
        id: "memory",
        kicker: "Personalize it",
        title: "Use memory in your messages",
        body: `Because the character's profile lives in \`npc_memory\`, your NPC can speak with real personality — dropping its stored name, class, or home town right into its lines.\n\nYou read a value back with its **key**, exactly like you learned with dictionaries: \`npc_memory["name"]\` gives you the stored name. Join it into a sentence with \`+\` and your NPC sounds alive.\n\nKeep the profile small and purposeful — store only what the character actually needs.`,
        bullets: [
          "Store the profile in a dictionary: `npc_memory[\"name\"]`.",
          "Use `elif` to add more special responses.",
          "Always ask while testing: **which rule ran, and why?**",
          "Keep memory **minimal** — store only what the character needs.",
        ],
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Assemble an NPC brain, step by step",
        body: `Let's assemble a complete NPC brain, piece by piece.\n\n**Step 1 — Build memory.** Store the character's profile in \`npc_memory\` with keys like \`name\` and \`class\`.\n\n**Step 2 — Define the NPC.** Make a function \`npc(player_input)\` that takes what the player says.\n\n**Step 3 — Add rules.** Use \`if\` / \`elif\` / \`else\` to react to keywords, pulling from memory for personality.\n\n**Step 4 — Test it.** Set \`player_text\` to a message and call \`npc()\` to see which rule runs.`,
        code: `# Step 1: the character's memory\nnpc_memory = {"name": "Sir Alex", "class": "knight"}\n\n# Steps 2 & 3: the NPC brain with rules\ndef npc(player_input):\n    if "hello" in player_input.lower():\n        print("Greetings! I am " + npc_memory["name"] + ".")\n    elif "quest" in player_input.lower():\n        print("Seek the lost crown in the northern caves!")\n    else:\n        print("I do not understand, traveler.")\n\n# Step 4: test a message\nplayer_text = "hello"\nnpc(player_text)`,
        codeCaption: "The full NPC, with comments explaining each step",
        output: `Greetings! I am Sir Alex.`,
        callout: {
          label: "Pro tip",
          text: "When you test, always ask: **which rule ran, and why?** Being able to explain that is what separates a real AI builder from someone just guessing.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You're ready to build. You'll combine **memory** (\`npc_memory\`), a **function** (\`npc\`), and **rules** (\`if\` / \`elif\` / \`else\`) — every tool from this track in one project.\n\nIn the exercises you'll fill in a guided NPC, test it with different messages, then rebuild your own from scratch — adding memory and a helpful fallback. Real AI builders can always explain which rule ran and why.\n\nClick **Start the exercises** to build your NPC.`,
        callout: {
          label: "Responsible AI",
          text: "Rules are limits that keep behavior safe. Store only necessary memory, avoid sensitive info, and test your rules with many different inputs.",
        },
      },
    ],
  },
  exercises: [
    {
      id: "ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill in the NPC",
      focusCommand: "npc_memory + if/elif/else",
      commandExplain:
        "Complete the memory profile, keywords, fallback, and test message. Use player_text — not input().",
      goal: "Fill blanks so the NPC has memory, three rule branches, and a test call.",
      starterCode: `# Fill in the blanks 👇
npc_memory = {
    "name": "____",
    "class": "____",
    "home": "____"
}

def npc(player_input):
    if "____" in player_input.lower():
        print("Welcome, " + npc_memory["name"] + "!")
    elif "____" in player_input.lower():
        print("A quest, you say? I'll remember this.")
    else:
        print("____")

player_text = "____"
npc(player_text)
`,
      hint: 'Try name "Alex", keywords "hello" and "quest", a helpful else message, and player_text = "hello".',
      successMessage: "NPC brain online — memory, rules, and a test call!",
      failureMessage:
        "Need npc_memory with name, def npc with if/elif/else, npc_memory[\"name\"], player_text, and npc(...).",
      solutionCode: `npc_memory = {
    "name": "Alex",
    "class": "knight",
    "home": "Riverdale"
}

def npc(player_input):
    if "hello" in player_input.lower():
        print("Welcome, " + npc_memory["name"] + "!")
    elif "quest" in player_input.lower():
        print("A quest, you say? I'll remember this.")
    else:
        print("I do not understand, traveler.")

player_text = "hello"
npc(player_text)
`,
      validate: (code: string, run: MiniRunResult) => {
        if (!usesPlayerText(code)) return false;
        return npcCapstoneValid(code, run);
      },
    },
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder the NPC",
      focusCommand: "memory + rules + call",
      commandExplain:
        "Scrambled NPC pieces. Put memory, rules, player_text, and the call in working order.",
      goal: "Reorder into a complete NPC that greets using memory.",
      starterCode: "",
      parsonsLines: [
        'npc_memory = {"name": "Alex", "class": "knight"}',
        "def npc(player_input):",
        '    if "hello" in player_input.lower():',
        '        print("Welcome, " + npc_memory["name"] + "!")',
        '    elif "quest" in player_input.lower():',
        '        print("A quest, you say? I\'ll remember this.")',
        "    else:",
        '        print("I do not understand, traveler.")',
        'player_text = "hello"',
        "npc(player_text)",
      ],
      hint: "Memory first, then def npc with if/elif/else, then player_text and npc(player_text).",
      successMessage: "Order works — your NPC greets from memory.",
      failureMessage: "Need npc_memory, if/elif/else inside npc, player_text, and npc(...).",
      solutionCode: `npc_memory = {"name": "Alex", "class": "knight"}
def npc(player_input):
    if "hello" in player_input.lower():
        print("Welcome, " + npc_memory["name"] + "!")
    elif "quest" in player_input.lower():
        print("A quest, you say? I'll remember this.")
    else:
        print("I do not understand, traveler.")
player_text = "hello"
npc(player_text)`,
      validate: (code: string, run: MiniRunResult) => {
        if (!usesPlayerText(code)) return false;
        return npcCapstoneValid(code, run);
      },
    },
    {
      id: "ex-debug",
      kind: "debug",
      title: "Exercise 3 — Debug the NPC",
      focusCommand: "elif + else",
      commandExplain:
        "This NPC is missing a branch and uses input(). Fix it to use if/elif/else and player_text.",
      goal: "Add elif, keep else, and test with player_text (no input()).",
      starterCode: `npc_memory = {"name": "Alex", "class": "knight"}

def npc(player_input):
    if "hello" in player_input.lower():
        print("Welcome, " + npc_memory["name"] + "!")
    else:
        print("I do not understand, traveler.")

player_text = input("What do you say? ")
npc(player_text)
`,
      debugHint: "missing elif / no input()",
      hint: 'Add an elif for "quest", and set player_text = "hello" instead of input().',
      successMessage: "Fixed — full if/elif/else rules and a player_text test.",
      failureMessage:
        "Need if, elif, and else inside npc(), plus player_text = \"...\" (no input()).",
      solutionCode: `npc_memory = {"name": "Alex", "class": "knight"}

def npc(player_input):
    if "hello" in player_input.lower():
        print("Welcome, " + npc_memory["name"] + "!")
    elif "quest" in player_input.lower():
        print("A quest, you say? I'll remember this.")
    else:
        print("I do not understand, traveler.")

player_text = "hello"
npc(player_text)
`,
      validate: (code: string, run: MiniRunResult) => {
        if (!usesPlayerText(code)) return false;
        return npcCapstoneValid(code, run);
      },
    },
    {
      id: "ex-predict",
      kind: "predict",
      title: "Exercise 4 — Predict which rule",
      focusCommand: "trace if/elif/else",
      commandExplain: 'If player_text is "hello", which exact line prints?',
      goal: "Predict the greeting that uses npc_memory.",
      starterCode: `npc_memory = {"name": "Alex", "class": "knight"}

def npc(player_input):
    if "hello" in player_input.lower():
        print("Welcome, " + npc_memory["name"] + "!")
    elif "quest" in player_input.lower():
        print("A quest, you say? I'll remember this.")
    else:
        print("I do not understand, traveler.")

player_text = "hello"
npc(player_text)
`,
      codeReadOnly: true,
      predictionPrompt: "What exact line prints?",
      acceptedPredictions: [
        "Welcome, Alex!",
        "welcome, alex!",
        "Welcome, Alex",
      ],
      hint: '"hello" matches the if rule, and npc_memory["name"] is Alex.',
      successMessage: "You traced which rule ran — and why.",
      failureMessage: "The hello keyword hits the if branch and uses the stored name.",
      solutionCode: `npc_memory = {"name": "Alex", "class": "knight"}

def npc(player_input):
    if "hello" in player_input.lower():
        print("Welcome, " + npc_memory["name"] + "!")
    elif "quest" in player_input.lower():
        print("A quest, you say? I'll remember this.")
    else:
        print("I do not understand, traveler.")

player_text = "hello"
npc(player_text)
`,
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
        return run.stdout.join("\n").includes("Welcome, Alex!");
      },
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 5 — Build your AI NPC",
      focusCommand: "from scratch",
      commandExplain:
        "Build a full NPC: npc_memory profile, def npc with if/elif/else, use the name in a message, test with player_text. No lists, no input().",
      goal: "Write a complete rule-based NPC with dictionary memory.",
      starterCode: `# Build your AI NPC from scratch
# Use player_text = "..." (not input())
`,
      hint: 'npc_memory = {...}, def npc(...): with if/elif/else, print using npc_memory["name"], then player_text and npc(player_text).',
      successMessage: "Submitted! Your NPC uses memory, rules, and output — like game AI. 🎮",
      failureMessage:
        'Need npc_memory, def npc with if/elif/else, npc_memory["name"], player_text (no input()), npc(...), and no lists.',
      solutionCode: `npc_memory = {
    "name": "Alex",
    "class": "knight",
    "home": "Riverdale"
}

def npc(player_input):
    if "hello" in player_input.lower():
        print("Welcome, " + npc_memory["name"] + " the " + npc_memory["class"] + "!")
    elif "quest" in player_input.lower():
        print("A quest, you say? I'll remember this.")
    else:
        print("I do not understand, traveler. Try saying hello or quest.")

player_text = "hello"
npc(player_text)
`,
      validate: (code: string, run: MiniRunResult) => {
        if (!usesPlayerText(code)) return false;
        return npcCapstoneValid(code, run);
      },
    },
  ],
};
