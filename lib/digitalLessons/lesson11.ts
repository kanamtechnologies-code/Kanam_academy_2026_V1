import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson11: AILessonConfig = {
  id: "dl-11",
  title: "11. Passwords, Scams & Account Security",
  goal: "Protect your accounts and devices with strong unique passwords, password managers, and two-factor authentication — and learn to spot phishing, scams, and malware before they catch you, including fake internship and college-portal messages.",
  xpReward: 550,
  badge: "Security Guard",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/10",
  nextHref: "/learn/digital/12",
  lessonModule: {
    durationLabel: "~11–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Your accounts hold your messages, photos, money, games, and your whole social life — and for older teens, also college portals, scholarship logins, and job applications. Attackers know that — and they have easy, automated ways to break in if you let them. Today you'll learn how to lock them out.\n\nHere's our roadmap:\n\n• **Strong, unique passwords** — and why reusing one is so dangerous.\n• **Password managers** — let software do the hard part.\n• **Two-factor authentication (2FA)** — a second lock attackers can't pick.\n• **Phishing and scams** — spotting fake messages designed to trick you.\n• **Malware** — what it is and how it sneaks in.\n• **Senior stretch** — locking down email, college portals, and spotting fake internship offers.\n\nThis isn't paranoia — it's a basic life skill. Getting hacked can mean lost accounts, stolen money, embarrassing posts, or identity theft. A few simple habits make you a *much* harder target than most people online.`,
        image: "/images/lessons/dl-11.png",
        imageAlt: "A phone showing a fake 'your account is locked' text next to a shield with a padlock and a second-step verification code",
        callout: {
          label: "Why it matters",
          text: "Most break-ins don't involve a genius hacker typing fast in a dark room. They happen because someone reused a password or clicked a fake link. The good news: that means *you* can stop most of them.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Security words, decoded",
        body: `Security has a lot of intimidating words, but each one is simple. Here's your cheat sheet for today:\n\n• **Account** = your login on a service (your email, your game, your social app) — protected by a password.\n• **Breach** = when a company gets hacked and its users' info (like passwords) gets stolen and often leaked online.\n• **2FA (two-factor authentication)** = needing *two* things to log in: your password *plus* a second step like a code on your phone. (Also called **MFA**, multi-factor authentication.)\n• **Phishing** = fake messages that *pretend* to be someone you trust to trick you into clicking or sharing info. (Said like "fishing" — they're fishing for your info.)\n• **Malware** = "malicious software" — bad programs that harm your device or steal from you.\n• **Password manager** = an app that creates and remembers strong passwords *for* you.\n\nNotice the pattern: most attacks rely on *you* making one slip — reusing a password or clicking a fake link. Today is about removing those slips.`,
        callout: {
          label: "Pro tip",
          text: "You don't need to be \"good with computers\" to be safe online. The handful of habits in this lesson protect you more than any technical skill — they're about being a little careful, not a tech genius.",
        },
      },
      {
        id: "passwords",
        kicker: "The big idea",
        title: "Strong AND unique — why reusing a password is so risky",
        body: `Two things make a password good: it should be **strong** (hard to guess) and **unique** (used on only one account).\n\nWhy unique? Companies get **breached** all the time, and lists of stolen passwords end up online. Attackers then take your leaked password and try it on tons of *other* sites automatically — your email, your bank, your socials, even a college or scholarship portal. This is called **credential stuffing**. If you reused that password, one breach unlocks *everything*.\n\nThink of it like a **key**. If you use the *same* key for your house, your car, your locker, and your phone, then losing it *once* means a stranger can open all of them. A unique password per account means a single leak only opens one door.\n\nFor strength, **passphrases** beat short complex passwords. A long, random-ish phrase like \`purple-tractor-lunar-galaxy\` is both easier to remember *and* harder for a computer to crack than something like \`P@ssw0rd1\`. Length is what really fights guessing.`,
        image: "/images/lessons/dl-11-2.png",
        imageAlt: "One key opening many locks (a reused password) beside a ring of different keys each opening only one lock (unique passwords)",
        bullets: [
          "**Strong** = long and hard to guess (length beats fancy symbols).",
          "**Unique** = a different password for every account.",
          "Reusing a password lets one breach unlock all your accounts (credential stuffing).",
          "**Passphrases** (several random words) are strong *and* memorable.",
        ],
        callout: {
          label: "Common misconception",
          text: "\"P@ssw0rd1 is strong because it has symbols and numbers.\" Not really — it's short and follows patterns attackers' software expects. A longer passphrase like four random words is far tougher to crack, even though it looks simpler.",
        },
      },
      {
        id: "managers-2fa",
        kicker: "Tools that protect you",
        title: "Password managers and two-factor authentication",
        body: `"A different strong password for *every* account? I can't remember all those!" You're right — and you don't have to.\n\nA **password manager** is an app that **generates** long random unique passwords for each account and **stores** them safely, locked behind one strong master password (or your fingerprint/face). You only remember *one* password; it remembers the rest. Examples include Bitwarden, 1Password, and the managers built into your browser or phone.\n\nThen add a second lock: **two-factor authentication (2FA)**, also called **MFA** (multi-factor authentication). It means logging in needs **two things**:\n\n• **Something you know** — your password.\n• **Something you have** — a code from an app, a text, or a tap on your phone.\n\nSo even if a thief steals your password, they *still* can't get in without your phone.\n\n**Lock down recovery too.** Attackers often skip your password and go for the side door: **account recovery**. Review your **recovery email and phone** on important accounts — use addresses *you* control, not an old number a friend might still have. Turn on **2FA** for recovery options when offered, and save **backup codes** somewhere safe (not in the same app you're protecting). A weak recovery path lets someone reset your password even if the main password was strong. It's like a door that needs both a key *and* a second deadbolt that only you can reach. An **authenticator app** (like Google Authenticator or Authy) is more secure than text-message codes, but any 2FA is far better than none.`,
        callout: {
          label: "Common misconception",
          text: "\"2FA is an annoying hassle that's not worth it.\" It adds a few seconds at login but blocks the vast majority of account takeovers — because a stolen password alone is no longer enough. It's one of the single best things you can turn on today.",
        },
      },
      {
        id: "phishing",
        kicker: "Spotting fakes",
        title: "Phishing: fake messages built to trick you",
        body: `**Phishing** is when scammers send fake emails, texts, or DMs pretending to be someone you trust — your bank, a game, a streaming service, even your school, a "college admissions office," or a "hiring manager" — to trick you into clicking a bad link or handing over your password or codes.\n\nTheir #1 weapon is **emotion**, usually **urgency or fear**: "Your account is locked!" "You won a prize — claim in 10 minutes!" "Suspicious login — verify NOW or lose access!" "Internship offer — confirm your SSN today!" Panic makes people click before they think. (Phishing by **text message** has its own name: **smishing**.)\n\nHere's how to spot one:\n\n• **Check the sender's address**, not just the display name. \`support@paypa1.com\` (with a "1") is not PayPal.\n• **Hover over or long-press a link** to preview where it *really* goes before tapping.\n• **Be suspicious of urgency**, threats, and "act now or else."\n• **Watch for odd grammar, generic greetings** ("Dear user"), and requests for passwords, codes, or Social Security numbers.\n\nReal companies, colleges, and employers will **never** ask for your password or 2FA code by message.`,
        bullets: [
          "**Phishing** = fake messages pretending to be someone you trust.",
          "Their main trick is **urgency and fear** to make you act fast.",
          "Check the real **sender address** and **preview links** before clicking.",
          "**Smishing** is phishing by text; the same red flags apply.",
        ],
        callout: {
          label: "Watch out",
          text: "Never share a 2FA code with anyone — not even \"support\" or someone claiming to be a friend who got locked out. A real company will never ask for your code. If someone wants your code, it's a scam, full stop.",
        },
      },
      {
        id: "malware",
        kicker: "Nasty software",
        title: "Malware and the habits that keep you safe",
        body: `**Malware** is malicious software designed to harm your device or steal from you. A few common types:\n\n• **Virus** — code that spreads and damages or disrupts your device.\n• **Ransomware** — locks your files and demands payment to unlock them.\n• **Spyware** — secretly watches what you do, grabbing passwords and data.\n\nMalware usually sneaks in through **a click**: a fake "download" button, a sketchy app from outside official stores, a pirated game or movie, an email attachment you weren't expecting, or a too-good-to-be-true offer.\n\nSimple habits keep you safe:\n\n• **Keep software updated** — updates patch the security holes malware exploits.\n• **Only install from official app stores** and trusted sources.\n• **Don't click unexpected attachments or "you won!" links.**\n• **Be careful on public Wi-Fi** — avoid logging into important accounts (like banking, college portals, or job apps) on open networks, since others may snoop.`,
        callout: {
          label: "Common misconception",
          text: "\"Only sketchy or illegal sites get you hacked, and I'd never fall for a scam.\" Overconfidence is exactly what scammers count on. Real-looking ads, hacked legit sites, and clever messages fool smart, careful people every day. Staying a little skeptical is the skill.",
        },
      },
      {
        id: "senior-accounts",
        kicker: "For older teens",
        title: "Lock down email, college portals & job apps",
        body: `As you add high-stakes accounts — Common App / college portals, FAFSA or scholarship sites, LinkedIn, internship applications — your **email** becomes even more important. Whoever controls your email can reset almost everything else.\n\nPriority checklist for seniors (and anyone applying to things):\n\n• **Email first** — unique passphrase + **2FA**. This is non-negotiable.\n• **College / scholarship portals** — unique passwords (password manager), 2FA if offered, and never log in through a link in a random email.\n• **Job / internship accounts** — same rules. Fake "you've been selected for an internship — click to confirm SSN / bank info" emails are a classic scam.\n• **Professional email habits** — use a clean address (not \`partyking2008@...\`) for applications, and don't click attachments you weren't expecting from "HR."\n\nYounger teens: lock down gaming and social accounts the same way. The habits transfer the day you open a college portal.`,
        bullets: [
          "Protect **email** first — it resets everything else.",
          "Unique passwords + 2FA for college and scholarship portals.",
          "Treat \"urgent internship\" emails as phishing until proven real.",
          "Use a professional-looking email for applications.",
        ],
        callout: {
          label: "Pro tip",
          text: "If an \"internship\" or \"scholarship\" email asks you to pay a fee, share your Social Security number by reply, or click a weird link to \"verify,\" stop. Real opportunities go through official sites and never need you to panic-click.",
        },
      },
      {
        id: "setup",
        kicker: "A real example",
        title: "Your 10-minute security tune-up",
        body: `Let's make this real. Here's a short list you could actually do *today* to protect your own accounts — in rough order of impact:\n\n• **Protect your email first.** Your email is the master key: if someone gets in, they can reset the passwords for everything else. Give it a strong, unique passphrase and turn on **2FA**.\n• **Turn on 2FA** for your other important accounts too — socials, gaming, anything with money attached, plus college or job portals if you have them.\n• **Review recovery options** — confirm your recovery email/phone are current, and save backup codes somewhere safe so attackers can't reset you through a weak side door.\n• **Stop reusing passwords.** Start with your most important accounts and give each its own unique password.\n• **Set up a password manager** so you never have to remember or reuse again — it does the hard part.\n• **Do a quick gut-check** on your messages: any "urgent," "you won," or "verify now" texts? Treat them as suspicious by default.\n\nYou don't have to do all of it at once. Even *one* of these makes you a meaningfully harder target than most people online.`,
        bullets: [
          "Lock down your **email** first — it can reset everything else.",
          "Turn on **2FA** for important accounts.",
          "Give each account its own **unique** password.",
          "Let a **password manager** handle the rest.",
        ],
        callout: {
          label: "Pro tip",
          text: "Why email first? Because the \"Forgot password?\" button on almost every site sends a reset link to your email. Whoever controls your email can quietly take over your other accounts — so it deserves your strongest password and 2FA.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Spotting a phishing internship email, step by step",
        body: `You get an email: *"Congratulations! You've been selected for a paid summer internship. Verify your identity within 2 hours or we give the spot away: bit.ly/intern-verify-now"*. Let's break it down, step by step.\n\n**Step 1 — Notice the emotion.** It screams **urgency and fear of missing out** ("within 2 hours," "give the spot away"). That pressure to act fast is red flag #1.\n\n**Step 2 — Check who sent it.** The display name says "HR Talent Team," but the real address is something like \`intern-offers@gmail.com\` — not a company domain. Red flag #2.\n\n**Step 3 — Inspect the link.** It's a shortened \`bit.ly\` link that hides the real destination — a classic trick to disguise a fake site. Don't tap it. Red flag #3.\n\n**Step 4 — Ask: would they really do this?** Real internships don't force you to "verify identity" through a mystery link in two hours — and they never ask for passwords or 2FA codes by email. Red flag #4.\n\n**Step 5 — Do the safe thing instead.** **Don't tap the link.** Delete or report the message. If you applied somewhere real, go to the **official company careers page yourself** (type it in) or email the address from their website — not the one in the suspicious message.`,
        image: "/images/lessons/dl-11-3.png",
        imageAlt: "A phishing text on a phone with four red-flag callouts: urgent wording, unknown sender number, a disguised short link, and a request to verify now",
        callout: {
          label: "Pro tip",
          text: "The golden rule: never log in or \"verify\" an account through a link someone sent you. Always go to the real app or site yourself by typing the address or using your saved bookmark. That one habit defeats almost every phishing attempt.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You're now a much harder target than most people online. Quick recap:\n\n• Use **strong, unique** passwords — **passphrases** beat short complex ones, and reusing one password puts every account at risk.\n• Let a **password manager** generate and remember them for you.\n• Turn on **2FA** so a stolen password isn't enough to get in.\n• Spot **phishing/smishing** by their urgency, fake sender addresses, and shady links — and never share a 2FA code.\n• Avoid **malware** by updating software, installing only from trusted sources, and not clicking surprise links or attachments.\n• Lock down **email** and high-stakes portals; treat fake internship offers as phishing until proven real.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then write a quick reflection about your own security habits.`,
      },
    ],
  },
  bigIdeas: [
    "Use **strong, unique** passwords (passphrases) — reusing one lets a single breach unlock every account.",
    "A **password manager** stores them and **2FA** adds a second lock, so a stolen password isn't enough.",
    "**Phishing** scams rely on urgency and fake links — check the sender, preview links, and never share 2FA codes (including fake internship emails).",
  ],
  keyTerms: [
    { term: "Strong password", definition: "A password that's hard to guess — length matters most, so long passphrases beat short complex ones." },
    { term: "Passphrase", definition: "A password made of several random words (like 'purple-tractor-lunar-galaxy') that's both strong and easy to remember." },
    { term: "Password manager", definition: "An app that generates, stores, and fills in a unique strong password for every account, locked behind one master password." },
    { term: "Two-factor authentication (2FA)", definition: "A login that needs two things — your password plus a second step like a code or tap — so a stolen password isn't enough." },
    { term: "Phishing", definition: "Fake messages pretending to be someone you trust, designed to trick you into clicking a link or giving up info." },
    { term: "Malware", definition: "Malicious software (viruses, ransomware, spyware) that harms your device or steals your data, often after a click." },
  ],
  realWorld:
    "Every breach you hear about — leaked passwords, hacked celebrity accounts, scam texts, fake internship emails — uses the same handful of tricks. **Unique passwords**, a **password manager**, **2FA**, and a skeptical eye for **phishing** defend against almost all of them, at home and at any future job.",
  quiz: [
    {
      id: "q1",
      question: "You used the same password for a game site and your college application portal. The game site gets breached. Why is that so dangerous?",
      choices: [
        "It makes websites load more slowly",
        "If one site is breached, attackers can use that password to unlock your other accounts",
        "It uses up more storage on your phone",
        "It's actually safe because it's easier to remember",
      ],
      correctIndex: 1,
      explanation:
        "When a site is breached, leaked passwords get tried on other sites automatically (credential stuffing). A reused password means one leak can open all your accounts — including high-stakes portals.",
    },
    {
      id: "q2",
      question: "You're setting a password for your first-job email. Which is the strongest, most practical choice?",
      choices: [
        "P@ss1",
        "A long passphrase of several random words like 'maple-rocket-quiet-otter'",
        "Your pet's name and birth year",
        "12345678",
      ],
      correctIndex: 1,
      explanation:
        "Length is the biggest factor in strength. A long passphrase of random words is hard for computers to crack and easy for you to remember — much better than a short symbol-filled or guessable password.",
    },
    {
      id: "q3",
      question: "You turn on 2FA for your scholarship portal. What does that protect you from?",
      choices: [
        "It speeds up your login",
        "It means someone who steals your password still can't log in without your second step",
        "It removes the need to have any password at all",
        "It blocks all viruses from your device",
      ],
      correctIndex: 1,
      explanation:
        "2FA adds a second requirement (something you have, like a code or your phone). Even if a thief gets your password, they can't get in without that second factor.",
    },
    {
      id: "q4",
      question: "An email says: \"Paid internship — verify your SSN and bank info HERE within 1 hour or we give the spot away.\" What's the safest move?",
      choices: [
        "Tap the link quickly before the internship is lost",
        "Reply with your password to prove it's you",
        "Don't tap the link — go to the official company careers page yourself (or ignore it if you never applied)",
        "Forward it to friends to warn them, then tap it",
      ],
      correctIndex: 2,
      explanation:
        "Urgency plus a mystery link plus requests for sensitive info is classic phishing. Never log in or \"verify\" through a link someone sent. Go to the real site yourself — or ignore unsolicited \"offers.\"",
    },
    {
      id: "q5",
      question: "You're downloading software for a school project on a shared laptop. Which habit best lowers your risk of getting malware?",
      choices: [
        "Installing apps only from official stores and keeping software updated",
        "Clicking 'You won a prize!' pop-ups to see what they are",
        "Downloading pirated games to save money",
        "Turning off all updates so nothing changes",
      ],
      correctIndex: 0,
      explanation:
        "Malware usually sneaks in through risky downloads and clicks. Sticking to official stores, avoiding surprise links and attachments, and installing updates (which patch security holes) keeps you much safer.",
    },
  ],
  reflection: {
    prompt:
      "Be honest: do you reuse any passwords, and is 2FA turned on for your most important account (like email)? Name one security upgrade you'll make this week — especially if you have a college portal, scholarship login, or job app account.",
    placeholder: "Example: I reuse one password for a few apps — I'll set up a password manager and turn on 2FA for my email…",
  },
};
