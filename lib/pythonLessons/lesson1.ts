import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function hasNameVariable(code: string) {
  return /\bname\s*=\s*["'][^"']+["']/.test(code);
}

export const lesson1: PythonLessonConfig = {
  id: "lesson-1",
  title: "1. My First AI Helper",
  goal: "Write your first Python program: use a variable + print() to introduce your AI helper.",
  xpReward: 50,
  badge: "The Awakener",
  instructorScript:
    "**Coach’s note**:\nWelcome to Kanam Academy.\nToday, you’re going to teach a computer how to introduce itself.\n\nBig idea (this is also a core AI idea):\n- Computers (and AI systems) do NOT guess.\n- They follow instructions exactly.\n\nWhat you’re building:\n- A **variable** that stores text (your name).\n- A **print()** line that displays a full sentence.\n\nHere’s the program you’re aiming for:\nname = \"Alex\"\nprint(\"Hello! I am \" + name)\n\nTwo super common mistakes (and how to fix them):\n- Quotes: If you forget quotes, Python thinks you mean a variable.\n- Spaces: Python will NOT add spaces for you. Put the space inside the quotes: \"I am \"\n\nSuccess today = your scratch code runs without errors AND prints one sentence that includes your name.",
  kidExplain: [
    {
      title: "Variables = labeled containers",
      text:
        'A **variable** is a labeled box that stores information. In `name = "Alex"`, the label is `name` and the value inside is `"Alex"`.',
    },
    {
      title: "The Assignment Operator (=)",
      text:
        "In Python, `=` does not mean “equals” like in math. It means **assign** — like an arrow that puts data into your labeled box.",
    },
    {
      title: 'What are Strings (" ")?',
      text:
        "Quotes tell Python: “This is text.” In coding, text is called a **string**. Without quotes, Python thinks you are looking for a variable name and will get confused!",
    },
    {
      title: "The Glue (+)",
      text:
        'The `+` joins pieces of text together. `"Hello! I am " + name` creates one single message. Note: Python doesn’t add spaces for you — you must put the space inside the quotes!',
    },
    {
      title: "AI idea: instructions → behavior",
      text:
        "Your AI helper will only do what you tell it. If the output is wrong, it means the instructions (code) need to be clearer.",
    },
  ],
  steps: [
    'Create a variable: `name = "Alex"` (use YOUR name inside quotes).',
    'Print a sentence using +: `print("Hello! I am " + name)`',
    "Run your code and read the console output.",
    "Fix common mistakes: missing quotes, missing spaces inside strings, or Print vs print.",
  ],
  cfu: [
    {
      question: 'Why do spaces inside quotation marks matter (like "I am ")?',
      answer:
        'Python is literal. If you don’t put the space in the quotes, the output will mash words together like "I amAlex".',
    },
    {
      question:
        'What is the difference between the variable name (name) and the string "name"?',
      answer:
        "`name` is a variable that holds a value. \"name\" is just the letters n-a-m-e (text).",
    },
    {
      question: "What are valid variable naming rules in Python?",
      answer:
        "Use letters, numbers, and underscores (no spaces). It can’t start with a number. Example: my_name, name2.",
    },
  ],
  tryThis: [
    "Change the greeting (Easy): Make the message say something new (still include your name).",
    'Add a second variable (Medium): add `mood = "happy"` or `color = "blue"` and print a longer sentence.',
    "Print multiple lines (Bonus): use two print() lines to introduce your helper in 2 sentences.",
  ],
  aiSafetyMoment:
    "Responsible AI: AI tools can help explain code, but they can’t learn for you. You’re responsible for the instructions you write and what your program outputs.",
  commandReference: [
    {
      command: 'name = "..."',
      summary:
        "Creates a variable — a labeled box that stores text. The quotes tell Python this is a string.",
      example: 'name = "Alex"',
    },
    {
      command: "print(...)",
      summary: "Displays a message in the console. Python needs lowercase print, not Print.",
      example: 'print("Hello!")',
    },
    {
      command: "+",
      summary: "Joins strings together. Put spaces inside the quotes — Python won't add them for you.",
      example: '"Hello! I am " + name',
    },
    {
      command: '" " (quotes)',
      summary: "Quotes wrap text (strings). Without them, Python thinks you mean a variable name.",
      example: '"Alex"',
    },
  ],
  exercises: [
    {
      id: "ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill in the name",
      focusCommand: "name =",
      commandExplain:
        "A variable stores text in a labeled box. Fill in the blank so name holds a name, then the print line will greet with it.",
      goal: 'Replace ____ with a name in quotes, like "Alex".',
      starterCode: `# Fill in the blank 👇
name = "____"
print("Hello! I am " + name)
`,
      solutionCode: `name = "Alex"
print("Hello! I am " + name)
`,
      hint: 'Put a name between the quotes, e.g. name = "Alex". Keep the space after "am ".',
      successMessage: "Nice — you stored a name and printed a greeting!",
      failureMessage:
        'Need name = "..." and print("Hello! I am " + name) with a space after "am ".',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameVariable(code)) return false;
        if (!/\bprint\s*\(/.test(code) || !code.includes("+")) return false;
        if (!/["']Hello! I am\s+["']/.test(code)) return false;
        return /Hello! I am\s+\S/.test(run.stdout.join("\n"));
      },
    },
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder the intro",
      focusCommand: "name = + print()",
      commandExplain:
        "These lines make an AI helper introduce itself — but they're scrambled. Put them in the right order.",
      goal: "Reorder the lines, then Run & check.",
      starterCode: "",
      solutionCode: `name = "Alex"
print("Hello! I am " + name)`,
      parsonsLines: [
        'name = "Alex"',
        'print("Hello! I am " + name)',
      ],
      hint: "Create the variable first, then print using it.",
      successMessage: "Nice ordering — your helper introduced itself!",
      failureMessage: "Variable first, then print the greeting with + name.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameVariable(code)) return false;
        if (!/\bprint\s*\(/.test(code) || !code.includes("+")) return false;
        return /Hello! I am\s+\S/.test(run.stdout.join("\n"));
      },
    },
    {
      id: "ex-debug",
      kind: "debug",
      title: "Exercise 3 — Fix the greeting bug",
      focusCommand: "print()",
      commandExplain:
        "This program is supposed to say hello with the name, but something's wrong. Fix it.",
      goal: "Repair the bug so it prints a greeting that includes Alex.",
      starterCode: `name = "Alex"
Print("Hello! I am " + name)
`,
      solutionCode: `name = "Alex"
print("Hello! I am " + name)
`,
      debugHint: "capitalization",
      hint: "Python commands are lowercase.",
      successMessage: "Bug fixed — lowercase print() works.",
      failureMessage: "Use lowercase print(...), not Print(...).",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameVariable(code)) return false;
        if (!/\bprint\s*\(/.test(code)) return false;
        return /Hello! I am\s+Alex/.test(run.stdout.join("\n"));
      },
    },
    {
      id: "ex-predict",
      kind: "predict",
      title: "Exercise 4 — Predict the output",
      focusCommand: "trace the code",
      commandExplain:
        "Read this finished program. Predict exactly what it will print — before you see the answer.",
      goal: "Type your prediction, then Run & check.",
      starterCode: `name = "Sam"
print("Hello! I am " + name)
`,
      solutionCode: `name = "Sam"
print("Hello! I am " + name)
`,
      codeReadOnly: true,
      predictionPrompt: "What exact line will print?",
      acceptedPredictions: ["Hello! I am Sam", "hello! i am sam"],
      hint: "Replace name with Sam inside the sentence.",
      successMessage: "Great tracing — you predicted the output.",
      failureMessage: "Look at the string and the variable value carefully.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        return /Hello! I am\s+Sam/.test(run.stdout.join("\n"));
      },
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 5 — Build it yourself",
      focusCommand: "from scratch",
      commandExplain:
        "No blanks this time. Write a short program that stores a name and prints Hello! I am … using that name.",
      goal: "Write the full program in the editor.",
      starterCode: `# Write your intro program below\n`,
      solutionCode: `name = "Alex"
print("Hello! I am " + name)
`,
      hint: 'You need name = "..." and print("Hello! I am " + name)',
      successMessage: "You built it from scratch.",
      failureMessage:
        'Need name = "..." and print("Hello! I am " + name) with a space after "am ".',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameVariable(code)) return false;
        if (!/\bprint\s*\(/.test(code) || !code.includes("+")) return false;
        if (!/["']Hello! I am\s+["']/.test(code)) return false;
        return /Hello! I am\s+\S/.test(run.stdout.join("\n"));
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
        body: `Welcome to your very first program! By the end of this lesson you'll have built a tiny **AI helper** that introduces itself on screen — something like *"Hello! I am Alex."*\n\nThat may sound simple, but you'll learn the three building blocks that *every* program is made of:\n\n• **Variables** — how a program remembers information.\n• **print()** — how a program shows things to a human.\n• **+** — how a program joins pieces of text into a full message.\n\nThese same three ideas power chatbots, video games, and apps used by billions of people. You're starting at the exact same place every professional programmer once did.`,
        image: "/images/lessons/py-1-hello.png",
        imageAlt: "A friendly robot waving and saying hello",
        callout: {
          label: "Why it matters",
          text: "When you type a message to a chatbot and it greets you back, somewhere a program stored your words in a variable and used something like print() to reply. You're learning the real machinery behind the AI you use every day.",
        },
      },
      {
        id: "hook-story",
        kicker: "True story",
        title: "The world's first \"Hello, World!\"",
        body: `In 1972, a programmer named Brian Kernighan wrote a tiny example program to teach a brand-new language. All it did was print the words \`Hello, world!\` to the screen. It became so famous that to this day, almost every programmer's very first program — in any language, on any computer — prints a greeting exactly like the one you're about to build.\n\nWhy did such a simple program stick around for 50+ years? Because it proves the two most basic superpowers a computer needs: **storing information** and **showing it back to a human**. Everything else in programming — every app, game, and AI — is really just bigger, fancier versions of "Hello, world!"\n\nToday, you're joining that tradition — except your version says hello *using your own name*.`,
        callout: {
          label: "Why it matters",
          text: "Every programmer, from students to the engineers who built ChatGPT, started with a version of this exact exercise. You're standing at the true starting line of coding.",
        },
      },
      {
        id: "glossary",
        kicker: "Vocabulary",
        title: "Words you'll use today",
        body: `A few new words will come up constantly this lesson. Keep this list handy — you'll see these terms again and again throughout the whole course.`,
        bullets: [
          "**Variable** — a labeled box that stores a piece of information, like `name`.",
          "**String** — text wrapped in quotes, like `\"Alex\"`. Anything inside quotes is a string.",
          "**Assign (`=`)** — to put a value into a variable. `name = \"Alex\"` assigns `\"Alex\"` to `name`.",
          "**print()** — the command that displays something on the screen.",
          "**Concatenation** — gluing two pieces of text together with `+`.",
        ],
        callout: {
          label: "Tip",
          text: "You don't need to memorize these right now — just notice them as they come up. By the end of the lesson they'll feel natural.",
        },
      },
      {
        id: "concept-1",
        kicker: "Building block #1",
        title: "A variable is a labeled box",
        body: `A **variable** is a labeled box that stores a piece of information so your program can remember it and use it later.\n\nPicture a row of lockers. Each locker has a **label** (a name) and something **inside** it (a value). In the line below, the label is \`name\` and the value inside is the text \`"Alex"\`.\n\nThe \`=\` sign trips up almost everyone at first. In Python it does **not** mean "equals" like in math. It means **assign**: "put the value on the right *into* the box on the left." You can read \`name = "Alex"\` as *"let name hold Alex."*`,
        code: `name = "Alex"`,
        codeCaption: "Make a variable called name",
        bullets: [
          "**Quotes** ` \" \" ` tell Python *this is text* — programmers call text a **string**.",
          "Without quotes, Python thinks you're naming *another* variable and gets confused.",
          "Good variable names use letters, numbers, and underscores — no spaces (use `my_name`, not `my name`).",
        ],
        callout: {
          label: "Common misconception",
          text: "`name` (no quotes) is the labeled box. `\"name\"` (with quotes) is just the four letters n-a-m-e as text. They are completely different things to Python.",
        },
        checkIn: {
          prompt: 'What does `name = "Alex"` do?',
          choices: [
            "Checks whether name equals Alex",
            "Stores the text Alex inside a box called name",
            "Prints the word Alex to the screen",
          ],
          correctIndex: 1,
          explanation: "= assigns — it stores the value on the right inside the box on the left. Nothing is printed or compared yet.",
        },
      },
      {
        id: "concept-2",
        kicker: "Building block #2",
        title: "print() puts words on the screen",
        body: `A variable stores information, but it stays *invisible* inside its box until you choose to show it. \`print(...)\` is how your program *says something* out loud to the screen. Whatever you put inside the parentheses gets displayed.\n\nWhen you put a variable inside \`print()\`, Python opens the box and shows what's inside — so \`print(name)\` displays \`Alex\`, not the word "name".\n\nPython is picky about spelling: it must be lowercase \`print\`, never \`Print\` or \`PRINT\`. To a computer those are three different words, and only \`print\` is the real command.`,
        code: `name = "Alex"\nprint(name)`,
        codeCaption: "Open the box and show what's inside",
        output: `Alex`,
        callout: {
          label: "Watch out",
          text: "`print(name)` shows the value inside the box (`Alex`). `print(\"name\")` would literally show the word `name`. The quotes are the difference.",
        },
        checkIn: {
          prompt: 'If `name = "Alex"`, what does `print(name)` show?',
          choices: ["name", "Alex", "\"name\""],
          correctIndex: 1,
          explanation: "print(name) with no quotes opens the box and shows what's stored inside it — Alex, not the word name.",
        },
      },
      {
        id: "concept-3",
        kicker: "Building block #3",
        title: "Glue text together with +",
        body: `Right now your helper can only say a name. To make it say a full sentence, you join pieces of text together with the \`+\` sign. Programmers call this **concatenation** — a fancy word for "gluing strings end to end."\n\nImagine taping two strips of paper together: \`"Hello! I am "\` + \`"Alex"\` becomes one strip that reads \`Hello! I am Alex\`.\n\nThe #1 beginner trap: Python will **not** add spaces for you. It glues text *exactly*, with zero help. So the space between "am" and your name has to live *inside* the quotes.`,
        code: `name = "Alex"\nprint("Hello! I am " + name)`,
        codeCaption: "Join a greeting and the name",
        output: `Hello! I am Alex`,
        callout: {
          label: "Common misconception",
          text: "If you write `\"Hello! I am\"` with no space after `am`, you get `Hello! I amAlex` mashed together. Put the space inside the quotes: `\"Hello! I am \"`.",
        },
        checkIn: {
          prompt: 'Why does `"Hello! I am" + name` print `Hello! I amAlex` (no space)?',
          choices: [
            "Python is broken",
            "+ never adds spaces — the space must be typed inside the quotes",
            "The variable name is spelled wrong",
          ],
          correctIndex: 1,
          explanation: "Concatenation glues text exactly as written. If you want a space, you must put it inside the quotes yourself.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Let's build it together, line by line",
        body: `Watch how the three blocks combine into one working program. We'll build it the way a real programmer does — one line at a time, checking what happens.\n\n**Step 1 — Store the name.** We make a box called \`name\` and put text inside it. Nothing prints yet; we're just remembering it.\n\n**Step 2 — Glue the sentence.** Inside \`print()\`, we join the greeting \`"Hello! I am "\` with the \`name\` box using \`+\`. Notice the space living inside the quotes after "am".\n\n**Step 3 — Run it.** Python reads top to bottom: it fills the box, then builds and shows the sentence. Out comes your helper's greeting.`,
        code: `# Step 1: remember the name\nname = "Alex"\n\n# Step 2 & 3: build the sentence and show it\nprint("Hello! I am " + name)`,
        codeCaption: "The finished program, with comments explaining each part",
        output: `Hello! I am Alex`,
        callout: {
          label: "Pro tip",
          text: "Lines starting with `#` are comments — notes for humans that Python ignores. Good programmers use them to explain *why* their code does something.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "\"The computer messed up\" — or did it?",
        body: `Here's the most important idea in all of coding — and in AI: **computers do not guess.** They follow your instructions *exactly*, in the exact order you write them.\n\nThink of giving instructions to an extremely literal friend. If you say "make a sandwich" they're stuck — but if you say "take two slices of bread, spread peanut butter on one, jelly on the other, press them together," they can do it perfectly. A computer is that friend, times a million: precise, fast, and totally unable to fill in the blanks for you.\n\nThis is *good news*. It means when something goes wrong, the computer didn't "break" or make a mistake — your **instructions** just need to be clearer. Debugging is simply rereading your recipe.`,
        callout: {
          label: "Common misconception",
          text: "Beginners often think \"the computer messed up.\" Almost always, the code did exactly what it was told — it just wasn't told quite what we meant. Fixing code = fixing instructions.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it — predict",
        title: "Before you run it, predict it",
        body: `Real coders read code *before* they run it, and guess what will happen. Look at this snippet closely: the name box holds \`"Maya"\`, then the greeting is glued together with \`+\`.\n\nTrace it in your head: what text is inside \`name\`? What does the printed sentence look like once the two pieces are glued together?`,
        code: `name = "Maya"\nprint("Hello! I am " + name)`,
        codeCaption: "What will this print?",
        checkIn: {
          prompt: "What exact line will this program print?",
          choices: ["Hello! I am Maya", "Hello! I am name", "Maya Hello! I am"],
          correctIndex: 0,
          explanation: "The name box holds \"Maya\", so gluing \"Hello! I am \" + name produces Hello! I am Maya.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Not every value is a string",
        body: `Everything you've stored so far has been a **string** — text wrapped in quotes. But Python has other data types too. Numbers don't need quotes: \`age = 12\` stores a **number**, not text.\n\nHere's the catch you'll meet again soon: you can glue two strings together with \`+\`, but you **can't** directly glue a string and a number that way — Python will complain. For now, just notice the difference: \`"12"\` (a string, in quotes) and \`12\` (a number, no quotes) look similar but behave differently.\n\nThis distinction — **data types** — is one of the biggest ideas in all of programming, and you'll build on it in the very next lesson.`,
        callout: {
          label: "Preview",
          text: "You'll meet numbers and other data types properly soon. For today, just remember: quotes mean text (a string); no quotes usually means a number.",
        },
      },
      {
        id: "comparison",
        kicker: "Two ways to do it",
        title: "Same output, different code",
        body: `There's often more than one correct way to write a program. Both snippets below print the exact same greeting — one stores the name in a variable first, the other doesn't bother with a variable at all.\n\nSo which is better? The variable version. Even though it's a tiny bit longer, it's easier to **change** — update the name once, and the greeting updates with it. Real programmers usually trade a couple extra characters for code that's easier to read and maintain.`,
        code: `# Version A — no variable\nprint("Hello! I am " + "Alex")\n\n# Version B — with a variable\nname = "Alex"\nprint("Hello! I am " + name)`,
        codeCaption: "Both print the same thing",
        output: `Hello! I am Alex`,
        callout: {
          label: "Why it matters",
          text: "Version B is more flexible: change name once at the top, and every place that uses it updates automatically. That habit becomes essential in bigger programs.",
        },
      },
      {
        id: "debug-habit",
        kicker: "Debugging habit",
        title: "Read the error message before you panic",
        body: `Every coder — beginner and expert — writes code that breaks. The difference is experienced coders **read the error message first** instead of guessing randomly.\n\nA good debugging habit: (1) find the line number Python mentions, (2) reread that exact line out loud, (3) check for the classics — missing quotes, missing colons, wrong capitalization (\`Print\` vs \`print\`), or a missing \`+\`.\n\nMost beginner bugs in this lesson come from just two things: forgetting a quote mark, or capitalizing \`Print\`. Check those first, every time.`,
        checkIn: {
          prompt: 'Your code has `Print("Hello! I am " + name)` and nothing runs. What\'s the bug?',
          choices: [
            "The + sign is broken",
            "print must be lowercase — Print is not a valid command",
            "The variable name is too short",
          ],
          correctIndex: 1,
          explanation: "Python commands are case-sensitive. print (lowercase) is the real command; Print and PRINT are not recognized.",
        },
      },
      {
        id: "habits",
        kicker: "Coder habits",
        title: "Habits that separate beginners from pros",
        body: `A few small habits will make every future lesson easier:\n\n• **Name variables clearly.** \`name\` is better than \`x\` — anyone reading your code (including future-you) instantly knows what it holds.\n• **Test after every change.** Don't write ten lines and run once — write one or two, run, confirm it works, then continue.\n• **Comment your intent.** A short \`# this stores the user's name\` helps you (and others) understand code weeks later.\n• **Read before you run.** Predicting output before pressing Run is how you catch mistakes early and learn faster.`,
        bullets: [
          "Clear names beat clever names.",
          "Small steps, tested often, beat big leaps.",
          "A comment that explains *why* is more useful than one that repeats *what*.",
        ],
      },
      {
        id: "standards-connect",
        kicker: "Why this counts",
        title: "This lesson meets a real CS standard",
        body: `This isn't just a fun exercise — it's aligned to a real computer science learning standard used in classrooms nationwide.\n\n**CSTA 2-AP-11**: *Create clearly named variables that represent different data types and perform operations on their values.*\n\nToday you created a clearly named variable (\`name\`), gave it a data type (a string), and performed an operation on it (joining it with \`+\`). That's exactly what this standard asks for — you just did real, standards-aligned computer science.`,
        callout: {
          label: "Standard",
          text: "CSTA 2017, Algorithms & Programming, Level 2 (grades 6–8): 2-AP-11 — Create clearly named variables that represent different data types and perform operations on their values.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Reflect",
        title: "Think it through",
        body: `Before you move on, think about this (no need to write anything down unless your teacher asks):\n\n*If you handed your finished program to a friend who had never coded before, could they guess what \`name = "Alex"\` and \`print(...)\` do just by reading it? What would you tell them each piece is for?*\n\nBeing able to explain your own code in plain English is one of the clearest signs that you actually understand it — not just that you got lucky with the syntax.`,
      },
      {
        id: "mini-case",
        kicker: "Real world",
        title: "Where this shows up in real apps",
        body: `Think about the last app that greeted you by name — a game that said "Welcome back, [your name]!", or an email that opened with "Hi [your name],". Behind the scenes, that app did exactly what you did today: it **stored** your name in a variable, and used something like \`print()\` (or its on-screen equivalent) to **display** a personalized message.\n\nEven massive AI chat assistants follow this same basic pattern at their core: store information, then use it to construct a response. You just built the tiniest, simplest version of that idea — and it's the same idea, just scaled up.`,
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you build",
        body: `Let's make sure the three building blocks are locked in before you head to the exercises.`,
        checkIn: {
          prompt: 'What is wrong with this line: `print("Hello! I am" + name)` if you want a space before the name?',
          choices: [
            "Nothing — it will print correctly",
            "There's no space inside the quotes after \"am\", so the output will be mashed together",
            "You need to use == instead of +",
          ],
          correctIndex: 1,
          explanation: "+ doesn't add spaces automatically. Without a space inside the quotes after \"am\", the output reads like Hello! I amAlex.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've met the three building blocks of every program: a **variable** to remember, **print()** to show, and **+** to join text.\n\nIn the exercises you'll build this program one piece at a time — first the variable, then print, then the glue — and run it to watch your AI helper come to life with *your* name. If something looks off, remember: the computer did exactly what you told it, so just reread your instructions.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/",
  nextHref: "/learn/2",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
};
