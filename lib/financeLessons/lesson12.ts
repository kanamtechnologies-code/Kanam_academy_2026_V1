import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const financeLesson12: AILessonConfig = {
  id: "fl-12",
  title: "12. Scams, Fraud & Consumer Rights",
  goal: "Spot phishing and money scams, understand identity theft basics, practice compare-before-you-buy habits, and know conceptual paths for consumer complaints.",
  xpReward: 600,
  badge: "Consumer Guardian",
  dashboardHref: "/dashboard",
  prevHref: "/learn/finance/11",
  nextHref: "/learn/finance/13",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Scammers don't need elite hacking skills if they can rush your emotions. Today you'll build Consumer Guardian instincts for money, identity, and everyday purchases.\n\nHere's our roadmap:\n\n• **How scams work** — urgency, fear, greed, and secrecy.\n• **Phishing & money scams** — fake messages, fake jobs, fake "refunds."\n• **Identity theft basics** — what thieves want and how to harden yourself.\n• **Compare before you buy** — price, terms, reviews, return policies.\n• **Complaint paths (conceptually)** — company → trusted agencies → records.\n• **Bystander skills** — helping family without shaming.\n\nDefensive, ethical, practical — no scare tactics for their own sake.`,
        callout: {
          label: "Why it matters",
          text: "One wired payment or shared one-time code can empty an account. Guardianship is slower decisions under pressure.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Fraud words in plain English",
        body: `• **Scam / fraud** — tricking someone to give money, data, or access under false pretenses.\n• **Phishing** — fake messages that impersonate trusted brands or people to steal logins or info.\n• **Identity theft** — using someone's personal information to open accounts or make purchases as them.\n• **Social engineering** — manipulating people psychologically instead of breaking technical locks.\n• **Consumer rights** — protections and fair practices around buying goods/services (rules vary by place).\n• **Chargeback / dispute** — asking a card issuer to reverse a fraudulent or incorrect charge (process/rules apply).\n\nYou'll use these labels to slow down when something feels off.`,
        callout: {
          label: "Pro tip",
          text: "If a message says 'act now or else' and demands secrecy, treat that as a siren — not a countdown.",
        },
      },
      {
        id: "scam-patterns",
        kicker: "The big idea",
        title: "Scams run on emotion, not IQ",
        body: `Most money scams share a pattern:\n\n1. **Hook** — prize, job, romance, "your account is locked," package problem.\n2. **Pressure** — limited time, threats, or exclusive secrecy.\n3. **Ask** — gift cards, wire/crypto, remote access, codes, personal data.\n4. **Isolation** — "Don't tell your parents/bank."\n\nYou're not "dumb" if you almost fall for it — you're human. Consumer Guardians build **pause habits**: verify on a known channel, refuse gift-card payments for debts, never share one-time codes.`,
        bullets: [
          "Legitimate companies don't demand gift cards to 'fix' accounts.",
          "Verify callbacks using official numbers you look up yourself.",
          "Slow is safe when money or codes are requested.",
        ],
        callout: {
          label: "Watch out",
          text: "Impersonation can look polished — logos, caller ID spoofing, and AI voice clones exist. Verification beats vibes.",
        },
      },
      {
        id: "phishing-identity",
        kicker: "Defend identity",
        title: "Phishing and identity theft basics",
        body: `**Phishing** arrives as email, texts, DMs, or fake sites. Red flags: mismatched URLs, generic greetings, attachments you didn't expect, login pages reached from a link in a panic message.\n\n**Identity theft** thrives on Social Security numbers, birthdates, account logins, and scanned IDs. Harden with:\n• Unique passwords + multi-factor authentication where available.\n• Careful sharing of IDs/photos of documents.\n• Shredding or secure disposal of papers with sensitive data.\n• Monitoring account alerts and credit-related freezes/reports when appropriate (with adult help).\n\nIf something leaks: change passwords, enable MFA, tell a trusted adult, and contact institutions for the affected accounts.`,
        callout: {
          label: "Myth check",
          text: "\"Only older people get scammed.\" Teens are targets for fake jobs, scholarship fees, gaming trades, and friendship scams too.",
        },
      },
      {
        id: "compare-buy",
        kicker: "Everyday defense",
        title: "Compare before you buy — and know complaint paths",
        body: `Consumer Guardians shop with a short checklist:\n\n• **Price** — is this deal dramatically below market? Why?\n• **Seller** — reputable site/store vs random link.\n• **Terms** — subscriptions, auto-renew, restocking fees.\n• **Returns** — window, condition, who pays shipping.\n• **Reviews** — look for patterns, not one perfect five-star.\n\nIf something goes wrong, a conceptual complaint path looks like:\n1. Contact the seller with facts, dates, and screenshots.\n2. Use card dispute/chargeback options when appropriate.\n3. Consider trusted consumer protection or attorney-general style resources for your area (adults can help navigate).\n4. Keep records. Calm documentation beats angry essays.\n\nLaws differ by location — the skill is knowing to escalate with evidence, not giving up at the first "no."`,
        callout: {
          label: "Try this week",
          text: "Before your next non-trivial purchase, write a 60-second compare list: price, return policy, and one alternative seller.",
        },
      },
      {
        id: "help-others",
        kicker: "Community",
        title: "Help family without shame",
        body: `Scam defense is a team sport. If a relative gets a scary call:\n\n• Stay respectful — shame makes people hide mistakes.\n• Offer to verify together on an official channel.\n• Suggest hanging up and calling back via a known number.\n• If money already moved, act fast with the financial institution and local guidance.\n\nYou're building habits you'll use for decades — and that you can teach.`,
        callout: {
          label: "Ethics",
          text: "Don't 'test' friends with fake phishing. Practice defense, not unauthorized social-engineering experiments.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• Scams use urgency, fear, greed, and secrecy.\n• Phishing steals access; identity theft misuses your data.\n• Compare before you buy; escalate complaints with records.\n• Help others calmly — verification over panic.\n\nHit the **Knowledge check**, then reflect on your personal pause rule when money is requested.`,
      },
    ],
  },
  bigIdeas: [
    "Most scams exploit **urgency and emotion** — pause and verify on a channel you trust.",
    "**Phishing** and **identity theft** target access and personal data; MFA and careful sharing reduce damage.",
    "Smart consumers **compare before buying** and escalate problems with documentation.",
  ],
  keyTerms: [
    { term: "Phishing", definition: "Fraudulent messages or sites impersonating trusted parties to steal information or access." },
    { term: "Identity theft", definition: "Using someone else's personal information to commit fraud." },
    { term: "Social engineering", definition: "Manipulating people into giving access, money, or data." },
    { term: "Consumer rights", definition: "Protections related to fair treatment when buying goods and services (vary by jurisdiction)." },
    { term: "Chargeback / dispute", definition: "A process to challenge certain card charges with the issuer under applicable rules." },
    { term: "Urgency tactic", definition: "Pressure to act immediately so you skip verification." },
  ],
  realWorld:
    "A text says your package is held for a $1.99 fee and links to a login page. A Consumer Guardian ignores the link, opens the shipping app directly, and finds no fee — classic phishing pressure.",
  quiz: [
    {
      id: "q1",
      question: "A caller says your account will be closed unless you pay with gift cards right now. What should you do?",
      choices: [
        "Buy the gift cards immediately to be safe",
        "Treat it as a scam red flag — hang up and verify using a known official channel",
        "Share a one-time code so they can 'unlock' the account",
        "Wire crypto because it's faster",
      ],
      correctIndex: 1,
      explanation:
        "Gift-card and extreme-urgency payment demands are classic scam patterns. Verify independently; don't follow the caller's script.",
    },
    {
      id: "q2",
      question: "What is phishing?",
      choices: [
        "A type of savings account bonus",
        "Fake messages or sites designed to steal logins or personal information",
        "A legal way companies collect taxes",
        "An insurance deductible",
      ],
      correctIndex: 1,
      explanation:
        "Phishing impersonates trusted sources to trick you into handing over credentials or data.",
    },
    {
      id: "q3",
      question: "Which habit best reduces identity theft risk?",
      choices: [
        "Reuse one password everywhere for convenience",
        "Use unique passwords, enable MFA where available, and limit sharing of sensitive IDs",
        "Post photos of your full ID 'for vibes'",
        "Ignore account alerts so you aren't annoyed",
      ],
      correctIndex: 1,
      explanation:
        "Unique credentials, MFA, and careful data sharing make stolen info harder to abuse.",
    },
    {
      id: "q4",
      question: "What belongs on a compare-before-you-buy checklist?",
      choices: [
        "Only the influencer's discount code",
        "Price, seller reputation, terms/auto-renew, and return policy",
        "Whether the ad used your favorite color",
        "Skipping reviews because they take time",
      ],
      correctIndex: 1,
      explanation:
        "Comparing price, trustworthiness, terms, and returns prevents many consumer regrets and scam purchases.",
    },
    {
      id: "q5",
      question: "If a purchase goes wrong, what is a sound conceptual first step?",
      choices: [
        "Post threats publicly with no facts",
        "Contact the seller with dates, evidence, and a clear request — then escalate with records if needed",
        "Give up immediately",
        "Share your password with a stranger offering to 'fix it'",
      ],
      correctIndex: 1,
      explanation:
        "Documented, calm escalation — seller first, then card disputes or consumer resources as appropriate — is the guardian path.",
    },
  ],
  reflection: {
    prompt:
      "Write your personal 'pause rule' for when someone asks for money, codes, or remote access. Include how you'll verify and who you'll tell.",
    placeholder:
      "Example: If anyone asks for a code or gift cards, I hang up, tell a parent, and check the real app/website myself…",
  },
};
