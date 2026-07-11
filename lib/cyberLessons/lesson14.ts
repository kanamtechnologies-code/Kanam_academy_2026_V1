import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson14: AILessonConfig = {
  id: "cs-14",
  title: "14. OSINT Awareness & Privacy",
  goal: "Understand how public information creates exposure, practice ethical self-checks, tighten privacy settings, and think defensively about what adversaries might learn from public posts — without offensive OSINT recipes.",
  xpReward: 700,
  badge: "Privacy Scout",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/13",
  nextHref: "/learn/cyber/15",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `**OSINT** stands for Open-Source Intelligence — information gathered from *public* sources. Spies and security teams use the idea professionally; scammers and harassers misuse public scraps too. Today is **defensive awareness** only: what you expose, how to self-check ethically, and how to shrink your risk.\n\nHere's our roadmap:\n\n• What OSINT means in plain English.\n• **Public exposure** — how small posts add up.\n• **Oversharing** traps (travel, school IDs, routines).\n• **Ethical \"search yourself\"** habits — not targeting others.\n• **Privacy settings** that actually matter.\n• What an adversary might infer — and how to respond defensively.\n\nNo hacking search recipes. No stalking playbooks. Just privacy self-defense.`,
        callout: {
          label: "Why it matters",
          text: "Attackers often start with what's already public: names, schools, friends, schedules. Reducing exposure makes phishing and impersonation harder.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Privacy & OSINT words",
        body: `• **OSINT (awareness)** — using publicly available information to learn something; here, we use the idea to protect ourselves.\n• **Digital footprint** — the trail of data you leave online.\n• **Oversharing** — posting details that create unnecessary risk.\n• **Privacy settings** — controls that limit who sees your posts, stories, and personal fields.\n• **Doxxing** (to avoid/oppose) — maliciously publishing private info to harass — illegal/harmful and not part of this course.\n• **Adversary** — anyone who might misuse your information (scammer, impersonator, harasser).\n• **Minimization** — sharing only what's needed.\n\nDefense starts with knowing what a stranger can already see.`,
        callout: {
          label: "Ethics reminder",
          text: "Search yourself and your own accounts. Do not gather or weaponize information on classmates. Curiosity that targets others without consent crosses lines fast.",
        },
      },
      {
        id: "public-exposure",
        kicker: "The big idea",
        title: "Public crumbs become a map",
        body: `One post rarely dooms you. The risk is **combination**:\n\n• A tagged school + sports schedule + \"home alone Friday\" joke + birthday in bio + mum's name in a comment.\n\nSeparately, harmless. Together, they help someone craft a convincing phishing email, reset-question guess, or impersonation.\n\nPublic sources aren't only social media: school news pages, club rosters, people-search sites, old forum posts, shared cloud links set to \"anyone.\"\n\nDefenders practice **minimization** and periodic cleanup — not paranoia about every meme.`,
        bullets: [
          "Think in combinations, not single posts.",
          "Old posts still count — footprints linger.",
          "Public link sharing is part of your footprint too.",
        ],
        callout: {
          label: "Watch out",
          text: "\"Friends only\" help — until accounts get compromised or friends reshare. Still avoid posting secrets you wouldn't hand a stranger.",
        },
      },
      {
        id: "oversharing",
        kicker: "Common traps",
        title: "Oversharing patterns that help adversaries",
        body: `High-risk overshares (defensive list):\n\n• Real-time travel/vacation posts while the house is empty.\n• Photos of **IDs**, tickets with barcodes, or badges.\n• Passwords, MFA codes, or \"my PIN is…\" jokes.\n• Detailed daily routines (\"I leave at 7:10 every day via the side gate\").\n• Answers to common security questions (first pet, mother's maiden name) posted as fun quizzes.\n\nNone of this requires fancy tools for a scammer — just reading. Your defense is boring and effective: pause before posting, blur sensitive details, save travel posts for after you're home.`,
        callout: {
          label: "Common misconception",
          text: "\"I only have 200 followers, so it doesn't matter.\" Screenshots travel. Public or large-friend-group posts can reach people you never met.",
        },
      },
      {
        id: "google-yourself",
        kicker: "Ethical self-check",
        title: "Search yourself — carefully and ethically",
        body: `A healthy habit: periodically **search your own name** and usernames in a regular search engine while signed out (or use a private window) to see what's public.\n\nDo:\n\n• Check your own profiles as a stranger would.\n• Note old accounts you forgot.\n• Remove or privacy-lock what shouldn't be public.\n• Ask a trusted adult for help if something harmful about you appears.\n\nDon't:\n\n• Run targeting campaigns on other students.\n• Use specialized \"people hacking\" recipes or shady data-broker attack guides.\n• Try to access private accounts or non-public data.\n\nSelf-OSINT for privacy is like checking your reflection. Targeting others is not.`,
        callout: {
          label: "Pro tip",
          text: "Make a calendar reminder once a semester: review public profiles, tagged photos, and connected apps.",
        },
      },
      {
        id: "privacy-settings",
        kicker: "Tighten the knobs",
        title: "Privacy settings that actually move the needle",
        body: `Platforms differ, but these controls matter everywhere:\n\n• Who can see posts / stories / friends lists.\n• Who can tag or mention you.\n• Location sharing defaults (often off is wiser).\n• Search engine indexing options where available.\n• Ad/data sharing preferences.\n• Connected third-party apps — revoke what you don't use.\n\nAlso lock down **account recovery** paths: recovery email/phone should be ones you control, with MFA on those too.\n\nPrivacy settings aren't perfect, but leaving everything public by default is an unnecessary gift to impersonators.`,
        bullets: [
          "Default to tighter audiences; widen intentionally.",
          "Review connected apps quarterly.",
          "Protect recovery channels with MFA.",
        ],
        callout: {
          label: "Try this week",
          text: "Pick one social account. Review audience defaults and remove one old public post or bio detail that shares more than you need.",
        },
      },
      {
        id: "adversary-view",
        kicker: "Think like a defender",
        title: "What might someone learn — and what do you do?",
        body: `From public posts, a scammer might learn: your school, clubs, friends' names, slang you use, upcoming events, and which brands you trust. That fuels **spear phishing** (customized bait) and impersonation (\"I'm locked out, send the code\").\n\nDefensive responses:\n\n• Shrink public details that enable impersonation.\n• Agree on family/club verification phrases for urgent money/account requests.\n• Treat unexpected \"friend in trouble\" messages with out-of-band checks.\n• Report harassment/doxxing threats to adults and platforms.\n\nYou're not responsible for someone else's malice — but you can refuse to make their job easy.`,
        callout: {
          label: "Myth check",
          text: "Privacy is not secrecy for criminals. It's boundary-setting so your life isn't an open credential-reset kit.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **OSINT awareness** = understanding public-info risk for self-defense.\n• Small posts **combine** into exposure.\n• **Search yourself** ethically; don't target others.\n• Tighten **privacy settings** and recovery paths.\n• Expect customized scams when details are public — verify out-of-band.\n\nTake the **Knowledge check**, then reflect on one privacy change you'll make.`,
      },
    ],
  },
  bigIdeas: [
    "Public posts and profiles create an **OSINT**-style picture attackers can misuse — defenders practice minimization.",
    "Ethical self-checks (search yourself, review settings) beat invasive research on other people.",
    "Tighter **privacy settings**, careful sharing, and out-of-band verification reduce spear phishing and impersonation risk.",
  ],
  keyTerms: [
    { term: "OSINT (awareness)", definition: "Using publicly available information to learn something; in this lesson, for self-defense and privacy." },
    { term: "Digital footprint", definition: "The trail of data you leave online through posts, profiles, and shared links." },
    { term: "Oversharing", definition: "Publishing details that create unnecessary personal or security risk." },
    { term: "Privacy settings", definition: "Platform controls that limit who can see your information and activity." },
    { term: "Minimization", definition: "Sharing only what is needed for the purpose at hand." },
    { term: "Spear phishing", definition: "Targeted phishing that uses personal details to seem more convincing." },
    { term: "Impersonation", definition: "Pretending to be you or someone you trust to trick others." },
  ],
  realWorld:
    "A student posts a selfie with a school ID clearly readable and a caption about being away all weekend. A scammer later messages Grandma posing as the student — using school details from the post. Tighter sharing and a family verification habit are the defensive fix.",
  quiz: [
    {
      id: "q1",
      question: "In this course, what is the appropriate use of OSINT awareness?",
      choices: [
        "Building attack recipes to dig up private data on classmates",
        "Understanding public-info exposure so you can protect your own privacy",
        "Bypassing privacy settings on other people's accounts",
        "Publishing other students' addresses",
      ],
      correctIndex: 1,
      explanation:
        "We use OSINT as a defensive lens for your own exposure — not as an offensive research toolkit against others.",
    },
    {
      id: "q2",
      question: "Why can several \"harmless\" posts still create risk?",
      choices: [
        "Because search engines ignore them",
        "Because details combine into a richer picture useful for scams or impersonation",
        "Because posts automatically encrypt themselves",
        "Because only celebrities have footprints",
      ],
      correctIndex: 1,
      explanation:
        "Combination risk: school + schedule + personal answers + contacts can fuel targeted social engineering.",
    },
    {
      id: "q3",
      question: "Which is an ethical self-check habit?",
      choices: [
        "Searching your own public profiles and cleaning up risky exposure",
        "Running intrusive lookups to map a classmate's private life",
        "Sharing MFA codes to \"verify friendship\"",
        "Posting your government ID for aesthetic likes",
      ],
      correctIndex: 0,
      explanation:
        "Search yourself, review settings, minimize — don't target others or publish sensitive IDs.",
    },
    {
      id: "q4",
      question: "Which privacy action best reduces public exposure?",
      choices: [
        "Leaving all posts public for maximum reach forever",
        "Tightening audience defaults and reviewing connected apps",
        "Disabling MFA so recovery is easier for strangers",
        "Using the same password everywhere so you remember it",
      ],
      correctIndex: 1,
      explanation:
        "Audience controls and revoking unused apps shrink what strangers and third parties can access.",
    },
    {
      id: "q5",
      question: "A scammer uses details from your public posts to sound like a friend in trouble. What's a strong defensive move?",
      choices: [
        "Send money immediately to be helpful",
        "Verify the request out-of-band using a known contact method and reduce public details that enable impersonation",
        "Reply with your passwords so they can \"check\"",
        "Ignore privacy settings because scams are rare",
      ],
      correctIndex: 1,
      explanation:
        "Out-of-band verification stops impersonation; minimizing public personal details makes bait harder to craft.",
    },
  ],
  reflection: {
    prompt:
      "Name one public detail about you that a stranger could find (school, club, hobby, old username). What is one privacy setting or posting habit you'll change to reduce risk?",
    placeholder: "Example: My club role is public on Instagram… I'll switch posts to friends-only and stop posting real-time travel…",
  },
};
