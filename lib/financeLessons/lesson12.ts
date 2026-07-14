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
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/fl-12.png",
        imageAlt: "Teen squinting at a suspicious scholarship fee text message on a phone, realistic caution scene",
        body: `Scammers don't need elite hacking skills if they can rush your emotions. Today you'll build Consumer Guardian instincts for money, identity, and everyday purchases.\n\nHere's our roadmap:\n\n• **A quick story** — a scholarship text that almost worked.\n• **Scam patterns, phishing/identity theft, and smart buying** — the three ideas that build on each other.\n• **A worked example** — annotating a real-looking scam message, line by line.\n• **A myth to bust** — scams don't only target careless or older people.\n• **A deeper skill** — verifying through a channel you find yourself.\n• **A case study and self-check** — before you hit the knowledge check.\n\nDefensive, ethical, practical — no scare tactics for their own sake.`,
        callout: {
          label: "Why it matters",
          text: "One wired payment or shared one-time code can empty an account. Guardianship is slower decisions under pressure.",
        },
      },
      {
        id: "hook-story",
        kicker: "A quick story",
        title: "The scholarship text that almost worked",
        body: `Priya gets a text: "Congrats! You've won a $500 scholarship. Claim it by paying a $29 processing fee via gift card before midnight." Her stomach jumps — free money, but a countdown clock. She almost buys the gift card right then.\n\nInstead, she pauses and texts her school counselor a screenshot. The counselor replies within the hour: no such scholarship exists, and no legitimate scholarship ever asks for payment by gift card to "unlock" winnings.\n\nThe $29 "fee" would have been gone in minutes, with nothing to show for it — and Priya would have handed a scammer a working gift card code, which is basically untraceable cash.`,
        callout: {
          label: "Notice",
          text: "The urgency ('before midnight') and the unusual payment method (gift card) were the two loudest red flags — before Priya even checked if the scholarship was real.",
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
        id: "concept-1",
        kicker: "The big idea",
        title: "Scams run on emotion, not IQ",
        image: "/images/lessons/fl-12-2.png",
        imageAlt: "Infographic red flags: Too good to be true, Urgency, Ask for gift cards, Fake official logos",
        body: `Most money scams share a pattern:\n\n1. **Hook** — prize, fake job, romance, "your account is locked," package problem.\n2. **Pressure** — limited time, threats, or exclusive secrecy.\n3. **Ask** — gift cards, wire/crypto, remote access, codes, personal data.\n4. **Isolation** — "Don't tell your parents/bank."\n\nYou're not "dumb" if you almost fall for it — you're human. Consumer Guardians build **pause habits**: verify on a known channel, refuse gift-card payments for debts, never share one-time codes.`,
        bullets: [
          "Legitimate companies don't demand gift cards to 'fix' accounts.",
          "Verify callbacks using official numbers you look up yourself.",
          "Slow is safe when money or codes are requested.",
        ],
        callout: {
          label: "Watch out",
          text: "Impersonation can look polished — logos, caller ID spoofing, and AI voice clones exist. Verification beats vibes.",
        },
        checkIn: {
          prompt: "A caller says your account will be closed unless you pay with gift cards right now. What should you do?",
          choices: [
            "Buy the gift cards immediately to be safe",
            "Treat it as a scam red flag — hang up and verify using a known official channel",
            "Share a one-time code so they can 'unlock' the account",
            "Wire crypto because it's faster",
          ],
          correctIndex: 1,
          explanation:
            "Gift-card and extreme-urgency payment demands are classic scam patterns. Verify independently.",
        },
      },
      {
        id: "concept-2",
        kicker: "Defend identity",
        title: "Phishing and identity theft basics",
        body: `**Phishing** arrives as email, texts, DMs, or fake sites. Red flags: mismatched URLs, generic greetings, attachments you didn't expect, login pages reached from a link in a panic message.\n\n**Identity theft** thrives on Social Security numbers, birthdates, account logins, and scanned IDs. Harden with:\n• Unique passwords + multi-factor authentication where available.\n• Careful sharing of IDs/photos of documents.\n• Shredding or secure disposal of papers with sensitive data.\n• Monitoring account alerts and credit-related freezes/reports when appropriate (with adult help).\n\nIf something leaks: change passwords, enable MFA, tell a trusted adult, and contact institutions for the affected accounts.`,
        callout: {
          label: "Myth check",
          text: "\"Only older people get scammed.\" Teens are targets for fake jobs, scholarship fees, gaming trades, and friendship scams too.",
        },
        checkIn: {
          prompt: "Which habit best reduces identity theft risk?",
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
      },
      {
        id: "concept-3",
        kicker: "Everyday defense",
        title: "Compare before you buy — and know complaint paths",
        image: "/images/lessons/fl-12-3.png",
        imageAlt: "Teen comparing prices of headphones on two browser tabs before buying, realistic desk photo",
        body: `Consumer Guardians shop with a short checklist:\n\n• **Price** — is this deal dramatically below market? Why?\n• **Seller** — reputable site/store vs random link.\n• **Terms** — subscriptions, auto-renew, restocking fees.\n• **Returns** — window, condition, who pays shipping.\n• **Reviews** — look for patterns, not one perfect five-star.\n\nIf something goes wrong, a conceptual complaint path looks like:\n1. Contact the seller with facts, dates, and screenshots.\n2. Use card dispute/chargeback options when appropriate.\n3. Consider trusted consumer protection or attorney-general style resources for your area (adults can help navigate).\n4. Keep records. Calm documentation beats angry essays.\n\nLaws differ by location — the skill is knowing to escalate with evidence, not giving up at the first "no."`,
        callout: {
          label: "Try this week",
          text: "Before your next non-trivial purchase (prom outfit, used gear, phone case), write a 60-second compare list: price, return policy, and one alternative seller.",
        },
        checkIn: {
          prompt: "What belongs on a compare-before-you-buy checklist?",
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
      },
      {
        id: "worked-example",
        kicker: "Show the work",
        title: "Worked example: annotating a scam text, line by line",
        body: `Here's a realistic scam text, broken down piece by piece:\n\n*"URGENT: Your bank account has been LOCKED due to suspicious activity. Verify your identity within 30 MINUTES at secure-bankverify-login.net or your funds will be frozen permanently."*\n\n• **"URGENT" / "30 MINUTES":** manufactured urgency — designed to make you act before you think.\n• **"LOCKED" / "frozen permanently":** fear-based threat — your bank almost never threatens permanent loss over text.\n• **"secure-bankverify-login.net":** a URL that *sounds* official but isn't your actual bank's domain — a classic phishing giveaway.\n• **"Verify your identity":** the real goal — getting you to type your login or personal info into a fake page.\n\nEvery scam text can be taken apart this way: find the hook, the pressure, the ask, and the suspicious detail hiding in plain sight.`,
        bullets: [
          "Urgency language ('URGENT', a countdown) — designed to skip your thinking step.",
          "Threat of permanent loss — designed to trigger fear, not calm reasoning.",
          "A URL that isn't your actual bank's real domain — the technical tell.",
        ],
        callout: {
          label: "Reality check",
          text: "Real banks generally don't threaten permanent account freezing over unsolicited text links. When unsure, open the bank's official app directly instead of tapping the link.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "Common myth: \"Scams only happen to careless or older people\"",
        body: `Two myths worth retiring:\n\n**Myth 1: "I'm too smart/young to be scammed."** Scams are engineered to bypass careful thinking by hijacking emotion (fear, excitement, urgency) — intelligence and age don't fully protect against that. Teens are actively targeted through fake job offers, gaming trade scams, and "scholarship" fees.\n\n**Myth 2: "If it looks official — logo, professional tone — it must be real."** Logos and polished design are trivial to copy. Legitimacy comes from verifying through a channel *you* found yourself (official app, number from the back of your card, the school's real front desk), not from how convincing the message looks.\n\nStaying alert isn't about distrust of everyone — it's about verifying anything involving money, codes, or personal data.`,
        checkIn: {
          prompt: "Why can even careful, tech-savvy teens fall for scams?",
          choices: [
            "Because scams only work on people who don't understand technology",
            "Because scams are designed to trigger urgency and fear, which can override careful thinking regardless of age or skill",
            "Because scams are always obvious and easy to spot",
            "Because only people over 60 are ever targeted",
          ],
          correctIndex: 1,
          explanation:
            "Scams exploit emotional pressure, not just lack of knowledge. That's why pausing and verifying matters for everyone.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Spot the red flags in a second message",
        body: `Try annotating this one yourself before reading the breakdown:\n\n*"Hey! It's your cousin, I lost my phone and I'm texting from a friend's number. Can you send me $150 in gift cards right now? I'll explain later and pay you back, please don't tell anyone yet, I'm embarrassed."*\n\n**What's suspicious here?** An unfamiliar number claiming to be someone you know, a request for gift cards (again — nearly untraceable), and a request for secrecy ("don't tell anyone"). A real family member in a genuine emergency would understand you calling them back on their known number to confirm — a scammer pretending to be them would try to stop you from doing exactly that.`,
        callout: {
          label: "Try this now",
          text: "The next time any message asks for money, codes, or secrecy, your first move is always the same: contact the person/company through a number or app you already know is real — not through the message itself.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Verify through a channel you find yourself",
        image: "/images/lessons/fl-12-4.png",
        imageAlt: "Teen looking up an official phone number independently on a laptop before calling back, realistic photo",
        body: `The single most reliable defensive skill: **never verify using contact info provided by the suspicious message itself.** A scam text with a "customer service" number attached just connects you back to the scammer.\n\nInstead:\n1. Close the message without clicking anything.\n2. Independently look up the real number or website — from the back of a card, an official app you already installed, or a name you already trust (like your actual school's front office).\n3. Contact them through that independently-found channel and ask directly if the original message was legitimate.\n\nThis one habit defeats the vast majority of phishing and impersonation attempts, because it removes the scammer's control over what happens next.`,
        bullets: [
          "Never call a number or click a link provided inside the suspicious message.",
          "Find contact info yourself — card, official app, or a source you already trust.",
          "If they can't confirm it independently, don't act on the original message.",
        ],
        callout: {
          label: "Watch out",
          text: "Caller ID and sender names can be spoofed to look official. Independent verification beats trusting how a message or call appears.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Legit request vs. scam request",
        body: `Compare how a real company/organization typically behaves versus a scammer:\n\n• **Channel:** Legit — through your existing account/app or a number you looked up yourself. Scam — an unexpected text, DM, or call with urgency baked in.\n• **Payment method:** Legit — normal payment methods through official systems. Scam — gift cards, wire transfers, or crypto "to fix" something.\n• **Tone:** Legit — calm, willing to let you call back and verify. Scam — rushed, secretive, threatens a deadline or consequence.\n• **Information requested:** Legit — asks only for what's actually needed for a specific, expected transaction. Scam — asks for one-time codes, full SSNs, or remote device access "to help."\n\nWhen a real request and a scam request are placed side by side like this, the differences are usually clear — the hard part is noticing them in the moment, under pressure.`,
        checkIn: {
          prompt: "Which combination is the strongest signal of a scam rather than a legitimate request?",
          choices: [
            "A calm message that lets you call back on a number you look up yourself",
            "Urgent tone, secrecy request, and demand for payment via gift card or crypto",
            "An email confirming an order you actually placed",
            "A statement mailed to your home address",
          ],
          correctIndex: 1,
          explanation:
            "Urgency plus secrecy plus an unusual payment method (gift cards, crypto, wires 'to fix something') is a strong combined signal of fraud.",
        },
      },
      {
        id: "behavioral-trap",
        kicker: "Watch your brain",
        title: "The behavioral trap: shame and sunk cost",
        body: `Two traps keep people stuck in scams longer than they should be:\n\n**Shame.** After realizing they've been scammed (or almost were), people often hide it instead of reporting it — embarrassed at having "fallen for it." That silence helps scammers keep operating and delays getting help (like freezing a card quickly).\n\n**Sunk cost.** If a scammer has already gotten a first payment ("just one more fee to release the rest"), victims sometimes keep paying because they've already invested money and don't want to admit the first payment is gone. Scammers count on this — the "one more fee" almost never ends.\n\nThe fix for both: report immediately (to a trusted adult, your bank, and relevant authorities) the moment something feels off, no matter how far it's already gone. Speed limits damage far more than shame protects pride.`,
        callout: {
          label: "Reality check",
          text: "If money already moved, contact your bank/card issuer immediately — acting fast matters more than feeling embarrassed about it.",
        },
      },
      {
        id: "habits",
        kicker: "Community",
        title: "Help family without shame",
        body: `Scam defense is a team sport. If a relative gets a scary call:\n\n• Stay respectful — shame makes people hide mistakes.\n• Offer to verify together on an official channel.\n• Suggest hanging up and calling back via a known number.\n• If money already moved, act fast with the financial institution and local guidance.\n\nYou're building habits you'll use for decades — and that you can teach.`,
        callout: {
          label: "Ethics",
          text: "Don't 'test' friends with fake phishing. Practice defense, not unauthorized social-engineering experiments.",
        },
      },
      {
        id: "standards-connect",
        kicker: "Why this counts",
        title: "How this connects to national standards",
        body: `This lesson lines up with the **Jump$tart Coalition** and **Council for Economic Education (CEE) 2021 National Standards for Personal Financial Literacy** — specifically the **Managing Risk** strand, including consumer protection and fraud awareness: recognizing scam patterns, understanding identity theft, and knowing conceptual paths for consumer complaints.\n\nThese are practical, transferable skills — the same red-flag checklist works whether the scam arrives by text, email, phone call, or DM, today or a decade from now.`,
        callout: {
          label: "Standards note",
          text: "This is general education about fraud patterns, not legal advice — laws and consumer resources vary by location.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on…",
        body: `Take thirty seconds to answer honestly:\n\n**Has a message, call, or DM ever pressured you to act fast about money or personal info? What made it feel urgent, looking back?**\n\nThere's no wrong answer — recognizing what urgency *felt like* in the moment helps you catch it faster next time.`,
        callout: {
          label: "No wrong answers",
          text: "You'll revisit a version of this question in the reflection at the end of the lesson — this is just the warm-up.",
        },
      },
      {
        id: "mini-case",
        kicker: "Case study",
        title: "The fake job offer",
        image: "/images/lessons/fl-12-5.png",
        imageAlt: "Teen looking skeptically at a too-good-to-be-true remote job offer message on a laptop, realistic photo",
        body: `Marcus, looking for a summer job, gets a DM offering $35/hour for "easy remote data entry" — no interview required, just fill out a form with his bank details "for direct deposit setup" and pay a small fee for a "training kit" up front.\n\nSomething feels off: no real company interviews zero candidates for a $35/hour role, and legitimate employers don't ask new hires to pay *them* money before starting. Marcus tells his parent, who agrees it has every hallmark of a scam — the too-good-to-be-true pay, the missing interview, and the upfront "fee."\n\nMarcus reports the message and blocks the account instead of responding. No money or bank details ever changed hands — because the mismatch between the offer and normal hiring practices was the tell, before any technical red flag even showed up.`,
        callout: {
          label: "Try this",
          text: "If a deal, job, or prize sounds unusually generous with almost no effort required, treat that gap itself as the first red flag — before you even check anything else.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Self-check",
        title: "Before the knowledge check…",
        body: `Quick gut-check on the whole lesson: scams use urgency, fear, and secrecy; phishing steals access while identity theft misuses data; smart buyers compare before purchasing; and independent verification beats trusting how a message looks or sounds.\n\nAnswer the check-in below, then head into the full knowledge check.`,
        checkIn: {
          prompt: "If a purchase or offer goes wrong, what is a sound conceptual first step?",
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
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• Scams use urgency, fear, greed, and secrecy.\n• Phishing steals access; identity theft misuses your data.\n• Compare before you buy; escalate complaints with records.\n• Verify through a channel you find yourself — never through the suspicious message.\n• Help others calmly — verification over panic, and speed over shame if something goes wrong.\n\nHit the **Knowledge check**, then reflect on your personal pause rule when money is requested.`,
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
    { term: "Independent verification", definition: "Confirming a request is legitimate using contact info you found yourself, not info from the suspicious message." },
  ],
  realWorld:
    "A DM says you won a $500 scholarship but must pay a $29 'processing fee' by gift card. A Consumer Guardian ignores the link, checks with your school counselor, and finds no such scholarship — classic scam pressure.",
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
    {
      id: "q6",
      question: "In the annotated scam text example, what was the technical giveaway that the message was fake?",
      choices: [
        "The message used the word 'account'",
        "The link used a URL that wasn't the bank's actual official domain",
        "The message was longer than usual",
        "The message included a greeting",
      ],
      correctIndex: 1,
      explanation:
        "A URL that only *resembles* an official domain (rather than matching it exactly) is a strong phishing signal, alongside the manufactured urgency and threat.",
    },
    {
      id: "q7",
      question: "What is the single most reliable way to verify a suspicious message or call is legitimate?",
      choices: [
        "Use the phone number or link provided inside the suspicious message",
        "Independently look up the real contact info yourself and reach out through that channel",
        "Assume it's real if the logo looks professional",
        "Ask the sender to prove it by sending more personal information",
      ],
      correctIndex: 1,
      explanation:
        "Verifying through contact info you found yourself — not info from the suspicious message — removes the scammer's ability to control what happens next.",
    },
    {
      id: "q8",
      question: "In the fake job offer case study, what was the biggest red flag before any technical detail even mattered?",
      choices: [
        "The job was remote",
        "The pay and lack of interview process didn't match how real hiring normally works, and the 'employer' asked for money up front",
        "The message included a greeting",
        "The job listing mentioned data entry",
      ],
      correctIndex: 1,
      explanation:
        "A mismatch between the offer (high pay, no interview) and normal hiring practices — plus asking the applicant to pay first — is a classic scam pattern.",
    },
  ],
  reflection: {
    prompt:
      "Write your personal 'pause rule' for when someone asks for money, codes, or remote access. Include how you'll verify and who you'll tell.",
    placeholder:
      "Example: If anyone asks for a code or gift cards, I hang up, tell a parent, and check the real app/website myself…",
  },
};
