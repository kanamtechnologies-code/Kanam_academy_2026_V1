import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson16: AILessonConfig = {
  id: "dl-16",
  title: "16. Capstone: Evaluate Impacts & Act",
  goal: "Synthesize computing systems, data, networks, and impacts-of-computing themes to evaluate a personal or community digital practice, maximize benefits, minimize harms, and publish an evidence-based action-plan portfolio.",
  xpReward: 800,
  badge: "Impact Evaluator",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/15",
  lessonModule: {
    durationLabel: "~20–25 min capstone",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "Build an evidence-based action portfolio",
        body: `This is it — the capstone for your entire Digital Literacy journey. You started with "how does the internet even work?" and you've arrived at something powerful: you can navigate the digital world *thoughtfully*, *safely*, and *capably*. Today you turn all of that into a toolkit you'll carry for life.\n\nHere's the plan for your capstone:\n\n• A fast recap of every area you've mastered.\n• Why real digital literacy is all those areas **working together**.\n• A **self-audit** checklist to honestly rate your habits.\n• Building your **personal digital-readiness action plan**.\n• A **next-chapter map** for younger teens *and* seniors heading to college, internships, or a first job.\n\nThis is where everything you've learned becomes a set of habits and a plan — the difference between *knowing* about digital life and *living* it well.`,
        image: "/images/lessons/dl-16.png",
        imageAlt: "A graduate holding a toolkit, surrounded by icons for safety, communication, creativity, and career",
        callout: {
          label: "Why it matters",
          text: "New apps, platforms, and risks will keep appearing your whole life. The mindset you build today — staying capable, safe, and always learning — never goes out of date, no matter what technology comes next.",
        },
      },
      {
        id: "recap",
        kicker: "Capstone",
        title: "Look how far you've come — the whole journey",
        body: `Take a moment to see everything you now understand. Across this track you built skills in eight big areas:\n\n• **Tech & internet foundations** — how devices, the web, and **files/cloud** storage actually work.\n• **Finding & judging information** — searching well and telling reliable sources from junk.\n• **Communicating & collaborating** — clear, kind messages and teamwork online.\n• **Digital footprint & citizenship** — the trail you leave and being a good digital citizen.\n• **Creating content + copyright** — making things and respecting others' work.\n• **Security & privacy** — passwords, 2FA, scams, and guarding your data.\n• **Wellbeing & troubleshooting** — healthy habits and calm problem-solving.\n• **Work & career skills** — communication, presence, spreadsheets, professional email, and collaboration tools.\n\nThat's not a pile of random tips. That's a genuine, modern understanding of digital life — the kind most adults never formally learned.`,
        callout: {
          label: "You can now",
          text: "Navigate the internet, judge information, communicate well, protect yourself, create responsibly, stay healthy, troubleshoot calmly, and bring real digital skills to a job. That's full digital literacy.",
        },
      },
      {
        id: "together",
        kicker: "The big idea",
        title: "Real digital literacy is all the areas working together",
        body: `Here's the insight that ties the whole track together: these areas aren't separate boxes. **Real digital literacy is them working as one.**\n\nWatch how they connect in a single moment. You see a shocking post and want to share it. Real digital literacy means you instantly draw on *several* areas at once:\n\n• **Find & judge information** — is this actually true, or misinformation?\n• **Footprint & citizenship** — what does sharing this say about me, and is it kind?\n• **Security & privacy** — is this a scam or a trick to grab my data?\n• **Wellbeing** — is this feed just trying to hijack my attention?\n\nOne everyday decision, four areas firing together. That's the difference between memorizing facts and being genuinely *fluent*. A truly digitally literate person doesn't run a checklist consciously — these habits blend into good instincts, exactly like they did for Alex.\n\nYour goal isn't to recall each lesson. It's to let them merge into how you naturally move through a digital world.`,
        bullets: [
          "The areas overlap — most real choices use several at once.",
          "Fluency means the habits blend into instincts.",
          "Digital literacy is creating *and* protecting *and* connecting, not just safety.",
        ],
        image: "/images/lessons/dl-16-2.png",
        imageAlt: "Several digital-skill icons (a magnifying glass, a shield, a heart, and a footprint) connecting like puzzle pieces into one brain shape",
        callout: {
          label: "Common misconception",
          text: "\"Being digitally literate is just about staying safe.\" Safety is only one piece. It's equally about creating, communicating, collaborating, judging information, and bringing real skills to work and life.",
        },
        checkIn: {
          prompt: "You see a shocking post in a group chat and feel the urge to share it instantly before a college interview tomorrow. Which response shows real digital literacy — several skills firing at once?",
          choices: [
            "Ignore it because all posts are fake",
            "Check if it's true, consider what sharing says about you, watch for scams, and notice if the feed is hijacking your attention",
            "Share immediately so others see it fast",
            "Assume anything dramatic must be real",
          ],
          correctIndex: 1,
          explanation:
            "One real decision draws on information literacy, citizenship, security, and wellbeing together. That blend of habits is what fluency looks like in action.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Which areas does this moment actually touch?",
        body: `Practice spotting the overlap yourself. A classmate DMs you a link to a "free gift card" quiz that also asks you to enter your school email and share it with five friends to unlock the prize.\n\nWalk through which areas of your toolkit light up:\n\n• **Security & privacy** — a "free gift card" that asks for your email and pressures you to share it fast has classic scam signals.\n• **Find & judge information** — is this a real company, or does the link/domain look off?\n• **Footprint & citizenship** — forwarding it to five friends spreads the risk to them too, without their consent.\n• **Wellbeing** — the countdown timer and "unlock now!" urgency is a deliberate attention-grabbing trick.\n\nFour areas, one link. That's not a coincidence — most everyday digital decisions are like this once you know to look.`,
        checkIn: {
          prompt: "A 'free gift card' link asks for your school email and urges you to forward it to five friends before a countdown ends. How many of your toolkit areas does this single moment actually touch?",
          choices: [
            "Only wellbeing, because of the countdown timer",
            "Only security, since it's asking for information",
            "None — it's just a harmless quiz",
            "Several at once — security/privacy, judging information, citizenship (spreading risk to friends), and wellbeing (urgency tricks)",
          ],
          correctIndex: 3,
          explanation:
            "A single scam-style link routinely touches multiple areas at once: security (data grab), information literacy (is it real?), citizenship (forwarding risk to others), and wellbeing (manufactured urgency).",
        },
        callout: {
          label: "Pro tip",
          text: "When something online feels urgent, free, and asks you to share it fast, treat that combination itself as a signal — it's the classic shape of a scam, regardless of the specific prize.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "Two myths that quietly undercut digital literacy",
        body: `Two comfortable myths are worth killing before you finish this track.\n\n**Myth 1 — "I grew up with a phone, so I already know all this."** Using apps fluently isn't the same as judging information, protecting your privacy, or managing your footprint well. Being fast at swiping and typing is a different skill from being thoughtful about what you swipe past or type. Plenty of "digital natives" fall for scams, overshare, or doomscroll — comfort with technology doesn't automatically include wisdom about it.\n\n**Myth 2 — "I finished this track, so I'm done learning this stuff."** Tools, scams, and platforms keep changing. The habits you built here — pause before sharing, question a permission, audit your footprint — are durable, but the specific apps and tricks you'll face in five years don't exist yet. The finish line here is a mindset, not a stopping point.\n\nBoth myths share a root: mistaking familiarity or a completed course for mastery. Real digital literacy keeps being practiced.`,
        callout: {
          label: "Myth check",
          text: "Growing up online builds speed, not automatically judgment. Finishing a track builds a foundation, not a finish line. Both need ongoing, deliberate practice.",
        },
      },
      {
        id: "audit",
        kicker: "Capstone",
        title: "Self-audit: honestly rate your digital habits",
        body: `Time to look in the mirror — honestly. For each question, give yourself a quick yes / sort-of / not-yet. There's no grade; this is just to find your next move.\n\n• **Security:** Do I use strong, unique passwords and turn on **two-factor authentication (2FA)**?\n• **Footprint:** Is my public online footprint clean — stuff I'd be fine with a teacher, college, or future boss seeing?\n• **Information:** Do I fact-check before I share, instead of spreading things on impulse?\n• **Wellbeing:** Do I have healthy tech habits — protecting my focus, sleep, and mood?\n• **Troubleshooting:** Can I stay calm and work a tech problem instead of panicking?\n• **Work skills:** Do I have basic productivity and **spreadsheet** skills (\`=SUM()\`, \`=AVERAGE()\`) and can I write a clear professional email?\n• **Senior check (if it applies):** Are my college/scholarship/job accounts locked down, and do I export application files as clean PDFs?\n\nThe "not-yet" answers aren't failures — they're your roadmap. Everybody has a few. The whole point of the next step is to turn one or two of them into "yes."`,
        callout: {
          label: "Be honest",
          text: "This audit only helps if you're real with yourself. Nobody else sees it. A truthful 'not-yet' that you fix beats a fake 'yes' that leaves you exposed.",
        },
        checkIn: {
          prompt: "You're honestly filling out the self-audit and get several 'not-yet' answers. What does that mean?",
          choices: [
            "You've found your real roadmap — those 'not-yet' answers become the specific next steps in your action plan",
            "You failed the track and need to redo it",
            "You should give up on digital literacy entirely",
            "Nothing — the audit doesn't matter either way",
          ],
          correctIndex: 0,
          explanation:
            "The self-audit isn't graded. Its whole purpose is to surface honest gaps so your action plan targets exactly what needs work, instead of vague, unfocused effort.",
        },
      },
      {
        id: "level-up-vocabulary",
        kicker: "Level up",
        title: "A few last words worth knowing",
        body: `A handful of terms describe the mindset behind everything you've built. Quick, plain definitions to carry forward:\n\n• **Transferable skill** — a skill learned in one context (like troubleshooting a laptop) that works in totally different contexts too (like debugging a group-project conflict).\n• **Adaptive expertise** — being good not just at solving familiar problems, but at figuring out unfamiliar ones by applying the same underlying process.\n• **Self-directed learner** — someone who notices a skill gap and goes and closes it, without waiting to be assigned a lesson on it.\n• **Digital resilience** — bouncing back calmly from a scam attempt, a tech glitch, or an online conflict instead of being derailed by it.\n\nNotice that none of these are about knowing more facts. They're about how you *respond* when the facts run out — which is exactly what happens the moment a brand-new app or scam shows up next year.`,
        callout: {
          label: "Tip",
          text: "If you remember only one of these words, make it **self-directed learner**. It's the single habit that keeps every other skill in this track current for the rest of your life.",
        },
      },
      {
        id: "plan",
        kicker: "Your toolkit",
        title: "Build a personal digital-readiness action plan",
        body: `A self-audit only matters if it leads to **action**. So let's turn your "not-yet" answers into concrete next steps. A good action plan is short, specific, and *doable* — not a vague wish to "be better online."\n\nPick a few moves like these (each maps to an area you've learned):\n\n• **Security:** set up a **password manager** and turn on **2FA** for your main accounts.\n• **Footprint:** **clean up one social profile** — review old public posts, tighten privacy settings.\n• **Wellbeing:** turn on a **focus / do-not-disturb mode** and charge your phone outside your room.\n• **Work skills:** **learn one spreadsheet formula** for real (\`=SUM()\` is perfect).\n• **Career:** **start a simple portfolio** — even a single doc listing projects you've made.\n• **Senior add-ons:** write one practice **professional email**, export a résumé as **PDF**, or lock down a college/scholarship portal login.\n\nNotice these are all *specific actions with a clear finish*, not "try harder." That's what makes a plan actually happen.\n\nAnd here's the mindset behind it all: be a **lifelong digital learner**. Tools, apps, and risks keep changing, so your plan is never truly "done." You just keep choosing your next small step — and that's exactly what being job-ready and a capable digital citizen looks like.`,
        bullets: [
          "Set up a **password manager + 2FA**.",
          "Clean up **one** social profile.",
          "Turn on a **focus mode** and improve sleep habits.",
          "Learn **one spreadsheet formula** for real.",
          "Start a **simple portfolio** of your projects.",
        ],
        callout: {
          label: "Common misconception",
          text: "\"Now I'm done learning this.\" Digital literacy is ongoing — new tools and risks appear constantly. The real skill is staying a lifelong learner who keeps taking the next small step.",
        },
        checkIn: {
          prompt: "Which is the strongest example of a good action-plan step for a senior preparing applications?",
          choices: [
            "\"Get better at tech\"",
            "\"Be safer online\"",
            "\"Set up a password manager and turn on 2FA for my email and college portal this weekend\"",
            "\"Use the internet less, somehow\"",
          ],
          correctIndex: 2,
          explanation:
            "Good plan steps are specific, doable, and have a clear finish. 'Turn on 2FA for my email and college portal this weekend' can actually be done; vague goals like 'be safer' can't.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "You, before and after this track",
        body: `A quick, honest snapshot of the shift this track was actually going for.`,
        table: {
          columns: ["Moment", "Before this track", "After this track"],
          values: [
            ["A shocking post appears", "Share first, ask questions later (if ever)", "Pause, check the source, consider what sharing says about you"],
            ["An app asks for a permission", "Tap 'Allow' without reading it", "Ask whether the app's job actually needs it"],
            ["A tech problem appears", "Panic, click randomly, or give up", "Describe it, isolate it, try simple fixes, search the exact error"],
            ["A message to a teacher or boss", "Casual, unclear, no clear ask", "Clear subject, purpose, specific ask, polite sign-off"],
          ],
          rowCount: 4,
        },
        callout: {
          label: "Why it matters",
          text: "None of the 'after' column requires being a genius or an expert. It requires the habits you've now practiced across sixteen lessons — which is exactly why they're worth keeping.",
        },
      },
      {
        id: "real-world-trap",
        kicker: "Real-world trap",
        title: "The 'I'll deal with it later' trap",
        body: `Here's a trap that catches even people who finished this whole track: knowing the right habit, but pushing it off until a deadline forces the issue.\n\n• Knowing you should turn on 2FA, but doing it only *after* an account gets compromised.\n• Knowing your public profile needs a cleanup, but only searching your own name the night before a scholarship interview.\n• Knowing a portfolio would help your applications, but never starting one until a form specifically asks for a link.\n\nEach of these is completely fixable in minutes — the problem isn't difficulty, it's timing. Doing them *before* they're urgent turns a stressful scramble into a five-minute task you barely notice. The whole value of an action plan (from a few sections ago) is turning "I should do that sometime" into "I did that on this specific date."`,
        callout: {
          label: "Watch out",
          text: "If you notice yourself thinking 'I know I should fix this, I'll do it later,' that's the exact moment to open your action plan and put a real date on it instead.",
        },
      },
      {
        id: "next-chapter",
        kicker: "For every age",
        title: "Your next chapter: school, college, internship, or first job",
        body: `Digital readiness looks a little different depending on where you are — but the toolkit is the same.\n\n**If you're a younger teen (~13–15):** Practice the habits on schoolwork and social life. Lock down passwords and 2FA, clean your footprint once a year, use focus blocks for homework, and make content you're proud of. You're building muscle memory for later.\n\n**If you're a junior/senior (~16–18):** Add high-stakes moves:\n\n• **College / scholarships** — clean public profiles, PDF uploads that meet portal rules, licensed media in video essays, and calm troubleshooting when portals glitch.\n• **Internships / first job** — professional email, a simple portfolio or résumé, spreadsheet basics, and skepticism toward fake "you've been selected" messages.\n• **Shared work** — comments and version history in group Docs; clear asks in Slack/email; protect focus on remote tasks.\n\nWherever you are, pick *three* next steps that match your real life — not someone else's highlight reel.`,
        bullets: [
          "Younger teens: practice habits on school + social life.",
          "Seniors: portals, PDFs, professional email, portfolios.",
          "Everyone: security, footprint, focus, lifelong learning.",
          "Choose three steps that fit *your* next chapter.",
        ],
        callout: {
          label: "Pro tip",
          text: "Your plan should fit on one sticky note. If it needs a novel, it's too big — shrink it until each step is doable in one sitting.",
        },
        checkIn: {
          prompt: "Why is 'lifelong learning' the key mindset for digital literacy after you finish this track?",
          choices: [
            "Because once you finish this track, you're done learning",
            "Because technology never changes",
            "Because only experts need to keep learning",
            "Because tools, apps, and risks keep changing, so you keep taking new small steps",
          ],
          correctIndex: 3,
          explanation:
            "Digital life constantly evolves, so digital literacy is never 'finished.' Staying a lifelong learner who keeps taking the next step is what keeps you capable and job-ready.",
        },
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "Case study: Jordan's application week",
        body: `It's the busiest week of Jordan's senior year: three scholarship deadlines in five days. Watch how the whole toolkit shows up, one moment at a time.\n\n**Monday —** A "congratulations, you're pre-selected!" text arrives with a link. Jordan recognizes the too-good-to-be-true pattern, doesn't click, and reports it. *(Security)*\n\n**Tuesday —** A college portal rejects Jordan's PDF résumé. Instead of panicking, Jordan reads the exact error ("file exceeds 5 MB"), compresses it, and resubmits. *(Troubleshooting)*\n\n**Wednesday —** A teacher hasn't replied to a recommendation-letter request. Jordan sends a polite follow-up with a clear subject line and the deadline restated, rather than a vague "did you see my email???" text. *(Communication)*\n\n**Thursday —** Jordan searches their own name before an interview and finds an old, unflattering public post — and quietly deletes it with a day to spare. *(Footprint)*\n\n**Friday —** Exhausted, Jordan feels the pull to doomscroll at midnight before a final deadline, but instead sets a focus timer for one last hour, then sleeps. *(Wellbeing)*\n\nNo single lesson saved Jordan's week. All of them, together, did.`,
        callout: {
          label: "Pro tip",
          text: "Notice that none of Jordan's moves were dramatic or heroic. They were small, calm, practiced habits — exactly the kind this whole track was built to make automatic.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Fill out a digital-readiness plan, step by step",
        body: `Let's model exactly what *you'll* do in the reflection. Meet Maya, finishing this track as a junior. Watch her turn an honest audit into a tiny, real plan.\n\n**Step 1 — Audit honestly.** Maya checks herself: passwords reused across sites (not-yet), footprint mostly fine (sort-of), healthy habits weak — scrolls in bed every night (not-yet), spreadsheet skills basically none (not-yet), professional email awkward (not-yet).\n\n**Step 2 — Pick the most important gaps.** She can't fix everything at once, so she chooses three that matter most to her: security, sleep, and a work skill tied to applications.\n\n**Step 3 — Write specific, doable steps.** Not "be safer," but actual actions:`,
        code: `MAYA'S DIGITAL-READINESS PLAN
1. Security:  Set up a password manager + turn on 2FA for email
              and college portal.  (This weekend)
2. Wellbeing: Charge phone in the kitchen, not my bedroom, so I
              stop scrolling in bed.  (Starting tonight)
3. Work skill: Learn =SUM() + draft one professional email to a
              teacher about a recommendation.  (Next week)

Mindset: this list is never "done" — I'll keep adding next steps.`,
        codeCaption: "A real, specific, finishable action plan",
        image: "/images/lessons/dl-16-3.png",
        imageAlt: "A three-step digital-readiness plan checklist with icons for a security lock, a sleeping moon, and a spreadsheet, each with a 'when' tag",
        callout: {
          label: "Pro tip",
          text: "Make each step pass the 'could I do this in one sitting?' test. 'Turn on 2FA for my email' is a real step; 'be more secure' isn't. Specific + small = actually done.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One last check before the final knowledge check",
        body: `Before the final graded questions, see if you can explain each of these in one sentence:\n\n• What it means for digital literacy areas to work "together" rather than as separate boxes?\n• One myth about being a "digital native" that this capstone corrected?\n• The difference between a vague goal and a real action-plan step?\n• One digital skill from this track you will use this month, and where?\n\nIf all four feel solid, you've genuinely earned the **Digitally Fluent** badge waiting at the end of this lesson.`,
        checkIn: {
          prompt: "A classmate says digital literacy is 'just about not getting hacked.' Which statement best captures what 'real digital literacy' means?",
          choices: [
            "Being able to code",
            "Knowing how to stay safe online and nothing else",
            "All the areas — foundations, information, communication, footprint, creating, security, wellbeing, and work skills — working together",
            "Owning the newest devices",
          ],
          correctIndex: 2,
          explanation:
            "Digital literacy is many overlapping areas working as one. Safety is just one piece alongside creating, communicating, judging information, and career skills.",
        },
      },
      {
        id: "areas-checklist",
        kicker: "Checklist",
        title: "Your eight-area fluency check",
        body: `Use this capstone checklist anytime a digital moment feels messy — most real decisions touch more than one box:\n\n1. **Foundations** — do I understand what's actually happening (device, file, network)?\n2. **Information** — is this claim verified, or am I reacting to a headline?\n3. **Communication** — is my message clear, kind, and going to the right people?\n4. **Footprint** — would I be fine if a stranger saw what I'm about to post?\n5. **Creating** — am I using and crediting content legally and accessibly?\n6. **Security** — is anyone rushing me to share passwords, money, or personal data?\n7. **Wellbeing** — is this feed or app draining my focus or sleep?\n8. **Work skills** — am I organized, professional, and using the right tool for the job?\n\nYou don't run all eight consciously every time. But pausing on even **two or three** in a high-stakes moment is what separates fluency from autopilot.`,
        callout: {
          label: "Try this week",
          text: "Pick one real decision you made online this week and mark which areas it touched. You'll be surprised how often it's more than one.",
        },
        checkIn: {
          prompt: "A viral post asks you to share before verifying, and the account wants your email to 'unlock the full story.' Which areas fire together?",
          choices: [
            "Only security",
            "Only information literacy",
            "Several — information, security, citizenship, and likely wellbeing (urgency)",
            "None — it's just social media",
          ],
          correctIndex: 2,
          explanation:
            "Capstone fluency is spotting overlap. Scammy viral posts routinely hit information literacy, security, citizenship, and attention manipulation at once.",
        },
      },
      {
        id: "fluency-scenario-2",
        kicker: "Mini scenario",
        title: "Second case: the internship offer DM",
        body: `A senior gets a DM: "Congrats — you've been selected for a paid remote internship! Just pay a $50 'processing fee' and send your ID photo today." The profile looks professional. The deadline is tonight.\n\nWatch the toolkit fire:\n\n• **Security** — fees + ID photos + urgency = scam shape.\n• **Information** — no official company site, no interview, no verifiable contact.\n• **Footprint** — sending ID photos to a stranger creates long-term identity risk.\n• **Communication** — a real employer uses official email channels, not pressure DMs.\n• **Work skills** — a real opportunity has a paper trail, not just a countdown.\n\n**Before:** panic-pay and hand over ID.\n**After:** don't click, search the company name + "scam," report the profile, tell a trusted adult. No fee, no ID, no regret.`,
        callout: {
          label: "Watch out",
          text: "Real internships don't ask for upfront fees or ID photos over DM. If it feels like a dream offer with a tonight deadline, that's the urgency talking — not a hiring manager.",
        },
      },
      {
        id: "track-red-flags",
        kicker: "Red flags",
        title: "Sixteen lessons, one pattern: slow down when you see these",
        body: `Across this entire track, the same red flags keep showing up. When you spot them, pause:\n\n• **Urgency + secrecy** — "act now, don't tell anyone."\n• **Too good to be true** — free money, instant wins, dream offers with no process.\n• **Vague messages** — unclear asks that waste everyone's time.\n• **Permission grabs** — apps or sites wanting more data than their job requires.\n• **Emotion-first content** — designed to make you angry or scared before you think.\n• **Permanent-public by default** — posting things you wouldn't want a stranger to find later.\n• **One-layer troubleshooting** — blaming the whole device when the error message points somewhere specific.\n• **Uncredited or stolen content** — "I'll add credit later" on work that represents you.\n\nFluency isn't memorizing sixteen separate lists. It's recognizing that these patterns are the **same habit wearing different costumes**.`,
        callout: {
          label: "Try this week",
          text: "When you notice one red flag this week, name which lesson it connects to. That naming habit is how separate lessons merge into one instinct.",
        },
      },
      {
        id: "junior-senior-map",
        kicker: "Next chapter",
        title: "Where to aim next — by where you are now",
        body: `The same toolkit, different next steps depending on your chapter:\n\n**Younger teens — build the base:**\n• Strong passwords + 2FA on email and school accounts.\n• Fact-check before sharing; kindness in group chats.\n• Basic file organization and calm troubleshooting.\n\n**Seniors — raise the stakes:**\n• Footprint audit before applications; clean PDF exports.\n• Application tracker with real deadlines.\n• Professional email practice; portfolio link ready to share.\n• Scam radar on scholarships, housing, and "internship" DMs.\n\n**Everyone — keep forever:**\n• Lifelong learning mindset; small specific plans, not vague resolutions.\n• Wellbeing habits that protect sleep and focus during crunch weeks.\n\nYou don't have to do everything at once. Pick the column that fits **this month**, not your whole life.`,
        callout: {
          label: "Why it matters",
          text: "Digital readiness isn't one finish line. It's the right next step for the life you're actually in — freshman year, senior spring, or first job search.",
        },
      },
      {
        id: "lifelong-habits",
        kicker: "Habits",
        title: "Five habits that never go out of date",
        body: `Apps will change. These habits won't:\n\n1. **Pause before you share** anything high-stakes — news, drama, personal info.\n2. **Read the clue** — error messages, permissions, domain names, license terms.\n3. **Search yourself twice a year** — and clean up what strangers shouldn't see first.\n4. **Protect sleep and focus** — charge devices away from bed during crunch weeks.\n5. **Learn one new tool on purpose** each year — spreadsheet formula, password manager, portfolio platform.\n\nYou already practiced all five across this track. The capstone job is to keep them **automatic**, not to cram more facts.`,
        callout: {
          label: "Try this week",
          text: "Choose one of the five habits above and set a recurring reminder. Fluency is maintenance, not a one-time achievement.",
        },
      },
      {
        id: "worked-2",
        kicker: "Worked example",
        title: "A second plan: senior year crunch week",
        body: `Meet Jordan, a senior with three deadlines in five days. Instead of one vague "get organized" goal, Jordan writes three **finishable** steps:\n\n**Step 1 — Security (30 min):** turn on 2FA for email and the college portal; move passwords into a manager.\n\n**Step 2 — Work skills (45 min):** build a five-row application tracker; export résumé as \`Lastname_Resume.pdf\` under 5 MB.\n\n**Step 3 — Wellbeing (starting tonight):** phone charges in the kitchen; one 40-minute focus block before scrolling.\n\nNotice: each step has a **time estimate** and a **clear done signal**. That's what makes a capstone plan real instead of inspirational wallpaper.`,
        callout: {
          label: "Pro tip",
          text: "Add a 'when' to every step — 'this weekend,' 'before Friday,' 'starting tonight.' A step without a when is usually a step that doesn't happen.",
        },
        checkIn: {
          prompt: "Which capstone plan step is strongest?",
          choices: [
            "\"Be more organized online\"",
            "\"Use technology responsibly\"",
            "\"Build a five-row application tracker and export my résumé as a PDF under 5 MB by Thursday\"",
            "\"Try harder with digital stuff\"",
          ],
          correctIndex: 2,
          explanation:
            "Strong plan steps are specific, measurable, and time-bound. A tracker plus a properly exported PDF is something you can actually finish and verify.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before the knowledge check — picture yourself in six months",
        body: `Close your eyes for thirty seconds. It's six months from now.\n\n• What digital habit do you hope is **automatic** by then — pausing before sharing, reading error messages, running a footprint check?\n• What **not-yet** from your audit will you have turned into a yes?\n• What **new tool or risk** might have appeared that you won't have a lesson for — and how will you handle it?\n\nThe third question is the whole point of capstone thinking. You won't have a Kanam slide for every future app or scam. But you *will* have the habits to pause, verify, protect, and learn — which is exactly what **adaptive expertise** and being a **self-directed learner** mean in plain English.\n\nYou'll write your formal three-step plan in the reflection after the knowledge check. For now, just notice: you're not leaving this track as someone who memorized facts. You're leaving as someone who knows how to **keep going**.`,
        callout: {
          label: "Reflect",
          text: "The best capstone outcome isn't a perfect score. It's catching yourself using a habit without thinking — and smiling because it worked.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn — finish strong",
        body: `This is the finish line of the entire Digital Literacy track. You can now navigate technology, judge information, communicate and create, protect yourself, stay healthy, troubleshoot calmly, and bring real skills to school, college apps, internships, and a future career — and you understand that true digital literacy is all of that working *together*, for life.\n\nTake the final knowledge check (it pulls from the whole track), then write your own **3-step digital-readiness action plan** in the reflection to earn your **Digitally Fluent** badge.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict). Congratulations — you've become exactly the kind of capable, responsible, lifelong digital learner the real world needs.`,
      },
    ],
  },
  bigIdeas: [
    "A responsible evaluation connects **computing systems, data, networks, and social impacts** instead of treating a digital practice as one isolated choice.",
    "Strong recommendations identify stakeholders, weigh benefits against harms and access tradeoffs, and use evidence that can be checked.",
    "An action-plan portfolio makes a claim, names a measure of success, assigns a timeline and owner, and schedules revision when evidence changes.",
  ],
  keyTerms: [
    { term: "Digital literacy", definition: "The ability to use technology safely, capably, and responsibly across every part of digital life." },
    { term: "Stakeholder", definition: "A person or group affected by a computing practice, including users, nonusers, families, workers, and a community." },
    { term: "Impact evaluation", definition: "A structured judgment of how a computing practice affects people, systems, access, benefits, and harms." },
    { term: "Action-plan portfolio", definition: "A concise collection of a claim, evidence, tradeoff analysis, recommendation, success measure, and revision date." },
    { term: "Lifelong learning", definition: "The habit of continually picking up new tools and skills as technology and risks keep changing." },
    { term: "Adaptive expertise", definition: "Being good at figuring out unfamiliar problems by applying the same underlying process, not just recalling familiar answers." },
  ],
  realWorld:
    "The most valuable people in any workplace aren't the ones who know every tool — they're the ones who can learn any tool, stay safe, communicate clearly, and adapt. This capstone is your launchpad for exactly that — whether your next step is high school, college, an internship, or a first job.",
  quiz: [
    {
      id: "q1",
      question: "A classmate says digital literacy is 'just about not getting hacked.' Which statement best captures what 'real digital literacy' means?",
      choices: [
        "All the areas — foundations, information, communication, footprint, creating, security, wellbeing, and work skills — working together",
        "Knowing how to stay safe online and nothing else",
        "Owning the newest devices",
        "Being able to code",
      ],
      correctIndex: 0,
      explanation:
        "Digital literacy is many overlapping areas working as one. Safety is just one piece alongside creating, communicating, judging information, and career skills.",
    },
    {
      id: "q2",
      question: "You see a shocking post in a group chat and feel the urge to share it instantly before a college interview tomorrow. The digitally literate move pulls on several skills at once. Which response shows that?",
      choices: [
        "Assume anything dramatic must be real",
        "Ignore it because all posts are fake",
        "Share immediately so others see it fast",
        "Check if it's true, consider what sharing says about you, watch for scams, and notice if the feed is hijacking your attention",
      ],
      correctIndex: 3,
      explanation:
        "One real decision draws on information literacy, citizenship, security, and wellbeing together. That blend of habits is what fluency looks like in action.",
    },
    {
      id: "q3",
      question: "You're writing your capstone action plan. What's the point of the self-audit checklist?",
      choices: [
        "To get a grade on your digital habits",
        "To honestly find your 'not-yet' areas so you know what to improve next",
        "To prove you already know everything",
        "To compare yourself to classmates",
      ],
      correctIndex: 1,
      explanation:
        "The audit isn't graded — it's a private, honest mirror. Your 'not-yet' answers become the roadmap for your action plan.",
    },
    {
      id: "q4",
      question: "Which is the strongest example of a good action-plan step for a senior preparing applications?",
      choices: [
        "\"Be safer online\"",
        "\"Use the internet less, somehow\"",
        "\"Set up a password manager and turn on 2FA for my email and college portal this weekend\"",
        "\"Get better at tech\"",
      ],
      correctIndex: 2,
      explanation:
        "Good plan steps are specific, doable, and have a clear finish. 'Turn on 2FA for my email and college portal this weekend' can actually be done; vague goals like 'be safer' can't.",
    },
    {
      id: "q5",
      question: "Why is 'lifelong learning' the key mindset for digital literacy after you finish this track?",
      choices: [
        "Because tools, apps, and risks keep changing, so you keep taking new small steps",
        "Because once you finish this track, you're done learning",
        "Because technology never changes",
        "Because only experts need to keep learning",
      ],
      correctIndex: 0,
      explanation:
        "Digital life constantly evolves, so digital literacy is never 'finished.' Staying a lifelong learner who keeps taking the next step is what keeps you capable and job-ready.",
    },
    {
      id: "q6",
      question: "A friend says 'I grew up with a phone, so I already know all this digital literacy stuff.' What does this capstone say about that idea?",
      choices: [
        "Being fast and comfortable with apps is a different skill from judging information, protecting privacy, and managing a footprint well",
        "Digital natives never fall for scams",
        "Only people over 40 need to learn digital literacy",
        "It's completely true — using apps fluently means you're automatically digitally literate",
      ],
      correctIndex: 0,
      explanation:
        "Comfort with technology (swiping, typing, using apps) doesn't automatically include the judgment skills this track builds — many 'digital natives' still fall for scams or overshare.",
    },
    {
      id: "q7",
      question: "You know you should turn on 2FA and clean up your footprint, but keep putting it off until 'later.' What does this lesson call that trap, and what's the fix?",
      choices: [
        "You should never make an action plan",
        "It's not a real trap — waiting has no downside",
        "The 'I'll deal with it later' trap — the fix is putting a specific date on the action in your plan instead of leaving it vague",
        "Only professionals need to worry about timing",
      ],
      correctIndex: 2,
      explanation:
        "Knowing the right habit isn't enough if it keeps getting pushed off. Turning 'I should do that sometime' into a dated, specific action-plan step is what actually closes the gap.",
    },
    {
      id: "q8",
      question: "Looking back at the whole track, which habit most closely matches learning to pause, check sources, and evaluate accuracy before sharing information?",
      choices: [
        "Posting first so your friends can fact-check for you later",
        "Trusting whatever appears at the top of a search or feed",
        "Designing a logo before reading the assignment",
        "Judging whether a source is accurate and useful before you trust or share it",
      ],
      correctIndex: 3,
      explanation:
        "Evaluating the accuracy, perspective, and usefulness of information sources before trusting or sharing them is exactly what the information-literacy lessons practiced.",
    },
  ],
  reflection: {
    prompt:
      "CAPSTONE PORTFOLIO: Choose one personal or community digital practice. State your claim; identify stakeholders; use evidence from at least two course themes (CS, DA, NI, or IC); evaluate one benefit, one harm, and one access tradeoff; recommend a concrete action; and name a measure plus date to review whether it worked.",
    placeholder: "Practice + claim: … Stakeholders: … Evidence/themes: … Benefit/harm/access tradeoff: … Action + owner: … Success measure + review date: …",
  },
};
