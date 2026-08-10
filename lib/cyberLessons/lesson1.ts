import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson1: AILessonConfig = {
  id: "cs-1",
  title: "1. Cybersecurity Principles & Ethics",
  goal: "Evaluate ethical and social impacts of cybersecurity choices; explain tradeoffs among protecting data, systems, and people; and justify why authorized use is a non-negotiable professional and legal boundary.",
  xpReward: 50,
  badge: "Cyber Rookie",
  dashboardHref: "/dashboard",
  nextHref: "/learn/cyber/2",
  instructorScript: `**Coach's note**
Today's lesson: **Cybersecurity Principles & Ethics**.

**Goal:** Evaluate ethical and social impacts of cybersecurity choices; explain tradeoffs among protecting data, systems, and people; and justify why authorized use is a non-negotiable professional and legal boundary.

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
        image: "/images/lessons/cs-1.png",
        imageAlt: "Student desk with laptop showing a cybersecurity overview dashboard, shield icon, and notebook titled Ethics",
        body: `Your school account, your phone photos, your group's shared docs — all of that is information someone might want to steal, change, or lock away. **Cybersecurity** is the practice of protecting that information, the systems that hold it, and the people who use them.\n\nIn this lesson you will **analyze scenarios**, **evaluate ethical and social impacts**, and **explain tradeoffs** defenders face when protecting data, systems, and people.\n\nHere's our roadmap:\n\n• **What cybersecurity means** — protecting data, systems, and people as interconnected layers.\n• **The CIA Triad** — Confidentiality, Integrity, and Availability as decision criteria, not just labels.\n• **Careers in cyber** — analyst, SOC, and authorized testing roles, and how their scope differs.\n• **Ethics and authorized use** — evaluate why intent is not authorization, and what responsible reporting looks like.\n• **A worked example, a myth, and a mini case** — practice justifying defender decisions under real constraints.\n\nThis track stays **defensive and educational** — you learn how defenders analyze risk and ethics, not how to break systems.`,
        callout: {
          label: "Why it matters",
          text: "Almost every job, scholarship, and college workflow now touches accounts and online systems. Evaluating security tradeoffs and ethical boundaries is a high-school-level skill that transfers into any career path.",
        },
      },
      {
        id: "hook-story",
        kicker: "A quick story",
        title: "Maya's Sunday night surprise",
        body: `It's 9:47 p.m. on a Sunday, finals week starts tomorrow, and Maya's phone buzzes: **"New sign-in to your school email from a device we don't recognize."**\n\nHer stomach drops. Did someone get into her account? Is this real, or is it the account trying to scare her into clicking something? She has group project files, a scholarship application draft, and messages with her counselor sitting in that inbox.\n\nMaya does something small but important: she doesn't panic-click the link in the alert. She opens her email app directly instead, checks her account's recent activity from there, and — this time — it turns out *she* had logged in from a new laptop at the library earlier that day. False alarm. But the few seconds of \"wait, is this real?\" were not wasted.\n\nThat pause is the whole point of this unit. By the end of today's lesson, you'll have language and habits for moments exactly like Maya's — whether the alert turns out to be nothing, or something worth reporting.`,
        callout: {
          label: "Notice",
          text: "Maya didn't need to be a professional to react well. She needed a habit: verify through a channel you trust, not through the alert itself. You'll build more habits like that today.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `Before we dive in, here are the core words for this lesson — explained simply.\n\n• **Cybersecurity** is the practice of protecting digital information, devices, networks, and the people who use them from harm.\n• **Data** is information stored or moved digitally — passwords, essays, photos, grades, messages.\n• A **system** is a device or collection of devices and software that work together (a laptop, a school network, a cloud account).\n• A **threat** is anything that could cause harm to data, systems, or people — from a scam email to a stolen phone.\n• **Risk** is roughly "how likely is this threat, and how bad would it be" — defenders use it to decide what to worry about first.\n• A **defender** is anyone whose job (or habit) is to protect those things — that includes professionals and you.\n\nKeep these in mind. The rest of the lesson builds on them.`,
        callout: {
          label: "Pro tip",
          text: "When a cyber word feels fancy, swap in the plain meaning. \"Protect the system\" often just means \"keep the device, account, or network safe and working as intended.\"",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "Cybersecurity protects data, systems, and people",
        body: `**Cybersecurity** is not just "antivirus software" or "IT people locking doors." It is a whole set of habits, tools, policies, and skills aimed at keeping digital life safe and trustworthy.\n\nThink of three layers defenders care about:\n\n• **Data** — the information itself (your grades, a company customer list, medical records).\n• **Systems** — the devices, apps, and networks that store and move that data.\n• **People** — the humans who use those systems, who can be tricked, rushed, or targeted.\n\nIf you only lock down machines and ignore people, you miss a huge part of the job. If you only warn people and leave systems wide open, you miss another part. Real cybersecurity blends all three — and every control choice involves a **tradeoff**.\n\n**Evaluate a tradeoff:** A school that requires MFA on every login strengthens the people/systems layers, but if the MFA process is slow during a timed exam, **Availability** for authorized students can suffer. A folder shared "anyone with the link" maximizes collaboration speed but weakens Confidentiality for the data layer. Defenders don't pick "maximum lockdown" by default — they weigh impact on learning, privacy, and operations.\n\nA school-building analogy: locks on doors (**systems**), student records in locked cabinets (**data**), and staff who know not to hand keys to strangers (**people**). Cybersecurity is the digital version of that whole picture — including the judgment calls about when a door stays unlocked for a fire drill.`,
        bullets: [
          "**Data** = the information you want to keep safe.",
          "**Systems** = devices, apps, and networks that handle that data.",
          "**People** = users who can help protect — or accidentally put things at risk.",
          "**Tradeoff** = every control helps one layer or CIA goal and may cost another (speed, convenience, access).",
        ],
        callout: {
          label: "Watch out",
          text: "Cybersecurity is not about being paranoid all day. It is about evaluating controls so safe choices are the easy default — while still letting authorized people do their work.",
        },
        checkIn: {
          prompt: "In the school-building analogy, \"staff who know not to hand keys to strangers\" represents which layer?",
          choices: ["Data", "Systems", "People", "Threat"],
          correctIndex: 2,
          explanation:
            "Staff behavior is about the humans using the system — that's the **people** layer. Locks are systems; student records are data.",
        },
      },
      {
        id: "concept-2",
        kicker: "A defender's checklist",
        title: "The CIA Triad (first look)",
        body: `Professionals often summarize what "safe" means with three goals called the **CIA Triad**:\n\n• **Confidentiality** — only the right people can see the information. (Keep secrets secret.)\n• **Integrity** — information stays accurate and unaltered by unauthorized changes. (Don't let anyone quietly rewrite the truth.)\n• **Availability** — systems and data are there when authorized people need them. (A locked vault that never opens is not useful.)\n\nYou'll dig deeper into CIA in the next lesson. For now, notice that cybersecurity is not only "hide everything." Sometimes the failure is that a system is down during finals, or a grade file was changed without permission.\n\nAsk yourself about any situation: Is the data private enough? Is it trustworthy? Can people still get to what they need?`,
        callout: {
          label: "Why it matters",
          text: "CIA gives you a shared language. When something goes wrong, you can name which goal was hit — privacy leak, tampered file, or outage — instead of just saying \"hacked.\"",
        },
        checkIn: {
          prompt: "A school's testing portal crashes right before an exam deadline. Which CIA goal is most directly affected?",
          choices: ["Confidentiality", "Integrity", "Availability", "Authentication"],
          correctIndex: 2,
          explanation:
            "Availability means authorized people can reach systems when they need them. A crash at deadline time is a classic Availability failure.",
        },
      },
      {
        id: "concept-3",
        kicker: "Who does this work?",
        title: "Cyber careers: scope, permission, and impact",
        image: "/images/lessons/cs-1-2.png",
        imageAlt: "Split scene: SOC analyst at monitors beside a school IT help desk helping a student with an account lock",
        body: `Cybersecurity is a field with many roles. Skills from this class transfer whether or not you pursue a cyber major.\n\n• A **security analyst** looks for signs that something is wrong, investigates alerts, and recommends fixes before they become bigger problems. Their social impact is often quiet: fewer outages, fewer leaked records.\n• A **SOC** (Security Operations Center) is a team — often working in shifts — that watches for suspicious activity across an organization's systems and coordinates response. Their tradeoff is speed vs. accuracy: too many false alarms and people ignore real ones.\n• **Ethical / authorized roles** (sometimes called ethical hacking or penetration testing in industry) involve testing defenses **only with clear written permission** and a defined **scope**, then reporting findings so defenders can improve. Outside that scope, the same technical skill becomes unauthorized access.\n\n**Evaluate the ethical line:** "I found a weakness on the school portal and poked around to learn" may feel educational, but without written permission it can violate school policy and law — and it can harm classmates whose data sits on that system. The social impact of unauthorized testing is not abstract: grades, health forms, and scholarship drafts are real people's lives.\n\nOther paths include writing security policy, teaching users safe habits, building safer software, and responding after an incident. What they share: a defender mindset and **authorized use only**. Explore clubs, Cyber.org-style courses, CompTIA fundamentals topics, and ethical capture-the-flag events that stay inside the rules.`,
        callout: {
          label: "Watch out",
          text: "\"Ethical\" is not a feeling — it is permission plus scope. Testing a system without authorization can be illegal even if you \"meant well\" or only wanted to learn. Stay in approved labs and contests.",
        },
        checkIn: {
          prompt: "Which statement about ethical / authorized testing roles is true?",
          choices: [
            "They can test any system as long as their goal is educational",
            "They test defenses only with clear written permission, then report findings",
            "They are the same thing as a SOC analyst",
            "They never need to tell anyone what they found",
          ],
          correctIndex: 1,
          explanation:
            "Authorized testing always requires written permission from the system owner, and results get reported so defenders can fix issues.",
        },
      },
      {
        id: "worked-example",
        kicker: "Step by step",
        title: "Walking through a real scenario",
        body: `Let's apply what you've learned to a concrete situation.\n\n**Scenario:** It's exam week. At 8:00 a.m., the school's grade-submission portal goes down for six hours — right when teachers need to post final grades. Separately, a rumor spreads that a student accidentally saw another student's transcript because a classmate shared a "view" link in a group chat that turned out to allow editing and browsing by anyone with the link.\n\n**Step 1 — Identify the layers.** The portal outage involves a **system** (the portal itself) and the **data** (grades) it holds. The transcript rumor involves **data** (the transcript) and **people** (whoever shared the link carelessly, and whoever viewed it).\n\n**Step 2 — Name the CIA goal.** The six-hour outage is an **Availability** problem — authorized staff couldn't reach the system when they needed it. The transcript being seen by the wrong person is a **Confidentiality** problem — private data reached someone who shouldn't have had access.\n\n**Step 3 — Think like a defender.** For the outage: IT investigates why the portal failed and whether backups or redundancy could help next time. For the transcript: someone should tighten the link's sharing settings and report the exposure so the school can check who actually viewed it.\n\nNotice how naming the layer and the CIA goal turns a vague "something went wrong" into a clear, describable problem defenders can act on.`,
        checkIn: {
          prompt: "In the worked example, a student accidentally viewing another student's transcript is best classified as a threat to which CIA goal?",
          choices: ["Confidentiality", "Integrity", "Availability", "None of these — sharing links isn't a security issue"],
          correctIndex: 0,
          explanation:
            "Private information reaching someone who wasn't supposed to see it is a Confidentiality failure, even if no one intended harm.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "\"Cybersecurity is just antivirus and IT locking doors\"",
        body: `It's tempting to picture cybersecurity as one tool (antivirus) or one department (IT) doing all the work quietly in the background. That view misses most of the actual field.\n\nMany real incidents don't start with a clever technical exploit at all — they start with a person clicking a convincing link, reusing a weak password, or sharing a file a little too openly. That means **people** and **habits** are just as much a part of cybersecurity as firewalls and antivirus software.\n\nIt also misses the **Availability** side of the CIA Triad. A system that's "locked down" so tightly that authorized users can't do their jobs has also failed at cybersecurity — just in a different direction than a data leak.\n\nThe accurate picture: cybersecurity is a mix of **technology, policy, and human behavior**, aimed at keeping data, systems, and people all working safely together — not a single tool you install once and forget.`,
        callout: {
          label: "Reframe it",
          text: "Instead of \"cybersecurity = antivirus,\" try: \"cybersecurity = habits + tools + policies that protect data, systems, and people.\" That fuller picture is what this whole track builds on.",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Try it yourself: map your own accounts",
        body: `Time to practice with your own digital life. Grab a mental (or actual) list of three accounts you use for school or daily life — email, a learning platform, a game, a social app, anything real to you.\n\nFor each account, answer three quick questions:\n\n1. **Which layer matters most here** — the data in it, the system itself, or the people who could be tricked into misusing it?\n2. **Which CIA goal would hurt the most if this account were compromised** — losing privacy (Confidentiality), having something changed without your permission (Integrity), or losing access entirely (Availability)?\n3. **Who else could be affected** if this account were taken over — just you, or friends, classmates, teammates, or family too?\n\nThere's no single right answer here — the goal is practicing the *vocabulary* so it becomes automatic. If you found yourself naming a layer and a CIA goal without much effort, that's exactly the skill this lesson is building.`,
        callout: {
          label: "Keep it real",
          text: "Pick accounts that actually matter to you, not hypothetical ones. The habit sticks better when it's tied to something you'd genuinely be upset to lose.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Ground rules",
        title: "Going deeper: ethics and authorized use only",
        image: "/images/lessons/cs-1-4.png",
        imageAlt: "Permission checklist on a clipboard next to a laptop; red stamp Unauthorized vs green Authorized testing",
        body: `Curiosity is good. Breaking into accounts "to see if I can," scanning school networks without permission, or sharing someone's login is not.\n\n**Evaluate ethical tradeoffs** defenders and students face:\n\n• **Learning vs. harm:** Practicing skills in an authorized lab helps your future; practicing on live school systems can expose classmates' data and break Availability for everyone.\n• **Transparency vs. secrecy:** Responsible disclosure (report privately to IT) protects users while a fix is prepared. Publicly posting a weakness before a fix can amplify harm — even if your goal was "raising awareness."\n• **Convenience vs. consent:** Sharing a friend's password "so we can finish the project" may feel helpful, but it bypasses consent and breaks authentication/authorization models for that account.\n\nCore ethics for this class:\n\n• **Only use systems and data you are allowed to use.** Permission must be clear — school accounts for school work, personal accounts for you, lab environments for practice.\n• **Do not try to access, change, or disrupt** someone else's device, account, or network without authorization.\n• **Respect privacy.** Reading another student's messages or grades without permission is a privacy failure, even if no malware was involved.\n• **Report, don't exploit.** If you notice a weakness, tell a trusted adult or the right school/IT contact — don't demonstrate it by causing harm.\n\nThink of it like a chemistry lab: you learn about reactions in controlled, supervised settings. You don't mix random chemicals in the cafeteria "for science." Cybersecurity skills deserve the same supervised, permission-based environment.`,
        bullets: [
          "Permission first — always.",
          "Curiosity belongs in labs, clubs, and authorized challenges.",
          "Finding a problem → report it responsibly (private disclosure before public).",
          "\"I was just testing\" is not a defense without authorization.",
        ],
        callout: {
          label: "Pro tip",
          text: "If you are unsure whether something is allowed, stop and ask. In cybersecurity, \"ask first\" is a professional skill, not a weakness — and it is how you evaluate risk before impact.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Comparing defender career paths",
        body: `Now that you've met three common roles, it helps to see them side by side — same defender mindset, different day-to-day focus.\n\n• **Security analyst** — ongoing work, mostly reactive-and-preventive. Watches for alerts, investigates odd activity, and recommends fixes. Usually works with the same organization's systems every day.\n• **SOC (Security Operations Center) team** — a shared, often 24/7 shift-based team. Focused on real-time monitoring and coordinated response across an entire organization, not just one system.\n• **Ethical / authorized tester** — project-based work. Given explicit written permission and a defined scope, then tests defenses on purpose and reports findings — after which their access typically ends.\n\nWhat stays constant across all three: a **defender mindset** (the goal is to protect, not to harm) and **authorized use only** (permission comes before any testing). The differences are mostly about *when* they act (all the time vs. a scheduled project) and *scope* (one system vs. an entire organization).`,
        checkIn: {
          prompt: "Which role is defined by testing defenses only with clear written permission, then reporting findings so defenders can fix them?",
          choices: [
            "Threat actor",
            "Ethical / authorized tester",
            "SOC team",
            "Security analyst",
          ],
          correctIndex: 1,
          explanation:
            "Ethical / authorized testing is scoped, permission-based project work — test with permission, then report responsibly.",
        },
      },
      {
        id: "defender-trap-or-myth",
        kicker: "Don't fall for this",
        title: "The trap: \"I meant well, so it's fine\"",
        body: `Here's a trap that catches well-intentioned students: assuming good intentions automatically make an action okay.\n\nImagine a student notices a classmate left their laptop logged in and unlocked. Out of curiosity — or even to "teach them a lesson about security" — they poke around the account. No harm was intended. But permission was never given.\n\nThe trap is treating *intent* as the same thing as *authorization*. They are not the same. Authorization is a clear "yes" from the person or organization that owns the system or account — not a guess about what they'd probably be okay with, and not a good feeling about your own motives.\n\nThe fix is simple to say and takes practice to live by: if you don't have clear permission, don't act — ask, report, or walk away instead. Good intentions explain *why* you did something; they don't make it *authorized*.`,
        callout: {
          label: "Watch out",
          text: "\"I was just going to show them how insecure it was\" is one of the most common excuses given after an unauthorized access incident — and it doesn't hold up.",
        },
      },
      {
        id: "habits",
        kicker: "Make it personal",
        title: "Habits that make you an everyday defender",
        body: `Cybersecurity is not only for adults in office buildings. You already live in the threat landscape:\n\n• **Accounts** — school email, college portals, gaming, social apps, banking apps for older teens.\n• **Reputation and safety** — accounts taken over can be used to scam your friends or post as you.\n• **Future opportunities** — scholarships, applications, and first jobs all depend on accounts you can still access and trust.\n• **Community** — one weak shared password on a group project folder can put everyone's work at risk.\n\nA few starter habits carry outsized value:\n\n• Lock your phone and laptop screens when you step away.\n• Pause before clicking anything urgent or scary-sounding — verify through a channel you trust, like Maya did in this lesson's story.\n• Ask, "Who else could be hurt if this account were taken over?" — that question alone is a cybersecurity mindset.\n\nYou do not need to become a full-time analyst to benefit. Learning defender habits makes you harder to fool and more valuable on any team.`,
        callout: {
          label: "Try this week",
          text: "List three accounts you use for school or life. For each one, ask: Who else could get hurt if this account were taken over? That question is a cybersecurity mindset.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and reflect",
        title: "Quick gut-check before you continue",
        body: `Before you move on to the mini case and knowledge check, take thirty seconds with this thought — no need to write it down (yet):\n\nThink of one moment this week when you trusted a digital system without really thinking about it — logging into an app, opening a shared link, ignoring a notification. Which CIA goal was that system quietly protecting for you in that moment: Confidentiality, Integrity, or Availability?\n\nThere's no wrong answer. The point is noticing that CIA goals aren't abstract textbook ideas — they're running in the background of nearly everything you do online, all day, every day.`,
      },
      {
        id: "mini-case",
        kicker: "Case file",
        title: "Mini case: the shared class folder",
        image: "/images/lessons/cs-1-5.png",
        imageAlt: "Laptop showing a shared cloud folder with multiple student names and an edit-access warning icon",
        body: `**The situation:** A group of four students sets up a shared cloud folder for a semester-long project. To save time, one student sets the sharing permission to "anyone with the link can edit" instead of choosing specific people. The link gets forwarded a few times — to a study group chat, then to a friend outside the group "just to see the outline."\n\nA week before the deadline, the group discovers that a slide they'd finished was edited by someone none of them recognize, and a paragraph of their research summary is now missing. Nobody can tell for certain who made the change, because the folder's access log just shows "Anonymous."\n\n**Apply what you've learned:**\n\n• **Layers involved:** the project files are **data**; the cloud folder is the **system**; everyone who received the forwarded link is part of the **people** layer.\n• **CIA goals affected:** the missing paragraph is an **Integrity** failure (content changed without authorization); the inability to identify who changed it is also a **Confidentiality**/accountability gap, since the folder was more open than intended.\n• **Defender action:** tighten sharing to specific people only, restore the missing content from version history if the tool supports it, and treat "anyone with the link" as a setting to use rarely and intentionally — not as a shortcut.\n\nThis exact pattern — convenient sharing settings turning into an unclear mess — is one you'll see again once we cover access control and least privilege later in this track.`,
      },
      {
        id: "reporting-habits",
        kicker: "What to do next",
        title: "Reporting habits when something feels off",
        body: `When a login alert, odd message, or shared-folder surprise lands in your lap, defenders follow a short reporting habit — not a panic spiral.

**1. Pause and verify** through a channel you trust (official app, known IT number, face-to-face with a teacher).
**2. Write down what you saw** — time, account, device, exact wording of the alert, and whether you clicked anything.
**3. Tell the right contact** — school IT/help desk, a trusted adult, or the account owner for club tools.
**4. Protect others** — if it was a phishing message, report it so defenders can warn classmates before the same lure spreads.
**5. Follow up** — change passwords, enable MFA, and check recovery settings if IT or the adult confirms it was real.

Reporting is not tattling. It is how organizations learn about problems early enough to help everyone else. "I wasn't sure, so I stayed quiet" often means the same scam reaches twenty more people by lunch.`,
        callout: {
          label: "Defender view",
          text: "A useful report is specific: what happened, when, on which account or device, and what you already tried. Vague panic messages are harder for IT to act on.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Before you go",
        title: "Check yourself",
        body: `Quick self-check before the knowledge check: can you now name the three layers (data, systems, people), describe the CIA Triad in one sentence each, and explain why "I meant well" isn't the same as authorization? If yes, you're ready. If any of those feel shaky, scroll back — the next lesson builds directly on this vocabulary.`,
        checkIn: {
          prompt: "A school Wi-Fi outage during class prevents students from submitting an assignment on time. Which CIA goal is most directly impacted?",
          choices: ["Confidentiality", "Integrity", "Availability", "Authorization"],
          correctIndex: 2,
          explanation:
            "Being unable to reach a system when you need it — even without any data being stolen or changed — is an Availability problem.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Cybersecurity** protects **data**, **systems**, and **people** — and every control involves a **tradeoff** among those layers and CIA goals.\n• Defenders aim for **Confidentiality**, **Integrity**, and **Availability** (the CIA Triad) and must **explain** when tightening one weakens another.\n• Careers include **analysts**, **SOC** teams, and **ethical/authorized** testing roles — always with written permission and defined **scope**.\n• **Authorized use only** is the ethical line; "I meant well" is not the same as "I had permission." Prefer **responsible disclosure** over public exposure of weaknesses.\n• You will **evaluate** ethical and social impacts of security choices — not just memorize vocabulary.\n\nWhen you're ready, switch to the **Knowledge check**, then write a short reflection that justifies a security recommendation and its tradeoff.`,
      },
    ],
  },
  bigIdeas: [
    "**Cybersecurity** protects digital **data**, **systems**, and **people** — and every control choice involves tradeoffs.",
    "The **CIA Triad** (Confidentiality, Integrity, Availability) names what \"secure\" means; defenders evaluate when strengthening one goal costs another.",
    "Cyber work requires **ethics** and **authorized use only**; curiosity without permission can cause real social harm.",
  ],
  keyTerms: [
    { term: "Cybersecurity", definition: "The practice of protecting digital data, systems, and people from harm." },
    { term: "Data", definition: "Information stored or moved digitally, such as files, messages, and account details." },
    { term: "System", definition: "A device or group of devices and software that work together to store or process data." },
    { term: "CIA Triad", definition: "Confidentiality, Integrity, and Availability — three core security goals." },
    { term: "Threat", definition: "Anything that could harm data, systems, or people — from scams to malware to stolen devices." },
    { term: "Security Analyst", definition: "A professional who monitors for problems, investigates alerts, and helps strengthen defenses." },
    { term: "SOC", definition: "Security Operations Center — a team that watches for suspicious activity and responds to incidents." },
    { term: "Authorized Use", definition: "Using systems and data only with clear permission from the owner or organization." },
    { term: "Responsible Disclosure", definition: "Reporting a security weakness privately to the owner or IT so it can be fixed before public exposure amplifies harm." },
  ],
  realWorld:
    "When a school requires a login for grades, or a hospital protects patient records, they are practicing cybersecurity: keep the right data private (**confidentiality**), accurate (**integrity**), and reachable for staff who need it (**availability**).",
  quiz: [
    {
      id: "q1",
      question: "A school wants \"anyone with the link can edit\" on project folders for speed, but student research sometimes includes personal contact info. Which evaluation best explains the tradeoff?",
      choices: [
            "A common mix-up is to treat open editing always improves CIA, so there is no tradeoff as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat open editing only affects Availability and never Confidentiality as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat tradeoffs only matter for hospitals, not schools as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "Open editing boosts collaboration (Availability/usability) but weakens Confidentiality and Integrity for sensitive data — defenders should prefer named access for folders with personal info",
          ],
      correctIndex: 3,
      explanation:
        "Convenient open sharing helps authorized work finish faster, but it also lets strangers view or alter content. Evaluating that tradeoff is a core defender skill.",
    },
    {
      id: "q2",
      question: "IT proposes requiring MFA before every exam-portal login during timed tests. Which statement best explains the CIA tradeoff?",
      choices: [
            "A common mix-up is to treat mFA is irrelevant because exams are offline as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "MFA can strengthen Confidentiality (wrong people stay out) while risking Availability if prompts or device issues delay authorized students during a timed exam",
            "A common mix-up is to treat mFA always improves all three CIA goals with no downside as enough, which confuses a nearby idea with the right one",
            "A common mix-up is to treat mFA only affects Integrity and never Availability as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
          ],
      correctIndex: 1,
      explanation:
        "Stronger authentication often improves Confidentiality, but poorly timed friction can block authorized users — an Availability cost defenders must explain and mitigate.",
    },
    {
      id: "q3",
      question: "A student finds a possible weakness in a school website. Which next step best evaluates ethical and social impact?",
      choices: [
            "Report it privately to a trusted adult or the school's IT/security contact (responsible disclosure) so classmates' data is protected while a fix is planned",
            "Picking “Quietly fix it themselves using admin tools they found, without telling anyone” is a common mix-up that confuses a nearby idea with the right one",
            "A common mix-up is to treat post the weakness publicly immediately to \"raise awareness\" as enough, which confuses a nearby idea with the right one",
            "It can seem like try to break in further to prove the weakness — impact is educational, but that reading skips the distinction this question is testing",
          ],
      correctIndex: 0,
      explanation:
        "Responsible disclosure balances learning and transparency against harm. Exploring further, unauthorized \"fixes,\" or public posting before a fix can put real student data at risk.",
    },
    {
      id: "q4",
      question: "What does a SOC (Security Operations Center) typically do?",
      choices: [
            "Write the school's cybersecurity policies once a year",
            "Replace the need for individual account passwords entirely",
            "Approve every software purchase before it is installed",
            "Watch for suspicious activity and help respond when something looks wrong",
          ],
      correctIndex: 3,
      explanation:
        "A SOC is a team that monitors systems for signs of trouble and supports incident response — a defender role.",
    },
    {
      id: "q5",
      question: "Why should high school students care about cybersecurity?",
      choices: [
            "Only students planning a cybersecurity career need to learn this",
            "Their accounts, schoolwork, reputation, and future applications already depend on digital systems",
            "Cybersecurity only becomes relevant once someone has a full-time job",
            "Schools handle all security automatically, so students never need to think about it",
          ],
      correctIndex: 1,
      explanation:
        "Students already rely on accounts and online systems for school and life. Defender habits protect them now and build career-ready awareness.",
    },
    {
      id: "q6",
      question: "Which best distinguishes an ethical/authorized tester from a security analyst?",
      choices: [
            "Only analysts are ever allowed to notice security weaknesses",
            "The tester needs no permission at all",
            "They are exactly the same job with different titles",
            "The tester works scoped, permission-based projects; the analyst does ongoing monitoring and investigation",
          ],
      correctIndex: 3,
      explanation:
        "Ethical/authorized testers work within a defined, permitted scope and then report; analysts typically do continuous monitoring and response.",
    },
    {
      id: "q7",
      question: "A student says: \"I only looked at my friend's unlocked account because I meant well.\" What is the flaw in that reasoning?",
      choices: [
            "Good intentions explain motive but do not equal permission from the account owner",
            "Only professionals need permission to access accounts",
            "There is no flaw — good intentions always make an action authorized",
            "It's not a flaw as long as nothing was changed",
          ],
      correctIndex: 0,
      explanation:
        "Intent and authorization are different things. Without a clear \"yes\" from the account owner, accessing it is unauthorized regardless of motive.",
    },
    {
      id: "q8",
      question: "Why should a student evaluate both technical and ethical/legal impacts before \"testing\" a live school system?",
      choices: [
            "A common mix-up is to treat because technical skill alone replaces the need for permission as enough, which confuses a nearby idea with the right one",
            "Some learners answer “They shouldn't — cybersecurity is purely technical and permission is optional”, yet that does not match the precise idea from the lesson",
            "A common mix-up is to treat because ethics only matters after college as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "Because the same action can expose classmates' private data, break Availability for others, and violate policy/law even when the tester's motive was curiosity",
          ],
      correctIndex: 3,
      explanation:
        "Evaluating social and ethical impact means asking who else is affected — not only whether a technical trick \"worked.\" Permission and responsible disclosure come first.",
    },
  ],
  reflection: {
    prompt:
      "Recommend one security control for a school account or shared folder you use. Explain which CIA goal it strengthens, one tradeoff it creates (usability, speed, or access), and why you still recommend it — or when you would choose a weaker control instead.",
    placeholder: "Example: I'd recommend named-people edit access on our project folder. It strengthens Confidentiality/Integrity vs. \"anyone with the link,\" but slows inviting new members — still worth it because…",
  },
};
