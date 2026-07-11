import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson4: AILessonConfig = {
  id: "ai-4",
  title: "4. Turning the World Into Data",
  goal: "See how words, categories, and ideas get represented as numbers — the foundation that lets AI 'reason' about almost anything (the Big Idea of Representation).",
  xpReward: 200,
  badge: "Data Translator",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/3",
  nextHref: "/learn/ai/5",
  lessonModule: {
    durationLabel: "~7 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Last lesson you saw photos and sound turn into numbers. But how does an AI handle a *word* like "pizza," or a decision like "apple or orange?" You can't point a microphone at an idea. Today you'll learn the clever move that lets AI work with almost anything.\n\nOur roadmap:\n\n• Meet the Big Idea of **Representation** — encoding the world as data.\n• See how text becomes **tokens**, then numbers (this is step one inside every chatbot).\n• See how choices become **features** in a spreadsheet of numbers.\n• Learn why a bad representation can quietly cause unfair results.\n\nThis matters because every chatbot, recommender, and image generator starts by representing *your* input as numbers. And when AI gets something unfair or weird, the representation is often where it went wrong.`,
        image: "/images/lessons/ai-4-data.png",
        imageAlt: "Words and objects being converted into rows of numbers",
        callout: {
          label: "Why it matters",
          text: "The very first thing a chatbot does with your message is turn it into numbers. Understanding representation is like seeing the gears turn the instant before AI 'reads' anything you type.",
        },
      },
      {
        id: "representation",
        kicker: "Big Idea: Representation",
        title: "AI can only reason about things it can represent as data",
        body: `Last lesson, images and sound became numbers. But what about **words, choices, and ideas**? To work with those, AI needs a way to **represent** them as data too.\n\n**Representation** is how we encode a piece of the world so a computer can store and reason about it. Think of it like packing for a trip: you can't bring your whole bedroom, so you choose what fits in the suitcase. A representation is the "suitcase" version of something real — only the parts we chose to pack as data.\n\nChoosing a *good* representation is one of the most important parts of building AI. Pack the right details and the AI can reason brilliantly. Leave out something important and it's working with a flawed picture from the start.`,
        callout: {
          label: "Key insight",
          text: "If something can be turned into useful data, AI can work with it. If it can't be represented well, AI struggles — which is why fuzzy human ideas like 'fairness' or 'beauty' are so hard to teach a machine.",
        },
      },
      {
        id: "tokens",
        kicker: "Words → numbers",
        title: "Text gets split into tokens, then numbers",
        body: `Computers can't do math on the word "dog" — to a computer it's not even a word, just shapes. So before AI can use text, it breaks the text into small pieces called **tokens** (often whole words, but sometimes word-parts like "play" + "ing"), and gives each token a number from a giant lookup table.\n\nThink of it like a coat check at an event. You hand over your coat (a word) and get a numbered ticket back. The system doesn't care what the coat looks like — it just tracks the number. Later it can match tickets to coats perfectly.\n\nThe sentence below might become a short list of token-numbers. Once text is numbers, the AI can finally do its thing: find patterns in which tokens appear together and what usually comes next.`,
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
        body: `Words aren't the only thing we represent. Real decisions use **features** — measurable facts about something. To predict whether a fruit is an apple or an orange, an AI might use features like color, weight, and bumpiness, each stored as a number.\n\nPicture a spreadsheet: each **row** is one example (one fruit), and each **column** is one **feature** (one fact about it). The AI learns patterns across the columns — like "bumpy + orange-colored + lighter usually means orange."\n\nMost "decision-making" AI is really just this: finding patterns across rows and columns of numbers. It looks like judgment, but underneath it's spreadsheet math.`,
        table: {
          columns: ["fruit", "color (0=green,1=orange)", "weight (g)", "bumpy? (0/1)"],
          values: [
            ["apple", 0, 150, 0],
            ["orange", 1, 130, 1],
            ["apple", 0, 160, 0],
          ],
          rowCount: 3,
        },
        callout: {
          label: "Common misconception",
          text: "When an AI 'decides' something, it isn't weighing right and wrong like a person. It's spotting patterns in columns of numbers — only as fair and complete as the features it was given.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Representing a student as data — and what gets lost",
        body: `Imagine a school wants an AI to flag students who might "need help." First, someone has to represent each student as data. Watch what gets packed into the suitcase — and what gets left behind.\n\n**Step 1 — Pick features.** The team chooses what's easy to measure: test scores, attendance, and assignments turned in. Each becomes a number column.\n\n**Step 2 — Build the rows.** Every student becomes one row of numbers, like \`[score: 72, attendance: 95%, turned_in: 80%]\`.\n\n**Step 3 — Spot the gaps.** Notice what's *missing*: a student dealing with a tough home situation, someone who's curious and creative but a poor test-taker, a kid who helps classmates constantly. None of that is in the numbers.\n\n**Step 4 — See the risk.** If the AI only sees the columns we packed, a struggling-but-bright student might look "fine," while a great student having one bad week might get flagged. The AI isn't being cruel — it can only reason about what the representation captured.`,
        callout: {
          label: "Pro tip",
          text: "Whenever you see an AI judgment about people, ask the power question: *What did this data leave out?* The missing columns often matter more than the ones that made it in.",
        },
      },
      {
        id: "limits",
        kicker: "The catch",
        title: "Garbage representation, garbage results",
        body: `A representation **always leaves things out** — that's the whole point of fitting reality into a suitcase. A photo loses smell and depth. Turning a student into "test scores" loses creativity, kindness, and effort. Turning a song into a waveform loses the memory it gives you.\n\nUsually that's fine. The danger is when the part left out is the part that *mattered most*.\n\nSo when AI makes an unfair or weird decision, it's often because the **representation** missed something important — or measured the wrong thing entirely. Get into the habit of asking: *what did this data leave out, and does it matter here?*`,
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Lock these in: **Representation** is how the world gets encoded as data an AI can use. Text becomes **tokens**, then numbers, so AI can find language patterns. Choices become **features** in columns. And every representation **leaves things out** — which can cause mistakes or unfairness.\n\nThis is the hidden first step inside every AI you'll meet for the rest of the course.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then reflect on what numbers might miss when representing "a good student."`,
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
