import type { AIBonusActivity } from "@/components/ai/AILessonCanvas";

export const DIGITAL_INTERACTIVE_BY_LESSON: Record<string, AIBonusActivity[]> = {
  "dl-1": [
    {
      id: "dl1-parsons",
      kind: "parsons",
      title: "Layered request journey",
      prompt:
        "You open a shared presentation. Reorder the layers that make the request and response usable.",
      languageLabel: "process",
      lines: [
        "Your app turns the message into digital data",
        "The OS and network stack split data into packets",
        "Packets travel across routers toward the destination",
        "The server reassembles packets and stores or replies",
        "Your device receives the response and updates the screen",
      ],
      lineExplanations: [
        "Everything starts on your device: the app you typed in has to convert your words into digital data the computer can process. Without that first step, there is nothing for the network to send. Software on local hardware kicks off the whole trip.",
        "Next, the operating system and network stack chop that data into smaller packets with addressing info. Packets travel more reliably than one giant blob, and the OS is what manages this job for apps. Cause: big message; effect: many labeled pieces ready to ship.",
        "Only after packets exist can routers forward them hop by hop toward the destination. The internet is a path of machines handing packets along — not magic teleportation. Order matters: nothing useful moves until the stack has prepared the packets.",
        "At the other end, a server in the cloud (someone else's computers) must reassemble the packets before it can store your message or craft a reply. If reassembly came first, there would be nothing complete to process. This is why the cloud answer depends on a successful network arrival.",
        "Finally your device gets the response and the app updates the screen so you see the result. Feedback only makes sense after the server has answered. The loop closes: hardware and software on your side show what the remote computers returned.",
      ],
      explanation:
        "Hardware runs the software; the OS manages the trip; the internet moves packets; the cloud is just someone else's computers answering over the network.",
    },
    {
      id: "dl1-debug",
      kind: "debug",
      title: "Layer confusion",
      prompt: "A classmate explains a Chromebook freeze. Spot the real mistake.",
      contentLabel: "Buggy claim",
      buggyContent:
        '"RAM and storage are the same thing — both permanently keep your files, photos, and apps even after you shut the laptop down. The OS is optional; hardware runs apps by itself."',
      choices: [
        "RAM is temporary working memory; storage keeps files; the OS is required to run apps",
        "Storage empties every time you close a tab, so RAM is the only permanent place for files",
        "The OS only matters for phones, not laptops or desktops",
        "Cloud apps never use hardware, so RAM and storage don't matter",
      ],
      correctIndex: 0,
      hint: "What disappears when power cuts off — and what still manages apps?",
      explanation:
        "RAM is fast, temporary workspace. Storage (SSD/drive) keeps files when powered off. Software needs an OS to schedule hardware and run programs — hardware alone isn't enough.",
      imageSrc: "/images/lessons/dl-ex-devices.png",
      imageAlt: "Laptop cutaway showing CPU, RAM, storage, and network connection",
    },
    {
      id: "dl1-predict",
      kind: "predict",
      title: "Choose the first test",
      prompt:
        "Predict the most useful first layer to test in a device problem.",
      scenario:
        "You edit a paper in a browser-based Docs app while online.\nYou click Save / it auto-saves.\nYour laptop's Downloads folder is empty; you never exported a copy.",
      acceptedAnswers: [
        "cloud",
        "cloud only",
        "on the cloud server",
        "remote cloud storage",
      ],
      explanation:
        "Browser cloud apps store the live file on remote servers. Without Download/Export or offline sync to a local folder, it isn't sitting in Downloads on your hard drive.",
      placeholder: "local, cloud, or both?",
      imageSrc: "/images/lessons/dl-ex-devices.png",
      imageAlt: "Device connected to cloud storage over the internet",
    },
  ],

  "dl-2": [
    {
      id: "dl2-parsons",
      kind: "parsons",
      title: "Storage decision",
      prompt:
        "You finished a scholarship essay. Reorder a plan that protects access, integrity, and recovery.",
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
    {
      id: "dl2-debug",
      kind: "debug",
      title: "Storage-plan gap",
      prompt: "This student's storage plan is weak. What's the main problem?",
      contentLabel: "Buggy plan",
      buggyContent:
        'Folder: Desktop\nessay_FINAL_FINAL2 (no extension showing)\nHabit: "I only hit Save, never Save As. I renamed .docx to .jpg so it looks smaller. Cloud backup? I\'ll do it the night before it\'s due."',
      choices: [
            "Wrong/missing extensions break opening; Save As helps versions; last-minute backup is risky",
            "Cloud backups make file extensions unnecessary",
            "Save As deletes the original every time, so never use it",
            "Desktop folders can't hold documents, only images",
          ],
      correctIndex: 0,
      hint: "What does the extension tell the computer — and when do backups actually help?",
      explanation:
        "Extensions map files to the right app; renaming .docx to .jpg doesn't shrink it — it confuses openers. Versioned Save As plus early backups prevent deadline disasters.",
    },
    {
      id: "dl2-predict",
      kind: "predict",
      title: "Recovery outcome",
      prompt: "Predict what happens when they double-click this file.",
      scenario:
        "File name shown: budget_report.pdf\nThey renamed it from budget_report.xlsx by only changing the letters after the dot.\nThey did not export or convert in Excel/Sheets.\nThey double-click to open.",
      acceptedAnswers: [
        "won't open properly",
        "error or won't open",
        "pdf reader fails",
        "corrupted or wrong format",
      ],
      explanation:
        "Changing the extension doesn't convert the file. The bytes are still a spreadsheet; a PDF reader will fail or show garbage. Convert/export in the real app instead.",
      placeholder: "What happens?",
    },
  ],

  "dl-3": [
    {
      id: "dl3-parsons",
      kind: "parsons",
      title: "Network-aware search workflow",
      prompt:
        "You need current internship information. Reorder a network-aware, evidence-based search process.",
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
    {
      id: "dl3-debug",
      kind: "debug",
      title: "Result-ranking trap",
      prompt: "This search strategy mistakes ranking for trust. Spot the bug.",
      contentLabel: "Buggy search",
      buggyContent:
        'Query: best phones ever!!!! buy now cheap???\nSettings: first result only, ignore date and site filters\nRule: "If it\'s #1 on the page, it must be the most trustworthy source."',
      choices: [
            "The #1 result is legally required to be peer-reviewed",
            "Search engines ban all filters, so the plan is fine",
            "Exclamation marks always improve academic results",
            "Vague hype keywords + trusting rank alone; use precise terms, filters, and source checks",
          ],
      correctIndex: 3,
      hint: "What do keywords and filters control — and what does rank actually mean?",
      explanation:
        "Hype words and punctuation waste the query. Rank reflects relevance/ads/engagement, not automatic credibility. Precise keywords plus filters and source checks win.",
      imageSrc: "/images/lessons/dl-ex-search.png",
      imageAlt: "Search bar with keywords, operators, and filter chips",
    },
    {
      id: "dl3-predict",
      kind: "predict",
      title: "Query and source effect",
      prompt: "Predict which result set will be narrower and more on-topic.",
      scenario:
        "Goal: find .gov pages about teen sleep and screens from the last 5 years.\nQuery A: sleep screens teens\nQuery B: \"screen time\" sleep teens site:.gov after:2021\nSame search engine, no ads clicked.",
      acceptedAnswers: [
        "query b",
        "b",
        "the second query",
        "query b is narrower",
      ],
      explanation:
        "Quotes, site:.gov, and a date filter constrain results. Query B targets official pages on the exact phrase in a recent window; A is broad and noisy.",
      placeholder: "A or B?",
      imageSrc: "/images/lessons/dl-ex-search.png",
      imageAlt: "Filtered search results with site and date constraints",
    },
  ],

  "dl-4": [
    {
      id: "dl4-parsons",
      kind: "parsons",
      title: "Claim-and-platform check",
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
    {
      id: "dl4-debug",
      kind: "debug",
      title: "Culture-and-trust trap",
      prompt: "This claim-evaluation habit is broken. What's wrong?",
      contentLabel: "Buggy habit",
      buggyContent:
        'Post: shocking health claim with a dramatic screenshot\nCheck: "The site has a logo and a Comments section, so it\'s legit. I only read that one page. If it feels true, I share it to warn people."',
      choices: [
            "Screenshots can't be faked, so no further check is needed",
            "Comments sections are peer review equal to scientific journals",
            "Feeling + one page isn't enough — use lateral reading and source credibility checks",
            "Sharing first always helps fact-checkers find the truth faster",
          ],
      correctIndex: 2,
      hint: "What do professional fact-checkers do that staying on one page doesn't?",
      explanation:
        "Credible checking leaves the original page: who else covers it, what's the author's expertise, where's the primary evidence. Emotion and design aren't proof.",
      imageSrc: "/images/lessons/dl-ex-search.png",
      imageAlt: "Multiple browser tabs open for lateral reading of a claim",
    },
    {
      id: "dl4-predict",
      kind: "predict",
      title: "Rumor outcome",
      prompt:
        "Predict the most likely outcome if they share now without checking.",
      scenario:
        "A classmate forwards a screenshot: \"Local college just banned all laptops — share before it's deleted!\"\nNo link to a named outlet. No date. No confirmation on the college site or local news.\nThey hit Share to the class group.",
      acceptedAnswers: [
        "spreads misinformation",
        "rumor spreads",
        "false claim spreads",
        "misinfo goes viral in group",
      ],
      explanation:
        "Unverified screenshots travel faster than corrections. Without a traceable source, sharing mostly amplifies a rumor — and your name rides along with it.",
      placeholder: "What happens?",
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
    {
      id: "dl5-debug",
      kind: "debug",
      title: "Audience mismatch",
      prompt: "This message is going to a counselor. Identify the audience, tone, and context problem.",
      contentLabel: "Buggy email",
      buggyContent:
        "Subject: hey\n\nyo can u fix my schedule rn thx\n-sent from my phone",
      choices: [
            "Emails to staff must be handwritten, never typed",
            "Missing clear subject, greeting, context, and respectful tone for a professional ask",
            "Subject lines are illegal to customize in school systems",
            "Sign-offs are only allowed if you attach a résumé",
          ],
      correctIndex: 1,
      hint: "Would you send this to someone deciding a recommendation letter?",
      explanation:
        "Netiquette isn't about being stiff — it's about respect and clarity. A real subject, greeting, complete sentences, and context make adults more likely to help quickly.",
    },
    {
      id: "dl5-predict",
      kind: "predict",
      title: "Tone consequence",
      prompt: "Predict how the recipient is most likely to read this chat message and why a different channel may help.",
      scenario:
        "Group project chat after a teammate misses a deadline.\nMessage sent: \"Wow. Cool. Thanks for nothing.\"\nNo emoji clarifying joke. Sender meant sarcasm about the situation, not a personal attack.\nRecipient is stressed and skimming on their phone.",
      acceptedAnswers: [
        "hostile or rude",
        "sarcastic and mean",
        "passive-aggressive",
        "angry or disrespectful",
      ],
      explanation:
        "Text strips tone. Short sarcasm often lands as hostility. For teamwork (and future workplaces), state the issue plainly: what happened, what you need next.",
      placeholder: "How will it land?",
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
    {
      id: "dl6-debug",
      kind: "debug",
      title: "Access and permission gap",
      prompt: "This share setting caused a mess. What access, accountability, and inclusion choices are missing?",
      contentLabel: "Buggy share",
      buggyContent:
        "Doc: Senior Capstone — grades & private feedback notes\nLink: Anyone with the link → Editor\nPosted the link in a public class Discord\nNo owner assigned; comments disabled; version history ignored after a wipe",
      choices: [
            "Public edit links are required for all school assignments",
            "Comments always delete the document, so disabling them was correct",
            "Over-broad edit access on sensitive content; tighten permissions and use comments/history",
            "Shared docs can never use version history, so the wipe was unavoidable",
          ],
      correctIndex: 2,
      hint: "Who can edit — and should strangers reshape private notes?",
      explanation:
        "\"Anyone with the link can edit\" is dangerous for private work. Match permission to need, keep an owner, and recover mistakes with version history.",
      imageSrc: "/images/lessons/dl-ex-collab.png",
      imageAlt: "Shared document with permission levels and comment threads",
    },
    {
      id: "dl6-predict",
      kind: "predict",
      title: "Recover and coordinate",
      prompt: "Predict the best first recovery move, then the collaboration practice that prevents repeat confusion.",
      scenario:
        "Shared slides for a group presentation.\nOvernight, large sections were deleted and replaced with placeholder text.\nNobody knows who edited last.\nThe file still exists in the same Drive folder with version history enabled.",
      acceptedAnswers: [
        "restore version history",
        "use version history",
        "revert to earlier version",
        "restore previous version",
      ],
      explanation:
        "Cloud version history is built for this. Restore a known-good version, then tighten edit rights and use comments so the same wipe is harder to repeat.",
      placeholder: "What should they do?",
      imageSrc: "/images/lessons/dl-ex-collab.png",
      imageAlt: "Version history panel on a collaborative cloud file",
    },
  ],

  "dl-7": [
    {
      id: "dl7-parsons",
      kind: "parsons",
      title: "Identity impact audit",
      prompt:
        "You're evaluating your digital identity before college applications, scholarships, and job searches. Reorder a footprint and reputation review.",
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
    {
      id: "dl7-debug",
      kind: "debug",
      title: "Identity-control myth",
      prompt: "This advice about digital identity is incomplete. Spot the control and context mistake.",
      contentLabel: "Buggy advice",
      buggyContent:
        '"Private stories vanish forever after 24 hours, so colleges and employers can never see anything. Tagged photos don\'t count. Only your main feed matters — delete nothing."',
      choices: [
            "Private stories automatically wipe every copy on every device worldwide",
            "Screenshots, tags, archives, and search can preserve content beyond your feed",
            "Employers are legally banned from ever viewing social media",
            "Only email addresses form a digital footprint, not photos or comments",
          ],
      correctIndex: 1,
      hint: "What can outlive the original post even if the app says it expired?",
      explanation:
        "Ephemeral doesn't mean unreproducible. Tags, shares, screenshots, and indexed pages extend your footprint. Assume permanence when it matters.",
      imageSrc: "/images/lessons/dl-ex-footprint.png",
      imageAlt: "Timeline of posts, tags, and search results forming a digital footprint",
    },
    {
      id: "dl7-predict",
      kind: "predict",
      title: "Economic impact",
      prompt: "Predict what a careful reviewer is most likely to find first and how it could affect an opportunity.",
      scenario:
        "Applicant uses the same username on a public gaming forum and a résumé email.\nOld forum posts include trash-talk with slurs from three years ago, still public.\nMain Instagram is set to private and looks polished.\nReviewer Googles the username from the résumé.",
      acceptedAnswers: [
        "old forum posts",
        "public forum trash-talk",
        "gaming forum posts",
        "old public comments",
      ],
      explanation:
        "Search follows unique usernames across the open web. A private Instagram doesn't hide public forum history tied to the same handle.",
      placeholder: "What shows up?",
      imageSrc: "/images/lessons/dl-ex-footprint.png",
      imageAlt: "Search results revealing older public posts under the same username",
    },
  ],

  "dl-8": [
    {
      id: "dl8-parsons",
      kind: "parsons",
      title: "Harm-reduction response",
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
    {
      id: "dl8-debug",
      kind: "debug",
      title: "Equity response gap",
      prompt: "This response plan fails the target and leaves harmful conditions in place. What's wrong?",
      contentLabel: "Buggy plan",
      buggyContent:
        "Group chat: repeated insults and fake accounts targeting one student\nPlan: \"Ignore it forever. If I screenshot and post it publicly with laughing emojis, I'm helping. Reporting is snitching. The target should just log off.\"",
      choices: [
            "Logging off permanently is the required first step for every target",
            "Platforms ban all reporting features, so the plan is the only option",
            "Fake accounts are always harmless because names aren't real",
            "Ignoring + public mockery worsens harm; support, document, and report instead",
          ],
      correctIndex: 3,
      hint: "What helps the person being targeted without spreading the abuse?",
      explanation:
        "Cyberbullying thrives on audience and silence. Upstanders check in, preserve evidence, and use report paths. Re-sharing for laughs makes you part of the harm.",
    },
    {
      id: "dl8-predict",
      kind: "predict",
      title: "Escalation pathway",
      prompt: "Predict the most appropriate next action when online harm creates a safety risk.",
      scenario:
        "A student receives repeated threatening DMs from an anonymous account.\nThey already blocked once; new accounts keep appearing.\nSchool handbook lists a counselor and online-safety report form.\nThe messages include specific threats about seeing them at school tomorrow.",
      acceptedAnswers: [
        "tell a trusted adult",
        "report to school/adult",
        "report threats to adult",
        "contact counselor or admin",
      ],
      explanation:
        "Threats that spill into real-world safety need trusted adults and official channels, not DIY alone. Document, then escalate through school/platform reporting.",
      placeholder: "What should they do?",
    },
  ],

  "dl-9": [
    {
      id: "dl9-parsons",
      kind: "parsons",
      title: "Inclusive revision pass",
      prompt:
        "A club post excludes some viewers. Reorder a test-and-refine workflow.",
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
    {
      id: "dl9-debug",
      kind: "debug",
      title: "Equity deficit",
      prompt: "This design will fail part of the audience. Spot the bug.",
      contentLabel: "Buggy slide",
      buggyContent:
        "Title in light yellow on white\nBody: tiny decorative font in one long text box\nChart: red vs green only, no labels\nImages: generic alt text; auto-captions never checked\nCreator note: \"It works on my laptop, so the audience can adapt.\"",
      choices: [
            "Alt text is only for printed posters, never digital slides",
            "Accessibility tools ban the use of any images in school work",
            "Poor contrast, weak structure, color-only meaning, and untested alternatives create an equity deficit",
            "Decorative fonts always improve readability for every reader",
          ],
      correctIndex: 2,
      hint: "Who gets left out when contrast, size, and descriptions are ignored?",
      explanation:
        "The artifact gives some audiences less access to its message. Test contrast, structure, labels, alt text, and captions before export.",
    },
    {
      id: "dl9-predict",
      kind: "predict",
      title: "Export test",
      prompt: "Predict the most common viewer complaint.",
      scenario:
        "Club report exported as an image-only PDF.\nHeadings and links no longer work; charts use color alone.\nThe team never opens the final file on a phone or with zoom.\nMost people will view it on phones between classes.",
      acceptedAnswers: [
        "hard to navigate or read",
        "structure is lost",
        "image-only pdf is inaccessible",
        "charts are unclear",
      ],
      explanation:
        "An image-only export can lose selectable text, structure, links, and alternatives. Testing the final artifact reveals whether access features survived.",
      placeholder: "What's the complaint?",
    },
  ],

  "dl-10": [
    {
      id: "dl10-parsons",
      kind: "parsons",
      title: "IP tradeoff review",
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
    {
      id: "dl10-debug",
      kind: "debug",
      title: "Tradeoff error",
      prompt: "This credit plan is unsafe. What's the bug?",
      contentLabel: "Buggy plan",
      buggyContent:
        "Used a popular song + movie stills in a public YouTube essay\nAlso pasted AI-generated art labeled as \"original photos I took\"\nNote: \"Creators should control everything forever, so students never need access; but my school project can use any media without permission.\"",
      choices: [
            "AI images have no rules and can be claimed as personal photographs. That option sounds confident, but it leaves out the deciding constraint",
            "The plan ignores both sides of the tradeoff: permission and creator control matter, while access has lawful paths; AI use must be disclosed",
            "It can seem like any classroom purpose erases all copyright worldwide, but that reading skips the distinction this question is testing",
            "Picking “Creative Commons always means zero credit and commercial reuse” is a common mix-up that confuses a nearby idea with the right one",
          ],
      correctIndex: 1,
      hint: "Does \"school project\" automatically equal unlimited public reuse?",
      explanation:
        "A good decision neither treats IP as unlimited control nor as permission to take anything. Use lawful alternatives, follow license terms, and disclose AI assistance.",
    },
    {
      id: "dl10-predict",
      kind: "predict",
      title: "CC outcome",
      prompt: "Predict what they must do to stay within the license.",
      scenario:
        "Image license: CC BY (Creative Commons Attribution).\nAllowed: share and adapt, including commercially, if you give credit.\nStudent uses a cropped version in a public portfolio site.\nThey currently list no creator name, title, or license link.",
      acceptedAnswers: [
        "provide attribution",
        "give credit",
        "add attribution",
        "credit the creator",
      ],
      explanation:
        "CC BY permits reuse when you attribute. Cropping doesn't remove the credit requirement. No attribution = license not followed.",
      placeholder: "What's required?",
    },
  ],

  "dl-11": [
    {
      id: "dl11-parsons",
      kind: "parsons",
      title: "Security recommendation",
      prompt:
        "A school wants to protect student portal accounts. Reorder a recommendation that weighs safety, feasibility, and ethics.",
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
    {
      id: "dl11-debug",
      kind: "debug",
      title: "Phish spot",
      prompt: "This inbox message is dangerous. What's the real tell?",
      contentLabel: "Buggy email",
      buggyContent:
        "From: support@micr0soft-security-alert.com\nSubject: URGENT: account locked in 1 hour!!!\nBody: Click http://bit.ly/fix-now-paypa1 to verify password and SSN or lose access.\nStudent plan: \"It looks official and scary, so I'll enter everything on the link.\"",
      choices: [
            "Misspelled domains prove a message is extra authentic",
            "Bitly links are always run by the companies named in the subject",
            "Urgency, weird domain, shortened link, and asking for password/SSN — classic phishing",
            "Real security teams always demand your SSN by email within one hour",
          ],
      correctIndex: 2,
      hint: "Who benefits if you type your password into a rushed link?",
      explanation:
        "Phishing weaponizes fear and fake brands. Check the real domain, don't follow panic links, and never hand passwords or SSNs to an unexpected email.",
      imageSrc: "/images/lessons/dl-ex-phishing.png",
      imageAlt: "Suspicious email highlighting fake domain and urgent password request",
    },
    {
      id: "dl11-predict",
      kind: "predict",
      title: "Recommendation outcome",
      prompt: "Predict the most likely security outcome.",
      scenario:
        "Student portal has password-only login.\nMany students share family devices and some do not have reliable phone service.\nThe school wants fewer account takeovers without excluding students.\nA proposal adds MFA plus backup codes and a staffed recovery option.",
      acceptedAnswers: [
        "reduces takeovers with accessible support",
        "safer and feasible",
        "mfa plus recovery",
        "layered account security",
      ],
      explanation:
        "MFA reduces the harm from stolen passwords, while backup codes and staffed recovery address access constraints. It is stronger than a password-only rule without being needlessly exclusionary.",
      placeholder: "What happens next?",
      imageSrc: "/images/lessons/dl-ex-phishing.png",
      imageAlt: "Warning about reused passwords after a data breach",
    },
  ],

  "dl-12": [
    {
      id: "dl12-parsons",
      kind: "parsons",
      title: "Privacy tradeoff review",
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
    {
      id: "dl12-debug",
      kind: "debug",
      title: "Collection blind spot",
      prompt: "This privacy setup is broken. Spot the mistake.",
      contentLabel: "Buggy settings",
      buggyContent:
        "Wellness app: collects mood, sleep, precise location, contacts, and full browsing history forever\nPolicy: one long consent screen; data may be shared with unnamed partners\nAttitude: \"The service might help, so more data is always better.\"",
      choices: [
            "Accepting all cookies deletes your data from advertisers",
            "Flashlight apps legally require contacts and always-on location",
            "Posting vacation dates publicly always improves home security",
            "The proposal ignores necessity, meaningful consent, retention, and risks from linking sensitive data",
          ],
      correctIndex: 3,
      hint: "Does a flashlight need your contacts — and who can use an empty-house post?",
      explanation:
        "Potential benefit does not justify unlimited collection. A defensible policy limits data to the stated purpose and gives people real safeguards.",
      imageSrc: "/images/lessons/dl-ex-privacy.png",
      imageAlt: "Phone permission prompts and privacy toggles",
    },
    {
      id: "dl12-predict",
      kind: "predict",
      title: "Policy outcome",
      prompt: "Predict what advertisers can do more easily after this choice.",
      scenario:
        "A transit app needs location to provide turn-by-turn directions.\nIt requests location only while navigation is active, explains the purpose, and deletes route history after a short period.\nUsers can review settings later.\nThe app does not collect contacts or browsing history.",
      acceptedAnswers: [
        "data minimization",
        "proportionate collection",
        "privacy-protective design",
        "limited data collection",
      ],
      explanation:
        "The policy connects collection to a clear function, limits timing and retention, and avoids unrelated data. It provides useful service with fewer privacy costs.",
      placeholder: "What can they do?",
      imageSrc: "/images/lessons/dl-ex-privacy.png",
      imageAlt: "Browser cookie consent and cross-site tracking illustration",
    },
  ],

  "dl-13": [
    {
      id: "dl13-parsons",
      kind: "parsons",
      title: "Agency experiment",
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
    {
      id: "dl13-debug",
      kind: "debug",
      title: "One-size-fits-all myth",
      prompt: "This wellbeing plan misses the evaluation step. What's the bug?",
      contentLabel: "Buggy plan",
      buggyContent:
        "Goal: better sleep and less comparison stress\nPlan: scroll in bed until 2 a.m. \"to relax,\" keep all notifications on overnight, measure self-worth by likes, delete nothing — \"discipline alone will fix it without changing settings.\"",
      choices: [
            "Phone chargers in bed are required for healthy circadian rhythm",
            "Notifications improve deep sleep by keeping the brain alert",
            "Comparing likes is proven to increase REM sleep. That option sounds confident, but it leaves out the deciding constraint",
            "It treats all use as harmful and never identifies the desired benefit, context, or evidence for whether a strategy works",
          ],
      correctIndex: 3,
      hint: "What actually competes with sleep — willpower speeches or glowing screens?",
      explanation:
        "Willpower loses to design. Move chargers, mute nights, limit comparison apps, and protect wind-down. Boundaries beat vague promises.",
    },
    {
      id: "dl13-predict",
      kind: "predict",
      title: "Agency evidence",
      prompt: "Predict what evidence would show this strategy needs revision.",
      scenario:
        "Weeknight routine: phone in bed, bright screen, social feed until past midnight.\nAlarm for early class.\nNo Do Not Disturb; group chats ping overnight.\nSame pattern repeats most school nights.",
      acceptedAnswers: [
        "tired and unfocused",
        "worse focus next day",
        "sleep is disrupted",
        "strategy needs revision",
      ],
      explanation:
        "Late light, social stimulation, and overnight pings cut sleep quality. Next-day focus, mood, and performance usually take the hit.",
      placeholder: "How do they feel/perform?",
    },
  ],

  "dl-14": [
    {
      id: "dl14-parsons",
      kind: "parsons",
      title: "Reusable job-aid",
      prompt:
        "Wi-Fi works for others but your laptop won't load a site. Reorder systematic troubleshooting.",
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
    {
      id: "dl14-debug",
      kind: "debug",
      title: "Panic fix",
      prompt: "This troubleshooting approach is the real bug. Spot it.",
      contentLabel: "Buggy approach",
      buggyContent:
        "Symptom: one website won't load; others work; phone on same Wi-Fi loads it fine\nActions taken in 30 seconds: delete random system folders, install three \"optimizer\" apps, change every setting at once, restart nothing, write down nothing\nConclusion: \"The internet is permanently broken.\"",
      choices: [
            "Phones and laptops can never share the same Wi-Fi network",
            "If one site fails, every network worldwide is offline",
            "Optimizer apps are always the first required step for any error",
            "No isolation or one-change-at-a-time method; evidence points to a browser/device issue",
          ],
      correctIndex: 3,
      hint: "What already works — and what does that tell you to test next?",
      explanation:
        "Other sites + another device succeeding means the internet isn't \"dead.\" Narrow to browser cache, extensions, DNS, or laptop network stack — one change at a time.",
    },
    {
      id: "dl14-predict",
      kind: "predict",
      title: "Likely cause",
      prompt: "Predict the most likely layer of the problem.",
      scenario:
        "Streaming app error on a laptop.\nPhone on the same Wi-Fi streams fine.\nLaptop browses other sites fine.\nError started right after installing a new browser extension that blocks scripts.\nNo OS update happened today.",
      acceptedAnswers: [
        "browser extension",
        "the new extension",
        "extension blocking scripts",
        "browser-side issue",
      ],
      explanation:
        "Network and device basics look fine; timing matches a script-blocking extension. That's a classic isolate-the-variable win — disable the extension and retest.",
      placeholder: "What's most likely?",
    },
  ],

  "dl-15": [
    {
      id: "dl15-parsons",
      kind: "parsons",
      title: "Connected-work readiness",
      prompt:
        "You're preparing for internships or a first job. Reorder a career-ready digital setup.",
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
    {
      id: "dl15-debug",
      kind: "debug",
      title: "Work chat",
      prompt: "This remote-work habit will hurt them. What's wrong?",
      contentLabel: "Buggy habit",
      buggyContent:
        "Internship Slack/email style: leave managers on read for days, send \"idk lol\" as status updates, join Zoom muted with no camera and a chaotic background, track hours in a messy personal note with no shared sheet\nPublic LinkedIn: party photos as banner, email is partyking2009@...",
      choices: [
            "Unprofessional presence and unreliable communication break trust on remote teams",
            "Managers prefer unread messages as a sign of focus",
            "Shared spreadsheets are banned in modern workplaces",
            "\"idk lol\" is the standard status format in most offices",
          ],
      correctIndex: 0,
      hint: "What would a supervisor infer about reliability from this pattern?",
      explanation:
        "Remote work amplifies communication. Clear updates, basic meeting etiquette, shared tracking, and a credible public presence signal that you're hireable.",
    },
    {
      id: "dl15-predict",
      kind: "predict",
      title: "Sheet choice",
      prompt: "Predict the better tool for this task.",
      scenario:
        "Manager asks for a living list of applicants: name, email, status, interview date, notes.\nNeeds sorting, filtering, and multiple teammates editing the same file.\nOptions mentioned: a long group text thread vs a shared spreadsheet.",
      acceptedAnswers: [
        "shared spreadsheet",
        "spreadsheet",
        "sheets or excel",
        "shared sheet",
      ],
      explanation:
        "Structured rows/columns with shared edit access beat chat threads for tracking. Spreadsheets are a core workplace literacy skill for a reason.",
      placeholder: "Which tool?",
    },
  ],

  "dl-16": [
    {
      id: "dl16-parsons",
      kind: "parsons",
      title: "Impact action portfolio",
      prompt:
        "Capstone time: build your personal digital action plan. Reorder the audit.",
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
    {
      id: "dl16-debug",
      kind: "debug",
      title: "Portfolio gap",
      prompt: "This capstone portfolio looks complete but cannot support a recommendation. Spot the bug.",
      contentLabel: "Buggy action plan",
      buggyContent:
        "Audit notes: \"I'm fine.\"\nFixes: none scheduled\nSecurity: still reusing one password, 2FA off\nFiles: no backup\nFootprint: never searched own name\nWellbeing: phone in bed every night\nClosing line: \"I'll remember all 16 lessons mentally — writing a plan is unnecessary.\"",
      choices: [
            "Skipping backups is best practice for capstone portfolios — familiar wording, wrong fit for what the prompt is actually asking",
            "Picking “Searching your own name is illegal in most states” is a common mix-up that confuses a nearby idea with the right one",
            "It has no stakeholders, evidence, tradeoff analysis, success measure, or review date, so the recommendation cannot be evaluated",
            "Mental notes automatically enable 2FA on every account. That option sounds confident, but it leaves out the deciding constraint",
          ],
      correctIndex: 2,
      hint: "If nothing is scheduled, what actually changes next week?",
      explanation:
        "An audit without actions is theater. Write specific fixes (password manager, 2FA, backup, footprint cleanup, sleep boundary) and put them on a calendar.",
      imageSrc: "/images/lessons/dl-ex-devices.png",
      imageAlt: "Checklist covering security, files, footprint, and wellbeing",
    },
    {
      id: "dl16-predict",
      kind: "predict",
      title: "Week-one win",
      prompt: "Predict which single action most reduces account takeover risk first.",
      scenario:
        "Student finishes the digital toolkit audit.\nFindings: one reused password across email + shopping; 2FA off on email; solid file folders; decent search skills; phone bedtime still rough.\nThey can only complete one security task tonight before a busy week.",
      acceptedAnswers: [
        "turn on 2fa",
        "enable 2fa on email",
        "two-factor on email",
        "add 2fa",
      ],
      explanation:
        "Email is the reset key for everything else. Enabling 2FA there (then unique passwords) blocks many takeover paths even before the full cleanup is done.",
      placeholder: "Best first security move?",
      imageSrc: "/images/lessons/dl-ex-phishing.png",
      imageAlt: "Two-factor authentication prompt protecting an email account",
    },
  ],
};
