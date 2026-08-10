import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson5: AILessonConfig = {
  id: "ai-5",
  title: "5. How AI Learns From Examples",
  goal: "Understand machine learning: instead of being programmed with rules, AI learns patterns from labeled examples (the Big Idea of Learning) — and why the examples chosen shape everything the AI does.",
  xpReward: 250,
  badge: "Pattern Learner",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/4",
  nextHref: "/learn/ai/6",
  instructorScript: `**Coach's note**
Today's lesson: **How AI Learns From Examples**.

**Goal:** Understand machine learning: instead of being programmed with rules, AI learns patterns from labeled examples (the Big Idea of Learning) — and why the examples chosen shape everything the AI does.

**How to facilitate**
1. Warm-up: ask students what they already think about "What you'll learn today".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Here's a puzzle: nobody sat down and wrote a rule for every possible cat photo, yet your phone can still find all the cats in your camera roll. How? Today you'll uncover the answer — the single most important idea in modern AI.\n\nThe roadmap:\n\n• Meet the Big Idea of **Learning** — why today's AI is *taught*, not hand-coded.\n• Discover **training data**: the labeled examples that fuel learning.\n• See how learning produces a **model** that can handle brand-new inputs.\n• Meet a real, famous case where biased training examples caused a company to scrap its own AI tool.\n\nThis is the engine behind spam filters, photo search, translation, recommendations, and chatbots. Once you see that AI *learns from examples*, you'll also understand why the quality of those examples decides everything.`,
        image: "/images/lessons/ai-5-learn.png",
        imageAlt: "An AI studying many labeled example photos to learn a pattern",
        callout: {
          label: "Why it matters",
          text: "Because AI learns from examples, it inherits whatever is in those examples — the smarts and the flaws. Knowing this is the key to understanding both why AI is so powerful and why it can be biased or wrong.",
        },
      },
      {
        id: "hook-story",
        kicker: "True story",
        title: "The hiring tool that learned to prefer one kind of resume",
        body: `In 2014, a major tech company began building an experimental tool to help screen job applicants by studying ten years of resumes from people the company had previously hired. The idea was simple: let the AI learn what a "successful hire" looks like from real examples.\n\nBy 2015, engineers noticed something troubling: the tool had taught itself to downgrade resumes that included the word "women's" (as in "women's chess club captain") and to favor language patterns more common in resumes from men — because the historical hiring data it learned from happened to skew heavily male in technical roles.\n\nThe company scrapped the project in 2017 rather than risk using it. Nobody told the AI to prefer one gender. It simply learned the patterns that were actually present in its examples — patterns that reflected years of imperfect human hiring decisions. That's the whole lesson today in one real story: **AI learns exactly what you show it, flaws included.**`,
      },
      {
        id: "glossary",
        kicker: "Words you'll need",
        title: "Your vocabulary for this lesson",
        body: `These terms describe the entire "teaching" process behind modern AI — you'll use them constantly from here on.`,
        bullets: [
          "**Machine Learning (ML)** — AI that learns patterns from examples rather than from rules a human writes.",
          "**Training data** — the collection of examples an AI studies to learn.",
          "**Label** — the correct answer attached to a training example (e.g., 'cat').",
          "**Model** — the trained result — tuned numbers that capture the learned patterns.",
          "**Class imbalance** — when one label appears far more often than others in training data.",
        ],
      },
      {
        id: "concept-1",
        kicker: "Big Idea: Learning",
        title: "Modern AI is taught, not hand-coded",
        body: `Old-style programs follow rules a human wrote out by hand: "IF email contains 'free money' THEN mark as spam." That works for a while — until spammers write "fr€e m0ney" and the rule misses it. You'd need a human to keep writing endless new rules forever.\n\n**Machine learning (ML)** flips this around. Instead of writing the rules, we show the AI **thousands of labeled examples** ("this is spam," "this is not") and let it *figure out the patterns itself*.\n\nThink about how you learned what a dog is. Nobody gave you a checklist of dog features — your family just pointed at dogs and said "dog" enough times that your brain caught on. Machine learning works the same way: lots of labeled examples, and the pattern clicks. That's what "learning" means in AI.`,
        callout: {
          label: "Key insight",
          text: "Machine learning = learning the rules from examples, instead of a human writing every rule by hand. The AI discovers the pattern; we just provide good examples.",
        },
        checkIn: {
          prompt: "How is machine learning different from old-style, hand-coded rules?",
          choices: [
            "It doesn't use a computer at all",
            "It's exactly the same thing with a fancier name",
            "It only works for spam filters, nothing else",
            "Instead of a human writing every rule, the AI discovers patterns from many labeled examples",
          ],
          correctIndex: 3,
          explanation:
            "The defining shift of machine learning is: examples in, patterns learned automatically — rather than a human writing every rule by hand.",
        },
      },
      {
        id: "concept-2",
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
        checkIn: {
          prompt: "Why is 'supervised learning' called supervised?",
          choices: [
            "Because it requires no training data at all",
            "Because each training example includes the correct label, acting like a built-in answer key",
            "Because the model is limited to one supervised task for its entire life",
            "Because a human manually approves every single prediction after training",
          ],
          correctIndex: 1,
          explanation:
            "The 'supervision' comes from the labels themselves — the correct answers attached to each example, guiding what the model learns.",
        },
      },
      {
        id: "concept-3",
        kicker: "The result",
        title: "Learning produces a 'model'",
        body: `After studying all that data, the AI saves what it learned as a **model** — basically a giant set of tuned numbers that captures the patterns it found. The training data itself isn't kept inside; the model is more like the *lessons learned* from it.\n\nThink of the model as the recipe a chef writes after tasting hundreds of dishes. The chef doesn't carry around every meal they ever ate — just the distilled know-how. The model is that distilled know-how, stored as numbers.\n\nLater, you hand the model a brand-new photo it has never seen, and it predicts "cat" or "dog." A good model **generalizes**: it works on new examples, not just the ones it studied. That's the real test of learning — and it's exactly what we'll dig into next lesson.`,
        callout: {
          label: "Watch the words",
          text: "Training = the learning phase (studying examples). The model = the trained result (the stored patterns). Two different things, easy to mix up.",
        },
        checkIn: {
          prompt: "After training finishes, what is 'the model'?",
          choices: [
            "The trained result — tuned numbers that capture learned patterns and can make predictions on new inputs",
            "The person who supervised the training",
            "A physical robot sitting in a lab — familiar wording, wrong fit for what the prompt is actually asking",
            "The exact same thing as the training data",
          ],
          correctIndex: 0,
          explanation:
            "The model is the distilled, reusable result of training — not a copy of the training data, but the patterns learned from it.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Teaching an AI to flag spam, step by step",
        body: `Let's build a spam filter the machine-learning way and watch each stage.\n\n**Step 1 — Gather labeled examples.** Collect a huge pile of real emails, each already marked by people as "spam" or "not spam." That's your training data with its answer key.\n\n**Step 2 — Extract features.** Each email becomes a list of signals the model can learn from: suspicious words ("FREE $$$"), number of links, sender patterns. Raw email text is too messy on its own — features turn it into useful numbers.\n\n**Step 3 — Train the model.** The AI studies those features and labels, tuning itself to connect patterns like "lots of links + ALL-CAPS" with spam. No human writes "if it says 'free money'..." by hand.\n\n**Step 4 — Test on held-out mail.** Before trusting it, we quiz the model on emails it **never saw during training**. That's the honest check — does it generalize, or did it just memorize?\n\n**Step 5 — Deploy and monitor.** Ship the filter, but keep watching. Spammers invent new tricks every month, so the team adds fresh examples and retrains.\n\n**Watch out — class imbalance.** Suppose your training pile has 5,000 spam ads but only 20 real school emails. The model sees "spam" almost every time, so it learns a lazy rule: "call everything spam." Your teacher's homework reminder gets crushed. More total emails isn't automatically better — **balanced, varied examples** matter as much as quantity.`,
        callout: {
          label: "Pro tip",
          text: "When a spam filter wrongly trashes a real email, that's a hint its training data didn't include enough examples like that one. The fix is almost always better, more varied examples — not more hand-written rules.",
        },
      },
      {
        id: "second-example",
        kicker: "Second example",
        title: "Training a spam filter, step by step",
        body: `Machine learning in action — a second walkthrough you'll recognize from your inbox.\n\n**Step 1 — Collect labeled examples.** Thousands of emails marked "spam" or "not spam" by humans.\n\n**Step 2 — Extract features.** Words like "winner," "click now," sender reputation, number of links.\n\n**Step 3 — Train.** The model learns which feature patterns usually appear in spam.\n\n**Step 4 — Predict.** A new email arrives; the model outputs "94% spam."\n\n**Step 5 — Learn from mistakes.** When a school newsletter lands in spam, someone labels it correctly and the model updates.\n\nSame learning loop as Lesson 1's cat-or-dog example — different job, same idea: **learn patterns from labeled examples, then predict on new ones.**`,
        callout: {
          label: "Notice this",
          text: "The quality of the labels matters. If humans mislabeled examples during training, the model learns the wrong patterns.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "\"The AI just figures out the truth on its own\"",
        body: `This is the myth hiding underneath the hiring-tool story you just read. Let's take it apart directly.`,
        bullets: [
          "**Myth: An AI discovers objective truth from data.** Reality: it discovers whatever patterns exist in the examples it was shown — including patterns that reflect old, biased human decisions.",
          "**Myth: If the AI wasn't told to discriminate, it can't discriminate.** Reality: bias can emerge purely from the training data itself, with nobody writing a single biased rule.",
          "**Myth: A bigger training set automatically fixes bias.** Reality: a bigger *skewed* dataset just teaches the skewed pattern more confidently.",
        ],
        checkIn: {
          prompt: "How did the real hiring-tool example end up favoring certain resumes, even though no one told it to?",
          choices: [
            "It was hacked by an outside group",
            "It refused to process any resumes at all",
            "It learned patterns from ten years of past hiring data that itself reflected a skewed history",
            "An engineer secretly typed in biased rules by hand",
          ],
          correctIndex: 2,
          explanation:
            "The tool learned exactly what was present in its training examples. Since those examples reflected an imperfect hiring history, the model absorbed that same pattern.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it now",
        title: "Design a training set in your head",
        body: `Imagine you want to teach an AI to recognize "a good breakfast" from photos. In your head, list five kinds of breakfast photos you'd want to include in your training data.\n\nNow ask: did you include different cultures, different budgets, different countries? If you only pictured one type of breakfast, your future AI would only recognize that one type as "good" — a miniature version of exactly what happened with the hiring tool.`,
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "A 3-question checklist for judging any training dataset",
        body: `Whenever you hear about a new AI tool (in this course or in the news), you can ask three sharp questions about its training data — the same questions researchers use.`,
        bullets: [
          "**Who and what is represented?** Does the data include enough variety of people, situations, and edge cases?",
          "**Who labeled it, and how carefully?** Rushed or inconsistent labeling teaches the model the wrong lessons.",
          "**What historical pattern might this data be repeating?** If the data reflects a biased past, the model may repeat that bias with full confidence.",
        ],
        image: "/images/lessons/ai-5-extra1.png",
        imageAlt: "A checklist next to a pile of training data photos, highlighting gaps in representation",
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Rule-based programming vs. machine learning",
        body: `Seeing the two approaches side by side shows exactly why machine learning took over for so many tasks — and why it comes with new risks.`,
        table: {
          columns: ["Trait", "Rule-based programming", "Machine learning"],
          values: [
            ["Who writes the logic", "A human, by hand, rule by rule", "The model, learned from examples"],
            ["Adapts to new patterns", "Only if a human updates the rules", "Can adapt if retrained on new examples"],
            ["Main risk", "Rules go outdated fast", "Inherits bias/gaps from training data"],
          ],
          rowCount: 3,
        },
        checkIn: {
          prompt: "According to the comparison, what is the main new risk introduced by machine learning (compared to hand-written rules)?",
          choices: [
            "It always requires a human to approve every single prediction",
            "It requires no data whatsoever",
            "It can never adapt to anything new",
            "It inherits whatever bias, gaps, or imbalance exists in its training data",
          ],
          correctIndex: 3,
          explanation:
            "Machine learning's flexibility is also its risk: it learns exactly what's in the data, flaws included, without anyone writing that flaw as an explicit rule.",
        },
      },
      {
        id: "ethics-or-bias",
        kicker: "Ethics moment",
        title: "Why the hiring tool got scrapped — and why that was the right call",
        body: `The company behind the resume-screening tool made a notable decision: rather than try to patch the bias after the fact, they shut the project down entirely once they confirmed the pattern couldn't be reliably fixed.\n\nThis matters because it shows accountability in action — recognizing that a tool trained on biased historical data can encode that bias so deeply that it's genuinely difficult to remove, even with good intentions. Sometimes the most responsible move isn't a patch — it's stopping and rebuilding the approach from the ground up.\n\nThe deeper lesson for you: training data is never "just data." It's a record of real decisions, made by real people, with real histories — and an AI trained on it will happily repeat that history unless someone actively checks for it.`,
        callout: {
          label: "Why this matters",
          text: "Evaluating how computing decisions affect economic opportunity (like who gets hired) is exactly this lesson's focus.",
        },
      },
      {
        id: "habits",
        kicker: "Build the habit",
        title: "Three habits for thinking about AI training",
        body: `These habits will help you evaluate any "AI learned to..." headline you encounter for the rest of your life.`,
        bullets: [
          "**Ask 'trained on what?'** Before trusting a claim about an AI's skill, ask what examples it actually learned from.",
          "**Watch for historical bias.** If training data reflects an unequal past, the model can quietly repeat that pattern.",
          "**Remember: scrapping a flawed tool can be the responsible choice**, not a failure.",
        ],
      },
      {
        id: "transfer-to-life",
        kicker: "Use it for real",
        title: "Every AI answer traces back to examples",
        body: `When an AI tool surprises you — great or terrible — ask:\n\n**What examples probably trained this behavior?**\n\nA chatbot that writes formal essays was trained on formal text. A photo filter that lightens skin may have been trained on images where lighter skin dominated. A recommendation feed that pushes drama was trained on people who binge drama.\n\nThe examples don't excuse unfair outcomes — but they explain them. And explaining them is the first step to questioning whether the right examples were used.`,
        callout: {
          label: "Transfer this",
          text: "Training data is the hidden curriculum every AI learns from. Asking about it is a lifelong literacy skill.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Think it through",
        title: "Before you move on, sit with this",
        body: `Think back to the breakfast-photo training set you designed earlier.\n\nWhat's one blind spot you now notice in your own choices — and how would you fix it if you got to try again? You'll be asked to put this into words in your reflection at the end of the lesson.`,
      },
      {
        id: "mini-case",
        kicker: "Real-world case",
        title: "Scrapping an AI tool rather than shipping a biased one",
        body: `By 2017, the resume-screening project had become a well-documented cautionary tale in the tech industry. Engineers tried several fixes — removing obviously gendered words, adjusting weights — but kept finding new, subtler ways the model had learned to favor patterns common in resumes from men, because those patterns were embedded throughout the historical hiring data in ways that were hard to fully untangle.\n\nRather than deploy a tool they couldn't fully trust, the team shut the project down. The case became widely cited in AI ethics research and business courses alike, as a real example of how deeply training data shapes a model's behavior — and how genuinely hard it can be to "fix" bias after the fact, compared to preventing it with better data and process from the start.\n\nThe case is often summarized with one memorable idea: **an AI trained on a biased history will learn that history's biases, even if nobody asks it to.**`,
        callout: {
          label: "Why this case matters",
          text: "It's proof that responsible AI development sometimes means recognizing a limitation and stopping — not just patching around it.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "Quick gut-check before the quiz",
        body: `Let's make sure the big ideas actually stuck before you head into the knowledge check.`,
        checkIn: {
          prompt: "What was the deepest lesson from the resume-screening tool being scrapped?",
          choices: [
            "A common mix-up is to treat the tool had a hardware malfunction as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat the engineers didn't try hard enough to fix it as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat aI tools should never be built for hiring, period as enough, which confuses a nearby idea with the right one once the deciding rule is named clearly",
            "A model trained on biased historical data can learn and repeat that bias, even without anyone intending it — and that can be hard to fully fix after the fact",
          ],
          correctIndex: 3,
          explanation:
            "The core takeaway is about training data: the model learned real patterns from a real, imperfect history — and untangling that after training proved extremely difficult.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Big ideas to keep: **machine learning** learns rules from examples instead of being hand-coded. **Training data** (labeled examples) is the fuel. And learning produces a **model** that should work on new, unseen examples.\n\nAlmost every AI you use — recommendations, translation, chatbots — learned this way from huge piles of examples, so the quality, variety, and history behind those examples shapes everything it does, for better or worse.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then reflect on what data *you'd* collect to teach an AI something.`,
      },
    ],
  },
  bigIdeas: [
    "**Machine learning** learns rules from examples instead of being hand-coded.",
    "**Training data** (labeled examples) is the fuel — balance and quality matter.",
    "Learning produces a **model** tested on held-out data, then deployed and monitored.",
    "An AI trained on biased historical data can learn and repeat that bias, unintentionally.",
    "Scrapping a flawed AI tool can be the responsible choice, not a failure.",
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
    "Email spam filters learned from billions of emails people marked as 'spam' or 'not spam' — that human labeling is the training data behind your clean inbox. A real hiring AI, trained on a decade of past resumes, learned to favor patterns from men's resumes — a well-documented reminder that training data always shapes the result.",
  quiz: [
    {
      id: "q1",
      question: "How is machine learning different from old-style rule-based programming?",
      choices: [
        "It uses faster computers but still runs on the same hand-written rules",
        "It skips training entirely and starts making predictions immediately",
        "Instead of a human writing every rule, the AI learns patterns from many examples",
        "It requires a human to approve each individual prediction in real time",
      ],
      correctIndex: 2,
      explanation:
        "In machine learning, we provide examples and the AI figures out the rules itself, rather than a human coding each rule.",
    },
    {
      id: "q2",
      question: "What is 'training data'?",
      choices: [
        "The final report showing how accurate a finished model is",
        "The number of computer chips used to run the AI",
        "The labeled examples an AI studies to learn patterns",
        "The instructions a programmer writes for how to use the model",
      ],
      correctIndex: 2,
      explanation:
        "Training data is the set of examples (often with correct labels) that the AI learns from.",
    },
    {
      id: "q3",
      question: "In supervised learning, what makes it 'supervised'?",
      choices: [
        "A person manually double-checks every prediction the model makes after training",
        "Each training example comes with the correct answer (a label)",
        "It needs no data to begin learning",
        "The model can only be updated once a year by its creators",
      ],
      correctIndex: 1,
      explanation:
        "Supervised learning uses labeled examples — like an answer key — so the AI can check and adjust as it learns.",
    },
    {
      id: "q4",
      question: "After training, what is the 'model'?",
      choices: [
            "Picking “A physical robot” is a common mix-up that confuses a nearby idea with the right one",
            "The person who built the AI",
            "A copy of all the training photos",
            "The trained result — tuned numbers that capture the learned patterns and can make predictions",
          ],
      correctIndex: 3,
      explanation:
        "The model is what learning produces. It stores the patterns (as numbers) and uses them to predict on new inputs.",
    },
    {
      id: "q5",
      question: "In the real hiring-tool case, why did the model start downgrading certain resumes?",
      choices: [
            "It learned patterns from ten years of past hiring data that itself skewed toward one group",
            "It refused to read any resumes",
            "An engineer manually coded a rule to do so",
            "The model was hacked — familiar wording, wrong fit for what the prompt is actually asking",
          ],
      correctIndex: 0,
      explanation:
        "No one wrote a biased rule. The model learned the pattern that was actually present in its imperfect historical training data.",
    },
    {
      id: "q6",
      question: "Why is 'more training data always fixes bias' a myth?",
      choices: [
            "Training data size has no effect on anything",
            "Bias only happens with small datasets, never large ones",
            "More data can never help a model at all",
            "A bigger dataset that is still skewed just teaches the skewed pattern with more confidence",
          ],
      correctIndex: 3,
      explanation:
        "Scale doesn't fix skew — it can reinforce it. Balanced, varied, well-labeled data matters more than raw size.",
    },
    {
      id: "q7",
      question: "What is the smartest first question to ask about any new AI tool's training data?",
      choices: [
            "How much did the company spend on marketing the tool?",
            "Who and what is represented in the data, and does it reflect a biased history?",
            "How many total employees does the company have?",
            "How recently was the app's interface redesigned?",
          ],
      correctIndex: 1,
      explanation:
        "This question gets directly at the root of most AI fairness issues: what's really inside the training data, and what history might it be repeating?",
    },
    {
      id: "q8",
      question: "What did the company that built the biased hiring tool ultimately decide to do?",
      choices: [
            "Ship it anyway because it was mostly accurate",
            "Sell the tool to another company",
            "Scrap the project rather than deploy a tool they couldn't fully trust",
            "Ignore the bias and hope no one noticed",
          ],
      correctIndex: 2,
      explanation:
        "The company chose to shut the project down after repeated attempts to fix the bias fell short — a widely cited example of responsible restraint.",
    },
  ],
  reflection: {
    prompt:
      "You want to teach an AI to tell ripe bananas from unripe ones. What examples and labels would you collect for its training data?",
    placeholder: "I'd collect photos of bananas labeled 'ripe' or 'unripe', including…",
  },
};
