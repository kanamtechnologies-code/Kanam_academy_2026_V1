import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson13: AILessonConfig = {
  id: "ai-13",
  title: "13. Bias, Fairness, and Data",
  goal: "Understand how AI picks up human bias from its data, why that leads to unfair outcomes, and how it can be reduced (the Big Idea of Societal Impact).",
  xpReward: 650,
  badge: "Fairness Guardian",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/12",
  nextHref: "/learn/ai/14",
  lessonModule: {
    durationLabel: "~20–25 min",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `AI decides which videos you're recommended, can help screen job applications, and even assists in medical and legal tools. So when AI is unfair, it affects real people's real lives. Today you'll learn how that unfairness — **AI bias** — happens, and how it can be reduced.\n\nRoadmap:\n\n• Why AI learns our patterns, *including* our biases.\n• The exact ways bias sneaks in through data.\n• What actually makes AI fairer — and why "computers are neutral" is a myth.\n• How to tell the difference between a real bias problem and a shallow accusation of one.\n\nThis is part of the big idea of **Societal Impact**: AI doesn't just answer questions, it shapes opportunities.`,
        image: "/images/lessons/ai-13-bias.png",
        imageAlt: "A scale showing balanced versus skewed training data",
        callout: {
          label: "Why it matters",
          text: "Biased AI can quietly affect who gets seen, hired, or trusted. Knowing how bias works lets you question 'objective' AI decisions instead of accepting them blindly.",
        },
      },
      {
        id: "hook-story",
        kicker: "Real moment",
        title: "The phone that wouldn't unlock for grandma",
        body: `A family gets excited about a new phone's face-unlock feature. It works instantly for the teenage son. For his grandmother — with darker skin and different lighting habits in her usual spot in the house — it fails again and again, forcing her to type a password every single time.\n\nNobody programmed the phone to be unfair to grandmothers. But the engineers who built and tested the face-recognition model mostly used photos of people who looked more like the son than the grandmother. The system learned patterns from the data it saw — and the data simply didn't represent everyone equally.\n\nThat gap between "works great for some people" and "works great for everyone" is exactly what this lesson is about.`,
        callout: {
          label: "Keep this in mind",
          text: "Nobody has to intend unfairness for an AI system to produce it. That's what makes bias tricky — and worth learning to spot.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Fairness words in plain English",
        body: `• **AI bias** — when a system produces systematically unfair results for certain groups of people.\n• **Training data** — the examples an AI model learns from.\n• **Representative data** — training data that fairly reflects all the groups the AI will affect.\n• **Historical bias** — unfair patterns from the past that get baked into data and copied by AI.\n• **Proxy feature** — a data column that looks neutral but secretly tracks something sensitive (zip code standing in for income or race, for example).\n• **Fairness** — designing and using AI so it doesn't unjustly disadvantage people (and there's no single universal definition — you have to define it for each situation).\n\nThese terms let you talk precisely about a slippery topic instead of just saying "that's biased" without being able to explain why.`,
        callout: {
          label: "Pro tip",
          text: "When you hear 'the algorithm is biased,' ask which of these mechanisms is actually at play — it sharpens the conversation immediately.",
        },
      },
      {
        id: "concept-1",
        kicker: "Big Idea: Societal Impact",
        title: "AI learns our patterns — including our biases",
        body: `Remember the golden rule of machine learning: AI learns from **data made by humans**. If that data reflects unfair patterns from the real world, the AI **learns those patterns too** — and can repeat them at massive scale, to millions of people at once.\n\nThis is **AI bias**: when a system produces systematically unfair results for certain groups of people. It usually isn't intentional — nobody types "be unfair." It gets baked in through the data and the choices behind the model.\n\nThink of AI like a mirror, not a judge. It reflects whatever we show it. Hand it a skewed picture of the world, and it gives a skewed picture back — just faster and bigger.`,
        callout: {
          label: "Key insight",
          text: "AI doesn't invent bias from nowhere — it mirrors and amplifies patterns in its training data.",
        },
        checkIn: {
          prompt: "Where does AI bias usually come from?",
          choices: [
            "The AI deciding to be prejudiced on its own",
            "Patterns (often unfair ones) in the human-made training data",
            "Slow internet",
            "Using the AI too much",
          ],
          correctIndex: 1,
          explanation:
            "AI learns from human data. If that data is skewed or reflects historical unfairness, the AI absorbs it.",
        },
      },
      {
        id: "concept-2",
        kicker: "How bias sneaks in",
        title: "Skewed data, skewed AI",
        body: `Bias usually enters through the **training data** — the examples the AI learned from. Three common ways:\n\n• **Unrepresentative data** — a face system trained mostly on one skin tone works worse on others.\n• **Historical bias** — if past hiring favored one group, an AI trained on those records may copy that unfairness as if it were the "right" answer.\n• **Missing groups** — if some people barely appear in the data, the AI performs poorly for them.\n\nNotice the AI isn't "prejudiced" in a human sense — it's faithfully reflecting flawed data. That's why what gets *left out* of the data matters as much as what's put in.`,
        bullets: [
          "Unrepresentative data → worse results for underrepresented groups.",
          "Historical bias in data → AI repeats past unfairness.",
          "What's left out matters as much as what's included.",
        ],
        checkIn: {
          prompt: "A face-unlock AI works great for some people but poorly for others. What's the most likely cause?",
          choices: [
            "Those people are using it wrong",
            "The training photos weren't representative of everyone",
            "The AI is having an off day and needs to be restarted",
            "Phones can't recognize faces at all",
          ],
          correctIndex: 1,
          explanation:
            "Unrepresentative training data leads to worse performance for underrepresented groups.",
        },
      },
      {
        id: "concept-3",
        kicker: "What helps",
        title: "Fairness takes deliberate effort",
        body: `Here's the hopeful part: bias can be reduced — but only on purpose. It never fixes itself.\n\nBut first you need to **define fairness**: what does "fair" mean for *this* decision? Equal chance for everyone? Equal accuracy across groups? No one-size-fits-all answer — you have to pick a standard before you can audit anything.\n\nThen the fixes:\n\n• Collect **diverse, representative** data that includes everyone the AI will affect.\n• **Test** the AI separately across different groups, not just its overall accuracy (a model can look "95% accurate" while failing one group badly).\n• Watch for **proxy features** — data that looks neutral but secretly tracks protected groups. **Zip code** can stand in for income or race. **"Culture fit" notes** can encode old hiring biases. The math looks objective; the patterns aren't.\n• Keep **humans in the loop** for high-stakes decisions like jobs, loans, and justice.\n• Be **transparent** about the system's limits.\n\nAs a user, your job is to stay skeptical: ask *who might this AI be unfair to?* and never assume "the computer" is automatically objective.`,
        callout: {
          label: "Myth buster",
          text: "'Computers are neutral' is false. An AI is only as fair as the data and choices behind it.",
        },
        checkIn: {
          prompt: "Is the statement 'computers are neutral, so AI decisions are always objective' true?",
          choices: [
            "True — computers can't be biased",
            "False — an AI is only as fair as the data and design choices behind it",
            "True, but only for chatbots",
            "It depends on the brand of computer",
          ],
          correctIndex: 1,
          explanation:
            "AI reflects its data and the choices of its makers. It is not automatically objective.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Trace where bias enters a hiring AI",
        body: `Imagine a company builds an AI to screen résumés, hoping to save time. Follow how bias creeps in — and why you must **define fairness first** before auditing anything.\n\n**Step 1 — Define what "fair" means here.** The team agrees: qualified applicants from every background should get an equal chance to reach a human reviewer. Without that definition, later checks have no target.\n\n**Step 2 — Inspect the training data.** They feed it 10 years of past résumés labeled "hired" or "not hired." Over those 10 years, the company mostly hired men for tech roles.\n\n**Step 3 — Spot proxy features.** The model also uses **zip code**, hobbies scraped from social media, and vague **"culture fit" notes."** Zip code can track neighborhood income. Culture-fit notes can encode "sounds like us" — copying old biases while looking like neutral data.\n\n**Step 4 — Measure outcomes by group.** Testing shows the tool quietly down-ranks qualified women. The AI didn't invent prejudice — it inherited and amplified patterns from unfair history plus sneaky proxies.\n\n**Step 5 — Fix and re-test before trusting.** Retrain on fairer data, drop risky proxies, keep humans reviewing decisions, and measure again. (Real companies have scrapped biased hiring tools for exactly this reason.)`,
        code: `Unfair past hiring  →  training data  →  AI learns "pattern of success"
        ↳ that pattern secretly includes "mostly men"
        ↳ AI down-ranks women  →  old bias amplified at scale`,
        codeCaption: "Bias in → bias out, but faster and bigger",
        callout: {
          label: "Pro tip",
          text: "When you hear 'the algorithm decided,' ask what data it learned from. The data is usually where fairness is won or lost.",
        },
      },
      {
        id: "second-example",
        kicker: "Second example",
        title: "When hiring tools favored one word over another",
        body: `Some companies used resume-screening AI trained on past hires. The historical data reflected old patterns — including times when certain roles went mostly to men.\n\nThe model learned subtle signals: verbs like "executed" or "built" correlated with hired male candidates; "supported" or "helped" appeared more on resumes from women. Neither word is better — but the **training data treated past hires as the definition of "qualified."**\n\nSo the AI downranked strong resumes that didn't match the old pattern — not because anyone typed "discriminate," but because **bias was baked into the examples.**\n\nFixing it required new labels, fairer training data, and testing across groups — not just trusting the score.`,
        callout: {
          label: "Notice this",
          text: "Bias often enters through historical examples treated as neutral truth.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth check",
        title: "\"Bias means someone did it on purpose\"",
        body: `A common misunderstanding: bias only counts if there was bad intent. In reality, nearly all documented AI bias cases come from unintentional gaps — missing data, historical patterns nobody thought to question, or proxies nobody noticed. Intent isn't required for real harm to happen.\n\nThe flip-side myth: "if there's no bad intent, it's not really a problem." Also false — the effect on the people who get unfairly denied a loan, job, or accurate diagnosis is real either way. Fixing bias is about outcomes, not about proving someone's intentions.`,
        callout: {
          label: "Myth check",
          text: "\"Nobody meant to be unfair, so it doesn't count.\" The impact on real people is what matters — intent doesn't erase harm.",
        },
        checkIn: {
          prompt: "Does AI bias require someone to have intentionally programmed unfairness?",
          choices: [
            "Yes, bias only exists if it was done on purpose",
            "No — bias usually comes from unintentional gaps in data, and the harm is real regardless of intent",
            "Yes, and it's always the AI's own fault, not the data's",
            "No, bias is impossible in AI systems",
          ],
          correctIndex: 1,
          explanation:
            "Most real-world AI bias is unintentional, arising from data gaps or unnoticed proxies — but the impact on affected people is still real.",
        },
      },
      {
        id: "red-flags",
        kicker: "Red flags",
        title: "Bias red flags in everyday AI",
        body: `Learn to spot these warning signs — in apps, school tools, and news about AI:`,
        bullets: [
          "**\"Trained on historical data\" with no fairness testing** — history includes old unfair patterns.",
          "**Works great in demos but fails for certain accents, skin tones, or names** — a sign of representation gaps.",
          "**One overall score with no breakdown by group** — may hide unequal error rates.",
          "**\"The algorithm is neutral — we don't see race/gender\"** — proxy variables can carry the same information.",
        ],
        callout: {
          label: "Ask anyway",
          text: "If a system affects real opportunities, asking \"fair for whom?\" isn't optional — it's due diligence.",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Audit a familiar AI system for possible bias",
        body: `Pick an AI-powered app or feature you use often — a photo filter, a recommendation feed, a voice assistant. Ask yourself:\n\n1. What data likely trained it?\n2. Who might be underrepresented in that data?\n3. Where would that show up as a real-world gap (accuracy, recommendations, recognition)?\n\nYou don't need inside information to think this through — just the habit of asking "who does this work well for, and who might it work less well for?"`,
        callout: {
          label: "No app in mind?",
          text: "Try it on the face-unlock or voice-assistant example from this lesson and predict one more group that might be underserved.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Spotting proxy features in the wild",
        image: "/images/lessons/ai-ex-bias.png",
        imageAlt: "A data table highlighting a 'neutral-looking' column that secretly tracks a protected group",
        body: `Proxy features are the sneakiest source of bias because they look completely innocent. A deeper skill: practice spotting *plausible* proxies before you're told they're a problem.\n\nAsk of any data field: "could this column correlate strongly with race, gender, age, disability, or income — even if that's not its stated purpose?" Zip code, first name, school attended, "years of experience" (which can penalize career breaks), and social media activity have all been flagged as real-world proxies in different systems.\n\nThis isn't about banning these data fields outright — sometimes they're genuinely useful. It's about testing outcomes across groups *before* trusting a system that uses them, instead of assuming a field is safe just because it isn't literally labeled "race" or "gender."`,
        bullets: [
          "Ask 'what could this column secretly correlate with?' for every data field.",
          "A field doesn't need to be labeled 'race' or 'gender' to act like a proxy for one.",
          "Test outcomes across groups — don't just trust that a field 'sounds neutral.'",
        ],
      },
      {
        id: "decision-checklist",
        kicker: "Decision checklist",
        title: "Fairness questions before trusting a system",
        body: `When an AI makes or influences a decision about people, ask:`,
        bullets: [
          "**Who built it, and on whose data?**",
          "**Who was included in testing — and who was left out?**",
          "**Who wins when it's right, and who gets hurt when it's wrong?**",
          "**Is there a human appeal path** when someone disagrees with the output?",
        ],
        checkIn: {
          prompt: "A school considers an AI attendance tool. Which question best targets fairness?",
          choices: [
            "Does the app have a colorful interface?",
            "Was it tested across different home situations, devices, and connectivity limits — not just ideal lab conditions?",
            "Is it cheaper than the old system?",
            "Does it use the word AI in the marketing?",
          ],
          correctIndex: 1,
          explanation:
            "Fairness testing across real-world variation — homes, devices, connectivity — catches bias and access gaps that demo-only testing misses.",
        },
      },
      {
        id: "comparison",
        kicker: "See it side by side",
        title: "Overall accuracy vs. accuracy by group",
        body: `A single "accuracy" number can hide serious unfairness. This is why testing across groups (not just overall) is one of the most important fairness practices.`,
        table: {
          columns: ["Metric reported", "What it can hide"],
          values: [
            ["\"95% overall accuracy\"", "Could be 99% for one group and 70% for another — the average hides the gap"],
            ["\"Tested on 10,000 images\"", "Says nothing about whether those images represented everyone fairly"],
            ["Accuracy broken down by group", "Reveals exactly where the system underperforms — the fairness-relevant number"],
          ],
          rowCount: 3,
        },
        checkIn: {
          prompt: "Which of these helps REDUCE and reveal AI bias?",
          choices: [
            "Using less diverse data to keep it simple",
            "Only reporting one overall accuracy number and ignoring groups",
            "Collecting representative data and testing performance across different groups",
            "Removing all human review from decisions",
          ],
          correctIndex: 2,
          explanation:
            "Diverse data plus testing across groups (with human oversight on big decisions) is what actually surfaces and reduces bias.",
        },
      },
      {
        id: "what-good-looks-like",
        kicker: "What good looks like",
        title: "Signs a team is taking bias seriously",
        body: `You can't audit every model yourself — but you can recognize responsible practice when you see it:`,
        bullets: [
          "**Published testing across demographic groups**, not just one accuracy number.",
          "**Clear human override** when the system gets it wrong.",
          "**Transparent feature choices** — what data is used and why.",
          "**Ongoing monitoring after launch**, not a one-time launch-day test.",
        ],
        callout: {
          label: "Your role",
          text: "When these signs are missing on a high-stakes tool, skepticism is reasonable — and speaking up is part of being AI-literate.",
        },
      },
      {
        id: "ethics",
        kicker: "Ethics moment",
        title: "Fairness is a value choice, not just a math problem",
        body: `It's tempting to think fairness is something you can solve purely with better math or more data. But *which* definition of fairness to use — equal chances, equal outcomes, equal accuracy — is a values question, and different reasonable people can disagree about the right answer for a given situation.\n\nThat means being a responsible AI user or builder means being honest that "we made it fair" always comes with an implicit "...according to this particular definition, which we chose." Naming that choice openly is more honest than pretending fairness is a single, purely technical, settled fact.\n\nThis connects directly to Societal Impact: decisions about fairness definitions affect real opportunities, so they deserve real transparency about what tradeoffs were made and why.`,
        callout: {
          label: "Quick gut-check",
          text: "When someone claims an AI system is 'fair,' ask: fair by which definition, and who decided that definition?",
        },
      },
      {
        id: "habits",
        kicker: "Make it automatic",
        title: "Four fairness-questioning habits",
        body: `1. **Ask who trained it and on what data** whenever a system makes a decision about you or someone else.\n2. **Look for a group breakdown**, not just an overall accuracy claim.\n3. **Watch for proxies** — question "neutral-sounding" data fields.\n4. **Don't assume "computer said so" equals objective.** A human decision and an AI decision both deserve scrutiny.`,
        callout: {
          label: "This week",
          text: "Next time you hear about an AI tool making decisions about people (hiring, loans, grading), ask out loud: 'fair according to what definition, tested on whom?'",
        },
      },
      {
        id: "transfer-to-life",
        kicker: "Use it for real",
        title: "Notice uneven AI treatment this week",
        body: `Pay attention to one AI system you use — face filters, voice assistants, search autocomplete, anything.\n\nDoes it work equally well for you and for friends with different accents, names, hair types, or devices? If not, name the gap out loud instead of assuming someone "isn't using it right."\n\nUneven performance is often a **data and testing problem**, not a user problem. Noticing it is how ordinary users push for fairer systems.`,
        callout: {
          label: "Transfer this",
          text: "Bias isn't only a headline story. It's also the small, repeated friction you and your friends experience — or don't.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on...",
        body: `Think of a decision in your own life — school, sports, a job application, a loan someone in your family applied for — where an AI system might now play a role. If that system were biased, who specifically could it disadvantage, and how would you even find out?\n\nHold that thought for the reflection at the end of this lesson.`,
      },
      {
        id: "mini-case",
        kicker: "Mini-case",
        title: "The scholarship-matching app",
        body: `A nonprofit builds an app that matches students to scholarships based on their profile — GPA, extracurriculars, essays, and zip code (used to suggest "local" scholarships). It's trained on five years of past successful applicants.\n\nA teacher notices the app rarely suggests certain regional or need-based scholarships to students from lower-income zip codes, even when they'd clearly qualify. Investigating, the team realizes: past "successful applicants" in the training data were disproportionately from wealthier zip codes, because those students had more access to scholarship-search resources historically — not because they were more deserving.\n\nZip code, meant as a helpful "find local scholarships" feature, was quietly acting as an income proxy, and the historical data baked in who *used to* get matched, not who *should* get matched. The nonprofit removes zip code as a ranking factor, re-tests matching rates across income levels, and adds a human review step for edge cases.`,
        checkIn: {
          prompt: "In the scholarship app, what role did zip code play, and why was historical training data risky here?",
          choices: [
            "Zip code was irrelevant and had no effect on the results",
            "Zip code acted as a proxy for income, and historical data reflected past unequal access rather than who actually deserved matches",
            "The problem was that too many scholarships existed",
            "The app failed only because it was too slow",
          ],
          correctIndex: 1,
          explanation:
            "Zip code secretly tracked income (a proxy), and the historical training data reflected past unequal access to resources, not deservingness — a classic case of bias baked into 'what success looked like before.'",
        },
      },
      {
        id: "check-yourself",
        kicker: "Self-check",
        title: "Diagnose the bias source",
        body: `One more rep before the graded knowledge check. A medical AI trained mostly on data from adult male patients performs noticeably worse at flagging certain symptoms in women and children.`,
        checkIn: {
          prompt: "What's the most likely root cause of this medical AI's uneven performance?",
          choices: [
            "Women and children have symptoms that are impossible for any AI to detect",
            "Unrepresentative training data — the model rarely saw examples from those groups, so it learned their patterns poorly",
            "The AI intentionally chose to ignore certain patients",
            "Medical AI can never be biased because it's based on science",
          ],
          correctIndex: 1,
          explanation:
            "When training data underrepresents certain groups, the model simply hasn't learned their patterns as well — a textbook representativeness gap.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Because AI affects real decisions about real people, fairness isn't optional — it's a core part of building and using AI responsibly. Your power as a user is to question, not just accept — and to remember that "fair" always depends on a chosen definition.\n\nNext we cover privacy and deepfakes. First, lock in today's ideas.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict).`,
      },
    ],
  },
  bigIdeas: [
    "**AI bias** = unfair results for some groups, usually learned from data.",
    "Define **fairness first**, then audit — proxy features can hide discrimination.",
    "Fairness requires **deliberate effort** — 'computers are neutral' is a myth.",
    "Overall accuracy can **hide unfairness**; always check performance by group.",
  ],
  keyTerms: [
    { term: "AI bias", definition: "When an AI system produces systematically unfair results for certain groups." },
    { term: "Representative data", definition: "Training data that fairly reflects all the groups the AI will affect." },
    { term: "Historical bias", definition: "Unfair patterns from the past that get baked into data and copied by AI." },
    { term: "Proxy feature", definition: "A data column that looks neutral but tracks something sensitive (like zip code standing in for income or race)." },
    { term: "Fairness", definition: "Designing and using AI so it doesn't unjustly disadvantage people." },
  ],
  realWorld:
    "Early facial recognition systems were far less accurate for women and people with darker skin, because their training photos were mostly lighter-skinned men. The data shaped the unfairness.",
  quiz: [
    {
      id: "q1",
      question: "Where does AI bias usually come from?",
      choices: [
        "Patterns (often unfair ones) in the human-made training data",
        "The AI deciding to be prejudiced on its own",
        "Slow internet",
        "Using the AI too much",
      ],
      correctIndex: 0,
      explanation:
        "AI learns from human data. If that data is skewed or reflects historical unfairness, the AI absorbs it.",
    },
    {
      id: "q2",
      question: "A face-unlock AI works great for some people but poorly for others. What's the most likely cause?",
      choices: [
        "Those people are using it wrong",
        "The AI is having an off day and needs to be restarted",
        "Phones can't recognize faces at all",
        "The training photos weren't representative of everyone",
      ],
      correctIndex: 3,
      explanation:
        "Unrepresentative training data leads to worse performance for underrepresented groups.",
    },
    {
      id: "q3",
      question: "Is the statement 'computers are neutral, so AI decisions are always objective' true?",
      choices: [
        "False — an AI is only as fair as the data and design choices behind it",
        "True — computers can't be biased",
        "True, but only for chatbots",
        "It depends on the brand of computer",
      ],
      correctIndex: 0,
      explanation:
        "AI reflects its data and the choices of its makers. It is not automatically objective.",
    },
    {
      id: "q4",
      question: "Which of these helps REDUCE AI bias?",
      choices: [
        "Using less diverse data to keep it simple",
        "Only checking overall accuracy and ignoring groups",
        "Collecting representative data and testing performance across different groups",
        "Removing humans from all decisions",
      ],
      correctIndex: 2,
      explanation:
        "Diverse data plus testing across groups (and human oversight on big decisions) helps make AI fairer.",
    },
    {
      id: "q5",
      question: "Does AI bias require someone to have intentionally programmed unfairness?",
      choices: [
        "Yes, bias only exists if someone did it on purpose",
        "Yes, and only the AI itself is ever at fault",
        "No, because bias is impossible in software",
        "No — bias usually comes from unintentional data gaps, but the harm to real people is still real",
      ],
      correctIndex: 3,
      explanation:
        "Most real-world AI bias is unintentional. Intent isn't required for the impact on affected people to be real and serious.",
    },
    {
      id: "q6",
      question: "Why is 'overall accuracy' alone a risky way to judge whether an AI system is fair?",
      choices: [
        "Overall accuracy is always the best and only measure needed",
        "A high overall number can hide much worse performance for specific groups",
        "Overall accuracy has nothing to do with fairness at all",
        "Accuracy can never be measured for AI systems",
      ],
      correctIndex: 1,
      explanation:
        "A model can look highly accurate overall while performing far worse for an underrepresented group — group breakdowns reveal what averages hide.",
    },
    {
      id: "q7",
      question: "Why is defining 'fairness' considered a values question, not purely a technical one?",
      choices: [
        "Because fairness has one single scientific definition everyone agrees on",
        "Because only engineers should decide what fairness means",
        "Because different reasonable definitions of fairness (equal chances, equal outcomes, equal accuracy) can lead to different, defensible choices",
        "Because fairness doesn't matter once the math works",
      ],
      correctIndex: 2,
      explanation:
        "There are multiple legitimate ways to define fairness, and choosing between them involves values and tradeoffs — not just technical calculation.",
    },
    {
      id: "q8",
      question: "Why does studying AI bias matter beyond just 'how the model works'?",
      choices: [
        "It doesn't matter — bias is unrelated to how computing affects people",
        "Analyzing how a computing innovation like AI can create unequal effects on different groups helps you think critically about technology's impact",
        "Bias only matters for hardware, not software or AI",
        "Bias questions only matter to professional programmers",
      ],
      correctIndex: 1,
      explanation:
        "Understanding how AI systems can produce beneficial or harmful, and sometimes unequal, effects on people is part of thinking critically about technology's impact.",
    },
  ],
  reflection: {
    prompt:
      "Name a real decision where biased AI could seriously harm people. Why would fairness matter especially there?",
    placeholder: "If AI helped decide who gets a job/loan, bias could…",
  },
};
