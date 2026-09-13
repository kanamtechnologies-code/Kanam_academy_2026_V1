import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt, choices, correctIndex, explanation,
});

export const digitalLesson10: AILessonConfig = {
  id: "dl-10",
  title: "10. Who Owns the Work",
  goal: "Know when you can reuse a song, image, or idea — copyright, licenses, fair use, credit, and saying when AI helped.",
  xpReward: 500,
  badge: "Credit Smart",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/9",
  nextHref: "/learn/digital/11",
  instructorScript: `**Coach's note**
Today's lesson: **Who Owns the Work**.

**Goal:** Know when you can reuse a song, image, or idea — copyright, licenses, fair use, credit, and saying when AI helped.

**How to facilitate**
1. Warm-up: play or show a familiar song or meme. Ask "Can you drop this in a public school video? Why or why not?" Do not start with legal vocabulary.
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway — credit is not the same as permission, and AI help needs a real sentence.

**Watch for:** "I found it online, so I can use it" and "I put the name in the corner, so it is fine." Push them back to license, fair use, or a different source.`,
  lessonModule: {
    durationLabel: "~25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "Can you actually use that?",
        body: `A song in a scholarship video. A photo on a club flyer. A paragraph you almost copied. An image an AI tool made.\n\nSame question every time: who owns this, and what are you allowed to do with it?\n\nThe rules are not "always share" or "never touch anyone else's stuff." Today you learn when you can reuse something — and how to say so honestly.`,
        image: "/images/lessons/dl-10.png",
        imageAlt: "Creative works, licenses, and credit notes arranged around a scale",
        callout: { label: "The first question", text: "Did you make it, did someone give permission, or are you guessing?" },
      },
      {
        id: "terms",
        kicker: "The words",
        title: "Copyright, license, credit — not the same thing",
        body: `**Copyright** is the legal control a creator gets over their original work — a song, photo, essay, game, video.\nA **license** is written permission with conditions. **Creative Commons** is a set of common licenses you can actually read.\n**Public domain** means anyone can use it.\n**Plagiarism** is passing off someone else's words or ideas as yours. That is an honesty problem. Breaking copyright is a legal problem. They can happen together. They are not the same.`,
      },
      {
        id: "benefits",
        kicker: "Why the rules exist",
        title: "Protection can help people keep making things",
        body: `If you spent a year on a song or a book, you probably want a say in how it is used — and a chance to get paid.\n\nCopyright can do that. Clear licenses also help a team: you know what you can reuse and what you have to credit.\n\nWith no rules at all, a big platform could copy a small creator tomorrow and keep the money.`,
      },
      {
        id: "harms",
        kicker: "The other side",
        title: "The same rules can get in the way",
        body: `If every reuse needs a lawyer, students, libraries, and small creators get stuck. You cannot remix, translate, or even save a copy for class without a hunt for the owner.\n\nSome communities cannot afford the licenses for the materials they need.\n\nThe useful question is not "is copyright good?" It is: does this rule help the person who made it *and* still let other people learn and make the next thing?`,
      },
      {
        id: "tradeoff",
        kicker: "Both sides",
        title: "Name who wins and who gets stuck",
        body: `A photographer's picture shows up in an ad. They never said yes. Protection can help them get paid and get it taken down.\n\nA teacher wants to quote a short bit of that ad in class to talk about it. A system with zero exceptions would block that too.\n\nSay who is helped, who pays the cost, and what a middle path looks like.`,
        checkIn: check(
          "Which sentence gets both sides of the copyright question?",
          [
            "Credit is the only thing that matters",
            "Any sharing is always good for new work",
            "Protection can help creators get paid, but rules that are too tight can block schoolwork and remixes",
            "Any copy is always harmful",
          ],
          2,
          "You have to hold both: a reason to make new work, and a way for later people to learn from it.",
        ),
      },
      {
        id: "licenses",
        kicker: "Permission",
        title: "Read the license, not the vibe",
        body: `"It is online" and "free download" do not mean you can reuse it.\n\n**CC BY** means credit the creator. **NC** means not for selling stuff. **ND** means do not change it. **SA** means share your remix under the same rules. Public domain is a different bucket.\n\nA license is the middle: not "all rights reserved," not "do anything." Read the actual terms.`,
        image: "/images/lessons/dl-10-2.png",
        imageAlt: "Creative Commons license conditions shown as permission choices",
      },
      {
        id: "fair-use",
        kicker: "A limited exception",
        title: "\"It's for school\" is not a free pass",
        body: `**Fair use** can sometimes let you use a short piece without a license — to criticize it, comment on it, teach, or parody it. It depends on the situation. It is not an automatic school-project stamp.\n\nAsk: why are you using it? What kind of work is it? How much did you take? Would someone pick yours instead of the original?\n\nIf you are not sure, pick a licensed track or ask a teacher or librarian. This lesson is a decision checklist, not legal advice.`,
        checkIn: check(
          "Which use is more likely to count as fair use?",
          [
            "Uploading a full movie as background entertainment",
            "Quoting a short passage while you explain its argument",
            "Using a full song because the video is not for profit",
            "Removing a watermark from a stock photo",
          ],
          1,
          "A short quote you are actually talking about is different from using the whole work as a stand-in.",
        ),
      },
      {
        id: "plagiarism",
        kicker: "Honesty",
        title: "Credit shows what is yours",
        body: `Credit lets a reader see your thinking versus someone else's words, data, picture, code, or idea. Quote when the exact words matter. Paraphrase in your own shape and still cite. Keep a source list while you research — not the night before.\n\nGiving credit is not the same as having permission. Having permission does not let you pretend you wrote it. You need both answers.`,
      },
      {
        id: "ai",
        kicker: "AI-assisted work",
        title: "Say when AI helped — in one real sentence",
        body: `AI tools can draft text, images, code, or edits. The output can be wrong, stereotyped, or built from other people's work. Follow your school's rules. Check the tool's terms. Disclose help that actually mattered.\n\nName the tool, the job, and what you checked. **Tool + job + what you verified.** Example: "I used [tool] to draft alt text; I rewrote two captions and checked them against the images."\n\nDo not label an AI image as a photo you took. A reader should be able to check your process.`,
        checkIn: check(
          "Which note is honest enough for a school project that used an image generator?",
          [
            "\"I used the internet.\"",
            "\"AI helped.\"",
            "\"I used [tool] to generate a background image; I did not photograph this scene, and I checked the text for invented names.\"",
            "No note is needed if the image looks original.",
          ],
          2,
          "Name the tool, what it did, and what you still checked — including that a generated picture is not a photo you took.",
        ),
      },
      {
        id: "case",
        kicker: "Case study",
        title: "Jordan wants that song in the video",
        body: `Jordan is making a public scholarship video. A famous song would make it hit harder. Using the full track without a license can get the video pulled — and the artist does not get paid or a say.\n\nJordan can license music, pick a Creative Commons or library track, make original audio, or change the concept.\n\nPutting the artist name in the credits is not enough. Ask: do I have permission, what does it cost, what is the risk, and is there a better sound I can actually use?`,
        image: "/images/lessons/dl-10-3.png",
        imageAlt: "A video editor comparing licensed music with a copyrighted song",
      },
      {
        id: "innovation",
        kicker: "A school rule",
        title: "Protect the artist and still let class happen",
        body: `Your school posts student art online. A fair guideline: students keep ownership. Nobody sells the work without asking. If the school wants a showcase license, say so clearly and make it opt-in. Classmates can quote or show a small piece for critique, with credit.\n\nA useful rule says who it protects and what problem it avoids.`,
      },
      {
        id: "workflow",
        kicker: "A habit",
        title: "Keep a tiny source log",
        body: `For each outside asset, write: who made it, the license or permission, how you will use it, the credit line, what you changed, and where the credit goes. For AI, write the tool, the job, and what you checked.\n\nThat scrap of notes saves you when a teammate, a teacher, or a portfolio reviewer asks.`,
      },
      {
        id: "stakeholders",
        kicker: "Who is affected",
        title: "It is not only about your deadline",
        body: `A license choice hits the creator, your audience, classmates, the platform, libraries, and the next person who wants to build on it.\n\nIf you only ask "what is easiest for me," you will miss someone.`,
      },
      {
        id: "alternatives",
        kicker: "Compare options",
        title: "There is usually another source",
        body: `Make it yourself. Use licensed media. Use public domain. Quote a short piece and talk about it.\n\nCompare how good it looks, whether you have permission, cost, what credit it needs, and how it treats the original creator. Then pick.`,
      },
      {
        id: "ready",
        kicker: "Remember this",
        title: "Check before you reuse",
        body: `Copyright can help a creator get paid. It can also block a remix or a class project. Read the license. Use fair use carefully. Credit the source. Say when AI helped.\n\nA name in the corner is not a plan.`,
        checkIn: check(
          "Which sentence gets reuse right?",
          [
            "If it is online, you can use it",
            "Credit always equals permission",
            "Check permission or a license, credit the source, and say when AI did part of the work",
            "School projects never need credit",
          ],
          2,
          "Permission, credit, and an AI note are three different jobs.",
        ),
      },
    ],
  },
  bigIdeas: [
    "Copyright can help creators get paid — and it can also make reuse harder.",
    "A **license**, **public domain**, or a careful **fair use** call is what tells you if you can reuse something.",
    "**Credit** is honesty. **Permission** is a separate question. **AI disclosure** is a real sentence, not \"AI helped.\"",
  ],
  keyTerms: [
    { term: "Copyright", definition: "Legal control over original creative work — a song, photo, essay, video." },
    { term: "License", definition: "Written permission to use a work, with conditions you have to follow." },
    { term: "Creative Commons", definition: "Ready-made licenses so a creator can share work with clear rules (credit, no sales, no edits, and so on)." },
    { term: "Fair use", definition: "A limited, situation-by-situation exception — not an automatic \"it's for school\" pass." },
    { term: "Plagiarism", definition: "Presenting someone else's work or ideas as your own." },
    { term: "Attribution", definition: "Clear credit: who made it, and any license they asked you to name." },
    { term: "AI disclosure", definition: "One honest line: the tool, the job it did, and what you still checked." },
  ],
  realWorld: "A public video, a portfolio, or a club flyer can get pulled or lose trust if you grab a song or image you cannot use. Credit the source. Say when AI helped. Pick a licensed alternative when you are not sure.",
  quiz: [
    {
      id: "q1",
      question: "How can copyright help new work get made?",
      choices: [
        "It bans every copy forever",
        "It makes every work free",
        "It means you never need a license",
        "It can help creators get paid and keep making the next thing",
      ],
      correctIndex: 3,
      explanation: "A chance to earn from the work is one reason people keep creating.",
    },
    {
      id: "q2",
      question: "What is a real downside of very strict reuse rules?",
      choices: [
        "Creators can never earn money",
        "You can never give credit",
        "Everything becomes public domain",
        "Learning, saving, or remixing can get much harder",
      ],
      correctIndex: 3,
      explanation: "Tight rules can block schoolwork and follow-on projects, especially if you cannot pay for a license.",
    },
    {
      id: "q3",
      question: "What does CC BY require?",
      choices: [
        "No changes allowed",
        "Credit the creator",
        "No credit",
        "Only non-commercial use",
      ],
      correctIndex: 1,
      explanation: "BY means attribution. Other letters add extra limits.",
    },
    {
      id: "q4",
      question: "Why is \"it's for school\" not enough to prove fair use?",
      choices: [
        "You still have to look at how much you used and whether you replace the original",
        "Credit always makes a use fair",
        "Schoolwork cannot cite sources",
        "Students cannot make videos",
      ],
      correctIndex: 0,
      explanation: "Purpose matters. It is only one part of the call.",
    },
    {
      id: "q5",
      question: "AI generated a draft image for your project. What is the honest move?",
      choices: [
        "Delete every credit",
        "Assume the tool has no rules",
        "Say you photographed it",
        "Name the tool and what you edited or checked",
      ],
      correctIndex: 3,
      explanation: "A reader should know the tool did part of the work, and what you still did.",
    },
    {
      id: "q6",
      question: "Which school art rule is fairest to students and still lets class happen?",
      choices: [
        "Students keep ownership, reuse terms are clear, and critique can quote a small credited piece",
        "Hide all student work",
        "Nobody may talk about or critique the art",
        "Anyone can sell student work without asking",
      ],
      correctIndex: 0,
      explanation: "Protect the creator. Still allow a small, credited look for learning.",
    },
  ],
};
