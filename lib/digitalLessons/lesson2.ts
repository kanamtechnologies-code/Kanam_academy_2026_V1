import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson2: AILessonConfig = {
  id: "dl-2",
  title: "2. Files, Folders & the Cloud",
  goal: "Organize files in folders, understand file types and extensions, know the difference between save and save-as, and use cloud storage with sync and backups.",
  xpReward: 100,
  badge: "File Wrangler",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/1",
  nextHref: "/learn/digital/3",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Ever lost an essay the night before it was due? Or scrolled through a Downloads folder so messy you couldn't find anything? Today you'll learn the skills that make sure that never happens again — explained from scratch, no jargon assumed.\n\nHere's our roadmap:\n\n• **Files and folders** — what they really are and how to nest them neatly.\n• **File extensions** — the little \`.jpg\` or \`.pdf\` ending that tells you what's inside.\n• **Save vs. Save As** — a tiny difference that saves you from huge mistakes.\n• **Cloud storage, sync, and backups** — keep your stuff safe and on every device, and why those two are NOT the same thing.\n• **Traps, habits, and a real case study** — so this sticks past today.\n\nThis is one of the most useful "boring" skills there is. Good file habits make you faster, calmer, and look seriously professional — whether you're sharing a group-project draft, uploading a scholarship essay, or sending a resume to an internship.`,
        image: "/images/lessons/dl-2.png",
        imageAlt: "Laptop file manager showing nested folders next to a phone with cloud sync icons",
        callout: {
          label: "Why it matters",
          text: "Teachers, bosses, and teammates all judge how organized you are by how easily you can find and share the right file. \"I know it's here somewhere…\" is not a great look during a group project deadline — or a job application portal that closes at midnight.",
        },
      },
      {
        id: "hook-story",
        kicker: "Real moment",
        title: "The essay that vanished into 'Downloads'",
        body: `Maya finished her college essay at 1 a.m., feeling proud. She saved it, closed her laptop, and went to bed. The next afternoon, ten minutes before the portal closed, she went to upload it — and couldn't find it anywhere. Her Downloads folder had 214 files: screenshots, random PDFs, three things literally named "document," and somewhere in there, hopefully, her essay.\n\nShe found it with two minutes to spare, hands shaking, after opening a dozen wrong files first. It uploaded fine — but Maya swore that would never happen again.\n\nThe fix isn't luck or a faster laptop. It's a simple system: clear folders, clear names, and knowing where your cloud files actually live. That's exactly what this lesson builds.`,
        callout: {
          label: "Keep this in mind",
          text: "The panic of \"I know it's here somewhere\" is almost always a folder-and-naming problem, not a technology problem. It's completely preventable.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "The core words, in plain English",
        body: `This lesson has a handful of key words. Here they are up front in everyday language, so the rest of the lesson reads easily. We'll explain each one again as it comes up too.\n\n• A **file** is one saved thing — a single essay, photo, song, or video.\n• A **folder** is a container that holds files (and other folders), just like a real folder in a drawer.\n• To **save** is to write your work onto storage so it's still there after you close the app or turn the device off. If you don't save, your work can vanish.\n• The **cloud** means storing your files on computers over the internet (like Google Drive) instead of only on the device in your hands.\n\nKeep these in mind and you're set. Everything else builds on these four ideas.`,
        callout: {
          label: "Pro tip",
          text: "Get in the habit of saving often while you work — many apps even save automatically, but never assume. A quick save every few minutes means a crash or dead battery can never erase an hour of effort.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "Files live in folders, and folders nest inside folders",
        body: `A **file** is a single saved item on a computer — one essay, one photo, one song, one video. Everything you save is a file.\n\nA **folder** (also called a **directory** — same thing, just the more technical word) is a container that holds files and other folders. Folders can **nest**, which means putting one folder inside another folder inside another — so you can group things from broad to specific.\n\nThink of it like a **backpack with labeled pockets**. The whole backpack is your storage. Inside, a big pocket says "School." Inside *that* is a smaller pouch for "English," and inside *that* is your essay. Each layer narrows things down so you can grab exactly what you need without dumping everything out.\n\nThe trail of folders that leads to a file is its **file path**. Something like \`School/English/essay.docx\` reads left to right: open School, then English, then the file. It's basically the file's home address — the slashes \`/\` just separate one folder from the next.`,
        image: "/images/lessons/dl-2-2.png",
        imageAlt: "Laptop Finder or File Explorer window showing nested School, English, and essay.docx folders and files",
        bullets: [
          "**File** = one saved item (a doc, photo, song, video).",
          "**Folder / directory** = a container for files and other folders.",
          "Folders **nest** to group things from broad to specific.",
          "**File path** = the trail of folders to a file, like \`School/English/essay.docx\`.",
        ],
        callout: {
          label: "Pro tip",
          text: "Build folders from general to specific: School → Subject → Project. Future you will find any file in seconds instead of scrolling through hundreds of loose items — the exact fix Maya needed.",
        },
        checkIn: {
          prompt: "A file lives at School/Science/lab-report.docx. What does that file path tell you?",
          choices: [
            "The file has three saved versions",
            "The file is named School",
            "lab-report.docx is nested inside a Science folder, which is nested inside a School folder",
            "The file only exists in the cloud",
          ],
          correctIndex: 2,
          explanation:
            "A file path reads from broad to specific, left to right. School is the outer folder, Science is nested inside it, and lab-report.docx is the file inside Science.",
        },
      },
      {
        id: "concept-2",
        kicker: "Reading the label",
        title: "File extensions tell you what kind of file it is",
        body: `At the end of almost every file name is a dot and a few letters — the **file extension**. It's a label that tells your computer (and you) what *type* of file it is and which app should open it. In \`essay.docx\`, the \`.docx\` is the extension.\n\nThink of it like the **label on a can of food**. The label says "soup" or "beans" so you know what's inside before you open it. Change the label and you've fooled no one — the contents are still the same.\n\nHere are common ones you'll meet constantly:\n\n• \`.docx\` — a Word document (text, essays).\n• \`.pdf\` — a fixed-layout document that looks the same on every device (often required for applications).\n• \`.jpg\` and \`.png\` — images/photos (\`.png\` can keep see-through backgrounds; \`.jpg\` makes smaller photo files).\n• \`.mp3\` — audio/music. \`.mp4\` — video.\n• \`.csv\` — a simple spreadsheet of values separated by commas.\n• \`.zip\` — a compressed bundle that squishes many files into one for easy sharing.`,
        table: {
          columns: ["Extension", "What's inside", "Opens with"],
          values: [
            [".docx", "Editable text document", "Word, Google Docs"],
            [".pdf", "Fixed-layout document", "Any PDF viewer / browser"],
            [".jpg / .png", "Image or photo", "Photos app, browser"],
            [".mp4", "Video", "Video player"],
            [".csv", "Spreadsheet data", "Excel, Google Sheets"],
            [".zip", "Compressed file bundle", "Built-in unzipper"],
          ],
          rowCount: 6,
        },
        callout: {
          label: "Common misconception",
          text: "Renaming \"photo.jpg\" to \"photo.png\" does NOT actually convert the image — it just slaps on a new label while the insides stay the same, which can make the file refuse to open. To truly change a file type, you must export or convert it with an app.",
        },
        checkIn: {
          prompt: "A scholarship portal requires a PDF, so you rename 'essay.docx' to 'essay.pdf'. What really happens?",
          choices: [
            "The essay is permanently deleted",
            "Only the label changes — the contents stay a Word file, so the upload may fail to open correctly",
            "The file automatically uploads to the cloud",
            "The document instantly becomes a real, working PDF",
          ],
          correctIndex: 1,
          explanation:
            "An extension is just a label, like a sticker on a can. Renaming doesn't convert the contents. To truly make a PDF, you must export or 'Save as PDF' from the app.",
        },
      },
      {
        id: "concept-3",
        kicker: "A tiny but mighty difference",
        title: "Save vs. Save As — know which one to use",
        body: `These two buttons look almost identical, but mixing them up is how people *overwrite* (write over and replace) work they wanted to keep.\n\n• **Save** updates the *current* file in place. It keeps the same name and location and replaces the old version with your latest changes. Use it constantly while you work.\n• **Save As** creates a *new copy* with a new name or location, leaving the original untouched. Use it when you want to keep the old version AND make a different one.\n\nImagine you have \`essay.docx\` and your teacher asks for a shorter version. If you cut half the text and hit **Save**, the long version is gone forever — you wrote over it. Instead, use **Save As** to make \`essay-short.docx\` — now you safely have both.`,
        callout: {
          label: "Watch out",
          text: "Hitting Save after deleting big chunks of a file overwrites the original — there's no \"undo\" once you close it. When in doubt, Save As a new copy first, then edit freely.",
        },
        checkIn: {
          prompt: "You have 'essay.docx' and need a shorter version for a college app while keeping the original. What should you do?",
          choices: [
            "Use Save As to make a new copy like 'essay-short.docx'",
            "Turn off sync first",
            "Rename the extension to .pdf",
            "Delete half the text and hit Save",
          ],
          correctIndex: 0,
          explanation:
            "Save As creates a new copy and leaves the original untouched, so you keep both versions. Hitting Save after cutting text would overwrite and lose the original.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Rescuing an overwritten essay with version history",
        body: `Picture this disaster: your history essay is due tomorrow. You meant to edit a copy, but you accidentally deleted three paragraphs and hit **Save** on the real file — then closed it. The good paragraphs are gone. Or are they? Let's fix it step by step.\n\n**Step 1 — Don't panic, and stop typing.** The original is still recoverable as long as the file lives in cloud storage with version history (Google Drive, OneDrive, etc.). New edits could pile up, so pause.\n\n**Step 2 — Open version history.** Find the file and open its "Version history" or "Manage versions" option (usually in the File menu). You'll see a list of automatic snapshots with dates and times.\n\n**Step 3 — Preview earlier versions.** Click a snapshot from *before* you deleted the paragraphs. You can read it to confirm the missing text is there.\n\n**Step 4 — Restore (or Save As a copy).** Restore that earlier version, or use **Save As** to keep both the old and new copies. Crisis averted — and now you know to use **Save As** before big edits next time.`,
        image: "/images/lessons/dl-2-3.png",
        imageAlt: "Browser showing a Google Drive or OneDrive document with version history panel open on a laptop screen",
        callout: {
          label: "Pro tip",
          text: "Before making major changes to any important file, do a quick \"Save As\" to create a dated copy first. It takes five seconds and turns a potential disaster into a non-event.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "Sync is NOT the same as a backup",
        body: `This is the single most dangerous mix-up in this whole lesson. **Sync** (short for *synchronize*) means "keep matched" — when sync is on, a change you make on your phone automatically shows up on your laptop, and the other way around, because every device is pulling from the same single copy in the cloud.\n\nHere's the catch: sync also copies **deletions**. If you delete a file on one synced device, sync can delete it everywhere else too — including the cloud copy. One accidental delete, and every "copy" disappears together, because they were never separate in the first place.\n\nA true **backup** is a genuinely **separate** copy that survives even if the original is deleted or corrupted. "It's saved somewhere" is not a backup. You only have a real backup when a second, independent copy exists — ideally one you didn't touch when you deleted the original.`,
        callout: {
          label: "Myth check",
          text: "\"My files are safe, they're synced to the cloud!\" is a half-truth. Sync protects you from a broken device, but not from your own accidental delete — for that, you need an actual backup.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Pick the file name that would actually survive finals week",
        body: `Practice the naming skill Maya needed. For a history essay due Friday, which file name would you want six months from now, searching for it in a hurry?\n\n• \`essay final FINAL v3 REAL.docx\` — vague, no date, tells you nothing about which is truly final.\n• \`Untitled document (3).docx\` — the default name apps give you if you never rename it. Useless for searching later.\n• \`history-essay-jordan-2026-03-12.docx\` — tells you *what* it is, *whose* it is, and *when*, and it will sort correctly next to other dated files.\n\nThe winning pattern is always the same: \`what-who-date.ext\`. It answers three questions in one glance, which is exactly what a future you (or a teacher, or a hiring manager) needs.`,
        checkIn: {
          prompt: "Which file name follows the what-who-date pattern that sorts and searches well later?",
          choices: [
            "Untitled document (3).docx",
            "docx1.docx",
            "essay final FINAL v3 REAL.docx",
            "chem-lab3-maya-2026-02-18.docx",
          ],
          correctIndex: 3,
          explanation:
            "chem-lab3-maya-2026-02-18.docx names what it is, whose it is, and the date in a sortable YYYY-MM-DD format — clear months or years later.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Deeper skill",
        title: "How sync actually keeps every device matching",
        body: `Let's go one layer deeper into how **cloud storage** and **sync** really work. Files can live in two places:\n\n• **Local storage** — saved only on the one device you're using. Fast, but if that device breaks, is lost, or is stolen, the file is gone with it.\n• **Cloud storage** — saved on servers over the internet, using services like **Google Drive, OneDrive, iCloud, or Dropbox**. Reachable from any device signed in to your account.\n\nHere's the mechanism: each app on your signed-in devices constantly checks the cloud copy for changes. The instant you edit on your phone, that change uploads to the cloud server. Every *other* signed-in device then quietly downloads that same change in the background — often within seconds. That's why starting an essay on a school Chromebook and finishing it on your phone on the bus works so seamlessly: you were always editing the *same* file, just through different windows into it.\n\nThis also explains the sync-vs-backup problem from a moment ago: since every device is just a window into one shared copy, there's structurally only one "original" — which is exactly why a delete on any device removes it everywhere.`,
        image: "/images/lessons/dl-2-4.png",
        imageAlt: "Diagram-style photo of a laptop, tablet, and phone all displaying the same synced document, connected by lines to a cloud icon",
        callout: {
          label: "Pro tip",
          text: "If you ever need a real backup, not just sync, export a copy to a second service (or a USB drive) that isn't constantly auto-syncing with your main account.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Sync vs. backup — and local vs. cloud storage",
        body: `Two comparisons that make the difference permanent in your memory.`,
        table: {
          columns: ["", "Sync", "Backup"],
          values: [
            ["Goal", "Keep every device matching", "Keep a separate, recoverable copy"],
            ["If you delete the original", "Deletion usually spreads everywhere", "The backup copy survives"],
            ["Number of true copies", "Effectively one shared copy", "At least two independent copies"],
          ],
          rowCount: 3,
        },
        bullets: [
          "**Local storage** = fast, but gone if that one device is lost or breaks.",
          "**Cloud storage** = reachable from any signed-in device, and safer if one device dies.",
          "Cloud storage + sync is convenient, but still needs a true backup for real safety.",
        ],
      },
      {
        id: "real-world-trap",
        kicker: "Real-world trap",
        title: "The scholarship upload trap",
        body: `Picture this: a scholarship portal says "Upload your essay as a PDF." You have \`essay.docx\`, so you rename it to \`essay.pdf\` and upload with two minutes left before the deadline. The portal either rejects the file outright, or accepts it but shows corrupted garbled text to the reviewer — because renaming never actually converted it.\n\nThis exact trap costs real opportunities every year: internship applications, scholarship forms, and job portals all have real deadlines, and "the file looked fine on my end" doesn't save you once the clock hits zero.\n\n**The fix:** always use your app's real "Export as PDF" or "Save as PDF" option (found in the File menu of Word, Google Docs, and most editors) — never just rename the extension. And do it a day early, not two minutes before the deadline.`,
        callout: {
          label: "Watch out",
          text: "If a portal rejects your upload or shows a weird error right before a deadline, check whether you actually exported to that file type — or just renamed it. That single click of confusion has cost real students real opportunities.",
        },
      },
      {
        id: "habits",
        kicker: "Decision framework",
        title: "Your file-safety habits: naming, folders, and 3-2-1",
        body: `Turn everything from this lesson into three repeatable habits.\n\n**1. Name files like a pro.** Pattern: \`what-who-date.ext\` → \`resume-jordan-lee-2026-04.pdf\`. Use lowercase and hyphens, and dates as \`YYYY-MM-DD\` so files sort in order automatically.\n\n**2. One folder per project or application.** Keep an **Applications** (or **Jobs**) folder with subfolders per opportunity: \`Applications/State-U-scholarship/\`, \`Applications/summer-internship/\`. If someone else might open this file (teacher, coach, admissions, hiring manager), name and organize it as if they have zero context — because they do.\n\n**3. Follow the 3-2-1 backup rule.** Keep **3** copies of anything important, on **2** different kinds of storage (say, your laptop and the cloud), with **1** copy somewhere else entirely. That way no single accident — a dropped laptop, a spilled drink, a bad delete — can wipe out everything at once. Many cloud services also automatically keep **version history**, an extra safety net on top of 3-2-1.`,
        bullets: [
          "Pattern: \`what-who-date.ext\` (clear, sortable, professional).",
          "One folder per application or project beats a chaotic Downloads pile.",
          "3-2-1: 3 copies, on 2 types of storage, 1 kept off-site.",
        ],
        callout: {
          label: "Try this week",
          text: "Spend 10 minutes: create a School (or Applications) folder tree, move five important files out of Downloads, and rename them with a clear what-who-date pattern.",
        },
        checkIn: {
          prompt: "Which setup best follows the 3-2-1 backup rule?",
          choices: [
            "Renaming the file three times",
            "One copy saved only on your laptop",
            "Two copies, both inside the same synced cloud folder",
            "A copy on your laptop, a copy in cloud storage, and a copy on a separate drive kept elsewhere",
          ],
          correctIndex: 3,
          explanation:
            "3-2-1 means 3 copies, on 2 different types of storage, with 1 kept somewhere entirely separate — so no single accident wipes out everything.",
        },
      },
      {
        id: "standards-connect",
        kicker: "Where this fits",
        title: "This is knowledge construction, not just tidiness",
        body: `Organizing files well isn't just neat-freak behavior — it's a core piece of the **ISTE Knowledge Constructor** standard, which asks students to curate resources and organize information from digital sources so it's actually usable later. A clear folder structure and naming system is exactly that: turning scattered digital stuff into something you (or a teammate) can actually find and use.\n\nUnderstanding sync, backups, and version history also connects to **CSTA's "Impacts of Computing"** strand — recognizing how the design of a system (like cloud sync spreading a delete to every device) affects real outcomes for real people, for better or worse.\n\nAnd choosing to export a real PDF instead of just renaming a file connects to being a responsible **ISTE Digital Citizen** — taking the extra step to do things correctly rather than the fast, sloppy way, especially when it affects someone else (a reviewer, a teammate, a teacher).`,
        callout: {
          label: "Why it matters",
          text: "The habits in this lesson — naming, folders, real backups — are the same organizational skills valued in research, software teams, and any job that touches digital files.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on — a quick gut-check",
        body: `Take thirty seconds. Open your own Downloads folder or camera roll in your head (or for real, if you're near your device).\n\n• Could you find your five most important school files right now, in under a minute?\n• Do you actually know whether those files are backed up, or just synced?\n\nThere's a full reflection question waiting at the end of this lesson. For now, just notice whether you're more like "organized Maya" or "panicked Maya" today — and know that a fifteen-minute cleanup could change that.`,
        callout: {
          label: "Reflect",
          text: "Most file panic isn't a technology failure — it's a five-minute organizing task that got put off. You now know exactly which five minutes to spend.",
        },
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "Case study: a group project survives a deleted intro",
        body: `Four classmates are building a shared report the night before it's due. Here's how good file habits saved them:\n\n**The setup:** They created one shared Google Doc named \`us-history-group3-2026-03.docx\` inside a folder called \`Group-Projects/US-History\`. No emailing files back and forth, no "which version is real."\n\n**The mistake:** Around 10 p.m., one teammate accidentally selected the entire introduction and typed over it, then saved without noticing.\n\n**The panic moment:** Someone screams in the group chat: "THE INTRO IS GONE." For a second, it looks like disaster — until they remember this lesson.\n\n**The fix:** They open **version history**, scroll back to a snapshot from an hour earlier, confirm the real intro is there, and **restore** it. Total time lost: four minutes, not four hours of rewriting.\n\n**Why it worked:** A clear file name, one shared cloud copy, and version history as a safety net — three habits from this lesson working together under real pressure.`,
        callout: {
          label: "Pro tip",
          text: "Version history is most powerful exactly when you're panicking. Before assuming something is lost forever, always check for a version history or \"restore\" option first.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before the full knowledge check",
        body: `Quick self-test before the graded questions — can you explain, in one sentence each?\n\n• The difference between a file and a folder, and what a file path shows?\n• Why renaming an extension doesn't actually convert a file?\n• The difference between Save and Save As?\n• Why sync is not the same as a backup?\n\nIf all four feel solid, you're ready. If one felt shaky, a thirty-second scroll back is worth it before the graded check.`,
        checkIn: {
          prompt: "What's the biggest risk of relying ONLY on sync, with no real backup?",
          choices: [
            "Sync is too slow to be useful",
            "An accidental delete on one device can remove the file everywhere, since sync keeps every copy matching — including deletions",
            "Sync only works with photos, not documents",
            "There is no risk — sync is the same as a backup",
          ],
          correctIndex: 1,
          explanation:
            "Sync keeps devices matching, which includes deletions. Without a truly separate backup copy, one accidental delete can wipe out the file everywhere at once.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Nice work — you've leveled up from "files everywhere" to "files under control." Quick recap:\n\n• A **file** is one saved item; a **folder/directory** holds files and nests inside other folders; the **file path** is its address.\n• **File extensions** like \`.pdf\` or \`.jpg\` label what a file is — and renaming one does not convert it.\n• **Save** updates the current file; **Save As** makes a new copy. Name files clearly with a what-who-date pattern.\n• **Cloud storage** plus **sync** keeps files on every device, but **sync is not a backup** — follow the **3-2-1 rule** and use **version history** to rescue mistakes.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then reflect on how you'll organize your own files.`,
      },
    ],
  },
  bigIdeas: [
    "**Folders** nest files from broad to specific, and the **file path** is a file's address.",
    "A **file extension** labels what a file is — renaming it does not convert the file.",
    "**Sync** keeps devices matching, but a real **backup** is a separate copy that survives a delete.",
    "Follow the **3-2-1 rule** and use **version history** as your safety net for important files.",
  ],
  keyTerms: [
    { term: "File", definition: "A single saved item on a computer, like one document, photo, song, or video." },
    { term: "Folder / Directory", definition: "A container that holds files and other folders, used to organize them." },
    { term: "File extension", definition: "The few letters after the dot in a file name (like .pdf or .jpg) that show its type." },
    { term: "File path", definition: "The trail of folders that leads to a file, such as School/English/essay.docx — its 'address'." },
    { term: "Cloud storage", definition: "Saving files on internet servers (Google Drive, iCloud, OneDrive, Dropbox) reachable from any signed-in device." },
    { term: "Sync", definition: "Keeping the same file matched and up to date across all your devices automatically — including deletions." },
    { term: "Backup", definition: "A separate, extra copy of files kept safe so you can restore them if the original is lost." },
    { term: "Version history", definition: "Automatic saved snapshots of a file over time that let you restore an earlier version." },
  ],
  realWorld:
    "Group projects, scholarship uploads, and internship applications all run on these skills: a clearly named file in a shared cloud folder, **synced** so everyone sees the latest version, with **version history** to undo a teammate's accidental delete — and a real **backup** for true peace of mind.",
  quiz: [
    {
      id: "q1",
      question: "Your lab report for a group project is saved at School/Science/lab-report.docx. What does this path tell you?",
      choices: [
        "The file is stored in the cloud only",
        "The file is named School and stored in a folder called docx",
        "lab-report.docx is inside the Science folder, which is inside the School folder",
        "The file has three different versions",
      ],
      correctIndex: 2,
      explanation:
        "A file path reads from broad to specific. School is the outer folder, Science is nested inside it, and lab-report.docx is the file inside Science.",
    },
    {
      id: "q2",
      question: "A scholarship form asks for a PDF, so you rename 'essay.docx' to 'essay.pdf'. What actually happens?",
      choices: [
        "Nothing changes inside — only the label changes, and the file may fail to upload or open correctly",
        "The document instantly becomes a real PDF",
        "The file is permanently deleted",
        "It automatically uploads to the cloud",
      ],
      correctIndex: 0,
      explanation:
        "An extension is just a label. Renaming doesn't convert the contents. To make a real PDF, export or 'Save as PDF' from the app.",
    },
    {
      id: "q3",
      question: "You have 'essay.docx' and need a shorter version for a college app while keeping the original. What should you do?",
      choices: [
        "Delete half the text and hit Save",
        "Use Save As to make a new copy like 'essay-short.docx'",
        "Rename the extension to .pdf",
        "Turn off sync first",
      ],
      correctIndex: 1,
      explanation:
        "Save As creates a new copy and leaves the original untouched, so you keep both versions. Hitting Save after cutting text would overwrite and lose the original.",
    },
    {
      id: "q4",
      question: "You delete a resume draft on your phone, and it disappears from your laptop too. Why is sync NOT the same as a backup?",
      choices: [
        "Sync only works on phones",
        "They are actually the same thing",
        "Because if you delete a file on one device, sync can delete it on every device too",
        "Backups are slower than sync",
      ],
      correctIndex: 2,
      explanation:
        "Sync makes all devices match the same copy — including deletions. A true backup is a separate copy that survives even if the original is deleted.",
    },
    {
      id: "q5",
      question: "You accidentally overwrote your internship cover letter, then closed it. What's your best chance of getting the old text back?",
      choices: [
        "Change the file extension",
        "Restart the computer until it comes back",
        "Nothing can ever be recovered",
        "Open the file's version history in cloud storage and restore an earlier snapshot",
      ],
      correctIndex: 3,
      explanation:
        "Cloud services keep version history — automatic snapshots over time. You can open it, find a version from before the change, and restore it.",
    },
    {
      id: "q6",
      question: "Which file name best follows the recommended what-who-date naming pattern?",
      choices: [
        "resume-jordan-lee-2026-04.pdf",
        "Untitled document (3).docx",
        "docx1.docx",
        "essay final FINAL v3 REAL.docx",
      ],
      correctIndex: 0,
      explanation:
        "resume-jordan-lee-2026-04.pdf clearly states what it is, whose it is, and the date in a sortable format — easy to find months later.",
    },
    {
      id: "q7",
      question: "Following the 3-2-1 backup rule, which setup is safest for an important scholarship essay?",
      choices: [
        "Renaming the file three different ways",
        "Two copies, both inside the exact same synced cloud account",
        "A copy on your laptop, a copy in the cloud, and a third copy kept somewhere entirely separate",
        "One copy, saved only in a synced cloud folder",
      ],
      correctIndex: 2,
      explanation:
        "3-2-1 means 3 copies, on 2 different types of storage, with 1 copy kept off-site or separate — so a single accident can't wipe out everything.",
    },
    {
      id: "q8",
      question: "In the group-project case study, what actually saved the team after the intro got deleted?",
      choices: [
        "Renaming the file extension",
        "A clear file name, one shared cloud doc, and restoring from version history",
        "Emailing the file to everyone as a backup copy",
        "Restarting everyone's laptops",
      ],
      correctIndex: 1,
      explanation:
        "Because the team used one shared, clearly named cloud file, they could open version history, confirm an earlier snapshot had the missing intro, and restore it in minutes.",
    },
  ],
  reflection: {
    prompt:
      "Describe how you'll organize your school (or application) files into folders, and name one thing you'll do to make sure you always have a backup.",
    placeholder: "Example: A 'School' folder with a subfolder per subject, all in Google Drive so it syncs and keeps version history…",
  },
};
