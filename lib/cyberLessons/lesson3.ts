import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson3: AILessonConfig = {
  id: "cs-3",
  title: "3. Malware & the Threat Landscape",
  goal: "Recognize common malware categories conceptually, understand high-level threat-actor motivations, explain how malware often spreads at a defender level, and list safe habits that reduce risk.",
  xpReward: 150,
  badge: "Threat Spotter",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/2",
  nextHref: "/learn/cyber/4",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-3.png",
        imageAlt: "Laptop warning dialog about suspicious download next to USB drive and email attachment icons",
        body: `**Malware** is short for *malicious software* — programs designed to harm devices, steal data, spy, or disrupt. You do not need to know how to build it. You need to recognize categories and respond like a defender.\n\nHere's our roadmap:\n\n• **Malware types** — virus, worm, trojan, ransomware, spyware, adware (concepts).\n• **Threat actors** — who causes harm and why (high level).\n• **How malware spreads** — common paths, explained for defenders.\n• **Defender habits** — updates, caution with unknown files, and reporting.\n\nThis lesson stays educational and defensive. We talk about what malware *does* and how to *reduce risk* — not how to create or launch attacks.`,
        callout: {
          label: "Why it matters",
          text: "Knowing the category helps you communicate clearly: \"I think this might be ransomware\" tells support something different than \"my browser keeps popping up ads.\"",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "Threat landscape vocabulary",
        body: `• **Malware** — software written to cause harm or unwanted effects on purpose.\n• **Threat landscape** — the overall picture of risks, attackers, and techniques defenders worry about right now.\n• **Threat actor** — a person or group that poses a cyber threat (from scam operators to nation-state teams).\n• **Payload** — what the malware is meant to do once it runs (steal, encrypt, spy, annoy).\n• **Update / patch** — a fix from a software maker that closes known weaknesses.\n\nYou won't need exploit details — just the labels defenders use when they talk about risk.`,
        callout: {
          label: "Pro tip",
          text: "If news headlines confuse you, ask: What was the goal — steal data, lock files for money, spy, or just disrupt? That goal often maps to a malware category.",
        },
      },
      {
        id: "malware-types",
        kicker: "Know the categories",
        title: "Virus, worm, trojan, ransomware, spyware, adware",
        image: "/images/lessons/cs-3-2.png",
        imageAlt: "Clean educational cards naming ransomware, spyware, trojan, and worm without scary gore",
        body: `These names get used loosely in everyday speech. Here's the classroom version — conceptual, not a how-to:\n\n• **Virus** — malware that typically needs a host file or program and user action to help it spread to other files.\n• **Worm** — malware known for spreading across networks more on its own, often without someone opening each new copy.\n• **Trojan** — malware that *disguises* itself as something useful or interesting so a person is tricked into running it. Named after the Trojan Horse story.\n• **Ransomware** — malware that blocks access to files or systems (often by locking them) and demands payment to restore access. Paying is risky and not a guarantee — defenders focus on backups and prevention.\n• **Spyware** — malware designed to watch what you do and steal information (keystrokes, browsing, credentials) secretly.\n• **Adware** — unwanted software that floods you with ads; sometimes bundled with other junk and may track you. Annoying, and it can be a warning sign of a messy, risky install.\n\nReal incidents can blend categories. A trojan might deliver ransomware. Defenders care about **impact** and **response**, not perfect taxonomy debates.`,
        bullets: [
          "**Trojan** → tricks you into running it.",
          "**Worm** → spreads across networks more autonomously.",
          "**Ransomware** → locks you out and demands payment.",
          "**Spyware** → secretly steals information.",
          "**Adware** → aggressive ads / unwanted installs.",
        ],
        callout: {
          label: "Watch out",
          text: "Never download \"cracked\" games, fake update pop-ups, or mystery attachments to \"test\" malware. Learning belongs in supervised labs with safe samples — not on your school laptop.",
        },
      },
      {
        id: "actors",
        kicker: "Who and why",
        title: "Threat actors and motivations (high level)",
        body: `Not every threat looks the same because not every actor wants the same outcome:\n\n• **Criminals seeking money** — scams, ransomware, stealing accounts to sell or abuse.\n• **Scammers / social engineers** — trick people (often without fancy malware).\n• **Insiders** — someone who already has some access and misuses it (accidentally or on purpose).\n• **Hacktivists** — motivated by a cause or protest (still unauthorized and often illegal).\n• **Nation-state / advanced groups** — higher resources, often espionage or disruption (you mainly see these in news about large organizations).\n• **Script kiddies** — less-skilled people using tools others made — still capable of harm, still unauthorized.\n\nMotivations drive what you might observe: money goals often mean ransomware or account theft; spying means stealthy spyware; disruption means outages.\n\nFor high school defenders, the practical point is simple: **assume someone out there wants access to accounts and devices**, and build habits accordingly — without needing to profile every actor on earth.`,
        callout: {
          label: "Why it matters",
          text: "Understanding motivation helps prioritize. Protecting a personal gaming account and protecting a hospital network both matter, but organizations with valuable data attract different levels of attention.",
        },
      },
      {
        id: "spread",
        kicker: "How it shows up",
        title: "How malware spreads — defender view",
        body: `At a high level, malware needs a way onto a device and a way to run. Common conceptual paths defenders watch for:\n\n• **Risky downloads and fake apps** — software that isn't what it claims to be (trojan pattern).\n• **Email / message attachments and links** — especially unexpected ones (often tied to phishing, next lesson).\n• **Removable media** — unknown USB drives from untrusted sources.\n• **Unpatched software** — old apps/OS versions with known weaknesses that worms and other malware abuse *after* vendors have published fixes.\n• **Bundled junk installers** — \"free\" tools that sneak extra unwanted software.\n\nNotice what's *not* in this lesson: step-by-step exploit instructions. Defenders don't need those to act. They need to recognize risky situations and reduce exposure.\n\nIf a device acts strangely — mass pop-ups, unknown programs, files suddenly inaccessible, browser hijacks — treat it seriously: disconnect from sensitive accounts if needed, and get help from a trusted adult or IT support rather than \"experimenting\" further.`,
        callout: {
          label: "Common misconception",
          text: "\"I have a Mac / Chromebook / phone, so I'm safe.\" No major consumer platform is immune. Risk levels differ, but habits still matter on every device.",
        },
      },
      {
        id: "habits",
        kicker: "Defender playbook",
        title: "Habits that lower malware risk",
        image: "/images/lessons/cs-3-3.png",
        imageAlt: "Student updating a Chromebook with Software Update screen and a closed unknown email attachment",
        body: `You can't eliminate every risk, but you can make success much harder for malware authors:\n\n• **Keep systems updated.** Install OS and app updates — they often include security fixes.\n• **Don't run unknown files.** If you didn't expect an attachment or installer, don't open it. Verify with the sender through another channel.\n• **Stick to trusted sources.** Official app stores and known vendor sites beat random download buttons.\n• **Use strong authentication.** Stolen credentials often matter as much as malware.\n• **Back up important work.** Good backups reduce ransomware panic because you can restore without paying.\n• **Limit admin rights** when possible on shared/family PCs (more in the access-control lesson).\n• **Report early.** Tell a parent, teacher, or IT if something looks infected — faster response limits damage.\n\nThese habits protect **CIA**: they keep spies out (confidentiality), reduce tampering (integrity), and help you recover (availability).`,
        bullets: [
          "Update regularly.",
          "Don't open mystery files or fake \"update\" prompts.",
          "Prefer trusted download sources.",
          "Back up schoolwork and important files.",
          "Report suspected infections instead of ignoring them.",
        ],
        callout: {
          label: "Try this week",
          text: "Check whether your phone and school/home computer have pending updates. Installing them is one of the highest-value defender moves you can make.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Malware** is malicious software; categories include **virus, worm, trojan, ransomware, spyware, adware**.\n• **Threat actors** have different motivations — money, disruption, spying, ideology — which shapes what defenders see.\n• Spread often involves risky downloads, messages, unpatched software, and social tricks.\n• Defender habits: **update**, **don't run unknown files**, trusted sources, backups, and **report**.\n\nNext up: social engineering and phishing — because many malware and account-theft incidents start with tricking a human.\n\nTake the **Knowledge check**, then reflect on one habit you'll strengthen this week.`,
      },
    ],
  },
  bigIdeas: [
    "**Malware** is software designed to harm; different categories cause different impacts (lock, spy, trick, spread).",
    "**Threat actors** are motivated by goals like money or disruption — understanding the goal helps interpret risk.",
    "Defenders reduce risk with **updates**, caution toward **unknown files**, trusted sources, **backups**, and fast reporting.",
  ],
  keyTerms: [
    { term: "Malware", definition: "Malicious software designed to harm devices, steal data, spy, or disrupt." },
    { term: "Trojan", definition: "Malware disguised as something useful so a user is tricked into running it." },
    { term: "Worm", definition: "Malware known for spreading across networks with less need for user action each time." },
    { term: "Ransomware", definition: "Malware that blocks access to files or systems and demands payment for restoration." },
    { term: "Spyware", definition: "Malware that secretly monitors activity and steals information." },
    { term: "Adware", definition: "Unwanted software that pushes ads and may come bundled with risky installs." },
    { term: "Threat Actor", definition: "A person or group that poses a cybersecurity threat." },
    { term: "Patch / Update", definition: "A vendor fix that closes known security weaknesses in software." },
  ],
  realWorld:
    "A fake \"homework helper\" installer that secretly steals saved browser passwords is a **trojan** delivering **spyware**-like harm — prevented more by cautious downloads and updates than by memorizing malware source code.",
  quiz: [
    {
      id: "q1",
      question: "Which malware type is best described as \"disguised as something useful to trick you into running it\"?",
      choices: [
        "Worm",
        "Trojan",
        "Patch",
        "Firewall",
      ],
      correctIndex: 1,
      explanation:
        "A trojan pretends to be desirable software so a person willingly runs it. That social trick is the defining idea at this level.",
    },
    {
      id: "q2",
      question: "Ransomware mainly threatens which CIA goal first for the victim?",
      choices: [
        "Availability — you can't reach your files or systems",
        "Confidentiality only — it always just reads data quietly",
        "Integrity only — it only corrects spelling mistakes",
        "None — ransomware is not a cybersecurity topic",
      ],
      correctIndex: 0,
      explanation:
        "Ransomware typically blocks access, which is an Availability crisis. It may also threaten Confidentiality if data is stolen, but the hallmark is lockout.",
    },
    {
      id: "q3",
      question: "Which defender habit best matches \"close known weaknesses vendors have already fixed\"?",
      choices: [
        "Ignoring updates to avoid change",
        "Installing software updates / patches",
        "Sharing admin passwords with friends",
        "Opening every attachment quickly",
      ],
      correctIndex: 1,
      explanation:
        "Updates and patches apply fixes for known problems — one of the most important everyday defenses.",
    },
    {
      id: "q4",
      question: "Why might criminals use ransomware?",
      choices: [
        "To practice authorized school labs",
        "Often for financial gain by demanding payment",
        "To improve Availability for victims",
        "Because malware is required by law",
      ],
      correctIndex: 1,
      explanation:
        "At a high level, many ransomware operators are motivated by money. That does not mean paying is safe or recommended.",
    },
    {
      id: "q5",
      question: "You receive an unexpected email attachment labeled \"invoice\" from an unknown sender. What is the best defensive response?",
      choices: [
        "Open it immediately to see if it's malware",
        "Forward it to everyone in class as a warning with the file attached",
        "Don't open it; verify through another channel or report it to a trusted adult/IT",
        "Disable all updates so nothing else changes",
      ],
      correctIndex: 2,
      explanation:
        "Defenders avoid running unknown files. Verify unexpectedly or report — don't execute mystery attachments to \"check.\"",
    },
  ],
  reflection: {
    prompt:
      "Which malware category worries you most for your own devices (ransomware, spyware, trojan, etc.), and which one defender habit will you improve this week to reduce that risk?",
    placeholder: "Example: Ransomware worries me because of school files — I'll turn on backups and stop downloading random installers…",
  },
};
