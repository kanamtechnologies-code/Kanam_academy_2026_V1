import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function getDefWithParam(code: string): { fn?: string; param?: string } {
  const m = code.match(/\bdef\s+([A-Za-z_]\w*)\s*\(\s*([A-Za-z_]\w*)\s*\)\s*:/);
  return { fn: m?.[1], param: m?.[2] };
}

function uniqueCallArgs(code: string, fn: string): Set<string> {
  const callRe = new RegExp(`^[ \\t]*${fn}\\s*\\(\\s*(["'])(.*?)\\1\\s*\\)\\s*$`, "gm");
  return new Set(Array.from(code.matchAll(callRe)).map((m) => m[2].trim()));
}

export const lesson12: PythonLessonConfig = {
  id: "lesson-12",
  title: "12. Guiding AI with Rules",
  goal: "Use if/else rules inside a function to control behavior based on the parameter.",
  xpReward: 650,
  badge: "🛡️ Rule Guide",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
  prevHref: "/learn/11",
  nextHref: "/learn/13",
  instructorScript:
    "**Coach's note**\nRead this first — it explains the goal + how to think about the code.\n**Coach's note**:\nThink about a video game enemy.\n\nA good game doesn't let enemies attack all the time.\nInstead, the game follows rules like:\n\n- If the player is close → attack\n- Else → wait\n\nThat's exactly how AI rules work.\n\nWe already know how to make a function and pass information into it.\nNow we're adding rules **inside the function** to control behavior.\n\nHere's a simple example:\n```\ndef attack(enemy):\n    if enemy == \"dragon\":\n        print(\"This enemy is too strong! Run!\")\n    else:\n        print(\"You attack the \" + enemy + \"!\")\n```\n\nSame function.\nSame parameter.\nDifferent behavior — because of rules.\n\nHere's how to think like a coder today:\n\n- Parameters give information\n- Rules decide what to do with that information\n- The function follows rules exactly — no guessing\n\n**Mini goal**:\nCreate a function that responds differently based on rules you define.\nRead the steps, follow them in order, then press [[Run]].",
  commandReference: [
    {
      command: 'if enemy == "dragon":',
      summary: "Checks a condition. If true, the indented block below runs.",
      example: 'if enemy == "dragon":',
    },
    {
      command: "else:",
      summary: "Runs when the if condition is false — covers all other cases.",
      example: "else:",
    },
    {
      command: "indented print(...)",
      summary: "Each branch needs its own indented print so output changes with the rule.",
      example: '    print("Run!")',
    },
  ],
  kidExplain: [
    {
      title: "What is a Rule?",
      text:
        "A rule checks if something is true or false. In Python, rules are written using `if` and `else`.",
    },
    {
      title: "Rules guide AI behavior",
      text:
        "AI doesn't decide what's right or wrong. Humans write rules that limit and guide behavior.",
    },
    {
      title: "Predict first",
      text:
        "Before you press Run, try to predict which rule will run. That's how coders think.",
    },
  ],
  steps: [
    "Create a function with one parameter.",
    "Add an `if` statement that checks the parameter.",
    "Print one message if the condition is true.",
    "Add an `else` message for all other cases.",
    "Call the function with different values.",
    "Predict the output before pressing Run.",
    "Common mistake: If the same message prints every time, check your condition.",
  ],
  cfu: [
    {
      question: "Why does the function behave differently for different inputs?",
      answer:
        "Because the `if/else` rules check the parameter value, and different values can match different rules.",
    },
    {
      question: "Who decides the rules — the program or the human?",
      answer: "The human. The program follows the rules exactly as written.",
    },
    {
      question: "What could go wrong if rules are missing or unclear?",
      answer:
        "The system might do the wrong action, act at the wrong time, or behave in unsafe/unhelpful ways because it has no clear limits.",
    },
  ],
  tryThis: [
    "Add a second rule using `elif` (example: a special message for `\"boss\"`).",
    "Rewrite one message to sound more helpful and safe.",
    "Challenge: Explain how rules protect users from bad behavior.",
  ],
  aiSafetyMoment:
    "AI safety: AI systems can act fast — but only based on their rules. If rules are missing or poorly written, AI can behave incorrectly or cause harm. Responsible AI means setting clear limits, thinking about consequences, and testing rules carefully.",
  exercises: [
    {
      id: "ex-fn-param",
      title: "Exercise 1 — Function with parameter",
      focusCommand: "def attack(enemy):",
      commandExplain:
        "Start with a function that accepts one parameter — rules will check that value.",
      goal: "Define a function with one parameter.",
      starterCode: `# Fill in the blank 👇
def attack(____):
    print("Ready to fight!")
`,
      hint: "Use enemy as the parameter name to match the lesson examples.",
      successMessage: "Function ready! Next you'll add rules inside it.",
      failureMessage: "Define def attack(enemy): with one parameter.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        const { fn, param } = getDefWithParam(code);
        return Boolean(fn && param) && run.stdout.length >= 1;
      },
    },
    {
      id: "ex-if-rule",
      title: "Exercise 2 — Add an if rule",
      focusCommand: 'if enemy == "dragon":',
      commandExplain:
        "Put an if rule inside the function that checks the parameter with ==.",
      goal: "Add an if rule inside your function that checks the parameter.",
      starterCode: `# Fill in the blank 👇
def attack(enemy):
    if enemy == "____":
        print("This enemy is too strong! Run!")
`,
      hint: 'Check for a special enemy like "dragon".',
      successMessage: "Rule added! The function can now branch on the parameter.",
      failureMessage: 'Add if enemy == "something": with an indented print inside the function.',
      validate: (code: string) => {
        if (rejectsUppercasePrint(code)) return false;
        const { fn, param } = getDefWithParam(code);
        if (!fn || !param) return false;
        return new RegExp(
          `\\bdef\\s+${fn}\\s*\\(\\s*${param}\\s*\\)\\s*:[\\s\\S]*?\\n[ \\t]+if\\s+\\b${param}\\b\\s*==\\s*["'][^"']+["']\\s*:\\s*\\n[ \\t]+print\\(`
        ).test(code);
      },
    },
    {
      id: "ex-else-rule",
      title: "Exercise 3 — Add else",
      focusCommand: "else:",
      commandExplain:
        "else handles every case the if didn't match. Both branches should print different messages.",
      goal: "Add an else branch with its own print inside the function.",
      starterCode: `# Fill in the blank 👇
def attack(enemy):
    if enemy == "dragon":
        print("This enemy is too strong! Run!")
    else:
        print("____")
`,
      hint: 'Try print("You attack the " + enemy + "!")',
      successMessage: "Both branches ready! Your function follows rules now.",
      failureMessage: "Add else: with an indented print(...) under it inside the function.",
      validate: (code: string) => {
        if (rejectsUppercasePrint(code)) return false;
        const { fn, param } = getDefWithParam(code);
        if (!fn || !param) return false;
        const hasIfBranch = new RegExp(
          `\\bdef\\s+${fn}\\s*\\(\\s*${param}\\s*\\)\\s*:[\\s\\S]*?\\n[ \\t]+if\\s+\\b${param}\\b\\s*==\\s*["'][^"']+["']\\s*:\\s*\\n[ \\t]+print\\(`
        ).test(code);
        const hasElseBranch = new RegExp(
          `\\bdef\\s+${fn}\\b[\\s\\S]*?\\n[ \\t]+else\\s*:\\s*\\n[ \\t]+print\\(`
        ).test(code);
        return hasIfBranch && hasElseBranch;
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Rule guide challenge",
      focusCommand: "if/else + calls",
      commandExplain:
        "Call your function with different values — include the special value your if rule checks.",
      goal: "Complete the function with if/else and call it with at least two different values.",
      starterCode: `# Fill in the blanks 👇
def attack(enemy):
    if enemy == "dragon":
        print("This enemy is too strong! Run!")
    else:
        print("You attack the " + enemy + "!")

attack("____")
attack("____")
`,
      hint: 'Call once with "dragon" and once with another enemy like "goblin".',
      successMessage: "Submitted! Your function follows human-written rules to decide what to do. 🛡️",
      failureMessage:
        "Need if/else with print in each branch, plus two calls with different values (including the if value).",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        const { fn, param } = getDefWithParam(code);
        if (!fn || !param) return false;

        const hasIfBranch = new RegExp(
          `\\bdef\\s+${fn}\\s*\\(\\s*${param}\\s*\\)\\s*:[\\s\\S]*?\\n[ \\t]+if\\s+\\b${param}\\b\\s*==\\s*["']([^"']+)["']\\s*:\\s*\\n[ \\t]+print\\(`
        ).test(code);
        const hasElseBranch = new RegExp(
          `\\bdef\\s+${fn}\\b[\\s\\S]*?\\n[ \\t]+else\\s*:\\s*\\n[ \\t]+print\\(`
        ).test(code);

        const ifValueMatch = code.match(
          new RegExp(`if\\s+${param}\\s*==\\s*(["'])([^"']+)\\1\\s*:`)
        );
        const special = ifValueMatch?.[2];
        const uniqueArgs = uniqueCallArgs(code, fn);
        const hasSpecialCall = special ? uniqueArgs.has(special) : true;

        return (
          hasIfBranch &&
          hasElseBranch &&
          uniqueArgs.size >= 2 &&
          hasSpecialCall &&
          run.stdout.length >= 2
        );
      },
    },
  ],
};
