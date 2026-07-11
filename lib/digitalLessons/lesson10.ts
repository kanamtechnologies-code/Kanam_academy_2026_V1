import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson10: AILessonConfig = {
  id: "dl-10",
  title: "10. Copyright, Licensing & Giving Credit",
  goal: "Use other people's content legally and ethically — understand copyright, licenses, Creative Commons, public domain, and fair use, avoid plagiarism, and give proper credit (including for AI-generated work) in school projects, scholarship videos, and portfolios.",
  xpReward: 500,
  badge: "Credit Giver",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/9",
  nextHref: "/learn/digital/11",
  lessonModule: {
    durationLabel: "~11–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `You're making a video, a slideshow, or a post and you want a cool song, a great photo, or a clip. Can you just grab it off the internet? Usually... no. Today you'll learn how to use other people's work the *right* way — legally and ethically — whether it's a class project, a scholarship video essay, or a portfolio for an internship.\n\nHere's our roadmap:\n\n• **Copyright** — why creators automatically own what they make.\n• **Licenses & Creative Commons** — permission with rules.\n• **Public domain and "free to use"** — and why you still read the terms.\n• **Fair use** — what it really covers (it's narrower than people think).\n• **Plagiarism vs. attribution** — and how to credit properly.\n• **Who owns AI-generated content?**\n• **Senior stretch** — media for college apps, scholarships, and job portfolios.\n\nThis matters now (that essay, that video edit) and later: getting this wrong at a job or online can mean takedowns, muted videos, failing grades, or even legal trouble. Getting it right makes you look trustworthy and professional.`,
        image: "/images/lessons/dl-10.png",
        imageAlt: "A photo, a song, and a piece of writing each tagged with a small copyright symbol, next to a checklist for giving credit",
        callout: {
          label: "Why it matters",
          text: "Creators put real time and skill into their work. Respecting copyright protects them — and one day it'll protect *you* and the things you make. It's the same rule pointed in both directions.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "The key words, in plain English",
        body: `This topic is full of official-sounding words. Here's what each one really means — keep this list in your back pocket:\n\n• **Copyright** = the rule that says whoever *makes* something automatically *owns* it. ("Copy-right" = the right to copy it belongs to them.)\n• **License** = permission to use someone's work, *with rules attached*. Like a hall pass that only works under certain conditions.\n• **Creative Commons (CC)** = a free, ready-made set of licenses creators use to say "you can use this if you follow these rules."\n• **Public domain** = work that belongs to *everyone* — free to use, no permission needed.\n• **Fair use** = a *narrow* exception that sometimes lets you use a small bit without asking (for things like a school report or a review).\n• **Plagiarism** = pretending someone else's work or ideas are your own. It's about *honesty*, not law.\n• **Attribution** = giving credit — clearly saying who made something and where you got it.\n\nNotice two of these get mixed up constantly: **copyright** is a *legal* issue (did you have permission?), while **plagiarism** is an *honesty* issue (did you say who made it?). Keep them separate and you're ahead of most adults.`,
        callout: {
          label: "Pro tip",
          text: "If you only remember one thing: \"I found it online\" is never the same as \"I'm allowed to use it.\" Permission is a separate question from whether you *can* download something.",
        },
      },
      {
        id: "copyright",
        kicker: "The big idea",
        title: "Copyright: the creator owns it the moment they make it",
        body: `**Copyright** is a legal right that says the person who creates something **automatically owns it** — the moment they make it. They didn't have to register it or add a © symbol; it's theirs the instant it exists.\n\nCopyright covers original creative work like:\n\n• **Photos and art** • **Music and songs** • **Writing** (articles, stories, posts) • **Videos and films** • **Code and games**\n\nBecause they own it, *they* get to decide who can copy, share, or reuse it. That means you usually **can't just take it and use it** — even if it's easy to download, even if you're not making money, even if you say thanks.\n\nThink of it like a **bike sitting in someone's yard**. The fact that you *can* hop on and ride it doesn't make it yours, and "but the gate was open" isn't a defense. You need the owner's permission first.`,
        image: "/images/lessons/dl-10-2.png",
        imageAlt: "A photo, a song, and a piece of writing each glowing with a small copyright symbol, beside a bicycle in a yard with an open gate",
        callout: {
          label: "Common misconception",
          text: "\"If it's on Google Images or anywhere on the internet, it's free to use.\" False. Almost everything online was made by someone who owns the copyright. Being easy to find or download does NOT mean you have permission to reuse it.",
        },
      },
      {
        id: "licenses-cc",
        kicker: "Permission with rules",
        title: "Licenses, Creative Commons & public domain",
        body: `So how *do* you use someone's work? You need their permission — and that usually comes as a **license**.\n\nA **license** is the creator saying "yes, you can use this — *if* you follow my rules." Back to the bike: a license is the owner saying "sure, ride it — as long as you bring it back and tell people it's mine."\n\n**Creative Commons (CC)** is a popular set of free, ready-made licenses creators use to share work with clear rules. Common conditions:\n\n• **Attribution (BY)** — you must credit the creator.\n• **NonCommercial (NC)** — you can't use it to make money.\n• **ShareAlike (SA)** — anything you build with it must use the same license.\n• **NoDerivatives (ND)** — you can't change it.\n\n**Public domain** means the work is **free for anyone to use** with no permission needed — usually because the copyright expired or the creator gave up their rights. **"Royalty-free" / "free to use"** sites (for stock photos, music, sound effects) let you use content under their own terms — which you should always actually read.`,
        bullets: [
          "**License** = permission to use something, with rules attached.",
          "**Creative Commons** = free licenses with conditions like attribution, non-commercial, or share-alike.",
          "**Public domain** = free for anyone, no permission needed.",
          "**\"Free to use\" / royalty-free** = allowed under that site's terms — read them first.",
        ],
        callout: {
          label: "Watch out",
          text: "\"Free to use\" almost never means \"no rules.\" Many free sources still require you to credit the creator, ban commercial use, or forbid editing. Always read the license before you assume what you're allowed to do.",
        },
      },
      {
        id: "fair-use-plagiarism",
        kicker: "Two big traps",
        title: "Fair use is narrow — and credit isn't a free pass",
        body: `**Fair use** is a limited exception that *sometimes* lets you use a small piece of copyrighted work without permission — for things like commentary, criticism, news, teaching, or parody. But it is **case-by-case** and depends on things like how much you used and whether it hurts the creator's ability to sell their work.\n\nThe key word is **limited**. Fair use is NOT a blanket "it's for school, so anything goes." Copying a whole song into your project is very different from quoting one line to discuss it.\n\nSeparate but related is **plagiarism**: passing off someone else's work or ideas as your own. Plagiarism is an **honesty problem** (you're lying about who made it), while copyright is a **legal problem** (you're using it without permission). You can commit one without the other — and a lot of trouble comes from doing both at once.\n\nThe fix for plagiarism is **attribution**: clearly crediting the source. But credit alone doesn't make any use legal — you still need the right license or permission.`,
        callout: {
          label: "Common misconception",
          text: "\"Giving credit makes any use legal.\" Not true. Credit fixes *plagiarism* (the honesty issue), but you still need permission or the right license to use copyrighted work. Crediting a song you weren't allowed to use is still copyright infringement.",
        },
      },
      {
        id: "ai-attribution",
        kicker: "Crediting properly",
        title: "How to attribute — and who owns AI-generated work?",
        body: `When you *are* allowed to use something, give a clear attribution. A good one usually names four things, sometimes remembered as **TASL**:\n\n• **Title** — what the work is called\n• **Author** — who made it (the creator)\n• **Source** — where you found it (a link)\n• **License** — what license it's under (e.g., CC BY)\n\nExample: *"Sunrise Over Hills" by Jordan Lee, from Unsplash, used under the Unsplash License.*\n\n**What about AI-generated content?** This is new and the rules are still being worked out. Some key points: in many places, work created *purely* by AI may **not** be copyrightable the way human work is, because there's no human author. Tools also have their own terms about what you can do with their output. And it's good practice — and increasingly required at school and work — to **disclose when you used AI**, just like any other source. College honor codes and internship employers often care a lot about this.`,
        callout: {
          label: "Pro tip",
          text: "When in doubt, over-credit and ask. A clear note like \"Image generated with [AI tool]\" or a full attribution line costs you nothing and protects you. Silence is what gets people into trouble.",
        },
      },
      {
        id: "senior-media",
        kicker: "For older teens",
        title: "Media for scholarships, college apps & job portfolios",
        body: `High-stakes projects have the same copyright rules as class projects — and sometimes *stricter* expectations, because your work may be posted publicly or judged by adults who notice muted audio and missing credits.\n\n• **Scholarship / college video essays** — don't rip a chart-topping song from a streaming app. Use a free music library or Creative Commons track, read the license, and put credits on the end screen or description.\n• **Portfolios for internships** — if you include photos, fonts, or code snippets you didn't make, check the license and attribute. Employers notice honesty.\n• **Group Google Docs / shared decks** — if a teammate drops in a random Google Image, pause and ask: do we have permission? Better to swap it for a licensed photo than to submit a stolen one.\n• **Your own work** — when *you* create something original, you own the copyright. That means you can put it in a portfolio — and others need *your* permission to reuse it.\n\nYounger teens: practice the habit now on school videos. Seniors: treat every public upload like a professional sample of your judgment.`,
        bullets: [
          "Scholarship videos need licensed music — not ripped hits.",
          "Portfolios should credit anything you didn't create.",
          "In group docs, question mystery images before submitting.",
          "Your original work is yours — protect it and share it wisely.",
        ],
        callout: {
          label: "Watch out",
          text: "\"It's for a scholarship / school / nonprofit\" does not automatically equal fair use for a full song or movie clip. When in doubt, use clearly licensed media and write the credit.",
        },
      },
      {
        id: "where-to-find",
        kicker: "A real example",
        title: "Where to actually find stuff you're allowed to use",
        body: `Knowing the rules is great — but where do you go to find legal photos, music, and clips? Here are real, beginner-friendly places, each with content you're *allowed* to use (just check each one's terms):\n\n• **Photos** — Unsplash, Pexels, and Pixabay offer free stock photos. Wikimedia Commons has tons of openly licensed images.\n• **Music & sound** — the YouTube Audio Library, Free Music Archive, and Incompetech have free or Creative Commons tracks.\n• **Anything, filtered** — Creative Commons Search lets you search across many sites for CC-licensed work.\n• **Already free** — work in the **public domain** (very old books, art, and music whose copyright expired).\n\nFast checklist before you use *anything*:\n\n• **Do I have permission?** (a license, public domain, or it's clearly free to use)\n• **What are the rules?** (credit required? non-commercial only? no editing?)\n• **Did I write the credit?** (Title, Author, Source, License)\n\nIf you can answer all three, you're in the clear.`,
        bullets: [
          "**Photos**: Unsplash, Pexels, Pixabay, Wikimedia Commons.",
          "**Music/sound**: YouTube Audio Library, Free Music Archive, Incompetech.",
          "**Search everything**: Creative Commons Search.",
          "Always check: permission? rules? credit written?",
        ],
        callout: {
          label: "Watch out",
          text: "Even on \"free\" sites, individual items can have different rules. One photo might need credit while another doesn't. Don't assume the whole site works one way — check the license on the specific file you grab.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Finding legal media for a class video, step by step",
        body: `You're making a class video and want **a background song and a photo**. Here's how to do it right, step by step.\n\n**Step 1 — Don't rip from streaming.** Pulling a popular song straight off a streaming app or YouTube is copyrighted — it can get your video **muted or taken down**, even for a school project. Skip it.\n\n**Step 2 — Search licensed sources.** Look on sites built for this: free music libraries, Creative Commons search, or royalty-free stock sites. Filter for content you're allowed to use.\n\n**Step 3 — Read the license.** For the song, check: does it require attribution? Is it non-commercial only? (A class project is usually fine, but read anyway.) Do the same for the photo.\n\n**Step 4 — Download and write the attribution.** Save the files and write a credit line using **TASL**: e.g., *Music: "Bright Days" by A. Rivera (Free Music Archive, CC BY 4.0). Photo: "City Park" by M. Chen (Pexels, Pexels License).*\n\n**Step 5 — Put credits where they belong.** Add the attributions to your video's end screen or description. Now your video is legal, ethical, and won't get muted.`,
        image: "/images/lessons/dl-10-3.png",
        imageAlt: "A class video editing screen with a licensed song and photo dropped in, and a credits panel listing Title, Author, Source, and License",
        callout: {
          label: "Watch out",
          text: "Music and images in videos and posts are often scanned automatically. Using a copyrighted song can get your video silently muted, demonetized, blocked in some countries, or removed — even if you credited the artist. Licensed media avoids all of that.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You now know how to use the internet's content without stealing it. Quick recap:\n\n• **Copyright** means the creator automatically owns their work — you usually can't just reuse it.\n• A **license** is permission with rules; **Creative Commons** offers free licenses with conditions; **public domain** is free for all.\n• **Fair use** is narrow and case-by-case — not a blanket school excuse.\n• **Plagiarism** is claiming others' work as yours; fix it with **attribution** (Title, Author, Source, License) — but credit alone doesn't make use legal.\n• **AI-generated** content has its own evolving rules — disclose when you use it.\n• For scholarships, college apps, and portfolios: use licensed media and write the credits.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then write a quick reflection.`,
      },
    ],
  },
  bigIdeas: [
    "**Copyright** means the creator automatically owns their work — you usually need permission to reuse it.",
    "A **license** is permission with rules; **Creative Commons** and **public domain** make some work free to use under conditions.",
    "**Fair use** is narrow, and **credit** fixes plagiarism but doesn't make an illegal use legal — especially on scholarship videos and portfolios.",
  ],
  keyTerms: [
    { term: "Copyright", definition: "The legal right that automatically gives a creator ownership of their original work the moment it's made." },
    { term: "License", definition: "Permission from the owner to use their work, with rules you must follow." },
    { term: "Creative Commons", definition: "A set of free, ready-made licenses creators use to share work under clear conditions like attribution or non-commercial." },
    { term: "Public domain", definition: "Work that's free for anyone to use without permission, usually because copyright expired or was waived." },
    { term: "Fair use", definition: "A limited, case-by-case exception that sometimes allows small uses of copyrighted work for things like commentary, news, or teaching." },
    { term: "Plagiarism", definition: "Passing off someone else's work or ideas as your own — an honesty problem fixed by giving credit." },
    { term: "Attribution", definition: "Crediting a source clearly, usually with the Title, Author, Source, and License (TASL)." },
  ],
  realWorld:
    "Whether you're posting a video, writing a report, designing for a job, or submitting a scholarship clip, the same rules apply: use **licensed** or **public domain** media, respect **copyright**, and write a clear **attribution**. Skipping it gets videos muted, posts removed, and reputations damaged.",
  quiz: [
    {
      id: "q1",
      question: "You're building a slide deck for a college interview portfolio and grab a great photo from Google Images. What's the safest assumption?",
      choices: [
        "It's free to use because it appeared in a search",
        "Someone owns the copyright, so you need a license or permission unless it says otherwise",
        "It's automatically public domain once it's online",
        "You can use it as long as you don't make money",
      ],
      correctIndex: 1,
      explanation:
        "Almost everything online was made by someone who owns the copyright. Showing up in a search doesn't grant permission — you need a license, permission, or a clearly free source.",
    },
    {
      id: "q2",
      question: "A Creative Commons photo for your internship portfolio has an 'Attribution' (BY) license. What must you do?",
      choices: [
        "Pay the creator a fee before using it",
        "Only use it for commercial projects",
        "Credit the creator when you use the work",
        "Keep the work completely unchanged forever",
      ],
      correctIndex: 2,
      explanation:
        "Attribution (BY) means you must credit the creator. Other conditions like NonCommercial or ShareAlike add different rules, but BY specifically requires giving credit.",
    },
    {
      id: "q3",
      question: "A teammate says you can drop a full popular song into your scholarship video essay because \"it's for school / a nonprofit.\" Which statement about fair use is correct?",
      choices: [
        "Fair use means anything used for school or scholarships is automatically allowed",
        "Fair use lets you copy entire songs and movies freely",
        "Fair use is a limited, case-by-case exception for things like commentary, news, or teaching — not a blanket pass for whole songs",
        "Fair use only applies if you give credit",
      ],
      correctIndex: 2,
      explanation:
        "Fair use is narrow and decided case-by-case. It is NOT a blanket 'it's for school/scholarship' pass for entire songs, and credit alone doesn't create fair use.",
    },
    {
      id: "q4",
      question: "You copy a paragraph from a website into your college application essay without saying where it came from. What's the difference between plagiarism and copyright infringement?",
      choices: [
        "They're exactly the same thing",
        "Plagiarism is claiming others' work as your own (honesty); infringement is using it without permission (legal)",
        "Plagiarism is illegal but copyright infringement is just rude",
        "Plagiarism only applies to music, infringement only to writing",
      ],
      correctIndex: 1,
      explanation:
        "Plagiarism is an honesty problem — pretending someone else's work is yours. Copyright infringement is a legal problem — using protected work without permission. You can do one, the other, or both.",
    },
    {
      id: "q5",
      question: "You lightly edit a copyrighted image for a club poster, add a credit line, and post it. Is it now yours to use freely?",
      choices: [
        "Yes — editing it makes it a new original work",
        "Yes — giving credit makes any use legal",
        "No — small changes and credit don't replace needing permission or the right license",
        "Yes — as long as it's for a school project",
      ],
      correctIndex: 2,
      explanation:
        "Changing a work slightly doesn't make it yours, and credit only fixes plagiarism. You still need a license or permission to legally use copyrighted content.",
    },
  ],
  reflection: {
    prompt:
      "Think about the last video, slideshow, scholarship clip, or post you made. Where did the images or music come from — and how could you check or write a proper attribution next time?",
    placeholder: "Example: I grabbed a song from YouTube — next time I'd use a free music library and write a TASL credit line…",
  },
};
