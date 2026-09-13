import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt, choices, correctIndex, explanation,
});

export const digitalLesson9: AILessonConfig = {
  id: "dl-9",
  title: "9. Make It So More People Can Use It",
  goal: "Make a flyer, slide, or post that more people can actually read — headings, contrast, alt text, captions — then test it.",
  xpReward: 450,
  badge: "Clear Designer",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/8",
  nextHref: "/learn/digital/10",
  instructorScript: `**Coach's note**
Today's lesson: **Make It So More People Can Use It**.

**Goal:** Make a flyer, slide, or post that more people can actually read — headings, contrast, alt text, captions — then test it.

**How to facilitate**
1. Warm-up: hold up a messy flyer (or project one). Ask "Who would have a hard time using this — and why?" Keep it concrete. Do not start with access theory.
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway — pretty is not the same as usable. Test it.
5. Artifact: students must submit the accessible-artifact note before they can finish. It is saved on this device for review.

**Watch for:** "It looks fine on my laptop." Push them to name a person who would get left out, then name the fix (heading, contrast, alt text, caption, or a real test).`,
  lessonModule: {
    durationLabel: "~25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "Pretty is not the same as usable",
        body: `Your flyer can look cool and still fail.\n\nFaint white text on a photo. A club video with no captions. A long page with every sentence bolded. You can read it because you made it. Other people cannot — small phone, bright hallway, a screen reader, or they just need the date in two seconds.\n\nToday you make a flyer, slide, or post that more people can actually use. Then you test it.`,
        image: "/images/lessons/dl-9.png",
        imageAlt: "A cluttered flyer beside a clear accessible version",
        callout: { label: "The first question", text: "Can someone find the point without asking you? If not, the design is not done." },
      },
      {
        id: "equity",
        kicker: "The big idea",
        title: "Who gets left out",
        body: `A design can work great for you and still leave people out.\n\nA chart that uses only red and green. Tiny type that disappears on a phone. A video that auto-plays with no captions — in a quiet library, or for someone who cannot hear it.\n\nYou do not have to mean to leave people out. It happens when you only test with people like you, on your device, with your internet, in your language.`,
      },
      {
        id: "purpose-audience",
        kicker: "Plan",
        title: "Who is this for, and where will they see it?",
        body: `Before you pick a font, name the job and the people.\n\nA scholarship graphic people open on phones is not the same as a printed museum label. Ask: small screen or paper? Fast internet or not? Will they scan for one fact, or sit and read?\n\nMaking it work for more people is not "dumbing it down." It is checking whether the message actually reaches the people you said it was for.`,
      },
      {
        id: "structure",
        kicker: "Readable structure",
        title: "Headings are not just bold",
        body: `Use real headings, in order. Short sections. Link text that says where it goes. "Click here" should become "Read the internship rules."\n\nScreen readers and keyboard users need that structure. Everyone else can scan faster too. Bolding every sentence does not build a heading. It just shouts.`,
        checkIn: check(
          "Which change helps a long scholarship guide the most — for people scanning and for a screen reader?",
          [
            "Make every sentence bold",
            "Use color alone to split topics",
            "Dump every detail in one text box",
            "Use real heading levels and short sections",
          ],
          3,
          "Headings tell people and tools what comes next. Bold-everything does not.",
        ),
      },
      {
        id: "contrast",
        kicker: "Visual access",
        title: "If you cannot read it, the style failed",
        body: `**Contrast** is how different the text is from the background. Soft gray on a photo can look fancy on a big monitor. On a phone in sunlight, the date is gone.\n\nDo not make color the only signal. Label the bars. Add a pattern. Write the number on the chart. That helps people who see color differently — and anyone looking at a black-and-white printout.`,
      },
      {
        id: "alt-text",
        kicker: "Images",
        title: "Alt text says what the picture is for",
        body: `**Alt text** is a short description a screen reader reads out loud. Say what the image is doing in this piece — not every pixel.\n\nFor a chart: "Graduation rates rose from 78% to 88% from 2021 to 2025." A decorative line can have empty alt text so it does not add noise.\n\n"graph.png" is a filename. It is not alt text.`,
        image: "/images/lessons/dl-9-2.png",
        imageAlt: "A meaningful image description and a vague filename compared",
        checkIn: check(
          "A graph backs your claim that bus ridership went up. Which alt text is strongest?",
          [
            "A colorful graph",
            "graph.png",
            "Line graph: weekday ridership rose from 900 to 1,400 between September and May",
            "Image of a line graph",
          ],
          2,
          "The best description gives the fact the picture is there to prove.",
        ),
      },
      {
        id: "captions",
        kicker: "Audio and video",
        title: "Captions are part of the video",
        body: `**Captions** show the spoken words and the important sounds. A **transcript** is the whole thing as readable text. Auto-captions miss names, tech words, who is talking, and timing. Check them.\n\nCaptions help Deaf and hard-of-hearing people. They also help in a quiet room, when the audio is bad, and when someone is skimming. They are not an extra. They are the content.`,
      },
      {
        id: "media-bias",
        kicker: "Representation",
        title: "Check whose story is missing",
        body: `Pictures, names, and "normal user" examples quietly say who belongs.\n\nA career poster that only shows one kind of person in the tech jobs. A how-to that assumes fast home Wi-Fi. Ask: whose life does this assume? Who might not see themselves here?\n\nDo not drop in a random photo to "fix" it. Pick examples that are true and useful. If you are not the audience, ask someone who is.`,
      },
      {
        id: "file-formats",
        kicker: "Ship it well",
        title: "The download is what people actually get",
        body: `Export for the place it will live. A tagged PDF can keep headings. A screenshot of the whole page often cannot. A captioned video plus a transcript is easier to search.\n\nKeep an editable file for your team. Send the audience a file they can actually use.\n\nOpen the export. The pretty editing view is not proof the download kept its links, reading order, captions, or contrast.`,
        checkIn: check(
          "What is the strongest last step before you post a club report as a PDF?",
          [
            "Trust that the editor preview matches every device",
            "Rename the file twice",
            "Open the exported PDF on a phone and check headings, links, and whether you can read it",
            "Screenshot every page",
          ],
          2,
          "The file people download can break things the editor hid.",
        ),
      },
      {
        id: "test",
        kicker: "Test",
        title: "Do not only use your own eyes",
        body: `Look at it on a small screen. Zoom to 200%. Mute the video. Print it in grayscale. Tab through it if you can. Ask a classmate to find the main point in ten seconds.\n\nThose checks show barriers before you post. If you can, ask someone the design actually affects. Listen for a pattern. Do not just defend the first draft.`,
      },
      {
        id: "refine",
        kicker: "Refine",
        title: "Fix what the test showed",
        body: `A classmate cannot find the event time. A caption names the wrong speaker. The QR code vanishes in grayscale. Each one is a fix: clearer headings, edited captions, a labeled URL under the code.\n\nChanging it is not failure. It is how you finish the job.\n\nWrite down what you changed and why. That note helps in a portfolio, a team review, or a handoff at work.`,
        image: "/images/lessons/dl-9-3.png",
        imageAlt: "A flyer being revised after accessibility testing",
      },
      {
        id: "scenario",
        kicker: "A real choice",
        title: "The stylish post nobody can read",
        body: `Your team wants a dramatic photo with thin white text for a fundraiser. It looks great on a laptop. On phones, the date disappears.\n\nYou can keep the mood: a dark overlay, a solid text panel, or a different photo.\n\nIf people cannot find the date, the post failed — even if it looks impressive.`,
        checkIn: check(
          "The date is hard to read on phones. What should the team do?",
          [
            "Add a high-contrast text panel and check it on phones",
            "Make the background busier",
            "Keep the faint text because the photo looks good",
            "Tell people to turn up their brightness",
          ],
          0,
          "Keep the look if you want — but put the facts where people can actually read them.",
        ),
      },
      {
        id: "checklist",
        kicker: "Take action",
        title: "Before you post",
        body: `Check these: who it is for; real headings; size and contrast you can read; labels, not color alone; alt text that does a job; captions or a transcript that are right; examples that do not leave people out; an export that still works.\n\nThen open the final file the way people will actually use it.`,
      },
      {
        id: "peer-review",
        kicker: "Peer review",
        title: "Do not ask \"Do you like it?\"",
        body: `Ask a reviewer to find the main action. Explain the chart with the color turned off. Open it on their own phone.\n\nA real task gives you something you can fix. "Looks good" does not.`,
      },
      {
        id: "portfolio",
        kicker: "Show your process",
        title: "Say what you changed",
        body: `In a portfolio or a project note, name the barrier you spotted, what you added, and what testing changed.\n\nThat shows access was part of how you designed — not a last-minute checkbox.`,
      },
      {
        id: "ready",
        kicker: "Remember this",
        title: "Make it, test it, fix it",
        body: `Finished-looking is not the goal. More people being able to use it is.\n\nHeadings. Contrast. Alt text. Captions. Then a real test on a phone, muted, or in grayscale. If someone gets left out, change the file.`,
        checkIn: check(
          "Which sentence gets the job right?",
          [
            "If it looks good on your laptop, you are done",
            "Make the file, test it the way people will use it, then fix what the test showed",
            "Alt text is only for extra-credit projects",
            "Captions are optional if the video looks polished",
          ],
          1,
          "The test is part of making it. Pretty is not enough.",
        ),
      },
    ],
  },
  bigIdeas: [
    "A flyer, slide, or post can look finished and still leave people out.",
    "**Headings, contrast, alt text, and captions** make the meaning available to more people.",
    "Test the file people actually get — then fix what the test showed.",
  ],
  keyTerms: [
    { term: "Alt text", definition: "A short description of what an image is doing in this piece. A screen reader reads it out loud." },
    { term: "Captions", definition: "Timed text for spoken words and important sounds in a video." },
    { term: "Contrast", definition: "How different the text or graphic is from the background — so you can actually see it." },
    { term: "Readable structure", definition: "Real headings, lists, and link text that let people (and tools) find their way." },
    { term: "Accessible export", definition: "The download still has usable text, headings, captions, and links — not just a pretty preview." },
    { term: "Who gets left out", definition: "The people your design does not work for — small screen, no sound, color differences, or a screen reader." },
  ],
  realWorld: "A club flyer, a scholarship graphic, or a portfolio slide should work on a phone, in a hallway, and with captions or alt text. That is the job — not just looking finished on your laptop.",
  quiz: [
    {
      id: "q1",
      question: "A chart uses only red and green to tell categories apart. Why is that a problem?",
      choices: [
        "It cannot be saved as a PDF",
        "Some people cannot tell the categories apart",
        "Charts should never use color",
        "It makes the file too small",
      ],
      correctIndex: 1,
      explanation: "Add labels, patterns, or the actual numbers so the chart still works without the colors.",
    },
    {
      id: "q2",
      question: "What should useful alt text for a chart include?",
      choices: [
        "The takeaway the chart is there to prove",
        "The file extension",
        "The words \"image of\"",
        "Every visual detail",
      ],
      correctIndex: 0,
      explanation: "Alt text should give the information the picture is doing in this piece.",
    },
    {
      id: "q3",
      question: "A video has auto-captions. What should you do next?",
      choices: [
        "Read them and fix names, speakers, and timing",
        "Add background music",
        "Post without checking",
        "Delete all captions",
      ],
      correctIndex: 0,
      explanation: "Auto-captions get names and meaning wrong. Check them before you post.",
    },
    {
      id: "q4",
      question: "Which test best checks whether a graphic works on phones?",
      choices: [
        "Open the final file on a phone",
        "Ask the creator if it looks good",
        "Add more fonts",
        "Only look at it on a projector",
      ],
      correctIndex: 0,
      explanation: "Test it the way the audience will actually see it.",
    },
    {
      id: "q5",
      question: "Why open the exported PDF instead of trusting the editor preview?",
      choices: [
        "Exports always add extra pages",
        "PDFs cannot hold text",
        "Editors never have previews",
        "Exporting can scramble headings, links, and whether you can read it",
      ],
      correctIndex: 3,
      explanation: "People get the download, not your editing screen. Check that file.",
    },
    {
      id: "q6",
      question: "A QR code disappears when you print in grayscale. What should you do?",
      choices: [
        "Tell people they need a color screen",
        "Delete the information",
        "Make the QR code smaller",
        "Add a labeled URL and make the contrast stronger",
      ],
      correctIndex: 3,
      explanation: "Give people a second way to get the same fact.",
    },
  ],
  artifact: {
    title: "Accessible artifact note",
    prompt: "Describe a **short artifact** you would publish (flyer, slide, post, or one-pager). Write the **heading**, the **alt text** for one image, one **contrast or caption** choice, and one **test** you would run (phone, grayscale, screen-reader headings, or captions on). Say who that change helps.",
    placeholder: "Artifact: club meeting flyer. Heading: Robotics Club — Tuesday 3:30, Room 12. Alt text: … Contrast: dark text on a solid panel, not on the photo. Test: I would open it on a phone and check the heading order. Helps: people scanning on a small screen and people using a screen reader.",
    minChars: 120,
    rubric: [
      "Names the artifact and its audience.",
      "Includes real heading text plus alt text (not “image of a flyer”).",
      "Names one test and who the revision helps.",
    ],
  },
};
