import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson5: AILessonConfig = {
  id: "cs-5",
  title: "5. Passwords, Hashing & MFA",
  goal: "Build strong passwords and passphrases, explain password managers conceptually, contrast hashing with encryption, understand salting simply, compare MFA types, and know basic breach-response steps.",
  xpReward: 250,
  badge: "Credential Pro",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/4",
  nextHref: "/learn/cyber/6",
  lessonModule: {
    durationLabel: "~10–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Credentials are the keys to your digital life. Today you'll learn how to choose stronger keys, how sites *should* store them, and what to do when a breach hits the news.\n\nHere's our roadmap:\n\n• **Strong passwords & passphrases** — length and uniqueness beat clever substitutions.\n• **Password managers** — one vault, many unique passwords (concept).\n• **Hashing vs. encryption** — one-way checks vs. reversible lockboxes.\n• **Salt** — why identical passwords shouldn't look identical when stored.\n• **MFA types** — app codes, prompts, SMS, keys (tradeoffs at a high level).\n• **Breach response** — change passwords, enable MFA, watch for follow-on scams.\n\nStill defensive only: we explain how storage *protects* passwords, not how to crack them.`,
        callout: {
          label: "Why it matters",
          text: "Reused passwords turn one breach into many account takeovers. Unique credentials + MFA contain the blast radius.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "Credential vocabulary",
        body: `• **Credential** — proof used to log in, usually a username + password (plus MFA).\n• **Passphrase** — a longer password made of several words; easier to remember, often stronger.\n• **Password manager** — an app that stores unique passwords in an encrypted vault unlocked by a master password / unlock method.\n• **Encryption** — scrambling data so it can be unlocked with the correct key (two-way with the key).\n• **Hashing** — running data through a one-way function to produce a fingerprint-like value; you can't usefully \"unlock\" it back to the original.\n• **Salt** — random data added before hashing so identical passwords don't produce identical hashes.\n• **Breach** — an incident where data (sometimes password data) is exposed without authorization.`,
        callout: {
          label: "Pro tip",
          text: "If you remember only one idea: sites should store **hashes** of passwords, not the passwords themselves in plain text.",
        },
      },
      {
        id: "strong-passwords",
        kicker: "Better secrets",
        title: "Strong passwords and passphrases",
        body: `Weak patterns are easy for attackers to try in bulk: \`password123\`, \`Summer2026!\`, pet names, sports teams, or the same password everywhere.\n\nStronger approach:\n• **Length matters.** Longer secrets are generally harder to guess.\n• **Uniqueness matters more than cleverness.** A unique passphrase per important account beats one \"complex\" password reused everywhere.\n• **Passphrases** — several unrelated words strung together — can be memorable and strong.\n• Avoid personal details that appear on your social profiles.\n• Don't share passwords; don't store them in plain class group chats.\n\nSchool-life examples of accounts that deserve unique, strong credentials: email, school portal, banking, and any account that can reset others.`,
        bullets: [
          "Prefer **long** and **unique** over short and reused.",
          "Passphrases can be easier to remember than random characters.",
          "Never recycle your email password on random sites.",
          "Don't give passwords to inbound \"support\" messages.",
        ],
        callout: {
          label: "Watch out",
          text: "Changing one letter or adding \"!\" to an old password is not a new password strategy — especially after a breach. Create something truly different.",
        },
      },
      {
        id: "managers-hashing",
        kicker: "Storage and tools",
        title: "Password managers, hashing, encryption, salt",
        body: `**Password managers (concept):** You remember one strong master unlock method; the manager creates and fills unique passwords for each site. That lets you stop reusing credentials. Choose a reputable manager and protect the master unlock carefully (and use MFA on the vault if available).\n\n**Hashing vs. encryption (defender view):**\n• **Encryption** is designed so the right key can reverse the process and recover the original data — useful for files you need to read later.\n• **Hashing** is designed to be **one-way**. Login systems hash what you type and compare it to the stored hash. If someone steals the database of hashes, they shouldn't get your actual password directly.\n\n**Salt (simple):** If two users choose the same password, unsalted hashes could look the same — which helps attackers. A **salt** is unique random data mixed in before hashing so identical passwords produce different stored values.\n\nYou don't need the math. You need the implication: good services hash + salt; bad breaches sometimes reveal poor storage practices — which is why unique passwords still matter.`,
        callout: {
          label: "Common misconception",
          text: "\"If a site hashes passwords, a breach is harmless.\" Not always. Weak hashing, reused passwords, and other stolen personal data still create risk. Treat breach notices seriously.",
        },
      },
      {
        id: "mfa-types",
        kicker: "Second factors",
        title: "MFA types — strengths at a glance",
        body: `**MFA** adds another factor beyond the password. Common types:\n\n• **Authenticator app codes** — time-based codes in an app on your phone. Generally strong everyday choice.\n• **Push prompts** — approve/deny on a trusted device. Convenient; beware **prompt bombing** (many pushes hoping you'll tap Approve). If you get a prompt you didn't start — deny and change password.\n• **SMS codes** — better than password alone, but phone-number attacks and SIM problems make SMS one of the weaker MFA options.\n• **Hardware security keys** — physical tokens you tap/plug in; excellent for high-value accounts when supported.\n• **Backup codes** — one-time codes you store offline for recovery. Keep them safe; treat them like passwords.\n\nMFA doesn't mean you can use \`password\` as your password. It means a stolen password alone often isn't enough.`,
        callout: {
          label: "Pro tip",
          text: "Prioritize MFA on email first. Email is frequently the recovery path for everything else.",
        },
      },
      {
        id: "breach-response",
        kicker: "When things go wrong",
        title: "Breach response basics",
        body: `When a service you use announces a breach — or you see unexpected login alerts — work a simple checklist:\n\n**1. Change the password** on that account from a device you trust.\n**2. Change it everywhere you reused that password** (this is why reuse hurts).\n**3. Turn on MFA** if it wasn't on.\n**4. Check recovery email and phone** — attackers sometimes change those first.\n**5. Watch for phishing** that pretends to \"help you recover\" from the breach.\n**6. Review recent account activity** (sent mail, purchases, connected apps).\n**7. Tell a trusted adult** if school accounts or money might be involved.\n\nPrevention still wins: unique passwords (manager-assisted) + MFA + cautious clicking means one company's incident doesn't become your whole-life incident.`,
        bullets: [
          "Change breached passwords immediately.",
          "Fix reuse across other sites.",
          "Enable MFA and verify recovery options.",
          "Expect follow-on scam messages after big breach news.",
        ],
        callout: {
          label: "Try this week",
          text: "Pick your email account: confirm MFA is on, and make sure its password is unique (not used on games or shopping sites).",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• Prefer **long, unique** passwords/passphrases; **managers** help you sustain that.\n• **Hashing** is one-way for checking passwords; **encryption** is reversible with a key; **salts** differentiate identical passwords.\n• **MFA** types vary in strength — apps and hardware keys generally beat SMS alone.\n• After a **breach**: change passwords, kill reuse, enable MFA, check recovery info, watch for scams.\n\nTake the **Knowledge check**, then reflect on one credential habit you'll upgrade.`,
      },
    ],
  },
  bigIdeas: [
    "**Unique, long passwords/passphrases** (often with a **password manager**) limit damage when one site is breached.",
    "Proper services store **hashed** (and **salted**) passwords — hashing is one-way; encryption is reversible with a key.",
    "**MFA** and a clear **breach-response** checklist protect accounts when passwords alone fail.",
  ],
  keyTerms: [
    { term: "Passphrase", definition: "A long password made of multiple words, often easier to remember and harder to guess." },
    { term: "Password Manager", definition: "A tool that stores unique passwords in a protected vault so you don't reuse credentials." },
    { term: "Hashing", definition: "A one-way process that turns data into a fixed fingerprint-like value for checking, not reading back." },
    { term: "Encryption", definition: "Scrambling data so it can be restored with the correct key." },
    { term: "Salt", definition: "Random data added before hashing so identical passwords don't produce identical hashes." },
    { term: "MFA", definition: "Multi-Factor Authentication — requiring more than one authentication factor." },
    { term: "Authenticator App", definition: "An app that generates time-based codes used as an MFA factor." },
    { term: "Breach", definition: "An incident where sensitive data is exposed to unauthorized parties." },
  ],
  realWorld:
    "If a gaming site is breached and you reused that password for email, attackers may try the same credential on your inbox. A password manager + MFA on email breaks that chain.",
  quiz: [
    {
      id: "q1",
      question: "Which password strategy is strongest for everyday accounts?",
      choices: [
        "Reuse one complex password everywhere so you don't forget it",
        "Use a unique long password or passphrase per account (ideally with a manager)",
        "Use your birthday plus \"123\"",
        "Share passwords with friends for accountability",
      ],
      correctIndex: 1,
      explanation:
        "Uniqueness contains breaches. Length helps resist guessing. Managers make uniqueness practical.",
    },
    {
      id: "q2",
      question: "How does hashing differ from encryption in password storage?",
      choices: [
        "They are identical processes",
        "Hashing is meant to be one-way; encryption is designed to be reversed with a key",
        "Encryption is one-way; hashing is always reversible by anyone",
        "Hashing only works on paper passwords",
      ],
      correctIndex: 1,
      explanation:
        "Login systems hash passwords to verify them without storing the original. Encryption is for data you need to decrypt later with a key.",
    },
    {
      id: "q3",
      question: "What problem does a salt help prevent?",
      choices: [
        "Wi-Fi dead zones",
        "Identical passwords looking identical when hashed",
        "The need for MFA forever",
        "Phishing emails being sent",
      ],
      correctIndex: 1,
      explanation:
        "Salts make two users with the same password produce different stored hashes, which frustrates some bulk-guessing techniques.",
    },
    {
      id: "q4",
      question: "You receive an MFA push approval you did not initiate. What should you do?",
      choices: [
        "Approve it so it stops notifying you",
        "Deny it, then secure the account (change password / review activity)",
        "Ignore all future MFA permanently",
        "Text your password to the \"support\" number in a follow-up SMS",
      ],
      correctIndex: 1,
      explanation:
        "Unexpected MFA prompts can mean someone has your password and is trying to get in. Deny and harden the account.",
    },
    {
      id: "q5",
      question: "A site you used announces a password breach. You reused that password on two other sites. What should you do?",
      choices: [
        "Change only the breached site and leave the others",
        "Change the breached password and the reused copies on the other sites; enable MFA where possible",
        "Post the password online to see if others had it",
        "Wait a year before changing anything",
      ],
      correctIndex: 1,
      explanation:
        "Reuse means attackers try the same credential elsewhere. Change all affected accounts and add MFA.",
    },
  ],
  reflection: {
    prompt:
      "Which of your accounts still share a password, and what is your plan to unique them (passphrases, password manager, or both)? Where will you enable MFA next?",
    placeholder: "Example: My shopping and old game accounts share a password — I'll unique them this week and add MFA to email…",
  },
};
