import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson2: AILessonConfig = {
  id: "cs-2",
  title: "2. CIA Triad & Authentication",
  goal: "Explain Confidentiality, Integrity, and Availability; distinguish authentication from authorization; and describe passwords, MFA, biometrics, and tokens at a conceptual level.",
  xpReward: 100,
  badge: "Triad Guardian",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/1",
  nextHref: "/learn/cyber/3",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-2.png",
        imageAlt: "Triangle diagram props for Confidentiality Integrity Availability beside a login screen on a laptop",
        body: `Last lesson introduced the **CIA Triad**. Today you'll make it stick — and connect it to every login screen you meet.\n\nHere's our roadmap:\n\n• **Confidentiality, Integrity, Availability** — what each goal really means with school-life examples.\n• **Authentication vs. authorization** — proving who you are vs. what you're allowed to do.\n• **How we prove identity** — passwords, MFA, biometrics, and tokens (concepts only).\n• **How these ideas fit together** — why weak login habits break CIA in the real world.\n\nBy the end, you'll be able to look at a situation and say which CIA goal is at risk — and whether the problem is \"who are you?\" or \"what can you do?\"`,
        callout: {
          label: "Why it matters",
          text: "Almost every security control — from phone locks to school portals — is trying to protect at least one of Confidentiality, Integrity, or Availability. Naming the goal helps you choose better habits.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "Words you'll use all unit long",
        body: `• **Confidentiality** — keeping information visible only to people who should see it.\n• **Integrity** — keeping information accurate and unaltered by unauthorized changes.\n• **Availability** — making sure authorized people can reach systems and data when they need them.\n• **Authentication** — proving you are who you claim to be (\"Are you really Alex?\").\n• **Authorization** — deciding what you're allowed to do after you're authenticated (\"Alex can view grades, not change school policy\").\n• **MFA (Multi-Factor Authentication)** — proving identity with more than one type of evidence.\n\nWe'll unpack each idea with examples next.`,
        callout: {
          label: "Pro tip",
          text: "A memory trick: Authentication = \"Who are you?\" Authorization = \"What are you allowed to do?\" They sound alike but answer different questions.",
        },
      },
      {
        id: "cia-deep",
        kicker: "The triad",
        title: "Confidentiality, Integrity, Availability",
        image: "/images/lessons/cs-2-2.png",
        imageAlt: "Three labeled cards: Confidentiality lock, Integrity checkmark, Availability green uptime light",
        body: `The **CIA Triad** is a simple checklist defenders use everywhere — hospitals, banks, schools, and your own accounts.\n\n• **Confidentiality** — Secrets stay secret. Examples: only you and approved staff see your health forms; only group members see a private shared doc. Failures look like leaked passwords, someone reading your messages, or files shared with \"anyone with the link\" by mistake.\n• **Integrity** — Information stays trustworthy. Examples: your submitted essay shouldn't be silently edited by a stranger; a gradebook shouldn't change without a teacher. Failures look like tampered files, wrong data, or \"I never sent that message.\"\n• **Availability** — Authorized users can get what they need. Examples: the testing portal works on exam day; backups help recover after a device dies. Failures look like outages, locked accounts with no recovery path, or ransomware-style lockouts (we'll cover malware types next lesson — conceptually).\n\nNotice the tradeoffs: locking everything so tightly that teachers can't open the gradebook hurts **availability**. Leaving everything open hurts **confidentiality**. Good security balances all three.`,
        bullets: [
          "**Confidentiality** → Who can see it?",
          "**Integrity** → Is it still accurate and untampered?",
          "**Availability** → Can authorized people use it when needed?",
        ],
        callout: {
          label: "Common misconception",
          text: "\"More security\" does not always mean \"lock everything forever.\" If nobody who needs the system can use it, Availability has failed — and that is still a cybersecurity problem.",
        },
      },
      {
        id: "authn-vs-authz",
        kicker: "Two different questions",
        title: "Authentication vs. authorization",
        body: `These two words get mixed up constantly. Separate them and half of cybersecurity gets clearer.\n\n**Authentication** answers: *Are you really the person (or account) you claim to be?*\nExamples: typing a password, using a fingerprint, entering a code from an authenticator app, tapping a hardware security key.\n\n**Authorization** answers: *Now that we know who you are, what are you allowed to do?*\nExamples: a student can view their own grades but not edit the master gradebook; a club officer can post on the club page but not delete the whole school site.\n\nOrder matters in practice: systems usually **authenticate** first, then check **authorization** for each action. You can be successfully logged in (authenticated) and still be denied a button (not authorized).\n\nAnalogy: a concert **ticket scan** authenticates that your ticket is real. **Which section you may enter** is authorization — floor vs. balcony.`,
        callout: {
          label: "Watch out",
          text: "Sharing a password doesn't only break authentication for you — it can break authorization models too, because the system thinks the other person *is* you and grants your permissions.",
        },
      },
      {
        id: "factors",
        kicker: "Proving who you are",
        title: "Passwords, MFA, biometrics, and tokens",
        image: "/images/lessons/cs-2-3.png",
        imageAlt: "Phone MFA prompt, fingerprint sensor, and hardware security key on a desk",
        body: `Defenders talk about **authentication factors** — categories of proof:\n\n• **Something you know** — a password or PIN.\n• **Something you have** — a phone that receives a code, an authenticator app, or a physical security **token**/key.\n• **Something you are** — **biometrics** like fingerprint or face unlock on a device.\n\nA **password** alone is one factor. **MFA (Multi-Factor Authentication)** means using *more than one category* — for example, password + app code. That way, if one factor is stolen, the attacker still doesn't have the others.\n\n**Biometrics** are convenient on devices you control, but they are not magic: they usually unlock a secret stored on the device, and they raise privacy questions if misused. Treat them as one helpful factor, not the whole security story.\n\n**Tokens** (apps or hardware keys) prove \"something you have.\" Conceptually, they make remote takeovers harder because a stolen password alone often isn't enough.\n\nWe'll go deeper on password strength, hashing, and MFA types in a later lesson. Today, just know: stronger authentication protects **confidentiality** and **integrity** by keeping the wrong people out.`,
        bullets: [
          "**Password / PIN** = something you know.",
          "**Phone code / security key** = something you have.",
          "**Fingerprint / face** = something you are (biometric).",
          "**MFA** = combine factors from more than one category.",
        ],
        callout: {
          label: "Pro tip",
          text: "Turn on MFA for email and school accounts first — those are often the \"keys to the kingdom\" that reset everything else.",
        },
      },
      {
        id: "connect",
        kicker: "Put it together",
        title: "How weak auth breaks CIA",
        body: `Walk through a simple story:\n\n1. Someone guesses or steals your password (**authentication** fails to keep them out).\n2. The system treats them as you, so they inherit your permissions (**authorization** follows identity).\n3. They read private messages → **confidentiality** broken.\n4. They change a shared project file → **integrity** broken.\n5. They lock you out by changing recovery info → **availability** broken for you.\n\nOne weak login can hit all three CIA goals. That's why authentication is not a boring side topic — it's the front door.\n\nDefender habits (still conceptual, no attack steps):\n• Use unique passwords / passphrases for important accounts.\n• Enable MFA where offered.\n• Don't share credentials.\n• Log out on shared computers.\n• Report suspicious login alerts.`,
        callout: {
          label: "Why it matters",
          text: "When you hear \"account takeover,\" translate it: authentication was bypassed or abused, authorization followed the wrong person, and CIA goals took the hit.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **CIA** = Confidentiality (who can see), Integrity (stays accurate), Availability (usable when needed).\n• **Authentication** proves identity; **authorization** grants permissions.\n• Factors include **passwords**, **MFA**, **biometrics**, and **tokens** — concepts that strengthen the front door.\n• Weak authentication can break all three CIA goals in one incident.\n\nWhen you're ready, take the **Knowledge check**, then reflect on an account where MFA would help you most.`,
      },
    ],
  },
  bigIdeas: [
    "The **CIA Triad** defines security goals: keep data private, accurate, and available to authorized users.",
    "**Authentication** proves who you are; **authorization** decides what you may do.",
    "**MFA** and other factors strengthen authentication so one stolen password is less devastating.",
  ],
  keyTerms: [
    { term: "Confidentiality", definition: "Ensuring only authorized people can view information." },
    { term: "Integrity", definition: "Ensuring information remains accurate and unaltered by unauthorized changes." },
    { term: "Availability", definition: "Ensuring authorized users can access systems and data when they need them." },
    { term: "Authentication", definition: "Verifying that someone is who they claim to be." },
    { term: "Authorization", definition: "Determining what an authenticated user is allowed to do." },
    { term: "MFA", definition: "Multi-Factor Authentication — proving identity with more than one type of factor." },
    { term: "Biometrics", definition: "Authentication based on a physical trait, such as a fingerprint or face unlock." },
    { term: "Token", definition: "Something you have used to prove identity, such as an authenticator app or hardware security key." },
  ],
  realWorld:
    "A student portal login is **authentication**. Being able to view your transcript but not edit another student's record is **authorization**. Both exist to protect **CIA** for grades and personal data.",
  quiz: [
    {
      id: "q1",
      question: "Which scenario is mainly an Availability problem?",
      choices: [
        "A classmate reads your private essay without permission",
        "Someone changes numbers in a shared budget spreadsheet",
        "The scholarship portal is down on the submission deadline",
        "You enable MFA on your email",
      ],
      correctIndex: 2,
      explanation:
        "Availability is about authorized users being able to reach systems when needed. A down portal on deadline is a classic Availability failure.",
    },
    {
      id: "q2",
      question: "You type your password and a fingerprint to unlock a banking app. What is that an example of?",
      choices: [
        "Authorization only",
        "Multi-factor authentication (MFA)",
        "Ignoring confidentiality",
        "Sharing accounts safely",
      ],
      correctIndex: 1,
      explanation:
        "A password (something you know) plus a biometric (something you are) are two different factor types — that is MFA.",
    },
    {
      id: "q3",
      question: "Which statement correctly contrasts authentication and authorization?",
      choices: [
        "They mean the exact same thing",
        "Authentication decides permissions; authorization proves identity",
        "Authentication proves identity; authorization decides what you may do",
        "Authorization only applies to hardware tokens",
      ],
      correctIndex: 2,
      explanation:
        "Authentication answers \"who are you?\" Authorization answers \"what are you allowed to do?\"",
    },
    {
      id: "q4",
      question: "A leaked class roster of emails and home addresses mainly damages which CIA goal?",
      choices: [
        "Confidentiality",
        "Integrity",
        "Availability",
        "None — personal data isn't part of CIA",
      ],
      correctIndex: 0,
      explanation:
        "Unauthorized people seeing private information is a Confidentiality failure.",
    },
    {
      id: "q5",
      question: "Why can a stolen password threaten Integrity as well as Confidentiality?",
      choices: [
        "Passwords only affect Wi-Fi speed",
        "Once authenticated as you, an attacker may change files or settings using your permissions",
        "Integrity only applies to paper documents",
        "Stolen passwords always delete MFA forever",
      ],
      correctIndex: 1,
      explanation:
        "After authentication succeeds for the wrong person, authorization treats them as you — so they may alter data (Integrity) as well as read it (Confidentiality).",
    },
  ],
  reflection: {
    prompt:
      "Pick one account you use. Describe how authentication works there (password, MFA, biometric, etc.) and one permission that should be authorization-limited (something you can do that others shouldn't).",
    placeholder: "Example: My school email uses password + MFA. Only I should be able to reset my other account passwords through it…",
  },
};
