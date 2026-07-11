import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson8: AILessonConfig = {
  id: "ai-8",
  title: "8. Inside a Large Language Model",
  goal: "Open up the 'LLM' behind chatbots: tokens, the context window, and why these models 'hallucinate' confidently wrong answers.",
  xpReward: 400,
  badge: "LLM Insider",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/7",
  nextHref: "/learn/ai/9",
  lessonModule: {
    durationLabel: "~9 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `When you chat with ChatGPT, Gemini, or Claude, it can feel like you're talking to something that *knows things*. Today you'll open the hood on the engine behind all of them — the Large Language Model — and see what's really happening.\n\nThe roadmap:\n\n• What an **LLM** actually is, and the one trick it's built on.\n• The **context window** — its surprisingly short-term memory.\n• **Hallucination** — why it sometimes makes things up with total confidence.\n\nThis is the AI most likely to help (or trip up) your homework, your research, and your writing. Knowing how it works is the difference between using it like a pro and getting burned by a confident wrong answer.`,
        image: "/images/lessons/ai-8-llm.png",
        imageAlt: "A glowing language model predicting the next word in a sentence",
        callout: {
          label: "Why it matters",
          text: "LLMs are showing up in search engines, homework helpers, and writing tools you'll use all the time. Understanding their blind spots keeps you from trusting a wrong answer just because it sounds smart.",
        },
      },
      {
        id: "what",
        kicker: "The big idea",
        title: "An LLM is a giant next-word predictor",
        body: `A **Large Language Model (LLM)** is the engine behind chatbots like ChatGPT, Gemini, and Claude. "Large" is no exaggeration — these models have **billions** of tuned numbers (called **parameters**) and trained on a huge slice of human writing from the internet and books.\n\nAt its core, an LLM does one thing astonishingly well: given some text, predict the **next token** (the next word or word-part). That's it. It's the same next-piece prediction from the last lesson, just scaled to a mind-bending degree.\n\nHere's the wild part — answering questions, writing code, translating languages, and explaining ideas all *emerge* from that single skill, repeated billions of times. It's like how every word in every book is built from just 26 letters: simple parts, endless combinations.`,
        callout: {
          label: "Mind-blowing but true",
          text: "Answering questions, writing code, and translating all emerge from one trick: predict the next token, over and over. There's no separate 'understanding' module hiding inside.",
        },
      },
      {
        id: "context",
        kicker: "Its short-term memory",
        title: "The context window is what it can 'see' right now",
        body: `An LLM doesn't truly remember you between chats — start a fresh conversation and it's a blank slate. Within a single conversation, it works with a **context window**: the chunk of recent text (your messages plus its replies) it can pay attention to while predicting the next token.\n\nThink of the context window like a whiteboard with limited space. As the chat grows, new text gets written on; when it fills up, the oldest notes get erased to make room. Whatever scrolled off the board, the model can no longer "see."\n\nThat's why, in a very long chat, the model sometimes loses track of something you said way at the start — those earlier details fell out of the window. It's not being rude or forgetful on purpose; that information simply isn't in front of it anymore.`,
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
        body: `Here's the most important safety idea about LLMs. Because an LLM predicts **plausible-sounding** text — not verified facts — it can invent details that *sound* perfect but are completely false. This is called a **hallucination**: fake book citations, made-up dates, invented quotes, "facts" that never existed.\n\nWhy does it happen? The model has no concept of truth. It only knows what *sounds* likely to come next. A fake citation looks statistically a lot like a real one, so the model produces it without any sense that it's wrong.\n\nThe scary part is the tone. It states wrong answers with the exact same confidence as right ones — no hesitation, no warning label. The model isn't lying on purpose; it literally can't tell the difference between true and merely plausible.`,
        callout: {
          label: "Myth check",
          text: "A confident, detailed answer from an LLM is not proof it's correct. It optimizes for plausible, not for true — so never trust facts, numbers, or quotes from it without checking them yourself.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Spotting a hallucination in a homework answer",
        body: `Suppose you ask a chatbot, "Give me three books about the history of pizza, with authors and years." Here's how to handle the confident-looking reply.\n\n**Step 1 — Read the polished answer.** It lists three titles, three authors, and three years — all formatted perfectly and sounding totally legit.\n\n**Step 2 — Remember the trick.** The LLM predicted *plausible-looking* citations. Plausible is not the same as real. A fake citation and a real one look almost identical to the model.\n\n**Step 3 — Verify before trusting.** Search a library catalog or bookstore for each title and author. This is the step that catches hallucinations.\n\n**Step 4 — See the result.** Two books are real; one title and author don't exist anywhere. That third one was a hallucination — and if you'd cited it in an essay, your teacher would have caught it.\n\nThe lesson: use the LLM to *get started*, but confirm any fact, name, number, or quote with a trusted source.`,
        callout: {
          label: "Pro tip",
          text: "Match the task to the tool. LLMs shine at rephrasing, explaining, and brainstorming — your own words in, polished words out. For exact facts, dates, citations, or live news, always verify elsewhere.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Carry these forward: an **LLM** generates language by predicting the next **token**, billions of times. The **context window** is its short-term memory — older text can drop out. And **hallucination** is when it confidently produces false but plausible-sounding content.\n\nLLMs are brilliant at language tasks — explaining, drafting, summarizing, rephrasing, brainstorming — but unreliable as a source of truth.\n\nNow that you know how they work, you're ready to *control* them. The next two lessons are all about prompting — getting great results on purpose. When you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict) first.`,
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
