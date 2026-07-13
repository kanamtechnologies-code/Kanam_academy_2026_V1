import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson12: AILessonConfig = {
  id: "cs-12",
  title: "12. Logging, Monitoring & Incidents",
  goal: "Explain why logs matter, contrast detection vs prevention, walk through basic incident response steps, and know who to notify when something goes wrong.",
  xpReward: 600,
  badge: "Incident Ready",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/11",
  nextHref: "/learn/cyber/13",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-12.png",
        imageAlt: "SOC-style monitors with calm alert banners and a runbook binder labeled Incident Response",
        body: `Prevention is great — until something slips through. Then you need **detection**, **logs**, and a calm **incident response** plan. Today you'll learn how defenders notice trouble and recover without making things worse.\n\nHere's our roadmap:\n\n• **Why logs matter** — the black box recorder of systems.\n• **Detection vs prevention** — both are needed.\n• **Basic IR steps** — identify, contain, eradicate, recover, lessons learned.\n• **Who to tell** — escalation without chaos.\n• **What good evidence looks like** — preserve, don't panic-wipe.\n• **A mini playbook** for school/club incidents.\n\nThis is about thinking clearly under pressure — a core cyber skill.`,
        callout: {
          label: "Why it matters",
          text: "Many organizations fail not because they never get attacked, but because nobody knows what to do next — or they destroy the evidence while panicking.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Incident words in plain English",
        body: `• **Log** — an automatic record of events (logins, errors, access attempts).\n• **Monitoring** — watching logs and alerts for unusual or risky activity.\n• **Detection** — noticing that something suspicious or harmful is happening (or happened).\n• **Prevention** — stopping bad things before they succeed (patches, MFA, firewalls).\n• **Incident** — a security event that threatens systems, data, or people and needs a response.\n• **Incident response (IR)** — the organized process for handling an incident.\n• **Containment** — limiting damage so the problem doesn't spread.\n\nYou'll use these in a simple IR loop next.`,
        callout: {
          label: "Pro tip",
          text: "If you remember only one sequence: **Identify → Contain → Eradicate → Recover → Lessons learned**.",
        },
      },
      {
        id: "why-logs",
        kicker: "The big idea",
        title: "Logs are how defenders reconstruct the story",
        body: `Without **logs**, incidents turn into guessing games. Logs answer questions like:\n\n• Who signed in, from where, and when?\n• Which file was accessed or changed?\n• Did an admin setting flip unexpectedly?\n• Was there a burst of failed login attempts?\n\n**Clock sync (NTP)** matters because investigators **correlate logs across systems**. If one server's clock is an hour off, login, VPN, and firewall timelines won't line up — and you can't tell whether two events were related or minutes apart.\n\nEveryday examples: login history on email, \"recent activity\" on cloud drives, router connection logs, school LMS access records.\n\nDefenders care about **what is logged**, **how long logs are kept**, **whether clocks are synchronized**, and **who can alter them**. If an attacker can delete the cameras after a break-in, investigation gets much harder — same idea with logs.`,
        bullets: [
          "Logs turn mysteries into timelines.",
          "Protect logs from tampering when possible.",
          "Even small teams should know where login history lives.",
        ],
        callout: {
          label: "Watch out",
          text: "Turning off logging \"to free space\" or ignoring alerts for weeks defeats the purpose. Detection requires attention.",
        },
      },
      {
        id: "detect-vs-prevent",
        kicker: "Two layers",
        title: "Prevention reduces hits; detection catches what slips through",
        body: `**Prevention** tries to stop attacks: patching, MFA, phishing training, least privilege, hardening.\n\n**Detection** assumes something may still happen: monitoring failed logins, odd file sharing, antivirus alerts, \"new login from nowhere\" notices.\n\n**Detection example — credential stuffing / impossible travel:**\n\n• Many **failed logins** from one address, then one **success** — a pattern that can mean someone guessed or reused a stolen password list.\n• **Successful logins from far-away places minutes apart** — sometimes called **impossible travel** when the timing doesn't fit normal human movement.\n• Defenders **correlate login, VPN, and MFA logs** around the success time to confirm scope: Was MFA challenged? Did VPN connect from the same region? What changed after the success?\n\nA strong defense uses both prevention and detection. A locked door (prevention) plus an alarm (detection) beats either alone. In cyber, \"we prevented everything forever\" is fantasy — so plan to notice and respond.`,
        callout: {
          label: "Common misconception",
          text: "\"We have strong passwords, so we don't need monitoring.\" Credentials still get phished. Detection catches the unusual sign-in afterward.",
        },
      },
      {
        id: "ir-steps",
        kicker: "The playbook",
        title: "Basic incident response steps",
        image: "/images/lessons/cs-12-2.png",
        imageAlt: "Five step cards: Identify Contain Eradicate Recover Lessons on a classroom table",
        body: `Here's a simple IR loop used widely (wording varies, idea is stable):\n\n**1. Identify** — Confirm something real is wrong. Gather symptoms: alert text, weird charges, ransomware note, locked account.\n**2. Contain** — Stop the bleeding. Disconnect a compromised device from Wi-Fi if appropriate, revoke sessions, reset passwords, pause risky sharing — without destroying needed evidence when you can help it.\n**3. Eradicate** — Remove the cause: malware cleanup with proper tools/IT help, close the exposed setting, remove the malicious OAuth app.\n**4. Recover** — Restore from clean backups, re-enable services carefully, verify systems work.\n**5. Lessons learned** — What failed? What will you change (MFA, training, patching, logging)?\n\nYou may not run all steps alone — but knowing the order keeps you from skipping straight to \"reinstall everything\" in a panic.`,
        callout: {
          label: "Defender view",
          text: "Containment before cleanup matters. If you only wipe one laptop while the attacker still has your email session cookie, they may walk right back in.",
        },
      },
      {
        id: "who-to-tell",
        kicker: "Escalate wisely",
        title: "Who to tell (and what not to do)",
        image: "/images/lessons/cs-12-3.png",
        imageAlt: "Student calling school IT while an incident report form is open on a laptop",
        body: `Incidents are team sports. Know your contacts:\n\n• **School / work** — teacher, IT help desk, administrator, or designated security contact.\n• **Club / team** — adult sponsor and account owners.\n• **Personal accounts** — platform support; for money theft, also bank/card issuer promptly.\n• **Legal/serious harm** — trusted adults; emergency services if someone is in immediate danger.\n\nAvoid:\n\n• Posting raw incident details publicly while it's unfolding.\n• Accusing classmates without evidence.\n• Paying random \"unlock\" demands without trusted adult/IT guidance.\n• Silently hoping it goes away.\n\nA short message helps: what you noticed, when, what accounts/devices, what you already tried.`,
        bullets: [
          "Tell the right responsible adults/IT early.",
          "Document time + symptoms simply.",
          "Don't destroy devices if IT needs to investigate (when practical).",
        ],
        callout: {
          label: "Try this week",
          text: "Write down who you would contact for (1) a school account lockout that looks like a takeover and (2) a personal email \"new login\" alert you didn't cause.",
        },
      },
      {
        id: "mini-playbook",
        kicker: "School & club ready",
        title: "A mini playbook you can actually use",
        body: `Example: club social account starts posting spam.\n\n• **Identify** — Confirm posts aren't from a teammate; check login/session history.\n• **Contain** — Log out other sessions, change password, enable MFA, remove unknown connected apps.\n• **Eradicate** — Delete malicious posts; check bio/links for attacker changes.\n• **Recover** — Restore branding; announce briefly if followers were put at risk (with sponsor approval).\n• **Lessons** — Unique password + MFA + fewer admins next time.\n\nSame skeleton works for shared drives, Discord servers, and school email — adjust who you notify.`,
        callout: {
          label: "Myth check",
          text: "Incident response isn't only for Fortune 500 SOCs. Student clubs and families need simple playbooks too.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Logs** create timelines defenders can trust; **NTP clock sync** enables correlation.\n• **Prevention** and **detection** work together.\n• Watch for **credential stuffing** and **impossible-travel** patterns; correlate login, VPN, and MFA logs.\n• IR basics: **identify → contain → eradicate → recover → lessons**.\n• Know **who to tell** and avoid panic moves that make recovery harder.\n\nTake the **Knowledge check**, then reflect on an incident scenario and your first three actions.`,
      },
    ],
  },
  bigIdeas: [
    "**Logs** and **monitoring** turn security events into timelines defenders can investigate.",
    "**Prevention** reduces incidents; **detection** and **IR** handle what still gets through.",
    "A simple IR loop — identify, contain, eradicate, recover, lessons — plus knowing who to tell beats panic.",
  ],
  keyTerms: [
    { term: "Log", definition: "An automatic record of system or account events used for investigation and monitoring." },
    { term: "Monitoring", definition: "Watching logs and alerts for suspicious or harmful activity." },
    { term: "Detection", definition: "Noticing that a security problem is occurring or has occurred." },
    { term: "Prevention", definition: "Controls meant to stop attacks before they succeed." },
    { term: "Incident", definition: "A security event that threatens systems, data, or people and requires response." },
    { term: "Incident response (IR)", definition: "An organized process for handling and recovering from incidents." },
    { term: "Containment", definition: "Limiting an incident's spread and damage while response continues." },
    { term: "Lessons learned", definition: "The post-incident review that improves defenses and playbooks." },
    { term: "NTP", definition: "Network Time Protocol — synchronizes clocks so logs from different systems can be correlated accurately." },
    { term: "Impossible travel", definition: "A detection pattern where logins from distant locations appear too close together in time to be one person traveling normally." },
  ],
  realWorld:
    "You get a \"new sign-in\" alert for school email from a city you've never visited. **Detection** gave you the signal; next you **contain** (revoke sessions, reset password, confirm MFA), tell IT if it's a school account, then review **logs**/activity for what else changed.",
  quiz: [
    {
      id: "q1",
      question: "Why do logs matter during an incident?",
      choices: [
        "They automatically patch every vulnerability",
        "They help reconstruct what happened with times, accounts, and actions",
        "They replace the need for MFA",
        "They make phishing emails illegal",
      ],
      correctIndex: 1,
      explanation:
        "Logs provide the timeline and evidence defenders need to understand and respond to incidents.",
    },
    {
      id: "q2",
      question: "How do prevention and detection differ?",
      choices: [
        "Prevention notices attacks; detection stops them beforehand",
        "Prevention tries to stop attacks; detection notices what still happens",
        "They are unrelated to cybersecurity",
        "Detection only works offline",
      ],
      correctIndex: 1,
      explanation:
        "Prevention reduces successful attacks; detection catches suspicious activity that slips through.",
    },
    {
      id: "q3",
      question: "In basic IR order, what should usually come right after identifying a real incident?",
      choices: [
        "Post every detail on social media",
        "Contain the damage / limit spread",
        "Skip straight to lessons learned",
        "Delete all logs immediately",
      ],
      correctIndex: 1,
      explanation:
        "After identify, contain — stop the bleeding before cleanup and recovery.",
    },
    {
      id: "q4",
      question: "A school club Discord is compromised. Who should you typically notify first?",
      choices: [
        "Only strangers on the internet for advice",
        "The adult sponsor / account owners and follow school rules for IT escalation if needed",
        "Nobody — silence is safer",
        "The attacker, to negotiate publicly",
      ],
      correctIndex: 1,
      explanation:
        "Escalate to responsible adults/owners (and IT when appropriate). Don't handle serious account takeovers alone in secret.",
    },
    {
      id: "q5",
      question: "What belongs in the \"lessons learned\" step?",
      choices: [
        "Pretending nothing happened",
        "Identifying what failed and which controls/habits to improve next time",
        "Disabling all logging forever",
        "Sharing private passwords with the whole grade",
      ],
      correctIndex: 1,
      explanation:
        "Lessons learned turn pain into better prevention, detection, and playbooks.",
    },
  ],
  reflection: {
    prompt:
      "Imagine your personal email shows a login you don't recognize. List your first three actions in order, and who you might tell if it were a school-managed account instead.",
    placeholder: "Example: 1) Revoke sessions… 2) Change password + check MFA… 3) Review recent activity… For school email I'd also tell…",
  },
};
