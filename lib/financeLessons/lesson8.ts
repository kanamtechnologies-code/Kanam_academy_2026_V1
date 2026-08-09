import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson8: AILessonConfig = {
  id: "fl-8",
  title: "8. Interest, Loans & Debt Traps",
  goal: "Define APR and principal, explain how interest grows balances, and recognize debt traps like payday loans, risky BNPL use, and minimum-payment cycles — educational awareness only.",
  xpReward: 400,
  badge: "Debt Defender",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/7",
  nextHref: "/learn/finance/9",
  instructorScript: `**Coach's note**
Today's lesson: **Interest, Loans & Debt Traps**.

**Goal:** Define APR and principal, explain how interest grows balances, and recognize debt traps like payday loans, risky BNPL use, and minimum-payment cycles — educational awareness only.

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
        image: "/images/lessons/fl-8.png",
        imageAlt: "Teen comparing loan APR fine print on a laptop while holding a calculator",
        body: `Borrowing can help when used carefully — and it can become a trap when costs are unclear or payments never shrink the balance. Today you'll learn the language of **interest**, spot high-risk products, and see why **minimum payments** can keep you in debt for years.\n\nHere's our roadmap:\n\n• **Principal and interest** — what you borrowed vs. the cost of borrowing, with real math.\n• **APR** — a standardized way to talk about yearly cost.\n• **Debt traps** — payday loans, risky BNPL habits, fee spirals.\n• **Minimum payments** — why \"affordable today\" can be expensive tomorrow.\n• **Payoff strategies, compared** — and the marketing traps that keep people stuck.\n• **A mini case** you'll work through before the knowledge check.\n\nEducational awareness only — not a recommendation to take or avoid a specific loan for your personal situation. When in doubt, ask a trusted adult and read terms slowly.`,
        callout: {
          label: "Why it matters",
          text: "Understanding interest turns scary fine print into a decision you can evaluate — before a balance owns your future paychecks.",
        },
      },
      {
        id: "hook-story",
        kicker: "True-to-life",
        title: "Priya's $600 weekend",
        body: `Priya put a **$600** weekend — concert tickets, a hotel split with friends, some new clothes — on a credit card with a **24% APR**. She figured she'd \"pay it down eventually\" and kept making the minimum payment, which felt totally manageable at **$18 a month**.\n\nHere's what Priya didn't calculate: at that pace, paying only the minimum, it would take her **years** to pay off that $600 — and she'd pay significantly more than $600 in total once interest was added, all for one weekend.\n\nPriya isn't unusual, and she isn't careless in some dramatic way. She just never ran the numbers on what \"minimum payment\" actually costs over time. By the end of this lesson, you will be able to run those numbers yourself — and recognize the moment to change course before Priya's situation becomes your own.`,
        callout: {
          label: "Keep this in mind",
          text: "A low monthly payment can feel harmless while quietly costing far more than the original purchase.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `• **Principal** is the amount you borrow (or the remaining loan balance before interest).\n• **Interest** is the cost of borrowing money — usually expressed as a rate over time.\n• **APR (Annual Percentage Rate)** is a yearly rate that helps you compare borrowing costs more apples-to-apples (it can include certain fees depending on the product rules).\n• A **loan term** is how long you have to repay.\n• A **minimum payment** is the smallest amount a creditor requires that period — often not enough to clear the balance quickly.\n• **BNPL (Buy Now, Pay Later)** splits a purchase into installments; missed payments can mean fees and credit consequences.\n• A **payday loan** is a short-term, typically very expensive loan tied to your next paycheck — high risk for many borrowers.\n• **Revolving credit** is credit you can reuse as you repay it, such as many credit cards.\n\nIf a cost is hard to understand in one minute, slow down — confusion is a warning light.`,
        callout: {
          label: "Pro tip",
          text: "Ask two questions every time: \"What is the APR / fee structure?\" and \"What happens if I'm late?\"",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea #1",
        title: "Principal is the loan; interest is the rental fee on money",
        image: "/images/lessons/fl-8-2.png",
        imageAlt: "Clear diagram: Principal amount plus Interest growing over time on a small loan example",
        body: `When you borrow **$1,000**, that $1,000 is the starting **principal**. The lender charges **interest** for letting you use that money.\n\nRough intuition (not a full amortization lesson):\n\n• Higher rate → faster-growing cost if you carry a balance.\n• Longer time carrying a balance → more total interest paid.\n• Paying more than the minimum → usually shrinks principal faster → less interest over time.\n\nCredit cards often charge interest on revolving balances if you don't pay in full. Installment loans (like many auto loans) have scheduled payments of principal + interest over a term.\n\nDebt Defender mindset: interest is not a surprise \"gotcha\" if you read it — but it *feels* like a gotcha if you only look at the monthly payment.`,
        bullets: [
          "**Principal** = amount borrowed / owed before interest.",
          "**Interest** = cost of borrowing over time.",
          "Time + rate + unpaid balance drive total cost.",
        ],
        callout: {
          label: "Watch out",
          text: "A low monthly payment can hide a high total cost. Always ask how long until you're done and what you'll pay overall.",
        },
        checkIn: {
          prompt: "Elena borrows $1,000 for a used car. Before any interest is added, what is that $1,000 called?",
          choices: [
            "The principal",
            "The APR",
            "Her credit score",
            "A minimum payment",
          ],
          correctIndex: 0,
          explanation:
            "Principal is the amount borrowed (or the remaining balance) before interest is added — APR, credit score, and minimum payment are all different, related concepts.",
        },
      },
      {
        id: "concept-2",
        kicker: "The big idea #2",
        title: "APR: a yearly cost signal",
        body: `**APR** helps you compare loans and cards more fairly than looking at fees alone or \"only $20 down!\" marketing.\n\nExamples of why APR literacy matters:\n\n• A store card might advertise easy approval but carry a high APR if you carry a balance.\n• Two loans with similar monthly payments can have very different APRs and total interest.\n• Short-term loans can have fees that translate into extremely high effective costs even if the dollar fee looks \"small.\"\n\nAPR isn't the only factor (can you afford payments? is the loan necessary?). But ignoring APR is how people walk into expensive debt with a smile.\n\nThis class does **not** tell you which APR is \"good\" for your personal deal — markets change, and your situation matters. Learn to **notice and compare**.`,
        callout: {
          label: "Why it matters",
          text: "APR turns \"sounds cheap\" into \"here's the yearly cost language regulators require so shoppers can compare.\"",
        },
        checkIn: {
          prompt: "Two loans for the same amount have nearly identical monthly payments, but Loan A has a 10% APR and Loan B has a 22% APR. What does that most likely mean?",
          choices: [
            "Loan B must have a shorter term, since higher APR always means fewer payments",
            "They can have very different total interest costs even with similar monthly payments",
            "Higher APR just means bigger monthly payments, so the totals should still match",
            "They'll cost exactly the same in total since the payments match” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "Similar monthly payments can hide very different total interest. Higher APR doesn't automatically mean a shorter term or matching totals — compare lifetime cost, not just the payment.",
        },
      },
      {
        id: "concept-3",
        kicker: "The big idea #3",
        title: "Debt traps to recognize early",
        image: "/images/lessons/fl-8-3.png",
        imageAlt: "Realistic phone screen showing a buy-now-pay-later checkout with a sticky note warning Read the total cost",
        body: `**Payday-style loans**\nOften marketed as quick fixes until payday. Costs can be extremely high, and many borrowers struggle to repay without reborrowing — a cycle.\n\n**BNPL (Buy Now, Pay Later)**\nCan be fine when you already had the money and just want scheduling — and you pay every installment on time. It becomes risky when you stack multiple plans for online shopping, lose track of due dates, or buy things you couldn't afford in cash. Late fees and credit reporting can apply depending on the provider.\n\n**Fee spirals**\nLate fees + penalty rates + over-limit fees can make a balance balloon beyond the original purchase.\n\n**\"Easy approval\" culture**\nIf the marketing focuses on speed and lifestyle — not cost and repayment — pause. Debt Defender instinct: slow down.`,
        bullets: [
          "High cost + short fuse + reborrowing = danger pattern.",
          "BNPL is still debt — track every installment.",
          "Stacking debts multiplies due-date risk.",
        ],
        callout: {
          label: "Watch out",
          text: "If you're borrowing to cover last month's borrowing, you're in a cycle — talk to a trusted adult before taking another high-cost loan.",
        },
        checkIn: {
          prompt: "Which pattern is a debt trap this lesson warns about?",
          choices: [
            "Paying off a loan faster than required when you can afford it",
            "Stacking multiple BNPL plans for things you couldn't afford in cash",
            "Comparing APRs before choosing between two loan offers",
            "Setting aside money in an emergency fund before a big purchase",
          ],
          correctIndex: 1,
          explanation:
            "Stacking BNPL plans you can't track is risky debt — late fees and missed payments can snowball. Paying early, comparing APRs, and building an emergency fund are healthy habits, not traps.",
        },
      },
      {
        id: "worked-example",
        kicker: "Let's do the math",
        title: "What Priya's minimum payment actually costs",
        body: `Let's run Priya's numbers from the hook story: **$600** balance, **24% APR**, minimum payments only.\n\nYou don't need a finance degree to get the intuition — here's the simplified logic lenders' calculators use:\n\n**Each month:**\n• Interest charged ≈ balance × (APR ÷ 12) — roughly $600 × (0.24 ÷ 12) = **$12** in interest the first month alone.\n• If the minimum payment is around $18, only about **$6** of that actually reduces the $600 principal that month.\n• As the balance slowly drops, so does the required minimum — which *slows down* how fast principal shrinks even further.\n\n**The pattern:** a big chunk of a small minimum payment goes straight to interest, especially early on. That's exactly how a $600 purchase can take years to clear and cost hundreds more than $600 in total.\n\n**The fix:** paying more than the minimum — even an extra $20–$30 a month — dramatically cuts both the payoff time and the total interest paid.`,
        callout: {
          label: "Pro tip",
          text: "Any amount above the minimum goes straight toward shrinking principal faster — even small extra payments compound in your favor.",
        },
        checkIn: {
          prompt: "On a $600 balance at 24% APR, roughly how much interest accrues in the first month alone (600 × 0.24 ÷ 12)?",
          choices: [
            "About $600",
            "About $144",
            "About $1",
            "About $12",
          ],
          correctIndex: 3,
          explanation:
            "$600 × (0.24 ÷ 12) = $12 — a simplified estimate of one month's interest before that month's payment is applied, not the full balance or a full year's rate.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth check",
        title: "Debt myths — cleared up",
        body: `• **Myth:** \"A low monthly payment means a cheap loan.\" **Reality:** Monthly payment size tells you almost nothing about total cost without knowing the APR and term — a long, low-payment loan can cost far more overall.\n• **Myth:** \"BNPL isn't real debt because there's no interest.\" **Reality:** It's still a repayment obligation. Missed BNPL payments can trigger fees and, depending on the provider, appear on your credit history.\n• **Myth:** \"Paying only interest for a while is fine as long as I don't add new charges.\" **Reality:** Paying only interest (or close to it) means the principal barely shrinks — you can be \"current\" for years without meaningfully paying anything off.\n• **Myth:** \"Payday loans are basically the same as a regular short-term loan from a bank.\" **Reality:** Payday-style loans often carry dramatically higher effective costs and are specifically associated with reborrowing cycles.\n\nDebt Defenders check the math instead of trusting the sticker price.`,
        callout: {
          label: "Watch out",
          text: "\"It's only $18 a month\" can be true and still describe a genuinely expensive debt. Always ask about total cost and payoff time too.",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Compare two loan offers",
        body: `Imagine you're comparing two ways to cover the same **$500** expense:\n\n**Offer A:** 12-month installment loan, 15% APR, fixed payments.\n**Offer B:** A payday-style loan due in 2 weeks with a flat $75 fee.\n\nWalk through the comparison:\n\n**1. Offer A's cost** is spread over a year at a moderate, standardized rate — you can estimate total interest using APR.\n**2. Offer B's $75 fee** on $500 for just 2 weeks, converted to a yearly rate, works out to an extremely high effective APR — a flat-fee-over-two-weeks structure is exactly how payday-style costs balloon when annualized.\n**3. Which is actually more expensive** once you compare them on the same yearly basis, instead of comparing \"$75 flat fee\" to \"15% APR\" as if they were similar numbers?\n\nThis is the core Debt Defender skill: converting different-looking offers to a comparable cost basis before deciding.`,
        callout: {
          label: "Try this now",
          text: "Whenever you see a flat fee on a short-term loan, ask: 'what would this fee look like as a yearly rate?' The answer is usually surprising.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Go deeper",
        title: "The minimum payment trap, mechanically",
        image: "/images/lessons/fl-8-4.png",
        imageAlt: "Close-up illustration of a credit card statement highlighting the minimum payment due line next to a much larger total balance and payoff time estimate",
        body: `Credit cards often let you pay a **minimum** — a small percentage of the balance or a floor amount. That keeps the account \"current,\" but:\n\n• Most of a small payment may go to interest when balances and APRs are high.\n• Principal shrinks slowly.\n• You can pay for a purchase several times over in interest across years.\n\nIllustration mindset (numbers vary): carrying a revolving balance and paying only minimums is like jogging on a treadmill set slightly faster than you — you move, but you don't arrive.\n\nMost card statements are required to show a **\"minimum payment warning\"** box — an estimate of how long payoff would take, and the total cost, if you only ever pay the minimum. This is one of the most useful, most-ignored pieces of information on the entire statement.\n\nHealthier patterns when you use a card:\n\n• Budget so you can **pay in full** most months.\n• If you can't, stop new charges and pay **more than minimum** aggressively.\n• Avoid treating available credit as available income.\n\nMinimum payments are a safety feature for short cash crunches — not a lifestyle plan.`,
        checkIn: {
          prompt: "A statement's 'minimum payment warning' box shows it would take 12 years to pay off a balance at the minimum, costing far more than the original purchase. What is this warning highlighting?",
          choices: [
            "A rare glitch that only affects a small number of accounts” belongs to a different situation than the one in the question stem",
            "That the card issuer made an error and should be contacted immediately” belongs to a different situation than the one in the question stem",
            "A common danger of paying only the minimum — it can keep you in debt longer and increase total interest paid",
            "That minimum payments are actually the fastest way to pay off a card” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "This box exists precisely because minimum payments often shrink principal slowly, letting interest add cost for years — it's not a glitch, an issuer error, or evidence that minimums are the fastest payoff route.",
        },
      },
      {
        id: "comparison",
        kicker: "Compare your options",
        title: "Payoff strategies: avalanche vs. snowball vs. minimum-only",
        image: "/images/lessons/fl-8-5.png",
        imageAlt: "Comparison graphic contrasting three debt payoff strategies: avalanche, snowball, and minimum-only, ranked by total interest cost and motivation",
        body: `If you have more than one debt, how you direct extra payments matters:\n\n**Avalanche method**\n• How it works: pay minimums on everything, put all extra money toward the **highest-APR** debt first.\n• Pros: mathematically minimizes total interest paid.\n• Watch for: can feel slow if your highest-rate debt also has the largest balance.\n\n**Snowball method**\n• How it works: pay minimums on everything, put all extra money toward the **smallest balance** first.\n• Pros: quick wins can build motivation and momentum.\n• Watch for: usually costs slightly more in total interest than avalanche.\n\n**Minimum-only (no extra anywhere)**\n• How it works: pay only what's required on every debt.\n• Pros: keeps accounts technically current.\n• Watch for: the slowest, most expensive path — this is the pattern this lesson warns about throughout.\n\nEither avalanche or snowball beats minimum-only by a wide margin. The \"best\" one between the two is often whichever keeps *you* motivated enough to actually stick with paying extra.`,
        bullets: [
          "Avalanche saves the most money mathematically.",
          "Snowball can build motivation through quick wins.",
          "Both beat minimum-only by a large margin.",
        ],
      },
      {
        id: "behavioral-trap",
        kicker: "Watch your brain",
        title: "BNPL stacking and easy-approval marketing",
        body: `**Stacking multiple BNPL plans** is one of the easiest modern debt traps to fall into, precisely because each individual plan looks small: \"just 4 payments of $25.\" Three or four of those running at once across different apps can add up to a real monthly obligation that's easy to lose track of — especially when due dates land on different days from different providers.\n\n**\"Easy approval\" marketing** works by making speed feel like the main decision factor. A checkout screen designed to get you from \"want it\" to \"approved\" in seconds is not designed to slow you down long enough to ask about total cost or your ability to repay.\n\nDefenses:\n\n• Keep a running mental (or written) list of every active BNPL plan and its due dates.\n• Before starting a new one, ask: *if I added up every active plan right now, could I actually cover all of them next month?*\n• Treat \"instant approval\" as a neutral fact, not a signal that the offer is good for you specifically.`,
        callout: {
          label: "Watch out",
          text: "If you can't quickly name every active BNPL plan you're in and its total, that's a sign to stop and take inventory before adding another.",
        },
      },
      {
        id: "habits",
        kicker: "Make it routine",
        title: "If you already have debt — a payoff order",
        body: `If you already owe money — a starter card balance, stacked **BNPL** plans, or a small loan — use this order to fight back without panic:\n\n**1. List every debt** — balance, interest rate (APR), and minimum payment for each.\n\n**2. Cover essentials and all minimums** — rent, food, transport, and every required minimum so you stay current and avoid new late fees.\n\n**3. Put extra toward highest-rate or chosen focus debt** — once you're current, send any extra to the most expensive balance (avalanche), or your smallest balance if you need the motivation boost (snowball).\n\n**4. Cut new nonessential charges while paying down** — paying off while still charging wants is a treadmill. Pause the wants that feed new balances.\n\n**5. Review monthly** — check progress, adjust if income changed, and avoid new high-cost debt.\n\nBefore borrowing anything new, run this **Debt Defender checklist**: Need vs. want? Total cost (not just monthly payment)? Does it fit your cash flow? What's the exit plan? Any trap pattern (reborrowing, stacking, minimum-only forever)? If answers are fuzzy, wait — fuzzy debt is expensive debt.`,
        callout: {
          label: "Why it matters",
          text: "Random tiny payments everywhere feel busy but move slowly. A written order turns \"I'm stressed\" into \"here's step three.\"",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on...",
        body: `Take 30 seconds. Think of any purchase you've made — or seen a friend make — that was paid for in installments or on a card. Do you know what the total cost ended up being, including any interest or fees? If not, that's a completely normal gap this lesson is designed to close.\n\nHolding a real example in mind will make the math in the next sections click faster than a hypothetical.`,
        callout: {
          label: "Why this matters",
          text: "Running real numbers — even mentally, even roughly — builds the exact instinct that protects people from expensive debt later.",
        },
      },
      {
        id: "mini-case",
        kicker: "Case study",
        title: "Priya's payoff plan",
        body: `Back to Priya from the hook story: **$600** balance at **24% APR**. She now has three choices for what to do next month, on top of any required minimum:\n\n• **Option 1:** Keep paying only the required minimum, as before.\n• **Option 2:** Add an extra **$30/month** on top of the minimum, and stop putting new charges on the card.\n• **Option 3:** Open a second store card to \"spread out\" the balance across two cards.`,
        checkIn: {
          prompt: "Based on this lesson, which option best helps Priya actually pay down the debt and reduce total interest?",
          choices: [
            "A rushed pass can land on option 3, since more available credit reduces how much she owes”; careful readers reject it for this problem",
            "“Option 1, since minimums are specifically designed to clear balances quickly” describes a different situation than the one in the question stem",
            "Option 2, because extra payments on top of the minimum — combined with no new charges — shrink principal faster and cut total interest",
            "“All three options reduce her total interest by about the same amount” describes a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "Paying more than the minimum while pausing new charges is the most direct way to shrink principal faster and reduce total interest — opening a new card doesn't touch the existing balance at all, and minimums are a floor, not a fast payoff plan.",
        },
      },
      {
        id: "ask-before-sign",
        kicker: "Before you sign",
        title: "Borrowing checklist: ask before you accept any loan",
        body: `Buy-now-pay-later, store financing, personal loans, and credit cards all share one rule: **read before you tap Accept**.

**Ask before you sign:**

• **Total repayment** — Not just the monthly payment: what's the full amount if I pay on schedule?
• **APR** — Annual rate; compare across offers.
• **Term length** — How many months? Longer often means more total interest.
• **Fees** — Late fees, origination fees, prepayment penalties?
• **Variable vs fixed** — Can the rate change?
• **What happens if I miss one payment?** Penalty APR? Collections?
• **Do I need this now?** Could sinking-fund saving work instead?

If you can't answer those from the paperwork, pause — with a trusted adult if you're under 18.`,
        callout: {
          label: "Watch out",
          text: "\"$25/month\" marketing hides total cost. Always multiply payment × months + fees.",
        },
      },
      {
        id: "worked-tradeoff",
        kicker: "Tradeoff table",
        title: "Priya's $600 weekend — three payoff paths",
        body: `Priya put **$600** on a card at **22% APR**. Minimum payment **$25/month**. Rough math if she only pays minimums: years of payments and **$300+** in interest (illustrative — real statements vary).

**Path 1 — Minimum only:** Lowest stress now, highest total cost later.

**Path 2 — Avalanche ($75/month):** Targets this high-rate debt → pays off faster, less interest.

**Path 3 — Pause new BNPL + $100/month:** Stops stacking new holes while digging out.

**Opportunity cost of Path 1:** Every $25 minimum month is $25 not going to savings, car fund, or experiences she chooses on purpose.`,
        bullets: [
          '**Minimum** = staying in debt longer, not "being responsible."',
          "Stopping new BNPL is part of the payoff plan.",
          "Total cost beats monthly payment size.",
        ],
      },
      {
        id: "second-scenario",
        kicker: "Compare offers",
        title: "Two loan offers — which costs less total?",
        body: `**Offer A:** $800 borrowed, **18% APR**, 12 months, payment about **$73/month** → total repaid roughly **$876**.

**Offer B:** $800 borrowed, **0% promo APR** for 6 months, then **24% APR** if not paid in full → if Priya only pays $67/month, she may still owe principal when the promo ends — then interest hits hard.

**0% promos** aren't free if you miss the payoff window. Always map the **calendar**: Can you clear $800 in six months at $134/month? If not, Offer A's steady 18% might be clearer than a ticking promo bomb.`,
        checkIn: {
          prompt: "An $800 BNPL offer is 0% for 6 months, then 24% APR on any remaining balance. You can afford $100/month. What's the risk?",
          choices: [
            "APR only matters for mortgages, not teen purchases” belongs to a different situation than the one in the question stem",
            "Paying $100/month always clears any BNPL plan regardless of terms” belongs to a different situation than the one in the question stem",
            "You'll automatically be fine because 0% means free money” belongs to a different situation than the one in the question stem",
            "You may still owe principal when the promo ends, and the higher APR kicks in on what's left",
          ],
          correctIndex: 3,
          explanation:
            "0% promos expire. If balance remains, the back-end APR can be brutal. Run the month-by-month payoff against the promo deadline.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Self-check",
        title: "Could you explain this to a friend?",
        body: `Before the graded knowledge check, see if you can explain these out loud in one or two sentences each:\n\n• The difference between principal and interest.\n• Why APR matters even when a flat fee "looks small."\n• Why minimum payments can trap someone in debt for years.\n• One debt trap (payday loans, BNPL stacking, fee spirals) you'll actively avoid.\n\nIf any of those feel shaky, scroll back — it's faster now than during the quiz.`,
        checkIn: {
          prompt: "Which statement best captures this lesson's core idea?",
          choices: [
            "Principal is what you borrowed, interest is the cost of borrowing, and comparing total cost — not just the monthly payment — is how you avoid debt traps",
            "Treat “BNPL plans never count as real debt as long as there's no listed interest rate” as a distractor: close in topic, incorrect for the required answer",
            "“Monthly payment size alone tells you everything you need to know about a loan's total cost” describes a different situation than the one in the question stem",
            "Picking “Paying the minimum every month is the most efficient way to become debt-free” is a common mix-up that confuses a nearby idea with the right one",
          ],
          correctIndex: 0,
          explanation:
            "The throughline is understanding principal and interest and always comparing total cost — monthly payment size alone, treating BNPL as not-real-debt, and minimum-only payoff are exactly the misconceptions this lesson corrects.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Principal** is what you borrow; **interest** is the cost of borrowing over time.\n• **APR** helps compare yearly borrowing costs — convert flat fees to a yearly basis to compare fairly.\n• **Payday loans**, careless **BNPL**, and fee spirals are high-risk patterns.\n• **Minimum payments** can keep you in debt far longer — and cost far more — than the sticker price.\n• **Avalanche and snowball** both beat minimum-only payoff by a wide margin.\n• **Already in debt?** List balances, cover minimums, attack with extra, cut new charges, review monthly.\n• Debt Defenders read terms, run the math, and refuse confusion marketing.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on one debt trap you'll refuse to normalize.`,
      },
    ],
  },
  bigIdeas: [
    "**Principal** is the amount borrowed; **interest** is the cost of borrowing over time.",
    "**APR** helps you compare the yearly cost of credit more clearly than marketing alone.",
    "**Minimum payments**, high-cost short-term loans, and careless **BNPL** can trap cash flow for years.",
    "Converting a flat fee to a yearly rate reveals how expensive short-term loans really are.",
    "**Avalanche and snowball** payoff strategies both beat minimum-only payments by a wide margin.",
  ],
  keyTerms: [
    { term: "Principal", definition: "The amount borrowed or the remaining loan balance before interest." },
    { term: "Interest", definition: "The cost of borrowing money, usually charged as a rate over time." },
    { term: "APR", definition: "Annual Percentage Rate — a yearly rate used to help compare borrowing costs." },
    { term: "Minimum payment", definition: "The smallest payment required for a period; often too small to clear debt quickly." },
    { term: "BNPL", definition: "Buy Now, Pay Later — splitting a purchase into installments that must be paid on time." },
    { term: "Payday loan", definition: "A short-term, typically very expensive loan often due on the next payday." },
    { term: "Loan term", definition: "The length of time scheduled to repay a loan." },
    { term: "Revolving credit", definition: "Credit you can reuse as you repay, such as many credit cards." },
    { term: "Avalanche method", definition: "A payoff strategy that targets the highest-APR debt first with extra payments." },
    { term: "Snowball method", definition: "A payoff strategy that targets the smallest balance first for quick motivational wins." },
  ],
  realWorld:
    "Paying only the minimum on a high-APR card after a $600 weekend can turn into years of payments. Paying in full — or not charging it — protects future paychecks.",
  quiz: [
    {
      id: "q1",
      question: "Which description best fits what \"principal\" means on a loan?",
      choices: [
            "The total interest charged over the life of the loan",
            "A fee charged for paying off a loan early” belongs to a different situation than the one in the question stem",
            "The amount you borrow, or the remaining balance before interest",
            "Your credit score at the time you applied” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Principal is the borrowed amount (or remaining balance) before interest costs — not the interest itself, a prepayment fee, or a credit score.",
    },
    {
      id: "q2",
      question: "You see a BNPL ad: \"4 payments of $25 — no interest!\" Why is understanding APR still useful here?",
      choices: [
            "“It removes any need to actually repay the $100 total” describes a different situation than the one in the question stem",
            "It helps compare the yearly cost of borrowing more clearly, and missed BNPL payments can still carry real costs",
            "“It's identical to your take-home pay for that period” describes a different situation than the one in the question stem",
            "It guarantees the plan will always be approved instantly” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "APR is a standardized yearly cost signal that's useful for comparing offers — it has nothing to do with approval odds or take-home pay, and BNPL still needs to be repaid even without listed interest.",
    },
    {
      id: "q3",
      question: "A $600 balance at 24% APR accrues roughly how much interest in one month, using balance × (APR ÷ 12)?",
      choices: [
        "About $144",
        "About $60",
        "About $12",
        "About $2",
      ],
      correctIndex: 2,
      explanation:
        "$600 × (0.24 ÷ 12) = $12 — a simplified one-month interest estimate before that month's payment is applied.",
    },
    {
      id: "q4",
      question: "What is a common danger of paying only the credit card minimum?",
      choices: [
            "It removes the purchase from your credit report” belongs to a different situation than the one in the question stem",
            "It guarantees the balance will be paid off within a year",
            "It can keep you in debt longer and increase total interest paid",
            "It automatically raises your APR every month” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Minimums often shrink principal slowly, so interest keeps adding cost over a long time — they don't guarantee a fast payoff, raise your APR by themselves, or erase the purchase from your record.",
    },
    {
      id: "q5",
      question: "Comparing a $500 loan at 15% APR over 12 months to a payday-style loan with a flat $75 fee due in 2 weeks on the same $500 — what's the key comparison skill?",
      choices: [
        "Always assume the flat-fee loan is cheaper since $75 is a smaller number than the APR loan's total",
        "Add the two numbers together to find a combined cost",
        "Skip the comparison since APR and flat fees measure completely different things",
        "Convert the flat fee to an equivalent yearly rate so both offers are compared on the same basis",
      ],
      correctIndex: 3,
      explanation:
        "Converting a short-term flat fee to a yearly rate reveals its true comparative cost — this is exactly why payday-style loans look deceptively cheap until annualized, and the two costs can be compared once put on the same basis.",
    },
    {
      id: "q6",
      question: "Priya has $600 at 24% APR. Which choice most directly reduces her total interest paid?",
      choices: [
            "Paying extra above the minimum each month while not adding new charges",
            "Waiting for the issuer to lower her APR on its own” belongs to a different situation than the one in the question stem",
            "Opening a second card to split the balance across two accounts",
            "Continuing to pay only the required minimum every month” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "Extra payments on top of the minimum, combined with no new charges, shrink principal faster and cut total interest — the other options either keep the pace the same, don't reduce the existing balance, or rely on something outside her control.",
    },
    {
      id: "q7",
      question: "Which statement about BNPL is most accurate?",
      choices: [
            "BNPL guarantees your credit score will improve” belongs to a different situation than the one in the question stem",
            "BNPL splits purchases into installments — late or stacked plans can create fees and cash-flow stress",
            "BNPL is only available for purchases under $20” belongs to a different situation than the one in the question stem",
            "BNPL never has any late fees under any provider” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "BNPL is still a repayment obligation; missing payments or stacking plans can create real fees and stress — it doesn't guarantee a fee-free experience, a credit score boost, or come with a purchase cap.",
    },
    {
      id: "q8",
      question: "Comparing avalanche, snowball, and minimum-only payoff strategies, which statement is most accurate?",
      choices: [
            "Snowball always saves more total interest than avalanche” belongs to a different situation than the one in the question stem",
            "Minimum-only saves the most money as long as you never miss a payment” belongs to a different situation than the one in the question stem",
            "Avalanche and snowball are just two names for the same exact strategy” belongs to a different situation than the one in the question stem",
            "Both beat minimum-only; avalanche usually cuts more interest, snowball can motivate",
          ],
      correctIndex: 3,
      explanation:
        "Both avalanche (highest-APR first) and snowball (smallest-balance first) beat paying only minimums; avalanche tends to minimize total interest while snowball offers motivating quick wins — they aren't identical, and minimum-only isn't the cost-saving option even without missed payments.",
    },
  ],
  reflection: {
    prompt:
      "Which debt trap feels most relevant to people your age (minimum payments, BNPL stacking, or high-cost short-term loans)? What personal rule will you use to avoid it?",
    placeholder: "Example: I won't stack BNPL plans — if I can't pay the full price soon from cash flow, I wait…",
  },
};
