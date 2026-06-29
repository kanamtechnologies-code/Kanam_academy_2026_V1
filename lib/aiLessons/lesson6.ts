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
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Last lesson, an AI "learned" from examples. But here's the catch: how do we know it actually *learned* — instead of just memorizing? And why does AI sometimes give a confident answer that's flat-out wrong? Today you'll get the tools to tell a trustworthy model from a sneaky one.\n\nThe plan:\n\n• Why we test a model on examples it has **never seen**.\n• **Overfitting** — the classic trap of memorizing instead of learning.\n• **Accuracy** — a useful score that can also be misleading.\n• Why pattern-based AI will *always* make some mistakes.\n\nThis matters every time you read "our AI is 95% accurate" in an ad, or a chatbot states something with total confidence. You'll know exactly what questions to ask before you trust it.`,
        image: "/images/lessons/ai-6-train-test.png",
        imageAlt: "Data split into a training pile and a hidden test pile",
        callout: {
          label: "Why it matters",
          text: "From medical tools to homework helpers, people trust AI based on impressive-sounding scores. Knowing how those scores can hide real mistakes protects you from being fooled by a number.",
        },
      },
      {
        id: "test",
        kicker: "The big idea",
        title: "You test a model on examples it has never seen",
        body: `Imagine studying for a test by memorizing the exact answer key from last year. You'd ace those *specific* questions but flop the moment the teacher changes them. You didn't learn the subject — you memorized answers. AI can fall into the same trap.\n\nSo we split our examples into two piles: most become **training data** (for studying), and we hold some back as a secret **test set** the model never sees during learning. Then we quiz it on that held-back set.\n\nA model is only good if it does well on the **test set** — questions it never studied. That's the proof it learned the real **pattern**, not just the answer key. It's the difference between truly understanding fractions and memorizing that "question 4 equals 7."`,
        callout: {
          label: "Key insight",
          text: "Doing well on training data is easy — the model already saw those answers. Doing well on new, unseen data is what actually matters.",
        },
      },
      {
        id: "overfitting",
        kicker: "A classic failure",
        title: "Overfitting = memorizing instead of learning",
        body: `**Overfitting** happens when a model memorizes its training examples — even their random quirks — instead of learning the real, general pattern. It looks brilliant on training data and then face-plants on anything new.\n\nPicture a student who memorizes that "the answer to problem 3 is B" without learning *why*. Hand them a reworded version and they're lost. An overfit model is exactly that student: great at the exact examples it crammed, helpless with fresh ones.\n\nIt's the AI version of cramming the answer key. The cure is more **varied** training data and always judging the model by the **test set**, never by how well it nailed the questions it already saw.`,
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
        body: `**Accuracy** is the simplest score: out of all the test questions, what fraction did the model get right? 90 correct out of 100 is 90% accuracy. Easy.\n\nBut accuracy can be sneaky, and this is one of the most important ideas in the whole course. Suppose 99% of emails are *not* spam. A lazy model that just says "never spam" — for every single email — is **99% accurate**, and totally useless, because it never catches a single piece of spam!\n\nThat's why a high score alone doesn't prove a model is good. Always ask *what kind* of mistakes it makes, not just the headline number.`,
        code: `accuracy = correct predictions ÷ total predictions
        = 90 ÷ 100
        = 90%`,
        codeCaption: "Accuracy, in one line",
        callout: {
          label: "Myth check",
          text: "High accuracy does not automatically mean a good AI. A model can score 99% and still completely fail at the rare cases that matter most — like the 1% that are actually spam, fraud, or disease.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Why a '99% accurate' spam filter can be terrible",
        body: `Let's put a suspicious "99% accurate" filter on trial, step by step.\n\n**Step 1 — Know the mix.** Out of 100 emails, 99 are normal and 1 is spam. Spam is rare, which is the key to the trick.\n\n**Step 2 — Meet the lazy model.** This filter has a single move: label *everything* "not spam." It never flags anything.\n\n**Step 3 — Count the score.** It's right about all 99 normal emails and wrong only about the 1 spam. That's 99 ÷ 100 = **99% accuracy** — a great-looking number!\n\n**Step 4 — Spot the failure.** But its real job was catching spam, and it caught **zero**. The one case that mattered slipped right through. The headline score hid the only mistake we cared about.\n\nSo the smart question isn't "what's the accuracy?" It's "of the cases that actually matter, how many did it catch?"`,
        callout: {
          label: "Pro tip",
          text: "When you hear a shiny accuracy number, ask: *what's the mix of cases, and which mistakes count most?* Rare-but-important cases (spam, fraud, illness) are exactly where high accuracy can lie.",
        },
      },
      {
        id: "why-wrong",
        kicker: "Why AI is confidently wrong",
        title: "Mistakes are built in — plan for them",
        body: `Because AI predicts from patterns, it will **always** make some mistakes — especially on unusual inputs it didn't see during training. The really tricky part: it often sounds *just as confident* when it's wrong as when it's right. There's no nervous wobble in its voice to warn you.\n\nThat's not a bug you can fully remove; it's the nature of pattern-based AI. Patterns can't cover every weird, new, or rare situation the real world throws at them.\n\nThe smart move is to expect mistakes and double-check important answers — a theme we'll return to again and again. Treating AI as a confident assistant that *can* be wrong, rather than an all-knowing oracle, keeps you safe.`,
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Take these with you: models are judged on a **hidden test set** of unseen examples. **Overfitting** is memorizing the training data instead of learning the pattern. **Accuracy** is useful but can hide what *kinds* of mistakes a model makes. And pattern-based AI will always make some mistakes — confidently.\n\nThat's why "95% accuracy" should make you curious, not convinced.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on what follow-up question you'd ask about that other 5%.`,
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
