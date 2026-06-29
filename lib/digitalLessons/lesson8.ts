import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson8: AILessonConfig = {
  id: "dl-8",
  title: "8. Being a Good Digital Citizen",
  goal: "Act responsibly, safely, and kindly in online communities — showing empathy, standing up to cyberbullying, reporting harm, and contributing positively.",
  xpReward: 400,
  badge: "🌐 Digital Citizen",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/7",
  nextHref: "/learn/digital/9",
  lessonModule: {
    durationLabel: "~7 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Every group chat, comment section, and game lobby is a community of real people. Being a **good digital citizen** means treating those spaces — and the people in them — with the same care you'd want in person.\n\nHere's our roadmap:\n\n• **Digital citizenship** — using tech responsibly and kindly.\n• **Why people get crueler online** — the "disinhibition effect."\n• **Cyberbullying** — what it is and the real harm it causes.\n• **Bystander vs. upstander** — and exactly what an upstander does.\n• **Reporting, blocking, and positive participation** — making spaces better.\n\nThis is the most important lesson in the track, because it's about how you treat people. The internet runs on millions of small choices — and yours can make someone's day worse or genuinely better.`,
        image: "/images/lessons/dl-8.png",
        imageAlt: "Diverse people connected by friendly chat bubbles around a glowing globe",
        callout: {
          label: "Why it matters",
          text: "Online communities are shared spaces, like a school hallway. How everyone behaves decides whether it's a place people feel safe — and you're one of the people who sets that tone.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "The words we'll use — in plain English",
        body: `This lesson uses a few terms that might be new. Here they are in everyday language.\n\n• **Digital citizenship** — being a good "citizen" of online spaces: using tech responsibly, safely, and kindly.\n• **Disinhibition effect** — a fancy name for a simple thing: people act *bolder and meaner* online because they can't see the other person's face.\n• **Cyberbullying** — using technology to repeatedly hurt, harass, exclude, or humiliate someone.\n• **Bystander** — someone who *sees* harm happening and does *nothing*.\n• **Upstander** — someone who *steps in* to help: refusing to join in, supporting the target, saving proof, and reporting.\n• **Hate speech** — attacking people for things like their race, religion, gender, or identity. It's especially harmful and usually against the rules and the law.\n\nThe two to really hold onto are **bystander** vs. **upstander** — the whole lesson builds toward choosing to be an upstander.`,
        callout: {
          label: "Tip",
          text: "Don't worry about memorizing definitions. The ideas behind them are what matter, and they'll stick as you read the examples.",
        },
      },
      {
        id: "what",
        kicker: "The big idea",
        title: "Digital citizenship: real people, real impact",
        body: `**Digital citizenship** means using technology responsibly, safely, and respectfully — being a good "citizen" of online communities the same way you try to be a good member of your school or town.\n\nHere's the analogy to hold onto: an online community is a **shared space, like a school hallway.** Your behavior in it affects everyone else there. Slam into people and spread nastiness, and the whole hallway feels unsafe. Hold the door and help someone, and the space feels better for everyone.\n\nThe core truth behind digital citizenship is simple but easy to forget: **there's a real person on the other side of every screen.** Every username is a human with feelings, a bad day sometimes, and people who care about them. Good digital citizens never lose sight of that.`,
        callout: {
          label: "Watch out",
          text: "It's easy to treat usernames and avatars like they aren't real people. That gap — forgetting there's a human on the other end — is where most online cruelty begins.",
        },
      },
      {
        id: "disinhibition",
        kicker: "Concept",
        title: "Why people say crueler things online",
        body: `Have you noticed people saying things online they'd never say to your face? There's a name for it: the **online disinhibition effect.**\n\nWhen we talk in person, we see the other person's face — their hurt, their surprise, their tears. That instant feedback naturally holds us back from being cruel. Online, that feedback disappears. You don't see the person flinch. You might be anonymous, or just far away. So the normal brakes on our behavior loosen, and people type things that are harsher, meaner, and more reckless than they'd ever speak aloud.\n\nKnowing this effect exists is powerful, because you can **catch yourself.** When you feel the urge to fire off something cutting, remember: a real person will read it, and you'd probably never say it to their face. Naming the effect helps you beat it.`,
        callout: {
          label: "Common misconception",
          text: "\"It's just online, so it doesn't really count.\" The disinhibition effect makes online words feel weightless, but they land on real people and can hurt just as much as words said in person.",
        },
      },
      {
        id: "cyberbullying",
        kicker: "Concept",
        title: "Cyberbullying and the harm it causes",
        body: `**Cyberbullying** is using technology to repeatedly hurt, harass, or humiliate someone. It takes many forms:\n\n• **Harassment** — sending mean, threatening, or repeated hurtful messages.\n• **Exclusion** — deliberately leaving someone out of a group chat or game to hurt them.\n• **Spreading rumors** — posting lies or embarrassing content about someone.\n• **Impersonation** — pretending to be someone to damage their reputation.\n\nThe harm is real and serious. Because online attacks can be public, constant, and follow someone home on their phone, cyberbullying can cause deep anxiety, depression, and isolation. There's no "safe" place to escape it the way you can sometimes walk away from a problem in person.\n\nAnd "it was just a joke" is not a defense. If it hurts the person on the receiving end, it counts — intent doesn't erase impact.`,
        callout: {
          label: "Common misconception",
          text: "\"It's just a joke.\" Whether something is bullying is measured by its impact on the target, not by whether the sender found it funny. Real harm counts even when harm wasn't 'meant.'",
        },
      },
      {
        id: "line",
        kicker: "Everyday example",
        title: "Where's the line? Joking around vs. bullying",
        body: `Friends tease each other — that's normal, and not every joke is bullying. So how do you tell the difference? Two simple questions help.\n\n**1. Is it mutual?** Real banter goes *both ways* and everyone's smiling. If one person is always the target and never laughing, it's not a two-way joke anymore.\n\n**2. Does it stop when asked?** A friend who's teasing will back off the second you say "okay, that's enough." Someone who keeps going — or does it *more* because it bothers you — has crossed the line.\n\nQuick gut-check examples:\n\n• Two friends swapping silly nicknames they both find funny → **fine.**\n• The group keeps posting an unflattering photo of one classmate after they asked everyone to stop → **bullying.**\n• Leaving one person out of the chat on purpose, again and again, to hurt them → **bullying (exclusion),** even though no one "said" anything mean.\n\nWhen you're unsure, watch the target's reaction, not the joker's. Their feelings are the real measure.`,
        callout: {
          label: "Watch out",
          text: "\"They're being too sensitive\" is how a lot of bullying gets excused. If someone asks you to stop and you don't, that's no longer a joke — it's a choice to keep hurting them.",
        },
      },
      {
        id: "upstander",
        kicker: "Concept",
        title: "Be an upstander, not a bystander",
        body: `When you see someone being targeted, you have a choice. A **bystander** sees it happen and does nothing — and silence can feel to the victim like everyone agrees with the bully. An **upstander** steps in to help.\n\nBeing an upstander doesn't mean starting a fight. It means:\n\n• **Don't pile on.** Don't like, share, or laugh at the cruel post — that fuels it.\n• **Support the target.** A simple private message — "Hey, that wasn't okay. You good?" — means a lot.\n• **Save evidence.** Screenshot what's happening before anyone deletes it.\n• **Report it,** and **tell a trusted adult** if it's serious.\n\nYou don't have to be loud or heroic. Quietly refusing to join in, checking on the person, and reporting the behavior is exactly what an upstander does — and it can change everything for the person being targeted.`,
        image: "/images/lessons/dl-8-2.png",
        imageAlt: "One person stepping forward to stand beside someone who is being targeted online, while others stay back — an upstander supporting the target",
        bullets: [
          "**Bystander** = watches and does nothing.",
          "**Upstander** = doesn't pile on, supports the target, saves evidence, reports.",
          "A short private 'you okay?' message can mean a lot.",
        ],
        callout: {
          label: "Common misconception",
          text: "\"Ignoring cyberbullying is the only thing I can do.\" You have real options: don't amplify it, support the target privately, save evidence, report, and tell an adult.",
        },
      },
      {
        id: "report",
        kicker: "Concept",
        title: "Report, block, and keep communities healthy",
        body: `Every major platform gives you tools to protect yourself and others — learn where they are *before* you need them.\n\n• **Report** — flags content to the platform for breaking the rules. Look for "..." menus or a "Report" option on posts and profiles.\n• **Block** — stops someone from contacting or seeing you. It's not rude; it's a boundary.\n• **Tell a trusted adult** — a parent, teacher, or counselor — especially if there are threats or it won't stop.\n\nTwo more things matter here. **Hate speech** — attacking people for their race, religion, gender, or identity — is especially harmful and is against the rules on most platforms (and can break the law). And being a good citizen isn't only about stopping bad things; it's about **positive participation**: helping others, sharing good information, being inclusive and respectful of differences, and getting involved in communities and causes you care about.\n\nFinally, know that actions have **consequences** — schools can discipline cyberbullying, and serious cases (threats, harassment, hate speech) can have legal consequences too.`,
        bullets: [
          "**Report** harmful content; **block** people who target you.",
          "Tell a trusted adult about threats or anything that won't stop.",
          "Hate speech is harmful and usually against the rules and the law.",
          "Participate positively: help, include, and share good info.",
        ],
        callout: {
          label: "Common misconception",
          text: "\"Anonymous means no consequences.\" People are often less anonymous than they think, and platforms, schools, and police can trace serious harassment, threats, and hate speech.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "You witness bullying in a group chat — what now?",
        body: `Someone in your class group chat starts mocking a classmate, Priya, posting a screenshot of her and calling her names. Others are laughing with 😂 reactions. Here's the upstander response, step by step.\n\n**Step 1 — Don't share or like it.** Reacting or forwarding it spreads the harm and tells the bully they have an audience. Stay out of the pile-on completely.\n\n**Step 2 — Check on Priya.** Send her a private message: "Hey, what they posted wasn't okay. I've got your back — are you doing alright?" That support matters more than you'd think.\n\n**Step 3 — Save evidence.** Screenshot the messages *before* anyone deletes them, so there's proof of what happened.\n\n**Step 4 — Report and block.** Use the app's report tool to flag the posts, and block the person if they come after you for stepping in.\n\n**Step 5 — Tell a trusted adult.** Show the screenshots to a teacher, counselor, or parent — especially since it's targeting a specific person and others joined in.\n\nYou didn't have to start a fight. You refused to fuel it, supported the target, and got help — that's exactly what an upstander does.`,
        image: "/images/lessons/dl-8-3.png",
        imageAlt: "A five-step upstander response shown as icons: a crossed-out share, a supportive private message, a screenshot for evidence, a report flag, and a trusted adult",
        callout: {
          label: "Pro tip",
          text: "Decide *now* that you'll be an upstander, before you're ever in the moment. Having a plan — don't pile on, check in, screenshot, report, tell an adult — makes it far easier to act when it counts.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've learned what it means to be a good **digital citizen**: remember there's a real person behind every screen, watch out for the **disinhibition effect** that makes people crueler online, recognize **cyberbullying** and its real harm, and choose to be an **upstander** — don't pile on, support the target, save evidence, report, and tell an adult.\n\nMost of all, participate positively. Every helpful, kind, inclusive thing you do online makes the shared space better for everyone in it.\n\nWhen you're ready, head to the **Knowledge check**, then reflect on one way you'll be a better digital citizen this week.`,
      },
    ],
  },
  bigIdeas: [
    "**Digital citizenship** = using tech responsibly and kindly, remembering there's a real person behind every screen.",
    "The **online disinhibition effect** makes people crueler when they can't see the other person's face.",
    "Be an **upstander**: don't pile on, support the target, save evidence, report, and tell a trusted adult.",
  ],
  keyTerms: [
    { term: "Digital citizenship", definition: "Using technology responsibly, safely, and respectfully in online communities." },
    { term: "Online disinhibition", definition: "The tendency to say crueler or more reckless things online because you can't see the other person's reaction." },
    { term: "Cyberbullying", definition: "Using technology to repeatedly hurt, harass, exclude, or humiliate someone." },
    { term: "Upstander", definition: "Someone who steps in to help a target — refusing to pile on, supporting them, saving evidence, and reporting." },
    { term: "Bystander", definition: "Someone who sees harm happening online and does nothing." },
    { term: "Reporting/Blocking", definition: "Platform tools to flag harmful content and stop someone from contacting you." },
  ],
  realWorld:
    "Workplaces and online communities have codes of conduct, and people are fired, banned, or even charged over harassment and hate speech. Being a good digital citizen isn't just kind — it protects your future, too.",
  quiz: [
    {
      id: "q1",
      question: "What is the 'online disinhibition effect'?",
      choices: [
        "A setting that speeds up your internet",
        "The tendency to say crueler things online because you can't see the other person's reaction",
        "A type of computer virus",
        "A rule that bans all comments",
      ],
      correctIndex: 1,
      explanation:
        "Without seeing someone's face, our normal brakes on cruelty loosen — so people type things online they'd never say in person.",
    },
    {
      id: "q2",
      question: "A classmate says posting a mean rumor about someone was 'just a joke.' Is that a defense?",
      choices: [
        "Yes — if it's a joke, it can't be bullying",
        "No — bullying is measured by the harm to the target, not the sender's intent",
        "Only if other people laughed",
        "Only on weekends",
      ],
      correctIndex: 1,
      explanation:
        "Impact matters more than intent. If it hurts, humiliates, or harasses the target, it counts as cyberbullying regardless of whether it was 'meant' as a joke.",
    },
    {
      id: "q3",
      question: "You see someone being bullied in a group chat. What does an UPSTANDER do?",
      choices: [
        "Like the post so it's not awkward",
        "Ignore it completely and hope it stops",
        "Avoid piling on, support the target, save evidence, and report it",
        "Join in so you don't become the next target",
      ],
      correctIndex: 2,
      explanation:
        "An upstander refuses to fuel the harm, checks on the target, screenshots evidence, reports it, and tells a trusted adult if it's serious.",
    },
    {
      id: "q4",
      question: "Why is 'anonymous means no consequences' a dangerous myth?",
      choices: [
        "Anonymous accounts can't post anything",
        "People are less anonymous than they think, and serious harassment can be traced by platforms, schools, or police",
        "Anonymity makes the internet slower",
        "It's actually true — nothing can be traced",
      ],
      correctIndex: 1,
      explanation:
        "Platforms, schools, and law enforcement can often trace serious harassment, threats, and hate speech — and there are real disciplinary and legal consequences.",
    },
    {
      id: "q5",
      question: "Which of these is positive digital participation?",
      choices: [
        "Excluding people you don't like from chats",
        "Sharing rumors quickly",
        "Helping others, sharing good information, and being inclusive and respectful",
        "Reacting 😂 to mean posts",
      ],
      correctIndex: 2,
      explanation:
        "Good digital citizenship isn't only avoiding harm — it's actively helping, including others, and improving the shared space for everyone.",
    },
  ],
  reflection: {
    prompt:
      "Describe one specific way you'll act as an upstander or contribute positively online this week.",
    placeholder: "Example: If I see someone getting piled on in a chat, I'll message them privately to check in instead of staying silent…",
  },
};
