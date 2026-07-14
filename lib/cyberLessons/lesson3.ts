import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const cyberLesson3: AILessonConfig = {
  id: "cs-3",
  title: "3. Malware & the Threat Landscape",
  goal: "Recognize common malware categories conceptually, understand high-level threat-actor motivations, explain how malware often spreads at a defender level, and list safe habits that reduce risk.",
  xpReward: 150,
  badge: "Threat Spotter",
  dashboardHref: "/dashboard",
  prevHref: "/learn/cyber/2",
  nextHref: "/learn/cyber/4",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        image: "/images/lessons/cs-3.png",
        imageAlt: "Laptop warning dialog about suspicious download next to USB drive and email attachment icons",
        body: `**Malware** is short for *malicious software* — programs designed to harm devices, steal data, spy, or disrupt. You do not need to know how to build it. You need to recognize categories and respond like a defender.\n\nHere's our roadmap:\n\n• **Malware types** — virus, worm, trojan, ransomware, spyware, adware (concepts).\n• **Threat actors** — who causes harm and why (high level).\n• **How malware spreads** — common paths, explained for defenders.\n• **First response steps** — isolate, observe, scan, reset from clean device, restore.\n• **A worked example, a myth, and a mini case** — so this stays practical, not just vocabulary.\n• **Defender habits** — updates, caution with unknown files, and reporting.\n\nThis lesson stays educational and defensive. We talk about what malware *does* and how to *reduce risk* — not how to create or launch attacks.`,
        callout: {
          label: "Why it matters",
          text: "Knowing the category helps you communicate clearly: \"I think this might be ransomware\" tells support something different than \"my browser keeps popping up ads.\"",
        },
      },
      {
        id: "hook-story",
        kicker: "A quick story",
        title: "Devon's \"free\" video converter",
        body: `Devon needs to convert a video file for a class project the night before it's due. A quick search turns up a free converter tool with a slick-looking site. Devon downloads it, clicks through the installer without reading closely, and finishes the assignment.\n\nThe next morning, Devon's laptop is sluggish, random browser tabs open to ads on their own, and a toolbar Devon never asked for now sits at the top of the browser. Nothing looks catastrophic — no ransom note, no obvious theft — but something is clearly different, and Devon has no idea what that "free" installer actually put on the machine.\n\nThis is one of the most common malware stories in real life: not a dramatic movie-style hack, but a rushed download under deadline pressure. By the end of this lesson, you'll be able to name what likely happened to Devon's laptop, and — more importantly — what to do about it without making things worse.`,
        callout: {
          label: "Notice",
          text: "Devon didn't do anything wildly reckless — just rushed. That's exactly why this lesson focuses on recognizable patterns and calm response, not blame.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Threat landscape vocabulary",
        body: `• **Malware** — software written to cause harm or unwanted effects on purpose.\n• **Threat landscape** — the overall picture of risks, attackers, and techniques defenders worry about right now.\n• **Threat actor** — a person or group that poses a cyber threat (from scam operators to nation-state teams).\n• **Payload** — what the malware is meant to do once it runs (steal, encrypt, spy, annoy).\n• **Update / patch** — a fix from a software maker that closes known weaknesses.\n\nYou won't need exploit details — just the labels defenders use when they talk about risk.`,
        callout: {
          label: "Pro tip",
          text: "If news headlines confuse you, ask: What was the goal — steal data, lock files for money, spy, or just disrupt? That goal often maps to a malware category.",
        },
      },
      {
        id: "concept-1",
        kicker: "Know the categories",
        title: "Virus, worm, trojan, ransomware, spyware, adware",
        image: "/images/lessons/cs-3-2.png",
        imageAlt: "Clean educational cards naming ransomware, spyware, trojan, and worm without scary gore",
        body: `These names get used loosely in everyday speech. Here's the classroom version — conceptual, not a how-to:\n\n• **Virus** — malware that typically needs a host file or program and user action to help it spread to other files.\n• **Worm** — malware known for spreading across networks more on its own, often without someone opening each new copy.\n• **Trojan** — malware that *disguises* itself as something useful or interesting so a person is tricked into running it. Named after the Trojan Horse story.\n• **Ransomware** — malware that blocks access to files or systems (often by locking them) and demands payment to restore access. Paying is risky and not a guarantee — defenders focus on backups and prevention.\n• **Spyware** — malware designed to watch what you do and steal information (keystrokes, browsing, credentials) secretly.\n• **Adware** — unwanted software that floods you with ads; sometimes bundled with other junk and may track you. Annoying, and it can be a warning sign of a messy, risky install.\n\nReal incidents can blend categories. A trojan might deliver ransomware. Defenders care about **impact** and **response**, not perfect taxonomy debates.`,
        bullets: [
          "**Trojan** → tricks you into running it.",
          "**Worm** → spreads across networks more autonomously.",
          "**Ransomware** → locks you out and demands payment.",
          "**Spyware** → secretly steals information.",
          "**Adware** → aggressive ads / unwanted installs.",
        ],
        callout: {
          label: "Watch out",
          text: "Never download \"cracked\" games, fake update pop-ups, or mystery attachments to \"test\" malware. Learning belongs in supervised labs with safe samples — not on your school laptop.",
        },
        checkIn: {
          prompt: "Devon's \"free\" video converter turned out to install an unwanted toolbar and ad pop-ups. Which category best matches what likely happened?",
          choices: [
            "Worm spreading with no user action at all",
            "A trojan-style trick that delivered adware-like unwanted software",
            "Ransomware demanding payment",
            "A hardware failure unrelated to software",
          ],
          correctIndex: 1,
          explanation:
            "A free tool disguising extra unwanted software inside its installer is a classic trojan pattern, and the pop-ups/toolbar match adware behavior.",
        },
      },
      {
        id: "concept-2",
        kicker: "Who and why",
        title: "Threat actors and motivations (high level)",
        body: `Not every threat looks the same because not every actor wants the same outcome:\n\n• **Criminals seeking money** — scams, ransomware, stealing accounts to sell or abuse.\n• **Scammers / social engineers** — trick people (often without fancy malware).\n• **Insiders** — someone who already has some access and misuses it (accidentally or on purpose).\n• **Hacktivists** — motivated by a cause or protest (still unauthorized and often illegal).\n• **Nation-state / advanced groups** — higher resources, often espionage or disruption (you mainly see these in news about large organizations).\n• **Script kiddies** — less-skilled people using tools others made — still capable of harm, still unauthorized.\n\nMotivations drive what you might observe: money goals often mean ransomware or account theft; spying means stealthy spyware; disruption means outages.\n\nFor high school defenders, the practical point is simple: **assume someone out there wants access to accounts and devices**, and build habits accordingly — without needing to profile every actor on earth.`,
        callout: {
          label: "Why it matters",
          text: "Understanding motivation helps prioritize. Protecting a personal gaming account and protecting a hospital network both matter, but organizations with valuable data attract different levels of attention.",
        },
        checkIn: {
          prompt: "A threat actor mainly motivated by financial gain is most likely to be associated with which pattern?",
          choices: [
            "Quietly disrupting a system for a political cause with no financial goal",
            "Ransomware or stealing accounts to sell or abuse",
            "Only ever working for a government",
            "Never using malware of any kind",
          ],
          correctIndex: 1,
          explanation:
            "Money-motivated actors commonly use tactics like ransomware or account theft, since both can be directly converted into profit.",
        },
      },
      {
        id: "concept-3",
        kicker: "How it shows up",
        title: "How malware spreads — defender view",
        body: `At a high level, malware needs a way onto a device and a way to run. Common conceptual paths defenders watch for:\n\n• **Risky downloads and fake apps** — software that isn't what it claims to be (trojan pattern).\n• **Email / message attachments and links** — especially unexpected ones (often tied to phishing, next lesson).\n• **Removable media** — unknown USB drives from untrusted sources.\n• **Unpatched software** — old apps/OS versions with known weaknesses that worms and other malware abuse *after* vendors have published fixes.\n• **Bundled junk installers** — "free" tools that sneak extra unwanted software.\n\nNotice what's *not* in this lesson: step-by-step exploit instructions. Defenders don't need those to act. They need to recognize risky situations and reduce exposure.\n\nIf a device acts strangely — mass pop-ups, unknown programs, files suddenly inaccessible, browser hijacks — treat it seriously: disconnect from sensitive accounts if needed, and get help from a trusted adult or IT support rather than "experimenting" further.`,
        callout: {
          label: "Common misconception",
          text: "\"I have a Mac / Chromebook / phone, so I'm safe.\" No major consumer platform is immune. Risk levels differ, but habits still matter on every device.",
        },
        checkIn: {
          prompt: "Which of these is the clearest example of the \"bundled junk installer\" spread path?",
          choices: [
            "A worm moving between computers on a network with no user action",
            "A free download that quietly installs an extra toolbar and ads alongside the tool you wanted",
            "A hardware failure in a laptop's battery",
            "A teacher updating classroom software during a scheduled maintenance window",
          ],
          correctIndex: 1,
          explanation:
            "Bundled junk installers sneak in unwanted extras alongside a tool you intentionally downloaded — exactly what happened to Devon.",
        },
      },
      {
        id: "worked-example",
        kicker: "Step by step",
        title: "Diagnosing Devon's laptop like a defender",
        body: `Let's return to Devon's laptop and reason through it like a defender would.\n\n**Step 1 — Gather observations.** Sluggish performance, tabs opening on their own to ads, and an unrequested toolbar. No files are locked, no ransom note, and nothing appears to be stolen (yet).\n\n**Step 2 — Match to a category.** The symptoms point toward **adware** — unwanted ads and browser changes — likely delivered through a **trojan**-style bundled installer, since Devon downloaded a "free" tool from an unfamiliar site.\n\n**Step 3 — Estimate the CIA impact.** So far this looks more like an annoyance and a possible **Integrity** concern (unwanted changes to browser settings) than a major **Confidentiality** breach — but Devon can't be fully sure adware isn't also tracking browsing activity, so treating it seriously is still the right call.\n\n**Step 4 — Decide next steps (preview of later in this lesson).** Don't download a random "cleaner" tool to fix it — that itself is a common trap. Instead: disconnect if something feels more serious, note what changed, and use trusted removal tools or ask an adult/IT for help rather than clicking more mystery pop-ups.\n\nNotice the pattern: observe → categorize → estimate impact → respond calmly. That's a repeatable defender process, not a one-time fact to memorize.`,
        checkIn: {
          prompt: "In the worked example, why shouldn't Devon click on a pop-up offering a free \"cleaner\" tool to fix the problem?",
          choices: [
            "Because cleaner tools never work",
            "Because another unverified download from an untrusted pop-up could introduce more unwanted software, repeating the same mistake",
            "Because it would fix the problem instantly and that's boring",
            "Because pop-ups are illegal to view",
          ],
          correctIndex: 1,
          explanation:
            "Scareware-style \"cleaner\" pop-ups are a well-known trap — they ask you to repeat the exact risky behavior (downloading an unverified tool) that likely caused the problem.",
        },
      },
      {
        id: "misconception",
        kicker: "Common misconception",
        title: "\"My device type protects me automatically\"",
        body: `A common and understandable myth: "I use a Mac / Chromebook / phone, so malware isn't really my problem." It's true that risk levels and common attack patterns differ across platforms — but "different risk" is not the same as "no risk."\n\nEvery major consumer platform has seen malicious apps, scam extensions, phishing that works regardless of device, and social-engineering tricks that don't care what operating system you're running. Attackers often target the *person*, not just the *platform* — a convincing fake login page works the same whether you view it on a Mac, Chromebook, or phone.\n\nThe safer mindset: platform choice can shift *some* risks, but habits — cautious downloads, updates, strong authentication, and healthy skepticism — matter on every single device you own.`,
        callout: {
          label: "Reframe it",
          text: "Instead of \"my device can't get malware,\" try: \"my device has different risks than others, but habits still decide most outcomes.\"",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Try it yourself: audit your own download habits",
        body: `Think back over the last month of software or app installs on any device you use.\n\n1. **Where did each one come from** — an official app store, a well-known vendor site, or a random search result / pop-up link?\n2. **Did you read what the installer was actually adding**, or click through quickly the way Devon did?\n3. **Is there anything currently pending an update** on your phone or computer — and if so, why hasn't it been installed yet?\n\nYou don't need to report your answers anywhere. The goal is simply noticing your own patterns, since most malware in real life arrives through ordinary, rushed decisions — not dramatic hacking.`,
        callout: {
          label: "Keep it real",
          text: "If you realize you click through installers quickly, you're not alone — that's exactly the habit this lesson is trying to help you notice and slow down.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "When you suspect infection",
        title: "Going deeper: first response, in order",
        image: "/images/lessons/cs-3-4.png",
        imageAlt: "Numbered checklist card showing isolate, observe, scan, reset, restore steps on a laptop screen",
        body: `If a device acts strangely — mass pop-ups, unknown programs, files suddenly inaccessible, browser hijacks — don't "experiment" with random downloads. Follow a calm order:\n\n**1. Disconnect / isolate** — Unplug from Wi-Fi or Ethernet when safe to do so. This limits spread and data theft while you still have control.\n**2. Observe** — Note what changed: new apps, pop-ups, slowdowns, odd file extensions. Simple notes help IT respond faster.\n**3. Scan** — Run trusted security tools or ask IT for an approved scan. Avoid scareware "cleaner" pop-ups that demand mystery downloads.\n**4. Password reset from a CLEAN device** — Change important passwords from a phone or computer you trust is not infected. A compromised laptop can steal new passwords as you type them.\n**5. Restore** — After cleanup, restore from a known-good backup if needed.\n\n**Ransomware note:** Isolate **first** — before chasing payment options or opening links in ransom notes. Payment is risky and not a guarantee. Real recovery comes from **offline or immutable backups** that ransomware couldn't reach — not from paying strangers.\n\nTell a trusted adult or IT early. Containment beats panic.`,
        bullets: [
          "**Isolate** → **observe** → **scan** → **reset passwords from clean device** → **restore**.",
          "Ransomware: isolate first; recover from backups attackers couldn't touch.",
          "Never pay as your first plan — offline/immutable backups are the defender path.",
        ],
        callout: {
          label: "Watch out",
          text: "Opening every link in a ransom note on an infected PC can worsen the compromise. Contain, call IT, and plan recovery from clean backups.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Comparing malware categories by primary impact",
        body: `Now that you know the categories, comparing them by their *main* effect helps you react faster in the moment:\n\n• **Ransomware** → primary hit is **Availability** (you can't reach your files/systems); may also threaten Confidentiality if data is stolen first.\n• **Spyware** → primary hit is **Confidentiality** (information is secretly taken); usually stays hidden rather than announcing itself.\n• **Adware** → primary hit is annoyance/**Integrity** (unwanted changes to browser/settings); often a warning sign of a risky install rather than the worst-case outcome.\n• **Worms** → primary concern is **spread speed** across a network, which can escalate whatever payload they carry.\n• **Trojans** → primary concern is the **delivery trick** — the disguise is the dangerous part, and the actual payload could be any of the above.\n\nThis comparison is why category names matter: knowing "this smells like ransomware" versus "this smells like adware" changes how urgently you isolate the device and who you call first.`,
        checkIn: {
          prompt: "Which malware category's primary impact is most directly an Availability crisis for the victim?",
          choices: ["Adware", "Spyware", "Ransomware", "None — malware never affects Availability"],
          correctIndex: 2,
          explanation:
            "Ransomware's hallmark is blocking access to files or systems, which is a direct Availability failure.",
        },
      },
      {
        id: "defender-trap-or-myth",
        kicker: "Don't fall for this",
        title: "The trap: trusting the pop-up that offers to \"fix\" the problem",
        body: `Here's a trap that catches people at their most vulnerable moment — right when something already looks wrong. A pop-up appears claiming your device is infected and offering a free scan or cleaner tool, often with urgent, scary language ("CRITICAL THREATS DETECTED!").\n\nThe trap works because it targets exactly the fear a real infection would create — so it feels like a helpful response to a real problem. In reality, this is **scareware**: the "solution" it's offering is often itself unwanted or malicious software, asking you to repeat the same risky download behavior that may have caused the original problem.\n\nThe fix: never trust an unsolicited pop-up's own offer to fix itself. Close the pop-up without clicking anything inside it (including "Cancel" buttons styled to look like ads — closing the browser tab/window is safer), and use security tools you already trust and installed on your own terms, or ask IT/a trusted adult for help.`,
        callout: {
          label: "Watch out",
          text: "Legitimate security tools don't usually alert you through random browser pop-ups with countdown timers and flashing colors. Urgency + a convenient \"fix\" in the same pop-up is a major red flag.",
        },
      },
      {
        id: "habits",
        kicker: "Defender playbook",
        title: "Habits that lower malware risk",
        image: "/images/lessons/cs-3-3.png",
        imageAlt: "Student updating a Chromebook with Software Update screen and a closed unknown email attachment",
        body: `You can't eliminate every risk, but you can make success much harder for malware authors:\n\n• **Keep systems updated.** Install OS and app updates — they often include security fixes.\n• **Don't run unknown files.** If you didn't expect an attachment or installer, don't open it. Verify with the sender through another channel.\n• **Stick to trusted sources.** Official app stores and known vendor sites beat random download buttons.\n• **Use strong authentication.** Stolen credentials often matter as much as malware.\n• **Back up important work.** Good backups reduce ransomware panic because you can restore without paying.\n• **Limit admin rights** when possible on shared/family PCs (more in the access-control lesson).\n• **Report early.** Tell a parent, teacher, or IT if something looks infected — faster response limits damage.\n\nThese habits protect **CIA**: they keep spies out (confidentiality), reduce tampering (integrity), and help you recover (availability).`,
        bullets: [
          "Update regularly.",
          "Don't open mystery files or fake \"update\" prompts.",
          "Prefer trusted download sources.",
          "Back up schoolwork and important files.",
          "Report suspected infections instead of ignoring them.",
        ],
        callout: {
          label: "Try this week",
          text: "Check whether your phone and school/home computer have pending updates. Installing them is one of the highest-value defender moves you can make.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and reflect",
        title: "Quick gut-check before you continue",
        body: `Before the mini case and knowledge check, think honestly: have you ever clicked through an installer quickly, the way Devon did, without really checking what it was adding? Most people have. What would you do differently next time, now that you know the "bundled junk installer" and "scareware pop-up" patterns by name?`,
      },
      {
        id: "mini-case",
        kicker: "Case file",
        title: "Mini case: the group chat \"homework helper\"",
        image: "/images/lessons/cs-3-5.png",
        imageAlt: "Group chat on a phone with a shared file labeled homework helper and a suspicious warning triangle",
        body: `**The situation:** A file called "HomeworkHelper.exe" starts circulating in a class group chat, promising to auto-generate outlines for essays. Several classmates download and run it. A few days later, three of those classmates report the same odd symptoms: unexpected browser pop-ups, a strange new program in their startup list, and — for one student — a locked file they can no longer open, with a text file demanding payment to unlock it.\n\n**Apply what you've learned:**\n\n• **Category:** The file's disguise (something appealing that tricks people into running it) is a classic **trojan** pattern. The payload varied by student — some got adware-like symptoms, and one appears to have received **ransomware**.\n• **Spread path:** This matches the "risky download" and social-sharing spread path — the file spread through trust in the group chat, not through a network worm or an email attachment.\n• **Response:** The student with locked files should isolate the device immediately, avoid paying, and check whether backups exist to restore from. All affected students should reset passwords from a clean device and tell a trusted adult or IT so the source file can be flagged before more classmates download it.\n\nThis case shows why "a friend shared it" doesn't make a file safe — trojans specifically rely on that kind of trust to spread.`,
      },
      {
        id: "malware-reporting",
        kicker: "What to do next",
        title: "Reporting malware signs at school or home",
        body: `If a device starts acting like Devon's laptop — pop-ups, slowdowns, mystery installs — defenders report in a way that helps, not harms.

**Do report:**
• Strange pop-ups offering to "clean" or "speed up" the machine.
• Files you did not download appearing on desktop or downloads.
• Friends mentioning the same sketchy link in a group chat.
• Ransom notes or locked screens.

**In your report, include:**
• What you were doing right before symptoms started.
• Whether you clicked a link, opened an attachment, or plugged in a USB drive.
• Device name and whether it is personal or school-managed.

**Do not:**
• Run random "fixer" tools suggested by the pop-up itself.
• Wipe the device before IT asks — that can erase evidence.
• Share infected files with classmates "to warn them" without guidance.

Early, specific reports let defenders isolate one bad download before it becomes a club-wide outbreak.`,
        callout: {
          label: "Watch out",
          text: "Pop-ups that offer to remove malware are a classic trap — they often are the malware, or they charge money for a fake scan.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Before you go",
        title: "Check yourself",
        body: `Quick self-check: can you name the six malware categories and describe each one's primary impact in a sentence? Can you list the first-response order (isolate → observe → scan → reset → restore) from memory? If yes, you're ready for the knowledge check.`,
        checkIn: {
          prompt: "A classmate's file suddenly demands payment to unlock it. What should happen first?",
          choices: [
            "Pay immediately so the files are recovered quickly",
            "Isolate the device from the network before doing anything else",
            "Open every link in the ransom note to learn more",
            "Ignore it — ransomware always resolves itself",
          ],
          correctIndex: 1,
          explanation:
            "Isolating first limits spread and further data loss. Paying is risky and not guaranteed; the safe path is isolate, then involve IT/a trusted adult and recover from backups.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Quick recap:\n\n• **Malware** is malicious software; categories include **virus, worm, trojan, ransomware, spyware, adware**.\n• **Threat actors** have different motivations — money, disruption, spying, ideology — which shapes what defenders see.\n• Spread often involves risky downloads, messages, unpatched software, and social tricks — including trusted-looking group chat files.\n• **First response:** isolate → observe → scan → password reset from clean device → restore.\n• **Ransomware:** isolate first; recover from offline/immutable backups — not payment.\n• Watch for **scareware** pop-ups that offer to "fix" a problem they may have caused.\n• Defender habits: **update**, **don't run unknown files**, trusted sources, backups, and **report**.\n\nNext up: social engineering and phishing — because many malware and account-theft incidents start with tricking a human.\n\nTake the **Knowledge check**, then reflect on one habit you'll strengthen this week.`,
      },
    ],
  },
  bigIdeas: [
    "**Malware** is software designed to harm; different categories cause different impacts (lock, spy, trick, spread).",
    "**Threat actors** are motivated by goals like money or disruption — understanding the goal helps interpret risk.",
    "Defenders reduce risk with **updates**, caution toward **unknown files**, trusted sources, **backups**, and fast reporting.",
  ],
  keyTerms: [
    { term: "Malware", definition: "Malicious software designed to harm devices, steal data, spy, or disrupt." },
    { term: "Trojan", definition: "Malware disguised as something useful so a user is tricked into running it." },
    { term: "Worm", definition: "Malware known for spreading across networks with less need for user action each time." },
    { term: "Ransomware", definition: "Malware that blocks access to files or systems and demands payment for restoration." },
    { term: "Spyware", definition: "Malware that secretly monitors activity and steals information." },
    { term: "Adware", definition: "Unwanted software that pushes ads and may come bundled with risky installs." },
    { term: "Threat Actor", definition: "A person or group that poses a cybersecurity threat." },
    { term: "Patch / Update", definition: "A vendor fix that closes known security weaknesses in software." },
    { term: "Immutable backup", definition: "A backup copy that cannot be altered or deleted by ransomware during an attack." },
  ],
  realWorld:
    "A fake \"homework helper\" installer that secretly steals saved browser passwords is a **trojan** delivering **spyware**-like harm — prevented more by cautious downloads and updates than by memorizing malware source code.",
  quiz: [
    {
      id: "q1",
      question: "Which malware type is best described as \"disguised as something useful to trick you into running it\"?",
      choices: [
        "A worm, which spreads across a network with little user action",
        "A patch, which fixes a known software weakness",
        "A trojan",
        "A firewall rule blocking unwanted traffic",
      ],
      correctIndex: 2,
      explanation:
        "A trojan pretends to be desirable software so a person willingly runs it. That social trick is the defining idea at this level.",
    },
    {
      id: "q2",
      question: "Ransomware mainly threatens which CIA goal first for the victim?",
      choices: [
        "Confidentiality only — it always just reads data quietly",
        "Availability — you can't reach your files or systems",
        "Integrity only — it silently corrects spelling mistakes",
        "None — ransomware only affects hardware, not data",
      ],
      correctIndex: 1,
      explanation:
        "Ransomware typically blocks access, which is an Availability crisis. It may also threaten Confidentiality if data is stolen, but the hallmark is lockout.",
    },
    {
      id: "q3",
      question: "Which defender habit best matches \"close known weaknesses vendors have already fixed\"?",
      choices: [
        "Turning off automatic updates so nothing changes unexpectedly",
        "Waiting a year after release before ever updating software",
        "Sharing admin passwords with trusted friends for convenience",
        "Installing software updates / patches",
      ],
      correctIndex: 3,
      explanation:
        "Updates and patches apply fixes for known problems — one of the most important everyday defenses.",
    },
    {
      id: "q4",
      question: "Why might criminals use ransomware?",
      choices: [
        "Often for financial gain by demanding payment",
        "To practice inside an authorized school lab environment",
        "To improve Availability for the victim's organization",
        "Because using malware is a required certification step",
      ],
      correctIndex: 0,
      explanation:
        "At a high level, many ransomware operators are motivated by money. That does not mean paying is safe or recommended.",
    },
    {
      id: "q5",
      question: "You receive an unexpected email attachment labeled \"invoice\" from an unknown sender. What is the best defensive response?",
      choices: [
        "Open it immediately to see if it's malware",
        "Forward it to everyone in class as a warning, attachment included",
        "Don't open it; verify through another channel or report it to a trusted adult/IT",
        "Disable all future updates so nothing else changes",
      ],
      correctIndex: 2,
      explanation:
        "Defenders avoid running unknown files. Verify unexpectedly or report — don't execute mystery attachments to \"check.\"",
    },
    {
      id: "q6",
      question: "A free download tool quietly adds an extra unwanted toolbar and ads. This pattern is best described as:",
      choices: [
        "A bundled junk installer, often paired with a trojan-style trick",
        "A worm spreading between computers with no user action at all",
        "A hardware security key malfunctioning",
        "A firewall rule that was configured correctly",
      ],
      correctIndex: 0,
      explanation:
        "Bundled installers sneak unwanted extras alongside a tool a person intentionally chose to download — a common trojan/adware pattern.",
    },
    {
      id: "q7",
      question: "A pop-up appears claiming your device is critically infected and offers a free \"cleaner\" download to fix it immediately. What should you do?",
      choices: [
        "Click the download right away since the pop-up looks urgent",
        "Enter your password into the pop-up to \"verify\" your identity",
        "Share the pop-up link with friends so they can fix their devices too",
        "Close the pop-up without clicking inside it, and use security tools you already trust or ask for help",
      ],
      correctIndex: 3,
      explanation:
        "This is a classic scareware trap. Legitimate fixes don't arrive as urgent, self-offering pop-ups — avoid clicking inside it and use trusted tools instead.",
    },
    {
      id: "q8",
      question: "Why is it more useful to give examples of how malware affects sensitive data than to just name malware types?",
      choices: [
        "Because naming types is more important than understanding impact",
        "Because understanding real impact on data (Confidentiality, Integrity, Availability) is what helps you respond appropriately, not just recognize a word",
        "Because malware never actually affects real data in practice",
        "Because this level of detail only matters for IT professionals, not students",
      ],
      correctIndex: 1,
      explanation:
        "Applied understanding — connecting malware categories to real data impact — is what drives an appropriate, calm response.",
    },
  ],
  reflection: {
    prompt:
      "Which malware category worries you most for your own devices (ransomware, spyware, trojan, etc.), and which one defender habit will you improve this week to reduce that risk?",
    placeholder: "Example: Ransomware worries me because of school files — I'll turn on backups and stop downloading random installers…",
  },
};
