import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson11: AILessonConfig = {
  id: "cs-11",
  title: "11. System Hardening & Patching",
  goal: "Recommend hardening and patching actions by feasibility and ethics; explain tradeoffs such as uptime vs timely patching and usability vs lockdown; and justify prioritization, change management, and recovery plans for school/club systems.",
  xpReward: 550,
  badge: "Hardener",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/10",
  nextHref: "/learn/cyber/12",
  instructorScript: `**Coach's note**
Today's lesson: **System Hardening & Patching**.

**Goal:** Recommend hardening and patching actions by feasibility and ethics; explain tradeoffs such as uptime vs timely patching and usability vs lockdown; and justify prioritization, change management, and recovery plans for school/club systems.

**How to facilitate**
1. Warm-up: ask students what they already think about "What you'll learn today".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~25–30 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-11.png",
        imageAlt: "Laptop installing security updates with a progress bar and a phone awaiting updates",
        body: `Attackers love soft targets: outdated software, leftover services nobody uses, and devices with no backup plan. **Hardening** is recommending tougher configurations *before* something goes wrong — and justifying the tradeoffs when uptime, usability, or ethics constrain the ideal fix.\n\nHere's our roadmap:\n\n• **Patching tradeoffs** — uptime vs timely updates; when \"pause\" is ethical and when it isn't.\n• **Shrink attack surface** — disable unused services with a rollback plan.\n• **IoT hardening order** — feasible steps before joining a network.\n• **Usability vs lockdown** — secure defaults that people will actually keep.\n• **Prioritize by exposure, impact, feasibility, and ethics**.\n• **Backups & inventory** — recovery when prevention fails.\n• **Change management** — harden without becoming the outage.\n\nNo exploit recipes — recommendations you can defend to a sponsor or IT lead.`,
        callout: {
          label: "Why it matters",
          text: "Most breaches exploit known, fixable weaknesses. The hard skill is recommending a feasible fix order when you can't patch everything tonight.",
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
        body: `When researchers or vendors find a **vulnerability**, they usually release a **patch**. Attackers also learn about many of those weaknesses. Running old software is like leaving a broken lock on the door after the locksmith already mailed you a replacement.\n\n**Hardening starts with inventory** — know what is installed and running before you patch or disable anything.\n\n**Tradeoff: uptime/availability vs patching.** A club livestream laptop mid-competition cannot reboot for an OS update without breaking the event. An ethical recommendation is not \"never patch\" — it's **time-box the delay**: finish the event, then patch/restart the same day, and avoid leaving \"pause updates\" on for months. For always-on school services, recommend a maintenance window with communication rather than silent indefinite deferral.\n\nDefender habits: auto-updates for OS/browsers when feasible; restart when asked; follow IT on shared devices; never chase fake \"update\" pop-ups.\n\nPatching is high-ROI defense — **recommending when** to take the reboot is the Level 3 skill.`,
        bullets: [
          "Known vulnerabilities get exploited at scale — delay has a cost.",
          "Short, justified maintenance windows beat indefinite \"pause.\"",
          "Browsers and OS updates remain priority #1 for most personal devices.",
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
            "None — pausing updates has no security effect” belongs to a different situation than the one in the question stem",
            "It has accumulated known, publicly documented vulnerabilities that attackers can target",
            "Pausing updates automatically enables a firewall instead” belongs to a different situation than the one in the question stem",
            "The laptop will run faster forever” belongs to a different situation than the one in the question stem",
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
            "Enable even more sharing features to be thorough” belongs to a different situation than the one in the question stem",
            "Ask whether it's needed; if not, disable it to shrink the attack surface",
            "Leave it on in case someone needs it someday” belongs to a different situation than the one in the question stem",
            "Delete the entire laptop's operating system” belongs to a different situation than the one in the question stem",
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
            "Skip firmware updates since IoT devices rarely have vulnerabilities” belongs to a different situation than the one in the question stem",
            "Enable every remote feature so it's easy to manage from anywhere” belongs to a different situation than the one in the question stem",
            "Join the network first, then worry about passwords later” belongs to a different situation than the one in the question stem",
            "Change default password → apply firmware updates → reduce remote exposure → then join the network",
          ],
          correctIndex: 3,
          explanation:
            "Harden first, expose second: change defaults, patch firmware, and reduce remote exposure before connecting to a sensitive network.",
        },
      },
      {
        id: "secure-defaults",
        kicker: "Start safe",
        title: "Secure defaults beat last-minute lockdowns",
        body: `**Secure defaults** means systems arrive (or get configured) already leaning toward safety:\n\n• Strong authentication required, not optional.\n• Admin rights limited to people who need them.\n• Encryption on by default where available.\n• Verbose public sharing off until someone intentionally enables it.\n\n**Tradeoff: usability vs lockdown.** Extreme lockdown (no sharing, admin on one locked laptop nobody else can use) can push people into shadow workarounds — personal USB sticks, \"temp\" public links, shared passwords on sticky notes — which is an ethics and feasibility failure. Recommend **least privilege people will keep**: specific-people sharing, MFA on admins, a documented exception process for sponsors — not a fortress that the team immediately dismantles.\n\nWhen you set up anything new, spend five minutes on security settings *before* you invite the world in — and design defaults the group can live with.`,
        callout: {
          label: "Common misconception",
          text: "\"We'll lock it down later after we finish setup.\" Later often never comes. Configure safe defaults first — and make them usable enough to stick.",
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
            "Never share the drive with anyone, ever” belongs to a different situation than the one in the question stem",
            "Set sharing to 'anyone with the link can edit' and plan to fix it later” belongs to a different situation than the one in the question stem",
            "Start with access limited to specific known people, and widen deliberately only when needed",
            "Give admin rights to everyone by default so nobody has to ask” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 2,
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
        body: `Real systems accumulate a backlog of known issues faster than any small team can fix them instantly. **Recommend a fix order** using exposure, impact, feasibility, and ethics:\n\n• **Exposure** — Internet-facing usually ranks above internal-only.\n• **Impact** — Member PII / admin access beats a cosmetic glitch.\n• **Feasibility** — An available, tested patch or password change beats a custom rewrite you can't finish this week.\n• **Ethics** — Don't hide a known internet-facing default password because \"competition week is busy\"; time-box a delay with a same-day remediation plan, or escalate to a sponsor/IT. Deliberately leaving students exposed without disclosure is not an acceptable tradeoff.\n• **Active exploitation elsewhere** — Widely exploited issues jump the queue.\n\nSome prioritization beats paralysis. Your recommendation should name *what* you fix first and *why* the delay on the rest is justified.`,
        bullets: [
          "Internet-facing + high impact + easy fix = recommend first.",
          "Feasibility matters — recommend the patch you can actually ship.",
          "Ethical delays are short, communicated, and scheduled — not silent and indefinite.",
        ],
        callout: {
          label: "Defender view",
          text: "You don't need a perfect scoring framework — you need a justified ranking you can explain to a sponsor or IT lead.",
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
            "The internal-only tool, because patches are always more urgent than passwords” belongs to a different situation than the one in the question stem",
            "The internet-facing service with the default password, since it's exposed and easy to fix immediately",
            "Whichever was discovered first, regardless of exposure” belongs to a different situation than the one in the question stem",
            "“Neither — cosmetic bugs always come first” describes a different situation than the one in the question stem",
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
            "“It prevents the ransomware from ever running” describes a different situation than the one in the question stem",
            "“It removes the need for any future updates” describes a different situation than the one in the question stem",
            "“It automatically catches the attacker” describes a different situation than the one in the question stem",
            "It turns a potential crisis into a manageable inconvenience by enabling recovery without paying attackers",
          ],
          correctIndex: 3,
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
        body: `Hardening involves *changing* things — disabling a service, tightening a setting, applying a patch. Changed carelessly, a "security improvement" can break something people rely on and erode trust in future hardening efforts. Defenders use lightweight **change management**:\n\n**1. Plan** — What exactly are you changing, and why?\n**2. Test if possible** — Try it on one device or a low-stakes system before rolling it out everywhere.\n**3. Communicate** — Tell affected people *before* it happens, especially if downtime is possible.\n**4. Have a rollback plan** — Know how to undo the change if something breaks.\n**5. Document it** — Note what changed, when, and who approved it.\n\n**Tradeoff again:** perfect process vs feasible process. For a shared club laptop, a two-line note and a five-minute test on a spare device is enough. Skipping all of that the night before an event to \"be safe\" often creates the worse outage — recommend delaying non-urgent lockdowns until after the event *and* scheduling the change.`,
        bullets: [
          "Plan → test → communicate → have a rollback → document.",
          "Feasible change management for small teams: a short note beats nothing.",
          "Timing is part of the recommendation — urgency of the vuln vs cost of downtime.",
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
            "It will always improve performance with no downside” belongs to a different situation than the one in the question stem",
            "There is no risk — disabling unused services is always instantly safe” belongs to a different situation than the one in the question stem",
            "“It will automatically create a backup first” describes a different situation than the one in the question stem",
            "Something unexpected might depend on it, causing a break with no time to recover and no rollback plan",
          ],
          correctIndex: 3,
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
        id: "patch-priorities",
        kicker: "Decision checklist",
        title: "Patch priorities when everything says \"update available\"",
        body: `Not every update feels equally urgent. Defenders triage:

**Patch today (or enable auto-update):**
• Operating system security updates.
• Browser updates.
• Apps that handle logins, payments, or file sync.

**Patch this week:**
• Productivity tools and communication apps.
• Router firmware if vendor notes security fixes.

**Review monthly:**
• IoT devices, infrequently used apps, club-shared laptops sitting in a closet.

**Comparison — delay costs:**
• **OS/browser delay** — known public exploits may already target the hole.
• **IoT delay** — device becomes silent botnet member or network entry point.
• **"I'll restart later" delay** — postpones fixes that only apply after reboot.

Hardening is maintenance, not a one-time project. Calendar reminders beat good intentions.`,
        callout: {
          label: "Try this week",
          text: "Pick one device you have been postponing updates on. Enable auto-update or schedule a restart tonight.",
        },
      },
      {
        id: "backup-verify",
        kicker: "Scenario walkthrough",
        title: "Verifying backups before you need them",
        body: `**Scenario:** The media club backs up final projects to cloud storage every Friday. Ransomware hits a laptop on Tuesday. They discover the backup folder was empty — uploads failed silently for three weeks.

**Defender walkthrough:**
1. **3-2-1 mindset** — three copies, two media types, one off-site (cloud counts off-site).
2. **Test restore** — monthly, actually open one file from backup on a different device.
3. **Monitor failures** — alert if sync errors appear; empty folders are a signal.
4. **Versioning** — cloud tools with version history help recover from ransomware that encrypts synced files.
5. **Separate credentials** — backup account protected with MFA, not same password as daily login.

**What to do next after ransomware:** contain (disconnect), report, restore from known-good backup — do not pay on impulse; involve trusted adults and IT.`,
      },
      {
        id: "hardening-myths",
        kicker: "Myth check",
        title: "Hardening myths that leave gaps",
        body: `• **"New device = secure device."** Factory defaults often include default passwords and extra services — harden on day one.
• **"Antivirus means I can skip updates."** AV does not replace patching known vulnerabilities.
• **"Backups in the cloud are automatic forever."** Sync failures, account lockouts, and ransomware targeting synced folders happen — verify restores.
• **"We are too small to harden."** Small clubs are soft targets with valuable sponsor lists and social reach.

Hardening is choosing fewer doorways, keeping them patched, and proving you can recover — not buying the most expensive tool.`,
        bullets: [
          "Unbox → change defaults → update → backup → review quarterly.",
          "Test restores, not just uploads.",
          "Inventory who admins each device.",
        ],
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Recommend** hardening from **inventory** — you can't fix what you haven't listed.\n• **Tradeoff: uptime vs patching** — time-box delays; don't leave \"pause updates\" forever.\n• **Tradeoff: usability vs lockdown** — secure defaults people will keep beat fortresses they bypass.\n• Shrink **attack surface**; harden **IoT** before joining a network.\n• **Prioritize** by exposure, impact, feasibility, and ethics.\n• **Change management** + **backups/inventory** make hardening sustainable and recoverable.\n\nTake the **Knowledge check**, then justify a hardening recommendation with tradeoffs.`,
      },
    ],
  },
  bigIdeas: [
    "**Recommend patching** with an explicit uptime tradeoff: short, scheduled delays beat indefinite pause.",
    "**Hardening** shrinks attack surface and prefers secure defaults — balanced against usability so people don't invent unsafe workarounds.",
    "**Prioritize** by exposure, impact, feasibility, and ethics; use **change management**, **backups**, and **inventory** so defense stays recoverable.",
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
      question: "A livestream laptop cannot reboot during a 3-hour competition, but a critical OS security update is waiting. Which recommendation best handles the uptime vs patching tradeoff?",
      choices: [
            "“Skip the event's security needs entirely and reboot mid-stream” describes a different situation than the one in the question stem",
            "Leave updates paused indefinitely after the event ends — security can wait forever” belongs to a different situation than the one in the question stem",
            "Time-box the delay: finish the event, then patch/restart the same day and re-enable auto-update — don't leave pause on for months",
            "Install random \"updater\" software from a pop-up so you avoid the official reboot” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Short, justified maintenance delays can be ethical; indefinite pause is not. Recommend a same-day catch-up after the availability window.",
    },
    {
      id: "q2",
      question: "Why disable unused services or uninstall unused apps?",
      choices: [
            "To free up storage space, which is the real security benefit",
            "To shrink the attack surface — fewer things that can be abused",
            "So that automatic backups will stop running” belongs to a different situation than the one in the question stem",
            "Because every unused app already contains malware” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "Every unused service or app is potential exposure. Reducing them is classic hardening — the storage savings are a side effect, not the point.",
    },
    {
      id: "q3",
      question: "A club wants \"maximum lockdown\" on a shared drive: no sharing tools at all, one admin who is often offline. Members start emailing files to personal accounts. What is the best usability vs lockdown recommendation?",
      choices: [
            "A common mix-up is to treat switch to anyone-with-the-link edit access so nobody complains as enough, which confuses a nearby idea with the right one",
            "A common mix-up is to treat give every member full admin rights by default for convenience as enough, which confuses a nearby idea with the right one",
            "Recommend least privilege people will keep: specific-people sharing, MFA on admins, and a documented way to request access — so members don't invent unsafe channels",
            "It can seem like keep the fortress settings — shadow workarounds are the members' problem, but that reading skips the distinction this question is testing",
          ],
      correctIndex: 2,
      explanation:
        "Extreme lockdown that drives unsafe workarounds fails ethically and practically. Feasible secure defaults beat unusable fortresses.",
    },
    {
      id: "q4",
      question: "What makes a backup actually useful in an incident?",
      choices: [
        "You once thought about setting up a backup, even if it was never tested",
        "The backup is stored only on the same infected laptop",
        "The backup replaces the need for patching entirely",
        "You can successfully restore the files you need",
      ],
      correctIndex: 3,
      explanation:
        "Untested or inaccessible backups fail when you need them. Restorability is the point — and backups complement patching, not replace it.",
    },
    {
      id: "q5",
      question: "Why keep a device/account inventory for a club or family?",
      choices: [
            "Only large corporations are allowed to keep device lists” belongs to a different situation than the one in the question stem",
            "So you know what exists to patch, lock, wipe, or revoke when people leave",
            "So you can forget about updates entirely” belongs to a different situation than the one in the question stem",
            "Inventories replace the need for encryption” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "You can't protect, update, or decommission what you don't realize you own.",
    },
    {
      id: "q6",
      question: "What is the correct order for hardening a new IoT device before connecting it to a sensitive network?",
      choices: [
            "Skip firmware updates since IoT devices don't need them” belongs to a different situation than the one in the question stem",
            "Join the network first, then think about passwords later” belongs to a different situation than the one in the question stem",
            "Change default password → apply firmware updates → reduce remote exposure → then join the network",
            "Enable every remote-access feature immediately for convenience” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Harden first, expose second — factory-default IoT devices are quickly found by automated scanners if joined to a network before being locked down.",
    },
    {
      id: "q7",
      question: "An internet-facing lab service still has a default admin password during \"busy week,\" and an internal tool has a minor low-impact bug. Which prioritized recommendation is most justified?",
      choices: [
            "A common mix-up is to treat whichever issue was discovered most recently as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "Change the internet-facing default password immediately (high exposure, high impact, highly feasible); schedule the internal patch soon — don't silently leave students exposed",
            "A common mix-up is to treat fix the internal tool first because patches always outrank passwords as enough, which confuses a nearby idea with the right one once the deciding rule is named clearly",
            "A common mix-up is to treat ignore both until summer break — busy weeks excuse indefinite risk as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
          ],
      correctIndex: 1,
      explanation:
        "Prioritize by exposure, impact, feasibility, and ethics. An exposed default password is a cheap, urgent fix — busy week is not an ethical blank check.",
    },
    {
      id: "q8",
      question: "Someone wants to disable an unused service on the only event laptop the night before check-in software is needed. What change-management recommendation fits?",
      choices: [
            "A common mix-up is to treat factory-reset the laptop instead for a clean slate as enough, which confuses a nearby idea with the right one",
            "It can seem like disable change management forever so hardening stays fast, but that reading skips the distinction this question is testing",
            "Defer the non-urgent hardening until after the event, then plan/test/document with a rollback — don't trade a maybe-risk for a certain outage tonight",
            "It can seem like disable it immediately with no test — unused means zero risk, but that reading skips the distinction this question is testing",
          ],
      correctIndex: 2,
      explanation:
        "Timing is part of the recommendation. Change management prevents well-intentioned hardening from becoming an unplanned outage at the worst moment.",
    },
  ],
  reflection: {
    prompt:
      "Your club has: (1) a livestream laptop that cannot reboot during events, (2) a shared drive currently set to anyone-with-the-link, and (3) a donated IoT camera still on factory defaults. Recommend an ordered hardening plan for the next two weeks. Justify each priority using exposure/impact/feasibility/ethics, and explicitly address the uptime vs patching and usability vs lockdown tradeoffs.",
    placeholder: "Example: First I'd… because… Uptime tradeoff: … Usability tradeoff: … Then…",
  },
};
