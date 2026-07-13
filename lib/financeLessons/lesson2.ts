import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson2: AILessonConfig = {
  id: "fl-2",
  title: "2. Needs, Wants & Tradeoffs",
  goal: "Tell needs from wants in everyday teen decisions, explain opportunity cost, and practice delayed gratification without pretending wants are \"bad.\"",
  xpReward: 100,
  badge: "Tradeoff Thinker",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/1",
  nextHref: "/learn/finance/3",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Every dollar you spend is a choice — even when it feels automatic. Today you'll practice seeing those choices clearly: what's a **need**, what's a **want**, what you give up when you pick one option (**opportunity cost**), and how waiting can change the deal.\n\nHere's our roadmap:\n\n• **Needs vs. wants** — and why the line can blur.\n• **Tradeoffs** — you rarely get everything at once.\n• **Opportunity cost** — the real price of \"yes.\"\n• **Values again** — same income, different choices.\n• **Delayed gratification** — waiting on purpose, not forever.\n\nThis is not about shaming fun. It's about making tradeoffs visible so you stay in control.`,
        callout: {
          label: "Why it matters",
          text: "People who can name the tradeoff before they spend are less likely to feel regret later — and more likely to fund the goals they said mattered.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `Core words for this lesson:\n\n• A **need** is something required for health, safety, or basic functioning in your situation (food, shelter, required school fees, essential transport to work).\n• A **want** is something you'd like but could live without for now (newest sneakers, extra streaming, upgrade snacks).\n• A **tradeoff** is giving up one option to get another.\n• **Opportunity cost** is the next-best thing you give up when you choose.\n• **Delayed gratification** means waiting for a better or more important result instead of grabbing the immediate reward.\n\nNeeds and wants can shift with context — that's normal. The skill is noticing which is which *for this decision*.`,
        callout: {
          label: "Pro tip",
          text: "Ask: \"What happens if I wait two weeks?\" If life still works, it was probably closer to a want than a need.",
        },
      },
      {
        id: "needs-wants",
        kicker: "The big idea",
        title: "Needs keep you going; wants make life nicer",
        body: `In personal finance, **needs** usually include basics like food, housing-related costs, essential clothing, and getting to school or work safely. **Wants** include nicer versions of those things and extras that add enjoyment.\n\nGray areas are real:\n\n• A phone plan might be a **need** for work and safety — but the newest flagship phone is often a **want**.\n• Eating is a **need** — daily delivery from a restaurant is usually a **want**.\n• School supplies for class are closer to a **need** — branded limited-edition gear may be a **want**.\n\nLabeling something a want does not make it \"bad.\" It means you should fund it *after* (or alongside) priorities you already named — and be honest about the tradeoff.`,
        bullets: [
          "**Need** ≈ required for functioning in your real life.",
          "**Want** ≈ desirable, optional, or upgrade.",
          "Gray areas exist — name them out loud instead of pretending.",
        ],
        callout: {
          label: "Watch out",
          text: "Marketing loves to rebrand wants as needs (\"You deserve this\"). Pause and ask whether skipping it actually harms health, safety, or required responsibilities.",
        },
      },
      {
        id: "tradeoffs",
        kicker: "Reality check",
        title: "Tradeoffs are normal — scarcity is the rule",
        body: `You have limited money, time, and energy. That means **tradeoffs** are built into adult (and teen) life — not a personal failure.\n\nExamples:\n\n• Buy concert tickets → less left for gas this month.\n• Take an extra shift → more income, less free time.\n• Upgrade a phone early → delay the car fund.\n\nA healthy money mindset does not pretend tradeoffs disappear. It makes them **conscious**. Unconscious tradeoffs feel like \"Where did my money go?\" Conscious tradeoffs feel like \"I chose this, so I won't also expect that.\"`,
        callout: {
          label: "Why it matters",
          text: "Families, schools, and governments face tradeoffs too. Learning the habit now prepares you for bigger decisions later — cars, college, apartments.",
        },
      },
      {
        id: "opportunity-cost",
        kicker: "The real price",
        title: "Opportunity cost: what you give up",
        body: `**Opportunity cost** is the value of the next-best alternative you did *not* choose. The sticker price of a purchase is only part of the story.\n\nIf you spend $60 on a game:\n\n• You give up $60 that could have gone toward sneakers, gas, or savings.\n• You also give up whatever that $60 would have bought instead — that's the opportunity cost.\n\nOpportunity cost is not always money. Choosing three hours of scrolling might cost practice time, sleep, or a shift you could have worked.\n\nYou don't need a spreadsheet for every snack. Use the idea for decisions that are big *for you* — anything that would delay a goal you care about.`,
        bullets: [
          "Price tag ≠ full cost.",
          "Opportunity cost = the best option you skipped.",
          "Use it most on purchases that compete with your named goals.",
        ],
        callout: {
          label: "Pro tip",
          text: "Say the tradeoff in one sentence before you buy: \"If I get this, I'm choosing it instead of ___.\" If that sentence stings, reconsider.",
        },
      },
      {
        id: "delayed",
        kicker: "Timing",
        title: "Delayed gratification (without misery)",
        body: `**Delayed gratification** means choosing a later, better-aligned reward over an immediate one. It is a muscle, not a personality trait you either have or don't.\n\nHelpful versions:\n\n• Wait 24–48 hours on non-urgent online carts.\n• Save for the quality item you actually want instead of buying three cheap impulse versions.\n• Fund the goal first, then spend guilt-free on a planned want.\n\nUnhelpful versions:\n\n• Never allowing any fun (burnout leads to blowups).\n• Waiting forever with no plan (that's avoidance, not discipline).\n\nA balanced approach: protect needs and goals, then schedule some wants on purpose. Planned fun is part of a sustainable money life.`,
        callout: {
          label: "Watch out",
          text: "\"I'll start saving after I treat myself\" often becomes never. Flip it: small goal contribution first, then the treat if it still fits.",
        },
      },
      {
        id: "practice",
        kicker: "Try it",
        title: "A quick decision framework",
        body: `Use this when you're unsure:\n\n**1. Label** — Need, want, or gray area?\n**2. Check goals** — Does this help, hurt, or ignore a goal you named?\n**3. Name the opportunity cost** — What else could this money/time do?\n**4. Choose timing** — Buy now, wait, or scale down?\n**5. Decide and own it** — If you buy the want, enjoy it without rewriting history. If you skip it, credit yourself for funding the goal.\n\nExample: New headphones on sale vs. putting $80 toward a car fund. If the car is your medium-term priority and current headphones work, waiting (or buying a cheaper pair later) may win. If headphones are required for a class and yours broke, that leans need — still shop for value.`,
        callout: {
          label: "Try this week",
          text: "Before one non-essential purchase, write the opportunity cost in your notes app. That 10-second habit builds Tradeoff Thinker instincts.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Needs** support basic functioning; **wants** add enjoyment or upgrades.\n• **Tradeoffs** are normal because money and time are limited.\n• **Opportunity cost** is the next-best option you give up.\n• **Delayed gratification** is waiting on purpose — with a plan, not forever.\n• Values and goals help you choose when both options look tempting.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on a recent tradeoff you made.`,
      },
    ],
  },
  bigIdeas: [
    "**Needs** support basic functioning; **wants** are optional or upgrades — and gray areas are normal.",
    "**Opportunity cost** is the next-best thing you give up when you choose.",
    "**Delayed gratification** means waiting on purpose so your spending matches your goals.",
  ],
  keyTerms: [
    { term: "Need", definition: "Something required for health, safety, or basic functioning in your situation." },
    { term: "Want", definition: "Something desirable that you could live without for now." },
    { term: "Tradeoff", definition: "Giving up one option in order to get another." },
    { term: "Opportunity cost", definition: "The value of the next-best alternative you did not choose." },
    { term: "Delayed gratification", definition: "Waiting for a later, better-aligned reward instead of taking the immediate one." },
    { term: "Scarcity", definition: "The reality that money, time, and resources are limited." },
    { term: "Impulse buy", definition: "A purchase made quickly without checking goals or opportunity cost." },
  ],
  realWorld:
    "Choosing $40 rideshares every weekend may feel small each time — but the opportunity cost might be a month of gas money or a chunk of a phone-repair fund. Naming that tradeoff changes the decision.",
  quiz: [
    {
      id: "q1",
      question: "Which example is closest to a need for most high school students with a job?",
      choices: [
        "Limited-edition sneakers released this week",
        "Safe transportation to get to work on time",
        "The newest gaming console on launch day",
        "Daily premium coffee delivery",
      ],
      correctIndex: 1,
      explanation:
        "Getting to work safely and on time supports basic functioning and income. The other options are typically wants or upgrades.",
    },
    {
      id: "q2",
      question: "You spend $50 on concert tickets instead of adding $50 to your car fund. What is the opportunity cost?",
      choices: [
        "Only the fun you have at the concert",
        "The next-best use of that $50 — progress toward the car fund",
        "Zero, because tickets were on sale",
        "Whatever your friends spent",
      ],
      correctIndex: 1,
      explanation:
        "Opportunity cost is the next-best alternative you gave up — here, adding $50 to the car fund.",
    },
    {
      id: "q3",
      question: "What does delayed gratification mean in personal finance?",
      choices: [
        "Never spending on anything fun",
        "Waiting for a later, goal-aligned result instead of grabbing the immediate reward",
        "Ignoring all wants forever",
        "Letting someone else control your money",
      ],
      correctIndex: 1,
      explanation:
        "Delayed gratification is purposeful waiting — not lifelong denial of every want.",
    },
    {
      id: "q4",
      question: "Why can needs and wants be a gray area?",
      choices: [
        "Because finance words have no meaning",
        "Because context matters — a basic phone plan may be needed, while the newest model may be a want",
        "Because only adults have needs",
        "Because opportunity cost does not apply to teens",
      ],
      correctIndex: 1,
      explanation:
        "The same category (like a phone) can include a functional need and a luxury upgrade want. Context matters.",
    },
    {
      id: "q5",
      question: "Which approach best shows conscious tradeoff thinking?",
      choices: [
        "Buying first and figuring out goals later",
        "Saying out loud what you are choosing instead of, then deciding",
        "Assuming sales erase opportunity cost",
        "Copying whatever friends buy",
      ],
      correctIndex: 1,
      explanation:
        "Naming what you give up makes the tradeoff conscious — the core skill of this lesson.",
    },
  ],
  reflection: {
    prompt:
      "Describe a recent purchase (or almost-purchase). Was it a need, want, or gray area? What was the opportunity cost?",
    placeholder: "Example: I almost bought a $70 hoodie. It was a want. Opportunity cost was two weeks of gas money…",
  },
};
