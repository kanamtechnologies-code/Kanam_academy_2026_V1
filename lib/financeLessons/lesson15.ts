import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson15: AILessonConfig = {
  id: "fl-15",
  title: "15. Big Money Decisions",
  goal: "Apply decision frameworks to cars, phones, and housing tradeoffs — weighing total cost, opportunity cost, and flexibility without prestige pressure.",
  xpReward: 750,
  badge: "Decision Pro",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/14",
  nextHref: "/learn/finance/16",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-15.png",
        imageAlt: "Teen deciding between a used car listing and a transit pass on a laptop, realistic decision moment",
        body: `Big purchases aren't just "Can I afford the monthly payment?" Decision Pros ask better questions — about total cost, risk, and what else that money could do.\n\nHere's the roadmap:\n\n• **A true-ish story** about a "great deal" that wasn't.\n• **A reusable decision framework**, **phone/car tradeoffs**, and **housing tradeoffs** — three core concepts, each with a quick check.\n• A **worked example** totaling a real car's true cost, a common **myth**, and a **try-it** practice round.\n• A **deeper skill** (estimating total cost of ownership with real math), a **buy vs alternatives comparison**, and a **behavioral trap** to avoid.\n• **Habits**, how this connects to national money standards, a reflection pause, a **mini-case**, and a mixed **check yourself**.\n\nPrestige is optional. Clarity is the skill.`,
        callout: {
          label: "Why it matters",
          text: "One oversized car payment or phone plan can quietly block saving, classes, or moving for a better opportunity.",
        },
      },
      {
        id: "hook-story",
        kicker: "True-ish story",
        title: "The 'great deal' that wasn't",
        image: "/images/lessons/fl-15-2.png",
        imageAlt: "Teen looking at a used car online listing advertising a low monthly payment in bold text",
        body: `Tyler finds a used car online: "**Only $189/month!**" in giant letters. He does the math in his head — that's less than his phone bill and his streaming subscriptions combined. He's ready to call the seller that night.\n\nHis older sister asks one question before he dials: *"For how many months, and what's the interest rate?"*\n\nTyler doesn't know. It turns out the $189/month is stretched over **72 months** at a rate that adds thousands in interest — plus he hasn't even looked up insurance for a car that age and style yet. The "deal" started looking a lot less simple.\n\nBy the end of this lesson, you'll know exactly which questions Tyler's sister was really asking — and how to ask them before you fall in love with a listing.`,
        callout: {
          label: "Keep this in mind",
          text: "We'll come back to Tyler's car later, once you know how to total up its real cost.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Decision words that keep you honest",
        body: `• **Total cost of ownership** — purchase price plus ongoing costs (insurance, maintenance, fees, interest).\n• **Opportunity cost** — the next-best thing you give up when you choose.\n• **Depreciation** — value lost as an asset ages (common with cars/phones).\n• **Liquidity / flexibility** — how easily you can change plans if life shifts.\n• **Needs vs wants** — must-haves for goals vs status upgrades.\n• **Sunk cost** — money already spent that shouldn't force a bad future choice.\n• **Loan term** — how many months/years you're scheduled to repay a loan; longer terms usually mean more total interest.\n\nThese ideas turn vibes into a worksheet.`,
        callout: {
          label: "Pro tip",
          text: "If you can't list three ongoing costs, you don't understand the purchase yet.",
        },
      },
      {
        id: "concept-1",
        kicker: "Concept 1",
        title: "A Decision Pro framework (use every time)",
        body: `Try this six-step loop for cars, phones, housing, or other big spends:\n\n1. **Define the job** — What problem must this solve for 1–3 years?\n2. **Set a max budget** — Including monthly *and* upfront cash.\n3. **List 2–3 options** — Including a cheaper/no-buy path.\n4. **Total the costs** — Upfront + recurring + likely repairs/fees.\n5. **Score tradeoffs** — Reliability, commute time, safety, stress, flexibility.\n6. **Sleep on it** — Especially if a salesperson is rushing you.\n\nWrite it down. Memory lies under pressure; paper doesn't.\n\n**After you decide:** **Document the why** in one sentence ("I picked the used car because total cost fits even in a slow month") and **set a review date** — often **3–6 months** out for big purchases.`,
        bullets: [
          "Always include a 'wait / smaller' option.",
          "Monthly payment ≠ full cost.",
          "If it wrecks your emergency fund, it's probably too big right now.",
          "Write why you chose — and when you'll revisit.",
        ],
        callout: {
          label: "Watch out",
          text: "\"Only $99/month\" can hide long terms, high interest, or required add-ons.",
        },
        checkIn: {
          prompt: "What should a Decision Pro include beyond the monthly payment?",
          choices: [
            "Only the brand logo popularity",
            "Upfront costs, insurance/maintenance/fees, and opportunity cost",
            "Salesperson confidence alone",
            "Whether friends will be jealous",
          ],
          correctIndex: 1,
          explanation:
            "Total cost and tradeoffs — not just the monthly number — drive sound big-money decisions.",
        },
      },
      {
        id: "concept-2",
        kicker: "Concept 2",
        title: "Phones and cars — teen-relevant tradeoffs",
        body: `**Phones:** Compare device price, carrier plan, insurance/add-ons, and how often you upgrade. A solid mid-range phone kept through senior year often beats a flagship on a forever installment. Factor cases, cracked screens, and whether you need the camera for actual work/school.\n\n**Cars:** Beyond the sale price, count insurance (often high for teen drivers), registration, fuel or charging, maintenance, parking, loan interest, and depreciation. A reliable used car can beat a flashy payment. Also ask: Do I need a car, or do transit/biking/carpool cover the job cheaper?\n\nDecision Pro question: Which option protects my goals for the next two years?`,
        callout: {
          label: "Common misconception",
          text: "\"I need the nicest car/phone to be taken seriously.\" Reliability and cash left for goals usually signal maturity more than chrome.",
        },
        checkIn: {
          prompt: "When buying a car, which costs belong in a total-cost analysis?",
          choices: [
            "Only the monthly payment on the loan",
            "Insurance, fuel/maintenance, registration, loan interest, and depreciation — plus the sale price",
            "Only what the salesperson highlights in the ad",
            "Depreciation never matters for used cars",
          ],
          correctIndex: 1,
          explanation:
            "Cars carry ongoing costs beyond the sticker or monthly payment — insurance, fuel, maintenance, interest, and value loss all count.",
        },
      },
      {
        id: "concept-3",
        kicker: "Concept 3",
        title: "Housing tradeoffs: rent, roommates, and location",
        body: `Whether it's a first apartment after graduation or choosing a college housing plan, the same math applies:\n\n• **Rent + utilities + internet + renter-related costs**\n• **Deposits and moving costs** — cash you need *before* the first month.\n• **Commute** — time and money to school/work.\n• **Roommates** — lower rent, higher coordination risk.\n• **Lease length** — flexibility vs price.\n\nCheaper rent far away can lose if transit eats hours and fares. Expensive rent next door can lose if it kills saving. Score both money *and* time.`,
        callout: {
          label: "Try this week",
          text: "Pick one big decision ahead of you (phone upgrade, used car, summer housing). Draft the six-step framework with real numbers — even rough ones.",
        },
        checkIn: {
          prompt: "When comparing housing options, what belongs in the analysis?",
          choices: [
            "Rent alone with no utilities or deposits",
            "Rent, utilities, deposits, commute time/money, and lease flexibility",
            "Only which building looks best on social media",
            "Roommate coordination is irrelevant to cost",
          ],
          correctIndex: 1,
          explanation:
            "Housing decisions include cash needs, ongoing bills, commute, and flexibility — not rent in isolation.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Totaling Tyler's car — the real number",
        body: `Let's finish the math Tyler's sister started.\n\n**The listing:** $189/month for 72 months.\n\n**Total of payments:** $189 × 72 = **$13,608** (for a car that likely has a cash price closer to $10,000–$11,000 once you back out the interest — the gap is interest cost over six years).\n\n**Add the costs the ad didn't mention (annual estimates):**\n• Insurance for a new teen driver: ~$2,200/year\n• Fuel: ~$1,400/year\n• Maintenance/repairs: ~$600/year\n• Registration/fees: ~$150/year\n\n**Annual ongoing cost:** $4,350 — on top of the $189×12 = $2,268/year loan payment.\n\n**Year-one total cost of ownership:** roughly $2,268 + $4,350 = **$6,618** — not $189/month ($2,268/year).\n\nThe move here isn't memorizing Tyler's exact numbers — it's the habit: **payment + insurance + fuel + maintenance + fees, added up per year, is the real cost to compare against your budget.**`,
        bullets: [
          "Multiply the monthly payment by the loan term to see total payments.",
          "Add annual insurance, fuel/charging, maintenance, and fees.",
          "Compare that full annual total — not the monthly headline — to your actual budget.",
        ],
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "Three big-decision myths worth busting now",
        body: `**Myth 1: "A low monthly payment means an affordable purchase."**\nReality: stretching a loan over more months can lower the monthly number while raising total interest paid — sometimes dramatically, as Tyler discovered.\n\n**Myth 2: "New is always a smarter buy than used because it won't need repairs."**\nReality: new items depreciate fastest in the first year or two. A slightly used, well-reviewed option often has a better total-cost profile.\n\n**Myth 3: "If I can technically make the monthly payment, the purchase is a 'yes.'"**\nReality: "can I afford the payment" ignores opportunity cost — what saving, goals, or flexibility you're giving up by locking in that payment for years.`,
        callout: {
          label: "Reality check",
          text: "The question isn't just 'can I afford this bill' — it's 'is this the best use of this money for the next 1–3 years of my life.'",
        },
        checkIn: {
          prompt: "Which statement is the myth, not the reality?",
          choices: [
            "A longer loan term can lower the monthly payment while raising total interest paid",
            "A low monthly payment always means the purchase is genuinely affordable",
            "New items often depreciate fastest in the first year or two",
            "Affording a payment technically doesn't automatically mean it's the best use of your money",
          ],
          correctIndex: 1,
          explanation:
            "A low monthly number can hide a long term, high interest, or missing costs like insurance — 'affordable-looking' isn't the same as affordable.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it",
        title: "Your turn: total a different phone plan",
        body: `Here's a phone deal for **Amara**: a flagship phone financed at $45/month for 24 months, plus a required $85/month unlimited plan, plus a $12/month device insurance add-on she's told is "basically required."\n\nBefore reading the answer below, try totaling her true first-year cost yourself.`,
        callout: {
          label: "Check your work",
          text: "Monthly total = $45 + $85 + $12 = $142/month. Annual total = $142 × 12 = $1,704 for year one alone (and the phone financing continues into year two). Compare that to a mid-range phone paid in full plus a cheaper plan — often a large gap once totaled.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Deeper skill",
        title: "Estimating total cost of ownership like a pro",
        image: "/images/lessons/fl-15-4.png",
        imageAlt: "Notebook page with a simple total cost of ownership worksheet: upfront, monthly, annual extras",
        body: `Here's a reusable worksheet structure for *any* big purchase:\n\n**Step 1 — Upfront cash needed:** down payment, deposit, taxes/fees, setup costs.\n\n**Step 2 — Monthly recurring cost:** loan/lease payment, plan/subscription, minimum insurance.\n\n**Step 3 — Annual "surprise" costs, averaged monthly:** maintenance, repairs, renewal fees — take a rough annual estimate and divide by 12 so it doesn't blindside you.\n\n**Step 4 — Add steps 2 and 3 for a true "monthly reality" number.** Compare *that* number — not the advertised payment — against your actual budget.\n\n**Step 5 — Multiply the true monthly reality number by the term (or by 12 for a one-year view) to see the full picture.**\n\nThis is the same five-step structure whether you're pricing a car, a phone, or an apartment — only the line items change.`,
        bullets: [
          "Separate upfront cash from monthly recurring cost.",
          "Average annual 'surprise' costs into a monthly rate so they're not invisible.",
          "Always compare the true monthly reality number, not the advertised payment.",
        ],
      },
      {
        id: "comparison",
        kicker: "Side-by-side",
        title: "Buy new vs buy used vs no-buy — the comparison sheet",
        body: `Line them up on the same four questions, using a car or phone as the example:\n\n**Upfront cost** — New: highest. Used: moderate. No-buy (repair/keep current, or use transit): lowest or none.\n\n**Depreciation speed** — New: fastest in year one-two. Used: slower, since the steepest drop already happened. No-buy: not applicable.\n\n**Ongoing costs** — New: often lower repair costs short-term, higher insurance in some cases. Used: potentially higher repair risk, often lower insurance. No-buy: usually lowest ongoing cost.\n\n**Flexibility** — New: often locked into a longer loan. Used: shorter loan or cash purchase possible. No-buy: most flexible — easiest to change plans later.\n\nDecision Pro takeaway: "no-buy" or "wait" should always be one of the options you seriously price out, even if you don't choose it.`,
        callout: {
          label: "Quick gut-check",
          text: "If you can't describe what the 'no-buy' option would cost and cost you, you haven't finished the comparison yet.",
        },
      },
      {
        id: "behavioral-trap",
        kicker: "Behavioral trap",
        title: "The payment-size illusion",
        body: `Marketers know most people mentally compare purchases by **monthly payment size**, not total cost — a shortcut that makes "$189/month" feel roughly as serious as a streaming bill, even when the six-year total says otherwise. This bias gets a boost from **sunk cost** thinking too: once you've made a few payments, walking away can feel like "wasting" what's already been paid, even if continuing costs more overall.\n\nDecision Pros interrupt the trap with one question before signing: **"What is the total of every payment I'll make, added up — not the payment size, the total?"** If nobody selling you the item volunteers that number quickly, that's information too.`,
        callout: {
          label: "Watch out",
          text: "\"Everyone finances/leases this way\" is a social-proof nudge, not a total-cost argument.",
        },
      },
      {
        id: "habits",
        kicker: "Make it real",
        title: "Decision Pro habits: opportunity cost and cooling-off",
        body: `Every big yes is a no to something else: emergency fund progress, prom, sports fees, travel for family, or simply lower stress.\n\nCooling-off habits:\n• 24–72 hour rule on non-urgent upgrades.\n• Bring a total-cost worksheet to the store/dealer.\n• Talk it through with a trusted adult who isn't selling you anything.\n• Beware sunk cost: "I already spent on repairs" doesn't mean keep pouring money into a lemon.\n\nDecision Pros aren't joyless — they spend on purpose.`,
        callout: {
          label: "Reality check",
          text: "Sometimes the 'best' financial choice is waiting. Boredom is cheaper than interest.",
        },
      },
      {
        id: "standards-connect",
        kicker: "Why this is on the checklist",
        title: "How this connects to national money standards",
        body: `The **Jump$tart Coalition** and **Council for Economic Education** standards treat big purchase decisions as a cross-cutting skill — pulling from **Spending and Saving** (budgeting for a major cost) and **Financial Decision Making** more broadly (using tradeoffs and opportunity cost, not just gut feeling).\n\nThe specific skills from this lesson map directly:\n\n• Using a **repeatable framework** instead of an emotional, one-off decision.\n• Calculating **total cost of ownership**, not just a headline monthly number.\n• Weighing **opportunity cost** — what else that money or commitment could do.\n• Recognizing **behavioral traps** (payment-size illusion, sunk cost) that push people toward worse decisions.\n\nThis is the exact "can this student make a major purchase decision responsibly" checkpoint these standards are designed to measure.`,
        callout: {
          label: "Good to know",
          text: "The framework in this lesson works for far more than phones and cars — it's the same structure adults use for major purchases at any age.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on...",
        body: `Take thirty seconds before the next section. You don't need to write anything down yet — that comes at the end — but think through this:\n\n*Think of a real or upcoming big decision in your life (phone, car, housing, or something else). What's the one ongoing cost you're most likely to forget to count — and how would you find out its real number before deciding?*\n\nHolding a concrete answer to that question is the real goal of this lesson.`,
      },
      {
        id: "mini-case",
        kicker: "Mini-case",
        title: "Tyler's decision — with the full picture",
        image: "/images/lessons/fl-15-5.png",
        imageAlt: "Teen and older sibling reviewing a used car total-cost worksheet together at a kitchen table",
        body: `Back to Tyler's car from the hook story. He now knows the true numbers: roughly $2,268/year in payments plus about $4,350/year in insurance, fuel, maintenance, and fees — a year-one total near **$6,618**, not the "$189/month" the ad led with.\n\nTyler's part-time job brings in about $7,200/year after taxes. He also wants to keep building his emergency fund and has $1,200 saved for a cheaper, reliable used car he could buy with cash instead — no loan at all.\n\nUsing the six-step Decision Pro framework, what should Tyler seriously consider before signing anything on the financed car?`,
        checkIn: {
          prompt: "What's the Decision Pro move for Tyler at this point?",
          choices: [
            "Sign the financed car deal immediately since $189/month sounded manageable",
            "Compare the full total cost of the financed car against his actual income and the cash-purchase alternative, then sleep on it before deciding",
            "Ignore the cash-purchase option because a newer car is always better",
            "Assume insurance and maintenance costs don't apply since they weren't in the ad",
          ],
          correctIndex: 1,
          explanation:
            "Total cost, income reality, and a genuine alternative (a cheaper cash purchase) all belong in the comparison — plus a cooling-off period before signing.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "Mixed review: pulling it together",
        body: `One more check before the full knowledge check — this one mixes ideas from across the lesson, the way a real decision would.`,
        checkIn: {
          prompt: "A salesperson says: 'Don't overthink it — everyone finances this way, and it's only $150 a month.' What's the Decision Pro response?",
          choices: [
            "Agree immediately since $150/month sounds small",
            "Ask for the loan term and total of all payments, then total ongoing costs like insurance and maintenance before deciding",
            "Assume social proof ('everyone does it') proves it's a good total-cost decision",
            "Skip the cooling-off period since the salesperson seems trustworthy",
          ],
          correctIndex: 1,
          explanation:
            "Monthly payment size and social proof are exactly the pressures this lesson trains you to look past — total cost and a cooling-off period are the real test.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• Use a written framework: job → budget → options → total cost → tradeoffs → wait.\n• Phones, cars, and housing hide recurring costs — total them up, don't eyeball them.\n• Opportunity cost and flexibility matter as much as status, and a low monthly payment can hide a high total cost.\n• Watch the payment-size illusion and sunk cost trap; cooling-off beats sales pressure.\n\nFinish the **Knowledge check**, then reflect on one big decision using the framework.`,
      },
    ],
  },
  bigIdeas: [
    "Big purchases need a **framework**: purpose, budget, options, total cost, tradeoffs, and time to think.",
    "**Total cost of ownership** and **opportunity cost** matter more than the monthly payment headline — a low payment can hide a high total.",
    "Phones, cars, and housing all trade money for convenience — watch the payment-size illusion and sunk cost trap while choosing the fit that protects your goals.",
  ],
  keyTerms: [
    { term: "Total cost of ownership", definition: "Upfront price plus ongoing costs like insurance, maintenance, and fees." },
    { term: "Opportunity cost", definition: "The next-best alternative you give up when you choose something." },
    { term: "Depreciation", definition: "Decline in an asset's value over time." },
    { term: "Flexibility", definition: "Ability to change plans without huge penalties if life shifts." },
    { term: "Sunk cost", definition: "Past spending that should not automatically dictate future decisions." },
    { term: "Cooling-off period", definition: "A deliberate wait before finalizing a non-urgent purchase." },
    { term: "Loan term", definition: "The number of months or years scheduled for repaying a loan." },
    { term: "Payment-size illusion", definition: "Judging affordability by the monthly payment instead of the total cost." },
  ],
  realWorld:
    "Two friends want cars senior year. One takes a long high payment for a new model and pauses saving for prom. The other buys a reliable used car, keeps insurance manageable, and still funds an emergency buffer — same 'car job,' different Decision Pro outcomes.",
  quiz: [
    {
      id: "q1",
      question: "What should a Decision Pro include beyond the monthly payment?",
      choices: [
        "Only the brand logo popularity",
        "Upfront costs, insurance/maintenance/fees, and opportunity cost",
        "Salesperson confidence alone",
        "Whether friends will be jealous",
      ],
      correctIndex: 1,
      explanation:
        "Total cost and tradeoffs — not just the monthly number — drive sound big-money decisions.",
    },
    {
      id: "q2",
      question: "What is opportunity cost?",
      choices: [
        "A fee charged by phone carriers only",
        "The next-best thing you give up when you make a choice",
        "A type of car insurance",
        "Money you can never spend again for any reason",
      ],
      correctIndex: 1,
      explanation:
        "Choosing one path means not using that money/time for something else — that's opportunity cost.",
    },
    {
      id: "q3",
      question: "Which phone approach often fits a careful teen budget?",
      choices: [
        "Always finance the newest flagship and upgrade yearly regardless of need",
        "Compare device + plan + add-ons and consider keeping a capable phone longer",
        "Ignore plan costs because only the phone sticker matters",
        "Buy based solely on an influencer unboxing",
      ],
      correctIndex: 1,
      explanation:
        "Total cost and upgrade frequency matter. A capable phone kept longer often beats endless flagship installments.",
    },
    {
      id: "q4",
      question: "When comparing housing options, what belongs in the analysis?",
      choices: [
        "Rent alone with no utilities or deposits",
        "Rent, utilities, deposits, commute time/money, and lease flexibility",
        "Only which building looks best on social media",
        "Roommate coordination is irrelevant to cost",
      ],
      correctIndex: 1,
      explanation:
        "Housing decisions include cash needs, ongoing bills, commute, and flexibility — not rent in isolation.",
    },
    {
      id: "q5",
      question: "Why use a cooling-off period on big purchases?",
      choices: [
        "To guarantee the price never changes",
        "To reduce impulse and sales pressure so you can recheck total cost and goals",
        "Because it's illegal to buy same-day",
        "So you can ignore your budget",
      ],
      correctIndex: 1,
      explanation:
        "Waiting helps you verify numbers and opportunity cost without high-pressure vibes driving the choice.",
    },
    {
      id: "q6",
      question: "A loan advertises a low monthly payment stretched over a much longer term than usual. What's the likely tradeoff?",
      choices: [
        "There is no tradeoff — a lower payment is strictly better",
        "Total interest paid over the life of the loan is likely higher, even though the monthly number looks smaller",
        "The item automatically depreciates slower because of the longer term",
        "Insurance costs are eliminated by longer loan terms",
      ],
      correctIndex: 1,
      explanation:
        "Stretching payments over more months typically increases total interest paid, even as the monthly figure shrinks.",
    },
    {
      id: "q7",
      question: "What is the payment-size illusion?",
      choices: [
        "A rule that all payments must be paid in cash",
        "Judging whether something is affordable by its monthly payment size instead of its total cost",
        "A type of insurance discount",
        "A law limiting how big a monthly payment can be",
      ],
      correctIndex: 1,
      explanation:
        "Focusing on the monthly number instead of the total (payments × term, plus ongoing costs) can hide the real cost of a purchase.",
    },
    {
      id: "q8",
      question: "Tyler's financed car totals about $6,618 in year-one costs against a $7,200 annual income, while a reliable used car he could buy in cash would cost far less overall. What's the Decision Pro move?",
      choices: [
        "Sign the financed deal immediately since the ad's monthly number felt manageable",
        "Seriously compare the full total-cost numbers against his income and the cash-purchase alternative before deciding, then sleep on it",
        "Ignore the cash alternative because financing is always superior",
        "Assume insurance and maintenance don't apply since the ad didn't mention them",
      ],
      correctIndex: 1,
      explanation:
        "Comparing total cost against real income, seriously considering the alternative, and using a cooling-off period is the responsible Decision Pro process.",
    },
  ],
  reflection: {
    prompt:
      "Use the six-step Decision Pro framework on a real or hypothetical phone, car, or housing choice. Include total costs and one opportunity cost you're weighing.",
    placeholder:
      "Example: Job — reliable commute to my part-time job. Budget — $X upfront / $Y monthly. Options — transit vs used car. Total costs — … Opportunity cost — delaying prom fund…",
  },
};
