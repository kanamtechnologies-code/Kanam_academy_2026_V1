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
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "why",
        kicker: "The big idea",
        title: "A prompt is an instruction — and clearer instructions win",
        body: `A **prompt** is whatever you type to an AI. Since the model just predicts text based on what you give it, **the quality of your prompt shapes the quality of the answer**.\n\nVague in, vague out. "Tell me about dogs" could mean a hundred things. The more clearly you describe what you want, the better the result. Prompting is a real, learnable skill.`,
        image: "/images/lessons/ai-9-prompt.png",
        imageAlt: "A vague prompt and a detailed prompt side by side with their results",
        callout: {
          label: "Core idea",
          text: "The AI can't read your mind. Spell out what you want, for whom, and in what form.",
        },
      },
      {
        id: "tcrf",
        kicker: "The recipe",
        title: "Four ingredients: Task, Context, Role, Format",
        body: `A strong prompt usually has some of these four parts:\n\n• **Task** — what you want done ("explain", "list", "rewrite").\n• **Context** — the background ("I'm in 9th grade", "for a science fair").\n• **Role** — who the AI should act as ("act as a patient tutor").\n• **Format** — how the answer should look ("a 5-bullet list", "a short paragraph").\n\nYou don't always need all four, but adding them transforms weak prompts into great ones.`,
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
        body: `Watch a weak prompt become strong by adding the four ingredients. The second version tells the AI the role, audience, task, and format — so the answer is actually usable.`,
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
        id: "ready",
        kicker: "Ready",
        title: "Start prompting on purpose",
        body: `From now on, before you hit enter, ask: did I include the task, enough context, maybe a role, and the format I want?\n\nNext lesson covers how to *refine* answers and use examples. Take the knowledge check first.`,
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
