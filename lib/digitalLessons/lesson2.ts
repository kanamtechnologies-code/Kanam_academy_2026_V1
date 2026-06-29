import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson2: AILessonConfig = {
  id: "dl-2",
  title: "2. Files, Folders & the Cloud",
  goal: "Organize files in folders, understand file types and extensions, know the difference between save and save-as, and use cloud storage with sync and backups.",
  xpReward: 100,
  badge: "🗂️ File Wrangler",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/1",
  nextHref: "/learn/digital/3",
  lessonModule: {
    durationLabel: "~9 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Ever lost an essay the night before it was due? Or scrolled through a Downloads folder so messy you couldn't find anything? Today you'll learn the skills that make sure that never happens again — explained from scratch, no jargon assumed.\n\nHere's our roadmap:\n\n• **Files and folders** — what they really are and how to nest them neatly.\n• **File extensions** — the little \`.jpg\` or \`.pdf\` ending that tells you what's inside.\n• **Save vs. Save As** — a tiny difference that saves you from huge mistakes.\n• **Cloud storage, sync, and backups** — keep your stuff safe and on every device.\n\nThis is one of the most useful "boring" skills there is. Good file habits make you faster, calmer, and look seriously professional at school and at your first job.`,
        image: "/images/lessons/dl-2.png",
        imageAlt: "A tidy digital filing cabinet with labeled folders syncing up to a cloud",
        callout: {
          label: "Why it matters",
          text: "Teachers, bosses, and teammates all judge how organized you are by how easily you can find and share the right file. \"I know it's here somewhere…\" is not a great look during a group project deadline.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "The core words, in plain English",
        body: `This lesson has a handful of key words. Here they are up front in everyday language, so the rest of the lesson reads easily. We'll explain each one again as it comes up too.\n\n• A **file** is one saved thing — a single essay, photo, song, or video.\n• A **folder** is a container that holds files (and other folders), just like a real folder in a drawer.\n• To **save** is to write your work onto storage so it's still there after you close the app or turn the device off. If you don't save, your work can vanish.\n• The **cloud** means storing your files on computers over the internet (like Google Drive) instead of only on the device in your hands.\n\nKeep these in mind and you're set. Everything else builds on these four ideas.`,
        callout: {
          label: "Pro tip",
          text: "Get in the habit of saving often while you work — many apps even save automatically, but never assume. A quick save every few minutes means a crash or dead battery can never erase an hour of effort.",
        },
      },
      {
        id: "files-folders",
        kicker: "The big idea",
        title: "Files live in folders, and folders nest inside folders",
        body: `A **file** is a single saved item on a computer — one essay, one photo, one song, one video. Everything you save is a file.\n\nA **folder** (also called a **directory** — same thing, just the more technical word) is a container that holds files and other folders. Folders can **nest**, which means putting one folder inside another folder inside another — so you can group things from broad to specific.\n\nThink of it like a **backpack with labeled pockets**. The whole backpack is your storage. Inside, a big pocket says "School." Inside *that* is a smaller pouch for "English," and inside *that* is your essay. Each layer narrows things down so you can grab exactly what you need without dumping everything out.\n\nThe trail of folders that leads to a file is its **file path**. Something like \`School/English/essay.docx\` reads left to right: open School, then English, then the file. It's basically the file's home address — the slashes \`/\` just separate one folder from the next.`,
        image: "/images/lessons/dl-2-2.png",
        imageAlt: "Nested folders shown like a backpack with labeled pockets: a School folder containing an English folder containing an essay file",
        bullets: [
          "**File** = one saved item (a doc, photo, song, video).",
          "**Folder / directory** = a container for files and other folders.",
          "Folders **nest** to group things from broad to specific.",
          "**File path** = the trail of folders to a file, like \`School/English/essay.docx\`.",
        ],
        callout: {
          label: "Pro tip",
          text: "Build folders from general to specific: School → Subject → Project. Future you will find any file in seconds instead of scrolling through hundreds of loose items.",
        },
      },
      {
        id: "extensions",
        kicker: "Reading the label",
        title: "File extensions tell you what kind of file it is",
        body: `At the end of almost every file name is a dot and a few letters — the **file extension**. It's a label that tells your computer (and you) what *type* of file it is and which app should open it. In \`essay.docx\`, the \`.docx\` is the extension.\n\nThink of it like the **label on a can of food**. The label says "soup" or "beans" so you know what's inside before you open it. Change the label and you've fooled no one — the contents are still the same.\n\nHere are common ones you'll meet constantly:\n\n• \`.docx\` — a Word document (text, essays).\n• \`.pdf\` — a fixed-layout document that looks the same on every device.\n• \`.jpg\` and \`.png\` — images/photos (\`.png\` can keep see-through backgrounds; \`.jpg\` makes smaller photo files).\n• \`.mp3\` — audio/music. \`.mp4\` — video.\n• \`.csv\` — a simple spreadsheet of values separated by commas.\n• \`.zip\` — a compressed bundle that squishes many files into one for easy sharing.`,
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
      },
      {
        id: "save-vs-saveas",
        kicker: "A tiny but mighty difference",
        title: "Save vs. Save As — know which one to use",
        body: `These two buttons look almost identical, but mixing them up is how people *overwrite* (write over and replace) work they wanted to keep.\n\n• **Save** updates the *current* file in place. It keeps the same name and location and replaces the old version with your latest changes. Use it constantly while you work.\n• **Save As** creates a *new copy* with a new name or location, leaving the original untouched. Use it when you want to keep the old version AND make a different one.\n\nImagine you have \`essay.docx\` and your teacher asks for a shorter version. If you cut half the text and hit **Save**, the long version is gone forever — you wrote over it. Instead, use **Save As** to make \`essay-short.docx\` — now you safely have both.\n\nAnd please, name files like a pro. Avoid the chaos of \`essay final FINAL v3 REAL.docx\`. A clear, dated name like \`history-essay-2026-03-12.docx\` sorts neatly and tells you exactly what it is at a glance.`,
        callout: {
          label: "Watch out",
          text: "Hitting Save after deleting big chunks of a file overwrites the original — there's no \"undo\" once you close it. When in doubt, Save As a new copy first, then edit freely.",
        },
      },
      {
        id: "cloud-sync",
        kicker: "Everywhere at once",
        title: "Cloud storage syncs your files across every device",
        body: `Files can live in two places:\n\n• **Local storage** — saved only on the one device you're using, in its built-in storage. It's fast, but if that device breaks, is lost, or is stolen, the file is gone with it.\n• **Cloud storage** — saved on servers (powerful computers) over the internet, using services like **Google Drive, OneDrive, iCloud, or Dropbox**. You can reach those files from any device that's signed in to your account.\n\nThe magic word here is **sync** (short for *synchronize*, meaning "keep matched"). When sync is on, a change you make on your phone automatically shows up on your laptop, and the other way around — because every device is pulling from the same single copy in the cloud. Start an essay on the school Chromebook, finish it on your phone on the bus: same file, always up to date.\n\nThat's also why cloud storage feels like a safety net: even if your laptop dies, your synced files are safe on the server, ready to download to a new device.`,
        callout: {
          label: "Common misconception",
          text: "Sync is not the same as a backup. Sync makes every device match — so if you DELETE a file on one device, sync can delete it everywhere too. A true backup keeps a separate copy that doesn't vanish when the original does.",
        },
      },
      {
        id: "backups",
        kicker: "Don't lose your work",
        title: "Backups and version history are your time machine",
        body: `A **backup** is a separate, extra copy of your files kept somewhere safe, so that if the original is lost, damaged, or deleted, you can still get it back.\n\nA simple rule the pros use is **3-2-1**: keep **3** copies of anything important, on **2** different kinds of storage (say, your laptop and the cloud), with **1** copy somewhere else entirely (off-site, like a cloud server in another building). That way no single accident — a dropped laptop, a spilled drink, a bad delete — can wipe out everything at once.\n\nMany cloud services also keep **version history**: automatic snapshots of your file saved over time. If you mess up a document or accidentally overwrite it, you can scroll back and restore an earlier version. It's like an undo button that still works even days later.\n\nFinally, when you share a cloud file, you control **permissions** — the settings that decide whether someone can just *view* it, *comment* on it, or fully *edit* it. (You'll dig into sharing and safety more in later lessons.)`,
        bullets: [
          "**Backup** = a separate spare copy you can restore from.",
          "**3-2-1**: 3 copies, on 2 types of storage, 1 kept off-site.",
          "**Version history** lets you roll back to an earlier version of a file.",
          "**Permissions** decide if others can view, comment, or edit a shared file.",
        ],
        callout: {
          label: "Myth check",
          text: "\"It's saved somewhere\" is NOT a backup. One copy in one place is one accident away from gone. You only truly have a backup when a second, separate copy exists.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Rescuing an overwritten essay with version history",
        body: `Picture this disaster: your history essay is due tomorrow. You meant to edit a copy, but you accidentally deleted three paragraphs and hit **Save** on the real file — then closed it. The good paragraphs are gone. Or are they? Let's fix it step by step.\n\n**Step 1 — Don't panic, and stop typing.** The original is still recoverable as long as the file lives in cloud storage with version history (Google Drive, OneDrive, etc.). New edits could pile up, so pause.\n\n**Step 2 — Open version history.** Find the file and open its "Version history" or "Manage versions" option (usually in the File menu). You'll see a list of automatic snapshots with dates and times.\n\n**Step 3 — Preview earlier versions.** Click a snapshot from *before* you deleted the paragraphs. You can read it to confirm the missing text is there.\n\n**Step 4 — Restore (or Save As a copy).** Restore that earlier version, or use **Save As** to keep both the old and new copies. Crisis averted — and now you know to use **Save As** before big edits next time.`,
        image: "/images/lessons/dl-2-3.png",
        imageAlt: "A version history timeline of a document with dated snapshots and a rewind arrow restoring an earlier version",
        callout: {
          label: "Pro tip",
          text: "Before making major changes to any important file, do a quick \"Save As\" to create a dated copy first. It takes five seconds and turns a potential disaster into a non-event.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Nice work — you've leveled up from "files everywhere" to "files under control." Quick recap:\n\n• A **file** is one saved item; a **folder/directory** holds files and nests inside other folders; the **file path** is its address.\n• **File extensions** like \`.pdf\` or \`.jpg\` label what a file is — and renaming one does not convert it.\n• **Save** updates the current file; **Save As** makes a new copy. Name files clearly.\n• **Cloud storage** plus **sync** keeps files on every device; **backups** and **version history** rescue you when things go wrong.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on how you'll organize your own files.`,
      },
    ],
  },
  bigIdeas: [
    "**Folders** nest files from broad to specific, and the **file path** is a file's address.",
    "A **file extension** labels what a file is — renaming it does not convert the file.",
    "**Sync** keeps devices matching, but a real **backup** is a separate copy that survives a delete.",
  ],
  keyTerms: [
    { term: "File", definition: "A single saved item on a computer, like one document, photo, song, or video." },
    { term: "Folder / Directory", definition: "A container that holds files and other folders, used to organize them." },
    { term: "File extension", definition: "The few letters after the dot in a file name (like .pdf or .jpg) that show its type." },
    { term: "File path", definition: "The trail of folders that leads to a file, such as School/English/essay.docx — its 'address'." },
    { term: "Cloud storage", definition: "Saving files on internet servers (Google Drive, iCloud, OneDrive, Dropbox) reachable from any signed-in device." },
    { term: "Sync", definition: "Keeping the same file matched and up to date across all your devices automatically." },
    { term: "Backup", definition: "A separate, extra copy of files kept safe so you can restore them if the original is lost." },
    { term: "Version history", definition: "Automatic saved snapshots of a file over time that let you restore an earlier version." },
  ],
  realWorld:
    "Group projects run on these skills: a clearly named file in a shared cloud folder, **synced** so everyone sees the latest version, with **version history** to undo a teammate's accidental delete.",
  quiz: [
    {
      id: "q1",
      question: "Your file is saved at School/Science/lab-report.docx. What does this path tell you?",
      choices: [
        "The file is named School and stored in a folder called docx",
        "lab-report.docx is inside the Science folder, which is inside the School folder",
        "The file has three different versions",
        "The file is stored in the cloud only",
      ],
      correctIndex: 1,
      explanation:
        "A file path reads from broad to specific. School is the outer folder, Science is nested inside it, and lab-report.docx is the file inside Science.",
    },
    {
      id: "q2",
      question: "You rename 'song.mp3' to 'song.mp4'. What actually happens?",
      choices: [
        "The audio file instantly becomes a video",
        "Nothing changes inside — only the label changes, and the file may now fail to open correctly",
        "The file is permanently deleted",
        "It automatically uploads to the cloud",
      ],
      correctIndex: 1,
      explanation:
        "An extension is just a label, like the label on a can. Renaming it doesn't convert the contents — it can even make the file refuse to open. Real conversion needs an app that exports the new type.",
    },
    {
      id: "q3",
      question: "You have 'essay.docx' and need a shorter version while keeping the original. What should you do?",
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
      question: "Why is sync NOT the same as a backup?",
      choices: [
        "Sync only works on phones",
        "Because if you delete a file on one device, sync can delete it on every device too",
        "Backups are slower than sync",
        "They are actually the same thing",
      ],
      correctIndex: 1,
      explanation:
        "Sync makes all devices match the same copy — including deletions. A true backup is a separate copy that survives even if the original is deleted.",
    },
    {
      id: "q5",
      question: "You accidentally overwrote and saved over your essay, then closed it. What's your best chance of getting the old text back?",
      choices: [
        "Restart the computer until it comes back",
        "Change the file extension",
        "Open the file's version history in cloud storage and restore an earlier snapshot",
        "Nothing can ever be recovered",
      ],
      correctIndex: 2,
      explanation:
        "Cloud services keep version history — automatic snapshots over time. You can open it, find a version from before the change, and restore it.",
    },
  ],
  reflection: {
    prompt:
      "Describe how you'll organize your school files into folders, and name one thing you'll do to make sure you always have a backup.",
    placeholder: "Example: A 'School' folder with a subfolder per subject, all in Google Drive so it syncs and keeps version history…",
  },
};
