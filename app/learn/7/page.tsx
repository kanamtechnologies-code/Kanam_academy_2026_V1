"use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const lesson7: LessonConfig = {
  id: "lesson-7",
  title: "7. AI Notices Patterns",
  goal: "Use a loop + a changing value to create a pattern you can predict.",
  xpReward: 400,
  badge: "🧠 Pattern Spotter",

  assignmentTitle: "Your mission",
  assignmentBody:
    "In the scratch box, build a loop that runs 5 times and prints a predictable pattern (like ping/pong).",
  assignmentChecklist: [
    "Start a for loop that runs 5 times using range(5).",
    "Use an if/else INSIDE the loop to change what prints each time.",
    "Press [[Run]] and check if the output matches your prediction.",
  ],

  starterCode: `# Fill in the blanks 👇
message = "____"

for i in range(5):
    if message == "____":
        print("____")
        message = "____"
    else:
        print("____")
        message = "____"
`,

  instructorScript:
    "Coach’s note:\nPatterns happen when you repeat a ==rule== inside a ==loop==.\nToday your job is to make a pattern you can ==predict== before pressing [[Run]].\n\nBig idea:\n- The ==loop== controls how many times we repeat.\n- The ==rule== controls what happens each time.\n\nMini goal:\nMake the output switch back and forth (like ping → pong → ping → pong…).",

  kidExplain: [
    {
      title: "Pattern",
      text: "A pattern is something that repeats in a predictable way.",
    },
    {
      title: "Prediction",
      text: "Predicting output helps you understand the logic before you run the program.",
    },
    {
      title: "Loop + Rule",
      text: "When an `if` is inside a `for` loop, the rule is checked every iteration.",
    },
  ],

  steps: [
    "Set a starting value (like message = \"ping\").",
    "Start a for loop with `range(5)`.",
    "Inside the loop, check a condition using if/else.",
    "Print one message for True and a different message for False.",
    "Update the value so the next loop run behaves differently.",
  ],

  cfu: [
    {
      question: "What makes the pattern happen in this program?",
      answer: "The loop repeats and the rule changes what happens each time — together they create the pattern.",
    },
    {
      question: "What is one iteration?",
      answer: "One single run through the loop (one turn).",
    },
    {
      question: "Why should you predict output before pressing Run?",
      answer: "It helps you learn the logic instead of guessing.",
    },
  ],

  tryThis: [
    "Print the loop number too (use i).",
    "Change ping/pong into two different words.",
    "Make a 3-step pattern by adding an elif rule.",
  ],

  aiSafetyMoment:
    "AI safety: pattern-based systems can look smart, but they only repeat patterns they were taught. If the pattern is wrong or biased, the output will be wrong too.",

  editorPlaceholder:
    '# From scratch idea:\n# message = "ping"\n# for i in range(5):\n#     if message == "ping":\n#         print("ping")\n#         message = "pong"\n#     else:\n#         print("pong")\n#         message = "ping"\n',

  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/6",
  nextHref: "/learn/8",

  getRunOutput: () => asTerminal("Press Run to execute your loop and see the pattern."),

  computeProgressPercent: (code, submitted) => {
    const hasFor5 = /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:\s*/.test(code);
    const hasIf = /\bif\b/.test(code);
    const hasElse = /\belse\s*:/.test(code);
    const hasIndentedPrint = /\bfor[\s\S]*?\n[ \t]+print\(/.test(code);
    const changesValue = /\b=\s*["'][^"']+["']/.test(code);
    const checks = [hasFor5, hasIf, hasElse, hasIndentedPrint, changesValue];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) =>
    /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:\s*/.test(code) &&
    /\bfor[\s\S]*?\n[ \t]+if\s+.+:\s*/.test(code) &&
    /\bfor[\s\S]*?\n[ \t]+else\s*:\s*/.test(code) &&
    /\bfor[\s\S]*?\n[ \t]+[ \t]+print\(/.test(code) &&
    !code.includes("Print("),

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! You built a predictable pattern with loops + rules. 🌟")
      : asTerminal(
          "❌ Almost! Make sure you have a for loop with range(5), an if/else inside the loop, and indented print() lines. Also check print is lowercase."
        ),
};

export default function Lesson7Page() {
  return <LessonCanvas lesson={lesson7} />;
}

