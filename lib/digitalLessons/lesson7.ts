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
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Every time you post, like, search, or sign up for something, you leave a mark online. Added up, all those marks become your **digital footprint** — and it follows you in ways that can help or hurt for years.\n\nHere's our roadmap:\n\n• **What a digital footprint is** — the trail of data you leave behind.\n• **Active vs. passive** — what you post vs. what's quietly collected about you.\n• **Permanence** — why "delete" doesn't really erase things.\n• **Who's looking** — colleges, scholarships, employers, coaches — and the myth of "private."\n• **Managing your reputation** — building a *positive* footprint on purpose, including a simple portfolio habit.\n\nThis isn't about scaring you off the internet. It's about being the author of your own story online instead of letting a random old post tell it for you.`,
        image: "/images/lessons/dl-7.png",
        imageAlt: "Laptop search results for a person's name next to a smartphone profile screen showing posts and privacy settings",
        callout: {
          label: "Why it matters",
          text: "Admissions officers and employers really do search for applicants online. The footprint you build as a teen can quietly open doors — or close them — long before you're in the room.",
        },
      },
      {
        id: "hook-story",
        kicker: "Real moment",
        title: "The interview question about a two-year-old post",
        body: `Sam is in a scholarship interview, feeling great about their answers, when the interviewer asks: "I noticed a post from you a couple years back that seemed pretty harsh about your school. Can you tell me about that?"\n\nSam freezes. That post was deleted *ages* ago — or so Sam thought. Someone had screenshotted it back then, and it had circulated just enough that the interviewer had seen it. Sam hadn't thought about that post in two years. The interviewer clearly had.\n\nSam recovered by answering honestly and showing growth since then — and still got the scholarship. But the moment was a wake-up call: things you post as a freshman can resurface as a senior, in a room where you least expect it. This lesson is about understanding why that happens, and how to make sure what resurfaces actually helps you.`,
        callout: {
          label: "Keep this in mind",
          text: "You don't need to disappear from the internet. You just need to know that \"delete\" is not the safety net most people assume it is.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "The words we'll use — in plain English",
        body: `A few terms run through this whole lesson. Here they are in plain language so they're easy to follow.\n\n• **Digital footprint** — the *trail of data you leave behind* as you use the internet: posts, likes, comments, searches, sign-ups, and more.\n• **Active footprint** — the stuff you *choose* to put online on purpose, like a post or a photo.\n• **Passive footprint** — data quietly *collected about you* without you posting it, like your location or what you click.\n• **Permanence** — the fact that online things can *stick around* even after you delete them.\n• **Reputation** — the overall impression people get of you from your footprint.\n• **Privacy settings** — the controls that limit *who can see* your stuff. Helpful, but not a magic shield.\n\nKeep these in your back pocket — we'll use them right away.`,
        callout: {
          label: "Tip",
          text: "The two big ones to remember are **active** (what you post) and **passive** (what's collected about you). Almost everything else builds on those.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "Your digital footprint is the trail you leave online",
        body: `A **digital footprint** is the trail of data you leave behind as you use the internet — your posts, comments, photos, likes, searches, sign-ups, and more. Some of it you create on purpose. A lot of it you don't even notice.\n\nHere's a useful image: a digital footprint is like **footprints in wet cement**. In the moment they seem harmless and temporary — but they harden, and they stay. The goofy comment, the angry reply, the photo from a party: years later they can still be there, set in place, exactly like the post that resurfaced in Sam's interview.\n\nThe internet has a long memory. That's not all bad — a great project or a helpful post sticks around too. The goal isn't to leave *no* footprint (impossible). It's to be aware that you're always leaving one, and to shape it on purpose.`,
        callout: {
          label: "Watch out",
          text: "You're building your footprint right now, with every post and search — not just when you decide to 'be careful.' Awareness in the moment is what keeps it from hardening into something you regret.",
        },
        checkIn: {
          prompt: "A scholarship committee googles your name. What is a 'digital footprint'?",
          choices: [
            "A type of password",
            "The speed of your internet connection",
            "The battery your phone uses online",
            "The trail of data you leave online through posts, likes, searches, and activity",
          ],
          correctIndex: 3,
          explanation:
            "Your digital footprint is the overall trail of data you leave behind as you use the internet — both what you post and what's collected about you.",
        },
      },
      {
        id: "concept-2",
        kicker: "Two kinds of footprint",
        title: "Active footprint vs. passive footprint",
        body: `Your footprint comes in two flavors, and most people only think about one of them.\n\n• **Active footprint** — the stuff you *choose* to put out there: posts, photos, comments, videos, profiles, messages. You're the author.\n• **Passive footprint** — the data that's *collected about you* without you actively posting it: your likes, what you click, how long you watch, your location, your search history, the sites you visit.\n\nA footprint forms quietly, all day, through ordinary habits — not just big, dramatic posts. Walk through one normal Tuesday: a morning search gets logged (passive); a lunchtime selfie gets posted and tagged with a location (active *and* passive); an evening comment gets typed (active); signing up for a new app with your email creates both kinds at once. By bedtime, dozens of marks have been added without "doing" anything unusual.\n\nUnderstanding both halves matters: you can control your active footprint directly, and you can limit your passive one through privacy settings and smarter choices about what apps you let track you.`,
        bullets: [
          "**Active** = what you post on purpose.",
          "**Passive** = what's collected about you (likes, location, search history).",
          "A footprint grows from ordinary daily habits, not just rare, dramatic posts.",
        ],
        callout: {
          label: "Common misconception",
          text: "People think their footprint is only what they post. The passive trail — clicks, location, watch time — is often bigger, and companies use it to profile you.",
        },
        checkIn: {
          prompt: "Your location, search history, and what you click while browsing college sites are part of which footprint?",
          choices: [
            "A deleted footprint",
            "No footprint at all",
            "Passive footprint",
            "Active footprint",
          ],
          correctIndex: 2,
          explanation:
            "Your passive footprint is data collected about you without posting. Your active footprint is the content you choose to share.",
        },
      },
      {
        id: "concept-3",
        kicker: "Concept",
        title: "Delete doesn't really mean gone",
        body: `Here's the idea that surprises people most: hitting **delete** rarely erases something for good. Once content is online, it can escape your control in seconds.\n\n• **Screenshots** — anyone can capture your post before you delete it. Now they have a copy you can't reach — this is exactly what happened to Sam.\n• **Archives** — services and websites automatically save snapshots of pages. A deleted post may still live in an archive.\n• **Reposts and shares** — once others share or save your content, it spreads to places you don't control.\n\nThis is **permanence**: the reality that online actions can outlast the moment you took them. "I deleted it" only removes *your* copy — not the screenshots, archives, and reshares already out there.\n\nThe practical takeaway isn't fear. It's a simple pause before posting: *could I live with this sticking around?*`,
        image: "/images/lessons/dl-7-2.png",
        imageAlt: "Phone showing a post being deleted while a laptop displays a screenshot copy and a browser archive page still holding the content",
        callout: {
          label: "Common misconception",
          text: "\"I deleted it, so it's gone\" is one of the most dangerous myths online. Screenshots and reposts mean a deleted post can keep circulating long after you remove your copy.",
        },
        checkIn: {
          prompt: "You delete an embarrassing post an hour after sending it, before a job interview next month. Why might it still exist?",
          choices: [
            "Screenshots, archives, and reshares can keep copies you can't control",
            "Only the government can delete posts",
            "Deleting always works instantly and fully",
            "Posts can never be deleted by anyone",
          ],
          correctIndex: 0,
          explanation:
            "Because of permanence, deleting removes only your copy. Screenshots and reshares may already be out there beyond your reach.",
        },
      },
      {
        id: "worked-example",
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
        id: "misconception",
        kicker: "Myth-busting",
        title: "\"My account is private\" doesn't mean truly private",
        body: `A huge number of people believe that setting an account to "private" is the same as making it truly secret. It isn't. Private settings reduce who can *initially* see your content, but they don't guarantee secrecy:\n\n• A "friend" or follower can screenshot a private post and send it anywhere.\n• Accepted followers can change over time — someone you added at 14 might not be someone you'd want reading your posts at 18.\n• Settings themselves can change (an app update, an accidental toggle) without you noticing right away.\n\nTreat anything you post as **potentially public**, even on a locked account — because a single screenshot from a trusted follower can make a private post public in seconds, exactly like what happened to Sam's old post.`,
        callout: {
          label: "Myth check",
          text: "\"My account is private, so nothing can leak.\" Private settings reduce risk but don't guarantee secrecy — a single screenshot from a trusted follower can make a private post public.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Active or passive? Sort a normal day",
        body: `Practice telling the two footprint types apart. For each moment below, decide: **active** (you chose to post it) or **passive** (it was collected without you posting)?\n\n• You search "is school closed today" → **passive** (the search is logged).\n• You post a selfie on your story → **active** (you chose to share it).\n• Your phone automatically tags that selfie's location → **passive** (collected without you deciding to share it).\n• You comment "lol this is so dumb" on a video → **active**.\n• An app notes exactly how long you watched a video before scrolling away → **passive**.\n\nNotice that a single moment (like posting that selfie) often creates *both* kinds of footprint at once — the caption you wrote is active, but the location tag riding along with it is passive.`,
        checkIn: {
          prompt: "You post a photo, and your phone automatically attaches your location to it without you typing anything about location. What kind of footprint is the location tag?",
          choices: [
            "It only counts if you mention the location in the caption",
            "Passive — it was collected and attached without you actively deciding to share it",
            "Active — you chose to share your location",
            "It's not part of your footprint at all",
          ],
          correctIndex: 1,
          explanation:
            "Even though the photo itself was an active choice, an automatically attached location tag is passive — collected data riding along with your active post.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Deeper skill",
        title: "Who's actually looking — and the test that helps",
        body: `Your footprint isn't just seen by friends. Lots of decision-makers check it:\n\n• **Colleges and admissions officers** sometimes search applicants.\n• **Scholarship committees** want to know who they're funding — exactly what happened to Sam.\n• **Employers** very commonly look up candidates before hiring.\n• **Coaches, clubs, and programs** check too.\n\nSo here's a quick gut-check before you post — the **"would I be okay with..."** test: *Would I be fine with a teacher, a future boss, or my grandparent seeing this?* If the answer is no, don't post it.\n\nThis test works because it forces you to imagine a *real, specific* viewer instead of an abstract "the internet." Most people can predict fairly accurately how a specific person would react — the trouble is remembering to ask the question at all, in the moment, before tapping post.`,
        image: "/images/lessons/dl-7-4.png",
        imageAlt: "Illustration of a smartphone post surrounded by icons representing a college admissions officer, an employer, and a scholarship reviewer all viewing it",
        callout: {
          label: "Pro tip",
          text: "Before posting something borderline, picture the single most conservative real person who might see it — not your friend group, but a grandparent or a strict teacher. If they'd wince, reconsider.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Active footprint vs. passive footprint",
        body: `A quick reference to lock in the distinction.`,
        table: {
          columns: ["", "Active footprint", "Passive footprint"],
          values: [
            ["Who creates it", "You, on purpose", "Apps/sites, automatically"],
            ["Examples", "Posts, comments, photos, profiles", "Location tags, clicks, watch time, search history"],
            ["How you manage it", "Think before posting; delete/untag later", "Adjust privacy settings; limit tracking permissions"],
          ],
          rowCount: 3,
        },
      },
      {
        id: "real-world-trap",
        kicker: "Real-world trap",
        title: "The trap of thinking you fully control your footprint",
        body: `Here's a trap that catches even careful people: believing that if *you* are careful about what you post, your footprint is fully under your control. It isn't — because **others can post about you too.** Friends tag you in photos, mention you in captions, or share things you're in, often without asking first.\n\nA real scenario: you never post anything embarrassing yourself, but a friend tags you in an old party photo right before a scholarship deadline. You didn't create that part of your footprint, but it's now attached to your name regardless.\n\n**The fix:** it's completely fair to ask people to untag you or take something down, and to be thoughtful about what you post about *others*, too — since you're on the other side of this exact trap every time you tag a friend. Managing your footprint means managing your *own* posts and staying aware of what others attach to your name.`,
        callout: {
          label: "Watch out",
          text: "\"I'm careful, so I'm safe\" ignores that friends, classmates, and strangers can post about you too. Awareness — and occasionally asking someone to remove a tag — is part of the skill.",
        },
      },
      {
        id: "habits",
        kicker: "Decision framework",
        title: "A simple reputation plan for school → college → work",
        body: `You don't need a perfect personal brand. You need a **repeatable plan** — and a mindset shift: managing your footprint isn't only about avoiding bad stuff, it's about **building good stuff** on purpose.\n\n**1. Search yourself twice a year** (name + school/town). Note what a stranger would see first.\n**2. Tighten privacy** on accounts that are for friends, not for the public.\n**3. Clean or untag** anything you wouldn't want a scholarship reader or hiring manager to screenshot.\n**4. Publish one proud thing** — a project link, a portfolio page, a thoughtful post about work you care about. Share art, code, writing, or videos you're proud of — this is gold for college and job applications.\n**5. Keep usernames consistent** and professional enough that an email from \`coolgamer99\` isn't the first impression for an internship.\n\n**For seniors especially:** A short public portfolio (Google Site, GitHub, Behance, LinkedIn, or a clean Drive folder with view access) can support college apps, scholarships, and first jobs. One strong artifact beats twenty random posts.\n\n**Decision shortcut before posting:** *Helpful, harmless, or hold?* If it's not clearly helpful or harmless, hold.`,
        bullets: [
          "Audit → privacy → clean → add something proud.",
          "One portfolio link can outshine a blank or messy search result.",
          "Pause on posts that fail the 'teacher/boss/grandparent' test.",
        ],
        callout: {
          label: "Try this week",
          text: "Do a 15-minute mini-audit: search your name, fix one privacy setting, delete or untag one thing you'd rather not own forever, and save one project you're proud of in a place you could share later.",
        },
        checkIn: {
          prompt: "What's a smart way to build a POSITIVE digital footprint for college or a first job?",
          choices: [
            "Make every account public",
            "Post nothing ever, anywhere",
            "Tag yourself in as many photos as possible",
            "Share projects and portfolios you're proud of and post helpfully",
          ],
          correctIndex: 3,
          explanation:
            "Sharing real work and being helpful builds a footprint that actively helps you — often more than just hiding the bad stuff.",
        },
      },
      {
        id: "standards-connect",
        kicker: "Where this fits",
        title: "This is digital citizenship, with a knowledge-building twist",
        body: `Managing your footprint is a central piece of the **ISTE Digital Citizen** standard: managing your personal data to maintain privacy and security, and being aware of the permanence of your online actions and their effects on others and yourself.\n\nBuilding a positive footprint on purpose — a portfolio of projects, writing, or code you're proud of — is also the **ISTE Knowledge Constructor** standard in action: curating and publishing resources that demonstrate meaningful learning, in a way others can find and evaluate.\n\nAnd understanding *why* screenshots, archives, and algorithms make deletion unreliable connects to **CSTA's "Impacts of Computing"** strand — recognizing how the technical design of the internet (copying, caching, sharing) shapes real consequences for real people, long after a single post.`,
        callout: {
          label: "Why it matters",
          text: "Many employers, scholarship committees, and admissions officers search candidates online before deciding — this isn't a hypothetical, it's standard practice.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on — a quick gut-check",
        body: `Think about your own name, typed into a search engine right now.\n\n• Do you actually know what would show up?\n• Is there one thing — a post, an old account, a tag — you'd want cleaned up before someone important looks?\n\nThere's a full reflection question at the end of this lesson. For now, just notice: Sam's scholarship interview moment wasn't really about one bad post — it was about not remembering it was still out there.`,
        callout: {
          label: "Reflect",
          text: "A footprint audit isn't about paranoia. It's a maintenance habit, like cleaning out an inbox — quick, occasional, and worth doing before it matters most.",
        },
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "Case study: two applicants, two footprints",
        body: `Two students, both strong candidates, apply for the same competitive internship. The hiring manager searches both names before the final interview round.\n\n**Applicant A:** The search turns up an old, angry comment thread from two years ago (still visible via a cached screenshot someone shared), a public account with no adjusted privacy settings, and nothing else notable. The hiring manager makes a mental note and moves cautiously.\n\n**Applicant B:** The search turns up a clean, professional-sounding username, a locked-down personal account, and a simple portfolio page linking to a school coding project and a short write-up about a volunteer event. The hiring manager is impressed before the interview even starts.\n\nBoth students are equally qualified on paper. The footprint difference wasn't about talent — it was about a fifteen-minute audit and one published project, done ahead of time, versus never doing either.`,
        callout: {
          label: "Pro tip",
          text: "You can't control every search result, but you can control whether the FIRST thing someone finds is something you're proud of.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before the full knowledge check",
        body: `Quick self-test before the graded questions — can you explain, in one sentence each?\n\n• The difference between active and passive footprint?\n• Why delete doesn't really mean gone?\n• Why \"private\" settings aren't a guarantee of secrecy?\n• One concrete step to build a positive footprint?\n\nIf all four feel solid, you're ready for the graded Knowledge Check.`,
        checkIn: {
          prompt: "Before posting a joke about your workplace (or school) in a story, which is the best quick test?",
          choices: [
            "Did I post recently?",
            "Would I be okay with a teacher, future boss, or grandparent seeing this?",
            "Will this get a lot of likes?",
            "Is it under 280 characters?",
          ],
          correctIndex: 1,
          explanation:
            "The 'would I be okay with them seeing this?' test catches posts that could hurt your reputation with the people who actually check it.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've got the full picture: your **digital footprint** is the trail you leave, split into **active** (what you post) and **passive** (what's collected). Thanks to screenshots, archives, and reshares, **delete doesn't truly erase** — so pause before posting and remember who might be looking, and that "private" isn't a guarantee. Best of all, you can **build a positive footprint** on purpose with a simple audit-and-portfolio habit.\n\nThe goal isn't to disappear online. It's to be the author of your own reputation, so what people find reflects who you really are.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then reflect on one thing you'll change after auditing your footprint.`,
      },
    ],
  },
  bigIdeas: [
    "Your **digital footprint** is the trail of data you leave online — and it tends to stick around.",
    "It's both **active** (what you post) and **passive** (likes, location, search history collected about you).",
    "**Delete rarely means gone**, and \"private\" doesn't guarantee secrecy — real people check your footprint.",
    "Build a **positive footprint** on purpose: a portfolio and helpful posts do more than hiding the bad stuff.",
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
        "The trail of data you leave online through posts, likes, searches, and activity",
        "The battery your phone uses online",
        "The speed of your internet connection",
        "A type of password",
      ],
      correctIndex: 0,
      explanation:
        "Your digital footprint is the overall trail of data you leave behind as you use the internet — both what you post and what's collected about you.",
    },
    {
      id: "q2",
      question: "Your location, search history, and what you click while browsing college sites are part of which footprint?",
      choices: [
        "A deleted footprint",
        "No footprint at all",
        "Passive footprint",
        "Active footprint",
      ],
      correctIndex: 2,
      explanation:
        "Your passive footprint is data collected about you without posting. Your active footprint is the content you choose to share.",
    },
    {
      id: "q3",
      question: "You delete an embarrassing post an hour after sending it, before a job interview next month. Why might it still exist?",
      choices: [
        "Posts can never be deleted by anyone",
        "Deleting always works instantly and fully",
        "Only the government can delete posts",
        "Screenshots, archives, and reshares can keep copies you can't control",
      ],
      correctIndex: 3,
      explanation:
        "Because of permanence, deleting removes only your copy. Screenshots and reshares may already be out there beyond your reach.",
    },
    {
      id: "q4",
      question: "Before posting a joke about your workplace (or school) in a story, which is the best quick test?",
      choices: [
        "Would I be okay with a teacher, future boss, or grandparent seeing this?",
        "Is it under 280 characters?",
        "Did I post recently?",
        "Will this get a lot of likes?",
      ],
      correctIndex: 0,
      explanation:
        "The 'would I be okay with them seeing this?' test catches posts that could hurt your reputation with the people who actually check it.",
    },
    {
      id: "q5",
      question: "What's a smart way to build a POSITIVE digital footprint for college or a first job?",
      choices: [
        "Post nothing ever, anywhere",
        "Make every account public",
        "Share projects and portfolios you're proud of and post helpfully",
        "Tag yourself in as many photos as possible",
      ],
      correctIndex: 2,
      explanation:
        "Sharing real work and being helpful builds a footprint that actively helps you — often more than just hiding the bad stuff.",
    },
    {
      id: "q6",
      question: "You keep your own account private and post nothing embarrassing, but a friend tags you in an old party photo. What does this reveal?",
      choices: [
        "Tags never actually attach to your name",
        "Others can post about you too, so your footprint isn't entirely under your own control",
        "Your footprint is fully in your control as long as you're careful",
        "Private accounts are immune to being tagged",
      ],
      correctIndex: 1,
      explanation:
        "Friends, classmates, and strangers can tag or post about you, which becomes part of your footprint even if you personally posted nothing risky.",
    },
    {
      id: "q7",
      question: "Why isn't a 'private' account setting a full guarantee of secrecy?",
      choices: [
        "Private accounts are always hacked eventually",
        "Private settings don't actually exist on most platforms",
        "Private accounts can't be seen by anyone, ever, including yourself",
        "A follower or friend can screenshot content and share it beyond the private circle",
      ],
      correctIndex: 3,
      explanation:
        "Private settings limit who initially sees your content, but a trusted follower can screenshot and share it — private is not the same as guaranteed secret.",
    },
    {
      id: "q8",
      question: "In the two-applicant case study, what actually created the difference in the hiring manager's impression?",
      choices: [
        "One applicant had more social media followers",
        "One applicant was clearly more qualified on paper",
        "One applicant had done a footprint audit and published a portfolio; the other had an old public comment thread and no cleanup",
        "The hiring manager flipped a coin",
      ],
      correctIndex: 2,
      explanation:
        "Both applicants were equally qualified — the difference was that one had audited their footprint and published a proud project, shaping a better first impression.",
    },
  ],
  reflection: {
    prompt:
      "After thinking about your own footprint, name one thing you'll clean up and one positive thing you could add.",
    placeholder: "Example: I'll untag myself from some old photos, and I'll post the coding project I finished last month…",
  },
};
