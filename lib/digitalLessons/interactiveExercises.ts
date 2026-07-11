import type { AIBonusActivity } from "@/components/ai/AILessonCanvas";

export const DIGITAL_INTERACTIVE_BY_LESSON: Record<string, AIBonusActivity[]> = {
  "dl-1": [
    {
      id: "dl1-parsons",
      kind: "parsons",
      title: "Packet journey",
      prompt:
        "You hit send on a message. Reorder how data typically travels from your device to a server in the cloud.",
      languageLabel: "process",
      lines: [
        "Your app turns the message into digital data",
        "The OS and network stack split data into packets",
        "Packets travel across routers toward the destination",
        "The server reassembles packets and stores or replies",
        "Your device receives the response and updates the screen",
      ],
      explanation:
        "Hardware runs the software; the OS manages the trip; the internet moves packets; the cloud is just someone else's computers answering over the network.",
    },
    {
      id: "dl1-debug",
      kind: "debug",
      title: "Device myth",
      prompt: "A classmate posts this explanation. Spot the real mistake.",
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
      title: "Where's the file?",
      prompt:
        "Predict where the document actually lives after this save — local only, cloud only, or both synced.",
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
      title: "Backup habit",
      prompt:
        "You finished a scholarship essay. Put a solid save-and-backup sequence in order.",
      languageLabel: "process",
      lines: [
        "Save the working file with a clear name and folder",
        "Use Save As (or export) if you need a new version or format",
        "Confirm the file extension matches the app (.docx, .pdf, etc.)",
        "Copy or sync a backup to cloud or an external drive",
        "Check that the backup opens before you close everything",
      ],
      explanation:
        "Save updates the current file; Save As creates a new copy or format. Extensions tell apps how to open files. Backups only count if you verify they work.",
    },
    {
      id: "dl2-debug",
      kind: "debug",
      title: "File fail",
      prompt: "This student's file plan keeps breaking. What's the real bug?",
      contentLabel: "Buggy plan",
      buggyContent:
        'Folder: Desktop\nessay_FINAL_FINAL2 (no extension showing)\nHabit: "I only hit Save, never Save As. I renamed .docx to .jpg so it looks smaller. Cloud backup? I\'ll do it the night before it\'s due."',
      choices: [
        "Wrong/missing extensions break opening; Save As helps versions; last-minute backup is risky",
        "Desktop folders can't hold documents, only images",
        "Save As deletes the original every time, so never use it",
        "Cloud backups make file extensions unnecessary",
      ],
      correctIndex: 0,
      hint: "What does the extension tell the computer — and when do backups actually help?",
      explanation:
        "Extensions map files to the right app; renaming .docx to .jpg doesn't shrink it — it confuses openers. Versioned Save As plus early backups prevent deadline disasters.",
    },
    {
      id: "dl2-predict",
      kind: "predict",
      title: "Open attempt",
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
      title: "Search workflow",
      prompt:
        "You need reliable sources for a research paper. Reorder a pro search process.",
      languageLabel: "process",
      lines: [
        "Define the question and pick precise keywords",
        "Add operators or filters (quotes, site, date, type)",
        "Scan results for source quality, not just top rank",
        "Open promising pages and check author, date, evidence",
        "Refine keywords if results are off-topic or weak",
      ],
      explanation:
        "Good search is iterative: keywords → operators/filters → judgment → verify → refine. Ranking alone isn't a trust score.",
    },
    {
      id: "dl3-debug",
      kind: "debug",
      title: "Search slip",
      prompt: "This search strategy keeps returning junk. Spot the bug.",
      contentLabel: "Buggy search",
      buggyContent:
        'Query: best phones ever!!!! buy now cheap???\nSettings: first result only, ignore date and site filters\nRule: "If it\'s #1 on the page, it must be the most trustworthy source."',
      choices: [
        "Vague hype keywords + trusting rank alone; use precise terms, filters, and source checks",
        "Search engines ban all filters, so the plan is fine",
        "Exclamation marks always improve academic results",
        "The #1 result is legally required to be peer-reviewed",
      ],
      correctIndex: 0,
      hint: "What do keywords and filters control — and what does rank actually mean?",
      explanation:
        "Hype words and punctuation waste the query. Rank reflects relevance/ads/engagement, not automatic credibility. Precise keywords plus filters and source checks win.",
      imageSrc: "/images/lessons/dl-ex-search.png",
      imageAlt: "Search bar with keywords, operators, and filter chips",
    },
    {
      id: "dl3-predict",
      kind: "predict",
      title: "Query effect",
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
      title: "SIFT check",
      prompt:
        "A viral claim hits your feed. Put a SIFT-style verification sequence in order.",
      languageLabel: "process",
      lines: [
        "Stop — don't share while emotions are high",
        "Investigate the source (who published, what's their track record)",
        "Find better coverage with lateral reading (new tabs, other outlets)",
        "Trace claims back to original evidence or data",
      ],
      explanation:
        "SIFT slows you down on purpose: pause, check the source, read sideways across the web, then trace the claim. Sharing first is how rumors scale.",
    },
    {
      id: "dl4-debug",
      kind: "debug",
      title: "Trust trap",
      prompt: "This verification habit is broken. What's wrong?",
      contentLabel: "Buggy habit",
      buggyContent:
        'Post: shocking health claim with a dramatic screenshot\nCheck: "The site has a logo and a Comments section, so it\'s legit. I only read that one page. If it feels true, I share it to warn people."',
      choices: [
        "Feeling + one page isn't enough — use lateral reading and source credibility checks",
        "Comments sections are peer review equal to scientific journals",
        "Screenshots can't be faked, so no further check is needed",
        "Sharing first always helps fact-checkers find the truth faster",
      ],
      correctIndex: 0,
      hint: "What do professional fact-checkers do that staying on one page doesn't?",
      explanation:
        "Credible checking leaves the original page: who else covers it, what's the author's expertise, where's the primary evidence. Emotion and design aren't proof.",
      imageSrc: "/images/lessons/dl-ex-search.png",
      imageAlt: "Multiple browser tabs open for lateral reading of a claim",
    },
    {
      id: "dl4-predict",
      kind: "predict",
      title: "Share outcome",
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
      title: "Email build",
      prompt:
        "You're emailing a teacher or internship contact. Reorder a clear message structure.",
      languageLabel: "process",
      lines: [
        "Write a specific subject line that states the purpose",
        "Open with a polite greeting and your name/context",
        "State the ask or update in short, direct sentences",
        "Add only needed details or attachments",
        "Close with thanks and a professional sign-off",
      ],
      explanation:
        "Good email is scannable: subject → who you are → clear ask → essentials → polite close. Tone online reads colder than you intend, so clarity beats slang.",
    },
    {
      id: "dl5-debug",
      kind: "debug",
      title: "Tone bug",
      prompt: "This message is going to a counselor. Spot the real problem.",
      contentLabel: "Buggy email",
      buggyContent:
        "Subject: hey\n\nyo can u fix my schedule rn thx\n-sent from my phone",
      choices: [
        "Missing clear subject, greeting, context, and respectful tone for a professional ask",
        "Emails to staff must be handwritten, never typed",
        "Subject lines are illegal to customize in school systems",
        "Sign-offs are only allowed if you attach a résumé",
      ],
      correctIndex: 0,
      hint: "Would you send this to someone deciding a recommendation letter?",
      explanation:
        "Netiquette isn't about being stiff — it's about respect and clarity. A real subject, greeting, complete sentences, and context make adults more likely to help quickly.",
    },
    {
      id: "dl5-predict",
      kind: "predict",
      title: "Reply vibe",
      prompt: "Predict how the recipient is most likely to read this chat message.",
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
      title: "Share safely",
      prompt:
        "Your team starts a shared project doc. Put a smart collaboration setup in order.",
      languageLabel: "process",
      lines: [
        "Create the file in a shared drive or team folder",
        "Set permissions (view vs comment vs edit) for each person",
        "Agree on naming, owners, and how you'll use comments",
        "Edit in the live doc and leave comments instead of silent overwrites",
        "Use version history if something important gets changed by mistake",
      ],
      explanation:
        "Cloud collab works when access is intentional, roles are clear, and history/comments replace \"final_final_v9\" chaos on email.",
    },
    {
      id: "dl6-debug",
      kind: "debug",
      title: "Permission bug",
      prompt: "This share setting caused a mess. What's the real bug?",
      contentLabel: "Buggy share",
      buggyContent:
        "Doc: Senior Capstone — grades & private feedback notes\nLink: Anyone with the link → Editor\nPosted the link in a public class Discord\nNo owner assigned; comments disabled; version history ignored after a wipe",
      choices: [
        "Over-broad edit access on sensitive content; tighten permissions and use comments/history",
        "Shared docs can never use version history, so the wipe was unavoidable",
        "Public edit links are required for all school assignments",
        "Comments always delete the document, so disabling them was correct",
      ],
      correctIndex: 0,
      hint: "Who can edit — and should strangers reshape private notes?",
      explanation:
        "\"Anyone with the link can edit\" is dangerous for private work. Match permission to need, keep an owner, and recover mistakes with version history.",
      imageSrc: "/images/lessons/dl-ex-collab.png",
      imageAlt: "Shared document with permission levels and comment threads",
    },
    {
      id: "dl6-predict",
      kind: "predict",
      title: "History fix",
      prompt: "Predict the best first recovery move.",
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
      title: "Footprint audit",
      prompt:
        "You're cleaning up before college apps and job searches. Reorder a digital footprint review.",
      languageLabel: "process",
      lines: [
        "List accounts where you post or appear (active footprint)",
        "Search your name and common usernames (passive footprint too)",
        "Decide what still represents you well for school/work",
        "Remove, archive, or privacy-lock what you wouldn't show a reviewer",
        "Set ongoing habits so new posts match the reputation you want",
      ],
      explanation:
        "Active posts are what you publish; passive traces are what others or platforms keep. Reputation is long-lived — treat it like a public portfolio.",
    },
    {
      id: "dl7-debug",
      kind: "debug",
      title: "Reputation myth",
      prompt: "This advice about footprints is wrong. Spot the bug.",
      contentLabel: "Buggy advice",
      buggyContent:
        '"Private stories vanish forever after 24 hours, so colleges and employers can never see anything. Tagged photos don\'t count. Only your main feed matters — delete nothing."',
      choices: [
        "Screenshots, tags, archives, and search can preserve content beyond your feed",
        "Employers are legally banned from ever viewing social media",
        "Private stories automatically wipe every copy on every device worldwide",
        "Only email addresses form a digital footprint, not photos or comments",
      ],
      correctIndex: 0,
      hint: "What can outlive the original post even if the app says it expired?",
      explanation:
        "Ephemeral doesn't mean unreproducible. Tags, shares, screenshots, and indexed pages extend your footprint. Assume permanence when it matters.",
      imageSrc: "/images/lessons/dl-ex-footprint.png",
      imageAlt: "Timeline of posts, tags, and search results forming a digital footprint",
    },
    {
      id: "dl7-predict",
      kind: "predict",
      title: "Search result",
      prompt: "Predict what a careful reviewer is most likely to find first.",
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
      title: "Upstander steps",
      prompt:
        "You see targeted harassment in a group chat. Put a responsible response in order.",
      languageLabel: "process",
      lines: [
        "Recognize the behavior as harmful, not \"just a joke\"",
        "Support the target privately if it's safe (check in, don't pile on)",
        "Document evidence (screenshots, dates) without spreading it further",
        "Report through the platform and/or a trusted adult or school channel",
        "Avoid amplifying the attack with public call-outs that re-share abuse",
      ],
      explanation:
        "Digital citizenship means upstander action: support, document, report through real channels — not silence, and not turning harm into more spectacle.",
    },
    {
      id: "dl8-debug",
      kind: "debug",
      title: "Bystander bug",
      prompt: "This response plan fails the target. What's wrong?",
      contentLabel: "Buggy plan",
      buggyContent:
        "Group chat: repeated insults and fake accounts targeting one student\nPlan: \"Ignore it forever. If I screenshot and post it publicly with laughing emojis, I'm helping. Reporting is snitching. The target should just log off.\"",
      choices: [
        "Ignoring + public mockery worsens harm; support, document, and report instead",
        "Platforms ban all reporting features, so the plan is the only option",
        "Logging off permanently is the required first step for every target",
        "Fake accounts are always harmless because names aren't real",
      ],
      correctIndex: 0,
      hint: "What helps the person being targeted without spreading the abuse?",
      explanation:
        "Cyberbullying thrives on audience and silence. Upstanders check in, preserve evidence, and use report paths. Re-sharing for laughs makes you part of the harm.",
    },
    {
      id: "dl8-predict",
      kind: "predict",
      title: "Report path",
      prompt: "Predict the most appropriate next action.",
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
      title: "Design pass",
      prompt:
        "You're finishing a slide deck for class. Reorder a content-quality checklist.",
      languageLabel: "process",
      lines: [
        "Clarify the one main idea per slide or section",
        "Apply consistent fonts, spacing, and hierarchy",
        "Check contrast so text is readable on the background",
        "Add alt text or captions for key images/media",
        "Proofread and test on phone and laptop screens",
      ],
      explanation:
        "Strong content isn't decoration — it's hierarchy, readability, and accessibility so more people can actually use what you made.",
    },
    {
      id: "dl9-debug",
      kind: "debug",
      title: "Access miss",
      prompt: "This design will fail part of the audience. Spot the bug.",
      contentLabel: "Buggy slide",
      buggyContent:
        "Title in light yellow on white\nBody: 8pt decorative font, walls of text\nChart: red vs green only, no labels\nImages: no alt text; auto-playing music with no transcript\nCreator note: \"Looks fine on my monitor — accessibility is optional extra credit.\"",
      choices: [
        "Poor contrast, tiny text, color-only meaning, and missing alt/captions block access",
        "Alt text is only for printed posters, never digital slides",
        "Decorative fonts always improve readability for every reader",
        "Accessibility tools ban the use of any images in school work",
      ],
      correctIndex: 0,
      hint: "Who gets left out when contrast, size, and descriptions are ignored?",
      explanation:
        "Accessibility is part of good design: contrast, readable type, text alternatives, and not relying on color alone. It helps classmates, judges, and future coworkers.",
    },
    {
      id: "dl9-predict",
      kind: "predict",
      title: "Screen test",
      prompt: "Predict the most common viewer complaint.",
      scenario:
        "Infographic posted for a club fundraiser.\nHuge background photo, thin white text over bright areas.\nQR code in a corner at very low contrast.\nMost people will view it on phones between classes.",
      acceptedAnswers: [
        "hard to read",
        "can't read the text",
        "low contrast unreadable",
        "text and qr hard to see",
      ],
      explanation:
        "Phone screens + low contrast = skipped message. If people can't read the ask or scan the code, the design failed its job.",
      placeholder: "What's the complaint?",
    },
  ],

  "dl-10": [
    {
      id: "dl10-parsons",
      kind: "parsons",
      title: "Credit flow",
      prompt:
        "You want to use an image in a school video. Put a responsible licensing check in order.",
      languageLabel: "process",
      lines: [
        "Identify the work and who holds the rights",
        "Check the license (all rights reserved, Creative Commons, public domain)",
        "Confirm your use fits the license or fair use limits for your context",
        "Follow required attribution and link rules",
        "If unclear or restricted, get permission or choose another asset",
      ],
      explanation:
        "Copyright is automatic; licenses spell out permission. CC and fair use have conditions — attribution and scope matter, including for AI-generated assets.",
    },
    {
      id: "dl10-debug",
      kind: "debug",
      title: "License lie",
      prompt: "This credit plan is unsafe. What's the bug?",
      contentLabel: "Buggy plan",
      buggyContent:
        "Used a popular song + movie stills in a public YouTube essay\nAlso pasted AI-generated art labeled as \"original photos I took\"\nNote: \"It's for education so fair use covers everything forever. CC means I can skip attribution.\"",
      choices: [
        "Fair use isn't automatic for any school-ish upload; CC still needs its terms; don't mislabel AI",
        "Any classroom purpose erases all copyright worldwide",
        "Creative Commons always means zero credit and commercial reuse",
        "AI images have no rules and can be claimed as personal photographs",
      ],
      correctIndex: 0,
      hint: "Does \"school project\" automatically equal unlimited public reuse?",
      explanation:
        "Fair use is a limited, case-by-case analysis — not a free pass for full songs on public channels. CC requires following the specific license. Misrepresenting AI as your photos is dishonest.",
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
      title: "Account lock",
      prompt:
        "You're securing a new email used for college and job apps. Reorder a strong setup.",
      languageLabel: "process",
      lines: [
        "Create a long unique password (or passphrase) you won't reuse",
        "Store it in a password manager, not a notes app titled Passwords",
        "Turn on two-factor authentication (2FA)",
        "Review recovery email/phone so only you control resets",
        "Stay alert for phishing that tries to steal the new credentials",
      ],
      explanation:
        "Unique passwords stop breach dominoes; managers make them usable; 2FA blocks many stolen-password logins; phishing still tries to bypass all of it.",
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
        "Urgency, weird domain, shortened link, and asking for password/SSN — classic phishing",
        "Bitly links are always run by the companies named in the subject",
        "Real security teams always demand your SSN by email within one hour",
        "Misspelled domains prove a message is extra authentic",
      ],
      correctIndex: 0,
      hint: "Who benefits if you type your password into a rushed link?",
      explanation:
        "Phishing weaponizes fear and fake brands. Check the real domain, don't follow panic links, and never hand passwords or SSNs to an unexpected email.",
      imageSrc: "/images/lessons/dl-ex-phishing.png",
      imageAlt: "Suspicious email highlighting fake domain and urgent password request",
    },
    {
      id: "dl11-predict",
      kind: "predict",
      title: "Reuse risk",
      prompt: "Predict the most likely security outcome.",
      scenario:
        "Same password used for a gaming site, school email, and a shopping account.\nGaming site announces a breach; password hashes leaked.\nShopping account has no 2FA.\nAttackers try leaked passwords on other popular sites.",
      acceptedAnswers: [
        "other accounts get hacked",
        "credential stuffing succeeds",
        "email or shopping account compromised",
        "reused password unlocks more accounts",
      ],
      explanation:
        "Credential stuffing tests leaked passwords everywhere you reused them. One breach becomes many takeovers without unique passwords and 2FA.",
      placeholder: "What happens next?",
      imageSrc: "/images/lessons/dl-ex-phishing.png",
      imageAlt: "Warning about reused passwords after a data breach",
    },
  ],

  "dl-12": [
    {
      id: "dl12-parsons",
      kind: "parsons",
      title: "Privacy pass",
      prompt:
        "Before installing a new app, put a privacy review in order.",
      languageLabel: "process",
      lines: [
        "Ask what data the app actually needs for its job",
        "Check permission requests (camera, mic, contacts, location)",
        "Review cookie/tracking choices in browser or app settings",
        "Limit oversharing in profiles and posts tied to the account",
        "Revisit permissions later and revoke what you no longer need",
      ],
      explanation:
        "Privacy is ongoing: minimize data, question permissions, manage cookies/trackers, and avoid volunteering extras that apps didn't need.",
    },
    {
      id: "dl12-debug",
      kind: "debug",
      title: "Overshare bug",
      prompt: "This privacy setup is broken. Spot the mistake.",
      contentLabel: "Buggy settings",
      buggyContent:
        "Flashlight app: allowed Contacts, Mic, Location Always, full photo library\nBrowser: Accept all cookies on every site\nBio: full home address, class schedule, vacation dates while house is empty\nAttitude: \"If I have nothing to hide, permissions don't matter.\"",
      choices: [
        "Excess permissions, blanket cookies, and public personal details create real risk",
        "Flashlight apps legally require contacts and always-on location",
        "Posting vacation dates publicly always improves home security",
        "Accepting all cookies deletes your data from advertisers",
      ],
      correctIndex: 0,
      hint: "Does a flashlight need your contacts — and who can use an empty-house post?",
      explanation:
        "Permissions should match function. Cookies enable tracking across sites. Oversharing schedules and addresses helps scammers and thieves — privacy isn't only for people with secrets.",
      imageSrc: "/images/lessons/dl-ex-privacy.png",
      imageAlt: "Phone permission prompts and privacy toggles",
    },
    {
      id: "dl12-predict",
      kind: "predict",
      title: "Cookie trail",
      prompt: "Predict what advertisers can do more easily after this choice.",
      scenario:
        "Student visits three shopping sites and a news site in one evening.\nOn each, they click \"Accept all\" for cookies/trackers.\nThey use the same browser profile, not private mode.\nLater, unrelated sites show ads for the exact products they browsed.",
      acceptedAnswers: [
        "track across sites",
        "cross-site tracking",
        "targeted ads follow them",
        "advertisers follow browsing",
      ],
      explanation:
        "Third-party cookies/trackers stitch browsing into a profile. Accept-all makes cross-site targeting easier; limiting trackers reduces that trail.",
      placeholder: "What can they do?",
      imageSrc: "/images/lessons/dl-ex-privacy.png",
      imageAlt: "Browser cookie consent and cross-site tracking illustration",
    },
  ],

  "dl-13": [
    {
      id: "dl13-parsons",
      kind: "parsons",
      title: "Boundary plan",
      prompt:
        "Sleep and focus have been slipping. Reorder a realistic tech-habits reset.",
      languageLabel: "process",
      lines: [
        "Notice which apps steal time, sleep, or mood",
        "Set concrete boundaries (no-phone wind-down, app limits, focus blocks)",
        "Change the environment (charger outside bedroom, notifications off)",
        "Replace scroll time with one offline or restorative option",
        "Review after a week and adjust what actually stuck",
      ],
      explanation:
        "Healthy tech use is designed, not wished: awareness → boundaries → environment → replacement habits → iterate. Comparison feeds need the same intentional limits.",
    },
    {
      id: "dl13-debug",
      kind: "debug",
      title: "Sleep myth",
      prompt: "This wellbeing plan won't work. What's the bug?",
      contentLabel: "Buggy plan",
      buggyContent:
        "Goal: better sleep and less comparison stress\nPlan: scroll in bed until 2 a.m. \"to relax,\" keep all notifications on overnight, measure self-worth by likes, delete nothing — \"discipline alone will fix it without changing settings.\"",
      choices: [
        "Late-night scrolling, constant alerts, and like-based worth need boundary and environment changes",
        "Notifications improve deep sleep by keeping the brain alert",
        "Comparing likes is proven to increase REM sleep",
        "Phone chargers in bed are required for healthy circadian rhythm",
      ],
      correctIndex: 0,
      hint: "What actually competes with sleep — willpower speeches or glowing screens?",
      explanation:
        "Willpower loses to design. Move chargers, mute nights, limit comparison apps, and protect wind-down. Boundaries beat vague promises.",
    },
    {
      id: "dl13-predict",
      kind: "predict",
      title: "Night effect",
      prompt: "Predict the most likely next-day effect.",
      scenario:
        "Weeknight routine: phone in bed, bright screen, social feed until past midnight.\nAlarm for early class.\nNo Do Not Disturb; group chats ping overnight.\nSame pattern repeats most school nights.",
      acceptedAnswers: [
        "tired and unfocused",
        "sleep debt / fatigue",
        "worse focus next day",
        "groggy and distracted",
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
      title: "Debug steps",
      prompt:
        "Wi-Fi works for others but your laptop won't load a site. Reorder systematic troubleshooting.",
      languageLabel: "process",
      lines: [
        "Define the problem precisely (what fails, since when, on which device)",
        "Check the obvious (cables, Wi-Fi icon, airplane mode, correct network)",
        "Isolate variables (try another site, device, or network)",
        "Apply one fix at a time (refresh, restart, forget/rejoin Wi-Fi)",
        "Document what worked or escalate with clear details",
      ],
      explanation:
        "Pros don't random-click. They define, check basics, isolate, change one thing at a time, then record the fix — same mindset as debugging code.",
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
        "No isolation or one-change-at-a-time method; evidence points to a browser/device issue",
        "If one site fails, every network worldwide is offline",
        "Optimizer apps are always the first required step for any error",
        "Phones and laptops can never share the same Wi-Fi network",
      ],
      correctIndex: 0,
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
      title: "Pro presence",
      prompt:
        "You're preparing for internships or a first job. Reorder a career-ready digital setup.",
      languageLabel: "process",
      lines: [
        "Clean public profiles and choose a professional email address",
        "Organize files and a simple portfolio or work samples folder",
        "Practice core tools (docs, sheets, calendar, video meeting basics)",
        "Set remote-work habits (mute/unmute, camera framing, shared agendas)",
        "Keep communication timely and documented for teammates",
      ],
      explanation:
        "Career digital skills are presence + organization + tool fluency + remote etiquette. Spreadsheets and clear messages matter as much as any platform trend.",
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
        "\"idk lol\" is the standard status format in most offices",
        "Shared spreadsheets are banned in modern workplaces",
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
      title: "Toolkit audit",
      prompt:
        "Capstone time: build your personal digital action plan. Reorder the audit.",
      languageLabel: "process",
      lines: [
        "Inventory devices, accounts, files, and key habits",
        "Score risks (security, privacy, footprint, wellbeing, collaboration)",
        "Pick 3 high-impact fixes you can finish this week",
        "Schedule habits (backups, updates, password/2FA checks, boundaries)",
        "Revisit monthly and adjust the plan as school/work changes",
      ],
      explanation:
        "Fluency isn't one quiz — it's a living toolkit: inventory → prioritize → act → maintain. Small recurring habits beat one dramatic cleanup.",
    },
    {
      id: "dl16-debug",
      kind: "debug",
      title: "Plan gap",
      prompt: "This \"capstone plan\" looks complete but isn't. Spot the bug.",
      contentLabel: "Buggy action plan",
      buggyContent:
        "Audit notes: \"I'm fine.\"\nFixes: none scheduled\nSecurity: still reusing one password, 2FA off\nFiles: no backup\nFootprint: never searched own name\nWellbeing: phone in bed every night\nClosing line: \"I'll remember all 16 lessons mentally — writing a plan is unnecessary.\"",
      choices: [
        "No concrete fixes or schedule; real risks remain unaddressed without a written plan",
        "Mental notes automatically enable 2FA on every account",
        "Skipping backups is best practice for capstone portfolios",
        "Searching your own name is illegal in most states",
      ],
      correctIndex: 0,
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
