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
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-2.png",
        imageAlt: "Triangle diagram props for Confidentiality Integrity Availability beside a login screen on a laptop",
        body: `Last lesson introduced the **CIA Triad**. Today you'll make it stick — and connect it to every login screen you meet.\n\nHere's our roadmap:\n\n• **Confidentiality, Integrity, Availability** — what each goal really means with school-life examples.\n• **Authentication vs. authorization** — proving who you are vs. what you're allowed to do.\n• **How we prove identity** — passwords, MFA, biometrics, and tokens (concepts only).\n• **Sessions and rate limiting** — what happens after login; logging failed attempts.\n• **A worked example, a myth, and a mini case** — so the ideas transfer to real situations.\n• **How these ideas fit together** — why weak login habits break CIA in the real world.\n\nBy the end, you'll be able to look at a situation and say which CIA goal is at risk — and whether the problem is "who are you?" or "what can you do?"`,
        callout: {
          label: "Why it matters",
          text: "Almost every security control — from phone locks to school portals — is trying to protect at least one of Confidentiality, Integrity, or Availability. Naming the goal helps you choose better habits.",
        },
      },
      {
        id: "hook-story",
        kicker: "A quick story",
        title: "Jordan's phone won't stop buzzing",
        body: `It's 11:15 p.m. Jordan's phone buzzes with an MFA approval request — "Approve sign-in?" He didn't try to log in. He dismisses it. Thirty seconds later, another one. Then another. Six prompts in two minutes.\n\nJordan's first instinct is annoyance — *just tap approve so it stops.* But he pauses. If he didn't request any of these, someone else has his password and is trying to get past the second factor by wearing him down. This pattern even has a name defenders use: **prompt bombing**.\n\nInstead of tapping approve, Jordan denies every prompt, changes his password from his laptop, and checks his account's recent activity. The flood of prompts stops. He never finds out exactly who tried — but his account stayed his.\n\nBy the end of this lesson, you'll understand exactly why Jordan's password alone wasn't enough to get an attacker in, and why "just approve it to stop the noise" is one of the most dangerous habits in this whole unit.`,
        callout: {
          label: "Notice",
          text: "MFA didn't fail here — it worked exactly as designed, buying Jordan the chance to notice and react. The weak link would have been Jordan tapping \"approve\" out of annoyance.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Words you'll use all unit long",
        body: `• **Confidentiality** — keeping information visible only to people who should see it.\n• **Integrity** — keeping information accurate and unaltered by unauthorized changes.\n• **Availability** — making sure authorized people can reach systems and data when they need them.\n• **Authentication** — proving you are who you claim to be ("Are you really Alex?").\n• **Authorization** — deciding what you're allowed to do after you're authenticated ("Alex can view grades, not change school policy").\n• **MFA (Multi-Factor Authentication)** — proving identity with more than one type of evidence.\n\nWe'll unpack each idea with examples next.`,
        callout: {
          label: "Pro tip",
          text: "A memory trick: Authentication = \"Who are you?\" Authorization = \"What are you allowed to do?\" They sound alike but answer different questions.",
        },
      },
      {
        id: "concept-1",
        kicker: "The triad",
        title: "Confidentiality, Integrity, Availability",
        image: "/images/lessons/cs-2-2.png",
        imageAlt: "Three labeled cards: Confidentiality lock, Integrity checkmark, Availability green uptime light",
        body: `The **CIA Triad** is a simple checklist defenders use everywhere — hospitals, banks, schools, and your own accounts.\n\n• **Confidentiality** — Secrets stay secret. Examples: only you and approved staff see your health forms; only group members see a private shared doc. Failures look like leaked passwords, someone reading your messages, or files shared with "anyone with the link" by mistake.\n• **Integrity** — Information stays trustworthy. Examples: your submitted essay shouldn't be silently edited by a stranger; a gradebook shouldn't change without a teacher. Failures look like tampered files, wrong data, or "I never sent that message."\n• **Availability** — Authorized users can get what they need. Examples: the testing portal works on exam day; backups help recover after a device dies. Failures look like outages, locked accounts with no recovery path, or ransomware-style lockouts (we'll cover malware types next lesson — conceptually).\n\nNotice the tradeoffs: locking everything so tightly that teachers can't open the gradebook hurts **availability**. Leaving everything open hurts **confidentiality**. Good security balances all three.`,
        bullets: [
          "**Confidentiality** → Who can see it?",
          "**Integrity** → Is it still accurate and untampered?",
          "**Availability** → Can authorized people use it when needed?",
        ],
        callout: {
          label: "Common misconception",
          text: "\"More security\" does not always mean \"lock everything forever.\" If nobody who needs the system can use it, Availability has failed — and that is still a cybersecurity problem.",
        },
        checkIn: {
          prompt: "A shared class notes doc is set so \"anyone with the link can edit,\" and a stranger accidentally deletes half the notes. Which CIA goal took the biggest hit?",
          choices: ["Confidentiality", "Integrity", "Availability", "Authentication"],
          correctIndex: 1,
          explanation:
            "Content being changed or deleted without authorization is an Integrity failure — the data is no longer trustworthy or complete.",
        },
      },
      {
        id: "concept-2",
        kicker: "Two different questions",
        title: "Authentication vs. authorization",
        body: `These two words get mixed up constantly. Separate them and half of cybersecurity gets clearer.\n\n**Authentication** answers: *Are you really the person (or account) you claim to be?*\nExamples: typing a password, using a fingerprint, entering a code from an authenticator app, tapping a hardware security key.\n\n**Authorization** answers: *Now that we know who you are, what are you allowed to do?*\nExamples: a student can view their own grades but not edit the master gradebook; a club officer can post on the club page but not delete the whole school site.\n\nOrder matters in practice: systems usually **authenticate** first, then check **authorization** for each action. You can be successfully logged in (authenticated) and still be denied a button (not authorized).\n\nAnalogy: a concert **ticket scan** authenticates that your ticket is real. **Which section you may enter** is authorization — floor vs. balcony.`,
        callout: {
          label: "Watch out",
          text: "Sharing a password doesn't only break authentication for you — it can break authorization models too, because the system thinks the other person *is* you and grants your permissions.",
        },
        checkIn: {
          prompt: "A student logs in successfully but sees \"Access denied\" when trying to edit the master gradebook. What just happened?",
          choices: [
            "Authentication failed",
            "Authentication succeeded; authorization denied that specific action",
            "The CIA Triad does not apply here",
            "The password was too short",
          ],
          correctIndex: 1,
          explanation:
            "Logging in proved identity (authentication). Being blocked from a specific action is authorization doing its job correctly.",
        },
      },
      {
        id: "concept-3",
        kicker: "Proving who you are",
        title: "Passwords, MFA, biometrics, and tokens",
        image: "/images/lessons/cs-2-3.png",
        imageAlt: "Phone MFA prompt, fingerprint sensor, and hardware security key on a desk",
        body: `Defenders talk about **authentication factors** — categories of proof:\n\n• **Something you know** — a password or PIN.\n• **Something you have** — a phone that receives a code, an authenticator app, or a physical security **token**/key.\n• **Something you are** — **biometrics** like fingerprint or face unlock on a device.\n\nA **password** alone is one factor. **MFA (Multi-Factor Authentication)** means using *more than one category* — for example, password + app code. That way, if one factor is stolen, the attacker still doesn't have the others.\n\n**Biometrics** are convenient on devices you control, but they are not magic: they usually unlock a secret stored on the device, and they raise privacy questions if misused. Treat them as one helpful factor, not the whole security story.\n\n**Tokens** (apps or hardware keys) prove "something you have." Conceptually, they make remote takeovers harder because a stolen password alone often isn't enough.\n\nWe'll go deeper on password strength, hashing, and MFA types in a later lesson. Today, just know: stronger authentication protects **confidentiality** and **integrity** by keeping the wrong people out.`,
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
        checkIn: {
          prompt: "A password plus a fingerprint scan combines which two factor categories?",
          choices: [
            "Something you know + something you have",
            "Something you know + something you are",
            "Something you have + something you are",
            "Two copies of the same factor, so it isn't real MFA",
          ],
          correctIndex: 1,
          explanation:
            "A password is something you know; a fingerprint is something you are. Two different categories = genuine multi-factor authentication.",
        },
      },
      {
        id: "worked-example",
        kicker: "Step by step",
        title: "Walking through a real scenario",
        body: `**Scenario:** A student council uses a shared web app to manage the spring dance budget. Sam, the treasurer, logs in with a password and an app-based MFA code. Once inside, Sam can edit the budget spreadsheet, but the "delete entire event" button is grayed out — that permission belongs only to the faculty advisor's role.\n\n**Step 1 — Spot the authentication.** Sam's password + MFA code is the **authentication** step — proving Sam is really Sam.\n\n**Step 2 — Spot the authorization.** Sam being able to edit the budget but *not* delete the whole event is **authorization** — Sam's role grants some permissions, not all of them.\n\n**Step 3 — Connect to CIA.** If Sam's password leaked and MFA weren't enabled, an attacker could authenticate *as* Sam and then inherit Sam's authorization — editing (Integrity risk) the real budget data. Because MFA is on, a stolen password alone likely isn't enough to complete that authentication step.\n\nThis is the pattern you'll see again and again: authentication is the gate, authorization is the map of where you can walk once you're through the gate, and CIA names what's actually at stake.`,
        checkIn: {
          prompt: "In the worked example, why can't Sam click \"delete entire event\" even after logging in successfully?",
          choices: [
            "Because MFA blocks all button clicks",
            "Because authentication failed",
            "Because Sam's role doesn't include that authorization, even though authentication succeeded",
            "Because the CIA Triad prevents all deletions everywhere",
          ],
          correctIndex: 2,
          explanation:
            "Sam is authenticated (logged in) but not authorized for that specific high-impact action — a clean example of the two concepts working independently.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "\"I turned on MFA, so my account can't be hacked\"",
        body: `MFA dramatically raises the bar for attackers — but it is not an invincibility shield. Two real gaps to know about:\n\n• **Prompt bombing** — as in this lesson's story, attackers who already have your password can spam approval requests, hoping annoyance or confusion makes you tap "approve." MFA only works if you also refuse unexpected prompts.\n• **Weaker MFA types can be tricked.** SMS codes, for example, can sometimes be intercepted through separate weaknesses in phone-number-based recovery. (You'll compare MFA types side by side later in this unit.)\n\nThe accurate mental model: MFA turns "one stolen secret gets you in" into "an attacker needs multiple things to go wrong, and needs *you* to cooperate too." It shifts the odds heavily in your favor — it doesn't remove your role as a defender.`,
        callout: {
          label: "Reframe it",
          text: "MFA is a strong seatbelt, not an airbag that deploys automatically. You still have to \"wear it correctly\" by denying prompts you didn't request.",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Try it yourself: authn vs. authz audit",
        body: `Pick one app or account you use regularly — a school portal, a game, a group chat tool, anything real.\n\nWalk through these questions:\n\n1. **How do you authenticate?** Password only? Password + MFA? Biometric unlock on your device?\n2. **What are you authorized to do inside it** — and what's off-limits to you specifically (an admin-only setting, a delete button, another user's private messages)?\n3. **If your password leaked today, what's the worst thing an attacker could do**, given your current authentication setup? Would MFA (if you don't already have it on) change that answer?\n\nIf you find a gap — no MFA on an important account, for instance — that's not a failure, that's exactly the kind of thing this lesson is meant to help you notice and fix.`,
        callout: {
          label: "Keep it real",
          text: "If one of your answers to question 3 makes you a little uneasy, that unease is useful information — not something to brush off.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "After login",
        title: "Going deeper: sessions, failed attempts, and rate limiting",
        image: "/images/lessons/cs-2-4.png",
        imageAlt: "Dashboard showing an active session list and a graph of failed login attempts being rate limited",
        body: `Successful **authentication** doesn't end at the password screen. The system creates a **session** — a temporary, limited proof that you already proved who you are. Sessions let you browse without retyping your password every click, but they also mean a stolen session can bypass a fresh login challenge.\n\nDefender habits around sessions:\n\n• **Log out** on shared computers and revoke unknown sessions in account security settings.\n• **Sessions expire** after inactivity or a time limit — that's intentional, not annoyance.\n• **Failed login attempts are logged** so defenders can spot patterns: one typo vs. hundreds of guesses from the same address.\n\n**Rate limiting** slows repeated failed attempts — for example, a short lockout or increasing delays after several wrong passwords. **Brute force** (conceptually) means trying many guesses to crack a password. Rate limiting doesn't make passwords optional; it buys time for detection and makes mass guessing less practical.\n\nTogether, logging + rate limiting + MFA turn "guess until it works" from a quiet hobby into a noisy, often-blocked event defenders can investigate.`,
        bullets: [
          "A **session** keeps you signed in with limited permissions after authentication succeeds.",
          "**Failed attempts** should be logged — patterns reveal stuffing and brute-force tries.",
          "**Rate limiting** slows repeated failures; pair it with MFA and strong passwords.",
        ],
        callout: {
          label: "Defender view",
          text: "If your email shows many failed logins you didn't cause, report it — that's a signal worth investigating, not background noise.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Comparing MFA factor types",
        body: `Not all "something you have / are / know" options are equally strong. A quick side-by-side helps you prioritize:\n\n• **Authenticator app codes** — strong everyday choice; codes live on your device, not sent over the phone network.\n• **Push approval prompts** — convenient, but vulnerable to prompt bombing if you tap approve out of habit rather than intent.\n• **SMS text codes** — better than a password alone, but weaker than app codes because of separate risks tied to phone numbers and recovery processes.\n• **Hardware security keys** — generally the strongest option for high-value accounts, since they require physically having the key.\n• **Biometrics** — convenient on a device you control, but tied to that device rather than portable proof you can present anywhere.\n\nNone of these are "wrong" — the point is knowing that MFA options exist on a strength spectrum, so you can choose the strongest option a given service offers, especially for accounts that matter most.`,
        checkIn: {
          prompt: "Which MFA type is generally considered the strongest for a high-value account, according to this comparison?",
          choices: ["SMS text codes", "Push approval prompts", "Hardware security keys", "No MFA, just a strong password"],
          correctIndex: 2,
          explanation:
            "Hardware security keys require physical possession and are generally the strongest option compared to SMS or push prompts alone.",
        },
      },
      {
        id: "defender-trap-or-myth",
        kicker: "Don't fall for this",
        title: "The trap: approving prompts just to make them stop",
        body: `Picture Jordan's story from earlier in this lesson. The trap isn't a technical flaw — it's a very human one: repeated notifications are annoying, and tapping "approve" makes the annoyance stop *immediately*, while denying it means... nothing visibly changes right away.\n\nThat mismatch (fast relief vs. no visible reward) is exactly why prompt bombing works on real people, not just careless ones. The trap catches people who are tired, distracted, or just want their phone to be quiet.\n\nThe fix is a pre-made rule, decided *before* you're annoyed at 11 p.m.: any MFA prompt you did not personally trigger gets denied, every single time — no exceptions, no "just this once." Decide the rule now, while you're calm, so you don't have to decide it under pressure later.`,
        callout: {
          label: "Watch out",
          text: "If you're getting repeated unexpected prompts, denying them is step one — changing your password from a trusted device is step two. Don't stop at just making the noise stop.",
        },
      },
      {
        id: "habits",
        kicker: "Put it together",
        title: "How weak auth breaks CIA — and how to prevent it",
        body: `Walk through a simple story:\n\n1. Someone guesses or steals your password (**authentication** fails to keep them out).\n2. The system treats them as you, so they inherit your permissions (**authorization** follows identity).\n3. They read private messages → **confidentiality** broken.\n4. They change a shared project file → **integrity** broken.\n5. They lock you out by changing recovery info → **availability** broken for you.\n\nOne weak login can hit all three CIA goals. That's why authentication is not a boring side topic — it's the front door.\n\nDefender habits (still conceptual, no attack steps):\n• Use unique passwords / passphrases for important accounts.\n• Enable MFA where offered — prioritize app codes or hardware keys over SMS when you have the choice.\n• Don't share credentials, and deny MFA prompts you didn't request.\n• Log out on shared computers.\n• Report suspicious login alerts.`,
        callout: {
          label: "Why it matters",
          text: "When you hear \"account takeover,\" translate it: authentication was bypassed or abused, authorization followed the wrong person, and CIA goals took the hit.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and reflect",
        title: "Quick gut-check before you continue",
        body: `Before the mini case and knowledge check, take a moment with this: think of an account where you would be genuinely upset if someone else logged in as you. Does that account currently have MFA turned on? If not, what is stopping you — is it a real barrier, or just something you haven't gotten around to yet?\n\nNo need to answer out loud. Just notice the gap, if there is one — that noticing is the whole point of this pause.`,
      },
      {
        id: "mini-case",
        kicker: "Case file",
        title: "Mini case: the debate team's borrowed laptop",
        image: "/images/lessons/cs-2-5.png",
        imageAlt: "Shared laptop on a table at a debate tournament with a login screen still showing a previous student's session",
        body: `**The situation:** At a weekend debate tournament, four teammates share one school laptop to research and submit materials. Priya logs in first with her password (no MFA — she never got around to enabling it) to check email. She finishes, closes the lid, and hands the laptop to a teammate for the next round.\n\nHours later, Priya notices an email was sent from her account that she didn't write — a message to a coach with an attached, oddly-named file. Nobody on the team admits to sending it, and Priya can't remember for certain whether she actually logged out or just closed the lid.\n\n**Apply what you've learned:**\n\n• **Authentication gap:** Priya's account only required a password — one factor. Without MFA, anyone who found her session still active (or somehow obtained her password) could act as her.\n• **Session issue:** Closing a laptop lid often does not end an active session the way logging out does. The next person to open it may still be "authenticated" as Priya.\n• **CIA impact:** An email sent without her knowledge is an **Integrity** problem (unauthorized action taken under her identity) and could become a **Confidentiality** problem if the attached file contained anything sensitive.\n\n**Defender fix going forward:** always log out (not just close the lid) on shared devices, and enable MFA on the account so a leftover session or guessed password isn't enough on its own.`,
      },
      {
        id: "lockout-recovery",
        kicker: "Decision checklist",
        title: "What to do after suspicious login alerts",
        body: `Unexpected login alerts are common — some are false alarms, some are early warnings. Work this checklist calmly:

**1. Deny** any MFA prompt you did not personally start.
**2. Open the account** through the official app or site — not through links inside the alert email.
**3. Review recent activity** — new devices, forwarded mail rules, changed recovery phone.
**4. Change the password** from a device you trust if anything looks unfamiliar.
**5. Turn on MFA** if it was off, choosing the strongest option the service offers.
**6. Check linked accounts** — email takeovers often become stepping stones to other services.
**7. Report** to IT or a trusted adult if it is a school account or money is involved.

The trap to avoid: clicking "secure your account" inside the alert itself before you have verified the alert is genuine. That link might be the attack.`,
        checkIn: {
          prompt: "You receive an unexpected MFA push notification you did not request. What is the best first step?",
          choices: [
            "Approve it so the notifications stop",
            "Deny it and then review account activity through the official app or site",
            "Reply to the notification with your password to prove it's you",
            "Ignore it completely without checking anything",
          ],
          correctIndex: 1,
          explanation:
            "Deny unexpected prompts, then investigate through a trusted channel — approving out of annoyance is exactly what prompt bombing exploits.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Before you go",
        title: "Check yourself",
        body: `Quick self-check: can you explain the difference between authentication and authorization using your own example (not the concert ticket one from this lesson)? Can you name at least two MFA factor types and rank them by strength? If yes, you're ready for the knowledge check.`,
        checkIn: {
          prompt: "Why is it risky to leave an account logged in (an active session) on a shared device instead of logging out?",
          choices: [
            "It isn't risky — sessions can't be misused by someone else",
            "The next person to use the device may inherit that session's authentication and authorization without ever entering a password",
            "Sessions automatically log out after any inactivity, so it's never a concern",
            "Only admin accounts have sessions worth worrying about",
          ],
          correctIndex: 1,
          explanation:
            "An active session can let someone else act as the logged-in user without needing the password themselves — exactly what happened in the mini case.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **CIA** = Confidentiality (who can see), Integrity (stays accurate), Availability (usable when needed).\n• **Authentication** proves identity; **authorization** decides what you may do.\n• Factors include **passwords**, **MFA**, **biometrics**, and **tokens** — concepts that strengthen the front door.\n• **Sessions** follow login; **failed attempts** are logged; **rate limiting** slows brute-force guessing.\n• Weak authentication can break all three CIA goals in one incident — and prompt bombing exploits human annoyance, not just technical gaps.\n\nWhen you're ready, take the **Knowledge check**, then reflect on an account where MFA would help you most.`,
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
    { term: "Session", definition: "A temporary authenticated state that lets you use a system without re-proving identity on every action." },
    { term: "Rate limiting", definition: "Slowing or blocking repeated failed login attempts to reduce brute-force and stuffing attacks." },
  ],
  realWorld:
    "A student portal login is **authentication**. Being able to view your transcript but not edit another student's record is **authorization**. Both exist to protect **CIA** for grades and personal data.",
  quiz: [
    {
      id: "q1",
      question: "Which scenario is mainly an Availability problem?",
      choices: [
        "A classmate reads your private essay without permission",
        "The scholarship portal is down on the submission deadline",
        "Someone changes numbers in a shared budget spreadsheet",
        "You enable MFA on your email",
      ],
      correctIndex: 1,
      explanation:
        "Availability is about authorized users being able to reach systems when needed. A down portal on deadline is a classic Availability failure.",
    },
    {
      id: "q2",
      question: "You type your password and a fingerprint to unlock a banking app. What is that an example of?",
      choices: [
        "Authorization deciding what you're allowed to view",
        "Multi-factor authentication (MFA)",
        "A single factor repeated twice for extra length",
        "A backup method used only if the password fails",
      ],
      correctIndex: 1,
      explanation:
        "A password (something you know) plus a biometric (something you are) are two different factor types — that is MFA, not one factor repeated or a backup.",
    },
    {
      id: "q3",
      question: "Which statement correctly contrasts authentication and authorization?",
      choices: [
        "They mean the exact same thing, just used in different contexts",
        "Authentication decides permissions; authorization proves identity",
        "Authorization only applies to hardware tokens, not accounts",
        "Authentication proves identity; authorization decides what you may do",
      ],
      correctIndex: 3,
      explanation:
        "Authentication answers \"who are you?\" Authorization answers \"what are you allowed to do?\"",
    },
    {
      id: "q4",
      question: "A leaked class roster of emails and home addresses mainly damages which CIA goal?",
      choices: [
        "Availability, since the roster file might load slowly",
        "Confidentiality",
        "Integrity, since names could be spelled differently",
        "None — personal data isn't part of CIA",
      ],
      correctIndex: 1,
      explanation:
        "Unauthorized people seeing private information is a Confidentiality failure.",
    },
    {
      id: "q5",
      question: "Why can a stolen password threaten Integrity as well as Confidentiality?",
      choices: [
        "It can't — a stolen password only ever affects Confidentiality",
        "Once authenticated as you, an attacker may change files or settings using your permissions",
        "Integrity only applies to documents printed on paper",
        "Strong passwords automatically prevent any Integrity impact",
      ],
      correctIndex: 1,
      explanation:
        "After authentication succeeds for the wrong person, authorization treats them as you — so they may alter data (Integrity) as well as read it (Confidentiality).",
    },
    {
      id: "q6",
      question: "What is \"prompt bombing\"?",
      choices: [
        "A required step to make MFA stronger on purpose",
        "A method for generating strong, unique passwords",
        "Repeatedly sending MFA approval requests, hoping annoyance leads someone to tap Approve",
        "A type of firewall rule that blocks suspicious logins",
      ],
      correctIndex: 2,
      explanation:
        "Prompt bombing exploits human annoyance rather than a technical flaw — the defense is denying every unexpected prompt, every time.",
    },
    {
      id: "q7",
      question: "Compared to a push approval prompt, why is a hardware security key generally considered stronger MFA?",
      choices: [
        "It removes the need for a password entirely on every system",
        "It is always free and comes built into every device",
        "It never needs to be plugged in or tapped to work",
        "It requires physical possession, so it can't be approved accidentally out of annoyance",
      ],
      correctIndex: 3,
      explanation:
        "Hardware keys require the physical item, which resists both remote guessing and \"tap to make it stop\" mistakes that affect push prompts.",
    },
    {
      id: "q8",
      question: "Why is it more useful to compare security measures than to just list their definitions?",
      choices: [
        "Because real security decisions involve tradeoffs between usability and protection, which requires comparison, not memorization",
        "Because listing definitions is more useful than reasoning about tradeoffs",
        "Because every security measure is equally strong in every situation",
        "Because comparisons are only relevant to professional IT staff",
      ],
      correctIndex: 0,
      explanation:
        "Security literacy means being able to weigh tradeoffs (like usability vs. protection) for a specific situation — not just recall a definition.",
    },
  ],
  reflection: {
    prompt:
      "Pick one account you use. Describe how authentication works there (password, MFA, biometric, etc.) and one permission that should be authorization-limited (something you can do that others shouldn't).",
    placeholder: "Example: My school email uses password + MFA. Only I should be able to reset my other account passwords through it…",
  },
};
