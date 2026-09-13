import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt, choices, correctIndex, explanation,
});

export const digitalLesson1: AILessonConfig = {
  id: "dl-1",
  title: "1. Hardware vs Software",
  goal: "Tell hardware from software, then tell an app from the operating system — so you can explain a freeze, pick a device, and know which part to check first.",
  xpReward: 50,
  badge: "Device Smart",
  dashboardHref: "/dashboard",
  nextHref: "/learn/digital/2",
  instructorScript: `**Coach's note**
Today's lesson: **Hardware vs Software**.

**Goal:** Tell hardware from software, then tell an app from the operating system — so you can explain a freeze, pick a device, and know which part to check first.

**How to facilitate**
1. Warm-up: hold up a laptop or phone. Ask "Which parts can you touch? Which parts can you not?" Keep it concrete. Do not start with layers or abstraction.
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway — hardware is the stuff, software is the instructions.

**Watch for:** calling everything "the computer" or "the Wi-Fi." Push students to say hardware, software, app, or operating system.`,
  lessonModule: {
    durationLabel: "~25 min lesson",
    sections: [
      {
        id: "start",
        kicker: "Start here",
        title: "Two kinds of stuff in every device",
        body: `Your phone and your Chromebook are the same idea: **hardware** plus **software**.\n\n**Hardware** is the physical stuff — the parts you can point at, or that sit inside the case. Screen. Keyboard. Battery. The chip that does the work. The drive that keeps your files.\n\n**Software** is the instructions that tell that hardware what to do. You cannot hold an app. You cannot put "Chrome" in your backpack. It is a program.\n\nThat split is the whole first lesson. Almost every "my computer is broken" story is really "which of these two is the problem?"`,
        image: "/images/lessons/dl-1.png",
        imageAlt: "A laptop and phone — physical devices that also run programs",
        callout: { label: "The first question", text: "Can you touch it, or is it instructions? Hardware vs software." },
      },
      {
        id: "hardware",
        kicker: "Hardware",
        title: "The parts you can point at",
        body: `Name the hardware you already use.\n\n**Input** is how you talk to the device: touchscreen, keyboard, trackpad, camera, microphone.\n**Output** is how it talks back: screen, speakers, headphones.\n**Power** is the battery and charger.\n**The workhorses inside:** the **processor** (the chip that follows instructions), **RAM** (short-term workspace), and **storage** (where files stay when you shut the lid).\n\nA cracked screen is a hardware problem. A dead battery is a hardware problem. "The app won't open" usually is not.`,
        bullets: [
          "Processor: follows instructions, fast.",
          "RAM: temporary workspace. It clears when power is off.",
          "Storage: files and apps stay here after you shut down.",
        ],
        image: "/images/lessons/dl-1-2.png",
        imageAlt: "Physical device parts: screen, keyboard, and internals",
        checkIn: check(
          "Which of these is hardware?",
          ["The Photos app", "ChromeOS", "The battery", "A Google Doc"],
          2,
          "The battery is a physical part. Apps and the operating system are software.",
        ),
      },
      {
        id: "software",
        kicker: "Software",
        title: "Instructions — not a thing you can hold",
        body: `**Software** is a set of instructions. Someone wrote it. The hardware follows it.\n\nTwo kinds matter on day one:\n\n**Apps** (also called applications) are the tools you open on purpose: a browser, a slide deck, a scheduling app, a game.\nThe **operating system (OS)** is the software that runs the whole device — Windows, macOS, ChromeOS, iOS, Android. It starts when you turn the device on. Apps sit on top of it.\n\nAn app update is not the same as an OS update. One fixes a tool. The other changes how the whole device is managed.`,
        checkIn: check(
          "Which statement is true?",
          [
            "Chrome is hardware because you see it on the screen",
            "An app is software; the screen it appears on is hardware",
            "The operating system is hardware because it starts first",
            "Software is anything that uses Wi-Fi",
          ],
          1,
          "What you see can be software drawn on hardware. The screen is hardware. The browser is software.",
        ),
      },
      {
        id: "os",
        kicker: "The operating system",
        title: "The manager in the middle",
        body: `Think of the OS as the manager of the building.\n\nApps are the tenants. They want the camera, the files, the Wi-Fi, a slice of the processor. The OS decides who gets what, keeps apps from stepping on each other, and gives them a standard way to save a file or show a window.\n\nThat is why one OS update can fix (or break) many apps at once. And why an app cannot run if the OS will not let it — missing permission, not enough memory, or the wrong kind of device.`,
        checkIn: check(
          "What is the operating system's job, compared with an app?",
          [
            "It is just another single-purpose app",
            "It manages the whole device so apps can share the hardware",
            "It is only needed when you are online",
            "Apps talk to every hardware part by themselves, so the OS is optional",
          ],
          1,
          "Apps focus on one job. The OS runs the device underneath them.",
        ),
      },
      {
        id: "together",
        kicker: "Put it together",
        title: "You tap Submit. Hardware and software both work",
        body: `You finish a college application and tap **Submit**. It feels like one action.\n\n**Hardware:** your finger, the screen, the processor, the Wi-Fi radio.\n**Software:** the browser (an app) asks to send the form. The operating system gives that app memory and network access.\n\nIf the button looks fine but nothing happens, the problem might be the Wi-Fi (hardware + signal), your account (software/service), or the site itself. The button did not replace any of that. It just hid the messy steps so you could finish the form.`,
        image: "/images/lessons/dl-1-3.png",
        imageAlt: "A device sending a form over a network",
        checkIn: check(
          "Why can Submit still fail when the button looks fine?",
          [
            "The button replaces the hardware",
            "The hidden steps — network, account, or the site — can still break",
            "One tap means the device no longer needs software",
            "Buttons only fail when the screen is cracked",
          ],
          1,
          "A simple button starts a job. The hardware and software underneath still have to work.",
        ),
      },
      {
        id: "ram",
        kicker: "A common mix-up",
        title: "RAM is not storage",
        body: `People say "memory" for both. They are not the same.\n\n**RAM** is the desk. Open tabs, a video call, and a slideshow all sit on the desk at once. Close the lid / cut the power, and the desk is cleared.\n**Storage** is the filing cabinet. Your essay, photos, and installed apps stay there after shutdown.\n\nA Chromebook can have plenty of empty storage and still crawl in a meeting — the desk (RAM) is full, not the cabinet.`,
        table: {
          columns: ["Compare", "RAM", "Storage"],
          values: [
            ["Job", "What you are doing right now", "What you want to keep"],
            ["When power is off", "Clears", "Stays"],
            ["When it is full", "Device feels slow or apps crash", "You cannot save more files"],
          ],
          rowCount: 3,
        },
        checkIn: check(
          "A Chromebook slows down in a video meeting with lots of tabs. Storage is almost empty. What is the likely problem?",
          ["RAM", "Storage", "Screen brightness", "The file name"],
          0,
          "Open tabs and a live meeting compete for RAM. Empty storage does not fix that.",
        ),
      },
      {
        id: "diagnose",
        kicker: "Troubleshoot",
        title: "Is it hardware or software?",
        body: `Before you reset the whole laptop, ask a smaller question.\n\n**Only one app fails?** Start with that app — update it, check its settings, try another browser.\n**Every app fails after an update?** Look at the operating system.\n**It will not turn on, the screen is black, or the battery will not charge?** That is hardware or power.\n**Wi-Fi works for everyone else, just not you?** Device software or wireless hardware on *your* machine.\n\nChange one thing. Try again. If you cannot explain the fix, you will not be able to do it next time.`,
        checkIn: check(
          "One browser extension breaks one website. What should you try first?",
          [
            "Change every setting at once",
            "Turn off or test that extension before wiping the whole device",
            "Buy a new laptop",
            "Assume the storage drive failed",
          ],
          1,
          "One site + one extension is a software problem. Test that first.",
        ),
      },
      {
        id: "buy",
        kicker: "Choosing a device",
        title: "\"More storage\" is not a full answer",
        body: `Two students need a laptop. One writes papers, joins video calls, and uses shared docs. The other edits heavy video for a portfolio and carries the device all day.\n\nStorage number is easy to brag about. Also ask: is the **processor** fast enough? Is there enough **RAM** for the apps they leave open? Will the **battery** last? Can they actually carry it?\n\nHardware has to match the work. Software (the OS and the apps they need) has to run on that hardware.`,
        checkIn: check(
          "A student edits high-resolution video and carries the laptop all day. What is the strongest advice?",
          [
            "Any Chromebook is fine",
            "Pick the biggest storage number and ignore the rest",
            "Ignore hardware — apps do all the work",
            "Match processor, RAM, storage, and battery to that workload",
          ],
          3,
          "The work tells you which hardware matters. Storage alone is not the story.",
        ),
      },
      {
        id: "same-app",
        kicker: "Why this split helps",
        title: "Same app, different devices",
        body: `A shared slide deck can open on a phone and a laptop because the **app** asks for the same kinds of help — network, memory, a window — and each **operating system** translates that for its own **hardware**.\n\nYou do not need to know how the Wi-Fi radio works to click the link. The software hides those steps on purpose. Useful — until Wi-Fi drops, the account is locked, or the battery dies. Then the hidden steps become the whole problem.`,
      },
      {
        id: "impact",
        kicker: "Why it matters",
        title: "If you cannot name the part, you cannot get help",
        body: `“My computer is broken” is hard to fix. “The screen will not turn on” (hardware) or “Chrome will not load but other apps do” (software) gets you a real next step — from a teacher, a help desk, or yourself.\n\nThe same skill matters when a school or a first job hands you a required tool. You can ask: does this need a certain kind of hardware? Does it only work in one browser? What happens if I am offline?`,
      },
      {
        id: "ready",
        kicker: "Remember this",
        title: "Hardware is the stuff. Software is the instructions.",
        body: `**Hardware** — physical parts. Processor, RAM, storage, screen, battery, radios.\n**Software** — instructions. **Apps** are the tools you open. The **operating system** is the manager that runs the device.\n\nWhen something fails, name the part. When you pick a device, match the hardware to the work.`,
        checkIn: check(
          "Which sentence gets the split right?",
          [
            "Hardware and software are two names for the same thing",
            "Hardware is the physical parts; software is the instructions that run on them",
            "The operating system is hardware because you turn it on",
            "Apps are hardware because they have icons",
          ],
          1,
          "If you can hold it or point at the part, it is hardware. If it is a program, it is software.",
        ),
      },
    ],
  },
  bigIdeas: [
    "**Hardware** is the physical parts. **Software** is the instructions.",
    "An **app** is software you open for a job. The **operating system** is software that runs the whole device.",
    "**RAM** is the desk (clears when power is off). **Storage** is the filing cabinet (files stay).",
    "When something breaks, ask: hardware, app, or operating system — then change one thing.",
  ],
  keyTerms: [
    { term: "Hardware", definition: "The physical parts of a device: screen, keyboard, battery, processor, RAM, storage, radios." },
    { term: "Software", definition: "Instructions that tell the hardware what to do. You cannot hold it." },
    { term: "App (application)", definition: "Software you open for a job — a browser, a slide tool, a game." },
    { term: "Operating system", definition: "The software that runs the whole device and lets apps share the hardware. Examples: Windows, ChromeOS, iOS." },
    { term: "RAM", definition: "Short-term workspace. It clears when the power is off." },
    { term: "Storage", definition: "Where files and apps stay after you shut the device down." },
  ],
  realWorld: "Tapping Submit on a college application uses hardware (screen, processor, Wi-Fi) and software (the browser and the operating system). If it fails, name which part.",
  quiz: [
    {
      id: "q1",
      question: "Which list is only hardware?",
      choices: [
        "Chrome, Photos, and Docs",
        "Screen, battery, and storage drive",
        "Windows and ChromeOS",
        "A shared slide deck and a PDF",
      ],
      correctIndex: 1,
      explanation: "Those are physical parts. Apps and operating systems are software.",
    },
    {
      id: "q2",
      question: "What is software?",
      choices: [
        "Any part you can unscrew",
        "Instructions that tell the hardware what to do",
        "Only games",
        "Only things that use the internet",
      ],
      correctIndex: 1,
      explanation: "Software is a program. Hardware is the machine that runs it.",
    },
    {
      id: "q3",
      question: "How is an app different from the operating system?",
      choices: [
        "An app runs the whole device; the OS is one tool",
        "They are the same thing",
        "An app is a tool you open; the OS manages the whole device underneath",
        "The OS is hardware; apps are hardware too",
      ],
      correctIndex: 2,
      explanation: "You open apps for a job. The OS is always there, sharing hardware among them.",
    },
    {
      id: "q4",
      question: "RAM vs storage — which is right?",
      choices: [
        "Both keep files after you shut the laptop",
        "RAM is the short-term desk; storage keeps files when power is off",
        "Storage clears every time you close a tab",
        "RAM is only on phones",
      ],
      correctIndex: 1,
      explanation: "Full RAM makes a device feel slow. Full storage stops you from saving files.",
    },
    {
      id: "q5",
      question: "Why does an OS matter to more than one app?",
      choices: [
        "It gives each app its own physical computer",
        "It replaces apps",
        "It is only a wallpaper",
        "It shares the processor, memory, files, and devices among apps",
      ],
      correctIndex: 3,
      explanation: "Apps ask. The OS hands out hardware time and access.",
    },
    {
      id: "q6",
      question: "A share button looks fine but the file never arrives. What is the best first thought?",
      choices: [
        "The button replaced the Wi-Fi radio, so hardware cannot be the issue",
        "The hidden steps — network, account, or the site — may have failed",
        "Buttons never depend on software",
        "You should replace the laptop immediately",
      ],
      correctIndex: 1,
      explanation: "Simple controls hide real steps. Check those steps before you blame the whole device.",
    },
    {
      id: "q7",
      question: "Only one app crashes. Everything else is fine. What should you do first?",
      choices: [
        "Reset the entire operating system",
        "Check that app — update it, its settings, or try another tool",
        "Replace the battery",
        "Assume storage failed",
      ],
      correctIndex: 1,
      explanation: "One app failing points to software in that app, not the whole machine.",
    },
  ],
};
