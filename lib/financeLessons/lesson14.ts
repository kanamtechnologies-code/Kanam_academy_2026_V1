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
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-14.png",
        imageAlt: "High school senior comparing college offer letters and net price on a laptop with a family member",
        body: `College marketing loves big campus photos. Aid Navigators look at **numbers**: what it costs *you*, what doesn't need repayment, and what becomes debt.\n\nHere's the roadmap:\n\n• **A true-ish story** about two offer letters that looked nothing alike.\n• **Sticker vs net price**, **grants vs loans**, and **FAFSA awareness** — three core concepts, each with a quick check.\n• A **worked example** reading a real offer letter, a common **myth**, and a **try-it** practice round.\n• A **deeper skill** (reading appeal letters and net-price calculators), a **grants vs loans comparison**, and a **behavioral trap** to avoid.\n• **Habits**, how this connects to national money standards, a reflection pause, a **mini-case**, and a mixed **check yourself**.\n\nNo school-rank hype — just clear money thinking for senior year and beyond.`,
        callout: {
          label: "Why it matters",
          text: "Two schools with similar sticker prices can differ by thousands in net cost. Comparing offers carefully can change your debt for years.",
        },
      },
      {
        id: "hook-story",
        kicker: "True-ish story",
        title: "Two envelopes, two very different numbers",
        image: "/images/lessons/fl-14-2.png",
        imageAlt: "Two college acceptance envelopes open on a kitchen table with award letters and a calculator",
        body: `Sofia gets two acceptance letters the same week. **State University** lists a sticker price of $28,000 a year and offers her $9,000 in grants. **Coastal College** lists a scarier-looking $52,000 sticker — but offers her $34,000 in grants and scholarships.\n\nHer first instinct is panic about Coastal's sticker price. Her second instinct, after doing the subtraction, is very different: State's real cost to her family is **$19,000**. Coastal's real cost is **$18,000**.\n\nAlmost the same — once you look past the sticker. By the end of this lesson, you'll do that subtraction automatically, and you'll know what else Sofia still needs to check before deciding.`,
        callout: {
          label: "Keep this in mind",
          text: "We'll return to Sofia's two letters later — including the parts of the offer that a quick subtraction doesn't capture.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "College money words that matter",
        body: `• **Sticker price / published cost** — the listed tuition/fees (and often room/board) before aid.\n• **Net price** — what you pay after grants/scholarships (estimates vary; read the offer).\n• **Grant** — aid you typically don't repay (need-based and other types exist).\n• **Scholarship** — gift aid often tied to merit, talent, identity, or other criteria.\n• **Student loan** — borrowed money that must be repaid with interest under loan terms.\n• **FAFSA** — a free federal application used to determine eligibility for many aid types (requirements evolve).\n• **Work-study** — need-based program that may offer certain campus jobs (availability varies).\n• **COA (cost of attendance)** — an estimate including tuition plus living and other costs.\n\nYou'll use these to decode offer letters.`,
        callout: {
          label: "Pro tip",
          text: "When you see a big award number, ask: Is this a grant/scholarship or a loan? Renewable each year?",
        },
      },
      {
        id: "concept-1",
        kicker: "Concept 1",
        title: "Sticker price vs net price",
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
        checkIn: {
          prompt: "Diego keeps hearing the term 'net price' while comparing two schools. What does it actually mean?",
          choices: [
            "What he'd actually pay after subtracting grants and scholarships from the total cost",
            "The sticker tuition number listed before any aid is applied",
            "The amount of loans he's required to accept in his aid package",
            "The total of tuition plus every one-time campus fee, before aid",
          ],
          correctIndex: 0,
          explanation:
            "Net price is cost after gift aid — more decision-relevant than the sticker number, and not the same as a required loan amount or a fee-only total.",
        },
      },
      {
        id: "concept-2",
        kicker: "Concept 2",
        title: "Grants and scholarships vs loans",
        body: `**Grants & scholarships** — prioritize these. They reduce what you owe without creating a loan balance (still read conditions and renewal rules).\n\n**Loans** — can make school possible, but they are a contract. Federal student loans and private loans differ in protections and terms; details matter and change. Borrow only what you need after gift aid and realistic work income.\n\n**Scholarship apps:** Apply to local and school scholarships early. Small awards add up and don't need repayment.`,
        callout: {
          label: "Myth check",
          text: "\"An award letter with a big total number is automatically a great deal.\" Break the total apart into gift aid vs loans before celebrating.",
        },
        checkIn: {
          prompt: "Sofia's aid letter lists a scholarship and a loan on the same 'total award' line. How do the two generally differ?",
          choices: [
            "Both eventually need to be repaid, just on different schedules",
            "The scholarship is gift aid she likely won't repay; the loan must be repaid under its terms",
            "Loans only cover tuition, while scholarships only cover housing",
            "Whichever one is listed first on the letter is the one she actually has to pay back",
          ],
          correctIndex: 1,
          explanation:
            "Gift aid lowers what you owe without creating a loan balance, while a loan postpones cost into future payments — the order on a letter or the category it's listed under doesn't change that.",
        },
      },
      {
        id: "concept-3",
        kicker: "Concept 3",
        title: "FAFSA awareness",
        body: `Completing the **FAFSA** (when eligible/required) is often the gateway to federal grants, federal loans, and sometimes school/state aid. It's a family conversation — sit down with a parent or guardian.\n\nUse official, free channels. Paid "special filers" who pressure you with urgency are a red flag; the application itself is free. Deadlines matter — missing them can shrink options, sometimes permanently for that year.\n\nThis is awareness, not a filing walkthrough for every family situation — requirements and forms can change, so lean on official sources and your school's financial aid office when you're ready to file for real.`,
        callout: {
          label: "Myth check",
          text: "\"My family won't qualify for anything, so skip FAFSA.\" Many schools still want it for their own aid — ask a counselor before skipping.",
        },
        checkIn: {
          prompt: "Devon's family assumes they make 'too much' to bother with FAFSA. What's the more accurate view?",
          choices: [
            "FAFSA is a paid ranking service that boosts admission chances",
            "Skipping FAFSA has no effect on which aid a student can access",
            "It's often required for federal aid and may unlock school or state aid too",
            "FAFSA guarantees a set scholarship amount for every applicant",
          ],
          correctIndex: 2,
          explanation:
            "Many schools use FAFSA for their own aid beyond federal programs, so assuming zero aid before applying can cost real money — though FAFSA never guarantees a specific outcome.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Reading Sofia's State University offer letter",
        body: `Let's open Sofia's State University letter for real numbers.\n\n**Cost of attendance (COA):** $28,000 (tuition/fees/room/board estimate)\n\n**Gift aid:**\n• Merit scholarship: $6,000\n• Need-based grant: $3,000\n• **Total gift aid: $9,000**\n\n**Suggested loans (not required to accept in full):**\n• Federal subsidized loan: $3,500\n\n**Work-study offer:** $2,000 (requires working campus hours)\n\n**Net price before loans:** $28,000 − $9,000 = **$19,000**\n\n**Remaining gap after work-study (if she works those hours):** $19,000 − $2,000 = **$17,000** still needing to come from savings, family contribution, or borrowing.\n\nThe move here isn't memorizing categories — it's the habit: **start at cost of attendance, subtract gift aid, then separately account for work-study and loans.**`,
        bullets: [
          "Start at cost of attendance (COA), not tuition alone.",
          "Subtract gift aid (grants + scholarships) to get net price.",
          "Loans and work-study are separate — they don't reduce net price, they cover it.",
        ],
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "Three college-money myths worth busting now",
        body: `**Myth 1: "The school with the biggest total award number wins."**\nReality: break the total apart. A $30,000 "award" that's $25,000 in loans is a worse deal than a $20,000 award that's $18,000 in grants.\n\n**Myth 2: "If my family makes 'too much' money, we won't get any aid, so why bother applying."**\nReality: many schools use their own formulas beyond FAFSA, and merit aid isn't purely need-based. Assuming zero aid before applying can cost you real money.\n\n**Myth 3: "Community college or trade school 'doesn't count' as a real plan."**\nReality: transfer pathways, trade certifications, and employer tuition programs can be excellent net-price options depending on your goals — the same cost-and-outcome math still applies.`,
        callout: {
          label: "Reality check",
          text: "There is no universal 'best school.' There's a best-fit package of net cost, support, and goals for *you*.",
        },
        checkIn: {
          prompt: "Which statement is the myth, not the reality?",
          choices: [
            "Breaking an award letter into gift aid vs loans matters more than the total number",
            "Some schools use their own aid formulas beyond FAFSA, including merit aid",
            "Community college, trade programs, or transfer paths can be strong net-price options",
            "The school offering the single biggest total award number is automatically the best deal",
          ],
          correctIndex: 3,
          explanation:
            "A large total can hide a large loan burden — the composition of an award matters more than its headline size, unlike the other three accurate statements.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it",
        title: "Your turn: break down a different offer",
        body: `Here's an offer for **Devon**, admitted to a program with a $34,000 cost of attendance. Before reading the answer below, try the read yourself.\n\n**Cost of attendance:** $34,000\n\n**Gift aid:** $12,000 merit scholarship + $5,000 need-based grant\n\n**Suggested loans:** $4,500\n\n**Work-study offer:** $1,500\n\nWhat is Devon's net price (before loans/work-study), and what's the remaining gap after work-study?`,
        callout: {
          label: "Check your work",
          text: "Total gift aid = $12,000 + $5,000 = $17,000. Net price = $34,000 − $17,000 = $17,000. Remaining gap after work-study = $17,000 − $1,500 = $15,500 — before deciding how much (if any) of the suggested loan to accept.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Deeper skill",
        title: "Net price calculators and appeal letters",
        image: "/images/lessons/fl-14-4.png",
        imageAlt: "Student and parent using a school's online net price calculator on a laptop before applications are due",
        body: `**Net price calculators:** Most college websites host a net price calculator — a rough estimate tool where you enter family financial details to preview possible aid before you even apply. Treat the output as a ballpark, not a promise; your actual offer can differ once the school reviews your full application.\n\n**Appeal letters:** If your family's financial circumstances changed (job loss, medical costs, a lower competing offer from a similar school), many financial aid offices accept a polite, factual appeal — sometimes called a "professional judgment" review. This is not guaranteed to change anything, and it's not a negotiating trick; it's a documented request based on real changes or information. A calm, specific letter with dates and numbers works better than an emotional appeal.\n\nThe deeper skill: **use calculators early to set expectations, and know that appeals exist as a legitimate (not guaranteed) next step if your situation or offers shift.**`,
        bullets: [
          "Net price calculators estimate cost before you apply — treat them as a ballpark.",
          "Appeals are a legitimate, evidence-based request — never guaranteed and never a pressure tactic.",
          "Bring dates, numbers, and documentation, not just a feeling that a school 'owes' you more.",
        ],
      },
      {
        id: "comparison",
        kicker: "Side-by-side",
        title: "Grants/scholarships vs loans — the comparison sheet",
        body: `Line them up on the same four questions:\n\n**Repayment** — Grants/scholarships: none required. Loans: repaid with interest under the loan's terms.\n\n**Renewability** — Grants/scholarships: some renew automatically each year if criteria are met; others are one-time. Loans: often available again each year, up to program/family limits.\n\n**Risk if you leave school early** — Grants/scholarships: usually no repayment owed for aid already used toward that term. Loans: you generally still owe what you borrowed, regardless of whether you finish.\n\n**Effect on net price** — Grants/scholarships: directly lowers net price. Loans: cover the remaining gap; they don't lower net price, they finance it.\n\nAid Navigator takeaway: always ask which bucket a dollar amount belongs to before comparing totals across schools.`,
        callout: {
          label: "Quick gut-check",
          text: "If two offers have the same 'total aid' number, the one with more gift aid and fewer loans is the stronger deal — almost always.",
        },
      },
      {
        id: "behavioral-trap",
        kicker: "Behavioral trap",
        title: "The prestige-anchor trap",
        body: `Once a school feels like "the dream," it's easy to mentally lock in and stop comparing numbers objectively — a bias sometimes called **anchoring**. The first appealing offer (or the most famous name) becomes the reference point everything else gets judged against, even when a cheaper, less-flashy option would serve the same goals just as well.\n\nAid Navigators interrupt the trap with one question before signing anything: **"If this exact financial package came from a school I'd never heard of, would I still say yes?"** If the honest answer changes once you imagine a different name on the letterhead, prestige — not net cost or fit — is doing some of the deciding.`,
        callout: {
          label: "Watch out",
          text: "Marketing budgets are large at every level of higher ed. A glossy brochure is not evidence of net-price value.",
        },
      },
      {
        id: "habits",
        kicker: "Make it real",
        title: "Aid Navigator habits worth building now",
        image: "/images/lessons/fl-14-3.png",
        imageAlt: "Worksheet photo comparing two college offers: gift aid vs loans columns filled in pencil",
        body: `Line up offers side by side:\n\n1. **Cost of attendance** components (tuition, housing, fees, books estimate).\n2. **Gift aid** total and whether it renews.\n3. **Work expectations** (work-study or needed job hours).\n4. **Loans suggested** — how much, which type, estimated payment later (rough).\n5. **Out-of-pocket gap** — what family savings/income must cover this year.\n6. **Fit factors** — program strength, support services — weighed *after* you understand money.\n\nAppeal politely if circumstances change or if another offer is stronger — some schools reconsider. Keep tone factual.\n\nAlso consider community college + transfer, trade programs, employer tuition help, or gap years — different paths, same net-price discipline.`,
        callout: {
          label: "Try this week",
          text: "If you're near applications, list three schools/programs and find each net-price calculator or counseling resource — practice the comparison habit early.",
        },
      },
      {
        id: "standards-connect",
        kicker: "Why this is on the checklist",
        title: "How this connects to national money standards",
        body: `The **Jump$tart Coalition** and **Council for Economic Education** national standards treat paying for education as a bridge between two pillars: **Earning Income** (since education is often an investment in future earning) and **Managing Credit** (since student loans are, functionally, credit).\n\nThe specific skills from this lesson map directly:\n\n• Distinguishing **sticker price from net price**, and reading a real offer letter.\n• Comparing **gift aid vs debt**, including renewability and risk.\n• Building **FAFSA awareness** without guaranteeing outcomes.\n• Practicing a **structured comparison** across multiple offers before deciding.\n\nThis is the exact "can this student make an informed borrowing decision before signing" checkpoint these standards are designed to measure.`,
        callout: {
          label: "Good to know",
          text: "Every specific number in this lesson is illustrative — real offers, forms, and aid rules vary and change. The comparison habit is the transferable skill.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on...",
        body: `Take thirty seconds before the next section. You don't need to write anything down yet — that comes at the end — but think through this:\n\n*If you (or a friend) get two offer letters that look wildly different on the surface, what's the very first number you'll subtract to compare them fairly — and who's the trusted adult or counselor you'd loop in before deciding anything?*\n\nHolding a concrete answer to that question is the real goal of this lesson.`,
      },
      {
        id: "mini-case",
        kicker: "Mini-case",
        title: "Sofia decides — with one more twist",
        image: "/images/lessons/fl-14-5.png",
        imageAlt: "Student comparing two financial aid offer letters side by side with sticky notes and a highlighter",
        body: `Back to Sofia's two letters from the hook story. Remember: State University's net price came out to $19,000; Coastal College's came out to $18,000 — almost identical.\n\nBut there's a twist she just noticed: State's $9,000 in gift aid is a **renewable four-year merit scholarship**, guaranteed each year if she keeps her grades up. Coastal's $34,000 in gift aid includes a **one-time $15,000 "first-year welcome grant"** that doesn't renew — meaning her net price could jump significantly starting sophomore year.\n\nUsing everything from this lesson, what should Sofia do next before deciding?`,
        checkIn: {
          prompt: "What's the Aid Navigator move for Sofia, given the renewability twist?",
          choices: [
            "Ask each school directly about renewal requirements and project the net price for all four years before comparing further",
            "Automatically choose Coastal since its first-year gift aid total is larger",
            "Automatically choose State since its sticker price is lower",
            "Ignore renewal terms since only the first semester's cost really matters",
          ],
          correctIndex: 0,
          explanation:
            "A one-time grant can make year one look deceptively affordable. Projecting all four years — and confirming renewal terms directly with each school — beats deciding on sticker price or a single year's gift aid total alone.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "Mixed review: pulling it together",
        body: `One more check before the full knowledge check — this one mixes ideas from across the lesson, the way a real decision would.`,
        checkIn: {
          prompt: "A friend says: 'This school's total aid package is $40,000, way more than the other school's $22,000, so it's obviously the better deal.' What's the Aid Navigator response?",
          choices: [
            "Agree — a bigger total package always beats a smaller one",
            "Ask how much of each package is gift aid vs loans, and whether it renews, before comparing net cost and long-term debt",
            "Point out that loans never really matter once the total looks impressive",
            "Assume the smaller total package must be a mistake or a worse school",
          ],
          correctIndex: 1,
          explanation:
            "Totals can mislead. Composition (gift aid vs loans) and renewability determine the real deal — not the headline number or which total simply looks bigger.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Net price** beats sticker price for decisions — always subtract gift aid from cost of attendance.\n• Prefer **grants/scholarships**; treat **loans** as real debt, and check renewability before celebrating a big total.\n• **FAFSA** awareness opens many doors — use official channels with family; it guarantees no specific outcome.\n• Compare offers line by line, and watch the prestige-anchor trap.\n\nTake the **Knowledge check**, then reflect on how you'd compare two hypothetical offers.`,
      },
    ],
  },
  bigIdeas: [
    "**Sticker price** is the list cost; **net price** is closer to what you pay after gift aid.",
    "**Grants/scholarships** don't require repayment; **loans** do — read which is which on every offer, including renewability.",
    "Compare aid packages carefully across all four years; watch for prestige anchoring once a school starts to feel like 'the dream.'",
  ],
  keyTerms: [
    { term: "Sticker price", definition: "Published college cost before aid is applied." },
    { term: "Net price", definition: "Estimated cost after grants/scholarships; closer to what you may pay." },
    { term: "Grant", definition: "Gift aid that typically does not need to be repaid." },
    { term: "Student loan", definition: "Borrowed money for education that must be repaid under loan terms." },
    { term: "FAFSA", definition: "Free Application for Federal Student Aid — used to determine eligibility for many aid programs." },
    { term: "Cost of attendance", definition: "Estimate of tuition plus living and related education costs." },
    { term: "Scholarship", definition: "Gift aid often based on merit, talent, or other criteria." },
    { term: "Anchoring", definition: "Letting an early reference point (like a 'dream school') bias later comparisons." },
  ],
  realWorld:
    "School A lists $52k and offers $20k grants + $10k loans. School B lists $38k and offers $8k grants + $5k loans. An Aid Navigator compares remaining gaps and loan totals with a parent — not which logo looks cooler.",
  quiz: [
    {
      id: "q1",
      question: "Which is the best plain-English meaning of 'net price'?",
      choices: [
        "The sticker tuition number with no aid considered at all",
        "The maximum amount of loans a student is required to take",
        "What a student actually pays after gift aid like grants and scholarships is subtracted",
        "Only the cost of textbooks and other small supplies",
      ],
      correctIndex: 2,
      explanation:
        "Net price focuses on cost after gift aid — more decision-relevant than the sticker number, and it isn't the same as a required loan amount.",
    },
    {
      id: "q2",
      question: "Two lines on an aid letter read 'Grant: $4,000' and 'Loan: $4,000.' How do they generally differ?",
      choices: [
        "They're functionally identical since both reduce the sticker price the same way",
        "The loan is gift aid, and the grant must be repaid with interest",
        "Whichever line is listed first on the page is the one that must be repaid",
        "The grant is typically gift aid that doesn't need repayment; the loan must be repaid under its terms",
      ],
      correctIndex: 3,
      explanation:
        "Gift aid lowers what you owe without creating a loan balance; a loan postpones cost into future payments — matching dollar amounts doesn't make them equivalent.",
    },
    {
      id: "q3",
      question: "Why does completing the FAFSA matter for many students, even if they're unsure they'll qualify for aid?",
      choices: [
        "It's often the gateway to federal aid and may unlock other school or state aid too, and it should be done through official free channels",
        "It's a paid service that ranks applicants for admission",
        "It replaces the need to ever compare net prices between schools",
        "It guarantees a full-ride scholarship at any school that receives it",
      ],
      correctIndex: 0,
      explanation:
        "Many schools use FAFSA for their own aid beyond federal programs, so it's worth completing — though it never guarantees a specific dollar outcome.",
    },
    {
      id: "q4",
      question: "Which question is most important when reading an aid offer?",
      choices: [
        "Which school has the flashiest brochure or campus photos?",
        "How much of the award is gift aid vs loans, does it renew, and what out-of-pocket gap remains?",
        "Can living costs be ignored if tuition looks mostly covered?",
        "Can the loan portion just be treated the same as a scholarship?",
      ],
      correctIndex: 1,
      explanation:
        "Aid Navigators separate gift aid from debt, check renewability, and compute the real gap including living costs — not just the tuition line.",
    },
    {
      id: "q5",
      question: "What is a cautious approach to student loans?",
      choices: [
        "Borrow the maximum amount offered so nothing is left on the table",
        "Assume any remaining balance will eventually be forgiven automatically",
        "Borrow only what's needed after gift aid, and understand repayment is a real future obligation",
        "Skip reading the loan terms since they're mostly the same everywhere",
      ],
      correctIndex: 2,
      explanation:
        "Loans can enable education but create future payments. Need-based borrowing with eyes open — not maxing out or assuming forgiveness — is the cautious path.",
    },
    {
      id: "q6",
      question: "What is the purpose of a financial aid appeal letter?",
      choices: [
        "A guaranteed negotiating trick that always increases the aid offered",
        "A required step every applicant must complete before enrolling",
        "A way to skip filing the FAFSA entirely and still receive aid",
        "A factual, documented request tied to changed circumstances or a differing offer — never guaranteed to succeed",
      ],
      correctIndex: 3,
      explanation:
        "Appeals are a legitimate but non-guaranteed process based on real documentation — not a pressure tactic or a required or automatic step.",
    },
    {
      id: "q7",
      question: "What is the prestige-anchor trap?",
      choices: [
        "Letting a 'dream school' or famous name become the biased reference point that other offers get unfairly judged against",
        "Comparing every school using the exact same net-price method",
        "A financial aid rule that requires picking the cheapest option",
        "A myth that has no real effect on college decisions",
      ],
      correctIndex: 0,
      explanation:
        "Anchoring on a favorite school's name can distort otherwise-objective cost comparisons — using a consistent net-price method is actually the fix, not the trap.",
    },
    {
      id: "q8",
      question: "Two offers list the same total aid number, but one has more gift aid and less debt, and its aid renews for all four years. What's the Aid Navigator conclusion?",
      choices: [
        "The offers are identical in value since their totals match exactly",
        "The offer with more gift aid, less debt, and multi-year renewal is the stronger deal despite an equal headline total",
        "Renewability never matters — only the year-one number counts",
        "The offer with more loans is automatically better since it's 'real cash now'",
      ],
      correctIndex: 1,
      explanation:
        "Composition and renewability distinguish otherwise-equal totals — gift aid and renewal terms create the real long-term difference, not the matching headline figure.",
    },
  ],
  reflection: {
    prompt:
      "Invent two college/program offers (or use real ones). Compare sticker vs gift aid vs loans vs remaining gap. Which looks cheaper after a careful Aid Navigator read — and why?",
    placeholder:
      "Example: Offer A has a higher sticker but more renewable grants; Offer B pushes more loans. I'd pick based on net gap + debt…",
  },
};
