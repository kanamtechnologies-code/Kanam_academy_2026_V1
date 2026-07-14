import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson4: AILessonConfig = {
  id: "dl-4",
  title: "4. Is It True? Spotting Misinformation",
  goal: "Evaluate the credibility of online information, spot misinformation, and fact-check using lateral reading and the SIFT method.",
  xpReward: 200,
  badge: "Truth Seeker",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/3",
  nextHref: "/learn/digital/5",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Your feed is a firehose of headlines, clips, and "did you hear?!" posts. Some are true, some are twisted, and some are flat-out made up. Today you'll learn how to tell them apart — a skill the smartest, most careful people in the world actually use.\n\nHere's our roadmap:\n\n• **Misinformation vs. disinformation** — false by accident vs. false on purpose.\n• **Why false stuff spreads so fast** — emotion, algorithms, and the share button.\n• **The SIFT method** — a simple 4-move checklist the pros use.\n• **Lateral reading & reverse image search** — checking a source from the outside.\n• **High-stakes checks** — scholarships, college rumors, and "too good to be true" offers.\n\nThis is maybe the most important digital skill of all. Getting fooled can cost you money, embarrass you, or push you to believe things that just aren't real. Learning to verify keeps you sharp and in control.`,
        image: "/images/lessons/dl-4.png",
        imageAlt: "Laptop with multiple browser tabs open to fact-check a headline; phone showing a suspicious social post beside it",
        callout: {
          label: "Why it matters",
          text: "Anyone can publish anything online and make it look official. The ability to check before you believe — and before you share — protects you and everyone who trusts you.",
        },
      },
      {
        id: "hook-story",
        kicker: "Real moment",
        title: "The giveaway that almost fooled everyone",
        body: `A post explodes across your school's group chats: "🎉 [Popular Brand] is giving away 50 free headphones to celebrate their anniversary! Just click the link and enter your info before midnight!" It has a real-looking logo, thousands of likes, and three of your friends already commented "I WANT THIS 😍."\n\nYour friend Priya is about to enter her email and phone number when something nags at her: the account posting it has a slightly different spelling than the real brand, and it was created two weeks ago. She pauses instead of clicking.\n\nThat pause — noticing something felt off before acting — is the entire skill this lesson is built around. It's not about being suspicious of everything forever. It's about knowing exactly what to check, and when.`,
        callout: {
          label: "Keep this in mind",
          text: "The posts designed to fool you are built to feel urgent and exciting. That rush of feeling is your cue to slow down, not speed up.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "The key words, in plain English",
        body: `This lesson uses a few words that sound formal but mean simple things. Here they are up front so the rest reads smoothly. Each one comes up again with more detail later.\n\n• To **verify** something means to check whether it's actually true before believing or sharing it.\n• A **source** is whoever created a piece of information — the person, account, website, or organization behind it.\n• **Credible** means trustworthy — worth believing because the source is reliable and has a good track record.\n• A **claim** is a statement that says something is true (for example, "chocolate cures colds"). Claims can be true, false, or somewhere in between — that's why we check them.\n\nKeep these in your back pocket. The whole lesson is really about one habit: pause and **verify** before you trust or share.`,
        callout: {
          label: "Pro tip",
          text: "The single most powerful habit in this whole lesson is tiny: pause for ten seconds before you share anything that surprised or angered you. That short pause is when checking actually happens.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "Misinformation vs. disinformation",
        body: `Both words mean "false information," but the difference is the *intent* (the reason) behind it:\n\n• **Misinformation** is false or misleading information shared **without meaning to cause harm**. Think of a relative resharing a fake health tip because they genuinely believed it. They're wrong, but they weren't trying to trick anyone.\n• **Disinformation** is false information **created and spread on purpose** to deceive, manipulate, or make money. Think of a fake "giveaway" account invented to steal personal information.\n\nThe same false post can be *disinformation* when the creator makes it (they know it's fake) and *misinformation* when your friend reshares it (they think it's real). Intent is what separates the two.\n\nLurking behind both is **bias** — a leaning toward one side that can shape what gets shown, left out, or spun. Bias isn't always lying; sometimes it's telling only the part of the story that fits a viewpoint.`,
        bullets: [
          "**Misinformation** = false, shared *without* intent to harm.",
          "**Disinformation** = false, spread *on purpose* to deceive.",
          "The same post can be disinformation at the source, misinformation when reshared.",
          "**Bias** = a one-sided lean that shapes what's shown or left out.",
        ],
        callout: {
          label: "Watch out",
          text: "You don't have to be a bad person to spread false info. Good, smart people reshare misinformation all the time because it sounded right and they didn't check.",
        },
        checkIn: {
          prompt: "A classmate reshared a fake giveaway because they thought it was real. The original creator knew it was fake. What's the difference?",
          choices: [
            "The classmate spread misinformation (no intent to harm); the creator spread disinformation (on purpose to deceive)",
            "Misinformation is on TV; disinformation is online",
            "Misinformation is always true; disinformation is always false",
            "There is no difference",
          ],
          correctIndex: 0,
          explanation:
            "Both are false, but intent separates them. Misinformation is shared by someone who thinks it's true; disinformation is deliberately created to deceive or manipulate.",
        },
      },
      {
        id: "concept-2",
        kicker: "The trap",
        title: "Why false content spreads faster than the truth",
        body: `It's not your imagination — false and exaggerated content often spreads *faster* than careful, true reporting. Three forces team up to make that happen:\n\n• **Emotion** — Content that makes you feel something strong (outrage, fear, shock, glee) gets shared more. People who spread lies design posts to push your emotional buttons so you react before you think.\n• **Algorithms** — An **algorithm** is the automatic system a platform uses to decide what to show you next. Since emotional posts get more clicks and comments, the algorithm spreads them wider — true or not — because its goal is to keep you watching.\n• **Sharing** — One tap sends a post to hundreds of people instantly. Most people share based on a headline alone, without ever reading or checking the article.\n\nPut those together and a juicy lie can circle the globe while the boring truth is still putting its shoes on. The defense? Notice when a post makes you feel a sudden strong emotion — that's your cue to slow down.`,
        callout: {
          label: "Common misconception",
          text: "\"Lots of shares and likes\" does NOT mean something is true. Popularity measures how emotional or clickable a post is, not how accurate. Viral and verified are completely different things.",
        },
        checkIn: {
          prompt: "A viral post about 'guaranteed free headphones' spreads through your group chat in minutes. Why does false content often spread faster than the truth?",
          choices: [
            "Because false stories load faster",
            "Because the internet deletes true stories",
            "Because it triggers strong emotions, which boosts sharing and gets amplified by algorithms",
            "Because true stories are illegal to share",
          ],
          correctIndex: 2,
          explanation:
            "Emotional content gets shared more, algorithms amplify whatever keeps people engaged, and one-tap sharing spreads it instantly — often before anyone checks if it's true.",
        },
      },
      {
        id: "concept-3",
        kicker: "Your toolkit",
        title: "The SIFT method: four moves to check anything",
        body: `When you meet a surprising claim, don't argue with it in your head — run **SIFT**, a simple four-move routine used by professional fact-checkers. Each letter is one move:\n\n• **S — Stop.** Before reacting or sharing, pause. Notice your emotional reaction and ask: do I even know if this source is trustworthy?\n• **I — Investigate the source.** Who made this? A real organization, an expert, or a random account you've never heard of?\n• **F — Find better (or other) coverage.** Search for the claim and see what *other* reliable sources say. If several agree, that's a good sign; if no one else reports it, be suspicious.\n• **T — Trace claims to the original.** Headlines and reshares twist things. Follow quotes, stats, and images back to where they *first* came from.\n\nSIFT works on articles, videos, screenshots, viral posts — anything.`,
        image: "/images/lessons/dl-4-2.png",
        imageAlt: "Desktop browser with four open tabs used to stop, investigate a source, compare coverage, and trace a claim to its origin",
        callout: {
          label: "Pro tip",
          text: "You don't always need all four moves. Often just the first two — Stop and Investigate the source — are enough to tell that a sketchy post isn't worth believing or sharing.",
        },
        checkIn: {
          prompt: "You're checking a shocking scholarship claim. What does the 'I' in the SIFT method stand for?",
          choices: [
            "Imagine if it's true",
            "Investigate the source — find out who made it and whether they're credible",
            "Ignore the post",
            "Instantly share it",
          ],
          correctIndex: 1,
          explanation:
            "SIFT stands for Stop, Investigate the source, Find better coverage, and Trace claims to the original. Investigating the source means checking who is behind the information.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "A shocking headline appears — apply SIFT",
        body: `You're scrolling and see a dramatic post: *"BREAKING: Scientists confirm chocolate cures the common cold!"* with a photo of a lab and thousands of shares. Let's run SIFT.\n\n**Step 1 — Stop.** Notice the rush of excitement. Pause before sharing.\n\n**Step 2 — Investigate the source.** It's "HealthBuzzDailyNow," a site you've never heard of, full of ads and clickbait. Not a credible medical source.\n\n**Step 3 — Find other coverage.** Open new tabs and search "chocolate cures cold." No real news outlet or health organization reports it — only copycat clickbait sites.\n\n**Step 4 — Trace to the original.** The linked "study" leads to a tiny blog with no actual research. The lab photo, run through reverse image search, turns out to be a stock photo from years ago. Verdict: **false** — don't share it.`,
        image: "/images/lessons/dl-4-3.png",
        imageAlt: "Phone showing a flashy fake headline next to a laptop with reverse image search results exposing a recycled stock photo",
        callout: {
          label: "Pro tip",
          text: "Extraordinary claims need extraordinary evidence. If something would be huge news but only one unknown site is reporting it, that's almost always a sign it's false.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "A slick website does not mean a trustworthy website",
        body: `Here's a myth that fools even careful people: **a professional-looking page must be legitimate.** It's not true. Building a fancy-looking website with a logo, clean fonts, and a confident headline is cheap and easy — anyone can do it in an afternoon with free tools.\n\nThe instinct to read *down* the page and judge it by how polished it looks is called **vertical reading** — and it's exactly what scammers and disinformation creators count on. Design tells you almost nothing about whether the information is true.\n\nWhat actually matters is **who runs the site** and **what reliable outside sources say about them** — which you can only learn by checking from the *outside*, not by staring harder at the page itself.`,
        callout: {
          label: "Myth check",
          text: "A professional-looking website does NOT mean it's trustworthy. Slick design is cheap and easy to fake. What matters is who runs it and what reliable outside sources say about them.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Stop and Investigate: practice the first two SIFT moves",
        body: `A post claims: *"Local college is secretly rejecting every applicant this year — inside source confirms!"* It has a screenshot of a supposed "leaked email" and 12,000 shares.\n\nRun just the first two SIFT moves:\n\n• **Stop:** Notice the emotional pull — panic, urgency, "share this now." That's a signal to slow down, not speed up.\n• **Investigate the source:** Who posted it? If it's an anonymous meme account with no connection to the actual college, that's a major red flag. A real policy change would come from the college's own official site or verified news outlets — not a screenshot with no clear origin.\n\nAlready, before doing anything else, you have strong reason to distrust this post — without needing to fully disprove it yet.`,
        checkIn: {
          prompt: "A panic-inducing post about a college has no named source, just an anonymous account and a screenshot. What should you do first?",
          choices: [
            "Assume it's true since it has many shares",
            "Share it immediately so others can be warned",
            "Comment your opinion without checking anything",
            "Stop and investigate the source before believing or sharing it",
          ],
          correctIndex: 3,
          explanation:
            "The first two SIFT moves — Stop and Investigate the source — are often enough to catch an unreliable claim before it spreads further.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Deeper skill",
        title: "Lateral reading & reverse image search",
        body: `Here's the trick professional fact-checkers use that most people don't: **lateral reading**. Instead of trusting a page to describe itself, you leave it and **open new tabs** to see what the *rest of the internet* says about that source. It's like meeting a stranger who says they're a doctor — rather than just believing them, you ask other people and look them up.\n\nFor images, use **reverse image search**: a tool where you upload a picture (or paste its link) and the search engine finds everywhere else that image has appeared. This instantly reveals old photos recycled as "breaking news," or pictures taken totally out of context.\n\nStay alert for **clickbait** — sensational headlines designed to make you click and feel, not to inform. And know that **deepfakes** — AI-generated fake photos, audio, and video — are getting realistic, so even a convincing clip is no longer proof on its own.`,
        image: "/images/lessons/dl-4-4.png",
        imageAlt: "Split screen showing a reverse image search tool finding the same photo reused across multiple unrelated old articles",
        bullets: [
          "**Lateral reading**: leave the page, open tabs, check what others say about the source.",
          "**Reverse image search**: find where a photo really came from.",
          "**Deepfakes**: AI fakes mean even realistic video needs verifying.",
        ],
        callout: {
          label: "Pro tip",
          text: "If a claim would be huge news, search for it by itself (without the source's name) and see if any major outlet independently reports the same thing.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Vertical reading vs. lateral reading",
        body: `The single habit shift that separates careful fact-checkers from everyone else.`,
        table: {
          columns: ["", "Vertical reading", "Lateral reading"],
          values: [
            ["What you do", "Stay on the page, judge it by how it looks", "Leave the page, open new tabs to check it from outside"],
            ["What it catches", "Almost nothing — design is easy to fake", "Fake accounts, unreliable sites, recycled images"],
            ["Used by", "Most casual scrollers", "Professional fact-checkers"],
          ],
          rowCount: 3,
        },
        callout: {
          label: "Why it matters",
          text: "Switching from vertical to lateral reading is often just one extra tab — a tiny habit change with a huge payoff in accuracy.",
        },
      },
      {
        id: "real-world-trap",
        kicker: "Real-world trap",
        title: "Scholarships, college rumors, and 'guaranteed' offers",
        body: `Some false claims are annoying. Others can cost you money, a deadline, or a real opportunity. Treat these as **high-stakes** — always SIFT before you act:\n\n• **"Guaranteed scholarship / free laptop if you pay a fee"** — Real aid almost never asks you to pay upfront to "unlock" money.\n• **"College just canceled applications / everyone got rejected"** — Viral panic posts love this. Find other coverage from the college's official site or reputable news before you spiral.\n• **"This internship pays $5,000/week — just send your SSN"** — Legitimate employers don't hire through random DMs asking for sensitive info.\n• **Screenshots of "official" emails** — Easy to fake. Go to the real portal or known address yourself.\n\n**Decision framework:** If a claim involves **money, personal info, deadlines, or your future**, require stronger evidence: official sites, multiple reliable sources, and a calm pause.`,
        bullets: [
          "Money + urgency + 'act now' = slow down and verify.",
          "Prefer official .edu / .gov / known org pages over viral posts.",
          "Never send SSN, bank info, or passwords from a random link or DM.",
        ],
        callout: {
          label: "Watch out",
          text: "Emotion + urgency is the scam's favorite combo. The more a post pushes you to act RIGHT NOW, the more it deserves a pause.",
        },
      },
      {
        id: "habits",
        kicker: "Try this week",
        title: "Build the ten-second pause into a real habit",
        body: `The next time a post makes you feel shocked, angry, or greedy for a "deal," run **Stop + Investigate the source** before you share or click. Two moves. Ten seconds. Huge protection.\n\nA simple way to build this as a habit: whenever you feel your thumb moving fast toward the share button, treat that speed itself as a warning sign. Real, well-sourced information rarely needs to be shared in the next three seconds — it will still be true in an hour, after you've checked it.`,
        checkIn: {
          prompt: "What's the best signal that you should slow down and run SIFT before sharing something?",
          choices: [
            "The post has a colorful thumbnail",
            "The post is longer than three sentences",
            "The post was made more than a year ago",
            "You feel a strong, sudden emotional reaction and an urge to share immediately",
          ],
          correctIndex: 3,
          explanation:
            "A sudden strong emotional pull and an urge to act immediately is exactly the pattern disinformation is designed to trigger — which makes it the best cue to pause and check.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on — a quick gut-check",
        body: `Think about the last post that made you feel a strong emotion — anger, shock, excitement, fear.\n\n• Did you check who posted it before reacting?\n• Would running SIFT have changed how you felt about it, or whether you shared it?\n\nThere's a full reflection question waiting at the end of this lesson. For now, just notice: the goal isn't to distrust everything — it's to reserve your trust for claims that actually earn it.`,
        callout: {
          label: "Reflect",
          text: "Priya's pause before the giveaway link wasn't luck — it was a habit. The more you practice SIFT, the more automatic that pause becomes.",
        },
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "Case study: a college-rejection rumor spreads through a class",
        body: `A rumor rips through a senior class group chat: "BREAKING: State University is rejecting ALL out-of-state applicants this year — my cousin's friend works there!!" Panic spreads instantly. Several students consider withdrawing applications on the spot.\n\nOne student, Marcus, runs SIFT before reacting:\n\n**Stop:** He notices the panic spiking and pauses instead of reposting.\n\n**Investigate the source:** The claim traces back to an anonymous forum post, not any named or verifiable person — "my cousin's friend" isn't a checkable source.\n\n**Find other coverage:** Marcus searches the university's actual admissions site and recent news. Nothing supports the claim — official sources describe normal admissions timelines.\n\n**Trace to the original:** The rumor seems to have started from someone misreading an old, unrelated financial aid policy change from three years ago.\n\nMarcus posts a calm correction with a link to the university's real admissions page. The panic dies down within the hour — because one person ran four simple checks instead of forwarding a scary screenshot.`,
        callout: {
          label: "Pro tip",
          text: "Correcting misinformation calmly, with a source attached, is one of the most valuable things an upstander can do online — you'll build on this idea more in a later lesson.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before the full knowledge check",
        body: `Quick self-test before the graded questions — can you explain, in one sentence each?\n\n• The difference between misinformation and disinformation?\n• Why false content spreads faster than true content?\n• All four letters of SIFT?\n• Why a slick-looking website isn't automatically trustworthy?\n\nIf all four feel solid, you're ready for the graded Knowledge Check.`,
        checkIn: {
          prompt: "What's the core skill that ties SIFT and lateral reading together?",
          choices: [
            "Checking a source from the OUTSIDE — other coverage, the original, and who's really behind it — before trusting or sharing",
            "Ignoring anything that seems surprising",
            "Sharing quickly so others can decide for themselves",
            "Judging a source only by how professional the page looks",
          ],
          correctIndex: 0,
          explanation:
            "Both SIFT and lateral reading are built around verifying a source from the outside — checking other coverage, tracing the original, and investigating who's behind it — rather than trusting the page's own claims about itself.",
        },
      },
      {
        id: "sift-practice",
        kicker: "Try it yourself",
        title: "SIFT in 90 seconds: a second mini scenario",
        body: `A classmate DMs you a screenshot: "BREAKING — our school is canceling finals because of a water-main break." The post has no link, no date, and the account name looks like a random fan page, not the school.\n\nRun SIFT out loud:\n\n• **Stop** — finals news is high-stakes; don't forward yet.\n• **Investigate the source** — is this the official school account or a random page?\n• **Find other coverage** — check the school website, your email, or the district page. Do *they* say the same thing?\n• **Trace to the original** — if there's no original announcement, treat the screenshot as unverified rumor.\n\n**Before:** panic-forwarding to three group chats in ten seconds.\n**After:** two minutes of checking, then sharing only what the official site actually says — or saying "I can't confirm this yet."`,
        callout: {
          label: "Try this week",
          text: "The next time a shocking school or local headline hits your feed, run SIFT before you share — even if everyone else is already forwarding it.",
        },
        checkIn: {
          prompt: "The screenshot has no link and the account isn't official, but three friends already shared it. What's the strongest SIFT move?",
          choices: [
            "Share it too so you aren't left out",
            "Assume screenshots are always official",
            "Stop, check the school's official channels, and only repeat what they actually confirm",
            "Comment 'fake' without checking anything",
          ],
          correctIndex: 2,
          explanation:
            "SIFT's whole point is to verify before you spread. Official channels — the school site, email, or district page — are where high-stakes news should be confirmed.",
        },
      },
      {
        id: "misinfo-red-flags",
        kicker: "Red flags",
        title: "Headlines and posts that should slow you down",
        body: `Some patterns show up again and again in false or twisted content. When you see these, treat them as a yellow light — not proof something is fake, but proof to **check before you share**:\n\n• **ALL CAPS + extreme urgency** — "SHARE BEFORE THEY DELETE THIS!!!"\n• **No original source** — a screenshot, meme, or clip with no link to where it came from.\n• **Too perfect for your side** — if a story makes your team look 100% right and the other side look cartoonishly evil, bias may be doing the steering.\n• **Asks for money or passwords** — real news doesn't need your login to "unlock the full story."\n• **Emotion-first, facts-second** — designed to make you angry or scared before you think.\n\nRed flags don't mean "ignore forever." They mean **SIFT first, share second** — especially before college rumors, scholarship "opportunities," or anything involving personal info.`,
        callout: {
          label: "Watch out",
          text: "The most shareable posts are often the least verified. If something makes you want to hit Share instantly, that's your cue to pause — not to speed up.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You're now equipped to be the person in the group chat who actually checks things. Quick recap:\n\n• **Misinformation** is false by accident; **disinformation** is false on purpose; **bias** leans the story one way.\n• False content spreads fast because of **emotion**, **algorithms**, and easy **sharing** — strong feelings are your cue to slow down.\n• Run **SIFT**: **S**top, **I**nvestigate the source, **F**ind other coverage, **T**race claims to the original.\n• Use **lateral reading** and **reverse image search**, and stay wary of **clickbait** and **deepfakes**.\n• For money, deadlines, and personal info, raise the bar — verify on official channels.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then reflect on a time you almost shared something false.`,
      },
    ],
  },
  bigIdeas: [
    "**Misinformation** is false by accident; **disinformation** is false on purpose.",
    "False content spreads fast through **emotion**, **algorithms**, and easy **sharing** — and viral is not the same as true.",
    "Use **SIFT** and **lateral reading** to check a source from the outside before you believe or share.",
    "A professional-looking page is NOT proof of trustworthiness — check who runs it from the outside.",
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
    "Before resharing a viral health 'tip,' a shocking college rumor, or a too-good-to-be-true scholarship, fact-checkers run **SIFT** and read **laterally** — the same moves that keep you from being scammed or embarrassed online.",
  quiz: [
    {
      id: "q1",
      question: "A classmate reshared a fake health tip because they thought it was real. The original creator knew it was fake. What's the difference?",
      choices: [
        "Misinformation is on TV; disinformation is online",
        "The classmate spread misinformation (no intent to harm); the creator spread disinformation (on purpose to deceive)",
        "There is no difference",
        "Misinformation is always true; disinformation is always false",
      ],
      correctIndex: 1,
      explanation:
        "Both are false, but intent separates them. Misinformation is shared by someone who thinks it's true; disinformation is deliberately created to deceive or manipulate.",
    },
    {
      id: "q2",
      question: "A viral post about 'guaranteed free college' spreads through your group chat in minutes. Why does false or exaggerated content often spread faster than the truth?",
      choices: [
        "Because the internet deletes true stories",
        "Because true stories are illegal to share",
        "Because it triggers strong emotions, which boosts sharing and gets amplified by algorithms",
        "Because false stories load faster",
      ],
      correctIndex: 2,
      explanation:
        "Emotional content gets shared more, algorithms amplify whatever keeps people engaged, and one-tap sharing spreads it instantly — often before anyone checks if it's true.",
    },
    {
      id: "q3",
      question: "You're checking a shocking scholarship claim. What does the 'I' in the SIFT method stand for?",
      choices: [
        "Investigate the source — find out who made it and whether they're credible",
        "Instantly share it",
        "Imagine if it's true",
        "Ignore the post",
      ],
      correctIndex: 0,
      explanation:
        "SIFT stands for Stop, Investigate the source, Find better coverage, and Trace claims to the original. Investigating the source means checking who is behind the information.",
    },
    {
      id: "q4",
      question: "You land on a slick website claiming an internship pays thousands a week. What is 'lateral reading'?",
      choices: [
        "Reading the page sideways",
        "Only reading the headline",
        "Reading a webpage from top to bottom to judge how professional it looks",
        "Leaving the page and opening new tabs to see what other reliable sources say about the source",
      ],
      correctIndex: 3,
      explanation:
        "Lateral reading means checking a source from the outside by opening new tabs, instead of trusting the page to describe itself. A slick design alone proves nothing.",
    },
    {
      id: "q5",
      question: "A post with 50,000 shares claims a celebrity died, but no major news outlet is reporting it. What's the smartest conclusion?",
      choices: [
        "It must be true because so many people shared it",
        "High share counts measure how clickable something is, not whether it's true — be suspicious since no reliable source confirms it",
        "The number of shares proves it was fact-checked",
        "Share it quickly before it gets deleted",
      ],
      correctIndex: 1,
      explanation:
        "Popularity doesn't equal accuracy. If something this big were real, reliable outlets would report it. When only viral posts carry a huge claim, treat it as likely false until verified.",
    },
    {
      id: "q6",
      question: "A giveaway post has a professional logo and thousands of likes, but the account was created two weeks ago with a slightly misspelled brand name. What should you do?",
      choices: [
        "Trust it because of the high like count",
        "Assume all giveaways are automatically legitimate",
        "Treat the mismatched account details as a red flag and investigate the source before clicking",
        "Enter your info immediately since it looks official",
      ],
      correctIndex: 2,
      explanation:
        "A slick logo and many likes don't prove legitimacy. A brand-new account with a misspelled name is a classic sign of an impersonation scam — investigate before clicking or entering information.",
    },
    {
      id: "q7",
      question: "In the college-rejection rumor case study, what specifically stopped the panic from spreading further?",
      choices: [
        "Everyone agreed to stop talking about it",
        "One student ran SIFT, found no supporting coverage, traced the rumor's likely origin, and posted a sourced correction",
        "The school shut down the group chat",
        "The rumor was reposted by more students until it became true",
      ],
      correctIndex: 1,
      explanation:
        "Marcus stopped, investigated the anonymous source, found no other coverage, traced the likely origin, and shared a calm, sourced correction — the SIFT method in action.",
    },
    {
      id: "q8",
      question: "Which best describes the relationship between vertical reading and lateral reading?",
      choices: [
        "Vertical reading is only used by professional fact-checkers",
        "They are the same thing with different names",
        "Vertical reading judges a page by how it looks; lateral reading checks the source from outside sources, which catches far more fakes",
        "Lateral reading means reading the page more slowly",
      ],
      correctIndex: 2,
      explanation:
        "Vertical reading stays on the page and judges it by appearance, which is easy to fake. Lateral reading opens outside tabs to verify the source, catching problems vertical reading misses.",
    },
  ],
  reflection: {
    prompt:
      "Think of a time you saw something online that turned out to be false (or that you almost shared). Which SIFT move would have helped you catch it fastest, and why?",
    placeholder: "Example: A friend reshared a fake giveaway — 'Investigate the source' would have shown the account was fake…",
  },
};
