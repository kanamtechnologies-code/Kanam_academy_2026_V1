import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt, choices, correctIndex, explanation,
});

export const digitalLesson1: AILessonConfig = {
  id: "dl-1",
  title: "1. Computing Systems: Layers & Abstraction",
  goal: "Explain how abstractions hide implementation in everyday devices, and compare application software, system software, and hardware layers.",
  xpReward: 50,
  badge: "Systems Thinker",
  dashboardHref: "/dashboard",
  nextHref: "/learn/digital/2",
  instructorScript: `**Coach's note**
Today's lesson: **Computing Systems: Layers & Abstraction**.

**Goal:** Explain how abstractions hide implementation in everyday devices, and compare application software, system software, and hardware layers.

**How to facilitate**
1. Warm-up: ask students what they already think about "A device is a stack".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~25 min lesson",
    sections: [
      { id: "start", kicker: "Start here", title: "A device is a stack", body: `A Chromebook can run a browser, save a group-project deck, and play audio because several layers cooperate. You do not need to control every circuit to make good decisions about a system.\n\nThis lesson asks: **which layer is responsible for what?** That question helps you compare tools, explain failures, and recommend proportionate fixes.`, image: "/images/lessons/dl-1.png", imageAlt: "Laptop and phone representing everyday computing layers" },
      { id: "abstraction", kicker: "Core concept", title: "Abstraction makes complexity usable", body: `An **abstraction** gives you useful control while hiding implementation details. Tapping “submit” on a college application does not require you to route network traffic or write bits to storage.\n\nAn abstraction is a purposeful simplification, not magic. It reveals what a user needs and hides detail until that detail matters.`, checkIn: check("Why is a submit button an abstraction?", ["“It replaces hardware” describes a different situation than the one in the question stem", "It lets a user request an action without managing the underlying implementation", "It exposes every server setting” belongs to a different situation than the one in the question stem", "It eliminates all dependencies” belongs to a different situation than the one in the question stem"], 1, "The interface simplifies a complex operation; the underlying system still exists and can still fail.") },
      { id: "layers", kicker: "Compare", title: "Three layers, different responsibilities", body: `**Hardware** is physical: processor, memory, storage, screen, keyboard, radio, and battery. **System software**, especially an operating system, manages those shared resources. **Application software** serves a user goal: a browser, spreadsheet, editor, or messaging app.\n\nApplications request services; the operating system coordinates them; hardware performs physical operations.`, image: "/images/lessons/dl-1-2.png", imageAlt: "Physical device and application screen" },
      { id: "hardware", kicker: "Hardware", title: "Resources have specialized jobs", body: `A processor executes instructions. **RAM** holds active work for quick access and is temporary. **Storage** keeps files when power is off. Input hardware captures actions; output hardware presents results.\n\nA device with abundant storage can still struggle with many tabs if RAM is constrained. A fast processor cannot restore a file that was never saved.`, bullets: ["Processor: executes instructions.", "RAM: temporary workspace for active tasks.", "Storage: persistent files and applications."], checkIn: check("A Chromebook slows during a video meeting with many tabs open, but storage is mostly empty. Which constraint is most plausible?", ["RAM", "Storage", "Screen brightness", "File naming"], 0, "Many active tabs compete for temporary working memory; free storage does not remove that pressure.") },
      { id: "os", kicker: "System software", title: "The operating system coordinates the system", body: `The **operating system (OS)** schedules processor time, allocates memory, manages files and devices, and provides security boundaries. It gives applications standard ways to use a camera, store a document, or display a window.\n\nThis is why an OS update can improve compatibility for many applications at once—and why an app update is not the same thing as an OS update.`, checkIn: check("Which statement best compares an OS with an application?", ["Applications directly control every hardware part” belongs to a different situation than the one in the question stem", "An OS manages shared resources and provides services applications use", "An OS is a single-purpose app” belongs to a different situation than the one in the question stem", "An OS is only needed online” belongs to a different situation than the one in the question stem"], 1, "Applications focus on user tasks; the OS coordinates the shared system beneath them.") },
      { id: "example", kicker: "Trace the layers", title: "Opening a shared presentation", body: `A teammate taps a presentation link. The browser requests the file. The OS gives the browser network access, memory, and a display window. Network hardware sends and receives data. The processor renders slides and the screen displays them.\n\nEach layer contributes, but no layer must expose its full implementation to the one above it. That separation lets the same web app work across many devices.`, image: "/images/lessons/dl-1-3.png", imageAlt: "Device connecting to a remote service" },
      { id: "interface", kicker: "Interfaces", title: "Interfaces are agreements between layers", body: `An **interface** is an agreed way for one layer to request a service from another. A browser requests a file; it does not need to know how every network chip transmits a signal.\n\nInterfaces make systems modular. Developers can improve a lower layer without forcing every user to relearn the upper layer, provided the interface continues to work.` },
      { id: "hidden", kicker: "Evaluate", title: "Hidden does not mean unimportant", body: `A cloud-save button hides server location, account permissions, network availability, and storage policies. Those details matter if a group project contains private information or if an internship requires work offline.\n\nEvaluate an abstraction by asking: What does it simplify? What does it hide? What happens if the service, account, or connection fails?`, checkIn: check("A cloud editor is easy for a team to use, but the campus connection fails before a deadline. What is the strongest evaluation?", ["Cloud tools remove every reliability tradeoff” belongs to a different situation than the one in the question stem", "The screen is responsible” belongs to a different situation than the one in the question stem", "Its sharing benefit is real, but access depends on accounts and network service", "Cloud tools never store files” belongs to a different situation than the one in the question stem"], 2, "A sound evaluation recognizes both a benefit and the dependency the abstraction hides.") },
      { id: "compare", kicker: "Compare", title: "A first-job scheduling app", body: `The **application** lets you view shifts and request time off. The **OS** manages notifications, storage permission, and processor time. The **hardware** supplies the touchscreen, storage chip, network radio, and battery.\n\nA missing notification may be an app setting, an OS permission, or a connectivity issue. Compare evidence before changing settings.` },
      { id: "tradeoffs", kicker: "Tradeoffs", title: "High-level tools are not automatically best", body: `A template lets a student publish a résumé without designing every component. That speed is valuable. The same template may constrain layout, collect account data, or become unavailable when its service is down.\n\nThe best tool is not always the one that exposes the most detail. It is the one whose hidden complexity and limits fit the task.`, table: { columns: ["Question", "High-level tool", "Lower-level control"], values: [["Speed to begin", "Usually faster", "Usually slower"], ["Control over details", "Often limited", "Often greater"], ["Need to know implementation", "Less", "More"]], rowCount: 3 } },
      { id: "recommend", kicker: "Recommendation", title: "Recommend from a use case, not a slogan", body: `Two students are choosing devices. One needs browser research, video meetings, and shared documents; the other edits high-resolution portfolio video. “More storage” alone is not a sufficient recommendation.\n\nCompare workload, RAM, processor performance, storage, battery life, portability, and budget. Explain which resource supports each need.`, checkIn: check("Which recommendation is strongest for a student who edits high-resolution portfolio video and carries a device all day?", ["Assume every Chromebook is equally suited” belongs to a different situation than the one in the question stem", "Choose only the largest storage number” belongs to a different situation than the one in the question stem", "Ignore hardware because apps do all work” belongs to a different situation than the one in the question stem", "Compare processor, memory, storage, and battery against the workload"], 3, "A defensible recommendation connects resources to a specific workload and constraint.") },
      { id: "diagnose", kicker: "Troubleshoot", title: "Test the smallest plausible layer first", body: `Define the symptom; compare what still works; identify the narrowest plausible layer; change one thing; retest. If only one app fails, begin there. If every app fails after an OS update, investigate the system layer. If the device cannot power on, inspect hardware and power.\n\nAvoid changing five settings at once. A fix you cannot explain is difficult to repeat.`, checkIn: check("Which sequence best preserves evidence and minimizes disruption?", ["Change settings until the symptom disappears” belongs to a different situation than the one in the question stem", "Assume expensive hardware failed” belongs to a different situation than the one in the question stem", "Identify what works, test the affected layer, make one change, then retest", "Reset every device and reinstall unrelated software” belongs to a different situation than the one in the question stem"], 2, "Controlled, narrow tests lead to stronger conclusions and fewer new problems.") },
      { id: "impact", kicker: "Impact", title: "Abstraction shapes participation", body: `Accessible interfaces can let more people complete school, work, and civic tasks without specialist knowledge. Opaque systems can also make it hard to challenge errors, understand data collection, or recover from service failures.\n\nWhen a platform becomes essential for college applications or first-job scheduling, reliable access and clear support affect opportunity.` },
      { id: "ready", kicker: "Synthesize", title: "Explain the stack", body: `Application software supports a user task; system software coordinates shared resources; hardware performs physical operations. Abstractions and interfaces make that stack usable, but they also hide dependencies worth evaluating.\n\nUse this model to explain a device decision or targeted troubleshooting step.`, checkIn: check("Which claim best captures systems thinking?", ["Abstractions hide detail while layers divide responsibilities, helping people evaluate and diagnose systems", "You might defend “Every layer performs the same job” in casual talk, but it fails the definition used here", "You might defend “Interfaces eliminate all tradeoffs” in casual talk, but it fails the definition used here", "“Hardware is the only layer that matters” describes a different situation than the one in the question stem"], 0, "Layered models turn vague technology claims into explanations that can be tested and improved.") },
    ],
  },
  bigIdeas: ["**Abstraction** gives people useful controls while hiding implementation details.", "**Application software**, **system software**, and **hardware** have distinct responsibilities.", "Interfaces let layers work together and make computing systems modular.", "Evaluate benefits and hidden dependencies; diagnose the smallest plausible layer first."],
  keyTerms: [{ term: "Abstraction", definition: "A simplified model or interface that hides implementation details while preserving useful control." }, { term: "Hardware", definition: "Physical computing components such as processors, storage, displays, and network radios." }, { term: "System software", definition: "Software, including an operating system, that manages hardware and provides services for applications." }, { term: "Application software", definition: "Software designed for user tasks, such as a browser, spreadsheet, or scheduling app." }, { term: "Operating system", definition: "System software that manages resources, devices, files, security, and application execution." }, { term: "Interface", definition: "An agreed way for a person or one system layer to request services from another." }],
  realWorld: "Submitting a college application may feel like one click, but it relies on a browser, operating-system services, hardware, accounts, and network access.",
  quiz: [
    { id: "q1", question: "Which comparison is accurate?", choices: [
            "A browser is hardware because it displays a form” belongs to a different situation than the one in the question stem",
            "An OS is hardware because it starts first” belongs to a different situation than the one in the question stem",
            "A browser is application software; an OS provides services it uses; a screen is hardware",
            "“A screen is system software” describes a different situation than the one in the question stem",
          ], correctIndex: 2, explanation: "The browser supports a user task, the OS coordinates resources, and the screen presents output." },
    { id: "q2", question: "Why is a share button an abstraction?", choices: [
            "“It exposes server settings” describes a different situation than the one in the question stem",
            "It guarantees access forever” belongs to a different situation than the one in the question stem",
            "“It replaces the OS” describes a different situation than the one in the question stem",
            "It lets a user request sharing without managing storage and network implementation",
          ], correctIndex: 3, explanation: "The interface simplifies a complex service but does not remove dependencies." },
    { id: "q3", question: "Why does an OS matter to several applications?", choices: [
            "It gives each app ownership of hardware” belongs to a different situation than the one in the question stem",
            "It replaces applications” belongs to a different situation than the one in the question stem",
            "It is only a visual theme” belongs to a different situation than the one in the question stem",
            "It coordinates memory, storage, devices, and security services",
          ], correctIndex: 3, explanation: "An OS manages resources that multiple applications need." },
    { id: "q4", question: "A team chooses a cloud slide tool. Which tradeoff should they evaluate?", choices: [
            "Whether it removes storage needs” belongs to a different situation than the one in the question stem",
            "Whether it makes the OS unnecessary” belongs to a different situation than the one in the question stem",
            "Whether account access and network availability could prevent work at a critical time",
            "“Whether it hides the keyboard” describes a different situation than the one in the question stem",
          ], correctIndex: 2, explanation: "Shared access is valuable, but it depends on services and permissions." },
    { id: "q5", question: "Which device recommendation is most defensible?", choices: [
            "“Ignore hardware” describes a different situation than the one in the question stem",
            "Pick only the largest storage number” belongs to a different situation than the one in the question stem",
            "Assume every device supports every media task” belongs to a different situation than the one in the question stem",
            "Match processor, RAM, storage, battery, and portability to the workload",
          ], correctIndex: 3, explanation: "Recommendations should connect resources to actual requirements." },
    { id: "q6", question: "A single browser extension breaks one web app. What should happen first?", choices: [
            "Change every setting at once” belongs to a different situation than the one in the question stem",
            "Test the extension or browser layer before resetting the whole system",
            "Replace every device” belongs to a different situation than the one in the question stem",
            "Assume storage failed” belongs to a different situation than the one in the question stem",
          ], correctIndex: 1, explanation: "The symptom is isolated to a narrow layer, so test that layer first." },
    { id: "q7", question: "What is the main benefit of thinking in layers?", choices: [
            "It helps isolate likely causes and choose a proportionate next test",
            "It guarantees a quick fix” belongs to a different situation than the one in the question stem",
            "It lets you skip evidence” belongs to a different situation than the one in the question stem",
            "It proves hardware never fails” belongs to a different situation than the one in the question stem",
          ], correctIndex: 0, explanation: "Layered reasoning replaces vague blame with evidence-based action." },
  ],
  reflection: { prompt: "Choose a device task you use for school, college planning, or work. Explain the application, system software, and hardware involved; identify one useful abstraction and one dependency it hides.", placeholder: "A browser submits my application; ChromeOS manages memory and network access; the Wi-Fi radio transmits data. The submit button hides the network steps, but it depends on my account and connection…" },
};
