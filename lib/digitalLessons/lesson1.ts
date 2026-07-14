import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson1: AILessonConfig = {
  id: "dl-1",
  title: "1. How Computers & the Internet Work",
  goal: "Understand the basic parts of a computer (hardware vs software), what an operating system does, and how the internet, web, and cloud move information.",
  xpReward: 50,
  badge: "Tech Foundations",
  dashboardHref: "/dashboard",
  nextHref: "/learn/digital/2",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `You use a computer or phone every day — texting friends, watching videos, gaming, turning in homework. But what's actually happening inside that glass-and-metal rectangle? Today you'll pull back the curtain. No experience needed — every new word gets explained the moment it shows up.\n\nHere's our roadmap:\n\n• **Hardware vs. software** — the physical parts vs. the instructions that bring them to life.\n• **CPU, RAM, and storage** — the kitchen analogy that makes the insides stick.\n• **The operating system** — the manager between you and the hardware.\n• **Internet, web, and cloud** — how a message or video actually reaches your screen.\n• **Real traps, real habits** — a myth-busting round, a buying trap, and a fix-it framework.\n• **Where this fits** — how these skills connect to bigger thinking habits you'll use for life.\n\nThis isn't trivia. Understanding how devices work makes you faster, harder to fool, and more confident — whether you're unfreezing a Chromebook before class, comparing laptop specs for college, or answering a "tech literacy" question on a job or internship application.`,
        image: "/images/lessons/dl-1.png",
        imageAlt: "Open laptop beside a smartphone, with a home Wi-Fi router and ethernet cable visible in the background",
        callout: {
          label: "Why it matters",
          text: "When something breaks — a slow phone, a website that won't load — knowing the parts involved helps you figure out what's wrong instead of guessing, panicking, or paying for a fix you don't need.",
        },
      },
      {
        id: "hook-story",
        kicker: "Real moment",
        title: "The night the Chromebook died — 20 minutes before the deadline",
        body: `Jordan's history essay is due at midnight. At 11:40 p.m., the Chromebook screen freezes mid-sentence. Jordan mashes keys, closes the lid, reopens it, and starts to panic — is the essay gone? Is the *whole computer* broken? Should they email the teacher right now?\n\nHere's the twist: Jordan didn't need to panic, and they definitely didn't need a new laptop. The essay was saved in the cloud the whole time. One app had frozen — not the device, not the internet, not the essay. A ten-second restart brought everything back, essay intact.\n\nThe difference between "everything is broken, I'm doomed" and "oh, it's just the app, easy fix" is exactly what this lesson teaches: knowing which *layer* — app, device, network, or internet — is actually causing the problem. By the end, a frozen screen at 11:40 p.m. won't feel like an emergency anymore.`,
        callout: {
          label: "Keep this in mind",
          text: "Almost every 'my computer is broken!' moment is really one small, specific thing going wrong — not the whole machine failing. This lesson teaches you to find that one thing fast.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `Before we dive in, here are the words we'll use a lot — explained simply, so nothing feels like a foreign language later. Don't memorize these; just read them once and they'll click as we go.\n\n• A **device** is any computer-like gadget you use: a phone, tablet, laptop, desktop, or a school Chromebook.\n• A **program** (or **app**, short for *application*) is a set of instructions that does a job — like the camera app, a game, or a web browser.\n• **Data** is just information stored as numbers a computer can handle — your photos, texts, and saved games are all data.\n• A **network** is a group of devices connected so they can send each other data — like everyone's phones connected to the same Wi-Fi.\n\nThat's it. Every other term in this lesson gets defined the first time it appears, right where you meet it.`,
        callout: {
          label: "Pro tip",
          text: "If a tech word ever confuses you, swap in its plain-English meaning. \"Open the application\" simply means \"open the app.\" Most jargon is just a fancy label for something simple.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "Hardware is what you can touch. Software is the instructions.",
        body: `Every computer is really two things working together:\n\n• **Hardware** is the physical stuff — the parts you could actually hold or knock on. The screen, keyboard, battery, chips, and cables are all hardware.\n• **Software** is the set of instructions that tells the hardware what to do. It's not physical — you can't hold software in your hand. Your games, your browser, TikTok, and the menus you tap are all software.\n\nHere's an easy way to remember it: hardware is like a **musical instrument**, and software is the **sheet music**. A guitar (hardware) can't play anything by itself. The music (software) tells it exactly what to do. And the *same* guitar can play a thousand different songs, just like the *same* phone can run thousands of different apps.\n\nNeither one is useful alone. Hardware without software is a fancy paperweight. Software without hardware is just an idea that can't run anywhere.`,
        image: "/images/lessons/dl-1-2.png",
        imageAlt: "Split photo: a physical laptop keyboard and phone on the left; browser tabs and app icons on a screen on the right",
        callout: {
          label: "Watch out",
          text: "People often blame \"the computer\" when something goes wrong, but it's usually the software (an app or the operating system) that's frozen — not the physical hardware. Knowing the difference helps you fix it faster.",
        },
        checkIn: {
          prompt: "Jordan's Chromebook screen froze on one essay app, but the keyboard and screen still lit up fine. What does that suggest?",
          choices: [
            "The hardware is destroyed and needs replacing",
            "Most likely a software problem (the app), since the physical hardware is still responding",
            "The battery is dead",
            "There is no way to know without a repair shop",
          ],
          correctIndex: 1,
          explanation:
            "If the physical parts (screen lighting up, keys registering) still work, the freeze is almost always in software — a stuck app or the OS — not broken hardware.",
        },
      },
      {
        id: "concept-2",
        kicker: "Inside the machine",
        title: "CPU, RAM, and storage — a kitchen analogy",
        body: `Three parts do most of the heavy lifting inside any computer. Don't worry about the technical names — picture a busy **kitchen** and they'll stick:\n\n• **CPU (the chef / the brain)** — CPU stands for **C**entral **P**rocessing **U**nit. It does the actual thinking and calculating. Like a chef, it follows the recipe step by step and does the real work. A faster chef cooks more dishes per minute; a faster CPU does more tasks per second.\n• **RAM (the counter space)** — RAM stands for **R**andom **A**ccess **M**emory. It's short-term memory: the stuff the computer is using *right now*. Like the counter space a chef spreads ingredients on, more RAM means you can work on more things at once. But when you turn the machine off, RAM is wiped clean — just like a counter gets cleared at the end of the night.\n• **Storage (the pantry / filing cabinet)** — This is long-term memory that *keeps* your files, photos, and apps even when the power is off. Like a pantry full of labeled jars, it holds everything until you need it. "Hard drives" and "SSDs" are just two types of storage.\n\nOne more pair to know: **input** and **output** devices. **Input** sends information *into* the computer (keyboard, mouse, touchscreen, microphone, camera). **Output** sends information *out* to you (screen, speakers, printer). Tapping a key is input; the letter appearing on screen is output.`,
        bullets: [
          "**CPU** = the brain that does the thinking. Measured in speed.",
          "**RAM** = short-term memory for what you're doing right now. Wiped when powered off.",
          "**Storage** = long-term memory that keeps your files even when off.",
          "**Input** brings info in (typing); **output** sends info out to you (the screen).",
        ],
        callout: {
          label: "Common misconception",
          text: "RAM and storage are NOT the same thing, even though both are \"memory.\" If your phone is out of storage, you can't save new photos. If it's low on RAM, it gets slow and laggy when juggling apps. Different problems, different fixes.",
        },
        checkIn: {
          prompt: "Your Chromebook is laggy with 15 tabs open, but you still have 40GB of free space for files. What's most likely low?",
          choices: ["Storage", "RAM", "The CPU's battery", "Wi-Fi signal"],
          correctIndex: 1,
          explanation:
            "RAM is short-term memory for what you're doing right now. Juggling many tabs fills it up and causes lag, while storage is about saved files — which is fine here.",
        },
      },
      {
        id: "concept-3",
        kicker: "The manager",
        title: "The operating system runs the whole show",
        body: `If the CPU is the chef, who's the **manager** keeping the whole kitchen organized? That's the **operating system (OS)** — the main program that runs your entire device and lets everything else work.\n\nThe operating system sits between *you* and the *hardware*. When you tap an app, the OS makes the screen respond, hands the app some RAM to use, finds your files in storage, and keeps all the apps from crashing into each other. You're almost certainly using one of these right now:\n\n• **Windows** and **macOS** — on laptops and desktops.\n• **ChromeOS** — on Chromebooks, common in schools.\n• **iOS** (iPhone/iPad) and **Android** (most other phones) — on mobile devices.\n\nOn top of the OS run your **apps** — smaller programs built for specific jobs, like a browser, a game, or a notes app. Think of it like a school: the OS is the principal keeping the whole building running, and the apps are the individual classes happening inside it.`,
        callout: {
          label: "Pro tip",
          text: "When an app misbehaves, closing and reopening it (or restarting the whole device) gives the operating system a fresh start to clean up the mess. That's why \"have you turned it off and on again?\" actually works so often.",
        },
        checkIn: {
          prompt: "What is the main job of an operating system like Windows, macOS, or ChromeOS?",
          choices: [
            "It's just another app, like a game",
            "It manages the hardware and lets apps run on top of it",
            "It only connects you to the internet",
            "It permanently stores your photos",
          ],
          correctIndex: 1,
          explanation:
            "The OS sits between you and the hardware, handing out RAM, coordinating storage, and keeping apps from crashing into each other. Apps then run on top of it.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "What really happens when you open a video",
        body: `Let's trace a single tap, from your finger to a playing video, step by step. There's no magic — just clients, packets, and servers doing their jobs.\n\n**Step 1 — You make a request.** You tap a video in an app. Your device (the **client**) sends a request out through your Wi-Fi to your **router** (the box at home or school that connects your devices to the internet). The router passes it to your **internet company** and onto the internet.\n\n**Step 2 — The request finds the server.** The request travels across the internet until it reaches the **server** (a computer in a **data center**) that stores that video.\n\n**Step 3 — The server replies in packets.** The server chops the video into thousands of tiny **packets** — small labeled chunks of data — and sends them back toward you, each labeled with its order.\n\n**Step 4 — Your device reassembles and plays.** Your device collects the packets, puts them back in order, and the **CPU** processes them while **RAM** holds the part that's playing right now. The screen (an **output** device) shows you the video. This all happens in seconds — and it often starts playing before every packet has even arrived, which is why videos sometimes pause to "buffer" (wait for more packets to catch up).`,
        image: "/images/lessons/dl-1-3.png",
        imageAlt: "Smartphone requesting a video; data travels as packets from a remote server through a home router back to the phone screen",
        callout: {
          label: "Pro tip",
          text: "When a video keeps buffering, packets are arriving too slowly — usually a weak connection between you and the server, not a problem with your screen or your CPU. That's why moving closer to the router often fixes it.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "\"The cloud\" is not magic, and Wi-Fi is not the internet",
        body: `Two of the most common tech myths, cleared up for good.\n\n**Myth 1: "The cloud" is magic, floating data.** It's not. **"The cloud"** is just **other people's powerful computers (servers) sitting in giant warehouses called data centers**, which you reach over the internet. When you "save to the cloud," your file is really being stored on a real, physical server somewhere. If those data centers lose power, "the cloud" goes down too — because it's a place, not a sky.\n\n**Myth 2: Strong Wi-Fi bars mean you have internet.** They don't. **Wi-Fi** is only the *wireless hop* between your device and your **router** — the box that connects your home or school to the internet. The router then has to reach the wider internet through your internet company. You can have full Wi-Fi bars and still have zero internet if the connection *beyond* the router is down. That's why "restart the router" fixes so many "the internet is broken" complaints — it's often just that one hop resetting.`,
        callout: {
          label: "Myth check",
          text: "\"The cloud\" is real servers in real buildings, and \"strong Wi-Fi\" only proves the local hop is fine — not the whole path to the internet. Two separate things people constantly mix up.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Diagnose the layer: app, device, network, or internet?",
        body: `Time to practice the exact skill from Jordan's story. For each situation below, ask: is this an **app** problem, a **device** problem, a **network (Wi-Fi/router)** problem, or an **internet-beyond-the-router** problem?\n\n• A single game keeps crashing, but everything else on your phone works fine → likely the **app**.\n• Your whole laptop is sluggish across every program you open → likely the **device** (RAM or too many background apps).\n• Your phone shows full Wi-Fi bars, but no page will load, and other people's devices on the same Wi-Fi also can't load anything → likely the **internet beyond the router**.\n• Only your device can't connect, but your sibling's phone on the same Wi-Fi works fine → likely your **device's network settings**, not the wider internet.\n\nNotice the pattern: you're always narrowing down which *layer* is involved before you try to fix anything. That's the whole troubleshooting skill in one sentence.`,
        checkIn: {
          prompt: "Only YOUR laptop can't load any websites, but every other device on the same home Wi-Fi loads pages fine. What's the most likely layer?",
          choices: [
            "The wider internet beyond the router is down",
            "Something with your specific device or its network settings",
            "The router itself is broken",
            "The cloud has gone offline",
          ],
          correctIndex: 1,
          explanation:
            "If other devices on the same network work fine, the internet and router are clearly fine — the problem is isolated to your one device.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Deeper skill",
        title: "Reading a URL: the internet, the web, and one address bar",
        body: `Now let's go one layer deeper. **The internet** is the giant global **network** — millions of computers physically connected, like the **roads** connecting every town. **The web** (short for World Wide Web) is just *one thing* that travels on those roads: the pages and sites you open in a **browser**, like the **cars** driving on the roads. The web is a *part* of the internet, not the whole thing — your texts, video calls, and app updates all use the internet without being "the web."\n\nA **URL** is a web address, and once you can read one, you can size up a site in two seconds:\n\n• \`https://\` — the \`s\` means the connection is encrypted (scrambled so others can't easily snoop on it in transit).\n• \`kanam.academy\` — the **domain**, which is the site's actual name/owner.\n• \`/learn/digital\` — the specific page path *inside* that site.\n\nSo \`https://kanam.academy/learn/digital\` reads as: securely connect to Kanam Academy's site, then open its \`/learn/digital\` page. Learning to glance at the domain before you trust a page is a skill you'll use constantly — including in the misinformation and safety lessons ahead.`,
        image: "/images/lessons/dl-1-4.png",
        imageAlt: "Close-up of a browser address bar with the https, domain name, and page path sections highlighted in different colors",
        callout: {
          label: "Pro tip",
          text: "Before typing personal info into any site, glance at the domain in the address bar. A URL like \`kanam-academy-login.xyz\` is not the same site as \`kanam.academy\`, even if the page looks identical.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "RAM vs. storage — and internet vs. web",
        body: `Two quick comparisons that lock in the ideas above for good.`,
        table: {
          columns: ["", "RAM", "Storage"],
          values: [
            ["Keeps data when powered off?", "No — wiped clean", "Yes — stays permanently"],
            ["What it holds", "What you're using right now", "Files, photos, apps long-term"],
            ["Low on it causes...", "Laggy, slow multitasking", "\"Storage full\" — can't save new files"],
            ["Kitchen analogy", "Counter space", "Pantry / filing cabinet"],
          ],
          rowCount: 4,
        },
        bullets: [
          "**Internet** = the global network of connected computers (the roads).",
          "**Web** = pages you view in a browser — one thing that travels on the internet (the cars).",
          "You can use the internet (texting, gaming) without ever opening a browser.",
        ],
        callout: {
          label: "Why it matters",
          text: "Mixing these up leads to bad guesses when troubleshooting: someone with a full hard drive might restart their device hoping to \"clear space\" — which won't work, because restarting clears RAM, not storage.",
        },
      },
      {
        id: "real-world-trap",
        kicker: "Real-world trap",
        title: "The laptop-buying trap: don't get fooled by specs",
        body: `Whenever you (or a family member) shop for a laptop for school, college, or a first job, ads throw around numbers that sound impressive but mean nothing without context. Here's the trap, and how to dodge it:\n\n• **Trap:** "1TB of storage!!" sounds huge, but if the laptop only has 4GB of RAM, it will still feel painfully slow running a browser with many tabs plus video calls — because storage and RAM solve completely different problems.\n• **Trap:** Comparing CPU "speed" numbers across totally different CPU brands/generations, which isn't a fair apples-to-apples comparison.\n• **The fix:** Match specs to the actual use. Heavy multitasking (browser + docs + Zoom) → prioritize more **RAM**. Big video/photo projects → prioritize more **storage**. Video editing or coding → a faster **CPU** matters more.\n\nOnce you know what each part actually does, "specs" stop being intimidating alphabet soup and become a simple checklist you can use with confidence — whether you're picking a $300 Chromebook or a $1,500 laptop for a design program.`,
        callout: {
          label: "Watch out",
          text: "A salesperson (or an ad) emphasizing only ONE spec, like storage size, is a hint to ask about the others. A great deal on storage with terrible RAM is still a bad laptop for multitasking.",
        },
      },
      {
        id: "habits",
        kicker: "Decision framework",
        title: "When something breaks: check the chain",
        body: `Most "my computer is broken" moments aren't mysterious — they're a weak link in a short chain. Use this order before you panic or blame the wrong part:\n\n**1. Is it the app?** Force-quit and reopen. If only one app is stuck, the hardware is probably fine.\n**2. Is it the device?** Restart. That clears RAM and gives the OS a clean slate. Still frozen after a restart? Note whether storage is full (can't save) vs. everything lagging (often RAM or too many apps).\n**3. Is it the local network?** Check Wi-Fi bars, try turning Wi-Fi off/on, or move closer to the **router**. Can other devices on the same Wi-Fi load sites?\n**4. Is it beyond your house?** If every device is offline, the problem may be the internet company or a wider outage — not your laptop.\n\nThis is the exact chain that would have saved Jordan ten minutes of panic at 11:40 p.m. Practice naming the layer out loud — app, device, Wi-Fi/router, or wider internet — and random frustration turns into a real diagnosis.`,
        bullets: [
          "App stuck → restart the app first.",
          "Whole device laggy → restart; check RAM vs. storage.",
          "Only online stuff fails → check Wi-Fi, then the router, then the wider internet.",
        ],
        callout: {
          label: "Try this week",
          text: "Once this week, when something feels \"broken,\" name the layer out loud: app, device, Wi-Fi/router, or internet beyond the router. That one habit turns random frustration into a real diagnosis.",
        },
        checkIn: {
          prompt: "You restart your whole laptop, but a single app is still frozen while everything else runs fine. What should you check next?",
          choices: [
            "Buy a new laptop immediately",
            "Force-quit and reopen just that one app",
            "Unplug the router",
            "Assume the CPU is permanently broken",
          ],
          correctIndex: 1,
          explanation:
            "When only one app misbehaves after a restart, the fix is usually to force-quit and relaunch that specific app — the device and OS are working fine.",
        },
      },
      {
        id: "standards-connect",
        kicker: "Where this fits",
        title: "This is computational thinking, not just \"tech trivia\"",
        body: `Everything in this lesson connects to a real skill that goes far beyond computers.\n\nWhen you broke a device down into hardware, software, CPU, RAM, storage, and network — and then used that breakdown to diagnose a problem — you were practicing **computational thinking**: breaking a complex system into smaller parts to understand and solve problems. That's part of the **ISTE Computational Thinker** standard, which asks students to understand how automated systems work and use that understanding to troubleshoot.\n\nIt also connects to **CSTA's "Impacts of Computing"** strand, which asks you to think about how computing systems affect daily life — like how a data center on the other side of the world can affect whether your video loads at home tonight.\n\nAnd because you're learning to question assumptions (like "the cloud is magic" or "strong Wi-Fi means the internet is fine"), you're also building **ISTE Digital Citizen** habits: making informed decisions about the technology you depend on, instead of just trusting it blindly.`,
        callout: {
          label: "Why it matters",
          text: "These aren't just school-lesson labels. Breaking a system into parts to solve a problem is the same skill engineers, IT support staff, and careful shoppers use every single day.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on — a quick gut-check",
        body: `Take thirty seconds before continuing. Think about the last time a device of yours acted up — froze, ran slow, or wouldn't connect.\n\n• Which layer was it really — app, device, network, or wider internet?\n• Did you (or whoever "fixed" it) actually target that layer, or just guess and hope?\n\nYou don't need to write anything down yet — there's a full reflection question waiting for you at the end of this lesson, after the knowledge check. For now, just notice: most tech panic comes from not knowing which layer to blame. You now do.`,
        callout: {
          label: "Reflect",
          text: "Naming the layer out loud — even just in your head — is often the entire fix. It turns \"everything is broken\" into \"oh, it's just the app.\"",
        },
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "Case study: the school Wi-Fi goes down before finals",
        body: `It's the morning of finals week. The whole school's Wi-Fi drops right as students try to load an online exam. Panic spreads in the hallway: "Is the internet broken? Is it just our building? Did someone hack the school?"\n\nHere's how the IT staff actually diagnosed it, using the exact chain from this lesson:\n\n**1. App check —** Multiple totally different apps (the exam portal, email, everything) failed at once, so it's clearly not one broken app.\n\n**2. Device check —** Both Chromebooks *and* teacher laptops *and* phones on Wi-Fi failed, so it's not one broken device either.\n\n**3. Network check —** Every device that failed was on the same building's Wi-Fi network. Devices on cellular data (not Wi-Fi) still worked fine. That's the big clue: the problem is the **local network** — likely the router or the school's internet connection — not a wider, national internet outage.\n\n**4. Fix —** IT restarted the building's main router/modem. Within minutes, Wi-Fi (and the exam portal) came back for everyone.\n\nNotice: nobody needed to be a computer expert. They just followed the same four-layer chain you just learned, and it pointed straight at the real problem.`,
        callout: {
          label: "Pro tip",
          text: "When troubleshooting for a group (a classroom, a family), ask who else is affected. If it's everyone on the same network, that's a strong clue the issue is the network — not any one device.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before the full knowledge check",
        body: `Let's make sure the big ideas from this lesson are locked in before you move to the full Knowledge Check.\n\nQuick self-test: can you explain, in one sentence each —\n\n• The difference between hardware and software?\n• Why RAM and storage are NOT the same thing?\n• Why "the cloud" is not magic?\n• The four-layer chain for troubleshooting (app → device → network → wider internet)?\n\nIf you can answer all four, you're genuinely ready. If one felt shaky, scroll back to that section — it's worth the thirty seconds now, before the graded questions.`,
        checkIn: {
          prompt: "Which single idea ties together almost everything in this lesson?",
          choices: [
            "Every tech problem means you need a new device",
            "Breaking a system into layers (hardware/software, RAM/storage, app/device/network/internet) helps you understand and fix it",
            "The cloud is a physical place in the sky",
            "Wi-Fi bars always guarantee a working internet connection",
          ],
          correctIndex: 1,
          explanation:
            "The whole lesson is one repeated move: break a confusing system into its parts (hardware vs. software, RAM vs. storage, app vs. device vs. network vs. internet) so you can understand — and fix — what's really going on.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've just toured a whole computer and the internet it lives on. Quick recap:\n\n• **Hardware** is the physical parts; **software** is the instructions. The **CPU** thinks, **RAM** is short-term memory, **storage** keeps your files.\n• The **operating system** is the manager between you and the hardware, and **apps** run on top of it.\n• The **internet** is the global network (the roads); the **web** is the pages you view in a **browser** (the cars). Data travels as **packets** between your device (the **client**) and **servers**.\n• **"The cloud"** is just real servers in data centers, and strong Wi-Fi doesn't guarantee the wider internet is working.\n• When something fails, check the chain: **app → device → Wi-Fi/router → wider internet.**\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then write a quick reflection about a device you use.`,
      },
    ],
  },
  bigIdeas: [
    "**Hardware** is the physical parts you can touch; **software** is the instructions that run on it.",
    "The **CPU** thinks, **RAM** is short-term memory, and **storage** keeps files long-term.",
    "The **internet** is the global network; the **web** is the pages you view in a browser; **the cloud** is real servers in data centers.",
    "When something breaks, check the chain: **app → device → network → wider internet.**",
  ],
  keyTerms: [
    { term: "Hardware", definition: "The physical parts of a computer you can touch, like the screen, keyboard, and chips." },
    { term: "Software", definition: "The instructions that tell the hardware what to do, like apps and the operating system." },
    { term: "Operating System", definition: "The main software (Windows, macOS, ChromeOS, iOS, Android) that manages the hardware and runs your apps." },
    { term: "CPU", definition: "The Central Processing Unit — the 'brain' that does the computer's thinking and calculations." },
    { term: "RAM", definition: "Random Access Memory — fast short-term memory for what the computer is doing right now. It clears when powered off." },
    { term: "Server", definition: "A powerful computer that 'serves' data to other devices (clients) when they request it." },
    { term: "The Cloud", definition: "Real, powerful computers (servers) in data centers that you reach over the internet — not the sky." },
    { term: "Browser", definition: "An app like Chrome, Safari, or Firefox that fetches and displays web pages." },
  ],
  realWorld:
    "Streaming a show, submitting a scholarship form online, and saving a photo to Google Photos all rely on the same chain: your device (**client**) sends **packets** over the **internet** to a **server** in a **data center** (\"the cloud\") and back.",
  quiz: [
    {
      id: "q1",
      question: "You're filling out a college application on a laptop. Which of these is software, not hardware?",
      choices: [
        "The keyboard you type on",
        "The screen that shows the form",
        "The web browser you use to open the application portal",
        "The battery inside the laptop",
      ],
      correctIndex: 2,
      explanation:
        "A web browser is a set of instructions (software). The keyboard, screen, and battery are all physical parts you can touch, which makes them hardware.",
    },
    {
      id: "q2",
      question: "During a group project, your Chromebook gets slow and laggy with lots of tabs and docs open, but you still have plenty of free space for files. What is most likely running low?",
      choices: [
        "Storage",
        "RAM",
        "The CPU's battery",
        "Wi-Fi signal",
      ],
      correctIndex: 1,
      explanation:
        "RAM is short-term memory for what you're doing right now. Juggling many apps and tabs fills up RAM and causes lag. Storage is about saving files long-term, which is fine here since there's free space.",
    },
    {
      id: "q3",
      question: "Your first-job training video won't play, but your phone still shows strong Wi-Fi. What does that tell you?",
      choices: [
        "Wi-Fi and the internet are the same thing, so the internet must be fine",
        "Strong Wi-Fi only means a good link to the local router — the internet beyond the router could still be down",
        "Your phone's CPU is broken",
        "The cloud has permanently deleted the video",
      ],
      correctIndex: 1,
      explanation:
        "Wi-Fi is the wireless hop to your router. The router still has to reach the wider internet. Strong Wi-Fi bars don't guarantee that path is working.",
    },
    {
      id: "q4",
      question: "Which statement about the internet and the web is correct?",
      choices: [
        "They are exactly the same thing",
        "The web is the global network, and the internet is one part of it",
        "The internet is the global network, and the web is the pages you view in a browser",
        "The web works without the internet",
      ],
      correctIndex: 2,
      explanation:
        "The internet is the giant global network (the roads). The web is just one thing that travels on it — the pages you open in a browser (the cars). The web is a part of the internet, not the whole thing.",
    },
    {
      id: "q5",
      question: "A scholarship portal says your essay is saved 'in the cloud.' Where is it really?",
      choices: [
        "Floating in the sky as data",
        "Only on your own device's storage",
        "On a real server in a data center that you reach over the internet",
        "Inside your Wi-Fi router",
      ],
      correctIndex: 2,
      explanation:
        "\"The cloud\" is just real, powerful computers (servers) in data centers owned by companies. You reach them over the internet — there's nothing magical or sky-based about it.",
    },
    {
      id: "q6",
      question: "A laptop ad brags about '1TB of storage!' but says nothing about RAM. Based on this lesson, why should that make you cautious?",
      choices: [
        "Storage and RAM are the same thing, so it doesn't matter",
        "Storage handles long-term files, but low RAM can still make the laptop laggy during multitasking regardless of storage size",
        "1TB of storage guarantees a fast CPU",
        "More storage always means more RAM automatically",
      ],
      correctIndex: 1,
      explanation:
        "RAM and storage solve different problems. A laptop can have huge storage and still feel painfully slow if it doesn't have enough RAM for multitasking.",
    },
    {
      id: "q7",
      question: "In the school Wi-Fi case study, IT noticed that phones on cellular data still worked while every device on the building's Wi-Fi failed. What did that tell them?",
      choices: [
        "The problem was one broken laptop",
        "The problem was the local network (Wi-Fi/router), not a single device or a nationwide internet outage",
        "The problem was a single frozen app",
        "The problem could not be diagnosed without a repair shop",
      ],
      correctIndex: 1,
      explanation:
        "Because only devices on that specific Wi-Fi network failed, while devices on cellular data worked, the issue was isolated to the local network layer — pointing straight at the router or building connection.",
    },
    {
      id: "q8",
      question: "Before typing a password into a site, this lesson recommends checking which part of the URL first?",
      choices: [
        "The color of the page background",
        "The domain name in the address bar, to confirm it matches the real site you intend to visit",
        "The number of tabs you have open",
        "How fast the page loaded",
      ],
      correctIndex: 1,
      explanation:
        "Reading the domain in the address bar (like kanam.academy vs. a lookalike domain) is a quick way to catch fake or copycat sites before entering sensitive information.",
    },
  ],
  reflection: {
    prompt:
      "Pick a device you used today. Name one piece of its hardware and one piece of software, and explain what the operating system does for it.",
    placeholder: "Example: My laptop's hardware is the screen; the software is Chrome; the OS (Windows) manages them both…",
  },
};
