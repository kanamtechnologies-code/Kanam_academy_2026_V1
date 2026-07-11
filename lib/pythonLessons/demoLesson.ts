import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";
import type { MiniRunResult } from "@/lib/pythonRunner";
import { rejectsUppercasePrint } from "@/lib/pythonTerminal";

function hasNameVariable(code: string) {
  return /\bname\s*=\s*["'][^"']+["']/.test(code);
}

/**
 * Short interactive demo lesson.
 * Uses `lesson-1` so guest XP/badges land on the real Python track roadmap.
 */
export const demoLesson: PythonLessonConfig = {
  id: "lesson-1",
  title: "Quickstart: Meet Your AI Helper",
  goal: "In two short exercises, create a variable and print a greeting — the same skills students use in class.",
  xpReward: 50,
  badge: "The Awakener",
  dashboardHref: "/welcome",
  nextHref: "/demo/complete",
  coachNoteGateSeconds: 4,
  guidedTour: true,
  instructorScript: `**Coach's note**:
Welcome to Kanam Academy.

Today you'll teach a computer to introduce itself — the same first step students take in the AI + Python track.

Big idea:
- Computers (and AI) do **not** guess.
- They follow your instructions exactly.

What you're building:
1. A **variable** that stores your name
2. A **print()** line that shows a greeting

Click **Got it, let's go!** when you're ready.`,
  kidExplain: [
    {
      title: "Variables = labeled boxes",
      text: 'A **variable** stores information. In `name = "Alex"`, the label is `name` and the value is `"Alex"`.',
    },
    {
      title: "print() shows output",
      text: "print() sends a message to the console. Use lowercase `print` — Python won't recognize `Print`.",
    },
    {
      title: "The + joins text",
      text: '`"Hello, " + name` glues pieces of text together. Put spaces inside the quotes — Python won\'t add them for you.',
    },
  ],
  steps: [
    'Create a variable: `name = "Alex"` (use your name).',
    'Print a greeting: `print("Hello, " + name + "!")`',
    "Press Run and read the console.",
  ],
  cfu: [],
  tryThis: ["Change the greeting to something fun.", "Use your real name in the quotes."],
  aiSafetyMoment:
    "Responsible AI: clear instructions keep you in control. If the output is wrong, fix the code — don't blame the computer.",
  commandReference: [
    {
      command: 'name = "..."',
      summary: "Creates a variable that stores text.",
      example: 'name = "Alex"',
    },
    {
      command: "print(...)",
      summary: "Shows a message in the console.",
      example: 'print("Hello!")',
    },
    {
      command: "+",
      summary: "Joins strings together.",
      example: '"Hello, " + name',
    },
  ],
  exercises: [
    {
      id: "demo-ex-variable",
      title: "Exercise 1 — Store a name",
      focusCommand: "name =",
      commandExplain:
        "A variable stores information. Type your name inside the quotes — that text becomes the value in the box labeled name.",
      goal: 'Fill in the blank so name holds your name, like name = "Alex".',
      starterCode: `# Fill in the blank 👇
name = "____"
`,
      hint: 'Put your name between the quotes, e.g. name = "Alex".',
      successMessage: "Great! You created a variable that stores your name.",
      failureMessage: 'Create name = "YourName" with quotes around your name.',
      validate: (code: string) => {
        if (rejectsUppercasePrint(code)) return false;
        return hasNameVariable(code);
      },
    },
    {
      id: "demo-ex-print",
      title: "Exercise 2 — Print a greeting",
      focusCommand: "print() + +",
      commandExplain:
        'print() shows a message. The + joins text. Include the space after the comma: "Hello, "',
      goal: 'Print one greeting that includes your name.',
      starterCode: `name = "Alex"
print("____" + name + "!")
`,
      hint: 'Type Hello,  (with a space after the comma) inside the quotes.',
      successMessage: "You did it! Your AI helper said hello.",
      failureMessage: 'Use print("Hello, " + name + "!") — include the space after "Hello, ".',
      validate: (code: string, run: MiniRunResult) => {
        if (rejectsUppercasePrint(code)) return false;
        if (!hasNameVariable(code)) return false;
        if (!/\bprint\s*\(/.test(code) || !code.includes("+")) return false;
        if (!/["']Hello,\s*["']/.test(code)) return false;
        const out = run.stdout.join("\n");
        return /Hello,\s*\S/.test(out);
      },
    },
  ],
  lessonModule: {
    durationLabel: "~3 min demo",
    sections: [
      {
        id: "intro",
        kicker: "Demo",
        title: "What you'll try",
        body: `This is a real Kanam lesson canvas — the same layout students use in class.\n\nYou'll:\n\n• Read a short coach note\n• Fill in blanks in Python\n• Press **Run** and see the console\n• Earn XP when you finish\n\nNo account needed. Progress saves on this device.`,
        image: "/images/lessons/py-1-hello.png",
        imageAlt: "A friendly robot waving hello — your first AI helper",
        callout: {
          label: "Tip",
          text: "Tiny typos matter. If something fails, check quotes, spaces, and lowercase print().",
        },
      },
      {
        id: "how",
        kicker: "How class works",
        title: "Learn, then practice",
        body: `Every Kanam lesson has two steps:\n\n1. **Lesson** — short teaching (what you're reading now)\n2. **Activity** — hands-on exercises with Run & check\n\nWhen you're ready, tap **Start the exercises** and begin Exercise 1.`,
        image: "/images/screenshots/lesson-canvas.png",
        imageAlt: "Screenshot of the Kanam lesson canvas with coach note and code workspace",
        code: `name = "Alex"
print("Hello, " + name + "!")`,
        codeCaption: "What you'll build",
        output: "Hello, Alex!",
        callout: {
          label: "Your turn next",
          text: "You'll fill in the blanks yourself — the tour will point to each part of the workspace.",
        },
      },
    ],
  },
};
