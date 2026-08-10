import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

/** Runner fills empty input() with this silent default. */
const DEFAULT_NAME = "Alex";

function hasNameInput(code: string) {
  return /\bname\s*=\s*input\(/.test(code);
}

function hasNiceToMeetPrint(code: string) {
  return /\bprint\s*\(\s*["'][^"']*["']\s*\+\s*name\s*\)/.test(code);
}

export const lesson2: PythonLessonConfig = {
  id: "lesson-2",
  title: "2. My AI Helper Listens",
  goal: "Use input() to collect information and respond using the user’s input.",
  xpReward: 100,
  badge: "Listener",
  instructorScript:
    "**Coach’s note**:\nLast time, our AI helper could talk.\nToday, we’re going to teach it how to **listen**.\n\nWe do that with input(). Think of input() like a pause button:\n- Your program stops.\n- The user types something.\n- When they press Enter, that answer becomes a value.\n\nImportant AI idea:\n- AI systems respond to input, but they do NOT think or choose answers on their own.\n- Different input can create different output, but the behavior still follows rules written by humans.\n\nKey reminder:\n- input() always returns text (a string).\n- If you want to use the input later, store it in a variable.\n\nHow to test like a pro:\nRun it with two different names and watch how the output changes.",
  kidExplain: [
    {
      title: "What is input()?",
      text:
        "This command pauses the program and waits for the user to type something. Whatever they type gets saved into a variable (your bot’s “memory box”).",
    },
    {
      title: "Input is always text",
      text:
        "Even if you type numbers, input() gives your program text (a string). That’s why we often store it in a variable first.",
    },
    {
      title: "Store input in a variable",
      text:
        "We save the user’s answer in a variable like name so we can reuse it later in our print() message.",
    },
    {
      title: "Output uses the input",
      text:
        "When you print using the variable, the program’s output changes based on what the user typed.",
    },
  ],
  steps: [
    'Ask the question: `name = input("What is your name? ")`',
    "Store the input in a variable called name.",
    'Print a response that uses the variable: `print("Nice to meet you, " + name)`',
    "Run it with different inputs to confirm different names produce different output.",
  ],
  cfu: [
    {
      question: "Why does input() always return text?",
      answer:
        "Because input() reads what the user typed as characters. In Python, that’s a string (text).",
    },
    {
      question: "What happens if you use input() but don’t store it in a variable?",
      answer:
        "You can’t reuse the answer later. The program will read it once, but you won’t have a named box to refer to.",
    },
    {
      question: "How does changing the input change the output in this program?",
      answer:
        "The variable (like name) holds whatever the user typed, so the printed message changes when the input changes.",
    },
  ],
  tryThis: [
    "Ask two questions (Easy): Ask for a name AND a favorite color.",
    "Change the response (Medium): Make your helper say something new using the name.",
    "Use two inputs together (Bonus): Print one sentence that includes both answers.",
  ],
  aiSafetyMoment:
    "Responsible AI: AI can respond to input, but it doesn’t understand like a human. Humans write the rules and are responsible for the outcomes.",
  commandReference: [
    {
      command: 'input("...")',
      summary: "Pauses the program and waits for the user to type. Always returns text (a string).",
      example: 'name = input("What is your name? ")',
    },
    {
      command: "print(...)",
      summary: "Displays a response in the console after reading input.",
      example: 'print("Nice to meet you, " + name)',
    },
    {
      command: "+",
      summary: "Joins the greeting text with the variable holding the user's answer.",
      example: '"Nice to meet you, " + name',
    },
    {
      command: "variable =",
      summary: "Store input() in a variable so you can reuse the answer later.",
      example: 'name = input("What is your name? ")',
    },
  ],
  exercises: [
    {
      id: "ex-fill",
      kind: "fill",
      title: "Exercise 1 — Fill in input()",
      focusCommand: "input()",
      commandExplain:
        "input() pauses and waits for the user to type. Fill in the blank so the answer is stored in name.",
      goal: 'Replace ____ with input so the program asks for a name.',
      starterCode: `# Fill in the blank 👇
name = ____("What is your name? ")
print("Nice to meet you, " + name)
`,
      solutionCode: `name = input("What is your name? ")
print("Nice to meet you, " + name)
`,
      hint: "The command that listens is input — type it in the blank.",
      successMessage: "You taught your helper to listen with input()!",
      failureMessage: 'Need name = input("...") and print("Nice to meet you, " + name).',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasNiceToMeetPrint(code)) return false;
        return run.stdout.join("\n").includes(`Nice to meet you, ${DEFAULT_NAME}`);
      },
    },
    {
      id: "ex-parsons",
      kind: "parsons",
      title: "Exercise 2 — Reorder the listener",
      focusCommand: "input() + print()",
      commandExplain: "Scrambled lines: ask for a name, then greet them. Put the lines in order.",
      goal: "Reorder the lines, then Run & check.",
      starterCode: "",
      solutionCode: `name = input("What is your name? ")
print("Nice to meet you, " + name)`,
      parsonsLines: [
        'name = input("What is your name? ")',
        'print("Nice to meet you, " + name)',
      ],
      hint: "Listen (input) first, then respond (print).",
      successMessage: "Order is right — your helper listened and replied.",
      failureMessage: "Need input into name, then print a greeting with + name.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasNiceToMeetPrint(code)) return false;
        return run.stdout.join("\n").includes(`Nice to meet you, ${DEFAULT_NAME}`);
      },
    },
    {
      id: "ex-debug",
      kind: "debug",
      title: "Exercise 3 — Debug the listener",
      focusCommand: "input()",
      commandExplain: "This program should ask for a name and greet them, but it's broken.",
      goal: "Fix the bug so it listens and responds.",
      starterCode: `name = input(What is your name? )
print("Nice to meet you, " + name)
`,
      solutionCode: `name = input("What is your name? ")
print("Nice to meet you, " + name)
`,
      debugHint: "quotes / string",
      hint: "The question inside input() needs quotes around it.",
      successMessage: "Fixed — input() needs a quoted prompt string.",
      failureMessage: 'Use input("What is your name? ") with quotes around the question.',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasNiceToMeetPrint(code)) return false;
        return run.stdout.join("\n").includes(`Nice to meet you, ${DEFAULT_NAME}`);
      },
    },
    {
      id: "ex-predict",
      kind: "predict",
      title: "Exercise 4 — Predict the greeting",
      focusCommand: "trace variable → output",
      commandExplain: "If name is Jordan, what will this program print?",
      goal: "Predict the exact output, then Run & check.",
      starterCode: `name = "Jordan"
print("Nice to meet you, " + name)
`,
      solutionCode: `name = "Jordan"
print("Nice to meet you, " + name)
`,
      codeReadOnly: true,
      predictionPrompt: "What exact line prints?",
      acceptedPredictions: ["Nice to meet you, Jordan", "nice to meet you, jordan"],
      hint: "The name variable is Jordan, so that word appears in the greeting.",
      successMessage: "You traced the variable to the output correctly.",
      failureMessage: "Use the name Jordan inside the greeting sentence.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        return run.stdout.join("\n").includes("Nice to meet you, Jordan");
      },
    },
    {
      id: "ex-scratch",
      kind: "scratch",
      title: "Exercise 5 — Build a listener",
      focusCommand: "from scratch",
      commandExplain: "Write a program that asks for a name and prints Nice to meet you, … using that name.",
      goal: "Write the full program yourself.",
      starterCode: `# Ask for a name, then greet them\n`,
      solutionCode: `name = input("What is your name? ")
print("Nice to meet you, " + name)
`,
      hint: 'name = input("...") then print("Nice to meet you, " + name)',
      successMessage: "You built a listening helper from scratch.",
      failureMessage: 'Need input into name and print("Nice to meet you, " + name).',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameInput(code)) return false;
        if (!hasNiceToMeetPrint(code)) return false;
        return run.stdout.join("\n").includes(`Nice to meet you, ${DEFAULT_NAME}`);
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
        body: `In Lesson 1 your AI helper could *talk*. Today you'll give it a brand-new sense: the ability to **listen**. By the end, your helper will ask a question, wait for an answer, and reply using whatever the person typed.\n\nHere's the plan:\n\n• **\`input()\`** — how your program pauses and waits for someone to type.\n• **Storing the answer** — catching what they typed in a variable so you can reuse it.\n• **Responding** — gluing the answer into a personalized reply with \`+\`.\n\nThink about every app you use: when you search YouTube, log into a game, or message a chatbot, the very first thing it does is *listen* to you. That two-way conversation — you type, it responds — starts with this one command.`,
        image: "/images/lessons/py-2-listen.png",
        imageAlt: "A friendly robot cupping its ear to listen",
        callout: {
          label: "Why it matters",
          text: "Every chatbot, search bar, and sign-up form has to listen before it can help you. Once your program can take input, it stops being a fixed script and starts having a real conversation with whoever is using it.",
        },
      },
      {
        id: "hook-story",
        kicker: "Think about it",
        title: "A TV vs. a conversation",
        body: `Imagine two machines. The first is a TV: it plays the same show no matter who's in the room, and it never reacts to anything you say. The second is a friend: you ask a question, they listen, they answer *you* specifically.\n\nEvery program you've written so far has been the TV — it prints the exact same thing every single run. Today you turn your helper into the friend. The very first thing almost every useful app does — a login screen, a search bar, a game character creator — is **listen** before it does anything else.\n\nBy the end of this lesson your helper will feel less like a poster on a wall and more like something you're actually talking *with*.`,
        callout: {
          label: "Why it matters",
          text: "The difference between a script and a conversation is exactly the difference between print() alone and input() + print() together.",
        },
      },
      {
        id: "glossary",
        kicker: "Vocabulary",
        title: "Words you'll use today",
        body: `New vocabulary for this lesson — keep it handy while you read.`,
        bullets: [
          "**input()** — a command that pauses the program and waits for the user to type.",
          "**Prompt** — the question text shown inside `input(\"...\")`.",
          "**String** — text (what `input()` always returns, even for numbers).",
          "**Store** — to save a value in a variable so you can use it later.",
        ],
      },
      {
        id: "concept-1",
        kicker: "Building block #1",
        title: "input() asks a question and waits",
        body: `Whatever text you put inside \`input("...")\` becomes the question the user sees on screen. Picture a cashier asking "What can I get you?" and then standing there, patiently, until you answer. Your program does the same thing — it will not move to the next line until the user types something and hits Enter.\n\nBut here's the catch: the answer doesn't stick around on its own. If you don't *catch* it, it vanishes. So you store it in a **variable** — the same labeled box from Lesson 1. The line \`name = input("What is your name? ")\` says: "ask the question, then put their answer in the box called \`name\`."`,
        code: `name = input("What is your name? ")`,
        codeCaption: "Ask, then store the answer in name",
        callout: {
          label: "Common misconception",
          text: "Writing `input(\"What is your name? \")` on its own *does* ask the question — but without `name =` in front, the answer isn't saved anywhere, so you can't use it later. Always store input in a variable.",
        },
        checkIn: {
          prompt: "What happens if you write `input(\"What is your name? \")` with no `name =` in front?",
          choices: [
            "The question is asked, but the answer isn't saved anywhere",
            "Python won't run at all",
            "The answer is automatically saved as a number",
          ],
          correctIndex: 0,
          explanation: "input() still asks the question, but without a variable to catch the answer, it's asked and then immediately lost.",
        },
      },
      {
        id: "concept-2",
        kicker: "Watch out",
        title: "input() always gives back text",
        body: `Here's a surprise that trips up almost every beginner: \`input()\` **always** hands your program **text**, even when the user types numbers.\n\nIf someone types \`12\`, your program receives the *text* \`"12"\` — the two characters one and two — not the *number* 12. Programmers call text a **string**. It's like the difference between the photo of a sandwich and the actual sandwich: \`"12"\` looks like a number but you can't do math with it yet.\n\nFor this lesson we're collecting **names**, so text is exactly what we want. (In a later lesson you'll learn how to convert text into real numbers when you need to do math.)`,
        bullets: [
          "Always **store** the answer: `name = input(...)`.",
          "The value is **text** (a string) until you convert it on purpose.",
          "Change the input → change the output. That's the whole point of listening.",
        ],
        callout: {
          label: "Common misconception",
          text: "`\"12\"` (text) and `12` (a number) are different to Python. Trying to do math on input straight from `input()` will surprise you until you convert it — but for names, text is perfect.",
        },
        checkIn: {
          prompt: 'If a user types `12` into `input()`, what does Python actually store?',
          choices: ["The number 12", "The text \"12\"", "Nothing — it errors"],
          correctIndex: 1,
          explanation: "input() always returns a string, even if it looks like a number. \"12\" is text until you deliberately convert it.",
        },
      },
      {
        id: "concept-3",
        kicker: "Building block #2",
        title: "Respond using what they typed",
        body: `A helper that listens but never replies isn't much fun. Now you'll make it *respond* by gluing your greeting to the stored answer with \`+\`, exactly like you did in Lesson 1.\n\nBecause the message uses the **variable** instead of a fixed name, the very same line of code greets *every* person by *their own* name. Type "Alex" and it says "Nice to meet you, Alex." Type "Maria" and it says "Nice to meet you, Maria." One line, infinite personalized replies.`,
        code: `name = input("What is your name? ")\nprint("Nice to meet you, " + name)`,
        codeCaption: "Listen, then respond",
        output: `What is your name? Alex\nNice to meet you, Alex`,
        callout: {
          label: "Watch out",
          text: "Remember the space! `\"Nice to meet you, \"` keeps the comma and space inside the quotes so the name doesn't get mashed against the greeting.",
        },
        checkIn: {
          prompt: "Why does the SAME line of code produce different greetings for different users?",
          choices: [
            "print() automatically detects who is using the computer",
            "Python randomly picks a name",
            "The variable name holds whatever was typed, so the printed message changes each run",
          ],
          correctIndex: 2,
          explanation: "Because the message uses the variable (not a hardcoded name), the output changes based on whatever was stored in it.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Let's build a listener together",
        body: `Let's combine the pieces into one working conversation, the way a real programmer does — one line at a time.\n\n**Step 1 — Ask and store.** We write \`input()\` with our question and put \`name =\` in front so the answer lands in the \`name\` box. Python pauses here and waits.\n\n**Step 2 — Build the reply.** Inside \`print()\`, we glue the greeting \`"Nice to meet you, "\` to the \`name\` box with \`+\`.\n\n**Step 3 — Run it twice.** Run it once and type "Alex"; run it again and type "Maria". Same code, different output — proof your helper is really listening.`,
        code: `# Step 1: ask a question and remember the answer\nname = input("What is your name? ")\n\n# Step 2 & 3: reply using whatever they typed\nprint("Nice to meet you, " + name)`,
        codeCaption: "The finished listening helper, with comments",
        output: `What is your name? Maria\nNice to meet you, Maria`,
        callout: {
          label: "Pro tip",
          text: "Real developers always test with *more than one* input. If your program works for \"Alex\" but you never try another name, you don't actually know it works for everyone.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "\"It only works for one name\"",
        body: `A common worry is: "did I just build a program that only works for Alex?" No! The program doesn't know or care about any specific name. It only knows about the **box** called \`name\`.\n\nWhatever gets poured into that box — Alex, Maria, Jordan, or anything else — is what comes out in the greeting. The code itself never changes; only the *contents of the box* change each time someone runs it.\n\nThis is the real power of variables: one small piece of code, endless different results.`,
      },
      {
        id: "try-it",
        kicker: "Try it — predict",
        title: "Trace it before you run it",
        body: `Here's a finished listening helper. Imagine the user types \`Chris\` when asked for their name. Trace through the code line by line before checking your answer.`,
        code: `name = input("What is your name? ")\nprint("Nice to meet you, " + name)`,
        codeCaption: "The user types: Chris",
        checkIn: {
          prompt: 'If the user types "Chris", what exact line prints?',
          choices: ["Nice to meet you, Chris", "Nice to meet you, name", "Chris, nice to meet you"],
          correctIndex: 0,
          explanation: "The name box holds Chris, so gluing the greeting with + name prints Nice to meet you, Chris.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Ask more than one question",
        body: `Nothing stops you from calling \`input()\` more than once in the same program. Each call pauses, waits, and stores into whatever variable you choose — you could ask for a name, then a favorite color, then use *both* in one final message.\n\nThis is how longer conversations are built: not one giant \`input()\`, but several small, focused questions asked one at a time, each stored in its own clearly named variable.`,
        code: `name = input("What is your name? ")\ncolor = input("What is your favorite color? ")\nprint(name + " likes " + color + "!")`,
        codeCaption: "Two questions, one combined reply",
        output: `What is your name? Sam\nWhat is your favorite color? teal\nSam likes teal!`,
      },
      {
        id: "comparison",
        kicker: "Two ways to do it",
        title: "input() vs. a fixed variable",
        body: `Compare these two snippets. The first *asks* the user for their name; the second just *assumes* a fixed name. Both can print a greeting, but only one actually **listens**.\n\nUse a fixed variable when you're testing quickly or don't need a real answer from a person. Use \`input()\` whenever your program should react to whoever is actually using it — which is almost always the more useful choice for a real app.`,
        code: `# Fixed — always the same, no listening\nname = "Alex"\nprint("Nice to meet you, " + name)\n\n# Listening — reacts to the real user\nname = input("What is your name? ")\nprint("Nice to meet you, " + name)`,
        codeCaption: "Only the second version truly listens",
      },
      {
        id: "debug-habit",
        kicker: "Debugging habit",
        title: "Trace missing quotes first",
        body: `A very common bug this lesson: forgetting quotes around the question inside \`input(...)\`. Without quotes, Python thinks you're referring to a variable, not writing text — and it will complain that it can't find one.\n\nDebugging habit: whenever you see an error mentioning something you *know* was supposed to be plain text, check whether you forgot the quote marks around it. It's one of the single most common beginner errors in this whole course.`,
        checkIn: {
          prompt: 'What is the bug in `name = input(What is your name? )`?',
          choices: [
            "Nothing, it's correct",
            "input should be capitalized",
            "The question text is missing quotes around it",
          ],
          correctIndex: 2,
          explanation: "Text inside input() must be wrapped in quotes, or Python thinks you're referencing a variable name instead of writing a string.",
        },
      },
      {
        id: "habits",
        kicker: "Coder habits",
        title: "Test with more than one input",
        body: `Professional developers never test with just one example. If you only ever type "Alex" while testing, you have no idea whether your program actually works for anyone else.\n\nBuild the habit now: after writing an \`input()\`-based program, run it at least twice with two *very different* answers — a short name and a long one, for example. If both work, you can trust your code much more.`,
        bullets: [
          "Test with at least two different inputs, not just one.",
          "Try an input that might break things (very short, very long, unusual characters).",
          "If something breaks, note exactly *what you typed* — that's your first debugging clue.",
        ],
      },
      {
        id: "bug-walkthrough-prompt",
        kicker: "Bug walkthrough",
        title: "When input() crashes before you can type",
        body: `One of the most common crashes in this lesson happens when the question inside \`input()\` isn't wrapped in quotes. Python then thinks each word is a variable name — and since those variables don't exist, the program stops immediately.\n\nCompare the broken and fixed versions below. The only difference is quotes around the prompt text, but that tiny change is the difference between a crash and a working helper.`,
        code: `# Broken — no quotes around the prompt\nname = input(What is your name?)\n\n# Fixed — quotes tell Python this is text\nname = input("What is your name? ")\nprint("Nice to meet you, " + name)`,
        codeCaption: "Missing quotes on the prompt is a classic first-week bug",
        checkIn: {
          prompt: "Why does `input(What is your name?)` crash?",
          choices: [
            "You need two input() lines instead of one",
            "input() only works with numbers",
            "Python thinks What, is, your, and name are variable names that don't exist",
          ],
          correctIndex: 2,
          explanation: "Without quotes, Python treats each word as a variable reference. Since those variables were never created, it raises an error.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Reflect",
        title: "Think it through",
        body: `*Why is a program that can only print one fixed message less useful than one that listens first? Can you think of an app on your phone that would be useless without input()?*\n\nTry to name at least one real app and describe exactly what it "listens" for before it responds.`,
      },
      {
        id: "mini-case",
        kicker: "Real world",
        title: "Search bars are giant input() boxes",
        body: `Every time you type into a search bar — YouTube, Google, an app store — you're using a fancier version of \`input()\`. The app waits for you to type, catches what you typed, and uses it to decide what to show you next.\n\nThe pattern is identical to what you built today: **ask, wait, store, respond** — just scaled up with a lot more code around it.`,
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before you build",
        body: `Let's confirm the listening pattern is locked in before the exercises.`,
        checkIn: {
          prompt: "Put these steps in the right order: (A) print a reply using the variable, (B) store the answer in a variable, (C) ask a question with input().",
          choices: ["A, B, C", "B, C, A", "C, B, A"],
          correctIndex: 2,
          explanation: "First ask the question (C), which also stores the answer (B happens as part of the same line), then respond using it (A). The listen-then-respond order is: ask & store, then reply.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've added a powerful new skill: your helper can **ask** with \`input()\`, **remember** the answer in a variable, and **respond** by joining text with \`+\`.\n\nIn the exercises you'll build this listening helper one step at a time — first the question, then the reply, then the personalized greeting.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  prevHref: "/learn/1",
  nextHref: "/learn/3",
  dashboardHref: "/dashboard",
  coachNoteGateSeconds: 8,
};
