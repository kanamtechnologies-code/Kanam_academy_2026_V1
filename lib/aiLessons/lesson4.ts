import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson4: AILessonConfig = {
  id: "ai-4",
  title: "4. Turning the World Into Data",
  goal: "See how words, categories, and ideas get represented as numbers — the foundation that lets AI 'reason' about almost anything (the Big Idea of Representation).",
  xpReward: 200,
  badge: "🔢 Data Translator",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/3",
  nextHref: "/learn/ai/5",
  lessonModule: {
    durationLabel: "~7 min lesson",
    sections: [
      {
        id: "representation",
        kicker: "Big Idea: Representation",
        title: "AI can only reason about things it can represent as data",
        body: `Last lesson, images and sound became numbers. But what about **words, choices, and ideas**? To work with those, AI needs a way to **represent** them as data too.\n\n**Representation** is how we encode a piece of the world so a computer can store and reason about it. Choosing a good representation is one of the most important parts of building AI.`,
        image: "/images/lessons/ai-4-data.png",
        imageAlt: "Words and objects being converted into rows of numbers",
        callout: {
          label: "Key insight",
          text: "If something can be turned into data, AI can work with it. If it can't be represented well, AI struggles — like trying to teach 'fairness' or 'beauty'.",
        },
      },
      {
        id: "tokens",
        kicker: "Words → numbers",
        title: "Text gets split into tokens, then numbers",
        body: `Computers can't do math on the word "dog". So AI breaks text into small pieces called **tokens** (often words or word-parts) and gives each one a number.\n\nThe sentence below might become a list of token-numbers. Once text is numbers, the AI can find patterns: which words appear together, what usually comes next, and so on.`,
        code: `"I love pizza"  →  tokens: ["I", "love", "pizza"]  →  [40, 1842, 7405]`,
        codeCaption: "Words become tokens, tokens become numbers",
        bullets: [
          "**Token** = a small chunk of text (a word or word-part).",
          "Each token maps to a number the model can use.",
          "Patterns in token-numbers = how AI 'reads'.",
        ],
      },
      {
        id: "categories",
        kicker: "Choices → numbers",
        title: "Categories and features become columns",
        body: `Real decisions use **features** — measurable facts about something. To predict if a fruit is an apple or orange, an AI might use features like color, weight, and bumpiness, each stored as a number.\n\nThink of it as a spreadsheet: each row is one example, each column is one feature. Most "decision-making" AI is really finding patterns across these number columns.`,
        table: {
          columns: ["fruit", "color (0=green,1=orange)", "weight (g)", "bumpy? (0/1)"],
          values: [
            ["apple", 0, 150, 0],
            ["orange", 1, 130, 1],
            ["apple", 0, 160, 0],
          ],
          rowCount: 3,
        },
      },
      {
        id: "limits",
        kicker: "The catch",
        title: "Garbage representation, garbage results",
        body: `A representation always **leaves things out**. A photo loses smell and depth; turning a student into "test scores" loses creativity and effort.\n\nWhen AI makes unfair or weird decisions, it's often because the **representation** missed something important — or measured the wrong thing. Always ask: *what did this data leave out?*`,
      },
    ],
  },
  bigIdeas: [
    "**Representation** = how the world gets encoded as data an AI can use.",
    "Text becomes **tokens**, then numbers, so AI can find language patterns.",
    "Every representation **leaves things out** — that can cause mistakes or unfairness.",
  ],
  keyTerms: [
    { term: "Representation", definition: "How a piece of the world is encoded as data so a computer can reason about it." },
    { term: "Token", definition: "A small chunk of text (word or word-part) that gets turned into a number for AI to process." },
    { term: "Feature", definition: "A measurable property of something (color, weight, price) used as input to AI." },
    { term: "Encoding", definition: "The act of converting information into a numeric form a computer can store." },
  ],
  realWorld:
    "When you type a sentence into a chatbot, the very first thing it does is split your words into **tokens** and turn them into numbers — before it 'reads' anything.",
  quiz: [
    {
      id: "q1",
      question: "What does 'representation' mean in AI?",
      choices: [
        "A robot standing in for a human",
        "How a piece of the world is encoded as data the AI can store and reason about",
        "A drawing of an AI",
        "The company that makes the AI",
      ],
      correctIndex: 1,
      explanation:
        "Representation is about encoding things — words, images, choices — as data so an AI can work with them.",
    },
    {
      id: "q2",
      question: "Before an AI can process the sentence 'I love pizza', what happens first?",
      choices: [
        "It asks a human to read it",
        "It splits the text into tokens and turns them into numbers",
        "It prints the sentence on paper",
        "Nothing — AI reads letters directly like we do",
      ],
      correctIndex: 1,
      explanation:
        "Text is broken into tokens, and each token becomes a number, because computers do math on numbers, not words.",
    },
    {
      id: "q3",
      question: "To tell apples from oranges, an AI uses color, weight, and bumpiness. What are those called?",
      choices: [
        "Tokens",
        "Pixels",
        "Features",
        "Sensors",
      ],
      correctIndex: 2,
      explanation:
        "Features are the measurable properties (stored as numbers) that an AI uses as inputs to make a prediction.",
    },
    {
      id: "q4",
      question: "Why can a bad representation lead to unfair AI decisions?",
      choices: [
        "Representations are always perfect, so they can't",
        "Because a representation leaves things out — it may miss or mismeasure what matters",
        "Because numbers are always wrong",
        "Because AI refuses to use data",
      ],
      correctIndex: 1,
      explanation:
        "Every representation simplifies reality and leaves something out. If it misses what's important, the AI's results suffer.",
    },
  ],
  reflection: {
    prompt:
      "If a school tried to represent 'a good student' using only data, what important things would the numbers probably leave out?",
    placeholder: "Numbers like grades and attendance might miss…",
  },
};
