import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson4: AILessonConfig = {
  id: "cs-4",
  title: "4. Social Engineering & Phishing",
  goal: "Define social engineering; distinguish phishing, smishing, vishing, and pretexting; spot red flags; verify requests safely; and practice report-don't-click habits.",
  xpReward: 200,
  badge: "Phish Defender",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/3",
  nextHref: "/learn/cyber/5",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-4.png",
        imageAlt: "Phone showing a phishing text beside a laptop with a fake urgent school email",
        body: `The strongest lock fails if someone tricks you into opening the door. **Social engineering** is manipulation that targets people — not just software bugs.\n\nHere's our roadmap:\n\n• **Social engineering** defined in plain English.\n• **Phishing, smishing, vishing, pretexting** — same idea, different channels.\n• **Red flags** — urgency, fear, prizes, weird links, odd sender details.\n• **Verify, then act** — how to check without clicking the trap.\n• **Report, don't click** — the habit that protects you and your community.\n\nWe'll stay on the defender side: recognizing and reporting. No playbooks for running scams.`,
        callout: {
          label: "Why it matters",
          text: "A huge share of real-world account takeovers and malware infections start with a convincing message — not a Hollywood \"hacker typing in the dark.\"",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "Social engineering terms",
        body: `• **Social engineering** — tricking people into giving information, access, or actions that weaken security.\n• **Phishing** — fraudulent messages (usually email) that impersonate trusted groups to steal credentials or deliver harm.\n• **Smishing** — phishing via SMS / text messages.\n• **Vishing** — phishing via voice calls.\n• **Pretexting** — inventing a fake scenario (a \"pretext\") to gain trust — \"I'm from IT and need your password to fix your account.\"\n• **Spoofing** (concept) — faking a sender identity so a message looks more legitimate than it is.\n\nDifferent channels, same goal: make you trust and comply before you think.`,
        callout: {
          label: "Pro tip",
          text: "When you hear \"phish,\" think \"bait.\" Something attractive or scary is dangled so you'll bite — a prize, a threat, a fake deadline.",
        },
      },
      {
        id: "se-defined",
        kicker: "The big idea",
        title: "Social engineering attacks the human",
        body: `**Social engineering** works because humans are helpful, busy, curious, and sometimes scared. Attackers exploit those normal traits.\n\nClassic pressure tactics (conceptual):\n• **Urgency** — \"Act in 10 minutes or your account closes.\"\n• **Fear** — \"Unusual login — confirm your password now.\"\n• **Greed / reward** — \"You won a gift card — click to claim.\"\n• **Authority** — pretending to be a teacher, boss, bank, or IT staff.\n• **Helpfulness** — \"Can you check this file for me?\" from a compromised friend account.\n\nUnlike malware that sneaks onto a disk, social engineering often succeeds when **you** voluntarily type a password, approve an MFA prompt, send a code, or open a file.\n\nThat's why cybersecurity training always includes people skills — spotting manipulation is a technical defense.`,
        callout: {
          label: "Watch out",
          text: "Attackers increasingly compromise a real classmate's account and then message *you*. A familiar name is not proof the request is safe — verify odd asks.",
        },
      },
      {
        id: "channels",
        kicker: "Same scam, different inbox",
        title: "Phishing, smishing, vishing, pretexting",
        image: "/images/lessons/cs-4-2.png",
        imageAlt: "Three channels labeled email phishing, SMS smishing, and phone vishing on sticky notes",
        body: `Learn the channel names so you can describe what happened clearly:\n\n• **Phishing (email)** — fake \"school IT,\" shipping, bank, or scholarship emails with links to lookalike login pages or risky attachments.\n• **Smishing (SMS)** — texts about package delivery, \"school alerts,\" or account freezes with short links.\n• **Vishing (voice)** — phone calls where someone claims to be support and pushes you to share codes or remote-access permission.\n• **Pretexting** — the storyline used across channels: a made-up reason that makes the ask seem reasonable.\n\nRelated ideas you may hear:\n• **Spear phishing** — targeted at a specific person using personal details.\n• **Business Email Compromise (concept)** — attackers impersonate leaders to push urgent money or gift-card requests (more common in workplaces, but the urgency pattern shows up in student orgs too).\n\nYou don't need to memorize every marketing name. You need the pattern: **unexpected request + pressure + ask for secrets or clicks.**`,
        bullets: [
          "**Phishing** → email bait.",
          "**Smishing** → text bait.",
          "**Vishing** → call bait.",
          "**Pretexting** → fake story to gain trust.",
        ],
        callout: {
          label: "Why it matters",
          text: "Naming the channel helps you warn others accurately: \"I got a smishing text about my package\" is clearer than \"I got hacked.\"",
        },
      },
      {
        id: "red-flags",
        kicker: "Spot the bait",
        title: "Red flags to notice",
        body: `No single flag is proof, but combinations are loud alarms:\n\n• **Unexpected** messages about accounts, money, grades, or deliveries.\n• **Urgent deadlines** designed to stop you from thinking.\n• **Asks for passwords, MFA codes, remote access, or gift cards.** Real IT almost never needs your password.\n• **Grammar oddities** or awkward branding (not always present — some scams look polished).\n• **Mismatched links** — the text says one site, but the real destination looks different (on devices, preview carefully; when unsure, don't click).\n• **Slightly wrong domains** — extra letters, weird endings, or lookalike names.\n• **\"Confirm your identity\"** links after a threat.\n• **Requests to keep it secret** — \"Don't tell your teacher/parents.\"\n\nEmotion + secrecy + credential request is a triple red flag.`,
        callout: {
          label: "Common misconception",
          text: "\"I'd never fall for that.\" Skilled phishing is designed for busy moments — right before a game, during finals, or when you're expecting a real package. Humility is a defense.",
        },
      },
      {
        id: "verify-report",
        kicker: "Defender response",
        title: "Verify safely — report, don't click",
        image: "/images/lessons/cs-4-3.png",
        imageAlt: "Student verifying a link by calling IT on a known number instead of clicking",
        body: `When something feels off, use this defender sequence:\n\n**1. Pause.** Urgency is often the weapon. Take a breath.\n**2. Don't click the link in the message** if you can avoid it. Don't open unexpected attachments.\n**3. Verify through a channel you trust.** Open the official app/site yourself (not from the message), call a known published number, or ask the person face-to-face / through a known good contact method.\n**4. Never share passwords or one-time codes** with someone who messaged you first.\n**5. Report.** Use your school's report button, mark as phishing if available, tell a parent/teacher/IT, and warn teammates if a shared account was targeted.\n**6. If you already clicked or entered a password** — don't panic-hide it. Change the password from a safe device, enable MFA, check recovery email/phone, and tell a trusted adult promptly.\n\n\"Report, don't click\" protects more than you. One report can stop a campaign from hitting your whole school.`,
        bullets: [
          "Pause — don't let urgency drive you.",
          "Avoid links/attachments in suspicious messages.",
          "Verify via official apps/sites or known contacts.",
          "Never hand over passwords or MFA codes to inbound requesters.",
          "Report suspected phishing quickly.",
        ],
        callout: {
          label: "Try this week",
          text: "Practice once: open your email or texts and identify one message that *could* be phishing bait even if it might be legitimate. What red flags appear? How would you verify without clicking?",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Social engineering** manipulates people into unsafe actions.\n• **Phishing / smishing / vishing** are channel-specific baits; **pretexting** is the fake story.\n• Red flags: urgency, fear, prizes, credential asks, odd links/domains.\n• Defender habit: **verify** through trusted channels and **report, don't click**.\n\nWhen you're ready, complete the **Knowledge check**, then reflect on a message that almost fooled you — or could have.`,
      },
    ],
  },
  bigIdeas: [
    "**Social engineering** targets human trust and emotion, not just software flaws.",
    "**Phishing, smishing, and vishing** are the same idea on email, text, and phone; **pretexting** invents a story to gain trust.",
    "Safe response: **pause, don't click, verify another way, never share codes/passwords, and report.**",
  ],
  keyTerms: [
    { term: "Social Engineering", definition: "Manipulating people into giving information, access, or actions that weaken security." },
    { term: "Phishing", definition: "Fraudulent messages, often email, impersonating trusted sources to steal credentials or cause harm." },
    { term: "Smishing", definition: "Phishing delivered through SMS or text messages." },
    { term: "Vishing", definition: "Phishing delivered through voice phone calls." },
    { term: "Pretexting", definition: "Using a made-up scenario to gain a victim's trust and compliance." },
    { term: "Spear Phishing", definition: "Phishing targeted at a specific person using personal details." },
    { term: "Spoofing", definition: "Faking a sender identity so a message appears more trustworthy." },
    { term: "Report-Don't-Click", definition: "A defender habit: avoid interacting with suspicious bait and report it through proper channels." },
  ],
  realWorld:
    "A text saying \"Your package is held — pay a small fee\" with a short link is classic **smishing**. A defender opens the shipper's official app separately (or ignores if no package is expected) instead of tapping the link.",
  quiz: [
    {
      id: "q1",
      question: "What is social engineering?",
      choices: [
        "Building social media apps",
        "Manipulating people into unsafe disclosures or actions",
        "Configuring firewalls only",
        "A type of hardware cable",
      ],
      correctIndex: 1,
      explanation:
        "Social engineering tricks humans — the goal is information, access, or actions that bypass technical controls.",
    },
    {
      id: "q2",
      question: "A fake bank call asking you to read your one-time login code is best described as:",
      choices: [
        "Smishing",
        "Vishing",
        "A worm",
        "A patch",
      ],
      correctIndex: 1,
      explanation:
        "Voice-call phishing is called vishing. (Smishing would be text; a worm is malware.)",
    },
    {
      id: "q3",
      question: "Which ask is a major red flag in a surprise \"IT support\" message?",
      choices: [
        "A reminder that password changes are available in the official portal",
        "A request for your password or MFA code in the chat/email",
        "A link to the school's publicly known homepage that you navigate to yourself",
        "Office hours for the help desk",
      ],
      correctIndex: 1,
      explanation:
        "Legitimate support almost never needs you to send your password or one-time codes to an inbound message.",
    },
    {
      id: "q4",
      question: "What is the best first move when you get an urgent email with a login link you weren't expecting?",
      choices: [
        "Click quickly before the deadline in the email",
        "Reply with your password so they can \"verify\" you",
        "Pause and verify through an official app/site or known contact — don't use the email's link",
        "Forward the email with the link to all your friends to vote on it",
      ],
      correctIndex: 2,
      explanation:
        "Pause and verify independently. Using the message's link can take you to a lookalike page designed to steal credentials.",
    },
    {
      id: "q5",
      question: "Why is \"report, don't click\" useful beyond protecting just you?",
      choices: [
        "It isn't — reporting never helps anyone else",
        "Reports can help IT block campaigns before more people are hit",
        "It automatically pays ransomware",
        "It replaces the need for passwords",
      ],
      correctIndex: 1,
      explanation:
        "Reporting gives defenders visibility so they can warn others and block malicious messages organization-wide.",
    },
  ],
  reflection: {
    prompt:
      "Describe a phishing, smishing, or vishing attempt you've seen (or invent a realistic school-life example). List two red flags and how you would verify without clicking.",
    placeholder: "Example: A text said my school account would delete in 1 hour… Red flags were urgency and a weird link. I'd open the school portal myself and tell IT…",
  },
};
