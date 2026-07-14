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
    durationLabel: "~20–25 min lesson",
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
        id: "hook-story",
        kicker: "Think about it",
        title: "One attack button, endless enemies",
        body: `Think about a game controller's attack button. You don't build a brand-new button for every enemy in the game. You press the *same* button, and the game figures out who you're facing and applies the attack to them.\n\nThat "who" is information supplied in the moment — not baked into the button itself. Today you'll learn to build functions that work the same way.`,
      },
      {
        id: "glossary",
        kicker: "Vocabulary",
        title: "Words you'll use today",
        body: `New vocabulary for this lesson.`,
        bullets: [
          "**Parameter** — the placeholder name inside a function's parentheses, e.g. `enemy` in `def attack(enemy):`.",
          "**Argument** — the actual value passed in when the function is called, e.g. `\"goblin\"` in `attack(\"goblin\")`.",
          "**Flexible function** — one function that produces different results depending on the argument passed in.",
        ],
      },
      {
        id: "concept-1",
        kicker: "Building block #1",
        title: "A parameter is a blank to fill in",
        body: `To give a function a parameter, put a name inside its parentheses: \`def attack(enemy):\`. That name, \`enemy\`, is the **parameter** — a blank waiting to be filled.\n\nInside the function, the parameter behaves just like a variable. You can use \`enemy\` in your \`print\` message, even though you don't yet know what its value will be.\n\nThe function simply *waits*. It won't have a real value for \`enemy\` until you call it and pass one in.`,
        code: `def attack(enemy):\n    print("You attack the " + enemy + "!")`,
        codeCaption: "enemy is a blank waiting for a value",
        callout: {
          label: "Watch out",
          text: "Inside the function, always use the parameter *name* you chose (`enemy`), not a specific value like `\"goblin\"`. Hard-coding a value defeats the whole point of a parameter.",
        },
        checkIn: {
          prompt: "In `def attack(enemy):`, what is `enemy`?",
          choices: ["An argument", "A parameter — a placeholder waiting for a value", "A print statement"],
          correctIndex: 1,
          explanation: "enemy is the parameter: a placeholder name in the function definition that receives a real value when the function is called.",
        },
      },
      {
        id: "concept-2",
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
        checkIn: {
          prompt: 'In `attack("dragon")`, what is `"dragon"` called?',
          choices: ["A parameter", "An argument", "A function"],
          correctIndex: 1,
          explanation: '"dragon" is the argument — the actual value passed into the function when it\'s called, filling the enemy parameter.',
        },
      },
      {
        id: "concept-3",
        kicker: "Building block #3",
        title: "One flexible function beats many copies",
        body: `Without parameters, you'd need a separate function for every situation — \`attack_goblin()\`, \`attack_dragon()\`, \`attack_boss()\` — each a near-identical copy. That's a lot of repeated code, and a nightmare to update.\n\nWith **one** parameterized function, you write the attack logic a single time and feed it different enemies. Want to change how attacks work? Edit one function and every call improves at once.\n\nThis is the same idea behind real software: flexible, reusable building blocks instead of copy-paste.`,
        callout: {
          label: "Pro tip",
          text: "Name your parameters after the *kind* of thing they hold — `enemy`, `song`, `username` — so anyone reading the call knows what value belongs there.",
        },
        checkIn: {
          prompt: "Why is one function with a parameter usually better than three separate functions (attack_goblin, attack_dragon, attack_boss)?",
          choices: [
            "It runs faster",
            "One flexible function avoids repeated near-identical code and is easier to update",
            "Python doesn't allow more than one function",
          ],
          correctIndex: 1,
          explanation: "A single parameterized function avoids duplicated logic — you write and maintain the behavior once instead of in three separate places.",
        },
      },
      {
        id: "worked-example",
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
        id: "misconception",
        kicker: "Common misconception",
        title: "A parameter isn't a fixed value",
        body: `A common misconception: thinking a parameter stores one fixed value forever, the way a regular variable might feel like it does. It doesn't.\n\nA parameter is an **empty slot** that gets refilled with whatever value you pass in *each time you call* the function. The same parameter name, \`enemy\`, holds \`"goblin"\` during one call and \`"dragon"\` during the next — it never "remembers" a previous call.`,
      },
      {
        id: "try-it",
        kicker: "Try it — predict",
        title: "Predict the output",
        body: `Trace this program. Pay close attention to which argument fills the parameter on each call.`,
        code: `def greet(name):\n    print("Hello, " + name + "!")\n\ngreet("Maya")\ngreet("Diego")`,
        codeCaption: "What prints for each call?",
        checkIn: {
          prompt: "What does this program print?",
          choices: [
            "Hello, name!\nHello, name!",
            "Hello, Maya!\nHello, Diego!",
            "Hello, Diego!\nHello, Maya!",
          ],
          correctIndex: 1,
          explanation: 'The first call fills name with "Maya", the second with "Diego" — in that order.',
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Functions can take more than one parameter",
        body: `A function isn't limited to one parameter. You can list several, separated by commas: \`def attack(enemy, weapon):\`. Each parameter gets filled by the matching argument, in the same order you list them — first argument fills the first parameter, second argument fills the second.`,
        code: `def attack(enemy, weapon):\n    print("You attack the " + enemy + " with your " + weapon + "!")\n\nattack("dragon", "sword")`,
        codeCaption: "Two parameters, filled in order",
        output: `You attack the dragon with your sword!`,
      },
      {
        id: "comparison",
        kicker: "Two ways to do it",
        title: "Separate functions vs. one parameterized function",
        body: `Compare writing three separate attack functions versus one function with a parameter. The parameterized version is shorter and easier to extend — adding a new enemy just means one more call, not a whole new function.`,
        code: `# Separate functions — repeats the same logic three times\ndef attack_goblin():\n    print("You attack the goblin!")\ndef attack_dragon():\n    print("You attack the dragon!")\n\n# One parameterized function — same logic, reused\ndef attack(enemy):\n    print("You attack the " + enemy + "!")\nattack("goblin")\nattack("dragon")`,
        codeCaption: "One flexible function replaces many near-duplicates",
      },
      {
        id: "debug-habit",
        kicker: "Debugging habit",
        title: "If output doesn't change, check your arguments",
        body: `If you call the same function twice and get the *same* output both times, check the arguments you passed. A common mistake is accidentally calling the function with the same value twice, or forgetting to use the parameter inside the print statement at all.`,
        checkIn: {
          prompt: "You call `attack(\"goblin\")` and `attack(\"dragon\")`, but both print the exact same message. What should you check first?",
          choices: [
            "Whether the print statement inside the function actually uses the enemy parameter",
            "Whether Python is installed correctly",
            "Whether the function has too many parameters",
          ],
          correctIndex: 0,
          explanation: "If the print statement hard-codes a value instead of using the parameter, every call will produce identical output regardless of the argument.",
        },
      },
      {
        id: "habits",
        kicker: "Coder habits",
        title: "Match parameter names to their purpose",
        body: `Choose parameter names that describe *what kind* of value belongs there — \`enemy\`, \`username\`, \`score\` — rather than vague names like \`x\` or \`thing\`. A clear parameter name acts like a mini instruction manual for anyone calling your function.`,
        bullets: [
          "Name parameters after the kind of value they hold, not something vague.",
          "Always use the parameter name inside the function body — never hard-code a specific value.",
          "If output doesn't change between calls, check that different arguments were actually passed.",
        ],
      },
      {
        id: "standards-connect",
        kicker: "Why this counts",
        title: "This lesson meets a real CS standard",
        body: `**CSTA 3A-AP-15**: *Justify the selection of specific control structures based on implementation, readability, and performance tradeoffs.*\n\nChoosing one parameterized function over three separate near-duplicate functions is exactly this kind of justified design choice — it improves readability and makes future changes far easier to implement.`,
        callout: {
          label: "Standard",
          text: "CSTA 2017, Algorithms & Programming, Level 3A (grades 9–10): 3A-AP-15 — justify control structure choices for readability and maintainability.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Reflect",
        title: "Think it through",
        body: `*Think of a real-life "function" you perform the same way every time but with different details — like making a sandwich (same steps, different fillings). What's the "parameter" in that everyday process?*`,
      },
      {
        id: "mini-case",
        kicker: "Real world",
        title: "One \"send message\" function, billions of messages",
        body: `Every time you send a text, the app doesn't write brand-new code for your specific message. It calls one \`send_message()\` function with parameters like \`recipient\` and \`text\` — the same function handles every message sent by every user, because the details are passed in as arguments.`,
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you build",
        body: `Let's confirm the parameter pattern is locked in.`,
        checkIn: {
          prompt: "What's the difference between a parameter and an argument?",
          choices: [
            "There is no difference — they're the same thing",
            "A parameter is the placeholder in the function definition; an argument is the real value passed in when calling",
            "A parameter is used only in loops",
          ],
          correctIndex: 1,
          explanation: "The parameter (like `enemy`) lives in the def line as a placeholder. The argument (like `\"goblin\"`) is the real value supplied at call time.",
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
