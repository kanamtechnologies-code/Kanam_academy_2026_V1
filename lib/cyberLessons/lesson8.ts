import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson8: AILessonConfig = {
  id: "cs-8",
  title: "8. Firewalls, Ports & Secure Config",
  goal: "Explain firewall purpose and default-deny thinking, recognize risky default configurations, and describe basic network segmentation and secure-by-default habits.",
  xpReward: 400,
  badge: "Firewall Builder",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/7",
  nextHref: "/learn/cyber/9",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-8.png",
        imageAlt: "Firewall icon between a home network and the internet with a default-deny gate illustration",
        body: `Last lesson mapped how traffic travels. Today we look at **who decides what's allowed to pass** — and why "secure by default" beats "secure it later."\n\nHere's our roadmap:\n\n• **Firewalls** — rule-based gatekeepers for network traffic.\n• **Default-deny vs. default-allow** — which starting posture is safer, and why.\n• **Risky default configurations** — exposed admin panels, unused services, factory passwords.\n• **Segmentation** — splitting networks so a breach in one area doesn't reach everything.\n• **A worked example, a myth, and a mini case** — practicing secure-config thinking on a realistic scenario.\n• **Secure-by-default habits** — checklist you can actually use.\n\nThis is defender awareness — not a guide to bypassing firewalls or scanning networks.`,
        callout: {
          label: "Why it matters",
          text: "Most exposed-service incidents in the news aren't exotic hacks — they're services left open with default settings nobody got around to locking down.",
        },
      },
      {
        id: "hook-story",
        kicker: "A quick story",
        title: "The \"just for testing\" server that stayed exposed",
        body: `A school's robotics team sets up a small web server to host their project documentation, so mentors and judges can review it before a competition. To save time before the deadline, one student enables remote admin access on the server "just for this week" so the team can quickly fix bugs from home, and leaves the factory-default admin password in place — planning to change it and turn off remote access "right after the competition."\n\nThe competition ends. Nobody remembers the temporary remote-admin setting. Months later, the school's IT department runs a routine review and discovers the server has been reachable from the open internet the entire time, with the same default password still active — and unknown login attempts in the logs going back weeks.\n\nNothing catastrophic happened this time. But the sentence "we'll secure it later" is exactly the gap this lesson is built to close — because "later" quietly became "months," and the default password never changed.`,
        callout: {
          label: "Notice",
          text: "Nobody in this story did anything obviously careless in the moment. Each individual shortcut felt small and temporary — the risk came from the accumulation, not a single dramatic mistake.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Firewall and config vocabulary",
        body: `• **Firewall** — a system that filters network traffic based on rules (allow/deny by address, port, or other criteria).\n• **Default-deny** — a posture that blocks everything by default, then allows only specific, approved traffic.\n• **Default-allow** — a posture that allows everything by default, then blocks specific known-bad traffic; generally considered weaker.\n• **Default credentials** — factory-set usernames/passwords (like admin/admin) that ship with many devices and services.\n• **Segmentation** — dividing a network into smaller zones so a problem in one zone is contained.\n• **Attack surface** — the total set of points where an unauthorized user could try to interact with a system; fewer exposed services generally means a smaller surface.\n• **Secure by default** — designing or configuring systems so the safest option is what happens automatically, without extra effort.`,
        callout: {
          label: "Pro tip",
          text: "\"Attack surface\" isn't about attacking — it's a defender's way of asking \"how many doors and windows does this system actually have open?\"",
        },
      },
      {
        id: "concept-1",
        kicker: "The gatekeeper",
        title: "What a firewall actually does",
        image: "/images/lessons/cs-8-2.png",
        imageAlt: "Firewall rule table showing allow and deny entries for specific ports and addresses",
        body: `A **firewall** inspects traffic and decides, based on configured rules, what's allowed through and what's blocked. You can think of it like a building's front desk with a visitor list: some people are on the list and waved through, everyone else is stopped and questioned (or turned away).\n\nFirewalls exist at different levels:\n• **Network firewalls** — protect a whole network (e.g., a home router's built-in firewall, or a school's perimeter firewall).\n• **Host-based firewalls** — protect a single device, filtering what that specific computer sends/receives.\n\nRules are typically built around things like: which addresses are allowed, which ports/services are reachable, and in which direction (inbound vs. outbound).\n\nThis lesson stays at the concept level — you're learning *why* these rules exist and what good defaults look like, not how to write firewall rule syntax or probe for open ports.`,
        bullets: [
          "Firewalls filter traffic using **allow/deny rules**.",
          "They exist at the **network level** and the **host level**.",
          "Rules commonly consider **address, port, and direction**.",
        ],
        callout: {
          label: "Watch out",
          text: "A firewall isn't \"set and forget.\" Rules created for a temporary need (like the robotics server's remote admin access) need a matching plan to remove them later.",
        },
        checkIn: {
          prompt: "In the robotics team's story, what specifically increased the server's exposure to the open internet?",
          choices: [
            "Hosting documentation for judges to review",
            "Enabling remote admin access with default credentials, intended to be temporary but never removed",
            "Using a firewall at all",
            "Competing in a robotics competition",
          ],
          correctIndex: 1,
          explanation:
            "The documentation hosting itself wasn't the core problem — the temporary remote-admin access with default credentials, left in place, created the lasting exposure.",
        },
      },
      {
        id: "concept-2",
        kicker: "Which way should the gate default?",
        title: "Default-deny vs. default-allow",
        body: `This is one of the most important ideas in defensive security: **which way should a system lean when a rule hasn't been explicitly written?**\n\n**Default-deny:** Block everything by default; only allow specific, approved, necessary traffic. If someone forgets to write a rule, the safe outcome is "blocked," not "wide open."\n\n**Default-allow:** Allow everything by default; only block specific known-bad traffic. If someone forgets to write a rule, the outcome is "reachable," which is far riskier — especially against threats nobody has identified yet.\n\nDefenders generally strongly prefer **default-deny** because it fails safely: gaps in configuration produce *more* restriction, not *less*. Default-allow fails in the opposite, more dangerous direction — gaps produce *more* exposure.\n\nApplied to the robotics story: if the server's remote admin access had defaulted to closed unless someone explicitly and consciously opened it (with a plan to close it again), the "temporary" exception would have been far more visible and far less likely to be forgotten for months.`,
        callout: {
          label: "Common misconception",
          text: "\"We'll secure it later, it's just temporary\" quietly assumes default-allow thinking — leaving things open until someone remembers to close them. Default-deny flips that assumption.",
        },
        checkIn: {
          prompt: "Why do defenders generally prefer default-deny over default-allow?",
          choices: [
            "Default-deny is always faster for legitimate traffic",
            "Default-deny fails safely — a forgotten or missing rule results in traffic being blocked, not exposed",
            "Default-allow blocks 100% of malicious traffic automatically",
            "Default-deny requires no configuration at all",
          ],
          correctIndex: 1,
          explanation:
            "With default-deny, mistakes and gaps in configuration lean toward restriction. With default-allow, the same mistakes lean toward exposure — a much riskier failure direction.",
        },
      },
      {
        id: "concept-3",
        kicker: "Shipped-in weaknesses",
        title: "Risky default configurations",
        image: "/images/lessons/cs-8-3.png",
        imageAlt: "Router admin login screen showing username admin and password admin highlighted as a risky default",
        body: `Many devices and services ship with settings chosen for **easy setup**, not for security. Common risky defaults defenders watch for:\n\n• **Default credentials** — factory usernames/passwords (like admin/admin) that are publicly documented and widely known; if never changed, they're not really a secret at all.\n• **Unused services left running** — a device might ship with remote management, file sharing, or other services enabled that a particular user never actually needs.\n• **Overly permissive default rules** — some devices default to allowing broad inbound access "for convenience," trusting the user to lock it down later — which, as the robotics story shows, often doesn't happen.\n• **Unpatched/outdated firmware** — devices set up once and never updated can carry known, publicly documented weaknesses indefinitely.\n\nThe defender fix in every case is the same pattern: **change default credentials immediately, disable services you don't need, and prefer configurations that start locked down rather than started open.**`,
        callout: {
          label: "Why it matters",
          text: "Default credentials aren't really \"credentials\" in any meaningful sense once they're publicly documented — they're an open door with a sign on it.",
        },
        checkIn: {
          prompt: "The robotics team's server still had its factory-default admin password when IT found it months later. What is the core problem with that?",
          choices: [
            "Default passwords are always extremely long and secure",
            "A default password is typically well-known/documented, so it doesn't function as a real secret protecting the account",
            "Default passwords automatically expire after one week",
            "Default passwords only exist on smartphones",
          ],
          correctIndex: 1,
          explanation:
            "Default credentials are commonly published in manuals or online, so relying on them is close to having no password-based protection at all.",
        },
      },
      {
        id: "worked-example",
        kicker: "Step by step",
        title: "Fixing the robotics team's exposed server",
        body: `Let's use the robotics team's story as a hands-on-paper remediation exercise.\n\n**Step 1 — Confirm what's actually needed.** The real goal was hosting documentation for mentors and judges to view — that likely only requires a basic read-only web service, not remote admin access from anywhere on the internet.\n\n**Step 2 — Change the default credentials immediately.** Even before anything else, the factory-default admin password must be replaced with something unique and strong (echoing Lesson 5's password lesson).\n\n**Step 3 — Disable remote admin access from the open internet.** If team members need to make changes remotely, a safer pattern is a locked-down connection method (like requiring access from trusted addresses only), not a wide-open admin panel reachable by anyone.\n\n**Step 4 — Apply default-deny thinking going forward.** Configure the server so that new services or ports are blocked by default, and only opened deliberately, with a plan for when they'll be closed again.\n\n**Step 5 — Set a removal reminder for anything temporary.** The original plan was "turn it off after the competition" — but with no reminder or owner, that plan silently failed. A calendar reminder tied to a specific person would have caught this in days, not months.\n\nNotice how this mirrors the access-control lifecycle from Lesson 6: temporary access (or in this case, a temporary open service) needs an expiration plan, not just good intentions.`,
        checkIn: {
          prompt: "Which step in the remediation most directly addresses why the 'temporary' remote access was never removed?",
          choices: [
            "Step 2 — changing the default credentials",
            "Step 5 — setting a removal reminder tied to a specific person",
            "Step 1 — confirming what's actually needed",
            "None of the steps address this",
          ],
          correctIndex: 1,
          explanation:
            "The root cause of the months-long exposure was that nobody was responsible for remembering to close the temporary access — a reminder tied to an owner directly fixes that gap.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "\"We'll secure it later, it's just temporary\"",
        body: `This phrase shows up constantly in real incidents, and it's rarely said carelessly — it usually reflects genuine time pressure (a competition deadline, a launch date, a busy week). The problem isn't the intention; it's that "temporary" configurations have no natural expiration unless someone builds one in.\n\nOnce a "temporary" open service works and nothing bad happens right away, there's little visible pressure to go back and lock it down — it quietly becomes permanent by default, exactly like it did for the robotics team.\n\nThe more accurate mental model: **anything opened "temporarily" needs an explicit plan and owner for closing it again** — a calendar reminder, a ticket, a specific person's name attached to it — or it should be assumed to become permanent. "I'll remember" is not a plan.`,
        callout: {
          label: "Reframe it",
          text: "Instead of \"we'll secure it later,\" try: \"we're opening this temporarily, and here's exactly who is responsible for closing it, and by when.\"",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Try it yourself: a two-minute exposure audit",
        body: `Think about a device or account you or your family controls that could have default or leftover settings — a home router, a smart device, an old club/team tool, a server or app you've set up.\n\n1. **Did it come with default credentials?** Do you actually know whether they've been changed?\n2. **Is anything enabled "just in case" or "for convenience"** that you don't actually use regularly — remote access, an old service, a broad sharing setting?\n3. **Is there anything "temporary" from months ago** that never actually got closed down, the way the robotics team's remote access didn't?\n\nYou don't need to fix everything today — but naming a specific gap (even just to yourself, or to whoever manages that device) is exactly the defender instinct this lesson is building.`,
        callout: {
          label: "Keep it real",
          text: "Home routers are a great place to start: many still use factory admin passwords years after setup, without anyone ever checking.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Going deeper",
        title: "Segmentation — containing the next incident",
        image: "/images/lessons/cs-8-4.png",
        imageAlt: "Network diagram showing separate segments for guest Wi-Fi, staff devices, and servers with firewalls between them",
        body: `Even with great defaults, incidents still happen. **Segmentation** is the practice of dividing a network into smaller zones, so that a problem in one zone doesn't automatically spread to every other zone.\n\nCommon segmentation patterns:\n• **Guest Wi-Fi vs. staff/internal network** — visitors' devices shouldn't be able to reach staff file servers or internal admin tools, even if a guest device is compromised.\n• **Student devices vs. school administrative systems** — a compromised student laptop shouldn't have a direct path to gradebook or HR systems.\n• **Public-facing servers vs. internal databases** — a server that talks to the internet is placed separately from sensitive internal systems, so that if the public server is compromised, the attacker doesn't automatically reach everything behind it.\n\nSegmentation is essentially the network-level version of least privilege from Lesson 6: instead of one flat network where everything can reach everything, you create boundaries so that access matches actual need — and a single failure stays contained instead of cascading.\n\nApplied to the robotics story: if the documentation server had been segmented away from any systems containing sensitive school data, the exposure — while still a real problem — would have had a much smaller potential blast radius.`,
        bullets: [
          "Segmentation limits how far a single compromise can spread.",
          "Guest networks should be isolated from internal/sensitive systems.",
          "Public-facing servers shouldn't sit next to sensitive internal databases.",
          "Segmentation mirrors least privilege, applied at the network level.",
        ],
        callout: {
          label: "Defender view",
          text: "Ask: \"if this one device or service were compromised right now, what else could it reach?\" Segmentation is the practice of making that answer as small as possible.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Comparing security postures",
        body: `Two comparisons worth having clearly in mind from this lesson:\n\n**Default-allow vs. default-deny:**\n• Default-allow starts open; forgotten rules mean *more* exposure.\n• Default-deny starts closed; forgotten rules mean *more* restriction (a safer failure direction).\n\n**Flat network vs. segmented network:**\n• A flat network treats every device as equally trusted — one compromised device can potentially reach everything else.\n• A segmented network divides devices into zones matched to their actual trust level and purpose — a compromised device in one zone is contained away from more sensitive zones.\n\nBoth comparisons share the same underlying theme: security postures that **fail safely** (default-deny, segmentation) are consistently preferred over postures that **fail open** (default-allow, flat networks) — because mistakes and unknowns are inevitable, and the question is simply which direction they fail in.`,
        checkIn: {
          prompt: "What do default-deny and network segmentation have in common as defensive strategies?",
          choices: [
            "Both make systems completely immune to any incident",
            "Both are designed to fail safely — limiting exposure or spread when something is missed or goes wrong",
            "Both require disabling all firewalls",
            "Both only apply to home Wi-Fi networks",
          ],
          correctIndex: 1,
          explanation:
            "Default-deny limits exposure from missing rules; segmentation limits how far a compromise can spread. Both accept that mistakes happen and aim to fail in the safer direction.",
        },
      },
      {
        id: "defender-trap-or-myth",
        kicker: "Don't fall for this",
        title: "The trap: \"just this once, for convenience\"",
        body: `A close cousin of "we'll secure it later" is the moment-by-moment decision to expose something "just this once" — opening remote admin access for a busy week, disabling a firewall rule to quickly test something, using a shared default password because setting up individual ones feels like it'll take too long right now.\n\nThe trap is that each of these decisions is individually reasonable under time pressure, and nothing bad happens immediately — which quietly teaches the wrong lesson: "that shortcut was fine." Over enough repetitions, across enough systems, some of those shortcuts inevitably get forgotten and become permanent, exactly like the robotics team's server.\n\nThe fix isn't "never take shortcuts under deadline pressure" — that's not realistic. It's building the habit from the deeper-skill section: **any shortcut that opens something up gets a specific owner and a specific closing date**, written down somewhere, not just held in someone's memory.`,
        callout: {
          label: "Watch out",
          text: "If a security shortcut doesn't have a name and a date attached to closing it, assume it will become permanent — because in practice, it usually does.",
        },
      },
      {
        id: "habits",
        kicker: "Bring it together",
        title: "Secure-by-default habits worth building",
        body: `A practical checklist from this lesson, in priority order:\n\n• **Change default credentials immediately** on any new device or service — before it ever goes live.\n• **Disable services you don't actually use** — fewer running services means a smaller attack surface.\n• **Default to closed, open deliberately** — apply default-deny thinking even to small personal projects and club tools.\n• **Attach an owner and a closing date to anything temporary** — "just for this week" needs a real plan, not just good intentions.\n• **Separate sensitive systems from public-facing or guest-accessible ones** — segmentation contains problems instead of letting them spread.\n\nNone of these require deep technical expertise — they require the discipline to treat "temporary" and "just this once" with the same seriousness as permanent decisions, because in practice, that's often exactly what they become.`,
        callout: {
          label: "Try this week",
          text: "Check one device you control (router, smart device, old club tool) for a default password that was never changed — and change it if you find one.",
        },
      },
      {
        id: "standards-connect",
        kicker: "Where this fits",
        title: "How this connects to real standards",
        body: `This lesson connects to recognized standards in a direct way:\n\n• **CSTA 3A-NI-08** (Networks and the Internet) asks students to describe tradeoffs of various security measures, including things like firewalls and cryptographic approaches, and how they affect users and network availability — exactly the default-deny/default-allow and segmentation tradeoffs covered today.\n• **CSTA 3A-NI-06** (Networks and the Internet) asks students to recommend security measures to protect networks based on feasibility and impact — the robotics team's remediation plan (change credentials, disable remote access, add segmentation) is that recommendation process in action.\n• **ISTE Digital Citizen (1.2c)** connects to managing digital security responsibly — configuring shared systems (like a club server) with the same seriousness as personal accounts.\n\nFirewalls and configuration might sound like purely technical IT topics, but the reasoning underneath — weighing tradeoffs, recommending proportionate protections, failing safely — is exactly the kind of defender judgment these standards are built to develop.`,
        callout: {
          label: "Why it matters",
          text: "\"Which failure direction is safer?\" is a question that shows up far beyond networking — it's a genuinely transferable way of evaluating any system with unknowns.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and reflect",
        title: "Quick gut-check before you continue",
        body: `Before the mini case and knowledge check: think honestly about a "just this once, temporary" shortcut you or a group you're part of has taken with some system, account, or setting. Does it have a real closing date and an owner — or has it quietly become permanent, the way the robotics team's remote access did?`,
      },
      {
        id: "mini-case",
        kicker: "Case file",
        title: "Mini case: the smart camera nobody reconfigured",
        image: "/images/lessons/cs-8-5.png",
        imageAlt: "Smart security camera app screen showing factory default login credentials still active after a year",
        body: `**The situation:** A family sets up a smart security camera to watch their front porch, following the quick-start guide that gets it working in minutes. The guide mentions changing the default password "for better security," but the family is focused on just getting the camera running before a trip, and plans to come back and update the settings "once things settle down."\n\nA year later, a relative helping set up a second camera notices the first camera is still using its factory-default login, exactly as installed — and that it's configured to allow remote viewing from anywhere on the internet, a setting that made initial setup convenient but was never revisited afterward.\n\n**Apply what you've learned:**\n\n• **Risky default:** The factory-default credentials were never changed — a well-known category of risky default from this lesson, no different in principle from the robotics team's server.\n• **Default-allow thinking:** The camera's out-of-the-box configuration favored easy remote access over safety by default — a real-world example of default-allow rather than default-deny.\n• **The "later" trap:** "Once things settle down" had no owner or date attached — exactly the pattern from the defender-trap section that turns temporary gaps into permanent ones.\n• **Fix going forward:** Change the default password immediately, review whether remote access from anywhere is actually needed, and — since this is a home network — consider whether guest devices and smart home devices should sit on a separate segment from personal computers.\n\nThis case shows that risky defaults aren't limited to servers and school systems — the exact same patterns apply to ordinary smart home devices, which is exactly why "secure by default" matters for everyone, not just IT departments.`,
      },
      {
        id: "check-yourself",
        kicker: "Before you go",
        title: "Check yourself",
        body: `Quick self-check: can you explain why default-deny is safer than default-allow in your own words? Can you name at least three risky default configurations from this lesson? If yes, you're ready for the knowledge check.`,
        checkIn: {
          prompt: "What do the robotics team's server and the family's smart camera have in common as cases in this lesson?",
          choices: [
            "Both were deliberately hacked by a skilled attacker",
            "Both involved a risky default (credentials or open access) combined with a 'we'll fix it later' plan that had no real owner or date",
            "Both cases involved malware being installed intentionally",
            "Neither case had anything to do with default settings",
          ],
          correctIndex: 1,
          explanation:
            "Both incidents trace back to unchanged risky defaults plus a vague, undated plan to fix things later — the exact pattern this lesson focuses on preventing.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Firewalls** filter traffic with allow/deny rules at the network or host level.\n• **Default-deny** (block by default, allow deliberately) fails safely; **default-allow** fails toward exposure.\n• **Risky defaults** — default credentials, unused services, overly permissive rules, outdated firmware — need to be fixed immediately, not eventually.\n• **Segmentation** contains a compromise instead of letting it spread across an entire network.\n• Anything opened **"temporarily"** needs a named owner and a closing date, or it tends to become permanent.\n\nYou've now completed the technical core of this track: threats, credentials, access control, networking, and configuration. Later lessons build on these foundations with more advanced defender scenarios.\n\nTake the **Knowledge check**, then reflect on one default setting you'll go check this week.`,
      },
    ],
  },
  bigIdeas: [
    "**Firewalls** filter traffic by rule; **default-deny** fails safely while **default-allow** fails toward exposure.",
    "**Risky defaults** (factory credentials, unused services, permissive rules) are a leading, avoidable source of real incidents.",
    "**Segmentation** contains a compromise, mirroring least privilege at the network level.",
  ],
  keyTerms: [
    { term: "Firewall", definition: "A system that filters network traffic using allow/deny rules." },
    { term: "Default-deny", definition: "A security posture that blocks everything unless explicitly allowed." },
    { term: "Default-allow", definition: "A security posture that allows everything unless explicitly blocked." },
    { term: "Default credentials", definition: "Factory-set usernames/passwords shipped with a device or service." },
    { term: "Segmentation", definition: "Dividing a network into zones so a compromise in one zone doesn't spread to others." },
    { term: "Attack surface", definition: "The total set of exposed points where an unauthorized user could try to interact with a system." },
    { term: "Secure by default", definition: "Designing systems so the safest configuration happens automatically, without extra effort." },
  ],
  realWorld:
    "A smart camera left on its factory-default password with remote access enabled is a small-scale version of the same risky-default problem that leads to real exposed-server incidents in the news.",
  quiz: [
    {
      id: "q1",
      question: "What does a firewall fundamentally do?",
      choices: [
        "Physically blocks fire from spreading between buildings",
        "Filters network traffic based on configured allow/deny rules",
        "Automatically hashes every password on the network",
        "Deletes malware files permanently",
      ],
      correctIndex: 1,
      explanation:
        "Firewalls inspect and filter traffic according to defined rules, deciding what's allowed through.",
    },
    {
      id: "q2",
      question: "Why is default-deny generally safer than default-allow?",
      choices: [
        "Default-deny is always faster for every user",
        "A missing or forgotten rule under default-deny results in blocked traffic, not exposure",
        "Default-allow blocks all unknown threats automatically",
        "Default-deny requires no setup at all",
      ],
      correctIndex: 1,
      explanation:
        "Default-deny fails toward restriction when something is missed; default-allow fails toward exposure.",
    },
    {
      id: "q3",
      question: "Which of these is a classic risky default configuration?",
      choices: [
        "Changing factory admin credentials right after setup",
        "Leaving factory-default admin credentials unchanged on a live device",
        "Disabling services you don't use",
        "Segmenting guest Wi-Fi from internal systems",
      ],
      correctIndex: 1,
      explanation:
        "Unchanged default credentials are widely documented and effectively not secret — a common real-world risk.",
    },
    {
      id: "q4",
      question: "What is the main purpose of network segmentation?",
      choices: [
        "To make every device equally reachable from every other device",
        "To divide a network into zones so a compromise in one zone doesn't automatically spread to others",
        "To eliminate the need for firewalls",
        "To guarantee zero incidents will ever occur",
      ],
      correctIndex: 1,
      explanation:
        "Segmentation contains the impact of a compromise, similar to least privilege but applied at the network level.",
    },
    {
      id: "q5",
      question: "In the robotics team's story, what was the deeper process failure behind the exposed server?",
      choices: [
        "The team used a firewall at all",
        "A 'temporary' shortcut (remote access + default password) had no owner or closing date, so it quietly became permanent",
        "The server hosted public documentation",
        "The team changed their default credentials too quickly",
      ],
      correctIndex: 1,
      explanation:
        "The core failure was a temporary exception with no assigned owner or deadline for closing it — not the initial decision itself.",
    },
    {
      id: "q6",
      question: "Why doesn't 'we'll secure it later' work well as a plan on its own?",
      choices: [
        "Because it's technically impossible to secure anything later",
        "Because without a specific owner and date, 'later' has no natural trigger and tends to never happen",
        "Because security only matters during initial setup",
        "Because firewalls automatically expire after one week",
      ],
      correctIndex: 1,
      explanation:
        "Vague future intentions without an owner or deadline routinely fail to happen — as shown in both mini cases in this lesson.",
    },
    {
      id: "q7",
      question: "What do default-deny and network segmentation have in common?",
      choices: [
        "Both guarantee that no incident can ever occur",
        "Both are designed to fail safely — limiting exposure or spread when something is missed",
        "Both require turning off all firewalls",
        "Both are unrelated concepts with nothing in common",
      ],
      correctIndex: 1,
      explanation:
        "Both accept that mistakes and unknowns happen, and are designed so those failures lean toward restriction/containment rather than exposure/spread.",
    },
    {
      id: "q8",
      question: "Why does CSTA's Networks and the Internet standard ask students to describe tradeoffs of security measures like firewalls, rather than just define what a firewall is?",
      choices: [
        "Because tradeoffs don't actually exist in real security decisions",
        "Because real configuration decisions require weighing security against usability and availability — like choosing default-deny while still allowing needed traffic",
        "Because firewalls have no effect on network availability",
        "Because this level of reasoning only applies to professional network engineers",
      ],
      correctIndex: 1,
      explanation:
        "Meaningful security literacy means being able to weigh real tradeoffs (like the robotics team choosing what remote access was actually necessary), not just recite definitions.",
    },
  ],
  reflection: {
    prompt:
      "Think of a device, account, or system you or your family controls. Does it still use any default settings (like a factory password) that were never changed? What's your plan — with a specific date — to fix it?",
    placeholder: "Example: Our home router still might have its factory admin password — I'll check and change it this weekend, and also see if guest Wi-Fi is separated from our other devices…",
  },
};
