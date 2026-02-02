"use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

const lesson6: LessonConfig = {
  id: "lesson-6",
  title: "6. Patterns and Predictions",
  goal: "Combine a loop + a rule to create a predictable pattern.",
  xpReward: 350,
  badge: "🔍 Pattern Finder",

  assignmentTitle: "Your mission",
  assignmentBody:
    "In the scratch box, build a program that repeats 5 times and prints two different messages by checking a rule inside the loop.",
  assignmentChecklist: [
    "Start a for loop that runs 5 times using range(5).",
    "Put an if statement INSIDE the loop (so it checks every loop run).",
    "Print one message if the rule is true and a different message if it is false.",
    "Press [[Run]] and compare the output to your prediction.",
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
    "Coach’s note:\nYour bot can already repeat actions using a ==loop==.\nNow we’re adding ==rules== inside the loop.\nThis is how ==patterns== are created.\n\nA pattern is what happens when the same rule is checked again and again.\n\nHere’s how to think like a coder today:\nThe ==loop== controls how many times something happens.\nThe ==rule== controls what happens each time.\nTogether, they create a ==pattern==.\n\nTwo super common mistakes (and how to fix them):\nRule placement: If the rule is outside the loop, it only runs once.\nPrediction: Always try to ==predict== what will print before pressing [[Run]].\n\nMini goal:\nMake your bot print different messages by checking a rule inside a loop.\nRead the steps, fill the blanks, then press [[Run]].",

  kidExplain: [
    {
      title: "What is a Pattern?",
      text:
        "A **pattern** is something that repeats in a predictable way. In code, patterns come from repeating rules inside loops.",
    },
    {
      title: "Loops + Rules",
      text:
        "When you put an `if` statement inside a loop, the rule is checked every time the loop runs. This is how programs create patterns.",
    },
    {
      title: "Prediction",
      text:
        "Good coders don’t just run code — they **predict** what will happen first, then compare the output to their prediction.",
    },
  ],

  steps: [
    "Start a for loop that runs 5 times using `range(5)`.",
    "Inside the loop, use an if statement to check a condition.",
    "Print one message if the condition is true and a different message if it is false.",
    "Press [[Run]] and read the console carefully.",
    "Common mistake: If your output doesn’t change, make sure your rule is inside the loop.",
  ],

  cfu: [
    {
      question: "What creates a pattern in this program — the loop, the rule, or both?",
      answer:
        "Both. The loop repeats, and the rule decides what happens each time. Together they create the pattern.",
    },
    {
      question: "Why is it helpful to predict the output before pressing Run?",
      answer:
        "Because it helps you understand the logic. You learn faster when you compare your prediction to the real output.",
    },
    {
      question: "What happens if the rule is placed outside the loop?",
      answer: "It only runs once, so the output won’t form a repeating pattern.",
    },
  ],

  tryThis: [
    "Change the rule so the message changes every other loop run.",
    "Print the loop number along with the message (use the loop variable).",
    "Create your own pattern using a different rule (different words or a different condition).",
  ],

  aiSafetyMoment:
    "AI safety: AI systems often use patterns to make predictions. If the pattern is biased or incomplete, the AI’s output will also be biased or incorrect. Humans must think carefully about the patterns they create.",

  editorPlaceholder:
    '# From scratch idea:\n# message = "ping"\n# for i in range(5):\n#     if message == "ping":\n#         print("ping")\n#         message = "pong"\n#     else:\n#         print("pong")\n#         message = "ping"\n',

  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/5",
  nextHref: "/learn/7",

  getRunOutput: () => {
    // Required field; the LessonCanvas runner will execute the code.
    return asTerminal("Press Run to execute your loop and see the pattern in the output.");
  },

  computeProgressPercent: (code, submitted) => {
    const hasFor5 = /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:\s*/.test(code);
    const hasIfInsideFor =
      /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:[\s\S]*?\n[ \t]+if\s+.+:\s*/.test(code);
    const hasElseInsideFor = /\bfor[\s\S]*?\n[ \t]+else\s*:\s*/.test(code);
    const hasIndentedPrintIf =
      /\bfor[\s\S]*?\n[ \t]+if[\s\S]*?\n[ \t]+[ \t]+print\(/.test(code);
    const hasIndentedPrintElse =
      /\bfor[\s\S]*?\n[ \t]+else\s*:\s*\n[ \t]+[ \t]+print\(/.test(code);

    const checks = [hasFor5, hasIfInsideFor, hasElseInsideFor, hasIndentedPrintIf, hasIndentedPrintElse];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) =>
    /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:\s*/.test(code) &&
    /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:[\s\S]*?\n[ \t]+if\s+.+:\s*/.test(code) &&
    /\bfor[\s\S]*?\n[ \t]+else\s*:\s*/.test(code) &&
    /\bfor[\s\S]*?\n[ \t]+if[\s\S]*?\n[ \t]+[ \t]+print\(/.test(code) &&
    /\bfor[\s\S]*?\n[ \t]+else\s*:\s*\n[ \t]+[ \t]+print\(/.test(code) &&
    !code.includes("Print("),

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! You combined a loop + a rule to create a pattern. 🌟")
      : asTerminal(
          "❌ Almost! Make sure you have a for loop with range(5), an if/else INSIDE the loop, and indented print(...) lines under both paths. Also check print is lowercase."
        ),
};

export default function Lesson6Page() {
  return <LessonCanvas lesson={lesson6} />;
}

