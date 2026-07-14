import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson4: AILessonConfig = {
  id: "cs-4",
  title: "4. Social Engineering & Phishing",
  goal: "Define social engineering; distinguish phishing, smishing, vishing, and pretexting; spot red flags; verify requests safely; and practice report-don't-click habits.",
  xpReward: 200,
  badge: "Phish Defender",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/3",
  nextHref: "/learn/cyber/5",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-4.png",
        imageAlt: "Phone showing a phishing text beside a laptop with a fake urgent school email",
        body: `The strongest lock fails if someone tricks you into opening the door. **Social engineering** is manipulation that targets people — not just software bugs.\n\nHere's our roadmap:\n\n• **Social engineering** defined in plain English.\n• **Phishing, smishing, vishing, pretexting** — same idea, different channels.\n• **Red flags** — urgency, fear, prizes, weird links, odd sender details.\n• **Verify, then act** — how to check without clicking the trap.\n• **A worked example, a myth, and a mini case** — practicing on realistic (but safe) scenarios.\n• **Report, don't click** — the habit that protects you and your community.\n\nWe'll stay on the defender side: recognizing and reporting. No playbooks for running scams.`,
        callout: {
          label: "Why it matters",
          text: "A huge share of real-world account takeovers and malware infections start with a convincing message — not a Hollywood \"hacker typing in the dark.\"",
        },
      },
      {
        id: "hook-story",
        kicker: "A quick story",
        title: "Aaliyah's scholarship scare",
        body: `Aaliyah applied for three scholarships last month, so when an email arrives titled "Scholarship Committee: Action Required Within 24 Hours," her heart jumps. The email says her application is "at risk of disqualification" unless she confirms her identity by logging in through a link and entering her school email password.\n\nHer hand is already moving toward the link — this could be real money for college — when she notices the sender's address: a string of random letters at a domain that isn't quite the scholarship name she applied through. Close, but not exact.\n\nInstead of clicking, Aaliyah opens a new browser tab, searches for the scholarship organization's actual website herself, and logs into her own applicant portal directly. Her application status shows exactly what it should — no urgent action needed. The email was bait.\n\nAaliyah's win wasn't being naturally suspicious of everything — it was pausing at the exact moment urgency tried to rush her, and checking through a channel she controlled instead of the one the message provided.`,
        callout: {
          label: "Notice",
          text: "The email combined two powerful pressures at once: something Aaliyah genuinely cared about (money for college) and a tight deadline (24 hours). That combination is a phishing classic.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Social engineering terms",
        body: `• **Social engineering** — tricking people into giving information, access, or actions that weaken security.\n• **Phishing** — fraudulent messages (usually email) that impersonate trusted groups to steal credentials or deliver harm.\n• **Smishing** — phishing via SMS / text messages.\n• **Vishing** — phishing via voice calls.\n• **Pretexting** — inventing a fake scenario (a "pretext") to gain trust — "I'm from IT and need your password to fix your account."\n• **Spoofing** (concept) — faking a sender identity so a message looks more legitimate than it is.\n\nDifferent channels, same goal: make you trust and comply before you think.`,
        callout: {
          label: "Pro tip",
          text: "When you hear \"phish,\" think \"bait.\" Something attractive or scary is dangled so you'll bite — a prize, a threat, a fake deadline.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "Social engineering attacks the human",
        body: `**Social engineering** works because humans are helpful, busy, curious, and sometimes scared. Attackers exploit those normal traits.\n\nClassic pressure tactics (conceptual):\n• **Urgency** — "Act in 10 minutes or your account closes."\n• **Fear** — "Unusual login — confirm your password now."\n• **Greed / reward** — "You won a gift card — click to claim."\n• **Authority** — pretending to be a teacher, boss, bank, or IT staff.\n• **Helpfulness** — "Can you check this file for me?" from a compromised friend account.\n\nUnlike malware that sneaks onto a disk, social engineering often succeeds when **you** voluntarily type a password, approve an MFA prompt, send a code, or open a file.\n\nThat's why cybersecurity training always includes people skills — spotting manipulation is a technical defense.`,
        callout: {
          label: "Watch out",
          text: "Attackers increasingly compromise a real classmate's account and then message *you*. A familiar name is not proof the request is safe — verify odd asks.",
        },
        checkIn: {
          prompt: "Why does social engineering succeed even when a system's technical security is strong?",
          choices: [
            "Because it targets human trust and emotion instead of breaking software directly",
            "Because it always uses malware to force access",
            "Because strong passwords make social engineering easier",
            "Because it only works on people who don't use MFA",
          ],
          correctIndex: 0,
          explanation:
            "Social engineering bypasses technical controls by convincing a person to voluntarily hand over access, a code, or information.",
        },
      },
      {
        id: "concept-2",
        kicker: "Same scam, different inbox",
        title: "Phishing, smishing, vishing, pretexting",
        image: "/images/lessons/cs-4-2.png",
        imageAlt: "Three channels labeled email phishing, SMS smishing, and phone vishing on sticky notes",
        body: `Learn the channel names so you can describe what happened clearly:\n\n• **Phishing (email)** — fake "school IT," shipping, bank, or scholarship emails with links to lookalike login pages or risky attachments.\n• **Smishing (SMS)** — texts about package delivery, "school alerts," or account freezes with short links.\n• **Vishing (voice)** — phone calls where someone claims to be support and pushes you to share codes or remote-access permission.\n• **Pretexting** — the storyline used across channels: a made-up reason that makes the ask seem reasonable.\n\nRelated ideas you may hear:\n• **Spear phishing** — targeted at a specific person using personal details.\n• **Business Email Compromise (concept)** — attackers impersonate leaders to push urgent money or gift-card requests (more common in workplaces, but the urgency pattern shows up in student orgs too).\n\nYou don't need to memorize every marketing name. You need the pattern: **unexpected request + pressure + ask for secrets or clicks.**`,
        bullets: [
          "**Phishing** → email bait.",
          "**Smishing** → text bait.",
          "**Vishing** → call bait.",
          "**Pretexting** → fake story to gain trust.",
        ],
        callout: {
          label: "Why it matters",
          text: "Naming the channel helps you warn others accurately: \"I got a smishing text about my package\" is clearer than \"I got hacked.\"",
        },
        checkIn: {
          prompt: "Aaliyah's scholarship message arrived by email with a suspicious link. What is the correct channel name for this?",
          choices: ["Smishing", "Vishing", "Phishing", "Pretexting"],
          correctIndex: 2,
          explanation:
            "Fraudulent email impersonating a trusted organization is classic phishing. Smishing is texts; vishing is calls; pretexting is the fake storyline itself.",
        },
      },
      {
        id: "concept-3",
        kicker: "Spot the bait",
        title: "Red flags to notice",
        body: `No single flag is proof, but combinations are loud alarms:\n\n• **Unexpected** messages about accounts, money, grades, or deliveries.\n• **Urgent deadlines** designed to stop you from thinking.\n• **Asks for passwords, MFA codes, remote access, or gift cards.** Real IT almost never needs your password.\n• **Grammar oddities** or awkward branding (not always present — some scams look polished).\n• **Mismatched links** — the text says one site, but the real destination looks different (on devices, preview carefully; when unsure, don't click).\n• **Slightly wrong domains** — extra letters, weird endings, or lookalike names.\n• **"Confirm your identity"** links after a threat.\n• **Requests to keep it secret** — "Don't tell your teacher/parents."\n\nEmotion + secrecy + credential request is a triple red flag.`,
        callout: {
          label: "Common misconception",
          text: "\"I'd never fall for that.\" Skilled phishing is designed for busy moments — right before a game, during finals, or when you're expecting a real package. Humility is a defense.",
        },
        checkIn: {
          prompt: "Which combination of red flags is the strongest \"triple\" warning sign?",
          choices: [
            "A well-known company logo and correct spelling",
            "Emotion (urgency/fear), a request for secrecy, and a request for a password or code",
            "A message sent during business hours",
            "An email that takes a few seconds to load images",
          ],
          correctIndex: 1,
          explanation:
            "Emotion, secrecy, and credential requests together are a classic manipulation pattern — each one alone is common, but all three together is a strong alarm.",
        },
      },
      {
        id: "worked-example",
        kicker: "Step by step",
        title: "Analyzing a message like a defender",
        body: `Let's slow down and analyze a message the way a defender would — using a description rather than an actual malicious sample.\n\n**The message:** A text arrives saying, "Your school account will be LOCKED in 1 HOUR unless you verify now: [shortened link]." It arrived on a Sunday night, from a number you don't recognize, and no name is used — just "Student."\n\n**Step 1 — Channel.** This is **smishing** — phishing delivered by text.\n\n**Step 2 — Red flags.** Urgency ("1 HOUR"), fear (account lock), a generic greeting ("Student" instead of your name), an unfamiliar sender number, and a shortened link that hides the real destination.\n\n**Step 3 — What NOT to do.** Don't tap the link. Don't reply with any information, even "STOP" — replying can confirm the number is active and reachable.\n\n**Step 4 — What TO do.** Open your school portal directly (not through the text), check your account status there. If nothing looks wrong, the message was bait. Report it through your school's phishing-report process or tell a trusted adult, and delete or block the number.\n\nNotice the process: identify the channel, count the red flags, then verify through a channel *you* control — never the one the suspicious message gave you.`,
        checkIn: {
          prompt: "In the worked example, why is replying \"STOP\" to the suspicious text a bad idea?",
          choices: [
            "It isn't a bad idea — replying always opts you out safely",
            "It can confirm to the sender that your number is active and being read, which invites more attempts",
            "It automatically deletes the scam permanently",
            "It reports the message to your school automatically",
          ],
          correctIndex: 1,
          explanation:
            "Replying to unknown or suspicious numbers — even to opt out — can confirm the number is live, which scammers can use to target it further.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "\"I'd never fall for that\" — the confidence trap",
        body: `It's natural to look at an obvious scam example and think "I'd never fall for that." The problem is that real phishing isn't designed to fool your calm, well-rested, fully-focused self — it's designed to fool you at 11 p.m. before finals, five minutes before practice, or right when you're actually expecting a real delivery or a real scholarship update.\n\nSkilled phishing attempts are also often well-written, correctly branded, and personalized using information scraped from social media or previous data leaks (**spear phishing**). "I'd notice bad grammar" doesn't help against a message with none.\n\nThe safer mindset isn't overconfidence or constant paranoia — it's **humility plus a repeatable habit**: no matter how confident you feel, verify unexpected high-stakes requests through a channel you control, every time, without exception.`,
        callout: {
          label: "Reframe it",
          text: "Instead of \"I'm too smart to fall for phishing,\" try: \"phishing is designed for my most distracted moments, so I'll build a habit that works even then.\"",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Try it yourself: hunt for red flags",
        body: `Open your email or texts (with a parent's okay if needed) and look for one message that *could* plausibly be phishing bait — even if you're fairly sure it's actually legitimate. Maybe a shipping notification, a "your subscription is expiring" email, or a school alert.\n\nFor that message, answer:\n\n1. **What red flags does it have**, if any — urgency, unfamiliar sender, a link that doesn't match the claimed destination?\n2. **How would you verify it without clicking anything in the message itself** — what's the official app, site, or phone number you'd use instead?\n3. **If this turned out to be fake, who would you tell**, and how?\n\nThis kind of low-stakes practice — analyzing real, everyday messages — builds the reflex faster than only studying dramatic hypothetical examples.`,
        callout: {
          label: "Keep it real",
          text: "You don't need to find something scary. Practicing the verification habit on a boring, probably-legitimate message is just as valuable.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Defender response",
        title: "Going deeper: verify safely, report, and recover",
        image: "/images/lessons/cs-4-4.png",
        imageAlt: "Student verifying a link by calling IT on a known number instead of clicking, with a report button highlighted",
        body: `When something feels off, use this defender sequence:\n\n**1. Pause.** Urgency is often the weapon. Take a breath.\n**2. Don't click the link in the message** if you can avoid it. Don't open unexpected attachments.\n**3. Verify through a channel you trust.** Open the official app/site yourself (not from the message), call a known published number, or ask the person face-to-face / through a known good contact method.\n**4. Never share passwords or one-time codes** with someone who messaged you first.\n**5. Report.** Use your school's report button, mark as phishing if available, tell a parent/teacher/IT, and warn teammates if a shared account was targeted.\n**6. If you already clicked or entered a password** — don't panic-hide it. Change the password from a safe device, enable MFA, check recovery email/phone, and tell a trusted adult promptly.\n\n"Report, don't click" protects more than you. One report can stop a campaign from hitting your whole school.`,
        bullets: [
          "Pause — don't let urgency drive you.",
          "Avoid links/attachments in suspicious messages.",
          "Verify via official apps/sites or known contacts.",
          "Never hand over passwords or MFA codes to inbound requesters.",
          "Report suspected phishing quickly — and recover calmly if you already clicked.",
        ],
        callout: {
          label: "Try this week",
          text: "Practice once: open your email or texts and identify one message that *could* be phishing bait even if it might be legitimate. What red flags appear? How would you verify without clicking?",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Comparing the four channels",
        body: `A quick side-by-side of the channel names, since they're easy to mix up:\n\n• **Phishing (email)** — often mass-sent, can include fake login links or attachments; easiest to fake at scale.\n• **Smishing (SMS)** — short, urgent, hard to preview links on small screens; often about deliveries or account locks.\n• **Vishing (voice call)** — uses a real human (or increasingly, an AI-generated voice) to build pressure live, in real time, which can feel more convincing than text.\n• **Pretexting** — not a channel by itself, but the fake *story* used across any of the above ("I'm from IT," "I'm your bank's fraud team") to make the request sound reasonable.\n\nThe defender response is nearly identical across all four: pause, don't use the contact info the message gave you, verify independently, and report. Learning the names mainly helps you communicate clearly about what happened — the actual defense habit doesn't change much by channel.`,
        checkIn: {
          prompt: "Which of the four terms describes the fake scenario or story itself, rather than the communication channel?",
          choices: ["Phishing", "Smishing", "Vishing", "Pretexting"],
          correctIndex: 3,
          explanation:
            "Pretexting is the invented story used to gain trust — it can appear inside phishing, smishing, or vishing attempts.",
        },
      },
      {
        id: "defender-trap-or-myth",
        kicker: "Don't fall for this",
        title: "The trap: \"it's from someone I know, so it's safe\"",
        body: `A dangerous trap in this unit: assuming a message is safe because it appears to come from a friend, classmate, or teacher. Attackers increasingly compromise a real account first, then message that person's actual contacts — friends, teammates, group chat members — asking for something urgent: a code, a "quick favor" opening a file, or money for an emergency.\n\nThe trap works because your guard naturally drops for familiar names. But a familiar name only proves the *account* is real — not that the *person currently controlling it* is who you think.\n\nThe fix: treat unusual, out-of-character requests from friends the same way you'd treat a stranger's — especially if they involve money, codes, or urgent file downloads. A quick check through a different channel ("hey, did you just text me asking for a code?") takes seconds and closes this gap.`,
        callout: {
          label: "Watch out",
          text: "\"It's just [friend's name], I trust them\" is one of the most effective phishing setups precisely because it's often true — right up until their account gets compromised.",
        },
      },
      {
        id: "habits",
        kicker: "The core habit",
        title: "Report, don't click — and why it protects more than you",
        body: `Quick recap of the single most important habit in this lesson:\n\n• **Pause** when a message pushes urgency or fear.\n• **Don't click** links or open attachments inside a suspicious message.\n• **Verify independently** — official app/site, known phone number, or face-to-face.\n• **Never share** passwords or one-time codes with an inbound requester.\n• **Report** through your school's official channel, even if you're not 100% sure it's fake.\n\nReporting matters beyond your own safety: one report can help IT block a phishing campaign before it reaches the rest of your class, team, or school. "I wasn't sure, so I didn't bother reporting it" is a missed chance to protect people around you — when in doubt, report anyway.`,
        callout: {
          label: "Why it matters",
          text: "Reporting gives defenders visibility so they can warn others and block malicious messages organization-wide — it's a community habit, not just a personal one.",
        },
      },
      {
        id: "standards-connect",
        kicker: "Where this fits",
        title: "How this connects to real standards",
        body: `Today's content aligns with recognized standards in ways that go beyond simple vocabulary:\n\n• **CSTA 3A-NI-06** (Networks and the Internet) asks students to recommend security measures for various scenarios based on factors like feasibility and ethical impact — exactly the "verify, then report" recommendation you practiced across today's examples.\n• **CSTA 3A-IC-30** (Impacts of Computing) asks students to evaluate the social and economic implications of privacy in the context of safety, law, or ethics — directly relevant to phishing and scam awareness, which sits at the intersection of technology, safety, and personal responsibility.\n• **ISTE Digital Citizen (1.2b)** asks students to engage in safe, legal, and ethical behavior when using technology — the report-don't-click habit is a textbook example of safe digital citizenship in action.\n\nThese standards exist because phishing and scams are one of the most common ways real people — students included — actually experience harm online, far more often than sophisticated technical attacks.`,
        callout: {
          label: "Why it matters",
          text: "This is one of the most \"used in real life\" lessons in the whole track — most people encounter a phishing attempt long before they encounter any other topic in this unit.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and reflect",
        title: "Quick gut-check before you continue",
        body: `Before the mini case and knowledge check: think of the last message you got that made you feel a jolt of urgency or fear — even briefly. Did you verify it independently, or act on the message itself? There's no wrong answer here — just notice which habit you actually used in that real moment.`,
      },
      {
        id: "mini-case",
        kicker: "Case file",
        title: "Mini case: the \"IT support\" phone call",
        image: "/images/lessons/cs-4-5.png",
        imageAlt: "Student on the phone at a desk with a laptop showing a remote-access prompt and a sticky note saying verify first",
        body: `**The situation:** During a busy school week, a student named Malik gets a phone call from someone claiming to be from the school's IT help desk. The caller says Malik's laptop has been "flagged for a virus" and needs immediate remote access to fix it before it "spreads to the school network." The caller sounds calm, professional, and even knows Malik's name and grade level.\n\nMalik hesitates — he doesn't remember requesting any IT help, but the caller sounds legitimate and mentions urgency ("before it spreads"). The caller asks Malik to install a remote-access tool and read back a code that appears on his screen.\n\n**Apply what you've learned:**\n\n• **Channel:** This is **vishing** — a phone call used to build pressure and trust in real time.\n• **Pretext:** The caller's story ("your laptop is flagged, I need remote access now") is a classic **pretexting** setup — inventing urgency to justify an unusual request.\n• **Red flags:** Malik didn't request help, the request is urgent, and it asks for remote access plus a code — both of which real IT support typically arranges through official, pre-established channels, not a surprise phone call.\n\n**Defender action:** Malik should end the call, and independently contact the school's IT department using a number he already knows is legitimate (from the school website or a staff directory) to check if any ticket or flag actually exists. If it doesn't, he should report the call.`,
      },
      {
        id: "check-yourself",
        kicker: "Before you go",
        title: "Check yourself",
        body: `Quick self-check: can you name all four terms (phishing, smishing, vishing, pretexting) and correctly match each to its channel or role? Can you list the report-don't-click sequence from memory? If yes, you're ready for the knowledge check.`,
        checkIn: {
          prompt: "In the mini case, what made the caller's request particularly risky, even though they sounded professional and knew Malik's name?",
          choices: [
            "The request for remote access and a code, combined with urgency Malik didn't initiate",
            "The fact that the caller used a phone instead of email",
            "Nothing — professional-sounding callers are always legitimate",
            "The call happened during school hours",
          ],
          correctIndex: 0,
          explanation:
            "Sounding professional and knowing basic details doesn't confirm legitimacy. The unsolicited urgency plus request for remote access and a code are the real red flags.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Social engineering** manipulates people into unsafe actions.\n• **Phishing / smishing / vishing** are channel-specific baits; **pretexting** is the fake story.\n• Red flags: urgency, fear, prizes, credential asks, odd links/domains — and a familiar name doesn't guarantee safety.\n• Defender habit: **verify** through trusted channels and **report, don't click** — even when you're not fully sure.\n\nWhen you're ready, complete the **Knowledge check**, then reflect on a message that almost fooled you — or could have.`,
      },
    ],
  },
  bigIdeas: [
    "**Social engineering** targets human trust and emotion, not just software flaws.",
    "**Phishing, smishing, and vishing** are the same idea on email, text, and phone; **pretexting** invents a story to gain trust.",
    "Safe response: **pause, don't click, verify another way, never share codes/passwords, and report.**",
  ],
  keyTerms: [
    { term: "Social Engineering", definition: "Manipulating people into giving information, access, or actions that weaken security." },
    { term: "Phishing", definition: "Fraudulent messages, often email, impersonating trusted sources to steal credentials or cause harm." },
    { term: "Smishing", definition: "Phishing delivered through SMS or text messages." },
    { term: "Vishing", definition: "Phishing delivered through voice phone calls." },
    { term: "Pretexting", definition: "Using a made-up scenario to gain a victim's trust and compliance." },
    { term: "Spear Phishing", definition: "Phishing targeted at a specific person using personal details." },
    { term: "Spoofing", definition: "Faking a sender identity so a message appears more trustworthy." },
    { term: "Report-Don't-Click", definition: "A defender habit: avoid interacting with suspicious bait and report it through proper channels." },
  ],
  realWorld:
    "A text saying \"Your package is held — pay a small fee\" with a short link is classic **smishing**. A defender opens the shipper's official app separately (or ignores if no package is expected) instead of tapping the link.",
  quiz: [
    {
      id: "q1",
      question: "What is social engineering?",
      choices: [
        "Manipulating people into unsafe disclosures or actions",
        "Configuring firewalls to block malicious traffic",
        "A method for encrypting stored passwords",
        "Designing the layout of a social media app",
      ],
      correctIndex: 0,
      explanation:
        "Social engineering tricks humans — the goal is information, access, or actions that bypass technical controls.",
    },
    {
      id: "q2",
      question: "A fake bank call asking you to read your one-time login code is best described as:",
      choices: [
        "Smishing, since it involves a code",
        "A worm spreading through the phone network",
        "Vishing",
        "A patch the bank issued for security",
      ],
      correctIndex: 2,
      explanation:
        "Voice-call phishing is called vishing. (Smishing would be text; a worm is malware.)",
    },
    {
      id: "q3",
      question: "Which ask is a major red flag in a surprise \"IT support\" message?",
      choices: [
        "A reminder that password changes are available in the official portal",
        "A link to the school's publicly known homepage that you navigate to yourself",
        "Published office hours for the help desk",
        "A request for your password or MFA code in the chat/email",
      ],
      correctIndex: 3,
      explanation:
        "Legitimate support almost never needs you to send your password or one-time codes to an inbound message.",
    },
    {
      id: "q4",
      question: "What is the best first move when you get an urgent email with a login link you weren't expecting?",
      choices: [
        "Pause and verify through an official app/site or known contact — don't use the email's link",
        "Click quickly before the deadline mentioned in the email",
        "Reply with your password so they can \"verify\" you",
        "Forward the email with the link to friends so they can vote on whether it's real",
      ],
      correctIndex: 0,
      explanation:
        "Pause and verify independently. Using the message's link can take you to a lookalike page designed to steal credentials.",
    },
    {
      id: "q5",
      question: "Why is \"report, don't click\" useful beyond protecting just you?",
      choices: [
        "Reports can help IT block campaigns before more people are hit",
        "It isn't useful beyond you — reporting never helps anyone else",
        "It removes the need for anyone to use MFA",
        "It automatically stops ransomware from spreading",
      ],
      correctIndex: 0,
      explanation:
        "Reporting gives defenders visibility so they can warn others and block malicious messages organization-wide.",
    },
    {
      id: "q6",
      question: "A message from a real friend's account asks you urgently for a login code \"as a favor.\" What is the safest response?",
      choices: [
        "Send the code immediately since it's from a friend's real account",
        "Verify with your friend through a different channel before sending anything, since the account may be compromised",
        "Assume a friend's account can never be compromised, so no check is needed",
        "Post the code publicly so mutual friends can confirm it's genuine",
      ],
      correctIndex: 1,
      explanation:
        "A familiar name only proves the account is real — not that the person currently controlling it is trustworthy. Verify independently first.",
    },
    {
      id: "q7",
      question: "Which term describes the fake scenario or story used to make an unusual request seem reasonable, regardless of channel?",
      choices: ["Phishing", "Smishing", "Pretexting", "Vishing"],
      correctIndex: 2,
      explanation:
        "Pretexting is the invented story itself, and it can show up inside phishing, smishing, or vishing attempts.",
    },
    {
      id: "q8",
      question: "Why do cybersecurity standards connect phishing awareness to both safety/ethics and technical security measures?",
      choices: [
        "Because phishing is a purely technical problem with no human element",
        "Because ethics only applies to malware, not phishing",
        "Because reporting phishing is optional and has no real impact",
        "Because phishing exploits human trust and decision-making, making it as much a safety and ethics topic as a technical one",
      ],
      correctIndex: 3,
      explanation:
        "Phishing succeeds by manipulating people, not by breaking code — which is exactly why standards frame it as both a security and a digital-citizenship topic.",
    },
  ],
  reflection: {
    prompt:
      "Describe a phishing, smishing, or vishing attempt you've seen (or invent a realistic school-life example). List two red flags and how you would verify without clicking.",
    placeholder: "Example: A text said my school account would delete in 1 hour… Red flags were urgency and a weird link. I'd open the school portal myself and tell IT…",
  },
};
