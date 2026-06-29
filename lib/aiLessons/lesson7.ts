import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson7: AILessonConfig = {
  id: "ai-7",
  title: "7. What Is Generative AI?",
  goal: "Understand the AI that creates new text, images, audio, and video — how it differs from older AI, and where its content comes from.",
  xpReward: 350,
  badge: "✨ Creator's Apprentice",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/6",
  nextHref: "/learn/ai/8",
  lessonModule: {
    durationLabel: "~7 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `You've probably seen it: an AI that writes a rap about photosynthesis, paints a dragon surfing a pizza, or drafts an essay in seconds. This is **generative AI**, and today you'll learn what makes it tick.\n\nHere's the roadmap:\n\n• What makes generative AI different from the "sorting" AI you've met so far.\n• Its surprisingly simple trick: predicting the **next piece**, over and over.\n• Where all that content comes from — and why that raises real questions.\n\nThis is the most talked-about AI of your generation, powering chatbots, image generators, and homework helpers. Knowing how it actually works helps you use it as a creative superpower — without getting fooled by its confident mistakes.`,
        image: "/images/lessons/ai-7-generative.png",
        imageAlt: "An AI generating a new image and paragraph from a text prompt",
        callout: {
          label: "Why it matters",
          text: "Generative AI can help you brainstorm, draft, and create — but it can also produce convincing nonsense and deepfakes. Understanding it is what separates using it wisely from being misled by it.",
        },
      },
      {
        id: "what",
        kicker: "The big idea",
        title: "Generative AI creates new content",
        body: `Most AI we've discussed so far **sorts or predicts a label** — is this spam? cat or dog? **Generative AI** does something different: it **creates** brand-new content — essays, images, music, code, even video.\n\nHere's the difference in one picture. A spam filter is like a *librarian* sorting books onto the right shelves; it organizes things that already exist. Generative AI is like an *author* writing a brand-new book that didn't exist a moment ago.\n\nTools like ChatGPT (text) and image generators are generative AI. They studied enormous amounts of human-made content and learned to produce new pieces in the same style — a poem, a picture, a paragraph that's genuinely new.`,
        callout: {
          label: "Sorting vs. creating",
          text: "A spam filter labels what already exists. Generative AI makes something that didn't exist a second ago — that's the core difference.",
        },
      },
      {
        id: "predict-next",
        kicker: "The trick",
        title: "It works by predicting the next piece, over and over",
        body: `Here's the surprising part — and it shocks most people. A text generator mostly just predicts **the next word**, then the next, then the next, each one based on everything written so far.\n\nThink of the world's most powerful autocomplete. Your phone guesses one next word; a generative model guesses word after word after word, thousands of times, never losing the thread. String all those tiny predictions together and out comes a whole essay.\n\nImage generators do a similar thing, but with visual patterns instead of words, gradually turning random noise into a picture that matches your request. It *feels* creative, but underneath it's super-powered **pattern prediction** — the same idea you've seen all course, scaled up enormously.`,
        bullets: [
          "Text AI predicts the next **token** repeatedly to build sentences.",
          "Image AI builds pictures from learned visual patterns.",
          "The 'creativity' is remixing patterns from training data.",
        ],
        callout: {
          label: "Myth check",
          text: "Generative AI isn't imagining or inventing the way a human artist does. It's recombining patterns from its training data through prediction. Stunning results, but it's remixing — not dreaming up ideas from lived experience.",
        },
      },
      {
        id: "training",
        kicker: "Where it comes from",
        title: "It learned from a huge slice of the internet",
        body: `So where does it get the patterns to remix? Generative models trained on **massive** collections of text and images — much of it written and drawn by real people online, from blog posts to artwork to forums.\n\nThe model doesn't copy-paste any single source; it blends patterns from millions of them into something new. It's a bit like a musician who grew up listening to thousands of songs and now writes original music that carries echoes of all of them.\n\nThis raises real questions we'll explore later: Whose work taught the AI? Who owns AI-made art? For now, hold onto one fact: the output reflects its training data — including that data's gaps, mistakes, and biases.`,
        callout: {
          label: "Important",
          text: "Generative AI reflects what it was trained on. If the training data was biased, outdated, or wrong, the output can be too — confidently and convincingly.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Turning a weak prompt into a strong one",
        body: `Because generative AI builds on what you give it, the **prompt** (your request) hugely shapes the result. Watch a vague prompt become a great one, step by step.\n\n**Step 1 — Start with the weak prompt.** It's too vague, so the AI fills the gaps with generic guesses.\n\n**Step 2 — Add a role and goal.** Tell it *who* to act as and *what* you actually need.\n\n**Step 3 — Add details and format.** Give it the specifics — topic, length, audience, structure.\n\n**Step 4 — Compare.** Same AI, wildly better output — just from a clearer prompt.`,
        code: `WEAK PROMPT:\n"Write about dogs."\n\nSTRONG PROMPT:\n"You are a friendly science writer for 8th graders.\nWrite a 5-sentence paragraph explaining why dogs\nare good at smelling, using one real example.\nKeep it fun and easy to read."`,
        codeCaption: "Before and after: a clearer prompt steers the AI",
        callout: {
          label: "Pro tip",
          text: "Tell the AI three things: who it should act as, exactly what you want, and the format (length, audience, style). Specific in, specific out — vague in, generic out.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Lock these in: **generative AI** creates new content instead of just sorting or labeling. Text generators work by predicting the **next token** again and again. And the output reflects the **training data** — including its biases and gaps.\n\nGenerative AI is an incredible creative assistant for brainstorming, drafting, summarizing, and making images — but because it predicts *plausible* content, it can also produce confident nonsense.\n\nNext lesson we'll look inside the most famous kind: the Large Language Model. When you're ready, switch to the **Knowledge check** first.`,
      },
    ],
  },
  bigIdeas: [
    "**Generative AI** creates new content instead of just sorting or predicting labels.",
    "Text generators work by predicting the **next token** again and again.",
    "Output reflects the **training data** — including its biases and gaps.",
  ],
  keyTerms: [
    { term: "Generative AI", definition: "AI that creates new content — text, images, audio, code — rather than just classifying." },
    { term: "Next-token prediction", definition: "Building text by repeatedly predicting the most likely next word/word-part." },
    { term: "Prompt", definition: "The instruction or request you give a generative AI to guide what it creates." },
    { term: "Training corpus", definition: "The huge collection of text/images a generative model learned from." },
  ],
  realWorld:
    "When you ask an AI to 'write a rap about photosynthesis', it generates each word by predicting what should come next — producing a poem no human ever wrote, built from patterns it learned.",
  quiz: [
    {
      id: "q1",
      question: "What makes generative AI different from a spam filter?",
      choices: [
        "It runs faster",
        "It creates brand-new content instead of only labeling existing content",
        "It doesn't use training data",
        "It only works on phones",
      ],
      correctIndex: 1,
      explanation:
        "Generative AI produces new text, images, or audio. A spam filter just classifies things that already exist.",
    },
    {
      id: "q2",
      question: "How does a text-generating AI build a sentence?",
      choices: [
        "It looks up the sentence in a database",
        "It predicts the next word/token repeatedly, each based on what came before",
        "A human types it secretly",
        "It copies a random webpage",
      ],
      correctIndex: 1,
      explanation:
        "Text generators work by predicting the next token over and over, chaining tiny predictions into full passages.",
    },
    {
      id: "q3",
      question: "Why can generative AI output reflect bias or errors?",
      choices: [
        "Because it has opinions",
        "Because it reflects the training data, which can contain bias and mistakes",
        "Because it's connected to the news",
        "It can't — generated content is always neutral and correct",
      ],
      correctIndex: 1,
      explanation:
        "Generative models learn from human-made data. Flaws and biases in that data can show up in the output.",
    },
    {
      id: "q4",
      question: "Which is the best way to think about generative AI's 'creativity'?",
      choices: [
        "True original imagination, like a human artist's",
        "Magic that can't be explained",
        "Super-powered remixing of patterns learned from training data",
        "Random noise with no structure",
      ],
      correctIndex: 2,
      explanation:
        "It feels creative, but it's remixing and recombining patterns from its training data via prediction.",
    },
  ],
  reflection: {
    prompt:
      "Generative AI is great for some tasks and risky for others. Name one task you'd happily use it for, and one where you'd be careful.",
    placeholder: "I'd use it to brainstorm ideas, but I'd be careful when…",
  },
};
