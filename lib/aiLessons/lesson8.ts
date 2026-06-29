import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson8: AILessonConfig = {
  id: "ai-8",
  title: "8. Inside a Large Language Model",
  goal: "Open up the 'LLM' behind chatbots: tokens, the context window, and why these models 'hallucinate' confidently wrong answers.",
  xpReward: 400,
  badge: "💬 LLM Insider",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/7",
  nextHref: "/learn/ai/9",
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "what",
        kicker: "The big idea",
        title: "An LLM is a giant next-word predictor",
        body: `A **Large Language Model (LLM)** is the engine behind chatbots like ChatGPT, Gemini, and Claude. "Large" is no exaggeration — these models have **billions** of tuned numbers (called **parameters**) and trained on a huge slice of human writing.\n\nAt its core, an LLM does one thing astonishingly well: given some text, predict the **next token**. Everything a chatbot does is built on that single skill.`,
        image: "/images/lessons/ai-8-llm.png",
        imageAlt: "A glowing language model predicting the next word in a sentence",
        callout: {
          label: "Mind-blowing but true",
          text: "Answering questions, writing code, and translating all emerge from one trick: predict the next token, billions of times.",
        },
      },
      {
        id: "context",
        kicker: "Its short-term memory",
        title: "The context window is what it can 'see' right now",
        body: `An LLM doesn't truly remember you between chats. Within a conversation, it works with a **context window** — the chunk of recent text (your messages + its replies) it can pay attention to.\n\nIf a chat gets very long, older parts can fall out of the window and the model "forgets" them. That's why it sometimes loses track of something you said way earlier.`,
        bullets: [
          "**Parameter** = one of billions of tuned numbers inside the model.",
          "**Context window** = the recent text the model can currently see.",
          "Beyond the window, earlier details can be forgotten.",
        ],
      },
      {
        id: "hallucinate",
        kicker: "The big warning",
        title: "Hallucination: confidently making things up",
        body: `Because an LLM predicts **plausible-sounding** text — not verified facts — it can invent details that sound perfect but are false. This is called a **hallucination**: fake citations, made-up dates, invented quotes.\n\nThe scary part is the tone: it states wrong answers with the same confidence as right ones. The model isn't lying on purpose — it has no concept of truth, only of what *sounds* likely.`,
        callout: {
          label: "Rule of thumb",
          text: "An LLM optimizes for plausible, not for true. Never trust facts, numbers, or quotes from it without checking.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "A brilliant assistant with blind spots",
        body: `LLMs are amazing at language tasks: explaining, drafting, summarizing, rephrasing, brainstorming. They're unreliable at being a source of truth.\n\nNow that you know how they work, you're ready to *control* them. The next two lessons are all about prompting — getting great results on purpose. Take the knowledge check first.`,
      },
    ],
  },
  bigIdeas: [
    "An **LLM** generates language by predicting the next **token**, billions of times.",
    "The **context window** is its short-term memory — older text can drop out.",
    "**Hallucination** = confidently producing false but plausible-sounding content.",
  ],
  keyTerms: [
    { term: "Large Language Model (LLM)", definition: "A huge AI trained on text that generates language by predicting the next token." },
    { term: "Parameter", definition: "One of the billions of tuned numbers that store what an LLM learned." },
    { term: "Context window", definition: "The amount of recent text an LLM can pay attention to at once." },
    { term: "Hallucination", definition: "When an LLM states false information as if it were true." },
  ],
  realWorld:
    "A student asked a chatbot for sources and it produced three real-looking book citations — none of which existed. That's a hallucination, and it's why teachers warn against trusting AI 'facts'.",
  quiz: [
    {
      id: "q1",
      question: "At its core, what does a Large Language Model do?",
      choices: [
        "Searches the internet live for answers",
        "Predicts the next token (word/word-part) over and over to produce text",
        "Stores a copy of every webpage and quotes it exactly",
        "Thinks and reasons exactly like a human",
      ],
      correctIndex: 1,
      explanation:
        "An LLM is fundamentally a next-token predictor. Its many abilities emerge from doing that extremely well.",
    },
    {
      id: "q2",
      question: "What is the 'context window'?",
      choices: [
        "The app's settings menu",
        "The recent text the model can currently pay attention to",
        "A window that pops up with ads",
        "The model's permanent memory of you forever",
      ],
      correctIndex: 1,
      explanation:
        "The context window is the model's working memory for a conversation. Text beyond it can be forgotten.",
    },
    {
      id: "q3",
      question: "An AI gives you a confident answer with a specific quote and date that turn out to be fake. This is called…",
      choices: [
        "A glitch in the screen",
        "A hallucination",
        "Overfitting",
        "A context window",
      ],
      correctIndex: 1,
      explanation:
        "Hallucination is when an LLM produces false information that sounds convincing, because it optimizes for plausible, not true.",
    },
    {
      id: "q4",
      question: "Given how LLMs work, which task is SAFEST to rely on without double-checking?",
      choices: [
        "Getting exact historical dates and statistics",
        "Listing real research papers with page numbers",
        "Rephrasing a paragraph you wrote to sound clearer",
        "Reporting today's breaking news",
      ],
      correctIndex: 2,
      explanation:
        "Language tasks like rephrasing your own text are a strength. Facts, citations, and live news are exactly where hallucination bites.",
    },
  ],
  reflection: {
    prompt:
      "Knowing an LLM predicts 'plausible' text rather than 'true' text, how will you change the way you use a chatbot for homework?",
    placeholder: "I'll use it for things like… but I'll always verify…",
  },
};
