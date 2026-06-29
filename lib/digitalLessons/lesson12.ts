import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson12: AILessonConfig = {
  id: "dl-12",
  title: "12. Protect Your Privacy & Data",
  goal: "Understand how your personal data is collected and used online, and take control with privacy settings, smart app permissions, and more careful sharing.",
  xpReward: 600,
  badge: "🛡️ Privacy Protector",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/11",
  nextHref: "/learn/digital/13",
  lessonModule: {
    durationLabel: "~7 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Every app you open, site you visit, and post you make leaves a trail of **data** about you. Companies collect that trail constantly — and most people have no idea how much they're giving away. Today you'll take back some control.\n\nHere's our roadmap:\n\n• **What personal data is** and why it's valuable.\n• **How apps and sites collect it** — cookies, trackers, and permissions.\n• **"If it's free, you might be the product"** — how your data pays the bill.\n• **Privacy settings and app permissions** — granting only what's needed.\n• **Oversharing risks** and your basic data rights.\n\nThis isn't about being scared of technology. It's about being the person who *decides* what they share, instead of handing everything over by accident. That control matters more every year — for your safety, your reputation, and your future.`,
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
        id: "what-is-data",
        kicker: "The big idea",
        title: "Personal data is information that identifies you",
        body: `**Personal data** — often called **PII** (Personally Identifiable Information) — is any information that can identify *you*. It's more than just your name:\n\n• Your **name, birthday, and address**\n• Your **location** (where you are right now and where you usually go)\n• Your **photos and contacts**\n• Your **browsing and search habits**, what you watch, what you buy, who you talk to\n\nIndividually, some of these seem harmless. But companies combine them to build a detailed **profile** of you — your interests, routines, mood, and what might make you click or buy.\n\nThink of your data like **ingredients**. One ingredient isn't much, but collect enough — your searches, your location history, your likes — and a company can "cook up" a surprisingly complete picture of who you are, often more than your friends know.`,
        callout: {
          label: "Common misconception",
          text: "\"I have nothing to hide, so privacy doesn't matter.\" Privacy isn't about hiding bad things — it's about *control*. You close the bathroom door not because you're doing something wrong, but because some things are simply yours to decide who sees.",
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
        callout: {
          label: "Common misconception",
          text: "\"Free apps don't make money off me.\" Running apps and servers costs a lot. If you're not paying with money, the business usually earns from your data and attention through ads. 'Free' rarely means free.",
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
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You're now in the driver's seat of your own data. Quick recap:\n\n• **Personal data (PII)** is anything that identifies you; companies combine it into a detailed **profile**.\n• It's collected through **cookies**, **trackers**, **permissions**, and logins — and many "free" apps pay their bills with your data via **targeted ads**.\n• Grant apps the **least permissions** they need, and tighten your **privacy settings**.\n• Avoid **oversharing** (location tags, vacation posts), minimize what you hand over since **breaches happen**, and use your **rights** to see or delete your data.\n\nWhen you're ready, switch to the **Knowledge check**, then write a quick reflection about your own apps and settings.`,
      },
    ],
  },
  bigIdeas: [
    "**Personal data (PII)** is anything that identifies you; companies combine it into a detailed profile.",
    "Many \"free\" apps make money from your data through **targeted ads** — collected via cookies, trackers, and permissions.",
    "Take control: grant the **least permissions** needed, tighten **privacy settings**, and avoid oversharing.",
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
    "The targeted ads that seem to 'read your mind,' the apps asking for your location, and the 'sign in with Google' button all run on your **personal data**. Reviewing **permissions** and tightening **privacy settings** is how you stay in control — a habit valued everywhere from daily life to tech jobs.",
  quiz: [
    {
      id: "q1",
      question: "Which of these counts as personal data (PII)?",
      choices: [
        "Only your full legal name",
        "Your name, location, contacts, photos, and browsing habits",
        "Only information you mark as private",
        "Nothing you post publicly counts as personal data",
      ],
      correctIndex: 1,
      explanation:
        "Personal data is anything that can identify you — name, birthday, address, location, photos, contacts, and online habits. Companies combine these pieces into a detailed profile of you.",
    },
    {
      id: "q2",
      question: "A free game app makes money without charging you. How does that usually work?",
      choices: [
        "The developers run it for free out of kindness",
        "It collects your data and shows targeted ads — you 'pay' with your data and attention",
        "The government pays for all free apps",
        "Free apps never make any money at all",
      ],
      correctIndex: 1,
      explanation:
        "If you're not paying with money, the business often earns from your data and attention through targeted ads. Running apps costs money, so 'free' usually means you're the product.",
    },
    {
      id: "q3",
      question: "A simple flashlight app asks for your location, contacts, and microphone. What's the smart move?",
      choices: [
        "Allow everything — permissions are required and harmless",
        "Deny the permissions it doesn't need; a flashlight doesn't need your contacts or location",
        "Uninstall every app that asks for any permission",
        "Allow them since denying will break your phone",
      ],
      correctIndex: 1,
      explanation:
        "Use 'least privilege' — grant only what an app truly needs. A flashlight has no reason to need your location, contacts, or mic, so deny those. They're almost certainly for data collection.",
    },
    {
      id: "q4",
      question: "Why is minimizing what you share online a good privacy strategy?",
      choices: [
        "Because the internet is slow and sharing less saves data",
        "Because data breaches happen, and a company can't lose data it never collected from you",
        "Because sharing anything online is illegal",
        "Because privacy settings don't exist",
      ],
      correctIndex: 1,
      explanation:
        "Even big companies get breached. The less data you hand over, the less can be exposed or misused. Minimizing what you share is one of the strongest privacy protections you control.",
    },
    {
      id: "q5",
      question: "Which statement is TRUE about privacy online?",
      choices: [
        "Incognito/private mode makes you completely anonymous to everyone",
        "Laws like GDPR and CCPA let you see and ask to delete data companies hold about you",
        "Once you accept permissions you can never change them",
        "Public posts can be fully deleted with no trace at any time",
      ],
      correctIndex: 1,
      explanation:
        "Privacy laws like GDPR and CCPA give people the right to see and delete their data. Incognito mode only hides history on your own device, permissions can be changed in settings, and posts can be screenshotted.",
    },
  ],
  reflection: {
    prompt:
      "Pick one app on your phone. What permissions does it have, and is there one you could turn off? Name one privacy setting you'll tighten this week.",
    placeholder: "Example: My photo app has location access I don't need — I'll turn it off and set my profile to private…",
  },
};
