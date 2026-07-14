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
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Your accounts hold your messages, photos, money, games, and your whole social life — and for older teens, also college portals, scholarship logins, and job applications. Attackers know that — and they have easy, automated ways to break in if you let them. Today you'll learn how to lock them out.\n\nHere's our roadmap:\n\n• **Strong, unique passwords** — and why reusing one is so dangerous.\n• **Password managers** — let software do the hard part.\n• **Two-factor authentication (2FA)** — a second lock attackers can't pick.\n• **Phishing and scams** — spotting fake messages designed to trick you.\n• **Malware and public Wi-Fi** — what to avoid and why.\n• **Senior stretch** — locking down email, college portals, and spotting fake internship offers.\n\nThis isn't paranoia — it's a basic life skill. Getting hacked can mean lost accounts, stolen money, embarrassing posts, or identity theft. A few simple habits make you a *much* harder target than most people online.`,
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
        id: "why-it-matters",
        kicker: "Real stakes",
        title: "What actually happens when an account gets taken over",
        body: `It's tempting to think "I don't have anything worth stealing." But account takeovers cause real, immediate damage:\n\n• **Your identity gets borrowed.** Attackers post as you, message your friends asking for money, or send scam links from your own account — because people trust messages from someone they know.\n• **One account unlocks others.** If your email is compromised, an attacker can use "Forgot password?" to reset your other accounts one by one.\n• **Money and opportunities disappear.** Stolen banking apps, gift cards, or even a hijacked college portal account can cause real financial and academic damage.\n• **It takes real time to undo.** Recovering a hacked account, canceling cards, and warning friends who got scam messages "from you" can eat up days you don't have during a busy school or application season.\n\nThe good news: the handful of habits in this lesson block the vast majority of these attacks before they ever start.`,
        callout: {
          label: "Why it matters",
          text: "Attackers run automated tools that try millions of leaked passwords a minute across thousands of sites. You're not being targeted personally most of the time — you're just one of many doors they're jiggling to see which ones are unlocked.",
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
        id: "passwords-practice",
        kicker: "Apply it",
        title: "Spot the stronger password",
        body: `Strength isn't about how "complicated" a password *looks* — it's mostly about **length** plus true unpredictability. Let's compare a few real examples:\n\n• \`Summer2024!\` — looks decent (capital, number, symbol) but it's a common pattern (season + year + symbol) that cracking software specifically checks for first. Short and predictable.\n• \`Tr0ub4dor&3\` — has plenty of symbols but is still fairly short, and swapping letters for look-alike numbers is another pattern attackers' tools already expect.\n• \`copper-lantern-quiet-otter-42\` — long, made of unrelated words plus a number, easy for a human to remember, and extremely hard for a computer to guess because there's no common pattern to exploit.\n\nThe lesson: length and genuine randomness beat "looks complicated." A password manager (coming up next) can generate something even more random than you'd bother typing by hand — for accounts where you don't need to memorize it at all.`,
        checkIn: {
          prompt: "Which of these is the strongest password for an important account like email?",
          choices: [
            "Summer2024!",
            "Tr0ub4dor&3",
            "copper-lantern-quiet-otter-42",
            "P@ssword",
          ],
          correctIndex: 2,
          explanation:
            "Length and genuine unpredictability beat 'looks complicated.' A long string of unrelated words (a passphrase) is far harder for cracking software to guess than short, pattern-following passwords with symbols swapped in.",
        },
        callout: {
          label: "Pro tip",
          text: "If a password is easy for you to say out loud as a little story ('copper lantern, quiet otter'), it's usually easy to remember and hard for a computer to guess — a great sign you're on the right track.",
        },
      },
      {
        id: "managers-2fa",
        kicker: "Tools that protect you",
        title: "Password managers and two-factor authentication",
        body: `"A different strong password for *every* account? I can't remember all those!" You're right — and you don't have to.\n\nA **password manager** is an app that **generates** long random unique passwords for each account and **stores** them safely, locked behind one strong master password (or your fingerprint/face). You only remember *one* password; it remembers the rest. Examples include Bitwarden, 1Password, and the managers built into your browser or phone.\n\nThen add a second lock: **two-factor authentication (2FA)**, also called **MFA** (multi-factor authentication). It means logging in needs **two things**:\n\n• **Something you know** — your password.\n• **Something you have** — a code from an app, a text, or a tap on your phone.\n\nSo even if a thief steals your password, they *still* can't get in without your phone.\n\n**Lock down recovery too.** Attackers often skip your password and go for the side door: **account recovery**. Review your **recovery email and phone** on important accounts — use addresses *you* control, not an old number a friend might still have. Turn on **2FA** for recovery options when offered, and save **backup codes** somewhere safe (not in the same app you're protecting). A weak recovery path lets someone reset your password even if the main password was strong. It's like a door that needs both a key *and* a second deadbolt that only you can reach. An **authenticator app** (like Google Authenticator or Authy) is more secure than text-message codes, but any 2FA is far better than none.`,
        checkIn: {
          prompt: "Your friend has a strong, unique password for their email, but their recovery phone number belongs to an old phone they no longer own. What's the risk?",
          choices: [
            "None — the password alone is all that matters",
            "Someone who gets that old phone number could potentially use it to reset the account, bypassing the strong password",
            "Recovery numbers can never be used to reset an account",
            "It only matters if 2FA is turned off completely",
          ],
          correctIndex: 1,
          explanation:
            "A weak or outdated recovery path is a side door around even a strong password. Keeping recovery email/phone current — and protected with 2FA when possible — closes that gap.",
        },
        callout: {
          label: "Common misconception",
          text: "\"2FA is an annoying hassle that's not worth it.\" It adds a few seconds at login but blocks the vast majority of account takeovers — because a stolen password alone is no longer enough. It's one of the single best things you can turn on today.",
        },
      },
      {
        id: "2fa-types",
        kicker: "Go deeper",
        title: "Not all 2FA is equally strong",
        body: `Once you commit to using 2FA everywhere, it helps to know the options aren't identical:\n\n• **SMS (text message) codes** — better than nothing, but the weakest option. A rare but real attack called **SIM swapping** lets a scammer trick your phone carrier into moving your number to their device, letting them receive your codes.\n• **Authenticator apps** (Google Authenticator, Authy, or your password manager's built-in option) — generate codes directly on your device, with no phone number involved to hijack. Stronger than SMS.\n• **Security keys** — small physical devices (or your phone's built-in passkey feature) that you tap or plug in to confirm it's really you. The strongest common option, since there's no code to phish at all.\n\nYou don't need the strongest option for every account. The real lesson is simpler: **any 2FA beats no 2FA**, and for your most important accounts (email especially), upgrading from SMS to an authenticator app when possible closes a real gap.`,
        checkIn: {
          prompt: "Which of these 2FA methods is generally considered the weakest, though still better than no 2FA at all?",
          choices: [
            "A physical security key",
            "An authenticator app that generates codes on your device",
            "SMS text-message codes, due to risks like SIM swapping",
            "There is no difference between any 2FA methods",
          ],
          correctIndex: 2,
          explanation:
            "SMS codes can be intercepted through attacks like SIM swapping, where a scammer moves your phone number to their own device. Authenticator apps and security keys don't have that specific weakness.",
        },
        callout: {
          label: "Pro tip",
          text: "Don't let 'which 2FA is best' stop you from turning on any 2FA today. Perfect is the enemy of done — SMS 2FA on every account beats a perfect plan you never actually set up.",
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
        id: "phishing-practice",
        kicker: "Apply it",
        title: "Spot the phishing red flags",
        body: `Let's practice on a real-feeling example. You get a text: *"KANAM ACCOUNT ALERT: Unusual sign-in detected. Verify now within 15 minutes or your account will be permanently suspended: kanam-secure-verify.net/login"*\n\nCount the red flags with me:\n\n• **Urgency and a countdown** — "within 15 minutes" is designed to make you panic-click before thinking.\n• **A threat** — "permanently suspended" raises the emotional stakes on purpose.\n• **A suspicious domain** — \`kanam-secure-verify.net\` is NOT the real Kanam Academy website; a scammer just put a familiar word in a fake domain.\n• **A request to "verify" through a link someone sent you**, instead of the app or site you'd normally use.\n\nEvery one of these is a classic pattern, not a coincidence. Real security alerts don't need you to click a mystery link in the next 15 minutes.`,
        checkIn: {
          prompt: "A text says: 'URGENT: Your account will be suspended in 15 min unless you verify at kanam-secure-verify.net.' What's the safest response?",
          choices: [
            "Click the link immediately since 15 minutes isn't much time",
            "Reply with your password to prove your identity quickly",
            "Don't click it — go directly to the real site or app yourself by typing the address you already know",
            "Forward it to friends so they can click it and check if it's real",
          ],
          correctIndex: 2,
          explanation:
            "Urgency, threats, and an unfamiliar domain are classic phishing signs. The safe move is always to go to the real site or app yourself, never through a link in the suspicious message.",
        },
        callout: {
          label: "Pro tip",
          text: "Make it a rule: you never 'verify,' 'confirm,' or 'log in' through a link someone sent you — text, email, or DM. You only ever go to accounts through an app you opened yourself or a bookmark you saved.",
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
        id: "public-wifi",
        kicker: "Go deeper",
        title: "Public Wi-Fi: convenient, but handle with care",
        body: `Coffee shop, airport, or school library Wi-Fi is genuinely useful — but "open" networks (no password, or a password everyone shares) have a specific risk: **other people on the same network can sometimes see unencrypted traffic**, meaning what you're sending could theoretically be watched.\n\nA few practical habits fix most of the risk:\n\n• **Check for HTTPS.** Look for the little lock icon and "https://" in your browser's address bar — it means your connection to that specific site is encrypted, even on public Wi-Fi. Most modern sites use it by default.\n• **Save sensitive logins for trusted networks** when you can — banking, college portals, tax or financial aid sites are worth waiting for home or a trusted network.\n• **A VPN** (Virtual Private Network) encrypts your whole connection, adding a layer of protection on any network — useful, though not required for casual browsing.\n• **Turn off auto-connect** to open Wi-Fi networks so your device doesn't silently join a risky network without you noticing.\n\nNone of this means avoid public Wi-Fi entirely — it means use it thoughtfully for lower-stakes browsing, and be a bit more careful with your most sensitive logins.`,
        checkIn: {
          prompt: "You're at a coffee shop on open Wi-Fi and need to log into your college financial aid portal before a deadline. What's the safest approach?",
          choices: [
            "Never use public Wi-Fi for anything, ever, even in an emergency",
            "Log in normally — public Wi-Fi has no real risk",
            "If possible, wait for trusted Wi-Fi or use your phone's cellular data; if you must use it now, confirm the site shows https:// and consider a VPN",
            "Ask a stranger at the coffee shop to log in for you",
          ],
          correctIndex: 2,
          explanation:
            "Public Wi-Fi isn't automatically dangerous, but sensitive logins deserve extra caution: prefer trusted networks or cellular data when you can, and confirm HTTPS (or use a VPN) if you must use open Wi-Fi.",
        },
        callout: {
          label: "Pro tip",
          text: "Your phone's cellular data (not Wi-Fi at all) is often the safest option for a quick sensitive login when you're out and about — no shared network involved.",
        },
      },
      {
        id: "level-up-vocabulary",
        kicker: "Level up",
        title: "A few more security words worth knowing",
        body: `A handful of terms come up once you start reading about real breaches and scams. Quick definitions so nothing surprises you later:\n\n• **Brute force attack** — a program that tries huge numbers of password guesses automatically until one works. Length is your main defense against this.\n• **Keylogger** — malware that secretly records every key you press, capturing passwords as you type them.\n• **Social engineering** — tricking a *person* (not a computer) into giving up access, like a scammer calling and pretending to be IT support.\n• **Zero-day** — a security flaw that's discovered and exploited before the company has released a fix for it. It's why keeping software updated matters even when nothing seems wrong yet.\n• **Two-step vs. two-factor** — sometimes used loosely, but true 2FA means two genuinely *different types* of proof (like a password plus a physical device), not just two passwords.\n\nYou don't need to memorize these — recognizing them when you see them in a headline or a security setting is the real goal.`,
        callout: {
          label: "Tip",
          text: "If a setting menu ever uses one of these words and you're not sure what it means, that's exactly what this glossary is for — come back and check rather than guessing or skipping it.",
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
        id: "worked-2",
        kicker: "Worked example",
        title: "Securing a shared family device, step by step",
        body: `Now a different, everyday scenario: your family shares a laptop that everyone uses for schoolwork, streaming, and now your first job applications. Let's lock it down properly, step by step.\n\n**Step 1 — Separate accounts, not one shared login.** If the laptop only has one login, each person's browser history, saved passwords, and autofill get mixed together. Set up **separate user profiles** if the device supports it.\n\n**Step 2 — Sign out of sensitive accounts when done.** On a shared device, closing the browser tab isn't the same as **logging out**. Explicitly sign out of email, banking, or a college portal after each use.\n\n**Step 3 — Don't let the browser save passwords on a shared profile.** Saved autofill passwords on a shared login mean anyone using that profile can access your accounts. Use a personal password manager app instead, locked behind your own master password.\n\n**Step 4 — Turn on 2FA everywhere you can.** Even if someone else gets into a saved session, 2FA on your important accounts adds a barrier a shared device alone doesn't have.\n\n**Step 5 — Lock the device when you walk away.** A quick lock-screen habit (a password, PIN, or fingerprint) stops a sibling — or anyone else — from picking up where you left off while you're still logged in.\n\nA shared device isn't automatically unsafe — it just needs a few extra, deliberate habits.`,
        checkIn: {
          prompt: "You use a shared family laptop to check your college portal, then close the browser tab without signing out. What's the risk?",
          choices: [
            "None — closing the tab is the same as logging out",
            "The next person to use that browser profile could still be logged into your account",
            "The laptop will automatically delete your account",
            "There's no risk since the laptop is shared with family",
          ],
          correctIndex: 1,
          explanation:
            "Closing a tab often leaves you still signed in behind the scenes. On a shared device, explicitly signing out (not just closing the tab) is what actually protects your account.",
        },
        callout: {
          label: "Pro tip",
          text: "If a device is shared, treat 'sign out' as a habit every single time, the same way you'd lock a shared door. It takes two seconds and closes a real gap.",
        },
      },
      {
        id: "security-checklist",
        kicker: "Take action",
        title: "Your 5-question security check-in",
        body: `Make this a habit you run every few months, or any time something feels off:\n\n1. **Reuse check** — am I using the same password on more than one account? If so, which one gets fixed first?\n2. **2FA check** — is 2FA turned on for my email and any account with money or high stakes attached?\n3. **Recovery check** — is my recovery email/phone current and something only I control?\n4. **Message check** — has anything urgent, threatening, or "too good to be true" landed in my inbox or texts lately? Did I verify it independently instead of clicking?\n5. **Device check** — do I sign out of accounts on shared or public devices, and keep my own devices updated?\n\nFive quick questions, run occasionally, catch most of the gaps before they become real problems.`,
        callout: {
          label: "Try this today",
          text: "Pick just your email account and answer all five questions for it right now. Email is the single highest-leverage account to get right first.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You're now a much harder target than most people online. Quick recap:\n\n• Use **strong, unique** passwords — **passphrases** beat short complex ones, and reusing one password puts every account at risk.\n• Let a **password manager** generate and remember them for you.\n• Turn on **2FA** so a stolen password isn't enough to get in — authenticator apps and security keys beat SMS when you have the option.\n• Spot **phishing/smishing** by their urgency, fake sender addresses, and shady links — and never share a 2FA code.\n• Avoid **malware** by updating software, installing only from trusted sources, and being careful with sensitive logins on public Wi-Fi.\n• Lock down **email** and high-stakes portals, secure shared devices deliberately, and treat fake internship offers as phishing until proven real.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then write a quick reflection about your own security habits.`,
      },
    ],
  },
  bigIdeas: [
    "Use **strong, unique** passwords (passphrases) — reusing one lets a single breach unlock every account.",
    "A **password manager** stores them and **2FA** adds a second lock, so a stolen password isn't enough — authenticator apps and security keys beat plain SMS.",
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
    {
      id: "q6",
      question: "Between SMS text codes, an authenticator app, and a physical security key for 2FA, which statement is most accurate?",
      choices: [
        "They're all exactly equally secure in every situation",
        "SMS codes are generally weaker due to risks like SIM swapping, while authenticator apps and security keys are stronger — but any 2FA beats none",
        "SMS codes are the strongest possible option",
        "2FA is never worth using regardless of type",
      ],
      correctIndex: 1,
      explanation:
        "SMS codes can be intercepted through attacks like SIM swapping. Authenticator apps and security keys avoid that specific weakness — but the most important step is turning on some form of 2FA at all.",
    },
    {
      id: "q7",
      question: "You need to log into your financial aid portal but you're only near open public Wi-Fi at a coffee shop. What's the safest approach?",
      choices: [
        "Log in immediately — public Wi-Fi is exactly as safe as home Wi-Fi",
        "Prefer cellular data or trusted Wi-Fi if possible; if you must use public Wi-Fi, confirm the site uses https:// or use a VPN",
        "Ask a stranger to log in on their device instead",
        "Never use the internet again for financial aid",
      ],
      correctIndex: 1,
      explanation:
        "Public Wi-Fi isn't automatically dangerous, but sensitive logins deserve extra caution — prefer cellular data or a trusted network, and confirm HTTPS (or use a VPN) if you must use open Wi-Fi.",
    },
    {
      id: "q8",
      question: "On a shared family laptop, you close the browser tab after checking your email but don't explicitly sign out. What's the concern?",
      choices: [
        "Closing a tab always logs you out completely, so there's no concern",
        "The next person using that same browser profile could still be signed into your account",
        "The laptop automatically deletes the account after one use",
        "Shared devices can never be made secure",
      ],
      correctIndex: 1,
      explanation:
        "Closing a tab often leaves your session active behind the scenes. On shared devices, explicitly signing out — not just closing the tab — is the habit that actually protects your account.",
    },
  ],
  reflection: {
    prompt:
      "Be honest: do you reuse any passwords, and is 2FA turned on for your most important account (like email)? Name one security upgrade you'll make this week — especially if you have a college portal, scholarship login, or job app account.",
    placeholder: "Example: I reuse one password for a few apps — I'll set up a password manager and turn on 2FA for my email…",
  },
};
