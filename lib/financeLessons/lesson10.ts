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
          prompt: "How does investing typically differ from an emergency savings fund?",
          choices: [
            "Investing is always risk-free; savings always lose money",
            "Investing usually accepts more risk for possible long-term growth; emergency savings prioritize access and stability",
            "They are identical products with different logos",
            "Investing is only for day traders",
          ],
          correctIndex: 1,
          explanation:
            "Emergency money needs to be reliable and available. Investing aims at longer-term growth and can lose value.",
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
          prompt: "What is a stock, in simple terms?",
          choices: [
            "A loan you make that always pays fixed interest",
            "A slice of ownership in a company",
            "A guaranteed government payment with no risk",
            "A type of savings account with extra insurance",
          ],
          correctIndex: 1,
          explanation:
            "Stocks represent ownership. Their prices can rise or fall with the company's prospects and market conditions.",
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
          prompt: "Why do people use diversified funds instead of one single stock?",
          choices: [
            "To guarantee they never lose money",
            "To spread risk across many holdings so one company failure hurts less",
            "Because funds never charge fees",
            "Because diversification removes all market risk",
          ],
          correctIndex: 1,
          explanation:
            "Diversification reduces concentration risk. Markets can still fall overall — it's not a guarantee.",
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
          prompt: "Which statement is accurate about diversification?",
          choices: [
            "It guarantees your investments will never lose value",
            "It reduces damage from any single holding failing, but doesn't erase overall market risk",
            "It means you should buy just one 'safe' stock",
            "It only matters for professional investors, not everyday people",
          ],
          correctIndex: 1,
          explanation:
            "Diversification spreads single-company risk across many holdings. It cannot protect against a broad market decline.",
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
          prompt: "Why is a long horizon often described as a teen's biggest investing advantage?",
          choices: [
            "Because teens are legally required to day trade",
            "Because more years available before the money is needed gives more time to ride out ups and downs",
            "Because younger investors are guaranteed higher returns",
            "Because horizon has no real effect on investing decisions",
          ],
          correctIndex: 1,
          explanation:
            "A longer horizon means more time to potentially recover from downturns and let consistent investing work — without any specific outcome being guaranteed.",
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
        id: "standards-connect",
        kicker: "Why this counts",
        title: "How this connects to national standards",
        body: `This lesson lines up with the **Jump$tart Coalition** and **Council for Economic Education (CEE) 2021 National Standards for Personal Financial Literacy** — specifically the **Investing** strand: understanding risk vs. return, comparing basic investment vehicles (stocks, bonds, funds), and recognizing diversification as a risk-management tool rather than a guarantee.\n\nThese ideas are deliberately taught without recommending any specific product or predicting any return — that's what keeps this education rather than advice. The goal is that when you're old enough to open your own accounts, the vocabulary and risk-awareness are already familiar.`,
        callout: {
          label: "Standards note",
          text: "This is general financial education, not personalized investment advice for your specific situation.",
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
        id: "check-yourself",
        kicker: "Self-check",
        title: "Before the knowledge check…",
        body: `Quick gut-check on the whole lesson: saving and investing serve different timelines; stocks, bonds, and funds are different building blocks; risk and potential return travel together; diversification manages risk without erasing it; and a long horizon plus consistency beats hype and timing games.\n\nAnswer the check-in below, then head into the full knowledge check.`,
        checkIn: {
          prompt: "Which mindset fits most teens best when it comes to investing?",
          choices: [
            "Day trade constantly using money needed for near-term bills",
            "Learn concepts, protect short-term cash, and think in long horizons — not tip-driven flipping",
            "Ignore risk because young people can't lose money",
            "Put the entire emergency fund into one viral stock tip",
          ],
          correctIndex: 1,
          explanation:
            "Education, appropriate timelines, and anti-hype habits beat gambling-style trading with money you need soon.",
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
      question: "How does investing typically differ from an emergency savings fund?",
      choices: [
        "Investing is always risk-free; savings always lose money",
        "Investing usually accepts more risk for possible long-term growth; emergency savings prioritize access and stability",
        "They are identical products with different logos",
        "Investing is only for day traders",
      ],
      correctIndex: 1,
      explanation:
        "Emergency money needs to be reliable and available. Investing aims at longer-term growth and can lose value.",
    },
    {
      id: "q2",
      question: "What is a stock, in simple terms?",
      choices: [
        "A loan you make that always pays fixed interest",
        "A slice of ownership in a company",
        "A guaranteed government payment with no risk",
        "A type of savings account FDIC insurance replaces",
      ],
      correctIndex: 1,
      explanation:
        "Stocks represent ownership. Their prices can rise or fall with the company's prospects and market conditions.",
    },
    {
      id: "q3",
      question: "Why do people use diversified funds instead of one single stock?",
      choices: [
        "To guarantee they never lose money",
        "To spread risk across many holdings so one company failure hurts less",
        "Because funds never charge fees",
        "Because diversification removes all market risk",
      ],
      correctIndex: 1,
      explanation:
        "Diversification reduces concentration risk. Markets can still fall overall — diversification is not a guarantee.",
    },
    {
      id: "q4",
      question: "Which statement best describes risk vs return?",
      choices: [
        "Higher potential returns usually come with higher risk",
        "Higher returns always come with zero risk if you believe hard enough",
        "Risk and return are unrelated",
        "Only bonds have risk; stocks never fall",
      ],
      correctIndex: 0,
      explanation:
        "Markets generally link higher expected rewards with greater chance of loss or volatility. 'No risk, high return' is a warning sign.",
    },
    {
      id: "q5",
      question: "What investing mindset fits most teens best?",
      choices: [
        "Day trade constantly using money needed for near-term bills",
        "Learn concepts, protect short-term cash, and think in long horizons — not tip-driven flipping",
        "Ignore risk because young people can't lose money",
        "Put the entire emergency fund into one viral stock tip",
      ],
      correctIndex: 1,
      explanation:
        "Education, appropriate timelines, and anti-hype habits beat gambling-style trading with money you need soon.",
    },
    {
      id: "q6",
      question: "In the 'one bet vs. ten bets' example, why did the diversified approach lose less after the same 40% single-company drop?",
      choices: [
        "Because diversified funds are legally protected from all losses",
        "Because the shock was spread across many holdings instead of hitting the entire amount",
        "Because diversified funds always go up when one stock goes down",
        "Because the fund manager refunded the loss",
      ],
      correctIndex: 1,
      explanation:
        "Only one-tenth of the diversified portfolio was exposed to that company's drop, so the overall impact was much smaller — not eliminated, just spread out.",
    },
    {
      id: "q7",
      question: "What is the main idea behind investing consistently over time instead of trying to time the market?",
      choices: [
        "It guarantees you'll never experience a loss",
        "It removes the pressure of guessing the 'perfect' moment, since reliable timing isn't realistic for most people",
        "It means you should only invest once and never add money again",
        "It works only during a rising market and fails otherwise",
      ],
      correctIndex: 1,
      explanation:
        "Nobody can reliably predict short-term price moves. A steady, consistent approach reduces the stress and guesswork of trying to time the market perfectly.",
    },
    {
      id: "q8",
      question: "What made the Ferreira family's approach to Noa's college fund sound, according to the case study?",
      choices: [
        "They chased a hot tip from social media",
        "They matched the money to a clear multi-year horizon and added to it consistently, without expecting a guaranteed return",
        "They spent the jar money immediately instead of investing it",
        "They avoided ever discussing the plan as a family",
      ],
      correctIndex: 1,
      explanation:
        "Matching a long-term goal's timeline to an appropriate approach, learning together, and adding consistently — without promising a specific outcome — reflects sound long-horizon thinking.",
    },
  ],
  reflection: {
    prompt:
      "Describe one long-term goal (5+ years) and explain how risk, diversification, and horizon would shape how you treat money for that goal — versus money for next month's expenses.",
    placeholder:
      "Example: Long-term — trade-school certification fund in 6 years. I'd keep next month's phone bill safe, learn about diversified funds before investing any long-term money, and ignore day-trading hype…",
  },
};
