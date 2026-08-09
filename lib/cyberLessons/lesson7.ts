import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson7: AILessonConfig = {
  id: "cs-7",
  title: "7. Network Architecture for Defenders",
  goal: "Evaluate how routers, switches, servers, topology, and addressing affect network scalability and reliability; describe impacts of bandwidth, load, delay, and topology; and diagnose path failures like DNS vs link issues — without attack techniques.",
  xpReward: 350,
  badge: "Net Scout",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/6",
  nextHref: "/learn/cyber/8",
  instructorScript: `**Coach's note**
Today's lesson: **Network Architecture for Defenders**.

**Goal:** Evaluate how routers, switches, servers, topology, and addressing affect network scalability and reliability; describe impacts of bandwidth, load, delay, and topology; and diagnose path failures like DNS vs link issues — without attack techniques.

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
        image: "/images/lessons/cs-7.png",
        imageAlt: "Home router, laptop, and phone on a desk with simple LAN cables suggesting a network",
        body: `Cyber defenders don't just think about passwords — they **evaluate network architecture**: how devices connect, how traffic is addressed, and what makes a design scale or fail under load.\n\nHere's our roadmap:\n\n• **Addressing** — IP (private/public), MAC vs IP briefly, why packets need locators.\n• **Switches vs routers** — local forwarding vs connecting networks.\n• **Topology** — star, bus, mesh; evaluate reliability tradeoffs.\n• **Servers & roles** — what different servers do on the path.\n• **Bandwidth, load, delay** — how capacity and congestion affect reliability.\n• **LAN vs WAN, DNS, ports, client-server** — path literacy for diagnosis.\n• **A worked example, a myth, and a mini case** — turning \"it's down\" into a path-based evaluation.\n\nDefensive only: architecture and diagnosis — not scanning, exploitation, or bypass guides.`,
        callout: {
          label: "Why it matters",
          text: "When a site won't load — or a design must survive a busy game night — you evaluate topology, addressing, and capacity, not just \"Wi-Fi bars.\"",
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
        body: `• **Network** — connected devices that can exchange data.\n• **IP address** — a numeric label that helps locate a device on a network (logical address for routing).\n• **MAC address** — a hardware identifier used on a local link; switches often forward using MAC, while routers forward using IP.\n• **Switch** — a device that forwards frames within a LAN, typically connecting many devices in the same local network.\n• **Router** — a device that forwards traffic **between** networks (e.g., LAN ↔ internet).\n• **Topology** — the arrangement of how devices and links are connected (star, bus, mesh, and hybrids).\n• **Bandwidth** — roughly how much data a link can carry per unit time (capacity).\n• **Scalability** — how well a design keeps working as users, devices, or traffic grow.\n• **LAN / WAN** — local area vs wide-area networks; the internet is the largest WAN most people use.\n• **DNS** — maps names like \`example.com\` to IP addresses.\n• **Port** — a number that delivers traffic to the right service on a device.\n• **Client / Server** — requester and responder in many network conversations.`,
        callout: {
          label: "Pro tip",
          text: "Map metaphor: street address (IP), name tag on the local floor (MAC), hallways (switches), inter-building roads (routers), phonebook (DNS), suite numbers (ports).",
        },
      },
      {
        id: "concept-1",
        kicker: "Addresses and neighborhoods",
        title: "Addressing, LAN/WAN, and path boundaries",
        image: "/images/lessons/cs-7-2.png",
        imageAlt: "Diagram-style photo props: LAN inside home, WAN cloud beyond the router",
        body: `Every device that talks on a network needs a way to be found. **Evaluate addressing** in two layers:\n\n• **IP address** — logical locator used so packets can be routed across networks.\n• **MAC address** — hardware-ish identifier used on a local link. On a LAN, a **switch** often decides where to send a frame using MAC learning; once traffic must leave that network, a **router** decides the next hop using IP.\n\n**Private vs public IPs:** Ranges like **192.168.x.x** (and similar private ranges) stay **inside** local networks — not globally routable. Your gateway **router** uses **NAT** so many private devices share one public address outward. 192.168.1.5 at home is not the same device as 192.168.1.5 at school.\n\n**LAN vs WAN:** A **LAN** connects nearby devices (home, library, school wing). A **WAN** spans sites; the **internet** is a huge interconnection of networks. Streaming video: device → LAN (often via switch/AP) → router → WAN path → remote **server**.\n\n**Defender evaluation:**\n• Same-LAN neighbors can often reach each other if segmentation is weak — shared café Wi-Fi is a trust decision.\n• Traffic beyond your router crosses paths you don't control — encryption and careful destination trust matter.\n• **Logs at hops** (switch/AP, router, firewall, server) help reconstruct who talked to whom when reliability or security fails.`,
        bullets: [
          "**MAC** helps local (switch) forwarding; **IP** helps between-network (router) forwarding.",
          "**Private IPs** stay local; **NAT + router** mediate LAN ↔ WAN.",
          "**LAN** = local; **WAN** = wide (including the internet).",
        ],
        callout: {
          label: "Watch out",
          text: "Public café Wi-Fi is a LAN you share with strangers. Treat sensitive logins carefully — prefer trusted networks and MFA-backed accounts.",
        },
        checkIn: {
          prompt: "A school buys a device that connects 24 classroom computers so they can reach each other on the same floor, and a separate device that connects that floor to the district internet link. Which pairing is correct?",
          choices: [
            "Floor device ≈ WAN; edge device ≈ MAC address” belongs to a different situation than the one in the question stem",
            "Both must be the same device type because IP and MAC are identical” belongs to a different situation than the one in the question stem",
            "Both devices are only DNS servers” belongs to a different situation than the one in the question stem",
            "Floor device ≈ switch (LAN forwarding); internet-edge device ≈ router (between networks)",
          ],
          correctIndex: 3,
          explanation:
            "Switches forward within a LAN; routers forward between networks (LAN ↔ WAN/internet). MAC vs IP support those different jobs.",
        },
      },
      {
        id: "network-architecture",
        kicker: "Architecture",
        title: "Switches, topology, servers, and reliability",
        body: `**Evaluate architecture** the way CSTA 3A-NI-04 / 3B-NI-03 expect: devices, topology, addressing, and performance factors — not just vocabulary.\n\n**Switch vs router (compare):**\n• **Switch** — connects many devices in one LAN; forwards locally; a failure here often knocks out that segment's local connectivity.\n• **Router** — connects different networks; chooses paths between them; also a common place for NAT/firewall policy. A router failure can isolate an entire LAN from the WAN even if local switching still works.\n\n**Topology (evaluate reliability):**\n• **Star** — devices link to a central switch/AP. Simple and common; **single point of failure** at the center (one dead switch can isolate many clients).\n• **Bus** (legacy idea) — shared backbone; conceptually simple, but a backbone fault or contention can affect many stations.\n• **Mesh** — multiple paths between nodes. **More resilient** (alternate routes if one link fails) and often **more expensive/complex** to build and manage.\n• Real campuses are **hybrids**: star-like closets feeding redundant uplinks toward core routers.\n\n**Server roles on the path:** DNS servers translate names; web/app servers answer clients; file/auth servers hold campus resources; each is a reliability and security dependency — overload or misconfig at one role feels like \"the internet is down\" even when links are fine.\n\n**Bandwidth, load, delay — impacts:**\n• **Bandwidth** = capacity. Too little for the crowd → congestion.\n• **Load** = how much of that capacity is in use (game night, testing week).\n• **Delay (latency)** = how long packets take; rises under congestion or long/poor paths.\n• **Scalability** = whether adding users/devices still meets performance goals — more APs/switches, better uplinks, redundant paths, and appropriately placed servers all affect the answer.\n\n**Defender recommendation pattern:** prefer designs with clear LAN/WAN boundaries, redundant critical links where outages hurt learning, and servers sized/placed so DNS and auth aren't single silent choke points. Next lesson adds firewalls on those boundaries.`,
        bullets: [
          "**Switch** = within LAN; **router** = between networks.",
          "**Star** is simple but center-critical; **mesh** adds alternate paths at cost/complexity.",
          "**Bandwidth / load / delay / topology** jointly determine reliability under growth.",
        ],
        callout: {
          label: "Evaluate",
          text: "Ask: If this switch dies, who is cut off? If DNS is overloaded, what still works? Those questions are architecture evaluation — not attack skills.",
        },
        checkIn: {
          prompt: "A library uses one central switch for all wired seats (star). On a busy afternoon, that switch fails. Which evaluation is most accurate?",
          choices: [
            "Some learners answer “Bandwidth always increases when a switch fails”, yet that does not match the precise idea from the lesson",
            "Star's central device is a single point of failure — many local clients lose LAN connectivity even if the WAN link is healthy",
            "“Routers never matter in a star, so the WAN must also be down” describes a different situation than the one in the question stem",
            "“Mesh topology guarantees this never happens, so it must have been DNS” describes a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "Star topologies concentrate risk at the center. Evaluating reliability means naming that tradeoff — simplicity vs single-point failure.",
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
            "“A broken keyboard” describes a different situation than the one in the question stem",
            "A total internet outage with nothing reachable at all” belongs to a different situation than the one in the question stem",
            "A likely DNS / name-resolution problem, since raw connectivity still worked",
            "A firewall blocking every single website” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "\"IP works, name fails\" is the classic DNS triage signal — the network path is fine, but name-to-address translation isn't completing.",
        },
      },
      {
        id: "concept-3",
        kicker: "Services and conversations",
        title: "Ports, clients, and server roles on the path",
        body: `A single host can run many services. **Ports** are numbered endpoints that deliver traffic to the right service — suite numbers inside a building (IP) address.\n\n**Examples defenders reason about (not an attack guide):**\n• Web services commonly use **80/443** (HTTP/HTTPS) — next lesson ties these to firewall allow/deny choices.\n• Remote administration services use other well-known ports — defenders treat them as high-impact doorways to authenticate, authorize, and avoid exposing casually.\n\n**Client-server and server roles:**\n• Your browser is often the **client** (asks); a web host is a **server** (answers).\n• Other server roles on real paths: **DNS** (names→IPs), **file/auth** (campus resources), **app/game** backends. Evaluating reliability means asking which role failed — overloaded DNS can look like a total outage while switches and WAN links are fine.\n\nEach listening service is a doorway that needs updates, access control, and often firewall policy. Architecture decides where those servers sit; configuration (next lesson) decides who may reach them.`,
        callout: {
          label: "Common misconception",
          text: "\"Ports\" are not physical holes in your laptop. They're software numbers. Controlling exposure is about which services are reachable — often via firewalls (next lesson) — not about \"hacking ports.\"",
        },
        checkIn: {
          prompt: "Students report \"the internet is down,\" but the WAN link and core switch look healthy while the campus DNS servers are overloaded. What does that imply for evaluating the outage?",
          choices: [
            "“Ports are physical holes that must have melted” describes a different situation than the one in the question stem",
            "A critical server role (DNS) can break name-based access even when topology and bandwidth on the links are fine",
            "“Only routers can cause user-visible failures” describes a different situation than the one in the question stem",
            "“Server roles don't affect reliability if switches work” describes a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "Scalability/reliability evaluation includes servers on the path — DNS load can dominate the user experience independently of link health.",
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
            "Picking “It doesn't matter — you should always assume DNS first” is a common mix-up that confuses a nearby idea with the right one",
            "Picking “Because DNS problems always mean the router is broken” is a common mix-up that confuses a nearby idea with the right one",
            "Because if raw IPs also failed to load, the problem would more likely be earlier in the path (LAN/router/WAN), not DNS specifically",
            "Picking “Because total outages are impossible on library Wi-Fi” is a common mix-up that confuses a nearby idea with the right one",
          ],
          correctIndex: 2,
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
        body: `Think of a real time something "wouldn't connect" — game server, video call, site load.\n\n**Evaluate the architecture**, step by step:\n\n1. **Device / LAN** — connected at all? Could a local **switch**/AP failure explain many clients failing together (star center)?\n2. **Router** — LAN works but WAN doesn't?\n3. **Bandwidth/load/delay** — worked off-peak but failed when everyone joined?\n4. **DNS server role** — names fail while raw IP works?\n5. **App server** — one service down while others work?\n\nNaming a plausible hop and factor (topology vs capacity vs DNS) is the skill — not unauthorized probing.`,
        callout: {
          label: "Keep it real",
          text: "\"Lab switch (star center) or DNS under load — not my laptop\" is already a stronger evaluation than \"everything was broken.\"",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Think like a scout",
        title: "Going deeper: why defenders map network paths",
        image: "/images/lessons/cs-7-4.png",
        imageAlt: "Whiteboard sketch of packets traveling client to DNS to server with defender checkpoints and a VPN tunnel icon",
        body: `Put architecture evaluation into one defender model:\n\n**Device (client)** → **LAN (AP/switch, topology)** → **Router (NAT / firewalls)** → **Internet (WAN)** → **DNS server** → **Application server** on **IP:port** → responses back.\n\n**Evaluate along the path:**\n• Trusted network? Legitimate domain?\n• Is the service supposed to be reachable from here?\n• Is capacity (bandwidth) enough for current load, or is delay spiking?\n• Would a star-center failure or a missing redundant uplink explain a wide outage?\n• Do **logs at hops** (switch, router, DNS, app server) localize the fault?\n\n**VPN:** protects the tunnel to its endpoint — not destination trustworthiness. HTTPS, domain checks, and MFA still matter.\n\nDefenders place controls at multiple hops — credentials, permissions, firewall filters, updates, and user judgment. Path literacy turns \"it broke\" into a reasoned hypothesis: local switch? router/WAN? DNS load? remote server?`,
        bullets: [
          "Map: client → LAN (switch/AP) → router → WAN → DNS → server.",
          "Topology and capacity affect reliability under load.",
          "DNS and other server roles are availability points.",
          "Localize failures with path + logs — not vague outage labels.",
        ],
        callout: {
          label: "Try this week",
          text: "When a page fails, narrate architecture: device, LAN/switch, router, WAN, DNS, server — and whether it smells like capacity, topology, or name resolution.",
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
            "It protects the tunnel between your device and the VPN endpoint, but doesn't guarantee the destination site is safe",
            "It can seem like it converts a WAN into a LAN, but that reading skips the distinction this question is testing",
            "“It makes every website you visit automatically trustworthy” describes a different situation than the one in the question stem",
            "Picking “It replaces the need for DNS entirely” is a common mix-up that confuses a nearby idea with the right one",
          ],
          correctIndex: 0,
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
        body: `Practical habits from today's lesson:\n\n• **Evaluate architecture** — switch vs router, topology risk, server roles — when diagnosing outages.\n• **Narrate the path** instead of \"the internet is broken.\"\n• **Test name vs IP** (when reasonable) to separate DNS from link failures.\n• **Separate VPN protection from destination trust.**\n• **Report with factors:** \"star switch in lab A down\" or \"DNS overloaded; WAN OK\" beats \"nothing works.\"\n\nPrecise architecture language is what makes you useful to defenders and IT — not running unauthorized scans.`,
        callout: {
          label: "Why it matters",
          text: "Clear evaluations of topology, addressing, and capacity get incidents solved faster than vague outage tickets.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and reflect",
        title: "Quick gut-check before you continue",
        body: `Before the mini case and knowledge check: justify a recommendation. Your school can afford either a second uplink (more mesh-like redundancy toward the ISP) or a faster single switch in one lab. For a campus that loses whole wings when one closet switch dies, which investment better improves reliability/scalability — and why?`,
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

Useful reports get solved faster when they evaluate architecture factors, not just \"Wi-Fi.\"`,
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
        body: `Quick self-check: can you contrast switch vs router, name a topology reliability tradeoff (e.g., star vs mesh), and explain why "raw IP works, name fails" points to DNS? If yes, you're ready for the knowledge check.`,
        checkIn: {
          prompt: "In the mini case, why did already-connected video calls keep working during the DNS issue, while new website visits failed?",
          choices: [
            "“Video calls don't use the internet at all” describes a different situation than the one in the question stem",
            "“The router was completely offline for everyone” describes a different situation than the one in the question stem",
            "Already-established connections didn't need a fresh DNS name lookup, while new connections to named sites did",
            "“Video calls are immune to all network problems” describes a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "Once a connection is already established, it typically doesn't need to re-resolve a domain name — which is why existing calls survived while new name-based lookups failed.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Addressing:** IP for routing between networks; MAC for local-link forwarding; private IPs stay local behind NAT.\n• **Switch vs router:** LAN forwarding vs connecting networks.\n• **Topology:** star (simple, center-critical), bus (shared backbone idea), mesh (alternate paths, more complex) — evaluate reliability tradeoffs.\n• **Servers:** DNS, web/app, file/auth roles affect scalability under load.\n• **Bandwidth / load / delay** shape user experience as networks grow.\n• **DNS** — IP works, name fails → name resolution; **VPN** ≠ destination trust.\n• Defenders **evaluate the architecture path** and report precisely.\n\nNext: firewalls, ports, secure defaults, and segmentation.\n\nTake the **Knowledge check**, then justify an architecture recommendation.`,
      },
    ],
  },
  bigIdeas: [
    "**Evaluate** networks via **switches, routers, servers, topology, and addressing** — not isolated vocabulary.",
    "**Bandwidth, load, delay, and topology** jointly determine **scalability and reliability** under real use.",
    "Defenders diagnose with **paths** — local LAN gear, edge routers, DNS/server roles, and WAN — to localize failures.",
  ],
  keyTerms: [
    { term: "IP Address", definition: "A numeric identifier that helps locate a device on a network for routing." },
    { term: "MAC Address", definition: "A hardware identifier used on a local link; switches often forward using MAC learning." },
    { term: "Switch", definition: "A device that forwards traffic within a LAN, connecting many local devices." },
    { term: "Router", definition: "A device that forwards data between different networks." },
    { term: "Topology", definition: "How devices and links are arranged (e.g., star, bus, mesh) — affects failure modes." },
    { term: "Bandwidth", definition: "The data capacity of a link over time — a key factor in congestion and delay." },
    { term: "Scalability", definition: "How well a network design continues to meet needs as users, devices, or traffic grow." },
    { term: "LAN", definition: "Local Area Network — a network in a limited area like a home or school." },
    { term: "WAN", definition: "Wide Area Network — a network spanning large distances; the internet is a major example." },
    { term: "DNS", definition: "Domain Name System — maps human-friendly domain names to IP addresses." },
    { term: "Port", definition: "A number that helps deliver network traffic to a specific service on a device." },
    { term: "Client", definition: "The device or program that requests data or services." },
    { term: "Server", definition: "The device or program that responds to client requests (web, DNS, file, etc.)." },
    { term: "Private IP", definition: "An address used inside a local network (e.g. 192.168.x.x) that is not globally routable on the public internet." },
    { term: "NAT", definition: "Network Address Translation — lets many private devices share one public IP when reaching the internet." },
  ],
  realWorld:
    "Opening a homework portal: your **client** asks **DNS** for an **IP**; traffic crosses a **LAN** (often via **switch**/AP), a **router** onto the **WAN**, and reaches a **server** on a service **port** — reliability depends on topology and capacity along that path.",
  quiz: [
    {
      id: "q1",
      question: "What is the main job of DNS, and how can DNS load affect reliability even when links are fine?",
      choices: [
            "Assign a permanent private IP address to every device” belongs to a different situation than the one in the question stem",
            "“Encrypt all traffic between a client and a server” describes a different situation than the one in the question stem",
            "Map domain names to IP addresses — overloaded DNS can break name-based access while switches/WAN still work",
            "Block malicious IP addresses the way a firewall does” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "DNS translates names to IPs; as a server role on the path, its capacity is part of scalability/reliability evaluation.",
    },
    {
      id: "q2",
      question: "Comparing a switch and a router, which evaluation is correct?",
      choices: [
            "They are identical devices with different brand names” belongs to a different situation than the one in the question stem",
            "A router only works with MAC addresses; a switch only works with DNS” belongs to a different situation than the one in the question stem",
            "Both only store passwords; neither forwards traffic” belongs to a different situation than the one in the question stem",
            "A switch typically forwards within a LAN; a router forwards between networks (e.g., LAN ↔ internet)",
          ],
      correctIndex: 3,
      explanation:
        "Switches interconnect local devices; routers connect different networks — a core architecture distinction for defenders.",
    },
    {
      id: "q3",
      question: "A lab uses a star topology with one closet switch. Why might that design hurt reliability under failure?",
      choices: [
            "Topology never interacts with scalability or delay” belongs to a different situation than the one in the question stem",
            "Mesh is always worse than star for every campus” belongs to a different situation than the one in the question stem",
            "The center is a single point of failure — if that switch dies, many clients lose local connectivity",
            "Star topologies never fail, so bandwidth must be infinite” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Star is simple to manage but concentrates risk at the hub — evaluate that tradeoff when recommending designs.",
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
      question: "Which factor set best explains why a network that works for 30 users fails for 300 during testing week?",
      choices: [
            "Ports only matter on Wi-Fi, so wired labs never congest — familiar wording, wrong fit for what the prompt is actually asking",
            "“Private IP addresses stop working above 50 users automatically” describes a different situation than the one in the question stem",
            "Treat “Closing every port guarantees infinite scalability” as a distractor: close in topic, incorrect for the required answer",
            "Bandwidth and load (and resulting delay) exceeded what the design scaled for — topology/server placement may also bottleneck",
          ],
      correctIndex: 3,
      explanation:
        "Scalability evaluation weighs capacity, congestion/delay, topology, and server roles as usage grows.",
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
      question: "Why might a mesh-like design with redundant uplinks improve reliability compared with a single star uplink to the ISP?",
      choices: [
            "“Mesh always reduces bandwidth to zero” describes a different situation than the one in the question stem",
            "Star topologies cannot exist on school campuses” belongs to a different situation than the one in the question stem",
            "Alternate paths can keep traffic flowing if one link fails — at the cost of more complexity/expense",
            "Redundant links delete the need for IP addresses” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Evaluating topology means weighing resilience (alternate paths) against cost and operational complexity.",
    },
    {
      id: "q8",
      question: "Why evaluate routers, switches, servers, topology, and addressing together instead of memorizing isolated definitions?",
      choices: [
            "It can seem like these pieces never interact in practice, but that reading skips the distinction this question is testing",
            "It can seem like only professional engineers may discuss topology, but that reading skips the distinction this question is testing",
            "Picking “Isolated definitions are enough for real outage diagnosis” is a common mix-up that confuses a nearby idea with the right one",
            "Reliability and scalability emerge from how the pieces interact as a path — so you can localize failures and justify design tradeoffs",
          ],
      correctIndex: 3,
      explanation:
        "CSTA-style network reasoning is about relationships — path + capacity + topology — not flashcard terms alone.",
    },
  ],
  reflection: {
    prompt:
      "Recommend a small architecture improvement for a place you know (home, school lab, club). Compare star vs more redundant links, switch vs router roles, and justify how your choice improves reliability or scalability under load — including one tradeoff (cost/complexity).",
    placeholder: "Example: Our lab is a pure star on one switch — I'd recommend a spare uplink/redundant path for exams week even if it costs more to manage…",
  },
};
