import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson14: AILessonConfig = {
  id: "fl-14",
  title: "14. College Costs, Aid & Loans",
  goal: "Distinguish sticker price from net price, compare grants vs loans, build FAFSA awareness, and practice comparing financial aid offers carefully.",
  xpReward: 700,
  badge: "Aid Navigator",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/13",
  nextHref: "/learn/finance/15",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-14.png",
        imageAlt: "High school senior comparing college offer letters and net price on a laptop with a family member",
        body: `College marketing loves big campus photos. Aid Navigators look at **numbers**: what it costs *you*, what doesn't need repayment, and what becomes debt.\n\nHere's our roadmap:\n\n• **Sticker vs net price** — the real bill after aid.\n• **Grants vs scholarships vs loans** — gift aid vs borrowed money.\n• **FAFSA awareness** — why it matters and what it unlocks conceptually.\n• **Comparing offers** — beyond the brand name.\n• **Loan caution** — borrowing is a claim on future you.\n• **Non-college paths** — tradeoffs still deserve the same math.\n\nNo school-rank hype — just clear money thinking for senior year and beyond.`,
        callout: {
          label: "Why it matters",
          text: "Two schools with similar sticker prices can differ by thousands in net cost. Comparing offers carefully can change your debt for years.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "College money words that matter",
        body: `• **Sticker price / published cost** — the listed tuition/fees (and often room/board) before aid.\n• **Net price** — what you pay after grants/scholarships (estimations vary; read the offer).\n• **Grant** — aid you typically don't repay (need-based and other types exist).\n• **Scholarship** — gift aid often tied to merit, talent, identity, or other criteria.\n• **Student loan** — borrowed money that must be repaid with interest under loan terms.\n• **FAFSA** — a free federal application used to determine eligibility for many aid types (requirements evolve).\n• **Work-study** — need-based program that may offer certain campus jobs (availability varies).\n• **COA (cost of attendance)** — an estimate including tuition plus living and other costs.\n\nYou'll use these to decode offer letters.`,
        callout: {
          label: "Pro tip",
          text: "When you see a big award number, ask: Is this a grant/scholarship or a loan? Renewable each year?",
        },
      },
      {
        id: "sticker-net",
        kicker: "The big idea",
        title: "Sticker price vs net price",
        image: "/images/lessons/fl-14-2.png",
        imageAlt: "Infographic: Sticker price crossed down to Net price after grants and scholarships",
        body: `The **sticker price** is what brochures shout. The **net price** is closer to what your family may actually pay after gift aid.\n\nExample shape (illustrative only):\n• Sticker: $40,000\n• Grants/scholarships: $18,000\n• Net toward that package: $22,000 — before loans you might choose to borrow\n\nNet price calculators on school sites are estimates. Official aid offers matter more. Also watch **living costs**, travel, fees, and whether aid is one-year-only.\n\nAid Navigator move: compare **net costs and debt**, not logos.`,
        bullets: [
          "Sticker ≠ what you pay.",
          "Gift aid lowers net price; loans don't erase cost — they delay it.",
          "Multi-year renewability can change the true deal.",
        ],
        callout: {
          label: "Watch out",
          text: "A huge 'award' that is mostly loans is debt with marketing makeup.",
        },
      },
      {
        id: "grants-loans-fafsa",
        kicker: "Aid types",
        title: "Grants, loans, and FAFSA awareness",
        body: `**Grants & scholarships** — prioritize these. They reduce what you owe without creating a loan balance (still read conditions).\n\n**Loans** — can make school possible, but they are a contract. Federal student loans and private loans differ in protections and terms; details matter and change. Borrow only what you need after gift aid and realistic work income.\n\n**FAFSA awareness:** Completing the FAFSA (when eligible/required) is often the gateway to federal grants, federal loans, and sometimes school/state aid. Sit down with a parent/guardian — it's a family conversation. Use official free channels — paid 'special filers' who pressure you are a red flag. Deadlines matter; missing them can shrink options.\n\n**Scholarship apps:** Apply to local and school scholarships early. Small awards add up and don't need repayment.\n\nThis is awareness, not a filing walkthrough for every family situation.`,
        callout: {
          label: "Myth check",
          text: "\"My family won't qualify for anything, so skip FAFSA.\" Many schools still want it for their own aid — ask a counselor before skipping.",
        },
      },
      {
        id: "compare-offers",
        kicker: "Decision skill",
        title: "Compare offers carefully — a worksheet mindset",
        image: "/images/lessons/fl-14-3.png",
        imageAlt: "Worksheet photo comparing two college offers: gift aid vs loans columns filled in pencil",
        body: `Line up offers side by side:\n\n1. **Cost of attendance** components (tuition, housing, fees, books estimate).\n2. **Gift aid** total and whether it renews.\n3. **Work expectations** (work-study or needed job hours).\n4. **Loans suggested** — how much, which type, estimated payment later (rough).\n5. **Out-of-pocket gap** — what family savings/income must cover this year.\n6. **Fit factors** — program strength, support services — weighed *after* you understand money.\n\nAppeal politely if circumstances change or if another offer is stronger — some schools reconsider. Keep tone factual.\n\nAlso consider community college + transfer, trade programs, employer tuition help, or gap years — different paths, same net-price discipline.`,
        callout: {
          label: "Try this week",
          text: "If you're near applications, list three schools/programs and find each net-price calculator or counseling resource — practice the comparison habit early.",
        },
      },
      {
        id: "borrow-wisely",
        kicker: "Future you",
        title: "Loans are claims on future income",
        body: `Before signing loan paperwork (with family), ask:\n\n• How much do we truly need after gift aid?\n• What might a payment look like after graduation under reasonable assumptions?\n• What happens if I leave school early?\n• Who is cosigning, and what risk do they take?\n\nEducation can be a strong investment in skills — it is not automatically worth unlimited debt for any program. Pair money math with career/outcome questions without panic or prestige pressure.`,
        callout: {
          label: "Reality check",
          text: "There is no universal 'right school.' There is a best-fit package of cost, support, and goals for *you*.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Net price** beats sticker price for decisions.\n• Prefer **grants/scholarships**; treat **loans** as real debt.\n• **FAFSA** awareness unlocks many aid doors — use official channels with family.\n• Compare offers line by line, including renewability and living costs.\n\nTake the **Knowledge check**, then reflect on how you'd compare two hypothetical offers.`,
      },
    ],
  },
  bigIdeas: [
    "**Sticker price** is the list cost; **net price** is closer to what you pay after gift aid.",
    "**Grants/scholarships** don't require repayment; **loans** do — read which is which on every offer.",
    "Compare aid packages carefully (renewability, loans, living costs); FAFSA awareness opens many doors.",
  ],
  keyTerms: [
    { term: "Sticker price", definition: "Published college cost before aid is applied." },
    { term: "Net price", definition: "Estimated cost after grants/scholarships; closer to what you may pay." },
    { term: "Grant", definition: "Gift aid that typically does not need to be repaid." },
    { term: "Student loan", definition: "Borrowed money for education that must be repaid under loan terms." },
    { term: "FAFSA", definition: "Free Application for Federal Student Aid — used to determine eligibility for many aid programs." },
    { term: "Cost of attendance", definition: "Estimate of tuition plus living and related education costs." },
    { term: "Scholarship", definition: "Gift aid often based on merit, talent, or other criteria." },
  ],
  realWorld:
    "School A lists $52k and offers $20k grants + $10k loans. School B lists $38k and offers $8k grants + $5k loans. An Aid Navigator compares remaining gaps and loan totals with a parent — not which logo looks cooler.",
  quiz: [
    {
      id: "q1",
      question: "What is the best plain-English meaning of net price?",
      choices: [
        "The sticker tuition with no aid considered",
        "What you pay after gift aid like grants/scholarships (estimates/offers matter)",
        "Only the cost of textbooks",
        "The maximum loan you are required to take",
      ],
      correctIndex: 1,
      explanation:
        "Net price focuses on cost after gift aid — more decision-relevant than sticker price alone.",
    },
    {
      id: "q2",
      question: "How do grants generally differ from student loans?",
      choices: [
        "Grants must always be repaid with interest; loans never are",
        "Grants are typically gift aid; loans must be repaid under their terms",
        "They are identical except for the name on the letter",
        "Loans always reduce net price more than grants",
      ],
      correctIndex: 1,
      explanation:
        "Gift aid lowers what you owe without creating a loan balance. Loans postpone cost into future payments.",
    },
    {
      id: "q3",
      question: "Why does FAFSA awareness matter for many students?",
      choices: [
        "It is a paid ranking service colleges require for admission essays",
        "It is often required to access federal aid and may unlock other aid — and it should be done via official free channels",
        "It replaces the need to compare net prices",
        "It guarantees a full-ride at any school",
      ],
      correctIndex: 1,
      explanation:
        "FAFSA is a key gateway for many aid types. Use official free processes; beware paid panic sellers.",
    },
    {
      id: "q4",
      question: "Which question is most important when reading an aid offer?",
      choices: [
        "Which school has the flashiest brochure?",
        "How much is gift aid vs loans, does aid renew, and what out-of-pocket gap remains?",
        "Can I ignore living costs if tuition looks covered?",
        "Are loans secretly the same as scholarships?",
      ],
      correctIndex: 1,
      explanation:
        "Aid Navigators separate gift aid from debt, check renewability, and compute the real gap including living costs.",
    },
    {
      id: "q5",
      question: "What is a cautious approach to student loans?",
      choices: [
        "Borrow the maximum offered regardless of need",
        "Borrow only what's needed after gift aid and understand repayment is a future obligation",
        "Assume all loans are automatically forgiven",
        "Never read the promissory note",
      ],
      correctIndex: 1,
      explanation:
        "Loans can enable education but create future payments. Need-based borrowing with eyes open is the cautious path.",
    },
  ],
  reflection: {
    prompt:
      "Invent two college/program offers (or use real ones). Compare sticker vs gift aid vs loans vs remaining gap. Which looks cheaper after a careful Aid Navigator read — and why?",
    placeholder:
      "Example: Offer A has a higher sticker but more renewable grants; Offer B pushes more loans. I'd pick based on net gap + debt…",
  },
};
