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
    durationLabel: "~20–25 min lesson",
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
        id: "hook-story",
        kicker: "Real moment",
        title: "The night four versions of the slides all disagreed",
        body: `Four classmates are finishing a presentation due tomorrow. Each person emailed their slides to the group as separate attachments: \`slides_v1.pptx\`, \`slides_FINAL.pptx\`, \`slides_FINAL2_useTHIS.pptx\`, and one person's personal version they forgot to send at all.\n\nAt 9 p.m., someone tries to merge them and realizes two people edited the "same" slide differently, one person's edits from an hour ago are missing, and nobody actually knows which file has the latest chart. They spend ninety minutes untangling it — time they didn't have.\n\nHere's the frustrating part: none of them made a mistake exactly. They just never set up **one shared home** for the file. This lesson is about avoiding that entire ninety minutes, permanently.`,
        callout: {
          label: "Keep this in mind",
          text: "\"Which version is the real one?\" is one of the most common and most preventable group-project disasters — and it has a simple fix.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "The words we'll use — in plain English",
        body: `This lesson has a handful of terms. Here they are in everyday language so nothing trips you up later.\n\n• **Real-time collaboration** — several people editing the *same* document at the *same time*, live. You can watch each other type.\n• **Permissions** — what each person is *allowed* to do with a shared file: just look at it (view), leave notes (comment), or change it (edit).\n• **Comment** — a sticky note attached to a spot in the document. It doesn't change the text; it starts a conversation.\n• **Suggestion** — a *proposed* edit the author can accept or reject, instead of changing their words directly.\n• **Version history** — an automatic timeline of every change, showing who edited what and when — and letting you roll back.\n• **Shared drive** — one online folder the whole team uses to store and find files in a single place.\n\nGot the gist? Good. Now let's see how teams actually use these — starting with what "the cloud" really means here: files and programs that live on the internet, on **servers** in data centers, instead of only on one device. That's exactly what makes it possible for a whole team to reach and edit the same file at once.`,
        callout: {
          label: "Tip",
          text: "You don't have to memorize these now. They'll make more sense once you see them in the examples coming up.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "A shared doc is a whiteboard everyone can write on at once",
        body: `**Real-time collaboration** means several people can open the same document — in tools like **Google Docs** or **Microsoft 365** — and edit it together, live. You can literally watch your teammate's cursor move and type while you work in another paragraph.\n\nPicture a giant **whiteboard everyone can write on at the same time, from anywhere**. Instead of each person keeping their own copy, there's one true version that everyone shares. No emailing attachments. No "wait, which file is the newest?" Everyone is always looking at the latest version automatically — this is exactly what would have saved the group from the slide chaos in the story above.\n\nThis changes how teams work. You split up sections, write at the same time, and the document updates instantly for everyone. The document becomes a shared space, not a thing you pass around.`,
        callout: {
          label: "Common misconception",
          text: "Emailing files back and forth named things like \"essay_v2_FINAL_real.docx\" feels organized, but it causes version chaos — people edit different copies and good work gets lost. One shared doc avoids the whole mess.",
        },
        checkIn: {
          prompt: "Your group keeps emailing 'report_v2_final' files and nobody knows which is newest. Why is one shared document better?",
          choices: [
            "Shared docs can't be edited",
            "Email is more expensive",
            "A shared doc keeps one true, always-current version and avoids version chaos",
            "Email files load faster",
          ],
          correctIndex: 2,
          explanation:
            "With a shared doc, everyone edits the same live version. Emailing copies creates confusion about which file is newest and loses work.",
        },
      },
      {
        id: "concept-2",
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
        checkIn: {
          prompt: "Your teacher needs to give feedback on your group's draft but shouldn't change the text. Which permission fits?",
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
      },
      {
        id: "concept-3",
        kicker: "Concept",
        title: "Comment and suggest instead of overwriting",
        body: `Here's a teamwork skill that prevents most group-project fights. When you disagree with something a teammate wrote, **don't just delete it and type your version.** That feels like an attack and erases their work.\n\nInstead, use two gentler tools:\n\n• **Comments** — attach a note to a specific spot: "Should we add a source here?" The original text stays; you're starting a conversation.\n• **Suggesting / Suggestion mode** — your edits show up as proposed changes the author can **accept or reject**, instead of overwriting their words. Microsoft 365 calls this "Track Changes."\n\nThis keeps everyone's contributions visible and lets the group decide together. Disagreeing politely through comments and suggestions is exactly how professional editors and teams revise work.`,
        callout: {
          label: "Common misconception",
          text: "Deleting someone's text is not the way to disagree. Use a comment or a suggestion so they can see your idea and respond — collaboration, not a silent takeover.",
        },
        checkIn: {
          prompt: "You disagree with a sentence a teammate wrote in the shared report. What's the best move?",
          choices: [
            "Leave a comment or use suggesting mode so they can respond",
            "Start a brand-new document",
            "Email the whole class about it",
            "Delete it and type your own version",
          ],
          correctIndex: 0,
          explanation:
            "Comments and suggestions keep their work visible and let the group decide together. Deleting feels like an attack and erases their contribution.",
        },
      },
      {
        id: "worked-example",
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
        id: "misconception",
        kicker: "Myth-busting",
        title: "A shared doc doesn't replace communication",
        body: `It's tempting to think that once a team has one shared, real-time document, the hard part of teamwork is solved. It's not. A shared doc removes *version chaos* — but it doesn't automatically create clear roles, agreed deadlines, or a shared understanding of who's doing what.\n\nTeams that rely only on the doc and skip actual communication often end up with two people silently rewriting the same paragraph at the same time, or nobody touching the conclusion because everyone assumed someone else would. The tool prevents lost files; it doesn't prevent lost coordination.\n\nThe fix is simple: pair the shared doc with a quick conversation (chat, call, or in person) about roles and deadlines *before* everyone starts typing — which is exactly what the kickoff checklist later in this lesson covers.`,
        callout: {
          label: "Myth check",
          text: "\"We're all in the same doc now, we're good\" is not the same as \"we agreed on who's doing what.\" The tool solves version chaos, not coordination.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Comment, suggest, or just edit?",
        body: `For each situation, pick the right tool:\n\n• You spot a typo in your own sentence → just **edit** directly; no need for ceremony on your own text.\n• You think a teammate's paragraph is missing a source, but you're not sure → leave a **comment** asking the question, rather than assuming and changing it yourself.\n• You want to reword a teammate's sentence for clarity, but want them to approve the change → use **suggesting mode**, so they can accept or reject it.\n• A teammate asks you directly to clean up their whole section → **edit** is fine, since you have their go-ahead.\n\nNotice the pattern: the more it's *someone else's* work and the less certain or invited you are, the more you lean toward comment or suggestion instead of a direct edit.`,
        checkIn: {
          prompt: "You're not sure whether a teammate's paragraph needs a source, and they didn't ask for edits. What's the best move?",
          choices: [
            "Silently add or remove content without saying anything",
            "Delete the paragraph to be safe",
            "Message the whole class group chat about it",
            "Leave a comment asking about it, rather than assuming and editing it yourself",
          ],
          correctIndex: 3,
          explanation:
            "When you're unsure and it's someone else's work, a comment opens a conversation without erasing or assuming — the safer, more respectful move.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Deeper skill",
        title: "How version history actually works — and why nothing is truly lost",
        body: `Cloud documents quietly save **version history** — a timeline of every change, showing **who changed what and when**. Here's the mechanism: every time you (or anyone) type in a shared cloud doc, the service saves periodic snapshots automatically, tagged with a timestamp and the editor's name. You never have to click "save a version" — it happens continuously in the background.\n\nWhy that's so powerful:\n\n• **Nothing is truly lost.** If someone accidentally deletes a whole section, you can open version history and **restore an earlier version** — the deleted text is still sitting in an older snapshot.\n• **You can see who did what.** No more "I didn't touch it!" arguments — the history shows exactly who edited each part, by name and timestamp.\n• **You can compare drafts.** Scroll through the timeline to see how the document grew, which is useful for spotting when a mistake was introduced.\n\nFiles usually live in a **shared drive** or shared folder — one place the whole team can find everything, instead of scattered across people's personal computers.`,
        image: "/images/lessons/dl-6-4.png",
        imageAlt: "Laptop screen showing a version history timeline sidebar with dated snapshots and named editors next to a document",
        callout: {
          label: "Pro tip",
          text: "Before a big edit, you don't need to make a copy 'just in case' — version history already has your back. You can always roll the document back to how it looked at any earlier moment.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Comment vs. suggestion vs. direct edit",
        body: `A quick reference for which tool fits which moment.`,
        table: {
          columns: ["", "Comment", "Suggestion", "Direct edit"],
          values: [
            ["Changes the text?", "No — just a note", "Proposed, needs approval", "Yes, immediately"],
            ["Best for", "Asking a question", "Improving someone else's wording", "Your own section, or with clear permission"],
            ["Risk of conflict", "Very low", "Low", "Higher, if unexpected"],
          ],
          rowCount: 3,
        },
      },
      {
        id: "real-world-trap",
        kicker: "Real-world trap",
        title: "The 'anyone with the link' trap",
        body: `Sharing a doc as "anyone with the link can edit" feels convenient — no need to add each person's email one by one. But that link can spread far beyond your intended team: forwarded in a chat, posted publicly, or opened by someone who stumbles onto it.\n\nReal consequences show up constantly: a shared internship application doc gets accidentally edited by a stranger who found the link; a "public" class project doc gets vandalized by someone outside the class; a sensitive planning document meant for five teammates ends up viewable by an entire school because the link leaked.\n\n**The fix:** default to sharing with specific people's accounts rather than "anyone with the link," especially for anything sensitive, graded, or tied to your name. If you must use a link for convenience, set it to the lowest permission that still works (often "view" or "comment," not "edit").`,
        callout: {
          label: "Watch out",
          text: "\"Anyone with the link can edit\" means exactly that — anyone. Treat that setting the way you'd treat leaving a door propped open: fine for a moment, risky if you forget about it.",
        },
      },
      {
        id: "habits",
        kicker: "Decision framework",
        title: "Meeting etiquette + a five-decision kickoff",
        body: `Cloud collaboration also happens live, in **video meetings**. A few habits keep meetings sane: **mute** when you're not talking, use **camera** and the **raise-hand** button thoughtfully, and **screen share** to show instead of describe.\n\nMost group chaos isn't about writing — it's about skipping setup. Before the first paragraph, agree on these five things (same checklist works for school *and* internship teams):\n\n**1. One home base** — one shared folder + one main doc. No parallel "my copy."\n**2. Roles** — who owns which section; who merges final formatting.\n**3. Permissions** — editors for teammates; comment for teacher/mentor; view for anyone who only needs to read.\n**4. Feedback rules** — comments/suggestions for disagreements; no silent deletes.\n**5. Deadlines on a board** — To do / Doing / Done with real dates, not vibes.\n\n**Conflict shortcut:** If two people rewrite the same paragraph, stop editing and leave comments. Resolve in chat or a 5-minute call, then update the shared doc once.`,
        bullets: [
          "Mute your mic when you're not speaking; use raise-hand instead of talking over people.",
          "Agree on one shared home, roles, and permissions before drafting.",
          "Use comments for conflict; version history for accidents.",
        ],
        callout: {
          label: "Try this week",
          text: "On your next group assignment (or club project), spend the first five minutes on the kickoff checklist. Screenshot the shared folder link into the group chat so nobody is hunting for 'the real file.'",
        },
        checkIn: {
          prompt: "You're on a video call for a group project (or remote first-job training). Which is good etiquette?",
          choices: [
            "Never share your screen",
            "Stay unmuted so people hear your room",
            "Talk over others to be heard",
            "Mute when you're not talking and use the raise-hand button",
          ],
          correctIndex: 3,
          explanation:
            "Muting cuts background noise, and the raise-hand button lets you contribute without interrupting — both mark you as a considerate teammate.",
        },
      },
      {
        id: "standards-connect",
        kicker: "Where this fits",
        title: "This is creative communication and digital citizenship together",
        body: `Collaborating well in the cloud draws on two ISTE standards at once. It's **Creative Communicator**, because choosing the right collaboration tools, sharing settings, and meeting habits is about communicating effectively with a specific audience — your team. It's also **Digital Citizen**, because respecting permissions, not overwriting someone else's work, and being careful with sharing links are all about acting responsibly in a shared digital space.\n\nIt connects to **CSTA's "Impacts of Computing"** strand too: real-time collaboration tools have genuinely changed how teams — and entire companies — operate, letting people work together across time zones and locations in ways that weren't possible before the cloud.`,
        callout: {
          label: "Why it matters",
          text: "Employers explicitly list \"collaboration tools\" as an expected skill in job postings. What you're practicing here is literally on real job descriptions.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on — a quick gut-check",
        body: `Think about your last group project.\n\n• Did you use one shared doc, or did files get emailed around?\n• Did anyone ever wonder "which version is real," or worry about permissions?\n\nThere's a full reflection question at the end of this lesson. For now, just notice how much of the "group project stress" people complain about is really a missing kickoff checklist, not a difficult topic or a lazy teammate.`,
        callout: {
          label: "Reflect",
          text: "The team in the opening story didn't lack effort — they lacked one shared home for the file. That's a five-minute fix, not a personality problem.",
        },
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "Case study: a video call meltdown, fixed by etiquette",
        body: `A remote team meeting for a school entrepreneurship club starts rough: three people are unmuted with background noise, two are talking over each other, and nobody can tell who's supposed to present next. Ten minutes in, almost nothing has been decided.\n\nThe club advisor pauses and applies the habits from this lesson:\n\n**1. Everyone mutes** except the current speaker.\n**2. The raise-hand button** replaces talking over people.\n**3. A shared doc (visible via screen share)** lists the agenda and who owns each item — the "one home base" and "roles" pieces of the kickoff checklist, applied live.\n\nWithin two minutes, the meeting completely turns around: one person speaks at a time, everyone can see the agenda, and decisions get typed directly into the shared doc as they're made — so there's no "wait, what did we decide?" afterward.\n\nNone of this required new technology — just applying etiquette and kickoff habits that already existed.`,
        callout: {
          label: "Pro tip",
          text: "If a meeting feels chaotic, the fastest fix is usually structural (mute + raise-hand + a visible shared agenda), not asking people to simply \"be better listeners.\"",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before the full knowledge check",
        body: `Quick self-test before the graded questions — can you explain, in one sentence each?\n\n• Why one shared doc beats emailing file versions around?\n• The three permission levels and the "least access" habit?\n• The difference between a comment and a suggestion?\n• Why version history matters, and one risk of "anyone with the link"?\n\nIf all four feel solid, you're ready for the graded Knowledge Check.`,
        checkIn: {
          prompt: "Someone accidentally deleted a whole section of your shared internship proposal. What saves you?",
          choices: [
            "Version history, which lets you restore an earlier version",
            "Re-typing it from memory only",
            "Nothing — it's gone forever",
            "Turning the Wi-Fi off and on",
          ],
          correctIndex: 0,
          explanation:
            "Cloud docs keep a version history of every change, so you can roll back and restore the section exactly as it was.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've learned the modern way teams work: one **shared document** with the right **permissions**, **comments and suggestions** instead of overwriting, and **version history** to undo any mistake. Add good meeting etiquette, careful link-sharing, and a five-decision kickoff, and you can run a remote team like a pro.\n\nThese habits end the "who has the latest version?" chaos forever — and they're exactly what employers mean when they ask if you can "collaborate."\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then reflect on a group project that would've gone better with these tools.`,
      },
    ],
  },
  bigIdeas: [
    "A **shared doc** is one living version everyone edits at once — no more emailing files around.",
    "Set the right **permissions** (view/comment/edit) and grant the least access needed.",
    "**Comments, suggestions, and version history** let teams disagree safely and undo mistakes.",
    "A shared doc solves version chaos, not coordination — pair it with a real kickoff conversation.",
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
        "Shared docs can't be edited",
        "A shared doc keeps one true, always-current version and avoids version chaos",
        "Email files load faster",
        "Email is more expensive",
      ],
      correctIndex: 1,
      explanation:
        "With a shared doc, everyone edits the same live version. Emailing copies creates confusion about which file is newest and loses work.",
    },
    {
      id: "q2",
      question: "Your teacher needs to give feedback on your group's draft but shouldn't change the text. Which permission fits?",
      choices: [
        "No access",
        "Edit",
        "Comment",
        "Owner",
      ],
      correctIndex: 2,
      explanation:
        "Comment access lets her leave notes and suggestions without altering your writing — the least access she needs to do the job.",
    },
    {
      id: "q3",
      question: "You disagree with a sentence a teammate wrote in the shared report. What's the best move?",
      choices: [
        "Email the whole class about it",
        "Delete it and type your own version",
        "Start a brand-new document",
        "Leave a comment or use suggesting mode so they can respond",
      ],
      correctIndex: 3,
      explanation:
        "Comments and suggestions keep their work visible and let the group decide together. Deleting feels like an attack and erases their contribution.",
    },
    {
      id: "q4",
      question: "Someone accidentally deleted a whole section of your shared internship proposal. What saves you?",
      choices: [
        "Re-typing it from memory only",
        "Nothing — it's gone forever",
        "Version history, which lets you restore an earlier version",
        "Turning the Wi-Fi off and on",
      ],
      correctIndex: 2,
      explanation:
        "Cloud docs keep a version history of every change, so you can roll back and restore the section exactly as it was.",
    },
    {
      id: "q5",
      question: "You're on a video call for a group project (or remote first-job training). Which is good etiquette?",
      choices: [
        "Mute when you're not talking and use the raise-hand button",
        "Stay unmuted so people hear your room",
        "Talk over others to be heard",
        "Never share your screen",
      ],
      correctIndex: 0,
      explanation:
        "Muting cuts background noise, and the raise-hand button lets you contribute without interrupting — both mark you as a considerate teammate.",
    },
    {
      id: "q6",
      question: "A team shares all their project files as 'anyone with the link can edit' for convenience. What's the main risk?",
      choices: [
        "There is no risk — this is always the safest setting",
        "The link can spread beyond the intended team, letting strangers view or even edit the document",
        "The document will load more slowly",
        "It automatically deletes the file after a week",
      ],
      correctIndex: 1,
      explanation:
        "An 'anyone with the link' setting isn't limited to your intended team — the link can be forwarded or leaked, letting unintended people view or edit the file.",
    },
    {
      id: "q7",
      question: "A team has one perfect shared doc but never discusses who owns which section. What does this lesson say is missing?",
      choices: [
        "Real coordination and communication about roles and deadlines, which the doc alone doesn't provide",
        "Nothing — the shared doc alone guarantees good teamwork",
        "More permissions for everyone",
        "A faster internet connection",
      ],
      correctIndex: 0,
      explanation:
        "A shared doc solves version chaos, not coordination. Teams still need to agree on roles, deadlines, and expectations — ideally through a kickoff conversation.",
    },
    {
      id: "q8",
      question: "In the video call case study, what specifically turned the chaotic meeting around?",
      choices: [
        "Switching to text messages instead of a call",
        "Ending the meeting early",
        "Everyone turning off their cameras",
        "Muting by default, using raise-hand, and sharing a visible agenda doc with assigned roles",
      ],
      correctIndex: 3,
      explanation:
        "Structural habits — mute-by-default, raise-hand instead of interrupting, and a visible shared agenda with clear roles — fixed the meeting quickly, without needing new technology.",
    },
  ],
  reflection: {
    prompt:
      "Think of a group project you've done. Which cloud tool — shared editing, comments/suggestions, or version history — would have helped the most, and how?",
    placeholder: "Example: Our slides got messed up when two people edited offline. A single shared deck with version history would've saved us…",
  },
};
