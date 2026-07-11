import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson16: AILessonConfig = {
  id: "cs-16",
  title: "16. Capstone: Defend the Scenario",
  goal: "Synthesize the cybersecurity track by defending a school club / small-org scenario — applying CIA, phishing defense, MFA, hardening, incident response, and risk priorities into a short security plan.",
  xpReward: 800,
  badge: "Cyber Defender",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/15",
  lessonModule: {
    durationLabel: "~12–15 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `This is your **Cybersecurity capstone**. You'll step into the role of defender for a realistic school club and pull the whole track together — not as isolated facts, but as one coherent plan.\n\nHere's the plan:\n\n• Meet the **scenario** and what's at stake.\n• Fast **track recap** of the tools in your kit.\n• Apply **CIA + identity defenses** (phishing, MFA, least privilege).\n• Apply **hardening, crypto/HTTPS awareness, and privacy**.\n• Draft **detection, IR, and risk priorities**.\n• Build a short **security plan** you could actually hand a club sponsor.\n\nBy the end, you should sound like a Cyber Defender — calm, ethical, and practical.`,
        callout: {
          label: "Why it matters",
          text: "Real security work is synthesis: choosing a few high-impact controls and knowing what to do when something fails — not memorizing every buzzword.",
        },
      },
      {
        id: "scenario",
        kicker: "Your mission",
        title: "Scenario: Greenwood Media Club",
        body: `You're advising the **Greenwood High Media Club** (about 25 members). They have:\n\n• A shared **club Gmail** used for sponsor emails and contest logins.\n• A **Google Drive** with photo/video projects and a budget spreadsheet.\n• Two **shared laptops** for editing (sometimes left in the classroom).\n• An **Instagram** account that promotes events.\n• A simple **club website** on a free host for meeting times.\n\nRecent headaches: a near-miss phishing email asking for \"Drive access,\" a laptop that hasn't updated in months, public Instagram posts showing student ID badges in the background, and nobody is sure who still has the Gmail password after seniors graduated.\n\nYour job: defend this small org with the skills from Lessons 1–15.`,
        callout: {
          label: "Constraints",
          text: "No big budget, no full-time IT staff on the club — prioritize free/high-impact habits and clear ownership.",
        },
      },
      {
        id: "recap",
        kicker: "Capstone",
        title: "Your defender toolkit — quick recap",
        body: `You've built a full kit across the track. Today's job is to *use* it:\n\n• **Foundations:** ethics, CIA triad, authentication.\n• **Human layer:** malware awareness, phishing/social engineering defense.\n• **Identity:** strong unique passwords, hashing concept, **MFA**, least privilege.\n• **Network & config:** defender networking basics, firewalls/ports/secure config.\n• **Crypto & trust:** encryption/hashing ideas, HTTPS/certificates/padlock limits.\n• **Operations:** hardening/patching/backups/inventory; logging/monitoring/IR.\n• **Analysis:** attack patterns (defender view), OSINT/privacy awareness, risk & controls.\n\nYou don't need every control at once. You need the *right few* for Greenwood's risks.`,
        callout: {
          label: "You can now",
          text: "Explain risks in plain English, pick layered controls, and outline an incident response — the core of entry-level cyber readiness.",
        },
      },
      {
        id: "identity-cia",
        kicker: "Apply it",
        title: "Protect CIA with identity-first defenses",
        body: `For Greenwood, start where impact is highest: **identity and access**.\n\n• **Confidentiality:** Drive files and sponsor contacts shouldn't be world-readable; review sharing links.\n• **Integrity:** Budget sheet edits should be limited to treasurer + sponsor.\n• **Availability:** If Gmail is locked by an attacker, contests and sponsors stall — plan recovery.\n\nConcrete moves:\n\n1. Unique password in a password manager for club Gmail + **MFA** (sponsor holds backup codes).\n2. Remove graduated seniors; apply **least privilege** on Drive (editors vs viewers).\n3. Phishing drill: never approve unexpected Drive access; verify via known channels.\n4. Instagram: fewer admins; MFA on; no password sharing in group chats.\n\nThese steps alone crush the most likely high-impact failures.`,
        bullets: [
          "MFA + unique passwords on shared accounts.",
          "Least privilege on Drive roles.",
          "Phishing skepticism as club policy.",
        ],
        callout: {
          label: "Common failure",
          text: "Shared passwords in a Notes file with no MFA — convenient until one device is stolen or one member is phished.",
        },
      },
      {
        id: "harden-privacy",
        kicker: "Apply it",
        title: "Harden devices and shrink public exposure",
        body: `Next layer: systems and privacy.\n\n**Hardening & patching**\n• Inventory both laptops + who administers them.\n• Turn on OS/browser auto-updates; set screen locks.\n• Remove unused apps; disable leftover guest accounts.\n• Back up project files to Drive *and* export critical finals elsewhere periodically.\n\n**Crypto / HTTPS awareness**\n• Use HTTPS admin/login pages only; heed certificate warnings.\n• Remember: padlock ≠ \"this DM is safe.\"\n\n**OSINT / privacy**\n• Stop posting badge photos; blur IDs.\n• Post event travel after returning when possible.\n• Review Instagram privacy/tag settings.\n\nYou're reducing attack surface and the raw material for spear phishing.`,
        callout: {
          label: "Defender view",
          text: "A patched, inventoried laptop with backups beats an expensive gadget the club won't maintain.",
        },
      },
      {
        id: "ir-risk",
        kicker: "Apply it",
        title: "Risk priorities, monitoring, and an IR mini-plan",
        body: `**Risk snapshot (prioritized):**\n1. Club Gmail takeover (high likelihood/impact) → mitigate with MFA, unique creds, fewer custodians.\n2. Drive data leak via public link (medium/high) → mitigate with link audits + least privilege.\n3. Laptop loss / malware on outdated OS (medium/high) → mitigate with patching, locks, encryption if available, backups.\n4. Instagram impersonation/spam (medium/medium) → mitigate with MFA + admin hygiene.\n\n**Detection:** enable login alerts; check Drive sharing monthly; notice weird Instagram posts.\n\n**IR mini-plan (identify → contain → eradicate → recover → lessons):**\n• Suspected Gmail compromise → revoke sessions, change password, confirm MFA, check forwarding rules/filters, tell sponsor/IT as required, review Drive activity, write lessons (who had access?).\n\nDocument owners: *who* resets passwords, *who* talks to sponsors, *who* holds backup codes.`,
        callout: {
          label: "Try in the reflection",
          text: "Your written security plan should name top risks, controls, owners, and what to do in the first hour of an account incident.",
        },
      },
      {
        id: "plan-template",
        kicker: "Deliverable",
        title: "Security plan template (keep it one page)",
        body: `Hand this structure to a club sponsor:\n\n**1. Scope** — accounts, devices, data we protect.\n**2. Top 3 risks** — likelihood/impact in plain words.\n**3. Controls this month** — MFA, password manager, sharing audit, updates, privacy cleanup.\n**4. Roles** — sponsor, student lead, treasurer (least privilege).\n**5. Monitoring** — alerts we watch; monthly 15-minute review.\n**6. Incident contacts & first steps** — contain checklist.\n**7. Backups** — where finals live; who verifies restore.\n**8. Review date** — next semester checkup.\n\nShort beats perfect. A one-page plan that people follow outperforms a 40-page binder nobody reads.`,
        bullets: [
          "Prioritize identity + backups + patching.",
          "Name humans for each critical task.",
          "Schedule a review so the plan doesn't rot.",
        ],
        callout: {
          label: "Ethics",
          text: "Everything in your plan should be defensive and authorized. No \"testing\" phishing classmates or scanning networks without permission.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn — defend Greenwood",
        body: `You've walked the full defender path. Capstone recap:\n\n• Synthesize **CIA**, **phishing defense**, **MFA/least privilege**, **hardening**, **HTTPS awareness**, **privacy**, **IR**, and **risk prioritization**.\n• Favor a few high-impact controls with clear owners.\n• Write a short plan you could actually run.\n\nComplete the **Knowledge check** (it mixes ideas across the track), then write your **security plan** in the reflection. You've earned the **Cyber Defender** finish line — go show the synthesis.`,
      },
    ],
  },
  bigIdeas: [
    "Capstone security work is **synthesis**: prioritize a few high-impact controls for a real scenario, not every possible tool.",
    "For a school club, start with **identity** (MFA, unique passwords, least privilege), then **hardening/backups**, **privacy**, and a simple **IR** plan.",
    "A one-page plan with owners, top risks, and first-hour incident steps beats an unused binder of policies.",
  ],
  keyTerms: [
    { term: "CIA triad", definition: "Confidentiality, Integrity, Availability — the core security goals." },
    { term: "MFA", definition: "Multi-factor authentication — requiring more than a password to sign in." },
    { term: "Least privilege", definition: "Giving people only the access they need for their role." },
    { term: "Hardening", definition: "Reducing weaknesses via patching, secure defaults, and removing unused exposure." },
    { term: "Incident response", definition: "Identify, contain, eradicate, recover, and learn from security events." },
    { term: "Risk prioritization", definition: "Ranking what to fix first using likelihood and impact." },
    { term: "Security plan", definition: "A short, owned list of risks, controls, monitoring, and incident steps." },
  ],
  realWorld:
    "Student clubs lose access when seniors graduate with the only passwords, or get burned by a single phish on a shared inbox. A lightweight plan — MFA, inventory, least privilege, backups, IR contacts — prevents most of that drama.",
  quiz: [
    {
      id: "q1",
      question: "Greenwood's club Gmail has no MFA and a password shared in a group chat. What is the best first mitigation?",
      choices: [
        "Buy an expensive firewall before changing anything else",
        "Move to a unique strong password, enable MFA, and stop sharing the password in chat — store access with clear owners",
        "Make the Instagram public to confuse attackers",
        "Turn off all login alerts so members aren't annoyed",
      ],
      correctIndex: 1,
      explanation:
        "Identity risk is top priority. Unique credentials + MFA + ownership beat random hardware purchases.",
    },
    {
      id: "q2",
      question: "A Drive folder with the budget sheet is set to \"anyone with the link.\" Which CIA goal is most directly threatened?",
      choices: [
        "Only availability",
        "Confidentiality (and possibly integrity if editing is allowed)",
        "Nothing — public links are always safe",
        "Only physical laptop theft",
      ],
      correctIndex: 1,
      explanation:
        "Public links expose data (confidentiality) and may allow unwanted changes (integrity) depending on permissions.",
    },
    {
      id: "q3",
      question: "The club website uses HTTPS. A phishing page also shows a padlock. What should members remember?",
      choices: [
        "Padlock means any site is trustworthy",
        "HTTPS encrypts the connection to that domain — they must still verify the URL and avoid fake login pages",
        "HTTPS replaces MFA forever",
        "Certificate warnings should always be ignored",
      ],
      correctIndex: 1,
      explanation:
        "Capstone synthesis from the HTTPS lesson: padlock ≠ honesty. Check domains; keep MFA.",
    },
    {
      id: "q4",
      question: "A shared laptop is months behind on updates and has no backup of final video projects. Which pair best matches preventive + corrective thinking?",
      choices: [
        "Ignore updates; delete logs if malware appears",
        "Enable patching/auto-updates now (preventive) and set up restore-tested backups (corrective readiness)",
        "Only post more frequently on Instagram",
        "Accept total data loss as unavoidable with no controls",
      ],
      correctIndex: 1,
      explanation:
        "Patching reduces vulnerability; backups enable recovery — classic preventive + corrective pairing.",
    },
    {
      id: "q5",
      question: "Instagram starts posting spam. Using IR order, what is the best immediate containment move after confirming it's unauthorized?",
      choices: [
        "Write lessons learned before changing anything",
        "Revoke other sessions, change the password, confirm MFA, and remove unknown connected apps — then clean posts and notify the sponsor",
        "Publicly accuse a classmate with no evidence",
        "Share the password with all 25 members to \"help investigate\"",
      ],
      correctIndex: 1,
      explanation:
        "Contain access first (sessions/password/MFA/apps), then clean up and escalate — don't widen access during an incident.",
    },
  ],
  reflection: {
    prompt:
      "Write a short security plan for Greenwood Media Club (or a club you know). Include: top 3 risks, controls for this month, who owns what, how you'll monitor, and first steps if the shared email is compromised.",
    placeholder:
      "Example: Top risks — Gmail takeover, public Drive link, outdated laptops. This month — MFA on Gmail/IG, sharing audit, auto-updates + backup check. Owners — sponsor holds backup codes; treasurer controls budget access. If Gmail is compromised — revoke sessions, reset password, check forwarding, tell sponsor…",
  },
};
