import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

const FOR_RANGE5 = /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:\s*/;
const IF_INSIDE_FOR =
  /\bfor\s+[A-Za-z_]\w*\s+in\s+range\s*\(\s*5\s*\)\s*:[\s\S]*?\n[ \t]+if\s+.+:\s*/;
const ELSE_INSIDE_FOR = /\bfor[\s\S]*?\n[ \t]+else\s*:\s*/;
const PRINT_IN_IF =
  /\bfor[\s\S]*?\n[ \t]+if[\s\S]*?\n[ \t]+[ \t]+print\(/;
const PRINT_IN_ELSE =
  /\bfor[\s\S]*?\n[ \t]+else\s*:\s*\n[ \t]+[ \t]+print\(/;

function noRunError(run: MiniRunResult): boolean {
  return !run.error;
}

export const lesson6: PythonLessonConfig = {
  id: "lesson-6",
  title: "6. Patterns and Predictions",
  goal: "Combine a loop + a rule to create a predictable pattern.",
  xpReward: 350,
  badge: "🔍 Pattern Finder",
  instructorScript:
    "**Coach’s note**:\nYour bot can already repeat actions using a ==loop==.\nNow we’re adding ==rules== inside the loop.\nThis is how ==patterns== are created.\n\nA pattern is what happens when the same rule is checked again and again.\n\nHere’s how to think like a coder today:\nThe ==loop== controls how many times something happens.\nThe ==rule== controls what happens each time.\nTogether, they create a ==pattern==.\n\nTwo super common mistakes (and how to fix them):\nRule placement: If the rule is outside the loop, it only runs once.\nPrediction: Always try to ==predict== what will print before pressing [[Run]].\n\n**Mini goal**:\nMake your bot print different messages by checking a rule inside a loop.\nRead the steps, fill the blanks, then press [[Run]].",
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
  commandReference: [
    {
      command: "for ... in range(5):",
      summary: "Repeats the indented block 5 times — the engine that drives a pattern.",
      example: "for i in range(5):",
    },
    {
      command: "if ... : / else:",
      summary:
        "Checks a rule each loop turn. True runs the if block; False runs the else block.",
      example: 'if message == "ping":',
    },
    {
      command: "==",
      summary: "Compares two values for equality. Use == inside if, not = (which assigns).",
      example: 'message == "ping"',
    },
    {
      command: "Variable update",
      summary:
        "Changing a variable inside the loop makes the next iteration behave differently.",
      example: 'message = "pong"',
    },
  ],
  prevHref: "/learn/5",
  nextHref: "/learn/7",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
  exercises: [
    {
      id: "ex-loop",
      title: "Exercise 1 — Loop 5 times",
      focusCommand: "for",
      commandExplain:
        "Start with a simple for loop. range(5) repeats the indented block 5 times.",
      goal: "Fill in range(5) and a message so the loop prints 5 identical lines.",
      starterCode: `for i in range(____):
    print("tick")`,
      hint: "Use range(5) for five repeats.",
      successMessage: "Your loop ran 5 times — that's the repeat engine for patterns.",
      failureMessage: "Use for i in range(5): with an indented print(...) — expect 5 lines.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        FOR_RANGE5.test(code) &&
        /\bfor[\s\S]*?\n[ \t]+print\(/.test(code) &&
        run.stdout.length === 5,
    },
    {
      id: "ex-if-inside",
      title: "Exercise 2 — Rule inside the loop",
      focusCommand: "if",
      commandExplain:
        "Put an if INSIDE the for loop so the rule is checked every iteration.",
      goal: "Add an if that checks message == \"ping\" and prints inside the if block.",
      starterCode: `message = "ping"

for i in range(5):
    if message == "____":
        print("ping")`,
      hint: 'Fill the blank with ping to match message = "ping"',
      successMessage: "Rule inside the loop — checked every iteration!",
      failureMessage:
        'Need if message == "ping": with an indented print(...) inside the for loop.',
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        FOR_RANGE5.test(code) &&
        IF_INSIDE_FOR.test(code) &&
        PRINT_IN_IF.test(code) &&
        run.stdout.length === 5 &&
        run.stdout.every((line) => line === "ping"),
    },
    {
      id: "ex-else-inside",
      title: "Exercise 3 — Add else for two paths",
      focusCommand: "else",
      commandExplain:
        "else gives a second path when the if condition is False — two different messages per loop.",
      goal: "Add an else branch that prints a different message when message is not ping.",
      starterCode: `message = "ping"

for i in range(5):
    if message == "ping":
        print("ping")
        message = "pong"
    else:
        print("____")
        message = "ping"`,
      hint: 'Type pong in the else print blank',
      successMessage: "Two paths inside the loop — your pattern is taking shape!",
      failureMessage:
        "Need if/else both inside the for loop, each with an indented print(...).",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        FOR_RANGE5.test(code) &&
        IF_INSIDE_FOR.test(code) &&
        ELSE_INSIDE_FOR.test(code) &&
        PRINT_IN_IF.test(code) &&
        PRINT_IN_ELSE.test(code) &&
        run.stdout.length === 5,
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Build the ping/pong pattern",
      focusCommand: "for + if/else",
      commandExplain:
        "Combine loop + rule + variable updates to create a predictable ping/pong pattern.",
      goal: "Fill in the blanks to make a ping/pong pattern that prints 5 alternating lines.",
      starterCode: `# Fill in the blanks 👇
message = "____"

for i in range(5):
    if message == "____":
        print("____")
        message = "____"
    else:
        print("____")
        message = "____"`,
      hint: 'Try message = "ping", then alternate ping and pong in the if/else blocks.',
      previewOutput: "ping\npong\nping\npong\nping",
      successMessage: "You combined a loop + a rule to create a pattern. 🌟",
      failureMessage:
        "Need for range(5), if/else INSIDE the loop, indented prints under both paths, and 5 output lines.",
      validate: (code, run) =>
        !rejectsUppercasePrint(code) &&
        noRunError(run) &&
        FOR_RANGE5.test(code) &&
        IF_INSIDE_FOR.test(code) &&
        ELSE_INSIDE_FOR.test(code) &&
        PRINT_IN_IF.test(code) &&
        PRINT_IN_ELSE.test(code) &&
        run.stdout.length === 5 &&
        run.stdout.filter((line) => line === "ping" || line === "pong").length === 5,
    },
  ],
};
