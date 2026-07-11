import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson1: AILessonConfig = {
  id: "cs-1",
  title: "1. What Is Cybersecurity?",
  goal: "Define cybersecurity, explain how it protects the CIA of data, systems, and people, explore high-level cyber careers, and understand why ethics and authorized use matter for high school students.",
  xpReward: 50,
  badge: "Cyber Rookie",
  dashboardHref: "/dashboard",
  nextHref: "/learn/cyber/2",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-1.png",
        imageAlt: "Student desk with laptop showing a cybersecurity overview dashboard, shield icon, and notebook titled Ethics",
        body: `Your school account, your phone photos, your group's shared docs — all of that is information someone might want to steal, change, or lock away. **Cybersecurity** is the practice of protecting that information, the systems that hold it, and the people who use it.\n\nHere's our roadmap:\n\n• **What cybersecurity means** — protecting data, systems, and people.\n• **The CIA Triad** — Confidentiality, Integrity, and Availability at a high level.\n• **Careers in cyber** — analyst, SOC, and ethical roles (big picture only).\n• **Ethics and authorized use** — why "just because you can" is never enough.\n• **Why you should care now** — as a student, friend, and future professional.\n\nNo experience needed. Every new word gets explained the moment it shows up. This track stays **defensive and educational** — we learn how defenders think, not how to break things.`,
        callout: {
          label: "Why it matters",
          text: "Almost every job, scholarship, and college workflow now touches accounts and online systems. Knowing the basics of cybersecurity helps you protect yourself — and helps you spot when something feels off.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `Before we dive in, here are the core words for this lesson — explained simply.\n\n• **Cybersecurity** is the practice of protecting digital information, devices, networks, and the people who use them from harm.\n• **Data** is information stored or moved digitally — passwords, essays, photos, grades, messages.\n• A **system** is a device or collection of devices and software that work together (a laptop, a school network, a cloud account).\n• A **threat** is anything that could cause harm to data, systems, or people — from a scam email to a stolen phone.\n• A **defender** is anyone whose job (or habit) is to protect those things — that includes professionals and you.\n\nKeep these in mind. The rest of the lesson builds on them.`,
        callout: {
          label: "Pro tip",
          text: "When a cyber word feels fancy, swap in the plain meaning. \"Protect the system\" often just means \"keep the device, account, or network safe and working as intended.\"",
        },
      },
      {
        id: "definition",
        kicker: "The big idea",
        title: "Cybersecurity protects data, systems, and people",
        body: `**Cybersecurity** is not just "antivirus software" or "IT people locking doors." It is a whole set of habits, tools, policies, and skills aimed at keeping digital life safe and trustworthy.\n\nThink of three layers defenders care about:\n\n• **Data** — the information itself (your grades, a company customer list, medical records).\n• **Systems** — the devices, apps, and networks that store and move that data.\n• **People** — the humans who use those systems, who can be tricked, rushed, or targeted.\n\nIf you only lock down machines and ignore people, you miss a huge part of the job. If you only warn people and leave systems wide open, you miss another part. Real cybersecurity blends all three.\n\nA simple analogy: a school building has locks on doors (**systems**), student records in locked cabinets (**data**), and staff who know not to hand keys to strangers (**people**). Cybersecurity is the digital version of that whole picture.`,
        bullets: [
          "**Data** = the information you want to keep safe.",
          "**Systems** = devices, apps, and networks that handle that data.",
          "**People** = users who can help protect — or accidentally put things at risk.",
        ],
        callout: {
          label: "Watch out",
          text: "Cybersecurity is not about being paranoid all day. It is about building habits and controls that make safe choices the easy default — like locking your phone and verifying unexpected requests.",
        },
      },
      {
        id: "cia-preview",
        kicker: "A defender's checklist",
        title: "The CIA Triad (first look)",
        body: `Professionals often summarize what "safe" means with three goals called the **CIA Triad**:\n\n• **Confidentiality** — only the right people can see the information. (Keep secrets secret.)\n• **Integrity** — information stays accurate and unaltered by unauthorized changes. (Don't let anyone quietly rewrite the truth.)\n• **Availability** — systems and data are there when authorized people need them. (A locked vault that never opens is not useful.)\n\nYou'll dig deeper into CIA in the next lesson. For now, notice that cybersecurity is not only "hide everything." Sometimes the failure is that a system is down during finals, or a grade file was changed without permission.\n\nAsk yourself about any situation: Is the data private enough? Is it trustworthy? Can people still get to what they need?`,
        callout: {
          label: "Why it matters",
          text: "CIA gives you a shared language. When something goes wrong, you can name which goal was hit — privacy leak, tampered file, or outage — instead of just saying \"hacked.\"",
        },
      },
      {
        id: "careers",
        kicker: "Who does this work?",
        title: "Cyber careers at a high level",
        image: "/images/lessons/cs-1-2.png",
        imageAlt: "Split scene: SOC analyst at monitors beside a school IT help desk helping a student with an account lock",
        body: `Cybersecurity is a field with many roles. You do not need to pick one today — just know the landscape exists and that skills from this class transfer.\n\n• A **security analyst** looks for signs that something is wrong, investigates alerts, and helps fix weaknesses before they become bigger problems.\n• A **SOC** (Security Operations Center) is a team — often working in shifts — that watches for suspicious activity across an organization's systems and responds when something looks off.\n• **Ethical / authorized roles** (sometimes called ethical hacking or penetration testing in industry) involve testing defenses **only with clear written permission** from the system owner, then reporting findings so defenders can improve.\n\nOther paths include writing security policy, teaching users safe habits, building safer software, and responding after an incident. What they share: a defender mindset and a commitment to **authorized use only**.\n\nHigh school is a great time to explore clubs, Cyber.org-style courses, CompTIA fundamentals topics, and ethical capture-the-flag events that stay inside the rules.`,
        callout: {
          label: "Watch out",
          text: "\"Ethical\" is not a feeling — it is permission. Testing a system without authorization can be illegal even if you \"meant well\" or only wanted to learn. Stay in approved labs and contests.",
        },
      },
      {
        id: "ethics",
        kicker: "Ground rules",
        title: "Ethics: authorized use only",
        image: "/images/lessons/cs-1-3.png",
        imageAlt: "Permission checklist on a clipboard next to a laptop; red stamp Unauthorized vs green Authorized testing",
        body: `Curiosity is good. Breaking into accounts \"to see if I can,\" scanning school networks without permission, or sharing someone's login is not.\n\nCore ethics for this class:\n\n• **Only use systems and data you are allowed to use.** Permission must be clear — school accounts for school work, personal accounts for you, lab environments for practice.\n• **Do not try to access, change, or disrupt** someone else's device, account, or network without authorization.\n• **Respect privacy.** Reading another student's messages or grades without permission is a privacy failure, even if no malware was involved.\n• **Report, don't exploit.** If you notice a weakness, tell a trusted adult or the right school/IT contact — don't demonstrate it by causing harm.\n\nThink of it like a chemistry lab: you learn about reactions in controlled, supervised settings. You don't mix random chemicals in the cafeteria \"for science.\"`,
        bullets: [
          "Permission first — always.",
          "Curiosity belongs in labs, clubs, and authorized challenges.",
          "Finding a problem → report it responsibly.",
          "\"I was just testing\" is not a defense without authorization.",
        ],
        callout: {
          label: "Pro tip",
          text: "If you are unsure whether something is allowed, stop and ask. In cybersecurity, \"ask first\" is a professional skill, not a weakness.",
        },
      },
      {
        id: "why-care",
        kicker: "Make it personal",
        title: "Why high school students should care",
        body: `Cybersecurity is not only for adults in office buildings. You already live in the threat landscape:\n\n• **Accounts** — school email, college portals, gaming, social apps, banking apps for older teens.\n• **Reputation and safety** — accounts taken over can be used to scam your friends or post as you.\n• **Future opportunities** — scholarships, applications, and first jobs all depend on accounts you can still access and trust.\n• **Community** — one weak shared password on a group project folder can put everyone's work at risk.\n\nYou do not need to become a full-time analyst to benefit. Learning defender habits — strong authentication, spotting scams, updating devices, thinking before you click — makes you harder to fool and more valuable on any team.\n\nThis lesson is your starting badge: **Cyber Rookie**. Next, you'll go deeper on CIA and authentication — the twin ideas behind almost every login screen you see.`,
        callout: {
          label: "Try this week",
          text: "List three accounts you use for school or life. For each one, ask: Who else could get hurt if this account were taken over? That question is a cybersecurity mindset.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Cybersecurity** protects **data**, **systems**, and **people**.\n• Defenders aim for **Confidentiality**, **Integrity**, and **Availability** (the CIA Triad).\n• Careers include **analysts**, **SOC** teams, and **ethical/authorized** testing roles — always with permission.\n• **Authorized use only** is the ethical line; curiosity belongs in approved spaces.\n• High school students already depend on digital accounts — these skills matter now.\n\nWhen you're ready, switch to the **Knowledge check**, then write a short reflection about why cybersecurity matters in your life.`,
      },
    ],
  },
  bigIdeas: [
    "**Cybersecurity** protects digital **data**, **systems**, and **people** — not just \"computers.\"",
    "The **CIA Triad** (Confidentiality, Integrity, Availability) names what \"secure\" means in practice.",
    "Cyber work requires **ethics** and **authorized use only**; curiosity without permission can cause real harm.",
  ],
  keyTerms: [
    { term: "Cybersecurity", definition: "The practice of protecting digital data, systems, and people from harm." },
    { term: "Data", definition: "Information stored or moved digitally, such as files, messages, and account details." },
    { term: "System", definition: "A device or group of devices and software that work together to store or process data." },
    { term: "CIA Triad", definition: "Confidentiality, Integrity, and Availability — three core security goals." },
    { term: "Threat", definition: "Anything that could harm data, systems, or people — from scams to malware to stolen devices." },
    { term: "Security Analyst", definition: "A professional who monitors for problems, investigates alerts, and helps strengthen defenses." },
    { term: "SOC", definition: "Security Operations Center — a team that watches for suspicious activity and responds to incidents." },
    { term: "Authorized Use", definition: "Using systems and data only with clear permission from the owner or organization." },
  ],
  realWorld:
    "When a school requires a login for grades, or a hospital protects patient records, they are practicing cybersecurity: keep the right data private (**confidentiality**), accurate (**integrity**), and reachable for staff who need it (**availability**).",
  quiz: [
    {
      id: "q1",
      question: "Which statement best defines cybersecurity?",
      choices: [
        "Only installing antivirus on a laptop",
        "Protecting digital data, systems, and people from harm",
        "Memorizing every type of malware name",
        "Building websites as quickly as possible",
      ],
      correctIndex: 1,
      explanation:
        "Cybersecurity is broader than one tool. It is the practice of protecting data, systems, and the people who use them.",
    },
    {
      id: "q2",
      question: "In the CIA Triad, what does Integrity mainly mean?",
      choices: [
        "Systems are always online for everyone, including strangers",
        "Only authorized people can see the information",
        "Information stays accurate and is not changed without authorization",
        "Passwords must be shared with the whole team",
      ],
      correctIndex: 2,
      explanation:
        "Integrity is about trustworthiness of data — it should not be altered by unauthorized people. Confidentiality is about who can see it; Availability is about access when needed.",
    },
    {
      id: "q3",
      question: "A student finds a possible weakness in a school website. What is the most ethical next step?",
      choices: [
        "Try to break in further to prove the weakness",
        "Post the weakness publicly to \"help\" others",
        "Report it to a trusted adult or the school's IT/security contact",
        "Ignore it because ethics only apply to adults",
      ],
      correctIndex: 2,
      explanation:
        "Responsible reporting with authorization in mind is the ethical path. Exploring further or publishing details without permission can cause harm and may be illegal.",
    },
    {
      id: "q4",
      question: "What does a SOC (Security Operations Center) typically do?",
      choices: [
        "Design school lunch menus",
        "Watch for suspicious activity and help respond when something looks wrong",
        "Sell personal data to advertisers",
        "Replace the need for passwords entirely",
      ],
      correctIndex: 1,
      explanation:
        "A SOC is a team that monitors systems for signs of trouble and supports incident response — a defender role.",
    },
    {
      id: "q5",
      question: "Why should high school students care about cybersecurity?",
      choices: [
        "They never use online accounts, so they don't",
        "Only college graduates face digital threats",
        "Their accounts, schoolwork, reputation, and future applications already depend on digital systems",
        "Cybersecurity is only about criminal careers",
      ],
      correctIndex: 2,
      explanation:
        "Students already rely on accounts and online systems for school and life. Defender habits protect them now and build career-ready awareness.",
    },
  ],
  reflection: {
    prompt:
      "Name one account or device you use for school. Which part of cybersecurity matters most there — protecting the data, the system, or the people who use it — and why?",
    placeholder: "Example: My school email matters because if someone else got in, they could message teachers as me…",
  },
};
