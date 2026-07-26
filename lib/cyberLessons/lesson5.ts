import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson5: AILessonConfig = {
  id: "cs-5",
  title: "5. Credentials, Hashing & MFA",
  goal: "Compare MFA types, hashing+salting, and password-manager approaches; recommend credential protections with usability tradeoffs; and explain how developers protect stored credentials without exposing secrets.",
  xpReward: 250,
  badge: "Credential Pro",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/4",
  nextHref: "/learn/cyber/6",
  lessonModule: {
    durationLabel: "~25–30 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-5.png",
        imageAlt: "Password manager vault on a laptop screen with a phone MFA code beside it",
        body: `Credentials are the keys to your digital life. Today you'll **compare** protection approaches, **recommend** with usability tradeoffs, and see how developers store credentials safely.\n\nHere's our roadmap:\n\n• **Strong passwords & passphrases** — length and uniqueness beat clever substitutions.\n• **Password managers** — one vault, many unique passwords; when the tradeoff is worth it.\n• **Hashing vs. encryption** — one-way checks vs. reversible lockboxes; what developers should store.\n• **Salt** — why identical passwords shouldn't look identical when stored.\n• **MFA types** — app codes, prompts, SMS, keys — compare strength vs convenience.\n• **A worked example, a myth, and a mini case** — practicing breach response before it happens for real.\n• **Breach response** — change passwords, enable MFA, watch for follow-on scams.\n\nDefensive only: we explain how storage *protects* passwords — not how to attack them.`,
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
        body: `Weak patterns are easy for attackers to try in bulk: \`password123\`, \`Summer2026!\`, pet names, sports teams, or the same password everywhere.\n\n**Compare approaches, then recommend:**\n• **Length + uniqueness** beat clever substitutions. A unique passphrase per important account beats one "complex" password reused everywhere.\n• **Passphrases** — several unrelated words — trade a bit of typing time for memorability without reuse.\n• **Password manager–generated secrets** — best uniqueness at scale; tradeoff is protecting the vault (next section).\n• Avoid personal details from social profiles; never share passwords in class chats.\n\n**Priority recommendation:** unique credentials first on email, school portal, banking, and any account that can reset others — those have the highest blast radius if reused.`,
        bullets: [
          "Prefer **long** and **unique** over short and reused.",
          "**Recommend** uniqueness on high-blast-radius accounts first.",
          "Passphrases trade typing time for memorability without reuse.",
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
        body: `**Password managers — recommend with tradeoffs:** You remember one strong master unlock; the manager creates and fills unique passwords per site. **Pros:** makes uniqueness realistic; reduces reuse cascades. **Cons:** the vault is a high-value target — protect the master unlock with MFA and backups. Recommend a manager when you have many accounts; a few carefully unique passphrases can still work if you won't adopt a vault yet.\n\n**How developers protect credentials (defender view):**\n• **Never store passwords in plain text** — or in reversible encryption "so support can look them up." That turns one database theft into mass account takeovers.\n• **Hashing** is **one-way**: the login system hashes what you type and compares it to the stored hash. Developers verify matches; they should not need the original password.\n• **Encryption** is **two-way with a key** — right for files you must read later, wrong as the primary way to store login passwords.\n• **Salt:** unique random data mixed in before hashing so identical passwords produce different stored values — frustrates bulk guessing against stolen hash lists.\n• **Slow, modern password hashes** (conceptually) make offline guessing expensive; weak or outdated hashing leaves more risk even after "we hashed it."\n\nImplication for you as a user: prefer services that take storage seriously — and still use unique passwords + MFA, because storage quality varies and phishing bypasses hashing entirely.`,
        callout: {
          label: "Common misconception",
          text: "\"If a site hashes passwords, a breach is harmless.\" Not always. Weak hashing, reused passwords, and other stolen personal data still create risk. Treat breach notices seriously.",
        },
        checkIn: {
          prompt: "A developer proposes encrypting passwords so support can \"look them up\" if users forget. Why should you recommend against that?",
          choices: [
            "A common mix-up is to treat because hashing makes passwords easier to type as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "Because reversible storage means a stolen database (or key) can expose real passwords — hashing is designed so developers verify without recovering the secret",
            "A common mix-up is to treat because hashing and encryption are identical processes as enough, which confuses a nearby idea with the right one",
            "A common mix-up is to treat because hashes can always be reversed by the site owner as enough, which confuses a nearby idea with the right one",
          ],
          correctIndex: 1,
          explanation:
            "Password storage should be one-way verification (hash + salt), not reversible lookup. Encryption-with-key-for-support creates a high-value target.",
        },
      },
      {
        id: "concept-3",
        kicker: "Second factors",
        title: "MFA types — strengths at a glance",
        image: "/images/lessons/cs-5-3.png",
        imageAlt: "App authenticator code, SMS code, and physical security key laid out as MFA options",
        body: `**MFA** adds another factor beyond the password. **Compare** types — then **recommend** based on account value and usability:\n\n| Approach | Strength | Usability tradeoff |\n|---|---|---|\n| **Hardware security key** | Excellent for high-value accounts | Must carry the key; not every site supports it |\n| **Authenticator app codes** | Strong everyday default | Phone dependency; setup takes a few minutes |\n| **Push prompts** | Convenient | **Prompt bombing** — deny unexpected pushes, then change password |\n| **SMS codes** | Better than password alone | Weaker (phone/SIM risks); OK when nothing stronger is offered |\n| **Backup codes** | Recovery lifeline | Store offline; treat like passwords |\n\n**Recommendation pattern:** email/banking → authenticator app or hardware key; games/low-stakes → at least SMS if that's all that's offered; never skip MFA on the account that resets others.\n\nMFA doesn't excuse a weak password. It means a stolen password alone often isn't enough — and you still choose the strongest factor you can sustain.`,
        callout: {
          label: "Pro tip",
          text: "Prioritize MFA on email first. Email is frequently the recovery path for everything else.",
        },
        checkIn: {
          prompt: "A classmate wants SMS MFA on email \"because apps are annoying,\" and a hardware key on a rarely used game site. What recommendation best balances security and usability?",
          choices: [
            "A common mix-up is to treat skip MFA on email entirely to avoid inconvenience as enough, which confuses a nearby idea with the right one",
            "Flip it: put the authenticator app or hardware key on email (highest blast radius); SMS on the game is acceptable if nothing stronger is offered",
            "“Agree — SMS is fine for email; put the strongest factor on the least important account” describes a different situation than the one in the question stem",
            "It can seem like use the same SMS code shared in a group chat for both accounts, but that reading skips the distinction this question is testing",
          ],
          correctIndex: 1,
          explanation:
            "Match stronger factors to higher-value accounts. Email's recovery role justifies a slightly less convenient but stronger MFA choice.",
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
            "Step 3 — checking whether the breached password was reused anywhere else",
            "Step 6 — watching for follow-on scams” belongs to a different situation than the one in the question stem",
            "Step 1 — reading the notification at all” belongs to a different situation than the one in the question stem",
            "Step 5 — enabling MFA on the gaming account” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
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
        body: `**Evaluate and recommend** — layers protect different failure points, with tradeoffs:\n\n• **Strong, unique password/passphrase** → limits guessing and cascade from one breach. Tradeoff: harder to remember without a system.\n• **Password manager** → makes uniqueness realistic. Tradeoff: vault becomes critical; protect master unlock + MFA.\n• **Hashing + salt (developer/server-side)** → limits damage if the *company's* database is stolen. You can't configure this, but you can prefer reputable services and still unique your passwords.\n• **MFA** → protects after password leak/phish. Tradeoff: slight friction; pick the strongest factor you'll actually use on high-value accounts.\n\n**Recommendation under constraint:** if you can only do one thing this week, enable MFA on email + make that password unique. If you can do two, add a password manager for the rest. Layers compound — none alone is a complete design.`,
        checkIn: {
          prompt: "You can only improve two things this weekend. Which pair best reduces takeover risk given usability limits?",
          choices: [
            "Enable MFA on primary email and make that email password unique (manager or new passphrase)",
            "Slightly lengthen one reused password and memorize more complex substitutions” belongs to a different situation than the one in the question stem",
            "Rely only on the fact that \"good sites hash passwords\"” belongs to a different situation than the one in the question stem",
            "Turn on SMS MFA for a game and leave email without MFA” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Email is the recovery hub; unique credentials + MFA there contain blast radius with effort most people can sustain.",
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
        body: `Before the mini case and knowledge check: justify a recommendation. If a friend says \"I'll just use one strong password everywhere plus SMS MFA on email,\" what would you advise them to change first — and why, weighing security vs convenience?`,
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
            "Schools require MFA only on email” belongs to a different situation than the one in the question stem",
            "Email is never targeted by attackers” belongs to a different situation than the one in the question stem",
            "Email is commonly the recovery path for many other accounts",
            "MFA on email makes passwords unnecessary everywhere",
          ],
          correctIndex: 2,
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
            "“Because sticky notes are a type of malware” describes a different situation than the one in the question stem",
            "Because MFA automatically transfers between accounts” belongs to a different situation than the one in the question stem",
            "It doesn't — only the design tool account is affected” belongs to a different situation than the one in the question stem",
            "Because the shared password was a close variation of her personal email password, creating a reuse risk",
          ],
          correctIndex: 3,
          explanation:
            "Reuse — even a close variation, not an exact copy — connects the risk from one breach to other accounts using similar credentials.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Compare & recommend:** unique passphrases + manager when scale demands it; protect the vault.\n• Developers should **hash + salt** passwords (one-way), not store reversible secrets for \"support lookup.\"\n• **MFA tradeoffs:** hardware key / authenticator app > SMS for high-value accounts; match strength to blast radius.\n• After a **breach**: change passwords, kill reuse, enable MFA, check recovery info, watch for scams.\n• A slightly edited old password is not a new password — shared/sticky-note passwords multiply reuse risk.\n\nTake the **Knowledge check**, then justify one credential recommendation you'd give a teammate.`,
      },
    ],
  },
  bigIdeas: [
    "**Compare** password managers, unique passphrases, and reuse — recommend uniqueness (often with a manager) despite vault tradeoffs.",
    "Developers protect credentials with **hashing + salt** (one-way), not reversible storage; encryption is for data you must unlock later.",
    "**Evaluate MFA types** for strength vs usability; prioritize stronger factors on email and other high-blast-radius accounts.",
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
      question: "A student juggles 40+ logins and keeps reusing one \"complex\" password. Which recommendation best weighs security against usability?",
      choices: [
            "Use a long passphrase on important accounts, and shorter reused passwords on \"low-value\" sites” belongs to a different situation than the one in the question stem",
            "Adopt a password manager (or unique passphrases for critical accounts first) so uniqueness is sustainable without memorizing dozens of secrets",
            "It can seem like reuse one complex password everywhere so you don't forget it, but that reading skips the distinction this question is testing",
            "“Change one reused password by adding the current year after each breach notice” describes a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "Managers trade a protected vault for realistic uniqueness. Reuse — even on \"low-value\" sites — still cascades into email/recovery accounts.",
    },
    {
      id: "q2",
      question: "Why should developers store salted password hashes rather than encrypting passwords so support can recover them?",
      choices: [
            "“Hashing only applies to passwords written on paper” describes a different situation than the one in the question stem",
            "Hashing is one-way verification; reversible storage means a stolen database or key can expose real passwords at scale",
            "“Encryption is one-way; hashing is always reversible by anyone” describes a different situation than the one in the question stem",
            "“They are identical processes with different names” describes a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "Login systems should verify without recovering the original. Reversible \"support lookup\" creates a catastrophic single point of failure.",
    },
    {
      id: "q3",
      question: "Two users choose the same password. Without salts, what goes wrong for defenders evaluating a stolen hash database?",
      choices: [
            "Slow Wi-Fi connections on a home network” belongs to a different situation than the one in the question stem",
            "Phishing emails being sent in the first place” belongs to a different situation than the one in the question stem",
            "Identical passwords produce identical hashes, letting attackers reuse work across many accounts",
            "“The need to ever enable MFA” describes a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Salts make identical passwords produce different stored hashes, which frustrates bulk offline guessing against stolen lists.",
    },
    {
      id: "q4",
      question: "You receive an MFA push approval you did not initiate. What should you do, and why?",
      choices: [
            "Deny it, then secure the account (change password / review activity) — an unexpected push often means someone already has your password",
            "Picking “Read the code aloud to the \"support\" number that texted you” is a common mix-up that confuses a nearby idea with the right one",
            "Approve it so the notifications stop — convenience outweighs risk” is close in topic, but it is the wrong fit for what the prompt asks",
            "Some learners answer “Ignore all future MFA prompts permanently after this one”, yet that does not match the precise idea from the lesson",
          ],
      correctIndex: 0,
      explanation:
        "Unexpected MFA prompts can mean someone has your password and is trying to get in. Deny and harden the account.",
    },
    {
      id: "q5",
      question: "A site you used announces a password breach. You reused that password on email and a shopping site. Which response is most justified?",
      choices: [
            "Some learners answer “Change only the breached site and leave the others as-is”, yet that does not match the precise idea from the lesson",
            "Picking “Post the password online to see if others had the same one” is a common mix-up that confuses a nearby idea with the right one",
            "You might defend “Wait a year before changing anything, since breaches blow over” in casual talk, but it fails the definition used here",
            "Change the breached password and every reused copy (email first); enable MFA where possible — reuse turns one breach into many takeovers",
          ],
      correctIndex: 3,
      explanation:
        "Reuse means attackers try the same credential elsewhere. Email-first changes limit recovery-path takeovers.",
    },
    {
      id: "q6",
      question: "After a breach notice, changing \`Sunshine22\` to \`Sunshine23\` is risky mainly because:",
      choices: [
            "It automatically re-enables MFA on the account” belongs to a different situation than the one in the question stem",
            "Numbers are never allowed in a secure password” belongs to a different situation than the one in the question stem",
            "It's a small, predictable variation of a known-leaked password, which guessing tools can easily try",
            "It's actually a genuinely new, unrelated password” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Minor edits to a leaked password don't create meaningful distance from the leak — a genuinely new password or passphrase is needed.",
    },
    {
      id: "q7",
      question: "A service hashes and salts passwords correctly. A user is still phished. Why recommend MFA anyway?",
      choices: [
            "MFA is only useful if a site's hashing is disabled — familiar wording, wrong fit for what the prompt is actually asking",
            "MFA and hashing solve the exact same problem in the exact same place” belongs to a different situation than the one in the question stem",
            "Hashing protects the server database; MFA still blocks login when the password is phished, guessed, or reused elsewhere",
            "Picking “MFA replaces the need for hashing entirely” is a common mix-up that confuses a nearby idea with the right one",
          ],
      correctIndex: 2,
      explanation:
        "Server-side hashing and client-side MFA defend different failure modes — both belong in a layered recommendation.",
    },
    {
      id: "q8",
      question: "When comparing authenticator-app MFA vs SMS for a school email account, which evaluation is most accurate?",
      choices: [
            "“They are identical in strength, so pick whichever is prettier” describes a different situation than the one in the question stem",
            "You might defend “SMS is always stronger because texts feel official” in casual talk, but it fails the definition used here",
            "Some learners answer “Neither matters if the site hashes passwords”, yet that does not match the precise idea from the lesson",
            "Authenticator apps are generally stronger; SMS is weaker but still better than password-only when no stronger option exists",
          ],
      correctIndex: 3,
      explanation:
        "CSTA-style reasoning compares measures for feasibility and impact — apps/hardware keys beat SMS, but any MFA beats none on high-value accounts.",
    },
  ],
  reflection: {
    prompt:
      "Recommend a credential plan for yourself or a teammate: password manager vs unique passphrases, which MFA type on email, and one usability tradeoff you're willing to accept. Justify why that mix beats \"one strong reused password.\"",
    placeholder: "Example: Manager for most sites + authenticator MFA on email — I'll accept a minute of setup so a game-site breach can't take my inbox…",
  },
};
