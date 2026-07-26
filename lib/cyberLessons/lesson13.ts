import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson13: AILessonConfig = {
  id: "cs-13",
  title: "13. Attack Patterns & Program Security",
  goal: "Analyze how common attack patterns affect sensitive data and availability; explain program-security issues that can compromise software (unsafe input handling, insecure secret storage, dependency risk, misconfiguration) from a defender/developer-hygiene view; and map each pattern to layered controls — without learning how to exploit.",
  xpReward: 650,
  badge: "Attack Analyst",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/12",
  nextHref: "/learn/cyber/14",
  lessonModule: {
    durationLabel: "~25–30 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-13.png",
        imageAlt: "Defender dashboard showing blocked traffic and security alerts without attack tools",
        body: `Defenders study attacks the way firefighters study fire: to **analyze impact**, **explain weaknesses**, and **recommend controls** — not to start fires. Today you'll analyze how attack patterns affect sensitive data and how program-security hygiene fails under pressure.\n\nHere's our roadmap:\n\n• How to think like a **defender-analyst** (patterns, impact, controls).\n• **DoS / DDoS** — overwhelming availability.\n• **Spoofing** — faking identity (including voice and text scams).\n• **MITM (channel risk)** — hostile middle positions and why HTTPS/warnings matter.\n• **Ransomware** — recognizing the pattern and responding, not paying.\n• **Injection & program security** — unsafe input, secret storage, dependencies, misconfiguration — defender/developer hygiene, not exploit recipes.\n• **Supply-chain risk** — when harm arrives through a trusted vendor or app.\n• **Defense map** — justify which controls fit which family.\n\nIf a detail would help someone attack a system, we skip it. Ethical boundary: authorized defense and reporting only.`,
        callout: {
          label: "Why it matters",
          text: "You can't prioritize defenses if every headline sounds the same. Analyzing patterns helps you recommend MFA, patching, input validation, secret hygiene, and monitoring with clear tradeoffs.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Attack-pattern words (defender lens)",
        body: `• **Attack pattern** — a repeatable *category* of harmful technique (not a how-to).\n• **DoS (Denial of Service)** — making a system unavailable to legitimate users.\n• **DDoS** — a DoS launched from many sources at once.\n• **Spoofing** — pretending to be someone or something else.\n• **MITM** — positioning between parties to intercept or alter communications.\n• **Ransomware** — malware that blocks access to data/systems, typically demanding payment.\n• **Injection (concept)** — abusing software by feeding it input it treats as instructions or harmful data.\n• **Program security** — design and hygiene issues that can compromise apps: unsafe input handling, insecure secret storage, risky dependencies, and misconfiguration.\n• **Supply chain (security sense)** — trusted vendors, apps, or updates that could carry risk if compromised upstream.\n• **Availability** — systems and data reachable when needed (the \"A\" in CIA).\n\nFocus: what breaks, what sensitive data is exposed, what you'd notice, and which controls you'd recommend.`,
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
            "Assuming every attack is identical regardless of pattern” belongs to a different situation than the one in the question stem",
            "Ignoring it because only large companies need to care” belongs to a different situation than the one in the question stem",
            "Finding step-by-step instructions to try the attack yourself” belongs to a different situation than the one in the question stem",
            "Identifying the CIA impact, what you'd notice, and which controls would help",
          ],
          correctIndex: 3,
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
            "Because it shows multiple points where a control or detection could interrupt the compromise — supporting layered defense",
            "Picking “Because it teaches attackers new techniques” is a common mix-up that confuses a nearby idea with the right one",
            "It can seem like because only the final stage matters, but that reading skips the distinction this question is testing",
            "It can seem like because chains only apply to ransomware, but that reading skips the distinction this question is testing",
          ],
          correctIndex: 0,
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
            "Check hosting status, contact the provider, communicate with users, and consider more resilient hosting if it recurs",
            "“Assume nothing can be done and give up on the event” describes a different situation than the one in the question stem",
            "“Shut down the club's internet access permanently” describes a different situation than the one in the question stem",
            "Try to trace and retaliate against whoever might be responsible” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Whether it's genuine overload or a DoS pattern, the practical defender response is the same: escalate to hosting support and communicate clearly — not attempt retaliation.",
        },
      },
      {
        id: "spoofing-mitm",
        kicker: "Fake identity & middle position",
        title: "Spoofing and MITM — trust and channels under attack",
        body: `**Spoofing** means faking identity: a lookalike email address, a fake caller ID, a cloned site name, a forged \"From\" line. The goal is to make you trust the wrong party. This includes **vishing** (voice phishing calls) and **smishing** (phishing via text message) — same trick, different channel. Analyze the CIA impact: spoofing often targets **confidentiality** (credentials, MFA codes) and **integrity** of trust decisions.\n\n**MITM (channel risk)** means an attacker tries to sit in the middle of a conversation or connection — especially on untrusted networks — hoping to read or alter data. You do not need offensive setup details to evaluate the risk: HTTPS, certificate warnings, and avoiding sensitive logins on hostile networks are the defender controls that matter.\n\n**Defender focus:**\n\n• Verify unexpected requests out-of-band (call a known number, use official apps).\n• Check URLs and email domains carefully; be equally skeptical of unexpected calls and texts.\n• Prefer HTTPS; heed certificate warnings — treat them as integrity signals, not annoyances.\n• Use MFA so a single spoofed login page capture is less fatal.`,
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
            "Hang up and call the number on your card/official app yourself — never read MFA codes to an unsolicited caller",
            "Read the code, since caller ID confirms it's really the bank” belongs to a different situation than the one in the question stem",
            "Assume it's fine since they already knew your phone number” belongs to a different situation than the one in the question stem",
            "“Text the code back instead of saying it out loud” describes a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Caller ID can be spoofed, and legitimate banks never need you to read back a live MFA code. Verify out-of-band using a number you already trust.",
        },
      },
      {
        id: "ransomware-awareness",
        kicker: "The pattern to recognize",
        title: "Ransomware: recognizing the pattern, not paying the demand",
        image: "/images/lessons/cs-13-4.png",
        imageAlt: "Locked file icon with a ransom note banner for defensive education",
        body: `**Ransomware** is malware that blocks access to files or systems — usually by encrypting them — and then demands payment, typically for a decryption key. Analyze it as an **availability** *and* **integrity** threat that can also expose **confidentiality** if operators threaten to leak stolen copies.\n\n**Recognizing it:** files suddenly won't open, extensions change unexpectedly, and a note appears demanding payment (often in cryptocurrency) with a countdown or threat.\n\n**Defender response (recovery and reporting — not negotiation playbooks):**\n\n• **Don't pay** as a first instinct — payment doesn't guarantee recovery and funds further attacks; involve IT/law enforcement guidance through trusted adults for serious cases.\n• **Disconnect** the affected device from networks to limit spread to other systems/drives, if it's safe and you know how.\n• **Restore from backups** — this is *the* reason Lesson 11's backup habits exist. A tested, offline or separately-stored backup turns ransomware from a catastrophe into an inconvenience.\n• **Report it** — school/organizational incidents should go to IT immediately; this is not a "figure it out alone" situation.\n\nRecommend backups *before* the incident; justify them by comparing recovery time and residual risk against "hope and pay."`,
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
            "Waiting for the ransom note to expire on its own",
            "Paying the ransom immediately for guaranteed recovery",
            "Restoring from a clean, tested backup made before the attack",
            "Sharing the ransom note publicly for sympathy” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "Tested backups turn ransomware into a recoverable inconvenience instead of a catastrophe — paying is discouraged since it doesn't guarantee recovery and funds further attacks.",
        },
      },
      {
        id: "injection-concept",
        kicker: "Bad input, bad outcomes",
        title: "Injection as a concept: tricking software with input",
        body: `Many programs take input (forms, search boxes, file names) and process it. **Injection**, as a *concept*, is when crafted input tricks software into doing something the designer didn't intend — treating data like a command, breaking out of a safe context, or smuggling harmful instructions into a system. Analyze the impact on **sensitive data**: a successful injection-class failure can leak records, alter integrity of stored values, or escalate what an account can do.\n\nYou do **not** need SQL samples, payloads, or exploit walkthroughs to explain the defender/developer job:\n\n• Treat all user input as untrusted.\n• Use frameworks and APIs that separate *data* from *commands* (safe parameterization / validation).\n• Limit what each account can do even if a bug appears (**least privilege**).\n• Keep software patched; many injection flaws are fixed in updates.\n• Log weird input patterns and failures for detection.\n\nIf you build apps later, learn secure coding with teachers in authorized labs — never by practicing attacks on live systems.`,
        bullets: [
          "Concept: unexpected input can confuse software and expose sensitive data.",
          "Defense: validate input, use safe APIs, least privilege, patching.",
          "Explain the issue and recommend controls — do not practice exploits.",
        ],
        callout: {
          label: "Ethics & safety",
          text: "Trying injection techniques against websites or school systems without explicit permission is unauthorized access — illegal and against academy rules.",
        },
      },
      {
        id: "injection-concept-example",
        kicker: "See it in action",
        title: "Why 'trust nothing typed by a user' is the whole idea",
        body: `Imagine a club sign-up form that stores whatever a visitor types into a "team name" box. If the underlying software naively treats that typed text as trustworthy and mixes it directly into commands behind the scenes, unexpected or malformed input could confuse the system in ways the designer never intended — this is the injection *concept*, without any code example needed.\n\nThe defensive fix a developer would apply (again, concept only): always treat the "team name" as pure data, never as something that could be interpreted as instructions, no matter how it's phrased. Well-built form libraries and frameworks handle this separation automatically — which is exactly why "use trusted, well-maintained frameworks instead of rolling your own from scratch" is such common secure-development advice.\n\nAs a student defender, your takeaway is analytical: explain *why* "never trust raw user input" protects confidential data, so you can recommend patching, least privilege, and reputable software when this class of bug appears in the news.`,
        checkIn: {
          prompt: "What is the core defensive principle behind preventing injection-style bugs?",
          choices: [
            "Treat all user-supplied input as untrusted data, and use frameworks that clearly separate data from commands",
            "Injection bugs can only be fixed by deleting the input form entirely” belongs to a different situation than the one in the question stem",
            "“Only allow input from users you personally know” describes a different situation than the one in the question stem",
            "Trust all user input completely since users are always well-intentioned” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "The defender principle is: never assume user input is safe. Frameworks and validation that separate data from commands are the standard fix.",
        },
      },
      {
        id: "program-security",
        kicker: "Software hygiene",
        title: "Program security: how apps compromise themselves",
        body: `Attack patterns often succeed because of **program-security issues** — weaknesses in how software is built, configured, or maintained. CSTA asks you to *explain* these issues from a defender/developer-hygiene view, not demonstrate how to abuse them.\n\n**Four high-impact categories:**\n\n**1. Unsafe input handling** — forms, uploads, and APIs that trust raw user data. Defense: validate length/type, separate data from commands, refuse unexpected formats.\n**2. Insecure storage of secrets** — API keys, passwords, or tokens pasted into shared docs, committed to public repos, left in screenshots, or hardcoded in apps. Defense: secrets managers / env vars for real projects; never paste live keys into group chats; rotate anything that may have leaked.\n**3. Dependency risk** — libraries, plugins, npm/pip packages, or CMS themes you didn't write. An outdated or untrusted dependency can import someone else's bug into *your* app. Defense: prefer maintained packages, update promptly, minimize how many you install (ties to supply-chain thinking).\n**4. Misconfiguration** — default admin passwords left on, debug mode left on in production, cloud buckets/folders set to public, logging that dumps secrets, open ports nobody meant to expose. Defense: change defaults, inventory what is public, follow least privilege on service accounts.\n\n**Compare tradeoffs:** locking everything down can hurt usability (club forms that reject valid names); ignoring hygiene invites data loss. Recommend the smallest control set that protects sensitive fields without breaking the club's real workflow.`,
        bullets: [
          "Input validation and safe APIs protect data integrity and confidentiality.",
          "Secrets never belong in chat, screenshots, or public repos.",
          "Dependencies and misconfigurations are program-security risks you can reduce without writing exploits.",
        ],
        callout: {
          label: "Defender / developer hygiene",
          text: "If you ship or configure software later: validate input, store secrets properly, update dependencies, and audit defaults — authorized labs only for hands-on practice.",
        },
      },
      {
        id: "program-security-example",
        kicker: "See it in action",
        title: "Four program-security failures, one club app",
        body: `Greenwood-style media club builds a small event sign-up page. Analyze each failure for *sensitive-data impact* and the hygiene fix — still no exploit steps:\n\n• **Unsafe input:** a free-text "notes" field is stored and later displayed without checks. Unexpected content could break the page or confuse backend processing. Fix: treat notes as data only; limit length; use a framework that escapes output.\n• **Insecure secrets:** an officer pastes the hosting API key into a shared Drive doc titled "passwords." Anyone with the link can take over the site. Fix: remove the key from Drive, rotate it with the host, store replacements only where authorized adults/tools allow.\n• **Dependency risk:** a fancy "form builder" plugin hasn't been updated in two years. Fix: replace with a maintained option or the host's built-in form; document who reviews plugin updates each semester.\n• **Misconfiguration:** the signup spreadsheet is set to "anyone with the link can edit," exposing emails and allergy notes. Fix: named sharing only; treasurer + advisor as editors; members as viewers.\n\n**Justify a priority:** rotating the leaked API key and locking the spreadsheet beat buying a new firewall — high impact on confidentiality, low cost, high feasibility.`,
        checkIn: {
          prompt: "A club stores its hosting API key in a shared Drive doc and leaves a signup sheet as \"anyone with the link can edit.\" Which analysis best matches program-security thinking?",
          choices: [
            "Insecure secret storage and misconfiguration both threaten confidential data; rotate the key, remove it from Drive, and restrict sharing — higher-leverage than shopping for gadgets",
            "A common mix-up is to treat these are mostly cosmetic issues; only network attacks matter as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat dependencies never matter for club websites as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat the correct response is to publish exploit steps so members understand the risk as enough, which confuses a nearby idea with the right one",
          ],
          correctIndex: 0,
          explanation:
            "Program security focuses on hygiene: secrets and misconfiguration routinely expose sensitive data. Fix and justify those controls before chasing exotic tools.",
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
            "Grant every permission apps request without reviewing them” belongs to a different situation than the one in the question stem",
            "“Install it immediately since it's popular” describes a different situation than the one in the question stem",
            "Assume all extensions from any source are equally safe” belongs to a different situation than the one in the question stem",
            "Pause and question whether the requested permission matches the tool's actual purpose before installing",
          ],
          correctIndex: 3,
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
        body: `Match pattern → recommend controls (and be ready to justify why):\n\n• **DoS/DDoS** → resilient hosting, monitoring, escalation to providers, comms plan.\n• **Spoofing (email/text/voice)** → verify identity out-of-band, URL/domain checks, phishing awareness, MFA.\n• **MITM risk** → HTTPS, avoid sensitive logins on hostile networks, respect cert warnings.\n• **Ransomware** → phishing awareness, patching, least privilege, and — most of all — tested backups.\n• **Injection / program security** → input validation, safe APIs, secret hygiene, dependency updates, config audits, least privilege.\n• **Supply-chain risk** → minimize installs, prefer official sources, review permissions, keep everything updated.\n• **Across the board** → logging/monitoring + IR basics from Lesson 12.\n\nAnalyst cheat sheet: **impact on sensitive data → signals → recommended controls → tradeoffs**.`,
        callout: {
          label: "Try this week",
          text: "Pick one news headline about a cyber incident. Analyze the pattern family (if clear), name one program-security or operational control that might have helped, and justify why you'd prioritize it.",
        },
      },
      {
        id: "headline-drill",
        kicker: "Scenario walkthrough",
        title: "Running the three-question drill on a headline",
        body: `**Headline:** "Regional hospital reports outage after cyber incident."

**Question 1 — Impact:** Availability hit (care delayed); possible confidentiality/integrity if records involved.
**Question 2 — Signals:** Unexpected downtime, possible ransom note, abnormal admin logins (defenders investigate).
**Question 3 — Controls:** Segmentation, backups, MFA on remote access, IR plan, monitoring — which were present or missing?

You are not solving the case from a news clip. You are practicing the analyst reflex: impact → signals → controls. That reflex is what turns scary headlines into learnable patterns instead of vague fear.`,
        checkIn: {
          prompt: "In the defender three-question drill, what does the second question focus on?",
          choices: [
            "Which exploit code was used” belongs to a different situation than the one in the question stem",
            "What signs defenders might look for or might have missed",
            "How much the attacker earned” belongs to a different situation than the one in the question stem",
            "Whether the company deserved it” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "The second question trains you to think about detection signals and observability — defender skills, not attack recipes.",
        },
      },
      {
        id: "ransom-decisions",
        kicker: "Decision checklist",
        title: "Ransomware decisions without paying on impulse",
        body: `If screens lock or files rename with ransom notes:

**Do immediately:**
• Disconnect from network (pull ethernet / disable Wi-Fi) to limit spread.
• Report to IT/trusted adult — do not negotiate alone.
• Check whether clean backups exist and when they were last tested.

**Do not by default:**
• Pay ransom without organizational guidance — payment does not guarantee recovery and funds crime.
• Delete ransom notes or wipe devices before responders advise.

**Comparison — recovery paths:**
• **Tested offline backup** — strongest student/club-level recovery.
• **Cloud versioning** — may help if ransomware did not encrypt all synced copies.
• **Paying ransom** — last-resort organizational decision with legal and ethical implications, not a solo click.

Lesson 11 backups and Lesson 12 IR meet here — preparation beats panic.`,
      },
      {
        id: "supply-chain-habits",
        kicker: "Defender habits",
        title: "Supply-chain habits for extensions and apps",
        body: `Before installing anything new:

• Does the publisher match the official source?
• Do requested permissions match the app's job?
• Is it actively maintained (recent updates)?
• Can you accomplish the task without installing at all?

**Quarterly review:** list installed browser extensions and phone apps tied to school/club work — remove what you do not use.

**Reporting:** if a compromised extension is suspected, report through school IT and remove it before telling others to install a "replacement" you have not verified.

Supply-chain risk is boring until one bad extension reads every page you visit — then it is everyone's problem.`,
        bullets: [
          "Fewer installs = smaller attack surface.",
          "Permissions are promises — read them.",
          "Official store ≠ automatic safety; still review.",
        ],
      },
      {
        id: "pattern-myths",
        kicker: "Myth check",
        title: "Attack-pattern myths defenders should drop",
        body: `• **"Knowing attack names makes me a hacker."** Pattern names are vocabulary for analysis and defense — like knowing "fire" does not make you an arsonist.
• **"DDoS is the same as any outage."** Similar symptom, different intent and response — escalation to providers and comms plans matter for DDoS.
• **"Ransomware only hits big companies."** Schools and clubs with weak backups are attractive too.
• **"Injection is only a programmer problem."** Program-security hygiene (input, secrets, dependencies, config) and user caution both matter — explain the issue, recommend controls.

Stay in the defender lane: analyze impact, recommend controls, justify tradeoffs, report.`,
        callout: {
          label: "Defender view",
          text: "When classmates ask \"how would someone do that?\" redirect to \"what sensitive data is at risk, what would we notice, and which control would you recommend?\"",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Analyze** attacks as **patterns** for defense — never as recipes.\n• **Attack chain:** initial access → foothold → lateral movement → goal → defender response — layered defenses can interrupt it at multiple points.\n• **MFA**, **phishing-resistant MFA**, and **impossible-travel** are key detection signals.\n• **DoS/DDoS** hits availability; **spoofing** fakes identity; **MITM** threatens the channel; **ransomware** hits availability/integrity (and sometimes confidentiality via leak threats).\n• **Program security:** explain unsafe input handling, insecure secret storage, dependency risk, and misconfiguration — then recommend hygiene controls.\n• **Supply-chain risk** arrives through trusted vendors; minimize installs and review permissions.\n• For each pattern: evaluate impact on sensitive data, name signals, and **justify** recommended controls.\n\nComplete the **Knowledge check**, then reflect with a justified control priority for a club system.`,
      },
    ],
  },
  bigIdeas: [
    "Defenders **analyze** attack **patterns** to evaluate impact on sensitive data and **recommend** controls — not to offend — and layered defenses can interrupt an attack chain at multiple stages.",
    "**DoS/DDoS** targets availability; **spoofing** fakes identity; **MITM** threatens the path between parties; **ransomware** threatens availability and integrity (sometimes confidentiality too).",
    "**Program security** issues — unsafe input, insecure secrets, risky dependencies, misconfiguration — and **supply-chain risk** are explained and mitigated with developer hygiene and cautious installs, never by practicing exploits.",
  ],
  keyTerms: [
    { term: "DoS", definition: "Denial of Service — making a system unavailable to legitimate users." },
    { term: "DDoS", definition: "Distributed Denial of Service — a DoS involving many sources." },
    { term: "Spoofing", definition: "Faking identity (email, caller ID, text, or site) to gain trust or mislead a target." },
    { term: "MITM", definition: "Man-in-the-middle — secretly sitting between communicating parties." },
    { term: "Ransomware", definition: "Malware that blocks access to data or systems, typically demanding payment for restoration." },
    { term: "Injection (concept)", definition: "Abusing software by supplying input that is mishandled as harmful instructions or data." },
    { term: "Program security", definition: "Defender/developer hygiene issues that can compromise software: unsafe input handling, insecure secret storage, dependency risk, and misconfiguration." },
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
            "It permanently encrypts files for ransom by definition",
            "It always steals passwords silently without any downtime",
            "It mainly harms confidentiality, not availability” belongs to a different situation than the one in the question stem",
            "It harms availability so legitimate users can't use the service",
          ],
      correctIndex: 3,
      explanation:
        "DoS/DDoS aims to overwhelm or block service so real users can't get through — an availability attack, not encryption or silent theft.",
    },
    {
      id: "q2",
      question: "Which example best matches spoofing from a defender's view?",
      choices: [
            "Writing a lessons-learned report after an incident",
            "A lookalike email address pretending to be the school IT desk",
            "Turning on MFA for an account” belongs to a different situation than the one in the question stem",
            "Installing official OS updates” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "Spoofing fakes identity. A lookalike IT email is a classic example defenders train people to spot.",
    },
    {
      id: "q3",
      question: "A club evaluates MITM risk on public café Wi-Fi before officers log into sponsor email. Which recommendation best balances security and usability?",
      choices: [
            "It can seem like ban all Wi-Fi forever and require paper-only communication, but that reading skips the distinction this question is testing",
            "Some learners answer “Share the club password so anyone can finish the task on any network”, yet that does not match the precise idea from the lesson",
            "It can seem like ignore certificate warnings so login is faster, but that reading skips the distinction this question is testing",
            "Prefer HTTPS, heed certificate warnings, avoid sensitive logins on untrusted networks, and use MFA — without needing offensive MITM setup knowledge",
          ],
      correctIndex: 3,
      explanation:
        "Defenders analyze channel risk and recommend HTTPS, warnings, safer networks, and MFA — ethical depth without offensive techniques.",
    },
    {
      id: "q4",
      question: "Which statement best explains injection as a program-security issue that can compromise sensitive data?",
      choices: [
            "A common mix-up is to treat injection means encrypting a hard drive until a ransom is paid as enough, which confuses a nearby idea with the right one",
            "A common mix-up is to treat injection only affects paper forms, not real software as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "Unsafe input can be mishandled as instructions; defenders explain the risk and recommend validation, safe APIs, patching, and least privilege — not exploit practice",
            "A common mix-up is to treat here is a detailed SQL exploit students should try on live sites as enough, which confuses a nearby idea with the right one",
          ],
      correctIndex: 2,
      explanation:
        "CSTA framing: explain how program issues can compromise data and recommend hygiene controls. No exploit recipes.",
    },
    {
      id: "q5",
      question: "When analyzing a new attack headline, what should a defender prioritize first?",
      choices: [
            "It can seem like disable all logging so alerts stop appearing, but that reading skips the distinction this question is testing",
            "Some learners answer “Search for step-by-step attack tools to recreate it at school”, yet that does not match the precise idea from the lesson",
            "It can seem like ignore it because only experts need to understand patterns, but that reading skips the distinction this question is testing",
            "Analyze the pattern, CIA impact on sensitive data or availability, detection signals, and which controls to recommend — then justify tradeoffs",
          ],
      correctIndex: 3,
      explanation:
        "Analyst mode: pattern → impact → signals → recommended controls with justification. Never practice attacks without authorization.",
    },
    {
      id: "q6",
      question: "A caller with a spoofed caller ID asks you to read back an MFA code just texted to you. What's the correct response?",
      choices: [
            "Read the code, since caller ID showed a trusted name. That option sounds confident, but it leaves out the deciding constraint",
            "Hang up and independently contact the organization using a known number — never read a live MFA code to an unsolicited caller",
            "“Assume it's safe because they already knew your phone number” describes a different situation than the one in the question stem",
            "Picking “Text the code to a friend to double-check first” is a common mix-up that confuses a nearby idea with the right one",
          ],
      correctIndex: 1,
      explanation:
        "Caller ID can be spoofed. Legitimate organizations never need a live MFA code read back over the phone — verify independently instead.",
    },
    {
      id: "q7",
      question: "What is the single most effective defense once ransomware has already encrypted a device's files?",
      choices: [
            "Restoring from a clean, tested backup made before the attack",
            "Waiting for the note to disappear on its own” belongs to a different situation than the one in the question stem",
            "Reinstalling random software until something works",
            "Paying the ransom for guaranteed recovery” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "Tested backups make ransomware recoverable without paying — payment doesn't guarantee recovery and funds further attacks.",
    },
    {
      id: "q8",
      question: "A browser extension for cleaning up a homepage requests permission to read and change data on every website visited. What does this suggest?",
      choices: [
            "Permissions never really matter for browser extensions” belongs to a different situation than the one in the question stem",
            "A possible supply-chain/permission red flag, since the request exceeds the tool's stated purpose",
            "Nothing unusual — all extensions need this level of permission” belongs to a different situation than the one in the question stem",
            "The extension is automatically safe because it's popular” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "Permission requests that exceed a tool's actual purpose are a red flag worth questioning — a key supply-chain defense habit.",
    },
    {
      id: "q9",
      question: "An officer pastes a live API key into a shared Drive doc and leaves a signup sheet as \"anyone with the link.\" Which program-security analysis is strongest?",
      choices: [
            "A common mix-up is to treat only network firewalls can protect against these mistakes as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "Insecure secret storage and misconfiguration can expose sensitive data; rotate the key, remove it from Drive, restrict sharing, and justify those fixes as high-impact, low-cost hygiene",
            "A common mix-up is to treat publishing how to abuse the key helps the club learn faster as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat aPI keys in shared docs are fine if the club trusts its members as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
          ],
      correctIndex: 1,
      explanation:
        "Program security explains how secret handling and misconfiguration compromise data, then recommends and justifies hygiene controls — never exploit practice.",
    },
  ],
  reflection: {
    prompt:
      "Pick one attack pattern AND one program-security issue (unsafe input, insecure secrets, dependency risk, or misconfiguration) that could affect a school club website or shared account. Analyze CIA impact on sensitive data, recommend one control for each, and justify why those controls beat a lower-priority alternative (feasibility or usability tradeoff).",
    placeholder: "Example: Ransomware + misconfigured public Drive link — impact is availability of project files and confidentiality of sponsor emails. I'd prioritize tested backups and named-only sharing over buying a new router because…",
  },
};
