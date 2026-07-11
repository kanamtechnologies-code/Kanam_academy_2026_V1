import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson8: AILessonConfig = {
  id: "cs-8",
  title: "8. Firewalls, Ports & Secure Config",
  goal: "Explain firewalls as allow/deny filters, recognize common ports 80/443/22 as awareness, describe why default configs can be risky, and introduce network segmentation simply.",
  xpReward: 400,
  badge: "Firewall Builder",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/7",
  nextHref: "/learn/cyber/9",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-8.png",
        imageAlt: "Network firewall appliance beside a laptop firewall settings allow/deny list",
        body: `You've learned identities, malware awareness, phishing defense, credentials, access control, and network paths. Today closes the intro arc with **filters and safe defaults**.\n\nHere's our roadmap:\n\n• **Firewalls** — allow/deny filters for network traffic.\n• **Common ports** — 80, 443, and 22 as awareness (not a hands-on attack or hardening lab).\n• **Default configurations** — why \"out of the box\" can be dangerously open or weak.\n• **Network segmentation** — separating groups of systems so one compromise doesn't flood everywhere.\n• **Secure config habits** — change defaults, close what you don't need, least privilege for services.\n\nStill defensive and educational: we discuss what firewalls *are for*, not how to bypass them.`,
        callout: {
          label: "Why it matters",
          text: "A strong password on a service that should never have been reachable from the whole internet is still a weak design. Firewalls and segmentation reduce exposure.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "Filter and config vocabulary",
        body: `• **Firewall** — a security control that allows or denies network traffic based on rules.\n• **Rule (allow/deny)** — a policy line that says what traffic may pass.\n• **Port** — a service number on a host (review from last lesson).\n• **Default configuration** — the settings a product ships with before anyone hardens it.\n• **Hardening** — safely reducing unnecessary features, accounts, services, and exposures.\n• **Network segmentation** — splitting a network into zones so systems only talk when they need to.\n• **Attack surface** — the set of ways an unauthorized person might try to interact with a system; smaller is usually better.\n\nToday's theme: **shrink what is exposed**, then protect what must remain.`,
        callout: {
          label: "Pro tip",
          text: "When you hear \"firewall,\" picture a bouncer with a list: some guests enter, some don't — based on rules, not vibes.",
        },
      },
      {
        id: "firewall",
        kicker: "The filter",
        title: "Firewalls allow or deny traffic",
        image: "/images/lessons/cs-8-2.png",
        imageAlt: "Guard-gate metaphor photo: firewall filtering traffic into a school network",
        body: `A **firewall** sits in a path — on a device, a home router, or at an organization boundary — and compares traffic to **rules**:\n\n• **Allow** — this traffic may pass (for example, normal web browsing responses you requested).\n• **Deny / block** — this traffic is dropped (for example, unsolicited attempts to reach admin services from the public internet).\n\nFirewalls can filter based on ideas like:\n• direction (inbound vs outbound),\n• source/destination addresses,\n• ports/services,\n• and in more advanced products, additional context.\n\nYou don't need to write enterprise rule sets in this course. You need the defender concept: **default-deny for unneeded inbound services** is often safer than default-allow everything.\n\nHome example: many home routers include firewall-like behavior that blocks unsolicited inbound connections from the internet while still letting you browse out and receive responses.`,
        bullets: [
          "Firewall = traffic filter with rules.",
          "**Allow** what is required; **deny** what isn't.",
          "Inbound admin services from the whole internet are often high risk.",
          "Host firewalls and network firewalls can both help.",
        ],
        callout: {
          label: "Watch out",
          text: "Turning a firewall entirely off \"to make something work\" can remove a major layer of defense. Prefer fixing the specific rule or configuration with guidance — don't disable the bouncer permanently.",
        },
      },
      {
        id: "ports-awareness",
        kicker: "Door numbers to know",
        title: "Ports 80, 443, and 22 — awareness only",
        body: `Remember: **ports** help identify services. A few numbers appear constantly in cyber fundamentals:\n\n• **Port 80** — traditionally associated with **HTTP** web traffic (often unencrypted).\n• **Port 443** — traditionally associated with **HTTPS** web traffic (encrypted in transit — the lock icon era of browsing).\n• **Port 22** — commonly associated with **SSH**, a remote administration service used by IT professionals to manage systems securely *when properly controlled*.\n\nDefender takeaways (not a setup lab):\n• Prefer sites using **HTTPS (443)** for logins and personal data rather than plain **HTTP (80)** when you have the choice.\n• Remote admin services (conceptually including those on **22**) should not be casually exposed to the entire internet; access should be limited, authenticated, and monitored.\n• Knowing \"what this port usually means\" helps you understand alerts and news — it is not an invitation to probe systems.\n\nIf you ever practice networking skills, do it only on **authorized labs** and classroom environments.`,
        callout: {
          label: "Why it matters",
          text: "Security tools and logs often mention port numbers. Recognizing 443 vs an unexpected admin port helps you understand whether traffic looks normal.",
        },
      },
      {
        id: "defaults-segmentation",
        kicker: "Shrink the blast radius",
        title: "Risky defaults and simple segmentation",
        body: `**Default configurations can be risky** because products aim to be easy to set up:\n• default passwords still in place,\n• guest/admin features enabled broadly,\n• sample shares open,\n• unnecessary services listening,\n• verbose errors that leak system details.\n\n**Hardening** means changing those defaults: unique admin passwords, disable unused services, apply updates, and limit who can reach management interfaces.\n\n**Network segmentation (simple idea):** Don't put every device in one flat \"everyone can talk to everyone\" neighborhood if you can help it. Separate groups — for example, guest Wi-Fi vs family devices, or student labs vs administrative systems — so a compromised smart TV or guest laptop can't freely reach sensitive systems.\n\nAnalogy: a school may let visitors into the lobby but not the records office. Segmentation is digital hallway design.\n\nTogether, firewalls + least privilege + segmentation + secure defaults shrink **attack surface** without requiring heroics.`,
        bullets: [
          "Change default passwords and settings.",
          "Disable services you don't need.",
          "Segment networks so not every device is a neighbor.",
          "Expose only required services — prefer deny for the rest.",
        ],
        callout: {
          label: "Common misconception",
          text: "\"We'll secure it later after it works.\" Later often never comes. Safe defaults and segmentation are easier to build in early than to retrofit after an incident.",
        },
      },
      {
        id: "secure-habits",
        kicker: "Closing the intro track",
        title: "Secure configuration habits that stick",
        image: "/images/lessons/cs-8-3.png",
        imageAlt: "Checklist changing default router password and closing unused ports on a settings screen",
        body: `Bring the whole cyber intro together into a practical checklist:\n\n• **Identity** — unique credentials, MFA, no shared owner logins.\n• **Access** — least privilege and roles that match real jobs.\n• **Awareness** — phishing skepticism; don't run mystery files; update software.\n• **Path controls** — firewalls allow only what's needed; segment sensitive systems.\n• **Defaults** — change them; turn off unused features; keep admin interfaces limited.\n• **Recovery** — backups and a plan beat panic.\n• **Ethics** — authorized use only; report issues; defend, don't offend.\n\nYou've earned the arc from **Cyber Rookie** to **Firewall Builder**. These fundamentals align with Cyber.org-style intro thinking and CompTIA-style security foundations — enough vocabulary and judgment to keep learning safely.`,
        callout: {
          label: "Try this week",
          text: "On a home network you are allowed to manage (or with a parent), check whether a guest Wi-Fi network exists and whether router admin still uses a default password. Fix what you're authorized to fix — or ask for help.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Firewalls** filter traffic with **allow/deny** rules.\n• Know **80 / 443 / 22** as common service associations — awareness, not an exploit guide.\n• **Default configs** can leave doors open; **hardening** closes them.\n• **Segmentation** limits how far a problem can spread.\n• Secure systems combine identity, access control, updates, filtering, and ethics.\n\nTake the final **Knowledge check** for this lesson, then reflect on one secure-config improvement you can make in a place you're allowed to manage.`,
      },
    ],
  },
  bigIdeas: [
    "A **firewall** allows or denies traffic using rules to shrink unnecessary exposure.",
    "Common ports like **80, 443, and 22** signal services defenders should recognize and protect — not casually expose.",
    "**Secure defaults** and **network segmentation** reduce attack surface and limit blast radius.",
  ],
  keyTerms: [
    { term: "Firewall", definition: "A control that allows or denies network traffic based on security rules." },
    { term: "Allow/Deny Rule", definition: "A firewall policy entry that permits or blocks specific traffic." },
    { term: "Port 443", definition: "A common port associated with HTTPS — web traffic protected in transit." },
    { term: "Port 80", definition: "A common port associated with HTTP — traditionally unencrypted web traffic." },
    { term: "Port 22", definition: "A common port associated with SSH remote administration services." },
    { term: "Default Configuration", definition: "Factory/shipping settings that may be convenient but insecure if left unchanged." },
    { term: "Hardening", definition: "Reducing unnecessary features, services, and exposures to make a system safer." },
    { term: "Network Segmentation", definition: "Dividing networks into zones so systems only communicate when required." },
  ],
  realWorld:
    "A family enables **guest Wi-Fi** (segmentation) so visitors can't reach the home office computer, keeps the router's admin password off the default, and relies on the router **firewall** to block unsolicited inbound internet traffic.",
  quiz: [
    {
      id: "q1",
      question: "What is a firewall's core job?",
      choices: [
        "Write essays automatically",
        "Allow or deny network traffic based on rules",
        "Replace all passwords with biometrics forever",
        "Create phishing emails for training only without rules",
      ],
      correctIndex: 1,
      explanation:
        "Firewalls are filters: they permit or block traffic according to policy.",
    },
    {
      id: "q2",
      question: "Which port is commonly associated with HTTPS?",
      choices: [
        "22",
        "80",
        "443",
        "All ports mean the same service",
      ],
      correctIndex: 2,
      explanation:
        "443 is commonly associated with HTTPS. 80 is traditionally HTTP; 22 is commonly SSH.",
    },
    {
      id: "q3",
      question: "Why can default configurations be risky?",
      choices: [
        "Defaults are always illegal",
        "They may include default passwords, unnecessary open services, or overly permissive settings",
        "Defaults automatically enable MFA for every account on Earth",
        "Defaults remove all network cables",
      ],
      correctIndex: 1,
      explanation:
        "Easy setup often leaves weak passwords and extra services enabled — defenders harden these settings.",
    },
    {
      id: "q4",
      question: "What is network segmentation in simple terms?",
      choices: [
        "Putting every device on one flat network with full access to everything",
        "Separating network zones so devices only communicate when needed",
        "Deleting DNS permanently",
        "Sharing admin accounts across segments for convenience",
      ],
      correctIndex: 1,
      explanation:
        "Segmentation creates zones/boundaries so a problem in one area is less likely to reach another.",
    },
    {
      id: "q5",
      question: "A defender hears that an admin remote-management service is reachable from the entire internet. What is the best conceptual response?",
      choices: [
        "Celebrate — more exposure is always better",
        "Treat it as high risk: limit exposure with filtering/segmentation and strong authentication, following authorized IT practice",
        "Post the service details publicly so strangers can test it",
        "Disable all HTTPS immediately",
      ],
      correctIndex: 1,
      explanation:
        "Remote admin interfaces are powerful. Defenders limit who can reach them and protect them with strong auth — never invite unauthorized testing.",
    },
  ],
  reflection: {
    prompt:
      "Name one device or network you help with at home or school (with permission). What default setting, firewall idea, or segmentation step could make it safer — and who would you ask before changing anything?",
    placeholder: "Example: Our guest Wi-Fi isn't separate yet — I'd ask a parent about enabling guest network so visitors don't reach our PCs…",
  },
};
