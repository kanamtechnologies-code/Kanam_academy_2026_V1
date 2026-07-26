import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson8: AILessonConfig = {
  id: "ai-8",
  title: "8. Inside a Large Language Model",
  goal: "Open up the 'LLM' behind chatbots: tokens, the context window, and why these models 'hallucinate' confidently wrong answers — including a real case where that got someone in serious trouble.",
  xpReward: 400,
  badge: "LLM Insider",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/7",
  nextHref: "/learn/ai/9",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `When you chat with an AI assistant, it can feel like you're talking to something that *knows things*. Today you'll open the hood on the engine behind chatbots — the Large Language Model — and see what's really happening.\n\nThe roadmap:\n\n• What an **LLM** actually is, and the one trick it's built on.\n• The **context window** — its surprisingly short-term memory.\n• **Hallucination** — why it sometimes makes things up with total confidence.\n• A real, documented case where a hallucinated answer caused serious real-world consequences.\n\nThis is the AI most likely to help (or trip up) your homework, your research, and your writing. Knowing how it works is the difference between using it like a pro and getting burned by a confident wrong answer.`,
        image: "/images/lessons/ai-8-llm.png",
        imageAlt: "A glowing language model predicting the next word in a sentence",
        callout: {
          label: "Why it matters",
          text: "LLMs are showing up in search engines, homework helpers, and writing tools you'll use all the time. Understanding their blind spots keeps you from trusting a wrong answer just because it sounds smart.",
        },
      },
      {
        id: "hook-story",
        kicker: "True story",
        title: "The lawyer, the chatbot, and six fake court cases",
        body: `In 2023, an experienced lawyer used an AI chatbot to help research legal precedents for a real court filing. The chatbot produced several case citations that looked completely legitimate — real-sounding case names, years, and quotes from judges.\n\nThe lawyer submitted them to federal court. The problem? When the opposing lawyers and the judge tried to look up those cases, **none of them existed**. The chatbot had invented all of them — confidently, fluently, with zero indication anything was wrong.\n\nThe lawyer faced sanctions and public embarrassment for failing to double-check the AI's work. This isn't a story about a "bad" chatbot — it's proof of exactly what you're about to learn: an LLM predicts what *sounds* right, not what *is* true, and it will say invented facts with the exact same confident tone as real ones.`,
      },
      {
        id: "glossary",
        kicker: "Words you'll need",
        title: "Your vocabulary for this lesson",
        body: `These four words explain what an LLM is, what it can "see" at once, and its single biggest danger.`,
        bullets: [
          "**Large Language Model (LLM)** — a huge AI trained on text that generates language by predicting the next token.",
          "**Parameter** — one of the billions of tuned numbers that store what an LLM learned.",
          "**Context window** — the amount of recent text an LLM can pay attention to at once.",
          "**Hallucination** — when an LLM states false information as if it were true.",
        ],
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "An LLM is a giant next-word predictor",
        body: `A **Large Language Model (LLM)** is the engine behind chatbots. "Large" is no exaggeration — these models have **billions** of tuned numbers (called **parameters**) and trained on a huge slice of human writing from the internet and books.\n\nAt its core, an LLM does one thing astonishingly well: given some text, predict the **next token** (the next word or word-part). That's it. It's the same next-piece prediction from the last lesson, just scaled to a mind-bending degree.\n\nHere's the wild part — answering questions, writing code, translating languages, and explaining ideas all *emerge* from that single skill, repeated billions of times. It's like how every word in every book is built from just 26 letters: simple parts, endless combinations.`,
        callout: {
          label: "Mind-blowing but true",
          text: "Answering questions, writing code, and translating all emerge from one trick: predict the next token, over and over. There's no separate 'understanding' module hiding inside.",
        },
        checkIn: {
          prompt: "At its core, what does a Large Language Model do?",
          choices: [
            "Thinks and reasons exactly like a human brain” belongs to a different situation than the one in the question stem",
            "Searches a live database of verified facts” belongs to a different situation than the one in the question stem",
            "Predicts the next token (word/word-part) over and over to produce text",
            "Calls a human to write the response for it” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "An LLM is fundamentally a next-token predictor. Its many apparent abilities emerge from doing that extremely well, at massive scale.",
        },
      },
      {
        id: "concept-2",
        kicker: "Its short-term memory",
        title: "The context window is what it can 'see' right now",
        body: `An LLM doesn't truly remember you between chats — start a fresh conversation and it's a blank slate. Within a single conversation, it works with a **context window**: the chunk of recent text (your messages plus its replies) it can pay attention to while predicting the next token.\n\nThink of the context window like a whiteboard with limited space. As the chat grows, new text gets written on; when it fills up, the oldest notes get erased to make room. Whatever scrolled off the board, the model can no longer "see."\n\nThat's why, in a very long chat, the model sometimes loses track of something you said way at the start — those earlier details fell out of the window. It's not being rude or forgetful on purpose; that information simply isn't in front of it anymore.`,
        bullets: [
          "**Parameter** = one of billions of tuned numbers inside the model.",
          "**Context window** = the recent text the model can currently see.",
          "Beyond the window, earlier details can be forgotten.",
        ],
        checkIn: {
          prompt: "What is the 'context window' of an LLM?",
          choices: [
            "The app's settings menu",
            "The recent text the model can currently pay attention to",
            "A pop-up ad inside the chat app",
            "The model's permanent memory of you forever, across every conversation",
          ],
          correctIndex: 1,
          explanation:
            "The context window is the model's working memory for a conversation. Text beyond it can be forgotten, and there's no memory carried between separate chats.",
        },
      },
      {
        id: "concept-3",
        kicker: "The big warning",
        title: "Hallucination: confidently making things up",
        body: `Here's the most important safety idea about LLMs. Because an LLM predicts **plausible-sounding** text — not verified facts — it can invent details that *sound* perfect but are completely false. This is called a **hallucination**: fake book citations, made-up dates, invented quotes, "facts" that never existed.\n\nWhy does it happen? The model has no concept of truth. It only knows what *sounds* likely to come next. A fake citation looks statistically a lot like a real one, so the model produces it without any sense that it's wrong.\n\nThe scary part is the tone. It states wrong answers with the exact same confidence as right ones — no hesitation, no warning label. The model isn't lying on purpose; it literally can't tell the difference between true and merely plausible.`,
        callout: {
          label: "Myth check",
          text: "A confident, detailed answer from an LLM is not proof it's correct. It optimizes for plausible, not for true — so never trust facts, numbers, or quotes from it without checking them yourself.",
        },
        checkIn: {
          prompt: "An AI gives you a confident answer with a specific quote and date that turn out to be fake. This is called…",
          choices: [
            "A rare software bug that a future update will simply patch out",
            "A hallucination",
            "Overfitting",
            "A context window",
          ],
          correctIndex: 1,
          explanation:
            "Hallucination is when an LLM produces false information that sounds convincing, because it optimizes for plausible, not true.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Spotting a hallucination in a homework answer",
        body: `Suppose you ask a chatbot, "Give me three books about the history of pizza, with authors and years." Here's how to handle the confident-looking reply.\n\n**Step 1 — Read the polished answer.** It lists three titles, three authors, and three years — all formatted perfectly and sounding totally legit.\n\n**Step 2 — Remember the trick.** The LLM predicted *plausible-looking* citations. Plausible is not the same as real. A fake citation and a real one look almost identical to the model.\n\n**Step 3 — Verify before trusting.** Search a library catalog or bookstore for each title and author. This is the step that catches hallucinations.\n\n**Step 4 — See the result.** Two books are real; one title and author don't exist anywhere. That third one was a hallucination — and if you'd cited it in an essay, your teacher would have caught it.\n\nThe lesson: use the LLM to *get started*, but confirm any fact, name, number, or quote with a trusted source.`,
        callout: {
          label: "Pro tip",
          text: "Match the task to the tool. LLMs shine at rephrasing, explaining, and brainstorming — your own words in, polished words out. For exact facts, dates, citations, or live news, always verify elsewhere.",
        },
      },
      {
        id: "second-example",
        kicker: "Second example",
        title: "What happens when the context window fills up",
        body: `Imagine you're debugging homework with a chatbot and paste in a long article, your notes, and three follow-up questions — all in one conversation.\n\nThe model has a **context window** — a fixed limit on how many tokens it can "see" at once. As the chat grows, the oldest material falls out of view. The model doesn't warn you loudly; it just quietly loses access to the beginning.\n\nSo when you ask "what did the article say about Chapter 3?" the model might invent an answer — not from malice, but because Chapter 3 left the window three messages ago. **Hallucination here isn't random — it's a memory limit.**\n\nFix: summarize key facts yourself, start a fresh chat for new topics, or paste only the relevant chunk.`,
        callout: {
          label: "Notice this",
          text: "Long chats aren't unlimited memory. Context limits are a common, predictable cause of confident wrong answers.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "\"If it sounds confident, it must be right\"",
        body: `This is the exact myth that led to the courtroom disaster you read about earlier — and it's worth dismantling completely.`,
        bullets: [
          "**Myth: Confidence is a signal of accuracy.** Reality: an LLM's tone doesn't change based on whether it's right — it sounds equally sure either way.",
          "**Myth: A detailed, specific answer must be true.** Reality: specificity (exact dates, page numbers, quotes) is often where hallucinations hide, because specific details sound more convincing.",
          "**Myth: If it were wrong, it would say 'I'm not sure.'** Reality: LLMs often don't reliably know when they don't know — that's a big part of why hallucination is hard to fully fix.",
        ],
        checkIn: {
          prompt: "Why is 'the AI sounded very confident, so it must be correct' a dangerous assumption?",
          choices: [
            "Because an LLM's tone doesn't change based on whether its answer is actually true or hallucinated",
            "Because confidence only matters for image generators, not text” belongs to a different situation than the one in the question stem",
            "Because LLMs never sound confident about anything” belongs to a different situation than the one in the question stem",
            "It isn't dangerous — confidence always tracks accuracy in LLMs” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "This exact assumption caused a real lawyer to submit fake case citations to a federal court — proof that tone is not a reliable signal of truth.",
        },
      },
      {
        id: "red-flags",
        kicker: "Red flags",
        title: "LLM red flags that should trigger verification",
        body: `Some outputs should automatically lower your trust — even when the tone sounds perfect:`,
        bullets: [
          "**Specific facts with no source** — dates, statistics, court cases, or quotes that sound precise but can't be traced.",
          "**Confident answers about niche or very recent events** — training data has a cutoff; the model may fill gaps with plausible fiction.",
          "**Long conversations where early details suddenly \"change\"** — a sign the context window dropped older messages.",
          "**Legal, medical, or safety advice stated as definitive** — high-stakes domains where hallucinations can cause real harm.",
        ],
        callout: {
          label: "Default response",
          text: "When you spot these red flags, verify independently before acting — especially if someone else's safety or rights are involved.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it now",
        title: "Design your own fact-check test",
        body: `Think of a specific, checkable fact you already know well (a sports record, a historical date, a book's actual author). If you have access to a chatbot, ask it about that exact fact — but even without one, imagine the process:\n\n1. What would the AI's answer probably sound like — confident, detailed, plausible?\n2. How would you actually verify it, step by step?\n\nThis mental rehearsal builds the exact muscle you'll need every time an LLM helps with real schoolwork.`,
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "The 3-source verification habit",
        body: `Professional fact-checkers use a simple, powerful rule: never trust a claim from a single source, especially one that can't explain *how* it knows something. Here's how to apply it to LLM output specifically.`,
        bullets: [
          "**Isolate the risky specifics.** Names, dates, statistics, and quotes are the highest-hallucination-risk parts of any answer.",
          "**Find two independent sources that agree.** If a fact only appears because the AI said it, treat it as unverified.",
          "**Ask 'could this be plausible-sounding instead of true?'** This single question would have caught the courtroom's fake case citations before they were ever filed.",
        ],
        image: "/images/lessons/ai-8-extra1.png",
        imageAlt: "A checklist for verifying AI-generated facts against independent sources",
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Search engine vs. chatbot, for factual questions",
        body: `Seeing the two tools side by side clarifies exactly when each one is the safer choice.`,
        table: {
          columns: ["Trait", "Search engine", "Chatbot / LLM"],
          values: [
            ["Shows sources you can check", "Yes — links to real pages", "Not by default — often no direct source"],
            ["Can 'hallucinate'", "Rarely — it retrieves existing pages", "Yes — it generates plausible text"],
            ["Best for", "Verifiable facts, current events", "Rephrasing, brainstorming, explaining concepts"],
          ],
          rowCount: 3,
        },
        checkIn: {
          prompt: "According to the comparison, why is a search engine generally safer for verifying an exact fact than a chatbot?",
          choices: [
            "It can seem like there is no real difference between the two, but that reading skips the distinction this question is testing",
            "Search engines link to actual source pages you can check, while a chatbot often generates plausible text with no direct source",
            "It can seem like search engines are always faster, but that reading skips the distinction this question is testing",
            "A common mix-up is to treat chatbots never make mistakes as enough, which confuses a nearby idea with the right one",
          ],
          correctIndex: 1,
          explanation:
            "Being able to trace a claim back to a real, checkable source is exactly what a chatbot's generated answer typically lacks by default.",
        },
      },
      {
        id: "ethics-or-bias",
        kicker: "Ethics moment",
        title: "When a hallucination had real legal consequences",
        body: `The lawyer's case from the start of this lesson wasn't a one-time fluke — it became one of the most widely cited real-world examples of LLM hallucination causing tangible harm. A federal judge issued a public order describing exactly what went wrong and imposed sanctions, and the case has since been used to update guidance for legal professionals using AI tools.\n\nWhat makes this case so useful for learning is that it happened to someone whose entire profession is built on verifying facts and citing sources carefully — and the confident, fluent tone of the AI's fabricated citations was still convincing enough to slip through.\n\nThe takeaway isn't "never use AI for research." It's that **verification is not optional**, no matter how polished or confident the output sounds, and no matter how experienced you are.`,
        callout: {
          label: "Why this matters",
          text: "This case is a direct, real example of evaluating how a computing tool's limitations can create serious personal and professional consequences.",
        },
      },
      {
        id: "habits",
        kicker: "Build the habit",
        title: "Three habits for using chatbots on real work",
        body: `Carry these into every homework assignment, research project, and real-world use of a chatbot from here on.`,
        bullets: [
          "**Separate the task types.** Rephrasing your own ideas: lower risk. New facts, dates, quotes, citations: high risk — always verify.",
          "**Never cite an AI-generated source without confirming it exists.** A five-minute search can save you from the lawyer's mistake.",
          "**Treat confident tone as neutral information**, not evidence of accuracy.",
        ],
      },
      {
        id: "transfer-to-life",
        kicker: "Use it for real",
        title: "Treat chatbots like powerful draft tools",
        body: `For school and life this month, try this workflow:\n\n1. **Ask** for a first draft or explanation.\n2. **Check** anything factual against a trusted source.\n3. **Rewrite** in your own words what you actually understood.\n4. **Disclose** when your teacher or teammate needs to know AI helped.\n\nYou're not avoiding AI — you're using it the way a language model is actually built: as a pattern predictor, not an infallible expert.`,
        callout: {
          label: "Transfer this",
          text: "Tokens, context limits, and hallucinations don't go away when the semester ends. This workflow does.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Think it through",
        title: "Before you move on, sit with this",
        body: `Think back to the lawyer's story, or your own fact-check rehearsal from earlier in this lesson.\n\nWhat's one type of schoolwork where you'd now be extra careful about trusting an AI's answer without checking it — and what would your checking process actually look like? You'll be asked to put this into words in your reflection at the end of the lesson.`,
      },
      {
        id: "mini-case",
        kicker: "Real-world case",
        title: "Six fake cases, one very real court order",
        body: `In the 2023 case, the lawyer had asked a chatbot to find court cases supporting his argument. The chatbot returned confident, detailed citations — complete with case names, docket numbers, and quoted legal reasoning. He even asked the chatbot to confirm the cases were real, and it assured him they were.\n\nWhen the opposing legal team couldn't locate any of the cases, the judge ordered the lawyer to produce copies of the actual rulings. He couldn't — because none of them existed. The judge's written order described the situation in detail, noting that the citations contained "fake quotes" and cited "non-existent" cases, and the court imposed monetary sanctions.\n\nThe case rippled through the legal profession, prompting several courts to introduce new rules requiring lawyers to disclose and verify any AI-assisted research before filing it — a direct, real-world policy response to a hallucination.`,
        callout: {
          label: "Why this case matters",
          text: "It shows that hallucination isn't a rare, minor glitch — it can happen to careful professionals, with serious real-world consequences, unless verification becomes a habit.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "Quick gut-check before the quiz",
        body: `Let's make sure the big ideas actually stuck before you head into the knowledge check.`,
        checkIn: {
          prompt: "What happened when the lawyer asked the chatbot to confirm the cases were real?",
          choices: [
            "The chatbot connected to a legal database to double-check” belongs to a different situation than the one in the question stem",
            "The chatbot confidently assured him the fake cases were real, reinforcing the hallucination",
            "The chatbot refused to answer the question at all” belongs to a different situation than the one in the question stem",
            "The chatbot admitted immediately that it had made them up” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "This is the core danger of hallucination: the model can confidently reaffirm its own fabricated content, because it has no built-in way to know what's actually true.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Carry these forward: an **LLM** generates language by predicting the next **token**, billions of times. The **context window** is its short-term memory — older text can drop out. And **hallucination** is when it confidently produces false but plausible-sounding content — sometimes with real, serious consequences, as a real lawyer learned the hard way.\n\nLLMs are brilliant at language tasks — explaining, drafting, summarizing, rephrasing, brainstorming — but unreliable as a source of truth without verification.\n\nNow that you know how they work, you're ready to *control* them. The next two lessons are all about prompting — getting great results on purpose. When you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict) first.`,
      },
    ],
  },
  bigIdeas: [
    "An **LLM** generates language by predicting the next **token**, billions of times.",
    "The **context window** is its short-term memory — older text can drop out.",
    "**Hallucination** = confidently producing false but plausible-sounding content.",
    "Confident tone is not evidence of accuracy — LLMs sound the same whether right or wrong.",
    "Real, documented cases show hallucination can cause serious professional and legal consequences.",
  ],
  keyTerms: [
    { term: "Large Language Model (LLM)", definition: "A huge AI trained on text that generates language by predicting the next token." },
    { term: "Parameter", definition: "One of the billions of tuned numbers that store what an LLM learned." },
    { term: "Context window", definition: "The amount of recent text an LLM can pay attention to at once." },
    { term: "Hallucination", definition: "When an LLM states false information as if it were true." },
    { term: "Verification", definition: "Confirming a claim against an independent, trustworthy source before relying on it." },
  ],
  realWorld:
    "A lawyer asked a chatbot for legal research and submitted six fake, AI-invented court cases to a federal judge — a real, documented case that led to sanctions and new court rules about disclosing AI-assisted research. That's why teachers warn against trusting AI 'facts' without checking them.",
  quiz: [
    {
      id: "q1",
      question: "At its core, what does a Large Language Model do?",
      choices: [
            "Predicts the next token (word/word-part) over and over to produce text",
            "Thinks and reasons exactly like a human” belongs to a different situation than the one in the question stem",
            "Searches the internet live for answers” belongs to a different situation than the one in the question stem",
            "Stores a copy of every webpage and quotes it exactly” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "An LLM is fundamentally a next-token predictor. Its many abilities emerge from doing that extremely well.",
    },
    {
      id: "q2",
      question: "What is the 'context window'?",
      choices: [
            "The app's settings menu” belongs to a different situation than the one in the question stem",
            "The recent text the model can currently pay attention to",
            "A window that pops up with ads” belongs to a different situation than the one in the question stem",
            "The model's permanent memory of you forever” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "The context window is the model's working memory for a conversation. Text beyond it can be forgotten.",
    },
    {
      id: "q3",
      question: "An AI gives you a confident answer with a specific quote and date that turn out to be fake. This is called…",
      choices: [
        "A rare software bug that a future update will simply patch out",
        "Overfitting",
        "A context window",
        "A hallucination",
      ],
      correctIndex: 3,
      explanation:
        "Hallucination is when an LLM produces false information that sounds convincing, because it optimizes for plausible, not true.",
    },
    {
      id: "q4",
      question: "Given how LLMs work, which task is SAFEST to rely on without double-checking?",
      choices: [
            "Rephrasing a paragraph you wrote to sound clearer",
            "Reporting today's breaking news” belongs to a different situation than the one in the question stem",
            "Getting exact historical dates and statistics",
            "Listing real research papers with page numbers",
          ],
      correctIndex: 0,
      explanation:
        "Language tasks like rephrasing your own text are a strength. Facts, citations, and live news are exactly where hallucination bites.",
    },
    {
      id: "q5",
      question: "In the real lawyer case, what happened when the chatbot was asked to confirm its citations were real?",
      choices: [
            "It immediately admitted the cases were fake",
            "It confidently reassured him the fake cases were real",
            "It refused to respond” belongs to a different situation than the one in the question stem",
            "It connected to a court database and verified them",
          ],
      correctIndex: 1,
      explanation:
        "The model reaffirmed its own fabrication with confidence — proof that an LLM has no reliable internal way to detect its own hallucinations.",
    },
    {
      id: "q6",
      question: "Why is a search engine generally safer than a chatbot for verifying one exact fact?",
      choices: [
            "It can seem like chatbots are always slower than search engines, but that reading skips the distinction this question is testing",
            "Search engines are incapable of ever showing wrong information — familiar wording, wrong fit for what the prompt is actually asking",
            "Search engines typically link to real, checkable source pages, while chatbots often generate plausible text without a direct source",
            "There's no meaningful difference between the two for facts. That option sounds confident, but it leaves out the deciding constraint",
          ],
      correctIndex: 2,
      explanation:
        "Traceability to a real source is the key advantage — exactly what a generated chatbot answer often lacks by default.",
    },
    {
      id: "q7",
      question: "What is the '3-source verification habit' from this lesson mainly used for?",
      choices: [
            "Some learners answer “Increasing an LLM's parameter count”, yet that does not match the precise idea from the lesson",
            "Isolating risky specifics (names, dates, quotes) and checking them against independent sources before trusting them",
            "It can seem like deleting an AI's context window, but that reading skips the distinction this question is testing",
            "It can seem like making chatbot answers longer, but that reading skips the distinction this question is testing",
          ],
      correctIndex: 1,
      explanation:
        "The habit targets exactly the highest-risk parts of an answer and cross-checks them — the practical defense against hallucination.",
    },
    {
      id: "q8",
      question: "What is the biggest overall lesson from the courtroom hallucination case?",
      choices: [
            "If the goal were something else, “Hallucinations only happen in legal contexts” might work; for this check, it does not",
            "You might defend “AI should never be used for any research, ever” in casual talk, but it fails the definition used here",
            "Verification is not optional, no matter how confident or polished an AI's answer sounds, or how experienced the user is",
            "If the goal were something else, “Lawyers are uniquely bad at using technology” might work; for this check, it does not",
          ],
      correctIndex: 2,
      explanation:
        "The case shows hallucination can fool even careful, experienced professionals — which is exactly why verification has to be a consistent habit, not an occasional afterthought.",
    },
  ],
  reflection: {
    prompt:
      "Knowing an LLM predicts 'plausible' text rather than 'true' text, how will you change the way you use a chatbot for homework?",
    placeholder: "I'll use it for things like… but I'll always verify…",
  },
};
