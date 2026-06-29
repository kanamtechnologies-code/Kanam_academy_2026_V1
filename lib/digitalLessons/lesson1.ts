import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson1: AILessonConfig = {
  id: "dl-1",
  title: "1. How Computers & the Internet Work",
  goal: "Understand the basic parts of a computer (hardware vs software), what an operating system does, and how the internet, web, and cloud move information.",
  xpReward: 50,
  badge: "🖥️ Tech Foundations",
  dashboardHref: "/dashboard",
  nextHref: "/learn/digital/2",
  lessonModule: {
    durationLabel: "~9 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `You use a computer or phone every single day — texting friends, watching videos, gaming, doing homework. But what's actually happening inside that glass-and-metal rectangle? Today you'll pull back the curtain. No experience needed — we'll explain every new word the moment it shows up.\n\nHere's our roadmap:\n\n• **Hardware vs. software** — the physical parts vs. the instructions that bring them to life.\n• **The brains of the machine** — the CPU, RAM, and storage, explained with a kitchen.\n• **The operating system** — the manager that lets you and the hardware talk.\n• **The internet, the web, and the cloud** — how a message or video actually reaches your screen.\n\nThis isn't just trivia. Understanding how your devices work makes you faster, harder to fool, and more confident — whether you're fixing a frozen laptop, picking a new phone, or starting your first tech job.`,
        image: "/images/lessons/dl-1.png",
        imageAlt: "A friendly cutaway of a computer showing the CPU, memory, and storage connected to the internet",
        callout: {
          label: "Why it matters",
          text: "When something breaks — a slow phone, a website that won't load — knowing the parts involved helps you figure out what's actually wrong instead of just guessing or panicking.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "A quick plain-English glossary",
        body: `Before we dive in, here are the words we'll use a lot — explained simply, so nothing feels like a foreign language later. Don't memorize these; just read them once and they'll click as we go.\n\n• A **device** is any computer-like gadget you use: a phone, tablet, laptop, desktop, or a school Chromebook.\n• A **program** (or **app**, short for *application*) is a set of instructions that does a job — like the camera app, a game, or a web browser.\n• **Data** is just information stored as numbers a computer can handle — your photos, texts, and saved games are all data.\n• A **network** is a group of devices connected so they can send each other data — like everyone's phones connected to the same Wi-Fi.\n\nThat's it. Every other term in this lesson gets defined the first time it appears, right where you meet it.`,
        callout: {
          label: "Pro tip",
          text: "If a tech word ever confuses you, try swapping in its plain-English meaning from a glossary like this one. \"Open the application\" simply means \"open the app.\" Most jargon is just a fancy label for something simple.",
        },
      },
      {
        id: "hardware-software",
        kicker: "The big idea",
        title: "Hardware is what you can touch. Software is the instructions.",
        body: `Every computer is really two things working together:\n\n• **Hardware** is the physical stuff — the parts you could actually hold or knock on. The screen, keyboard, battery, chips, and cables are all hardware.\n• **Software** is the set of instructions that tells the hardware what to do. It's not physical — you can't hold software in your hand. Your games, your browser, TikTok, and the menus you tap are all software.\n\nHere's an easy way to remember it: hardware is like a **musical instrument**, and software is the **sheet music**. A guitar (hardware) can't play anything by itself. The music (software) tells it exactly what to do. And the *same* guitar can play a thousand different songs, just like the *same* phone can run thousands of different apps.\n\nNeither one is useful alone. Hardware without software is a fancy paperweight. Software without hardware is just an idea that can't run anywhere.`,
        image: "/images/lessons/dl-1-2.png",
        imageAlt: "Split illustration: on one side a physical phone, screen, and keyboard (hardware); on the other, app icons and gears representing software instructions",
        callout: {
          label: "Watch out",
          text: "People often blame \"the computer\" when something goes wrong, but it's usually the software (an app or the operating system) that's frozen — not the physical hardware. Knowing the difference helps you fix it faster.",
        },
      },
      {
        id: "inside",
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
      },
      {
        id: "os",
        kicker: "The manager",
        title: "The operating system runs the whole show",
        body: `If the CPU is the chef, who's the **manager** keeping the whole kitchen organized? That's the **operating system (OS)** — the main program that runs your entire device and lets everything else work.\n\nThe operating system sits between *you* and the *hardware*. When you tap an app, the OS makes the screen respond, hands the app some RAM to use, finds your files in storage, and keeps all the apps from crashing into each other. You're almost certainly using one of these right now:\n\n• **Windows** and **macOS** — on laptops and desktops.\n• **ChromeOS** — on Chromebooks, common in schools.\n• **iOS** (iPhone/iPad) and **Android** (most other phones) — on mobile devices.\n\nOn top of the OS run your **apps** — smaller programs built for specific jobs, like a browser, a game, or a notes app. Think of it like a school: the OS is the principal keeping the whole building running, and the apps are the individual classes happening inside it.`,
        callout: {
          label: "Pro tip",
          text: "When an app misbehaves, closing and reopening it (or restarting the whole device) gives the operating system a fresh start to clean up the mess. That's why \"have you turned it off and on again?\" actually works so often.",
        },
      },
      {
        id: "internet-web",
        kicker: "Getting connected",
        title: "The internet and the web are not the same thing",
        body: `People use "the internet" and "the web" as if they mean the same thing, but they don't:\n\n• **The internet** is the giant global **network** — millions of computers all over the world physically connected and able to send each other data. Picture it as the **roads** that connect every town.\n• **The web** (short for World Wide Web) is just *one thing* that travels on those roads: the pages and sites you open in a **browser**. Picture it as the **cars** driving on the roads.\n\nThe internet carries lots more than the web. Your texts, video calls, online games, and app updates all use the internet without being "the web." So the web is a *part* of the internet, not the whole thing.\n\nTo visit a site, you type a **URL** — the web address of a page, like \`kanam.academy\` — into a **browser**, which is the app you use to open web pages (Chrome, Safari, Edge, and Firefox are all browsers). The browser's whole job is to fetch web pages and show them to you.`,
        callout: {
          label: "Myth check",
          text: "Wi-Fi is NOT the internet. Wi-Fi is just the wireless way your device connects to your router at home or school. The router then connects to the actual internet through your internet company. You can have strong Wi-Fi and still have no internet if the connection beyond your router is down.",
        },
      },
      {
        id: "cloud-packets",
        kicker: "How data travels",
        title: "Packets, servers, and the truth about 'the cloud'",
        body: `So how does a video on a computer thousands of miles away end up on your screen?\n\nFirst, two roles. Your device is the **client** — the one that *asks* for things. A **server** is a powerful computer whose whole job is to *serve* up data when clients ask for it. (Same idea as a customer ordering and a waiter serving.)\n\nWhen you request something, the data doesn't arrive all at once. It's chopped into tiny pieces called **packets** — small labeled chunks of data — and they travel separately across the internet. Your device then reassembles them in the right order.\n\nThink of it like mailing a huge book one page at a time in numbered envelopes. The pages might take different routes, but the numbers let you put the book back together perfectly at the other end.\n\nAnd **"the cloud"**? It sounds magical, but it's just **other people's powerful computers (servers) sitting in giant warehouses called data centers**, which you reach over the internet. When you "save to the cloud," your file is really being stored on a real, physical server somewhere — not floating in the sky.`,
        callout: {
          label: "Common misconception",
          text: "\"The cloud\" is not magic and it's not the sky. It's real computers in real buildings, owned by companies, that you connect to over the internet. If those data centers lose power, \"the cloud\" goes down too.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "What really happens when you open a video",
        body: `Let's trace a single tap, from your finger to a playing video, step by step. There's no magic — just clients, packets, and servers doing their jobs.\n\n**Step 1 — You make a request.** You tap a video in an app. Your device (the **client**) sends a request out through your Wi-Fi to your **router** (the box at home or school that connects your devices to the internet). The router passes it to your **internet company** and onto the internet.\n\n**Step 2 — The request finds the server.** The request travels across the internet until it reaches the **server** (a computer in a **data center** — part of "the cloud") that stores that video.\n\n**Step 3 — The server replies in packets.** The server chops the video into thousands of tiny **packets** and sends them back toward you, each labeled with its order.\n\n**Step 4 — Your device reassembles and plays.** Your device collects the packets, puts them back in order, and the **CPU** processes them while **RAM** holds the part that's playing right now. The screen (an **output** device) shows you the video. This all happens in seconds — and it often starts playing before every packet has even arrived, which is why videos sometimes pause to "buffer" (wait for more packets to catch up).`,
        image: "/images/lessons/dl-1-3.png",
        imageAlt: "A phone requesting a video that travels as numbered packets from a distant data center server, through a router, back to the screen",
        callout: {
          label: "Pro tip",
          text: "When a video keeps buffering, packets are arriving too slowly — usually a weak connection between you and the server, not a problem with your screen or your CPU. That's why moving closer to the router often fixes it.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've just toured a whole computer and the internet it lives on. Quick recap:\n\n• **Hardware** is the physical parts; **software** is the instructions. The **CPU** thinks, **RAM** is short-term memory, **storage** keeps your files.\n• The **operating system** is the manager between you and the hardware, and **apps** run on top of it.\n• The **internet** is the global network (the roads); the **web** is the pages you view in a **browser** (the cars). Data travels as **packets** between your device (the **client**) and **servers**.\n• **"The cloud"** is just real servers in data centers you reach over the internet.\n\nWhen you're ready, switch to the **Knowledge check**, then write a quick reflection about a device you use.`,
      },
    ],
  },
  bigIdeas: [
    "**Hardware** is the physical parts you can touch; **software** is the instructions that run on it.",
    "The **CPU** thinks, **RAM** is short-term memory, and **storage** keeps files long-term.",
    "The **internet** is the global network; the **web** is the pages you view in a browser; **the cloud** is real servers in data centers.",
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
    "Streaming a show, sending a text, and saving a photo to Google Photos all rely on the same chain: your device (**client**) sends **packets** over the **internet** to a **server** in a **data center** (\"the cloud\") and back.",
  quiz: [
    {
      id: "q1",
      question: "Which of these is software, not hardware?",
      choices: [
        "The keyboard you type on",
        "The screen that shows the picture",
        "The web browser you tap to open",
        "The battery inside your phone",
      ],
      correctIndex: 2,
      explanation:
        "A web browser is a set of instructions (software). The keyboard, screen, and battery are all physical parts you can touch, which makes them hardware.",
    },
    {
      id: "q2",
      question: "Your phone keeps getting slow and laggy when you have lots of apps open at once, but you still have plenty of free space for photos. What is most likely running low?",
      choices: [
        "Storage",
        "RAM",
        "The CPU's battery",
        "Wi-Fi signal",
      ],
      correctIndex: 1,
      explanation:
        "RAM is short-term memory for what you're doing right now. Juggling many apps fills up RAM and causes lag. Storage is about saving files long-term, which is fine here since there's free space.",
    },
    {
      id: "q3",
      question: "What is the job of the operating system?",
      choices: [
        "To physically charge the battery",
        "To act as the manager between you and the hardware, running your apps",
        "To connect your house to the electricity grid",
        "To replace the internet",
      ],
      correctIndex: 1,
      explanation:
        "The operating system (like Windows, iOS, or Android) is the main software that manages the hardware, gives apps resources, and lets you interact with the device.",
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
      question: "When someone says a file is saved 'in the cloud,' where is it really?",
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
  ],
  reflection: {
    prompt:
      "Pick a device you used today. Name one piece of its hardware and one piece of software, and explain what the operating system does for it.",
    placeholder: "Example: My laptop's hardware is the screen; the software is Chrome; the OS (Windows) manages them both…",
  },
};
