import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson14: AILessonConfig = {
  id: "cs-14",
  title: "14. OSINT, Privacy & Ethics",
  goal: "Evaluate privacy concerns from automated and nonevident data collection; evaluate social, economic, legal, and ethical implications of privacy versus safety; and recommend defensive minimization habits — without offensive OSINT recipes or targeting others.",
  xpReward: 700,
  badge: "Privacy Scout",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/13",
  nextHref: "/learn/cyber/15",
  lessonModule: {
    durationLabel: "~25–30 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-14.png",
        imageAlt: "Student reviewing privacy settings on phone and laptop with public profile muted",
        body: `**OSINT** stands for Open-Source Intelligence — information gathered from *public* sources. Security teams use the idea professionally; scammers and harassers misuse public scraps too. Today you will **evaluate** privacy risks — including automated and nonevident collection — and weigh privacy against safety ethically.\n\nHere's our roadmap:\n\n• What OSINT means in plain English (defensive lens).\n• **Public exposure** — how small posts combine into profiles.\n• **Oversharing** traps (travel, school IDs, routines).\n• **Metadata & automated collection** — nonevident data tucked in files, apps, and trackers.\n• **Privacy vs safety** — social, economic, legal, and ethical tradeoffs.\n• **Ethical "search yourself"** habits — not targeting others.\n• **Privacy settings** that actually matter.\n• What an adversary might infer — and how to respond defensively.\n• **Family and team privacy agreements** — extending good habits beyond just you.\n\nEthical boundary: no stalking playbooks, no targeting classmates. Privacy self-defense and civic judgment only.`,
        callout: {
          label: "Why it matters",
          text: "Attackers often start with what's already public — and platforms collect more than you see. Evaluating exposure and tradeoffs makes phishing, impersonation, and unfair data use harder.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Privacy & OSINT words",
        body: `• **OSINT (defensive)** — using publicly available information to learn something; here, we evaluate our own exposure to protect ourselves — never to stalk others.\n• **Digital footprint** — the trail of data you leave online.\n• **Oversharing** — posting details that create unnecessary risk.\n• **Metadata** — hidden information attached to a file, like the location and time a photo was taken.\n• **Automated / nonevident collection** — data gathered by apps, trackers, sensors, or platforms without an obvious "you typed this" moment (location history, ad IDs, telemetry).\n• **Privacy settings** — controls that limit who sees your posts, stories, and personal fields.\n• **Doxxing** (to avoid/oppose) — maliciously publishing private info to harass — illegal/harmful and not part of this course.\n• **Adversary** — anyone who might misuse your information (scammer, impersonator, harasser).\n• **Minimization** — sharing only what's needed.\n• **Privacy–safety tradeoff** — tension between withholding personal data and enabling legitimate safety, support, or accountability uses.\n\nDefense starts with evaluating what a stranger — or a platform — can already see.`,
        callout: {
          label: "Ethics reminder",
          text: "Search yourself and your own accounts. Do not gather or weaponize information on classmates. Curiosity that targets others without consent crosses lines fast.",
        },
      },
      {
        id: "public-exposure",
        kicker: "The big idea",
        title: "Public crumbs become a map",
        body: `One post rarely dooms you. The risk is **combination**:\n\n• A tagged school + sports schedule + "home alone Friday" joke + birthday in bio + mum's name in a comment.\n\nSeparately, harmless. Together, they help someone craft a convincing phishing email, reset-question guess, or impersonation.\n\nPublic sources aren't only social media: school news pages, club rosters, people-search sites, old forum posts, shared cloud links set to "anyone."\n\nDefenders practice **minimization** and periodic cleanup — not paranoia about every meme.`,
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
        id: "public-exposure-example",
        kicker: "See it in action",
        title: "Building the combination, piece by piece",
        body: `Imagine an outside observer piecing together a profile from purely public posts over a few months, without ever contacting anyone directly:\n\n• A tagged photo at "Lincoln High" reveals the school.\n• A public sports team roster page lists the student's jersey number and practice schedule.\n• A birthday shoutout from a friend, left as a public comment, reveals the exact date.\n• A caption joking "parents are out of town till Sunday, house to myself!" reveals a specific window of reduced adult supervision.\n• A comment thread where a friend calls a parent by name reveals a family name to search further.\n\nNo single post here looks alarming on its own — a school tag, a sports roster, a birthday comment, a joke about parents traveling. But stacked together, an observer now has: school, schedule, birthdate (useful for security-question guessing), a specific vulnerable time window, and a parent's name. That's enough raw material to craft a convincing, personalized scam message or even plan physical mischief — all without ever "hacking" anything, just reading what was already public.`,
        checkIn: {
          prompt: "Several separate public posts — a school tag, a sports schedule, a birthday comment, and a joke about parents being away — combine to create real risk. What does this best illustrate?",
          choices: [
            "Individually harmless details can combine into a useful profile for scams or impersonation",
            "Public sports rosters are always private by default” belongs to a different situation than the one in the question stem",
            "Only one dramatic post can ever create risk” belongs to a different situation than the one in the question stem",
            "Combining information is illegal for anyone to do” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "OSINT-style risk is about combination — separately mundane details can add up to something genuinely useful for a scammer or impersonator.",
        },
      },
      {
        id: "oversharing",
        kicker: "Common traps",
        title: "Oversharing patterns that help adversaries",
        image: "/images/lessons/cs-14-2.png",
        imageAlt: "Social post drafts with location and school ID blurred as oversharing warning",
        body: `High-risk overshares (defensive list):\n\n• Real-time travel/vacation posts while the house is empty.\n• Photos of **IDs**, tickets with barcodes, or badges.\n• Passwords, MFA codes, or "my PIN is…" jokes.\n• Detailed daily routines ("I leave at 7:10 every day via the side gate").\n• Answers to common security questions (first pet, mother's maiden name) posted as fun quizzes.\n\nNone of this requires fancy tools for a scammer — just reading. Your defense is boring and effective: pause before posting, blur sensitive details, save travel posts for after you're home.`,
        callout: {
          label: "Common misconception",
          text: "\"I only have 200 followers, so it doesn't matter.\" Screenshots travel. Public or large-friend-group posts can reach people you never met.",
        },
      },
      {
        id: "oversharing-example",
        kicker: "See it in action",
        title: "The \"fun quiz\" trap",
        body: `A popular social media trend asks people to fill out a "get to know me" quiz and post it publicly: favorite color, first pet's name, mother's maiden name, city you were born in, first car.\n\nIt feels harmless and fun — but notice how many of those exact questions match the **security questions** used by banks, email providers, and other accounts to verify identity or reset a password ("What was your first pet's name?").\n\nA person filling out this quiz publicly hasn't been hacked, tricked, or scammed in any traditional sense — they simply handed out answers to their own account-recovery questions as a fun social post, potentially making it easier for someone to impersonate them to a bank or account-recovery system down the line.\n\nThe defensive fix isn't to never have fun online — it's to notice when a "harmless" trend is quietly asking for the same information that guards your real accounts, and either skip those specific questions or answer them differently for security purposes than you would for a public quiz.`,
        checkIn: {
          prompt: "A viral \"get to know me\" quiz asks for your first pet's name and mother's maiden name, which you post publicly. Why is this risky?",
          choices: [
            "Some learners answer “It isn't risky — the questions are unrelated to any real security use”, yet that does not match the precise idea from the lesson",
            "It can seem like only banks are affected, never email or other accounts, but that reading skips the distinction this question is testing",
            "Those exact questions are commonly used as account security/recovery questions, so posting answers publicly can weaken your real account protections",
            "It can seem like social media quizzes are always private by default, but that reading skips the distinction this question is testing",
          ],
          correctIndex: 2,
          explanation:
            "Many social quizzes mirror common account-recovery security questions. Publicly posting those answers can make impersonation or account recovery easier for an attacker.",
        },
      },
      {
        id: "metadata",
        kicker: "Hidden details",
        title: "Metadata & automated collection: nonevident data",
        body: `Beyond what's visible in a photo or post, files and apps often carry **nonevident** data — information collected or attached without a clear "I meant to share that" moment.\n\n**Metadata in files** can include:\n• Exact **date and time** a photo was taken.\n• **GPS location** if location services were on.\n• Device model or camera info.\n\n**Automated collection** goes further: apps and sites may gather location history, advertising IDs, contact graphs, browsing telemetry, or "improve the product" analytics that never appear in a caption. You may have clicked "Accept" once months ago — or a default was on — and the stream continues quietly.\n\n**Evaluate the privacy concern:** nonevident data is hard to audit because you don't see it leaving. Platforms may strip some photo metadata on upload, but not always, and raw email attachments often keep everything. Connected apps can retain access long after you forgot them.\n\nDefender habits: review location defaults, revoke unused apps, prefer export/scrub before emailing raw photos, and treat "free" services as potentially data-hungry — then decide what trade you're making.`,
        bullets: [
          "Photos can carry hidden **location and time** data, not just what's visible.",
          "Apps/platforms may collect telemetry and identifiers automatically — evaluate what you consented to.",
          "Be extra mindful when sharing raw files or granting broad app permissions.",
        ],
        callout: {
          label: "Why it matters",
          text: "A photo captioned \"having fun downtown!\" — or a fitness app syncing in the background — can reveal precise place/time patterns even when you never typed an address.",
        },
      },
      {
        id: "metadata-example",
        kicker: "See it in action",
        title: "When a caption says less than the file itself",
        body: `A student takes a photo at a friend's house and posts it with the caption "movie night!" — vague and seemingly harmless on its own.\n\nIf they had instead emailed that same original photo file directly to someone (bypassing an app's normal upload/sharing flow that might strip metadata), the file itself could still carry embedded **GPS coordinates** and an exact **timestamp** — plus any cloud photo app may have already stored location history in the background. Evaluate both layers: visible caption vs nonevident file/app data.\n\nThis is why "the caption seems fine" isn't the whole picture. The file and the platform can carry more specific information than what a person intended to share.\n\nPractical takeaway: **what's visible, what's embedded, and what's collected automatically can be three different things** — be more cautious with raw file sharing and review location/telemetry defaults, not just captions.`,
        checkIn: {
          prompt: "A photo captioned vaguely as \"movie night!\" is emailed as a raw file rather than posted through a social app. What extra risk does this create?",
          choices: [
            "A common mix-up is to treat none — captions are the only thing that matters for privacy as enough, which confuses a nearby idea with the right one",
            "The raw file may still carry embedded metadata like GPS location and timestamp, even though the caption reveals nothing specific — a nonevident privacy risk",
            "A common mix-up is to treat email attachments always strip all metadata automatically as enough, which confuses a nearby idea with the right one",
            "A common mix-up is to treat metadata only exists in videos, never in photos as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
          ],
          correctIndex: 1,
          explanation:
            "Raw photo files can carry hidden metadata (like GPS coordinates and timestamps) that a vague caption doesn't reveal — evaluate nonevident data, not just captions.",
        },
      },
      {
        id: "privacy-vs-safety",
        kicker: "Tradeoffs",
        title: "Privacy vs safety: evaluate the implications",
        body: `Privacy is not automatically the opposite of safety — but they sometimes tension. CSTA asks you to **evaluate social, economic, legal, and ethical implications** when communities choose more monitoring or more privacy.\n\n**Work through dimensions (no single "right" answer for every case):**\n\n• **Social:** Location sharing with family can help if someone is late and unreachable; always-on sharing can enable stalking or peer pressure. School hallway cameras may deter vandalism but chill free association.\n• **Economic:** "Free" apps often monetize behavioral data. Paying for a service, using school-managed tools, or declining optional analytics each has different costs and power imbalances.\n• **Legal:** Recording/sharing others without consent, doxxing, and unauthorized access can violate laws and school policy. Organizations also face rules about retaining student data.\n• **Ethical:** Who benefits from the data? Who is most harmed if it leaks? Is consent meaningful if the alternative is "can't join the team chat"?\n\n**Decision habit:** name the goal (safety vs convenience vs marketing), name who is affected, compare less-invasive alternatives (check-in texts vs live GPS; adults on-call vs public live locations), and document why you chose the balance. Defensive OSINT/privacy work reduces *unnecessary* exposure; it does not forbid asking for help or reporting real threats to trusted adults.`,
        bullets: [
          "Evaluate privacy vs safety across social, economic, legal, and ethical lenses.",
          "Prefer less-invasive alternatives that still meet a real safety need.",
          "Consent and power matter — \"free\" and \"required for the club\" change the ethics.",
        ],
        callout: {
          label: "Ethics",
          text: "Using \"safety\" as an excuse to stalk classmates, scrape private profiles, or dox someone is never ethical — report genuine threats through proper channels instead.",
        },
      },
      {
        id: "privacy-vs-safety-example",
        kicker: "See it in action",
        title: "Live location for a late bus — four lenses",
        body: `A club trip home runs late. Officers debate turning on **live location sharing** for the whole group chat until everyone is home.\n\n• **Social:** Parents feel safer; some students feel watched or pressured if the share stays on after arrival.\n• **Economic:** The free messaging app may also log location for ads — a hidden cost of "convenient safety."\n• **Legal/policy:** School rules may limit posting minors' live locations publicly; a closed officer+advisor chat is different from a public story.\n• **Ethical:** A time-boxed share with advisor included can meet the safety goal; indefinite public live location for "vibes" mostly creates OSINT risk without proportional benefit.\n\n**Recommended balance:** short-lived share to a small trusted group, then off — or a check-in text when each person arrives — instead of always-on public tracking. You evaluated the tradeoff; you didn't invent a stalking guide.`,
        checkIn: {
          prompt: "Officers want live location \"for safety\" on a late trip. Which evaluation best matches this lesson?",
          choices: [
            "A common mix-up is to treat safety concerns mean privacy settings no longer matter as enough, which confuses a nearby idea with the right one",
            "Compare less-invasive options (time-boxed share to a small trusted group or arrival check-ins), and weigh social/economic/legal/ethical impacts before choosing",
            "The ethical move is to scrape classmates' home addresses from public posts \"just in case\" — familiar wording, wrong fit for what the prompt is actually asking",
            "It can seem like always-on public live location is always required if anyone mentions safety, but that reading skips the distinction this question is testing",
          ],
          correctIndex: 1,
          explanation:
            "Privacy vs safety requires evaluating implications and preferring proportionate, less-invasive controls — not unlimited monitoring or offensive OSINT.",
        },
      },
      {
        id: "google-yourself",
        kicker: "Ethical self-check",
        title: "Search yourself — carefully and ethically",
        body: `A healthy habit: periodically **search your own name** and usernames in a regular search engine while signed out (or use a private window) to **evaluate** what's public.\n\nDo:\n\n• Check your own profiles as a stranger would.\n• Note old accounts you forgot.\n• Remove or privacy-lock what shouldn't be public.\n• Ask a trusted adult for help if something harmful about you appears.\n\nDon't:\n\n• Run targeting campaigns on other students.\n• Use specialized people-search attack guides or stalking playbooks.\n• Try to access private accounts or non-public data.\n\nEthical self-OSINT is like checking your reflection. Targeting others is not — and it can cross legal and school-policy lines fast.`,
        callout: {
          label: "Pro tip",
          text: "Make a calendar reminder once a semester: review public profiles, tagged photos, and connected apps.",
        },
      },
      {
        id: "google-yourself-example",
        kicker: "See it in action",
        title: "A semester self-check, step by step",
        body: `Following the calendar reminder, a student runs their semester self-check:\n\n1. **Search their own name** in a private/incognito browser window, noting what appears on the first couple of pages of results.\n2. **Search old usernames** they remember using on forums or games years ago — sometimes long-forgotten accounts still show up.\n3. **Review their main social profiles** as if they were a stranger — what's visible without being logged in or "friends"?\n4. **Check tagged photos** for anything they'd rather not have publicly associated with them anymore.\n5. **Review connected third-party apps** on major accounts, revoking anything unused or unrecognized.\n\nThey find an old gaming forum account from years ago, still showing their full name in a public profile field. They log in, update the privacy setting, and move on. This whole process took about fifteen minutes and directly reduced their public footprint — exactly the kind of unglamorous, repeatable habit that actually works over time.`,
        checkIn: {
          prompt: "During a semester self-check, a student finds an old forum account from years ago still publicly showing their full name. What is the appropriate response?",
          choices: [
            "Log in and update the privacy setting or remove the exposed detail, since it's still publicly visible today",
            "Report the forum to authorities for a privacy violation” belongs to a different situation than the one in the question stem",
            "Ignore it since the account is old and probably forgotten by everyone” belongs to a different situation than the one in the question stem",
            "Create a new fake profile to replace it without addressing the old one” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Old, forgotten accounts still contribute to your current digital footprint. A periodic self-check catches exactly this kind of lingering public exposure.",
        },
      },
      {
        id: "privacy-settings",
        kicker: "Tighten the knobs",
        title: "Privacy settings that actually move the needle",
        image: "/images/lessons/cs-14-3.png",
        imageAlt: "Privacy settings screens set to friends-only with a notebook checklist",
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
        id: "privacy-settings-example",
        kicker: "See it in action",
        title: "Auditing one account's settings in five minutes",
        body: `A student decides to actually run through their main social account's settings instead of assuming defaults are fine:\n\n• **Post audience**: they discover posts default to "Public" rather than "Friends" — they switch the default going forward and adjust visibility on recent posts.\n• **Tagging**: they find anyone can tag them without approval — they turn on tag review so they can decide before a tag appears on their profile.\n• **Location**: precise location sharing was on for every post — they turn it off by default, enabling it manually only when they actually want to share where they are.\n• **Connected apps**: they find three old game apps still connected with permissions they no longer use — they revoke all three.\n• **Recovery info**: they confirm the recovery email/phone on file is one they actually still control, with MFA enabled on it.\n\nEach change took under a minute. None of it required giving up using the platform — it just meant the platform's *defaults*, chosen for broad engagement rather than individual privacy, no longer applied unexamined.`,
        checkIn: {
          prompt: "A student reviews their social account and finds posts default to \"Public,\" tagging is unrestricted, and old unused apps are still connected. What's the best response?",
          choices: [
            "Tighten audience defaults, enable tag review, and revoke unused connected apps",
            "Delete the account entirely as the only fix” belongs to a different situation than the one in the question stem",
            "Only fix the tagging setting since the others don't matter” belongs to a different situation than the one in the question stem",
            "Leave everything as-is since changing defaults might break the app",
          ],
          correctIndex: 0,
          explanation:
            "Reviewing and tightening audience defaults, tag permissions, and connected apps meaningfully reduces exposure without requiring you to stop using the platform.",
        },
      },
      {
        id: "adversary-view",
        kicker: "Think like a defender",
        title: "What might someone learn — and what do you do?",
        body: `From public posts, a scammer might learn: your school, clubs, friends' names, slang you use, upcoming events, and which brands you trust. That fuels **spear phishing** (customized bait) and impersonation ("I'm locked out, send the code").\n\nDefensive responses:\n\n• Shrink public details that enable impersonation.\n• Agree on family/club verification phrases for urgent money/account requests.\n• Treat unexpected "friend in trouble" messages with out-of-band checks.\n• Report harassment/doxxing threats to adults and platforms.\n\nYou're not responsible for someone else's malice — but you can refuse to make their job easy.`,
        callout: {
          label: "Myth check",
          text: "Privacy is not secrecy for criminals. It's boundary-setting so your life isn't an open credential-reset kit.",
        },
      },
      {
        id: "adversary-view-example",
        kicker: "See it in action",
        title: "Spear phishing built entirely from public posts",
        body: `A scammer browsing a student's mostly-public profile learns: they're on the varsity soccer team (from tagged photos), their coach's name (mentioned in a caption thanking them), and that the team has an away game this coming Friday (from a public schedule post).\n\nThe scammer sends a text pretending to be the coach: "Hey, quick change — bus leaves 20 min early Friday, can you Venmo me $15 for the toll fee before we leave since I'm collecting from a few players?" It references real, specific, publicly-known details — the team, the away game, a plausible logistics request — making it feel far more convincing than a generic scam.\n\nA defensive response: **verify out-of-band** — call the coach directly using a number already saved from before, or ask a teammate in person, rather than replying to the unexpected text. The specific, accurate-sounding details in a message are not proof of authenticity; they're often just proof the sender read your public posts.`,
        checkIn: {
          prompt: "A text claiming to be from your coach asks for money urgently, referencing real details (a real away game, a real logistics detail) that could have come from your public posts. What's the safest response?",
          choices: [
            "Verify out-of-band — call using a known number or ask in person — rather than trusting the details alone",
            "Assume accurate details always prove a message is genuine” belongs to a different situation than the one in the question stem",
            "Send the money immediately since the details are accurate and specific” belongs to a different situation than the one in the question stem",
            "Reply with your account password to confirm your identity to the coach” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Accurate-sounding details can simply come from your own public posts. Out-of-band verification (a known phone number, in person) is what actually confirms authenticity.",
        },
      },
      {
        id: "family-agreements",
        kicker: "Extend the habit",
        title: "Family and team privacy agreements",
        body: `Individual privacy habits go further when the people around you share them. Consider setting up simple, explicit agreements:\n\n• **A verification phrase** for family: if someone claiming to be a relative asks for money or account help unexpectedly, everyone knows to ask for the agreed phrase (or verify by calling a known number) before doing anything.\n• **A team/club posting policy**: no real-time location tags during travel, no photos of ID badges or tickets, and a designated person who reviews public posts before they go up during sensitive events.\n• **A shared understanding about "urgent" requests**: agree in advance that legitimate urgent requests can wait the extra two minutes it takes to verify through a second channel — genuine emergencies rarely require skipping that step.\n\nThese agreements work because they remove the pressure of deciding "is this really them?" in the moment — the plan was already made calmly, in advance, before any scammer tried to exploit urgency.`,
        bullets: [
          "Agree on a family verification phrase before it's needed.",
          "Set simple team/club posting policies for sensitive events (travel, competitions).",
          "Decide in advance that urgent requests still get verified — no exceptions made in the heat of the moment.",
        ],
        callout: {
          label: "Try this week",
          text: "Suggest one privacy agreement to your family or a club you're part of — even something as simple as \"no real-time travel posts until we're home.\"",
        },
      },
      {
        id: "myths",
        kicker: "Reality check",
        title: "Privacy myths worth retiring",
        body: `A few beliefs sound reasonable but lead people astray:\n\n• **"I have nothing to hide, so privacy doesn't matter to me."** Privacy isn't about hiding wrongdoing — it's about controlling who can use your information against you.\n• **"Deleting a post removes it everywhere."** Screenshots, caches, and reposts can outlive the original — think before posting, not just before deleting.\n• **"Only celebrities and public figures need to worry about OSINT."** Everyday scams and impersonation attempts increasingly target regular people using exactly this kind of public-information gathering.\n• **"Privacy settings are permanent once I set them."** Platforms update their defaults and features over time — periodic review matters, not a one-time setup.`,
        bullets: [
          "Privacy is boundary-setting, not secrecy for wrongdoing.",
          "Deleted posts can still exist as screenshots or reposts elsewhere.",
          "Regular people, not just public figures, are realistic OSINT-style targets.",
        ],
        callout: {
          label: "Common misconception",
          text: "\"Privacy settings I set once will always protect me.\" Platforms change features and defaults — revisit settings periodically, especially after big app updates.",
        },
      },
      {
        id: "checklist",
        kicker: "Put it together",
        title: "A defender's privacy habits checklist",
        body: `Bring the whole lesson together into habits you can actually use:\n\n**1. Think in combinations** — evaluate what a stranger could piece together from your last dozen posts.\n**2. Avoid the highest-risk overshares** — real-time travel, ID photos, security-question answers, detailed routines.\n**3. Evaluate nonevident data** — metadata, location history, and automated app collection.\n**4. Weigh privacy vs safety** across social, economic, legal, and ethical lenses; prefer proportionate options.\n**5. Search yourself ethically**, every semester, and clean up what you find.\n**6. Tighten privacy settings** and protect recovery channels with MFA.\n**7. Verify out-of-band** before acting on urgent requests, even ones with accurate-sounding details.\n**8. Set family/team agreements** in advance so nobody has to decide alone under pressure.\n\nThat's a working privacy mindset — evaluative and ethical, not paranoid.`,
        callout: {
          label: "Try this week",
          text: "Pick one habit from this list you haven't done yet, and do it today — even a fifteen-minute self-search counts.",
        },
      },
      {
        id: "posting-decisions",
        kicker: "Decision checklist",
        title: "Before you post: a five-second privacy check",
        body: `Run this before posting photos, schedules, or achievements:

**1. Audience** — Public, friends-only, or custom list?
**2. Location** — Visible now or delayed?
**3. Identifiers** — badges, IDs, room numbers, license plates in frame?
**4. Metadata** — Will you email the raw file or export a scrubbed copy?
**5. Duration** — Should this story expire, or live forever?

**Comparison — post types:**
• **Victory photo with badge + school name** — high OSINT value for targeted scams.
• **Delayed trip recap** — lower real-time risk.
• **Private doc link** — confidentiality depends on sharing settings, not the caption.

Five seconds beats months of cleanup after a spear-phishing email that knows your exact schedule.`,
      },
      {
        id: "metadata-walkthrough",
        kicker: "Scenario walkthrough",
        title: "Cleaning metadata before sharing event photos",
        body: `**Scenario:** The club president emails raw photos from a sponsor event to an external newsletter. Embedded metadata still includes GPS coordinates of the school media room and camera serial info.

**Walkthrough:**
1. **Inspect** — preview metadata in OS or export tool before sending.
2. **Strip or export** — use "export for web" or remove location/device fields.
3. **Caption carefully** — text can leak what metadata no longer does.
4. **Recipient check** — confirm newsletter inbox is correct; BCC large lists when appropriate.
5. **Retention** — agree how long external partners keep files.

**What to do next if metadata already sent:** notify recipient, request deletion of originals, rotate any sensitive locations if safety concern exists, update club checklist.

Privacy is content *and* container — captions are visible; metadata is the silent passenger.`,
      },
      {
        id: "family-agreements-extra",
        kicker: "What to do next",
        title: "Family and team agreements that stick",
        body: `Agreements fail when they are vague. Try concrete rules:

• **No real-time travel posts** until the group is home.
• **Ask before tagging** minors or teammates in public posts.
• **Club account** — two officers plus advisor know recovery codes; no DMs asking for codes.
• **Photo review** — officer scans for badges/IDs before club pages publish.

**Comparison — vague vs concrete:**
• Vague: "Be careful online."
• Concrete: "Event photos post Sunday; location tags off; IDs cropped."

Write one rule your club or family can actually enforce this month — not ten rules nobody remembers.`,
        callout: {
          label: "Try this week",
          text: "Search your name once ethically; pick one setting or habit to change based on what you find.",
        },
      },
      {
        id: "privacy-myths-extra",
        kicker: "Myth check",
        title: "Privacy myths that leave real crumbs",
        body: `• **"Only famous people get OSINT'd."** Scammers build targeted lures from ordinary public posts.
• **"Private account = fully private."** Screenshots, reshares, and compromised friend accounts still leak.
• **"Deleting a post deletes it everywhere."** Copies, caches, and downloads may remain.
• **"I'll worry about privacy in college."** College apps, jobs, and club officer roles come before graduation.

Defender privacy is reducing useful crumbs and verifying urgent requests — not living offline.`,
        bullets: [
          "Assume public means public forever.",
          "Metadata travels with files unless you remove it.",
          "Verify odd requests out-of-band.",
        ],
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Evaluate** public-info and **nonevident/automated** collection risks for self-defense — never as a stalking toolkit.\n• Small posts **combine** into exposure; **metadata** and background telemetry can reveal more than a caption.\n• Weigh **privacy vs safety** across social, economic, legal, and ethical lenses; prefer proportionate alternatives.\n• **Search yourself** ethically; don't target others.\n• Tighten **privacy settings** and recovery paths; verify urgent requests out-of-band.\n• **Family and team agreements** extend good habits beyond just you.\n\nTake the **Knowledge check**, then reflect with a justified privacy-vs-safety recommendation.`,
      },
    ],
  },
  bigIdeas: [
    "Public posts, **metadata**, and **automated/nonevident collection** create exposure defenders must **evaluate** — practice minimization without offensive OSINT.",
    "Ethical self-checks beat invasive research on other people; **privacy vs safety** choices carry social, economic, legal, and ethical implications.",
    "Tighter **privacy settings**, careful sharing, out-of-band verification, and **family/team agreements** reduce spear phishing and impersonation risk.",
  ],
  keyTerms: [
    { term: "OSINT (defensive)", definition: "Using publicly available information to learn something; in this lesson, to evaluate and reduce your own exposure — never to target others." },
    { term: "Digital footprint", definition: "The trail of data you leave online through posts, profiles, and shared links." },
    { term: "Oversharing", definition: "Publishing details that create unnecessary personal or security risk." },
    { term: "Metadata", definition: "Hidden information attached to a file, such as the location and time a photo was taken." },
    { term: "Automated / nonevident collection", definition: "Data gathered by apps, trackers, or platforms without an obvious intentional share (location history, telemetry, ad IDs)." },
    { term: "Privacy settings", definition: "Platform controls that limit who can see your information and activity." },
    { term: "Minimization", definition: "Sharing only what is needed for the purpose at hand." },
    { term: "Privacy–safety tradeoff", definition: "Tension between withholding personal data and enabling legitimate safety, support, or accountability uses." },
    { term: "Spear phishing", definition: "Targeted phishing that uses personal details to seem more convincing." },
    { term: "Impersonation", definition: "Pretending to be you or someone you trust to trick others." },
  ],
  realWorld:
    "A student posts a selfie with a school ID clearly readable and a caption about being away all weekend. A scammer later messages Grandma posing as the student — using school details from the post. Tighter sharing and a family verification habit are the defensive fix.",
  quiz: [
    {
      id: "q1",
      question: "In this course, what is the appropriate use of OSINT concepts?",
      choices: [
            "Bypassing privacy settings on other people's accounts” belongs to a different situation than the one in the question stem",
            "Building attack recipes to dig up private data on classmates” belongs to a different situation than the one in the question stem",
            "Evaluate your own public and nonevident exposure so you can protect privacy ethically",
            "Publishing other students' addresses” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "We use OSINT as a defensive evaluation lens for your own exposure — not as an offensive toolkit against others.",
    },
    {
      id: "q2",
      question: "Why can several \"harmless\" posts still create risk that defenders must evaluate?",
      choices: [
            "Because only celebrities ever build a meaningful digital footprint” belongs to a different situation than the one in the question stem",
            "Because details combine into a richer picture useful for scams or impersonation — combination risk",
            "Because search engines ignore public posts entirely” belongs to a different situation than the one in the question stem",
            "Because posts automatically encrypt themselves once shared” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "Combination risk: school + schedule + personal answers + contacts can fuel targeted social engineering.",
    },
    {
      id: "q3",
      question: "Which is an ethical self-check habit?",
      choices: [
            "Searching your own public profiles and cleaning up risky exposure after evaluating what a stranger could use",
            "Running intrusive lookups to map a classmate's private life” belongs to a different situation than the one in the question stem",
            "“Sharing MFA codes to \"verify friendship\"” describes a different situation than the one in the question stem",
            "“Posting your government ID for aesthetic likes” describes a different situation than the one in the question stem",
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
        "Disabling MFA so recovery is easier for strangers",
        "Using the same password everywhere so you remember it",
        "Tightening audience defaults and reviewing connected apps",
      ],
      correctIndex: 3,
      explanation:
        "Audience controls and revoking unused apps shrink what strangers and third parties can access.",
    },
    {
      id: "q5",
      question: "A scammer uses details from your public posts to sound like a friend in trouble. What's a strong defensive move?",
      choices: [
            "Verify the request out-of-band using a known contact method and reduce public details that enable impersonation",
            "“Reply with your passwords so they can \"check\"” describes a different situation than the one in the question stem",
            "If the goal were something else, “Send money immediately to be helpful” might work; for this check, it does not",
            "“Ignore privacy settings because scams are rare” describes a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "Out-of-band verification stops impersonation; minimizing public personal details makes bait harder to craft.",
    },
    {
      id: "q6",
      question: "Which best describes a privacy concern from automated or nonevident data collection?",
      choices: [
            "A common mix-up is to treat the photo will automatically strip all metadata during email as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat only captions matter; apps never collect background data as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "Location history, telemetry, ad IDs, or photo GPS metadata can reveal patterns without an intentional public post — so defenders evaluate defaults, permissions, and raw-file sharing",
            "A common mix-up is to treat metadata only applies to video files, never photos as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
          ],
      correctIndex: 2,
      explanation:
        "Nonevident/automated collection and file metadata create privacy risk beyond what you deliberately type — evaluate settings and sharing channels.",
    },
    {
      id: "q7",
      question: "A viral social media quiz asks for your first pet's name and mother's maiden name. Why is this a privacy concern?",
      choices: [
            "Those are common account-recovery security questions, so posting answers publicly can weaken real account protections",
            "Quizzes are always private by default, so nobody outside your friends sees it” belongs to a different situation than the one in the question stem",
            "It isn't a concern; the questions are unrelated to real accounts” belongs to a different situation than the one in the question stem",
            "Only your bank could ever be affected by this. That option sounds confident, but it leaves out the deciding constraint",
          ],
      correctIndex: 0,
      explanation:
        "Many \"fun quiz\" questions mirror real security/recovery questions — publicly answering them can help an attacker impersonate you to a real account later.",
    },
    {
      id: "q8",
      question: "Club officers want always-on public live location \"for safety\" during travel. Which evaluation is strongest?",
      choices: [
            "Some learners answer “The ethical response is to collect home addresses from classmates' public posts without asking”, yet that does not match the precise idea from the lesson",
            "It can seem like safety always overrides privacy, so public live location should stay on forever, but that reading skips the distinction this question is testing",
            "It can seem like privacy settings are irrelevant whenever someone says the word safety, but that reading skips the distinction this question is testing",
            "Compare less-invasive options and weigh social/economic/legal/ethical impacts — e.g., time-boxed sharing to a small trusted group may meet the safety goal with less exposure",
          ],
      correctIndex: 3,
      explanation:
        "Privacy vs safety requires evaluating implications and proportionate alternatives — not unlimited monitoring or offensive data gathering.",
    },
    {
      id: "q9",
      question: "What is the main benefit of a family verification phrase or agreement set up in advance?",
      choices: [
            "“It removes the need to ever verify anything again” describes a different situation than the one in the question stem",
            "It removes the pressure of deciding \"is this really them?\" in the moment, since the plan was made calmly beforehand",
            "“It guarantees scammers will never target the family” describes a different situation than the one in the question stem",
            "“It replaces the need for privacy settings entirely” describes a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "Pre-agreed verification habits work because they're decided calmly in advance, removing the pressure and urgency a scammer relies on in the moment.",
    },
  ],
  reflection: {
    prompt:
      "Describe one public detail AND one nonevident/automated data source (metadata, location history, connected app) that could expose you. Then evaluate a privacy-vs-safety choice (e.g., live location for a late trip): recommend one setting or habit change, and justify it with at least two lenses (social, economic, legal, or ethical).",
    placeholder: "Example: Public club role + phone location history… For late trips I'd use a 1-hour share to advisor/parents only because socially it meets safety needs without peer pressure, and ethically it avoids public OSINT exposure…",
  },
};
