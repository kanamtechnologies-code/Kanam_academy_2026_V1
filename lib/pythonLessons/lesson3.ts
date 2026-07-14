import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function hasNameInput(code: string) {
  return /\bname\s*=\s*input\(/.test(code);
}

function hasIfAlex(code: string) {
  return /\bif\s+name\s*==\s*["']Alex["']\s*:/.test(code);
}

function hasElse(code: string) {
  return /\nelse\s*:/.test(code);
}

function hasIndentedPrintIf(code: string) {
  return /\bif\s+name\s*==[\s\S]*?\n[ \t]+print\(/.test(code);
}

function hasIndentedPrintElse(code: string) {
  return /\nelse\s*:[^\n]*\n[ \t]+print\(/.test(code);
}

export const lesson3: PythonLessonConfig = {
  id: "lesson-3",
  title: "3. My AI Makes Choices",
  goal: "Use if / else to make your AI respond differently based on input.",
  xpReward: 150,
  badge: "Decision Maker",
  instructorScript:
    "**Coach’s note**:\nLast week, our AI helper learned how to **listen**.\nToday, we’re going to teach it how to **make choices**.\n\nBig idea (very important):\n- The computer does NOT guess.\n- It checks your rule.\n- If the rule is True, it runs that block.\n- Otherwise, it runs the else block.\n\nThis is what many early AI systems look like:\n**rule-based decision making**.\nA human writes the rules. The program follows them exactly.\n\nTwo super common mistakes (watch for these):\n- `=` vs `==`: `=` assigns (puts a value in a box). `==` compares (asks a question).\n- Indentation: the lines under if/else MUST be indented so Python knows what belongs to each choice.\n\nHow to test like a teacher:\nRun it once with Alex (you should get the special message), then run it again with a different name (you should get the other message).",
  kidExplain: [
    {
      title: "AI Concept: Rules control behavior",
      text:
        "Many AI systems start as **rule-based systems**. That means a human writes rules, and the computer follows those rules exactly. Today your AI helper will follow one simple rule to decide what to say.",
    },
    {
      title: "What is an if statement?",
      text:
        "An `if` statement checks a condition. If the condition is True, Python runs the indented code under it.",
    },
    {
      title: "else = the other path",
      text:
        "An `else` block runs when the if condition is False. It’s your “plan B” so your program always has something to do.",
    },
    {
      title: "Compare vs assign (== vs =)",
      text:
        "`=` assigns (stores a value). `==` compares (checks if two values are equal). Inside an if, you almost always want `==`.",
    },
    {
      title: "Indentation matters",
      text:
        "Indentation (spaces) tells Python which lines belong inside the if or else. If it’s not indented, Python can’t tell what you meant.",
    },
  ],
  steps: [
    "Ask for the user’s name using input().",
    'Write the rule: if name == "Alex":',
    "Inside the if block, print a special message for Alex.",
    "Add else: for everyone else.",
    "Inside else, print a friendly message for any other name.",
  ],
  cfu: [
    {
      question: "Symbols: What is the difference between = and == in Python?",
      answer: "`=` assigns (stores a value). `==` compares (checks if two values are equal).",
    },
    {
      question: "Structure: Why do the print lines need to be indented under if and else?",
      answer:
        "Because indentation tells Python which lines belong to each block. Without it, Python can’t tell what should run for each choice.",
    },
    {
      question:
        "Logic: If the name is Alex and the if condition is True, does Python run the else too?",
      answer: "No. Only one path runs: if runs when True, else runs when False.",
    },
  ],
  tryThis: [
    "Swap the special name (Easy): Change Alex to your own name.",
    'Reverse it (Medium): Make the special message happen when the name is NOT Alex.',
    'Add a second rule (Bonus): Add another if to check for a second special name (like "Sam").',
  ],
  aiSafetyMoment:
    "Responsible AI: Your AI helper is only following rules you wrote. If it behaves badly, the responsibility belongs to the human who wrote the rules.",
  commandReference: [
    {
      command: 'if name == "Alex":',
      summary: "Checks a condition. Use == to compare (not =). Don't forget the colon!",
      example: 'if name == "Alex":',
    },
    {
      command: "else:",
      summary: "Runs when the if condition is False — your fallback path.",
      example: "else:\n    print(\"Hello there!\")",
    },
    {
      command: "==",
      summary: "Compares two values for equality. Different from = which assigns.",
      example: 'name == "Alex"',
    },
    {
      command: "indentation",
      summary: "Lines under if/else must be indented (4 spaces) so Python knows they belong inside.",
      example: "    print(\"Welcome back, Alex!\")",
    },
  ],
  exercises: [
    {
      id: "ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill in the comparison",
      focusCommand: "==",
      commandExplain:
        "Inside an if, you compare with == (two equals). Fill in the blank so the rule checks whether name is Alex.",
      goal: 'Replace ____ with == so the if compares name to "Alex".',
      starterCode: `# Fill in the blank 👇
name = input("What is your name? ")

if name ____ "Alex":
    print("Welcome back, Alex!")
else:
    print("Hello there!")
`,
      solutionCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
else:
    print("Hello there!")
`,
      hint: "One = assigns. Two == compares. You want to ask a question here.",
      successMessage: "You used == to compare — the decision rule works!",
      failureMessage: 'Need if name == "Alex": with indented prints under if and else.',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code) || !hasIfAlex(code) || !hasElse(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElse(code)) return false;
        return run.stdout.join("\n").includes("Welcome back, Alex!");
      },
    },
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder the decision",
      focusCommand: "if / else",
      commandExplain: "Scrambled if/else helper. Put the lines in a working order.",
      goal: "Reorder the lines, then Run & check.",
      starterCode: "",
      solutionCode: `name = input("What is your name? ")
if name == "Alex":
    print("Welcome back, Alex!")
else:
    print("Hello there!")`,
      parsonsLines: [
        'name = input("What is your name? ")',
        'if name == "Alex":',
        '    print("Welcome back, Alex!")',
        "else:",
        '    print("Hello there!")',
      ],
      hint: "input → if → indented print → else → indented print.",
      successMessage: "Order works — your helper can choose a path.",
      failureMessage: "Check indentation under if/else and the == comparison.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code) || !hasIfAlex(code) || !hasElse(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElse(code)) return false;
        return run.stdout.join("\n").includes("Welcome back, Alex!");
      },
    },
    {
      id: "ex-debug-if",
      kind: "debug",
      title: "Exercise 3 — Debug the decision",
      focusCommand: "if / else",
      commandExplain:
        "This helper is almost right, but the if rule has a bug. Fix it so Alex gets the special welcome.",
      goal: "Find and fix the bug, then Run & check.",
      starterCode: `name = input("What is your name? ")

if name = "Alex":
    print("Welcome back, Alex!")
else:
    print("Hello there!")
`,
      solutionCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
else:
    print("Hello there!")
`,
      debugHint: "comparison vs assignment",
      hint: "Remember: == compares. A single = assigns.",
      successMessage: "Bug squashed! You used == for the comparison.",
      failureMessage: "The if line should compare with ==, not assign with =.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasIfAlex(code)) return false;
        if (!hasElse(code)) return false;
        if (
          /\bif\s+name\s*=\s*["']Alex["']\s*:/.test(code) &&
          !/\bif\s+name\s*==\s*["']Alex["']\s*:/.test(code)
        ) {
          return false;
        }
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElse(code)) return false;
        return run.stdout.join("\n").includes("Welcome back, Alex!");
      },
    },
    {
      id: "ex-predict",
      kind: "predict",
      title: "Exercise 4 — Predict the branch",
      focusCommand: "trace if/else",
      commandExplain: "If name is Riley (not Alex), what will print?",
      goal: "Predict the exact output for Riley.",
      starterCode: `name = "Riley"
if name == "Alex":
    print("Welcome back, Alex!")
else:
    print("Hello there!")
`,
      solutionCode: `name = "Riley"
if name == "Alex":
    print("Welcome back, Alex!")
else:
    print("Hello there!")
`,
      codeReadOnly: true,
      predictionPrompt: "What exact line prints?",
      acceptedPredictions: ["Hello there!", "hello there!"],
      hint: "Riley is not Alex, so the else path runs.",
      successMessage: "You predicted the else branch correctly.",
      failureMessage: "Non-Alex names take the else path.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        return run.stdout.join("\n").includes("Hello there!");
      },
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 5 — Build if/else yourself",
      focusCommand: "from scratch",
      commandExplain:
        "Write a full program: ask for a name; special welcome for Alex; friendly hello for everyone else.",
      goal: "Write the full if/else program.",
      starterCode: `# Decision helper from scratch\n`,
      solutionCode: `name = input("What is your name? ")

if name == "Alex":
    print("Welcome back, Alex!")
else:
    print("Hello there!")
`,
      hint: 'if name == "Alex": … else: … with indented prints',
      successMessage: "You built a rule-based helper from scratch.",
      failureMessage: 'Need input, if name == "Alex":, else:, and indented prints.',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code) || !hasIfAlex(code) || !hasElse(code)) return false;
        if (!hasIndentedPrintIf(code) || !hasIndentedPrintElse(code)) return false;
        // Silent default name is Alex → if branch should run.
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
        body: `Your helper can already **talk** (Lesson 1) and **listen** (Lesson 2). Today it learns the skill that makes a program feel alive: how to **make choices**.\n\nHere's what you'll pick up:\n\n• **\`if\`** — how to check a condition and run code only when it's true.\n• **\`==\` vs \`=\`** — the difference between *comparing* and *assigning* (the #1 beginner mix-up).\n• **\`else\`** — your "plan B" for everything the \`if\` didn't catch.\n\nThink about a video game that greets you with "Welcome back!" but shows a stranger a "Sign up" button, or a phone that unlocks for *your* face but nobody else's. Every one of those is a computer making a choice. Today you write your first one.`,
        image: "/images/lessons/py-3-choice.png",
        imageAlt: "A robot at a forked path choosing between two directions",
        callout: {
          label: "Why it matters",
          text: "Decisions are everywhere: \"if the password is correct, log in — otherwise show an error.\" Games, apps, spam filters, and parental controls are all built from these if/else rules.",
        },
      },
      {
        id: "hook-story",
        kicker: "Think about it",
        title: "The bouncer at the door",
        body: `Picture a bouncer standing at the door of a school dance with a guest list. Every single person who walks up gets asked the exact same question: "Is your name on the list?" There's no guessing, no vibes, no special treatment based on how someone looks — just one clear rule, checked the same way every time.\n\nThat's exactly how your code is about to behave. It will check one condition, and depending on the answer, follow one of two clearly defined paths. No AI "magic," no guessing — just a rule, checked consistently, every single time it's asked.\n\nBy the end of this lesson, your helper will be its own tiny bouncer.`,
      },
      {
        id: "glossary",
        kicker: "Vocabulary",
        title: "Words you'll use today",
        body: `New vocabulary for this lesson.`,
        bullets: [
          "**Condition** — a yes/no question that evaluates to True or False.",
          "**if** — runs code only when its condition is True.",
          "**else** — the fallback path that runs when the if condition is False.",
          "**Comparison operator (`==`)** — checks whether two values are equal.",
          "**Boolean** — a value that is either `True` or `False`.",
        ],
      },
      {
        id: "concept-1",
        kicker: "Building block #1",
        title: "if checks a condition",
        body: `An \`if\` statement asks a simple yes/no question. If the answer is **True**, Python runs the indented lines underneath. If it's **False**, Python skips them entirely.\n\nThink of a bouncer at a school dance checking the guest list: "Is your name on the list? Yes → come in. No → step aside." The \`if\` line is the question; the indented code is what happens when the answer is yes.\n\nTwo things beginners forget: the **colon** \`:\` at the end of the \`if\` line, and **indenting** the code underneath so Python knows it belongs to the \`if\`.`,
        code: `if name == "Alex":\n    print("Welcome back, Alex!")`,
        codeCaption: "Run this only when name is Alex",
        callout: {
          label: "Watch out",
          text: "Forgetting the colon `:` at the end of the `if` line is the most common error here. Python will stop and complain until you add it.",
        },
        checkIn: {
          prompt: 'If `name` is `"Sam"`, does `if name == "Alex":` run its indented code?',
          choices: [
            "No — the condition is False for Sam",
            "Yes — if runs for every name once the program starts",
            "Only if Sam is capitalized the same way as Alex",
          ],
          correctIndex: 0,
          explanation: "\"Sam\" is not equal to \"Alex\", so the condition is False and the indented code under the if is skipped.",
        },
      },
      {
        id: "concept-2",
        kicker: "The #1 mistake",
        title: "== compares, = assigns",
        body: `This one trips up *everyone*, so let's burn it in right now. In Python, one equals sign and two equals signs are completely different tools.\n\n• \`=\` (one equals) means **assign** — put a value into a box: \`name = "Alex"\`. Think of it as an arrow pointing left.\n• \`==\` (two equals) means **compare** — ask "are these two things the same?": \`name == "Alex"\`. This gives back \`True\` or \`False\`.\n\nA good way to remember: one \`=\` *does* something (stores a value), two \`==\` *asks* something (a question). Inside an \`if\`, you're always asking a question, so you almost always want \`==\`.`,
        bullets: [
          "`name = \"Alex\"` → **stores** Alex in the box (an action).",
          "`name == \"Alex\"` → **asks** *is the box equal to Alex?* (True or False).",
          "Lines under `if` must be **indented** (4 spaces) so Python knows they belong to it.",
        ],
        callout: {
          label: "Common misconception",
          text: "Writing `if name = \"Alex\":` (one equals) is a classic bug. You meant to *ask* a question but accidentally told Python to *store* a value. Use `==` inside an `if`.",
        },
        checkIn: {
          prompt: "Which line correctly ASKS whether name equals Alex, inside an if?",
          choices: ['if name = "Alex":', 'if name == "Alex":', 'if name === "Alex":'],
          correctIndex: 1,
          explanation: "Two equals signs (==) compares. A single = would try to assign, which is not valid inside an if condition.",
        },
      },
      {
        id: "concept-3",
        kicker: "Building block #2",
        title: "else handles everyone else",
        body: `An \`if\` on its own only acts when the answer is yes — when it's no, nothing happens at all. But usually you want *something* to happen either way. That's what \`else\` is for.\n\n\`else\` is the **fallback** — your "plan B." It runs whenever the \`if\` condition is **False**, so your program always has something to do. Back to the bouncer: name on the list → "Welcome back!"; name *not* on the list → "Hello there, welcome!" Nobody gets ignored.\n\nThe key rule: only **one** path ever runs. If the \`if\` is true, the \`else\` is skipped. If the \`if\` is false, only the \`else\` runs. Never both.`,
        code: `if name == "Alex":\n    print("Welcome back, Alex!")\nelse:\n    print("Hello there!")`,
        codeCaption: "Two paths, one choice",
        output: `What is your name? Sam\nHello there!`,
        callout: {
          label: "Common misconception",
          text: "Python does **not** run both blocks. It picks exactly one — the `if` block when the condition is true, the `else` block when it's false.",
        },
        checkIn: {
          prompt: "Can both the if block AND the else block run in the same pass through the code?",
          choices: ["Yes, both always run", "Only if the name is empty", "No — exactly one of the two ever runs"],
          correctIndex: 2,
          explanation: "if/else is an either/or choice. Exactly one branch runs each time — never both, never neither.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Let's build a decision together",
        body: `Let's put the pieces together into one decision-making helper, step by step.\n\n**Step 1 — Listen.** Use \`input()\` to ask for a name and store it in the \`name\` box, just like Lesson 2.\n\n**Step 2 — Ask the question.** Write \`if name == "Alex":\` (two equals, with a colon) and indent a special welcome underneath.\n\n**Step 3 — Add plan B.** Write \`else:\` and indent a friendly message for everyone who isn't Alex.\n\n**Step 4 — Run it twice.** Type "Alex" and you'll get the special welcome; type any other name and you'll get the fallback. One program, two different behaviors.`,
        code: `# Step 1: listen for a name\nname = input("What is your name? ")\n\n# Step 2: special path for Alex\nif name == "Alex":\n    print("Welcome back, Alex!")\n# Step 3: plan B for everyone else\nelse:\n    print("Hello there!")`,
        codeCaption: "The finished decision helper, with comments",
        output: `What is your name? Alex\nWelcome back, Alex!`,
        callout: {
          label: "Pro tip",
          text: "When testing a choice, always try *both* answers — one that makes the `if` true and one that makes it false. That's how you prove both paths work.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "\"AI making choices\" isn't thinking",
        body: `Giving code the power to choose is called **rule-based decision making**, and it's exactly how many early AI systems worked: a human writes the rules, and the computer follows them *exactly*. The computer never guesses or has a hunch — it checks your rule and picks a path.\n\nAn "AI making choices" can sound like it's thinking for itself. It isn't — it's following rules a human wrote, one comparison at a time. Smart-looking behavior is just well-organized rules.\n\nThat's actually reassuring: if your helper ever makes a "wrong" choice, it didn't malfunction — your rule just needs to be clearer.`,
      },
      {
        id: "try-it",
        kicker: "Try it — predict",
        title: "Trace the branch before you run it",
        body: `Here's a finished decision helper. The name is set to \`"Riley"\` this time — not Alex. Trace through it: does the condition come out True or False? Which branch runs?`,
        code: `name = "Riley"\nif name == "Alex":\n    print("Welcome back, Alex!")\nelse:\n    print("Hello there!")`,
        codeCaption: "What will this print for Riley?",
        checkIn: {
          prompt: "What exact line prints for Riley?",
          choices: ["Hello there!", "Welcome back, Alex!", "Nothing prints"],
          correctIndex: 0,
          explanation: "\"Riley\" != \"Alex\", so the if condition is False and the else branch runs, printing Hello there!",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Conditions can compare more than names",
        body: `Today you compared text with \`==\`, but conditions can check other things too — like whether a number is bigger or smaller than another (\`>\`, \`<\`), or whether two numbers are equal.\n\nYou'll use these comparison operators constantly as your programs grow: checking a score against a high score, checking someone's age against a rule, or checking how many items are left in a list. The \`if\`/\`else\` shape you learned today stays exactly the same — only the condition changes.`,
        code: `score = 85\nif score >= 90:\n    print("Grade: A")\nelse:\n    print("Keep practicing!")`,
        codeCaption: "if/else works with numbers too",
        output: `Keep practicing!`,
      },
      {
        id: "comparison",
        kicker: "Two ways to do it",
        title: "if/else vs. two separate ifs",
        body: `Compare these two approaches. Both can produce the correct greeting for Alex — but only one **guarantees** exactly one message prints.\n\nWith two separate \`if\` statements, Python checks *both* conditions independently. If you're not careful with your logic, you could accidentally trigger both messages, or neither. \`if\`/\`else\` guarantees exactly one path runs — which is almost always what you want for a either/or decision.`,
        code: `# Risky — two independent ifs\nif name == "Alex":\n    print("Welcome back, Alex!")\nif name != "Alex":\n    print("Hello there!")\n\n# Safer — one if/else guarantees one path\nif name == "Alex":\n    print("Welcome back, Alex!")\nelse:\n    print("Hello there!")`,
        codeCaption: "if/else is the safer pattern for either/or decisions",
      },
      {
        id: "debug-habit",
        kicker: "Debugging habit",
        title: "When \"nothing happens,\" check indentation and colons",
        body: `If you run an \`if\`/\`else\` and *nothing* prints, or the wrong thing prints, check these two things first, in order:\n\n1. Does every \`if\` and \`else\` line end with a colon \`:\`?\n2. Is the code that should run under each one actually **indented**?\n\nThese two small details cause the overwhelming majority of \`if\`/\`else\` bugs. Get in the habit of checking them before anything else.`,
        checkIn: {
          prompt: "Your else: block's print statement isn't indented. What happens?",
          choices: [
            "Python automatically indents it for you",
            "Python raises an error or the print runs outside the else logic",
            "Nothing — indentation is just for looks in Python",
          ],
          correctIndex: 1,
          explanation: "Indentation is required in Python — it's how blocks are defined. Missing indentation under else usually causes an error.",
        },
      },
      {
        id: "habits",
        kicker: "Coder habits",
        title: "Test both branches, every time",
        body: `Whenever you write an \`if\`/\`else\`, get in the habit of running your program *twice*: once with an input that makes the \`if\` True, and once with an input that makes it False.\n\nIf you only ever test the \`if\` path, you have zero evidence the \`else\` path even works. Both paths deserve to be checked before you call the code "done."`,
        bullets: [
          "Test the True path and the False path — every time.",
          "Read your condition out loud as a question: \"is name equal to Alex?\"",
          "If behavior looks wrong, check `==` vs `=` first.",
        ],
      },
      {
        id: "worked-example-2",
        kicker: "Worked example",
        title: "Same code, two different outcomes",
        body: `The power of \`if\`/\`else\` is that **one program** can behave differently depending on the input. Run this mentally twice — once with \`Alex\` and once with \`Sam\`.\n\n**Run 1:** \`name\` holds \`"Alex"\`. The condition \`name == "Alex"\` is True, so the \`if\` branch runs.\n\n**Run 2:** \`name\` holds \`"Sam"\`. The condition is False, so Python skips the \`if\` block and runs \`else\` instead.\n\nSame code, two different greetings — that's decision-making in action.`,
        code: `name = input("What is your name? ")\n\nif name == "Alex":\n    print("Welcome back, Alex!")\nelse:\n    print("Hello, " + name + "!")`,
        codeCaption: "Trace both paths before you run",
        output: `# If you type Alex:\nWelcome back, Alex!\n\n# If you type Sam:\nHello, Sam!`,
        checkIn: {
          prompt: 'If the user types "Jordan", which branch runs?',
          choices: ["The if branch (Welcome back, Alex!)", "The else branch (Hello, Jordan!)", "Both branches run"],
          correctIndex: 1,
          explanation: "Jordan is not equal to Alex, so the if condition is False and the else branch prints the general greeting.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Reflect",
        title: "Think it through",
        body: `*Can you think of a rule in your own life that works like if/else — one thing happens if a condition is true, and something else happens if it's false? (Example: "if it's raining, take an umbrella; else, leave it home.") Write your own example.*`,
      },
      {
        id: "mini-case",
        kicker: "Real world",
        title: "Login screens are if/else at scale",
        body: `Every time you log into an app: **if** the password matches what's on file, you get in; **else**, you see an error message. That's the exact same \`if\`/\`else\` shape you built today, just applied to passwords instead of names.\n\nSpam filters, age verification, parental controls, and game difficulty settings all use this same two-path pattern, often chained together many times.`,
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you build",
        body: `Let's confirm the decision-making pattern is locked in.`,
        checkIn: {
          prompt: 'What is wrong with this code: `if name = "Alex": print("Hi")` `else: print("Bye")`?',
          choices: [
            "It's fine — one equals sign also compares in an if",
            "else needs its own condition written after it",
            "The if line uses = instead of == to compare",
          ],
          correctIndex: 2,
          explanation: "Inside an if, you need == to compare values. A single = tries to assign, which isn't valid there.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've unlocked decision-making: \`if\` to **ask** a yes/no question, \`==\` to **compare** (not \`=\`, which assigns), and \`else\` for the **fallback** path.\n\nIn the exercises you'll build a choosing helper one piece at a time, then test it twice — once with \`Alex\` for the special welcome, and once with a different name for the other message.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/learn/2",
  nextHref: "/learn/4",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
};
