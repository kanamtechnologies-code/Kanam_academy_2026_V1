import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson5: AILessonConfig = {
  id: "ai-5",
  title: "5. How AI Learns From Examples",
  goal: "Understand machine learning: instead of being programmed with rules, AI learns patterns from labeled examples (the Big Idea of Learning).",
  xpReward: 250,
  badge: "🧠 Pattern Learner",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/4",
  nextHref: "/learn/ai/6",
  lessonModule: {
    durationLabel: "~7 min lesson",
    sections: [
      {
        id: "learning",
        kicker: "Big Idea: Learning",
        title: "Modern AI is taught, not hand-coded",
        body: `Old-style programs follow rules a human wrote: "IF email contains 'free money' THEN mark spam." That works until spammers change their words.\n\n**Machine learning (ML)** flips this around. Instead of writing the rules, we show the AI **thousands of labeled examples** ("this is spam", "this is not") and let it *figure out the patterns itself*. That's what "learning" means in AI.`,
        image: "/images/lessons/ai-5-learn.png",
        imageAlt: "An AI studying many labeled example photos to learn a pattern",
        callout: {
          label: "Key insight",
          text: "Machine learning = learning rules from examples, instead of a human writing every rule by hand.",
        },
      },
      {
        id: "training-data",
        kicker: "The fuel",
        title: "Training data is the examples we learn from",
        body: `The examples we feed an AI are called **training data**. To learn "cat vs. dog", a model studies many photos already **labeled** with the right answer.\n\nMore good, varied examples usually means better learning. This is **supervised learning** — the most common kind — because each example comes with the correct label, like an answer key.`,
        bullets: [
          "**Training data** = the labeled examples the AI learns from.",
          "**Label** = the correct answer attached to an example.",
          "**Supervised learning** = learning from examples that include answers.",
        ],
      },
      {
        id: "model",
        kicker: "The result",
        title: "Learning produces a 'model'",
        body: `After studying the data, the AI saves what it learned as a **model** — basically a giant set of tuned numbers that captures the patterns.\n\nLater, you give the model a brand-new photo it has never seen, and it predicts "cat" or "dog". A good model **generalizes**: it works on new examples, not just the ones it memorized.`,
        callout: {
          label: "Watch the words",
          text: "Training = the learning phase. The model = the trained result. We'll test that model next lesson.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Examples in, patterns out",
        body: `Almost every AI you use — recommendations, translation, chatbots — learned from huge piles of examples. The quality of those examples shapes everything the AI does.\n\nTake the knowledge check, then reflect on what data you'd collect to teach an AI something.`,
      },
    ],
  },
  bigIdeas: [
    "**Machine learning** learns rules from examples instead of being hand-coded.",
    "**Training data** (labeled examples) is the fuel for learning.",
    "Learning produces a **model** that should work on new, unseen examples.",
  ],
  keyTerms: [
    { term: "Machine Learning (ML)", definition: "AI that learns patterns from examples rather than from rules a human writes." },
    { term: "Training data", definition: "The collection of examples an AI studies to learn." },
    { term: "Label", definition: "The correct answer attached to a training example (e.g., 'cat')." },
    { term: "Model", definition: "The trained result — tuned numbers that capture the learned patterns." },
    { term: "Supervised learning", definition: "Learning from examples that each include the correct answer." },
  ],
  realWorld:
    "Email spam filters learned from billions of emails people marked as 'spam' or 'not spam' — that human labeling is the training data behind your clean inbox.",
  quiz: [
    {
      id: "q1",
      question: "How is machine learning different from old-style rule-based programming?",
      choices: [
        "It uses faster computers but the same hand-written rules",
        "Instead of a human writing every rule, the AI learns patterns from many examples",
        "It doesn't use data at all",
        "It only works on robots",
      ],
      correctIndex: 1,
      explanation:
        "In machine learning, we provide examples and the AI figures out the rules itself, rather than a human coding each rule.",
    },
    {
      id: "q2",
      question: "What is 'training data'?",
      choices: [
        "The robot's exercise routine",
        "The labeled examples an AI studies to learn patterns",
        "The price of the AI",
        "The internet connection speed",
      ],
      correctIndex: 1,
      explanation:
        "Training data is the set of examples (often with correct labels) that the AI learns from.",
    },
    {
      id: "q3",
      question: "In supervised learning, what makes it 'supervised'?",
      choices: [
        "A teacher watches the computer the whole time",
        "Each training example comes with the correct answer (a label)",
        "It only runs during school hours",
        "It needs no data",
      ],
      correctIndex: 1,
      explanation:
        "Supervised learning uses labeled examples — like an answer key — so the AI can check and adjust as it learns.",
    },
    {
      id: "q4",
      question: "After training, what is the 'model'?",
      choices: [
        "A physical robot",
        "The trained result — tuned numbers that capture the learned patterns and can make predictions",
        "The person who built the AI",
        "A copy of all the training photos",
      ],
      correctIndex: 1,
      explanation:
        "The model is what learning produces. It stores the patterns (as numbers) and uses them to predict on new inputs.",
    },
  ],
  reflection: {
    prompt:
      "You want to teach an AI to tell ripe bananas from unripe ones. What examples and labels would you collect for its training data?",
    placeholder: "I'd collect photos of bananas labeled 'ripe' or 'unripe', including…",
  },
};
