import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson13: AILessonConfig = {
  id: "cs-13",
  title: "13. Common Attacks (Defender View)",
  goal: "Recognize common attack patterns at a conceptual level — DoS/DDoS, spoofing, MITM awareness, ransomware, supply-chain risk, and injection as tricking software with bad input — and focus on defenses, not offense.",
  xpReward: 650,
  badge: "Attack Analyst",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/12",
  nextHref: "/learn/cyber/14",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-13.png",
        imageAlt: "Defender dashboard showing blocked traffic and security alerts without attack tools",
        body: `Defenders study attacks the way firefighters study fire: to **recognize**, **reduce risk**, and **respond** — not to start fires. Today you'll learn common attack *patterns* at awareness level only.\n\nHere's our roadmap:\n\n• How to think like a **defender-analyst** (patterns, impact, controls).\n• **DoS / DDoS** — overwhelming availability.\n• **Spoofing** — faking identity (including voice and text scams).\n• **MITM awareness** — hostile middle positions (concepts only).\n• **Ransomware awareness** — recognizing the pattern and responding, not paying.\n• **Injection (concept)** — tricking software with unexpected input — without exploit recipes.\n• **Supply-chain awareness** — when the risk comes from a trusted vendor or app.\n• **Defense map** — what to do about each family.\n\nIf a detail would help someone attack a system, we skip it. Your job is protection.`,
        callout: {
          label: "Why it matters",
          text: "You can't prioritize defenses if every headline sounds the same. Pattern recognition helps you choose MFA, patching, input validation, and monitoring wisely.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Attack-pattern words (defender lens)",
        body: `• **Attack pattern** — a repeatable *category* of harmful technique (not a how-to).\n• **DoS (Denial of Service)** — making a system unavailable to legitimate users.\n• **DDoS** — a DoS launched from many sources at once.\n• **Spoofing** — pretending to be someone or something else.\n• **MITM** — positioning between parties to intercept or alter communications.\n• **Ransomware** — malware that blocks access to data/systems, typically demanding payment.\n• **Injection (concept)** — abusing software by feeding it input it treats as instructions or harmful data.\n• **Supply chain (security sense)** — trusted vendors, apps, or updates that could carry risk if compromised upstream.\n• **Availability** — systems and data reachable when needed (the \"A\" in CIA).\n\nWe'll stay conceptual: what it breaks, how you'd notice, how you'd defend.`,
        callout: {
          label: "Ethics reminder",
          text: "Using these ideas to harm systems you don't own/authorize is illegal and against this course. Knowledge here is for defense and responsible reporting only.",
        },
      },
      {
        id: "defender-lens",
        kicker: "The big idea",
        title: "For every attack pattern, ask three questions",
        body: `When you hear about an attack type, run this defender checklist:\n\n**1. What CIA goal is threatened?** Confidentiality, integrity, availability — or all three?\n**2. What would we notice?** Alerts, user reports, odd logs, downtime, unexpected posts?\n**3. What controls help?** Prevention, detection, corrective steps?\n\nThis keeps you in analyst mode. You don't need exploit details to choose good defenses.`,
        bullets: [
          "Name the impact (CIA) before the buzzword.",
          "Pair every pattern with at least one control.",
          "Escalate real incidents — don't \"test\" attacks on live systems.",
        ],
        callout: {
          label: "Pro tip",
          text: "If a tutorial online offers step-by-step attack commands, close it. That's not this class — and it's a fast way to get into serious trouble.",
        },
      },
      {
        id: "defender-lens-example",
        kicker: "See it in action",
        title: "Running the three-question drill on a headline",
        body: `Headline: "Popular game's login system knocked offline for hours after huge traffic surge."\n\n**Q1 — CIA goal?** Availability — players can't reach the service, even though no data was necessarily stolen.\n\n**Q2 — What would we notice?** Users report the app "won't load," support tickets spike, monitoring dashboards show error rates climbing.\n\n**Q3 — What controls help?** Resilient/scalable hosting, traffic filtering with reputable providers, a status page so users aren't left guessing, and a clear escalation path to the hosting provider.\n\nNotice we never asked "how exactly did they flood it?" — that detail wouldn't change which defenses matter. The three-question drill gets you to useful, defensive conclusions without any offensive knowledge at all.`,
        checkIn: {
          prompt: "When analyzing an attack headline as a defender, what should you focus on first?",
          choices: [
            "Finding step-by-step instructions to try the attack yourself",
            "Identifying the CIA impact, what you'd notice, and which controls would help",
            "Ignoring it because only large companies need to care",
            "Assuming every attack is identical regardless of pattern",
          ],
          correctIndex: 1,
          explanation:
            "The defender-analyst habit is impact → detection signal → control, without needing offensive technical detail.",
        },
      },
      {
        id: "attack-chain",
        kicker: "Stages, not recipes",
        title: "Defender view of an attack chain",
        body: `Defenders often describe compromises as **stages** — not to teach attacks, but to place controls and detections where they matter most:\n\n**1. Initial access** — How did they get in? Phishing, stolen credentials, exposed service, risky download. This is where MFA, patching, and phishing awareness earn their keep.\n**2. Foothold / persistence** — Can they stay after the first login? New accounts, scheduled tasks, unusual remote tools. Monitoring and least privilege matter here.\n**3. Privilege escalation / lateral movement** — Can they reach more systems and accounts? Segmentation and role limits shrink blast radius.\n**4. Goal actions** — Data theft, disruption, ransomware prep. By this stage, impact is expensive — earlier detection is cheaper.\n**5. Defender response** — Detect, contain, eradicate using controls and IR from Lesson 12. You can interrupt the chain at any stage you catch it.\n\n**Signals to watch:**\n\n• **MFA** (ideally **phishing-resistant MFA**) blunts credential stuffing and many phishing follow-ons at the access layer.\n• **Impossible travel** — successful logins from far-away places minutes apart, especially after phishing waves — deserves triage and stronger authentication.\n• Correlate **login, VPN, and MFA logs** to confirm whether a success was legitimate.`,
        bullets: [
          "Chain: **initial access → foothold → lateral movement → goal → defender response**.",
          "**MFA** and **impossible-travel** alerts are high-value detection signals.",
          "Place controls early — waiting until goal actions is already costly.",
        ],
        callout: {
          label: "Defender view",
          text: "Study attacks as patterns for defense and response — never as recipes. Authorized labs only for hands-on practice.",
        },
      },
      {
        id: "attack-chain-example",
        kicker: "See it in action",
        title: "Interrupting the chain at three different points",
        body: `Consider a hypothetical (composite, non-actionable) scenario: a phishing email leads to a stolen password, which leads to a second account being reached, which leads to a sensitive file being copied.\n\n• **Interrupt at initial access:** If MFA were on, the stolen password alone might not have been enough — chain broken at step 1, cheapest possible outcome.\n• **Interrupt at lateral movement:** If accounts followed least privilege (Lesson 5/6 concepts) and networks were segmented (Lesson 8), reaching the second account or system would have been much harder even after the first compromise.\n• **Interrupt at goal actions:** If someone was monitoring for unusual file access volume (Lesson 12's detection habits), the copy of the sensitive file might have triggered an alert before real damage was done.\n\nThe same chain can be broken at multiple points — which is exactly why layered defense (from earlier lessons) matters more than any single "silver bullet" control.`,
        checkIn: {
          prompt: "Why do defenders think about attacks as a 'chain' of stages rather than one single event?",
          choices: [
            "Because it teaches attackers new techniques",
            "Because it shows multiple points where a control or detection could interrupt the compromise — supporting layered defense",
            "Because only the final stage matters",
            "Because chains only apply to ransomware",
          ],
          correctIndex: 1,
          explanation:
            "Thinking in stages reveals several opportunities to break the chain — reinforcing why layered defenses (MFA, least privilege, monitoring) work together.",
        },
      },
      {
        id: "dos-ddos",
        kicker: "Availability attacks",
        title: "DoS / DDoS: knocking the service offline",
        image: "/images/lessons/cs-13-2.png",
        imageAlt: "Crowded doorway metaphor photo labeled overload to explain denial of service simply",
        body: `**Denial of Service (DoS)** aims to overwhelm a system so real users can't get through — flooding a club website ticket form, flooding a game server, exhausting resources until everything crawls.\n\n**DDoS** is the same idea at larger scale: many systems sending traffic so the target can't cope.\n\n**Defender focus:**\n\n• Know who hosts your site/service and how to contact them during outages.\n• Use reputable hosting/protections when public services matter.\n• Monitor for sudden traffic spikes and have a communication plan for users (\"we're aware of downtime\").\n• Don't confuse a DoS with \"the Wi-Fi is bad\" — check whether the *service* is down for everyone.\n\nWe won't discuss how to launch floods. Availability defense is about resilience and response partnerships.`,
        callout: {
          label: "Defender view",
          text: "For most student clubs, the practical defense is good hosting defaults, rate limits where available, and a clear escalation path to IT/hosting support.",
        },
      },
      {
        id: "dos-ddos-example",
        kicker: "See it in action",
        title: "Telling a DoS apart from an ordinary outage",
        body: `A club's event-registration site goes down right as registration opens. Two very different explanations are possible:\n\n• **Ordinary overload:** genuine excitement caused way more real visitors than the free hosting plan can handle at once — a capacity problem, not an attack.\n• **DoS/DDoS pattern:** traffic volume or patterns look inconsistent with genuine interest (e.g., far more requests than your club has members or followers, or requests that don't look like real registration attempts).\n\nEither way, the defender response is similar and doesn't require attack knowledge: check hosting status pages, contact the hosting provider, communicate openly with users ("we know registration is down, we're working on it"), and consider a more resilient hosting tier if this keeps happening. You don't need to diagnose the exact cause yourself — you need a plan and the right contacts.`,
        checkIn: {
          prompt: "A club's website goes down right as a popular event opens registration. What's the appropriate defender response?",
          choices: [
            "Try to trace and retaliate against whoever might be responsible",
            "Check hosting status, contact the provider, communicate with users, and consider more resilient hosting if it recurs",
            "Shut down the club's internet access permanently",
            "Assume nothing can be done and give up on the event",
          ],
          correctIndex: 1,
          explanation:
            "Whether it's genuine overload or a DoS pattern, the practical defender response is the same: escalate to hosting support and communicate clearly — not attempt retaliation.",
        },
      },
      {
        id: "spoofing-mitm",
        kicker: "Fake identity & middle position",
        title: "Spoofing and MITM — trust and channels under attack",
        body: `**Spoofing** means faking identity: a lookalike email address, a fake caller ID, a cloned site name, a forged \"From\" line. The goal is to make you trust the wrong party. This includes **vishing** (voice phishing calls) and **smishing** (phishing via text message) — same trick, different channel.\n\n**MITM (awareness level)** means an attacker tries to sit in the middle of a conversation or connection — especially risky on untrusted networks — hoping to read or alter data. HTTPS and certificate warnings exist partly to defend against this class of threat.\n\n**Defender focus:**\n\n• Verify unexpected requests out-of-band (call a known number, use official apps).\n• Check URLs and email domains carefully; be equally skeptical of unexpected calls and texts.\n• Prefer HTTPS; heed certificate warnings.\n• Use MFA so a single spoofed login page capture is less fatal.`,
        callout: {
          label: "Watch out",
          text: "Spoofed \"IT support\" messages — by email, text, *or* phone call — often create urgency. Slow down. Real IT rarely needs your password read aloud or typed into a link.",
        },
      },
      {
        id: "spoofing-mitm-example",
        kicker: "See it in action",
        title: "The 'bank fraud department' phone call",
        body: `A caller ID shows your bank's real name and number. The caller says there's suspicious activity on your account and asks you to "verify" by reading back a code that was just texted to you. This is a classic **spoofing** pattern (caller ID can be faked) combined with a scheme to steal an MFA code in real time.\n\nDefender response, without needing to understand how caller ID spoofing works technically:\n\n• Hang up. Call the number printed on the back of your card or the bank's official app/site — not a number the caller gives you.\n• Never read an MFA/verification code to someone who called *you* — legitimate institutions don't need you to read codes back over the phone.\n• If in doubt, involve a trusted adult before acting on urgency ("do this right now or lose your account!").\n\nThe defense here isn't technical at all — it's the same out-of-band verification habit from email phishing, applied to phone calls.`,
        checkIn: {
          prompt: "Someone calls claiming to be your bank, and caller ID shows the bank's real number. They ask you to read back a code just texted to you. What should you do?",
          choices: [
            "Read the code, since caller ID confirms it's really the bank",
            "Hang up and call the number on your card/official app yourself — never read MFA codes to an unsolicited caller",
            "Text the code back instead of saying it out loud",
            "Assume it's fine since they already knew your phone number",
          ],
          correctIndex: 1,
          explanation:
            "Caller ID can be spoofed, and legitimate banks never need you to read back a live MFA code. Verify out-of-band using a number you already trust.",
        },
      },
      {
        id: "ransomware-awareness",
        kicker: "The pattern to recognize",
        title: "Ransomware: recognizing the pattern, not paying the demand",
        image: "/images/lessons/cs-13-4.png",
        imageAlt: "Locked file icon with a ransom note banner shown for educational awareness only",
        body: `**Ransomware** is malware that blocks access to files or systems — usually by encrypting them — and then demands payment, typically for a decryption key. It's an availability *and* integrity threat rolled into one scary package.\n\n**Recognizing it:** files suddenly won't open, extensions change unexpectedly, and a note appears demanding payment (often in cryptocurrency) with a countdown or threat.\n\n**Defender response (awareness, not negotiation tactics):**\n\n• **Don't pay** as a first instinct — payment doesn't guarantee recovery and funds further attacks; involve IT/law enforcement guidance through trusted adults for serious cases.\n• **Disconnect** the affected device from networks to limit spread to other systems/drives, if it's safe and you know how.\n• **Restore from backups** — this is *the* reason Lesson 11's backup habits exist. A tested, offline or separately-stored backup turns ransomware from a catastrophe into an inconvenience.\n• **Report it** — school/organizational incidents should go to IT immediately; this is not a "figure it out alone" situation.\n\nRansomware is the clearest possible argument for why boring backup habits matter.`,
        bullets: [
          "Ransomware blocks access to data/systems and demands payment.",
          "Backups are the single most effective defense once it happens.",
          "Never treat paying as the first or only option — involve trusted adults/IT.",
        ],
        callout: {
          label: "Defender view",
          text: "The best ransomware defense mostly happened *before* the attack: patching, phishing awareness (common entry point), least privilege, and tested backups.",
        },
      },
      {
        id: "ransomware-awareness-example",
        kicker: "See it in action",
        title: "Two clubs, two very different ransomware outcomes",
        body: `Both clubs open a malicious attachment disguised as a "roster template." Ransomware runs and encrypts local files on the shared laptop.\n\n**Club A** had been syncing project files to cloud storage with version history, and a sponsor kept a separate exported backup monthly. Recovery: disconnect the infected laptop, wipe it, restore files from the clean cloud copy, report the incident to school IT, and move on within a day.\n\n**Club B** had never backed up anything outside that one laptop. Every roster, budget file, and project asset that existed only there is now inaccessible. The club faces a genuinely painful choice with no good options — exactly the scenario backups exist to prevent.\n\nSame attack, wildly different outcomes — determined entirely by a boring habit set up *before* anything went wrong.`,
        checkIn: {
          prompt: "What is the single most effective defense once ransomware has already encrypted a device's files?",
          choices: [
            "Paying the ransom immediately for guaranteed recovery",
            "Restoring from a clean, tested backup made before the attack",
            "Waiting for the ransom note to expire on its own",
            "Sharing the ransom note publicly for sympathy",
          ],
          correctIndex: 1,
          explanation:
            "Tested backups turn ransomware into a recoverable inconvenience instead of a catastrophe — paying is discouraged since it doesn't guarantee recovery and funds further attacks.",
        },
      },
      {
        id: "injection-concept",
        kicker: "Bad input, bad outcomes",
        title: "Injection as a concept: tricking software with input",
        body: `Many programs take input (forms, search boxes, file names) and process it. **Injection**, as a *concept*, is when crafted input tricks software into doing something the designer didn't intend — treating data like a command, breaking out of a safe context, or smuggling harmful instructions into a system.\n\nYou do **not** need SQL samples, payloads, or exploit walkthroughs to understand the defender job:\n\n• Treat all user input as untrusted.\n• Use frameworks and APIs that separate *data* from *commands* (professionals call this safe parameterization / validation — the names matter less than the idea).\n• Limit what each account can do even if a bug appears (**least privilege**).\n• Keep software patched; many injection flaws are fixed in updates.\n• Log weird input patterns and failures for detection.\n\nIf you build apps later, you'll learn secure coding with teachers in safe lab environments — not by practicing attacks on live systems.`,
        bullets: [
          "Concept: malicious/unexpected input can confuse software.",
          "Defense: validate input, use safe APIs, least privilege, patching.",
          "No exploit examples needed to prioritize those controls.",
        ],
        callout: {
          label: "Ethics & safety",
          text: "Trying injection techniques against websites or school systems without explicit permission is unauthorized access territory — illegal and against academy rules.",
        },
      },
      {
        id: "injection-concept-example",
        kicker: "See it in action",
        title: "Why 'trust nothing typed by a user' is the whole idea",
        body: `Imagine a club sign-up form that stores whatever a visitor types into a "team name" box. If the underlying software naively treats that typed text as trustworthy and mixes it directly into commands behind the scenes, unexpected or malformed input could confuse the system in ways the designer never intended — this is the injection *concept*, without any code example needed.\n\nThe defensive fix a developer would apply (again, concept only): always treat the "team name" as pure data, never as something that could be interpreted as instructions, no matter how it's phrased. Well-built form libraries and frameworks handle this separation automatically — which is exactly why "use trusted, well-maintained frameworks instead of rolling your own from scratch" is such common secure-development advice.\n\nAs a student defender, your actionable takeaway isn't how to craft tricky input — it's understanding *why* "never trust raw user input" is a rule, so you value patching, least privilege, and reputable software when you hear about this class of bug in the news.`,
        checkIn: {
          prompt: "What is the core defensive principle behind preventing injection-style bugs?",
          choices: [
            "Trust all user input completely since users are always well-intentioned",
            "Treat all user-supplied input as untrusted data, and use frameworks that clearly separate data from commands",
            "Only allow input from users you personally know",
            "Injection bugs can only be fixed by deleting the input form entirely",
          ],
          correctIndex: 1,
          explanation:
            "The defender principle is: never assume user input is safe. Frameworks and validation that separate data from commands are the standard fix.",
        },
      },
      {
        id: "supply-chain-awareness",
        kicker: "Risk from trusted sources",
        title: "Supply-chain awareness: when the risk comes from a vendor",
        image: "/images/lessons/cs-13-5.png",
        imageAlt: "Chain link icon connecting app icons vendor logo and update icon to represent supply chain risk",
        body: `Not every risk starts with a phishing email or a direct attack on you. Sometimes a **trusted vendor, app, browser extension, or software update** is itself compromised upstream — and the harm reaches you *through* something you had every reason to trust.\n\nThis is called **supply-chain risk**, and while defending against a compromised vendor at the source is mostly out of your hands, a few habits reduce your exposure:\n\n• **Minimize what you install** — every app/extension is a small amount of trust extended to its maker; fewer installs means less exposure.\n• **Prefer official sources** — app stores and official vendor sites vet software more than random download links.\n• **Keep software updated** — vendors that discover a compromise typically ship a fixed update quickly; staying current means you get the fix.\n• **Review permissions** — an extension or app asking for far more access than its purpose suggests (a calculator app wanting your contacts?) is a red flag regardless of *why* it's asking.\n\nYou can't personally audit every vendor's internal security — but you can limit how much trust you hand out and to how many places.`,
        bullets: [
          "Risk can arrive through a trusted vendor, not just a direct attack.",
          "Fewer installed apps/extensions = smaller exposure surface.",
          "Unusual permission requests deserve scrutiny regardless of the source's reputation.",
        ],
        callout: {
          label: "Defender view",
          text: "Supply-chain awareness is why 'only install what you actually need, from official sources, and keep it updated' shows up across almost every lesson in this track — it's genuinely high-leverage.",
        },
      },
      {
        id: "supply-chain-example",
        kicker: "See it in action",
        title: "The browser extension that asked for too much",
        body: `A student installs a popular-looking browser extension that promises to "clean up" their homepage. During installation, it requests permission to "read and change all data on every website you visit" — far more access than a homepage-cleanup tool plausibly needs.\n\nA supply-chain-aware response: pause before accepting. Ask whether the requested permission matches the tool's actual job. If it doesn't, that's a reason to skip it — regardless of how many downloads or good reviews it has, since reviews don't verify security practices. Preferring extensions from well-known, actively maintained publishers, checking permissions before installing, and periodically reviewing what's already installed (and removing what's unused) are all realistic, non-technical defenses against this category of risk.\n\nThis connects directly back to the "unused services" hardening habit from Lesson 11 — every installed extension or app is a small piece of attack surface, whether or not it's ever misused.`,
        checkIn: {
          prompt: "A homepage-cleanup browser extension requests permission to read and change data on every website you visit. What should a defender-minded user do?",
          choices: [
            "Install it immediately since it's popular",
            "Pause and question whether the requested permission matches the tool's actual purpose before installing",
            "Grant every permission apps request without reviewing them",
            "Assume all extensions from any source are equally safe",
          ],
          correctIndex: 1,
          explanation:
            "Permissions that exceed a tool's stated purpose are a red flag. Reviewing requested access before installing is a practical supply-chain defense.",
        },
      },
      {
        id: "defense-map",
        kicker: "Put it together",
        title: "A quick defense map for common patterns",
        image: "/images/lessons/cs-13-3.png",
        imageAlt: "Layered defense poster: patching MFA logging monitoring on a classroom wall",
        body: `Match pattern → primary defenses:\n\n• **DoS/DDoS** → resilient hosting, monitoring, escalation to providers, comms plan.\n• **Spoofing (email/text/voice)** → verify identity out-of-band, URL/domain checks, phishing awareness, MFA.\n• **MITM risk** → HTTPS, avoid sensitive logins on hostile networks, respect cert warnings.\n• **Ransomware** → phishing awareness, patching, least privilege, and — most of all — tested backups.\n• **Injection class bugs** → secure development practices, patching, least privilege, input handled safely by design.\n• **Supply-chain risk** → minimize installs, prefer official sources, review permissions, keep everything updated.\n• **Across the board** → logging/monitoring + IR basics from Lesson 12.\n\nYou're building an analyst's cheat sheet — impact, signals, controls.`,
        callout: {
          label: "Try this week",
          text: "Pick one news headline about a cyber incident. Name the attack pattern family (if clear) and one defensive control that might have helped.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• Study attacks as **patterns** for defense — never as recipes.\n• **Attack chain:** initial access → foothold → lateral movement → goal → defender response — layered defenses can interrupt it at multiple points.\n• **MFA**, **phishing-resistant MFA**, and **impossible-travel** are key detection signals.\n• **DoS/DDoS** hits availability; **spoofing** (including calls/texts) fakes identity; **MITM** threatens the channel.\n• **Ransomware** is best defeated by backups made *before* the attack, not by paying.\n• **Injection** (conceptually) is tricking software with unsafe input; **supply-chain risk** arrives through trusted vendors.\n• For each: know impact, signals, and controls.\n\nComplete the **Knowledge check**, then reflect on which pattern you'd watch for in a school club system.`,
      },
    ],
  },
  bigIdeas: [
    "Defenders learn attack **patterns** to recognize impact and choose controls — not to offend — and layered defenses can interrupt an attack chain at multiple stages.",
    "**DoS/DDoS** targets availability; **spoofing** (email, text, or voice) fakes identity; **MITM** threatens the path between parties; **ransomware** threatens both availability and integrity.",
    "**Injection** (conceptually) is tricking software with unsafe input, and **supply-chain risk** arrives through a trusted vendor or app — both are defended by safe design, patching, least privilege, and cautious installs, not by practicing exploits.",
  ],
  keyTerms: [
    { term: "DoS", definition: "Denial of Service — making a system unavailable to legitimate users." },
    { term: "DDoS", definition: "Distributed Denial of Service — a DoS involving many sources." },
    { term: "Spoofing", definition: "Faking identity (email, caller ID, text, or site) to gain trust or mislead a target." },
    { term: "MITM", definition: "Man-in-the-middle — secretly sitting between communicating parties." },
    { term: "Ransomware", definition: "Malware that blocks access to data or systems, typically demanding payment for restoration." },
    { term: "Injection (concept)", definition: "Abusing software by supplying input that is mishandled as harmful instructions or data." },
    { term: "Supply-chain risk", definition: "Security risk introduced through a trusted vendor, app, extension, or update rather than a direct attack." },
    { term: "Attack surface", definition: "The set of places an attacker might try to abuse." },
    { term: "Availability", definition: "Ensuring systems and data remain usable when needed." },
    { term: "Attack chain", definition: "A defender model of compromise stages from initial access through goal actions and response." },
    { term: "Impossible travel", definition: "A detection signal when logins from distant locations appear too close together in time." },
  ],
  realWorld:
    "A student government ticket site goes down during election week after a huge traffic flood (**DDoS** pattern). Defenders focus on hosting protections and communications — not on learning how to run floods themselves. Meanwhile, a club laptop hit by **ransomware** recovers in a day because someone kept tested backups.",
  quiz: [
    {
      id: "q1",
      question: "What is the primary impact of a DoS/DDoS attack?",
      choices: [
        "It harms availability so legitimate users can't use the service",
        "It permanently encrypts files for ransom by definition",
        "It mainly harms confidentiality, not availability",
        "It always steals passwords silently without any downtime",
      ],
      correctIndex: 0,
      explanation:
        "DoS/DDoS aims to overwhelm or block service so real users can't get through — an availability attack, not encryption or silent theft.",
    },
    {
      id: "q2",
      question: "Which example best matches spoofing from a defender's view?",
      choices: [
        "Installing official OS updates",
        "A lookalike email address pretending to be the school IT desk",
        "Turning on MFA for an account",
        "Writing a lessons-learned report after an incident",
      ],
      correctIndex: 1,
      explanation:
        "Spoofing fakes identity. A lookalike IT email is a classic example defenders train people to spot.",
    },
    {
      id: "q3",
      question: "Why does this course discuss MITM only at awareness level?",
      choices: [
        "Because MITM is not related to HTTPS at all",
        "Because browsers never warn about certificate problems",
        "So students understand the risk and defenses without learning offensive techniques",
        "Because MITM only happens in movies, not real networks",
      ],
      correctIndex: 2,
      explanation:
        "Awareness helps you use HTTPS, heed warnings, and choose safer networks — without teaching attacks.",
    },
    {
      id: "q4",
      question: "Which statement about injection is appropriate for this class?",
      choices: [
        "Here is a detailed SQL exploit students should try on live sites",
        "Injection only affects paper forms, not real software",
        "Injection means encrypting a hard drive until a ransom is paid",
        "Injection is the idea of tricking software with unsafe input; defenders focus on safe handling, patching, and least privilege",
      ],
      correctIndex: 3,
      explanation:
        "We stay conceptual and defense-focused. No exploit recipes; emphasize secure design and controls — not encryption, which is a separate concept.",
    },
    {
      id: "q5",
      question: "What should a defender do first when studying a new attack headline?",
      choices: [
        "Identify the pattern, CIA impact, and which controls would help",
        "Search for step-by-step attack tools to recreate it at school",
        "Ignore it because only experts need to understand patterns",
        "Disable all logging so alerts stop appearing",
      ],
      correctIndex: 0,
      explanation:
        "Analyst mode: pattern → impact → controls. Never \"practice\" attacks on systems without authorization.",
    },
    {
      id: "q6",
      question: "A caller with a spoofed caller ID asks you to read back an MFA code just texted to you. What's the correct response?",
      choices: [
        "Read the code, since caller ID showed a trusted name",
        "Hang up and independently contact the organization using a known number — never read a live MFA code to an unsolicited caller",
        "Text the code to a friend to double-check first",
        "Assume it's safe because they already knew your phone number",
      ],
      correctIndex: 1,
      explanation:
        "Caller ID can be spoofed. Legitimate organizations never need a live MFA code read back over the phone — verify independently instead.",
    },
    {
      id: "q7",
      question: "What is the single most effective defense once ransomware has already encrypted a device's files?",
      choices: [
        "Paying the ransom for guaranteed recovery",
        "Waiting for the note to disappear on its own",
        "Restoring from a clean, tested backup made before the attack",
        "Reinstalling random software until something works",
      ],
      correctIndex: 2,
      explanation:
        "Tested backups make ransomware recoverable without paying — payment doesn't guarantee recovery and funds further attacks.",
    },
    {
      id: "q8",
      question: "A browser extension for cleaning up a homepage requests permission to read and change data on every website visited. What does this suggest?",
      choices: [
        "Nothing unusual — all extensions need this level of permission",
        "The extension is automatically safe because it's popular",
        "Permissions never really matter for browser extensions",
        "A possible supply-chain/permission red flag, since the request exceeds the tool's stated purpose",
      ],
      correctIndex: 3,
      explanation:
        "Permission requests that exceed a tool's actual purpose are a red flag worth questioning — a key supply-chain-awareness habit.",
    },
  ],
  reflection: {
    prompt:
      "Choose one pattern from this lesson (DoS/DDoS, spoofing, MITM awareness, ransomware, injection-as-concept, or supply-chain risk). For a school club website or shared account, what impact would it have and what is one defensive control you'd prioritize?",
    placeholder: "Example: Ransomware — I'd prioritize tested backups of the club's shared Drive folder so an infected laptop wouldn't mean losing everything…",
  },
};
