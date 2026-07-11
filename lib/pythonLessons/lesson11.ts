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

function hasPrintUsingParam(code: string, fn: string, param: string): boolean {
  return new RegExp(
    `\\bdef\\s+${fn}\\s*\\(\\s*${param}\\s*\\)\\s*:[^\\n]*\\n[ \\t]+print\\([\\s\\S]*?\\b${param}\\b`
  ).test(code);
}

export const lesson11: PythonLessonConfig = {
  id: "lesson-11",
  title: "11. Giving Functions Better Information (Parameters)",
  goal: "Use a parameter so one function can work with different details.",
  xpReward: 600,
  badge: "Parameter Pro",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
  prevHref: "/learn/10",
  nextHref: "/learn/12",
  instructorScript:
    "**Coach's note**\nRead this first — it explains the goal + how to think about the code.\n**Coach's note**:\nThink about a video game controller.\n\nYou might have one attack button, but you don't build a new button for every enemy.\nYou press the same button and tell the game who to attack.\n\nThat's how ==parameters== work.\n\nA parameter is extra information you give to a function so it knows what to do this time.\n\nHere's what that looks like in code:\n```\ndef attack(enemy):\n    print(\"You attack the \" + enemy + \"!\")\n```\n\nThis creates an attack skill — but it doesn't run yet.\nTo use the skill, you call the function and give it information:\n```\nattack(\"goblin\")\nattack(\"dragon\")\nattack(\"boss\")\n```\n\nSame skill.\nDifferent information.\nDifferent output.\n\nThat's how AI systems appear flexible — humans give better details.\n\n**Mini goal**:\nCreate a function that changes what your bot does based on the information you give it.\nRead the steps, follow them in order, then press [[Run]].",
  commandReference: [
    {
      command: "def attack(enemy):",
      summary: "The name inside parentheses is a parameter — a blank spot waiting for a value.",
      example: "def attack(enemy):",
    },
    {
      command: 'print("... " + enemy + "...")',
      summary: "Use the parameter inside your message so output changes with each call.",
      example: 'print("You attack the " + enemy + "!")',
    },
    {
      command: 'attack("goblin")',
      summary: "Pass a value when you call the function. That value fills the parameter.",
      example: 'attack("goblin")',
    },
  ],
  kidExplain: [
    {
      title: "What is a Parameter?",
      text:
        "A parameter is a blank spot inside a function. The function waits for you to give it the value when you call it.",
    },
    {
      title: "Same skill, new details",
      text:
        "You can call the same function with different values. The function doesn't 'decide' the value — you provide it.",
    },
  ],
  steps: [
    "Define a function that uses one parameter.",
    "Inside the function, print a message that includes the parameter.",
    "Call the function with one value.",
    "Call the same function with a different value.",
    "Observe how the output changes.",
    "Common mistake: If the output doesn't change, check that you passed different values into the function.",
  ],
  cfu: [
    {
      question: "What is a parameter in your own words?",
      answer: "A placeholder in a function that gets a real value when you call the function.",
    },
    {
      question: "Why is one function with parameters better than many similar functions?",
      answer:
        "Because you write the skill once, then reuse it with different details instead of copying lots of near-identical code.",
    },
    {
      question: "Does the function decide what information to use, or do you?",
      answer: "You do — you choose what value to pass in when you call the function.",
    },
  ],
  tryThis: [
    "Change the enemy name and run again.",
    "Add a second parameter (like weapon or power).",
    "Challenge: Explain how parameters help humans control AI behavior.",
  ],
  aiSafetyMoment:
    "AI safety: AI systems respond to the information they are given. If details are missing or unclear, output can be wrong. Responsible AI means giving clear information, checking results, and remembering AI does not guess your intent.",
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Last lesson your functions did the *exact same thing* every time. Today you'll make them flexible — one skill that can handle different details depending on what you feed it.\n\nHere's your roadmap for this lesson:\n\n• **Parameters** — how one function can handle many different details.\n• Defining a parameter (a blank inside the parentheses).\n• **Arguments** — the actual values you pass in when you call.\n• Reusing one flexible skill instead of dozens of near-identical copies.\n\nThis is how real software stays powerful without becoming a giant pile of repeated code.`,
        image: "/images/lessons/py-11-parameter.png",
        imageAlt: "A machine with a slot where different inputs can be inserted",
        callout: {
          label: "Why it matters",
          text: "When you send a message, the app uses one \"send\" skill — but you fill in *who* and *what* each time. One flexible function, endless different messages. That's parameters at work.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "One skill, many details",
        body: `Last lesson your function did the *exact same thing* every time you called it. Useful — but limited.\n\nThink about a game controller's attack button. You don't build a brand-new button for every enemy. You press the *same* button and the game uses it on whoever you're facing. The "who" is extra information you supply in the moment.\n\nThat extra information is a **parameter**: a value you hand to a function so it knows what to do *this* time. One skill, many different details.`,
        callout: {
          label: "Common misconception",
          text: "A parameter doesn't store one fixed value forever. It's an empty slot that gets filled with whatever you pass in *each time you call* the function.",
        },
      },
      {
        id: "param",
        kicker: "Building block #1",
        title: "A parameter is a blank to fill in",
        body: `To give a function a parameter, put a name inside its parentheses: \`def attack(enemy):\`. That name, \`enemy\`, is the **parameter** — a blank waiting to be filled.\n\nInside the function, the parameter behaves just like a variable. You can use \`enemy\` in your \`print\` message, even though you don't yet know what its value will be.\n\nThe function simply *waits*. It won't have a real value for \`enemy\` until you call it and pass one in.`,
        code: `def attack(enemy):\n    print("You attack the " + enemy + "!")`,
        codeCaption: "enemy is a blank waiting for a value",
        callout: {
          label: "Watch out",
          text: "Inside the function, always use the parameter *name* you chose (`enemy`), not a specific value like `\"goblin\"`. Hard-coding a value defeats the whole point of a parameter.",
        },
      },
      {
        id: "pass",
        kicker: "Building block #2",
        title: "Pass a value when you call",
        body: `When you **call** the function, you put a value inside the parentheses: \`attack("goblin")\`. That value is called an **argument**, and it slides right into the parameter blank.\n\nSo \`enemy\` becomes \`"goblin"\` for that one call. Call it again with \`"dragon"\` and \`enemy\` becomes \`"dragon"\`. Same skill, different result each time — all decided by you.`,
        code: `attack("goblin")\nattack("dragon")\nattack("boss")`,
        codeCaption: "Same skill, three different details",
        output: `You attack the goblin!\nYou attack the dragon!\nYou attack the boss!`,
        bullets: [
          "The name in `def attack(enemy):` is the **parameter**.",
          "The value in `attack(\"goblin\")` is the **argument** you pass in.",
          "The function never guesses — **you** choose the value.",
        ],
        callout: {
          label: "Common misconception",
          text: "People mix up the two words: the **parameter** is the blank in the definition (`enemy`); the **argument** is the real value you pass when calling (`\"goblin\"`).",
        },
      },
      {
        id: "reuse",
        kicker: "Why it matters",
        title: "One flexible function beats many copies",
        body: `Without parameters, you'd need a separate function for every situation — \`attack_goblin()\`, \`attack_dragon()\`, \`attack_boss()\` — each a near-identical copy. That's a lot of repeated code, and a nightmare to update.\n\nWith **one** parameterized function, you write the attack logic a single time and feed it different enemies. Want to change how attacks work? Edit one function and every call improves at once.\n\nThis is the same idea behind real software: flexible, reusable building blocks instead of copy-paste.`,
        callout: {
          label: "Pro tip",
          text: "Name your parameters after the *kind* of thing they hold — `enemy`, `song`, `username` — so anyone reading the call knows what value belongs there.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Build a flexible skill, step by step",
        body: `Let's build a flexible skill and feed it different details.\n\n**Step 1 — Define with a parameter.** Create \`attack\` with one parameter, \`enemy\`.\n\n**Step 2 — Use the parameter.** Inside, print a message that includes \`enemy\` joined with \`+\`.\n\n**Step 3 — Call with different arguments.** Run the same function three times with three enemies and watch the output change.`,
        code: `# Steps 1 & 2: one flexible skill\ndef attack(enemy):\n    print("You attack the " + enemy + "!")\n\n# Step 3: same skill, different details\nattack("goblin")\nattack("dragon")\nattack("boss")`,
        codeCaption: "The full program, with comments explaining each step",
        output: `You attack the goblin!\nYou attack the dragon!\nYou attack the boss!`,
        callout: {
          label: "Pro tip",
          text: "Watch the spaces inside the quotes — `\"You attack the \"` has a space after *the* so the words don't mash into the enemy name.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've learned how to make a skill flexible: define a **parameter** (the blank), then pass an **argument** (the value) each time you call. One function, endless variations.\n\nIn the exercises you'll add a parameter to a function, use it inside the message, then call the function with different values and watch the output change.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  exercises: [
    {
      id: "ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill in the parameter",
      focusCommand: "def attack(enemy)",
      commandExplain:
        "Add the parameter name, then call attack twice with two different enemy strings.",
      goal: "Fill blanks so one parameterized function runs with two different values.",
      starterCode: `# Fill in the blanks 👇
def attack(____):
    print("You attack the " + enemy + "!")

attack("____")
attack("____")
`,
      hint: 'Use enemy as the parameter, then two different names like "goblin" and "dragon".',
      successMessage: "Same skill, different details — parameters at work!",
      failureMessage:
        "Need def attack(enemy): using the parameter in print, plus two calls with different values.",
      solutionCode: `def attack(enemy):
    print("You attack the " + enemy + "!")

attack("goblin")
attack("dragon")
`,
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
        const { fn, param } = getDefWithParam(code);
        if (!fn || !param) return false;
        const uniqueArgs = uniqueCallArgs(code, fn);
        return (
          hasPrintUsingParam(code, fn, param) &&
          uniqueArgs.size >= 2 &&
          run.stdout.length >= 2
        );
      },
    },
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder the attack",
      focusCommand: "param + calls",
      commandExplain: "Scrambled parameterized function. Put define, print, and two calls in order.",
      goal: "Reorder so attack(enemy) is defined, then called with two enemies.",
      starterCode: "",
      parsonsLines: [
        "def attack(enemy):",
        '    print("You attack the " + enemy + "!")',
        'attack("goblin")',
        'attack("dragon")',
      ],
      hint: "def with parameter first, indented print next, then two attack(...) calls.",
      successMessage: "Order works — one skill, two different enemies.",
      failureMessage: "Need def attack(enemy):, print using enemy, and two different calls.",
      solutionCode: `def attack(enemy):
    print("You attack the " + enemy + "!")
attack("goblin")
attack("dragon")`,
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
        const { fn, param } = getDefWithParam(code);
        if (!fn || !param) return false;
        const uniqueArgs = uniqueCallArgs(code, fn);
        return (
          hasPrintUsingParam(code, fn, param) &&
          uniqueArgs.size >= 2 &&
          run.stdout.length >= 2
        );
      },
    },
    {
      id: "ex-debug",
      kind: "debug",
      title: "Exercise 3 — Debug the parameter",
      focusCommand: "use the parameter",
      commandExplain:
        "This attack always says the word enemy instead of the real name. Fix it so the parameter is used.",
      goal: "Use the enemy parameter (not the string \"enemy\") in the print.",
      starterCode: `def attack(enemy):
    print("You attack the " + "enemy" + "!")

attack("goblin")
`,
      debugHint: "variable vs string",
      hint: 'Use + enemy + (no quotes around enemy) so the parameter value prints.',
      successMessage: "Fixed — the message now uses the parameter value.",
      failureMessage: 'Print must use the parameter name enemy, not the string "enemy".',
      solutionCode: `def attack(enemy):
    print("You attack the " + enemy + "!")

attack("goblin")
`,
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
        const { fn, param } = getDefWithParam(code);
        if (!fn || !param) return false;
        if (!hasPrintUsingParam(code, fn, param)) return false;
        if (/\+\s*["']enemy["']\s*\+/.test(code) && !new RegExp(`\\+\\s*${param}\\s*\\+`).test(code)) {
          return false;
        }
        return run.stdout.some((line) => line.includes("goblin"));
      },
    },
    {
      id: "ex-predict",
      kind: "predict",
      title: "Exercise 4 — Predict the argument",
      focusCommand: "trace parameter",
      commandExplain: 'If we call attack("dragon"), what exact line prints?',
      goal: "Predict the output for this call.",
      starterCode: `def attack(enemy):
    print("You attack the " + enemy + "!")

attack("dragon")
`,
      codeReadOnly: true,
      predictionPrompt: "What exact line prints?",
      acceptedPredictions: [
        "You attack the dragon!",
        "you attack the dragon!",
        "You attack the dragon",
      ],
      hint: 'enemy becomes "dragon" for this call, then gets joined into the sentence.',
      successMessage: "You traced the argument into the message correctly.",
      failureMessage: "Replace enemy with dragon inside the printed sentence.",
      solutionCode: `def attack(enemy):
    print("You attack the " + enemy + "!")

attack("dragon")
`,
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
        return run.stdout.join("\n").includes("You attack the dragon!");
      },
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 5 — Build with a parameter",
      focusCommand: "from scratch",
      commandExplain:
        "Write a function with one parameter, use it in print, and call it twice with different values.",
      goal: "Build a parameterized skill and reuse it with two different arguments.",
      starterCode: `# One skill, different details\n`,
      hint: 'def attack(enemy): … print(... + enemy + ...) then attack("goblin") and attack("dragon").',
      successMessage: "You built a flexible skill from scratch.",
      failureMessage:
        "Need a one-parameter function that uses the param in print, plus two different calls.",
      solutionCode: `def attack(enemy):
    print("You attack the " + enemy + "!")

attack("goblin")
attack("dragon")
`,
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code) || !noRunError(run)) return false;
        const { fn, param } = getDefWithParam(code);
        if (!fn || !param) return false;
        const uniqueArgs = uniqueCallArgs(code, fn);
        return (
          hasPrintUsingParam(code, fn, param) &&
          uniqueArgs.size >= 2 &&
          run.stdout.length >= 2
        );
      },
    },
  ],
};
