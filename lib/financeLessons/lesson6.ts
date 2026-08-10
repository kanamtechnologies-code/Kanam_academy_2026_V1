import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson6: AILessonConfig = {
  id: "fl-6",
  title: "6. Spending Tracking & Emergency Funds",
  goal: "Track spending without obsessive guilt, use sinking funds for planned irregular costs, and start a small emergency fund for true surprises.",
  xpReward: 300,
  badge: "Cash Flow Keeper",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/5",
  nextHref: "/learn/finance/7",
  instructorScript: `**Coach's note**
Today's lesson: **Spending Tracking & Emergency Funds**.

**Goal:** Track spending without obsessive guilt, use sinking funds for planned irregular costs, and start a small emergency fund for true surprises.

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
        image: "/images/lessons/fl-6.png",
        imageAlt: "Teen reviewing bank app spending history on a smartphone at a school desk",
        body: `A budget is a plan. **Tracking** is how you see whether reality matches the plan. Today you'll learn lightweight ways to track spending, set up **sinking funds** for predictable \"irregular\" costs, and start an **emergency fund** for true surprises.\n\nHere's our roadmap:\n\n• **Cash flow** — money in vs. money out.\n• **Tracking methods** — apps, notes, receipts — pick one you'll use.\n• **Sinking funds** — save ahead for known future costs, with real math.\n• **Emergency funds** — starter cushions for the unexpected.\n• **Traps and habits** — how the emergency jar gets raided, and how Cash Flow Keepers avoid it.\n• **A mini case** you'll work through before the knowledge check.\n\nGoal: awareness and preparedness — not perfectionism.`,
        callout: {
          label: "Why it matters",
          text: "You can't improve what you never measure. Tracking turns money mysteries into solvable patterns.",
        },
      },
      {
        id: "hook-story",
        kicker: "True-to-life",
        title: "Amara's \"where did it go\" week",
        body: `Amara checked her bank app on a Sunday and stared at the number: **$38** left, when she thought she had closer to **$90**. Nothing on the statement looked crazy — a few coffee runs, a ride-share home after practice, a birthday gift for a friend.\n\nHere's what Amara didn't have: any record of what she'd spent *before* she checked. She wasn't tracking — she was just periodically surprised.\n\nTwo weeks later, after keeping a simple running list, Amara noticed something specific: she was spending about **$9 a week** on small drink runs she barely remembered making. That pattern had been invisible without tracking — and it's exactly the kind of \"leak\" this lesson will teach you to spot in your own spending.`,
        callout: {
          label: "Keep this in mind",
          text: "Tracking isn't about guilt. It's about turning fuzzy surprise into a clear, fixable pattern.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `• **Cash flow** is the movement of money in (income) and out (spending/saving) over time.\n• **Tracking** means recording spending so you can see totals by category.\n• A **sinking fund** is money you save gradually for a known future expense (prom, car insurance, new phone).\n• An **emergency fund** is money reserved for unexpected necessary costs (car repair, urgent ride home, lost phone you need for work).\n• A **leak** is small, repeated spending that adds up unnoticed (daily snacks, unused subscriptions).\n• **Available balance** is the money you can actually spend once pending transactions are accounted for.\n\nEmergencies are surprises. Sinking funds are expected — you're just paying yourself early.`,
        callout: {
          label: "Pro tip",
          text: "If you can name the expense and roughly when it hits, it's usually a sinking fund — not an \"emergency.\"",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea #1",
        title: "Cash flow: in, out, and leftover",
        body: `**Positive cash flow** for a period means income exceeded spending (you have leftover to save or buffer). **Negative cash flow** means you spent more than you took in — drawing down savings or borrowing.\n\nFor teens, cash flow often swings with work hours. Tracking two or three pay periods teaches you:\n\n• Which categories spike on weekends\n• Whether \"small\" purchases are the real budget-killers\n• How much you can safely move to savings each payday\n\nCash flow awareness is the heart of the **Cash Flow Keeper** badge.`,
        bullets: [
          "Income − spending = leftover (or shortfall).",
          "Track long enough to see patterns, not one dramatic day.",
          "Irregular income needs a conservative plan.",
        ],
        callout: {
          label: "Watch out",
          text: "Looking only at your bank balance can mislead you when pending charges haven't posted yet. Available balance matters.",
        },
        checkIn: {
          prompt: "Devon earned $180 this pay period but spent $215 once gas, food, and a concert ticket added up. What does this describe?",
          choices: [
            "A budgeting error that means his whole plan is broken",
            "Negative cash flow — spending outpaced income, so he drew down savings or borrowed to cover it",
            "Zero-based budgeting working as intended",
            "Positive cash flow, since he still has money in some account",
          ],
          correctIndex: 1,
          explanation:
            "Spending more than you take in for a period is negative cash flow — it doesn't mean the whole budget failed or that this is what zero-based budgeting is supposed to look like.",
        },
      },
      {
        id: "concept-2",
        kicker: "The big idea #2",
        title: "Track spending in a way you'll continue",
        image: "/images/lessons/fl-6-2.png",
        imageAlt: "Spreadsheet-style tracking sheet on a laptop with categories lunch, gas, apps, and weekly totals",
        body: `Pick **one** method:\n\n• Notes app list with category tags\n• Simple spreadsheet\n• Bank/credit app categories (review weekly)\n• Photo receipts into an album for a week, then total\n\nRules of thumb:\n\n• Track for at least **14 days** before judging yourself.\n• Round if needed — direction beats penny-perfect stress.\n• Separate **needs, wants, and goals** when you review.\n• Look for **leaks**: subscriptions you forgot, daily boba runs that quietly total $50+.\n\nTracking is information. Use it to adjust the budget — not to spiral.`,
        callout: {
          label: "Why it matters",
          text: "Most people underestimate discretionary spending. Data replaces guessing.",
        },
        checkIn: {
          prompt: "Why does this lesson suggest tracking spending for at least 14 days before judging yourself?",
          choices: [
            "Because tracking for a shorter time is against most banking app rules",
            "Because 14 days is required to unlock budgeting features in most apps",
            "Because one week always looks identical to the next for most people",
            "To collect enough data to see real patterns instead of reacting to one unusual day",
          ],
          correctIndex: 3,
          explanation:
            "A short window can be misleading — a couple weeks of data reveals real patterns rather than one-off noise. There's no app or bank rule requiring a minimum tracking period.",
        },
      },
      {
        id: "concept-3",
        kicker: "The big idea #3",
        title: "Sinking funds: save before the bill arrives",
        body: `A **sinking fund** turns a scary lump sum into small, scheduled saves.\n\nExample: Prom costs ~$240 in 6 months → about **$40/month** into a \"prom\" savings bucket.\n\nOther teen sinking-fund ideas:\n\n• Car maintenance / new tires\n• Holiday gifts\n• Yearbook / senior trip fees\n• Phone replacement on a timeline\n• Sports or club dues\n\nLabel the money (sub-account, envelope, or notes). When the expense hits, you're ready — and you don't call it an emergency.`,
        bullets: [
          "Known future cost ÷ months left ≈ monthly save.",
          "Label the fund so you don't \"borrow\" it casually.",
          "Sinking funds protect your emergency money.",
        ],
        callout: {
          label: "Pro tip",
          text: "Automate the transfer on payday when you can. Sinking funds fail most often from \"I'll move it later.\"",
        },
        checkIn: {
          prompt: "Maya knows prom is five months away and will cost about $200. Which savings approach fits this expense best?",
          choices: [
            "Treat it as an emergency and pull from her emergency fund when the bill comes due",
            "Start a sinking fund now, since it's a known cost she can schedule toward",
            "Wait until a month before prom, then figure out the money",
            "Skip planning since $200 is too small to bother budgeting for",
          ],
          correctIndex: 1,
          explanation:
            "A known, scheduled future cost like prom is exactly what a sinking fund is for — it's not an emergency, and waiting until the last month turns a plannable cost into a scramble.",
        },
      },
      {
        id: "worked-example",
        kicker: "Let's do the math",
        title: "Sinking fund math, step by step",
        body: `Let's actually run the numbers. Suppose you know:\n\n• **Yearbook + senior trip fees:** $180 total\n• **Time until due:** 4 months\n\n**Step 1:** $180 ÷ 4 months = **$45/month**.\n**Step 2:** If you're paid biweekly, that's about **$22.50 per paycheck** (2 paychecks per month).\n**Step 3:** Set an automatic or manual transfer of $22.50 into a labeled \"fees\" bucket every payday.\n**Step 4:** Check in monthly — did you actually move the money? If a month got skipped, recalculate the remaining amount ÷ remaining months so you're still on pace.\n\nBy month 4, you have the full $180 ready — no scrambling, no borrowing, no calling it an emergency.`,
        callout: {
          label: "Try this",
          text: "Pick one real upcoming cost in your life and do this exact math. Write down the monthly number.",
        },
        checkIn: {
          prompt: "You need $150 for a trip in 3 months and get paid weekly (about 13 pay periods). Roughly how much should you set aside per paycheck?",
          choices: [
            "About $50 per paycheck",
            "About $3 per paycheck",
            "The full $150 out of your very next paycheck",
            "About $11–12 per paycheck",
          ],
          correctIndex: 3,
          explanation:
            "$150 ÷ 13 pay periods ≈ $11.50 per paycheck — a small, scheduled amount instead of one scramble at the end. $50/week would overshoot the total well before the trip.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth check",
        title: "Saving myths — cleared up",
        body: `• **Myth:** \"If I can't save a lot, saving isn't worth it.\" **Reality:** Small, consistent sinking-fund deposits add up faster than people expect — $20 a paycheck becomes real money over months.\n• **Myth:** \"My emergency fund is basically a backup fun fund.\" **Reality:** Using it for concert tickets or sales turns your safety net into a spending account — and leaves you exposed when a real emergency hits.\n• **Myth:** \"Tracking spending means I have to feel bad about every purchase.\" **Reality:** Tracking is neutral data collection. Judgment-free awareness works better than guilt, which usually just makes people avoid looking at all.\n• **Myth:** \"I don't need to track because I basically know what I spend.\" **Reality:** Most people underestimate discretionary spending — data almost always reveals a leak nobody remembered.\n\nCash Flow Keepers replace shame with information.`,
        callout: {
          label: "Watch out",
          text: "If checking your balance makes you anxious enough to avoid looking, that's exactly when tracking helps most — small, regular check-ins beat occasional panic-checks.",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Spot your own leaks",
        body: `Think back over the last two weeks (or check your bank/app history right now if you can).\n\n**1. List every small, repeated purchase** you can remember — drinks, snacks, app subscriptions, ride-shares.\n**2. Estimate a weekly total** for those small items alone.\n**3. Multiply by 4** to see the monthly impact.\n**4. Circle one** you'd trim, and one you're happy to keep on purpose.\n\nThe goal isn't to eliminate every small joy — it's to make sure the pattern is a **choice**, not a blind spot.`,
        callout: {
          label: "Try this now",
          text: "If your \"leak total\" surprised you, that's the tracking habit already working — before you've even started a spreadsheet.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Go deeper",
        title: "Starter emergency funds: targets, boundaries, and what counts",
        image: "/images/lessons/fl-6-4.png",
        imageAlt: "A small labeled emergency fund envelope next to a phone showing a cracked screen repair estimate, illustrating a real necessary surprise expense",
        body: `An **emergency fund** is for true surprises that are necessary — not sales, not boredom, not \"it was 20% off.\"\n\n**Emergency vs. budget item — know the difference:**\n\n• **Budget or sinking fund:** broken charger, routine phone-case replacement, expected school fees, annual car registration — you can name it and save ahead.\n• **Emergency:** shocks you did not plan for that threaten **work, safety, or required obligations** — stolen bike lock before a shift, urgent ride home, a flat tire that blocks getting to school or a job.\n\nIf you can predict it or it happens on a schedule, it belongs in your **budget or a sinking fund**, not the emergency jar.\n\nStarter targets for many teens (adapt to your life):\n\n• **$100–$500** as a first cushion, or\n• One or two small \"oh no\" expenses you can imagine (phone screen, bus home, basic car issue)\n\nAdults often aim for months of expenses later — that's a long-term goal, not something you need today. You need a **start** so one setback doesn't wipe out every goal.\n\n**Panic borrowing is not a substitute:** **Payday-style loans** are **debt** with high costs — not a savings account you can tap. Growing even a small buffer beats borrowing in a panic when something real hits.\n\nKeep emergency money separate and boring. Replenish it after you use it.`,
        checkIn: {
          prompt: "Amara's phone screen cracked on a routine drop, while her friend's car got towed unexpectedly the night before a work shift. Which of these fits an emergency fund's actual purpose?",
          choices: [
            "Neither — once you have a job, employers usually cover surprise costs like tows",
            "Both, because any unplanned expense automatically counts as an emergency",
            "The tow — necessary and unpredictable; the screen fits a budget or sinking fund better",
            "The cracked screen, because phone repairs are always emergencies",
          ],
          correctIndex: 2,
          explanation:
            "Emergency funds cover necessary, unpredictable costs like a surprise tow. A routine cracked screen is better planned as a sinking-fund item, not every surprise is an emergency, and employers rarely cover personal tow bills.",
        },
      },
      {
        id: "comparison",
        kicker: "Compare your options",
        title: "Sinking fund vs. emergency fund vs. general savings",
        image: "/images/lessons/fl-6-5.png",
        imageAlt: "Comparison graphic ranking sinking funds, emergency funds, and general savings by predictability and purpose for teens",
        body: `These three buckets look similar but do different jobs:\n\n**Sinking fund**\n• Purpose: a specific, known future cost.\n• Predictability: high — you know roughly what and when.\n• Danger if misused: \"borrowing\" from it casually and not repaying before the bill hits.\n\n**Emergency fund**\n• Purpose: true, necessary surprises.\n• Predictability: low — that's the point.\n• Danger if misused: treating it as a fun fund, leaving you exposed later.\n\n**General savings (goals like a car or college)**\n• Purpose: longer-term ambitions, not tied to one due date.\n• Predictability: medium — you control the pace.\n• Danger if misused: raiding long-term goals for short-term wants.\n\nLabeling each bucket separately — even informally — is what keeps them from blending into one confused pile of \"savings.\"`,
        bullets: [
          "Same word (\"savings\") can hide three very different jobs.",
          "Label buckets so you don't borrow from the wrong one.",
          "Replenish any bucket you dip into, as soon as you can.",
        ],
      },
      {
        id: "behavioral-trap",
        kicker: "Watch your brain",
        title: "Don't raid the jar",
        body: `**Raiding the emergency fund for concert tickets turns it into a fun fund.** This is one of the most common ways starter emergency funds quietly disappear — not through one dramatic mistake, but through a string of \"just this once\" moments that each felt reasonable.\n\nThe psychology is predictable: money sitting visibly available feels *spendable*, especially when a want shows up with urgency (a flash sale, a friend's last-minute plan). Your brain doesn't automatically flag \"emergency fund\" as off-limits unless you've decided that in advance.\n\nDefenses that actually work:\n\n• Keep emergency money in a **separate account or clearly labeled bucket** — friction helps.\n• Before spending from it, ask: *is this necessary, or just urgent-feeling?*\n• If you do dip in for something that wasn't a true emergency, **name it honestly** and replenish it on purpose, rather than quietly letting the balance stay low.`,
        callout: {
          label: "Watch out",
          text: "Urgency is not the same as necessity. \"Limited-time\" marketing is designed to feel like both.",
        },
      },
      {
        id: "habits",
        kicker: "Make it routine",
        title: "Track → sink → cushion",
        body: `A simple operating system:\n\n**1. Track** spending for two weeks.\n**2. Fix leaks** (cancel unused subs, set want limits).\n**3. Create 1–2 sinking funds** for upcoming known costs.\n**4. Start or grow a small emergency fund.**\n**5. Review cash flow** each payday for 5 minutes.\n\nYou won't do this perfectly. Cash Flow Keepers show up for the review — that's the habit that compounds.`,
        callout: {
          label: "Try this week",
          text: "Write down every purchase for 7 days. Circle one leak and one expense that deserves a sinking fund.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on...",
        body: `Take 30 seconds. Think of one purchase in the last month that felt like a \"surprise\" at the time. Now ask honestly: was it truly unpredictable, or could you have seen it coming with a little planning?\n\nMost \"surprises\" are really sinking funds you haven't built yet. Holding one real example in mind will make the next section click faster.`,
        callout: {
          label: "Why this matters",
          text: "Naming your own patterns — instead of a hypothetical stranger's — is what makes a lesson change real behavior.",
        },
      },
      {
        id: "mini-case",
        kicker: "Case study",
        title: "Marcus and the flat tire",
        body: `Marcus has been tracking his spending for a month and has:\n\n• **$120** in a labeled \"emergency\" fund.\n• **$60** saved so far in a \"new cleats\" sinking fund (needs $40 more, due in 2 months).\n• A flat tire that just happened — he needs his car to get to his weekend shift, and the repair costs **$85**.\n\nA friend suggests he just put the $85 on a payday-style loan advertised as \"fast cash until your next check\" instead of touching either savings bucket.`,
        checkIn: {
          prompt: "What's Marcus's smartest move?",
          choices: [
            "Use the emergency fund for the $85 repair — this is exactly the necessary, unpredictable cost it exists for — then plan to replenish it",
            "A rushed pass can land on take the payday-style loan so both savings buckets stay untouched”; careful readers reject it for this problem",
            "Pull the $85 from the cleats fund since it already has enough sitting in it",
            "It can seem like skip the repair and miss his shift instead, but that reading skips the distinction this question is testing",
          ],
          correctIndex: 0,
          explanation:
            "A flat tire blocking work is a textbook emergency: necessary and unpredictable. Using the emergency fund (and replenishing it after) is far cheaper than a payday-style loan and protects the cleats fund for its own scheduled goal.",
        },
      },
      {
        id: "second-scenario",
        kicker: "Round two",
        title: "Amara's tracking week — what the log revealed",
        body: `Amara tracked every purchase for seven days. Net pay that week: **$155**. Here's what the log showed:

• **Needs (actual):** $62 gas, $12 lunch at school (could pack) = $74
• **Wants (surprises):** $18 app subscription she'd forgotten, $23 vending + coffee, $14 impulse online add-on = $55
• **Savings transfer (planned):** $40 — happened only 2 of 5 days
• **Unlogged cash:** $20 "misc" with no memory of where it went

**Total out:** $189 on $155 income → $34 came from prior balance (cushion shrink).

Without tracking, Amara would have said "I barely spent anything." With tracking, she found **$33** in reducible wants + **$20** mystery spend — enough to fund her $40 sinking fund consistently next week.`,
        bullets: [
          "Forgotten **subscriptions** are classic leaks.",
          "**Misc** without labels hides real patterns.",
          "Tracking isn't punishment — it's a flashlight.",
        ],
        callout: {
          label: "Try this",
          text: "Run a 3-day mini-log. Circle one recurring want you could trim without ruining your week.",
        },
      },
      {
        id: "worked-numbers",
        kicker: "Do the math",
        title: "Starter emergency fund — how fast can $300 happen?",
        body: `**Goal:** $300 starter emergency fund. **Income:** $130 net every two weeks (6 paychecks in 12 weeks).

**Plan A — $25/paycheck:** $25 × 6 = **$150** in 12 weeks (halfway — still useful).

**Plan B — $50/paycheck:** $50 × 6 = **$300** on time — tight if needs are $90/paycheck on $130.

**Plan C — $30/paycheck + $50 from one extra shift:** $30 × 6 = $180, + $50 = **$230** — close; extend 2 weeks or trim one want line.

Emergency funds are **ranges**, not all-or-nothing. Even $150 changes outcomes vs. $0 when a tire or phone screen cracks.`,
        checkIn: {
          prompt: "You net $130 biweekly and want $300 in 12 weeks. Which plan hits the target on schedule without assuming magic leftovers?",
          choices: [
            "$20/paycheck and hope nothing unexpected happens",
            "$50/paycheck automated on payday",
            "Save only what's left after all spending each Sunday",
            "Skip the fund until income doubles",
          ],
          correctIndex: 1,
          explanation:
            "$50 × 6 = $300. $20/paycheck only reaches $120. Leftover saving and waiting for higher income delay the cushion this lesson recommends starting now.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Self-check",
        title: "Could you explain this to a friend?",
        body: `Before the graded knowledge check, see if you can explain these out loud in one or two sentences each:\n\n• The difference between positive and negative cash flow.\n• Why a sinking fund isn't the same thing as an emergency fund.\n• One real leak you found (or expect to find) in your own spending.\n• A starter emergency fund target that would make sense for your life right now.\n\nIf any of those feel shaky, scroll back — it's faster now than during the quiz.`,
        checkIn: {
          prompt: "Which statement best captures this lesson's core idea?",
          choices: [
            "Emergency funds and sinking funds are interchangeable and can be spent on anything",
            "You should stop checking your bank balance altogether to avoid anxiety",
            "Tracking reveals real patterns, sinking funds prepare for known costs, and a starter emergency fund protects against necessary surprises",
            "None of these savings buckets matter until you have a full-time job — familiar wording, wrong fit for what the prompt is actually asking",
          ],
          correctIndex: 2,
          explanation:
            "The throughline is awareness (tracking) plus two distinct, purpose-built savings buckets — not treating them as interchangeable, avoiding your balance, or waiting until adulthood to start.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Cash flow** is money in vs. out over time.\n• **Tracking** reveals patterns and leaks.\n• **Sinking funds** save ahead for known costs — the math is just cost ÷ time.\n• An **emergency fund** cushions true surprises — start small and keep it separate.\n• Watch for the **\"raid the jar\"** trap, and replenish any bucket you dip into.\n• Review on payday; adjust without quitting.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on a sinking fund or emergency starter you'd create.`,
      },
    ],
  },
  bigIdeas: [
    "**Tracking** spending reveals cash-flow patterns and \"leaks\" a budget alone can miss.",
    "**Sinking funds** save gradually for known future expenses so they don't feel like emergencies.",
    "A **starter emergency fund** cushions true surprises — and should stay separate from fun money.",
    "Sinking funds, emergency funds, and general savings look similar but serve **different jobs** — label them.",
    "**\"Raiding the jar\"** for non-emergencies is one of the most common ways starter emergency funds quietly disappear.",
  ],
  keyTerms: [
    { term: "Cash flow", definition: "Money coming in and going out over a period of time." },
    { term: "Tracking", definition: "Recording spending so you can see where money actually went." },
    { term: "Sinking fund", definition: "Money saved little by little for a known future expense." },
    { term: "Emergency fund", definition: "Money reserved for unexpected necessary costs." },
    { term: "Leak", definition: "Small repeated spending that adds up without much notice." },
    { term: "Available balance", definition: "Money you can spend after accounting for pending transactions." },
    { term: "Replenish", definition: "Putting money back into a fund after you use it." },
    { term: "Positive cash flow", definition: "When income exceeds spending for a period, leaving money to save or buffer." },
    { term: "Negative cash flow", definition: "When spending exceeds income for a period, drawing down savings or borrowing." },
  ],
  realWorld:
    "Holiday gifts are not an emergency — they're a calendar event. A $20/paycheck sinking fund beats putting gifts on a credit card in December.",
  quiz: [
    {
      id: "q1",
      question: "What's the main purpose of tracking your spending?",
      choices: [
        "To make sure you never spend money on anything fun again",
        "To calculate your credit score",
        "To prove to yourself that budgeting doesn't work",
        "To see real patterns so you can adjust your plan",
      ],
      correctIndex: 3,
      explanation:
        "Tracking provides data so you can improve cash flow, not to eliminate all fun spending or calculate unrelated numbers like a credit score.",
    },
    {
      id: "q2",
      question: "Which expense is the best candidate for a sinking fund?",
      choices: [
        "Prom costs you know are coming in five months",
        "A completely unpredictable medical emergency tomorrow",
        "A flash sale you just noticed while scrolling",
        "A bill you already paid off last year",
      ],
      correctIndex: 0,
      explanation:
        "Sinking funds are for known future costs you can schedule toward, like prom — not true surprises, impulse sales, or costs that are already settled.",
    },
    {
      id: "q3",
      question: "You need $200 for yearbook and trip fees due in 5 months. About how much should you set aside per month?",
      choices: [
        "About $200 per month",
        "Nothing — wait until the bill is due, then figure it out",
        "About $40 per month",
        "About $100 every other month",
      ],
      correctIndex: 2,
      explanation:
        "$200 ÷ 5 months = $40/month — a small, scheduled amount instead of a scramble at the deadline. Waiting until it's due, or paying it all in one month, defeats the purpose of spreading it out.",
    },
    {
      id: "q4",
      question: "What is a spending \"leak\"?",
      choices: [
        "A one-time large purchase you planned for in advance",
        "Small repeated purchases that add up unnoticed",
        "Money automatically deducted for taxes",
        "A fee charged only when your account is closed",
      ],
      correctIndex: 1,
      explanation:
        "Leaks are quiet, recurring spends — snacks, unused subscriptions — that drain cash flow, unlike a planned large purchase or a one-time account fee.",
    },
    {
      id: "q5",
      question: "Marcus's car gets a flat tire that blocks him from getting to his weekend shift. What is the best use of his emergency fund here?",
      choices: [
            "This is exactly the necessary, unpredictable situation an emergency fund exists for — use it, then replenish afterward",
            "He should use his cleats sinking fund instead, since it's not for anything specific yet",
            "He should ignore the tire and figure out a ride some other way",
            "Emergency funds shouldn't be used for car repairs, only medical costs",
          ],
      correctIndex: 0,
      explanation:
        "A necessary, unpredictable cost that threatens work is a textbook emergency-fund use, not limited to medical costs — followed by replenishing it rather than raiding a differently-labeled fund.",
    },
    {
      id: "q6",
      question: "What is a reasonable first step for many teens building an emergency fund?",
      choices: [
            "Combine it with your fun money so it's easier to access",
            "Start small (such as a few hundred dollars or one \"oh no\" expense) and keep it separate",
            "Only start one once you have a credit card",
            "Wait until you can save several months of adult-level expenses before starting",
          ],
      correctIndex: 1,
      explanation:
        "Starter emergency funds are about beginning small and protecting a cushion, not hitting adult-sized targets right away, blending it with spending money, or waiting on unrelated milestones.",
    },
    {
      id: "q7",
      question: "A student keeps dipping into their emergency fund for concert tickets and sales, telling themselves \"just this once\" each time. What's happening?",
      choices: [
            "The fund was clearly set at the wrong amount from the start",
            "This only matters if they do it more than ten times",
            "The emergency fund is quietly turning into a fun fund, leaving them exposed when a real emergency hits",
            "Nothing concerning — occasional use for things you want is what the fund is for",
          ],
      correctIndex: 2,
      explanation:
        "Repeated non-emergency withdrawals — even ones that each feel small and reasonable — erode the fund's real purpose over time; the issue is the pattern, not how many times it happens.",
    },
    {
      id: "q8",
      question: "Which pair correctly matches each bucket to its main job?",
      choices: [
            "Sinking fund = necessary surprises; Emergency fund = known future costs",
            "Both buckets are meant to be spent on whatever feels urgent that day",
            "Sinking fund = known future costs you can schedule toward; Emergency fund = necessary, unpredictable costs",
            "Sinking fund = long-term goals like college; Emergency fund = daily spending money",
          ],
      correctIndex: 2,
      explanation:
        "Sinking funds prepare for costs you can name and schedule; emergency funds cushion true, necessary surprises — swapping the definitions or treating either as everyday spending money misses the distinction.",
    },
  ],
  reflection: {
    prompt:
      "Name one spending leak you suspect and one upcoming expense that deserves a sinking fund. How would you fund that sinking fund each payday?",
    placeholder: "Example: Leak = daily $6 drinks. Sinking fund = $180 winter formal ÷ 3 months ≈ $60/month…",
  },
};
