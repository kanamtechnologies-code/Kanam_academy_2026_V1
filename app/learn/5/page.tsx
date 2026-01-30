"use client";

import { LessonCanvas, type LessonConfig } from "@/components/lesson/LessonCanvas";

const TERMINAL_PROMPT = "kanam-bot@python ~$";

function asTerminal(body: string) {
  return `${TERMINAL_PROMPT} python main.py\n${body}\n${TERMINAL_PROMPT}`;
}

function countTurns(prevOutput: string) {
  return (prevOutput.match(/\nYou:\s/g) ?? []).length;
}

function hasOffline(prevOutput: string) {
  return /System shutting down/i.test(prevOutput);
}

const lesson5: LessonConfig = {
  id: "lesson-5",
  title: "5. KanamBot Chat Loop",
  goal: "Use a while loop to keep your bot running until you type 'quit'.",
  xpReward: 1000,
  badge: "🏆 Python Pioneer",
  assignmentTitle: "Your mission",
  assignmentBody:
    "In the scratch box, build a chat bot that keeps chatting in a loop until the user types quit.",
  assignmentChecklist: [
    "Create running = True at the top.",
    "Make a while loop that repeats while running is True.",
    'Inside the loop: message = input("You: ")',
    'Exit door: if message == "quit": set running = False and print a goodbye.',
    "Add at least one elif command (hello / joke / help) plus an else.",
    'Test: hello → joke → quit (it should stop).',
  ],
  starterCode: `# Fill in the blanks 👇
running = ____
print("KanamBot: ____")

while running == ____:
    message = input("____")

    if message == "____":
        running = ____
        print("KanamBot: ____")
    elif message == "____":
        print("KanamBot: ____")
    else:
        print("KanamBot: ____")
`,
  instructorScript:
    "Coach’s note:\nBoss level time: we’re making a bot that feels like a real chat app.\n\nSo far your programs ran once and stopped.\nA chat app doesn’t do that — it keeps listening.\nThat “keep listening” power is a **while loop**.\n\nHere’s the loop idea in kid-language:\n- You have an ON/OFF switch called running.\n- While running is True, keep repeating the chat steps.\n- When the user types \"quit\", flip the switch to False.\n- Once the switch is False, the loop ends and the program stops.\n\nYour job today:\n- Put running = True at the top.\n- Write a while line.\n- Put message = input(\"You: \") INSIDE the loop (so it asks every time).\n- Add an exit door: if message == \"quit\": running = False\n- Add at least one fun command (hello / joke / help) and an else for everything else.\n\nCommon mistake (and how to fix it):\n- If your bot “won’t stop,” it usually means you never flipped running to False.\n\nHow to test like a real instructor:\nSay hello, ask for a joke, then type quit. You should see your bot respond each time, and then shut down safely.",
  kidExplain: [
    {
      title: "AI Concept: The \"Always On\" Assistant",
      text:
        "Imagine restarting your phone every time you send one text. Annoying, right? Chatbots use a **loop** so they can stay “awake” and keep listening until you tell them to stop.",
    },
    {
      title: "while loop = repeat",
      text:
        "A `while` loop repeats a block of code **as long as** its condition is True. If the condition becomes False, the loop ends.",
    },
    {
      title: "Booleans = light switches",
      text:
        "Booleans are just **True** and **False**. We use a boolean like an ON/OFF switch: `running = True` to start, then set it to False to stop.",
    },
    {
      title: "Loop control (your Exit Door)",
      text:
        'Inside the loop, we check for a special message like `"quit"`. When we see it, we flip the switch (running = False) so the loop ends safely.',
    },
  ],
  steps: [
    "The Master Switch: Create running = True at the top.",
    "Start the Loop: Use while running == True: and indent everything that repeats.",
    'The Interaction: Inside the loop, ask message = input("You: ").',
    'The Exit Door: If message == "quit", set running = False and print a goodbye.',
    'The Personality: Add elif for "hello" or "joke" and an else for everything else.',
  ],
  cfu: [
    {
      question:
        "The switch: If we set running = False at the very beginning, would the loop ever start?",
      answer: "No — the condition would be False, so the loop would never run.",
    },
    {
      question:
        "The live feel: Why is input() inside the loop instead of above it?",
      answer:
        "Because we want to ask again and again. If input() is outside, it only happens once.",
    },
    {
      question: 'The crash: What happens if the user never types "quit"?',
      answer:
        "The loop keeps running forever (until you stop the program). That’s why we add an exit door!",
    },
  ],
  tryThis: [
    "Custom Goodbye (Easy): Ask for the user's name before the loop, and say it when they quit.",
    'Secret Password (Medium): Add an elif for "unicorn" that prints a secret message or ASCII art.',
    "Counter (Bonus): Add count = 0 outside the loop. Each message, do count = count + 1. When they quit, say how many messages you exchanged.",
  ],
  aiSafetyMoment:
    "Truth Check: Sometimes AI can sound 100% sure but still be wrong. That’s called a hallucination. Always verify facts — even when a computer says them confidently!",
  editorPlaceholder:
    "# From scratch idea:\n# running = True\n# while running == True:\n#     message = input(\"You: \")\n#     if message == \"quit\":\n#         running = False\n",
  terminalPrompt: TERMINAL_PROMPT,
  prevHref: "/learn/4",
  nextHref: undefined,
  runOutputMode: "append",
  initialOutputBody:
    "--- KanamBot 3000: ONLINE ---\nType a message below and press Run.\nTry: hello, joke, help, or quit",
  runtimeInputs: [
    {
      key: "message",
      label: 'Pretend you typed for: input("You: ")',
      placeholder: "hello",
      defaultValue: "hello",
    },
  ],

  // Used for guidance when not in append/chat mode or as a fallback.
  getRunOutput: (code, runtime) => {
    const msg = (runtime?.message ?? "").trim() || "hello";
    return asTerminal(`You: ${msg}\nKanamBot: (chat mode enabled — press Run again to continue!)`);
  },

  getRunBody: (code, runtime, ctx) => {
    const messageRaw = (runtime?.message ?? "").trim();
    if (!messageRaw) {
      return "Type a message in the input box (example: hello), then press Run.";
    }

    if (hasOffline(ctx?.prevOutput ?? "")) {
      return "KanamBot: (offline) Press Reset to restart KanamBot 3000.";
    }

    // MVP code-structure checks (so the lesson still teaches syntax)
    const hasRunning = /\brunning\s*=\s*True\b/.test(code);
    const hasWhile =
      /\bwhile\s+running\s*==\s*True\s*:\s*/.test(code) ||
      /\bwhile\s+running\s*:\s*/.test(code);
    const hasMessageInput = /\bmessage\s*=\s*input\(\s*["']You:\s*["']\s*\)/.test(code);
    const hasQuitIf = /\bif\s+message\s*==\s*["']quit["']\s*:/.test(code);
    const flipsSwitch = /\brunning\s*=\s*False\b/.test(code);
    const hasElif = /\belif\s+message\s*==/.test(code);
    const hasElse = /\nelse\s*:/.test(code);

    if (!hasRunning) return "❌ Add Step 1: running = True (your ON/OFF switch).";
    if (!hasWhile) return "❌ Add Step 2: while running == True: (then indent the loop body).";
    if (!hasMessageInput) return '❌ Add Step 3: message = input("You: ") inside the loop.';
    if (!hasQuitIf) return '❌ Add Step 3: if message == "quit": (your exit door).';
    if (!flipsSwitch) return "❌ Inside the quit if, add: running = False (so the loop can end).";
    if (!hasElif) return '❌ Add at least one elif (example: elif message == "hello":).';
    if (!hasElse) return "❌ Add an else: so your bot replies to unknown messages.";

    const turn = countTurns(ctx?.prevOutput ?? "");
    const nextTurn = turn + 1;

    const lower = messageRaw.toLowerCase();
    const lines: string[] = [];
    lines.push(`You: ${messageRaw}`);

    // Bonus counter support (very lightweight simulation)
    const hasCountInit = /\bcount\s*=\s*0\b/.test(code);
    const hasCountInc = /\bcount\s*=\s*count\s*\+\s*1\b/.test(code);
    const wantsCounter = hasCountInit && hasCountInc;

    if (lower === "quit") {
      lines.push("KanamBot: System shutting down. Bye!");
      if (wantsCounter) {
        lines.push(`KanamBot: We exchanged ${nextTurn} messages today!`);
      }
      return lines.join("\n");
    }

    if (lower === "hello") {
      lines.push("KanamBot: Hi there! I'm your AI friend.");
    } else if (lower === "joke") {
      lines.push("KanamBot: Why did the computer show up late? It had a hard drive!");
    } else if (lower === "help") {
      lines.push("KanamBot: Try 'hello', 'joke', or type 'quit' to stop.");
    } else {
      lines.push("KanamBot: That's interesting! Tell me more, or type 'quit' to stop.");
    }

    if (wantsCounter) {
      lines.push(`(debug) messages so far: ${nextTurn}`);
    }

    return lines.join("\n");
  },

  computeProgressPercent: (code, submitted) => {
    const hasRunning = /\brunning\s*=\s*True\b/.test(code);
    const hasBanner = /\bprint\s*\(/.test(code);
    const hasWhile =
      /\bwhile\s+running\s*==\s*True\s*:\s*/.test(code) ||
      /\bwhile\s+running\s*:\s*/.test(code);
    const hasMessageInput = /\bmessage\s*=\s*input\(/.test(code);
    const hasQuitIf = /\bif\s+message\s*==\s*["']quit["']\s*:/.test(code);
    const flipsSwitch = /\brunning\s*=\s*False\b/.test(code);
    const hasElif = /\belif\s+message\s*==/.test(code);
    const hasElse = /\nelse\s*:/.test(code);
    const hasIndentedPrints = /\bwhile[\s\S]*?\n[ \t]+print\(/.test(code);

    const checks = [
      hasRunning,
      hasBanner,
      hasWhile,
      hasMessageInput,
      hasQuitIf,
      flipsSwitch,
      hasElif,
      hasElse,
      hasIndentedPrints,
    ];
    const completed = checks.filter(Boolean).length;
    const percent = Math.round((completed / checks.length) * 100);
    return submitted ? 100 : percent;
  },

  isSubmissionValid: (code) => {
    const hasRunning = /\brunning\s*=\s*True\b/.test(code);
    const hasWhile =
      /\bwhile\s+running\s*==\s*True\s*:\s*/.test(code) ||
      /\bwhile\s+running\s*:\s*/.test(code);
    const hasMessageInput = /\bmessage\s*=\s*input\(\s*["']You:\s*["']\s*\)/.test(code);
    const hasQuitIf = /\bif\s+message\s*==\s*["']quit["']\s*:/.test(code);
    const flipsSwitch = /\brunning\s*=\s*False\b/.test(code);
    const hasElif = /\belif\s+message\s*==/.test(code);
    const hasElse = /\nelse\s*:/.test(code);
    const indentedInput = /\bwhile[\s\S]*?\n[ \t]+message\s*=\s*input\(/.test(code);
    const indentedQuit =
      /\bwhile[\s\S]*?\n[ \t]+if\s+message\s*==\s*["']quit["']\s*:/.test(code);

    return (
      hasRunning &&
      hasWhile &&
      hasMessageInput &&
      hasQuitIf &&
      flipsSwitch &&
      hasElif &&
      hasElse &&
      indentedInput &&
      indentedQuit &&
      !code.includes("Print(")
    );
  },

  getSubmitOutput: (ok) =>
    ok
      ? asTerminal("✅ Submitted! Your bot stays alive in a loop and exits safely. 🏁")
      : asTerminal(
          '❌ Almost! Make sure you have running = True, a while loop, message = input("You: ") inside the loop, an if message == "quit" that sets running = False, plus at least one elif and an else. Also check print is lowercase.'
        ),
};

export default function Lesson5Page() {
  return <LessonCanvas lesson={lesson5} />;
}

