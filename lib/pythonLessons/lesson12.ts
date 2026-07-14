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
    durationLabel: "~20–25 min lesson",
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
        id: "hook-story",
        kicker: "Think about it",
        title: "A game enemy that follows rules, not instinct",
        body: `Think about a game enemy. A good game doesn't attack mindlessly — it follows rules: *if the player is close, attack; otherwise, wait.* The enemy isn't "thinking" — it's following instructions a programmer wrote.\n\nThat's exactly how AI **guardrails** work. Today you'll combine what you already know (functions and parameters) with a new power: rules that decide what happens.`,
      },
      {
        id: "glossary",
        kicker: "Vocabulary",
        title: "Words you'll use today",
        body: `New vocabulary for this lesson.`,
        bullets: [
          "**Condition** — a statement that evaluates to True or False, like `enemy == \"dragon\"`.",
          "**Branch** — the block of code that runs when a condition is True (if) or False (else).",
          "**==** — the comparison operator, asking \"are these equal?\" (different from `=`, which assigns).",
          "**Guardrail** — a rule that limits or guides what a program (or AI) is allowed to do.",
        ],
      },
      {
        id: "concept-1",
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
        checkIn: {
          prompt: "Inside a function, where must the if/else statements and their print lines be placed?",
          choices: ["Indented inside the function, with each branch's print further indented", "Anywhere in the file — indentation doesn't matter", "Only after the function is called"],
          correctIndex: 0,
          explanation: "if/else must be indented inside the function body, and each branch's code (like print) must be indented one level further under it.",
        },
      },
      {
        id: "concept-2",
        kicker: "Building block #2",
        title: "Checking with ==",
        body: `The double equals \`==\` asks a question: *"are these two things the same?"* It's very different from a single \`=\`, which **stores** a value.\n\n• \`enemy = "dragon"\` *puts* the text dragon into \`enemy\`.\n• \`enemy == "dragon"\` *checks* whether \`enemy\` already holds dragon, and answers \`True\` or \`False\`.\n\nThat True/False answer is what your \`if\` uses to decide which branch to run.`,
        callout: {
          label: "Common misconception",
          text: "Using one `=` instead of `==` inside an `if` is a super common bug. Remember: one equals *assigns*, two equals *compares*.",
        },
        checkIn: {
          prompt: 'What does `enemy == "dragon"` do?',
          choices: [
            "Stores the text \"dragon\" into enemy",
            "Checks whether enemy already equals \"dragon\", returning True or False",
            "Deletes the enemy variable",
          ],
          correctIndex: 1,
          explanation: "== is a comparison, not an assignment. It checks whether the two values are equal and returns True or False.",
        },
      },
      {
        id: "concept-3",
        kicker: "Building block #3",
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
        checkIn: {
          prompt: "In a parameterized function with if/else rules, what decides which branch runs?",
          choices: ["The function randomly picks one", "Whichever branch is written first always runs", "The condition, evaluated against the parameter's current value"],
          correctIndex: 2,
          explanation: "The if condition is checked against the parameter's value for that specific call — that comparison result determines which branch executes.",
        },
      },
      {
        id: "worked-example",
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
        id: "misconception",
        kicker: "Common misconception",
        title: "Rules don't make code 'smart'",
        body: `Rules don't make a program "smart" or give it opinions. \`if\`/\`else\` just compares values and follows the path you laid out — every time, exactly the same way, with no judgment or creativity involved.\n\nEven the most sophisticated AI guardrails are, underneath, built from this same simple pattern: check a condition, follow the matching branch.`,
      },
      {
        id: "try-it",
        kicker: "Try it — predict",
        title: "Predict the branch",
        body: `Trace this function carefully. Check the parameter value against the condition before deciding which branch runs.`,
        code: `def check_age(age):\n    if age >= 13:\n        print("Access granted")\n    else:\n        print("Access denied")\n\ncheck_age(10)`,
        codeCaption: "Which message prints for age 10?",
        checkIn: {
          prompt: "What does this program print?",
          choices: ["Access denied", "Access granted", "Nothing prints"],
          correctIndex: 0,
          explanation: "10 is not >= 13, so the condition is False and the else branch runs, printing \"Access denied\".",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "elif adds more than two paths",
        body: `\`if\`/\`else\` only gives you two paths. When you need a third (or fourth) option, add \`elif\` ("else if") between them. Python checks each condition top to bottom and runs the first one that matches — the same rule-order lesson from earlier in the course applies here too.`,
        code: `def attack(enemy):\n    if enemy == "dragon":\n        print("Too strong! Run!")\n    elif enemy == "boss":\n        print("Use your special move!")\n    else:\n        print("You attack the " + enemy + "!")`,
        codeCaption: "Three paths instead of two",
      },
      {
        id: "comparison",
        kicker: "Two ways to do it",
        title: "A function with a rule vs. without one",
        body: `Compare a plain function that always says the same thing versus one with a rule that reacts to its parameter. The rule-based version is far more useful, because it changes behavior instead of repeating the same output for every input.`,
        code: `# No rule — same output every time\ndef attack_plain(enemy):\n    print("You attack the " + enemy + "!")\n\n# With a rule — output depends on the situation\ndef attack_smart(enemy):\n    if enemy == "dragon":\n        print("Too strong! Run!")\n    else:\n        print("You attack the " + enemy + "!")`,
        codeCaption: "Rules let a function react, not just repeat",
      },
      {
        id: "debug-habit",
        kicker: "Debugging habit",
        title: "If the same message always prints, check ==",
        body: `If your function seems to always take the same branch no matter what you pass in, the most common cause is a typo in the condition — often using \`=\` instead of \`==\`, or misspelling the value being compared. Check the condition line first.`,
        checkIn: {
          prompt: "Your function always prints the if-branch message, even when you expect the else-branch to run. What should you check first?",
          choices: ["Whether Python needs to be reinstalled", "Whether the condition uses == (comparison) correctly, not = (assignment) or a typo", "Whether the function has too many parameters"],
          correctIndex: 1,
          explanation: "A condition that's always True (like using = instead of ==, or comparing to the wrong value) will make the if-branch run every time regardless of input.",
        },
      },
      {
        id: "habits",
        kicker: "Coder habits",
        title: "Predict before you run",
        body: `Before pressing Run, say out loud (or write down) which branch you expect to execute and why. This habit — predicting before checking — is one of the fastest ways to build a correct mental model of how your code behaves, and it makes surprises much easier to notice and debug.`,
        bullets: [
          "Predict which branch will run before pressing Run.",
          "Double-check `==` vs `=` whenever a condition behaves unexpectedly.",
          "Test every branch at least once, not just the one you expect to be common.",
        ],
      },
      {
        id: "rule-ordering-fn",
        kicker: "Think it through",
        title: "Order your rules inside functions too",
        body: `The same "first match wins" rule from \`elif\` chains applies inside functions. If you check a broad condition before a specific one, the specific branch never gets a chance.\n\nInside a function, order your \`if\`/\`elif\` branches from **most specific to most general**, with \`else\` as the fallback at the bottom.`,
        code: `def react(threat):\n    if threat == "dragon":\n        print("Run away!")\n    elif threat == "goblin":\n        print("Fight!")\n    else:\n        print("Observe carefully.")`,
        codeCaption: "Specific threats first, general fallback last",
        checkIn: {
          prompt: "Why should `else` be the last branch inside a function?",
          choices: [
            "Python requires else to be last",
            "else matches everything not caught above — putting it first would catch all inputs",
            "else is optional and rarely needed",
          ],
          correctIndex: 1,
          explanation: "else is the catch-all fallback. If it came first, every input would hit it and no other branch would ever run.",
        },
      },
      {
        id: "worked-example-2",
        kicker: "Worked example",
        title: "Predict which branch runs",
        body: `Before running this function, predict the output for each call. Say which branch you expect and why — then run to check.\n\nThis predict-then-verify habit is how you build a reliable mental model of rule-based code.`,
        code: `def attack(enemy):\n    if enemy == "dragon":\n        print("Too strong! Run!")\n    else:\n        print("You attack the " + enemy + "!")\n\nattack("goblin")\nattack("dragon")\nattack("slime")`,
        codeCaption: "Predict all three outputs before running",
        output: `You attack the goblin!\nToo strong! Run!\nYou attack the slime!`,
      },
      {
        id: "bug-walkthrough-condition",
        kicker: "Bug walkthrough",
        title: "When the if-branch always wins",
        body: `If your function always takes the \`if\` path no matter what you pass in, check the condition line:\n\n• Did you use \`=\` instead of \`==\`? (Assignment inside a condition causes an error or unexpected behavior.)\n• Are you comparing to the wrong value? (\`enemy == "goblin"\` won't match \`"Goblin"\`.)\n• Is the condition always True? (Some typos make the check pass for every input.)`,
        callout: {
          label: "Debugging habit",
          text: "When a condition misbehaves, read the if line out loud as a question: 'Is enemy equal to dragon?' Then test with a value you know should be False.",
        },
      },
      {
        id: "transfer-real-apps",
        kicker: "Transfer",
        title: "Game AI uses rules inside functions",
        body: `Video game enemies "decide" what to do using the exact pattern you built: a function receives a situation (parameter), checks rules (\`if\`/\`elif\`/\`else\`), and picks a behavior.\n\n• **Low health?** → retreat\n• **Player nearby?** → attack\n• **Otherwise** → patrol\n\nIt's not magic — it's ordered rules inside a function, just like your \`attack(enemy)\` function. Game AI starts exactly where you are now.`,
      },
      {
        id: "reflection-prompt",
        kicker: "Reflect",
        title: "Think it through",
        body: `*Think of a rule an app enforces on you — an age requirement, a password check, a content filter. What condition does it check, and what happens in each branch (allowed vs. not allowed)?*`,
      },
      {
        id: "mini-case",
        kicker: "Real world",
        title: "Login screens are if/else in disguise",
        body: `Every login screen runs a rule like: *if the password matches, let the user in; else, show an error.* The parameter is the password you typed, and the whole system is a function with a rule inside — precisely the pattern you just learned.`,
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you build",
        body: `Let's confirm the rules pattern is locked in.`,
        checkIn: {
          prompt: "Who decides what an if/else rule checks and does — the program or the human who wrote it?",
          choices: ["The program decides on its own", "Neither — it's random", "The human who wrote the code — the program just follows the rule exactly"],
          correctIndex: 2,
          explanation: "The human author writes the condition and both branches. The program never improvises — it always follows the written rule exactly.",
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
