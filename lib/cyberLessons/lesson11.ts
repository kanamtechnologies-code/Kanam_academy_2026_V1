import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson11: AILessonConfig = {
  id: "cs-11",
  title: "11. System Hardening & Patching",
  goal: "Apply defender habits for hardening: keep systems patched, reduce unused services, prefer secure defaults, maintain backups, and know what devices you own.",
  xpReward: 550,
  badge: "Hardener",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/10",
  nextHref: "/learn/cyber/12",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-11.png",
        imageAlt: "Laptop installing security updates with a progress bar and a phone awaiting updates",
        body: `Attackers love soft targets: outdated software, leftover services nobody uses, and devices with no backup plan. **Hardening** is the defender's craft of making systems tougher *before* something goes wrong.\n\nHere's our roadmap:\n\n• **Patching & updates** — closing known holes quickly.\n• **Disable unused services** — less surface area to attack.\n• **Secure defaults** — start locked down, open only what you need.\n• **Backups** — your recovery lifeline.\n• **Device inventory** — you can't protect what you forget exists.\n• **A simple hardening checklist** for school, home, and clubs.\n\nNo exploit recipes — just practical defense you can actually do.`,
        callout: {
          label: "Why it matters",
          text: "Most breaches exploit known, fixable weaknesses — missing updates, default passwords, forgotten devices. Hardening is unglamorous and incredibly effective.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Hardening words in plain English",
        body: `• **Hardening** — reducing ways an attacker can get in or cause damage.\n• **Patch / update** — a fix from the vendor that closes a security bug or improves safety.\n• **Vulnerability** — a weakness that could be abused.\n• **Attack surface** — all the doors/windows into a system (apps, ports, accounts, devices).\n• **Secure defaults** — settings that start safe out of the box instead of wide open.\n• **Backup** — a copy of important data you can restore after loss, ransomware, or mistakes.\n• **Inventory** — a list of devices and accounts you're responsible for.\n\nHardening = shrink the attack surface + keep fixes current + plan recovery.`,
        callout: {
          label: "Pro tip",
          text: "If you only do one hardening habit this week: turn on automatic updates for your phone and laptop OS.",
        },
      },
      {
        id: "patching",
        kicker: "The big idea",
        title: "Updates close doors attackers already know about",
        image: "/images/lessons/cs-11-2.png",
        imageAlt: "Update Available notifications on laptop and phone side by side",
        body: `When researchers or vendors find a **vulnerability**, they usually release a **patch**. Attackers also learn about many of those weaknesses. Running old software is like leaving a broken lock on the door after the locksmith already mailed you a replacement.\n\nDefender habits:\n\n• Enable **automatic updates** for OS and browsers when possible.\n• Update apps you actually use — especially browsers, messaging, and office tools.\n• Restart when asked; some patches only finish after reboot.\n• On shared/school devices, follow IT guidance — don't disable update services \"to go faster.\"\n\nPatching isn't exciting. It's one of the highest-ROI defenses in cybersecurity.`,
        bullets: [
          "Known vulnerabilities get exploited at scale.",
          "Browsers and OS updates are priority #1 for most people.",
          "\"I'll update later\" is how soft targets stay soft.",
        ],
        callout: {
          label: "Watch out",
          text: "Fake \"update\" pop-ups are a common scam. Prefer built-in update settings or official app stores — not random download buttons on scary websites.",
        },
      },
      {
        id: "unused-services",
        kicker: "Shrink the surface",
        title: "Turn off what you don't need",
        body: `Every running **service**, open sharing feature, leftover admin tool, or forgotten app is another potential entry point. Defenders practice **reducing unused services**: if nothing needs it, disable or uninstall it.\n\nExamples at a high-school / small-org level:\n\n• Turn off file sharing you don't use.\n• Remove old apps with access to your camera, mic, or files.\n• Disable guest accounts you don't need.\n• On a club website or shared laptop, don't leave unused admin panels exposed \"just in case.\"\n\nYou don't need to memorize every service name. Ask: *Do we use this? Who needs it? What happens if we turn it off?*`,
        callout: {
          label: "Defender view",
          text: "Less installed + less exposed usually means fewer surprises in an incident. Complexity is an enemy of security.",
        },
      },
      {
        id: "secure-defaults",
        kicker: "Start safe",
        title: "Secure defaults beat last-minute lockdowns",
        body: `**Secure defaults** means systems arrive (or get configured) already leaning toward safety:\n\n• Strong authentication required, not optional.\n• Admin rights limited to people who need them.\n• Encryption on by default where available.\n• Verbose public sharing off until someone intentionally enables it.\n\nInsecure defaults are classic failures: routers still using \`admin/admin\`, cloud folders set to \"anyone with the link,\" or student accounts with no MFA on critical systems.\n\nWhen you set up anything new — a phone, a club Discord bot host, a shared drive — spend five minutes on the security settings *before* you invite the world in.`,
        callout: {
          label: "Common misconception",
          text: "\"We'll lock it down later after we finish setup.\" Later often never comes. Configure safe defaults first.",
        },
      },
      {
        id: "backups-inventory",
        kicker: "Recover & know your stuff",
        title: "Backups and inventory: defend against the bad day",
        image: "/images/lessons/cs-11-3.png",
        imageAlt: "External drive backup, cloud sync icon, and a written device inventory list",
        body: `**Backups** are how you survive ransomware, theft, accidental deletion, and failed drives. Good backup habits:\n\n• Keep copies of irreplaceable schoolwork, photos, and club records.\n• Use more than one place (e.g., cloud sync *and* an occasional offline/export copy for critical files).\n• Test that you can actually **restore** — an untested backup is a hope, not a plan.\n\n**Inventory** means listing devices and accounts: phones, laptops, tablets, routers, shared club laptops, social accounts, cloud drives. You can't patch, wipe, or revoke access for a device you forgot exists.\n\nFor a family or club, a simple spreadsheet of \"what we own + who administers it\" is already strong defender practice.`,
        bullets: [
          "Backup = recovery option when prevention fails.",
          "Inventory = know every device/account in scope.",
          "Revoke access when people leave a club or team.",
        ],
        callout: {
          label: "Try this week",
          text: "Write down every device that can reach your main email or school accounts. Note which ones still need OS updates or screen locks.",
        },
      },
      {
        id: "checklist",
        kicker: "Put it together",
        title: "A simple hardening checklist",
        body: `Use this anytime you set up or review a device:\n\n**1. Update** OS, browser, and key apps.\n**2. Lock** with a strong passcode/password + biometrics if available.\n**3. Enable MFA** on important accounts.\n**4. Remove** unused apps/services and leftover accounts.\n**5. Check sharing defaults** — nothing public by accident.\n**6. Confirm backups** for critical files.\n**7. Record it** on your inventory list.\n\nThat's hardening in everyday life — not a Hollywood hacker scene.`,
        callout: {
          label: "Myth check",
          text: "Hardening isn't only for servers in a data center. Phones, Chromebooks, home routers, and club laptops all benefit from the same mindset.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Patching** closes known vulnerabilities — turn updates on.\n• Shrink **attack surface** by disabling unused services/apps.\n• Prefer **secure defaults** and least privilege from day one.\n• **Backups** + tested restores beat panic later.\n• Keep an **inventory** of devices and accounts.\n\nTake the **Knowledge check**, then reflect on one hardening change you'll make this week.`,
      },
    ],
  },
  bigIdeas: [
    "**Patching** closes known vulnerabilities before attackers can rely on them at scale.",
    "**Hardening** shrinks attack surface: fewer unused services, safer defaults, least privilege.",
    "**Backups** and **inventory** make recovery possible and keep forgotten devices from becoming blind spots.",
  ],
  keyTerms: [
    { term: "Hardening", definition: "Strengthening a system by reducing weaknesses and unnecessary exposure." },
    { term: "Patch", definition: "A vendor update that fixes a bug or security vulnerability." },
    { term: "Vulnerability", definition: "A weakness that could be abused to harm confidentiality, integrity, or availability." },
    { term: "Attack surface", definition: "All the potential entry points into a system or organization." },
    { term: "Secure defaults", definition: "Out-of-the-box settings that favor safety until intentionally changed." },
    { term: "Backup", definition: "A recoverable copy of important data stored separately from the original." },
    { term: "Inventory", definition: "A list of devices, systems, and accounts you are responsible for protecting." },
  ],
  realWorld:
    "A school club laptop still runs an outdated browser \"because updates are annoying.\" A known vulnerability in that old version is exactly the kind of soft target automated attacks look for — **patching** and a simple device **inventory** would have flagged it.",
  quiz: [
    {
      id: "q1",
      question: "What is the main security reason to install patches promptly?",
      choices: [
        "Patches always add new games",
        "They close known vulnerabilities attackers may already understand how to abuse",
        "They permanently stop all phishing",
        "They remove the need for passwords",
      ],
      correctIndex: 1,
      explanation:
        "Patches fix known weaknesses. Delaying updates leaves doors open that defenders and attackers both know about.",
    },
    {
      id: "q2",
      question: "Why disable unused services or uninstall unused apps?",
      choices: [
        "To make the device look emptier",
        "To shrink the attack surface — fewer things that can be abused",
        "Because updates are illegal on unused apps",
        "So backups stop working",
      ],
      correctIndex: 1,
      explanation:
        "Every unused service or app is potential exposure. Reducing them is classic hardening.",
    },
    {
      id: "q3",
      question: "Which is an example of a secure default?",
      choices: [
        "New cloud folders set to public until someone remembers to lock them",
        "Admin rights given to every club member by default",
        "MFA offered as optional forever on a sensitive admin account",
        "Screen lock and automatic updates enabled when you first set up a device",
      ],
      correctIndex: 3,
      explanation:
        "Secure defaults start protective (locks, updates, limited sharing) instead of wide open.",
    },
    {
      id: "q4",
      question: "What makes a backup actually useful in an incident?",
      choices: [
        "You once thought about backing up",
        "You can successfully restore the files you need",
        "The backup is stored only on the same infected laptop",
        "The backup replaces the need for patching",
      ],
      correctIndex: 1,
      explanation:
        "Untested or inaccessible backups fail when you need them. Restorability is the point.",
    },
    {
      id: "q5",
      question: "Why keep a device/account inventory for a club or family?",
      choices: [
        "So you can forget about updates",
        "So you know what exists to patch, lock, wipe, or revoke when people leave",
        "Inventories replace encryption",
        "Only large corporations are allowed to list devices",
      ],
      correctIndex: 1,
      explanation:
        "You can't protect, update, or decommission what you don't realize you own.",
    },
  ],
  reflection: {
    prompt:
      "Pick one device you use daily. List two hardening actions you can take this week (update, remove an unused app, enable a backup, tighten a setting). Why those two?",
    placeholder: "Example: My phone — turn on auto-update and remove an old app that still has photo access…",
  },
};
