import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson2: AILessonConfig = {
  id: "ai-2",
  title: "2. AI Is All Around You",
  goal: "Spot the AI hidden in everyday apps and devices, understand the trade you make — convenience in exchange for your data — and meet the hidden human labor behind it.",
  xpReward: 100,
  badge: "AI Spotter",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/1",
  nextHref: "/learn/ai/3",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Quick question: how many times have you used AI today? If you said "zero," you're probably off by a few dozen. AI isn't just chatbots — it's woven invisibly into apps you've already opened this morning.\n\nToday you'll learn to:\n\n• **Spot the hidden AI** in everyday apps and devices.\n• See the one thing almost all of them are secretly doing: making a **prediction**.\n• Understand the quiet trade behind "free" apps — convenience in exchange for your **data**.\n• Meet the **hidden human labor** — real people — that makes all of this possible.\n\nThis matters because the AI shaping your day — your video feed, your maps, your messages — works best when *you* understand the deal. You can't think critically about something you don't even notice is there.`,
        image: "/images/lessons/ai-2-around-you.png",
        imageAlt: "A teen's phone surrounded by everyday apps powered by AI",
        callout: {
          label: "Why it matters",
          text: "The apps you use most are also the ones quietly learning the most about you. Spotting the AI inside them is the first step to staying in control of your attention and your data.",
        },
      },
      {
        id: "hook-story",
        kicker: "True story",
        title: "Two phones, two totally different feeds",
        body: `Two best friends, same school, same video app, sitting right next to each other. One opens the app and sees skateboarding fails for twenty minutes straight. The other opens it and sees baking videos and dog rescues. Same app. Same day. Completely different worlds.\n\nNeither feed is random, and neither friend is imagining it. Behind the scenes, a narrow AI studied each person's clicks, watch time, and skips — separately — and built two different predictions of "what will keep this exact person watching."\n\nThat's the whole secret of this lesson in one story: the "free" app isn't showing you the internet. It's showing you a version of the internet built specifically to match patterns in *your* data.`,
      },
      {
        id: "glossary",
        kicker: "Words you'll need",
        title: "Your vocabulary for this lesson",
        body: `A few terms will come up constantly today — lock them in before we go further.`,
        bullets: [
          "**Recommendation system** — AI that predicts what you'll like next based on past behavior.",
          "**Prediction** — an AI's best guess about an outcome, based on patterns in data.",
          "**Personal data** — information about you (clicks, location, messages) that apps collect.",
          "**Attention economy** — a business model where apps profit by keeping your attention as long as possible.",
          "**Data labor** — the real human work (labeling, moderating, reviewing) that trains and maintains AI systems.",
        ],
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "You already use dozens of AIs every day",
        body: `You don't have to open a "robot app" to use AI. It's quietly built into tools you already love, doing its work behind the scenes where you never see it.\n\nThink of AI like the electricity in your house. You don't see it, you rarely think about it, but it's powering almost everything — the lights, the fridge, your charging phone. AI is similar: invisible, constant, and easy to take for granted. When your maps app reroutes around a traffic jam or your camera blurs the background of a selfie, that's AI working silently.\n\nLearning to **spot AI** is the first step to thinking critically about it — because you can't question something you don't notice. Once you start looking, you'll see it everywhere.`,
        callout: {
          label: "Where you see it",
          text: "Recommendations, face unlock, maps that re-route around traffic, spam filters, autocorrect, voice assistants, photo search, and content feeds are all powered by AI.",
        },
        checkIn: {
          prompt: "Why is it useful to practice 'spotting' AI in ordinary apps?",
          choices: [
            "Because you can't think critically about something you don't even notice is there",
            "Because it's only useful once you plan to build your own app",
            "Because spotting it disables the recommendation feature",
            "Because ordinary apps only use AI on premium or paid versions",
          ],
          correctIndex: 0,
          explanation:
            "Critical thinking starts with noticing. If AI is invisible to you, you can't ask smart questions about what it's doing with your attention or your data — and noticing it doesn't turn it off or require a paid tier.",
        },
      },
      {
        id: "concept-2",
        kicker: "Spot the pattern",
        title: "Each one is a prediction",
        body: `Here's the cool part. Once you look closely, all these different AIs are secretly doing the *same* thing — they **predict** something:\n\n• A video feed predicts *which clip will keep you watching*.\n• Maps predict *the fastest route right now*.\n• Your keyboard predicts *the next word you'll type*.\n• A spam filter predicts *whether an email is junk*.\n\nIt's like a weather forecaster who studies years of past weather to guess tomorrow's rain. These AIs studied tons of past data — your clicks, millions of trips, billions of emails — and then predict the best next thing. Different apps, same underlying move: learn from the past, predict the future.`,
        bullets: [
          "Recommendation feeds → predict what you'll click or watch.",
          "Maps & ride apps → predict travel time and routes.",
          "Spam filters → predict junk vs. real mail.",
          "Face unlock → predicts 'is this the owner?'",
        ],
        callout: {
          label: "Myth check",
          text: "A personalized feed isn't reading your mind or listening through your microphone. It's predicting from patterns in what you (and people like you) tapped, watched, and skipped before.",
        },
        checkIn: {
          prompt: "A friend swears their phone 'must be listening' because an ad matched something they only talked about out loud. What's the more likely explanation?",
          choices: [
            "Prediction from existing data (searches, location, shared interests with similar users) can look eerily accurate without any listening at all",
            "Phones only run the microphone when an app is actively open, so it must have caught that one conversation",
            "The friend's phone has different privacy settings than everyone else's, which explains the ad",
            "It's a total coincidence with no pattern behind it at all",
          ],
          correctIndex: 0,
          explanation:
            "Recommendation systems are shockingly good at prediction from clicks, searches, location, and 'people like you' patterns — often accurate enough to feel like mind-reading, without needing to overhear anything.",
        },
      },
      {
        id: "concept-3",
        kicker: "The hidden deal",
        title: "Convenience is paid for with data",
        body: `These tools feel free, but you usually pay with **data** — what you watch, where you go, what you type, what you skip. The AI uses that data to get better and better at predicting *you* specifically.\n\nThink of it like a coffee shop that remembers your exact order. Super convenient! But to do that, it has to keep notes on everything you've ever bought. Apps do the same with your behavior, just on a massive scale.\n\nThat can be genuinely helpful — a feed that actually shows you things you like. It can also be used to keep you scrolling longer or to show you more ads. Neither is automatically evil, but you should know the deal you're making so *you* decide if it's worth it.`,
        callout: {
          label: "Think about it",
          text: "If an app is free and very good at keeping your attention, ask: what data is it collecting, and who benefits when I use it more — me, or the company?",
        },
        checkIn: {
          prompt: "What is the most accurate way to describe why many popular apps are free?",
          choices: [
            "You're paying with your attention and your data instead of cash",
            "The companies mainly earn money from the small app-store download fee instead",
            "Most free apps eventually charge every user once they hit a certain age",
            "The company absorbs the cost as a public service with no return",
          ],
          correctIndex: 0,
          explanation:
            "The 'free' trade is usually: you give attention and data, the company sells ads or improves its product, and the AI gets better at predicting you — it's not funded by download fees or run as charity.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "How a video feed picks your next clip",
        body: `Ever wonder why "just one more video" turns into an hour? Let's trace exactly how a recommendation feed decides what to autoplay next.\n\n**Step 1 — Collect signals.** As you scroll, the app quietly records data: which videos you watched to the end, which you skipped in two seconds, what you liked, paused, or rewatched.\n\n**Step 2 — Find your patterns.** The AI compares your behavior to millions of other users. Maybe people who rewatch skateboarding clips also love parkour fails — so it spots that pattern.\n\n**Step 3 — Predict and rank.** For a pool of possible next videos, it predicts a "watch probability" for each one — how likely *you* are to keep watching.\n\n**Step 4 — Serve the winner.** It autoplays the clip with the highest predicted watch time. You see one perfect video; behind it, thousands were scored and ranked in a split second.\n\nNotice the AI's goal: maximize your watch time, not your happiness or your homework. Those aren't always the same thing.`,
        callout: {
          label: "Pro tip",
          text: "When a feed feels impossible to put down, that's the prediction working *as designed*. Knowing its real goal — keeping you watching — makes it much easier to decide when to close the app.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "\"It's free, so nobody's making money off me\"",
        body: `This is one of the most common — and most costly — misconceptions about apps. Let's take it apart.`,
        bullets: [
          "**Myth: Free means no cost to you.** Reality: your attention and behavior data are the actual product being sold, usually to advertisers.",
          "**Myth: More personalization is always better for you.** Reality: it's optimized for *engagement*, which sometimes means showing you what keeps you scrolling, not what's actually good for you.",
          "**Myth: Turning off one setting fixes everything.** Reality: most apps collect data through many channels at once (clicks, time-on-screen, location, contacts) — one toggle rarely covers it all.",
        ],
        checkIn: {
          prompt: "What is the clearest sign that an app's recommendation AI is optimizing for engagement rather than your wellbeing?",
          choices: [
            "It occasionally suggests a video from a creator you don't follow yet",
            "It keeps surfacing content that's hard to stop watching, even past the point you meant to close the app",
            "It sometimes shows the same video twice in one week",
            "It lets you skip ahead in a video instead of watching it fully",
          ],
          correctIndex: 1,
          explanation:
            "Engagement-optimized systems are built to extend watch time. Feeling unable to stop is a direct signal of that design goal at work — an occasional repeat or new creator suggestion doesn't reveal much on its own.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it now",
        title: "Audit one app in 90 seconds",
        body: `Open one app you use daily and check its permissions or settings (usually under Settings → Apps → [app name] → Permissions on most phones).\n\n1. What data can it access — location? contacts? microphone?\n2. Does that access make sense for what the app actually does?\n3. Is there a personalization or ad-preferences setting you didn't know existed?\n\nYou're not trying to delete the app — you're trying to *see* the deal you already agreed to. Awareness is the whole skill here.`,
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "The humans behind the curtain",
        body: `Here's something most people never learn: AI doesn't build or maintain itself. Behind every recommendation system, translation tool, and content filter are **real people doing real work** — often work you never see.\n\nSomeone has to label millions of training examples ("this is spam," "this is not"). Someone has to review flagged content to decide if it violates the rules. Someone has to test the system in messy, real-world conditions and report what breaks.`,
        bullets: [
          "**Data labelers** tag raw examples (photos, text, audio) so models have something to learn from.",
          "**Content moderators** review flagged posts, sometimes thousands per day, to keep platforms usable.",
          "**Quality testers** poke at the AI to find its blind spots before it reaches you.",
        ],
        image: "/images/lessons/ai-2-extra1.png",
        imageAlt: "A diverse group of workers labeling and reviewing data behind the scenes of an AI system",
        callout: {
          label: "Why this matters",
          text: "This work is often outsourced, underpaid, and emotionally difficult — especially content moderation. Knowing this humanizes the tech and connects directly to CSTA's focus on the social and economic impacts of computing.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Paid app vs. 'free' data-powered app",
        body: `Comparing the two business models side by side makes the hidden trade obvious.`,
        table: {
          columns: ["Trait", "You pay with money", "You pay with data ('free')"],
          values: [
            ["Upfront cost", "Yes, usually", "$0"],
            ["What company collects", "Payment info only", "Behavior, location, clicks, often more"],
            ["Main goal of the AI", "Serve you well so you keep paying", "Maximize engagement/ads revenue"],
          ],
          rowCount: 3,
        },
        checkIn: {
          prompt: "According to the comparison, what is usually the main optimization goal of a free, ad-supported app's recommendation AI?",
          choices: [
            "Maximizing engagement and ad revenue, which usually means maximizing your time and attention",
            "Minimizing the amount of your personal data it needs to collect",
            "Matching the experience of the paid version as closely as possible",
            "Making sure every user sees the exact same content in the exact same order",
          ],
          correctIndex: 0,
          explanation:
            "Free, ad-supported models generally profit from attention and data, so the AI is tuned to keep you engaged longer — not to minimize data collection or serve identical content to everyone.",
        },
      },
      {
        id: "ethics-or-bias",
        kicker: "Ethics moment",
        title: "The real cost of 'free': a documented case",
        body: `In 2023, workers who had been hired to review disturbing content for a major social media company in Nairobi, Kenya sued over the psychological toll of the job — spending entire shifts reviewing graphic, violent material flagged by AI systems so it never reached ordinary users' feeds.\n\nThis case matters here because it shows the two ideas from this lesson connecting directly: the AI that keeps your feed feeling "clean" often relies on human moderators working in difficult conditions, frequently in countries with weaker labor protections and lower pay than where the company is based.\n\nThis isn't a reason to feel guilty about using apps — it's a reason to be a more informed user. Understanding the full pipeline (data → labor → AI → your feed) is part of genuine AI literacy, not just knowing how the algorithm works.`,
        callout: {
          label: "CSTA 2-IC-20 connection",
          text: "Evaluating how computing impacts economic and social practices — including the labor of the people who build and maintain it — is core to this standard.",
        },
      },
      {
        id: "habits",
        kicker: "Build the habit",
        title: "Three habits for using data-hungry apps wisely",
        body: `You don't need to quit every app — you need to use them with your eyes open.`,
        bullets: [
          "**Check permissions occasionally.** A quick look at what an app can access takes 60 seconds and often reveals surprises.",
          "**Notice the pull.** If you meant to close an app five minutes ago, that's the recommendation AI doing exactly what it's designed to do — not a personal failing.",
          "**Remember the humans.** Behind the smooth AI experience are real workers labeling data and moderating content — a reminder that 'the algorithm' isn't fully automatic.",
        ],
      },
      {
        id: "standards-connect",
        kicker: "Why school cares about this",
        title: "This connects straight to real standards",
        body: `You just practiced **CSTA 2-DA-08** — collecting and thinking about data (in this case, your own app data) to make it more useful and reliable to *you*, the decision-maker. You also practiced **CSTA 2-IC-20**, evaluating how computing affects personal and economic life, when you looked at the "free app" business model and the labor behind it.\n\nHonestly, this is one of those school standards that isn't just theoretical — it's the exact skill that keeps you from getting endlessly played by an app that's optimized against your best interests. Knowing the deal is power.`,
      },
      {
        id: "reflection-prompt",
        kicker: "Think it through",
        title: "Before you move on, sit with this",
        body: `Think about the app you audited a few slides ago.\n\nIs the trade — your data and attention for its convenience — a fair one for you? Would you make the same choice if the deal were spelled out in plain language before you signed up? You'll be asked to put this into words in your reflection at the end of the lesson.`,
      },
      {
        id: "mini-case",
        kicker: "Real-world case",
        title: "When content moderators sued over the human cost of clean feeds",
        body: `In 2023, a group of content moderators who had worked reviewing flagged posts for a major platform filed a lawsuit describing severe psychological stress from constant exposure to graphic material — material an AI system had flagged as needing human review, because the AI alone couldn't confidently decide what to do with it.\n\nThe case became a widely reported example of a pattern researchers had been describing for years: AI systems that look fully automated to users are often backed by large teams of human reviewers, frequently working in countries with fewer labor protections, doing psychologically demanding work for comparatively low pay.\n\nThis doesn't mean AI content moderation is "fake" — the AI does filter enormous amounts of content on its own. It means the parts AI *can't* confidently handle get pushed to humans, and those humans are part of the real cost of the "free," smooth-feeling app you use every day.`,
        callout: {
          label: "Worth remembering",
          text: "Every time you see a clean, ad-friendly, spam-free feed, some combination of AI systems and human reviewers made that happen — and it's worth knowing both halves of that story.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "Quick gut-check before the quiz",
        body: `Let's make sure the big ideas actually stuck before you head into the knowledge check.`,
        checkIn: {
          prompt: "What does the content-moderator lawsuit best illustrate about AI-powered apps?",
          choices: [
            "Behind many 'automated' feeds, human labor (often difficult and underpaid) fills the gaps AI can't confidently handle",
            "The AI in that case had a bug that has since been fully fixed",
            "Content moderation was phased out entirely once AI improved",
            "Only one company has ever relied on human content reviewers",
          ],
          correctIndex: 0,
          explanation:
            "The case shows the real, human-labor side of AI systems — a side that's easy to forget when an app feels seamless and 'automatic.' It's an industry-wide pattern, not a one-time bug or a single company's issue.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Big ideas to carry with you: AI is **embedded** in everyday apps, most of it is quietly making a **prediction**, free and convenient tools usually run on **your data**, and behind the scenes, real **human labor** — data labeling, content moderation — keeps the whole system running.\n\nFor the rest of today, try to catch AI in the act — every recommendation, autocomplete, filter, or reroute is AI making a prediction about you, built on data and human work you rarely see.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then reflect on the AI you rely on most.`,
      },
    ],
  },
  bigIdeas: [
    "AI is **embedded** in everyday apps — you rarely see it directly.",
    "Most everyday AI is doing one thing: making a **prediction**.",
    "Free, convenient tools usually run on **your data**.",
    "Real human labor — data labeling, content moderation — keeps AI systems running.",
    "Knowing the 'deal' behind a free app is a form of power, not paranoia.",
  ],
  keyTerms: [
    { term: "Recommendation system", definition: "AI that predicts what you'll like next (videos, songs, products) based on past behavior." },
    { term: "Prediction", definition: "An AI's best guess about an outcome, based on patterns in data." },
    { term: "Personal data", definition: "Information about you — clicks, location, messages — that apps collect, often to improve predictions." },
    { term: "Attention economy", definition: "Business model where apps profit by keeping your attention as long as possible." },
    { term: "Data labor", definition: "The human work — labeling, moderating, testing — that builds and maintains AI systems." },
    { term: "Content moderator", definition: "A person who reviews flagged content that an AI system couldn't confidently decide on alone." },
  ],
  realWorld:
    "When two friends open the same video app, they see **different** feeds. That's recommendation AI predicting each person separately from their own data — built on a pipeline that includes real human labor, not just code.",
  quiz: [
    {
      id: "q1",
      question: "Which of these is powered by AI?",
      choices: [
        "Only apps that are explicitly branded or marketed as 'AI-powered'",
        "Only apps you have to pay a subscription for",
        "Everyday features like video recommendations, spam filters, and face unlock",
        "Only apps that require you to type a written prompt",
      ],
      correctIndex: 2,
      explanation:
        "AI is built into many everyday features whether or not the app advertises that fact, is free, or uses a chat-style prompt box.",
    },
    {
      id: "q2",
      question: "What do most everyday AIs (feeds, maps, keyboards, spam filters) have in common?",
      choices: [
        "They all require you to create an account first",
        "They all make a prediction based on patterns in past data",
        "They all need a live internet connection to function at all",
        "They all show you the same result as every other user",
      ],
      correctIndex: 1,
      explanation:
        "Underneath, they're all predicting the best next thing — the next video, route, word, or spam label — from patterns in data, not from an account requirement or identical output for everyone.",
    },
    {
      id: "q3",
      question: "Two friends open the same video app and see totally different feeds. Why?",
      choices: [
        "Recommendation AI personalizes each feed from each person's own data",
        "One friend's phone has a faster processor, which changes what loads",
        "Feeds are reshuffled completely at random for every user",
        "The app shows different content depending only on time of day",
      ],
      correctIndex: 0,
      explanation:
        "Recommendation systems use each person's history to predict what will keep that specific person engaged — it's personalization, not processor speed, randomness, or time of day.",
    },
    {
      id: "q4",
      question: "A popular app is free and extremely good at keeping you scrolling. What's the smartest question to ask?",
      choices: [
        "Which of my friends spends the most time on it?",
        "What data is it collecting, and who benefits when I use it longer?",
        "How do I get it to recommend content faster?",
        "Is there a paid version with even more content?",
      ],
      correctIndex: 1,
      explanation:
        "Free, attention-grabbing apps usually run on your data and profit from your time. Knowing the trade keeps you in control, rather than focusing on how to get more from it.",
    },
    {
      id: "q5",
      question: "What is a 'content moderator'?",
      choices: [
        "A setting that controls how much screen time an app allows",
        "The engineer who originally trained the recommendation AI",
        "A person who reviews flagged content that an AI system couldn't confidently decide on alone",
        "An automated bot that deletes posts with zero human review",
      ],
      correctIndex: 2,
      explanation:
        "Content moderators are real people who review edge cases and difficult material an AI flags but can't safely decide on by itself — it's not a screen-time setting or a fully automated bot.",
    },
    {
      id: "q6",
      question: "Why is it misleading to call an app's content filtering 'fully automated'?",
      choices: [
        "Because AI is actually incapable of filtering any content on its own",
        "Because human moderators and labelers are often part of the pipeline, especially for edge cases",
        "Because filtering only happens after a human reports a specific post",
        "Because 'automated' is just a marketing term with no real system behind it",
      ],
      correctIndex: 1,
      explanation:
        "AI handles huge volumes automatically, but humans — often working in difficult, underpaid conditions — fill in the gaps AI can't confidently handle, rather than acting only after user reports.",
    },
    {
      id: "q7",
      question: "What does 'you pay with data' mean in the context of free apps?",
      choices: [
        "The company profits from your attention and personal data instead of a purchase price",
        "You're billed a small amount that shows up under a disguised name",
        "The app converts your usage time directly into a currency it sells",
        "It's just a figure of speech with no real business model behind it",
      ],
      correctIndex: 0,
      explanation:
        "Free, ad-supported apps typically monetize by collecting your data and attention, then selling ads or improving engagement-driving predictions — there's no hidden charge or literal currency conversion.",
    },
    {
      id: "q8",
      question: "What's the healthiest way to relate to a highly engaging, free recommendation app?",
      choices: [
        "Assume the app has your best interests in mind since it feels helpful",
        "Delete every free app to avoid the data trade entirely",
        "Recognize it's optimized for engagement, understand the data/labor trade, and decide consciously how much time it deserves",
        "Ignore the design entirely since thinking about it won't change anything",
      ],
      correctIndex: 2,
      explanation:
        "Awareness — not blind trust, avoidance, or resignation — is the goal: know the design, know the trade, then choose deliberately.",
    },
  ],
  reflection: {
    prompt:
      "Pick the one AI-powered app you use most. What data does it likely collect about you, and what does it predict?",
    placeholder: "Example: My music app collects which songs I skip, and predicts playlists I'll like…",
  },
};
