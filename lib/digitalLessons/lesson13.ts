import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson13: AILessonConfig = {
  id: "dl-13",
  title: "13. Healthy Tech Habits & Digital Wellbeing",
  goal: "Build healthy technology habits — balancing screen time, protecting your focus and sleep, caring for your mental health, and using your body well — including during college apps, exams, and first-job remote work.",
  xpReward: 650,
  badge: "Balance Keeper",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/12",
  nextHref: "/learn/digital/14",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Be honest: have you ever picked up your phone to check one thing and looked up forty minutes later, not even sure what you actually did? You're not weak, and you're not alone — that feeling is *engineered*. Today is about taking the wheel back.\n\nHere's our roadmap:\n\n• **Not all screen time is equal** — creating and connecting beats endless scrolling.\n• **Why apps are so hard to put down** — the attention tricks built into them.\n• **Focus, sleep, and your mood** — how screens affect all three, and how to protect them.\n• **Your body** — posture, eye breaks, and movement.\n• **A simple healthy-tech routine** you can actually keep.\n• **Senior stretch** — protecting focus during college apps, exams, and remote internships.\n\nThis isn't about quitting technology — you're literally learning on it right now. It's about using it on *your* terms instead of letting it use you.`,
        image: "/images/lessons/dl-13.png",
        imageAlt: "A calm teen setting their phone face-down beside a plant, a book, and a glass of water",
        callout: {
          label: "Why it matters",
          text: "Your attention, sleep, and mood are the fuel for everything you care about — school, friendships, sports, music, games, college apps, and first jobs. Protecting them isn't boring self-care; it's how you get more out of the stuff you actually love.",
        },
      },
      {
        id: "glossary",
        kicker: "Quick start",
        title: "Let's break down the words first",
        body: `Before we dive in, here are the few terms we'll use today — in plain, everyday language. Don't try to memorize them; just get the gist, and each one will click when we reach it.\n\n• **Screen time** — how long you spend looking at a screen: phone, tablet, laptop, or TV.\n• **Notification** — any buzz, ping, or banner an app sends to pull you back in (a text, a "someone liked your post," a game reminder).\n• **The dopamine loop** — dopamine is a "feel-good" chemical your brain makes. Apps hand you tiny hits of it (a new video, a like) so your brain keeps craving *one more* check. That craving cycle is the "loop."\n• **Multitasking vs. task-switching** — "doing five things at once" is really your brain *flipping* quickly between them. That flipping is called task-switching.\n• **FOMO** — short for "fear of missing out": the worry that something fun is happening without you.\n• **Ergonomics** — a fancy word for setting up your body and devices (posture, screen height) so long hours don't hurt you.\n\nThat's the whole vocabulary list. Now let's see how to take the wheel back.`,
        callout: {
          label: "Tip",
          text: "You don't have to memorize this list. Every term is explained again with real examples in the section where it shows up — think of this as a friendly map, not a test.",
        },
      },
      {
        id: "why-it-matters",
        kicker: "Real stakes",
        title: "This isn't just about feeling a little tired",
        body: `It's tempting to file "healthy tech habits" under minor self-care advice. But the effects compound in ways that touch real outcomes:\n\n• **Grades and test performance** track closely with sleep and focus quality — a rested, focused brain simply performs better under pressure, including during exams and timed application essays.\n• **Mood and mental health** are measurably affected by heavy passive scrolling and social comparison, especially during already-stressful seasons like college decisions.\n• **Physical strain adds up silently.** "Tech neck," eye strain, and stiff wrists rarely feel dramatic day to day — they build slowly over years of small posture habits.\n• **Attention is a skill employers and colleges notice**, whether it's finishing a timed exam, staying present in an interview, or meeting a deadline without a dozen distracted restarts.\n\nNone of this is about guilt. It's about noticing that a few specific, learnable habits protect things you already care about — grades, mood, friendships, and how you show up for the things that matter.\n\nThis is also where **ISTE's Empowered Learner** standard lives: setting personal goals and using technology strategically to manage your own learning, focus, and wellbeing, instead of letting a device's defaults manage you.`,
        callout: {
          label: "Why it matters",
          text: "You don't need to overhaul your whole life. The handful of habits in this lesson are chosen because they have an outsized effect on focus, mood, and sleep for a small amount of effort.",
        },
      },
      {
        id: "active-passive",
        kicker: "The big idea",
        title: "Not all screen time is the same",
        body: `People love to say "screen time is bad," but that's way too simple. Two hours of screen time can mean wildly different things:\n\n• **Active / creating screen time** — editing a video, coding, designing, writing, learning a skill, video-calling your grandma, working on a group project, drafting a college essay. You're making something or genuinely connecting.\n• **Passive screen time** — endlessly scrolling a feed, autoplaying video after video, watching without really choosing. The app decides; you just keep going.\n\nBoth are "screen time," but they feel completely different afterward. Creating usually leaves you energized or proud. Doomscrolling usually leaves you a little numb, restless, or weirdly tired.\n\nSo the real question isn't *"how many hours?"* It's *"what kind of hours?"* A useful habit: now and then, ask yourself, **"Am I creating, connecting, or just consuming?"**`,
        bullets: [
          "**Active** = creating, learning, or really connecting.",
          "**Passive** = scrolling and watching on autopilot.",
          "Judge screen time by *what kind* it is, not just the clock.",
        ],
        callout: {
          label: "Common misconception",
          text: "\"All screen time is bad\" isn't true. Coding an app, editing photos, or video-calling a friend is screen time too — and it's very different from doomscrolling for an hour. The type matters more than the total.",
        },
      },
      {
        id: "active-passive-practice",
        kicker: "Apply it",
        title: "Sort your own last hour of screen time",
        body: `Let's make the active-vs-passive idea concrete. Think honestly about the last hour or two you spent on a screen, and sort what you did:\n\n• **Clearly active:** editing a video, writing an essay draft, video-calling a friend with real conversation, coding, drawing digitally.\n• **A gray zone worth noticing:** watching an educational video you chose deliberately (more active than a random autoplay feed, less active than making something yourself).\n• **Clearly passive:** an autoplay feed you didn't choose to keep watching, refreshing the same app over and over out of habit rather than intent.\n\nThe goal isn't a perfect score — it's noticing the pattern. If almost your entire recent screen time falls in the "clearly passive" bucket, that's useful information, not a reason for guilt. It just tells you where the easiest win might be.`,
        checkIn: {
          prompt: "You spend two hours on your phone: 20 minutes texting a friend about weekend plans, and 100 minutes on an autoplay video feed you didn't intend to keep watching. What does the active/passive framework suggest?",
          choices: [
            "Both activities count the same, so there's nothing to notice here",
            "The texting was more active/connecting, while the long autoplay stretch was mostly passive — a good candidate to notice and maybe trim",
            "Neither counts as real screen time",
            "The autoplay time was actually more valuable because it lasted longer",
          ],
          correctIndex: 1,
          explanation:
            "Judging screen time by kind, not just total minutes, highlights that the long autoplay stretch was passive and not something you actively chose minute by minute — exactly the kind of pattern worth noticing.",
        },
        callout: {
          label: "Try this today",
          text: "Tonight, glance at your phone's screen-time report and sort the top two or three apps into active or passive. You'll likely spot your biggest opportunity in under a minute.",
        },
      },
      {
        id: "attention",
        kicker: "Concept",
        title: "Apps are designed to grab your attention — on purpose",
        body: `Here's something the apps don't put in big letters: many of them are *built* to keep you scrolling as long as possible. The longer you stay, the more ads you see, so your attention is literally what they sell.\n\nThink of your attention like a **budget** — a limited amount of focus you get to spend each day. Apps are designed to spend that budget *for* you, before you even decide where you wanted it to go.\n\nThe tricks are clever:\n\n• **Infinite scroll** — the feed never ends, so there's no natural "I'm done" moment.\n• **Autoplay** — the next video starts before you can choose to stop.\n• **Notifications** — little buzzes pull you back in, again and again.\n• **Likes & the "dopamine loop"** — your brain gets a tiny hit of feel-good chemistry every time something new appears or someone reacts to your post, so it keeps wanting *one more* check.\n\nKnowing this is freeing: if putting your phone down feels hard, that's not a character flaw. You're up against teams of engineers. The fix isn't more willpower — it's changing the *setup* so you're not fighting them with bare hands.`,
        image: "/images/lessons/dl-13-2.png",
        imageAlt: "A teen's attention shown as a jar of coins being drained by app icons with an endless scroll arrow and a notification bell",
        callout: {
          label: "Watch out",
          text: "Feeling like you \"can't stop\" isn't a sign that something's wrong with you. These apps are engineered by experts to be hard to put down. That's exactly why design tricks like turning off notifications work better than just trying harder.",
        },
      },
      {
        id: "attention-practice",
        kicker: "Apply it",
        title: "Spot the attention tricks in your own apps",
        body: `Let's name the specific tricks at work in apps you probably already use:\n\n• **A feed with no visible "end"** — you can always scroll one more time. That's **infinite scroll**, engineered to remove the natural stopping point your brain relies on.\n• **A video that starts counting down to the next one automatically** — that's **autoplay**, designed to remove the moment where you'd normally decide whether to keep watching.\n• **A red badge or number on an app icon** — a visual nudge specifically designed to feel slightly uncomfortable until you tap it and make it go away.\n• **"Streaks"** that reset if you don't open an app today — a mechanic borrowed directly from habit-forming game design, built to create a small sense of loss if you skip a day.\n\nNaming these tricks when you see them takes away some of their power — it turns an invisible nudge into a visible, conscious choice.`,
        checkIn: {
          prompt: "A social app shows a small red number badge on its icon every time there's new activity, even if it's minor. What design trick is this, and why does it work?",
          choices: [
            "It's a security feature meant to warn you about hacking attempts",
            "It's a deliberate attention-grabbing nudge — the badge creates a small discomfort that motivates you to open the app and 'clear' it",
            "It's required by law for every app to display",
            "It has no real effect on behavior",
          ],
          correctIndex: 1,
          explanation:
            "Badges and unread counters are intentionally designed to create a small itch to check the app. Recognizing the trick — rather than reacting to it automatically — is the first step to deciding on purpose whether to check.",
        },
        callout: {
          label: "Pro tip",
          text: "Turning off badge numbers (not just notifications) removes one of the sneakiest attention triggers, since it works even when your phone is silent and sitting face-down.",
        },
      },
      {
        id: "multitasking",
        kicker: "Concept",
        title: "The multitasking myth: you're really task-switching",
        body: `A lot of people are sure they can do homework, watch a show, and reply to texts all at once — and do it well. The research says: not really.\n\nYour brain can't truly focus on two demanding things at the same time. What actually happens is **task-switching** — flipping rapidly back and forth. Every switch costs you a little time and focus to "reload" where you were, like restarting a paused video over and over.\n\nThat's why homework with a phone buzzing next to you takes *longer* and comes out *worse*, even though it feels productive. Each notification yanks you out, and it can take several minutes to fully drop back into deep focus.\n\nThe upgrade is **single-tasking**: one task, full attention, distractions parked. Do your homework in a focused block, *then* check your phone. You'll finish faster and have more free time left over.`,
        callout: {
          label: "Common misconception",
          text: "\"I'm great at multitasking\" almost always means \"I'm great at task-switching\" — and task-switching makes you slower and more error-prone. Even people who feel like multitasking pros test worse when measured.",
        },
      },
      {
        id: "sleep",
        kicker: "Concept",
        title: "Screens and sleep don't mix well at night",
        body: `Sleep is when your brain saves memories, repairs your body, and resets your mood. Wreck your sleep and *everything* gets harder — focus, patience, even how funny your friends seem.\n\nLate-night screens hurt sleep in two ways:\n\n• **The content keeps your brain switched on.** One more video, one more message, one more level — your mind stays alert when it should be winding down.\n• **Bright screens can confuse your body clock.** Bright light late at night can make your brain think it's still daytime, so it's slower to feel sleepy.\n\nThe fix is a **wind-down routine**: put screens away a bit before bed and do something calm — read, stretch, listen to music, talk to family. A simple, powerful move is to **charge your phone outside your bedroom** (or at least across the room), so it's not the last thing you see at night or the first thing you grab in the morning.`,
        checkIn: {
          prompt: "You watch exciting, fast-paced videos right up until the moment you try to fall asleep, and then find it hard to actually fall asleep. What's the most likely explanation?",
          choices: [
            "Videos have no effect on sleep at all",
            "Engaging content keeps your brain alert, and bright light late at night can also confuse your body's sense of when to feel sleepy",
            "You simply need a louder alarm in the morning",
            "It only matters what app you're using, not the content or the light",
          ],
          correctIndex: 1,
          explanation:
            "Late-night screens hurt sleep in two ways at once: stimulating content keeps your mind alert, and bright light can delay your body's natural signal that it's time to wind down.",
        },
        callout: {
          label: "Common misconception",
          text: "\"Screens before bed don't affect me — I fall asleep fine.\" You might fall asleep, but late-night scrolling often makes your sleep shorter and lower-quality. You feel it the next day as grogginess, not always at bedtime.",
        },
      },
      {
        id: "comparison",
        kicker: "Concept",
        title: "Feeds are highlight reels, not real life",
        body: `Ever scroll a feed and suddenly feel like everyone else's life is cooler, prettier, and more fun than yours? That's **social comparison**, and feeds are basically machines for triggering it.\n\nHere's the key insight: a feed is a **highlight reel, not the full movie**. People post their best moments — the perfect vacation shot (after 40 tries), the win, the good-hair day, the acceptance letter. You're comparing your *behind-the-scenes* (including the boring and hard parts) to everyone else's *greatest hits*. That's not a fair fight, and it can quietly chip away at your mood and how you see yourself.\n\nThere's also **FOMO** — the "fear of missing out" — that itchy feeling that something better is happening without you, which keeps you checking even when it makes you feel worse.\n\nProtect yourself: remind yourself you're seeing the edited version, follow accounts that make you feel *good* (and mute the ones that don't), and remember that no one's real life looks like their feed — not even the people in those feeds.`,
        callout: {
          label: "Common misconception",
          text: "\"Everyone's life is as perfect as their feed.\" Nope — feeds are curated, filtered, and cherry-picked. Even the influencers you envy have boring, messy, hard days they simply don't post.",
        },
      },
      {
        id: "comparison-practice",
        kicker: "Apply it",
        title: "Scenario: college decision day scrolling",
        body: `It's college decision season. Your feed fills up with celebration posts — acceptance letters, confetti, "so blessed" captions. You're still waiting on decisions and start to spiral a little. Let's think it through.\n\n• **Notice the highlight-reel effect.** You're seeing only the acceptances people chose to post — not the rejections, the waiting, or the stress that came before. The full picture is far messier than the feed shows.\n• **Notice FOMO doing its job.** The urge to keep refreshing "just in case" is exactly the itch these apps are built to create — checking more doesn't make decisions arrive faster.\n• **Choose a response, don't just react.** Reasonable options include: muting the specific accounts posting the most during this stretch, setting a specific check-in time instead of constant refreshing, or talking to a friend offline about how you're actually feeling.\n\nNone of this means you can't be happy for friends — it means separating "being glad for someone" from "measuring your own worth against an edited highlight reel."`,
        checkIn: {
          prompt: "During college decision season, you feel worse every time you check your feed full of acceptance posts. What's a reasonable, healthy response?",
          choices: [
            "Check the feed even more often to make sure you don't miss anything",
            "Temporarily mute the accounts posting the most, or set specific check-in times instead of constant refreshing",
            "Assume your own results don't matter since everyone else already got in somewhere",
            "Post something fake to feel better",
          ],
          correctIndex: 1,
          explanation:
            "You can't control a feed's content, but you can control your exposure to it during a hard stretch — muting or scheduling check-ins protects your mood without requiring you to quit social media entirely.",
        },
        callout: {
          label: "Pro tip",
          text: "During any high-stress season — decision day, finals, tryouts — give yourself permission to temporarily mute or unfollow, even people you like. You can always follow back later; protecting your mood now is not a betrayal.",
        },
      },
      {
        id: "body",
        kicker: "Concept",
        title: "Take care of your body, not just your brain",
        body: `Screens aren't only a mental-focus thing — they're a *physical* thing too. Hours hunched over a phone or laptop add up in your neck, back, eyes, and hands. **Ergonomics** means setting up your tech and your body so they don't hurt you over time.\n\nThe basics are easy:\n\n• **Posture** — sit up, screen near eye level, shoulders relaxed. Looking down at a phone for hours strains your neck (people call it "tech neck").\n• **Eyes — the 20-20-20 rule.** Every **20 minutes**, look at something **20 feet** away for **20 seconds**. It relaxes the eye muscles that get tired from staring at something close.\n• **Move.** Take a movement break every hour — stand, stretch, walk, grab water. Your body is built to move, not to be folded into a chair all day.\n\nNone of this is dramatic. Tiny habits, repeated daily for years, are the difference between feeling good at a screen and aching at one.`,
        bullets: [
          "**Posture:** screen near eye level, sit up, relax your shoulders.",
          "**20-20-20:** every 20 min, look 20 ft away for 20 sec.",
          "**Move:** stand and stretch at least once an hour.",
        ],
        callout: {
          label: "Watch out",
          text: "Signs of overuse to notice in yourself: sore eyes or headaches, a stiff neck, trouble sleeping, feeling anxious when you can't check your phone, or skipping things you used to love. These are cues to adjust — not reasons to feel guilty.",
        },
      },
      {
        id: "level-up-vocabulary",
        kicker: "Level up",
        title: "A few more wellbeing words worth knowing",
        body: `A handful of terms show up once you start reading about attention and habits online. Quick, plain-language versions:\n\n• **Variable reward** — a reward that arrives unpredictably (sometimes a great post, sometimes nothing) instead of every single time. Unpredictable rewards are especially "sticky" for habit formation, which is part of why feeds are so hard to put down.\n• **Digital minimalism** — the practice of intentionally choosing a small number of tools that truly add value, and removing the rest, rather than keeping every app "just in case."\n• **Doomscrolling** — repeatedly scrolling negative or distressing news or content, often without meaning to, and often feeling worse afterward.\n• **Screen-time report** — the built-in feature on most phones that shows exactly how long you spent in each app, useful for the kind of self-audit this lesson keeps coming back to.\n• **Digital wellbeing / digital detox** — general terms for intentionally managing (or temporarily reducing) tech use to protect mood, focus, or sleep.\n\nYou don't need to use every term — recognizing them helps you understand *why* an app behaves the way it does.`,
        checkIn: {
          prompt: "A feed sometimes shows you something amazing and sometimes nothing interesting at all, on an unpredictable schedule. Why does this specific pattern make it hard to stop checking?",
          choices: [
            "Unpredictable ('variable') rewards are especially habit-forming compared to a reward you'd get every single time",
            "It has no special effect compared to a predictable reward",
            "It's designed to be equally exciting every single time you check",
            "Variable rewards only affect video games, not social feeds",
          ],
          correctIndex: 0,
          explanation:
            "Unpredictable, variable rewards are a well-known habit-forming pattern — not knowing whether this check will be the 'good one' keeps people checking more than a reward that arrived reliably every time would.",
        },
        callout: {
          label: "Tip",
          text: "Naming a pattern like 'variable reward' when you notice it in an app is a small but real form of power — it turns an invisible hook into something you can consciously decide how to respond to.",
        },
      },
      {
        id: "senior-focus",
        kicker: "For older teens",
        title: "Focus blocks for college apps, exams & remote work",
        body: `Application season, finals, and remote internships all demand the same scarce resource: **deep focus**. The students and new hires who protect it finish better work in less time.\n\nTry this playbook:\n\n• **Batch the high-stakes work.** Block 45–90 minutes for one essay, one scholarship form, or one internship task. Phone in another room. Focus / Do Not Disturb on.\n• **Separate "research scrolling" from "writing."** Looking up colleges can turn into an hour of TikTok. Decide: research tab open *or* draft open — not both with a feed in the middle.\n• **Protect sleep during crunch weeks.** All-nighters feel productive and usually aren't. A rested brain writes clearer essays and catches more errors on job applications.\n• **Remote internship tip** — calendar your focus blocks the way you'd calendar a meeting. Bosses notice people who deliver on time without living in Slack 24/7.\n\nYounger teens: the same focus-block habit makes homework shorter. Practice it now.`,
        bullets: [
          "One high-stakes task per focus block; phone away.",
          "Don't mix research tabs with endless feeds.",
          "Sleep beats all-nighters for essays and exams.",
          "Treat focus time like a meeting on your calendar.",
        ],
        callout: {
          label: "Pro tip",
          text: "If college decision season or job hunting is stressing you out, mute comparison accounts for a while. Other people's highlight-reel acceptances are not a scoreboard for your worth.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Design your own healthy-tech routine, step by step",
        body: `Let's build a simple routine you could actually start tonight. You don't need to do all of it — even one step helps. We'll walk through four moves that target attention, focus, sleep, and your eyes.\n\n**Step 1 — Clean up notifications.** Go into settings and turn OFF notifications for non-essential apps (games, social feeds, shopping). Keep the important ones (messages from real people, maybe your calendar). Fewer buzzes = fewer attention grabs.\n\n**Step 2 — Set a focus block for homework.** Pick a chunk of time — say 30 minutes — and turn on **Focus / Do Not Disturb** mode. Phone face-down or in another room. One task, full attention. Then take a real break.\n\n**Step 3 — Make a phone-away wind-down before bed.** Choose a "screens off" time (for example, 30–60 minutes before sleep) and charge your phone *outside* your bedroom. Replace the scroll with something calm.\n\n**Step 4 — Add the 20-20-20 rule during screen sessions.** Every 20 minutes, glance at something far away for 20 seconds to rest your eyes.\n\nWrite your version down and stick it somewhere you'll see it. A routine you can see is a routine you'll actually follow.`,
        code: `MY HEALTHY-TECH ROUTINE
1. Notifications: OFF for games + social, ON for messages
2. Homework: 30-min focus block, Do Not Disturb, phone in another room
3. Wind-down: screens off by 9:30pm, phone charges in the kitchen
4. Eyes: 20-20-20 (every 20 min, look 20 ft away for 20 sec)`,
        codeCaption: "A sample routine you can copy and tweak",
        image: "/images/lessons/dl-13-3.png",
        imageAlt: "A simple four-step healthy-tech routine checklist with icons for muted notifications, a focus timer, a bed for sleep, and eyes for breaks",
        callout: {
          label: "Pro tip",
          text: "Don't try to change everything at once — that usually fails. Pick ONE step this week (charging your phone outside your room is a great first one). Once it sticks, add the next.",
        },
      },
      {
        id: "worked-2",
        kicker: "Worked example",
        title: "Building an exam-week focus plan, step by step",
        body: `Now let's apply the same routine-building process to a higher-stakes week: finals or a big application deadline. Step by step:\n\n**Step 1 — Map the real demands.** List what actually needs deep focus this week — three exams, one essay, one form. Everything else is lower priority for now.\n\n**Step 2 — Schedule focus blocks like appointments.** Put 60–90 minute blocks directly on your calendar for each high-stakes task, phone in another room, Do Not Disturb on. Treat them as unmovable, the way you'd treat a class.\n\n**Step 3 — Protect sleep on purpose.** Instead of "I'll sleep when I'm done," pick a firm bedtime for the week and build your study blocks around it, not the other way around — a rested brain studies faster anyway.\n\n**Step 4 — Pre-decide your comparison-app plan.** Since decision or grade anxiety tends to spike during exam weeks, decide in advance: will you mute certain accounts, check social media only after your focus blocks, or take a full break for the week?\n\n**Step 5 — Review after the week.** Notice which parts of the plan actually held and which slipped — that's useful data for your next high-stakes week, not a reason to abandon the plan entirely.`,
        checkIn: {
          prompt: "During finals week, you keep telling yourself 'I'll sleep once I finish studying,' and end up staying up later each night while feeling less focused. What does this lesson suggest instead?",
          choices: [
            "Keep pushing sleep later — focus doesn't depend on sleep",
            "Pick a firm bedtime in advance and build study blocks around it, since a rested brain studies more effectively",
            "Study only right before bed for maximum retention",
            "Sleep has no connection to exam performance",
          ],
          correctIndex: 1,
          explanation:
            "Treating sleep as a fixed anchor — rather than an afterthought — protects focus and memory during exactly the weeks when you need them most. A tired brain studies more slowly and makes more mistakes.",
        },
        callout: {
          label: "Pro tip",
          text: "Write your exam-week plan down before the week starts, not during it. Deciding your bedtime and focus blocks in a calm moment beats deciding them at 11 p.m. while already exhausted.",
        },
      },
      {
        id: "wellbeing-checklist",
        kicker: "Take action",
        title: "Your quick digital-wellbeing check-in",
        body: `Use this short check-in any time you notice you're feeling foggy, cranky, or glued to your phone more than you'd like:\n\n1. **Active vs. passive** — was most of my recent screen time creating/connecting, or passive scrolling?\n2. **Notifications** — are non-essential notifications and badges still buzzing me all day?\n3. **Sleep** — did screens push my bedtime later than I meant, or keep me up once I was already in bed?\n4. **Comparison** — has a feed made me feel worse about my own life lately, and do I need to mute something for a while?\n5. **Body** — any tech neck, eye strain, or stiffness building up that a posture or break habit could fix?\n\nYou don't need a perfect score. Even noticing one honest "not-yet" and adjusting it is the whole point of this check-in.`,
        checkIn: {
          prompt: "You run this check-in and realize notifications are still buzzing you constantly, even though you 'meant' to turn most of them off weeks ago. What's the most useful next step?",
          choices: [
            "Feel guilty and give up on the whole idea",
            "Actually go into settings right now and turn off the non-essential notifications, since noticing the gap is only useful if you act on it",
            "Ignore it since notifications don't really matter",
            "Buy a new phone",
          ],
          correctIndex: 1,
          explanation:
            "A check-in only helps if it leads to a small action. Noticing that notifications are still on is useful exactly because it points to one concrete, doable fix you can make right now.",
        },
        callout: {
          label: "Try this today",
          text: "Set this check-in as a recurring reminder — weekly during a stressful season, monthly otherwise. A quick honest glance beats a New Year's resolution that fades by February.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've got the full picture: **not all screen time is equal** (creating beats consuming), apps are **designed** to grab your attention using tricks like infinite scroll and variable rewards, so it's not your fault it's hard to stop, "multitasking" is really focus-killing **task-switching**, screens hurt **sleep**, feeds are **highlight reels** that fuel comparison and FOMO, and your **body** needs good posture, eye breaks, and movement. Protect focus blocks especially during college apps, exams, and remote work.\n\nThe goal was never to fear technology — it's to use it on purpose. Spend your attention budget where *you* want it to go.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then jot a quick reflection about one healthy-tech habit you'll start this week.`,
      },
    ],
  },
  bigIdeas: [
    "Not all screen time is equal — **creating and connecting** beats passive scrolling.",
    "Apps are **designed** to capture your attention using tricks like infinite scroll and variable rewards, so set up your phone to fight back for you.",
    "Protect your **sleep, focus, mood, and body**: wind down, single-task, and take movement and eye breaks — especially during high-stakes school and work seasons.",
  ],
  keyTerms: [
    { term: "Digital wellbeing", definition: "Using technology in a way that supports — rather than harms — your mental and physical health." },
    { term: "Active vs. passive screen time", definition: "Active = creating, learning, or connecting; passive = scrolling and watching on autopilot." },
    { term: "Attention / notifications", definition: "Your limited daily focus, which apps try to capture — often through buzzing notifications and the dopamine loop." },
    { term: "FOMO", definition: "'Fear of missing out' — the anxious feeling that something better is happening without you." },
    { term: "Ergonomics", definition: "Setting up your tech and your body (posture, screen height) so long-term use doesn't hurt you." },
    { term: "20-20-20 rule", definition: "Every 20 minutes, look at something 20 feet away for 20 seconds to rest your eyes." },
  ],
  realWorld:
    "Tech companies hire focus and attention experts, but so do the people who thrive: workers who protect deep-focus time, sleep well, and take breaks consistently do better and burn out less. Learning this now is a career skill, not just a teen one — and it pays off during college apps and first jobs.",
  quiz: [
    {
      id: "q1",
      question: "You're drafting a college essay for two hours, then doomscrolling for two hours. Which best explains why 'all screen time is bad' is too simple?",
      choices: [
        "Screens are actually good for your eyes",
        "Creating, learning, and connecting are very different from passive doomscrolling",
        "Only adults should worry about screen time",
        "Time spent on a phone doesn't count as screen time",
      ],
      correctIndex: 1,
      explanation:
        "The type of screen time matters more than the total. Writing an essay or video-calling family is active, creative time — very different from endless passive scrolling.",
    },
    {
      id: "q2",
      question: "During finals week you find it really hard to stop scrolling a feed. What's the most accurate takeaway?",
      choices: [
        "You have weak willpower and should feel guilty",
        "The app is designed by experts to be hard to put down, so changing the setup (like notifications) helps more than just trying harder",
        "Nothing can be done — that's just how phones are",
        "You should never use any apps again",
      ],
      correctIndex: 1,
      explanation:
        "Infinite scroll, autoplay, notifications, and the dopamine loop are engineered to hold attention. It's not a character flaw — changing your setup beats relying on willpower alone.",
    },
    {
      id: "q3",
      question: "You're filling out a scholarship form while texting and watching a show. What actually happens when you 'multitask' like that?",
      choices: [
        "Your brain does all three at once, perfectly",
        "You task-switch rapidly, which makes you slower and more error-prone",
        "It always saves time",
        "Your eyes get the benefit of the 20-20-20 rule",
      ],
      correctIndex: 1,
      explanation:
        "There's no true multitasking for demanding work — your brain rapidly switches tasks, and each switch costs focus and time. Single-tasking is faster and better.",
    },
    {
      id: "q4",
      question: "Decision day posts flood your feed and suddenly everyone else's life looks perfect. What's the best reason a feed can make you feel worse?",
      choices: [
        "Feeds always show the full, honest truth about people",
        "A feed is a highlight reel, so you compare your behind-the-scenes to everyone's greatest hits",
        "Your phone is broken",
        "Comparison is impossible online",
      ],
      correctIndex: 1,
      explanation:
        "People post their best, most edited moments. Comparing your everyday reality to others' curated highlights isn't fair — and it can hurt your mood and self-image.",
    },
    {
      id: "q5",
      question: "You're on a laptop all afternoon for a remote internship. Which is a correct use of the 20-20-20 rule?",
      choices: [
        "Take a 20-minute nap after 20 videos",
        "Every 20 minutes, look at something 20 feet away for 20 seconds",
        "Stay 20 inches from the screen at all 20 times",
        "Use your phone for only 20 minutes a day",
      ],
      correctIndex: 1,
      explanation:
        "The 20-20-20 rule rests the eye muscles that strain from staring at something close: every 20 minutes, look 20 feet away for 20 seconds.",
    },
    {
      id: "q6",
      question: "An app shows you a great post sometimes and nothing interesting other times, on an unpredictable schedule. Why does this specific pattern make it especially hard to stop checking?",
      choices: [
        "Unpredictable ('variable') rewards are known to be especially habit-forming compared to a reward that arrives every single time",
        "It has no different effect than a reward you'd always receive",
        "It only affects people who play video games",
        "Predictable rewards are always more addictive than unpredictable ones",
      ],
      correctIndex: 0,
      explanation:
        "Variable, unpredictable rewards are a well-studied habit-forming pattern — not knowing if 'this check' will be the good one keeps people checking more than a reliable reward would.",
    },
    {
      id: "q7",
      question: "During college decision season, you feel worse every time you check a feed full of acceptance posts. What's a reasonable, healthy response?",
      choices: [
        "Check even more often so you don't miss anything",
        "Temporarily mute the accounts posting the most, or set specific check-in times instead of constant refreshing",
        "Conclude your own results don't matter because everyone else already got in somewhere",
        "Post something misleading to feel better",
      ],
      correctIndex: 1,
      explanation:
        "You can't control what a feed shows, but you can control your exposure during a hard stretch. Muting accounts or scheduling check-ins protects your mood without requiring you to quit social media.",
    },
    {
      id: "q8",
      question: "During finals week, you keep saying 'I'll sleep once I finish studying' and end up staying up later each night while feeling less focused. What does this lesson recommend instead?",
      choices: [
        "Keep pushing sleep later since focus has no connection to sleep",
        "Pick a firm bedtime in advance and build study blocks around it, since a rested brain studies more effectively",
        "Only study right before bed for best retention",
        "Sleep only matters during summer break",
      ],
      correctIndex: 1,
      explanation:
        "Treating sleep as a fixed anchor rather than an afterthought protects focus and memory exactly when you need them most — a tired brain studies more slowly and makes more mistakes.",
    },
  ],
  reflection: {
    prompt:
      "Pick ONE healthy-tech habit from this lesson to start this week (for example: charging your phone outside your room, a 30-minute focus block for homework or college apps, or turning off non-essential notifications). Which will you choose, and when will you do it?",
    placeholder: "Example: I'll charge my phone in the kitchen at night so I stop scrolling in bed and sleep better…",
  },
};
