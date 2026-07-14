import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson12: AILessonConfig = {
  id: "dl-12",
  title: "12. Protect Your Privacy & Data",
  goal: "Understand how your personal data is collected and used online, and take control with privacy settings, smart app permissions, and more careful sharing — including what colleges, scholarships, and employers can see.",
  xpReward: 600,
  badge: "Privacy Protector",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/11",
  nextHref: "/learn/digital/13",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Every app you open, site you visit, and post you make leaves a trail of **data** about you. Companies collect that trail constantly — and most people have no idea how much they're giving away. Today you'll take back some control.\n\nHere's our roadmap:\n\n• **What personal data is** and why it's valuable.\n• **How apps and sites collect it** — cookies, trackers, and permissions.\n• **"If it's free, you might be the product"** — how your data pays the bill.\n• **Privacy settings and app permissions** — granting only what's needed.\n• **Oversharing risks** and your basic data rights.\n• **Senior stretch** — what colleges and employers see, and protecting application data.\n\nThis isn't about being scared of technology. It's about being the person who *decides* what they share, instead of handing everything over by accident. That control matters more every year — for your safety, your reputation, and your future.`,
        image: "/images/lessons/dl-12.png",
        imageAlt: "A phone showing app permission requests for location, contacts, and microphone, with toggles being switched off",
        callout: {
          label: "Why it matters",
          text: "Your data can shape what ads you see, what prices you're offered, and even what opportunities reach you. Once you share something, it's very hard to take back — so choosing wisely up front is real power.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Privacy words, made simple",
        body: `Privacy talk is full of techy words. Here's what they actually mean, in plain language:\n\n• **Data** = any information about you that gets recorded — your name, your location, what you searched, what you watched.\n• **Personal data (PII)** = data that can point to *you specifically*. (PII = "Personally Identifiable Information.")\n• **Cookie** = a tiny file a website saves on your device to remember you. Some help (staying logged in); some track you.\n• **Tracker** = hidden code that quietly reports what you do back to companies.\n• **Permission** = when an app asks to use part of your phone — your camera, mic, location, contacts, or photos.\n• **Privacy settings** = the switches that let *you* decide who sees your stuff and what apps can access.\n• **Data breach** = when a company gets hacked and the data it stored about people gets stolen.\n\nThe theme for today: you leave a **trail of data** everywhere online, and a lot of it is collected automatically. The goal isn't to vanish — it's to *decide* what you give away instead of handing it over by accident.`,
        callout: {
          label: "Pro tip",
          text: "Privacy isn't all-or-nothing. You don't have to delete every app and live in a cave. Even small choices — denying one permission, setting a profile to private — add up to real protection.",
        },
      },
      {
        id: "why-it-matters",
        kicker: "Real stakes",
        title: "Why data profiles quietly affect your real life",
        body: `Your data isn't just sitting in a database doing nothing. Companies use the profile they build to make real decisions that touch you:\n\n• **Prices can vary.** Some sites test different prices or offers on different people based on browsing history and device type — what you see isn't always what everyone sees.\n• **Ads follow you around.** Search for one thing once, and it can chase you across apps and sites for days — a visible sign of how thoroughly your activity gets tracked.\n• **Insurance and lending increasingly use data-driven scoring.** Some companies experiment with using online behavior data alongside traditional records, which is part of why regulators created rights like the ones you'll learn about later in this lesson.\n• **Old posts and data can resurface unexpectedly**, including during college or job screening, long after you forgot you shared them.\n\nNone of this means panic — it means the small privacy habits in this lesson aren't just abstract "good practice." They shape real outcomes.`,
        callout: {
          label: "Why it matters",
          text: "You don't need to become invisible online. You need to make sharing a *choice* instead of a default — because your data profile follows you into decisions you'll never see happening in the background.",
        },
      },
      {
        id: "what-is-data",
        kicker: "The big idea",
        title: "Personal data is information that identifies you",
        body: `**Personal data** — often called **PII** (Personally Identifiable Information) — is any information that can identify *you*. It's more than just your name:\n\n• Your **name, birthday, and address**\n• Your **location** (where you are right now and where you usually go)\n• Your **photos and contacts**\n• Your **browsing and search habits**, what you watch, what you buy, who you talk to\n• For older teens: **SSN fragments, financial aid info, transcripts**, and anything you type into college or scholarship forms\n\nIndividually, some of these seem harmless. But companies combine them to build a detailed **profile** of you — your interests, routines, mood, and what might make you click or buy.\n\nThink of your data like **ingredients**. One ingredient isn't much, but collect enough — your searches, your location history, your likes — and a company can "cook up" a surprisingly complete picture of who you are, often more than your friends know.`,
        callout: {
          label: "Common misconception",
          text: "\"I have nothing to hide, so privacy doesn't matter.\" Privacy isn't about hiding bad things — it's about *control*. You close the bathroom door not because you're doing something wrong, but because some things are simply yours to decide who sees.",
        },
      },
      {
        id: "data-practice",
        kicker: "Apply it",
        title: "Sort the data: harmless-seeming vs. sensitive",
        body: `Not all personal data carries the same weight. Let's sort a few examples by how sensitive they are:\n\n• **Lower sensitivity (alone):** your favorite color, a public username, a general interest like "likes basketball."\n• **Medium sensitivity:** your full name plus school, your daily schedule, your location history over the past month.\n• **High sensitivity:** your Social Security number, financial aid details, medical information, exact real-time location, private messages.\n\nHere's the twist: even "lower sensitivity" data becomes a bigger deal when it's **combined**. Your school, your daily schedule, and your real-time location together can reveal exactly where to find you at a specific time — something none of those three facts alone would reveal.\n\nThat's why "it's just my favorite color" or "it's just my school name" isn't the right question. The right question is: **what could this piece of data reveal when combined with everything else I've already shared?**`,
        checkIn: {
          prompt: "Individually, your school name, your after-school activity, and your usual walking route each seem pretty harmless. Why might sharing all three together be riskier than sharing just one?",
          choices: [
            "Because combining data automatically deletes your account",
            "Combined, they could reveal exactly where and when to find you, which no single fact alone would show",
            "It isn't riskier — combining harmless facts is still harmless",
            "Because schools ban students from having any online presence",
          ],
          correctIndex: 1,
          explanation:
            "Data adds up. Individually mild facts can combine into a detailed, sensitive picture — like exactly where to find someone at a predictable time — even when no single piece seems risky on its own.",
        },
        callout: {
          label: "Pro tip",
          text: "Before posting a detail, ask not just 'is this piece sensitive?' but 'what does this reveal when combined with what I've already posted?' That combined view is where real risk usually hides.",
        },
      },
      {
        id: "how-collected",
        kicker: "How they get it",
        title: "Cookies, trackers, permissions, and 'sign in with...'",
        body: `So how does all this data get collected? A few main ways:\n\n• **Cookies** — small files websites store on your device to remember you. Some are helpful (keeping you logged in); **tracking cookies** follow you across sites to build an ad profile.\n• **Trackers** — hidden bits of code on pages and in apps that report your activity back to companies, often ones you've never heard of.\n• **App permissions** — when an app asks to use your location, camera, mic, contacts, or photos.\n• **Location services** — your phone constantly knowing (and sometimes sharing) where you are.\n• **"Sign in with Google/Facebook"** — convenient, but it can let companies link your activity together across services.\n\nHere's the key idea behind a lot of "free" apps: **if you're not paying for the product, you might *be* the product.** Free apps and sites often make money by collecting your data and using it to sell **targeted ads** — ads aimed at you based on your profile. The app isn't really free; you're paying with your data.`,
        image: "/images/lessons/dl-12-2.png",
        imageAlt: "A phone trailing little data icons — cookies, location pins, trackers — flowing into a company building that sends back targeted ads",
        bullets: [
          "**Cookies** remember you; tracking cookies follow you across sites.",
          "**Trackers** are hidden code that report your activity to companies.",
          "**Permissions** and **location services** hand apps access to your device and whereabouts.",
          "Many \"free\" apps make money from your data through **targeted ads**.",
        ],
        checkIn: {
          prompt: "A free app never charges you money but somehow still makes millions of dollars. What's the most likely explanation?",
          choices: [
            "The app only makes money if you later buy a paid upgrade — ads never matter",
            "Free apps usually lose money forever and just hope for donations",
            "It collects user data and sells targeted ads, so users 'pay' with their data and attention instead of money",
            "App stores pay developers a flat fee for every free download",
          ],
          correctIndex: 2,
          explanation:
            "Running servers and building apps costs real money. When you're not paying with cash, the business model is usually built on collecting data and selling targeted ads — you're paying with attention and information instead.",
        },
        callout: {
          label: "Common misconception",
          text: "\"Free apps don't make money off me.\" Running apps and servers costs a lot. If you're not paying with money, the business usually earns from your data and attention through ads. 'Free' rarely means free.",
        },
      },
      {
        id: "tracking-methods",
        kicker: "Go deeper",
        title: "Beyond cookies: how tracking follows you around",
        body: `Cookies are just the most familiar tracking method. A few more worth knowing:\n\n• **Device fingerprinting** — even without a cookie, a site can identify your device by a unique combination of details (screen size, browser, installed fonts, and more) that together act almost like a fingerprint.\n• **Cross-device tracking** — companies try to link your phone, laptop, and tablet activity together into one profile, so an ad you saw on your phone might follow you to your laptop.\n• **Data brokers** — companies you've likely never interacted with directly that buy, combine, and sell data about millions of people, often built from public records, app data, and purchase history.\n• **Geofencing** — tracking (or targeting ads) based on whether your location has entered or left a specific real-world area, like a school or a mall.\n\nThe common thread: tracking doesn't require you to *do* anything wrong or careless. A lot of it happens passively, in the background, across companies you never directly signed up with — which is exactly why privacy settings and permission choices matter even when you feel careful.`,
        callout: {
          label: "Watch out",
          text: "Clearing cookies helps, but it doesn't defeat every tracking method — fingerprinting and data brokers don't rely on cookies at all. Reducing what you share in the first place is a more reliable defense than trying to erase a trail afterward.",
        },
      },
      {
        id: "permissions-settings",
        kicker: "Take control",
        title: "App permissions and privacy settings: grant the least needed",
        body: `Here's where you get real power. When an app asks for a **permission**, ask: *does it actually need this to do its job?*\n\nA maps app needs your **location** — that makes sense. But why would a simple **flashlight app** or a basic game need your **contacts, microphone, and location**? It usually doesn't — it wants that data to collect and sell. The rule is **least privilege**: grant only the permissions an app truly needs, and deny the rest. You can always turn one on later if a feature really needs it.\n\nThink of permissions like **rooms in your house**. A guest might need the living room, but you wouldn't hand them keys to your bedroom and safe just because they asked. Decide which "rooms" each app gets into.\n\nThen tighten your **privacy settings** — the controls in each app and device that decide who sees your stuff. Quick wins: set posts to "friends" instead of "public," turn off location tagging, limit ad personalization, and review which apps can see your location "always" vs. "only while using."`,
        callout: {
          label: "Watch out",
          text: "Tapping \"Allow\" on every permission request out of habit is how apps end up with your mic, camera, location, and contacts for no reason. Accepting a permission isn't required or harmless — read what's being asked and say no when it doesn't fit.",
        },
      },
      {
        id: "permissions-practice",
        kicker: "Apply it",
        title: "Practice: which permissions actually make sense?",
        body: `Let's run "least privilege" on four real apps. For each, ask whether the permission genuinely serves the app's core job:\n\n• **A video-calling app asks for camera and microphone.** Makes sense — that's literally the point of the app.\n• **A calculator app asks for your contacts and location.** Doesn't make sense — a calculator has no reason to know who you talk to or where you are.\n• **A photo-editing app asks for photo access.** Makes sense — it needs to open and save images.\n• **A note-taking app asks for microphone access "for voice notes," plus your precise location "always."** The microphone request could be legitimate if it truly offers voice notes; the *always-on* location request likely goes beyond what a note app needs.\n\nThe test isn't "could this permission theoretically be used somehow?" It's "does the app's actual, advertised feature require it?"`,
        checkIn: {
          prompt: "A simple offline word-puzzle game requests permission to access your contacts and exact location. What's the smart response?",
          choices: [
            "Uninstall your phone's entire operating system",
            "Allow both — permissions are always required for games to function",
            "Allow only location, since games often need it",
            "Deny both, since a word-puzzle game has no clear reason to need your contacts or location",
          ],
          correctIndex: 3,
          explanation:
            "A word-puzzle game's core function doesn't require your contacts or location. Requests that go beyond an app's actual purpose are a sign the data is wanted for something other than making the app work.",
        },
        callout: {
          label: "Pro tip",
          text: "When a permission request pops up, pause for two seconds and ask: 'does this app's main feature actually need this?' That one habit blocks most unnecessary data collection before it starts.",
        },
      },
      {
        id: "oversharing-rights",
        kicker: "Share smart",
        title: "Oversharing, data breaches, and your basic rights",
        body: `Even with tight settings, *what you post* matters. **Oversharing** can put you at risk:\n\n• **Location tags** reveal where you are in real time — useful to strangers, not just friends.\n• **Vacation posts** quietly announce that your home is empty.\n• Photos can carry hidden info (like where they were taken), and once something's online, screenshots make it nearly impossible to fully delete.\n\nAnd remember: **data breaches happen** to even big, careful companies. The single best protection is to **minimize what you hand over** in the first place — a company can't lose data it never collected from you.\n\nThe good news: you have **rights**. Privacy laws like the **GDPR** (Europe) and **CCPA** (California) give people the right to **see what data** a company has and to **ask them to delete it**. Even outside those places, many companies now offer privacy dashboards and "download/delete my data" options. You're allowed to ask.`,
        callout: {
          label: "Pro tip",
          text: "Before you post, do a quick \"future check\": would I be okay with a college, a future boss, or a stranger seeing this in five years? If not, don't post it — or at least tighten who can see it.",
        },
      },
      {
        id: "oversharing-scenario",
        kicker: "Apply it",
        title: "Scenario: the vacation countdown post",
        body: `A friend is excited and posts publicly: *"Leaving for Cancun for 10 days starting tomorrow!! So ready 🎉"* with their home neighborhood tagged. Let's think through what that reveals, step by step.\n\n• **It tells strangers your home will be empty** for a specific, known window of time — not just friends, but anyone who can see a public post.\n• **The location tag narrows down where** — combined with a public profile, it may not take much searching to connect a name to an address.\n• **A "countdown" framing invites more attention** than a quiet, after-the-fact travel photo would.\n\nA safer version of the same excitement: post the photos **after you're back**, skip the exact home-area location tag, and consider limiting the post to friends rather than public. Same joy shared, far less exposure while it actually matters.`,
        checkIn: {
          prompt: "What's the biggest privacy risk in a public post that says 'Leaving for vacation for 10 days starting tomorrow!' with a home neighborhood tag?",
          choices: [
            "It publicly announces that a specific home will be empty for a known window of time",
            "It might get too many likes",
            "It uses too many emojis",
            "There's no real risk since it's just exciting news",
          ],
          correctIndex: 0,
          explanation:
            "Publicly sharing exact travel dates plus a home location tells anyone watching exactly when and roughly where a home will be unoccupied. Waiting until you're back, and limiting the audience, removes most of that risk.",
        },
        callout: {
          label: "Watch out",
          text: "The safest rule for travel posts: share the excitement, skip the exact timing and location while it's still relevant, or wait until you're already home.",
        },
      },
      {
        id: "level-up-vocabulary",
        kicker: "Level up",
        title: "A few more privacy words worth knowing",
        body: `A handful of terms show up once you start reading privacy policies or news about data. Quick, plain definitions:\n\n• **Data broker** — a company that collects, buys, and sells personal data about millions of people, often without those people ever directly using its product.\n• **Metadata** — "data about data": for a photo, that's things like the time, location, and device it was taken on, hidden inside the file even if the picture itself looks innocent.\n• **Anonymized / de-identified data** — data with obvious identifiers (like your name) removed — but combined with enough other details, "anonymous" data can sometimes still be traced back to a specific person.\n• **Opt-in vs. opt-out** — opt-in means data collection only happens if you actively agree first; opt-out means it happens by default unless you actively turn it off. Reading which one a setting uses tells you who has to do the extra work.\n• **Terms of service (ToS)** — the agreement you accept to use a service, including what data it can collect and how it can be used.\n\nYou won't memorize every privacy policy, but recognizing these words helps you skim one and spot what actually matters.`,
        callout: {
          label: "Tip",
          text: "When you skim a privacy policy or settings page, search (Ctrl/Cmd+F) for words like \"share,\" \"sell,\" \"third party,\" and \"advertising\" — that's usually the fastest way to find the parts that actually affect you.",
        },
      },
      {
        id: "senior-privacy",
        kicker: "For older teens",
        title: "What colleges & employers see — and protecting application data",
        body: `Admissions officers, scholarship committees, and hiring managers often search applicants online. Your public posts, tagged photos, and usernames are part of that picture — whether you meant them to be or not.\n\nPractical moves for application season:\n\n• **Audit public profiles** before you hit submit on Common App, a scholarship, or a job form. Set accounts to private if you don't want strangers scrolling your life.\n• **Don't overshare sensitive application data** in group chats or random "scholarship helper" sites. SSN, FAFSA details, and tax info belong on official portals only.\n• **Beware of "free scholarship" apps** that ask for every permission and every personal detail — grant the least needed, and prefer official .gov / school / known foundation sites.\n• **Shared devices** — log out of college portals and email on library or school computers so the next person can't peek.\n\nYounger teens: the same "future check" still applies. The posts you make at 14 can still be findable at 18.`,
        bullets: [
          "Search yourself the way a college or employer would.",
          "Keep SSN / FAFSA / tax data on official sites only.",
          "Question \"free scholarship\" apps that demand every permission.",
          "Log out of portals on shared computers.",
        ],
        callout: {
          label: "Watch out",
          text: "A site that asks for your Social Security number, bank login, or \"processing fee\" to \"guarantee\" a scholarship is almost never legitimate. Official aid goes through known portals — not panic-click forms.",
        },
      },
      {
        id: "quick-wins",
        kicker: "A real example",
        title: "Five quick privacy wins you can do tonight",
        body: `You don't need hours or tech skills to take back control. Here are five small moves with a big payoff:\n\n• **Check your location permissions.** In your phone settings, look at which apps can see your location "always." Switch the ones that don't need it to "only while using" — or off.\n• **Make your social profiles private.** Set posts to "friends" instead of "public" so strangers can't scroll your whole life.\n• **Turn off location tags on photos and posts.** No need to broadcast exactly where you are in real time.\n• **Limit ad personalization.** Most phones and big accounts have a setting to reduce ad tracking — flip it on.\n• **Delete apps you don't use.** An app you forgot about is still collecting data. If you don't use it, remove it.\n\nEach one takes a minute or two. Together they shrink your data trail a lot — without changing how you actually live online.`,
        bullets: [
          "Set location to \"only while using\" or off for apps that don't need it.",
          "Make social profiles **private**, not public.",
          "Turn off **location tags** on photos and posts.",
          "Delete apps you no longer use.",
        ],
        callout: {
          label: "Pro tip",
          text: "Do a quick \"permission spring-clean\" every few months. Go to your phone's privacy settings and skim which apps can reach your location, camera, mic, and contacts — you'll almost always find one to turn off.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Reviewing a new app's permissions, step by step",
        body: `You just installed a free **photo-filter game**. On first launch it asks for a pile of permissions. Let's decide what to allow, step by step.\n\n**Step 1 — Read each request.** It wants: **Camera**, **Photos**, **Location**, **Contacts**, and **Microphone**. Don't just tap "Allow all."\n\n**Step 2 — Match permission to purpose.** A photo-filter app clearly needs **Camera** and maybe **Photos** to do its actual job. Allow those.\n\n**Step 3 — Question the rest.** Why does a filter game need your **Location**, **Contacts**, and **Microphone**? It doesn't, to make filters. Those are almost certainly for data collection or ads. **Deny** them.\n\n**Step 4 — Choose the narrowest option.** For Photos, pick "selected photos" instead of "all photos" if your phone offers it. For anything location-based, prefer "only while using" over "always."\n\n**Step 5 — Tighten one privacy setting too.** While you're at it, go into the app (or your phone) settings and turn off **ad personalization** or set your profile to private. Two minutes of effort, far less of your life handed away.`,
        image: "/images/lessons/dl-12-3.png",
        imageAlt: "A photo-filter app permission list with Camera and Photos allowed (green checks) and Location, Contacts, and Microphone denied (red X marks)",
        callout: {
          label: "Common misconception",
          text: "\"Incognito / private mode makes me anonymous.\" It mostly just stops your *own device* from saving history. Your school, your internet provider, and the websites you visit can often still see your activity. It's not an invisibility cloak.",
        },
      },
      {
        id: "worked-2",
        kicker: "Worked example",
        title: "A pre-college-application privacy audit, step by step",
        body: `Now a higher-stakes version: you're about to submit college applications and want to make sure your public online presence won't work against you. Let's audit it, step by step.\n\n**Step 1 — Search yourself.** Search your own name (and any public usernames) the way an admissions reader might. Note anything public that surprises you.\n\n**Step 2 — Check each platform's audience setting.** For each social account, confirm whether posts are set to public or friends-only. Tighten anything you don't want a stranger scrolling through.\n\n**Step 3 — Review old tagged photos.** Old tags from years ago can still surface. Untag anything that doesn't reflect who you are now, or ask a friend to remove a public post if needed.\n\n**Step 4 — Separate application data from casual chats.** Confirm you've only ever entered your SSN, financial aid details, or transcripts into official portals — never into a group chat, a random "scholarship calculator" site, or a DM.\n\n**Step 5 — Set a calendar reminder.** Do this same audit once a year, not just once before applications — your public footprint keeps growing even after you submit.\n\nNone of this requires deleting your whole online life — just making sure what's visible is something you'd stand behind.`,
        checkIn: {
          prompt: "While auditing your accounts before college applications, you find an old public post with your home address and daily schedule from two years ago. What's the best next step?",
          choices: [
            "Post it again to make sure people notice",
            "Delete or restrict the post's visibility now, since it's still publicly findable today",
            "Only worry about posts made in the last week",
            "Leave it — old posts don't matter anymore",
          ],
          correctIndex: 1,
          explanation:
            "Old public posts remain visible and findable until you act on them. Deleting or restricting an old post that reveals sensitive details is exactly the kind of fix a privacy audit is meant to catch.",
        },
        callout: {
          label: "Pro tip",
          text: "Do your self-search audit a few weeks before any application deadline — not the night before. That gives you time to actually fix anything you find instead of panicking about it.",
        },
      },
      {
        id: "permission-audit",
        kicker: "Checklist",
        title: "Your 15-minute app permission audit",
        body: `Open your phone's settings and walk through your most-used apps:\n\n1. **Location** — does this app need it always, only while using, or never?\n2. **Camera / mic** — games and calculators usually don't need always-on access.\n3. **Contacts / photos** — grant only if the app's core job requires it.\n4. **Tracking / ads** — turn off cross-app tracking where you can (especially on social apps).\n5. **Old apps** — delete ones you haven't opened in six months; they may still be collecting data.\n\nYou're not trying to go off-grid. You're cutting off the data hoses that don't serve you — especially before college apps or job searches when your digital life gets more public.`,
        callout: {
          label: "Try this week",
          text: "Fix permissions on your top three apps this week — not all fifty at once. Small, real changes beat a privacy resolution you abandon by Friday.",
        },
        checkIn: {
          prompt: "A flashlight app requests access to your contacts, microphone, and location 'for full features.' What should you do?",
          choices: [
            "Grant everything so the app works",
            "Deny unnecessary permissions or delete the app — a flashlight doesn't need your contacts",
            "Assume all apps need all permissions",
            "Share the app in group chat",
          ],
          correctIndex: 1,
          explanation:
            "Grant the least permissions needed for the app to do its job. A flashlight app asking for contacts and mic is a major red flag — deny or delete.",
        },
      },
      {
        id: "overshare-scenario-2",
        kicker: "Mini scenario",
        title: "Second case: the vacation post problem",
        body: `The Chen family leaves for a week-long trip. Their teen posts airport selfies with the house address visible in a delivery package on the counter, plus a "see you in seven days!" caption.\n\n**Before:** post goes public, a stranger now knows the family is away and roughly where they live.\n\n**After:** post waits until they're home, or shares a generic travel photo with no address, tags, or "we're gone" timing — close friends already knew the plan through private channels.\n\nOversharing isn't just about embarrassing photos. **Timing + location + empty house** is a privacy pattern burglars and scammers literally watch for. You don't have to stop sharing joy — just separate public posts from security clues.`,
        callout: {
          label: "Watch out",
          text: "Stories and location tags feel temporary, but screenshots aren't. If you wouldn't want a stranger to know you're gone, don't broadcast it publicly.",
        },
      },
      {
        id: "privacy-before-after",
        kicker: "Before & after",
        title: "Privacy settings: default vs. intentional",
        body: `**Before (defaults):** public profile, location on for every app, birthday and school visible, old posts searchable, "free" quiz app selling data to advertisers, same password on six accounts.\n\n**After (intentional):** friends-only on personal accounts, location only when needed, birthday/year hidden on public profiles, annual self-search and cleanup, privacy settings reviewed twice a year, unique passwords on important accounts.\n\nSame person, same apps — wildly different risk level. Companies design defaults to collect more, not to protect more. **Intentional** means you chose what to share instead of letting the app's business model choose for you.`,
        callout: {
          label: "Pro tip",
          text: "Set a recurring calendar reminder — 'privacy check' in January and July. Twice a year beats a panicked settings scramble the night before applications go live.",
        },
      },
      {
        id: "data-red-flags",
        kicker: "Red flags",
        title: "When an app or site wants too much",
        body: `These are signs your data is the product — not the service:\n\n• **"Sign in with Google/Facebook"** on a site that doesn't need your identity for its job.\n• **Long, vague privacy policies** with no plain summary — especially if they sell data to "partners."\n• **Quizzes that ask for your first car, street, and mother's maiden name** — those are often security-question answers.\n• **Free VPNs or browser extensions** with no clear business model — if you're not paying, inspect what they're collecting.\n• **"We need your contacts to help you find friends"** from a brand-new app nobody's heard of.\n\nWhen you spot these, ask: **what are they getting, and what am I actually getting?** Sometimes the trade isn't worth it.`,
        callout: {
          label: "Try this week",
          text: "Read one app's privacy label (or the first screen of its policy) for an app you use daily. Just one — you'll never unsee how much data it collects.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You're now in the driver's seat of your own data. Quick recap:\n\n• **Personal data (PII)** is anything that identifies you; companies combine it into a detailed **profile**, and even mild facts get riskier once combined.\n• It's collected through **cookies**, **trackers**, **fingerprinting**, **permissions**, and logins — and many "free" apps pay their bills with your data via **targeted ads**.\n• Grant apps the **least permissions** they need, and tighten your **privacy settings**.\n• Avoid **oversharing** (location tags, vacation posts), minimize what you hand over since **breaches happen**, and use your **rights** to see or delete your data.\n• Before college apps or job searches, audit public profiles and keep sensitive aid data on official sites only.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then write a quick reflection about your own apps and settings.`,
      },
    ],
  },
  bigIdeas: [
    "**Personal data (PII)** is anything that identifies you; companies combine it into a detailed profile, and even mild facts get riskier once combined.",
    "Many \"free\" apps make money from your data through **targeted ads** — collected via cookies, trackers, fingerprinting, and permissions.",
    "Take control: grant the **least permissions** needed, tighten **privacy settings**, and avoid oversharing — especially before colleges or employers look you up.",
  ],
  keyTerms: [
    { term: "Personal data (PII)", definition: "Any information that can identify you — name, birthday, address, location, photos, contacts, and online habits." },
    { term: "Cookie", definition: "A small file a website stores on your device to remember you; tracking cookies follow you across sites for ads." },
    { term: "Tracker", definition: "Hidden code in pages and apps that reports your activity back to companies to build a profile of you." },
    { term: "App permission", definition: "Access an app requests to your device features or data, like location, camera, mic, contacts, or photos." },
    { term: "Privacy settings", definition: "Controls in apps and devices that let you decide who can see your information and how it's used." },
    { term: "Terms of service", definition: "The rules and agreement you accept to use a service — including what data it can collect and how." },
  ],
  realWorld:
    "The targeted ads that seem to 'read your mind,' the apps asking for your location, and the 'sign in with Google' button all run on your **personal data**. Reviewing **permissions** and tightening **privacy settings** is how you stay in control — a habit valued everywhere from daily life to tech jobs, college apps, and first interviews.",
  quiz: [
    {
      id: "q1",
      question: "You're filling out a scholarship form that asks for your name, birthday, address, and school. Which of these counts as personal data (PII)?",
      choices: [
        "Your name, location, contacts, photos, and browsing habits — plus form details like birthday and address",
        "Nothing you post publicly counts as personal data",
        "Only information you mark as private",
        "Only your full legal name",
      ],
      correctIndex: 0,
      explanation:
        "Personal data is anything that can identify you — name, birthday, address, location, photos, contacts, and online habits. Companies (and forms) combine these pieces into a detailed profile of you.",
    },
    {
      id: "q2",
      question: "A free \"scholarship finder\" app makes money without charging you. How does that usually work?",
      choices: [
        "Free apps never make any money at all",
        "The government pays for all free apps",
        "It collects your data and shows targeted ads — you 'pay' with your data and attention",
        "The developers run it for free out of kindness",
      ],
      correctIndex: 2,
      explanation:
        "If you're not paying with money, the business often earns from your data and attention through targeted ads. Running apps costs money, so 'free' usually means you're the product.",
    },
    {
      id: "q3",
      question: "A simple flashlight app asks for your location, contacts, and microphone while you're on a school Chromebook. What's the smart move?",
      choices: [
        "Deny the permissions it doesn't need; a flashlight doesn't need your contacts or location",
        "Allow them since denying will break your phone",
        "Allow everything — permissions are required and harmless",
        "Uninstall every app that asks for any permission",
      ],
      correctIndex: 0,
      explanation:
        "Use 'least privilege' — grant only what an app truly needs. A flashlight has no reason to need your location, contacts, or mic, so deny those. They're almost certainly for data collection.",
    },
    {
      id: "q4",
      question: "You're about to submit a college application and wonder whether to keep posting your exact location on every photo. Why is minimizing what you share a good privacy strategy?",
      choices: [
        "Because sharing anything online is illegal",
        "Because data breaches happen, and a company can't lose data it never collected from you — plus public posts can be seen by admissions and employers",
        "Because the internet is slow and sharing less saves data",
        "Because privacy settings don't exist",
      ],
      correctIndex: 1,
      explanation:
        "Even big companies get breached. The less data you hand over, the less can be exposed or misused. Public oversharing also shapes what colleges and employers find when they search you.",
    },
    {
      id: "q5",
      question: "A friend says private/incognito mode will hide their college-portal browsing from everyone. Which statement is TRUE about privacy online?",
      choices: [
        "Incognito/private mode makes you completely anonymous to everyone",
        "Once you accept permissions you can never change them",
        "Public posts can be fully deleted with no trace at any time",
        "Laws like GDPR and CCPA let you see and ask to delete data companies hold about you",
      ],
      correctIndex: 3,
      explanation:
        "Privacy laws like GDPR and CCPA give people the right to see and delete their data. Incognito mode only hides history on your own device, permissions can be changed in settings, and posts can be screenshotted.",
    },
    {
      id: "q6",
      question: "Your school, your after-school activity, and your usual walking route each seem harmless shared alone. What's the risk in sharing all three together publicly?",
      choices: [
        "There's no added risk from combining harmless facts",
        "Combining data automatically makes an account private",
        "Combined, they could reveal exactly where and when to find you — something no single fact alone would show",
        "It would only matter if you also shared your favorite color",
      ],
      correctIndex: 2,
      explanation:
        "Data adds up. Individually mild facts can combine into a detailed, sensitive picture, which is why the real question is what a set of shared details reveals together, not just each one alone.",
    },
    {
      id: "q7",
      question: "A note-taking app requests microphone access for voice notes, plus 'always-on' precise location. What's the most reasonable response?",
      choices: [
        "Deny microphone but allow location, since microphones are riskier",
        "Allow both automatically since apps always need every permission they ask for",
        "The microphone request could be reasonable for the voice-note feature; the always-on location request likely goes beyond what a note app needs",
        "Uninstall the app immediately without reading any requests",
      ],
      correctIndex: 2,
      explanation:
        "The right test is whether a permission matches the app's actual advertised feature. A microphone for voice notes can make sense; constant precise location for a note-taking app usually does not.",
    },
    {
      id: "q8",
      question: "While auditing your public profiles before college applications, you find an old post from two years ago listing your home address and daily schedule. What should you do?",
      choices: [
        "Ignore it — old posts don't affect anything today",
        "Delete it or restrict its visibility now, since it's still publicly visible and findable",
        "Repost it so people notice the mistake",
        "Only fix posts made this week",
      ],
      correctIndex: 1,
      explanation:
        "An old public post remains visible until you act on it. Restricting or deleting it now removes real, currently-findable exposure — exactly what a pre-application privacy audit is meant to catch.",
    },
  ],
  reflection: {
    prompt:
      "Pick one app on your phone. What permissions does it have, and is there one you could turn off? Name one privacy setting you'll tighten this week — especially if colleges, scholarships, or employers might search you soon.",
    placeholder: "Example: My photo app has location access I don't need — I'll turn it off and set my profile to private…",
  },
};
