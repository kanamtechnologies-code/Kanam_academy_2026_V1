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

export const lesson11: PythonLessonConfig = {
  id: "lesson-11",
  title: "11. Giving Functions Better Information (Parameters)",
  goal: "Use a parameter so one function can work with different details.",
  xpReward: 600,
  badge: "🎮 Parameter Pro",
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
    durationLabel: "~5 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "One skill, many details",
        body: `Last lesson your function always did the *exact same thing*. But what if you want one "attack" skill that works on **any** enemy?\n\nYou don't build a new button for every enemy — you press the same button and tell the game *who* to attack. That extra information is a **parameter**: a value you hand to a function so it knows what to do *this* time.`,
        image: "/images/lessons/py-11-parameter.png",
        imageAlt: "A machine with a slot where different inputs can be inserted",
        callout: {
          label: "Where you see it",
          text: "A \"send message\" function takes *who* and *what text*. A \"play song\" function takes *which song*. Same skill, different details each time.",
        },
      },
      {
        id: "param",
        kicker: "Building block",
        title: "A parameter is a blank to fill in",
        body: `Put a name inside the function's parentheses — that's the **parameter**. Inside the function it behaves like a variable. The function **waits** for you to give it a value.`,
        code: `def attack(enemy):\n    print("You attack the " + enemy + "!")`,
        codeCaption: "enemy is a blank waiting for a value",
      },
      {
        id: "pass",
        kicker: "Use it",
        title: "Pass a value when you call",
        body: `When you call the function, put a value in the parentheses. That value fills the parameter — so the **same** skill produces **different** output each time.`,
        code: `attack("goblin")\nattack("dragon")\nattack("boss")`,
        codeCaption: "Same skill, three different details",
        output: `You attack the goblin!\nYou attack the dragon!\nYou attack the boss!`,
        bullets: [
          "The name in `def attack(enemy):` is the **parameter**.",
          "The value in `attack(\"goblin\")` is the **argument** you pass in.",
          "The function never guesses — **you** choose the value.",
        ],
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Make a flexible skill",
        body: `In the exercises you'll add a parameter to a function, use it inside the message, then call the function with different values and watch the output change.\n\nClick **Start the exercises** when you're ready.`,
      },
    ],
  },
  exercises: [
    {
      id: "ex-param-def",
      title: "Exercise 1 — Add a parameter",
      focusCommand: "def attack(enemy):",
      commandExplain:
        "Put one name inside the parentheses. That name becomes a variable inside the function.",
      goal: "Define a function with exactly one parameter.",
      starterCode: `# Fill in the blank 👇
def attack(____):
    print("You attack the " + enemy + "!")
`,
      hint: "Type enemy (or another name) inside the parentheses.",
      successMessage: "Parameter added! Your function can receive information now.",
      failureMessage: "Define def attack(something): with one parameter name inside ().",
      validate: (code: string) => {
        if (rejectsUppercasePrint(code)) return false;
        const { fn, param } = getDefWithParam(code);
        return Boolean(fn && param);
      },
    },
    {
      id: "ex-use-param",
      title: "Exercise 2 — Use the parameter",
      focusCommand: "print + parameter",
      commandExplain:
        "The parameter works like a variable inside the function. Include it in your print message.",
      goal: "Print a message that uses the parameter inside the function.",
      starterCode: `# Fill in the blank 👇
def attack(enemy):
    print("You attack the " + ____ + "!")
`,
      hint: "Use the parameter name (enemy) inside the print.",
      successMessage: "Nice! The message will change based on what you pass in.",
      failureMessage: "Use the parameter name inside print(...), e.g. + enemy +",
      validate: (code: string) => {
        if (rejectsUppercasePrint(code)) return false;
        const { fn, param } = getDefWithParam(code);
        if (!fn || !param) return false;
        return new RegExp(
          `\\bdef\\s+${fn}\\s*\\(\\s*${param}\\s*\\)\\s*:[^\\n]*\\n[ \\t]+print\\([\\s\\S]*?\\b${param}\\b`
        ).test(code);
      },
    },
    {
      id: "ex-one-call",
      title: "Exercise 3 — Pass a value",
      focusCommand: 'attack("goblin")',
      commandExplain:
        "When you call the function, pass a string in quotes. That value fills the parameter.",
      goal: "Call your function once with a string argument.",
      starterCode: `# Fill in the blank 👇
def attack(enemy):
    print("You attack the " + enemy + "!")

attack("____")
`,
      hint: 'Try attack("goblin") or any enemy name in quotes.',
      successMessage: "Called! You passed information into the function.",
      failureMessage: 'Call attack("something") with a quoted string argument.',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        const { fn, param } = getDefWithParam(code);
        if (!fn || !param) return false;
        const hasPrintUsingParam = new RegExp(
          `\\bdef\\s+${fn}\\s*\\(\\s*${param}\\s*\\)\\s*:[^\\n]*\\n[ \\t]+print\\([\\s\\S]*?\\b${param}\\b`
        ).test(code);
        const calls = uniqueCallArgs(code, fn);
        return hasPrintUsingParam && calls.size >= 1 && run.stdout.length >= 1;
      },
    },
    {
      id: "ex-challenge",
      title: "Exercise 4 — Parameter pro challenge",
      focusCommand: "def + param + 2 calls",
      commandExplain:
        "Same skill, different details: call your function at least twice with different values.",
      goal: "Define a function with one parameter and call it twice with different values.",
      starterCode: `# Fill in the blanks 👇
def attack(enemy):
    print("You attack the " + enemy + "!")

attack("____")
attack("____")
`,
      hint: "Use two different enemy names, like goblin and dragon.",
      successMessage: "Submitted! You reused one skill with different details using a parameter. 🎯",
      failureMessage:
        "Define a function with one parameter, use it in print, and call twice with different values.",
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        const { fn, param } = getDefWithParam(code);
        if (!fn || !param) return false;
        const hasPrintUsingParam = new RegExp(
          `\\bdef\\s+${fn}\\s*\\(\\s*${param}\\s*\\)\\s*:[^\\n]*\\n[ \\t]+print\\([\\s\\S]*?\\b${param}\\b`
        ).test(code);
        const uniqueArgs = uniqueCallArgs(code, fn);
        return hasPrintUsingParam && uniqueArgs.size >= 2 && run.stdout.length >= 2;
      },
    },
  ],
};
