import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson5: AILessonConfig = {
  id: "ai-5",
  title: "5. How AI Learns From Examples",
  goal: "Understand machine learning: instead of being programmed with rules, AI learns patterns from labeled examples (the Big Idea of Learning).",
  xpReward: 250,
  badge: "Pattern Learner",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/4",
  nextHref: "/learn/ai/6",
  lessonModule: {
    durationLabel: "~7 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Here's a puzzle: nobody sat down and wrote a rule for every possible cat photo, yet your phone can still find all the cats in your camera roll. How? Today you'll uncover the answer — the single most important idea in modern AI.\n\nThe roadmap:\n\n• Meet the Big Idea of **Learning** — why today's AI is *taught*, not hand-coded.\n• Discover **training data**: the labeled examples that fuel learning.\n• See how learning produces a **model** that can handle brand-new inputs.\n\nThis is the engine behind spam filters, photo search, translation, recommendations, and chatbots. Once you see that AI *learns from examples*, you'll also understand why the quality of those examples decides everything.`,
        image: "/images/lessons/ai-5-learn.png",
        imageAlt: "An AI studying many labeled example photos to learn a pattern",
        callout: {
          label: "Why it matters",
          text: "Because AI learns from examples, it inherits whatever is in those examples — the smarts and the flaws. Knowing this is the key to understanding both why AI is so powerful and why it can be biased or wrong.",
        },
      },
      {
        id: "learning",
        kicker: "Big Idea: Learning",
        title: "Modern AI is taught, not hand-coded",
        body: `Old-style programs follow rules a human wrote out by hand: "IF email contains 'free money' THEN mark as spam." That works for a while — until spammers write "fr€e m0ney" and the rule misses it. You'd need a human to keep writing endless new rules forever.\n\n**Machine learning (ML)** flips this around. Instead of writing the rules, we show the AI **thousands of labeled examples** ("this is spam," "this is not") and let it *figure out the patterns itself*.\n\nThink about how you learned what a dog is. Nobody gave you a checklist of dog features — your family just pointed at dogs and said "dog" enough times that your brain caught on. Machine learning works the same way: lots of labeled examples, and the pattern clicks. That's what "learning" means in AI.`,
        callout: {
          label: "Key insight",
          text: "Machine learning = learning the rules from examples, instead of a human writing every rule by hand. The AI discovers the pattern; we just provide good examples.",
        },
      },
      {
        id: "training-data",
        kicker: "The fuel",
        title: "Training data is the examples we learn from",
        body: `The examples we feed an AI are called **training data**, and they're the fuel for the whole process. To learn "cat vs. dog," a model studies many, many photos that are already **labeled** with the right answer.\n\nThink of training data like flashcards with the answer written on the back. The AI sees the photo (front), guesses, then checks the label (back), and adjusts. Do that millions of times and the patterns sink in.\n\nMore good, *varied* examples usually means better learning — cats of every color, angle, and lighting. This is **supervised learning**, the most common kind, called "supervised" because each example comes with the correct label, like a built-in answer key guiding the AI.`,
        bullets: [
          "**Training data** = the labeled examples the AI learns from.",
          "**Label** = the correct answer attached to an example.",
          "**Supervised learning** = learning from examples that include answers.",
        ],
        callout: {
          label: "Myth check",
          text: "More data isn't automatically better. A million blurry, mislabeled, or all-the-same photos teach worse than a few thousand clear, varied, correctly-labeled ones. Quality and variety beat raw size.",
        },
      },
      {
        id: "model",
        kicker: "The result",
        title: "Learning produces a 'model'",
        body: `After studying all that data, the AI saves what it learned as a **model** — basically a giant set of tuned numbers that captures the patterns it found. The training data itself isn't kept inside; the model is more like the *lessons learned* from it.\n\nThink of the model as the recipe a chef writes after tasting hundreds of dishes. The chef doesn't carry around every meal they ever ate — just the distilled know-how. The model is that distilled know-how, stored as numbers.\n\nLater, you hand the model a brand-new photo it has never seen, and it predicts "cat" or "dog." A good model **generalizes**: it works on new examples, not just the ones it studied. That's the real test of learning — and it's exactly what we'll dig into next lesson.`,
        callout: {
          label: "Watch the words",
          text: "Training = the learning phase (studying examples). The model = the trained result (the stored patterns). Two different things, easy to mix up.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Teaching an AI to flag spam, step by step",
        body: `Let's build a spam filter the machine-learning way and watch each stage.\n\n**Step 1 — Gather labeled examples.** Collect a huge pile of real emails, each already marked by people as "spam" or "not spam." That's your training data with its answer key.\n\n**Step 2 — Extract features.** Each email becomes a list of signals the model can learn from: suspicious words ("FREE $$$"), number of links, sender patterns. Raw email text is too messy on its own — features turn it into useful numbers.\n\n**Step 3 — Train the model.** The AI studies those features and labels, tuning itself to connect patterns like "lots of links + ALL-CAPS" with spam. No human writes "if it says 'free money'..." by hand.\n\n**Step 4 — Test on held-out mail.** Before trusting it, we quiz the model on emails it **never saw during training**. That's the honest check — does it generalize, or did it just memorize?\n\n**Step 5 — Deploy and monitor.** Ship the filter, but keep watching. Spammers invent new tricks every month, so the team adds fresh examples and retrains.\n\n**Watch out — class imbalance.** Suppose your training pile has 5,000 spam ads but only 20 real school emails. The model sees "spam" almost every time, so it learns a lazy rule: "call everything spam." Your teacher's homework reminder gets crushed. More total emails isn't automatically better — **balanced, varied examples** matter as much as quantity.`,
        callout: {
          label: "Pro tip",
          text: "When a spam filter wrongly trashes a real email, that's a hint its training data didn't include enough examples like that one. The fix is almost always better, more varied examples — not more hand-written rules.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Big ideas to keep: **machine learning** learns rules from examples instead of being hand-coded. **Training data** (labeled examples) is the fuel. And learning produces a **model** that should work on new, unseen examples.\n\nAlmost every AI you use — recommendations, translation, chatbots — learned this way from huge piles of examples, so the quality of those examples shapes everything it does.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then reflect on what data *you'd* collect to teach an AI something.`,
      },
    ],
  },
  bigIdeas: [
    "**Machine learning** learns rules from examples instead of being hand-coded.",
    "**Training data** (labeled examples) is the fuel — balance and quality matter.",
    "Learning produces a **model** tested on held-out data, then deployed and monitored.",
  ],
  keyTerms: [
    { term: "Machine Learning (ML)", definition: "AI that learns patterns from examples rather than from rules a human writes." },
    { term: "Training data", definition: "The collection of examples an AI studies to learn." },
    { term: "Label", definition: "The correct answer attached to a training example (e.g., 'cat')." },
    { term: "Model", definition: "The trained result — tuned numbers that capture the learned patterns." },
    { term: "Class imbalance", definition: "When one label appears far more often than others in training data, which can teach lazy, unfair rules." },
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
