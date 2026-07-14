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
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-5.png",
        imageAlt: "Password manager vault on a laptop screen with a phone MFA code beside it",
        body: `Credentials are the keys to your digital life. Today you'll learn how to choose stronger keys, how sites *should* store them, and what to do when a breach hits the news.\n\nHere's our roadmap:\n\n• **Strong passwords & passphrases** — length and uniqueness beat clever substitutions.\n• **Password managers** — one vault, many unique passwords (concept).\n• **Hashing vs. encryption** — one-way checks vs. reversible lockboxes.\n• **Salt** — why identical passwords shouldn't look identical when stored.\n• **MFA types** — app codes, prompts, SMS, keys (tradeoffs at a high level).\n• **A worked example, a myth, and a mini case** — practicing breach response before it happens for real.\n• **Breach response** — change passwords, enable MFA, watch for follow-on scams.\n\nStill defensive only: we explain how storage *protects* passwords, not how to crack them.`,
        callout: {
          label: "Why it matters",
          text: "Reused passwords turn one breach into many account takeovers. Unique credentials + MFA contain the blast radius.",
        },
      },
      {
        id: "hook-story",
        kicker: "A quick story",
        title: "Theo's gaming password comes back to haunt him",
        body: `Theo gets an email one afternoon: a gaming site he barely uses had a data breach, and his email + password combo was in the leaked list. He shrugs it off — "it's just a gaming account, who cares?" — and closes the email without changing anything.\n\nTwo weeks later, Theo can't log into his school email. His password doesn't work anymore, and a "password reset" confirmation he never requested sits unopened in a friend's inbox, sent from Theo's account. It turns out Theo had used that exact same gaming password for his school email too, years ago, and never changed either one.\n\nOne "who cares" breach at a site Theo barely used turned into losing control of the account that connects to nearly everything else in his digital life — because the same key opened both doors.\n\nBy the end of this lesson, you'll know exactly why password reuse is this dangerous, and what Theo should have done the moment that first breach email arrived.`,
        callout: {
          label: "Notice",
          text: "The breach itself wasn't Theo's fault — breaches happen to well-run companies too. What turned it into a crisis was reuse, which was entirely within Theo's control.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Credential vocabulary",
        body: `• **Credential** — proof used to log in, usually a username + password (plus MFA).\n• **Passphrase** — a longer password made of several words; easier to remember, often stronger.\n• **Password manager** — an app that stores unique passwords in an encrypted vault unlocked by a master password / unlock method.\n• **Encryption** — scrambling data so it can be unlocked with the correct key (two-way with the key).\n• **Hashing** — running data through a one-way function to produce a fingerprint-like value; you can't usefully "unlock" it back to the original.\n• **Salt** — random data added before hashing so identical passwords don't produce identical hashes.\n• **Breach** — an incident where data (sometimes password data) is exposed without authorization.`,
        callout: {
          label: "Pro tip",
          text: "If you remember only one idea: sites should store **hashes** of passwords, not the passwords themselves in plain text.",
        },
      },
      {
        id: "concept-1",
        kicker: "Better secrets",
        title: "Strong passwords and passphrases",
        body: `Weak patterns are easy for attackers to try in bulk: \`password123\`, \`Summer2026!\`, pet names, sports teams, or the same password everywhere.\n\nStronger approach:\n• **Length matters.** Longer secrets are generally harder to guess.\n• **Uniqueness matters more than cleverness.** A unique passphrase per important account beats one "complex" password reused everywhere.\n• **Passphrases** — several unrelated words strung together — can be memorable and strong.\n• Avoid personal details that appear on your social profiles.\n• Don't share passwords; don't store them in plain class group chats.\n\nSchool-life examples of accounts that deserve unique, strong credentials: email, school portal, banking, and any account that can reset others.`,
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
        checkIn: {
          prompt: "Theo used the same password for a gaming site and his school email. What is the strongest fix going forward?",
          choices: [
            "Keep one password everywhere but make it longer",
            "Use a unique password or passphrase for each important account",
            "Only change the gaming password since that's where the breach happened",
            "Add \"2\" to the end of the old password on both accounts",
          ],
          correctIndex: 1,
          explanation:
            "Uniqueness is what prevents one breach from cascading into other accounts. A single strong-but-reused password still fails this test.",
        },
      },
      {
        id: "concept-2",
        kicker: "Storage and tools",
        title: "Password managers, hashing, encryption, salt",
        image: "/images/lessons/cs-5-2.png",
        imageAlt: "Simple visual of password going into a one-way hash funnel becoming a digest, not reversible",
        body: `**Password managers (concept):** You remember one strong master unlock method; the manager creates and fills unique passwords for each site. That lets you stop reusing credentials. Choose a reputable manager and protect the master unlock carefully (and use MFA on the vault if available).\n\n**Hashing vs. encryption (defender view):**\n• **Encryption** is designed so the right key can reverse the process and recover the original data — useful for files you need to read later.\n• **Hashing** is designed to be **one-way**. Login systems hash what you type and compare it to the stored hash. If someone steals the database of hashes, they shouldn't get your actual password directly.\n\n**Salt (simple):** If two users choose the same password, unsalted hashes could look the same — which helps attackers. A **salt** is unique random data mixed in before hashing so identical passwords produce different stored values.\n\nYou don't need the math. You need the implication: good services hash + salt; bad breaches sometimes reveal poor storage practices — which is why unique passwords still matter.`,
        callout: {
          label: "Common misconception",
          text: "\"If a site hashes passwords, a breach is harmless.\" Not always. Weak hashing, reused passwords, and other stolen personal data still create risk. Treat breach notices seriously.",
        },
        checkIn: {
          prompt: "Why do login systems typically store a hash of your password instead of the password itself?",
          choices: [
            "Because hashing makes passwords easier to type",
            "Because hashing is one-way, so a stolen database of hashes doesn't directly hand over the original passwords",
            "Because hashing and encryption are identical processes",
            "Because hashes can always be reversed by the site owner",
          ],
          correctIndex: 1,
          explanation:
            "Hashing is designed to be one-way, which limits (but doesn't eliminate) damage if the stored data is ever stolen.",
        },
      },
      {
        id: "concept-3",
        kicker: "Second factors",
        title: "MFA types — strengths at a glance",
        image: "/images/lessons/cs-5-3.png",
        imageAlt: "App authenticator code, SMS code, and physical security key laid out as MFA options",
        body: `**MFA** adds another factor beyond the password. Common types:\n\n• **Authenticator app codes** — time-based codes in an app on your phone. Generally strong everyday choice.\n• **Push prompts** — approve/deny on a trusted device. Convenient; beware **prompt bombing** (many pushes hoping you'll tap Approve). If you get a prompt you didn't start — deny and change password.\n• **SMS codes** — better than password alone, but phone-number attacks and SIM problems make SMS one of the weaker MFA options.\n• **Hardware security keys** — physical tokens you tap/plug in; excellent for high-value accounts when supported.\n• **Backup codes** — one-time codes you store offline for recovery. Keep them safe; treat them like passwords.\n\nMFA doesn't mean you can use \`password\` as your password. It means a stolen password alone often isn't enough.`,
        callout: {
          label: "Pro tip",
          text: "Prioritize MFA on email first. Email is frequently the recovery path for everything else.",
        },
        checkIn: {
          prompt: "If Theo had MFA enabled on his school email using an authenticator app, what would likely have happened when the attacker tried his reused gaming password?",
          choices: [
            "Nothing would change — MFA doesn't affect password logins",
            "The password alone likely wouldn't be enough, since the attacker would also need the app code",
            "MFA would have deleted his email account automatically",
            "MFA only works if the password is also changed first",
          ],
          correctIndex: 1,
          explanation:
            "MFA means a correct password alone usually isn't sufficient — the attacker would also need Theo's second factor, which they wouldn't have.",
        },
      },
      {
        id: "worked-example",
        kicker: "Step by step",
        title: "Walking through Theo's breach, the right way",
        body: `Let's rewind to the moment Theo got the breach notification email, and walk through the correct response step by step.\n\n**Step 1 — Take the notice seriously**, even for a "small" account. The email confirms Theo's password for that site was exposed.\n\n**Step 2 — Change the breached password immediately**, from a device Theo trusts, using a new, unique password or passphrase.\n\n**Step 3 — Check for reuse.** This is the step Theo skipped. He should ask: "Have I used this exact password anywhere else?" If the answer is his school email — which it was — that account is now at risk too, even though it wasn't the one breached.\n\n**Step 4 — Change every reused copy**, starting with the highest-value account (email, since it can reset other accounts).\n\n**Step 5 — Enable MFA** on the important accounts if it isn't already on, especially email.\n\n**Step 6 — Watch for follow-on scams.** After big breaches, phishing emails pretending to "help you recover" often follow — treat those with the same skepticism from Lesson 4.\n\nNotice that the breach itself was outside Theo's control — but every step after the notification email was fully within it.`,
        checkIn: {
          prompt: "In the worked example, which step did Theo actually skip in real life, leading to the school email takeover?",
          choices: [
            "Step 1 — reading the notification at all",
            "Step 3 — checking whether the breached password was reused anywhere else",
            "Step 5 — enabling MFA on the gaming account",
            "Step 6 — watching for follow-on scams",
          ],
          correctIndex: 1,
          explanation:
            "Theo read the notice but dismissed it as unimportant, never checking (or acting on) the fact that he'd reused that exact password on his school email.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "\"If a site hashes passwords, a breach is harmless\"",
        body: `Hashing genuinely helps — but it doesn't make a breach a non-event. A few reasons:\n\n• **Weak or outdated hashing methods** can sometimes still be reversed with enough computing effort, especially for common, weak passwords.\n• **Other leaked data matters too** — email addresses, security question answers, or account activity can fuel phishing even without the password itself.\n• **Reuse is the real multiplier.** Even a strong hash on Site A doesn't protect Site B if you used the identical password there and Site B's breach involves weaker storage.\n\nThe accurate takeaway: good hashing (with salt) is a genuinely important defense, but it's a *reduction* in risk, not a guarantee of zero risk. That's exactly why breach notifications should always trigger the response checklist — never a shrug.`,
        callout: {
          label: "Reframe it",
          text: "Instead of \"they hash passwords, so I'm fine,\" try: \"they hash passwords, which helps — and I still need to change my password and check for reuse.\"",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Try it yourself: a two-minute account audit",
        body: `Think about your email account — the one that could reset most of your other logins if needed.\n\n1. **Is its password unique**, or have you used it (or a close variation) anywhere else, even on an account you consider unimportant?\n2. **Is MFA turned on**? If not, what's stopping you right now — is it a real obstacle, or just something you haven't gotten to yet?\n3. **If you use a password manager**, is its master unlock method itself strong and unique? If you don't use one, would trying one for a few important accounts be worth exploring?\n\nYou don't have to fix everything today. Just noticing the honest answers is the first real step — most security failures start with a gap someone already knew about but hadn't gotten around to closing.`,
        callout: {
          label: "Keep it real",
          text: "If your email doesn't have MFA yet, that's the single highest-value fix available to you from this entire lesson.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "When things go wrong",
        title: "Going deeper: the full breach-response checklist",
        image: "/images/lessons/cs-5-4.png",
        imageAlt: "Numbered breach response checklist on a laptop screen: change password, check reuse, enable MFA, check recovery info",
        body: `When a service you use announces a breach — or you see unexpected login alerts — work a simple checklist:\n\n**1. Change the password** on that account from a device you trust.\n**2. Change it everywhere you reused that password** (this is why reuse hurts).\n**3. Turn on MFA** if it wasn't on.\n**4. Check recovery email and phone** — attackers sometimes change those first.\n**5. Watch for phishing** that pretends to "help you recover" from the breach.\n**6. Review recent account activity** (sent mail, purchases, connected apps).\n**7. Tell a trusted adult** if school accounts or money might be involved.\n\nPrevention still wins: unique passwords (manager-assisted) + MFA + cautious clicking means one company's incident doesn't become your whole-life incident.`,
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
        id: "comparison",
        kicker: "Side by side",
        title: "Comparing storage and protection layers",
        body: `It helps to see how the layers in this lesson stack together, since they protect against different failure points:\n\n• **Strong, unique password/passphrase** → protects against guessing and limits damage if one site is breached.\n• **Password manager** → makes uniqueness realistic across dozens of accounts, without relying on memory alone.\n• **Hashing + salt (server-side)** → protects you if the *company's* database is stolen — this is out of your control, but matters when choosing services.\n• **MFA** → protects you even if your password specifically leaks or is guessed, by requiring a second factor the attacker likely doesn't have.\n\nNo single layer is enough by itself. A great password with no MFA still fails to a breach at another reused site; MFA with a terrible, reused password still leaves your account more exposed than it needs to be. The layers are meant to work together.`,
        checkIn: {
          prompt: "Which layer specifically protects you even after your password has already leaked or been guessed?",
          choices: ["A longer password alone", "MFA (a second factor)", "Server-side hashing only", "Nothing can help once a password leaks"],
          correctIndex: 1,
          explanation:
            "MFA requires a second factor beyond the password, so a leaked or guessed password alone often still isn't enough to get in.",
        },
      },
      {
        id: "defender-trap-or-myth",
        kicker: "Don't fall for this",
        title: "The trap: \"I just added a number, so it's a new password\"",
        body: `A very common trap, especially right after a breach notice: tweaking an old password slightly — adding "1," "!", or the current year — and treating it as a fresh, safe password.\n\nThe trap feels responsible ("I changed it!") while barely changing the actual risk. If an old password leaked as \`Sunshine22\`, an attacker (or automated tool) trying common variations like \`Sunshine23\`, \`Sunshine22!\`, or \`Sunshine2024\` isn't doing much extra work. Small, predictable edits to a known-leaked password don't create real distance from the leak.\n\nThe fix: after a breach, treat it as a chance to create a **genuinely new** password or passphrase — not a patched version of the old one. A password manager removes the temptation entirely, since it can generate something unrelated in seconds.`,
        callout: {
          label: "Watch out",
          text: "If you can still recognize your \"new\" password as a variation of the old one, an attacker's guessing tools probably can too.",
        },
      },
      {
        id: "habits",
        kicker: "Make it stick",
        title: "Credential habits worth building now",
        body: `Quick recap of the habits from this lesson, in priority order:\n\n• **Enable MFA on email first** — it's often the recovery path for everything else.\n• **Stop reusing passwords**, starting with your most important accounts.\n• **Consider a password manager** if remembering unique passphrases for dozens of accounts feels overwhelming.\n• **Take every breach notification seriously** — even for accounts that feel unimportant, because reuse can turn a small breach into a big one.\n• **Create genuinely new passwords after a breach** — not slightly-edited old ones.\n\nNone of these require technical expertise — just consistency. That's exactly why this is one of the highest-leverage lessons in the whole track.`,
        callout: {
          label: "Why it matters",
          text: "Most account takeovers in real life trace back to reused or weak passwords, not sophisticated attacks — which means these habits genuinely move the needle.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and reflect",
        title: "Quick gut-check before you continue",
        body: `Before the mini case and knowledge check: if you got a breach notification email right now for one of your accounts, would you actually work through the full checklist — or would you be tempted to do what Theo did and shrug it off? Being honest with yourself about that tendency is the first step to changing it.`,
      },
      {
        id: "mini-case",
        kicker: "Case file",
        title: "Mini case: the group project login everyone shares",
        image: "/images/lessons/cs-5-5.png",
        imageAlt: "Sticky note with a shared password stuck to a shared laptop, next to a breach notification email on screen",
        body: `**The situation:** A four-person project team creates one shared login for a design tool so everyone can contribute to the same file. To make it easy to remember, they choose a password close to one member's existing personal password, and write it on a sticky note attached to a shared laptop in the school library.\n\nMonths later, that design tool announces a data breach. One teammate, Priya, recognizes the shared password immediately — because it's nearly identical to her own personal email password, which she'd suggested as the base "for simplicity."\n\n**Apply what you've learned:**\n\n• **Reuse risk:** Because the shared password was a close variation of Priya's real password, the breach now threatens her personal email too — the exact trap from this lesson's defender-trap section.\n• **Shared-account risk:** Nobody can be sure who else may have written the sticky-note password down elsewhere, or shared it further — a preview of access-control problems you'll cover in a later lesson.\n• **Correct response:** Priya should treat this as a full breach-response situation for her own email (change the password to something genuinely new, check for MFA), and the team should replace the shared tool password with something unrelated to anyone's personal credentials — ideally with individual logins instead of one shared one.\n\nThis case shows how convenience shortcuts — a shared password based on a personal one, written on a sticky note — can turn a minor breach into a personal one.`,
      },
      {
        id: "mfa-priority",
        kicker: "Decision checklist",
        title: "Which accounts get MFA first?",
        body: `You cannot flip MFA on everywhere in one afternoon — defenders prioritize by blast radius.

**Tier 1 — enable today:**
• Primary email (recovery path for almost everything else).
• Banking or payment apps if you use them.
• School portal and college-application accounts.

**Tier 2 — this week:**
• Cloud storage with group projects or personal documents.
• Social accounts tied to your real name or club officer role.
• Password manager account itself.

**Tier 3 — when offered:**
• Games and entertainment — especially if tied to real email or payment methods.

**Comparison of factor strength (when you have a choice):**
• Hardware key / authenticator app → strongest everyday options.
• Push prompts → convenient; deny anything you did not start.
• SMS codes → better than password alone, but weaker than app codes.

One strong email + MFA pairing prevents a single gaming-site breach from becoming a full identity takeover — exactly Theo's lesson.`,
        checkIn: {
          prompt: "Why should primary email often be the first account to receive MFA?",
          choices: [
            "Email is never targeted by attackers",
            "Email is commonly the recovery path for many other accounts",
            "MFA on email makes passwords unnecessary everywhere",
            "Schools require MFA only on email",
          ],
          correctIndex: 1,
          explanation:
            "Compromised email often becomes the key to reset passwords on other services — protecting email first limits cascade damage.",
        },
      },
      {
        id: "breach-notification",
        kicker: "Scenario walkthrough",
        title: "Reading a breach notification like a defender",
        body: `**Scenario:** A game forum you used years ago emails: "We experienced a security incident. Some usernames and password hashes may have been exposed."

**Defender reading — what matters:**
• **Was your password unique?** If yes, change it on that site only. If no, change it everywhere you reused it — starting with email.
• **Was MFA on?** If yes, stolen hashes are far less useful to an attacker.
• **What data was exposed?** Email alone enables targeted phishing; payment data needs card issuer contact.
• **Is the email itself real?** Open the site directly — do not click "reset password" inside a breach email until you verify the sender.

**What to do next:**
1. Change affected passwords to new, unique ones.
2. Turn on MFA.
3. Watch for phishing pretending to "help" with the breach.
4. Tell a trusted adult if a school or financial account was involved.

Breach emails are stressful; the checklist turns panic into ordered steps.`,
        callout: {
          label: "Watch out",
          text: "Attackers send fake breach notifications too. Verify through the company's official site or app, not only through the email link.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Before you go",
        title: "Check yourself",
        body: `Quick self-check: can you explain the difference between hashing and encryption in your own words? Can you list the full breach-response checklist from memory? If yes, you're ready for the knowledge check.`,
        checkIn: {
          prompt: "In the mini case, why does the breach at the design tool put Priya's personal email at risk too?",
          choices: [
            "It doesn't — only the design tool account is affected",
            "Because the shared password was a close variation of her personal email password, creating a reuse risk",
            "Because sticky notes are a type of malware",
            "Because MFA automatically transfers between accounts",
          ],
          correctIndex: 1,
          explanation:
            "Reuse — even a close variation, not an exact copy — connects the risk from one breach to other accounts using similar credentials.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• Prefer **long, unique** passwords/passphrases; **managers** help you sustain that.\n• **Hashing** is one-way for checking passwords; **encryption** is reversible with a key; **salts** differentiate identical passwords.\n• **MFA** types vary in strength — apps and hardware keys generally beat SMS alone.\n• After a **breach**: change passwords, kill reuse, enable MFA, check recovery info, watch for scams.\n• A slightly edited old password is not a new password — and shared/sticky-note passwords multiply reuse risk.\n\nTake the **Knowledge check**, then reflect on one credential habit you'll upgrade.`,
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
        "Use a unique long password or passphrase per account (ideally with a manager)",
        "Reuse one complex password everywhere so you don't forget it",
        "Use a long passphrase on important accounts, and shorter reused passwords on \"low-value\" sites",
        "Change one reused password by adding the current year after each breach notice",
      ],
      correctIndex: 0,
      explanation:
        "Uniqueness contains breaches. Length helps resist guessing. Managers make uniqueness practical.",
    },
    {
      id: "q2",
      question: "How does hashing differ from encryption in password storage?",
      choices: [
        "They are identical processes with different names",
        "Hashing is meant to be one-way; encryption is designed to be reversed with a key",
        "Encryption is one-way; hashing is always reversible by anyone",
        "Hashing only applies to passwords written on paper",
      ],
      correctIndex: 1,
      explanation:
        "Login systems hash passwords to verify them without storing the original. Encryption is for data you need to decrypt later with a key.",
    },
    {
      id: "q3",
      question: "What problem does a salt help prevent?",
      choices: [
        "Slow Wi-Fi connections on a home network",
        "The need to ever enable MFA",
        "Identical passwords looking identical when hashed",
        "Phishing emails being sent in the first place",
      ],
      correctIndex: 2,
      explanation:
        "Salts make two users with the same password produce different stored hashes, which frustrates some bulk-guessing techniques.",
    },
    {
      id: "q4",
      question: "You receive an MFA push approval you did not initiate. What should you do?",
      choices: [
        "Approve it so the notifications stop",
        "Ignore all future MFA prompts permanently after this one",
        "Read the code aloud to the \"support\" number that texted you",
        "Deny it, then secure the account (change password / review activity)",
      ],
      correctIndex: 3,
      explanation:
        "Unexpected MFA prompts can mean someone has your password and is trying to get in. Deny and harden the account.",
    },
    {
      id: "q5",
      question: "A site you used announces a password breach. You reused that password on two other sites. What should you do?",
      choices: [
        "Change the breached password and the reused copies on the other sites; enable MFA where possible",
        "Change only the breached site and leave the others as-is",
        "Post the password online to see if others had the same one",
        "Wait a year before changing anything, since breaches blow over",
      ],
      correctIndex: 0,
      explanation:
        "Reuse means attackers try the same credential elsewhere. Change all affected accounts and add MFA.",
    },
    {
      id: "q6",
      question: "After a breach notice, changing \`Sunshine22\` to \`Sunshine23\` is risky mainly because:",
      choices: [
        "Numbers are never allowed in a secure password",
        "It's a small, predictable variation of a known-leaked password, which guessing tools can easily try",
        "It automatically re-enables MFA on the account",
        "It's actually a genuinely new, unrelated password",
      ],
      correctIndex: 1,
      explanation:
        "Minor edits to a leaked password don't create meaningful distance from the leak — a genuinely new password or passphrase is needed.",
    },
    {
      id: "q7",
      question: "Which best describes why MFA still matters even when a service properly hashes and salts passwords?",
      choices: [
        "MFA replaces the need for hashing entirely",
        "MFA is only useful if a site's hashing is disabled",
        "MFA protects you even if your specific password is separately guessed, phished, or reused elsewhere",
        "MFA and hashing solve the exact same problem in the exact same place",
      ],
      correctIndex: 2,
      explanation:
        "Hashing protects the server-side database; MFA protects your specific login even if your password leaks through a different path, like phishing or reuse.",
    },
    {
      id: "q8",
      question: "Why are two-factor authentication and biometric verification commonly recommended security measures?",
      choices: [
        "Because passwords are no longer used by any real system",
        "Because biometric verification eliminates all risk on its own",
        "Because they are the only two security measures that exist",
        "Because they are concrete, comparable defenses students can evaluate for feasibility, usability, and impact — core cybersecurity reasoning skills",
      ],
      correctIndex: 3,
      explanation:
        "The useful skill is comparing measures you can actually reason about — exactly the MFA tradeoffs practiced in this lesson.",
    },
  ],
  reflection: {
    prompt:
      "Which of your accounts still share a password, and what is your plan to unique them (passphrases, password manager, or both)? Where will you enable MFA next?",
    placeholder: "Example: My shopping and old game accounts share a password — I'll unique them this week and add MFA to email…",
  },
};
