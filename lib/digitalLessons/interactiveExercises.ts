import type { AIBonusActivity } from "@/components/ai/AILessonCanvas";

export const DIGITAL_INTERACTIVE_BY_LESSON: Record<string, AIBonusActivity[]> = {
  "dl-1": [
    {
      id: "dl1-parsons",
      kind: "parsons",
      title: "Tap a link — in order",
      prompt:
        "You tap a shared presentation on your laptop. Put these steps in the order they actually happen.",
      languageLabel: "process",
      lines: [
        "Your finger and the screen (hardware) notice the tap",
        "The browser app (software) asks for the file",
        "The operating system (software) gives the app memory and Wi-Fi access",
        "The Wi-Fi radio (hardware) sends the request",
        "The screen (hardware) shows the slides",
      ],
      lineExplanations: [
        "Hardware first: the screen and your finger are physical. No tap, no request.",
        "Then software: the browser is an app. It is the tool that knows you want that file.",
        "The operating system is also software. It is the manager that lets the browser use memory and the network.",
        "Hardware again: the radio has to send a real signal. Software cannot skip the radio.",
        "The slides only appear after the file comes back and the screen (hardware) draws them.",
      ],
      explanation:
        "Hardware notices the tap and sends the signal. Software (the app and the OS) decides what the tap means and uses the hardware to finish the job.",
    },
  ],

  "dl-2": [
    {
      id: "dl2-parsons",
      kind: "parsons",
      title: "Storage decision",
      prompt:
        "You finished a scholarship essay. Put these steps in the order that keeps the right file and a backup.",
      languageLabel: "process",
      lines: [
        "Save the working file with a clear name and folder",
        "Use Save As (or export) if you need a new version or format",
        "Confirm the file extension matches the app (.docx, .pdf, etc.)",
        "Copy or sync a backup to cloud or an external drive",
        "Check that the backup opens before you close everything",
      ],
      lineExplanations: [
        "First lock in your working copy: Save with a clear name and folder so you know where the live essay lives. If you skip this, later steps have no reliable master file to version or back up. Cause: unfinished edits on screen; effect: a durable file on disk.",
        "Save As or export comes next when you need a new version or format without overwriting the original by accident. You can only branch a file that already exists and is saved. That creates a second copy for drafts, PDFs, or milestones.",
        "After naming and format choices, confirm the extension matches the app (.docx, .pdf, and so on). Extensions tell the computer which program should open the file; a wrong suffix breaks opening later. Checking now prevents a fake \"conversion\" by renaming alone.",
        "Only then copy or sync a backup to cloud or an external drive. Backing up before the file is correctly saved and typed just duplicates a broken or incomplete work. A second location protects you if the laptop fails or the folder gets deleted.",
        "Last, open the backup to prove it works before you close everything. An unverified backup is wishful thinking — corruption or a sync miss only shows up when you try. Cause: you need insurance; effect: you confirm the spare copy actually opens.",
      ],
      explanation:
        "Save updates the current file; Save As creates a new copy or format. Extensions tell apps how to open files. Backups only count if you verify they work.",
    },
  ],

  "dl-3": [
    {
      id: "dl3-parsons",
      kind: "parsons",
      title: "Search like you mean it",
      prompt:
        "You need a current internship listing. Put the search steps in a useful order.",
      languageLabel: "process",
      lines: [
        "Define the question and pick precise keywords",
        "Add operators or filters (quotes, site, date, type)",
        "Scan results for source quality, not just top rank",
        "Open promising pages and check author, date, evidence",
        "Refine keywords if results are off-topic or weak",
      ],
      lineExplanations: [
        "Start by defining the research question and choosing precise keywords. Vague hype words send the engine hunting in the wrong places. Clear terms are the cause of focused results later.",
        "Once you know what you're asking, add operators or filters (quotes, site, date, type) to narrow the search. Filters only help after keywords exist — otherwise you're constraining noise. Cause: broad query; effect: tighter, more useful hits.",
        "With a filtered list on screen, scan for source quality instead of trusting top rank alone. Rank reflects relevance, ads, or engagement — not automatic credibility. Judgment at this stage decides which links deserve your time.",
        "Open the promising pages and check author, date, and evidence before you cite them. Skimming titles isn't verification; you need proof on the page. This step turns a shortlist into sources you can defend.",
        "If results are still off-topic or weak, refine the keywords and run another pass. Search is iterative: what you learned from weak results becomes better queries. Stopping at the first dump leaves you with junk for the paper.",
      ],
      explanation:
        "Good search is iterative: keywords → operators/filters → judgment → verify → refine. Ranking alone isn't a trust score.",
    },
  ],

  "dl-4": [
    {
      id: "dl4-parsons",
      kind: "parsons",
      title: "SIFT before you share",
      prompt:
        "A scholarship claim spreads through your feed. Put a SIFT-style verification sequence in order.",
      languageLabel: "process",
      lines: [
        "Stop — don't share while emotions are high",
        "Investigate the source (who published, what's their track record)",
        "Find better coverage with lateral reading (new tabs, other outlets)",
        "Trace claims back to original evidence or data",
      ],
      lineExplanations: [
        "Stop first — don't share while emotions are high. Anger or shock is exactly when rumors spread fastest, and a share puts your name on the claim. Pausing breaks the impulse that turns one post into a class-wide rumor.",
        "Next investigate the source: who published it and what track record they have. Design and drama aren't proof, so you need to know whether the publisher is reliable. Cause: unknown origin; effect: you decide if the page deserves trust.",
        "Then leave the original page for lateral reading — new tabs and other outlets. Staying on one site locks you into its framing; comparing coverage reveals consensus or red flags. This is how fact-checkers avoid getting trapped by a single polished page.",
        "Finally trace the claim back to original evidence or data. Summaries and screenshots can distort; primary sources show what was actually said or measured. Only after that chain of checks should you decide whether the claim is shareable.",
      ],
      explanation:
        "SIFT slows you down on purpose: pause, check the source, read sideways across the web, then trace the claim. Sharing first is how rumors scale.",
    },
  ],

  "dl-5": [
    {
      id: "dl5-parsons",
      kind: "parsons",
      title: "Channel and email plan",
      prompt:
        "You evaluated email as the right channel for a teacher or internship contact. Reorder a professional, actionable message structure.",
      languageLabel: "process",
      lines: [
        "Write a specific subject line that states the purpose",
        "Open with a polite greeting and your name/context",
        "State the ask or update in short, direct sentences",
        "Add only needed details or attachments",
        "Close with thanks and a professional sign-off",
      ],
      lineExplanations: [
        "Lead with a specific subject line that states the purpose. Busy readers decide whether to open from the subject alone, so \"hey\" hides the ask. Cause: clear purpose up front; effect: your email gets found and prioritized.",
        "Open next with a polite greeting plus your name and context so they know who you are. Without that, the ask feels abrupt or anonymous. Respect and identity set the tone before you request anything.",
        "Then state the ask or update in short, direct sentences. Buried requests get missed; clarity beats slang because text already reads colder than speech. This is the core job of the message — everything else supports it.",
        "Add only needed details or attachments after the ask is clear. Extra fluff before the point wastes time; extras after it answer \"what do you need from me?\" Cause: focused request; effect: supporting info without a wall of text.",
        "Close with thanks and a professional sign-off so the thread ends cleanly. A polite ending signals respect and makes reply easier. Skipping it can make a fine ask feel careless or unfinished.",
      ],
      explanation:
        "Good email is scannable: subject → who you are → clear ask → essentials → polite close. Tone online reads colder than you intend, so clarity beats slang.",
    },
  ],

  "dl-6": [
    {
      id: "dl6-parsons",
      kind: "parsons",
      title: "Connected team setup",
      prompt:
        "Your team includes people with different schedules and access needs. Put an inclusive, accountable collaboration setup in order.",
      languageLabel: "process",
      lines: [
        "Create the file in a shared drive or team folder",
        "Set permissions (view vs comment vs edit) for each person",
        "Agree on naming, owners, and how you'll use comments",
        "Edit in the live doc and leave comments instead of silent overwrites",
        "Use version history if something important gets changed by mistake",
      ],
      lineExplanations: [
        "Create the file in a shared drive or team folder first so everyone works from one living copy. Emailing attachments creates conflicting versions immediately. Cause: one home for the project; effect: collaboration can actually start.",
        "Set permissions next — view, comment, or edit — for each person. Broad \"anyone can edit\" links on sensitive work invite accidents and leaks. Matching access to need protects the file before people start changing it.",
        "Agree on naming, owners, and how you'll use comments before heavy editing. Without roles, silent overwrites and \"final_final_v9\" chaos take over. Norms make the shared doc readable as a team system, not a free-for-all.",
        "Then edit in the live doc and leave comments instead of silent overwrites. Comments preserve discussion; silent deletes hide who changed what. This habit only works after permissions and norms exist.",
        "If something important gets wiped, use version history to restore a known-good state. History is the safety net for mistakes that still happen in live editing. Documenting recovery beats rebuilding from memory.",
      ],
      explanation:
        "Cloud collab works when access is intentional, roles are clear, and history/comments replace \"final_final_v9\" chaos on email.",
    },
  ],

  "dl-7": [
    {
      id: "dl7-parsons",
      kind: "parsons",
      title: "Search your own name",
      prompt:
        "College apps are coming. Put these steps in order for a look at what you leave behind online.",
      languageLabel: "process",
      lines: [
        "List accounts where you post or appear (active footprint)",
        "Search your name and common usernames (passive footprint too)",
        "Decide what still represents you well for school/work",
        "Remove, archive, or privacy-lock what you wouldn't show a reviewer",
        "Set ongoing habits so new posts match the reputation you want",
      ],
      lineExplanations: [
        "Begin by listing accounts where you post or appear — your active footprint. You can't clean what you haven't inventoried. Cause: map of your public voice; effect: a checklist of places to review.",
        "Then search your name and common usernames for the passive footprint others or platforms keep. Tags, old forums, and indexed pages may show up even if your main feed looks polished. Reviewers often find those first.",
        "With both active and passive traces visible, decide what still represents you well for school or work. Reputation is long-lived, so this judgment step filters keep vs change. Skipping it leads to random deletes that miss the real risks.",
        "Remove, archive, or privacy-lock anything you wouldn't show a reviewer. Action follows judgment — cleaning before you know the full picture leaves gaps. Cause: content that undermines you; effect: a footprint closer to the portfolio you want.",
        "Finally set ongoing habits so new posts match that reputation. A one-time purge fails if next week's posts recreate the problem. Maintenance turns a cleanup into lasting digital citizenship.",
      ],
      explanation:
        "Active posts are what you publish; passive traces are what others or platforms keep. Reputation is long-lived — treat it like a public portfolio.",
    },
  ],

  "dl-8": [
    {
      id: "dl8-parsons",
      kind: "parsons",
      title: "Help without making it worse",
      prompt:
        "You see targeted harassment in a group chat. Put a harm-reduction response in order without amplifying the attack.",
      languageLabel: "process",
      lines: [
        "Recognize the behavior as harmful, not \"just a joke\"",
        "Support the target privately if it's safe (check in, don't pile on)",
        "Document evidence (screenshots, dates) without spreading it further",
        "Report through the platform and/or a trusted adult or school channel",
        "Avoid amplifying the attack with public call-outs that re-share abuse",
      ],
      lineExplanations: [
        "First recognize the behavior as harmful, not \"just a joke.\" Naming the harm correctly is what moves you from bystander to upstander. If you minimize it, every later step feels optional.",
        "Support the target privately if it's safe — check in without piling on in the public thread. Private support helps the person without giving the attack a bigger audience. Cause: someone is being hurt; effect: they know they're not alone.",
        "Document evidence with screenshots and dates without spreading it for entertainment. Reports need proof, but re-sharing the abuse as content makes you part of the harm. Save it for official channels, not for laughs.",
        "Report through the platform and/or a trusted adult or school channel so people with power to intervene can act. DIY silence or public pile-ons rarely stop targeted harassment. Evidence plus a real report path is how systems respond.",
        "Throughout, avoid amplifying the attack with public call-outs that re-share the abuse. Spectacle grows the audience the harasser wanted. Responsible order ends with containment, not a second viral wave.",
      ],
      explanation:
        "Digital citizenship means upstander action: support, document, report through real channels — not silence, and not turning harm into more spectacle.",
    },
  ],

  "dl-9": [
    {
      id: "dl9-parsons",
      kind: "parsons",
      title: "Fix the flyer so more people can use it",
      prompt:
        "A club post leaves some people out. Put the fix-and-test steps in order.",
      languageLabel: "process",
      lines: [
        "Define the audience, purpose, and where the artifact will be used",
        "Build readable headings, labels, contrast, and alternatives to color-only meaning",
        "Add purposeful alt text and accurate captions or a transcript",
        "Export in a format that preserves structure and access features",
        "Test the final artifact in real viewing conditions and revise barriers",
      ],
      lineExplanations: [
        "Start by naming audience, purpose, device, and context. You cannot judge access without knowing who needs the information and how they will encounter it.",
        "Next build structure and visual access into the source: real headings, labels, readable contrast, and more than color alone. These choices reduce barriers before export.",
        "Then add text alternatives that communicate media's purpose. Alt text and reviewed captions give people access to meaning, not merely a compliance label.",
        "Export deliberately because a final file can lose links, reading order, or captions. The audience receives the export, not your editor view.",
        "Finally test on a phone, with zoom or grayscale, and in other real conditions. Use what fails to revise the artifact rather than assuming your first draft works for everyone.",
      ],
      explanation:
        "Inclusive creation is iterative: anticipate barriers, export carefully, test with real conditions, and refine when evidence shows an equity deficit.",
    },
  ],

  "dl-10": [
    {
      id: "dl10-parsons",
      kind: "parsons",
      title: "Can you use this song?",
      prompt:
        "You want to use an image in a public scholarship video. Reorder a responsible IP decision.",
      languageLabel: "process",
      lines: [
        "Identify the work, creator, and your planned audience or purpose",
        "Check permission, license conditions, or public-domain status",
        "Weigh creator benefit, access, cost, and whether a licensed alternative is available",
        "Choose a permitted use and record visible attribution requirements",
        "Disclose meaningful AI assistance and verify your final credits",
      ],
      lineExplanations: [
        "Identify the source and planned use first. The decision changes when a project is public, commercial, educational, or private.",
        "Next read actual permissions. Copyright is automatic; a download button or search result is not a license.",
        "Then analyze the tradeoff: IP can support the creator's income and control, while access and remix may benefit from a clear alternative license.",
        "Choose a permitted option and document its conditions. Credit supports honesty, but it does not replace permission.",
        "Finally disclose meaningful AI assistance and inspect visible credits before publishing. Transparency lets an audience evaluate the work honestly.",
      ],
      explanation:
        "IP analysis asks more than “did I credit it?” It weighs creator control, access, innovation, permission, and transparent AI-assisted work.",
    },
  ],

  "dl-11": [
    {
      id: "dl11-parsons",
      kind: "parsons",
      title: "Protect the school login",
      prompt:
        "A school wants to protect student portal accounts. Put a practical safety plan in order.",
      languageLabel: "process",
      lines: [
        "Name the threat and sensitive data at risk",
        "Choose proportionate controls such as unique passwords, MFA, updates, or backups",
        "Check whether people can use the controls with available devices and support",
        "Limit collection and offer accessible recovery or help paths",
        "Explain the recommendation and how people should report suspicious activity",
      ],
      lineExplanations: [
        "Start with the actual threat and data at risk so the control is proportionate rather than a generic checklist.",
        "Choose layered measures that reduce the most likely harm, such as MFA for account takeover or updates for known software risks.",
        "Test feasibility: a solution fails if people lack compatible devices, time, language support, or a way to recover access.",
        "Add ethical safeguards by collecting no more verification data than needed and offering accessible help instead of exclusion.",
        "End with clear reporting and response guidance. Awareness and official support are safer than attempting technical investigation alone.",
      ],
      explanation:
        "A defensible security recommendation connects threat, control, feasibility, and ethics. This is awareness depth; Cybersecurity goes deeper into technical defense.",
    },
  ],

  "dl-12": [
    {
      id: "dl12-parsons",
      kind: "parsons",
      title: "What should this app collect?",
      prompt:
        "A school is considering a new wellness app. Put an ethical privacy review in order.",
      languageLabel: "process",
      lines: [
        "Define the service benefit and the data it proposes to collect automatically",
        "Identify privacy, equity, safety, and economic risks for affected people",
        "Compare less invasive ways to provide the same benefit",
        "Set limits for consent, access, security, sharing, and retention",
        "Explain the policy and provide review, correction, or opt-out paths",
      ],
      lineExplanations: [
        "Start with a specific benefit and data inventory. Automated collection can be useful, so evaluation should identify rather than assume its purpose.",
        "Then identify harms: breaches, inaccurate inference, surveillance, unequal access, and data sharing can affect groups differently.",
        "Compare alternatives before accepting broad collection. Data minimization can often deliver the service without precise location, contacts, or indefinite tracking.",
        "Build safeguards into the design: meaningful consent, narrow access, encryption, limited sharing, and a defined retention period.",
        "Finish with transparency and accountability. People need understandable choices and a path to review, correct, or challenge harmful data practices.",
      ],
      explanation:
        "Privacy evaluation weighs benefits against social, economic, safety, legal, and ethical risks—then recommends proportionate safeguards.",
    },
  ],

  "dl-13": [
    {
      id: "dl13-parsons",
      kind: "parsons",
      title: "One week, one change",
      prompt:
        "Sleep and focus have been slipping. Reorder a realistic tech-habits reset.",
      languageLabel: "process",
      lines: [
        "Name the goal and the benefit this computing practice provides",
        "Collect evidence about its focus, sleep, attention, or ergonomic cost",
        "Design one condition change (defaults, notifications, workspace, or routine)",
        "Test the strategy while preserving the useful part of the practice",
        "Review evidence after a week and refine the strategy",
      ],
      lineExplanations: [
        "Notice which apps steal time, sleep, or mood before you rewrite your whole routine. Awareness names the real competitors so boundaries aren't vague. Cause: specific drains identified; effect: a target for change.",
        "Set concrete boundaries next — no-phone wind-down, app limits, focus blocks. Vague \"I'll have more discipline\" loses to designed apps. Written limits turn awareness into rules you can follow tonight.",
        "Change the environment: charger outside the bedroom, notifications off overnight. Willpower fails when the glowing screen is within arm's reach. Environment design makes the healthy choice the easy default.",
        "Replace scroll time with one offline or restorative option so the habit gap isn't empty. Removing a behavior without a substitute often brings the scroll back. A real alternative fills the time you freed.",
        "Review after a week and adjust what actually stuck. Healthy tech use is iterative, not a one-shot vow. Feedback lets you keep what works and rewrite what didn't.",
      ],
      explanation:
        "Personal agency is an evidence loop: evaluate the benefit and cost, redesign conditions, test, then refine. The aim is not to reject technology but to use it on purpose.",
    },
  ],

  "dl-14": [
    {
      id: "dl14-parsons",
      kind: "parsons",
      title: "Write the fix down",
      prompt:
        "Wi-Fi works for others, but your laptop will not load a site. Put the calm steps in order.",
      languageLabel: "process",
      lines: [
        "Define the symptom, expected behavior, and recent change",
        "Isolate the app, operating system, device, and network layers",
        "Research an official source and an independent credible source",
        "Run one safe test at a time and record the result",
        "Publish steps, evidence, and an escalation path another person can reuse",
      ],
      lineExplanations: [
        "Define the problem precisely — what fails, since when, on which device — before changing settings. Vague \"the internet is broken\" leads to random panic fixes. A clear symptom statement focuses every later test.",
        "Check the obvious next: cables, Wi-Fi icon, airplane mode, correct network. Many failures are simple misconnects, and skipping basics wastes time on deep fixes. Cause: often a toggle or wrong SSID; effect: quick recovery.",
        "Isolate variables by trying another site, device, or network. If your phone on the same Wi-Fi works, the whole internet isn't dead — you've narrowed the layer. Comparison evidence tells you where to dig.",
        "Apply one fix at a time — refresh, restart, forget/rejoin Wi-Fi — so you know what actually helped. Changing everything at once hides the real cause and can add new damage. Controlled experiments are how pros debug.",
        "Document what worked or escalate with clear details for the next helper. Without notes, the same failure returns and support starts from zero. Recording the fix closes the troubleshooting loop.",
      ],
      explanation:
        "A strong troubleshooting guide lets another user reproduce the diagnosis: define, isolate layers, compare sources, test one variable, and document evidence plus escalation.",
    },
  ],

  "dl-15": [
    {
      id: "dl15-parsons",
      kind: "parsons",
      title: "Show up ready for a first job",
      prompt:
        "Internship season. Put a simple get-ready list in order.",
      languageLabel: "process",
      lines: [
        "Evaluate the access needs and constraints of a connected workplace",
        "Build a professional presence and organized portfolio/work-samples folder",
        "Choose productivity tools that fit the data, task, and collaborators",
        "Set remote norms for agendas, accessible notes, ownership, and availability",
        "Keep timely, searchable updates that teammates can reuse",
      ],
      lineExplanations: [
        "Clean public profiles and choose a professional email first — reviewers often search you before they open your samples. partyking2009@ and chaotic banners undercut otherwise strong skills. Cause: first impression online; effect: you look hireable before they meet you.",
        "Organize files and a simple portfolio folder so you can send work samples quickly. Messy desktops cost time when an internship asks for examples tonight. Presence without ready artifacts still fails the \"show your work\" test.",
        "Practice core tools — docs, sheets, calendar, video meetings — because workplaces assume fluency. Trend apps fade; spreadsheet and calendar literacy stay. Tool comfort turns organized files into actual collaborative work.",
        "Set remote-work habits: mute/unmute, camera framing, shared agendas. Remote teams infer reliability from meeting etiquette and clarity. Skills without habits still look careless on Zoom.",
        "Keep communication timely and documented for teammates so managers aren't left on read. Clear status beats \"idk lol\" when trust is the currency of remote work. Ongoing documentation closes the career-ready loop.",
      ],
      explanation:
        "Connected workplaces create opportunity and access tradeoffs. Readiness combines professional presence, fit-for-purpose tools, and explicit norms that make remote collaboration dependable and inclusive.",
    },
  ],

  "dl-16": [
    {
      id: "dl16-parsons",
      kind: "parsons",
      title: "Write the plan, not just think it",
      prompt:
        "Capstone: put your personal digital plan in a useful order.",
      languageLabel: "process",
      lines: [
        "Define a personal or community digital practice and its stakeholders",
        "Gather evidence across systems, data, networks, and social impacts",
        "Evaluate benefits, harms, and access tradeoffs",
        "Recommend one action with an owner, timeline, and success measure",
        "Review evidence on the scheduled date and refine the portfolio",
      ],
      lineExplanations: [
        "Inventory devices, accounts, files, and key habits first so the audit is based on reality, not \"I'm fine.\" You can't prioritize blind spots you haven't listed. Cause: complete map; effect: risks become visible.",
        "Score risks across security, privacy, footprint, wellbeing, and collaboration next. Ranking turns a long inventory into triage instead of random panic cleaning. High scores tell you where a breach, rumor, or burnout is most likely.",
        "Pick three high-impact fixes you can finish this week. An audit without scheduled actions is theater; small concrete wins beat a giant mental to-do. Cause: prioritized risks; effect: real change on the calendar.",
        "Schedule recurring habits — backups, updates, password/2FA checks, boundaries — so fluency isn't a one-day purge. Living toolkits need maintenance or old problems return. Habits lock in the fixes after week one.",
        "Revisit monthly and adjust as school or work changes. New accounts, devices, and stressors shift the risk map. Iteration keeps the personal digital action plan useful instead of outdated notes.",
      ],
      explanation:
        "Impact evaluation is a living portfolio: define → gather evidence → weigh tradeoffs → act → measure and revise. It connects CS, DA, NI, and IC themes.",
    },
  ],
};
