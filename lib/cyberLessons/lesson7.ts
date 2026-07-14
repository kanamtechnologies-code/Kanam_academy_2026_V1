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
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-7.png",
        imageAlt: "Home router, laptop, and phone on a desk with simple LAN cables suggesting a network",
        body: `Cyber defenders don't just think about passwords — they think about **paths**. Data travels through networks, and every hop is a place something can be protected… or exposed.\n\nHere's our roadmap:\n\n• **IP addresses** — numerical addresses for devices on a network.\n• **Routers** — devices that forward traffic between networks.\n• **LAN vs WAN** — local networks vs wide-area networks.\n• **DNS** — how human-friendly names become addresses.\n• **Ports** — numbered doorways to services on a device.\n• **Client-server** — who asks and who answers.\n• **A worked example, a myth, and a mini case** — practicing the path model on realistic \"why won't this load?\" moments.\n• **Why defenders care** — spotting where risk lives along the path.\n\nThis is awareness for high-school cyber — not a networking engineering lab or attack guide.`,
        callout: {
          label: "Why it matters",
          text: "When a site won't load or a scam link looks weird, networking basics help you ask better questions: DNS? path? local Wi-Fi? remote service?",
        },
      },
      {
        id: "hook-story",
        kicker: "A quick story",
        title: "The library Wi-Fi that \"isn't working\"",
        body: `During a study session at the public library, Nate's laptop shows full Wi-Fi bars, but nothing will load — not the school portal, not search, nothing. He tells the librarian "the internet is down," and she says, a little too calmly, "Try typing a raw address instead of the name and see what happens."\n\nNate tries it — and a page actually loads when he types a numeric address directly, even though typing the normal website name still fails completely. That's strange: if the internet were truly "down," *nothing* should load, numeric address or not.\n\nBy the end of this lesson, you'll be able to explain exactly why Nate's laptop could reach a numeric address but not a name — and why that specific pattern points defenders toward one particular part of the network path, rather than a total outage.`,
        callout: {
          label: "Notice",
          text: "\"The internet is down\" is often imprecise. Nate's situation was actually a specific, narrower problem — and naming it correctly is the whole point of this lesson.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Network words in plain English",
        body: `• **Network** — connected devices that can exchange data.\n• **IP address** — a numeric label that helps identify a device on a network (like a street address for packets).\n• **Router** — a device that directs traffic between networks (home Wi-Fi to the internet, for example).\n• **LAN (Local Area Network)** — a network in a limited area like a home, classroom, or school building.\n• **WAN (Wide Area Network)** — a network spanning larger distances; the internet is the largest WAN most people use.\n• **DNS (Domain Name System)** — the internet's phonebook that maps names like \`example.com\` to IP addresses.\n• **Port** — a number that helps a computer deliver traffic to the right service (web, email, remote admin, etc.).\n• **Client / Server** — the requester and the responder in many network conversations.`,
        callout: {
          label: "Pro tip",
          text: "If networking jargon overwhelms you, keep the map metaphor: addresses (IP), roads (links), intersections (routers), phonebook (DNS), suite numbers (ports).",
        },
      },
      {
        id: "concept-1",
        kicker: "Addresses and neighborhoods",
        title: "IP addresses, routers, LAN vs WAN",
        image: "/images/lessons/cs-7-2.png",
        imageAlt: "Diagram-style photo props: LAN inside home, WAN cloud beyond the router",
        body: `Every device that talks on a network needs a way to be found. An **IP address** is that locator. You don't need to memorize formats — just know devices use IPs so packets know where to go.\n\n**Private vs public IPs:** Ranges like **192.168.x.x** (and similar private ranges) are used **inside** local networks. They are **not globally routable** on the public internet — your home router uses **NAT (Network Address Translation)** to let many private devices share one public address outward. That means 192.168.1.5 in your house is not the same as 192.168.1.5 in someone else's house.\n\nYour home or school **LAN** connects nearby devices — phones, laptops, printers — often through Wi-Fi access points and a **router**. The router is the gateway that helps your LAN reach other networks.\n\nBeyond your building is the wider world: a **WAN**. The **internet** is a giant mesh of networks. When you stream a video, packets leave your LAN through your router, cross **firewalls and NAT boundaries**, and arrive at a remote server.\n\nDefender intuition:\n• Compromising a device on a LAN can threaten neighbors on that same local network if controls are weak.\n• Traffic leaving your LAN toward the internet crosses paths you don't fully control — which is why encryption on websites and careful trust decisions matter.\n• **Logs at hops** (router, firewall, server) help defenders reconstruct who talked to whom.`,
        bullets: [
          "**Private IPs** (e.g. 192.168.x.x) stay local — not globally unique on the internet.",
          "**Router + NAT + firewalls** sit in the path between LAN and WAN.",
          "**LAN** → local (home/school). **WAN** → wide area (including the internet).",
        ],
        callout: {
          label: "Watch out",
          text: "Public café Wi-Fi is a LAN you share with strangers. Treat sensitive logins carefully — prefer trusted networks and MFA-backed accounts.",
        },
        checkIn: {
          prompt: "Nate's laptop was connected to the library's Wi-Fi. That Wi-Fi network itself is best described as a:",
          choices: ["WAN", "LAN", "DNS server", "Port"],
          correctIndex: 1,
          explanation:
            "The library's local Wi-Fi network is a LAN — a network limited to that building, connected to the wider internet (WAN) through a router.",
        },
      },
      {
        id: "concept-2",
        kicker: "The phonebook",
        title: "DNS turns names into numbers",
        body: `Humans remember names. Computers route with numbers. **DNS (Domain Name System)** translates a domain name you type into an IP address a computer can contact.\n\nConceptual flow:\n1. You enter a website name in a browser.\n2. Your device asks DNS (through configured resolvers) for the matching IP.\n3. With the IP, your device can request the page from a server.\n\n**DNS triage tip:** If users can open sites by **raw IP** but **not by name**, and basic connectivity (like ping to a known address) still works, suspect **DNS / name resolution** first — not the firewall for web traffic. Check resolver settings and **resolver logs** briefly after a fix to confirm recovery.\n\nWhy defenders care about DNS:\n• If DNS is wrong or tampered with, you might be sent to the **wrong** IP even though the name looks familiar — a confidentiality and integrity risk.\n• Phishing sites often use lookalike domain names; reading the name carefully still matters before you trust a page.\n• Outages labeled "the internet is down" are sometimes really "DNS isn't resolving names," while raw connectivity partially works.\n\nYou won't configure enterprise DNS here. You'll recognize that **name → address translation is a trust point** on the path.`,
        callout: {
          label: "Why it matters",
          text: "A perfect password doesn't help if you typed the right-looking name and landed on an impostor site. DNS and domain names are part of authentication in the real world — \"am I talking to who I think I am?\"",
        },
        checkIn: {
          prompt: "Nate could load a page using a raw numeric address but not by typing the website's name. What does that pattern most strongly suggest?",
          choices: [
            "A total internet outage with nothing reachable at all",
            "A likely DNS / name-resolution problem, since raw connectivity still worked",
            "A broken keyboard",
            "A firewall blocking every single website",
          ],
          correctIndex: 1,
          explanation:
            "\"IP works, name fails\" is the classic DNS triage signal — the network path is fine, but name-to-address translation isn't completing.",
        },
      },
      {
        id: "concept-3",
        kicker: "Services and conversations",
        title: "Ports and client-server (concept level)",
        body: `A single device can run many services. **Ports** are numbered endpoints that help sort traffic to the right service — think apartment numbers inside a building address.\n\nAwareness examples (not a config lab):\n• Web traffic commonly uses ports associated with HTTP/HTTPS (you'll see **80** and **443** called out next lesson).\n• Remote administration services use other well-known ports (you'll hear **22** discussed as something defenders pay attention to — not something to expose casually).\n\n**Client-server** roles:\n• Your laptop browser is often the **client** (asks).\n• The website's computer is the **server** (answers).\nMany apps hide this, but the pattern is everywhere: game client ↔ game server, email app ↔ mail server.\n\nDefenders care which services are listening on which ports because each open service is a potential doorway that must be authenticated, authorized, updated, and monitored.`,
        callout: {
          label: "Common misconception",
          text: "\"Ports\" are not physical holes in your laptop. They're software numbers used in networking. Closing risk is about controlling which services are exposed — often via firewalls (next lesson).",
        },
        checkIn: {
          prompt: "When Nate's browser requests a web page from a library server, which role does his browser play?",
          choices: ["Server", "Client", "Router", "DNS resolver"],
          correctIndex: 1,
          explanation:
            "The browser is the client — it initiates the request. The remote website's computer is the server that responds.",
        },
      },
      {
        id: "worked-example",
        kicker: "Step by step",
        title: "Diagnosing Nate's library Wi-Fi like a defender",
        body: `Let's formally walk through Nate's situation using the path model.\n\n**Step 1 — Confirm the symptom.** Full Wi-Fi bars (LAN connection looks fine), typed website name fails, but a raw numeric IP address loads successfully.\n\n**Step 2 — Rule out total outage.** If nothing at all loaded — not even a raw IP — that would suggest a deeper path or connectivity issue (LAN, router, or the WAN link itself). That's not what happened here.\n\n**Step 3 — Apply the DNS triage rule.** "IP works, name fails" points squarely at **DNS / name resolution** — the library's resolver isn't successfully translating names to addresses, even though the rest of the path (LAN → router → WAN → server) is working.\n\n**Step 4 — Recommend next steps.** IT staff would check the library's configured DNS resolver settings, and briefly review resolver logs after any fix to confirm names start resolving again.\n\n**Step 5 — Communicate clearly.** Instead of telling the librarian "the internet is down," Nate can now say: "It looks like a DNS issue — I can reach sites by IP address but not by name." That sentence alone would likely save an IT staffer real troubleshooting time.\n\nThis is the core defender skill of this lesson: turning a vague complaint into a specific, path-based diagnosis.`,
        checkIn: {
          prompt: "Why does Step 2 (ruling out total outage) matter before jumping to a DNS conclusion?",
          choices: [
            "It doesn't matter — you should always assume DNS first",
            "Because if raw IPs also failed to load, the problem would more likely be earlier in the path (LAN/router/WAN), not DNS specifically",
            "Because DNS problems always mean the router is broken",
            "Because total outages are impossible on library Wi-Fi",
          ],
          correctIndex: 1,
          explanation:
            "Confirming that at least raw connectivity works helps narrow the problem specifically to name resolution, rather than a broader path failure.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "\"Wi-Fi bars mean the internet works\"",
        body: `Full Wi-Fi signal bars only tell you that your device has a good local radio connection to the **access point** — the very first hop in a much longer path. They say nothing about whether the router is working, whether the WAN connection beyond it is up, or whether DNS is resolving names correctly.\n\nThis is exactly why Nate's situation felt confusing: strong bars, but broken names. The bars measured the LAN connection, which was fine. The actual problem was further along the path, at the DNS step.\n\nThe accurate mental model: connectivity is a **chain of hops** (device → LAN → router → WAN → DNS → server), and any single hop can fail while the others work perfectly. "Full bars" only confirms the very first link in that chain.`,
        callout: {
          label: "Reframe it",
          text: "Instead of \"my Wi-Fi bars are full, so the problem must be the website,\" try: \"my Wi-Fi bars only tell me about the first hop — let me check where in the path things actually break.\"",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Try it yourself: narrate a connectivity failure",
        body: `Think of a real time something "wouldn't connect" for you — a game that couldn't reach its server, a video call that failed, a site that wouldn't load.\n\nUsing this lesson's vocabulary, narrate what likely happened, step by step:\n\n1. **Device** — was your device itself connected to Wi-Fi/LAN at all?\n2. **Router** — did other devices on the same network also have trouble, suggesting a router-level issue?\n3. **WAN** — could you reach *some* things but not others, suggesting the problem was further out?\n4. **DNS** — did names fail while raw addresses (if you could test) might have worked?\n5. **Server** — could the *specific* remote service have been down, unrelated to your network at all?\n\nYou probably can't run a full diagnostic without more information — but just naming a plausible hop, instead of saying "the internet was broken," is the actual skill this lesson is building.`,
        callout: {
          label: "Keep it real",
          text: "If you genuinely don't know which hop failed, that's fine — \"probably the router or the remote server, not my device\" is still a much more useful statement than \"everything was broken.\"",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Think like a scout",
        title: "Going deeper: why defenders map network paths",
        image: "/images/lessons/cs-7-4.png",
        imageAlt: "Whiteboard sketch of packets traveling client to DNS to server with defender checkpoints and a VPN tunnel icon",
        body: `Put the pieces together into a defender's mental model:\n\n**Device (client)** → **LAN / Wi-Fi** → **Router** → **NAT / firewalls** → **Internet (WAN)** → **DNS lookup** → **Server** on an **IP:port** → response packets back.\n\nQuestions defenders ask along that path:\n• Are we on a trusted network?\n• Is the domain legitimate?\n• Is the service supposed to be reachable from here?\n• Is traffic protected in transit when it needs to be?\n• Do **logs at hops** show strange clients talking to strange ports?\n\n**VPN awareness:** A **VPN** protects the tunnel between you and the VPN endpoint — it does **not** automatically make every website trustworthy. You still need HTTPS, careful domain checks, and MFA. A VPN on café Wi-Fi helps; trusting a sketchy download site because "I'm on VPN" does not.\n\nYou don't need to run offensive scans. You need to understand that **security controls exist at multiple hops** — passwords on accounts, permissions on servers, filters on firewalls, updates on software, and user judgment on phishing links.\n\nNetworking literacy turns "it broke" into "the failure might be local Wi-Fi, DNS, the remote server, or something in between."`,
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
        id: "comparison",
        kicker: "Side by side",
        title: "Comparing LAN, WAN, and VPN scope",
        body: `These three terms are easy to blur together — a quick comparison of what each one actually covers:\n\n• **LAN** — a network limited to one physical area (a home, a library, a school building). Devices on the same LAN can often reach each other directly.\n• **WAN** — a network spanning wide distances, connecting many separate LANs together; the internet is the largest example most people use daily.\n• **VPN** — not a physical network at all, but an encrypted **tunnel** layered on top of whatever network you're actually using (LAN or WAN). It protects the connection between you and the VPN's endpoint, but the destination website is still just as trustworthy (or untrustworthy) as it was before.\n\nThe key distinction: LAN and WAN describe *where* a network physically/logically reaches. A VPN describes *how protected* your traffic is along part of that path — it doesn't erase the LAN/WAN structure underneath it.`,
        checkIn: {
          prompt: "Which statement correctly describes what a VPN actually protects?",
          choices: [
            "It makes every website you visit automatically trustworthy",
            "It protects the tunnel between your device and the VPN endpoint, but doesn't guarantee the destination site is safe",
            "It replaces the need for DNS entirely",
            "It converts a WAN into a LAN",
          ],
          correctIndex: 1,
          explanation:
            "A VPN encrypts and protects your connection to its endpoint. You still need HTTPS, domain checks, and good judgment about the destination itself.",
        },
      },
      {
        id: "defender-trap-or-myth",
        kicker: "Don't fall for this",
        title: "The trap: \"I'm on a VPN, so this download is safe\"",
        body: `A dangerous trap that mixes up two different kinds of protection: confusing "my connection is encrypted" with "the thing I'm downloading is trustworthy."\n\nImagine someone on a VPN downloading a "free" tool from an unfamiliar site (echoing the malware lesson's story). The VPN genuinely does protect that traffic from casual eavesdropping on the local network — but it says absolutely nothing about whether the file itself is safe, or whether the site is run by someone trustworthy.\n\nThe trap works because VPN branding often uses words like "secure" and "protected," which can bleed into a general feeling of "I'm safe now" that doesn't actually apply to every kind of risk.\n\nThe fix: keep VPN protection and destination trustworthiness as two completely separate questions. A VPN answers "is my connection to this endpoint protected from eavesdropping?" It does not answer "should I trust this website or download?"`,
        callout: {
          label: "Watch out",
          text: "\"I'm on VPN\" is a reasonable answer to \"is my café Wi-Fi traffic protected?\" It is not a reasonable answer to \"should I trust this random download site?\"",
        },
      },
      {
        id: "habits",
        kicker: "Bring it together",
        title: "Habits that build networking literacy",
        body: `Practical habits from today's lesson:\n\n• **Narrate the path** when something fails to load, instead of saying "the internet is broken."\n• **Try a raw IP address** (when reasonable) to check whether the issue is DNS-specific vs. a broader outage.\n• **Treat VPN and destination trust as separate questions** — a VPN protects the tunnel, not the website at the other end.\n• **Read domain names carefully**, since DNS and lookalike domains are trust points attackers target.\n• **Report clearly** — "IP works, name fails" is far more useful to IT than "nothing works."\n\nYou don't need to become a network engineer. You need enough vocabulary to describe problems precisely — which is exactly what turns you from someone who says "it's broken" into someone defenders can actually work with.`,
        callout: {
          label: "Why it matters",
          text: "Clear, path-aware descriptions of a problem often get it solved faster than any technical fix you could attempt yourself.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and reflect",
        title: "Quick gut-check before you continue",
        body: `Before the mini case and knowledge check: the next time something "won't connect" for you, will you default back to "the internet is down," or will you try narrating the path — device, LAN, router, WAN, DNS, server — the way Nate eventually did? No need to answer out loud, just notice your honest instinct.`,
      },
      {
        id: "mini-case",
        kicker: "Case file",
        title: "Mini case: the school-wide \"outage\" that wasn't",
        image: "/images/lessons/cs-7-5.png",
        imageAlt: "School IT helpdesk screen showing a DNS resolver status alert while some sites still load by IP address",
        body: `**The situation:** One Tuesday morning, students across the school report that "the whole internet is down." The help desk is flooded with tickets. But a closer look reveals something odd: students can still successfully join video calls that were already running, and one tech-savvy teacher notices that typing a raw IP address for the school's own file server still works — while typing almost any website name fails.\n\n**Apply what you've learned:**\n\n• **Symptom pattern:** "Raw IP works, names fail" is the exact DNS triage signal from this lesson — not a full network or WAN outage.\n• **Why some things still worked:** Already-connected video calls didn't need a fresh name lookup mid-call, which is why they kept running even as new name-based connections failed.\n• **Root cause (likely):** The school's DNS resolver service had an issue — possibly overloaded, misconfigured, or temporarily unreachable — while the LAN, router, and WAN connection to the internet were otherwise fine.\n• **Fix and confirmation:** IT restarts or reconfigures the DNS resolver, then checks resolver logs briefly afterward to confirm that name lookups are succeeding again before declaring the issue resolved.\n\nThis case shows why "everything is down" tickets are often less specific — and less accurate — than a report like "sites load by IP but not by name," which points defenders straight to the right hop.`,
      },
      {
        id: "connectivity-triage",
        kicker: "Decision checklist",
        title: "Connectivity triage: what to try before \"it's all broken\"",
        body: `Before opening a vague help ticket, run this defender-friendly triage:

**1. Scope** — Is it one site, one app, or everything?
**2. Device** — Does another device on the same network work?
**3. Name vs number** — Does a raw IP or alternate DNS test change the result?
**4. Path narration** — Can you say where it fails: device, LAN, router, WAN, DNS, server?
**5. Recent change** — New VPN, new Wi-Fi, VPN just turned off, software update?

**What to report to IT:**
• "One site fails, others work" vs "nothing resolves by name."
• "IP address works, domain name does not" → strong DNS signal.
• Time started and what you already tried.

**Comparison — vague vs useful reports:**
• Vague: "Wi-Fi is broken."
• Useful: "Connected to GuestWiFi; google.com fails; 8.8.8.8 works; started after lunch."

Useful reports get solved faster — even from students who are not network engineers.`,
        callout: {
          label: "Pro tip",
          text: "If only one site fails, suspect that site or your DNS path — not necessarily the entire internet.",
        },
      },
      {
        id: "dns-walkthrough",
        kicker: "Scenario walkthrough",
        title: "Walking a DNS failure like Nate did",
        body: `**Scenario:** Nate needs a research article before class. library.edu will not load, but the campus file server IP still opens, and classmates on cellular data can reach the site fine.

**Step 1 — Narrow the fault:** His device + school Wi-Fi + name-based lookups are failing together. Cellular works → problem is likely local network or DNS, not the remote server dying globally.

**Step 2 — Test DNS specifically:** IT suggests trying a known resolver or IP test. When the IP works but the name does not, DNS moves to the top of the suspect list.

**Step 3 — Report precisely:** "library.edu fails on school Wi-Fi; IP works; cellular works" gives IT a DNS-shaped ticket, not a generic outage flood.

**Step 4 — Safe workaround:** Use cellular for the urgent task if policy allows, while IT fixes resolver service — not a permanent habit, but a conscious tradeoff.

**Step 5 — After fix:** Confirm name lookups work again before closing the ticket.

This is defender networking: observe, narrow, report, confirm — without touching systems you are not authorized to change.`,
      },
      {
        id: "network-trust",
        kicker: "Myth check",
        title: "Network trust myths worth retiring",
        body: `A few beliefs cause risky choices on real networks:

• **"School Wi-Fi is automatically safe because it's school Wi-Fi."** Shared networks still require HTTPS, MFA, and caution about sensitive logins — other compromised devices may share the LAN.
• **"VPN replaces HTTPS."** VPN protects the tunnel to its endpoint; it does not prove the website at the other end is honest.
• **"If the icon shows full bars, security is fine."** Signal strength measures radio connection, not trustworthiness of peers on the network.
• **"Guest networks are always isolated."** Isolation depends on configuration — assume less access is safer and still use HTTPS.

Defender habit: treat **network choice** and **destination trust** as separate decisions every time you log in somewhere important.`,
        bullets: [
          "Bars ≠ security.",
          "VPN ≠ site trust.",
          "HTTPS + MFA still matter on campus Wi-Fi.",
        ],
      },
      {
        id: "check-yourself",
        kicker: "Before you go",
        title: "Check yourself",
        body: `Quick self-check: can you list the path from device to server in order (device → LAN → router → WAN → DNS → server)? Can you explain why "raw IP works, name fails" points to DNS specifically? If yes, you're ready for the knowledge check.`,
        checkIn: {
          prompt: "In the mini case, why did already-connected video calls keep working during the DNS issue, while new website visits failed?",
          choices: [
            "Video calls don't use the internet at all",
            "Already-established connections didn't need a fresh DNS name lookup, while new connections to named sites did",
            "Video calls are immune to all network problems",
            "The router was completely offline for everyone",
          ],
          correctIndex: 1,
          explanation:
            "Once a connection is already established, it typically doesn't need to re-resolve a domain name — which is why existing calls survived while new name-based lookups failed.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **IP addresses** locate devices; **private IPs** (192.168.x.x) stay local, not globally routable.\n• **Routers**, **NAT**, and **firewalls** connect and filter between networks.\n• **LAN** is local; **WAN** spans wide areas (internet).\n• **DNS** maps names to IPs — IP works but names fail → check DNS and resolver logs.\n• **VPN** protects the tunnel, not destination trustworthiness — keep those two questions separate.\n• **Ports** target services; **clients** ask and **servers** answer.\n• Defenders care about the whole **path** and **logs at hops**, and narrate failures precisely instead of saying \"it's all broken.\"\n\nNext: firewalls, common ports as awareness, secure defaults, and simple segmentation.\n\nTake the **Knowledge check**, then reflect on a time a network path failed in your life.`,
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
    { term: "Private IP", definition: "An address used inside a local network (e.g. 192.168.x.x) that is not globally routable on the public internet." },
    { term: "NAT", definition: "Network Address Translation — lets many private devices share one public IP when reaching the internet." },
  ],
  realWorld:
    "Opening a homework portal: your **client** asks **DNS** for the site's **IP**, traffic leaves your **LAN** through a **router** onto the **WAN**, and a **server** answers on a service **port** — usually a secure web service.",
  quiz: [
    {
      id: "q1",
      question: "What is the main job of DNS?",
      choices: [
        "Map domain names to IP addresses",
        "Encrypt all traffic between a client and a server",
        "Block malicious IP addresses the way a firewall does",
        "Assign a permanent private IP address to every device",
      ],
      correctIndex: 0,
      explanation:
        "DNS is the phonebook that turns names people type into IP addresses computers use. Encryption, filtering, and address assignment are separate jobs handled by other parts of the path.",
    },
    {
      id: "q2",
      question: "Which statement best describes a LAN?",
      choices: [
        "The wide network connecting many separate schools across a whole country",
        "A network limited to a local area like a home or school",
        "A backup method for storing hashed passwords offline",
        "An encrypted tunnel used for remote access to a private network",
      ],
      correctIndex: 1,
      explanation:
        "LAN means Local Area Network — nearby devices sharing a local network. A network spanning many separate sites is closer to a WAN, and an encrypted remote-access tunnel describes a VPN.",
    },
    {
      id: "q3",
      question: "What does a router commonly do in a home network?",
      choices: [
        "Store every device's password in plain text for convenience",
        "Automatically encrypt every file saved on the local network",
        "Forward traffic between your local network and other networks like the internet",
        "Translate domain names into IP addresses instead of DNS",
      ],
      correctIndex: 2,
      explanation:
        "Routers direct traffic between networks — typically your LAN and your ISP/internet path. Translating names to addresses is DNS's job, not the router's.",
    },
    {
      id: "q4",
      question: "In a typical web visit, your browser is acting as the:",
      choices: [
        "Server, responding to requests from the website",
        "DNS resolver, translating names into addresses for the site",
        "Router, forwarding traffic between separate networks",
        "Client, requesting resources from the website's server",
      ],
      correctIndex: 3,
      explanation:
        "Browsers request pages — classic client role — while web servers respond, DNS resolves names, and routers forward traffic between networks.",
    },
    {
      id: "q5",
      question: "Why do defenders care about ports conceptually?",
      choices: [
        "Each service listening on a port is a potential doorway that must be protected and monitored",
        "Closing every port on a device guarantees it can never be attacked",
        "Ports only matter for devices connected over Wi-Fi, not wired connections",
        "Ports matter only for servers, never for everyday laptops or phones",
      ],
      correctIndex: 0,
      explanation:
        "Ports identify services. Exposed services need updates, access control, and often firewall filtering — closing unused ones helps, but no single step guarantees zero risk.",
    },
    {
      id: "q6",
      question: "A device can load a website by typing its raw IP address, but not by typing its name. What should a defender suspect first?",
      choices: [
        "A totally dead network connection with no connectivity at all",
        "A DNS / name-resolution problem",
        "A firewall silently blocking every outbound connection",
        "A router that has stopped forwarding any traffic at all",
      ],
      correctIndex: 1,
      explanation:
        "\"IP works, name fails\" is the classic signal that DNS resolution — not a total outage, firewall block, or dead router — is the likely problem.",
    },
    {
      id: "q7",
      question: "Why doesn't using a VPN automatically make a sketchy download site trustworthy?",
      choices: [
        "A VPN also scans every downloaded file for malware automatically",
        "A VPN blocks access to any site with a bad reputation",
        "A VPN protects the tunnel to its endpoint, but says nothing about the trustworthiness of the destination site or file",
        "A VPN removes the need to check for HTTPS on a site",
      ],
      correctIndex: 2,
      explanation:
        "VPN protection and destination trustworthiness are separate questions — a VPN doesn't vet the site or file at the other end, scan downloads, or replace HTTPS.",
    },
    {
      id: "q8",
      question: "Why is it more useful to describe how routers, servers, topology, and addressing work together than to just define each term separately?",
      choices: [
        "Because isolated definitions are more useful than understanding how the pieces connect",
        "Because memorizing each term separately is enough for real troubleshooting",
        "Because networking terms never actually relate to each other in practice",
        "Because real troubleshooting requires understanding how the pieces work together as a path, so you can localize where a failure actually occurred",
      ],
      correctIndex: 3,
      explanation:
        "Modeling the relationships between network components — as a path — is what lets you localize a problem (like DNS vs. router vs. server) instead of just labeling everything \"broken.\"",
    },
  ],
  reflection: {
    prompt:
      "Describe a recent time something \"wouldn't connect.\" Using lesson words (LAN, router, DNS, client/server), guess which part of the path might have been the problem and why.",
    placeholder: "Example: My phone had Wi-Fi bars but no sites loaded — maybe DNS or the path beyond the router, because other LAN features still seemed fine…",
  },
};
