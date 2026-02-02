"use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const lesson4: LessonConfig = {
  id: "lesson-4",
  title: "4. Smarter AI Rules",
  goal: "Use if / elif / else to make your AI follow multiple rules in order.",
  xpReward: 250,
  badge: "🧠 Rule Builder",
  assignmentTitle: "Your mission",
  assignmentBody:
    "In the scratch box, build an AI helper that asks for a name and responds with different messages for Alex, Jordan, and everyone else.",
  assignmentChecklist: [
    'Ask for a name using input("What is your name? ").',
    'Write an if rule: if name == "Alex":',
    'Add an elif rule: elif name == "Jordan":',
    "Add an else: for everyone else.",
    "Each rule prints a different message (indented).",
    'Test 3 runs: "Alex", "Jordan", and a different name.',
  ],
  starterCode: `# Fill in the blanks 👇
name = input("What is your name? ")

if name == "____":
    print("____")
elif name == "____":
    print("____")
else:
    print("____")
`,
  instructorScript:
    "Coach’s note:\nLast session, our AI helper could make a simple choice (if/else).\nToday, we’re going to teach it how to make **better choices** with more rules.\n\nNew tool: `elif` (else if)\n- Python checks rules from **top to bottom**.\n- The **first** rule that matches is the one that runs.\n- After a match happens, Python stops checking the rest.\n\nAI idea:\nAdding more rules can make an AI look “smarter”…\n…but it still follows human-defined logic.\nIf your rules are unclear or in the wrong order, the behavior can look wrong.\n\nCommon mistakes to watch for:\n- Missing colons (:) after if/elif/else\n- Indentation errors (print must be indented under each rule)\n- Using multiple if statements instead of elif (that can cause confusing behavior)\n\nHow to test like a teacher:\nRun it with Alex, Jordan, and one other name and confirm you get 3 different outputs.",
  kidExplain: [
    {
      title: "AI Concept: More rules can look smarter",
      text:
        "When you add more rules, your AI helper can handle more situations. That can make it feel smarter — but it’s still just following rules written by a human.",
    },
    {
      title: "elif = else if",
      text:
        "`elif` lets your program check more than two choices. It means: “if the first rule wasn’t true, try this next rule.”",
    },
    {
      title: "Rule order matters",
      text:
        "Python checks from top to bottom. The first rule that matches is the one that runs — so if you put a too-general rule first, it can block the rest.",
    },
    {
      title: "First matching rule runs",
      text:
        "If multiple rules *could* match, Python still runs only the first match. That’s why we design rules carefully.",
    },
  ],
  steps: [
    'Ask for a name: name = input("What is your name? ")',
    'Rule 1 (if): if name == "Alex": print a special message.',
    'Rule 2 (elif): elif name == "Jordan": print a different message.',
    "Catch-all (else): print a message for everyone else.",
    "Test multiple names and observe how rule order affects which message runs.",
  ],
  cfu: [
    {
      question: "What is the difference between if, elif, and else?",
      answer:
        "`if` is the first rule, `elif` are extra rules checked only if the earlier ones were False, and `else` is the fallback when none match.",
    },
    {
      question: "Why does rule order matter?",
      answer:
        "Because Python checks from top to bottom. The first matching rule runs and Python stops checking the rest.",
    },
    {
      question: "What happens if two rules could apply to the same input?",
      answer:
        "Python runs the first rule that matches and ignores the rest.",
    },
  ],
  tryThis: [
    "VIP rule (Easy): Add a VIP name that MUST appear first (top rule).",
    "Name length (Medium): Add a rule for short names (like 3 letters) vs long names.",
    "New input (Bonus): Instead of names, ask for a mood or favorite subject and build rules for it.",
  ],
  aiSafetyMoment:
    "Responsible AI: More rules can make an AI look smarter, but it still follows human logic. Poorly ordered or unclear rules can cause unintended behavior — the human is responsible.",
  editorPlaceholder:
    '# From scratch idea:\n# name = input("What is your name? ")\n# if name == "Alex":\n#     print("Welcome back, Alex!")\n# elif name == "Jordan":\n#     print("Hey Jordan, good to see you!")\n# else:\n#     print("Hello there!")\n',
  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/3",
  nextHref: "/learn/5",
  runtimeInputs: [
    {
      key: "name",
      label: 'Pretend you typed for: input("What is your name? ")',
      placeholder: "Alex",
      defaultValue: "Alex",
    },
  ],

  getRunOutput: (code, runtime) => {
    if (code.includes("Print(")) {
      return asTerminal("❌ Common mistake: print must be lowercase (print).");
    }

    const nameRaw = (runtime?.name ?? "").trim();
    if (!nameRaw) {
      return asTerminal('Type a name (like "Alex") in the input box, then press Run.');
    }

    const hasNameInput = /\bname\s*=\s*input\(/.test(code);
    const hasIfAlex = /\bif\s+name\s*==\s*["']Alex["']\s*:/.test(code);
    const hasElifJordan = /\belif\s+name\s*==\s*["']Jordan["']\s*:/.test(code);
    const hasElse = /\nelse\s*:/.test(code);
    const ifCount = (code.match(/\bif\s+name\s*==/g) ?? []).length;
    const hasElif = /\belif\b/.test(code);
    const hasIndentedPrintIf = /\bif\s+name\s*==[\s\S]*?\n[ \t]+print\(/.test(code);
    const hasIndentedPrintElif = /\belif\s+name\s*==[\s\S]*?\n[ \t]+print\(/.test(code);
    const hasIndentedPrintElse = /\nelse\s*:[^\n]*\n[ \t]+print\(/.test(code);

    if (!hasNameInput) return asTerminal('Add: name = input("What is your name? ")');
    if (!hasIfAlex) return asTerminal('Add Rule 1: if name == "Alex":  (don’t forget the colon!)');
    if (!hasElifJordan) return asTerminal('Add Rule 2: elif name == "Jordan":');
    if (!hasElse) return asTerminal("Add an else: for everyone else.");
    if (!hasIndentedPrintIf || !hasIndentedPrintElif || !hasIndentedPrintElse)
      return asTerminal("Make sure each rule has an indented print(...) line under it.");
    if (ifCount >= 2 && !hasElif) {
      return asTerminal(
        "Tip: Use elif for extra rules. If you use multiple separate if statements, your logic can become confusing."
      );
    }

    const lines: string[] = [];
    lines.push(`What is your name? ${nameRaw}`);
    if (nameRaw === "Alex") lines.push("Welcome back, Alex!");
    else if (nameRaw === "Jordan") lines.push("Hey Jordan, good to see you!");
    else lines.push("Hello there!");

    return asTerminal(lines.join("\n"));
  },

  computeProgressPercent: (code, submitted) => {
    const hasNameInput = /\bname\s*=\s*input\(/.test(code);
    const hasIfAlex = /\bif\s+name\s*==\s*["']Alex["']\s*:/.test(code);
    const hasElifJordan = /\belif\s+name\s*==\s*["']Jordan["']\s*:/.test(code);
    const hasElse = /\nelse\s*:/.test(code);
    const hasIndentedPrintIf = /\bif\s+name\s*==[\s\S]*?\n[ \t]+print\(/.test(code);
    const hasIndentedPrintElif = /\belif\s+name\s*==[\s\S]*?\n[ \t]+print\(/.test(code);
    const hasIndentedPrintElse = /\nelse\s*:[^\n]*\n[ \t]+print\(/.test(code);

    const checks = [
      hasNameInput,
      hasIfAlex,
      hasElifJordan,
      hasElse,
      hasIndentedPrintIf,
      hasIndentedPrintElif,
      hasIndentedPrintElse,
    ];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) =>
    /\bname\s*=\s*input\(/.test(code) &&
    /\bif\s+name\s*==\s*["']Alex["']\s*:/.test(code) &&
    /\belif\s+name\s*==\s*["']Jordan["']\s*:/.test(code) &&
    /\nelse\s*:/.test(code) &&
    /\bif\s+name\s*==[\s\S]*?\n[ \t]+print\(/.test(code) &&
    /\belif\s+name\s*==[\s\S]*?\n[ \t]+print\(/.test(code) &&
    /\nelse\s*:[^\n]*\n[ \t]+print\(/.test(code) &&
    !code.includes("Print("),

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! Your AI follows smarter rules in order. 🎯")
      : asTerminal(
          '❌ Almost! Make sure you have name = input(...), if/elif/else rules (with colons), and indented print() lines under each rule. Also check print is lowercase.'
        ),
};

export default function Lesson4Page() {
  return <LessonCanvas lesson={lesson4} />;
}

