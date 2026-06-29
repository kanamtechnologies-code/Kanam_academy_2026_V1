import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson9: AILessonConfig = {
  id: "ai-9",
  title: "9. How to Talk to AI (Prompting)",
  goal: "Learn the building blocks of a great prompt — task, context, role, and format — so you get useful answers instead of vague ones.",
  xpReward: 450,
  badge: "🗝️ Prompt Starter",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/8",
  nextHref: "/learn/ai/10",
  lessonModule: {
    durationLabel: "~9 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Every time you ask a chatbot to help with homework, draft a text, brainstorm ideas, or explain something confusing, you're writing a **prompt**. This lesson teaches you how to write prompts that get genuinely useful answers instead of vague, generic ones.\n\nHere's the roadmap:\n\n• Why the exact words you choose change the answer you get.\n• The four ingredients of a strong prompt: **Task, Context, Role, and Format**.\n• How to turn a weak prompt into a great one, step by step.\n\nPrompting well is one of the most useful real-life skills you can build right now — it's the difference between AI being a fancy autocomplete and a genuinely helpful study partner.`,
        image: "/images/lessons/ai-9-prompt.png",
        imageAlt: "A vague prompt and a detailed prompt side by side with their results",
        callout: {
          label: "Why it matters",
          text: "Whether you're using AI for an essay outline, a workout plan, or a tricky math idea, the gap between a frustrating answer and a great one is usually *how you asked* — something you fully control.",
        },
      },
      {
        id: "why",
        kicker: "The big idea",
        title: "A prompt is an instruction — and clearer instructions win",
        body: `A **prompt** is whatever you type to an AI. Remember how a language model works: it predicts text based on what you give it. So **your prompt is the raw material it builds from** — the clearer the material, the better the result.\n\nThink about ordering food. If you tell a server "just bring me something," you could get anything. If you say "a cheese pizza, no onions, cut into squares," you get exactly what you wanted. The AI is the same: it can't fill in the details you left inside your head.\n\nReal example: typing "tell me about dogs" might return random facts, breed lists, or training tips — who knows. Typing "list 5 dog breeds that are good for small apartments, with one reason each" gets you something you can actually use. Same topic, wildly different usefulness.`,
        callout: {
          label: "Common misconception",
          text: "Lots of people think the AI can sense what they *meant*. It can't read your mind — it only has your words. If a detail matters, you have to say it.",
        },
      },
      {
        id: "tcrf",
        kicker: "The recipe",
        title: "Four ingredients: Task, Context, Role, and Format",
        body: `Strong prompts usually mix four ingredients. Think of it like a recipe — you don't always need every spice, but the right ones transform the dish.\n\n• **Task** — what you want done: \`explain\`, \`list\`, \`rewrite\`, \`compare\`.\n• **Context** — the background: who you are, what it's for ("I'm in 9th grade", "for a science-fair poster").\n• **Role** — who the AI should act as ("act as a patient tutor").\n• **Format** — how the answer should look ("a 5-bullet list", "a short paragraph", "a table").\n\nYou rarely need all four, but adding even two or three turns a vague request into a focused one.`,
        bullets: [
          "**Task:** the action you want.",
          "**Context:** background that narrows the answer.",
          "**Role:** the persona the AI should take.",
          "**Format:** the shape of the output.",
        ],
      },
      {
        id: "example",
        kicker: "See the difference",
        title: "From vague to valuable",
        body: `Watch a weak prompt become strong by stacking the ingredients. The first version forces the AI to guess everything; the second tells it the role, context, task, and format — so the answer comes back ready to use.`,
        code: `❌ Weak:
"Explain photosynthesis."

✅ Strong:
"Act as a friendly biology tutor (role).
I'm a 9th grader studying for a test (context).
Explain photosynthesis (task)
as 4 simple bullet points with one everyday example (format)."`,
        codeCaption: "Same topic — very different results",
      },
      {
        id: "myth",
        kicker: "Myth check",
        title: "There's no secret magic word",
        body: `Some people chase "magic prompts" — secret phrases they believe unlock hidden power. That's not how it works. There's no password. What actually helps is being **clear and specific**, which anyone can learn.\n\nIt's also a myth that longer is always better. A rambling prompt can bury the parts that matter. Aim for clear, not just long: include the details that count and cut the rest.`,
        callout: {
          label: "Myth check",
          text: "\"Type the right magic words and the AI gets smarter.\" False. Clarity beats secret phrases every time — the four ingredients are all the 'magic' you need.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Fix a weak prompt, step by step",
        body: `Let's upgrade a real prompt together. Say you want help studying for a history test.\n\n**Step 1 — Start with the weak version.** "Help me with history." The AI has no idea which era, what kind of help, or how you learn best.\n\n**Step 2 — Add Task + Context.** What exactly do you need, and why? → "Quiz me on the causes of World War I. I'm a 9th grader with a test Friday."\n\n**Step 3 — Add Role + Format.** Who should it act as, and how should the answer look? → "Act as a friendly history tutor. Ask me 5 multiple-choice questions one at a time, and wait for my answer before the next."\n\nNow the AI knows the role, the topic, your situation, and the exact format. You went from a shrug to a personalized practice quiz.`,
        code: `❌ Weak:
"Help me with history."

✅ Strong:
"Act as a friendly history tutor (role).
I'm a 9th grader with a test Friday (context).
Quiz me on the causes of World War I (task)
with 5 multiple-choice questions, one at a time (format)."`,
        codeCaption: "Weak prompt → strong prompt",
        callout: {
          label: "Pro tip",
          text: "Before you hit enter, do a quick check: did I include the **task**, enough **context**, maybe a **role**, and the **format** I want? Even two of the four makes a big difference.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've learned that a prompt is an instruction, that clearer instructions win, and that the four ingredients — **Task, Context, Role, Format** — turn vague requests into useful ones.\n\nNext lesson covers how to *refine* answers with follow-ups and examples. But first, lock in these ideas.\n\nWhen you're ready, switch to the **Knowledge check**.`,
      },
    ],
  },
  bigIdeas: [
    "A **prompt** is your instruction; clearer prompts produce better answers.",
    "Strong prompts often include **Task, Context, Role, and Format**.",
    "Prompting is a **learnable skill**, not luck.",
  ],
  keyTerms: [
    { term: "Prompt", definition: "The text instruction you give an AI to tell it what you want." },
    { term: "Context", definition: "Background details that narrow the AI toward the answer you actually need." },
    { term: "Role (persona)", definition: "Telling the AI who to act as, e.g., 'a patient tutor'." },
    { term: "Format", definition: "The shape you want the answer in — list, paragraph, table, etc." },
  ],
  realWorld:
    "Asking 'give me ideas' returns generic fluff. Asking 'act as a coach, give me 5 beginner-friendly 20-minute workouts I can do in a small room' returns something you can actually use.",
  quiz: [
    {
      id: "q1",
      question: "Why does the wording of your prompt matter so much?",
      choices: [
        "It doesn't — the AI ignores your wording",
        "The AI predicts its answer from your text, so clearer prompts produce better answers",
        "Longer prompts always cost money",
        "The AI only understands one secret password",
      ],
      correctIndex: 1,
      explanation:
        "An LLM generates based on your input. The clearer and more specific the prompt, the better the output.",
    },
    {
      id: "q2",
      question: "In the prompt 'Act as a patient tutor, explain fractions to a 6th grader as 3 bullet points', which part is the FORMAT?",
      choices: [
        "Act as a patient tutor",
        "explain fractions",
        "to a 6th grader",
        "as 3 bullet points",
      ],
      correctIndex: 3,
      explanation:
        "Format describes how the answer should look. 'As 3 bullet points' is the format; 'act as a tutor' is role, 'explain fractions' is task, '6th grader' is context.",
    },
    {
      id: "q3",
      question: "Which prompt will most likely give a useful answer?",
      choices: [
        "Tell me about money.",
        "Help.",
        "Act as a finance coach for teens. In 5 bullets, explain how a savings account works, with one real example.",
        "money money money",
      ],
      correctIndex: 2,
      explanation:
        "It includes role, task, format, and context — exactly the ingredients that produce focused, useful answers.",
    },
    {
      id: "q4",
      question: "What does adding 'context' to a prompt do?",
      choices: [
        "Slows the AI down for no reason",
        "Gives background that narrows the AI toward the answer you actually need",
        "Tells the AI to act as a celebrity",
        "Sets the font of the answer",
      ],
      correctIndex: 1,
      explanation:
        "Context (your grade level, purpose, audience) helps the AI tailor the response to your real situation.",
    },
  ],
  reflection: {
    prompt:
      "Take a boring prompt like 'help me with my essay' and rewrite it using at least three of: task, context, role, format.",
    placeholder: "Act as… I'm working on… Please… in the form of…",
  },
};
