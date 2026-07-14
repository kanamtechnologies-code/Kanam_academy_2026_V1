import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson11: AILessonConfig = {
  id: "cs-11",
  title: "11. System Hardening & Patching",
  goal: "Apply defender habits for hardening: keep systems patched, reduce unused services, prefer secure defaults, prioritize vulnerabilities, make changes safely, and maintain backups and inventory.",
  xpReward: 550,
  badge: "Hardener",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/10",
  nextHref: "/learn/cyber/12",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-11.png",
        imageAlt: "Laptop installing security updates with a progress bar and a phone awaiting updates",
        body: `Attackers love soft targets: outdated software, leftover services nobody uses, and devices with no backup plan. **Hardening** is the defender's craft of making systems tougher *before* something goes wrong.\n\nHere's our roadmap:\n\n• **Patching & updates** — closing known holes quickly.\n• **Disable unused services** — less surface area to attack.\n• **IoT hardening** — locking down new devices before they join the network.\n• **Secure defaults** — start locked down, open only what you need.\n• **Vulnerability prioritization** — deciding what to fix first.\n• **Backups & inventory** — your recovery lifeline.\n• **Change management** — making hardening changes safely, without breaking things.\n• A simple hardening checklist for school, home, and clubs.\n\nThis maps directly to the **Protect** function of the NIST NICE framework — no exploit recipes, just practical defense you can actually do.`,
        callout: {
          label: "Why it matters",
          text: "Most breaches exploit known, fixable weaknesses — missing updates, default passwords, forgotten devices. Hardening is unglamorous and incredibly effective.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Hardening words in plain English",
        body: `• **Hardening** — reducing ways an attacker can get in or cause damage.\n• **Patch / update** — a fix from the vendor that closes a security bug or improves safety.\n• **Vulnerability** — a weakness that could be abused.\n• **Attack surface** — all the doors/windows into a system (apps, ports, accounts, devices).\n• **Secure defaults** — settings that start safe out of the box instead of wide open.\n• **Backup** — a copy of important data you can restore after loss, ransomware, or mistakes.\n• **Inventory** — a list of devices and accounts you're responsible for.\n• **Change management** — the discipline of planning, testing, and documenting changes instead of making them randomly.\n\nHardening = shrink the attack surface + keep fixes current + plan recovery + change things carefully.`,
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
        body: `When researchers or vendors find a **vulnerability**, they usually release a **patch**. Attackers also learn about many of those weaknesses. Running old software is like leaving a broken lock on the door after the locksmith already mailed you a replacement.\n\n**Hardening starts with inventory** — know what software is installed and what services are running before you patch or disable anything. You can't shrink attack surface you haven't listed.\n\nDefender habits:\n\n• Enable **automatic updates** for OS and browsers when possible.\n• Update apps you actually use — especially browsers, messaging, and office tools.\n• Restart when asked; some patches only finish after reboot.\n• On shared/school devices, follow IT guidance — don't disable update services \"to go faster.\"\n\nPatching isn't exciting. It's one of the highest-ROI defenses in cybersecurity.`,
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
        id: "patching-example",
        kicker: "See it in action",
        title: "Two laptops, two very different risk levels",
        body: `Laptop A: automatic updates enabled, restarted last week when prompted, running the current browser version.\n\nLaptop B: updates "paused" six months ago because a reboot was inconvenient during a project deadline, and never turned back on.\n\nBoth laptops look identical from the outside. But Laptop B has accumulated half a year of known, publicly documented vulnerabilities that Laptop A no longer has. If a new phishing campaign exploits a browser bug that was patched three months ago, Laptop A is protected by default — Laptop B is exactly the kind of target automated attacks are built to find.\n\nThe fix isn't heroic. It's turning updates back on and actually restarting when asked, then treating "pause updates" as a rare, deliberate, time-boxed choice — not a permanent setting.`,
        checkIn: {
          prompt: "A laptop paused updates six months ago and never resumed them. What's the main risk?",
          choices: [
            "None — pausing updates has no security effect",
            "It has accumulated known, publicly documented vulnerabilities that attackers can target",
            "The laptop will run faster forever",
            "Pausing updates automatically enables a firewall instead",
          ],
          correctIndex: 1,
          explanation:
            "Delayed patching leaves known, already-documented vulnerabilities unaddressed — exactly what automated attacks scan for.",
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
        id: "unused-services-example",
        kicker: "See it in action",
        title: "The forgotten file-sharing feature",
        body: `A shared club laptop had a file-sharing feature enabled two years ago for a one-time project. Nobody remembers turning it on, and nobody uses it anymore — but it's still running, still discoverable on the network, and still a potential entry point.\n\nWalking the "do we use this?" test:\n\n• **Do we use this?** No — nobody has touched it in a year.\n• **Who needs it?** Nobody currently.\n• **What happens if we turn it off?** Nothing breaks; if it's ever needed again, someone can turn it back on deliberately.\n\nThis is the entire hardening logic in miniature: unused features don't earn their keep just by existing quietly. Every one you find and disable is one less thing an attacker — or even an accidental misconfiguration — can exploit.`,
        checkIn: {
          prompt: "You find a file-sharing feature enabled on a shared laptop that nobody remembers using. What should you do?",
          choices: [
            "Leave it on in case someone needs it someday",
            "Ask whether it's needed; if not, disable it to shrink the attack surface",
            "Enable even more sharing features to be thorough",
            "Delete the entire laptop's operating system",
          ],
          correctIndex: 1,
          explanation:
            "Unused services should be disabled unless someone can name a current need. This directly shrinks attack surface with minimal effort.",
        },
      },
      {
        id: "iot-hardening",
        kicker: "Before you plug in",
        title: "IoT and new devices: harden before joining the network",
        body: `Cameras, printers, smart speakers, and other **IoT (Internet of Things)** devices often ship with **published default passwords** and outdated firmware. Defenders treat new gear like a guest with a known weak lock — fix it before broad exposure.\n\n**IoT hardening order:**\n\n**1. Change defaults** — Replace factory admin passwords with unique, strong ones.\n**2. Firmware first** — Apply vendor **security updates** before joining a sensitive VLAN or school network.\n**3. Reduce remote exposure** — Disable unused remote-management features you don't need.\n**4. Then join the network** — Prefer a segmented VLAN or guest zone until the device is patched and locked down.\n\nPlugging in with factory defaults on a school VLAN is asking for automated scanners to find a device everyone on the internet already knows how to log into. Harden first, expose second.`,
        bullets: [
          "**Inventory** what's installed/running before patching or disabling.",
          "IoT: **change defaults → firmware → reduce remote exposure → join network/VLAN**.",
          "Confirm **firewall and baselines** after every patch cycle.",
        ],
        callout: {
          label: "Watch out",
          text: "Leaving every remote service enabled \"for emergencies\" creates free scanning targets. Plan access — don't leave doors open forever.",
        },
      },
      {
        id: "iot-hardening-example",
        kicker: "See it in action",
        title: "Unboxing a new smart camera the defender way",
        body: `A club receives a donated smart security camera for the equipment room. The tempting move: plug it straight into the school Wi-Fi and open the app.\n\nThe hardened order instead:\n\n1. **Change defaults** — before connecting to anything sensitive, log in locally and replace the factory admin password with a strong, unique one.\n2. **Firmware first** — check for and apply any available firmware update; older firmware may have known, publicly documented issues.\n3. **Reduce remote exposure** — turn off any "remote access from anywhere" feature unless someone specifically needs it, and disable features like UPnP port forwarding if the device tries to enable it automatically.\n4. **Then join the network** — connect it to a guest/IoT VLAN separate from devices holding sensitive club files, if that option exists; otherwise, at least isolate it from admin accounts.\n\nSkipping straight to step 4 with factory settings is exactly the pattern that lets automated internet scanners find and log into devices within hours of them going online.`,
        checkIn: {
          prompt: "What is the correct order for hardening a new IoT device before it joins a sensitive network?",
          choices: [
            "Join the network first, then worry about passwords later",
            "Change default password → apply firmware updates → reduce remote exposure → then join the network",
            "Enable every remote feature so it's easy to manage from anywhere",
            "Skip firmware updates since IoT devices rarely have vulnerabilities",
          ],
          correctIndex: 1,
          explanation:
            "Harden first, expose second: change defaults, patch firmware, and reduce remote exposure before connecting to a sensitive network.",
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
        id: "secure-defaults-example",
        kicker: "See it in action",
        title: "Two ways to launch a new shared drive",
        body: `A club creates a shared cloud drive for competition files.\n\n**Insecure-default path:** create the folder, set sharing to "anyone with the link can edit" so nobody has to ask for access, and plan to "tighten it later once things settle down."\n\n**Secure-default path:** create the folder with sharing set to "specific people only," add current members individually or via a managed group, and only widen access deliberately if a real need comes up (like sharing a single read-only file with a sponsor).\n\nThe secure-default path takes maybe two extra minutes up front. The insecure-default path risks months of "anyone with the link" exposure — including old links floating around chat history long after the deadline that justified the shortcut has passed. Notice: this is the same "later never comes" pattern that shows up across many hardening topics.`,
        checkIn: {
          prompt: "Which approach best reflects 'secure defaults' when creating a new shared drive?",
          choices: [
            "Set sharing to 'anyone with the link can edit' and plan to fix it later",
            "Start with access limited to specific known people, and widen deliberately only when needed",
            "Never share the drive with anyone, ever",
            "Give admin rights to everyone by default so nobody has to ask",
          ],
          correctIndex: 1,
          explanation:
            "Secure defaults start restrictive and widen intentionally — not the reverse. 'We'll lock it down later' rarely happens in practice.",
        },
      },
      {
        id: "vuln-prioritization",
        kicker: "You can't fix everything at once",
        title: "Prioritizing vulnerabilities: not all fixes are equally urgent",
        image: "/images/lessons/cs-11-4.png",
        imageAlt: "Sticky-note priority board sorting security fixes into urgent soon and later columns",
        body: `Real systems accumulate a backlog of known issues faster than any small team can fix them instantly. Defenders **prioritize** using a few practical questions:\n\n• **Is it exposed to the internet or just internal?** Internet-facing issues usually rank higher.\n• **Does a fix already exist?** An available, tested patch is lower-effort than a workaround.\n• **How bad is the potential impact?** A weakness that could expose the whole member database ranks above a cosmetic bug.\n• **Is it already being actively exploited elsewhere?** Widely-exploited issues jump the queue.\n\nYou don't need a perfect scoring system as a student defender — you need the habit of asking these questions instead of patching randomly or, worse, patching nothing because "there's too much to fix."`,
        bullets: [
          "Internet-facing + high impact + actively exploited = fix first.",
          "A fix that already exists is cheaper than building a workaround.",
          "Some prioritization beats none — don't let backlog size cause paralysis.",
        ],
        callout: {
          label: "Defender view",
          text: "Professional security teams use frameworks to score vulnerability severity. You don't need the exact framework — you need the habit of ranking, not randomly patching.",
        },
      },
      {
        id: "vuln-prioritization-example",
        kicker: "See it in action",
        title: "Ranking three issues in a school lab",
        body: `A school computer lab has three known issues this month:\n\n1. An internet-facing remote-login service still has last year's default admin password.\n2. A design app on lab computers has a minor visual glitch in one menu.\n3. A file-sharing tool used only on the internal lab network has a moderate vulnerability, but a vendor patch is already available and easy to apply.\n\nApplying the prioritization questions: issue 1 is internet-facing, high impact, and trivially fixable (change the password) — fix it **immediately**. Issue 3 is internal-only but has an easy, available patch — fix it **soon**, same week. Issue 2 has no meaningful security impact — it can wait or go on a general bug list, not a security backlog.\n\nNotice the order isn't "whatever we noticed first" — it's driven by exposure, impact, and fix availability.`,
        checkIn: {
          prompt: "Which issue should typically be fixed first: an internet-facing service with a default password, or an internal-only tool with a moderate bug and an available patch?",
          choices: [
            "The internal-only tool, because patches are always more urgent than passwords",
            "The internet-facing service with the default password, since it's exposed and easy to fix immediately",
            "Neither — cosmetic bugs always come first",
            "Whichever was discovered first, regardless of exposure",
          ],
          correctIndex: 1,
          explanation:
            "Internet-facing exposure with high potential impact and a trivial fix (changing a password) should jump the queue ahead of lower-exposure issues.",
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
        id: "backups-inventory-example",
        kicker: "See it in action",
        title: "The backup that almost wasn't there",
        body: `A club treasurer's laptop gets ransomware from a malicious download disguised as a "free budget template." Every file on the laptop is now encrypted by the attacker, demanding payment.\n\nBecause the club had been syncing the budget folder to cloud storage *and* someone had exported a backup copy to a separate account two weeks earlier, recovery is simple: wipe the infected laptop, restore from the clean cloud copy, change any passwords that may have been exposed, and move on.\n\nWithout that habit, the club would face a genuinely hard choice between paying criminals (never guaranteed to work, and generally discouraged) or losing months of records. The backup didn't prevent the attack — it made the attack a minor inconvenience instead of a crisis. That's the entire value proposition of backups: they don't stop bad days, they shrink them.`,
        checkIn: {
          prompt: "Ransomware encrypts a laptop's files, but a clean cloud backup from two weeks ago exists. What does the backup accomplish?",
          choices: [
            "It prevents the ransomware from ever running",
            "It turns a potential crisis into a manageable inconvenience by enabling recovery without paying attackers",
            "It automatically catches the attacker",
            "It removes the need for any future updates",
          ],
          correctIndex: 1,
          explanation:
            "Backups are a corrective control — they don't prevent incidents, but they make recovery possible without depending on attackers' cooperation.",
        },
      },
      {
        id: "change-management",
        kicker: "Change safely",
        title: "Change management: hardening without breaking things",
        image: "/images/lessons/cs-11-5.png",
        imageAlt: "Simple change request form with plan test and rollback fields on a clipboard",
        body: `Hardening involves *changing* things — disabling a service, tightening a setting, applying a patch. Changed carelessly, a "security improvement" can break something people rely on and erode trust in future hardening efforts. Defenders use lightweight **change management**:\n\n**1. Plan** — What exactly are you changing, and why?\n**2. Test if possible** — Try it on one device or a low-stakes system before rolling it out everywhere.\n**3. Communicate** — Tell affected people *before* it happens, especially if downtime is possible.\n**4. Have a rollback plan** — Know how to undo the change if something breaks.\n**5. Document it** — Note what changed, when, and who approved it.\n\nThis isn't corporate red tape for its own sake — it's the difference between "we hardened the club laptop" and "we broke the club laptop the night before a competition and nobody knew why."`,
        bullets: [
          "Plan → test → communicate → have a rollback → document.",
          "Even small teams benefit from a two-line change log.",
          "Untested changes on the only device you have are high-risk timing choices.",
        ],
        callout: {
          label: "Defender view",
          text: "The goal of change management isn't slowing everything down — it's making sure a good security intention doesn't become an unplanned outage.",
        },
      },
      {
        id: "change-management-example",
        kicker: "See it in action",
        title: "Disabling a service the right way — and the wrong way",
        body: `**The wrong way:** the night before a big event, someone notices an unused service running on the shared laptop and disables it immediately "to be safe," without checking if anything depends on it. The event's check-in software silently breaks because it turns out to rely on that service. Nobody knows why, and there's no rollback plan because nobody wrote down what changed.\n\n**The right way:** the same finding gets logged a week earlier. Someone asks around ("does anyone use this?"), tests disabling it on a spare device first, confirms nothing breaks, then disables it on the real laptop with a note: "Disabled file-sharing service on [date] — unused, confirmed no dependencies. Rollback: re-enable via Settings > Sharing if needed."\n\nSame hardening action, completely different risk profile — because of *when* and *how* it was done, not *whether* it was done.`,
        checkIn: {
          prompt: "What's the main risk of disabling a service immediately, the night before an important event, without testing?",
          choices: [
            "There is no risk — disabling unused services is always instantly safe",
            "Something unexpected might depend on it, causing a break with no time to recover and no rollback plan",
            "It will automatically create a backup first",
            "It will always improve performance with no downside",
          ],
          correctIndex: 1,
          explanation:
            "Change management — planning, testing, and having a rollback — prevents well-intentioned hardening from becoming an unplanned outage at the worst possible time.",
        },
      },
      {
        id: "checklist",
        kicker: "Put it together",
        title: "A simple hardening checklist",
        body: `Use this anytime you set up or review a device:\n\n**1. Inventory** installed software and running services.\n**2. Update** OS, browser, and key apps.\n**3. Lock** with a strong passcode/password + biometrics if available.\n**4. Enable MFA** on important accounts.\n**5. Remove** unused apps/services and leftover accounts.\n**6. Confirm firewall and secure baselines** after patching.\n**7. Check sharing defaults** — nothing public by accident.\n**8. Prioritize** any known issues by exposure and impact.\n**9. Confirm backups** for critical files, and test a restore occasionally.\n**10. Plan, test, and document** any bigger changes before rolling them out.\n**11. Record it** on your inventory list.\n\nThat's hardening in everyday life — not a Hollywood hacker scene.`,
        callout: {
          label: "Myth check",
          text: "Hardening isn't only for servers in a data center. Phones, Chromebooks, home routers, and club laptops all benefit from the same mindset.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Hardening starts with inventory** — know what's installed and running.\n• **Patching** closes known vulnerabilities — turn updates on; confirm firewall/baselines after.\n• Shrink **attack surface** by disabling unused services/apps.\n• **IoT:** change defaults, firmware first, reduce remote exposure, then join network/VLAN.\n• Prefer **secure defaults** and least privilege from day one.\n• **Prioritize** vulnerabilities by exposure, impact, and fix availability — you can't fix everything at once.\n• **Backups** + tested restores beat panic later.\n• Use lightweight **change management** so hardening doesn't break things unexpectedly.\n• Keep an **inventory** of devices and accounts.\n\nTake the **Knowledge check**, then reflect on one hardening change you'll make this week.`,
      },
    ],
  },
  bigIdeas: [
    "**Patching** closes known vulnerabilities before attackers can rely on them at scale.",
    "**Hardening** shrinks attack surface: fewer unused services, safer defaults, least privilege, and IoT devices locked down before joining a network.",
    "**Prioritizing** fixes by exposure and impact, using **change management** for bigger changes, and keeping **backups** and **inventory** make defense sustainable and recoverable.",
  ],
  keyTerms: [
    { term: "Hardening", definition: "Strengthening a system by reducing weaknesses and unnecessary exposure." },
    { term: "Patch", definition: "A vendor update that fixes a bug or security vulnerability." },
    { term: "Vulnerability", definition: "A weakness that could be abused to harm confidentiality, integrity, or availability." },
    { term: "Attack surface", definition: "All the potential entry points into a system or organization." },
    { term: "Secure defaults", definition: "Out-of-the-box settings that favor safety until intentionally changed." },
    { term: "Vulnerability prioritization", definition: "Ranking known weaknesses by exposure, impact, and fix availability to decide what to fix first." },
    { term: "Backup", definition: "A recoverable copy of important data stored separately from the original." },
    { term: "Inventory", definition: "A list of devices, systems, and accounts you are responsible for protecting." },
    { term: "Change management", definition: "Planning, testing, communicating, and documenting changes so they don't cause unplanned breakage." },
  ],
  realWorld:
    "A school club laptop still runs an outdated browser \"because updates are annoying.\" A known vulnerability in that old version is exactly the kind of soft target automated attacks look for — **patching**, a simple device **inventory**, and a habit of prioritizing fixes would have flagged it.",
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
    {
      id: "q6",
      question: "What is the correct order for hardening a new IoT device before connecting it to a sensitive network?",
      choices: [
        "Join the network first, then think about passwords later",
        "Change default password → apply firmware updates → reduce remote exposure → then join the network",
        "Enable every remote-access feature immediately for convenience",
        "Skip firmware updates since IoT devices don't need them",
      ],
      correctIndex: 1,
      explanation:
        "Harden first, expose second — factory-default IoT devices are quickly found by automated scanners if joined to a network before being locked down.",
    },
    {
      id: "q7",
      question: "An internet-facing service with a default password and an internal-only tool with a minor, low-impact bug both need attention. Which should be prioritized first?",
      choices: [
        "The internal-only tool, since patches are always most urgent",
        "The internet-facing service, since it's exposed, high-impact, and cheap to fix",
        "Neither needs prioritizing — fix whatever is easiest",
        "Whichever was discovered most recently",
      ],
      correctIndex: 1,
      explanation:
        "Prioritization weighs exposure, impact, and fix cost. An exposed, high-impact, easy fix should jump the queue.",
    },
    {
      id: "q8",
      question: "Why use change management (plan, test, communicate, rollback, document) for hardening changes?",
      choices: [
        "To slow down security work for no reason",
        "So well-intentioned changes don't cause unexpected outages, and can be undone if something breaks",
        "Because untested changes are always safe on production systems",
        "To avoid ever making any security improvements",
      ],
      correctIndex: 1,
      explanation:
        "Change management prevents good security intentions from turning into unplanned breakage, and ensures a way back if something goes wrong.",
    },
  ],
  reflection: {
    prompt:
      "Pick one device you use daily. List two hardening actions you can take this week (update, remove an unused app, enable a backup, tighten a setting) and describe how you'd test or roll back a bigger change safely.",
    placeholder: "Example: My phone — turn on auto-update and remove an old app that still has photo access. I'd test any bigger setting change on one device first…",
  },
};
