import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson6: AILessonConfig = {
  id: "dl-6",
  title: "6. Collaborate in the Cloud",
  goal: "Work together effectively using shared documents, comments, version history, and video meetings — the way modern schools and workplaces operate.",
  xpReward: 300,
  badge: "Team Player",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/5",
  nextHref: "/learn/digital/7",
  lessonModule: {
    durationLabel: "~11–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Group projects used to mean huddling around one laptop or emailing files back and forth until nobody knew which copy was real. Today, schools and workplaces run on the **cloud** — shared documents that live online, where a whole team can work at the same time from anywhere.\n\nHere's our roadmap:\n\n• **Real-time collaboration** — many people editing one living document.\n• **Permissions** — who can view, comment, or edit, and why "least access" is smart.\n• **Comments and suggestions** — disagreeing without deleting someone's work.\n• **Version history** — seeing who changed what, and undoing mistakes.\n• **Meeting etiquette + a kickoff checklist** — so group work (and internships) don't melt down.\n\nThis is exactly how remote teams build real products. Learn it now and you'll walk into your first job or internship already knowing how the work actually happens.`,
        image: "/images/lessons/dl-6.png",
        imageAlt: "Laptop showing a shared Google Doc with multiple named cursors editing live; phone with a video meeting thumbnail",
        callout: {
          label: "Why it matters",
          text: "Most modern jobs involve people in different rooms — or different countries — working on the same files. Knowing how to collaborate in the cloud is a baseline skill employers expect.",
        },
      },
      {
        id: "cloud",
        kicker: "First, the basics",
        title: "What does \"the cloud\" even mean?",
        body: `You'll hear "the cloud" constantly, so let's clear it up: **the cloud** just means *files and programs that live on the internet instead of only on your own computer or phone.*\n\nThere's nothing fluffy or mysterious about it. The "cloud" is really just **powerful computers (called servers) in big buildings somewhere**, that you reach over the internet. When you save a photo to Google Photos or write in Google Docs, your stuff is stored on those computers — not just on your laptop.\n\nWhy that's so useful:\n\n• **You can reach your files from anywhere** — phone, school computer, a friend's laptop — by logging in.\n• **Nothing is lost if your device breaks**, because the file isn't only on that device.\n• **Other people can open the same file** at the same time, which is what makes teamwork possible.\n\nThat last point is the whole reason this lesson exists. Once your work lives in the cloud, a team can share it instantly.`,
        callout: {
          label: "Quick analogy",
          text: "Saving to your laptop is like keeping money in your pocket — only you have it, and if you lose the pocket, it's gone. The cloud is like a bank you can reach from any branch: your stuff is safe and you can get to it anywhere.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "The words we'll use — in plain English",
        body: `This lesson has a handful of terms. Here they are in everyday language so nothing trips you up later.\n\n• **Real-time collaboration** — several people editing the *same* document at the *same time*, live. You can watch each other type.\n• **Permissions** — what each person is *allowed* to do with a shared file: just look at it (view), leave notes (comment), or change it (edit).\n• **Comment** — a sticky note attached to a spot in the document. It doesn't change the text; it starts a conversation.\n• **Suggestion** — a *proposed* edit the author can accept or reject, instead of changing their words directly.\n• **Version history** — an automatic timeline of every change, showing who edited what and when — and letting you roll back.\n• **Shared drive** — one online folder the whole team uses to store and find files in a single place.\n\nGot the gist? Good. Now let's see how teams actually use these.`,
        callout: {
          label: "Tip",
          text: "You don't have to memorize these now. They'll make more sense once you see them in the examples coming up.",
        },
      },
      {
        id: "realtime",
        kicker: "The big idea",
        title: "A shared doc is a whiteboard everyone can write on at once",
        body: `**Real-time collaboration** means several people can open the same document — in tools like **Google Docs** or **Microsoft 365** — and edit it together, live. You can literally watch your teammate's cursor move and type while you work in another paragraph.\n\nPicture a giant **whiteboard everyone can write on at the same time, from anywhere**. Instead of each person keeping their own copy, there's one true version that everyone shares. No emailing attachments. No "wait, which file is the newest?" Everyone is always looking at the latest version automatically.\n\nThis changes how teams work. You split up sections, write at the same time, and the document updates instantly for everyone. The document becomes a shared space, not a thing you pass around.`,
        callout: {
          label: "Common misconception",
          text: "Emailing files back and forth named things like \"essay_v2_FINAL_real.docx\" feels organized, but it causes version chaos — people edit different copies and good work gets lost. One shared doc avoids the whole mess.",
        },
      },
      {
        id: "permissions",
        kicker: "Concept",
        title: "Permissions: view, comment, or edit",
        body: `When you share a document, you choose what other people are allowed to do. These are called **permissions**, and there are usually three levels:\n\n• **View** — the person can read it but not change anything.\n• **Comment** — the person can leave notes and suggestions but not edit the text directly.\n• **Edit** — the person can change the document however they want.\n\nA smart habit (used in real workplaces) is to grant the **least access someone needs** to do their job. If a classmate just needs to read your draft, give them "view," not "edit." If a teammate is helping revise, "comment" or "edit" makes sense. Less access means fewer accidental deletions and better security.\n\nYou can also share with specific people or with "anyone with the link." Sharing a link publicly is convenient but riskier — anyone who finds it gets in.`,
        image: "/images/lessons/dl-6-2.png",
        imageAlt: "Laptop share dialog showing View, Comment, and Edit permission options for a cloud document",
        bullets: [
          "**View** = read only.",
          "**Comment** = leave notes, can't change the text.",
          "**Edit** = full changes allowed.",
          "Grant the **least access** someone actually needs.",
        ],
        callout: {
          label: "Common misconception",
          text: "Giving everyone \"edit\" access is not always best. Wide-open editing leads to accidental deletions and mix-ups. Match the permission to what each person truly needs.",
        },
      },
      {
        id: "comments",
        kicker: "Concept",
        title: "Comment and suggest instead of overwriting",
        body: `Here's a teamwork skill that prevents most group-project fights. When you disagree with something a teammate wrote, **don't just delete it and type your version.** That feels like an attack and erases their work.\n\nInstead, use two gentler tools:\n\n• **Comments** — attach a note to a specific spot: "Should we add a source here?" The original text stays; you're starting a conversation.\n• **Suggesting / Suggestion mode** — your edits show up as proposed changes the author can **accept or reject**, instead of overwriting their words. Microsoft 365 calls this "Track Changes."\n\nThis keeps everyone's contributions visible and lets the group decide together. Disagreeing politely through comments and suggestions is exactly how professional editors and teams revise work.`,
        callout: {
          label: "Common misconception",
          text: "Deleting someone's text is not the way to disagree. Use a comment or a suggestion so they can see your idea and respond — collaboration, not a silent takeover.",
        },
      },
      {
        id: "history",
        kicker: "Concept",
        title: "Version history is your undo button for the whole team",
        body: `Cloud documents quietly save **version history** — a timeline of every change, showing **who changed what and when**. This is one of the most reassuring features you'll ever use.\n\nWhy it's powerful:\n\n• **Nothing is truly lost.** If someone accidentally deletes a whole section, you can open version history and **restore an earlier version**.\n• **You can see who did what.** No more "I didn't touch it!" arguments — the history shows exactly who edited each part.\n• **You can compare drafts.** See how the document grew over time.\n\nFiles usually live in a **shared drive** or shared folder — one place the whole team can find everything, instead of scattered across people's personal computers. Combined with version history, this means your group's work is safe, organized, and recoverable.`,
        callout: {
          label: "Pro tip",
          text: "Before a big edit, you don't need to make a copy 'just in case' — version history already has your back. You can always roll the document back to how it looked at any earlier moment.",
        },
      },
      {
        id: "meetings",
        kicker: "Concept",
        title: "Meeting and teamwork etiquette",
        body: `Cloud collaboration also happens live, in **video meetings** and on shared planning tools. A few habits make you look professional and keep meetings sane:\n\n• **Mute when you're not talking** — background noise (TV, typing, a barking dog) is distracting to everyone.\n• **Use camera and "raise hand" thoughtfully** — turning your camera on shows you're present; the raise-hand button lets you speak without talking over people.\n• **Screen share** — show your screen so others can see exactly what you mean, instead of describing it.\n\nTeams also stay organized with **shared calendars** (so everyone sees deadlines and meeting times) and simple **task boards** — like Trello-style columns labeled "To do," "Doing," and "Done." You move a card across as work progresses, so the whole team can see who's doing what at a glance.`,
        bullets: [
          "Mute your mic when you're not speaking.",
          "Use the raise-hand button instead of talking over people.",
          "Screen share to show, not just tell.",
          "Track work on a shared board: To do → Doing → Done.",
        ],
        callout: {
          label: "Watch out",
          text: "Showing up to a video meeting unmuted in a noisy room is the most common rookie mistake. Join muted by default, then unmute only when it's your turn.",
        },
      },
      {
        id: "kickoff",
        kicker: "Decision framework",
        title: "Group-project kickoff: five decisions before anyone types",
        body: `Most group chaos isn't about writing — it's about skipping setup. Before the first paragraph, agree on these five things (same checklist works for school *and* internship teams):\n\n**1. One home base** — one shared folder + one main doc (or slide deck). No parallel "my copy."\n**2. Roles** — who owns which section; who merges final formatting.\n**3. Permissions** — editors for teammates; comment for teacher/mentor; view for anyone who only needs to read.\n**4. Feedback rules** — comments/suggestions for disagreements; no silent deletes.\n**5. Deadlines on a board** — To do / Doing / Done with real dates, not vibes.\n\n**Conflict shortcut:** If two people rewrite the same paragraph, stop editing and leave comments. Resolve in chat or a 5-minute call, then update the shared doc once. Parallel silent edits create resentment and lost work.\n\n**Workplace note:** Internships and remote jobs expect this exact workflow. Showing up already fluent in shared docs, comments, and version history is a quiet advantage.`,
        bullets: [
          "Agree on one shared home before drafting.",
          "Assign section owners to reduce collisions.",
          "Match permissions to the person's real job.",
          "Use comments for conflict; version history for accidents.",
        ],
        callout: {
          label: "Try this week",
          text: "On your next group assignment (or club project), spend the first five minutes on the kickoff checklist. Screenshot the shared folder link into the group chat so nobody is hunting for 'the real file.'",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Running a group project the cloud way",
        body: `You and three classmates are writing a report together. Watch how the cloud tools keep it smooth, step by step.\n\n**Step 1 — Create one shared doc and set permissions.** You make a single Google Doc and share it. Your three teammates get **edit** access. Your teacher gets **comment** access so she can give feedback without changing your text.\n\n**Step 2 — Work at the same time.** Everyone writes their section live. You can see Maria's cursor in the intro and Sam typing the conclusion. No emailing, one true version.\n\n**Step 3 — Disagree with a suggestion, not a delete.** You think Sam's last sentence is off-topic. Instead of deleting it, you switch to **suggesting mode** and propose a change. Sam sees it and accepts it.\n\n**Step 4 — Recover from a mistake.** Someone accidentally deletes the whole intro. No panic — you open **version history**, find the version from ten minutes ago, and **restore** it. The intro is back, exactly as it was.\n\nThat's a real team workflow — the same one used at companies every day.`,
        image: "/images/lessons/dl-6-3.png",
        imageAlt: "Laptop with four teammate avatars editing one shared document; comment sidebar and version history clock visible",
        callout: {
          label: "Pro tip",
          text: "Agree as a group on who owns which section before you start typing. Clear ownership plus comments for feedback prevents almost every group-project meltdown.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've learned the modern way teams work: one **shared document** with the right **permissions**, **comments and suggestions** instead of overwriting, and **version history** to undo any mistake. Add good meeting etiquette, a shared task board, and a five-decision kickoff, and you can run a remote team like a pro.\n\nThese habits end the "who has the latest version?" chaos forever — and they're exactly what employers mean when they ask if you can "collaborate."\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then reflect on a group project that would've gone better with these tools.`,
      },
    ],
  },
  bigIdeas: [
    "A **shared doc** is one living version everyone edits at once — no more emailing files around.",
    "Set the right **permissions** (view/comment/edit) and grant the least access needed.",
    "**Comments, suggestions, and version history** let teams disagree safely and undo mistakes.",
  ],
  keyTerms: [
    { term: "Real-time collaboration", definition: "Multiple people editing the same document live, at the same time, from anywhere." },
    { term: "Permissions", definition: "What someone is allowed to do with a shared file: view, comment, or edit." },
    { term: "Comment vs. suggestion", definition: "A comment is a note attached to text; a suggestion is a proposed edit the author can accept or reject." },
    { term: "Version history", definition: "A saved timeline of every change showing who edited what — and lets you restore older versions." },
    { term: "Shared drive", definition: "An online folder where a whole team stores and finds files in one place." },
    { term: "Screen share", definition: "Showing your screen in a video meeting so others see exactly what you mean." },
  ],
  realWorld:
    "Software teams, newsrooms, and marketing groups all build their work in shared docs with comments, suggestions, and version history. Knowing this workflow means you can contribute on day one of an internship or job.",
  quiz: [
    {
      id: "q1",
      question: "Your group keeps emailing 'report_v2_final' files and nobody knows which is newest. Why is one shared document better?",
      choices: [
        "Email is more expensive",
        "A shared doc keeps one true, always-current version and avoids version chaos",
        "Shared docs can't be edited",
        "Email files load faster",
      ],
      correctIndex: 1,
      explanation:
        "With a shared doc, everyone edits the same live version. Emailing copies creates confusion about which file is newest and loses work.",
    },
    {
      id: "q2",
      question: "Your teacher needs to give feedback on your group's draft but shouldn't change the text. Which permission fits?",
      choices: [
        "Edit",
        "Comment",
        "Owner",
        "No access",
      ],
      correctIndex: 1,
      explanation:
        "Comment access lets her leave notes and suggestions without altering your writing — the least access she needs to do the job.",
    },
    {
      id: "q3",
      question: "You disagree with a sentence a teammate wrote in the shared report. What's the best move?",
      choices: [
        "Delete it and type your own version",
        "Leave a comment or use suggesting mode so they can respond",
        "Start a brand-new document",
        "Email the whole class about it",
      ],
      correctIndex: 1,
      explanation:
        "Comments and suggestions keep their work visible and let the group decide together. Deleting feels like an attack and erases their contribution.",
    },
    {
      id: "q4",
      question: "Someone accidentally deleted a whole section of your shared internship proposal. What saves you?",
      choices: [
        "Nothing — it's gone forever",
        "Version history, which lets you restore an earlier version",
        "Turning the Wi-Fi off and on",
        "Re-typing it from memory only",
      ],
      correctIndex: 1,
      explanation:
        "Cloud docs keep a version history of every change, so you can roll back and restore the section exactly as it was.",
    },
    {
      id: "q5",
      question: "You're on a video call for a group project (or remote first-job training). Which is good etiquette?",
      choices: [
        "Stay unmuted so people hear your room",
        "Talk over others to be heard",
        "Mute when you're not talking and use the raise-hand button",
        "Never share your screen",
      ],
      correctIndex: 2,
      explanation:
        "Muting cuts background noise, and the raise-hand button lets you contribute without interrupting — both mark you as a considerate teammate.",
    },
  ],
  reflection: {
    prompt:
      "Think of a group project you've done. Which cloud tool — shared editing, comments/suggestions, or version history — would have helped the most, and how?",
    placeholder: "Example: Our slides got messed up when two people edited offline. A single shared deck with version history would've saved us…",
  },
};
