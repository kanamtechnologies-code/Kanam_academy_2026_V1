import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson4: AILessonConfig = {
  id: "dl-4",
  title: "4. Is It True? Spotting Misinformation",
  goal: "Evaluate the credibility of online information, spot misinformation, and fact-check using lateral reading and the SIFT method.",
  xpReward: 200,
  badge: "🕵️ Truth Seeker",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/3",
  nextHref: "/learn/digital/5",
  lessonModule: {
    durationLabel: "~9 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Your feed is a firehose of headlines, clips, and "did you hear?!" posts. Some are true, some are twisted, and some are flat-out made up. Today you'll learn how to tell them apart — a skill the smartest, most careful people in the world actually use.\n\nHere's our roadmap:\n\n• **Misinformation vs. disinformation** — false by accident vs. false on purpose.\n• **Why false stuff spreads so fast** — emotion, algorithms, and the share button.\n• **The SIFT method** — a simple 4-move checklist the pros use.\n• **Lateral reading & reverse image search** — checking a source from the outside.\n\nThis is maybe the most important digital skill of all. Getting fooled can cost you money, embarrass you, or push you to believe things that just aren't real. Learning to verify keeps you sharp and in control.`,
        image: "/images/lessons/dl-4.png",
        imageAlt: "A detective's magnifying glass examining a suspicious headline with multiple browser tabs open to cross-check it",
        callout: {
          label: "Why it matters",
          text: "Anyone can publish anything online and make it look official. The ability to check before you believe — and before you share — protects you and everyone who trusts you.",
        },
      },
      {
        id: "words",
        kicker: "Let's break down the words",
        title: "The key words, in plain English",
        body: `This lesson uses a few words that sound formal but mean simple things. Here they are up front so the rest reads smoothly. Each one comes up again with more detail later.\n\n• To **verify** something means to check whether it's actually true before believing or sharing it.\n• A **source** is whoever created a piece of information — the person, account, website, or organization behind it.\n• **Credible** means trustworthy — worth believing because the source is reliable and has a good track record.\n• A **claim** is a statement that says something is true (for example, "chocolate cures colds"). Claims can be true, false, or somewhere in between — that's why we check them.\n\nKeep these in your back pocket. The whole lesson is really about one habit: pause and **verify** before you trust or share.`,
        callout: {
          label: "Pro tip",
          text: "The single most powerful habit in this whole lesson is tiny: pause for ten seconds before you share anything that surprised or angered you. That short pause is when checking actually happens.",
        },
      },
      {
        id: "mis-vs-dis",
        kicker: "The big idea",
        title: "Misinformation vs. disinformation",
        body: `Both words mean "false information," but the difference is the *intent* (the reason) behind it:\n\n• **Misinformation** is false or misleading information shared **without meaning to cause harm**. Think of a relative resharing a fake health tip because they genuinely believed it. They're wrong, but they weren't trying to trick anyone.\n• **Disinformation** is false information **created and spread on purpose** to deceive, manipulate, or make money. Think of a fake "news" site invented to scam people or push a political agenda.\n\nThe same false post can be *disinformation* when the creator makes it (they know it's fake) and *misinformation* when your friend reshares it (they think it's real). Intent is what separates the two.\n\nLurking behind both is **bias** — a leaning toward one side that can shape what gets shown, left out, or spun. Bias isn't always lying; sometimes it's telling only the part of the story that fits a viewpoint, like a movie trailer showing only the best scenes.`,
        bullets: [
          "**Misinformation** = false, shared *without* intent to harm.",
          "**Disinformation** = false, spread *on purpose* to deceive.",
          "The same post can be disinformation at the source, misinformation when reshared.",
          "**Bias** = a one-sided lean that shapes what's shown or left out.",
        ],
        callout: {
          label: "Watch out",
          text: "You don't have to be a bad person to spread false info. Good, smart people reshare misinformation all the time because it sounded right and they didn't check. That's exactly why a verify habit matters.",
        },
      },
      {
        id: "why-spreads",
        kicker: "The trap",
        title: "Why false content spreads faster than the truth",
        body: `It's not your imagination — false and exaggerated content often spreads *faster* than careful, true reporting. Three forces team up to make that happen:\n\n• **Emotion** — Content that makes you feel something strong (outrage, fear, shock, glee) gets shared more. People who spread lies know this and design posts to push your emotional buttons so you react before you think.\n• **Algorithms** — An **algorithm** is the automatic system a platform uses to decide what to show you next. Since emotional posts get more clicks and comments, the algorithm spreads them wider — true or not — because its goal is to keep you watching.\n• **Sharing** — One tap sends a post to hundreds of people instantly. Most people share based on a headline alone, without ever reading or checking the article.\n\nPut those together and a juicy lie can circle the globe while the boring truth is still putting its shoes on. The defense? Notice when a post makes you feel a sudden strong emotion — that's your cue to slow down and check before you share.`,
        callout: {
          label: "Common misconception",
          text: "\"Lots of shares and likes\" does NOT mean something is true. Popularity measures how emotional or clickable a post is, not how accurate. Viral and verified are completely different things.",
        },
      },
      {
        id: "sift",
        kicker: "Your toolkit",
        title: "The SIFT method: four moves to check anything",
        body: `When you meet a surprising claim, don't argue with it in your head — run **SIFT**, a simple four-move routine used by professional fact-checkers. Each letter is one move:\n\n• **S — Stop.** Before reacting or sharing, pause. Notice your emotional reaction and ask: do I even know if this source is trustworthy? Don't go further until you've checked.\n• **I — Investigate the source.** Who made this? A real news organization, an expert, a random anonymous account, or a site you've never heard of? Find out who's behind it and whether they're credible.\n• **F — Find better (or other) coverage.** Don't rely on the one post. Search for the claim and see what *other* reliable sources say. If several trustworthy outlets agree, that's a good sign; if no one else reports it, be suspicious.\n• **T — Trace claims to the original.** Headlines and reshares twist things. Follow quotes, stats, and images back to where they *first* came from to see the real, full context.\n\nSIFT works on articles, videos, screenshots, viral posts — anything. Four quick moves, and you've gone from "I think this is true" to "I actually checked."`,
        image: "/images/lessons/dl-4-2.png",
        imageAlt: "The four SIFT steps as a vertical checklist: a stop hand, a magnifying glass over a source, multiple open tabs comparing coverage, and an arrow tracing a claim back to its origin",
        callout: {
          label: "Pro tip",
          text: "You don't always need all four moves. Often just the first two — Stop and Investigate the source — are enough to tell that a sketchy post isn't worth believing or sharing.",
        },
      },
      {
        id: "lateral",
        kicker: "The pro move",
        title: "Lateral reading & reverse image search",
        body: `Here's the trick professional fact-checkers use that most people don't: **lateral reading**.\n\nWhen you land on an unfamiliar website, the instinct is to read *down* the page, judging it by how slick and professional it looks. That's **vertical reading** (staying on the one page), and it's easily fooled — anyone can build a fancy-looking site.\n\n**Lateral reading** means leaving the page and **opening new tabs** to see what the *rest of the internet* says about that source. Instead of trusting the page to describe itself, you check it against outside sources. It's like meeting a stranger who says they're a doctor — rather than just believing them, you ask other people and look them up.\n\nFor images, use **reverse image search**: a tool where you upload a picture (or paste its link) and the search engine finds everywhere else that image has appeared. This instantly reveals old photos recycled as "breaking news," or pictures taken totally out of context.\n\nAnd stay alert for **clickbait** — sensational headlines ("You won't BELIEVE what happened next!") designed to make you click and feel, not to inform. Also know that **deepfakes** — AI-generated fake photos, audio, and video — are getting realistic, so even a convincing clip is no longer proof on its own.`,
        bullets: [
          "**Lateral reading**: leave the page, open tabs, check what others say about the source.",
          "**Reverse image search**: find where a photo really came from.",
          "**Clickbait**: sensational headlines built for clicks, not truth.",
          "**Deepfakes**: AI fakes mean even realistic video needs verifying.",
        ],
        callout: {
          label: "Myth check",
          text: "A professional-looking website does NOT mean it's trustworthy. Slick design is cheap and easy to fake. What matters is who runs it and what reliable outside sources say about them — which you only learn by reading laterally.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "A shocking headline appears — apply SIFT",
        body: `You're scrolling and see a dramatic post: *"BREAKING: Scientists confirm chocolate cures the common cold!"* with a photo of a lab and thousands of shares. Let's run SIFT.\n\n**Step 1 — Stop.** Notice the rush of excitement ("yes, finally!"). That strong feeling is the warning sign. Pause before sharing.\n\n**Step 2 — Investigate the source.** Tap who posted it. It's "HealthBuzzDailyNow," a site you've never heard of, full of ads and clickbait. Not a credible medical source.\n\n**Step 3 — Find other coverage.** Open new tabs (lateral reading) and search "chocolate cures cold." No real news outlet or health organization reports it — only copycat clickbait sites. Big red flag: a real cure would be everywhere.\n\n**Step 4 — Trace to the original.** The post links to a "study," but following it leads to a tiny blog with no actual research. The lab photo, run through reverse image search, turns out to be a stock photo from years ago. Verdict: **false** — don't share it. In under two minutes, you avoided spreading misinformation.`,
        image: "/images/lessons/dl-4-3.png",
        imageAlt: "A flashy fake breaking-news headline being checked across several browser tabs and a reverse image search that exposes a recycled stock photo, stamped false",
        callout: {
          label: "Pro tip",
          text: "Extraordinary claims need extraordinary evidence. If something would be huge news but only one unknown site is reporting it, that's almost always a sign it's false.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You're now equipped to be the person in the group chat who actually checks things. Quick recap:\n\n• **Misinformation** is false by accident; **disinformation** is false on purpose; **bias** leans the story one way.\n• False content spreads fast because of **emotion**, **algorithms**, and easy **sharing** — strong feelings are your cue to slow down.\n• Run **SIFT**: **S**top, **I**nvestigate the source, **F**ind other coverage, **T**race claims to the original.\n• Use **lateral reading** and **reverse image search**, and stay wary of **clickbait** and **deepfakes**.\n\nWhen you're ready, switch to the **Knowledge check**, then reflect on a time you almost shared something false.`,
      },
    ],
  },
  bigIdeas: [
    "**Misinformation** is false by accident; **disinformation** is false on purpose.",
    "False content spreads fast through **emotion**, **algorithms**, and easy **sharing** — and viral is not the same as true.",
    "Use **SIFT** and **lateral reading** to check a source from the outside before you believe or share.",
  ],
  keyTerms: [
    { term: "Misinformation", definition: "False or misleading information shared without the intent to cause harm." },
    { term: "Disinformation", definition: "False information created and spread on purpose to deceive, manipulate, or profit." },
    { term: "Bias", definition: "A one-sided lean that shapes what information is shown, left out, or spun a certain way." },
    { term: "Source", definition: "Who created or is responsible for a piece of information — the key thing to investigate." },
    { term: "Lateral reading", definition: "Leaving a page and opening new tabs to check what other reliable sources say about it." },
    { term: "SIFT", definition: "A fact-checking routine: Stop; Investigate the source; Find better coverage; Trace claims to the original." },
    { term: "Clickbait", definition: "Sensational headlines designed to make you click and react, not to inform you accurately." },
    { term: "Fact-check", definition: "The process of verifying whether a claim is actually true using reliable evidence." },
  ],
  realWorld:
    "Before resharing a viral health 'tip,' a shocking news clip, or a too-good-to-be-true deal, fact-checkers run **SIFT** and read **laterally** — the same moves that keep you from being scammed or embarrassed online.",
  quiz: [
    {
      id: "q1",
      question: "What is the difference between misinformation and disinformation?",
      choices: [
        "Misinformation is on TV; disinformation is online",
        "Misinformation is false but shared without intent to harm; disinformation is false and spread on purpose to deceive",
        "Misinformation is always true; disinformation is always false",
        "There is no difference",
      ],
      correctIndex: 1,
      explanation:
        "Both are false, but intent separates them. Misinformation is shared by someone who thinks it's true; disinformation is deliberately created to deceive or manipulate.",
    },
    {
      id: "q2",
      question: "Why does false or exaggerated content often spread faster than the truth?",
      choices: [
        "Because true stories are illegal to share",
        "Because it triggers strong emotions, which boosts sharing and gets amplified by algorithms",
        "Because the internet deletes true stories",
        "Because false stories load faster",
      ],
      correctIndex: 1,
      explanation:
        "Emotional content gets shared more, algorithms amplify whatever keeps people engaged, and one-tap sharing spreads it instantly — often before anyone checks if it's true.",
    },
    {
      id: "q3",
      question: "What does the 'I' in the SIFT method stand for?",
      choices: [
        "Ignore the post",
        "Investigate the source — find out who made it and whether they're credible",
        "Instantly share it",
        "Imagine if it's true",
      ],
      correctIndex: 1,
      explanation:
        "SIFT stands for Stop, Investigate the source, Find better coverage, and Trace claims to the original. Investigating the source means checking who is behind the information.",
    },
    {
      id: "q4",
      question: "What is 'lateral reading'?",
      choices: [
        "Reading a webpage from top to bottom to judge how professional it looks",
        "Leaving the page and opening new tabs to see what other reliable sources say about the source",
        "Reading the page sideways",
        "Only reading the headline",
      ],
      correctIndex: 1,
      explanation:
        "Lateral reading means checking a source from the outside by opening new tabs, instead of trusting the page to describe itself. A slick design alone proves nothing.",
    },
    {
      id: "q5",
      question: "A post with 50,000 shares claims a celebrity died, but no major news outlet is reporting it. What's the smartest conclusion?",
      choices: [
        "It must be true because so many people shared it",
        "High share counts measure how clickable something is, not whether it's true — be suspicious since no reliable source confirms it",
        "Share it quickly before it gets deleted",
        "The number of shares proves it was fact-checked",
      ],
      correctIndex: 1,
      explanation:
        "Popularity doesn't equal accuracy. If something this big were real, reliable outlets would report it. When only viral posts carry a huge claim, treat it as likely false until verified.",
    },
  ],
  reflection: {
    prompt:
      "Think of a time you saw something online that turned out to be false (or that you almost shared). Which SIFT move would have helped you catch it fastest, and why?",
    placeholder: "Example: A friend reshared a fake giveaway — 'Investigate the source' would have shown the account was fake…",
  },
};
