import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson13: AILessonConfig = {
  id: "cs-13",
  title: "13. Common Attacks (Defender View)",
  goal: "Recognize common attack patterns at a conceptual level — DoS/DDoS, spoofing, MITM awareness, and injection as tricking software with bad input — and focus on defenses, not offense.",
  xpReward: 650,
  badge: "Attack Analyst",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/12",
  nextHref: "/learn/cyber/14",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Defenders study attacks the way firefighters study fire: to **recognize**, **reduce risk**, and **respond** — not to start fires. Today you'll learn common attack *patterns* at awareness level only.\n\nHere's our roadmap:\n\n• How to think like a **defender-analyst** (patterns, impact, controls).\n• **DoS / DDoS** — overwhelming availability.\n• **Spoofing** — faking identity.\n• **MITM awareness** — hostile middle positions (concepts only).\n• **Injection (concept)** — tricking software with unexpected input — without exploit recipes.\n• **Defense map** — what to do about each family.\n\nIf a detail would help someone attack a system, we skip it. Your job is protection.`,
        callout: {
          label: "Why it matters",
          text: "You can't prioritize defenses if every headline sounds the same. Pattern recognition helps you choose MFA, patching, input validation, and monitoring wisely.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Attack-pattern words (defender lens)",
        body: `• **Attack pattern** — a repeatable *category* of harmful technique (not a how-to).\n• **DoS (Denial of Service)** — making a system unavailable to legitimate users.\n• **DDoS** — a DoS launched from many sources at once.\n• **Spoofing** — pretending to be someone or something else.\n• **MITM** — positioning between parties to intercept or alter communications.\n• **Injection (concept)** — abusing software by feeding it input it treats as instructions or harmful data.\n• **Availability** — systems and data reachable when needed (the \"A\" in CIA).\n\nWe'll stay conceptual: what it breaks, how you'd notice, how you'd defend.`,
        callout: {
          label: "Ethics reminder",
          text: "Using these ideas to harm systems you don't own/authorize is illegal and against this course. Knowledge here is for defense and responsible reporting only.",
        },
      },
      {
        id: "defender-lens",
        kicker: "The big idea",
        title: "For every attack pattern, ask three questions",
        body: `When you hear about an attack type, run this defender checklist:\n\n**1. What CIA goal is threatened?** Confidentiality, integrity, availability — or all three?\n**2. What would we notice?** Alerts, user reports, odd logs, downtime, unexpected posts?\n**3. What controls help?** Prevention, detection, corrective steps?\n\nThis keeps you in analyst mode. You don't need exploit details to choose good defenses.`,
        bullets: [
          "Name the impact (CIA) before the buzzword.",
          "Pair every pattern with at least one control.",
          "Escalate real incidents — don't \"test\" attacks on live systems.",
        ],
        callout: {
          label: "Pro tip",
          text: "If a tutorial online offers step-by-step attack commands, close it. That's not this class — and it's a fast way to get into serious trouble.",
        },
      },
      {
        id: "dos-ddos",
        kicker: "Availability attacks",
        title: "DoS / DDoS: knocking the service offline",
        body: `**Denial of Service (DoS)** aims to overwhelm a system so real users can't get through — flooding a club website ticket form, flooding a game server, exhausting resources until everything crawls.\n\n**DDoS** is the same idea at larger scale: many systems sending traffic so the target can't cope.\n\n**Defender focus:**\n\n• Know who hosts your site/service and how to contact them during outages.\n• Use reputable hosting/protections when public services matter.\n• Monitor for sudden traffic spikes and have a communication plan for users (\"we're aware of downtime\").\n• Don't confuse a DoS with \"the Wi-Fi is bad\" — check whether the *service* is down for everyone.\n\nWe won't discuss how to launch floods. Availability defense is about resilience and response partnerships.`,
        callout: {
          label: "Defender view",
          text: "For most student clubs, the practical defense is good hosting defaults, rate limits where available, and a clear escalation path to IT/hosting support.",
        },
      },
      {
        id: "spoofing-mitm",
        kicker: "Fake identity & middle position",
        title: "Spoofing and MITM — trust and channels under attack",
        body: `**Spoofing** means faking identity: a lookalike email address, a fake caller ID, a cloned site name, a forged \"From\" line. The goal is to make you trust the wrong party.\n\n**MITM (awareness level)** means an attacker tries to sit in the middle of a conversation or connection — especially risky on untrusted networks — hoping to read or alter data. HTTPS and certificate warnings exist partly to defend against this class of threat.\n\n**Defender focus:**\n\n• Verify unexpected requests out-of-band (call a known number, use official apps).\n• Check URLs and email domains carefully.\n• Prefer HTTPS; heed certificate warnings.\n• Use MFA so a single spoofed login page capture is less fatal.\n\nAgain: recognition and habits — not attack construction.`,
        callout: {
          label: "Watch out",
          text: "Spoofed \"IT support\" messages often create urgency. Slow down. Real IT rarely needs your password in a chat message.",
        },
      },
      {
        id: "injection-concept",
        kicker: "Bad input, bad outcomes",
        title: "Injection as a concept: tricking software with input",
        body: `Many programs take input (forms, search boxes, file names) and process it. **Injection**, as a *concept*, is when crafted input tricks software into doing something the designer didn't intend — treating data like a command, breaking out of a safe context, or smuggling harmful instructions into a system.\n\nYou do **not** need SQL samples, payloads, or exploit walkthroughs to understand the defender job:\n\n• Treat all user input as untrusted.\n• Use frameworks and APIs that separate *data* from *commands* (professionals call this safe parameterization / validation — the names matter less than the idea).\n• Limit what each account can do even if a bug appears (**least privilege**).\n• Keep software patched; many injection flaws are fixed in updates.\n• Log weird input patterns and failures for detection.\n\nIf you build apps later, you'll learn secure coding with teachers in safe lab environments — not by practicing attacks on live systems.`,
        bullets: [
          "Concept: malicious/unexpected input can confuse software.",
          "Defense: validate input, use safe APIs, least privilege, patching.",
          "No exploit examples needed to prioritize those controls.",
        ],
        callout: {
          label: "Ethics & safety",
          text: "Trying injection techniques against websites or school systems without explicit permission is unauthorized access territory — illegal and against academy rules.",
        },
      },
      {
        id: "defense-map",
        kicker: "Put it together",
        title: "A quick defense map for common patterns",
        body: `Match pattern → primary defenses:\n\n• **DoS/DDoS** → resilient hosting, monitoring, escalation to providers, comms plan.\n• **Spoofing** → verify identity out-of-band, URL/domain checks, phishing awareness, MFA.\n• **MITM risk** → HTTPS, avoid sensitive logins on hostile networks, respect cert warnings.\n• **Injection class bugs** → secure development practices, patching, least privilege, input handled safely by design.\n• **Across the board** → logging/monitoring + IR basics from Lesson 12.\n\nYou're building an analyst's cheat sheet — impact, signals, controls.`,
        callout: {
          label: "Try this week",
          text: "Pick one news headline about a cyber incident. Name the attack pattern family (if clear) and one defensive control that might have helped.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• Study attacks as **patterns** for defense — never as recipes.\n• **DoS/DDoS** hits availability; **spoofing** fakes identity; **MITM** threatens the channel; **injection** abuses untrusted input.\n• For each: know impact, signals, and controls.\n• Stay ethical: authorized learning environments only.\n\nComplete the **Knowledge check**, then reflect on which pattern you'd watch for in a school club system.`,
      },
    ],
  },
  bigIdeas: [
    "Defenders learn attack **patterns** to recognize impact and choose controls — not to offend.",
    "**DoS/DDoS** targets availability; **spoofing** fakes identity; **MITM** threatens the path between parties.",
    "**Injection** (conceptually) is tricking software with unsafe input — defended by safe design, patching, and least privilege, not by practicing exploits.",
  ],
  keyTerms: [
    { term: "DoS", definition: "Denial of Service — making a system unavailable to legitimate users." },
    { term: "DDoS", definition: "Distributed Denial of Service — a DoS involving many sources." },
    { term: "Spoofing", definition: "Faking identity to gain trust or mislead a target." },
    { term: "MITM", definition: "Man-in-the-middle — secretly sitting between communicating parties." },
    { term: "Injection (concept)", definition: "Abusing software by supplying input that is mishandled as harmful instructions or data." },
    { term: "Attack surface", definition: "The set of places an attacker might try to abuse." },
    { term: "Availability", definition: "Ensuring systems and data remain usable when needed." },
  ],
  realWorld:
    "A student government ticket site goes down during election week after a huge traffic flood (**DDoS** pattern). Defenders focus on hosting protections and communications — not on learning how to run floods themselves.",
  quiz: [
    {
      id: "q1",
      question: "What is the primary impact of a DoS/DDoS attack?",
      choices: [
        "It permanently encrypts files for ransom by definition",
        "It harms availability so legitimate users can't use the service",
        "It always steals passwords silently without downtime",
        "It only affects printed posters",
      ],
      correctIndex: 1,
      explanation:
        "DoS/DDoS aims to overwhelm or block service so real users can't get through — an availability attack.",
    },
    {
      id: "q2",
      question: "Which example best matches spoofing from a defender's view?",
      choices: [
        "A lookalike email address pretending to be the school IT desk",
        "Installing official OS updates",
        "Turning on MFA",
        "Writing a lessons-learned report",
      ],
      correctIndex: 0,
      explanation:
        "Spoofing fakes identity. A lookalike IT email is a classic example defenders train people to spot.",
    },
    {
      id: "q3",
      question: "Why does this course discuss MITM only at awareness level?",
      choices: [
        "Because MITM is not related to HTTPS",
        "So students understand the risk and defenses without learning offensive techniques",
        "Because browsers never warn about certificates",
        "Because MITM only happens in movies",
      ],
      correctIndex: 1,
      explanation:
        "Awareness helps you use HTTPS, heed warnings, and choose safer networks — without teaching attacks.",
    },
    {
      id: "q4",
      question: "Which statement about injection is appropriate for this class?",
      choices: [
        "Here is a detailed SQL exploit students should try on live sites",
        "Injection is the idea of tricking software with unsafe input; defenders focus on safe handling, patching, and least privilege",
        "Injection only affects paper forms",
        "Injection means encrypting a hard drive",
      ],
      correctIndex: 1,
      explanation:
        "We stay conceptual and defense-focused. No exploit recipes; emphasize secure design and controls.",
    },
    {
      id: "q5",
      question: "What should a defender do first when studying a new attack headline?",
      choices: [
        "Search for step-by-step attack tools to recreate it at school",
        "Identify the pattern, CIA impact, and which controls would help",
        "Ignore it because only experts need patterns",
        "Disable all logging so alerts stop",
      ],
      correctIndex: 1,
      explanation:
        "Analyst mode: pattern → impact → controls. Never \"practice\" attacks on systems without authorization.",
    },
  ],
  reflection: {
    prompt:
      "Choose one pattern (DoS/DDoS, spoofing, MITM awareness, or injection-as-concept). For a school club website or shared account, what impact would it have and what is one defensive control you'd prioritize?",
    placeholder: "Example: Spoofing — fake \"treasurer\" emails… I'd verify payment requests out-of-band and require MFA on the club email…",
  },
};
