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
        id: "what",
        kicker: "The big idea",
        title: "Generative AI creates new content",
        body: `Most AI we've discussed **sorts or predicts** — is this spam? cat or dog? **Generative AI** does something different: it **creates** brand-new content — essays, images, music, code, even video.\n\nTools like ChatGPT (text) and image generators are generative AI. They studied enormous amounts of human-made content and learned to produce new pieces in the same style.`,
        image: "/images/lessons/ai-7-generative.png",
        imageAlt: "An AI generating a new image and paragraph from a text prompt",
        callout: {
          label: "Sorting vs. creating",
          text: "A spam filter labels what already exists. Generative AI makes something that didn't exist a second ago.",
        },
      },
      {
        id: "predict-next",
        kicker: "The trick",
        title: "It works by predicting the next piece, over and over",
        body: `Here's the surprising part: a text generator mostly just predicts **the next word**, then the next, then the next — each based on everything so far.\n\nString millions of these tiny predictions together and you get a whole essay. Image generators do a similar thing with pixels. It feels creative, but underneath it's super-powered **pattern prediction**.`,
        bullets: [
          "Text AI predicts the next **token** repeatedly to build sentences.",
          "Image AI builds pictures from learned visual patterns.",
          "The 'creativity' is remixing patterns from training data.",
        ],
      },
      {
        id: "training",
        kicker: "Where it comes from",
        title: "It learned from a huge slice of the internet",
        body: `Generative models trained on **massive** collections of text and images — much of it written and drawn by real people online. The model doesn't copy-paste; it blends patterns into something new.\n\nThis raises real questions we'll explore later: Whose work taught the AI? Who owns AI-made art? For now, remember the content reflects its training data — including the data's gaps and biases.`,
        callout: {
          label: "Important",
          text: "Generative AI reflects what it was trained on. If the training data was biased or wrong, the output can be too.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Powerful, but not a truth machine",
        body: `Generative AI is an incredible creative assistant — for brainstorming, drafting, summarizing, and making images. But because it's predicting plausible content, it can also produce confident nonsense.\n\nNext lesson we'll look inside the most famous kind: the Large Language Model. Take the knowledge check first.`,
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
