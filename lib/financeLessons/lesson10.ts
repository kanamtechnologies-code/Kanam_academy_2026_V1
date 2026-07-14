import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson10: AILessonConfig = {
  id: "fl-10",
  title: "10. Investing Basics & Risk",
  goal: "Describe stocks, bonds, and funds at a high level; explain diversification and risk vs return; and frame investing as a long-horizon habit for teens — not day trading.",
  xpReward: 500,
  badge: "Investor Apprentice",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/9",
  nextHref: "/learn/finance/11",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-10.png",
        imageAlt: "High school student studying investing basics on a laptop with a notebook Risk vs return",
        body: `Investing is how people put money to work for **long-term goals** — with risk that savings accounts usually don't have. Today you'll learn the map, not stock tips.\n\nHere's our roadmap:\n\n• **A quick story** — the $50 question every gift card eventually raises.\n• **Investing vs saving, asset types, and risk/return** — the three ideas that build on each other.\n• **A worked example** — how spreading money changes an outcome, in rounded numbers.\n• **A myth to bust** — you don't need to be rich, and diversification isn't magic.\n• **A deeper skill** — investing consistently over time instead of chasing timing.\n• **A case study and self-check** — before you hit the knowledge check.\n\nYou'll leave able to talk like an Investor Apprentice: calm, skeptical of hype, focused on time.`,
        callout: {
          label: "Why it matters",
          text: "Social feeds reward flashy trades. Real wealth-building for most people is boring, diversified, and long-term — and starts with understanding risk.",
        },
      },
      {
        id: "hook-story",
        kicker: "A quick story",
        title: "The $50 question",
        body: `Amir gets $50 for his birthday. His group chat has three opinions instantly: buy the new headphones, "ape into" a coin a friend saw trending, or "just put it in savings and forget it."\n\nNone of those answers is automatically right — it depends on what the $50 is *for*. If Amir needs new shoes for a job interview next week, spending some now might be reasonable. If it's money he genuinely won't touch for 5+ years, learning about investing (carefully, and usually with a parent or guardian involved for a minor) becomes relevant. If he might need it in three months, locking it into something that could lose value overnight is a mismatch.\n\nThe real skill isn't picking a hot tip — it's matching the money to the timeline.`,
        callout: {
          label: "Notice",
          text: "Nobody in the group chat asked Amir *when* he'd need the money. That question matters more than any tip.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Investing words without the jargon fog",
        body: `• **Investing** — using money to buy assets that may grow or produce income over time, with risk of loss.\n• **Stock (equity)** — a slice of ownership in a company.\n• **Bond** — a loan you make to a company or government that typically pays interest.\n• **Fund** — a basket of many investments managed under one product (often stocks, bonds, or both).\n• **Diversification** — spreading money across different investments so one failure hurts less.\n• **Volatility** — how much prices bounce up and down.\n• **Horizon** — how long you plan to keep the money invested before you need it.\n\nWe'll connect these to teen-appropriate decisions next.`,
        callout: {
          label: "Pro tip",
          text: "If someone can't explain an investment in plain English, pause. Complexity is sometimes a sales tactic.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "Saving and investing have different jobs",
        image: "/images/lessons/fl-10-2.png",
        imageAlt: "Split infographic: Saving safe short-term vs Investing long-term with risk, teen-friendly icons",
        body: `**Savings** (and emergency funds) prioritize safety and access: money for near-term needs and surprises. **Investing** accepts more risk for the *possibility* of higher long-term growth — money you hopefully won't need for many years.\n\nA useful teen rule of thumb:\n• Short-term goals and emergencies → keep in safer, accessible places.\n• Long-term goals (years ahead) → *learn* about investing; only use money you can leave invested through ups and downs.\n\nInvesting is not "extra savings with better vibes." Prices can fall — sometimes a lot, and sometimes for a long time.`,
        bullets: [
          "Emergency fund first (from earlier lessons) before risking money you can't afford to lose.",
          "Investing involves possible loss of principal.",
          "Match the tool to the timeline.",
        ],
        callout: {
          label: "Watch out",
          text: "Putting rent money, your phone bill, or next month's car payment into volatile investments is a strategy failure, not a bold move.",
        },
        checkIn: {
          prompt: "Ben has $300 in an emergency fund and is thinking about moving it into a fund with stocks so it can 'grow faster.' What should he consider first?",
          choices: [
            "Keep it accessible and stable; investing accepts more risk for longer-term growth",
            "Move it — emergency cash loses too much to inflation if it isn't invested",
            "Move it — investing accounts don't lose value if you hold them long enough",
            "Move it if he can withdraw anytime; that already covers the emergency-fund job",
          ],
          correctIndex: 0,
          explanation:
            "Emergency money needs to stay reliable on short notice. Investing can lose value even with easy withdrawals, and inflation risk alone doesn't mean emergency cash belongs in stocks.",
        },
      },
      {
        id: "concept-2",
        kicker: "The map",
        title: "Stocks, bonds, and funds — overview",
        body: `**Stocks:** you own a piece of a company. If the company does well over time, the stock *may* rise (or pay dividends). If it struggles, the stock can fall — even to near zero in extreme cases.\n\n**Bonds:** you lend money. In return you typically receive interest and your principal back later (unless the borrower defaults). Bonds are often described as lower risk than stocks *on average*, but they still have risks (rate changes, credit risk).\n\n**Funds:** instead of picking one stock, a fund holds many. That can make diversification easier. Some funds track a broad market index; others are actively managed. Fees matter over long periods.\n\nThis is a map of categories — not advice to buy any specific product.`,
        callout: {
          label: "Common misconception",
          text: "\"Funds are always safe.\" Funds can still lose value. Diversification reduces *single-company* risk; it doesn't erase market risk.",
        },
        checkIn: {
          prompt: "Nate hears that owning a share of stock in a sneaker company means he 'owns part of the company.' Is that accurate?",
          choices: [
            "Not really — a stock is actually a fixed-interest loan to the company",
            "Yes — a stock is a slice of ownership in the company, and its price can rise or fall with the company's performance",
            "Yes, and it also guarantees him a government-backed payment every year",
            "No — stocks only apply to companies that sell physical products like sneakers",
          ],
          correctIndex: 1,
          explanation:
            "Stocks represent real ownership, so Nate's understanding is correct. A stock isn't a fixed-interest loan (that's closer to a bond) and carries no government guarantee.",
        },
      },
      {
        id: "concept-3",
        kicker: "Tradeoffs",
        title: "Risk vs return — and why diversification helps",
        image: "/images/lessons/fl-10-3.png",
        imageAlt: "Illustrated basket of many small investments vs one single stock egg, diversification concept",
        body: `In markets, **higher expected returns usually come with higher risk** (more chance of big swings or losses). There is no free lunch: anyone promising high returns with "no risk" is selling a story.\n\n**Diversification** spreads your bets:\n• One company can fail; a broad mix is less likely to go to zero together.\n• Different assets can react differently to the same news.\n\nDiversification does **not** guarantee profits or prevent losses in a downturn. It is risk management, not magic.`,
        bullets: [
          "Risk and potential return tend to travel together.",
          "Concentrating on one tip or meme stock raises the chance of a wipeout.",
          "Understand fees and what you own before you buy anything.",
        ],
        callout: {
          label: "Myth check",
          text: "Past performance is not a promise of future results — a phrase worth treating as real, not fine print.",
        },
        checkIn: {
          prompt: "Instead of putting all his birthday money into one company's stock, Ravi spreads it across a fund holding dozens of companies. What's the main reason to do this?",
          choices: [
            "It spreads risk across many holdings, so one company's failure hurts less",
            "It guarantees his money will grow no matter what happens in the market",
            "Funds are required by law to charge lower fees than single stocks",
            "It removes market risk entirely, so a downturn can't affect him",
          ],
          correctIndex: 0,
          explanation:
            "Diversification reduces concentration risk from any single company. It's not a guarantee against loss, and it doesn't erase risk from the broader market moving down.",
        },
      },
      {
        id: "worked-example",
        kicker: "Show the math",
        title: "Worked example: one bet vs. ten bets",
        body: `Imagine two teens each have $100 to invest through a custodial account with a parent's help, and each picks a different approach (rounded, illustrative numbers — not a prediction of any real outcome):\n\n**Approach A — one company:** All $100 goes into a single company's stock. If that company has a rough year and its stock drops 40%, the $100 becomes about **$60**.\n\n**Approach B — ten companies:** The $100 is spread evenly across ten different companies ($10 each) through a fund. If one of those ten companies drops 40% but the other nine are flat, the overall portfolio drops by roughly one-tenth of 40% — about **$96** remaining, not $60.\n\nThis illustrates *why* diversification softens single-company shocks — it does not mean diversified investments can't lose value overall if the whole market falls.`,
        bullets: [
          "Approach A after a 40% single-company drop: ~$60 remaining.",
          "Approach B (same shock, spread across 10 holdings): ~$96 remaining.",
          "Diversification reduces single-name risk — it does not eliminate market-wide risk.",
        ],
        callout: {
          label: "Reality check",
          text: "Real funds hold many more than 10 positions and fees apply. This example ignores fees on purpose to isolate the diversification effect.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "Common myth: \"You need to be rich (or lucky) to invest\"",
        body: `Two myths worth retiring before you go further:\n\n**Myth 1: "Investing is only for people with a lot of money."** Many funds and custodial accounts allow modest amounts. The bigger requirement isn't wealth — it's time. Small amounts, invested consistently over a long horizon, is the realistic teen path — not a lump sum windfall.\n\n**Myth 2: "Diversification guarantees you won't lose money."** It reduces the damage from any *one* holding failing, but if an entire market drops, a diversified portfolio can still drop with it. Diversification manages risk; it doesn't erase it.\n\nThe honest version: investing is a long, occasionally boring process that rewards patience — not a shortcut that requires being rich or lucky.`,
        checkIn: {
          prompt: "Elena's older cousin tells her that once her account is 'diversified,' it basically can't lose money. Is that right?",
          choices: [
            "Yes — diversification means the account is protected from ever losing value",
            "Not quite — diversification reduces damage from any single holding failing, but it doesn't erase risk if the overall market drops",
            "Yes, but only if she picks exactly one 'safe' stock to diversify into",
            "It only applies to professional investors, so it wouldn't matter for Elena's account anyway",
          ],
          correctIndex: 1,
          explanation:
            "Diversification spreads single-company risk across many holdings, but it can't protect against a broad market decline — her cousin's version overstates what it actually does.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Sort the money by timeline",
        body: `Quick sorting exercise — no calculator needed. For each of these, decide: does it belong in **safer, accessible savings** or is it a candidate for **long-horizon investing education** (with a trusted adult's guidance)?\n\n1. Money for a phone bill due in three weeks.\n2. A gift toward a certification or trade-school fund you won't touch for six years.\n3. Your emergency fund for car repairs.\n4. Money you're setting aside for retirement decades from now (even a small custodial start).\n\nItems 1 and 3 are short-term and need to stay safe and available. Items 2 and 4 have long horizons, which is exactly the situation where learning about investing — carefully, and usually with adult guidance while you're a minor — starts to make sense.`,
        callout: {
          label: "Try this now",
          text: "Pick one real goal in your own life that's 5+ years away. That's the kind of goal investing education is built for — not next weekend's plans.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Investing consistently beats timing the market",
        image: "/images/lessons/fl-10-4.png",
        imageAlt: "Simple hand-drawn chart comparing one big lump-sum arrow vs several small steady arrows over time, notebook style",
        body: `A common trap is trying to "time the market" — buying only when you're sure prices are about to rise, and selling right before a drop. In practice, almost nobody — professional or amateur — can reliably predict short-term price moves.\n\nA steadier approach some long-term investors use (with adult guidance and appropriate accounts) is investing a similar amount on a regular schedule, regardless of whether prices are up or down that week or month. This doesn't guarantee a profit or protect against loss in a falling market, but it removes the pressure of guessing the "perfect" moment — the same way pay-yourself-first removed the pressure of guessing the "perfect" savings moment in the last lesson.\n\nThe deeper skill isn't a secret formula — it's accepting that consistency and time matter more than trying to outsmart short-term price swings.`,
        bullets: [
          "Nobody can reliably predict short-term price moves — not gurus, not apps, not group chats.",
          "Regular, consistent investing removes the pressure of guessing the 'perfect' entry point.",
          "This is an approach to reduce timing stress — not a guarantee of profit.",
        ],
        callout: {
          label: "Watch out",
          text: "Anyone claiming they can consistently time the market for guaranteed gains is overselling. Consistency is a discipline, not a prediction engine.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Day trading hype vs. long-horizon investing",
        body: `Compare two very different approaches you'll see described online:\n\n• **Day trading / constant flipping:** buying and selling frequently, chasing short-term price moves. Involves more fees, more taxes on short-term gains (rules vary), more screen time, and more emotional stress — with no reliable evidence that most amateurs beat simply staying invested long-term.\n• **Long-horizon investing:** choosing diversified holdings and letting them sit for years, adding to them consistently, largely ignoring day-to-day noise.\n\nSocial media often highlights day-trading "wins" because they're dramatic and screenshot-able. It rarely shows the far more common losses, or the years of quiet, undramatic long-horizon investing that built most real wealth.`,
        bullets: [
          "Day trading: high activity, high fees/stress, no reliable edge for most amateurs.",
          "Long-horizon investing: low activity, patience, aligns with a teen's biggest advantage — time.",
          "Highlight reels show wins, not the far more common losses.",
        ],
        checkIn: {
          prompt: "A financial educator tells a group of teens that their 'long horizon' is a real advantage for long-term investing education. What does that mean?",
          choices: [
            "Younger investors are guaranteed to earn higher returns than older investors",
            "Having many years before the money is needed gives more time to potentially ride out ups and downs",
            "Teens should use that advantage to trade frequently and chase short-term price swings",
            "Horizon mostly matters for bonds, not for stocks or funds",
          ],
          correctIndex: 1,
          explanation:
            "A longer horizon means more time to potentially recover from downturns and let consistent investing work — it's not a guarantee of higher returns, and it's an argument for patience, not frequent trading.",
        },
      },
      {
        id: "behavioral-trap",
        kicker: "Watch your brain",
        title: "The behavioral trap: FOMO and herd mentality",
        body: `When a friend's screenshot shows a huge short-term gain, it's tempting to jump in immediately — that's **FOMO** (fear of missing out). Herd mentality pushes people to buy something *because* everyone else seems to be buying it, not because they understand it.\n\nBy the time an investment is trending in every group chat, a lot of the "easy" story has often already played out — and the risk of buying at an inflated, hype-driven price is real. The antidote isn't cynicism about all investing; it's asking calm questions: What am I actually buying? What's the realistic downside? Would I still want this if no one else was talking about it?`,
        callout: {
          label: "Reality check",
          text: "A tip from a group chat is not research. If you can't explain why an investment fits your own timeline and risk tolerance, that's a signal to pause.",
        },
      },
      {
        id: "habits",
        kicker: "Teen lens",
        title: "Long horizon — not day trading",
        body: `As a teen, your biggest investing advantage (when you eventually invest) is often **time**: decades for long-term goals like a career fund or retirement far in the future. Day trading and constant flipping fight that advantage with fees, taxes, stress, and emotional mistakes.\n\nHealthy Investor Apprentice habits:\n• Learn vocabulary and risk before risking real money.\n• Prefer education and broad concepts over tip culture.\n• If/when you invest (with family rules, custodial accounts, or later adult accounts), think in years, not hours.\n• Never invest money needed soon for senior-year expenses, bills, or emergencies.\n\nCuriosity is good. Gambling dressed up as "strategy" is not.`,
        callout: {
          label: "Try this week",
          text: "Write one long-term goal (5+ years — college fund, certification, first apartment) and one short-term goal (prom, phone repair). Note which belongs in safer savings vs future investing education.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on…",
        body: `Take thirty seconds to answer honestly, in your head or in a notes app:\n\n**If a friend sent you a message right now claiming a "guaranteed" way to double your money fast, what's the first question you'd ask before reacting?**\n\nThere's no wrong answer — the goal is noticing your own default reaction to hype, before it happens in a real group chat.`,
        callout: {
          label: "No wrong answers",
          text: "You'll revisit a version of this question in the reflection at the end of the lesson — this is just the warm-up.",
        },
      },
      {
        id: "mini-case",
        kicker: "Case study",
        title: "The Ferreira family's college jar becomes an account",
        image: "/images/lessons/fl-10-5.png",
        imageAlt: "Family at a kitchen table discussing a long-term savings and investing plan for a teen's future, realistic photo",
        body: `For years, the Ferreira family kept a literal jar labeled "college" on the counter, adding spare cash after birthdays and odd jobs. When their teen, Noa, turned 16 and the jar held a few hundred dollars meant for a trade-school program six years away, a parent suggested moving it into a custodial account instead — with the parent as the account manager, since Noa is a minor.\n\nThey didn't chase a hot tip. They talked about the six-year horizon, learned about diversified funds together, and agreed to add a small amount monthly instead of waiting for another windfall. No specific return was promised or expected — the plan was simply "time in, consistently, with a horizon that matches the goal."\n\nWhat mattered: matching the money to the timeline, learning together, and avoiding both extremes — leaving it as un-growing jar cash forever, or gambling it on a single hyped pick.`,
        callout: {
          label: "Try this",
          text: "If you have a long-term goal, name it and its rough timeline. That's the first real step — before any product or platform decision.",
        },
      },
      {
        id: "ask-before-sign",
        kicker: "Before you invest",
        title: "Questions before anyone invests your money (including you)",
        body: `If a family account, app, or advisor involves investing, educational questions matter:

• **What am I buying?** Stock in one company? A fund holding hundreds?
• **Time horizon** — Money needed in 6 months shouldn't ride stock volatility.
• **Fees** — Expense ratios, trading fees, subscription costs?
• **Risk** — What's a realistic bad year? Can I tolerate that emotionally?
• **Liquidity** — How fast can I access cash without penalties?
• **Taxes** — Will selling trigger taxes? (Awareness level — not filing advice.)
• **Who controls the account?** Custodial rules if you're under 18.

No stock picks here — just decision hygiene before money leaves savings.`,
        callout: {
          label: "Watch out",
          text: "Influencer \"plays\" rarely include fees, taxes, or downside. If only wins are shown, it's marketing.",
        },
      },
      {
        id: "worked-tradeoff",
        kicker: "Tradeoff table",
        title: "$50/month — save vs. invest vs. spend",
        body: `Same **$50/month** for one year ($600 total):

• **High-yield savings ~4%:** Ends around **$610** — stable, accessible for prom, repairs, emergencies.

• **Broad index fund (illustrative 7% average, not guaranteed):** Might end **$620–$640** — but could dip to **$540** mid-year during a volatile stretch.

• **Spent on wants:** **$0** future balance — fine if consciously chosen, costly if accidental.

**Rule of thumb from this lesson:** Money needed within ~3–5 years → savings first. Investing conversations are for long horizons with adults you trust.`,
        bullets: [
          "**Volatility** is the price of higher long-term averages.",
          "Senior-year cash needs shouldn't gamble on daily headlines.",
          "Consistency beats timing the market.",
        ],
      },
      {
        id: "second-scenario",
        kicker: "Another look",
        title: "The Ferreira family jar — month 6 check-in",
        body: `The Ferreiras moved a **$400** college jar into a custodial brokerage for education — but kept **$800** in savings for tuition due in 18 months.

**Why split?**
• Tuition in 18 months = **savings** territory (known bill, no volatility surprise).
• College fund for 8+ years = room to learn **diversified** investing with time to recover dips.

**Month 6:** Markets dip 8%. Savings still $800+. Brokerage shows $368 on the $400 moved — uncomfortable but expected sometimes. They didn't panic-sell because the timeline allowed recovery.

Matching **timeline to tool** prevented a tuition panic.`,
        checkIn: {
          prompt: "You need $900 for a certification course in 10 months. Where should most of that money live while you save?",
          choices: [
            "Individual high-volatility stocks for maximum growth",
            "Accessible savings or similar stable account",
            "Crypto because it might double quickly",
            "Split evenly with no plan — markets average out automatically",
          ],
          correctIndex: 1,
          explanation:
            "Short, known deadlines need stable, accessible money. Volatile assets can be down right when the bill arrives.",
        },
      },
      {
        id: "behavioral-trap-2",
        kicker: "Watch your brain",
        title: "Herd trades: when group chat becomes \"research\"",
        body: `Three friends post gains from a hot stock. Your brain screams **join now**. That's herd mentality — action driven by crowd energy, not your timeline.

**Cool-down questions:**

• Would I buy this if nobody posted about it?
• What happens to my plan if the price drops 30% next month?
• Is this money I might need for rent, prom, or repairs?

Missing one hype cycle doesn't end your financial life. FOMO trades have ended emergency funds.`,
        callout: {
          label: "Reality check",
          text: "Screenshots show winners. They rarely show the losses, fees, or taxes on the same timeline.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Self-check",
        title: "Before the knowledge check…",
        body: `Quick gut-check on the whole lesson: saving and investing serve different timelines; stocks, bonds, and funds are different building blocks; risk and potential return travel together; diversification manages risk without erasing it; and a long horizon plus consistency beats hype and timing games.\n\nAnswer the check-in below, then head into the full knowledge check.`,
        checkIn: {
          prompt: "Which mindset fits most teens best when it comes to investing?",
          choices: [
            "Ignore risk, since younger investors don't really face losses the way adults do",
            "Put a portion of the emergency fund into whatever stock is trending that week",
            "Learn concepts, protect short-term cash, and think in long horizons — not tip-driven flipping",
            "Day trade often, since frequent buying and selling builds good habits early",
          ],
          correctIndex: 2,
          explanation:
            "Education, appropriate timelines, and anti-hype habits beat gambling-style trading or risking money you need soon — age doesn't exempt anyone from real risk.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• Saving ≠ investing — different jobs and risk levels.\n• Stocks = ownership; bonds ≈ lending; funds = baskets.\n• Higher potential return usually means more risk; diversification spreads single-name risk without erasing market risk.\n• Consistency over time beats trying to time the market — and beats FOMO-driven hype.\n• Teens win with long horizons and skepticism toward day-trading hype.\n\nComplete the **Knowledge check**, then reflect on how you'd protect a long-term goal from short-term FOMO.`,
      },
    ],
  },
  bigIdeas: [
    "Investing accepts risk for possible long-term growth; savings prioritize safety and access for nearer needs.",
    "**Stocks**, **bonds**, and **funds** are different building blocks; diversification spreads risk but doesn't remove it.",
    "For teens, a **long horizon** and anti-hype mindset beat day trading.",
  ],
  keyTerms: [
    { term: "Stock", definition: "Ownership share in a company; value can rise or fall." },
    { term: "Bond", definition: "A loan to an issuer that typically pays interest over time." },
    { term: "Fund", definition: "A pooled basket of investments held under one product." },
    { term: "Diversification", definition: "Spreading investments so one failure has less impact." },
    { term: "Risk vs return", definition: "The tradeoff that higher potential rewards usually involve more chance of loss or volatility." },
    { term: "Investment horizon", definition: "How long you plan to keep money invested before needing it." },
    { term: "Volatility", definition: "How sharply prices move up and down." },
    { term: "FOMO investing", definition: "Buying something mainly because it's trending or others seem to be buying — not because you understand it." },
  ],
  realWorld:
    "A classmate brags about a stock that doubled in a week. An Investor Apprentice asks: What happens if it halves? Is this money they need for senior year? Diversified, long-horizon thinking beats highlight-reel FOMO.",
  quiz: [
    {
      id: "q1",
      question: "Priya has $200 saved for emergencies and considers moving it into a stock fund for 'better growth.' What's the key tradeoff she should weigh?",
      choices: [
        "Moving it is risk-free, since funds are specifically designed to protect emergency cash",
        "There's no real tradeoff — investing and emergency savings serve the same purpose",
        "She should only move it if the fund guarantees a fixed return",
        "Investing could grow the money more over time, but it could also lose value right when she needs it for an emergency",
      ],
      correctIndex: 3,
      explanation:
        "Moving emergency money into investments trades reliability for growth potential — the money could be worth less exactly when an emergency hits, which defeats the purpose of an emergency fund.",
    },
    {
      id: "q2",
      question: "Jamal buys one share of a company through a custodial account. What does that share actually represent?",
      choices: [
        "A loan to the company that pays a fixed interest rate no matter what",
        "A small slice of ownership in the company, with a price that can rise or fall",
        "A voucher that guarantees free products from the company",
        "A government-backed savings certificate",
      ],
      correctIndex: 1,
      explanation:
        "Stocks represent ownership, not a fixed-interest loan (that's closer to a bond) or a government guarantee. Prices move with the company's prospects and the market.",
    },
    {
      id: "q3",
      question: "Instead of buying shares in just one company, Zara buys a fund that holds shares in 50 different companies. What is she doing?",
      choices: [
        "Guaranteeing that her investment will never lose value",
        "Avoiding all fees that regular stock purchases would normally have",
        "Diversifying — spreading risk across many holdings so one company's failure has less impact",
        "Eliminating market risk completely, since no single company can hurt her portfolio",
      ],
      correctIndex: 2,
      explanation:
        "Diversification spreads single-company risk across many holdings. It doesn't eliminate fees or protect against a broad market decline.",
    },
    {
      id: "q4",
      question: "An online ad claims an investment offers 'huge guaranteed returns with zero risk.' Based on the risk vs. return concept from the lesson, what should that raise?",
      choices: [
        "Suspicion — higher potential returns usually come with higher risk, so 'no risk, high return' is a red flag",
        "Confidence — some investments truly have no risk once returns are high enough",
        "Nothing — risk and return aren't actually related to each other",
        "Relief — this must be a bond, since bonds never carry any risk",
      ],
      correctIndex: 0,
      explanation:
        "Markets generally link higher expected rewards with a greater chance of loss or volatility. Even bonds carry some risk (like rate changes or default), so 'zero risk, high return' is a warning sign, not a reassurance.",
    },
    {
      id: "q5",
      question: "A friend's screenshot shows a stock that doubled in a week, and the group chat is hyped to buy in immediately. What's the safest first reaction, based on the lesson?",
      choices: [
        "Buy in immediately, since a fast-rising price is proof the investment is safe",
        "Pause and ask what you'd actually be buying, and whether you'd still want it if no one else were talking about it",
        "Wait for an even bigger price jump so the eventual gains are guaranteed to be larger",
        "Assume it's fake, since real prices can never move that quickly",
      ],
      correctIndex: 1,
      explanation:
        "FOMO and herd mentality push people to buy because of hype, not understanding. Calm questions are the antidote — a fast-moving price isn't proof of safety, but it also isn't automatically fake.",
    },
    {
      id: "q6",
      question: "In a worked example, $100 split across ten companies dropped to about $96 after one company fell 40%, while $100 in a single company would have dropped to about $60. Why did diversifying soften the loss?",
      choices: [
        "Because diversified funds are legally protected from ever losing value",
        "Because the fund manager personally covered the loss out of pocket",
        "Because diversified funds always rise whenever one company in them falls",
        "Because only one-tenth of the money was exposed to that one company's 40% drop",
      ],
      correctIndex: 3,
      explanation:
        "Spreading the $100 across ten holdings meant only $10 was riding on the company that fell, so the overall portfolio barely dipped — the loss was contained, not erased or refunded.",
    },
    {
      id: "q7",
      question: "Instead of trying to guess the perfect moment to buy, some long-term investors put in a similar amount on a regular schedule regardless of price swings. What's the main benefit of this approach?",
      choices: [
        "It removes the pressure of guessing the 'perfect' moment, since reliably timing short-term prices isn't realistic for most people",
        "It guarantees a profit no matter what the market does that year",
        "It only works when prices are rising and fails completely in any other market",
        "It means investing a large lump sum once and never adding money again",
      ],
      correctIndex: 0,
      explanation:
        "Nobody can reliably predict short-term price moves. A steady, consistent approach reduces the stress and guesswork of trying to time the market — it doesn't guarantee a profit or depend on prices only going up.",
    },
    {
      id: "q8",
      question: "What made the Ferreira family's approach to Noa's college fund sound, according to the case study?",
      choices: [
        "They chased a hot tip a relative saw trending online",
        "They left the cash in the jar permanently instead of ever considering an account",
        "They matched the money to a clear multi-year horizon and added to it consistently, without expecting a guaranteed return",
        "They avoided ever discussing the plan together as a family",
      ],
      correctIndex: 2,
      explanation:
        "Matching a long-term goal's timeline to an appropriate approach, learning together, and adding consistently — without promising a specific outcome — reflects sound long-horizon thinking, unlike chasing a tip or never acting at all.",
    },
  ],
  reflection: {
    prompt:
      "Describe one long-term goal (5+ years) and explain how risk, diversification, and horizon would shape how you treat money for that goal — versus money for next month's expenses.",
    placeholder:
      "Example: Long-term — trade-school certification fund in 6 years. I'd keep next month's phone bill safe, learn about diversified funds before investing any long-term money, and ignore day-trading hype…",
  },
};
