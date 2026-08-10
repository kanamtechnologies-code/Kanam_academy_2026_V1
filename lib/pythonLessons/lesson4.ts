import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function hasNameInput(code: string) {
  return /\bname\s*=\s*input\(/.test(code);
}

function hasIfAlex(code: string) {
  return /\bif\s+name\s*==\s*["']Alex["']\s*:/.test(code);
}

function hasElifJordan(code: string) {
  return /\belif\s+name\s*==\s*["']Jordan["']\s*:/.test(code);
}

function hasElse(code: string) {
  return /\nelse\s*:/.test(code);
}

function hasIndentedPrintIf(code: string) {
  return /\bif\s+name\s*==[\s\S]*?\n[ \t]+print\(/.test(code);
}

function hasIndentedPrintElif(code: string) {
  return /\belif\s+name\s*==[\s\S]*?\n[ \t]+print\(/.test(code);
}

function hasIndentedPrintElse(code: string) {
  return /\nelse\s*:[^\n]*\n[ \t]+print\(/.test(code);
}

export const lesson4: PythonLessonConfig = {
  id: "lesson-4",
  title: "4. Smarter AI Rules",
  goal: "Use if / elif / else to make your AI follow multiple rules in order.",
  xpReward: 250,
  badge: "Rule Builder",
  instructorScript:
    "**Coach’s note**:\nLast session, our AI helper could make a simple choice (if/else).\nToday, we’re going to teach it how to make **better choices** with more rules.\n\nNew tool: `elif` (else if)\n- Python checks rules from **top to bottom**.\n- The **first** rule that matches is the one that runs.\n- After a match happens, Python stops checking the rest.\n\nAI idea:\nAdding more rules can make an AI look “smarter”…\n…but it still follows human-defined logic.\nIf your rules are unclear or in the wrong order, the behavior can look wrong.\n\nCommon mistakes to watch for:\n- Missing colons (:) after if/elif/else\n- Indentation errors (print must be indented under each rule)\n- Using multiple if statements instead of elif (that can cause confusing behavior)\n\nHow to test like a teacher:\nRun it with Alex, Jordan, and one other name and confirm you get 3 different outputs.",
  kidExplain: [
    {
      title: "AI Concept: More rules can look smarter",
      text:
        "When you add more rules, your AI helper can handle more situations. That can make it feel smarter — but it’s still just following rules written by a human.",
    },
    {
      title: "elif = else if",
      text:
        "`elif` lets your program check more than two choices. It means: “if the first rule wasn’t true, try this next rule.",
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
      answer: "Python runs the first rule that matches and ignores the rest.",
    },
  ],
  tryThis: [
    "VIP rule (Easy): Add a VIP name that MUST appear first (top rule).",
    "Name length (Medium): Add a rule for short names (like 3 letters) vs long names.",
    "New input (Bonus): Instead of names, ask for a mood or favorite subject and build rules for it.",
  ],
  aiSafetyMoment:
    "Responsible AI: More rules can make an AI look smarter, but it still follows human logic. Poorly ordered or unclear rules can cause unintended behavior — the human is responsible.",
  commandReference: [
    {
      command: 'if name == "Alex":',
      summary: "First rule — checked first. Use == to compare and don't forget the colon.",
      example: 'if name == "Alex":',
    },
    {
      command: 'elif name == "Jordan":',
      summary: "Extra rule — checked only if the if rule was False. elif, not a second if.",
      example: 'elif name == "Jordan":',
    },
    {
      command: "else:",
      summary: "Fallback when no if/elif rule matched. Always runs last.",
      example: "else:\n    print(\"Hello there!\")",
    },
    {
      command: "rule order",
      summary: "Python checks top to bottom. First match wins — order your rules carefully.",
      example: "if → elif → else",
    },
  ],
  exercises: [
    {
      id: "ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill in elif",
      focusCommand: "elif",
      commandExplain:
        "elif means “else if” — an extra rule checked only if the if above was False. Fill in the blank to add Jordan’s rule.",
      goal: "Replace ____ with elif so the second rule continues the same chain.",
      starterCode: `# Fill in the blank 👇
name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
____ name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("Hello there!")
`,
      solutionCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
elif name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("Hello there!")
`,
      hint: "Type elif (one word) — not a second if.",
      successMessage: "You added elif — three paths in one chain!",
      failureMessage: 'Need if Alex, elif Jordan, else — each with indented prints.',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code) || !hasIfAlex(code) || !hasElifJordan(code) || !hasElse(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElif(code) || !hasIndentedPrintElse(code)) return false;
        return run.stdout.join("\n").includes("Welcome back, Alex!");
      },
    },
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder the rule chain",
      focusCommand: "if / elif / else",
      commandExplain: "Scrambled smarter rules. Put if → elif → else in working order.",
      goal: "Reorder the lines, then Run & check.",
      starterCode: "",
      solutionCode: `name = input("What is your name? ")
if name == "Alex":
    print("Welcome back, Alex!")
elif name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("Hello there!")`,
      parsonsLines: [
        'name = input("What is your name? ")',
        'if name == "Alex":',
        '    print("Welcome back, Alex!")',
        'elif name == "Jordan":',
        '    print("Hey Jordan, good to see you!")',
        "else:",
        '    print("Hello there!")',
      ],
      hint: "Top rule first, then elif, then else — with indented prints.",
      successMessage: "Rule chain order is correct.",
      failureMessage: "Need if Alex, elif Jordan, else — each with indented prints.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code) || !hasIfAlex(code) || !hasElifJordan(code) || !hasElse(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElif(code) || !hasIndentedPrintElse(code)) return false;
        return run.stdout.join("\n").includes("Welcome back, Alex!");
      },
    },
    {
      id: "ex-debug",
      kind: "debug",
      title: "Exercise 3 — Debug elif order",
      focusCommand: "elif",
      commandExplain: "Jordan never gets their special message. The second rule uses if instead of elif — fix it.",
      goal: "Change the second rule so it is elif (not a second if).",
      starterCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
if name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("Hello there!")
`,
      solutionCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
elif name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("Hello there!")
`,
      debugHint: "elif vs second if",
      hint: "A second if starts a new chain. Use elif to continue the first chain.",
      successMessage: "Fixed — elif continues the same decision chain.",
      failureMessage: 'Second rule should be elif name == "Jordan":',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code) || !hasIfAlex(code) || !hasElifJordan(code) || !hasElse(code)) return false;
        if ((code.match(/\bif\s+name\s*==/g) ?? []).length > 1) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElif(code) || !hasIndentedPrintElse(code)) return false;
        return run.stdout.join("\n").includes("Welcome back, Alex!");
      },
    },
    {
      id: "ex-predict",
      kind: "predict",
      title: "Exercise 4 — Predict the path",
      focusCommand: "trace elif",
      commandExplain: "If name is Jordan, which message prints?",
      goal: "Predict the exact output for Jordan.",
      starterCode: `name = "Jordan"
if name == "Alex":
    print("Welcome back, Alex!")
elif name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("Hello there!")
`,
      solutionCode: `name = "Jordan"
if name == "Alex":
    print("Welcome back, Alex!")
elif name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("Hello there!")
`,
      codeReadOnly: true,
      predictionPrompt: "What exact line prints?",
      acceptedPredictions: [
        "Hey Jordan, good to see you!",
        "hey jordan, good to see you!",
      ],
      hint: "Alex rule fails, then elif Jordan matches.",
      successMessage: "You traced the elif path correctly.",
      failureMessage: "Jordan should hit the elif message.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        return run.stdout.join("\n").includes("Hey Jordan, good to see you!");
      },
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 5 — Build if/elif/else",
      focusCommand: "from scratch",
      commandExplain: "Write the full three-path helper yourself.",
      goal: "Special messages for Alex and Jordan; fallback for everyone else.",
      starterCode: `# Smarter rules from scratch\n`,
      solutionCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
elif name == "Jordan":
    print("Hey Jordan, good to see you!")
else:
    print("Hello there!")
`,
      hint: "if → elif → else with indented prints",
      successMessage: "You built a three-path helper from scratch.",
      failureMessage: "Need if Alex, elif Jordan, else, and indented prints.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code) || !hasIfAlex(code) || !hasElifJordan(code) || !hasElse(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElif(code) || !hasIndentedPrintElse(code)) return false;
        return run.stdout.join("\n").includes("Welcome back, Alex!");
      },
    },
  ],

  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Last lesson your helper chose between **two** paths with \`if\`/\`else\`. But real life rarely has just two options — think of all the choices in a single video game menu.\n\nToday you'll level up your decision-making:\n\n• **\`elif\`** — short for "else if," it lets you check *many* rules, not just one.\n• **Rule order** — why Python reads your rules top to bottom, and why that order changes everything.\n• **First match wins** — how Python stops at the first true rule and ignores the rest.\n\nWhen a game sorts players into Bronze, Silver, Gold, or Diamond, or a quiz gives you an A, B, C, or F, it's running a chain of rules like the one you're about to build. More rules can make an AI *look* smarter — but it's still following logic a human wrote.`,
        image: "/images/lessons/py-4-rules.png",
        imageAlt: "A robot following a numbered checklist of rules from top to bottom",
        callout: {
          label: "Why it matters",
          text: "Grading (A / B / C / F), game difficulty (easy / medium / hard), and \"choose your character\" menus all use if / elif / else chains. Anything with more than two outcomes needs this.",
        },
      },
      {
        id: "hook-story",
        kicker: "Think about it",
        title: "Airport security, but for code",
        body: `Ever notice the signs at airport security? "First class this way. Priority boarding this way. Everyone else, that line over there." Every traveler is checked against the *first* line they qualify for, and once they're sorted, nobody double-checks the other signs.\n\nThat's the exact shape of the code you're building today: a chain of rules, checked *in order*, where the first one that fits wins and the rest get skipped entirely. Miss this and you might build a chain where the wrong "line" catches everyone.`,
      },
      {
        id: "glossary",
        kicker: "Vocabulary",
        title: "Words you'll use today",
        body: `New vocabulary for this lesson.`,
        bullets: [
          "**elif** — short for \"else if\"; an extra rule checked only if the ones above were False.",
          "**Rule chain** — an if / elif / ... / else sequence checked in order.",
          "**First match wins** — Python stops checking as soon as one rule is True.",
          "**Fallback** — the else branch that catches everything the other rules missed.",
        ],
      },
      {
        id: "concept-1",
        kicker: "Building block #1",
        title: "elif adds more choices",
        body: `\`elif\` (say it "ell-if") sits **between** \`if\` and \`else\`. You can stack as many \`elif\` rules as you want, one after another.\n\nHere's the key: each \`elif\` is only checked if **all the rules above it were False**. It's like a series of doors in a hallway — you only try the next door if the previous one was locked. The moment a door opens (a rule is True), you walk through it and stop trying the rest.\n\nNotice that \`elif\` is one word, and like \`if\` and \`else\`, its line ends with a colon \`:\` and has indented code underneath.`,
        code: `if name == "Alex":\n    print("Welcome back, Alex!")\nelif name == "Jordan":\n    print("Hey Jordan!")\nelse:\n    print("Hello there!")`,
        codeCaption: "Three paths instead of two",
        output: `What is your name? Jordan\nHey Jordan!`,
        callout: {
          label: "Watch out",
          text: "Use `elif`, not a second separate `if`. Two separate `if` statements both get checked, which can run *two* messages by accident. `elif` guarantees only one path runs.",
        },
        checkIn: {
          prompt: "Why is `elif` different from writing a second, separate `if`?",
          choices: [
            "elif is only checked if the earlier rules were False; a separate if is always checked",
            "elif can only be used with numbers",
            "There's no difference — they behave identically",
          ],
          correctIndex: 0,
          explanation: "elif belongs to the same chain, so it's skipped once an earlier rule matches. A separate if is checked independently, which can run extra branches by accident.",
        },
      },
      {
        id: "concept-2",
        kicker: "The key idea",
        title: "Python checks rules top to bottom",
        body: `This is the most important part of the whole lesson. Python reads your rules **in order, from the top down**. The **first** rule that turns out True runs — and then Python **stops checking** everything below it.\n\nThink of airport security lines with signs: "First class here, then priority, then everyone else." You join the *first* line you qualify for and never look at the others. Your rules work the same way.\n\nThis means the *order* of your rules changes how your program behaves. A rule placed too early can "grab" inputs that were meant for a rule lower down — and that lower rule will never get a turn.`,
        bullets: [
          "Put the most **specific** rules first, general ones later.",
          "Use `elif`, not a second `if` — a separate `if` gets checked even after a match.",
          "Every `if` / `elif` / `else` line ends with a colon `:` and has indented code under it.",
        ],
        callout: {
          label: "Common misconception",
          text: "If a rule that matches *everyone* is placed first, none of the rules below it will ever run — even if they're written perfectly. Careful ordering is what keeps an AI's behavior correct.",
        },
        checkIn: {
          prompt: "If a rule chain has 3 elif branches and the FIRST if matches, what happens to the rest?",
          choices: [
            "Python runs a random one",
            "All of them still run",
            "Python skips the rest — only the first match runs",
          ],
          correctIndex: 2,
          explanation: "Once a rule matches, Python stops checking the chain. Only the first true branch runs.",
        },
      },
      {
        id: "concept-3",
        kicker: "Building block #2",
        title: "The catch-all else still comes last",
        body: `Just like Lesson 3, \`else\` remains your fallback — it runs only if **every single rule above it** (the \`if\` and all the \`elif\`s) came back False. No matter how many \`elif\`s you stack, there's still only ever one \`else\`, and it always goes last.\n\nA well-designed chain almost always ends with \`else\`, so there's a graceful catch-all reply for any input you didn't specifically plan for.`,
        code: `if name == "Alex":\n    print("Welcome back, Alex!")\nelif name == "Jordan":\n    print("Hey Jordan!")\nelif name == "Sam":\n    print("Hi Sam!")\nelse:\n    print("Hello there!")`,
        codeCaption: "Any number of elifs, but only one else, always last",
        checkIn: {
          prompt: "Where must else appear in an if / elif chain?",
          choices: [
            "Anywhere in the middle",
            "Last, after all the if/elif branches",
            "First, before if",
          ],
          correctIndex: 1,
          explanation: "else is the final fallback and must come after all if/elif checks — it has no condition of its own.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Let's build a rule chain together",
        body: `Let's assemble a three-way helper step by step and watch how order matters.\n\n**Step 1 — Listen.** Ask for a name with \`input()\` and store it in \`name\`.\n\n**Step 2 — First rule.** \`if name == "Alex":\` runs only for Alex.\n\n**Step 3 — Second rule.** \`elif name == "Jordan":\` is checked *only if* the name wasn't Alex.\n\n**Step 4 — Catch-all.** \`else:\` handles every other name, so nobody is left without a reply.\n\nRun it three times — "Alex", "Jordan", and "Riley" — and you'll see three different messages, each from a different branch of the chain.`,
        code: `# Step 1: listen for a name\nname = input("What is your name? ")\n\n# Step 2-4: check rules top to bottom, first match wins\nif name == "Alex":\n    print("Welcome back, Alex!")\nelif name == "Jordan":\n    print("Hey Jordan, good to see you!")\nelse:\n    print("Hello there!")`,
        codeCaption: "The finished rule chain, with comments",
        output: `What is your name? Riley\nHello there!`,
        callout: {
          label: "Pro tip",
          text: "To really test a rule chain, feed it one input for *each* branch. If you have three paths, try three inputs and confirm you get three different results.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "More rules ≠ smarter AI",
        body: `An \`if\`/\`else\` is a fork in the road — two directions. But what if there are *five* directions? You can't capture that with a single yes/no question. \`elif\` lets your helper follow **a whole list of rules**, checking them one after another until it finds the one that fits.\n\nAdding more rules can make an AI *seem* clever, but never forget: every rule, and the order they're in, was decided by a human. Adding lots of rules doesn't make a program "think" — it just handles more situations. The intelligence is in *how carefully a human designed and ordered the rules*.`,
      },
      {
        id: "try-it",
        kicker: "Try it — predict",
        title: "Trace the chain before you run it",
        body: `Here's a finished chain. This time the name is \`"Jordan"\`. Trace it: which rule is checked first? Does it match? If not, which one does?`,
        code: `name = "Jordan"\nif name == "Alex":\n    print("Welcome back, Alex!")\nelif name == "Jordan":\n    print("Hey Jordan, good to see you!")\nelse:\n    print("Hello there!")`,
        codeCaption: "What will this print for Jordan?",
        checkIn: {
          prompt: "What exact line prints for Jordan?",
          choices: [
            "Hey Jordan, good to see you!",
            "Welcome back, Alex!",
            "Hello there!",
          ],
          correctIndex: 0,
          explanation: "The if for Alex fails, so Python checks the elif for Jordan — that matches, so its message prints and else is skipped.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Combine conditions with and / or",
        body: `Rule chains get even more powerful when a single condition checks *more than one thing at once*, using \`and\` or \`or\`.\n\n\`and\` requires **both** sides to be True. \`or\` only needs **one** side to be True. These are called **compound conditionals**, and they let you write rules like "if the name is Alex AND the mood is happy" without needing a separate elif for every combination.`,
        code: `if name == "Alex" and mood == "happy":\n    print("Great to see you smiling, Alex!")`,
        codeCaption: "A compound conditional using and",
      },
      {
        id: "comparison",
        kicker: "Two ways to do it",
        title: "elif chain vs. separate if statements",
        body: `Compare a proper \`elif\` chain to a set of separate, independent \`if\` statements. Both *can* look similar, but the elif chain guarantees exactly one branch runs, while separate ifs are each checked on their own — which can cause more than one message to print if you're not careful.\n\nUse an \`elif\` chain whenever the outcomes are mutually exclusive — grades, difficulty tiers, or one name matching one message. Use separate \`if\`s only when you genuinely want to check unrelated things independently.`,
        code: `# elif chain — exactly one message\nif name == "Alex":\n    print("A")\nelif name == "Jordan":\n    print("B")\nelse:\n    print("C")\n\n# separate ifs — could print more than one\nif name == "Alex":\n    print("A")\nif name != "Jordan":\n    print("C")`,
        codeCaption: "Separate ifs can accidentally overlap",
      },
      {
        id: "debug-habit",
        kicker: "Debugging habit",
        title: "Suspect rule order first",
        body: `If your chain seems to always land on the wrong branch, the very first thing to check is **order**. Look for a rule near the top that might be too broad and is "catching" inputs meant for a rule further down.\n\nA good habit: read your chain top to bottom out loud, like a checklist, and ask "would this input get caught here before it reaches the rule I actually wanted?"`,
        checkIn: {
          prompt: "Jordan keeps getting the Alex message instead of the Jordan message. What's the most likely cause?",
          choices: [
            "Python is broken",
            "A rule above the Jordan check is too broad and matches Jordan by mistake",
            "elif doesn't work with names",
          ],
          correctIndex: 1,
          explanation: "Since the first matching rule wins, an overly broad rule placed earlier in the chain can accidentally catch inputs meant for a later rule.",
        },
      },
      {
        id: "habits",
        kicker: "Coder habits",
        title: "Test every branch you added",
        body: `Every time you add a new \`elif\`, test it with an input specifically designed to hit that exact branch — not just your original two test cases.\n\nA chain with 3 branches needs at least 3 different test inputs before you can trust it. Skipping this step is how "it worked when I tested it" bugs sneak into real projects.`,
        bullets: [
          "One test input per branch, minimum.",
          "Read the chain top-down and ask what could go wrong with ordering.",
          "When adding a new elif, re-test the branches above it too — they shouldn't change.",
        ],
      },
      {
        id: "rule-ordering",
        kicker: "Think it through",
        title: "Why rule order is a design choice",
        body: `When you chain \`if\` → \`elif\` → \`else\`, you're not just writing rules — you're designing **priority**. Python checks from top to bottom and stops at the first match.\n\nThat means a broad rule placed too high can accidentally "steal" inputs meant for a more specific rule below it. Grading scripts always check the highest grade first (90+ before 80+) for exactly this reason.\n\nBefore you add a new \`elif\`, ask: *"Could this condition also match inputs meant for a rule below me?"*`,
        code: `# Wrong order — Excellent never runs\nif score >= 60:\n    print("Pass")\nelif score >= 90:\n    print("Excellent")\n\n# Right order — most specific first\nif score >= 90:\n    print("Excellent")\nelif score >= 60:\n    print("Pass")`,
        codeCaption: "Most specific rules belong near the top",
        checkIn: {
          prompt: "Why should the highest grade threshold (>= 90) be checked before the lower one (>= 60)?",
          choices: [
            "It doesn't matter — Python checks every elif anyway",
            "A score of 95 satisfies BOTH >= 60 and >= 90, so the first match wins",
            "Python requires descending order",
          ],
          correctIndex: 1,
          explanation: "Since 95 also satisfies >= 60, placing that rule first would always print Pass and never reach Excellent.",
        },
      },
      {
        id: "transfer-real-apps",
        kicker: "Transfer",
        title: "Where elif chains show up in real apps",
        body: `You've been building name-based rules, but the same chain shape powers tons of everyday software:\n\n• **Streaming apps** — if plan == "premium": HD; elif plan == "basic": SD; else: free with ads.\n• **Games** — if health <= 0: game over; elif health < 25: low-health warning; else: keep playing.\n• **Chat filters** — if message contains banned word: block; elif message is empty: ignore; else: deliver.\n\nThe pattern is always the same: check conditions in priority order, do the first match, skip the rest.`,
        callout: {
          label: "Design tip",
          text: "When you design a rule chain, list your rules on paper first — then order them from most specific to most general before you write any code.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Reflect",
        title: "Think it through",
        body: `*Think of a grading scale (A/B/C/D/F) or a game's difficulty tiers. Why does the ORDER you check the ranges matter? What would go wrong if you checked "F" before "A"?*`,
      },
      {
        id: "mini-case",
        kicker: "Real world",
        title: "Grading scripts are elif chains",
        body: `A script that turns a numeric score into a letter grade is a textbook \`elif\` chain: if score >= 90, "A"; elif score >= 80, "B"; and so on, ending with an \`else\` for anything below the lowest cutoff.\n\nNotice it has to check from **highest to lowest** — checking "is it above 60?" first would incorrectly catch every single A, B, C, and D student too.`,
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you build",
        body: `Let's confirm the rule-chain pattern is locked in.`,
        checkIn: {
          prompt: "A chain has: if score >= 60 (print Pass) elif score >= 90 (print Excellent) else (print Fail). What's wrong?",
          choices: [
            "elif needs to come before if for the chain to work",
            "The broader rule (>= 60) is placed before the more specific rule (>= 90), so Excellent never runs",
            "It's fine — Python checks every elif even after an earlier match",
          ],
          correctIndex: 1,
          explanation: "Since 90+ also satisfies >= 60, the first (broader) rule always wins and the more specific Excellent branch never gets a chance to run.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've upgraded from two choices to many: \`if\` starts the chain, \`elif\` adds extra rules checked in order, and \`else\` catches everyone else — with the **first matching rule** always winning.\n\nIn the exercises you'll build an \`if → elif → else\` chain, then test it with **three** different names to confirm you get three different messages.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/learn/3",
  nextHref: "/learn/5",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
};
