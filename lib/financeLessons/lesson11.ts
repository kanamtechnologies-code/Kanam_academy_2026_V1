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
  instructorScript: `**Coach's note**
Today's lesson: **Insurance: Protecting What Matters**.

**Goal:** Explain insurance as risk transfer; define premium and deductible; and apply auto, renters, and health insurance concepts at a teen-appropriate level.

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
          prompt: "Theo's family says paying car insurance premiums feels like 'wasting money' since nothing bad has happened yet this year. What's the flaw in that thinking?",
          choices: [
            "Insurance mainly exists to replace the need for an emergency fund” belongs to a different situation than the one in the question stem",
            "Insurance transfers certain large financial risks in exchange for the premium, whether or not a claim happens that year",
            "There isn't a flaw — insurance is pointless until you actually file a claim” belongs to a different situation than the one in the question stem",
            "“Premiums are refunded in full if you never file a claim” describes a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "Insurance pools risk: the premium buys protection for the whole year, similar to a fire extinguisher you hope not to need — it's not 'wasted' just because nothing went wrong, and it doesn't replace every other financial safety net.",
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
          prompt: "Camille's family pays $70 a month to keep their auto policy active, and separately owes $500 out of pocket the one time they file a claim. Which number is the deductible?",
          choices: [
            "The $70 a month, since that's the ongoing insurance cost” belongs to a different situation than the one in the question stem",
            "Neither — deductibles only apply to health insurance, not auto” belongs to a different situation than the one in the question stem",
            "The $500, since that's what they pay on the covered claim before more coverage kicks in",
            "Both numbers together count as the deductible” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "The $70 monthly cost is the premium that keeps the policy active. The $500 paid when a claim happens is the deductible — and deductibles apply across policy types, not just health.",
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
          prompt: "After a small kitchen fire in her apartment, Nina assumes her landlord's insurance will pay to replace her damaged laptop and gaming setup. Is that a safe assumption?",
          choices: [
            "“Yes — landlord policies automatically cover every tenant's personal belongings too” describes a different situation than the one in the question stem",
            "Picking “Yes, but only if the landlord agrees to file the claim on her behalf” is a common mix-up that confuses a nearby idea with the right one",
            "Some learners answer “No — renters insurance only covers traffic tickets, not belongings”, yet that does not match the precise idea from the lesson",
            "No — a landlord's policy typically covers the building, while renters insurance is what would often help with a tenant's belongings and liability",
          ],
          correctIndex: 3,
          explanation:
            "Building coverage and tenant coverage are different products. Renters policies commonly address personal property and liability, with their own limits and exclusions — the landlord's policy generally isn't built to replace a tenant's laptop.",
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
          prompt: "Marco picks the auto policy with the lowest monthly premium without checking the deductible. What risk is he taking on?",
          choices: [
            "Low premiums always come bundled with a higher policy limit” belongs to a different situation than the one in the question stem",
            "The low premium probably means the policy has no deductible at all” belongs to a different situation than the one in the question stem",
            "The low premium might come with a deductible he can't actually afford if he ever needs to file a claim",
            "None — the lowest premium is always the best overall deal” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "A cheap monthly premium paired with an unaffordable deductible can end up costing more — or leaving Marco stuck — when he actually needs to file a claim. A low premium says nothing about the deductible or limit by itself.",
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
          prompt: "After a sports injury lands him in the ER, Kai wonders which type of coverage is actually built to help with that hospital bill?",
          choices: [
            "His family's auto insurance, since it's the most comprehensive policy they have",
            "Renters insurance, since it covers unexpected personal losses",
            "Health insurance, since it's specifically designed to help share medical costs",
            "None of these — hospital bills aren't something insurance typically addresses",
          ],
          correctIndex: 2,
          explanation:
            "Health insurance is built to help share medical costs. Auto and renters insurance address very different risks (vehicles and rented living spaces), and hospital bills are exactly the kind of cost insurance is meant for.",
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
        id: "ask-before-sign",
        kicker: "Before you sign",
        title: "Insurance policy checklist — read before you pay",
        body: `Auto, renters, or health — policies are contracts. With a trusted adult, check:

• **Premium** — Monthly/annual cost.
• **Deductible** — What you pay out of pocket before coverage kicks in on a claim.
• **Coverage limits** — Maximum the policy pays per incident or year.
• **Exclusions** — What's NOT covered (floods, certain drivers, roommates' stuff)?
• **Liability limits** — If you hurt someone or damage property, how much protection?
• **Discounts** — Good student, bundling, safety courses — real or marketing?
• **Claim process** — How do you report? Photos needed?

Cheapest premium isn't always cheapest **total risk** if deductible is crushing.`,
        callout: {
          label: "Watch out",
          text: "Skipping renters insurance to save $12/month can mean replacing $2,000 of stuff alone after one bad leak.",
        },
      },
      {
        id: "worked-tradeoff",
        kicker: "Tradeoff table",
        title: "Auto policy A vs B — premium vs deductible",
        body: `**Policy A:** Premium **$140/month**, deductible **$250**.
**Policy B:** Premium **$95/month**, deductible **$1,000**.

**If no claims:** B saves $45/month × 12 = **$540/year** — looks like a win.

**If one $3,000 fender-bender:**
• A: You pay **$250**, insurer covers rest (simplified).
• B: You pay **$1,000** out of pocket.

**Net after one accident:** B's year savings ($540) minus extra $750 deductible = **$210 worse off** than A with one claim.

Low premium + high deductible is a bet you won't need the coverage. Sometimes that's fine; sometimes it's a trap for tight cash buffers.`,
        bullets: [
          "**Premium** = price of the policy.",
          "**Deductible** = your share when something happens.",
          "Match deductible to an emergency fund you actually have.",
        ],
      },
      {
        id: "second-scenario",
        kicker: "Renters lens",
        title: "First apartment — what renters insurance actually covers",
        body: `Deja signs a lease with three roommates. Landlord's insurance covers the **building**, not Deja's laptop (**$900**), bike (**$400**), or clothes if there's a break-in or fire.

**Renters policy (~$15/month illustrative):** May cover personal property, temporary housing if unit is unlivable, liability if someone trips in her room.

**Without it:** Replacing $1,300 of stuff from savings she planned for car costs.

**Tradeoff:** $180/year premium vs. risking a four-figure loss. Not mandatory everywhere — but a deliberate choice, not an accident of ignorance.`,
        checkIn: {
          prompt: "Your roommate's flood damages your $600 console and $200 textbooks. Landlord fixes the floor. Who typically replaces your stuff?",
          choices: [
            "Landlord's building policy automatically covers all tenants' belongings",
            "Your renters policy (if you bought one) or you pay out of pocket",
            "The roommate always pays 100% regardless of fault",
            "College financial aid replaces electronics",
          ],
          correctIndex: 1,
          explanation:
            "Building insurance covers structure, not personal property. Renters insurance or personal funds cover your belongings.",
        },
      },
      {
        id: "behavioral-trap-2",
        kicker: "Watch your brain",
        title: "Skipping coverage to \"save\" — the penny-wise trap",
        body: `Dropping renters or driving uninsured (illegal in most places) frees cash **this month** but moves catastrophic risk to **future you**.

**Behavioral pattern:** Low-probability events feel impossible until they're not. One stolen backpack + laptop can erase months of sinking-fund work.

**Healthier move:** Price the **worst realistic case** — could you cover it from emergency fund? If not, insurance or higher savings is the rational trade.`,
        callout: {
          label: "Why it matters",
          text: "Insurance doesn't make life risk-free — it caps how big one bad day can hit your goals.",
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
            "Trust that a social media summary of 'what insurance covers' is close enough to reading the real policy",
            "Cancel liability coverage to lower the monthly cost, since it rarely gets used",
            "Wait until after an accident or move-in to figure out what's actually covered",
            "Ask what coverage you're on, what to do after an incident, and what deductibles or limits apply",
          ],
          correctIndex: 3,
          explanation:
            "Knowing coverage, contacts, and costs before a crisis is the core Coverage Checker skill — figuring it out afterward, skipping liability, or trusting a social post over the real policy all leave you exposed.",
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
      question: "Jasmine wonders why her family still pays for car insurance in years when nothing goes wrong. What is insurance mainly doing in those quiet years?",
      choices: [
            "A rushed pass can land on replacing the need for an emergency fund entirely”; careful readers reject it for this problem",
            "Transferring the financial risk of a possible large loss in exchange for the premium, even if it's never used that year",
            "Guaranteeing that nothing bad will ever happen to the family's car” belongs to a different situation than the one in the question stem",
            "Building up a refund that gets paid back at the end of every claim-free year” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "Insurance pools risk: the premium buys protection for the whole year whether or not it's used, like a fire extinguisher. Premiums generally aren't refunded for a claim-free year, and insurance doesn't replace every other safety net.",
    },
    {
      id: "q2",
      question: "On Deja's family policy, they pay $65 every month to keep it active, and $500 the one time they file a claim. Which term describes the $500?",
      choices: [
        "The premium",
        "The policy limit",
        "An exclusion",
        "The deductible",
      ],
      correctIndex: 3,
      explanation:
        "The $65 monthly cost is the premium. The $500 paid on the covered claim, before the insurer pays more, is the deductible — not the maximum payout (limit) or something excluded from coverage.",
    },
    {
      id: "q3",
      question: "Why might choosing a much higher deductible lower your premium — and when is that a bad idea?",
      choices: [
            "“Raising the deductible has no real effect on the premium” describes a different situation than the one in the question stem",
            "Insurers generally don't allow teen drivers to choose a high deductible” belongs to a different situation than the one in the question stem",
            "It can lower the premium, but it's a bad fit if you couldn't actually afford to pay that deductible after a loss",
            "Higher deductibles always save money with no real downside” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Trading a higher deductible for a lower premium only works if you can actually fund the deductible when needed — otherwise the 'savings' backfire the moment you file a claim.",
    },
    {
      id: "q4",
      question: "A landlord's insurance typically covers the building. What might renters insurance help with for a tenant?",
      choices: [
            "Unlimited cash for any loss with no deductible at all” belongs to a different situation than the one in the question stem",
            "Only the landlord's mortgage payments” belongs to a different situation than the one in the question stem",
            "Often the tenant's belongings and liability — depending on the policy",
            "Traffic tickets received while driving” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Building coverage and tenant coverage are different products. Renters policies commonly address personal property and liability, with limits and exclusions — not unlimited payouts or unrelated costs like traffic tickets.",
    },
    {
      id: "q5",
      question: "Before Malia gets her license, which habit fits the Coverage Checker mindset best?",
      choices: [
            "Wait until after her first accident to learn what the family policy actually covers” belongs to a different situation than the one in the question stem",
            "Skip asking questions since her parents handle all of that automatically” belongs to a different situation than the one in the question stem",
            "Ask what coverage she's on, what to do after an incident, and what the deductible and limits are",
            "Assume coverage details a friend mentioned online apply the same way to her family's policy",
          ],
      correctIndex: 2,
      explanation:
        "Knowing coverage, contacts, and costs before a crisis is the core Coverage Checker skill — figuring it out after an accident, borrowing a friend's assumptions, or never asking all leave her guessing when it matters most.",
    },
    {
      id: "q6",
      question: "In the two-policy worked example, why did Policy B end up cheaper overall in a year with one claim, despite its higher monthly premium?",
      choices: [
            "Because Policy B had no deductible at all” belongs to a different situation than the one in the question stem",
            "Because insurers always favor whichever policy costs more per month",
            "Because its lower deductible outweighed the higher premium once a claim hit",
            "Because the higher premium automatically means better coverage every year",
          ],
      correctIndex: 2,
      explanation:
        "Total yearly cost is premiums plus any deductible paid. A lower deductible can offset a higher premium when a claim happens — Policy B still had a deductible, just a smaller one.",
    },
    {
      id: "q7",
      question: "When comparing insurance quotes, which set of fields should you line up side by side — not just the monthly price?",
      choices: [
            "Only the phone number listed for filing a claim” belongs to a different situation than the one in the question stem",
            "Coverage types, deductible, policy limits, exclusions, and premium",
            "Just how quickly the sales rep responds to texts” belongs to a different situation than the one in the question stem",
            "Only the insurer's advertising slogan and logo design” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "A true comparison lines up what's covered, what you'd pay out of pocket, the maximum payout, what's excluded, and the price together — not surface details like branding or response speed.",
    },
    {
      id: "q8",
      question: "In Deja's case study, why did filing a claim make sense for her fender bender?",
      choices: [
            "Because any accident should always be reported regardless of the repair cost” belongs to a different situation than the one in the question stem",
            "“Because her policy happened to have no deductible that year” describes a different situation than the one in the question stem",
            "Because the repair estimate was well above her deductible, so the insurer would cover a meaningful remaining amount",
            "“Because she wanted her monthly premium to increase” describes a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Comparing the repair cost to the deductible showed that filing left the insurer covering a meaningful remaining amount — a reasonable use of the coverage, not a blanket rule to always report or a wish to raise premiums.",
    },
  ],
  reflection: {
    prompt:
      "Pick auto, renters, or health. Write three questions you would ask a parent, guardian, or school nurse to understand premium, deductible, and what to do after a claim.",
    placeholder:
      "Example: Auto — Am I on the family policy? What's our deductible if I crash? Who do I call first after an accident?",
  },
};
