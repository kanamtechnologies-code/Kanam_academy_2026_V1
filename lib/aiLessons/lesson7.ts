import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson7: AILessonConfig = {
  id: "ai-7",
  title: "7. What Is Generative AI?",
  goal: "Understand the AI that creates new text, images, audio, and video — how it differs from older AI, where its content comes from, and the real questions that raises about ownership and consent.",
  xpReward: 350,
  badge: "Creator's Apprentice",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/6",
  nextHref: "/learn/ai/8",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `You've probably seen it: an AI that writes a rap about photosynthesis, paints a dragon surfing a pizza, or drafts an essay in seconds. This is **generative AI**, and today you'll learn what makes it tick.\n\nHere's the roadmap:\n\n• What makes generative AI different from the "sorting" AI you've met so far.\n• Its surprisingly simple trick: predicting the **next piece**, over and over.\n• Where all that content comes from — and a real, ongoing legal debate about it.\n\nThis is the most talked-about AI of your generation, powering chatbots, image generators, and homework helpers. Knowing how it actually works helps you use it as a creative superpower — without getting fooled by its confident mistakes.`,
        image: "/images/lessons/ai-7-generative.png",
        imageAlt: "An AI generating a new image and paragraph from a text prompt",
        callout: {
          label: "Why it matters",
          text: "Generative AI can help you brainstorm, draft, and create — but it can also produce convincing nonsense and raise real questions about whose work trained it. Understanding it is what separates using it wisely from being misled by it.",
        },
      },
      {
        id: "hook-story",
        kicker: "True story",
        title: "The album cover that looked suspiciously familiar",
        body: `An independent musician once generated album art with an AI image tool, typing a simple prompt about a lonely astronaut. The result was striking — and eerily close in style to a specific well-known illustrator's signature look, right down to brushstroke texture that artist had spent years developing.\n\nThe musician hadn't stolen anything on purpose. But the AI had studied an enormous pile of online art, including that illustrator's public work, and learned to remix visual patterns closely associated with their style.\n\nThis is the exact tension you'll explore today: generative AI creates things that feel brand new, built from patterns absorbed from real human creators — often without those creators' knowledge or consent. Understanding *how* it creates is the first step to using it thoughtfully.`,
      },
      {
        id: "glossary",
        kicker: "Words you'll need",
        title: "Your vocabulary for this lesson",
        body: `These terms explain exactly how generative AI builds something new out of everything it has studied.`,
        bullets: [
          "**Generative AI** — AI that creates new content — text, images, audio, code — rather than just classifying.",
          "**Next-token prediction** — building text by repeatedly predicting the most likely next word/word-part.",
          "**Prompt** — the instruction or request you give a generative AI to guide what it creates.",
          "**Training corpus** — the huge collection of text/images a generative model learned from.",
          "**Style transfer** — when a generative model reproduces the visual or textual 'feel' of specific sources it studied.",
        ],
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "Generative AI creates new content",
        body: `Most AI we've discussed so far **sorts or predicts a label** — is this spam? cat or dog? **Generative AI** does something different: it **creates** brand-new content — essays, images, music, code, even video.\n\nHere's the difference in one picture. A spam filter is like a *librarian* sorting books onto the right shelves; it organizes things that already exist. Generative AI is like an *author* writing a brand-new book that didn't exist a moment ago.\n\nTools like chatbots and image generators are generative AI. They studied enormous amounts of human-made content and learned to produce new pieces in the same style — a poem, a picture, a paragraph that's genuinely new.`,
        callout: {
          label: "Sorting vs. creating",
          text: "A spam filter labels what already exists. Generative AI makes something that didn't exist a second ago — that's the core difference.",
        },
        checkIn: {
          prompt: "What is the core difference between a spam filter and a generative AI model?",
          choices: [
            "Spam filters are faster, that's the only difference",
            "A spam filter classifies existing content; generative AI creates brand-new content",
            "There is no real difference between them",
            "Generative AI can only work with numbers, never text",
          ],
          correctIndex: 1,
          explanation:
            "Sorting (classifying) and creating (generating) are fundamentally different jobs, even though both rely on patterns learned from data.",
        },
      },
      {
        id: "concept-2",
        kicker: "The trick",
        title: "It works by predicting the next piece, over and over",
        body: `Here's the surprising part — and it shocks most people. A text generator mostly just predicts **the next word**, then the next, then the next, each one based on everything written so far.\n\nThink of the world's most powerful autocomplete. Your phone guesses one next word; a generative model guesses word after word after word, thousands of times, never losing the thread. String all those tiny predictions together and out comes a whole essay.\n\nImage generators do a similar thing, but with visual patterns instead of words, gradually turning random noise into a picture that matches your request. It *feels* creative, but underneath it's super-powered **pattern prediction** — the same idea you've seen all course, scaled up enormously.`,
        bullets: [
          "Text AI predicts the next **token** repeatedly to build sentences.",
          "Image AI builds pictures from learned visual patterns.",
          "The 'creativity' is remixing patterns from training data.",
        ],
        callout: {
          label: "Myth check",
          text: "Generative AI isn't imagining or inventing the way a human artist does. It's recombining patterns from its training data through prediction. Stunning results, but it's remixing — not dreaming up ideas from lived experience.",
        },
        checkIn: {
          prompt: "At its core, how does a text-generating AI build a sentence?",
          choices: [
            "It searches a database for the exact sentence and copies it",
            "It predicts the next word/token repeatedly, each based on everything written so far",
            "A hidden human types the response secretly",
            "It picks words completely at random",
          ],
          correctIndex: 1,
          explanation:
            "Chained next-token prediction is the mechanism behind text generation — simple in concept, powerful at scale.",
        },
      },
      {
        id: "concept-3",
        kicker: "Where it comes from",
        title: "It learned from a huge slice of the internet",
        body: `So where does it get the patterns to remix? Generative models trained on **massive** collections of text and images — much of it written and drawn by real people online, from blog posts to artwork to forums.\n\nThe model doesn't copy-paste any single source; it blends patterns from millions of them into something new. It's a bit like a musician who grew up listening to thousands of songs and now writes original music that carries echoes of all of them.\n\nThis raises real questions we'll dig into shortly: Whose work taught the AI? Who owns AI-made art? For now, hold onto one fact: the output reflects its training data — including that data's gaps, mistakes, and biases.`,
        callout: {
          label: "Important",
          text: "Generative AI reflects what it was trained on. If the training data was biased, outdated, or wrong, the output can be too — confidently and convincingly.",
        },
        checkIn: {
          prompt: "Why can generative AI output reflect bias or errors?",
          choices: [
            "Because it has personal opinions",
            "Because it reflects patterns in its training data, which can contain bias and mistakes",
            "Because it's connected live to the news at all times",
            "It can't — generated content is always neutral and correct",
          ],
          correctIndex: 1,
          explanation:
            "Generative models learn from human-made data. Flaws and biases in that data can show up in the output, even without anyone intending it.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Turning a weak prompt into a strong one",
        body: `Because generative AI builds on what you give it, the **prompt** (your request) hugely shapes the result. Watch a vague prompt become a strong one — with a short example and an iteration loop.\n\n**Step 1 — Start with the weak prompt.** "Write about dogs." Too vague — the AI fills gaps with generic guesses.\n\n**Step 2 — Add task and context.** Tell it *what* to create and *for whom*: "Write a 5-sentence paragraph explaining why dogs are good at smelling, for 8th graders."\n\n**Step 3 — Add format and role.** Give structure and a persona: "You are a friendly science writer. Keep it fun and easy to read."\n\n**Step 4 — Add one short example (few-shot style).** Show the tone you want: "Example opening: 'A dog's nose is like a superpower — it can sniff out a treat hidden in a backpack across the room.'" Models copy examples strongly — one line can steer the whole reply.\n\n**Step 5 — Generate, critique, and iterate.** Run the prompt. Read the output: too long? Off-topic? Tighten one detail and try again. Prompting is a loop, not a one-shot — a second pass often fixes what the first draft missed.`,
        code: `WEAK PROMPT:\n"Write about dogs."\n\nSTRONG PROMPT:\n"You are a friendly science writer for 8th graders.\nWrite a 5-sentence paragraph explaining why dogs\nare good at smelling, using one real example.\nExample tone: 'A dog's nose is like a superpower…'\nKeep it fun and easy to read."`,
        codeCaption: "Before and after: a clearer prompt steers the AI",
        callout: {
          label: "Pro tip",
          text: "Tell the AI who to act as, what to create, who it's for, and the format. Add one short example of the style you want, then generate → critique → iterate. Specific in, specific out.",
        },
      },
      {
        id: "second-example",
        kicker: "Second example",
        title: "Old AI classifies; generative AI creates",
        body: `Compare two tools you might use the same afternoon:\n\n**Photo organizer (older pattern):** You upload 500 pictures. The AI **classifies** each one — "beach," "birthday," "pet" — based on patterns it learned. It sorts; it doesn't invent new photos.\n\n**Image generator (generative):** You type "sunset over a mountain lake in watercolor style." The AI **creates** a new image by predicting pixel patterns that match that description — pixels that never existed as one photograph.\n\nBoth use pattern prediction. The difference is the output: **label an existing thing** vs. **produce something new**. That difference changes the ethics questions — especially around consent, copyright, and what's real.`,
        callout: {
          label: "Notice this",
          text: "Generative doesn't mean imaginative in a human sense. It means statistically assembling new outputs from learned patterns.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "\"If it's AI-generated, it's completely original\"",
        body: `This myth sounds harmless, but it hides one of the biggest ongoing debates in tech and law today.`,
        bullets: [
          "**Myth: AI-generated content has no source material.** Reality: every output is built from patterns learned from real, existing human work.",
          "**Myth: If nothing was copy-pasted, there's no ethical question.** Reality: many creators argue their style and labor were used to train the model without their permission — a genuinely unresolved debate.",
          "**Myth: 'The AI made it' settles who owns it.** Reality: courts and lawmakers are still actively figuring out who — if anyone — owns AI-generated work.",
        ],
        checkIn: {
          prompt: "Why is 'the AI made it, so it's fully original' a misleading claim?",
          choices: [
            "It isn't misleading — AI content has no relationship to any source material",
            "Because the output is built from patterns learned from real human-made content, raising real questions about credit and consent",
            "Because AI never actually generates anything new",
            "Because only humans are allowed to create art, by law, everywhere",
          ],
          correctIndex: 1,
          explanation:
            "Generative AI remixes patterns from real training data. That's exactly why questions about crediting and compensating original creators remain active and unresolved.",
        },
      },
      {
        id: "red-flags",
        kicker: "Red flags",
        title: "Four warning signs with generative AI",
        body: `Generative tools are powerful — and easy to misuse. Watch for these red flags:`,
        bullets: [
          "**\"It's original, so it's fine to use.\"** Generated content can still closely imitate real people's work or likeness without permission.",
          "**\"If the AI made it, nobody owns it.\"** Training data came from real creators; ownership and credit questions don't disappear.",
          "**\"It looks real, so it is real.\"** Generated text, images, and audio can be completely fabricated while looking authentic.",
          "**\"I can share anything the AI creates.\"** Privacy and consent rules still apply — especially with images or voices of real people.",
        ],
        callout: {
          label: "Pause when you see these",
          text: "Creation power without verification and consent thinking is where generative AI gets people into real trouble.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it now",
        title: "Write a strong prompt right now",
        body: `Pick any small creative task (a birthday message, a short poem, a study summary). Using the 4-part recipe from the worked example — **role, task, context, format** — write out a prompt in your head or on paper before you'd ever type it into a tool.\n\nNotice how much more specific your prompt is than "write me a poem." That specificity is the actual skill — generative AI rewards clear direction, not vague requests.`,
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "The remix, not theft — but read the fine print",
        body: `Here's a nuanced, advanced idea: generative AI is best understood as an extreme, automated form of **remixing** — similar to how musicians sample old songs or artists reference earlier styles. Humans have always built on each other's work.\n\nWhat's different and genuinely new is **scale and consent**. A single artist referencing another's style is a tiny, human-scale act. A generative model can absorb millions of creators' work at once, often without anyone being asked or paid — and can then produce competing content in seconds.`,
        bullets: [
          "**Scale matters.** One model can echo the styles of millions of creators simultaneously — far beyond any single human's ability to 'reference' others.",
          "**Consent matters.** Many creators whose work trained these models were never asked and never paid.",
          "**This is genuinely unresolved.** Courts, companies, and artists are actively negotiating new rules right now — you're growing up during the debate, not after it.",
        ],
        image: "/images/lessons/ai-7-extra1.png",
        imageAlt: "A collage of many artists' styles blending into one AI-generated image, illustrating scale and consent questions",
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Sorting AI vs. generative AI",
        body: `Placing the two families side by side makes the difference — and the new ethical questions — clearer.`,
        table: {
          columns: ["Trait", "Sorting AI (spam filter)", "Generative AI (image/text tool)"],
          values: [
            ["What it produces", "A label for existing content", "Brand-new content"],
            ["Main risk", "Wrong classification", "Hallucination, bias, and unresolved ownership questions"],
            ["Relationship to training data", "Learns to recognize patterns in it", "Learns to remix and reproduce patterns from it"],
          ],
          rowCount: 3,
        },
        checkIn: {
          prompt: "Based on the comparison, what is a distinctive new risk that comes with generative AI (beyond sorting AI)?",
          choices: [
            "It never uses any training data",
            "It raises unresolved ownership and consent questions because it reproduces patterns from real creators' work",
            "It is always less accurate than sorting AI",
            "It has no risks at all",
          ],
          correctIndex: 1,
          explanation:
            "Because generative AI reproduces and remixes patterns from real creative work, it introduces genuinely new ethical and legal questions that sorting AI didn't raise in the same way.",
        },
      },
      {
        id: "ethics-or-bias",
        kicker: "Ethics moment",
        title: "Artists and authors take the question to court",
        body: `Starting in 2023, several groups of visual artists, photographers, and authors filed lawsuits against major AI companies, arguing that their copyrighted work had been used to train generative models without permission or payment — and that the resulting tools could now produce work that competed directly with their own.\n\nThe companies involved have generally argued that training an AI on publicly available work is a new kind of use that existing copyright law doesn't clearly forbid — a genuinely contested legal question that courts are still working through as of this lesson.\n\nWhatever side eventually "wins" in court, the underlying ethical question is one you can reason about right now: is it fair to build a powerful tool by studying someone's life's work without asking them? There isn't a settled answer yet — which is exactly why understanding the mechanism (patterns learned from real human data) matters more than repeating a simple verdict.`,
        callout: {
          label: "Why this matters",
          text: "Evaluating how a computing technology affects economic and cultural practices — like the livelihoods of artists and writers — is precisely this lesson's focus.",
        },
      },
      {
        id: "habits",
        kicker: "Build the habit",
        title: "Three habits for using generative AI thoughtfully",
        body: `These habits help you get real value from generative tools while staying aware of the bigger picture.`,
        bullets: [
          "**Write specific prompts.** Role, task, context, format — the clearer your ask, the more useful the output.",
          "**Remember the source.** Every output is built from real human work; that's worth keeping in mind, especially for anything you might publish or sell.",
          "**Iterate instead of accepting the first draft.** Generate, critique, refine — prompting is a loop, not a single shot.",
        ],
      },
      {
        id: "transfer-to-life",
        kicker: "Use it for real",
        title: "Before you post something AI-made",
        body: `Use this three-step check before sharing generative content — memes, study visuals, project images, anything:\n\n1. **Could this resemble a real person without their consent?** (Face, voice, signature style)\n2. **Would I be okay if someone generated something like this using *my* likeness?**\n3. **Am I labeling it honestly** so viewers know it was AI-generated?\n\nGenerative AI makes creation fast. These questions make creation responsible.`,
        callout: {
          label: "Transfer this",
          text: "The speed of generation is permanent. The habit of pausing before you post is what keeps you in control of it.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Think it through",
        title: "Before you move on, sit with this",
        body: `Think about the album-cover story from the start of this lesson, or the artists'-lawsuit case.\n\nWhere do you personally land on the question of using AI trained on other people's creative work without asking them? Is there a version of generative AI use you'd feel completely comfortable with, and one you wouldn't? You'll be asked to put this into words in your reflection at the end of the lesson.`,
      },
      {
        id: "mini-case",
        kicker: "Real-world case",
        title: "A stock-photo company takes an AI company to court",
        body: `In 2023, a major stock-image company filed a lawsuit against an AI image-generation company, alleging that millions of its copyrighted photos had been used without permission to train the AI's image generator — and pointing to generated images that even appeared to carry a distorted version of the stock company's own watermark, as evidence of exactly which images had been used.\n\nThe case became one of the most closely watched examples of the broader legal fight over generative AI training data, precisely because the watermark evidence made the "where did this pattern come from" question unusually visible and concrete.\n\nAs of this lesson, cases like this one are still working through the courts, and the outcomes will likely shape how future generative AI tools are trained — including what permissions, credit, or payment (if any) become standard practice for using creators' work.`,
        callout: {
          label: "Why this case matters",
          text: "It's a rare, visible example of exactly how training data leaves fingerprints in generated output — turning an abstract ethical question into concrete evidence.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "Quick gut-check before the quiz",
        body: `Let's make sure the big ideas actually stuck before you head into the knowledge check.`,
        checkIn: {
          prompt: "What made the stock-photo company's lawsuit evidence unusually concrete?",
          choices: [
            "The AI admitted to copying photos in a public statement",
            "Generated images sometimes showed a distorted version of the company's own watermark, suggesting specific training sources",
            "There was no evidence at all, only speculation",
            "The stock-photo company had never published any photos",
          ],
          correctIndex: 1,
          explanation:
            "The distorted watermark gave a rare, visible trace of specific training data showing up in generated output — a vivid, concrete piece of evidence in an otherwise abstract debate.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Lock these in: **generative AI** creates new content instead of just sorting or labeling. Text generators work by predicting the **next token** again and again. The output reflects the **training data** — including its biases, gaps, and the real people whose work it learned from. And questions about consent, credit, and ownership are genuinely unresolved right now.\n\nGenerative AI is an incredible creative assistant for brainstorming, drafting, summarizing, and making images — but because it predicts *plausible* content built from real human work, it deserves both your creativity and your critical thinking.\n\nNext lesson we'll look inside the most famous kind: the Large Language Model. When you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict) first.`,
      },
    ],
  },
  bigIdeas: [
    "**Generative AI** creates new content instead of just sorting or predicting labels.",
    "Text generators work by predicting the **next token** again and again.",
    "Output reflects the **training data** — including its biases and gaps.",
    "Generative AI is best understood as remixing at massive scale, often without creators' consent.",
    "Questions about AI training data, credit, and ownership are genuinely unresolved right now.",
  ],
  keyTerms: [
    { term: "Generative AI", definition: "AI that creates new content — text, images, audio, code — rather than just classifying." },
    { term: "Next-token prediction", definition: "Building text by repeatedly predicting the most likely next word/word-part." },
    { term: "Prompt", definition: "The instruction or request you give a generative AI to guide what it creates." },
    { term: "Few-shot example", definition: "One or two short examples in a prompt that show the style or format you want." },
    { term: "Training corpus", definition: "The huge collection of text/images a generative model learned from." },
    { term: "Style transfer", definition: "When a generative model reproduces the visual or textual 'feel' of specific sources it studied." },
  ],
  realWorld:
    "When you ask an AI to 'write a rap about photosynthesis', it generates each word by predicting what should come next — producing a poem no human ever wrote, built from patterns it learned. Real lawsuits from artists and stock-photo companies show that where those patterns came from is a live, unresolved legal and ethical question.",
  quiz: [
    {
      id: "q1",
      question: "What makes generative AI different from a spam filter?",
      choices: [
        "It doesn't use any training data at all",
        "It creates brand-new content instead of only labeling existing content",
        "It can only process images, never text",
        "It requires no computing power to run",
      ],
      correctIndex: 1,
      explanation:
        "Generative AI produces new text, images, or audio. A spam filter just classifies things that already exist.",
    },
    {
      id: "q2",
      question: "How does a text-generating AI build a sentence?",
      choices: [
        "It looks up the closest matching sentence in a database",
        "It copies a random webpage related to the topic",
        "It predicts the next word/token repeatedly, each based on what came before",
        "A human types it secretly on the other end",
      ],
      correctIndex: 2,
      explanation:
        "Text generators work by predicting the next token over and over, chaining tiny predictions into full passages.",
    },
    {
      id: "q3",
      question: "Why can generative AI output reflect bias or errors?",
      choices: [
        "Because it has opinions",
        "Because it's connected to the news",
        "It can't — generated content is always neutral and correct",
        "Because it reflects the training data, which can contain bias and mistakes",
      ],
      correctIndex: 3,
      explanation:
        "Generative models learn from human-made data. Flaws and biases in that data can show up in the output.",
    },
    {
      id: "q4",
      question: "Which is the best way to think about generative AI's 'creativity'?",
      choices: [
        "True original imagination, like a human artist's",
        "Super-powered remixing of patterns learned from training data",
        "Magic that can't be explained",
        "Random noise with no structure",
      ],
      correctIndex: 1,
      explanation:
        "It feels creative, but it's remixing and recombining patterns from its training data via prediction.",
    },
    {
      id: "q5",
      question: "Why did several artists and authors file lawsuits against AI companies starting in 2023?",
      choices: [
        "They argued their copyrighted work was used to train AI models without permission or payment",
        "They wanted their work removed from the internet entirely",
        "They were seeking free personal access to the AI tools",
        "They objected to how much energy AI data centers consume",
      ],
      correctIndex: 0,
      explanation:
        "The core legal argument centers on whether training an AI on copyrighted creative work without permission is fair use or infringement — a genuinely unresolved question.",
    },
    {
      id: "q6",
      question: "What made the stock-photo lawsuit's evidence unusually concrete?",
      choices: [
        "Generated images sometimes contained a distorted version of the company's own watermark",
        "A public confession from the AI company",
        "There was no evidence presented at all",
        "The stock-photo company had never published any images",
      ],
      correctIndex: 0,
      explanation:
        "The distorted watermark gave a rare, visible clue connecting specific training data to specific generated output.",
    },
    {
      id: "q7",
      question: "What's the key difference between scale in human 'remixing' and generative AI 'remixing'?",
      choices: [
        "There is no difference at all",
        "A generative model can absorb and echo millions of creators' styles at once, far beyond human-scale referencing",
        "Humans have never referenced each other's work before",
        "AI models can only learn from one source at a time",
      ],
      correctIndex: 1,
      explanation:
        "The scale (millions of sources at once) and lack of consent are what make generative AI's version of 'remixing' genuinely different from a single artist's influence.",
    },
    {
      id: "q8",
      question: "Which of these is a genuinely unresolved question about generative AI, according to this lesson?",
      choices: [
        "Whether text can be converted into tokens",
        "Whether generative AI exists at all",
        "Who owns AI-generated content, and whether training on copyrighted work without permission is acceptable",
        "Whether prompts can include a task and format",
      ],
      correctIndex: 2,
      explanation:
        "Ownership, credit, and consent for training data are live legal and ethical debates without a settled answer yet.",
    },
  ],
  reflection: {
    prompt:
      "Generative AI is great for some tasks and risky for others. Name one task you'd happily use it for, and one where you'd be careful.",
    placeholder: "I'd use it to brainstorm ideas, but I'd be careful when…",
  },
};
