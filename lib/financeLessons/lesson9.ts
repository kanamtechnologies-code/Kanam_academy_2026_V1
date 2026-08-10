import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson9: AILessonConfig = {
  id: "fl-9",
  title: "9. Saving & Compound Growth",
  goal: "Explain interest, compounding, pay-yourself-first, and the time value of money — and build habits that let your savings grow without get-rich promises.",
  xpReward: 450,
  badge: "Growth Saver",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/8",
  nextHref: "/learn/finance/10",
  instructorScript: `**Coach's note**
Today's lesson: **Saving & Compound Growth**.

**Goal:** Explain interest, compounding, pay-yourself-first, and the time value of money — and build habits that let your savings grow without get-rich promises.

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
        image: "/images/lessons/fl-9.png",
        imageAlt: "Teen transferring money to savings on a banking app after a paycheck, realistic phone in hand",
        body: `Saving isn't just "putting money aside." It's giving your future self options — and understanding how **interest** and **time** can work for you. Today you'll learn how growth actually works, without hype.\n\nHere's our roadmap:\n\n• **A quick story** — what happens with zero savings buffer.\n• **Interest, compounding, and time value** — the three ideas that build on each other.\n• **A worked example** — real numbers, rounded and simplified.\n• **A myth to bust** — you don't need a fortune to start.\n• **The Rule of 72** — a mental shortcut, used carefully.\n• **A case study and self-check** — before you hit the knowledge check.\n\nNo get-rich shortcuts. Just clear math and habits that scale with your paycheck.`,
        callout: {
          label: "Why it matters",
          text: "Starting early — even with $10 a week from a part-time job — can matter more than waiting for a 'perfect' larger amount later. Time is a tool you already have.",
        },
      },
      {
        id: "hook-story",
        kicker: "A quick story",
        title: "Jordan's cracked-screen scramble",
        body: `Jordan's phone screen shatters on a Tuesday. Repair cost: $90. Jordan's savings account balance: $0. To get the phone fixed before a big test that needs an app, Jordan uses a "pay-in-4" app that adds a late fee the moment one payment slips.\n\nJordan's friend Priya had the same phone, the same income from a weekend job, and the same $90 repair bill last month. The difference? Priya had been moving $10 a week into a savings account for a few months — not because she predicted a cracked screen, but because "pay yourself first" was already a habit. She paid the repair shop directly and moved on with her day.\n\nSame income. Same emergency. Very different Tuesday.`,
        callout: {
          label: "Notice",
          text: "Neither Jordan nor Priya is 'better' with money by nature. Priya just had a system running before the emergency showed up. That's what this lesson builds.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Saving words in plain English",
        body: `These terms show up on banking apps, statements, and adult conversations. Here's the teen translation:\n\n• **Interest** — money paid for the use of money (you earn it on savings; you pay it on loans).\n• **Principal** — the original amount you save or borrow, before interest.\n• **Compound interest** — interest calculated on principal *plus* interest already earned.\n• **APY / rate** — a percentage that describes how fast money grows (or how expensive a loan is).\n• **Pay yourself first** — treating savings as a non-negotiable "bill" you pay before discretionary spending.\n• **Time value of money** — money available now can be used or grown; waiting has a cost.\n\nWe'll use each idea with examples next — no memorizing first.`,
        callout: {
          label: "Pro tip",
          text: "If a word feels fuzzy, swap in the plain meaning: interest ≈ 'rent on money'; compounding ≈ 'growth on growth.'",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "Interest: earning (or paying) for the use of money",
        body: `When you keep money in a savings account that pays interest, the bank pays **you** a small percentage for using those deposits. When you borrow — like a car loan or credit card — **you** pay interest to the lender.\n\nSimple picture: save $100 at 4% for a year (simplified annual interest) → about $4 of interest, so you end near $104. Real accounts may compound more often and rates change — the point is direction, not a promise.\n\nInterest rates on savings are often modest. That's okay. The skill is building the habit so larger amounts later have a place to grow — and so you're not forced into expensive borrowing when your phone dies or your car needs tires.`,
        bullets: [
          "**Earn** interest when you save/lend; **pay** interest when you borrow.",
          "Rate × time × principal drive the rough size of interest.",
          "Low rates still reward consistency — especially alongside an emergency fund.",
        ],
        callout: {
          label: "Watch out",
          text: "Ads that promise huge guaranteed returns on 'savings' are usually selling something else. Treat extreme claims as a red flag.",
        },
        checkIn: {
          prompt: "Malik keeps money in a savings account and also has a car loan. Where does he earn interest, and where does he pay it?",
          choices: [
            "He earns interest on the savings account and pays interest on the car loan",
            "He earns interest on the car loan and pays interest on the savings account",
            "He only pays interest if he misses a loan payment; otherwise no interest applies",
            "He earns interest on both because any account with a balance grows the same way",
          ],
          correctIndex: 0,
          explanation:
            "Savings pays Malik interest for keeping money there; borrowing (the loan) charges him interest for the bank's money whether or not he's ever late — interest isn't just a late fee, and loans don't work like savings accounts.",
        },
      },
      {
        id: "concept-2",
        kicker: "Growth on growth",
        title: "Compounding: why starting early helps",
        image: "/images/lessons/fl-9-2.png",
        imageAlt: "Educational compound growth chart: small deposits growing steeper over years, teal and navy colors",
        body: `**Compounding** means interest gets added to your balance, and then future interest is calculated on that larger balance. Over years, the "interest on interest" can become a bigger share of growth.\n\nTiny illustration (rounded, educational only):\n• Save $25 from each paycheck for a year → the balance grows from deposits *and* any interest earned.\n• Someone who starts senior year may need much higher monthly deposits to catch up to a friend who started sophomore year — because they missed years of compounding.\n\nCompounding is powerful **and** slow at first. Early balances look boring. That's normal. The edge is consistency + time, not a viral tip.`,
        callout: {
          label: "Myth check",
          text: "Compounding is not a lottery ticket. It rewards patience and regular deposits — not day trading or 'doubling in a week' schemes.",
        },
        checkIn: {
          prompt: "Riley and Sam each save $25 a month in the same type of account, but Riley started freshman year and Sam started senior year. Why is Riley likely to end up ahead?",
          choices: [
            "Riley has more years for interest to build on both the deposits and the interest already earned",
            "There's no real advantage as long as both deposit the same monthly amount",
            "Riley's deposits count double compared to Sam's",
            "Riley's bank gives an automatic bonus rate to younger savers",
          ],
          correctIndex: 0,
          explanation:
            "More years in the account means more compounding periods — interest earning on interest already earned. Depositing the same amount isn't enough to close the gap (last choice); the extra years matter, not a special rate or double-counting.",
        },
      },
      {
        id: "concept-3",
        kicker: "Tradeoffs",
        title: "Time value of money — and pay yourself first",
        body: `A dollar you can use **today** is different from a dollar you only get later — because today's dollar can be spent, saved, or invested (with risk). That's the **time value of money** in everyday language.\n\n**Pay yourself first** is the habit that turns the idea into action:\n1. Get paid (part-time job, allowance, babysitting).\n2. Move a planned amount to savings *before* you hit the mall or renew subscriptions.\n3. Live on what's left — adjust the plan if needed, don't skip the transfer forever.\n\nAutomation helps: scheduled transfers beat "I'll save whatever's left" (often nothing). Pair this with goals from earlier lessons — prom fund, sports gear, first-apartment starter — so the money has a purpose.`,
        bullets: [
          "Decide the savings amount when you're calm — not mid-scroll in a store.",
          "Even 5–10% of income (when possible) builds muscle memory.",
          "Separate 'emergency' from 'goal' savings if it helps you leave the emergency pile alone.",
        ],
        callout: {
          label: "Try this week",
          text: "Name one savings target (even $50 for a school event) and one automatic or recurring transfer — even $5 — that moves money before you spend.",
        },
        checkIn: {
          prompt: "Devon gets paid every Friday and wants to build a 'pay yourself first' habit. What should Devon do?",
          choices: [
            "Make one large deposit at the end of the year and call the habit done",
            "Save only in months when there isn't anything he wants to buy",
            "Wait to see what's left after weekend plans, then save whatever remains",
            "Move a set amount to savings automatically before spending, then live on the rest",
          ],
          correctIndex: 3,
          explanation:
            "Pay yourself first means the transfer happens before discretionary spending, not after — waiting for leftovers (first choice) usually means little or nothing gets saved.",
        },
      },
      {
        id: "worked-example",
        kicker: "Show the math",
        title: "Worked example: watching $500 grow",
        body: `Let's use simplified, rounded numbers to see compounding in slow motion. Imagine $500 in an account with a simplified 5% annual rate (real rates vary and change — this is for learning the pattern, not a promise):\n\n• **Start:** $500.00 principal.\n• **End of Year 1:** +5% of $500 (~$25) → **$525.00**.\n• **End of Year 2:** +5% of $525 (~$26.25) → **$551.25**.\n• **End of Year 3:** +5% of $551.25 (~$27.56) → **$578.81**.\n\nNotice the interest earned each year *grows* — $25, then $26.25, then $27.56 — even though the rate stayed the same. That's compounding: each year's interest is calculated on a bigger balance than the year before.`,
        bullets: [
          "Year 1 ending balance: $525.00",
          "Year 2 ending balance: $551.25",
          "Year 3 ending balance: $578.81",
        ],
        callout: {
          label: "Reality check",
          text: "Real accounts may compound monthly or daily, and rates change over time. This example ignores taxes and fees on purpose — it's here to show the *pattern*, not to promise a return.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "Common myth: \"I need a lot of money to start\"",
        body: `A lot of teens (and adults) put off saving because they think it "doesn't count" unless the deposit is big. Two myths to retire:\n\n**Myth 1: "Compounding only matters for large amounts."** In reality, compounding rewards *time* more than the size of your very first deposit. A small amount started now can end up ahead of a larger amount started years later — because it had more years to grow.\n\n**Myth 2: "Cash in a jar is basically the same as cash in a savings account."** A jar doesn't pay interest, isn't protected the way many bank accounts are, and is easier to "borrow from" for a snack run. An account keeps money working and a little more separated from impulse spending.\n\nThe fix for both myths is the same: start with whatever amount is realistic today, and let consistency do the rest.`,
        checkIn: {
          prompt: "Jayden says he'll start saving once he has '$1,000 to really make it count.' What's the flaw in that plan, based on the lesson?",
          choices: [
            "Small deposits don't count toward compounding until they reach a minimum balance",
            "Waiting delays the years compounding needs, so a smaller amount started now can end up ahead of a bigger start later",
            "It's not really a flaw — the idea that you need a lot of money to start is actually true",
            "Banks generally won't open an account for less than $1,000",
          ],
          correctIndex: 1,
          explanation:
            "Compounding rewards time more than the size of the first deposit — delaying to save up a 'real' amount just gives up years of growth. There's no minimum balance requirement for compounding to start working.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Estimate the growth",
        body: `Here's a quick thought experiment — no calculator required, just reasoning:\n\nTwo savers each open an account today. Saver A deposits $20 every single month without skipping. Saver B deposits $20 most months but skips several months a year when things feel tight — and the account sits at $0 those months.\n\n**Which factor do you think matters more to the final balance after a few years — getting a slightly higher interest rate, or depositing consistently without long gaps?**\n\nMost of the time, **consistency wins over rate** for smaller, real-world balances. A slightly better rate on an inconsistent pile of deposits usually can't out-earn steady deposits that never stop compounding. Rate matters — but showing up matters more.`,
        callout: {
          label: "Try this now",
          text: "Estimate 5% of your own weekly income (job, allowance, gig money). That rough number is a realistic starting 'pay yourself first' amount — not a guess pulled from an ad.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "The Rule of 72: a quick mental trick",
        image: "/images/lessons/fl-9-4.png",
        imageAlt: "Notebook page with the Rule of 72 written out next to a simple hand-drawn growth curve, teen study desk",
        body: `The **Rule of 72** is a shortcut for *roughly* estimating how many years it takes money to double at a steady annual rate: divide 72 by the rate.\n\n• At a simplified ~4% rate: 72 ÷ 4 ≈ **18 years** to roughly double.\n• At a simplified ~6% rate: 72 ÷ 6 ≈ **12 years** to roughly double.\n• At a simplified ~8% rate: 72 ÷ 8 ≈ **9 years** to roughly double.\n\nThis is a rough estimate for steady, unchanging rates — real accounts have rates that move, fees that nibble at growth, and taxes that may apply. Use the Rule of 72 to build intuition about how rate and time interact, not to plan an exact future balance.`,
        bullets: [
          "Higher simplified rate → fewer years to roughly double (and usually more risk or fewer options).",
          "The rule ignores fees, taxes, and rate changes — it's an estimate, not a formula for reality.",
          "It works for savings *and* for understanding how fast debt can grow, too.",
        ],
        callout: {
          label: "Watch out",
          text: "The Rule of 72 is not a promise of any specific return. Anyone using it to guarantee you'll double your money by a certain date is overselling a rough estimate.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Starting at 16 vs. waiting until 25",
        body: `Compare two hypothetical savers, same habits, different start dates (rounded numbers, for illustration only):\n\n• **Saver A** starts putting $25/month into an account at age 16 and never stops.\n• **Saver B** puts the same $25/month into the same type of account but doesn't start until age 25 — nine years later.\n\nBy the time Saver B starts, Saver A already has nine extra years of deposits *and* nine extra years of compounding stacked on top of those deposits. To end up in a similar spot, Saver B would typically need to deposit noticeably more per month than Saver A ever had to — just to make up for the missing years.\n\nNeither path is a moral failure — life circumstances differ. The lesson is about the *math of time*, not judging where someone starts.`,
        bullets: [
          "Saver A: starts at 16, more years of compounding, smaller monthly amount needed.",
          "Saver B: starts at 25, fewer years of compounding, larger monthly amount needed to catch up.",
          "The advantage isn't about being 'smarter' — it's about starting the clock sooner.",
        ],
        checkIn: {
          prompt: "Two savers deposit the same monthly amount, but Saver A starts 9 years earlier than Saver B. What's the most likely result, all else equal?",
          choices: [
            "Saver A gets more years of compounding, which usually helps their balance grow more",
            "Saver B can fully catch up just by depositing for a few extra months",
            "The 9-year head start only matters if Saver A also gets a higher interest rate",
            "Both savers will end up with about the same balance since the monthly deposit is identical",
          ],
          correctIndex: 0,
          explanation:
            "Extra years mean extra compounding periods, which is hard to fully close with the same deposit later (ruling out the 'catch up' choice). The advantage comes from time in the account, not a higher rate.",
        },
      },
      {
        id: "behavioral-trap",
        kicker: "Watch your brain",
        title: "The behavioral trap: \"I'll start when I have more money\"",
        body: `This trap has two forms:\n\n**Waiting for the "right" amount.** Some people wait to start saving until they feel like the deposit will be "worth it" — $5 or $10 feels too small to matter, so nothing happens at all. But $0 deposited never compounds.\n\n**Lifestyle creep.** When income goes up — more hours at work, a raise, a better-paying gig — spending quietly rises to match it, and the "extra" money for savings never actually appears. Your brain treats the new income level as the new normal almost instantly.\n\nBoth traps share a fix: decide the savings move *before* the money lands, and treat any raise as a chance to bump the automatic transfer up a little before your spending catches up to it.`,
        callout: {
          label: "Reality check",
          text: "Progress compounds too. A habit built on $5 a week can scale later — waiting for 'perfect' just delays the years compounding needs.",
        },
      },
      {
        id: "habits",
        kicker: "Make it real",
        title: "Teen-ready growth habits (no hype)",
        image: "/images/lessons/fl-9-3.png",
        imageAlt: "Photo of automatic transfer reminder on a calendar next to a labeled savings envelope for a prom fund",
        body: `You don't need a huge paycheck to practice Growth Saver skills:\n\n• **Split windfalls** — birthday money or a tax refund: enjoy some, save some, don't invent a lifestyle on one-time cash.\n• **Raise the floor** — when your hours go up at work, increase the automatic save a little before lifestyle expands.\n• **Protect the pile** — keep emergency money boring and accessible; don't treat it like play money for a weekend.\n• **Ignore flex culture** — someone else's new sneakers or car aren't a financial plan.\n\nGrowth is mostly behavior: deposit regularly, avoid high-interest debt traps you already studied, and let time do quiet work.`,
        callout: {
          label: "Reality check",
          text: "If money is extremely tight, saving may be tiny or paused while you cover needs. The principle still matters: when cash flow allows, rebuild the habit.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on…",
        body: `Take thirty seconds — in your head or in a notes app — to answer honestly:\n\n**What is one thing that has stopped you from saving consistently so far, and what's one small change that could fix it?**\n\nMaybe it's "I forget," and the fix is an automatic transfer. Maybe it's "I don't have income yet," and the fix is picking a savings percentage now so it's ready when you do. There's no wrong answer here — this is just building the self-awareness that makes habits stick later.`,
        callout: {
          label: "No wrong answers",
          text: "You'll revisit a version of this question in the reflection at the end of the lesson — this is just the warm-up.",
        },
      },
      {
        id: "mini-case",
        kicker: "Case study",
        title: "Maria's two summers",
        image: "/images/lessons/fl-9-5.png",
        imageAlt: "Teen counting summer job earnings at a kitchen table with a simple savings tracker notebook, realistic photo",
        body: `**Summer 1:** Maria works a part-time job and decides to move $15 every Friday into a savings account — 10 weeks, $150 total, before any interest. She barely notices it missing from her weekly spending money.\n\n**Between summers:** The account sits, earning a small, simplified amount of interest — nothing dramatic, just quiet growth on the $150.\n\n**Summer 2:** Maria gets a small raise at her job. Instead of spending all of it, she bumps her weekly transfer to $20 and keeps going. By the time her laptop charger port fails and needs a $60 repair, she pays it from savings — no high-interest "buy now, pay later" plan, no stress text to her parents asking for an emergency loan.\n\nWhat worked: starting small, automating it, and increasing the amount when income went up instead of letting lifestyle creep eat the raise.`,
        callout: {
          label: "Try this",
          text: "Sketch your own 'two summers' plan: a starting weekly amount, and one rule for what happens if your income goes up.",
        },
      },
      {
        id: "ask-before-sign",
        kicker: "Before you open",
        title: "Savings account questions — before you deposit",
        body: `Opening a savings spot for goals or an emergency fund? Ask these with a trusted adult:

• **APY** — Annual percentage yield; how much interest does the balance earn?
• **Compounding frequency** — Daily/monthly compounding adds up slightly faster.
• **Transfer rules** — How many withdrawals per month before fees?
• **Minimum balance** — Any fee if you dip below?
• **Linked accounts** — Easy transfer from checking on payday?
• **FDIC/NCUA** — Is the institution insured?
• **Goal labels** — Can you nickname accounts ("phone repair," "emergency")?

Higher APY helps, but **automating deposits** usually beats hunting another 0.1% if you won't save consistently.`,
        callout: {
          label: "Pro tip",
          text: "Set automation first, then optimize APY. A great rate you never fund is still $0 saved.",
        },
      },
      {
        id: "worked-tradeoff",
        kicker: "Do the math",
        title: "Maria's two summers — compound growth side by side",
        body: `**Summer 1 — Start at 16:** Save **$50/month** for 9 months → $450 principal. At **4% APY** compounded monthly, year-end balance ≈ **$460** (interest small but real).

**Summer 2 — Wait until 25:** Same $50/month habit starts 9 years later. By age 26, only **9 months** of contributions = $450 principal again — but she missed 9 years of small compounding on earlier deposits.

**Illustrative 9-year head start** on $50/month at 4%: roughly **$6,000+** contributed plus earned interest vs. starting at 25 with zero balance.

Compounding rewards **time + consistency**, not lottery wins.`,
        bullets: [
          "Small amounts **early** beat large amounts **late** for growth.",
          "Interest on savings is modest — the habit is the engine.",
          "Phone-repair money stays accessible; don't lock emergency funds away.",
        ],
      },
      {
        id: "second-scenario",
        kicker: "Round two",
        title: "Jordan's cracked screen — fund now vs. borrow",
        body: `Jordan needs a **$120** screen repair. Options:

• **Sinking fund (had $100 saved):** Pay $100 + $20 from next paycheck → **$0 debt**, 1-week wait.
• **BNPL $120 over 4 payments:** $30/payment — but if a fee or missed payment triggers, cost rises.
• **Skip repair, use old phone:** $0 cash, but can't access work schedule app reliably → **opportunity cost** on income.

The lesson isn't "never borrow." It's matching the tool to the timeline: short needs with a sinking fund beat BNPL stacking when you can plan even a few weeks ahead.`,
        checkIn: {
          prompt: "You need $120 in 3 weeks and already have $70 in a labeled repair fund. Best saving-habit move?",
          choices: [
            "Put it on a high-APR card because emergencies don't count",
            "Drain the repair fund for something else and BNPL the screen",
            "Wait until you have $500 saved before any repair",
            "Add $25 from the next two paychecks to top up the fund, then pay cash",
          ],
          correctIndex: 3,
          explanation:
            "Topping up a sinking fund and paying cash avoids BNPL fees and keeps the repair fund doing its job.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Self-check",
        title: "Before the knowledge check…",
        body: `Quick gut-check on the whole lesson: interest rewards saving and costs borrowing; compounding turns time into growth; pay yourself first makes the habit automatic; the Rule of 72 estimates doubling time; and the biggest trap is waiting for a "perfect" moment that never quite arrives.\n\nAnswer the check-in below, then head into the full knowledge check.`,
        checkIn: {
          prompt: "Which combination best describes a strong Growth Saver habit, based on this lesson?",
          choices: [
            "Chase whichever account currently advertises the highest rate, even if it means moving money often",
            "Save consistently but skip an emergency fund since compounding will cover surprises",
            "Automate small regular deposits early, and let compounding work over time",
            "Save a large lump sum once a year instead of smaller regular deposits",
          ],
          correctIndex: 2,
          explanation:
            "Consistency plus time is the core Growth Saver formula. Chasing rates or skipping an emergency fund both undercut the habit the lesson builds.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Interest** rewards saving (and costs borrowing).\n• **Compounding** is growth on growth — strongest with time + consistency.\n• **Time value** and **pay yourself first** turn theory into a repeatable habit.\n• The **Rule of 72** estimates doubling time; starting early beats waiting for "enough."\n• Small, steady deposits beat waiting for a dramatic windfall.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on a savings automation you'll actually keep.`,
      },
    ],
  },
  bigIdeas: [
    "**Interest** is the price of using money — you can earn it on savings or pay it on debt.",
    "**Compounding** grows balances by earning on prior interest; time and consistency matter more than hype.",
    "**Pay yourself first** moves savings before spending so growth has a chance to start.",
  ],
  keyTerms: [
    { term: "Interest", definition: "Money earned on savings (or paid on loans) for the use of money." },
    { term: "Principal", definition: "The original amount saved or borrowed before interest." },
    { term: "Compound interest", definition: "Interest calculated on principal plus interest already earned." },
    { term: "Pay yourself first", definition: "Saving a planned amount as soon as income arrives, before discretionary spending." },
    { term: "Time value of money", definition: "The idea that money available now can be used or grown, so timing matters." },
    { term: "APY / interest rate", definition: "A percentage describing how quickly savings grow (or how expensive borrowing is)." },
    { term: "Rule of 72", definition: "A rough mental shortcut (72 ÷ rate) for estimating years to double money at a steady rate." },
  ],
  realWorld:
    "You automatically move $15 from each paycheck into savings. Week to week you barely notice — but after a few months you've got enough to cover a cracked phone screen or a bus pass without a high-interest loan.",
  quiz: [
    {
      id: "q1",
      question: "Aaliyah's account balance grew by about $25 in year one and $26.25 in year two, even though the interest rate didn't change. What does this show?",
      choices: [
            "Compound interest: each year's interest is calculated on principal plus interest already earned",
            "The bank made an error, since the interest earned should stay exactly the same each year",
            "Interest is only calculated once, at the very start of the account",
            "Aaliyah's rate secretly increased between year one and year two",
          ],
      correctIndex: 0,
      explanation:
        "The growing interest amount is compounding in action — later interest is calculated on a bigger balance (principal plus prior interest), not a rate change or an error.",
    },
    {
      id: "q2",
      question: "Sophie's paycheck hits her account on Friday. Under 'pay yourself first,' what should happen next?",
      choices: [
        "She spends on whatever she wants over the weekend, then saves anything left on Monday",
        "A planned amount moves to savings right away, before her weekend spending",
        "She saves only if her paycheck was larger than usual that week",
        "She keeps everything in checking so it's easier to track later",
      ],
      correctIndex: 1,
      explanation:
        "Pay yourself first flips the order — savings happens first, like a bill — instead of waiting to see what's left over or making it conditional on a bigger paycheck.",
    },
    {
      id: "q3",
      question: "Two students each plan to save $15 a week, but one starts freshman year and the other starts senior year. Why might starting earlier matter more than the exact weekly amount?",
      choices: [
        "Earlier deposits get more years for compounding to work on them",
        "Only large weekly amounts actually trigger compounding",
        "Compounding resets back to zero at the start of every school year",
        "The interest rate automatically goes up the longer someone waits to start",
      ],
      correctIndex: 0,
      explanation:
        "Time is the key ingredient — more years means more compounding periods. Compounding doesn't require a large amount, doesn't reset yearly, and waiting doesn't raise the rate.",
    },
    {
      id: "q4",
      question: "Marcus is deciding whether to spend $40 now on a jacket or set it aside for six months. Which idea reflects the 'time value of money' concept from the lesson?",
      choices: [
            "Money in the future is always worth more than money today, so waiting is always better",
            "The $40 available now could be spent, saved, or grown; waiting means giving up that choice for a while",
            "Interest rates stay fixed forever once you open an account",
            "Cash kept at home always outperforms any savings account over time",
          ],
      correctIndex: 1,
      explanation:
        "Time value of money is about the option to use, save, or grow money now — not a guarantee that waiting or keeping cash at home is automatically better.",
    },
    {
      id: "q5",
      question: "Talia wants to build a realistic Growth Saver habit with her part-time job income. Which approach fits best?",
      choices: [
            "Skip an emergency fund entirely since her savings account will cover anything",
            "Set up a small automatic transfer to savings and increase it when her hours (and pay) go up",
            "Hold off on saving until she can deposit at least a few hundred dollars at once",
            "Wait for an ad promising a guaranteed high return before opening any account",
          ],
      correctIndex: 1,
      explanation:
        "Automating a small, growing deposit is the realistic habit the lesson describes. Waiting for a big ad-promised return or a large deposit both delay the years compounding needs.",
    },
    {
      id: "q6",
      question: "Using the Rule of 72 as a rough estimate, about how many years would it take money to roughly double at a simplified 8% rate?",
      choices: [
        "72 years",
        "About 9 years (72 ÷ 8)",
        "8 years",
        "It can't be estimated at all",
      ],
      correctIndex: 1,
      explanation:
        "72 ÷ 8 ≈ 9. Mixing up the rate and the answer, or misreading the whole number 72 as the answer, are common slip-ups — the Rule of 72 is a widely used shortcut, not something impossible to estimate.",
    },
    {
      id: "q7",
      question: "Devin tells himself, 'I'll start saving once I get a raise at work.' What's the risk in that plan, according to the lesson?",
      choices: [
            "It guarantees Devin will end up with a smaller final balance no matter what",
            "Raises are rare, so the plan will probably never come up at all",
            "It's actually a strong plan, since more income always means easier saving",
            "Spending often rises to match new income, so the 'right time' may never actually arrive",
          ],
      correctIndex: 3,
      explanation:
        "Lifestyle creep means spending quietly rises with income, so waiting for a raise doesn't reliably create room to save — deciding the savings move in advance breaks the pattern.",
    },
    {
      id: "q8",
      question: "In Maria's case study, what allowed her to cover a laptop repair without a high-interest loan?",
      choices: [
            "A single large deposit she made right before the laptop broke",
            "Borrowing the repair cost from a friend and paying it back slowly",
            "Consistent small weekly deposits that built a cushion over time, increased after her raise",
            "Ignoring her account balance until the emergency showed up",
          ],
      correctIndex: 2,
      explanation:
        "Maria's steady, automatic weekly deposits — bumped up after a raise instead of spent — built the cushion she used. It wasn't a single last-minute deposit or borrowed money.",
    },
  ],
  reflection: {
    prompt:
      "Name one savings goal (prom, sports gear, car fund, etc.) and describe how you'll pay yourself first this month — amount or percent, when you'll move it, and how you'll protect that money from impulse spending.",
    placeholder:
      "Example: Goal — $150 for senior trip. I'll transfer $15 every Friday from my paycheck before weekend spending…",
  },
};
