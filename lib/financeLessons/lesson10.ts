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
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Investing is how people put money to work for **long-term goals** — with risk that savings accounts usually don't have. Today you'll learn the map, not stock tips.\n\nHere's our roadmap:\n\n• **Investing vs saving** — different jobs for different money.\n• **Stocks, bonds, and funds** — ownership, lending, and baskets.\n• **Risk vs return** — why higher possible upside usually means more volatility.\n• **Diversification** — not betting everything on one name.\n• **Long horizon for teens** — decades beat day trading drama.\n• **Guardrails** — education only; no get-rich promises.\n\nYou'll leave able to talk like an Investor Apprentice: calm, skeptical of hype, focused on time.`,
        callout: {
          label: "Why it matters",
          text: "Social feeds reward flashy trades. Real wealth-building for most people is boring, diversified, and long-term — and starts with understanding risk.",
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
        id: "save-vs-invest",
        kicker: "The big idea",
        title: "Saving and investing have different jobs",
        body: `**Savings** (and emergency funds) prioritize safety and access: money for near-term needs and surprises. **Investing** accepts more risk for the *possibility* of higher long-term growth — money you hopefully won't need for many years.\n\nA useful teen rule of thumb:\n• Short-term goals and emergencies → keep in safer, accessible places.\n• Long-term goals (years ahead) → *learn* about investing; only use money you can leave invested through ups and downs.\n\nInvesting is not "extra savings with better vibes." Prices can fall — sometimes a lot, and sometimes for a long time.`,
        bullets: [
          "Emergency fund first (from earlier lessons) before risking money you can't afford to lose.",
          "Investing involves possible loss of principal.",
          "Match the tool to the timeline.",
        ],
        callout: {
          label: "Watch out",
          text: "Putting rent money or next month's phone bill into volatile investments is a strategy failure, not a bold move.",
        },
      },
      {
        id: "asset-types",
        kicker: "The map",
        title: "Stocks, bonds, and funds — overview",
        body: `**Stocks:** you own a piece of a company. If the company does well over time, the stock *may* rise (or pay dividends). If it struggles, the stock can fall — even to near zero in extreme cases.\n\n**Bonds:** you lend money. In return you typically receive interest and your principal back later (unless the borrower defaults). Bonds are often described as lower risk than stocks *on average*, but they still have risks (rate changes, credit risk).\n\n**Funds:** instead of picking one stock, a fund holds many. That can make diversification easier. Some funds track a broad market index; others are actively managed. Fees matter over long periods.\n\nThis is a map of categories — not advice to buy any specific product.`,
        callout: {
          label: "Common misconception",
          text: "\"Funds are always safe.\" Funds can still lose value. Diversification reduces *single-company* risk; it doesn't erase market risk.",
        },
      },
      {
        id: "risk-diversify",
        kicker: "Tradeoffs",
        title: "Risk vs return — and why diversification helps",
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
      },
      {
        id: "teen-horizon",
        kicker: "Teen lens",
        title: "Long horizon — not day trading",
        body: `As a teen, your biggest investing advantage (when you eventually invest) is often **time**: decades for long-term goals. Day trading and constant flipping fight that advantage with fees, taxes, stress, and emotional mistakes.\n\nHealthy Investor Apprentice habits:\n• Learn vocabulary and risk before risking real money.\n• Prefer education and broad concepts over tip culture.\n• If/when you invest (with family rules, custodial accounts, or later adult accounts), think in years, not hours.\n• Never invest money needed soon for school, bills, or emergencies.\n\nCuriosity is good. Gambling dressed up as "strategy" is not.`,
        callout: {
          label: "Try this week",
          text: "Write one long-term goal (5+ years) and one short-term goal. Note which belongs in safer savings vs future investing education.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• Saving ≠ investing — different jobs and risk levels.\n• Stocks = ownership; bonds ≈ lending; funds = baskets.\n• Higher potential return usually means more risk; diversification spreads single-name risk.\n• Teens win with long horizons and skepticism toward day-trading hype.\n\nComplete the **Knowledge check**, then reflect on how you'd protect a long-term goal from short-term FOMO.`,
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
  ],
  reflection: {
    prompt:
      "Describe one long-term goal (5+ years) and explain how risk, diversification, and horizon would shape how you treat money for that goal — versus money for next month's expenses.",
    placeholder:
      "Example: Long-term — skills/certification fund in 6 years. I'd keep next month's expenses safe, learn about diversified funds before investing any long-term money, and ignore day-trading hype…",
  },
};
