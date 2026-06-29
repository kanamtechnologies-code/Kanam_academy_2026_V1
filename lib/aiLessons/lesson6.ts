import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson6: AILessonConfig = {
  id: "ai-6",
  title: "6. Training, Testing, and Mistakes",
  goal: "Learn how we check whether a model really learned, why AI makes confident mistakes, and what 'overfitting' and 'accuracy' mean.",
  xpReward: 300,
  badge: "🎯 Model Tester",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/5",
  nextHref: "/learn/ai/7",
  lessonModule: {
    durationLabel: "~7 min lesson",
    sections: [
      {
        id: "test",
        kicker: "The big idea",
        title: "You test a model on examples it has never seen",
        body: `Imagine studying for a test by memorizing the answer key. You'd ace those exact questions but flop on new ones. AI can do the same thing.\n\nSo we split our examples: most become **training data**, and we hold some back as a secret **test set**. A model is only good if it does well on the test set — questions it never studied. That proves it learned the **pattern**, not the answer key.`,
        image: "/images/lessons/ai-6-train-test.png",
        imageAlt: "Data split into a training pile and a hidden test pile",
        callout: {
          label: "Key insight",
          text: "Doing well on training data is easy. Doing well on new, unseen data is what actually matters.",
        },
      },
      {
        id: "overfitting",
        kicker: "A classic failure",
        title: "Overfitting = memorizing instead of learning",
        body: `**Overfitting** happens when a model memorizes its training examples (even the random quirks) instead of learning the real pattern. It looks brilliant on training data and fails on anything new.\n\nIt's the AI version of cramming the answer key. The cure: more varied data, and always judging the model by the **test set**.`,
        bullets: [
          "**Overfitting** = great on training data, bad on new data.",
          "Caused by memorizing quirks instead of the real pattern.",
          "Caught by checking performance on the hidden test set.",
        ],
      },
      {
        id: "accuracy",
        kicker: "Measuring it",
        title: "Accuracy tells you how often the model is right",
        body: `**Accuracy** is the simplest score: out of all the test questions, what fraction did the model get right? 90 correct out of 100 = 90% accuracy.\n\nBut accuracy can be sneaky. If 99% of emails are *not* spam, a lazy model that says "never spam" is 99% accurate — and totally useless. Always ask *what kind* of mistakes a model makes, not just the headline score.`,
        code: `accuracy = correct predictions ÷ total predictions
        = 90 ÷ 100
        = 90%`,
        codeCaption: "Accuracy, in one line",
      },
      {
        id: "why-wrong",
        kicker: "Why AI is confidently wrong",
        title: "Mistakes are built in — plan for them",
        body: `Because AI predicts from patterns, it will **always** make some mistakes — especially on unusual inputs it didn't see during training. And it often sounds just as confident when it's wrong as when it's right.\n\nThat's not a bug you can fully remove; it's the nature of pattern-based AI. The smart move is to expect mistakes and double-check important answers — a theme we'll return to in Week 6.`,
      },
    ],
  },
  bigIdeas: [
    "Models are judged on a **hidden test set** of unseen examples.",
    "**Overfitting** is memorizing the training data instead of learning the pattern.",
    "**Accuracy** is useful but can hide what kinds of mistakes a model makes.",
  ],
  keyTerms: [
    { term: "Test set", definition: "Examples held back from training, used to check if the model really learned." },
    { term: "Overfitting", definition: "When a model memorizes training data and fails on new data." },
    { term: "Accuracy", definition: "The fraction of predictions a model gets right." },
    { term: "Generalize", definition: "To perform well on new, unseen examples — the real goal of learning." },
  ],
  realWorld:
    "Before a medical AI is trusted, it's tested on patient cases it never trained on. A model that only looked good on training data could be dangerously wrong in the real world.",
  quiz: [
    {
      id: "q1",
      question: "Why do we hold back a 'test set' the model never trains on?",
      choices: [
        "To make training faster",
        "To check whether the model learned the real pattern, not just memorized answers",
        "To save storage space",
        "Test sets aren't actually useful",
      ],
      correctIndex: 1,
      explanation:
        "Testing on unseen examples proves the model generalizes, rather than just memorizing its training data.",
    },
    {
      id: "q2",
      question: "A model scores 100% on training data but fails badly on new examples. This is called…",
      choices: [
        "Underfitting",
        "Overfitting",
        "Perfect learning",
        "Perception",
      ],
      correctIndex: 1,
      explanation:
        "Overfitting means the model memorized its training examples (and their quirks) instead of learning the general pattern.",
    },
    {
      id: "q3",
      question: "99% of emails are NOT spam. A model that labels EVERY email 'not spam' is 99% accurate. Why is it still useless?",
      choices: [
        "99% is a failing score",
        "It never actually catches any spam — high accuracy hides the mistakes that matter",
        "Accuracy can't be measured for email",
        "It is actually a great model",
      ],
      correctIndex: 1,
      explanation:
        "Accuracy alone can mislead. Here the model catches zero spam, so it fails at its real job despite a high score.",
    },
    {
      id: "q4",
      question: "Why will pattern-based AI always make some mistakes?",
      choices: [
        "It predicts from patterns and will meet unusual inputs it didn't train on",
        "Programmers are lazy",
        "Computers are too slow",
        "It won't — modern AI is perfect",
      ],
      correctIndex: 0,
      explanation:
        "Predicting from patterns means unusual or unseen inputs can trip it up — and it may still sound confident. Expect mistakes and verify.",
    },
  ],
  reflection: {
    prompt:
      "Why is it risky to trust an AI just because the company says it scored '95% accuracy'? What follow-up question would you ask?",
    placeholder: "I'd want to know what kinds of mistakes make up the other 5%, because…",
  },
};
