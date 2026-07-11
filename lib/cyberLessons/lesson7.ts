import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson7: AILessonConfig = {
  id: "cs-7",
  title: "7. Networking for Defenders",
  goal: "Explain IP addresses, routers, LAN vs WAN, DNS, ports, and client-server roles conceptually, and describe why defenders care about network paths.",
  xpReward: 350,
  badge: "Net Scout",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/6",
  nextHref: "/learn/cyber/8",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Cyber defenders don't just think about passwords — they think about **paths**. Data travels through networks, and every hop is a place something can be protected… or exposed.\n\nHere's our roadmap:\n\n• **IP addresses** — numerical addresses for devices on a network.\n• **Routers** — devices that forward traffic between networks.\n• **LAN vs WAN** — local networks vs wide-area networks.\n• **DNS** — how human-friendly names become addresses.\n• **Ports** — numbered doorways to services on a device.\n• **Client-server** — who asks and who answers.\n• **Why defenders care** — spotting where risk lives along the path.\n\nThis is awareness for high-school cyber — not a networking engineering lab or attack guide.`,
        callout: {
          label: "Why it matters",
          text: "When a site won't load or a scam link looks weird, networking basics help you ask better questions: DNS? path? local Wi-Fi? remote service?",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "Network words in plain English",
        body: `• **Network** — connected devices that can exchange data.\n• **IP address** — a numeric label that helps identify a device on a network (like a street address for packets).\n• **Router** — a device that directs traffic between networks (home Wi-Fi to the internet, for example).\n• **LAN (Local Area Network)** — a network in a limited area like a home, classroom, or school building.\n• **WAN (Wide Area Network)** — a network spanning larger distances; the internet is the largest WAN most people use.\n• **DNS (Domain Name System)** — the internet's phonebook that maps names like \`example.com\` to IP addresses.\n• **Port** — a number that helps a computer deliver traffic to the right service (web, email, remote admin, etc.).\n• **Client / Server** — the requester and the responder in many network conversations.`,
        callout: {
          label: "Pro tip",
          text: "If networking jargon overwhelms you, keep the map metaphor: addresses (IP), roads (links), intersections (routers), phonebook (DNS), suite numbers (ports).",
        },
      },
      {
        id: "ip-router-lan-wan",
        kicker: "Addresses and neighborhoods",
        title: "IP addresses, routers, LAN vs WAN",
        body: `Every device that talks on a network needs a way to be found. An **IP address** is that locator. You don't need to memorize formats — just know devices use IPs so packets know where to go.\n\nYour home or school **LAN** connects nearby devices — phones, laptops, printers — often through Wi-Fi access points and a **router**. The router is the gateway that helps your LAN reach other networks.\n\nBeyond your building is the wider world: a **WAN**. The **internet** is a giant mesh of networks. When you stream a video, packets leave your LAN through your router, travel across many networks, and arrive at a remote server.\n\nDefender intuition:\n• Compromising a device on a LAN can threaten neighbors on that same local network if controls are weak.\n• Traffic leaving your LAN toward the internet crosses paths you don't fully control — which is why encryption on websites (more in secure config thinking next lesson) and careful trust decisions matter.`,
        bullets: [
          "**IP** → address for a device on a network.",
          "**Router** → forwards traffic between networks.",
          "**LAN** → local (home/school).",
          "**WAN** → wide area (including the internet).",
        ],
        callout: {
          label: "Watch out",
          text: "Public café Wi-Fi is a LAN you share with strangers. Treat sensitive logins carefully — prefer trusted networks and MFA-backed accounts.",
        },
      },
      {
        id: "dns",
        kicker: "The phonebook",
        title: "DNS turns names into numbers",
        body: `Humans remember names. Computers route with numbers. **DNS (Domain Name System)** translates a domain name you type into an IP address a computer can contact.\n\nConceptual flow:\n1. You enter a website name in a browser.\n2. Your device asks DNS (through configured resolvers) for the matching IP.\n3. With the IP, your device can request the page from a server.\n\nWhy defenders care about DNS:\n• If DNS is wrong or tampered with, you might be sent to the **wrong** IP even though the name looks familiar — a confidentiality and integrity risk.\n• Phishing sites often use lookalike domain names; reading the name carefully still matters before you trust a page.\n• Outages labeled \"the internet is down\" are sometimes really \"DNS isn't resolving names,\" while raw connectivity partially works.\n\nYou won't configure enterprise DNS here. You'll recognize that **name → address translation is a trust point** on the path.`,
        callout: {
          label: "Why it matters",
          text: "A perfect password doesn't help if you typed the right-looking name and landed on an impostor site. DNS and domain names are part of authentication in the real world — \"am I talking to who I think I am?\"",
        },
      },
      {
        id: "ports-client-server",
        kicker: "Services and conversations",
        title: "Ports and client-server (concept level)",
        body: `A single device can run many services. **Ports** are numbered endpoints that help sort traffic to the right service — think apartment numbers inside a building address.\n\nAwareness examples (not a config lab):\n• Web traffic commonly uses ports associated with HTTP/HTTPS (you'll see **80** and **443** called out next lesson).\n• Remote administration services use other well-known ports (you'll hear **22** discussed as something defenders pay attention to — not something to expose casually).\n\n**Client-server** roles:\n• Your laptop browser is often the **client** (asks).\n• The website's computer is the **server** (answers).\nMany apps hide this, but the pattern is everywhere: game client ↔ game server, email app ↔ mail server.\n\nDefenders care which services are listening on which ports because each open service is a potential doorway that must be authenticated, authorized, updated, and monitored.`,
        callout: {
          label: "Common misconception",
          text: "\"Ports\" are not physical holes in your laptop. They're software numbers used in networking. Closing risk is about controlling which services are exposed — often via firewalls (next lesson).",
        },
      },
      {
        id: "defender-paths",
        kicker: "Think like a scout",
        title: "Why defenders map network paths",
        body: `Put the pieces together into a defender's mental model:\n\n**Device (client)** → **LAN / Wi-Fi** → **Router** → **Internet (WAN)** → **DNS lookup** → **Server** on an **IP:port** → response packets back.\n\nQuestions defenders ask along that path:\n• Are we on a trusted network?\n• Is the domain legitimate?\n• Is the service supposed to be reachable from here?\n• Is traffic protected in transit when it needs to be?\n• Do logs show strange clients talking to strange ports?\n\nYou don't need to run offensive scans. You need to understand that **security controls exist at multiple hops** — passwords on accounts, permissions on servers, filters on firewalls, updates on software, and user judgment on phishing links.\n\nNetworking literacy turns \"it broke\" into \"the failure might be local Wi-Fi, DNS, the remote server, or something in between.\"`,
        bullets: [
          "Map the path: client → LAN → router → WAN → server.",
          "DNS is a trust and availability point.",
          "Ports identify services that must be protected.",
          "Defenders place controls at multiple hops.",
        ],
        callout: {
          label: "Try this week",
          text: "When a page fails to load, narrate the path out loud: device, Wi-Fi/LAN, router, internet, DNS, remote server. Guess which hop failed — then check simple fixes (Wi-Fi, retry, different network).",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **IP addresses** locate devices; **routers** connect networks.\n• **LAN** is local; **WAN** spans wide areas (internet).\n• **DNS** maps names to IPs — a key trust point.\n• **Ports** target services; **clients** ask and **servers** answer.\n• Defenders care about the whole **path**, not just the endpoint password.\n\nNext: firewalls, common ports as awareness, secure defaults, and simple segmentation.\n\nTake the **Knowledge check**, then reflect on a time a network path failed in your life.`,
      },
    ],
  },
  bigIdeas: [
    "Networks move data using **IPs**, **routers**, and **LAN/WAN** boundaries.",
    "**DNS** maps names to addresses; **ports** direct traffic to services in a **client-server** exchange.",
    "Defenders think in **paths** — each hop is a place to protect Availability, Integrity, and Confidentiality.",
  ],
  keyTerms: [
    { term: "IP Address", definition: "A numeric identifier that helps locate a device on a network." },
    { term: "Router", definition: "A device that forwards data between different networks." },
    { term: "LAN", definition: "Local Area Network — a network in a limited area like a home or school." },
    { term: "WAN", definition: "Wide Area Network — a network spanning large distances; the internet is a major example." },
    { term: "DNS", definition: "Domain Name System — maps human-friendly domain names to IP addresses." },
    { term: "Port", definition: "A number that helps deliver network traffic to a specific service on a device." },
    { term: "Client", definition: "The device or program that requests data or services." },
    { term: "Server", definition: "The device or program that responds to client requests." },
  ],
  realWorld:
    "Opening a homework portal: your **client** asks **DNS** for the site's **IP**, traffic leaves your **LAN** through a **router** onto the **WAN**, and a **server** answers on a service **port** — usually a secure web service.",
  quiz: [
    {
      id: "q1",
      question: "What is the main job of DNS?",
      choices: [
        "Charge your laptop battery",
        "Map domain names to IP addresses",
        "Encrypt passwords with salt automatically",
        "Replace the need for routers",
      ],
      correctIndex: 1,
      explanation:
        "DNS is the phonebook that turns names people type into IP addresses computers use.",
    },
    {
      id: "q2",
      question: "Which statement best describes a LAN?",
      choices: [
        "A network limited to a local area like a home or school",
        "Only satellites in space",
        "A type of phishing email",
        "A password hashing algorithm",
      ],
      correctIndex: 0,
      explanation:
        "LAN means Local Area Network — nearby devices sharing a local network.",
    },
    {
      id: "q3",
      question: "What does a router commonly do in a home network?",
      choices: [
        "Print essays",
        "Forward traffic between your local network and other networks like the internet",
        "Write malware signatures by hand",
        "Authenticate every social media post globally",
      ],
      correctIndex: 1,
      explanation:
        "Routers direct traffic between networks — typically your LAN and your ISP/internet path.",
    },
    {
      id: "q4",
      question: "In a typical web visit, your browser is acting as the:",
      choices: [
        "Server only",
        "Client requesting resources",
        "DNS root of the entire internet",
        "WAN cable itself",
      ],
      correctIndex: 1,
      explanation:
        "Browsers request pages — classic client role — while web servers respond.",
    },
    {
      id: "q5",
      question: "Why do defenders care about ports conceptually?",
      choices: [
        "Ports are decorative stickers on laptops",
        "Each service listening on a port is a potential doorway that must be protected and monitored",
        "Ports eliminate the need for authentication",
        "Ports only exist on paper quizzes",
      ],
      correctIndex: 1,
      explanation:
        "Ports identify services. Exposed services need updates, access control, and often firewall filtering.",
    },
  ],
  reflection: {
    prompt:
      "Describe a recent time something \"wouldn't connect.\" Using lesson words (LAN, router, DNS, client/server), guess which part of the path might have been the problem and why.",
    placeholder: "Example: My phone had Wi-Fi bars but no sites loaded — maybe DNS or the path beyond the router, because other LAN features still seemed fine…",
  },
};
