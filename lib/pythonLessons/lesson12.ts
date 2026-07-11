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

function noRunError(run: MiniRunResult): boolean {
  return !run.error;
}

function hasIfBranch(code: string, fn: string, param: string): boolean {
  return new RegExp(
    `\\bdef\\s+${fn}\\s*\\(\\s*${param}\\s*\\)\\s*:[\\s\\S]*?\\n[ \\t]+if\\s+\\b${param}\\b\\s*==\\s*["'][^"']+["']\\s*:\\s*\\n[ \\t]+print\\(`
  ).test(code);
}

function hasElseBranch(code: string, fn: string): boolean {
  return new RegExp(
    `\\bdef\\s+${fn}\\b[\\s\\S]*?\\n[ \\t]+else\\s*:\\s*\\n[ \\t]+print\\(`
  ).test(code);
}

export const lesson12: PythonLessonConfig = {
  id: "lesson-12",
  title: "12. Guiding AI with Rules",
  goal: "Use if/else rules inside a function to control behavior based on the parameter.",
  xpReward: 650,
  badge: "Rule Guide",
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
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `You can build skills (functions) and feed them details (parameters). Today you'll give your skills the power to make **decisions** — to do different things depending on the situation.\n\nHere's your roadmap for this lesson:\n\n• **Rules** — using \`if\` / \`else\` to make a function behave differently.\n• Checking a value with \`==\`.\n• How rules combine with the parameters you already know.\n• Why clear rules are what keep AI safe and predictable.\n\nDecision-making is what turns a simple program into something that feels responsive and smart.`,
        image: "/images/lessons/py-12-guardrails.png",
        imageAlt: "A robot following guardrails along a safe path",
        callout: {
          label: "Why it matters",
          text: "Apps make decisions about you constantly: *if* you're old enough, show this; *if* your password matches, log you in; *if* a message has banned words, block it. Those decisions are `if`/`else` rules — exactly what you're about to write.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "Put rules inside your skill",
        body: `You can already build skills (functions) and feed them details (parameters). Now you'll add **rules** so a function can react *differently* depending on the value it's given.\n\nThink of a game enemy. A good game doesn't attack mindlessly — it follows rules: *if the player is close, attack; otherwise, wait.* The enemy isn't "thinking" — it's following instructions you wrote.\n\nThat's exactly how AI **guardrails** work. The function checks a condition and chooses what to do — and it never guesses.`,
        callout: {
          label: "Common misconception",
          text: "Rules don't make a program 'smart' or give it opinions. `if`/`else` just compares values and follows the path you laid out — every time, exactly the same way.",
        },
      },
      {
        id: "rule",
        kicker: "Building block #1",
        title: "if / else inside a function",
        body: `Inside a function, an \`if\` statement checks a **condition** — something that's either true or false. If it's true, the indented lines under the \`if\` run. If it's false, the lines under \`else\` run instead.\n\nNotice the structure: \`if\` and \`else\` are indented *inside* the function, and each one has its own indented \`print\`. Only one branch runs per call.\n\nSame function, same parameter — but the output changes because of the rule.`,
        code: `def attack(enemy):\n    if enemy == "dragon":\n        print("This enemy is too strong! Run!")\n    else:\n        print("You attack the " + enemy + "!")`,
        codeCaption: "A rule decides what the skill does",
        output: `attack("goblin")  ->  You attack the goblin!\nattack("dragon")  ->  This enemy is too strong! Run!`,
        callout: {
          label: "Watch out",
          text: "Both the `if` and `else` lines end with a colon `:`, and the code inside each must be indented further. Forgetting a colon or the indentation is the classic `if`/`else` error.",
        },
      },
      {
        id: "compare",
        kicker: "Building block #2",
        title: "Checking with ==",
        body: `The double equals \`==\` asks a question: *"are these two things the same?"* It's very different from a single \`=\`, which **stores** a value.\n\n• \`enemy = "dragon"\` *puts* the text dragon into \`enemy\`.\n• \`enemy == "dragon"\` *checks* whether \`enemy\` already holds dragon, and answers \`True\` or \`False\`.\n\nThat True/False answer is what your \`if\` uses to decide which branch to run.`,
        callout: {
          label: "Common misconception",
          text: "Using one `=` instead of `==` inside an `if` is a super common bug. Remember: one equals *assigns*, two equals *compares*.",
        },
      },
      {
        id: "design",
        kicker: "Think like a coder",
        title: "Parameters inform, rules decide",
        body: `Keep the two roles crystal clear in your head:\n\n• The **parameter** brings information *into* the function.\n• The **rule** (\`if\`/\`else\`) decides what to *do* with that information.\n• The function follows the rule exactly — no guessing, no improvising.\n\nWhen something behaves wrong, check the rule first: is the condition checking the right value? Is the right branch printing the right message?`,
        bullets: [
          "Indent the `if`/`else` **inside** the function, and the `print` inside each branch.",
          "Add more cases with `elif` (e.g. a special message for `\"boss\"`).",
          "Predict which branch runs **before** you press Run.",
        ],
        callout: {
          label: "Responsible AI",
          text: "AI acts fast, but only on its rules. Missing or careless rules can cause harm. Set clear limits, think about consequences, and test every branch.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Build a rule-driven skill, step by step",
        body: `Let's build a rule-driven skill from scratch.\n\n**Step 1 — Define with a parameter.** Create \`attack(enemy)\` so a value can flow in.\n\n**Step 2 — Add the rule.** Use \`if enemy == "dragon":\` to handle the dangerous case, and \`else:\` for everything else. Give each branch its own \`print\`.\n\n**Step 3 — Test both paths.** Call the function twice — once with the special value, once with a normal one — and predict each result before you run.`,
        code: `# Steps 1 & 2: a skill with a rule inside\ndef attack(enemy):\n    if enemy == "dragon":\n        print("This enemy is too strong! Run!")\n    else:\n        print("You attack the " + enemy + "!")\n\n# Step 3: test both branches\nattack("dragon")\nattack("goblin")`,
        codeCaption: "The full program, with comments explaining each step",
        output: `This enemy is too strong! Run!\nYou attack the goblin!`,
        callout: {
          label: "Pro tip",
          text: "Before pressing Run, predict which branch each call will take. Checking your prediction against the real output is how coders catch bugs early.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've combined three powers: a **function** (the skill), a **parameter** (the detail), and a **rule** (\`if\`/\`else\`) that decides what to do.\n\nIn the exercises you'll add \`if\`/\`else\` rules inside a function, then call it with different values and predict the output each time.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  exercises: [
    {
      id: "ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill in the rules",
      focusCommand: "if / else",
      commandExplain:
        "Complete the special enemy check and both test calls so both rule branches can run.",
      goal: "Fill blanks for the if value and two different attack calls.",
      starterCode: `# Fill in the blanks 👇
def attack(enemy):
    if enemy == "____":
        print("This enemy is too strong! Run!")
    else:
        print("You attack the " + enemy + "!")

attack("____")
attack("____")
`,
      hint: 'Check for "dragon", then call once with "dragon" and once with "goblin".',
      successMessage: "Rules ready — your function chooses a path from the parameter.",
      failureMessage:
        "Need if/else with prints, plus two different calls including the special if value.",
      solutionCode: `def attack(enemy):
    if enemy == "dragon":
        print("This enemy is too strong! Run!")
    else:
        print("You attack the " + enemy + "!")

attack("dragon")
attack("goblin")
`,
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
        const { fn, param } = getDefWithParam(code);
        if (!fn || !param) return false;
        const ifValueMatch = code.match(
          new RegExp(`if\\s+${param}\\s*==\\s*(["'])([^"']+)\\1\\s*:`)
        );
        const special = ifValueMatch?.[2];
        const uniqueArgs = uniqueCallArgs(code, fn);
        const hasSpecialCall = special ? uniqueArgs.has(special) : false;
        return (
          hasIfBranch(code, fn, param) &&
          hasElseBranch(code, fn) &&
          uniqueArgs.size >= 2 &&
          hasSpecialCall &&
          run.stdout.length >= 2
        );
      },
    },
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder the rules",
      focusCommand: "if / else + calls",
      commandExplain: "Scrambled rule-based function. Put def, if/else, and both calls in order.",
      goal: "Reorder into a working attack skill with if/else and two test calls.",
      starterCode: "",
      parsonsLines: [
        "def attack(enemy):",
        '    if enemy == "dragon":',
        '        print("This enemy is too strong! Run!")',
        "    else:",
        '        print("You attack the " + enemy + "!")',
        'attack("dragon")',
        'attack("goblin")',
      ],
      hint: "def → if → print → else → print → then both attack(...) calls.",
      successMessage: "Order works — rules decide which message prints.",
      failureMessage: "Need if/else inside the function plus two different attack calls.",
      solutionCode: `def attack(enemy):
    if enemy == "dragon":
        print("This enemy is too strong! Run!")
    else:
        print("You attack the " + enemy + "!")
attack("dragon")
attack("goblin")`,
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
        const { fn, param } = getDefWithParam(code);
        if (!fn || !param) return false;
        const uniqueArgs = uniqueCallArgs(code, fn);
        return (
          hasIfBranch(code, fn, param) &&
          hasElseBranch(code, fn) &&
          uniqueArgs.size >= 2 &&
          run.stdout.length >= 2
        );
      },
    },
    {
      id: "ex-debug",
      kind: "debug",
      title: "Exercise 3 — Debug the rule",
      focusCommand: "== vs =",
      commandExplain:
        "This function should warn about dragons, but the if rule has a bug. Fix the comparison.",
      goal: "Fix the if condition so == compares instead of = assigning.",
      starterCode: `def attack(enemy):
    if enemy = "dragon":
        print("This enemy is too strong! Run!")
    else:
        print("You attack the " + enemy + "!")

attack("dragon")
`,
      debugHint: "comparison vs assignment",
      hint: "Inside if, use == to compare. A single = assigns.",
      successMessage: "Bug squashed — you used == for the comparison.",
      failureMessage: 'The if line should compare with ==, e.g. if enemy == "dragon":',
      solutionCode: `def attack(enemy):
    if enemy == "dragon":
        print("This enemy is too strong! Run!")
    else:
        print("You attack the " + enemy + "!")

attack("dragon")
`,
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
        const { fn, param } = getDefWithParam(code);
        if (!fn || !param) return false;
        if (
          new RegExp(`\\bif\\s+${param}\\s*=\\s*["']`).test(code) &&
          !new RegExp(`\\bif\\s+${param}\\s*==\\s*["']`).test(code)
        ) {
          return false;
        }
        return (
          hasIfBranch(code, fn, param) &&
          hasElseBranch(code, fn) &&
          run.stdout.join("\n").includes("This enemy is too strong! Run!")
        );
      },
    },
    {
      id: "ex-predict",
      kind: "predict",
      title: "Exercise 4 — Predict the branch",
      focusCommand: "trace if/else",
      commandExplain: 'If we call attack("goblin"), which message prints?',
      goal: "Predict the exact output for goblin.",
      starterCode: `def attack(enemy):
    if enemy == "dragon":
        print("This enemy is too strong! Run!")
    else:
        print("You attack the " + enemy + "!")

attack("goblin")
`,
      codeReadOnly: true,
      predictionPrompt: "What exact line prints?",
      acceptedPredictions: [
        "You attack the goblin!",
        "you attack the goblin!",
        "You attack the goblin",
      ],
      hint: "goblin is not dragon, so the else branch runs.",
      successMessage: "You predicted the else path correctly.",
      failureMessage: "Non-dragon enemies take the else message.",
      solutionCode: `def attack(enemy):
    if enemy == "dragon":
        print("This enemy is too strong! Run!")
    else:
        print("You attack the " + enemy + "!")

attack("goblin")
`,
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
        return run.stdout.join("\n").includes("You attack the goblin!");
      },
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 5 — Build rule-guided attack",
      focusCommand: "from scratch",
      commandExplain:
        "Write a function with if/else rules on a parameter, then call it with two different values.",
      goal: "Build attack(enemy) with if/else and test both branches.",
      starterCode: `# Function + if/else rules from scratch\n`,
      hint: 'if enemy == "dragon": … else: … then attack("dragon") and attack("goblin").',
      successMessage: "You guided AI behavior with human-written rules. 🛡️",
      failureMessage:
        "Need if/else with prints inside a parameterized function, plus two different calls.",
      solutionCode: `def attack(enemy):
    if enemy == "dragon":
        print("This enemy is too strong! Run!")
    else:
        print("You attack the " + enemy + "!")

attack("dragon")
attack("goblin")
`,
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
        const { fn, param } = getDefWithParam(code);
        if (!fn || !param) return false;
        const ifValueMatch = code.match(
          new RegExp(`if\\s+${param}\\s*==\\s*(["'])([^"']+)\\1\\s*:`)
        );
        const special = ifValueMatch?.[2];
        const uniqueArgs = uniqueCallArgs(code, fn);
        const hasSpecialCall = special ? uniqueArgs.has(special) : false;
        return (
          hasIfBranch(code, fn, param) &&
          hasElseBranch(code, fn) &&
          uniqueArgs.size >= 2 &&
          hasSpecialCall &&
          run.stdout.length >= 2
        );
      },
    },
  ],
};
