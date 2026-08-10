import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson8: AILessonConfig = {
  id: "dl-8",
  title: "8. Equity, Access & Harm Reduction Online",
  goal: "Evaluate equity and access deficits and online harm; use upstanding and reporting practices to reduce bias and harm in digital spaces while refining systems and norms for broader participation.",
  xpReward: 400,
  badge: "Equity Advocate",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/7",
  nextHref: "/learn/digital/9",
  instructorScript: `**Coach's note**
Today's lesson: **Equity, Access & Harm Reduction Online**.

**Goal:** Evaluate equity and access deficits and online harm; use upstanding and reporting practices to reduce bias and harm in digital spaces while refining systems and norms for broader participation.

**How to facilitate**
1. Warm-up: ask students what they already think about "Online harm is also a systems problem".
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
        title: "Online harm is also a systems problem",
        body: `“Be nice online” is not enough. Digital spaces can exclude people through design, access requirements, language, disability barriers, recommendation systems, harassment, and rules that are enforced unevenly. Harm reduction means evaluating what is happening, protecting people in the moment, and improving the practices or systems that made harm easier.\n\nYou will identify equity and access deficits, compare responses to online harm, use reporting and upstanding strategies, and propose changes that reduce bias or broaden participation. These skills apply to a class group chat, a gaming community, a school platform, and a future workplace.`,
        image: "/images/lessons/dl-8.png",
        imageAlt: "Laptop and phone showing a group chat and a game lobby with people connected through messaging apps",
        callout: {
          label: "Why it matters",
          text: "Online communities are shared spaces, like a school hallway. How everyone behaves decides whether it's a place people feel safe — and you're one of the people who sets that tone.",
        },
      },
      {
        id: "hook-story",
        kicker: "Real moment",
        title: "\"That didn't sound like him at all\" — a lobby pile-on",
        body: `Deshawn is known as one of the nicest guys in his friend group. After a rough loss in a ranked game, a stranger's comment sets him off, and he fires back something genuinely cruel in the lobby chat — the kind of thing his friends have never heard him say out loud. Two other strangers pile on with laughing-face reactions. The original player leaves the match and doesn't queue up again for weeks.\n\nLater, Deshawn feels embarrassed. "That's not even how I talk," he tells a friend. He's right — it isn't how he talks *in person*. But typed, in the heat of a loss, with no face to see and strangers egging him on, it came out anyway.\n\nNobody in that lobby was secretly a bad person. They just hit the exact conditions — anonymity, frustration, an audience — that make ordinary people say crueler things online than they ever would face-to-face. This lesson is about recognizing those conditions before they take over.`,
        callout: {
          label: "Keep this in mind",
          text: "Feeling instant regret after typing something cruel is common — which is exactly why it helps to know the pattern ahead of time, not just after the damage is done.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Vocabulary for equity and harm reduction",
        body: `• **Equity** — fairness that accounts for different starting conditions and barriers; it is not simply giving everyone the identical option.\n• **Access deficit** — a barrier that prevents people from fully using or benefiting from a digital space, tool, or service.\n• **Bias** — a pattern that unfairly favors, excludes, or harms some people or groups.\n• **Harm reduction** — actions that lessen damage now while addressing conditions that allow harm to continue.\n• **Upstander** — a person who refuses to amplify harm and takes a safe, useful action to support a target or improve the situation.\n• **Reporting pathway** — the platform, school, workplace, or community process that can investigate and respond to harm.`,
        callout: {
          label: "Tip",
          text: "Don't worry about memorizing definitions. The ideas behind them are what matter, and they'll stick as you read the examples.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "Evaluate who can participate—and who is pushed out",
        body: `Start with evidence, not assumptions. Ask who can access the device, account, content, meeting time, language, captions, moderation help, and reporting tools. Then ask who bears more risk when a space is hostile or poorly designed.\n\nFor example, a required video meeting at one fixed time may exclude students with jobs, caregiving, weak home internet, or different time zones. A school form that works only with a mouse creates a barrier for some keyboard or screen-reader users. A group chat that mocks accents, names, or identities can make participation technically possible but socially unsafe.\n\nEquity is not a vague promise to treat everyone well. It is an evaluation of barriers and a choice to change conditions so more people can participate meaningfully.`,
        callout: {
          label: "Watch out",
          text: "It's easy to treat usernames and avatars like they aren't real people. That gap — forgetting there's a human on the other end — is where most online cruelty begins.",
        },
        checkIn: {
          prompt: "Which question best evaluates whether a digital space has an equity or access deficit?",
          choices: [
            "Who can participate fully, who is blocked, and what condition creates that barrier?",
            "Which user posts the most often?",
            "How many emojis does the group chat use?",
            "Can every participant attend the same live meeting?",
          ],
          correctIndex: 0,
          explanation:
            "Equity evaluation looks for participation barriers and the conditions causing them—not just whether a space has active users.",
        },
      },
      {
        id: "concept-2",
        kicker: "Concept",
        title: "Design choices can amplify harm",
        body: `Online disinhibition matters, but it is not the whole explanation for harm. Platform and community choices can reward outrage, make pile-ons easy, hide reporting tools, or leave targets to do all the work. An anonymous reply feature, a public quote-share, an algorithm that boosts conflict, or weak moderation can change how quickly bias and harassment spread.\n\nEvaluate the system as well as individual behavior. If a harmful post gets hundreds of reactions, the issue is not only the original author. It may also involve reaction design, audience incentives, moderation delays, unclear rules, and bystanders who were never taught a safer response.\n\nThat analysis leads to better solutions: reduce amplification, add clear reporting, preserve evidence responsibly, improve moderation, and create accessible ways to participate without becoming a target.`,
        callout: {
          label: "Common misconception",
          text: "\"It's just online, so it doesn't really count.\" The disinhibition effect makes online words feel weightless, but they land on real people and can hurt just as much as words said in person.",
        },
        checkIn: {
          prompt: "In a game lobby, someone types something they'd never say face-to-face. What is the 'online disinhibition effect'?",
          choices: [
            "A type of computer virus",
            "The tendency to say crueler things online because you can't see the other person's reaction",
            "A rule that bans all comments",
            "A setting that speeds up your internet",
          ],
          correctIndex: 1,
          explanation:
            "Without seeing someone's face, our normal brakes on cruelty loosen — so people type things online they'd never say in person.",
        },
      },
      {
        id: "concept-3",
        kicker: "Concept",
        title: "Cyberbullying — and the choice everyone faces",
        body: `**Cyberbullying** is using technology to repeatedly hurt, harass, or humiliate someone. It takes many forms:\n\n• **Harassment** — sending mean, threatening, or repeated hurtful messages.\n• **Exclusion** — deliberately leaving someone out of a group chat or game to hurt them.\n• **Spreading rumors** — posting lies or embarrassing content about someone.\n• **Impersonation** — pretending to be someone to damage their reputation.\n\nThe harm is real and serious, and it can follow someone home on their phone with no "safe" place to escape it. And "it was just a joke" is not a defense — if it hurts the person on the receiving end, it counts, because impact matters more than intent.\n\nWhen you *see* it happening, you have a choice. A **bystander** watches and does nothing — and silence can feel to the victim like everyone agrees with the bully. An **upstander** steps in: doesn't pile on, supports the target, saves evidence, and reports it.`,
        image: "/images/lessons/dl-8-2.png",
        imageAlt: "Smartphone group chat with one person privately messaging support to a targeted classmate while a report menu is open",
        bullets: [
          "**Bystander** = watches and does nothing.",
          "**Upstander** = doesn't pile on, supports the target, saves evidence, reports.",
          "\"It's just a joke\" isn't a defense — impact matters more than intent.",
        ],
        callout: {
          label: "Common misconception",
          text: "\"Ignoring cyberbullying is the only thing I can do.\" You have real options: don't amplify it, support the target privately, save evidence, report, and tell an adult.",
        },
        checkIn: {
          prompt: "You see someone being bullied in a class group chat. What does an UPSTANDER do?",
          choices: [
            "Like the post so it's not awkward",
            "Avoid piling on, support the target, save evidence, and report it",
            "Join in so you don't become the next target",
            "Ignore it completely and hope it stops",
          ],
          correctIndex: 1,
          explanation:
            "An upstander refuses to fuel the harm, checks on the target, screenshots evidence, reports it, and tells a trusted adult if it's serious.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "You witness bullying in a group chat — what now?",
        body: `Someone in your class group chat starts mocking a classmate, Priya, posting a screenshot of her and calling her names. Others are laughing with 😂 reactions. Here's the upstander response, step by step.\n\n**Step 1 — Don't share or like it.** Reacting or forwarding it spreads the harm and tells the bully they have an audience. Stay out of the pile-on completely.\n\n**Step 2 — Check on Priya.** Send her a private message: "Hey, what they posted wasn't okay. I've got your back — are you doing alright?" That support matters more than you'd think.\n\n**Step 3 — Save evidence.** Screenshot the messages *before* anyone deletes them, so there's proof of what happened.\n\n**Step 4 — Report and block.** Use the app's report tool to flag the posts, and block the person if they come after you for stepping in.\n\n**Step 5 — Tell a trusted adult.** Show the screenshots to a teacher, counselor, or parent — especially since it's targeting a specific person and others joined in.\n\nYou didn't have to start a fight. You refused to fuel it, supported the target, and got help — that's exactly what an upstander does.`,
        image: "/images/lessons/dl-8-3.png",
        imageAlt: "Phone interface showing steps: crossed-out share button, private supportive message, screenshot, report flag, and contacting a trusted adult",
        callout: {
          label: "Pro tip",
          text: "Decide *now* that you'll be an upstander, before you're ever in the moment. Having a plan — don't pile on, check in, screenshot, report, tell an adult — makes it far easier to act when it counts.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "Two myths that let people off the hook",
        body: `Two comfortable myths make cruelty online feel less serious than it is.\n\n**Myth 1 — "I didn't say anything mean, I just reacted / shared it."** Laughing-emoji reactions, shares, and even silent screenshots that get passed around all fuel a pile-on. You don't have to type a single cruel word to amplify harm — an audience is part of what makes bullying feel powerful to the person doing it.\n\n**Myth 2 — "Reporting someone is snitching."** Reporting isn't betrayal — it's the online version of telling a hallway monitor about a real fight. Platforms build report tools specifically so communities can flag harm that breaks the rules. Using them protects people, including possibly you someday.\n\nBoth myths let people feel like bystanders instead of participants. Reacting to harm and staying silent about serious harm are both choices with real effects.`,
        callout: {
          label: "Myth check",
          text: "A laughing reaction on a cruel post isn't neutral — it's an audience reaction, and audiences are exactly what fuel online pile-ons. Silence isn't neutral either when reporting could help.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Bystander, amplifier, or upstander? Sort three reactions",
        body: `Someone posts an unkind photo of a classmate in a group chat with a mocking caption. Three different classmates react. Sort each one.\n\n• **Classmate A** reacts with a laughing emoji and moves on. → **Amplifier** — a reaction still fuels the pile-on, even without typing a word.\n• **Classmate B** sees it, feels uncomfortable, but says nothing and scrolls past. → **Bystander** — no harm added, but no help given either.\n• **Classmate C** doesn't react to the post, privately messages the target "that wasn't okay, you good?", screenshots it, and reports it. → **Upstander** — refuses to fuel it and actively helps.\n\nNotice: being a bystander is better than amplifying, but it still isn't the same as actually helping. The upstander is the only one of the three who changes the outcome for the person being targeted.`,
        checkIn: {
          prompt: "A classmate reacts with a laughing emoji to a mean post but doesn't type anything themselves. What role does that play?",
          choices: [
            "It's neutral and has no effect since no words were typed",
            "It automatically counts as reporting the post",
            "It cancels out the original mean post",
            "It still amplifies the harm, because reactions are a visible audience that fuels a pile-on",
          ],
          correctIndex: 3,
          explanation:
            "Reactions like laughing emojis are a visible, low-effort way to fuel a pile-on. You don't need to type a cruel word to amplify harm — being an audience is part of what makes it feel powerful to a bully.",
        },
        callout: {
          label: "Pro tip",
          text: "Before you react to any post, pause and ask: 'if the target could see who reacted, would I be okay being on that list?' That one pause prevents a lot of accidental amplifying.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Deeper skill",
        title: "Report, block, and keep communities healthy",
        body: `Every major platform gives you tools to protect yourself and others — learn where they are *before* you need them.\n\n• **Report** — flags content to the platform for breaking the rules. Look for "..." menus or a "Report" option on posts and profiles.\n• **Block** — stops someone from contacting or seeing you. It's not rude; it's a boundary.\n• **Tell a trusted adult** — a parent, teacher, or counselor — especially if there are threats or it won't stop.\n\nTwo more things matter here. **Hate speech** — attacking people for their race, religion, gender, or identity — is especially harmful and is against the rules on most platforms (and can break the law). And being a good citizen isn't only about stopping bad things; it's about **positive participation**: helping others, sharing good information, being inclusive and respectful of differences, and getting involved in communities and causes you care about.\n\nFinally, know that actions have **consequences** — schools can discipline cyberbullying, and serious cases (threats, harassment, hate speech) can have legal consequences too.`,
        image: "/images/lessons/dl-8-4.png",
        imageAlt: "Close-up of a phone messaging app with Report and Block options open below a conversation thread",
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
        id: "comparison",
        kicker: "Side by side",
        title: "Bystander vs. upstander, action by action",
        body: `The same moment, two very different sets of choices — laid out side by side.`,
        table: {
          columns: ["Moment", "Bystander", "Upstander"],
          values: [
            ["Sees a cruel post", "Scrolls past silently", "Refuses to like, share, or comment on it"],
            ["Notices the target is upset", "Doesn't check in", "Sends a private supportive message"],
            ["The post keeps escalating", "Waits and hopes it stops", "Screenshots it as evidence"],
            ["The behavior continues", "Never tells anyone", "Reports it and tells a trusted adult"],
          ],
          rowCount: 4,
        },
        callout: {
          label: "Why it matters",
          text: "Neither column requires being loud or confrontational. The upstander column is just a series of small, doable choices — the kind anyone can make, including you.",
        },
      },
      {
        id: "real-world-trap",
        kicker: "Real-world trap",
        title: "The 'it's just a reaction' trap",
        body: `Here's a trap that feels harmless in the moment: reacting to a cruel post with a laughing emoji, a 💀, or even a quote-share that pokes fun — without adding a single unkind word yourself.\n\nIt feels like you're not really "doing" anything. But from the target's point of view, every reaction is a visible name on a public pile-on. A post with 40 laughing reactions feels far worse to receive than one with zero — and you contributed one of those 40, even silently.\n\nThe same trap shows up at work later: forwarding a mean email "just to show a friend," or reacting with a laughing emoji to a coworker being mocked in a group chat. The habit of thinking "I didn't create the harm, I just reacted to it" doesn't hold up — reactions are participation, not neutral observation.`,
        callout: {
          label: "Watch out",
          text: "If you wouldn't want your name on the list of people who reacted to a cruel post, don't react to it — even with something that feels small, like an emoji.",
        },
      },
      {
        id: "habits",
        kicker: "Decision framework",
        title: "Support, report, or escalate? A clear decision guide",
        body: `Not every rough moment needs the same response. Use this ladder — it works in school chats *and* later in workplace channels:\n\n**Level 1 — One-time rude comment, no threat.** Don't pile on. Optionally reply calmly or ignore. Check on the person privately if they seem hurt.\n**Level 2 — Repeated targeting, exclusion, or rumor-spreading.** Don't amplify. Support the target. Screenshot. Report in-app. Tell a trusted adult at school.\n**Level 3 — Threats, hate speech, sexual harassment, or "I'm going to hurt you."** Same upstander steps *plus* escalate immediately to a trusted adult (and, if needed, platform report + school admin). Do not handle Level 3 alone.\n\n**Workplace / internship note:** Companies have codes of conduct. Harassment in Slack, Discord, or email can get people fired — and reporting through HR or a manager is the adult version of telling a trusted adult. The skills transfer.\n\n**Decision shortcut:** If you're asking "is this serious enough?" — screenshot first, support the person, and tell an adult. Better to over-report safety than under-report harm.`,
        bullets: [
          "Level 1: don't fuel it; optional private support.",
          "Level 2: support + evidence + report + adult.",
          "Level 3: threats/hate — escalate immediately; don't go solo.",
          "Same ladder applies later at work under codes of conduct.",
        ],
        callout: {
          label: "Try this week",
          text: "Decide your upstander plan *before* you need it: (1) don't react publicly, (2) private check-in, (3) screenshot, (4) report, (5) tell an adult if it's repeated or scary. Write those five steps in your notes app.",
        },
        checkIn: {
          prompt: "Someone claims an anonymous account means they can harass a classmate (or coworker) with no consequences. Why is that a dangerous myth?",
          choices: [
            "A rushed pass can land on it's actually true — nothing can be traced”; careful readers reject it for this problem",
            "Anonymous accounts can't post anything",
            "Picking “Anonymity makes the internet slower” is a common mix-up that confuses a nearby idea with the right one",
            "People are less anonymous than they think, and serious harassment can be traced by platforms, schools, or police",
          ],
          correctIndex: 3,
          explanation:
            "Platforms, schools, and law enforcement can often trace serious harassment, threats, and hate speech — and there are real disciplinary and legal consequences.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on — a quick gut-check",
        body: `Think back to Deshawn's lobby pile-on from the start of this lesson.\n\n• Have you ever typed something in a chat, comment, or lobby that came out harsher than you meant — because you couldn't see the other person's face?\n• Has there been a moment where you could have been the upstander, but stayed a bystander instead?\n\nThere's a full reflection question at the end of this lesson. For now, just notice: the disinhibition effect doesn't make someone a bad person — it makes a moment feel lower-stakes than it actually is. Naming it in advance is what lets you catch it next time.`,
        callout: {
          label: "Reflect",
          text: "Being an upstander isn't about being fearless. It's about having a plan ready before the moment arrives, so you don't have to decide from scratch under pressure.",
        },
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "Case study: harassment in an internship Slack channel",
        body: `Two summer interns, Maya and Josh, are in the same company Slack channel. A third intern starts posting mocking comments and mean nicknames aimed at Maya every time she asks a question, and a couple of other people react with laughing emojis.\n\n**Josh's first instinct** is to stay out of it — it's not his problem, and calling it out in front of everyone feels awkward. But he remembers the upstander plan: don't react publicly, check in privately, save evidence, report if it continues.\n\nHe sends Maya a quick DM: "Hey, that wasn't cool. You okay?" He screenshots a few of the messages. When it happens again the next day, he flags it to his manager, who escalates it to HR. The intern posting the comments gets a formal warning; Maya later tells Josh the private check-in was what actually helped most.\n\nThe tools were the same ones from this lesson — don't amplify, support privately, screenshot, report — just running inside a company Slack instead of a class group chat.`,
        callout: {
          label: "Pro tip",
          text: "Workplaces have HR and codes of conduct instead of teachers and school counselors, but the upstander steps barely change. Learning this pattern now pays off well beyond school.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before the full knowledge check",
        body: `Quick self-test before the graded questions — can you explain, in one sentence each?\n\n• What the online disinhibition effect is, and why naming it helps?\n• The five things an upstander does, in order?\n• Why a reaction (not just a comment) can still count as amplifying harm?\n• One example of positive digital participation?\n\nIf all four feel solid, you're ready for the graded Knowledge Check.`,
        checkIn: {
          prompt: "Which of these is positive digital participation — in school chats or later at a first job?",
          choices: [
            "Helping others, sharing good information, and being inclusive and respectful",
            "Reacting 😂 to mean posts",
            "Excluding people you don't like from chats",
            "Sharing rumors quickly",
          ],
          correctIndex: 0,
          explanation:
            "Good digital citizenship isn't only avoiding harm — it's actively helping, including others, and improving the shared space for everyone.",
        },
      },
      {
        id: "citizen-checklist",
        kicker: "Checklist",
        title: "The good-citizen quick check",
        body: `Before you post, comment, or pile on in a thread, run this five-point check:\n\n1. **True?** — would I share this if I had to cite a source?\n2. **Kind?** — would I say this to the person's face?\n3. **Useful?** — does this add something, or just add heat?\n4. **Fair?** — am I treating others the way I'd want to be treated online?\n5. **Permanent?** — could I explain this post in two years?\n\nYou won't pass every check every time — nobody does. But running the list on high-stakes moments (drama, politics, someone getting called out) keeps you from becoming the person everyone screenshots later.`,
        callout: {
          label: "Try this week",
          text: "Pick one heated thread you'd normally jump into and run the checklist first. Notice whether your reply changes — that's citizenship in action.",
        },
        checkIn: {
          prompt: "A classmate is getting roasted in a group chat for a mistake they already apologized for. What's the most digitally literate move?",
          choices: [
            "Don't pile on — either stay out of it or defend basic kindness, depending on what's safe for you",
            "Screenshot and share it to a bigger audience",
            "Assume online drama doesn't affect real life",
            "Add your own joke so you fit in",
          ],
          correctIndex: 0,
          explanation:
            "Good digital citizenship includes not amplifying cruelty. Staying out of a pile-on — or pushing back on kindness — is a real skill, not just 'being nice.'",
        },
      },
      {
        id: "upstander-scenario",
        kicker: "Mini scenario",
        title: "Second case: the group chat pile-on",
        body: `A new student joins the class group chat. Within an hour, someone posts an old, embarrassing photo of them with the caption "welcome to our school lol." Reactions roll in fast.\n\n**Before:** everyone treats silence as agreement, the new student stops replying, the photo stays up all week.\n\n**After:** one person DMs the poster: "Not cool — take it down." Another changes the subject with a normal question about homework. A third tells a trusted adult if it doesn't stop. The photo comes down within an hour.\n\nBeing an **upstander** doesn't always mean a public hero speech. Sometimes it's a private DM, a subject change, or reporting when needed. The goal is the same: don't let cruelty be the default setting of your digital spaces.`,
        callout: {
          label: "Watch out",
          text: "Laughing along without posting still counts as piling on. Silence signals permission. A small interrupt — even 'hey, not cool' — can break the pattern.",
        },
      },
      {
        id: "digital-rights-red-flags",
        kicker: "Red flags",
        title: "When 'digital citizenship' is being tested",
        body: `Some online moments are citizenship pop quizzes — easy to fail if you're on autopilot:\n\n• **"It's just a joke"** after someone is clearly hurt — humor isn't a free pass for cruelty.\n• **Pressure to share someone's private info** (address, screenshots, DMs) — that's not loyalty, it's harm.\n• **"Everyone's doing it"** as the only reason to join a pile-on — popularity isn't ethics.\n• **Fake accounts used to harass** — anonymity doesn't make it less real for the target.\n• **Ignoring platform rules** because "they'll never know" — reports and bans are real.\n\nWhen you spot these, slow down. The digitally fluent move is almost never "join faster." It's pause, protect, report, or step away.`,
        callout: {
          label: "Pro tip",
          text: "Save evidence (screenshots, links, timestamps) if you report harassment — but don't forward humiliating content wider just to 'prove' it happened.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've learned what it means to be a good **digital citizen**: remember there's a real person behind every screen, watch out for the **disinhibition effect** that makes people crueler online, recognize **cyberbullying** and its real harm, and choose to be an **upstander** — don't pile on (not even with a reaction), support the target, save evidence, report, and tell an adult. Use the escalate ladder when you're unsure how serious something is.\n\nMost of all, participate positively. Every helpful, kind, inclusive thing you do online makes the shared space better for everyone in it.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then reflect on one way you'll be a better digital citizen this week.`,
      },
    ],
  },
  bigIdeas: [
    "Equity requires evaluating who can participate, who is excluded, and which system conditions create the barrier.",
    "Online harm can be amplified by people, platform design, group norms, and weak response pathways.",
    "Upstanding is harm reduction: do not amplify, support safely, document, report, and escalate when needed.",
    "Digital communities can refine permissions, accessibility, moderation, and norms to reduce bias and broaden participation.",
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
    "Schools, workplaces, platforms, and governments make choices about accessibility, moderation, data, and reporting. People entering careers in design, healthcare, law, business, education, and computing all need to evaluate whether those choices distribute benefits and harms fairly.",
  quiz: [
    {
      id: "q1",
      question: "In a game lobby, someone types something they'd never say face-to-face. What is the 'online disinhibition effect'?",
      choices: [
            "The tendency to say crueler things online because you can't see the other person's reaction",
            "A type of computer virus",
            "A rule that bans all comments",
            "A setting that speeds up your internet",
          ],
      correctIndex: 0,
      explanation:
        "Without seeing someone's face, our normal brakes on cruelty loosen — so people type things online they'd never say in person.",
    },
    {
      id: "q2",
      question: "A classmate says posting a mean rumor about someone in the group chat was 'just a joke.' Is that a defense?",
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
      question: "You see someone being bullied in a class group chat. What does an UPSTANDER do?",
      choices: [
            "Ignore it completely and hope it stops",
            "Like the post so it's not awkward",
            "Avoid piling on, support the target, save evidence, and report it",
            "Join in so you don't become the next target",
          ],
      correctIndex: 2,
      explanation:
        "An upstander refuses to fuel the harm, checks on the target, screenshots evidence, reports it, and tells a trusted adult if it's serious.",
    },
    {
      id: "q4",
      question: "Someone claims an anonymous account means they can harass a classmate (or coworker) with no consequences. Why is that a dangerous myth?",
      choices: [
            "Anonymous accounts can't post anything",
            "Picking “Anonymity makes the internet slower” is a common mix-up that confuses a nearby idea with the right one",
            "It's actually true — nothing can be traced — familiar wording, wrong fit for what the prompt is actually asking",
            "People are less anonymous than they think, and serious harassment can be traced by platforms, schools, or police",
          ],
      correctIndex: 3,
      explanation:
        "Platforms, schools, and law enforcement can often trace serious harassment, threats, and hate speech — and there are real disciplinary and legal consequences.",
    },
    {
      id: "q5",
      question: "Which of these is positive digital participation — in school chats or later at a first job?",
      choices: [
            "Reacting 😂 to mean posts",
            "Sharing rumors quickly",
            "Helping others, sharing good information, and being inclusive and respectful",
            "Excluding people you don't like from chats",
          ],
      correctIndex: 2,
      explanation:
        "Good digital citizenship isn't only avoiding harm — it's actively helping, including others, and improving the shared space for everyone.",
    },
    {
      id: "q6",
      question: "A classmate reacts with a laughing emoji to a cruel post but doesn't type any words themselves. According to this lesson, what role does that play?",
      choices: [
            "None — reactions without words are completely neutral",
            "It automatically reports the post to the platform",
            "It only counts if the reaction is a specific emoji",
            "It still amplifies the harm, since reactions are a visible audience that fuels a pile-on",
          ],
      correctIndex: 3,
      explanation:
        "Reacting to a cruel post — even silently — is a visible form of participation that fuels a pile-on. It's a myth that only typed words count as amplifying harm.",
    },
    {
      id: "q7",
      question: "A teammate hesitates to report a serious threat because they think 'reporting is snitching.' What's the better way to think about it?",
      choices: [
            "Picking “They're right — reporting is always a betrayal” is a common mix-up that confuses a nearby idea with the right one",
            "Reporting is a tool built into platforms specifically so communities can flag harm that breaks the rules and protect people",
            "Some learners answer “Reporting should only ever be used for spam”, yet that does not match the precise idea from the lesson",
            "Reporting guarantees the person will be arrested immediately",
          ],
      correctIndex: 1,
      explanation:
        "Reporting isn't betrayal — it's the intended way to flag content that breaks platform rules, and it's a core upstander move, especially for serious threats or hate speech.",
    },
    {
      id: "q8",
      question: "In the internship Slack case study, what actually helped Maya most?",
      choices: [
            "Maya being told to handle it entirely on her own",
            "Everyone staying quiet so it wouldn't escalate",
            "Josh reacting publicly with an angry emoji in the channel",
            "Josh's private check-in message, alongside screenshotting and reporting the behavior",
          ],
      correctIndex: 3,
      explanation:
        "Josh's private support message, combined with saving evidence and reporting to his manager, mirrored the same upstander steps that work in school chats — and Maya said the private check-in mattered most.",
    },
  ],
  reflection: {
    prompt:
      "Identify one equity, access, or harm problem in a digital space you use. What evidence would you gather, what immediate upstanding action is safe, and what change to the system or group norm would reduce the problem?",
    placeholder: "Example: Our club meetings only happen live after school. I would ask who is excluded, post notes and comments afterward, and create an asynchronous way to vote on decisions.",
  },
};
