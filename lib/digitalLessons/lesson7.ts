import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson7: AILessonConfig = {
  id: "dl-7",
  title: "7. Your Digital Footprint & Reputation",
  goal: "Understand what a digital footprint is, that online actions can be permanent and public, and how to manage your online reputation for school, jobs, and life.",
  xpReward: 350,
  badge: "Footprint Keeper",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/6",
  nextHref: "/learn/digital/8",
  lessonModule: {
    durationLabel: "~11–12 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Every time you post, like, search, or sign up for something, you leave a mark online. Added up, all those marks become your **digital footprint** — and it follows you in ways that can help or hurt for years.\n\nHere's our roadmap:\n\n• **What a digital footprint is** — the trail of data you leave behind.\n• **Active vs. passive** — what you post vs. what's quietly collected about you.\n• **Permanence** — why "delete" doesn't really erase things.\n• **Who's looking** — colleges, scholarships, employers, coaches.\n• **Managing your reputation** — and building a *positive* footprint on purpose (including a simple portfolio habit).\n\nThis isn't about scaring you off the internet. It's about being the author of your own story online instead of letting a random old post tell it for you.`,
        image: "/images/lessons/dl-7.png",
        imageAlt: "Laptop search results for a person's name next to a smartphone profile screen showing posts and privacy settings",
        callout: {
          label: "Why it matters",
          text: "Admissions officers and employers really do search for applicants online. The footprint you build as a teen can quietly open doors — or close them — long before you're in the room.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "The words we'll use — in plain English",
        body: `A few terms run through this whole lesson. Here they are in plain language so they're easy to follow.\n\n• **Digital footprint** — the *trail of data you leave behind* as you use the internet: posts, likes, comments, searches, sign-ups, and more.\n• **Active footprint** — the stuff you *choose* to put online on purpose, like a post or a photo.\n• **Passive footprint** — data quietly *collected about you* without you posting it, like your location or what you click.\n• **Permanence** — the fact that online things can *stick around* even after you delete them.\n• **Reputation** — the overall impression people get of you from your footprint — basically, what your online trail says about you.\n• **Privacy settings** — the controls that limit *who can see* your stuff. Helpful, but not a magic shield.\n\nKeep these in your back pocket — we'll use them right away.`,
        callout: {
          label: "Tip",
          text: "The two big ones to remember are **active** (what you post) and **passive** (what's collected about you). Almost everything else builds on those.",
        },
      },
      {
        id: "what",
        kicker: "The big idea",
        title: "Your digital footprint is the trail you leave online",
        body: `A **digital footprint** is the trail of data you leave behind as you use the internet — your posts, comments, photos, likes, searches, sign-ups, and more. Some of it you create on purpose. A lot of it you don't even notice.\n\nHere's a useful image: a digital footprint is like **footprints in wet cement**. In the moment they seem harmless and temporary — but they harden, and they stay. The goofy comment, the angry reply, the photo from a party: years later they can still be there, set in place.\n\nThe internet has a long memory. That's not all bad — a great project or a helpful post sticks around too. The goal isn't to leave *no* footprint (impossible). It's to be aware that you're always leaving one, and to shape it on purpose.`,
        callout: {
          label: "Watch out",
          text: "You're building your footprint right now, with every post and search — not just when you decide to 'be careful.' Awareness in the moment is what keeps it from hardening into something you regret.",
        },
      },
      {
        id: "active-passive",
        kicker: "Two kinds of footprint",
        title: "Active footprint vs. passive footprint",
        body: `Your footprint comes in two flavors, and most people only think about one of them.\n\n• **Active footprint** — the stuff you *choose* to put out there: posts, photos, comments, videos, profiles, messages. You're the author.\n• **Passive footprint** — the data that's *collected about you* without you actively posting it: your likes, what you click, how long you watch, your location, your search history, the sites you visit.\n\nThat passive trail is huge. Apps and websites quietly log your behavior to build a profile of you — what you like, where you go, what you might buy. You didn't "post" any of it, but it's part of your footprint all the same.\n\nUnderstanding both halves matters: you can control your active footprint directly, and you can limit your passive one through privacy settings and smarter choices about what apps you let track you.`,
        bullets: [
          "**Active** = what you post on purpose.",
          "**Passive** = what's collected about you (likes, location, search history).",
          "You control active directly; you limit passive through privacy settings.",
        ],
        callout: {
          label: "Common misconception",
          text: "People think their footprint is only what they post. The passive trail — clicks, location, watch time — is often bigger, and companies use it to profile you.",
        },
      },
      {
        id: "one-day",
        kicker: "Everyday example",
        title: "A footprint forms in a single ordinary day",
        body: `It's easy to think a footprint is only built by big, dramatic posts. Really, it's built quietly, all day long. Walk through one normal Tuesday:\n\n• **7:30 a.m.** — You search "is school closed today" → that search is logged (passive).\n• **8:15 a.m.** — You post a selfie on your story (active) and your phone tags the location (passive).\n• **Lunch** — You like 20 posts and watch a few videos to the end (passive — apps note exactly what holds your attention).\n• **Evening** — You comment "lol this is so dumb" on a video (active), and sign up for a new app with your email (active *and* passive).\n\nBy bedtime you've added dozens of marks to your trail without "doing" anything unusual. None of it felt like a big deal in the moment — and that's exactly the point. Your footprint grows from ordinary habits, not just rare mistakes.`,
        callout: {
          label: "Watch out",
          text: "The riskiest posts usually feel the most harmless in the moment — a quick joke, an angry reply. Those are the ones worth a five-second pause before you tap send.",
        },
      },
      {
        id: "permanence",
        kicker: "Concept",
        title: "Delete doesn't really mean gone",
        body: `Here's the idea that surprises people most: hitting **delete** rarely erases something for good. Once content is online, it can escape your control in seconds.\n\n• **Screenshots** — anyone can capture your post before you delete it. Now they have a copy you can't reach.\n• **Archives** — services and websites automatically save snapshots of pages. A deleted post may still live in an archive.\n• **Reposts and shares** — once others share or save your content, it spreads to places you don't control.\n\nThis is **permanence**: the reality that online actions can outlast the moment you took them. "I deleted it" only removes *your* copy — not the screenshots, archives, and reshares already out there.\n\nThe practical takeaway isn't fear. It's a simple pause before posting: *could I live with this sticking around?*`,
        image: "/images/lessons/dl-7-2.png",
        imageAlt: "Phone showing a post being deleted while a laptop displays a screenshot copy and a browser archive page still holding the content",
        callout: {
          label: "Common misconception",
          text: "\"I deleted it, so it's gone\" is one of the most dangerous myths online. Screenshots and reposts mean a deleted post can keep circulating long after you remove your copy.",
        },
      },
      {
        id: "who-looks",
        kicker: "Concept",
        title: "Who's actually looking — and the test that helps",
        body: `Your footprint isn't just seen by friends. Lots of decision-makers check it:\n\n• **Colleges and admissions officers** sometimes search applicants.\n• **Scholarship committees** want to know who they're funding.\n• **Employers** very commonly look up candidates before hiring.\n• **Coaches, clubs, and programs** check too.\n\nSo here's a quick gut-check before you post — the **"would I be okay with..."** test: *Would I be fine with a teacher, a future boss, or my grandparent seeing this?* If the answer is no, don't post it.\n\nOne more thing many people miss: **privacy settings are not the same as truly private.** Setting an account to "private" helps, but screenshots leak, "friends" reshare, and settings change. Treat anything you post as potentially public, even on a locked account.`,
        callout: {
          label: "Common misconception",
          text: "\"My account is private, so nothing can leak.\" Private settings reduce risk but don't guarantee secrecy — a single screenshot from a trusted follower can make a private post public.",
        },
      },
      {
        id: "positive",
        kicker: "Concept",
        title: "Build a positive footprint on purpose",
        body: `Managing your footprint isn't only about avoiding bad stuff — it's about **building good stuff**. A strong, positive footprint can actively help you.\n\nWays to build one:\n\n• **Portfolios and projects** — share art, code, writing, or videos you're proud of. This is gold for college and job applications.\n• **Helpful, kind posts** — answering questions, supporting others, showing your interests in a positive light.\n• **A clean, consistent profile** — a sensible username and bio you'd be happy for anyone to see.\n\nAlso remember: **others can post about you.** Friends tag you in photos, mention you, or share things you're in. You don't fully control that — so it's fair to ask people to untag you or take something down, and to be thoughtful about what you post about others, too.\n\nThink of it like a garden: pull the weeds (clean up old posts) *and* plant flowers (add things you're proud of).`,
        bullets: [
          "Share **portfolios and projects** you're proud of.",
          "Post helpfully and kindly — it shows who you are.",
          "Keep your profile clean and consistent.",
          "Remember others can tag and post about you, too.",
        ],
        callout: {
          label: "Pro tip",
          text: "A great project posted online can do more for a college or job application than a perfect, empty profile. Don't just hide the bad — create something good worth finding.",
        },
      },
      {
        id: "portfolio-habit",
        kicker: "Decision framework",
        title: "A simple reputation plan for school → college → work",
        body: `You don't need a perfect personal brand. You need a **repeatable plan**:\n\n**1. Search yourself twice a year** (name + school/town). Note what a stranger would see first.\n**2. Tighten privacy** on accounts that are for friends, not for the public.\n**3. Clean or untag** anything you wouldn't want a scholarship reader or hiring manager to screenshot.\n**4. Publish one proud thing** — a project link, a portfolio page, a thoughtful post about work you care about.\n**5. Keep usernames consistent** and professional enough that an email from \`coolgamer99\` isn't the first impression for an internship.\n\n**For seniors especially:** A short public portfolio (Google Site, GitHub, Behance, LinkedIn, or even a clean Drive folder with view access) can support college apps, scholarships, and first jobs. One strong artifact beats twenty random posts.\n\n**Decision shortcut before posting:** *Helpful, harmless, or hold?* If it's not clearly helpful or harmless, hold.`,
        bullets: [
          "Audit → privacy → clean → add something proud.",
          "Friend accounts can be private; public work should be intentional.",
          "One portfolio link can outshine a blank or messy search result.",
          "Pause on posts that fail the 'teacher/boss/grandparent' test.",
        ],
        callout: {
          label: "Try this week",
          text: "Do a 15-minute mini-audit: search your name, fix one privacy setting, delete or untag one thing you'd rather not own forever, and save one project you're proud of in a place you could share later.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Auditing your own digital footprint",
        body: `Let's actually clean up your footprint, step by step. You can do this in about 20 minutes.\n\n**Step 1 — Search yourself.** Type your name into a search engine (try it with quotes, and add your town or school). See what's public. This is roughly what a college or employer would see.\n\n**Step 2 — Check your privacy settings.** Open each app you use and review who can see your posts, your location, and your profile. Tighten anything set to "public" that you didn't intend.\n\n**Step 3 — Clean up.** Delete or hide old posts you wouldn't want a future boss to see. **Untag** yourself from photos that don't represent you well, and ask friends to remove anything you're uncomfortable with.\n\n**Step 4 — Add something positive.** Post or link to a project, a piece of work, or a profile you're proud of, so the *first* thing people find reflects the real you.\n\nDo this once or twice a year and you stay in control of your own story.`,
        image: "/images/lessons/dl-7-3.png",
        imageAlt: "Laptop browser searching a person's name; phone privacy settings slider; trash icon removing old posts; star marking a portfolio project",
        callout: {
          label: "Pro tip",
          text: "Set a reminder to audit your footprint each birthday. A quick yearly check-up keeps surprises from piling up right when you're applying somewhere important.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've got the full picture: your **digital footprint** is the trail you leave, split into **active** (what you post) and **passive** (what's collected). Thanks to screenshots, archives, and reshares, **delete doesn't truly erase** — so pause before posting and remember who might be looking. Best of all, you can **build a positive footprint** on purpose with a simple audit-and-portfolio habit.\n\nThe goal isn't to disappear online. It's to be the author of your own reputation, so what people find reflects who you really are.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then reflect on one thing you'll change after auditing your footprint.`,
      },
    ],
  },
  bigIdeas: [
    "Your **digital footprint** is the trail of data you leave online — and it tends to stick around.",
    "It's both **active** (what you post) and **passive** (likes, location, search history collected about you).",
    "**Delete rarely means gone**, and real people check your footprint — so build a positive one on purpose.",
  ],
  keyTerms: [
    { term: "Digital footprint", definition: "The trail of data you leave online through posts, likes, searches, and activity." },
    { term: "Active footprint", definition: "The content you choose to put online — posts, photos, comments, videos." },
    { term: "Passive footprint", definition: "Data collected about you without you posting it, like clicks, location, and search history." },
    { term: "Online reputation", definition: "How you appear to others online, based on your footprint." },
    { term: "Permanence", definition: "The reality that online content can outlast deletion through screenshots, archives, and reshares." },
    { term: "Privacy settings", definition: "Controls that limit who can see your content — helpful, but not a guarantee of true secrecy." },
  ],
  realWorld:
    "Many employers, scholarship committees, and admissions officers search candidates online before deciding. A clean, positive footprint — including a portfolio of work you're proud of — can be the quiet edge that gets you the offer.",
  quiz: [
    {
      id: "q1",
      question: "A scholarship committee googles your name. What is a 'digital footprint'?",
      choices: [
        "The battery your phone uses online",
        "The trail of data you leave online through posts, likes, searches, and activity",
        "A type of password",
        "The speed of your internet connection",
      ],
      correctIndex: 1,
      explanation:
        "Your digital footprint is the overall trail of data you leave behind as you use the internet — both what you post and what's collected about you.",
    },
    {
      id: "q2",
      question: "Your location, search history, and what you click while browsing college sites are part of which footprint?",
      choices: [
        "Active footprint",
        "Passive footprint",
        "No footprint at all",
        "A deleted footprint",
      ],
      correctIndex: 1,
      explanation:
        "Your passive footprint is data collected about you without posting. Your active footprint is the content you choose to share.",
    },
    {
      id: "q3",
      question: "You delete an embarrassing post an hour after sending it, before a job interview next month. Why might it still exist?",
      choices: [
        "Deleting always works instantly and fully",
        "Screenshots, archives, and reshares can keep copies you can't control",
        "Posts can never be deleted by anyone",
        "Only the government can delete posts",
      ],
      correctIndex: 1,
      explanation:
        "Because of permanence, deleting removes only your copy. Screenshots and reshares may already be out there beyond your reach.",
    },
    {
      id: "q4",
      question: "Before posting a joke about your workplace (or school) in a story, which is the best quick test?",
      choices: [
        "Will this get a lot of likes?",
        "Is it under 280 characters?",
        "Would I be okay with a teacher, future boss, or grandparent seeing this?",
        "Did I post recently?",
      ],
      correctIndex: 2,
      explanation:
        "The 'would I be okay with them seeing this?' test catches posts that could hurt your reputation with the people who actually check it.",
    },
    {
      id: "q5",
      question: "What's a smart way to build a POSITIVE digital footprint for college or a first job?",
      choices: [
        "Post nothing ever, anywhere",
        "Share projects and portfolios you're proud of and post helpfully",
        "Make every account public",
        "Tag yourself in as many photos as possible",
      ],
      correctIndex: 1,
      explanation:
        "Sharing real work and being helpful builds a footprint that actively helps you — often more than just hiding the bad stuff.",
    },
  ],
  reflection: {
    prompt:
      "After thinking about your own footprint, name one thing you'll clean up and one positive thing you could add.",
    placeholder: "Example: I'll untag myself from some old photos, and I'll post the coding project I finished last month…",
  },
};
