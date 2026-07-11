import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson15: AILessonConfig = {
  id: "cs-15",
  title: "15. Risk Assessment & Controls",
  goal: "Use a simple risk model — assets, threats, vulnerabilities, likelihood vs impact — and choose controls (preventive, detective, corrective) plus risk responses: accept, mitigate, transfer, or avoid.",
  xpReward: 750,
  badge: "Risk Analyst",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/14",
  nextHref: "/learn/cyber/16",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-15.png",
        imageAlt: "Risk matrix sticky notes Likelihood vs Impact on a whiteboard in a classroom",
        body: `You can't eliminate every cyber risk — and you don't need to treat every risk the same. **Risk assessment** helps you decide what matters most and which **controls** are worth the effort.\n\nHere's our roadmap:\n\n• **Asset / threat / vulnerability / risk** — the core vocab.\n• **Likelihood vs impact** — why \"scary\" isn't the same as \"priority.\"\n• **Control types** — preventive, detective, corrective.\n• **Risk responses** — accept, mitigate, transfer, avoid.\n• A **worked mini-assessment** for a school club.\n• How this prepares you for the capstone.\n\nThis is decision-making skill — the heart of real cybersecurity work.`,
        callout: {
          label: "Why it matters",
          text: "Teams with limited time waste energy on low-impact fears while ignoring high-impact basics like MFA and backups. Risk thinking fixes that.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Risk vocabulary in plain English",
        body: `• **Asset** — something valuable to protect (data, devices, accounts, reputation, people).\n• **Threat** — anything that could harm an asset (phishing, ransomware, device theft, insider mistakes).\n• **Vulnerability** — a weakness that makes harm more likely or worse (no MFA, missing patches, public posts).\n• **Risk** — the chance that a threat exploits a vulnerability and causes impact to an asset.\n• **Likelihood** — how probable the bad event seems.\n• **Impact** — how bad it would be if it happened.\n• **Control** — a safeguard that reduces risk.\n\nSimple formula to remember: **Risk ≈ Threat + Vulnerability affecting an Asset**, judged by likelihood and impact.`,
        callout: {
          label: "Pro tip",
          text: "If you can name the asset and the impact clearly, prioritizing gets much easier.",
        },
      },
      {
        id: "atrv",
        kicker: "The big idea",
        title: "Assets, threats, vulnerabilities, risk",
        image: "/images/lessons/cs-15-2.png",
        imageAlt: "Cards labeled Asset Threat Vulnerability Risk arranged in a teaching layout",
        body: `Walk an example:\n\n• **Asset:** club treasurer Google account (holds budget sheets).\n• **Threat:** phishing that steals the password.\n• **Vulnerability:** no MFA; password reused from another site.\n• **Risk:** attacker empties the payment info sheet, scams sponsors, damages trust.\n\nChange any piece and the risk changes. Add MFA (shrink vulnerability) and residual risk drops even though phishing still exists as a threat.\n\nDefenders don't only ask \"is this scary?\" They ask \"scary *to what*, through *what weakness*?\"`,
        bullets: [
          "Name the **asset** first.",
          "Name realistic **threats**.",
          "Find the **vulnerabilities** you can actually fix.",
        ],
        callout: {
          label: "Common misconception",
          text: "\"We deleted the threat\" is rarely true. You usually reduce vulnerability or impact instead.",
        },
      },
      {
        id: "likelihood-impact",
        kicker: "Prioritize",
        title: "Likelihood vs impact: rank what matters",
        body: `Plot risks roughly on two axes:\n\n• **High likelihood / high impact** — fix first (e.g., no MFA on email that resets everything else).\n• **Low likelihood / high impact** — still plan (backups for ransomware-class events).\n• **High likelihood / low impact** — maybe simple habits are enough.\n• **Low / low** — accept or monitor lightly.\n\nYou don't need fancy math. A 3×3 mental grid (low/medium/high) already beats random panic.\n\nExample: a meteor destroying the school server is high impact, tiny likelihood. Phishing without MFA is medium-high likelihood and high impact for a club — prioritize that.`,
        callout: {
          label: "Watch out",
          text: "Movie-plot threats steal attention. Everyday credential theft and missing backups usually deserve the first budget of effort.",
        },
      },
      {
        id: "control-types",
        kicker: "Safeguards",
        title: "Preventive, detective, and corrective controls",
        body: `Controls come in flavors:\n\n• **Preventive** — stop the bad thing: MFA, patching, least privilege, phishing training, privacy minimization.\n• **Detective** — notice it: login alerts, logs/monitoring, antivirus detections, odd spending notices.\n• **Corrective** — fix and recover: isolate a device, reset credentials, restore backups, remove malicious posts, IR playbooks.\n\nStrong programs layer all three. Prevention reduces hits; detection catches misses; corrective limits damage and restores trust.`,
        bullets: [
          "Preventive ≈ lock on the door.",
          "Detective ≈ alarm.",
          "Corrective ≈ repair + cleaner process afterward.",
        ],
        callout: {
          label: "Defender view",
          text: "If you only prevent and never detect/recover, the first successful phishing email becomes a catastrophe.",
        },
      },
      {
        id: "responses",
        kicker: "Decide",
        title: "Accept, mitigate, transfer, avoid",
        body: `After you assess a risk, choose a response:\n\n• **Mitigate** — reduce it with controls (most common: turn on MFA, patch, train).\n• **Avoid** — stop the risky activity (don't store SSNs in a shared club sheet at all).\n• **Transfer** — shift some impact (insurance for a business; using a reputable vendor's secure platform instead of a DIY server).\n• **Accept** — consciously live with low leftover risk because further controls aren't worth it — and document that choice.\n\nAccepting is not ignoring. Ignoring is skipping the assessment. Acceptance means you looked, ranked, and chose.`,
        callout: {
          label: "Myth check",
          text: "\"Accept the risk\" is not an excuse to leave admin accounts without MFA. Acceptance fits residual low risks after reasonable controls — not negligence.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Mini risk assessment: school robotics club",
        image: "/images/lessons/cs-15-3.png",
        imageAlt: "Club laptop scenario with controls listed: MFA backups training monitoring",
        body: `**Assets:** team email, sponsor list, robot design files, shared laptop.\n\n**Top risks (ranked):**\n1. Email takeover via phishing (high likelihood/impact) → **Mitigate** with MFA + unique password + training; **detective** login alerts; **corrective** session revoke playbook.\n2. Laptop loss without encryption (medium/high) → **Mitigate** with disk encryption + inventory; **avoid** storing sole copies of designs only on that laptop.\n3. Public oversharing of competition travel (medium/medium) → **Mitigate** with posting guidelines.\n\nNotice how risk language drives a short, sensible plan instead of a random tool-shopping spree.`,
        callout: {
          label: "Try this week",
          text: "Pick one personal asset (school email). Name one threat, one vulnerability, and one control for each type: preventive, detective, corrective.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Risk** ties **assets**, **threats**, and **vulnerabilities** to likelihood and impact.\n• Prioritize with a simple likelihood×impact view.\n• Layer **preventive / detective / corrective** controls.\n• Choose **mitigate, avoid, transfer, or accept** on purpose.\n\nAce the **Knowledge check**, then reflect with a tiny risk register of your own — you'll need this thinking in the capstone.`,
      },
    ],
  },
  bigIdeas: [
    "**Risk** is the chance a **threat** exploits a **vulnerability** to harm an **asset** — judged by likelihood and impact.",
    "Controls are **preventive** (stop), **detective** (notice), and **corrective** (fix/recover).",
    "After assessing, choose a response: **mitigate**, **avoid**, **transfer**, or consciously **accept** residual risk.",
  ],
  keyTerms: [
    { term: "Asset", definition: "Something of value you need to protect — data, devices, accounts, reputation, or people." },
    { term: "Threat", definition: "A potential cause of harm to an asset." },
    { term: "Vulnerability", definition: "A weakness that increases the chance or impact of harm." },
    { term: "Risk", definition: "The potential that a threat will exploit a vulnerability and cause impact." },
    { term: "Likelihood / Impact", definition: "How probable a bad event is versus how damaging it would be." },
    { term: "Preventive control", definition: "A safeguard meant to stop an incident before it succeeds." },
    { term: "Detective control", definition: "A safeguard meant to notice suspicious or harmful activity." },
    { term: "Corrective control", definition: "A safeguard meant to contain, repair, and recover after an incident." },
  ],
  realWorld:
    "A club weighs buying fancy network gadgets vs turning on **MFA** for shared email. A quick risk view shows email takeover is high likelihood/impact — **mitigate** with MFA first, then reconsider extras.",
  quiz: [
    {
      id: "q1",
      question: "In risk terms, what is an asset?",
      choices: [
        "Only malware",
        "Something valuable you protect, like accounts, data, or devices",
        "Any software update",
        "A type of phishing email",
      ],
      correctIndex: 1,
      explanation:
        "Assets are what you care about protecting — data, systems, people, reputation, and more.",
    },
    {
      id: "q2",
      question: "A club email has no MFA. Phishing is common. Which statement is most accurate?",
      choices: [
        "There is a threat but no vulnerability",
        "Missing MFA is a vulnerability that raises risk of account takeover",
        "Risk only exists for large corporations",
        "Likelihood and impact are irrelevant",
      ],
      correctIndex: 1,
      explanation:
        "Phishing is a threat; no MFA is a vulnerability; together they create meaningful risk to the email asset.",
    },
    {
      id: "q3",
      question: "Which control is primarily detective?",
      choices: [
        "MFA on login",
        "A \"new sign-in\" alert email",
        "Restoring files from backup after ransomware",
        "Deleting a risky activity entirely",
      ],
      correctIndex: 1,
      explanation:
        "Alerts notice suspicious activity (detective). MFA is preventive; restores are corrective; stopping an activity can be avoidance.",
    },
    {
      id: "q4",
      question: "Choosing not to store Social Security numbers in a club spreadsheet is best described as:",
      choices: [
        "Transferring risk to malware",
        "Avoiding the risk by not keeping that sensitive data there",
        "Accepting a high risk with no thought",
        "A detective control only",
      ],
      correctIndex: 1,
      explanation:
        "Avoidance means not doing the risky thing — here, not holding highly sensitive data you don't need.",
    },
    {
      id: "q5",
      question: "When is \"accept the risk\" appropriate?",
      choices: [
        "Whenever fixing something feels mildly inconvenient, even for admin email without MFA",
        "When remaining risk is low after reasonable controls and you consciously decide further effort isn't worth it",
        "Only when you haven't assessed anything",
        "Never — all risks must be zero",
      ],
      correctIndex: 1,
      explanation:
        "Acceptance is a deliberate choice about residual low risk — not an excuse to skip basic high-impact controls.",
    },
  ],
  reflection: {
    prompt:
      "Create a tiny risk register with one asset you care about. List one threat, one vulnerability, likelihood/impact (low/med/high), one control, and your response (mitigate/avoid/transfer/accept).",
    placeholder: "Example: Asset = school email; Threat = phishing; Vulnerability = reused password; Likelihood high / Impact high; Control = password manager + MFA; Response = mitigate…",
  },
};
