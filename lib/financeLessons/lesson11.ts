import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson11: AILessonConfig = {
  id: "fl-11",
  title: "11. Insurance: Protecting What Matters",
  goal: "Explain insurance as risk transfer; define premium and deductible; and apply auto, renters, and health insurance concepts at a teen-appropriate level.",
  xpReward: 550,
  badge: "Coverage Checker",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/10",
  nextHref: "/learn/finance/12",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-11.png",
        imageAlt: "Young driver with a learner permit folder and car insurance brochure on a kitchen table",
        body: `Insurance is not exciting — and that's the point. It exists so one bad day doesn't wipe out years of progress. Today you'll learn how coverage works in plain English.\n\nHere's our roadmap:\n\n• **Risk transfer** — paying a known cost to avoid a rare, huge cost.\n• **Premium vs deductible** — what you pay regularly vs when you claim.\n• **Auto basics** — why young drivers need coverage.\n• **Renters concepts** — protecting your stuff and liability in a first apartment (future awareness).\n• **Health concepts** — sharing medical costs thoughtfully.\n• **Teen decisions** — what to ask parents/guardians before you need a claim.\n\nYou'll think like a Coverage Checker: calm questions, no panic shopping after a crisis.`,
        callout: {
          label: "Why it matters",
          text: "A fender-bender, stolen laptop, or ER visit can dwarf a teen budget. Understanding coverage helps you ask better questions — and avoid buying useless add-ons.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Insurance vocabulary you'll actually use",
        body: `• **Insurance** — a contract where you pay to transfer certain financial risks to an insurer.\n• **Premium** — the regular price you pay to keep coverage active.\n• **Deductible** — what you pay out of pocket on a covered claim before insurance pays more.\n• **Coverage / policy limit** — the maximum the policy will pay for covered events.\n• **Claim** — a request for the insurer to pay for a covered loss.\n• **Liability** — responsibility for damage or injury you cause to others.\n• **Risk transfer** — trading a small, predictable cost for protection against a large, uncertain loss.\n\nHold these — every policy type uses the same skeleton.`,
        callout: {
          label: "Pro tip",
          text: "When confused, ask: What events are covered? What's my deductible? What's the max payout? What's excluded?",
        },
      },
      {
        id: "risk-transfer",
        kicker: "The big idea",
        title: "Insurance transfers risk — it doesn't make life risk-free",
        body: `You face risks every day: your phone drops, a car dents, someone gets sick. Some losses you can **self-insure** (pay from savings). Some losses are so large they'd wreck your finances — that's where insurance shines.\n\n**Risk transfer** means: many people pay premiums into a pool; the few who have covered losses get help from that pool. You hope not to "use" it — like a fire extinguisher.\n\nInsurance does **not** prevent accidents or guarantee you'll never pay anything. It shares financial pain under rules written in the policy.`,
        bullets: [
          "Insure risks that could be financially devastating.",
          "Don't confuse 'covered' with 'free' — deductibles and limits apply.",
          "Read exclusions: floods, certain valuables, or racing may need special handling.",
        ],
        callout: {
          label: "Watch out",
          text: "Buying tiny 'protection plans' for low-cost items while skipping major coverage (like liability) is often backwards priorities.",
        },
      },
      {
        id: "premium-deductible",
        kicker: "The tradeoff",
        title: "Premiums and deductibles: the dial you can turn",
        image: "/images/lessons/fl-11-2.png",
        imageAlt: "Infographic explaining Premium you pay regularly and Deductible you pay if you file a claim",
        body: `Two numbers shape most policies:\n\n• **Premium** — paid monthly/periodically to keep the policy on.\n• **Deductible** — paid by you when a covered claim happens (often per incident).\n\nCommon tradeoff: a **higher deductible** often means a **lower premium**, and vice versa. That only works if you can actually afford the deductible when something goes wrong — otherwise the "cheap" policy fails when you need it.\n\nCoverage Checker move: compare total cost of ownership (premiums over a year + realistic deductible), not just the monthly sticker.`,
        callout: {
          label: "Common misconception",
          text: "\"The lowest premium is always the best deal.\" Not if the deductible is impossible or the coverage is too thin.",
        },
      },
      {
        id: "auto-renters-health",
        kicker: "Teen-relevant types",
        title: "Auto, renters, and health — concepts that show up early",
        image: "/images/lessons/fl-11-3.png",
        imageAlt: "Three photo cards: car keys, apartment keys, health card — types of insurance teens should know",
        body: `**Auto:** If you drive (or are on a family policy), liability coverage helps if you injure someone or damage their property. Other parts may cover your car after a crash or theft, depending on the policy. Driving without required coverage can mean legal and financial disaster — and teen drivers often face higher premiums.\n\n**Renters (future awareness):** After graduation, if you rent your first apartment or share housing, renters insurance can help with personal belongings after covered events (theft/fire, depending on policy) and often includes liability if someone is hurt in your space. A landlord's policy usually covers the *building*, not your laptop or gaming setup.\n\n**Health:** Helps share medical costs. Key teen ideas: staying on a parent's plan when eligible, knowing what a deductible/copay means, and using in-network care when required. Exact rules vary — ask trusted adults and read plan summaries.\n\n**Check what you already have before buying more:** Your **school or college** may **require or offer student health coverage** — read what is included. A **first job** may offer **limited benefits** (or none at first). Coverage Checker move: list existing family, school, or job coverage **before** you pay for duplicate plans you do not need.\n\nThis is conceptual awareness, not a shopping recommendation.`,
        bullets: [
          "Auto: liability protects others you might harm — critical for young drivers.",
          "Renters: your stuff + liability ≠ landlord building coverage.",
          "Health: know network rules and what you pay at the visit.",
        ],
        callout: {
          label: "Try this week",
          text: "Ask a parent/guardian one Coverage Checker question: What insurance am I on, and what should I do after an accident or theft?",
        },
      },
      {
        id: "smart-use",
        kicker: "Make it real",
        title: "Using insurance wisely (and ethically)",
        body: `Good Coverage Checker habits:\n\n• Keep policy docs and emergency contacts where you can find them.\n• Report honest claims promptly; fraud raises costs for everyone.\n• After a crash: safety first, document facts, don't invent stories.\n• Review coverage when life changes (new car, moving out after graduation, job with benefits).\n• Pair insurance with prevention: seatbelts, locks, backups of important files.\n\nInsurance is a tool in a larger risk plan — alongside emergency funds and careful decisions.`,
        callout: {
          label: "Reality check",
          text: "Filing tiny claims can sometimes raise future premiums. Ask whether paying a small loss yourself is smarter — depends on the situation.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• Insurance **transfers** big financial risks for a premium.\n• **Deductibles** and **limits** shape what you still pay.\n• Auto, renters, and health each protect different teenage-relevant risks.\n• Ask clear questions before you need a claim.\n\nTake the **Knowledge check**, then reflect on one coverage question you'll ask at home.`,
      },
    ],
  },
  bigIdeas: [
    "Insurance is **risk transfer**: a predictable premium to help with rare, large losses.",
    "**Premiums**, **deductibles**, and **limits** determine what you pay before and after a claim.",
    "Auto, renters, and health concepts show up early in adult life — learn the questions before the crisis.",
  ],
  keyTerms: [
    { term: "Premium", definition: "The regular payment to keep an insurance policy active." },
    { term: "Deductible", definition: "Amount you pay on a covered claim before insurance pays more." },
    { term: "Liability", definition: "Legal/financial responsibility for harm you cause to others." },
    { term: "Claim", definition: "A request that the insurer pay for a covered loss." },
    { term: "Policy limit", definition: "The maximum amount a policy will pay for covered events." },
    { term: "Risk transfer", definition: "Shifting financial risk of big losses to an insurer via a contract." },
    { term: "Renters insurance", definition: "Coverage that can protect personal belongings and liability for someone renting or sharing housing (policy details vary)." },
  ],
  realWorld:
    "You get your license and join the family auto policy. A month later you rear-end someone at a stoplight. Liability coverage may help with the other driver's repair costs — while you'd still owe your deductible for your own car.",
  quiz: [
    {
      id: "q1",
      question: "What does insurance mainly do financially?",
      choices: [
        "Guarantee nothing bad will ever happen",
        "Transfer certain large financial risks in exchange for premiums",
        "Replace the need for an emergency fund in every case",
        "Make all medical care free with no rules",
      ],
      correctIndex: 1,
      explanation:
        "Insurance pools risk: you pay premiums so covered large losses can be shared — it doesn't erase risk or rules.",
    },
    {
      id: "q2",
      question: "How is a deductible different from a premium?",
      choices: [
        "They are two names for the same monthly fee",
        "A premium keeps the policy active; a deductible is what you pay on a covered claim before more coverage kicks in",
        "A deductible is only paid by people without insurance",
        "Premiums only apply to auto; deductibles only apply to health",
      ],
      correctIndex: 1,
      explanation:
        "Premiums are ongoing costs of coverage. Deductibles apply when you use coverage for a claim (policy rules vary).",
    },
    {
      id: "q3",
      question: "Why might choosing a much higher deductible lower your premium — and when is that a bad idea?",
      choices: [
        "Higher deductibles always save money with no downside",
        "It can lower premiums, but it's a bad fit if you couldn't afford to pay that deductible after a loss",
        "Insurers ban high deductibles for teens",
        "Deductibles never affect premiums",
      ],
      correctIndex: 1,
      explanation:
        "Trading a higher deductible for a lower premium only works if you can actually fund the deductible when needed.",
    },
    {
      id: "q4",
      question: "A landlord's insurance typically covers the building. What might renters insurance help with for a tenant?",
      choices: [
        "Only the landlord's mortgage",
        "Often the tenant's belongings and liability — depending on the policy",
        "Unlimited cash for any loss with no deductible",
        "Traffic tickets",
      ],
      correctIndex: 1,
      explanation:
        "Building coverage and tenant coverage are different. Renters policies commonly address personal property and liability, with limits and exclusions.",
    },
    {
      id: "q5",
      question: "Which Coverage Checker habit is smartest before you drive or move out after graduation?",
      choices: [
        "Ignore policies until after an accident",
        "Ask what coverage you're on, what to do after an incident, and what deductibles/limits apply",
        "Assume social media tips replace reading a policy summary",
        "Cancel liability coverage to save money",
      ],
      correctIndex: 1,
      explanation:
        "Knowing coverage, contacts, and costs before a crisis is the core Coverage Checker skill.",
    },
  ],
  reflection: {
    prompt:
      "Pick auto, renters, or health. Write three questions you would ask a parent, guardian, or school nurse to understand premium, deductible, and what to do after a claim.",
    placeholder:
      "Example: Auto — Am I on the family policy? What's our deductible if I crash? Who do I call first after an accident?",
  },
};
