import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson6: AILessonConfig = {
  id: "dl-6",
  title: "6. Collaboration Across Teams, Cultures & Careers",
  goal: "Compare collaboration tools and methods that increase connectivity across cultures and career fields; use comments, version history, permissions, and meetings to coordinate responsible teamwork.",
  xpReward: 300,
  badge: "Connected Collaborator",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/5",
  nextHref: "/learn/digital/7",
  instructorScript: `**Coach's note**
Today's lesson: **Collaboration Across Teams, Cultures & Careers**.

**Goal:** Compare collaboration tools and methods that increase connectivity across cultures and career fields; use comments, version history, permissions, and meetings to coordinate responsible teamwork.

**How to facilitate**
1. Warm-up: ask students what they already think about "Collaboration connects more than one room".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "Collaboration connects more than one room",
        body: `Digital collaboration can connect a student team across class periods, a nonprofit with volunteers in several cities, or a workplace across time zones and cultures. The tool alone does not make that connection equitable or effective. Teams must compare tools, set access intentionally, document decisions, and make room for people with different schedules, languages, devices, and communication styles.\n\nYou will evaluate when to use shared documents, chat, task boards, comments, version history, and meetings. You will also practice collaboration habits that work in group projects, internships, and careers where teammates may not share the same location or background.`,
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
        title: "Vocabulary for connected work",
        body: `• **Synchronous collaboration** — people working together at the same time, such as in a live meeting or co-editing session.\n• **Asynchronous collaboration** — people contributing on their own schedules through comments, recorded updates, or shared tasks.\n• **Permissions** — the access a person has to view, comment on, edit, or manage a file.\n• **Version history** — a record of changes that can be compared or restored.\n• **Decision log** — a short written record of what a team decided, why, and who owns the next step.\n• **Inclusive practice** — a team choice that reduces barriers caused by time zone, language, bandwidth, disability, role, or access to devices.`,
        callout: {
          label: "Tip",
          text: "You don't have to memorize these now. They'll make more sense once you see them in the examples coming up.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "Compare collaboration methods, not just apps",
        body: `A shared document gives a team one source of truth, but it is not always the best method by itself.\n\nUse **live co-editing** for a short planning session or a problem that benefits from immediate discussion. Use **comments and suggestions** when people need time to review, translate, or think before responding. Use a **task board** when ownership and deadlines matter more than drafting. Use a **meeting** for complex decisions, then post a written summary for people who could not attend. Use **chat** for quick coordination—not as the only place where important decisions live.\n\nComparing these methods prevents a common access problem: requiring every teammate to be online at the same time, with the same bandwidth and confidence speaking up.`,
        callout: {
          label: "Common misconception",
          text: "Emailing files back and forth named things like \"essay_v2_FINAL_real.docx\" feels organized, but it causes version chaos — people edit different copies and good work gets lost. One shared doc avoids the whole mess.",
        },
        checkIn: {
          prompt: "Your group keeps emailing 'report_v2_final' files and nobody knows which is newest. Why is a shared document usually the stronger starting point?",
          choices: [
            "Email files load faster",
            "Shared docs can't be edited",
            "A shared doc keeps one true, always-current version and avoids version chaos",
            "Email is more expensive",
          ],
          correctIndex: 2,
          explanation:
            "With a shared doc, everyone edits the same live version. Emailing copies creates confusion about which file is newest and loses work.",
        },
      },
      {
        id: "concept-2",
        kicker: "Concept",
        title: "Permissions are a participation decision",
        body: `Permissions shape who can participate and who can be harmed by a mistake. **View** enables access to information. **Comment** enables feedback without changing the artifact. **Edit** enables direct contribution. Owners also need to consider who can invite others, download copies, or see private notes.\n\nGrant the least access needed, then revisit it as roles change. A mentor may need comment access; a teammate responsible for a section may need edit access; a public audience may need view access only. “Anyone with the link can edit” can be convenient, but it can exclude accountability and expose sensitive work.\n\nAccess also has an equity side: make sure the team does not assume everyone has the same account, device, bandwidth, or ability to join a live session. Offer an alternate way to review or contribute when needed.`,
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
            "Start a brand-new document",
            "Email the whole class about it",
            "Leave a comment or use suggesting mode so they can respond",
            "Delete it and type your own version",
          ],
          correctIndex: 2,
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
            "Delete the paragraph to be safe",
            "Silently add or remove content without saying anything",
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
            "Talk over others to be heard",
            "Stay unmuted so people hear your room",
            "Mute when you're not talking and use the raise-hand button",
          ],
          correctIndex: 3,
          explanation:
            "Muting cuts background noise, and the raise-hand button lets you contribute without interrupting — both mark you as a considerate teammate.",
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
            "Turning the Wi-Fi off and on",
            "Re-typing it from memory only",
            "Version history, which lets you restore an earlier version",
            "Nothing — it's gone forever",
          ],
          correctIndex: 2,
          explanation:
            "Cloud docs keep a version history of every change, so you can roll back and restore the section exactly as it was.",
        },
      },
      {
        id: "collab-scenario-2",
        kicker: "Mini scenario",
        title: "Second case: the 'who deleted my paragraph?' panic",
        body: `A group is co-editing a shared Google Doc for a presentation. Maya opens it and screams in the group chat: "Someone deleted my whole section!" Two teammates start blaming each other. The deadline is tonight.\n\n**Before (chaos):** accusations in the chat, no one knows what happened, Maya retypes everything from memory.\n\n**After (calm):** the team lead opens **version history**, sees the section was accidentally removed twelve minutes ago, clicks **Restore this version**, and posts in chat: "Fixed — it was an accidental delete, not sabotage. Please use **Suggesting mode** for big edits from now on."\n\nSame tools, different habits. Version history turned a blame spiral into a two-minute fix. Suggesting mode would have prevented the overwrite in the first place.`,
        callout: {
          label: "Try this week",
          text: "On your next shared doc, turn on Suggesting mode before anyone edits — and bookmark where version history lives. Knowing both before a crisis is the whole point.",
        },
        checkIn: {
          prompt: "A teammate's work vanished from a shared doc but nobody admits deleting it. What's the first tool to open?",
          choices: [
            "Change everyone's password",
            "Version history — to see what changed and restore an earlier version",
            "Reply-all to the whole school",
            "Start a new doc from scratch",
          ],
          correctIndex: 1,
          explanation:
            "Version history shows exactly what changed and when, and lets you restore earlier versions — it's the fastest way to undo accidental deletes in shared docs.",
        },
      },
      {
        id: "kickoff-checklist",
        kicker: "Checklist",
        title: "Your 5-minute group-project kickoff",
        body: `Before anyone writes a single sentence, spend five minutes on structure — it saves hours of chaos later:\n\n1. **One home base** — pick the shared doc/slide deck and link it in one pinned message.\n2. **Roles** — who owns research, slides, speaking, and final proofread?\n3. **Permissions** — can everyone edit, or should some people comment only?\n4. **Naming** — agree on a file name and folder so nothing ends up as \`final_FINAL2.pptx\`.\n5. **Deadline map** — when is the draft due internally, and when is the real deadline?\n\nGroups that skip this step almost always hit "wait, which version is the real one?" the night before. Groups that do it once usually don't.`,
        callout: {
          label: "Pro tip",
          text: "Put the kickoff checklist directly at the top of the shared doc. Future-you at 11 p.m. will be grateful it's right there.",
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
    "Compare live, asynchronous, and documented methods to match a team’s task, culture, and access needs.",
    "Permissions determine both participation and risk; grant and review access deliberately.",
    "Comments, suggestions, and version history preserve ideas, accountability, and recovery options.",
    "Meetings work best with an agenda, inclusive participation, and a written decision record.",
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
    "Healthcare teams, design studios, nonprofits, research groups, and software companies coordinate across roles, locations, and cultures. Tool fluency matters, but the career skill is choosing methods that let people contribute and understand decisions.",
  quiz: [
    {
      id: "q1",
      question: "Your group keeps emailing 'report_v2_final' files and nobody knows which is newest. Why is one shared document better?",
      choices: [
            "Email is more expensive",
            "Email files load faster",
            "Shared docs can't be edited",
            "A shared doc keeps one true, always-current version and avoids version chaos",
          ],
      correctIndex: 3,
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
            "Leave a comment or use suggesting mode so they can respond",
            "Start a brand-new document",
            "Delete it and type your own version",
          ],
      correctIndex: 1,
      explanation:
        "Comments and suggestions keep their work visible and let the group decide together. Deleting feels like an attack and erases their contribution.",
    },
    {
      id: "q4",
      question: "Someone accidentally deleted a whole section of your shared internship proposal. What saves you?",
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
    {
      id: "q5",
      question: "You're on a video call for a group project (or remote first-job training). Which is good etiquette?",
      choices: [
            "Mute when you're not talking and use the raise-hand button",
            "Never share your screen",
            "Stay unmuted so people hear your room",
            "Talk over others to be heard",
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
            "The document will load more slowly",
            "The link can spread beyond the intended team, letting strangers view or even edit the document",
            "It automatically deletes the file after a week",
          ],
      correctIndex: 2,
      explanation:
        "An 'anyone with the link' setting isn't limited to your intended team — the link can be forwarded or leaked, letting unintended people view or edit the file.",
    },
    {
      id: "q7",
      question: "A team has one perfect shared doc but never discusses who owns which section. What does this lesson say is missing?",
      choices: [
            "More permissions for everyone — familiar wording, wrong fit for what the prompt is actually asking",
            "Real coordination and communication about roles and deadlines, which the doc alone doesn't provide",
            "A faster internet connection — familiar wording, wrong fit for what the prompt is actually asking",
            "Nothing — the shared doc alone guarantees good teamwork",
          ],
      correctIndex: 1,
      explanation:
        "A shared doc solves version chaos, not coordination. Teams still need to agree on roles, deadlines, and expectations — ideally through a kickoff conversation.",
    },
    {
      id: "q8",
      question: "In the video call case study, what specifically turned the chaotic meeting around?",
      choices: [
            "Everyone turning off their cameras",
            "Switching to text messages instead of a call",
            "Muting by default, using raise-hand, and sharing a visible agenda doc with assigned roles",
            "Ending the meeting early",
          ],
      correctIndex: 2,
      explanation:
        "Structural habits — mute-by-default, raise-hand instead of interrupting, and a visible shared agenda with clear roles — fixed the meeting quickly, without needing new technology.",
    },
  ],
  reflection: {
    prompt:
      "Evaluate a group project or team activity. Which method would improve connectivity or reduce an access barrier: live editing, comments, a task board, version history, or a meeting with a decision log? Explain why.",
    placeholder: "Example: Comments plus a written decision log would let teammates with jobs after school contribute without missing decisions made in a live call.",
  },
};
