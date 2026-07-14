import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson14: AILessonConfig = {
  id: "dl-14",
  title: "14. Troubleshoot Like a Tech Pro",
  goal: "Solve everyday technology problems with a calm, logical process — the same problem-solving pros use — and know how to find help and ask good questions when college portals, job sites, or shared docs break.",
  xpReward: 700,
  badge: "Problem Solver",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/13",
  nextHref: "/learn/digital/15",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Your Wi-Fi drops. An app freezes. A file won't open and a scary red error pops up — or a college portal won't accept your PDF five minutes before the deadline. The natural reaction is panic, frustration, or "ugh, I'm just bad at tech." Today you'll trade that panic for a calm, repeatable process — the exact one professionals use.\n\nHere's our roadmap:\n\n• **The troubleshooting mindset** — most tech problems are fixable, and you don't need to be an expert.\n• **A step-by-step process** — describe it, ask what changed, isolate it, try simple fixes first.\n• **Reading error messages** — they're clues, not insults.\n• **Decomposition and the "rubber duck" trick** — break it down and talk it out.\n• **How to ask for help well** — and when to back up first.\n• **Senior stretch** — troubleshooting college portals, job applications, and shared Google Docs.\n\nHere's the secret most people never learn: troubleshooting is a *skill*, not a talent. And it's used in literally every tech job there is.`,
        image: "/images/lessons/dl-14.png",
        imageAlt: "A calm teen at a laptop with a checklist, a Wi-Fi icon, and a friendly error message bubble",
        callout: {
          label: "Why it matters",
          text: "Every employer values someone who stays calm and works a problem instead of freezing or giving up. The ability to troubleshoot is one of the most transferable skills you can build — it works on computers, group projects, and life.",
        },
      },
      {
        id: "glossary",
        kicker: "Quick start",
        title: "Let's break down the words first",
        body: `A few words come up a lot when people fix tech. Here they are in plain language so nothing trips you up later.\n\n• **Troubleshooting** — a calm, step-by-step way of finding *what's wrong* and fixing it. Think "detective work for tech."\n• **Reboot / restart** — turning a device off and back on. It clears temporary clutter but does **not** delete your files.\n• **Error message** — the note a computer pops up when something goes wrong (like "No internet connection"). It's a clue, not an insult.\n• **Isolate the problem** — figuring out *where* the problem actually lives (one app? one device? everywhere?).\n• **Decomposition** — breaking one big, scary problem into small, checkable questions.\n• **Backup** — a saved copy of your files (photos, projects) kept somewhere safe, so a fix gone wrong can't wipe them out.\n\nKeep these in your back pocket — we'll use every one of them today.`,
        callout: {
          label: "Tip",
          text: "Notice the theme already: tech problems aren't magic. They have causes, and a calm process finds them. You don't need to be an expert — you need these few ideas and a little patience.",
        },
      },
      {
        id: "why-it-matters",
        kicker: "Real stakes",
        title: "Why calm troubleshooting is worth learning on purpose",
        body: `It's easy to treat "my thing is broken" moments as just bad luck. But how you respond has real consequences:\n\n• **Panicked clicking makes problems worse.** Randomly tapping buttons, force-quitting mid-save, or reinstalling before understanding the issue can turn a small glitch into lost work.\n• **Deadlines don't pause for tech problems.** A college portal freezing at 11:58 p.m. feels catastrophic in the moment — a calm process gets you unstuck faster than panic ever will.\n• **Every tech job assumes this skill.** No employer expects you to know every error message by heart; they expect you to stay level-headed and work through it methodically.\n• **It transfers everywhere.** The exact same process — describe, isolate, try simple fixes, ask well — works on group project conflicts and everyday problems, not just computers.\n\nThe goal isn't to never hit a problem again. It's to have a reliable process so a problem is an annoyance, not a crisis.\n\nThis whole process is also the **ISTE Computational Thinker** standard in action: developing and using a repeatable strategy — describe, isolate, test, ask well — to understand and solve problems, the same core move computer scientists use every day.`,
        callout: {
          label: "Why it matters",
          text: "The difference between someone who 'freaks out' at tech and someone who 'is good with computers' is almost never knowledge — it's whether they have a calm process to fall back on.",
        },
      },
      {
        id: "mindset",
        kicker: "The big idea",
        title: "The troubleshooting mindset: stay calm, it's fixable",
        body: `Before any button-pressing, the most important tool is your attitude. Pros don't fix things faster because they've memorized every error — they fix things because they stay **calm** and assume the problem **can** be solved.\n\nThree beliefs to adopt:\n\n• **Most tech problems are fixable.** The vast majority are common issues that thousands of people have already hit and solved.\n• **You don't need to be an "expert."** You need a *process* and a little patience. Experts are just people who've run the process many times.\n• **Frustration makes it worse.** When you're stressed, you click randomly and skip steps. A calm, slow approach is actually faster.\n\nThink of troubleshooting like a **doctor diagnosing a patient**: you don't guess wildly. You gather symptoms, rule things out, and test the simplest likely cause first. That mindset turns a "disaster" into a puzzle you can solve.`,
        callout: {
          label: "Common misconception",
          text: "\"I'm just bad at tech.\" There's no tech gene. People who seem great at it are usually just calm and systematic — they follow steps instead of panicking. That's a skill you can learn today.",
        },
      },
      {
        id: "mindset-practice",
        kicker: "Apply it",
        title: "Catch the panic response in the moment",
        body: `Let's make the mindset concrete. Picture this: five minutes before a deadline, a form won't submit and shows a red error. Two possible reactions:\n\n• **The panic response:** frantically click submit ten more times, refresh mid-typing and lose your answers, close the tab entirely and reopen from scratch, or immediately assume "everything is broken forever."\n• **The calm response:** take one breath, actually read what the error says, and remind yourself "this is probably a common, fixable issue" before touching anything else.\n\nThe calm response isn't about suppressing stress — it's about not letting stress skip the one step (reading the actual error) that usually points straight to the fix. Panic clicking often deletes the exact information (the error message, your typed answers) that would have solved the problem in seconds.`,
        checkIn: {
          prompt: "A form shows a red error five minutes before your deadline. Which response follows the troubleshooting mindset from this lesson?",
          choices: [
            "Immediately close the tab and start completely over without reading the error",
            "Pause, read exactly what the error says, and treat it as a common, likely-fixable issue rather than a disaster",
            "Assume the entire internet is broken and give up",
            "Click submit rapidly ten times in a row",
          ],
          correctIndex: 1,
          explanation:
            "The troubleshooting mindset starts with staying calm enough to actually read the clue in front of you — the error message — instead of reacting with panic that often destroys useful information like unsaved answers.",
        },
        callout: {
          label: "Pro tip",
          text: "When you feel the panic urge to click frantically, try naming it out loud: 'I'm panicking, let me just read this first.' That tiny pause is often the whole fix.",
        },
      },
      {
        id: "process",
        kicker: "Concept",
        title: "A systematic process you can run every time",
        body: `When something breaks, resist the urge to randomly click. Run these steps in order:\n\n**1. Describe the problem clearly.** What exactly is happening? "It's broken" isn't useful. "When I open the app, it shows a white screen and closes after 3 seconds" is gold.\n\n**2. Ask: what changed?** Did you just update something, install an app, plug in a new device, or change a setting? New problems usually have a recent cause.\n\n**3. Isolate it.** Does it happen *everywhere* or just one place? If only one app has no internet but others work, the problem is that app — not your Wi-Fi. Narrowing *where* the problem lives is half the battle.\n\n**4. Try the simplest fixes first.** In order: restart/reboot the device, check connections (cables, Wi-Fi), make sure it's charged, and check for updates. These cheap, fast steps fix a huge share of problems.\n\n**Browser acting weird after you installed something?** A new **browser extension** (ad blocker, coupon tool, theme) can break sites — login pages, college portals, and Google Docs included. Disable extensions one at a time (or turn them all off), refresh, and retest. If the problem started right after an install, that's a strong clue.\n\n**5. Search the EXACT error message.** Copy the precise wording into a search engine. Odds are someone has hit the same error and posted the fix.\n\nWork top to bottom. Don't jump to dramatic fixes when a restart would've done it.`,
        bullets: [
          "**Describe** the problem precisely.",
          "Ask **what changed** recently.",
          "**Isolate** it — one app/device, or everywhere?",
          "Try **simple fixes first** (restart, connections, charge, update).",
          "**Disable new browser extensions** if a site broke after install.",
          "**Search the exact error message.**",
        ],
        image: "/images/lessons/dl-14-2.png",
        imageAlt: "A simple five-step troubleshooting flowchart: describe, what changed, isolate, simple fixes, search the error",
        callout: {
          label: "Watch out",
          text: "The #1 mistake is skipping the simple steps because they feel too obvious. Pros restart first *every time*. \"Too simple\" fixes are simple precisely because they work so often.",
        },
      },
      {
        id: "process-practice",
        kicker: "Apply it",
        title: "Run the process on a real scenario",
        body: `Let's practice the five-step process on a new problem: **your video call keeps freezing during an online tutoring session.**\n\n**1. Describe it precisely.** "The video freezes every few minutes but the audio keeps going, then it catches back up." (Much better than "it's glitchy.")\n\n**2. What changed?** Did you just switch Wi-Fi networks, update the app, or add a new browser tab streaming music in the background?\n\n**3. Isolate it.** Does it happen on this call only, or on every call? Does it happen on Wi-Fi but not on cellular data? Each answer rules something in or out.\n\n**4. Try simple fixes.** Close other tabs and apps using bandwidth, move closer to the router, restart the call, or restart the device.\n\n**5. Search the exact error** if one appears (like "connection unstable"), or search "[app name] video freezing but audio works."\n\nNotice how each step narrows the possibilities instead of guessing randomly.`,
        checkIn: {
          prompt: "During a video call, the video freezes every few minutes but audio keeps working fine. According to the process, what should you check next?",
          choices: [
            "Immediately buy a new laptop",
            "Nothing — freezing video always means the device is permanently broken",
            "What recently changed (new tabs, network switch, app update) and whether it happens on every call or just this one",
            "Delete the app and never use video calls again",
          ],
          correctIndex: 2,
          explanation:
            "Following the process means checking what changed and isolating whether the issue is specific to this call/network/app, rather than jumping to a drastic conclusion.",
        },
        callout: {
          label: "Pro tip",
          text: "Bandwidth-heavy background activity (another device streaming, a big download running) is one of the most common, most overlooked causes of video call freezing. Check it before assuming your device is broken.",
        },
      },
      {
        id: "restart",
        kicker: "Concept",
        title: "Why 'turn it off and on again' actually works",
        body: `It's a meme, but it's real engineering wisdom. Restarting fixes problems shockingly often — and here's *why*.\n\nWhile a device runs, it holds a lot of temporary state in memory: half-finished tasks, leftover data, processes that got stuck or tangled. Sometimes one of those gets into a bad, frozen state and gums up everything around it.\n\nA **reboot (restart)** wipes that temporary mess and starts fresh from a known-good condition. It doesn't delete your files — it just clears the short-term clutter and stuck processes. Think of it like a confused, overtired brain that just needs a good night's sleep to think straight again.\n\nThat's why "did you try turning it off and on again?" isn't a lazy joke to tech-support pros — it's the highest-value first move, because it resolves a stuck temporary state in seconds.`,
        callout: {
          label: "Common misconception",
          text: "\"Restarting is a cop-out / lazy fix.\" It's actually the smartest first move. Clearing a stuck temporary state solves a massive share of problems in seconds — pros do it on purpose, not out of laziness.",
        },
      },
      {
        id: "errors",
        kicker: "Concept",
        title: "Error messages are clues, not insults",
        body: `An error message looks scary, so most people panic, close it instantly, and miss the one thing that would've helped: the message itself.\n\nReframe it: **an error message is a clue, not an insult.** The computer is *trying to tell you* what went wrong. Read it slowly. Often it names the problem ("No internet connection," "File not found," "Storage full," "File exceeds size limit") and sometimes even suggests a fix.\n\nTwo habits make errors your friend:\n\n• **Read the whole thing** before clicking away. Look for the specific part that tells you *what* and *where*.\n• **Copy the exact wording** and search it. Error messages are often standardized, so someone, somewhere, has already explained that exact one online.\n\nThe difference between someone who "can't do tech" and someone who can is often just this: one closes the error in fear, the other reads it for clues.`,
        callout: {
          label: "Common misconception",
          text: "\"Error messages are scary and useless.\" They're the opposite — they're free hints from the computer about what's wrong. Reading the exact text (and searching it) is one of the fastest ways to a fix.",
        },
      },
      {
        id: "level-up-vocabulary",
        kicker: "Level up",
        title: "A few more troubleshooting words worth knowing",
        body: `A handful of terms show up once you start reading tech support articles or talking to an IT desk. Quick, plain-language versions:\n\n• **Reproduce the bug** — making the problem happen again on purpose, in a controlled way, so you (or someone helping you) can actually study it instead of chasing something random.\n• **Cache** — a folder of temporary saved data websites and apps use to load faster. A corrupted cache can cause weird glitches; "clearing the cache" is a common, safe fix.\n• **Safe mode** — a stripped-down way of starting a device with only essential parts running, useful for figuring out if an add-on or app (not the core system) is causing a problem.\n• **Clean install / factory reset** — wiping a device back to its original settings. It's a last resort, not a first move, and it's exactly why backups matter.\n• **Ticket** — a tracked support request, common at schools, colleges, and workplaces, that documents a problem and its status until it's resolved.\n\nKnowing these means an IT desk's instructions ("clear your cache," "try safe mode," "I've opened a ticket") won't feel like a foreign language.`,
        checkIn: {
          prompt: "IT support asks you to 'reproduce the bug' before they can help further. What are they actually asking you to do?",
          choices: [
            "Delete all your files",
            "Ignore the problem entirely",
            "Buy a new device",
            "Make the exact problem happen again, in a way you can describe step by step, so they can understand and study it",
          ],
          correctIndex: 3,
          explanation:
            "Reproducing a bug means triggering it again on purpose and noting the exact steps. That turns a vague 'it's broken sometimes' into a clear, checkable pattern a helper can actually work with.",
        },
        callout: {
          label: "Tip",
          text: "If you can reliably make a problem happen the same way twice, you're most of the way to either fixing it yourself or writing a great help request.",
        },
      },
      {
        id: "decomposition",
        kicker: "Concept",
        title: "Break it down — and explain it to a rubber duck",
        body: `Big problems feel overwhelming until you split them up. **Decomposition** means breaking one big problem into smaller, checkable parts — a core move in computational thinking (how computer scientists solve problems).\n\nSay "my video won't upload." Don't treat it as one giant mystery. Break it into questions you can each check:\n\n• Is the file too big?\n• Is my internet working?\n• Is the website/app down for everyone?\n• Is the file in a format the site accepts?\n\nNow you have small, answerable checks instead of one scary blob.\n\nThere's also a famous trick called **rubber duck debugging**: explain the problem out loud, step by step, as if to a rubber duck (or any patient object — or a friend). Forcing yourself to say it slowly and completely often makes the answer pop out *before* you even finish. Talking it through reveals the gap your panicked brain skipped.\n\nAnd always **write down what you tried.** It stops you from repeating the same step and gives you a perfect list to share if you need help.`,
        callout: {
          label: "Pro tip",
          text: "Keep a tiny \"what I tried\" list as you go: restarted (no change), checked Wi-Fi (fine), searched the error (found a thread). This saves you from looping — and becomes the heart of a great help request.",
        },
      },
      {
        id: "decomposition-practice",
        kicker: "Apply it",
        title: "Break down a scary, vague problem",
        body: `Let's decompose a genuinely stressful one: **"my whole college application portal account is broken."** That sentence alone is too big to act on. Split it up:\n\n• Can I **log in** at all, or does it fail before that?\n• If I can log in, does the problem happen on **every page**, or just one (like the upload page)?\n• Does it happen on **this device only**, or also on my phone or a friend's computer?\n• Does it happen in **every browser**, or just one?\n• Is there a **specific error message**, or does it just look frozen?\n\nSuddenly "everything is broken" becomes a short list of yes/no questions you can actually check one at a time — and probably solve, or at least describe clearly to a help desk, in a few minutes.`,
        checkIn: {
          prompt: "You say 'my whole college portal account is broken,' but haven't checked anything specific yet. What's the best next move using decomposition?",
          choices: [
            "Break it into small, checkable questions — can I log in? does it happen on every page? every device? every browser?",
            "Call the college and demand a refund",
            "Immediately create a brand new account",
            "Assume the entire portal is down for everyone and give up",
          ],
          correctIndex: 0,
          explanation:
            "Decomposition turns one overwhelming, vague problem into a short list of specific, checkable questions — each answer narrows down what's actually wrong.",
        },
        callout: {
          label: "Pro tip",
          text: "If you're too stressed to decompose a problem in your head, try literally saying it out loud to a rubber duck, a pet, or a friend — narrating it slowly often reveals the missing check on its own.",
        },
      },
      {
        id: "help",
        kicker: "Concept",
        title: "Asking for help is a skill — do it well",
        body: `Sometimes you do everything right and still need help. That's normal — even senior engineers ask each other for help constantly. The skill is asking in a way that gets you a fast, useful answer.\n\nA **bad help request** is: *"It's broken, can you fix it?"* The helper has nothing to work with, so they have to drag every detail out of you.\n\nA **good help request** includes four things:\n\n• **What you were doing** — "I was trying to upload a 2-minute video to the class site."\n• **What you expected** — "I expected it to upload like usual."\n• **What actually happened** — "Instead I got this exact error: 'File exceeds 100 MB limit.'"\n• **What you already tried** — "I restarted, checked my Wi-Fi, and searched the error."\n\nThat single message respects the helper's time, shows you put in effort, and usually gets you fixed in one reply. It works for a teacher, IT support, an online forum, a college help desk, or a future boss.`,
        bullets: [
          "Say **what you were doing**.",
          "Say **what you expected** to happen.",
          "Say **what actually happened** (exact error text).",
          "Say **what you already tried**.",
        ],
        callout: {
          label: "Watch out",
          text: "Before any risky fix (resetting, deleting, reinstalling, wiping settings), BACK UP your important files first. A backup means a fix that goes wrong costs you nothing instead of your photos and projects.",
        },
      },
      {
        id: "senior-troubleshoot",
        kicker: "For older teens",
        title: "When college portals, job sites & shared docs break",
        body: `High-stakes systems fail at the worst times. Here's how the same process maps to real senior scenarios:\n\n• **College / scholarship portal rejects your upload** — Read the exact error. Often it's file type (needs PDF), size limit, or a required field left blank. Convert/compress, rename clearly, try another browser, then email the help desk with what you tried.\n• **Job application site freezes mid-form** — Don't rage-refresh and lose everything. Copy your answers into a doc first next time; for now, try another browser, clear cache, or restart — and screenshot the error for HR if the deadline is close.\n• **Group Google Doc chaos** — Someone deleted a section? Use **Version history** before rewriting. Can't edit? Check **permissions** (view vs. edit). Conflicting changes? Comment instead of overwriting.\n• **Professional email bounce** — Check the address, attachment size, and whether you're sending from the right account. Attach PDFs under size limits.\n\nYounger teens: the same moves fix class LMS uploads and shared homework docs.`,
        bullets: [
          "Portal errors often mean wrong file type, size, or missing fields.",
          "Copy long form answers into a doc before submitting.",
          "Use version history and permissions on shared Docs.",
          "Write clear help-desk emails with exact errors.",
        ],
        callout: {
          label: "Pro tip",
          text: "Don't wait until 11:59 p.m. on deadline night to upload. Portals get slow when everyone hits submit at once — and calm troubleshooting needs a little time buffer.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Your laptop won't connect to Wi-Fi — walk it through",
        body: `Let's run the whole process on a super-common problem: your laptop won't get online. Watch how calm and orderly this is.\n\n**Step 1 — Describe it.** "My laptop shows 'No internet connection,' but my phone is online on the same Wi-Fi."\n\n**Step 2 — What changed?** Did I just move rooms, update the laptop, or change a setting? Nothing obvious — okay, keep going.\n\n**Step 3 — Isolate it.** My phone works on this Wi-Fi, so the *network* is fine. The problem is the *laptop*. That instantly rules out half the possible causes.\n\n**Step 4 — Simple fixes first.** Toggle the laptop's Wi-Fi off and on. Still nothing? **Restart the laptop** (clears any stuck state). Check I'm joined to the right network and typed the password right.\n\n**Step 4b — Forget and rejoin.** If toggle and restart fail, **forget the network** in Wi-Fi settings (remove the saved network), then join again and re-enter the password. That clears a bad saved connection without replacing the router.\n\n**Step 5 — Search the exact error.** Still stuck? Search "[my laptop model] won't connect to Wi-Fi but other devices do." Try the top, reputable fix.\n\n**Step 6 — Ask for help, well.** If it's still broken, send IT a clear request:`,
        code: `Subject: Laptop won't connect to Wi-Fi (other devices work)

What I was doing: Trying to get my laptop online for homework.
Expected: It connects to our home Wi-Fi like usual.
What happened: It says "No internet connection." My phone IS online
  on the same Wi-Fi, so the network itself works.
What I tried: Toggled Wi-Fi off/on, restarted the laptop, confirmed
  the right network + password, searched the exact message.`,
        codeCaption: "A help request a teacher or IT desk can actually act on",
        image: "/images/lessons/dl-14-3.png",
        imageAlt: "A laptop showing a 'no internet' icon next to a phone that is happily online on the same Wi-Fi, illustrating how to isolate the problem",
        callout: {
          label: "Pro tip",
          text: "Notice step 3 did the heavy lifting: because the phone worked, you knew the problem was the laptop, not the network. Isolating *where* a problem lives saves you from fixing the wrong thing.",
        },
      },
      {
        id: "worked-2",
        kicker: "Worked example",
        title: "A college portal upload failure — walk it through",
        body: `Now a higher-stakes version: it's the night before a scholarship deadline, and the portal rejects your transcript PDF. Let's run the same calm process.\n\n**Step 1 — Describe it.** "Uploading my transcript.pdf gives the error: 'File exceeds 5 MB limit.'"\n\n**Step 2 — What changed?** Nothing on my end changed — this is just the first time I've tried uploading this specific file.\n\n**Step 3 — Isolate it.** The error is specific and file-related, not a login or network issue — so the fix should focus on the file itself, not my Wi-Fi or the portal being "down."\n\n**Step 4 — Try simple fixes first.** Compress the PDF using a free online PDF compressor, or re-export it at a lower quality setting from the original document. Re-check the file size before re-uploading.\n\n**Step 5 — Search the exact error if it's unclear.** Searching "[portal name] file exceeds 5 MB limit" might reveal the portal's own recommended compression tool.\n\n**Step 6 — If it's still stuck close to the deadline, ask for help well.** Email the help desk with exactly what you were doing, the exact error, and what you already tried — and mention the deadline clearly so they understand the urgency.\n\nSame process, higher stakes — which is exactly why staying calm and methodical (instead of panic-refreshing) matters most here.`,
        checkIn: {
          prompt: "A scholarship portal says 'File exceeds 5 MB limit' when you try to upload your transcript PDF the night before the deadline. What's the best first move?",
          choices: [
            "Assume the portal is broken and email an angry complaint immediately",
            "Compress or re-export the PDF at a smaller file size, since the error specifically names the file size as the problem",
            "Give up on the scholarship entirely",
            "Keep resubmitting the exact same file repeatedly",
          ],
          correctIndex: 1,
          explanation:
            "The error message directly names the cause: the file is too large. Reading it and acting on it — compressing or re-exporting the file — is far faster than panicking or resubmitting the same oversized file.",
        },
        callout: {
          label: "Pro tip",
          text: "Test uploads for anything high-stakes a day or two before the deadline, not the night of. That gives you time to troubleshoot calmly instead of racing the clock.",
        },
      },
      {
        id: "troubleshoot-checklist",
        kicker: "Take action",
        title: "Your go-to troubleshooting checklist",
        body: `Keep this short list somewhere you'll actually see it — a notes app, a sticky note — so it's ready the next time something breaks:\n\n1. **Pause.** Take one breath before touching anything else.\n2. **Describe it precisely** — what exactly is happening, in specific words.\n3. **What changed recently?**\n4. **Isolate it** — one app, one device, or everywhere?\n5. **Try the simplest fixes first** — restart, check connections, check for updates.\n6. **Read and search the exact error message.**\n7. **If still stuck, write a good help request** — what you were doing, expected, saw, and tried.\n\nSeven steps, but you rarely need all of them — most problems get solved by step 5. Having the list ready means you never have to remember it under stress.`,
        checkIn: {
          prompt: "You're mid-panic over a broken app and can't remember what to do first. According to this checklist, what's actually step one?",
          choices: [
            "Immediately uninstall and reinstall everything",
            "Assume the device is permanently broken",
            "Call every tech support number you can find at once",
            "Pause and take a breath before touching anything else",
          ],
          correctIndex: 3,
          explanation:
            "The checklist deliberately starts with pausing, because a calm start is what makes every later step (describing, isolating, reading the error) actually effective instead of rushed and error-prone.",
        },
        callout: {
          label: "Try this today",
          text: "Save this checklist somewhere accessible right now, before you need it. The best time to find a checklist is before the stressful moment, not during it.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've got a real pro's toolkit now: stay **calm** (most problems are fixable), run the **process** (describe → what changed → isolate → simple fixes → search the exact error), know **why restarting works**, read **error messages** as clues, use **decomposition** and the **rubber duck** trick, write down what you tried, and ask for help with a clear, four-part request — backing up before anything risky. The same process fixes college portals, job sites, and shared Docs.\n\nThis isn't just for emergencies. It's a core skill in *every* tech job, and honestly in every job. Calm, logical problem-solvers are the people teams rely on.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then reflect on a tech problem you've solved — or one you'll tackle next.`,
      },
    ],
  },
  bigIdeas: [
    "Troubleshooting is a **skill, not a talent** — stay calm and assume it's fixable.",
    "Run a **process**: describe it, ask what changed, isolate it, try simple fixes first, then search the exact error.",
    "Error messages are **clues**, restarting clears stuck states, and a **good help request** says what you did, expected, saw, and tried — including for portals and shared docs.",
  ],
  keyTerms: [
    { term: "Troubleshooting", definition: "A calm, systematic process for finding and fixing the cause of a technology problem." },
    { term: "Reboot / restart", definition: "Turning a device off and on to clear stuck temporary states and start fresh — without deleting your files." },
    { term: "Error message", definition: "A note from the computer describing what went wrong; a clue to read and search, not an insult to fear." },
    { term: "Decomposition", definition: "Breaking one big problem into smaller, checkable parts — a core computational-thinking skill." },
    { term: "Isolating the problem", definition: "Narrowing down whether an issue happens everywhere or in just one app or device." },
    { term: "Good help request", definition: "A request that states what you were doing, what you expected, what actually happened, and what you already tried." },
  ],
  realWorld:
    "In tech jobs, no one expects you to know everything — they expect you to debug calmly, search well, and write clear help requests. These exact habits are what separate people who get stuck from people who ship fixes — and they save college applications and internship forms too.",
  quiz: [
    {
      id: "q1",
      question: "Your friend freezes when a college portal shows a red error and says 'I'm just bad at tech.' What's the most accurate response?",
      choices: [
        "Only experts can fix anything",
        "They're right — some people just can't do tech",
        "Troubleshooting is a learnable process, not a talent; staying calm and systematic is the real skill",
        "They should buy a new device",
      ],
      correctIndex: 2,
      explanation:
        "There's no tech 'gene.' People who seem great at tech mostly stay calm and follow a process. That process is exactly what this lesson teaches.",
    },
    {
      id: "q2",
      question: "You're trying to submit a job application. Your laptop has no internet, but your phone works fine on the same Wi-Fi. What has this told you?",
      choices: [
        "The problem is isolated to the laptop, not the network",
        "The Wi-Fi network is completely down",
        "Nothing useful",
        "You need a new phone",
      ],
      correctIndex: 0,
      explanation:
        "Since another device works on the same network, the network is fine and the problem lives in the laptop. Isolating where a problem is rules out half the causes.",
    },
    {
      id: "q3",
      question: "A shared Google Doc for your group project is acting weird after hours of edits. Why does 'turn it off and on again' (restart the browser/device) fix so many problems?",
      choices: [
        "It deletes all your files and starts over",
        "It's just a joke with no real effect",
        "It clears stuck temporary states in memory and restarts from a known-good condition",
        "It installs new hardware",
      ],
      correctIndex: 2,
      explanation:
        "A restart wipes the short-term clutter and stuck processes a running device builds up — without deleting your files. That's why it's a pro's first move.",
    },
    {
      id: "q4",
      question: "A college portal says: 'Upload failed: File exceeds 5 MB limit.' What's the smartest move?",
      choices: [
        "Click random buttons until it goes away",
        "Close it instantly so you don't have to look at it",
        "Assume your device is permanently broken",
        "Read it carefully — then compress/convert the file or search that exact wording for a fix",
      ],
      correctIndex: 3,
      explanation:
        "Error messages are clues. This one literally names the problem (file too big). Reading the exact text and acting on it — or searching it — is the fastest path to a fix.",
    },
    {
      id: "q5",
      question: "You need help from the college IT help desk after a portal upload fails. Which is the best, most helpful way to ask?",
      choices: [
        "\"I tried to upload my transcript PDF and got 'File exceeds 5 MB limit.' I compressed it once and tried Chrome and Safari. What should I try next?\"",
        "Sending no details and waiting",
        "\"It's broken, can you fix it?\"",
        "\"It won't work, ugh\"",
      ],
      correctIndex: 0,
      explanation:
        "A good help request states what you were doing, what you expected, what actually happened (exact error), and what you already tried — so the helper can solve it fast.",
    },
    {
      id: "q6",
      question: "IT support asks you to 'reproduce the bug' before helping further. What are they asking you to do?",
      choices: [
        "Delete the app permanently",
        "Make the exact problem happen again in a describable, repeatable way so it can actually be studied",
        "Ignore the problem and hope it goes away",
        "Buy new hardware immediately",
      ],
      correctIndex: 1,
      explanation:
        "Reproducing a bug means triggering it again on purpose and noting the exact steps, turning a vague complaint into a clear, checkable pattern a helper can work with.",
    },
    {
      id: "q7",
      question: "You say 'my whole college portal account is broken' without checking anything specific. What does decomposition suggest as the next step?",
      choices: [
        "Create a brand-new account immediately",
        "Call the college and demand a refund",
        "Break it into small, checkable questions — can I log in? Does it happen on every page, device, and browser?",
        "Assume the entire portal is down for everyone and give up",
      ],
      correctIndex: 2,
      explanation:
        "Decomposition turns one overwhelming, vague problem into a short list of specific, checkable questions, each of which narrows down what's actually going on.",
    },
    {
      id: "q8",
      question: "Five minutes before a deadline, a form shows a red error. Which response best matches the troubleshooting mindset from this lesson?",
      choices: [
        "Assume the whole internet is broken and give up",
        "Pause, read exactly what the error says, and treat it as a likely common, fixable issue",
        "Click submit rapidly over and over without reading anything",
        "Close the tab immediately and start completely over from scratch",
      ],
      correctIndex: 1,
      explanation:
        "The troubleshooting mindset starts with staying calm enough to read the error message — the exact clue that panic-clicking or restarting from scratch would otherwise destroy or skip past.",
    },
  ],
  reflection: {
    prompt:
      "Think of a tech problem you've faced (or one you have now) — Wi-Fi, a portal upload, a shared Doc, or a frozen app. Walk it through the process: how would you describe it, what changed, how could you isolate it, and what simple fixes would you try first?",
    placeholder: "Example: My game keeps crashing. It started after an update… I'd check if other apps crash too, then restart and reinstall…",
  },
};
