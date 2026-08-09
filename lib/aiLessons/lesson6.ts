import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson6: AILessonConfig = {
  id: "ai-6",
  title: "6. Training, Testing, and Mistakes",
  goal: "Learn how we check whether a model really learned, why AI makes confident mistakes, and what 'overfitting' and 'accuracy' mean — including how a shiny accuracy number can hide dangerous failures.",
  xpReward: 300,
  badge: "Model Tester",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/5",
  nextHref: "/learn/ai/7",
  instructorScript: `**Coach's note**
Today's lesson: **Training, Testing, and Mistakes**.

**Goal:** Learn how we check whether a model really learned, why AI makes confident mistakes, and what 'overfitting' and 'accuracy' mean — including how a shiny accuracy number can hide dangerous failures.

**How to facilitate**
1. Warm-up: ask students what they already think about "What you'll learn today".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~20–25 min",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Last lesson, an AI "learned" from examples. But here's the catch: how do we know it actually *learned* — instead of just memorizing? And why does AI sometimes give a confident answer that's flat-out wrong? Today you'll get the tools to tell a trustworthy model from a sneaky one.\n\nThe plan:\n\n• Why we test a model on examples it has **never seen**.\n• **Overfitting** — the classic trap of memorizing instead of learning.\n• **Accuracy** — a useful score that can also be misleading.\n• A real medical AI case where an impressive-sounding tool made unsafe recommendations.\n\nThis matters every time you read "our AI is 95% accurate" in an ad, or a chatbot states something with total confidence. You'll know exactly what questions to ask before you trust it.`,
        image: "/images/lessons/ai-6-train-test.png",
        imageAlt: "Data split into a training pile and a hidden test pile",
        callout: {
          label: "Why it matters",
          text: "From medical tools to homework helpers, people trust AI based on impressive-sounding scores. Knowing how those scores can hide real mistakes protects you from being fooled by a number.",
        },
      },
      {
        id: "hook-story",
        kicker: "True story",
        title: "The AI that aced its own homework",
        body: `A team once built a model to predict which students were at risk of failing a class, using years of past grade data. On the data it trained on, it was stunningly accurate — over 98%. Excited, the team almost skipped straight to using it school-wide.\n\nThen someone insisted on testing it on a *new* semester's data — records the model had never seen. The accuracy collapsed to barely better than a coin flip.\n\nWhat happened? The model hadn't learned "what makes a student struggle." It had memorized quirks specific to the exact students and semesters in its training pile — a schedule change here, a particular teacher's grading pattern there. It looked brilliant on its own homework and fell apart on the real test. That gap between "looks great on old data" and "actually works on new data" is the entire subject of today's lesson.`,
      },
      {
        id: "glossary",
        kicker: "Words you'll need",
        title: "Your vocabulary for this lesson",
        body: `These words describe how we separate a model that truly learned from one that just memorized.`,
        bullets: [
          "**Test set** — examples held back from training, used to check if the model really learned.",
          "**Overfitting** — when a model memorizes training data and fails on new data.",
          "**Accuracy** — the fraction of predictions a model gets right.",
          "**Validation set** — examples used to tune a model during development — separate from the final test set.",
          "**Generalize** — to perform well on new, unseen examples — the real goal of learning.",
        ],
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "You test a model on examples it has never seen",
        body: `Imagine studying for a test by memorizing the exact answer key from last year. You'd ace those *specific* questions but flop the moment the teacher changes them. You didn't learn the subject — you memorized answers. AI can fall into the same trap.\n\nSo we split our examples into piles: most become **training data** (for studying), some become a **validation set** (for tuning while you build), and we hold back a secret **test set** the model never sees until the very end.\n\nHere's the golden rule: **don't peek at test labels while tuning.** If you keep checking the test set, adjusting the model, and checking again, the test set stops being an honesty check — it becomes another answer key you memorized. Use the **validation set** to try fixes (more data, simpler model, different features). Only when you're done tuning do you run the **final test** once — that's your honest score.\n\nA model is only good if it does well on that final test — questions it never studied and never influenced your tweaks. That's the proof it learned the real **pattern**, not just the answer key.`,
        callout: {
          label: "Key insight",
          text: "Doing well on training data is easy — the model already saw those answers. Doing well on new, unseen data is what actually matters.",
        },
        checkIn: {
          prompt: "Why do researchers hold back a hidden 'test set' that the model never trains on?",
          choices: [
            "“Test sets don't actually matter and can be skipped” describes a different situation than the one in the question stem",
            "If the goal were something else, “To save money on computer storage” might work; for this check, it does not",
            "To check whether the model learned a real, general pattern rather than just memorizing its training examples",
            "To make the training process run faster — familiar wording, wrong fit for what the prompt is actually asking",
          ],
          correctIndex: 2,
          explanation:
            "Unseen examples are the honest check. A model that only does well on data it already saw hasn't proven it learned anything general.",
        },
      },
      {
        id: "concept-2",
        kicker: "A classic failure",
        title: "Overfitting = memorizing instead of learning",
        body: `**Overfitting** happens when a model memorizes its training examples — even their random quirks — instead of learning the real, general pattern. It looks brilliant on training data and then face-plants on anything new.\n\nPicture a student who memorizes that "the answer to problem 3 is B" without learning *why*. Hand them a reworded version and they're lost. An overfit model is exactly that student: great at the exact examples it crammed, helpless with fresh ones.\n\nIt's the AI version of cramming the answer key. The cure is more **varied** training data and always judging the model by the **test set**, never by how well it nailed the questions it already saw.`,
        bullets: [
          "**Overfitting** = great on training data, bad on new data.",
          "Caused by memorizing quirks instead of the real pattern.",
          "Caught by checking performance on the hidden test set.",
        ],
        checkIn: {
          prompt: "A model scores 99% on its training data but only 52% on brand-new data. What does this most likely show?",
          choices: [
            "This is completely normal and not a concern” belongs to a different situation than the one in the question stem",
            "“The model needs a faster processor” describes a different situation than the one in the question stem",
            "Overfitting — the model memorized training quirks instead of learning a general, reusable pattern",
            "The model is perfect and the test data must be wrong” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "A huge gap between training and test performance is the textbook sign of overfitting — memorization, not real learning.",
        },
      },
      {
        id: "concept-3",
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
        checkIn: {
          prompt: "A model that labels every single email 'not spam' scores 99% accuracy because 99% of real emails aren't spam. Is this a good model?",
          choices: [
            "No — it catches zero spam despite the high score, showing accuracy alone can be misleading",
            "Yes — 99% accuracy is always excellent” belongs to a different situation than the one in the question stem",
            "There's no way to know without more information” belongs to a different situation than the one in the question stem",
            "Yes, because accuracy is the only thing that matters” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "This is the classic accuracy trap: a high score can completely hide a model's total failure at the one job that actually matters.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Why a '99% accurate' spam filter can be terrible",
        body: `Let's put a suspicious "99% accurate" filter on trial — and show why peeking at the test set ruins the score.\n\n**Step 1 — Split the data honestly.** Out of 100 emails, 99 are normal and 1 is spam. We split into train, validation, and a held-out test set. The test labels stay hidden while we tune.\n\n**Step 2 — Train and tune on train + validation.** A lazy model learns one rule: label *everything* "not spam." It scores 99% on training data — looks great!\n\n**Step 3 — Don't peek at the test set yet.** A teammate wants to "just check" the test score, tweak the model, and check again. That's cheating — each peek leaks answers. We use the **validation set** for tweaks instead.\n\n**Step 4 — Run the final test once.** On the untouched test set: 99 correct out of 100 = **99% accuracy**. Impressive number — but it caught **zero** spam. The one case that mattered slipped through.\n\n**Step 5 — Ask the right question.** The smart follow-up isn't "what's the accuracy?" It's "of the cases that actually matter, how many did it catch?" High accuracy can hide lazy models and rare-but-critical failures.`,
        callout: {
          label: "Pro tip",
          text: "When you hear a shiny accuracy number, ask: *what's the mix of cases, and which mistakes count most?* Rare-but-important cases (spam, fraud, illness) are exactly where high accuracy can lie.",
        },
      },
      {
        id: "second-example",
        kicker: "Second example",
        title: "When 95% accuracy still fails badly",
        body: `Imagine a medical screening AI tested on 1,000 patients. It correctly identifies 950 healthy patients and misses 50 who actually need follow-up. The headline says **"95% accurate!"**\n\nBut flip the perspective: for the 50 patients who needed help, the AI failed **100% of them** in that slice. If those misses are concentrated in one demographic group because the test set underrepresented them, the shiny number hides a serious fairness problem.\n\nThis is why AI teams report more than one metric — and why you should ask **"accurate for whom, on what kinds of examples?"** not just "what's the accuracy?"`,
        callout: {
          label: "Notice this",
          text: "A single accuracy number can look great while hiding the failures that matter most for real people.",
        },
        checkIn: {
          prompt: "Why can a 95% overall accuracy score still hide a serious problem?",
          choices: [
            "Because the failures might cluster on the cases or groups that matter most, even while most easy cases look fine",
            "“Because accuracy is always fake in AI marketing” describes a different situation than the one in the question stem",
            "Because 95% is mathematically impossible for any real model” belongs to a different situation than the one in the question stem",
            "“Because accuracy only applies to image models, not text” describes a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Overall accuracy averages across all cases. If hard cases or underrepresented groups fail disproportionately, the headline number can look fine while the real harm concentrates where testing was weakest.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "\"A high score means I can trust it\"",
        body: `This lesson's biggest myth deserves its own dedicated takedown, because it shows up constantly in real product claims.`,
        bullets: [
          "**Myth: 95% accuracy always means a trustworthy tool.** Reality: it depends entirely on what the other 5% is, and how much those mistakes matter.",
          "**Myth: A model that does great in the demo will do great for me.** Reality: demos are often shown on easy, cherry-picked examples — not messy real-world cases.",
          "**Myth: If it's tested, it's safe.** Reality: it's only as safe as the test was thorough, honest, and representative of real use.",
        ],
        checkIn: {
          prompt: "What follow-up question should you ask after hearing '95% accurate'?",
          choices: [
            "What kind of mistakes make up the other 5%, and how much do they matter?",
            "Nothing — 95% is high enough to trust automatically” belongs to a different situation than the one in the question stem",
            "How many total employees work at the company that built it?” belongs to a different situation than the one in the question stem",
            "How long has the company existed?” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "The nature of the mistakes — not just the overall percentage — determines whether a tool is actually trustworthy for a given use.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it now",
        title: "Spot the trap in an ad",
        body: `Search your memory (or ask a family member) for an ad or news headline claiming an AI product is "X% accurate." Ask yourself:\n\n1. Accurate at *what specific task*, exactly?\n2. What's the split between common cases and rare-but-important cases?\n3. Was it tested on real-world messy data, or a clean demo?\n\nYou'll likely find the ad never answers these questions — which is exactly the gap your new skill lets you notice.`,
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Reading past the headline accuracy number",
        body: `Real AI researchers rarely trust a single accuracy number. Here's a more advanced version of the skill: asking about **false positives** and **false negatives** — the two different flavors of mistake a model can make.`,
        bullets: [
          "**False positive** — the model says 'yes' (spam! disease! high risk!) when the true answer is 'no.' Can cause unnecessary panic or wasted effort.",
          "**False negative** — the model says 'no' when the true answer is 'yes.' Can let something dangerous slip through undetected.",
          "**Ask which type of mistake is worse for this specific use case** — for a disease screening tool, missing a real case (false negative) is usually far worse than a false alarm.",
        ],
        image: "/images/lessons/ai-6-extra1.png",
        imageAlt: "A diagram showing false positive and false negative outcomes for a medical screening AI",
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "A well-fit model vs. an overfit model",
        body: `Seeing the two side by side makes the warning signs of overfitting easy to spot in the future.`,
        table: {
          columns: ["Trait", "Well-fit model", "Overfit model"],
          values: [
            ["Training accuracy", "Good, but not suspiciously perfect", "Extremely high, almost 100%"],
            ["Test accuracy", "Similar to training accuracy", "Much lower than training accuracy"],
            ["What it actually learned", "The real, general pattern", "Quirks specific to the training examples"],
          ],
          rowCount: 3,
        },
        checkIn: {
          prompt: "What is the clearest warning sign of overfitting in this comparison?",
          choices: [
            "The model was trained on a large dataset” belongs to a different situation than the one in the question stem",
            "The model uses a validation set at all” belongs to a different situation than the one in the question stem",
            "Training accuracy and test accuracy are both moderate and similar",
            "Training accuracy is extremely high while test accuracy is much lower",
          ],
          correctIndex: 3,
          explanation:
            "A big gap between near-perfect training performance and much weaker test performance is the classic fingerprint of overfitting.",
        },
      },
      {
        id: "ethics-or-bias",
        kicker: "Ethics moment",
        title: "When a medical AI's confidence outran its testing",
        body: `A widely reported 2018 investigation found that an AI system designed to recommend cancer treatments had, in some cases, suggested unsafe or incorrect treatment options. Investigators traced part of the problem to how the system was trained and tested: it learned largely from a relatively small number of hypothetical cases crafted by a limited group of specialists, rather than a large, diverse set of real, varied patient records and outcomes.\n\nThe tool could sound confident and medically fluent while still being wrong — a healthcare version of the same overfitting and testing problems you just learned about, but with much higher stakes than a spam filter.\n\nThe company scaled back some of the tool's use and emphasized that it was meant to support doctors' decisions, not replace their judgment — a reminder that "trained by experts" and "properly tested on real, diverse cases" are not automatically the same thing.`,
        callout: {
          label: "Why this matters",
          text: "The gap between impressive-sounding training and thorough, honest testing on diverse real cases can matter enormously — sometimes as much as someone's health.",
        },
      },
      {
        id: "habits",
        kicker: "Build the habit",
        title: "Three habits for evaluating any AI claim",
        body: `These habits work whether you're reading a science article, a product ad, or a school project's results.`,
        bullets: [
          "**Ask 'tested on what, and how thoroughly?'** A shiny number from a small or narrow test means less than one from a large, diverse, honest test.",
          "**Look for the gap.** Training performance vs. test performance — a big gap is a red flag for overfitting.",
          "**Ask which mistakes matter most.** Not all errors are equal; a rare-but-critical miss can matter more than the overall percentage suggests.",
        ],
      },
      {
        id: "transfer-to-life",
        kicker: "Use it for real",
        title: "Don't trust one shiny metric",
        body: `Next time you hear "this AI is 99% accurate," ask follow-ups before believing it:\n\n• **Tested on what?** Data that looks like real life, or only easy cases?\n• **Failed how?** Random glitches or repeated patterns for certain groups?\n• **Confident when wrong?** A system that sounds sure while failing is more dangerous than one that admits uncertainty.\n\nThese questions work for school tools, health apps, and anything else that claims a score proves it's "ready."`,
        callout: {
          label: "Transfer this",
          text: "Testing and metrics aren't just for engineers — they're your shield against overconfident AI claims.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Think it through",
        title: "Before you move on, sit with this",
        body: `Think about the ad or headline you examined earlier in the "try it" activity.\n\nIf you could ask the company one follow-up question about their accuracy claim, what would it be — and why would that answer change whether you trust the product? You'll be asked to put this into words in your reflection at the end of the lesson.`,
      },
      {
        id: "mini-case",
        kicker: "Real-world case",
        title: "The medical AI that learned from too few real cases",
        body: `The cancer-treatment recommendation tool mentioned earlier became one of the most discussed case studies in AI safety literature after journalists reviewed internal documents in 2018. Investigators found that many of the system's training scenarios had been built by a small team of doctors imagining likely cases, rather than drawn from a large, varied set of real patient histories and outcomes across many hospitals.\n\nWhen the tool was deployed more broadly and tested against messier, more diverse real-world cases, it sometimes recommended treatments that real oncologists flagged as unsafe or inappropriate for the actual patient's situation. The system sounded confident and used correct-sounding medical language regardless of whether the recommendation was sound.\n\nThe case became a cautionary tale specifically about the training/testing gap: a tool can look excellent on the scenarios it was built and tested against, and still fail once it meets the true variety of the real world — the exact overfitting-style risk from earlier in this lesson, scaled up to a life-or-death setting.`,
        callout: {
          label: "Why this case matters",
          text: "It shows that 'trained by experts' isn't the same guarantee as 'tested thoroughly on diverse, real cases' — the distinction this whole lesson is built around.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "Quick gut-check before the quiz",
        body: `Let's make sure the big ideas actually stuck before you head into the knowledge check.`,
        checkIn: {
          prompt: "What was the core problem with the medical AI's training and testing process, based on this lesson?",
          choices: [
            "It relied heavily on a smaller set of expert-imagined scenarios rather than a large, diverse set of real, varied cases",
            "Picking “Doctors were never involved in building it” is a common mix-up that confuses a nearby idea with the right one",
            "“It was tested on too many real, diverse patient cases” describes a different situation than the one in the question stem",
            "It can seem like it had no training data at all, but that reading skips the distinction this question is testing",
          ],
          correctIndex: 0,
          explanation:
            "The gap between narrow training/testing scenarios and the true variety of real patients is what allowed unsafe recommendations to slip through undetected.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Take these with you: models are judged on a **hidden test set** of unseen examples — tune on **train/validation**, then run the **final test** once without peeking. **Overfitting** is memorizing the training data instead of learning the pattern. **Accuracy** is useful but can hide what *kinds* of mistakes a model makes — including false positives and false negatives. And pattern-based AI will always make some mistakes — confidently.\n\nThat's why "95% accuracy" should make you curious, not convinced.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then reflect on what follow-up question you'd ask about that other 5%.`,
      },
    ],
  },
  bigIdeas: [
    "Models are judged on a **hidden test set** — tune on validation, don't peek at test labels early.",
    "**Overfitting** is memorizing the training data instead of learning the pattern.",
    "**Accuracy** is useful but can hide what kinds of mistakes a model makes.",
    "False positives and false negatives are different kinds of mistakes — one is often worse than the other.",
    "'Trained by experts' is not the same guarantee as 'tested thoroughly on diverse, real cases.'",
  ],
  keyTerms: [
    { term: "Test set", definition: "Examples held back from training, used to check if the model really learned." },
    { term: "Overfitting", definition: "When a model memorizes training data and fails on new data." },
    { term: "Accuracy", definition: "The fraction of predictions a model gets right." },
    { term: "Validation set", definition: "Examples used to tune a model during development — separate from the final test set." },
    { term: "Generalize", definition: "To perform well on new, unseen examples — the real goal of learning." },
    { term: "False positive / false negative", definition: "The two different kinds of mistakes a model can make — saying 'yes' when it's 'no,' or 'no' when it's 'yes.'" },
  ],
  realWorld:
    "Before a medical AI is trusted, it's tested on patient cases it never trained on. A model that only looked good on training data — or on a narrow set of expert-imagined scenarios — could be dangerously wrong in the real world, as happened with a real cancer-treatment recommendation tool.",
  quiz: [
    {
      id: "q1",
      question: "Why do we hold back a 'test set' the model never trains on?",
      choices: [
            "Test sets aren't actually useful” belongs to a different situation than the one in the question stem",
            "“To make training faster” describes a different situation than the one in the question stem",
            "To check whether the model learned the real pattern, not just memorized answers",
            "“To save storage space” describes a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Testing on unseen examples proves the model generalizes, rather than just memorizing its training data.",
    },
    {
      id: "q2",
      question: "A model scores 100% on training data but fails badly on new examples. This is called…",
      choices: [
        "Overfitting",
        "Underfitting",
        "Perfect learning",
        "Perception",
      ],
      correctIndex: 0,
      explanation:
        "Overfitting means the model memorized its training examples (and their quirks) instead of learning the general pattern.",
    },
    {
      id: "q3",
      question: "99% of emails are NOT spam. A model that labels EVERY email 'not spam' is 99% accurate. Why is it still useless?",
      choices: [
            "Accuracy can't be measured for email” belongs to a different situation than the one in the question stem",
            "It is actually a great model” belongs to a different situation than the one in the question stem",
            "“99% is a failing score” describes a different situation than the one in the question stem",
            "It never actually catches any spam — high accuracy hides the mistakes that matter",
          ],
      correctIndex: 3,
      explanation:
        "Accuracy alone can mislead. Here the model catches zero spam, so it fails at its real job despite a high score.",
    },
    {
      id: "q4",
      question: "Why will pattern-based AI always make some mistakes?",
      choices: [
        "It predicts from patterns and will meet unusual inputs it didn't train on",
        "Test sets are optional, so most teams skip checking for mistakes",
        "Accuracy scores are randomly generated rather than measured",
        "It won't — a well-trained model becomes perfect and stops making mistakes",
      ],
      correctIndex: 0,
      explanation:
        "Predicting from patterns means unusual or unseen inputs can trip it up — and it may still sound confident. Expect mistakes and verify.",
    },
    {
      id: "q5",
      question: "What is a 'false negative' in the context of a disease-screening AI?",
      choices: [
            "The model says a sick patient is healthy, missing a real case",
            "The model correctly identifies a healthy patient as healthy",
            "The model is 100% accurate” belongs to a different situation than the one in the question stem",
            "The model crashes and gives no answer” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "A false negative means the model missed a real positive case — often the more dangerous kind of mistake in medical screening.",
    },
    {
      id: "q6",
      question: "In the real medical AI case, what was a key root cause of its unsafe recommendations?",
      choices: [
            "It was trained and tested mainly on a narrower set of expert-imagined scenarios rather than a large, diverse set of real patient cases",
            "It can seem like it had zero training data of any kind, but that reading skips the distinction this question is testing",
            "It can seem like doctors intentionally sabotaged its recommendations, but that reading skips the distinction this question is testing",
            "It can seem like the tool was released without ever being tested once, but that reading skips the distinction this question is testing",
          ],
      correctIndex: 0,
      explanation:
        "A gap between narrow training/testing scenarios and the real diversity of patients allowed unsafe recommendations to slip through.",
    },
    {
      id: "q7",
      question: "Which comparison is the clearest warning sign of overfitting?",
      choices: [
        "Training accuracy and test accuracy are both moderate and close together",
        "Training accuracy is near 100% while test accuracy is much lower",
        "The model was never tested at all",
        "The model has a large validation set",
      ],
      correctIndex: 1,
      explanation:
        "A big gap between near-perfect training results and much weaker test results is the textbook overfitting fingerprint.",
    },
    {
      id: "q8",
      question: "What's the smartest response to an ad that says 'our AI is 97% accurate'?",
      choices: [
            "Ask what the other 3% looks like, how it was tested, and which mistakes matter most for this use",
            "Ignore accuracy entirely; it's meaningless” belongs to a different situation than the one in the question stem",
            "Assume it's a lie with no further thought” belongs to a different situation than the one in the question stem",
            "Trust it immediately — that number is high enough” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "A single accuracy number is a starting point, not the full story. The nature of the mistakes and the thoroughness of testing matter just as much.",
    },
  ],
  reflection: {
    prompt:
      "Why is it risky to trust an AI just because the company says it scored '95% accuracy'? What follow-up question would you ask?",
    placeholder: "I'd want to know what kinds of mistakes make up the other 5%, because…",
  },
};
