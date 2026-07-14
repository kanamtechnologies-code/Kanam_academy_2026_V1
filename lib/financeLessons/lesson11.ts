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
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-11.png",
        imageAlt: "Young driver with a learner permit folder and car insurance brochure on a kitchen table",
        body: `Insurance is not exciting — and that's the point. It exists so one bad day doesn't wipe out years of progress. Today you'll learn how coverage works in plain English.\n\nHere's our roadmap:\n\n• **A quick story** — one fender-bender, two very different outcomes.\n• **Risk transfer, premiums/deductibles, and coverage types** — the three ideas that build on each other.\n• **A worked example** — comparing two policies with real numbers.\n• **A myth to bust** — "cheapest" and "best" aren't the same word.\n• **A deeper skill** — how to actually compare quotes.\n• **A case study and self-check** — before you hit the knowledge check.\n\nYou'll think like a Coverage Checker: calm questions, no panic shopping after a crisis.`,
        callout: {
          label: "Why it matters",
          text: "A fender-bender, stolen laptop, or ER visit can dwarf a teen budget. Understanding coverage helps you ask better questions — and avoid buying useless add-ons.",
        },
      },
      {
        id: "hook-story",
        kicker: "A quick story",
        title: "One fender-bender, two outcomes",
        body: `Two new drivers, Theo and Camille, both tap the car in front of them at a stoplight — minor damage, nobody hurt. Theo's family had let their auto policy lapse for a month to "save money." Camille's family kept theirs current.\n\nCamille's family calls their insurer, pays a deductible, and the claim moves forward within days. Theo's family faces the full repair cost out of pocket, plus potential legal and licensing headaches for driving without required coverage — a much bigger, messier bill than the "savings" from skipping a premium.\n\nSame fender-bender. Wildly different Tuesday.`,
        callout: {
          label: "Notice",
          text: "Insurance is one of the few things that only 'pays off' when something goes wrong — which is exactly why it's tempting to skip and exactly why skipping it is risky.",
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
        id: "concept-1",
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
        checkIn: {
          prompt: "What does insurance mainly do financially?",
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
      },
      {
        id: "concept-2",
        kicker: "The tradeoff",
        title: "Premiums and deductibles: the dial you can turn",
        image: "/images/lessons/fl-11-2.png",
        imageAlt: "Infographic explaining Premium you pay regularly and Deductible you pay if you file a claim",
        body: `Two numbers shape most policies:\n\n• **Premium** — paid monthly/periodically to keep the policy on.\n• **Deductible** — paid by you when a covered claim happens (often per incident).\n\nCommon tradeoff: a **higher deductible** often means a **lower premium**, and vice versa. That only works if you can actually afford the deductible when something goes wrong — otherwise the "cheap" policy fails when you need it.\n\nCoverage Checker move: compare total cost of ownership (premiums over a year + realistic deductible), not just the monthly sticker.`,
        callout: {
          label: "Common misconception",
          text: "\"The lowest premium is always the best deal.\" Not if the deductible is impossible or the coverage is too thin.",
        },
        checkIn: {
          prompt: "How is a deductible different from a premium?",
          choices: [
            "They are two names for the same monthly fee",
            "A premium keeps the policy active; a deductible is what you pay on a covered claim before more coverage kicks in",
            "A deductible is only paid by people without insurance",
            "Premiums only apply to auto; deductibles only apply to health",
          ],
          correctIndex: 1,
          explanation:
            "Premiums are ongoing costs of coverage. Deductibles apply when you use coverage for a claim.",
        },
      },
      {
        id: "concept-3",
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
        checkIn: {
          prompt: "A landlord's insurance typically covers the building. What might renters insurance help with for a tenant?",
          choices: [
            "Only the landlord's mortgage payments",
            "Often the tenant's belongings and liability — depending on the policy",
            "Unlimited cash for any loss with no deductible",
            "Traffic tickets received while driving",
          ],
          correctIndex: 1,
          explanation:
            "Building coverage and tenant coverage are different. Renters policies commonly address personal property and liability, with limits and exclusions.",
        },
      },
      {
        id: "worked-example",
        kicker: "Show the math",
        title: "Worked example: comparing two auto policies",
        body: `Rounded, illustrative numbers — actual quotes vary by driver, location, and insurer:\n\n**Policy A:** $60/month premium, $1,000 deductible. Over a year: 12 × $60 = **$720** in premiums.\n\n**Policy B:** $90/month premium, $250 deductible. Over a year: 12 × $90 = **$1,080** in premiums.\n\nNow imagine one covered claim during the year (say, a repair the insurer approves):\n\n• With Policy A, you pay premiums ($720) **plus** your $1,000 deductible = **$1,720** total that year.\n• With Policy B, you pay premiums ($1,080) **plus** your $250 deductible = **$1,330** total that year.\n\nIn this specific scenario — one claim in the year — Policy B ends up cheaper overall, even though its premium looked higher every month. If **no** claim happens that year, Policy A would have been cheaper. The "right" choice depends on what you can afford if something *does* happen, not just the sticker price.`,
        bullets: [
          "Policy A, one claim: $720 premiums + $1,000 deductible = $1,720.",
          "Policy B, one claim: $1,080 premiums + $250 deductible = $1,330.",
          "Policy A, zero claims: just $720 — cheaper than B with zero claims.",
        ],
        callout: {
          label: "Reality check",
          text: "You can't predict whether you'll file a claim. Choose the deductible you could actually afford in a bad month — not just the lowest monthly number.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "Common myth: \"The cheapest policy is always the best deal\"",
        body: `Two myths worth retiring:\n\n**Myth 1: "Lowest premium = best policy."** As the worked example showed, a low premium paired with a deductible you can't actually afford can cost more overall — or leave you unable to pay when a claim happens.\n\n**Myth 2: "If I'm covered, nothing bad can really happen to me financially."** Coverage has limits, exclusions, and deductibles. "Insured" doesn't mean "immune" — it means the worst-case financial hit is smaller and shared, not zero.\n\nThe fix: read what's actually covered, compare realistic total costs (not just monthly price), and make sure the deductible fits your real budget.`,
        checkIn: {
          prompt: "Why might choosing the policy with the lowest premium not always be the smartest choice?",
          choices: [
            "Because low premiums are illegal for insurers to offer",
            "Because a low premium can come with a deductible you can't actually afford if a claim happens",
            "Because low premiums always mean unlimited coverage",
            "Because premiums never affect your total yearly cost",
          ],
          correctIndex: 1,
          explanation:
            "A cheap monthly premium paired with an unaffordable deductible can end up costing more — or leaving you stuck — when you actually need to file a claim.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Walk through a claim in your head",
        body: `Quick scenario — think it through step by step:\n\nYou're driving (with permission, on a family policy) and you back into a mailbox, denting the bumper. No one is hurt. Repair estimate: $600. Your policy's collision deductible is $500.\n\n**What happens next, roughly?** You'd report the incident to the insurer, they'd evaluate the claim, and if approved, you'd typically pay the $500 deductible while the insurer covers the remaining $100 of the approved repair cost (numbers and process vary by policy and insurer).\n\nNow ask yourself: is a $600 repair even worth filing a claim for, given a $500 deductible and the possibility that filing could affect future premiums? Sometimes paying small claims yourself is the smarter move — which is exactly the kind of judgment call a Coverage Checker learns to make.`,
        callout: {
          label: "Try this now",
          text: "Next time you hear about a small property claim in a show or a real story, pause and estimate: would filing make sense given a typical deductible?",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "How to actually compare insurance quotes",
        image: "/images/lessons/fl-11-4.png",
        imageAlt: "Notebook checklist for comparing insurance quotes: coverage, deductible, limits, exclusions, realistic photo",
        body: `When your family compares quotes (or when you do it yourself as an adult later), match these fields side by side instead of just glancing at the monthly price:\n\n1. **Coverage types included** — liability, collision, comprehensive, etc. (or their equivalents for other insurance types).\n2. **Deductible** for each type of claim — sometimes it differs by coverage.\n3. **Policy limits** — the maximum payout per incident and per policy period.\n4. **Exclusions** — what's explicitly *not* covered.\n5. **Premium**, and how often it's billed (monthly vs. six-month vs. annual).\n\nTwo quotes with the same premium can offer very different protection once you line these five fields up. That comparison — not brand loyalty or a flashy ad — is the actual skill.`,
        bullets: [
          "Line up coverage, deductible, limits, exclusions, and premium — in that order.",
          "A cheaper quote with thinner coverage isn't automatically a better deal.",
          "Ask directly: 'What would NOT be covered in a typical claim?'",
        ],
        callout: {
          label: "Watch out",
          text: "Auto-renewing without re-checking these five fields means you might be paying for outdated coverage — or missing new discounts.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Auto vs. renters vs. health — what each one really protects",
        body: `Quick side-by-side of what these three common coverage types are built for:\n\n• **Auto:** Protects against costs from crashes — liability for others you injure/damage, and often your own vehicle depending on the policy. Matters the moment you're behind the wheel.\n• **Renters:** Protects your personal belongings (theft, fire, etc., depending on policy) and often liability if someone is hurt in your rented space. Matters once you move into your own place.\n• **Health:** Helps share the cost of medical care — checkups, emergencies, prescriptions. Matters your whole life, and many teens are covered under a parent's plan already.\n\nEach type answers a different "what if" — which is why Coverage Checkers ask what specific risk a policy is meant to cover before assuming it protects something else.`,
        checkIn: {
          prompt: "Which coverage type is specifically built to help with the cost of a doctor visit or hospital stay?",
          choices: [
            "Auto insurance",
            "Renters insurance",
            "Health insurance",
            "None of these cover medical costs",
          ],
          correctIndex: 2,
          explanation:
            "Health insurance is designed to help share medical costs. Auto and renters insurance address very different risks (vehicles and rented living spaces).",
        },
      },
      {
        id: "behavioral-trap",
        kicker: "Watch your brain",
        title: "The behavioral trap: skipping coverage to save now",
        body: `It's tempting to let a policy lapse, skip a renewal, or choose the bare legal minimum to save money this month — the cost feels real today, while the risk of a crash or theft feels abstract and unlikely. That's **present bias**: overweighting today's small, certain cost against tomorrow's larger, uncertain one.\n\nA related trap is under-filing: avoiding a legitimate claim out of fear it will raise your premium, even when the loss is genuinely large. Sometimes that's the right call for small claims (see the earlier "try it" scenario) — but avoiding *all* claims out of anxiety defeats the purpose of having coverage at all.\n\nThe fix isn't fear — it's asking a trusted adult or the insurer directly: "What would happen in [specific scenario]?" before assuming the worst or ignoring the risk entirely.`,
        callout: {
          label: "Reality check",
          text: "Required coverage (like state-mandated auto liability limits) generally isn't optional — skipping it can mean legal and financial consequences beyond the original risk.",
        },
      },
      {
        id: "habits",
        kicker: "Make it real",
        title: "Using insurance wisely (and ethically)",
        body: `Good Coverage Checker habits:\n\n• Keep policy docs and emergency contacts where you can find them.\n• Report honest claims promptly; fraud raises costs for everyone.\n• After a crash: safety first, document facts, don't invent stories.\n• Review coverage when life changes (new car, moving out after graduation, job with benefits).\n• Pair insurance with prevention: seatbelts, locks, backups of important files.\n\nInsurance is a tool in a larger risk plan — alongside emergency funds and careful decisions.`,
        callout: {
          label: "Reality check",
          text: "Filing tiny claims can sometimes raise future premiums. Ask whether paying a small loss yourself is smarter — depends on the situation.",
        },
      },
      {
        id: "standards-connect",
        kicker: "Why this counts",
        title: "How this connects to national standards",
        body: `This lesson lines up with the **Jump$tart Coalition** and **Council for Economic Education (CEE) 2021 National Standards for Personal Financial Literacy** — specifically the **Managing Risk** strand: understanding insurance as risk transfer, comparing premium and deductible tradeoffs, and recognizing how auto, renters, and health coverage apply to everyday situations.\n\nThese concepts are foundational whether you're a passenger today or signing your own policy in a few years — the vocabulary and comparison skills transfer directly.`,
        callout: {
          label: "Standards note",
          text: "This is general education about how insurance works, not a recommendation for any specific insurer or policy.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on…",
        body: `Take thirty seconds to answer honestly:\n\n**Do you know what type of coverage is on the car you ride in most, or the place you live? If not, who's the one person you could ask this week?**\n\nThere's no wrong answer — the goal is identifying the actual next step, not having every answer memorized already.`,
        callout: {
          label: "No wrong answers",
          text: "You'll revisit a version of this question in the reflection at the end of the lesson — this is just the warm-up.",
        },
      },
      {
        id: "mini-case",
        kicker: "Case study",
        title: "Deja's fender bender",
        image: "/images/lessons/fl-11-5.png",
        imageAlt: "Teen driver on the phone documenting a minor car accident with a notebook and phone, realistic daytime photo",
        body: `Deja, a new driver, taps another car at a stop sign — minor bumper damage on both cars, no injuries. Before panicking, she remembers the Coverage Checker basics: she and the other driver exchange information, she takes photos, and she calls the family's insurer that evening (not from the side of the road, once things are calm and safe).\n\nThe insurer confirms her family's policy has a $500 deductible on collision coverage, and the repair estimate comes back around $1,400. Because the estimate is well above the deductible, filing the claim makes sense — she pays the $500, and the policy covers the rest of the approved amount.\n\nWhat helped: knowing the deductible *before* the incident, documenting facts calmly, and comparing the repair cost to the deductible before deciding whether filing was worth it.`,
        callout: {
          label: "Try this",
          text: "Ask whoever manages your household's auto policy what the deductible actually is. Most teens have never been told this number.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Self-check",
        title: "Before the knowledge check…",
        body: `Quick gut-check on the whole lesson: insurance transfers big financial risks for a premium; premiums and deductibles trade off against each other; auto, renters, and health protect different risks; and comparing real coverage fields beats chasing the lowest sticker price.\n\nAnswer the check-in below, then head into the full knowledge check.`,
        checkIn: {
          prompt: "Which Coverage Checker habit is smartest before you drive or move out after graduation?",
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
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• Insurance **transfers** big financial risks for a premium.\n• **Deductibles** and **limits** shape what you still pay — compare total cost, not just the monthly price.\n• Auto, renters, and health each protect different teenage-relevant risks.\n• Ask clear questions before you need a claim.\n\nTake the **Knowledge check**, then reflect on one coverage question you'll ask at home.`,
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
    { term: "Exclusion", definition: "A specific event or item a policy explicitly does not cover." },
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
    {
      id: "q6",
      question: "In the two-policy worked example, why did Policy B end up cheaper overall in a year with one claim, despite its higher monthly premium?",
      choices: [
        "Because Policy B had no deductible at all",
        "Because its much lower deductible outweighed the higher premium once a claim actually happened",
        "Because Policy A was illegal to purchase",
        "Because insurers always favor the more expensive policy",
      ],
      correctIndex: 1,
      explanation:
        "Total yearly cost depends on premiums plus any deductible paid. A lower deductible can offset a higher premium once a claim occurs.",
    },
    {
      id: "q7",
      question: "When comparing insurance quotes, which set of fields should you line up side by side — not just the monthly price?",
      choices: [
        "Only the insurer's logo and advertising slogan",
        "Coverage types, deductible, policy limits, exclusions, and premium",
        "Just the color of the insurance card",
        "Only the phone number for claims",
      ],
      correctIndex: 1,
      explanation:
        "A true comparison lines up what's covered, what you'd pay out of pocket, the maximum payout, what's excluded, and the price — together.",
    },
    {
      id: "q8",
      question: "In Deja's case study, why did filing a claim make sense for her fender bender?",
      choices: [
        "Because any accident should always be reported regardless of cost",
        "Because the repair estimate was well above her deductible, so the insurer would cover the difference",
        "Because she wanted her premium to go up",
        "Because she had no deductible at all",
      ],
      correctIndex: 1,
      explanation:
        "Comparing the repair cost to the deductible showed that filing left the insurer covering a meaningful remaining amount — a reasonable use of the coverage.",
    },
  ],
  reflection: {
    prompt:
      "Pick auto, renters, or health. Write three questions you would ask a parent, guardian, or school nurse to understand premium, deductible, and what to do after a claim.",
    placeholder:
      "Example: Auto — Am I on the family policy? What's our deductible if I crash? Who do I call first after an accident?",
  },
};
