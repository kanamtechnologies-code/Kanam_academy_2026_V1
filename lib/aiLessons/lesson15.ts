import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson15: AILessonConfig = {
  id: "ai-15",
  title: "15. AI and the Future of Work",
  goal: "Explore how AI is changing jobs and creativity, why 'AI + human' beats either alone, what skills keep you valuable, and the fairness questions around who bears the cost of that change.",
  xpReward: 750,
  badge: "Future Ready",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/14",
  nextHref: "/learn/ai/16",
  instructorScript: `**Coach's note**
Today's lesson: **AI and the Future of Work**.

**Goal:** Explore how AI is changing jobs and creativity, why 'AI + human' beats either alone, what skills keep you valuable, and the fairness questions around who bears the cost of that change.

**How to facilitate**
1. Warm-up: ask students what they already think about "What you'll learn today".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~20–25 min",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `"Will AI take my job?" is one of the biggest questions of your generation — and the honest answer is more hopeful and more interesting than the scary headlines. Today you'll learn how AI actually changes work, and how to stay valuable in it.\n\nRoadmap:\n\n• Why AI reshapes jobs more than it simply erases them.\n• Why **AI + human** beats AI alone or human alone.\n• The skills that keep *you* valuable — many of which you're building right now.\n• Who bears the cost when a technology disrupts an industry, and what fairness looks like during that transition.\n\nThis is about your future: the classes you take, the hobbies you grow, and the career you'll head toward.`,
        image: "/images/lessons/ai-15-future.png",
        imageAlt: "A person and an AI assistant working together at a desk",
        callout: {
          label: "Why it matters",
          text: "The people who thrive won't be the ones who fear AI or ignore it — they'll be the ones who learn to direct it. That can absolutely be you.",
        },
      },
      {
        id: "hook-story",
        kicker: "Real moment",
        title: "The translator who didn't get replaced — she got promoted",
        body: `When AI translation tools got dramatically better, a professional translator named Elena watched nervously as her agency started using AI to produce first-draft translations in seconds, work that used to take her hours.\n\nHer first fear was obvious: why would anyone need her anymore? But within months, her job actually changed shape rather than disappearing. The agency didn't need fewer human translators — it needed translators who could quickly review, correct, and refine AI drafts, catching cultural nuances and idioms the AI regularly missed. Elena, who was fast and sharp at exactly that kind of review, ended up training other translators on the new workflow and taking on a lead role.\n\nSome of her colleagues who refused to touch the AI tools at all fell behind. The ones who leaned in — treating the AI as a fast first draft, not a threat — became more valuable, not less.`,
        callout: {
          label: "Keep this in mind",
          text: "The people most at risk usually aren't the ones AI is 'better than' — they're the ones who refuse to work alongside it at all.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Future-of-work words in plain English",
        body: `• **Automation** — using machines or AI to do tasks people used to do by hand.\n• **Augmentation** — using AI to make humans more capable, rather than replacing them.\n• **Task vs. job** — a job is a bundle of many tasks; AI often automates individual tasks, not the whole job.\n• **Reskilling** — learning new skills to adapt as jobs change.\n• **AI fluency** — knowing how to use and direct AI tools effectively and responsibly.\n• **Displacement** — when workers lose their jobs specifically because a technology like AI took over their tasks.\n\nKeep "task vs. job" in your back pocket today — it's the single idea that clears up most of the confusion in this debate.`,
        callout: {
          label: "Pro tip",
          text: "Whenever you hear 'AI will replace [some job],' mentally swap in 'AI will automate some tasks within [some job]' and see if the claim still sounds as scary.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "AI changes jobs more than it erases them",
        body: `Every big technology reshaped work. Tractors changed farming; ATMs changed banking; the internet created jobs nobody could have imagined. Some jobs faded, many changed, and brand-new ones appeared. AI is doing the same — just faster.\n\nThe realistic view isn't "robots take all jobs." It's that **tasks** get automated, jobs get rebuilt around AI, and people who can **work with** AI become more productive and valuable.\n\nHere's a surprising example: when ATMs arrived, many predicted bank tellers would vanish. Instead the number of tellers grew for years — their *job* shifted from counting cash to helping customers. AI is likely to reshape far more roles the same way.`,
        callout: {
          label: "Reframe it",
          text: "The question isn't 'will AI take my job?' It's 'how will my job change, and how do I stay the human who directs the AI?'",
        },
        checkIn: {
          prompt: "What's the most realistic view of AI's effect on jobs?",
          choices: [
            "Only robots will have jobs",
            "AI has no effect on work at all",
            "AI reshapes jobs — automating tasks and creating new roles — rewarding people who work with it",
            "AI will take every job and humans won't work",
          ],
          correctIndex: 2,
          explanation:
            "Like past technologies, AI changes the mix of tasks and jobs. Working effectively with AI becomes a key advantage.",
        },
      },
      {
        id: "concept-2",
        kicker: "The winning combo",
        title: "AI + human beats AI alone or human alone",
        body: `In field after field, the best results come from **collaboration**: AI handles speed, drafts, and repetitive grunt work; humans bring judgment, creativity, ethics, and real-world understanding.\n\nThink of AI like a powerful calculator. The calculator didn't make math teachers useless — it freed them to teach deeper thinking. AI is a calculator for words, images, and ideas: it handles busywork so humans can focus on the parts that need a human.\n\nA doctor + AI can catch more than either alone. A writer + AI drafts faster, then the human makes it true and meaningful. The mindset to remember is **augmentation** (AI makes humans more capable), not replacement.`,
        bullets: [
          "AI is great at speed, drafts, summarizing, pattern-finding.",
          "Humans are great at judgment, ethics, creativity, and context.",
          "**Augmentation** = humans and AI doing more together.",
        ],
        checkIn: {
          prompt: "Why does 'AI + human' often beat 'AI alone' or 'human alone'?",
          choices: [
            "Because humans slow the AI down usefully",
            "Because two computers are faster than one",
            "It doesn't — one is always better",
            "AI brings speed and drafts; humans bring judgment, creativity, and ethics",
          ],
          correctIndex: 3,
          explanation:
            "Augmentation combines AI's strengths (speed, pattern-finding) with human strengths (judgment, creativity, ethics).",
        },
      },
      {
        id: "concept-3",
        kicker: "Future-proof yourself",
        title: "The skills that stay valuable",
        body: `As AI handles more routine tasks, deeply human skills rise in value:\n\n• **Critical thinking** — judging whether AI output is right *and* wise.\n• **Creativity** — asking new questions and imagining things AI wouldn't.\n• **Communication & collaboration** — working well with other people.\n• **Adaptability** — learning new tools fast (exactly what you're doing now!).\n• **Ethics** — deciding what *should* be done, not just what *can* be.\n\nAnd a brand-new one: knowing how to **direct AI well** — the entire point of this course.`,
        callout: {
          label: "Good news",
          text: "These skills aren't about out-computing the computer. They're about being a thoughtful, adaptable human — which you can keep growing.",
        },
        checkIn: {
          prompt: "Which skill is likely to become MORE valuable as AI spreads?",
          choices: [
            "Critical thinking — judging whether AI output is correct and wise",
            "Doing repetitive calculations by hand",
            "Memorizing facts you could look up",
            "Typing as fast as possible",
          ],
          correctIndex: 0,
          explanation:
            "As AI handles routine work, human judgment, creativity, and ethics rise in value.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "How one job gets reshaped (not erased)",
        body: `Take something concrete: a **graphic designer**. Many people assume AI image tools will simply replace them. Watch what actually happens.\n\n**Step 1 — Some tasks get automated.** AI can now generate rough drafts, swap colors, and remove backgrounds in seconds — work that used to take hours.\n\n**Step 2 — The job shifts, not vanishes.** Freed from grunt work, the designer spends more time on what AI *can't* do well: understanding the client, choosing what truly fits the brand, and judging what looks right.\n\n**Step 3 — The human + AI designer wins.** They produce more, faster, and better than either a designer with no AI *or* a person with AI but no design sense. The AI made a skilled human more powerful — and a clueless one no more skilled.\n\n**Takeaway:** the role moved from *doing every step by hand* to *directing and judging*. That same pattern repeats across many careers.`,
        code: `Before AI:  designer does every step by hand
With AI:    AI drafts/edits fast  →  human directs, chooses, judges
Result:     same job, reshaped — human skill matters MORE, not less`,
        codeCaption: "Automation of tasks, not elimination of the human",
        callout: {
          label: "Pro tip",
          text: "Future-proofing isn't about out-working the AI. It's about being the human who decides *what's worth doing* and whether the result is actually good.",
        },
      },
      {
        id: "second-example",
        kicker: "Second example",
        title: "AI + human beats either alone",
        body: `A small bakery tracks weekly sales in a spreadsheet — tedious, error-prone. They add an AI tool that flags unusual dips and suggests likely causes (weather, local events, supply gaps).\n\nThe owner still decides what to bake. The AI didn't replace her judgment — it **freed time** from manual scanning so she could focus on recipes, staff, and customers. Revenue steadied because **human context + AI speed** worked together.\n\nNow flip it: another shop let AI ordering run with no human review. It over-ordered perishable ingredients twice. Speed without judgment cost real money.\n\nThe lesson isn't "AI yes" or "AI no." It's **who stays in the loop for the decisions that matter.**`,
        callout: {
          label: "Notice this",
          text: "The valuable pattern is AI handling volume + humans handling values, context, and accountability.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth check",
        title: "\"Only tech jobs are safe\" and \"AI will replace everyone eventually\"",
        body: `Two myths worth busting. First: "only programmers and tech workers need to worry about (or benefit from) AI." In reality, AI is reshaping tasks in nursing, teaching, farming, retail, law, and construction — nearly every field has tasks that are partly automatable and tasks that clearly need a human. AI fluency matters far beyond the tech industry.\n\nSecond myth: "AI will eventually replace every human job, full stop." This assumes AI will become perfectly capable at everything humans do, including judgment, physical dexterity, trust-building, and ethical reasoning in messy real-world situations. History shows technology creates new categories of work as often as it removes old ones — nobody in 1990 could have predicted "social media manager" or "prompt engineer" as jobs.`,
        callout: {
          label: "Myth check",
          text: "\"Only tech workers need AI skills\" and \"AI will replace all jobs eventually\" are both overconfident. AI fluency is a cross-industry skill, and new jobs keep appearing alongside automated tasks.",
        },
        checkIn: {
          prompt: "Is it true that only people in tech careers need to think about AI's effect on their work?",
          choices: [
            "False — AI is reshaping tasks across nearly every field, from healthcare to retail to construction",
            "True — AI only affects programmers and engineers",
            "False, but only in wealthy countries",
            "True, but only for people under 30",
          ],
          correctIndex: 0,
          explanation:
            "AI-driven task changes show up across almost every industry, not just tech — making AI fluency a broadly useful skill.",
        },
      },
      {
        id: "red-flags",
        kicker: "Red flags",
        title: "Future-of-work myths to reject",
        body: `These headlines cause panic or complacency — both are unhelpful:`,
        bullets: [
          "**\"AI will take every job tomorrow.\"** Reality: roles change unevenly; new tasks appear while old ones shrink.",
          "**\"You don't need to learn anything — AI knows it all.\"** Reality: directing and verifying AI is itself a skill.",
          "**\"Only tech geniuses will matter.\"** Reality: communication, ethics, creativity, and domain knowledge still differentiate people.",
          "**\"If your job uses a computer, you're doomed.\"** Reality: jobs that blend human trust with AI tools often grow.",
        ],
        callout: {
          label: "Better frame",
          text: "Ask which parts of a role are repetitive, which need human trust, and where you can add judgment AI can't fake.",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Reshape a job you're curious about",
        body: `Pick a career or hobby you actually care about (yours or a family member's). Then answer:\n\n1. What are 2–3 specific **tasks** in that job that AI could plausibly speed up or automate?\n2. What are 2–3 specific tasks that clearly still need a human — judgment, trust, physical presence, ethics?\n3. What's one skill you could start building now that would make you the person who *directs* AI in that field, instead of competing against it?\n\nThis "task, not job" lens is the exact move that turns a scary headline into a concrete plan.`,
        callout: {
          label: "Stuck for an example?",
          text: "Try it on 'teacher': AI can draft quiz questions and give instant feedback on grammar. A human teacher still builds relationships, motivates struggling students, and makes judgment calls no algorithm can.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Think in tasks, not job titles",
        body: `Here's a more precise version of the "task vs. job" idea: almost every job is really a bundle of many different tasks, each with a different level of AI-automatability. The skill worth building is breaking any job down into its actual tasks before deciding how "at risk" it really is.\n\nFor a nurse: tasks include monitoring vitals (partly automatable with sensors/AI), documenting notes (AI can draft these), and comforting a scared patient or making an urgent judgment call (not automatable — deeply human). The *job* "nurse" isn't simply safe or unsafe; specific *tasks* within it shift.\n\nThis decomposition skill — breaking a big, fuzzy thing (a job) into its smaller parts (tasks) to analyze each one separately — is the same move computer scientists use to break down a hard problem before solving it.`,
        bullets: [
          "List the actual tasks inside a job, not just the job title.",
          "Rate each task: easily automatable, partly automatable, or hard to automate.",
          "The tasks that are 'hard to automate' hint at where your future value will concentrate.",
        ],
      },
      {
        id: "decision-checklist",
        kicker: "Decision checklist",
        title: "Skills that stay valuable alongside AI",
        body: `Invest in capabilities AI amplifies but doesn't replace:`,
        bullets: [
          "**Clear communication** — prompting, explaining, collaborating.",
          "**Critical verification** — catching errors before they spread.",
          "**Ethical judgment** — consent, fairness, disclosure.",
          "**Domain depth** — actually understanding the subject you're applying AI to.",
          "**Adaptability** — learning new tools without losing your core judgment.",
        ],
        checkIn: {
          prompt: "Which skill pair is most likely to stay valuable as AI tools improve?",
          choices: [
            "Memorizing facts AI can retrieve instantly, without questioning them",
            "Clear communication plus critical verification of AI output",
            "Avoiding all technology to stay \"purely human\"",
            "Copy-pasting AI answers faster than classmates",
          ],
          correctIndex: 1,
          explanation:
            "Directing AI well and catching its mistakes are complementary human skills that become more valuable as AI spreads — not less.",
        },
      },
      {
        id: "comparison",
        kicker: "See it side by side",
        title: "How past technologies actually played out",
        body: `The AI panic isn't new — similar fears (and similar real disruptions) accompanied earlier technologies. Seeing the pattern helps calibrate expectations.`,
        table: {
          columns: ["Technology", "Jobs it disrupted", "What actually happened"],
          values: [
            ["Tractors", "Farm laborers", "Farming jobs shrank a lot, but food production surged and new industries (equipment manufacturing) grew"],
            ["ATMs", "Bank tellers", "Teller headcount didn't collapse — the role shifted toward customer service and sales"],
            ["The internet", "Travel agents, print media", "Some roles shrank sharply, but huge new job categories (web design, digital marketing, app development) emerged"],
            ["AI (ongoing)", "Routine writing, data entry, first-draft tasks", "Still unfolding — early signs point to task automation plus new AI-fluency-focused roles"],
          ],
          rowCount: 4,
        },
        checkIn: {
          prompt: "What's the clearest overall pattern from how past technologies disrupted work?",
          choices: [
            "It can seem like new technology has never affected employment in any way, but that reading skips the distinction this question is testing",
            "It can seem like only farming has ever been affected by new technology, but that reading skips the distinction this question is testing",
            "Every new technology destroys jobs permanently with nothing replacing them — familiar wording, wrong fit for what the prompt is actually asking",
            "Technologies typically shrink some roles and tasks while creating new industries and reshaping other jobs, rather than eliminating work entirely",
          ],
          correctIndex: 3,
          explanation:
            "History shows a consistent pattern: real disruption to specific roles and tasks, alongside new industries and reshaped jobs — not simply the end of work.",
        },
      },
      {
        id: "what-good-looks-like",
        kicker: "What good looks like",
        title: "A workplace using AI responsibly",
        body: `Healthy adoption — the kind worth aiming for in any field you enter — usually includes:`,
        bullets: [
          "**Transparent communication** when AI assists customer-facing work.",
          "**Human review** on high-stakes decisions.",
          "**Retraining support** for workers whose tasks shift.",
          "**Fairness checks** so efficiency gains don't fall only on the most vulnerable workers.",
        ],
        callout: {
          label: "Your future role",
          text: "You can be the person who asks these questions in any job — that's leadership, not buzzkill behavior.",
        },
      },
      {
        id: "ethics",
        kicker: "Ethics moment",
        title: "Who bears the cost of this transition?",
        body: `It's easy to say "jobs get reshaped, new ones appear" as if that happens smoothly and fairly for everyone. It doesn't. A worker who's spent 20 years mastering a task that AI suddenly automates doesn't automatically get handed a great new AI-fluent job — retraining takes time, money, and support that isn't always available, especially for workers with fewer resources or in regions with fewer other opportunities.\n\nThis is a real fairness question, not just an economic one: companies and governments that benefit from AI-driven efficiency have a genuine ethical responsibility to invest in retraining, transition support, and honest communication with workers whose roles are changing — not just to celebrate productivity gains while leaving displaced workers to fend for themselves.\n\nAs a future worker (and voter, and citizen), it's worth caring about this even before it affects you directly: how a society handles technological transitions fairly says a lot about its values.`,
        callout: {
          label: "Quick gut-check",
          text: "When you hear about a company using AI to 'cut costs' by automating jobs, ask: what happened to the workers whose tasks were automated — was there real support, or were they just let go?",
        },
      },
      {
        id: "habits",
        kicker: "Make it automatic",
        title: "Four future-of-work habits worth keeping",
        body: `1. **Think in tasks, not job titles**, when sizing up how AI might affect any career.\n2. **Build the human skills** — critical thinking, creativity, ethics, communication — that stay valuable no matter how AI evolves.\n3. **Get comfortable learning new tools fast.** AI fluency itself is becoming a core skill in nearly every field.\n4. **Notice who bears the cost of disruption**, and support fair transitions, not just efficiency gains.`,
        callout: {
          label: "This week",
          text: "Pick one skill from the 'stays valuable' list and find one small way to practice it — in a class, a hobby, or a conversation.",
        },
      },
      {
        id: "transfer-to-life",
        kicker: "Use it for real",
        title: "Practice being \"AI + you\" on a school project",
        body: `On your next team project, assign roles deliberately:\n\n• **AI** — first-draft research summaries, formatting, brainstorming lists.\n• **Humans** — verify facts, choose the argument, write the final analysis, present aloud.\n\nDebrief afterward: where did AI save time? Where would blind trust have hurt quality? That debrief is exactly how professionals improve workflows — you're practicing now.`,
        callout: {
          label: "Transfer this",
          text: "The combo of AI speed and human judgment isn't just a career idea. You can rehearse it on every group assignment.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on...",
        body: `Think back to the career or hobby you analyzed in the "try it" activity. Of the tasks you listed as "hard to automate," which one are you already naturally good at, or excited to get better at?\n\nHold that thought for the reflection at the end of this lesson.`,
      },
      {
        id: "mini-case",
        kicker: "Mini-case",
        title: "The radiologist and the AI that reads scans",
        body: `For years, headlines predicted that AI image-recognition tools would replace radiologists — doctors who read X-rays, CT scans, and MRIs to diagnose disease. AI systems have indeed become very good at spotting certain patterns, sometimes flagging things human eyes miss on a first pass.\n\nBut radiologist jobs didn't disappear. Instead, AI tools became a **second set of eyes**: flagging areas of a scan that deserve closer attention, prioritizing urgent cases so doctors review them faster, and catching some patterns that are easy for tired human eyes to miss during long shifts. The radiologist still makes the actual diagnosis, weighs it against the patient's full history and symptoms, and takes responsibility for the call — none of which the AI can fully do alone.\n\nDemand for radiologists who know how to work *with* these AI tools has actually grown, while radiologists who ignore the tools risk falling behind on speed and thoroughness. It's the same augmentation pattern from earlier in this lesson, playing out in one of the highest-stakes fields there is.`,
        checkIn: {
          prompt: "What actually happened to radiology as AI scan-reading tools improved?",
          choices: [
            "It can seem like radiologists were entirely replaced by AI systems, but that reading skips the distinction this question is testing",
            "AI became a second set of eyes that flags patterns and prioritizes cases, while radiologists still diagnose and take responsibility",
            "AI made radiologists' jobs completely unchanged and irrelevant to learn",
            "Hospitals stopped using any AI tools due to safety concerns. That option sounds confident, but it leaves out the deciding constraint",
          ],
          correctIndex: 1,
          explanation:
            "AI augmented radiologists rather than replacing them — flagging patterns and prioritizing cases while humans made and owned the final diagnosis, exactly the augmentation pattern this lesson describes.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Self-check",
        title: "Spot the future-proof skill",
        body: `One more rep before the graded knowledge check. A student is choosing between spending their free time memorizing more raw facts for trivia versus practicing how to evaluate whether an AI-generated argument is actually well-reasoned and fair.`,
        checkIn: {
          prompt: "Based on this lesson, which activity is a better long-term investment in staying valuable alongside AI?",
          choices: [
            "Memorizing more raw facts, since AI can't look things up",
            "Treat “Neither matters at all for the future of work” as a distractor: close in topic, incorrect for the required answer",
            "Only memorizing facts matters; critical thinking is irrelevant to careers",
            "Practicing critical evaluation of AI-generated reasoning — a skill that stays valuable as AI handles more routine recall",
          ],
          correctIndex: 3,
          explanation:
            "As AI increasingly handles fact recall and routine drafting, the human skill of judging whether output is correct, wise, and fair becomes more valuable, not less.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Your generation won't compete *against* AI — you'll work *alongside* it. The students who thrive will be curious, skeptical, creative, AI-fluent, and mindful of who's affected by the changes AI brings.\n\nOne lesson left: your capstone, where you'll pull the whole course together. First, lock in today's ideas.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict).`,
      },
    ],
  },
  bigIdeas: [
    "AI mostly **reshapes** jobs (automating tasks) rather than simply erasing them.",
    "**AI + human** collaboration beats either working alone.",
    "Human skills — **critical thinking, creativity, ethics, adaptability** — stay valuable.",
    "Technological transitions have real costs, and fairness means supporting the workers affected, not just celebrating efficiency.",
  ],
  keyTerms: [
    { term: "Automation", definition: "Using machines/AI to do tasks that people used to do." },
    { term: "Augmentation", definition: "Using AI to make humans more capable, rather than replacing them." },
    { term: "Task vs. job", definition: "A job is a bundle of many tasks; AI often automates individual tasks, not the whole job." },
    { term: "Reskilling", definition: "Learning new skills to adapt as jobs change." },
    { term: "AI fluency", definition: "Knowing how to use and direct AI tools effectively and responsibly." },
  ],
  realWorld:
    "Graphic designers, translators, and radiologists increasingly use AI to draft, translate, or scan results faster — then apply human judgment to finish the job. The role shifts from doing every step to directing and checking.",
  quiz: [
    {
      id: "q1",
      question: "What's the most realistic view of AI's effect on jobs?",
      choices: [
            "AI has no effect on work at all",
            "Only robots will have jobs",
            "AI will take every job and humans won't work",
            "AI reshapes jobs — automating tasks and creating new roles — rewarding people who work with it",
          ],
      correctIndex: 3,
      explanation:
        "Like past technologies, AI changes the mix of tasks and jobs. Working effectively with AI becomes a key advantage.",
    },
    {
      id: "q2",
      question: "Why does 'AI + human' often beat 'AI alone' or 'human alone'?",
      choices: [
            "It doesn't — one is always better",
            "AI brings speed and drafts; humans bring judgment, creativity, and ethics",
            "Because humans slow the AI down usefully",
            "Because two computers are faster than one",
          ],
      correctIndex: 1,
      explanation:
        "Augmentation combines AI's strengths (speed, pattern-finding) with human strengths (judgment, creativity, ethics).",
    },
    {
      id: "q3",
      question: "Which skill is likely to become MORE valuable as AI spreads?",
      choices: [
            "Typing as fast as possible",
            "Critical thinking — judging whether AI output is correct and wise",
            "Memorizing facts you could look up",
            "Doing repetitive calculations by hand",
          ],
      correctIndex: 1,
      explanation:
        "As AI handles routine work, human judgment, creativity, and ethics rise in value.",
    },
    {
      id: "q4",
      question: "What's the best mindset for your future with AI?",
      choices: [
            "Avoid AI completely to protect my job",
            "Let AI make all my decisions",
            "Hope AI never improves",
            "Become the skilled, skeptical human who directs and checks the AI",
          ],
      correctIndex: 3,
      explanation:
        "Thriving means being AI-fluent and staying the thoughtful human in charge — exactly this course's goal.",
    },
    {
      id: "q5",
      question: "Is it true that only people in tech careers need to think about AI's effect on their work?",
      choices: [
            "True, but only for people under 30",
            "True — AI only affects programmers and engineers",
            "False, but only in wealthy countries",
            "False — AI is reshaping tasks across nearly every field, from healthcare to retail to construction",
          ],
      correctIndex: 3,
      explanation:
        "AI-driven task changes show up across almost every industry, not just tech — making AI fluency a broadly useful skill.",
    },
    {
      id: "q6",
      question: "What's the clearest overall pattern from how past technologies (tractors, ATMs, the internet) disrupted work?",
      choices: [
            "Every new technology destroys jobs permanently with nothing replacing them — familiar wording, wrong fit for what the prompt is actually asking",
            "It can seem like only farming has ever been affected by new technology, but that reading skips the distinction this question is testing",
            "It can seem like new technology has never affected employment at all, but that reading skips the distinction this question is testing",
            "Technologies typically shrink some roles and tasks while creating new industries and reshaping other jobs, rather than eliminating work entirely",
          ],
      correctIndex: 3,
      explanation:
        "History shows a consistent pattern: real disruption to specific roles and tasks, alongside new industries and reshaped jobs — not simply the end of work.",
    },
    {
      id: "q7",
      question: "Why does this lesson argue that fairness matters during AI-driven job transitions?",
      choices: [
            "Because displaced workers don't automatically get support or new opportunities, so companies and governments benefiting from AI have a responsibility to help",
            "A common mix-up is to treat because only wealthy workers are ever affected by automation as enough, which confuses a nearby idea with the right one",
            "A common mix-up is to treat fairness isn't relevant to economic changes as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat because job transitions never actually affect real workers as enough, which confuses a nearby idea with the right one",
          ],
      correctIndex: 0,
      explanation:
        "Technological transitions have real costs that fall unevenly on workers; fairness means investing in retraining and support, not just celebrating efficiency gains.",
    },
    {
      id: "q8",
      question: "In the radiology mini-case, what happened as AI scan-reading tools improved?",
      choices: [
            "Radiologists were fully replaced by AI — familiar wording, wrong fit for what the prompt is actually asking",
            "Nothing changed about the job at all",
            "AI became a second set of eyes flagging patterns, while radiologists still diagnosed and took responsibility",
            "Hospitals banned AI tools entirely",
          ],
      correctIndex: 2,
      explanation:
        "AI augmented radiologists' work rather than replacing them, letting humans focus on diagnosis and judgment while AI flagged patterns and prioritized cases.",
    },
  ],
  reflection: {
    prompt:
      "Think of a job or hobby you care about. How might AI change it (in tasks, not just the job title), and what human skill would make you stand out in it?",
    placeholder: "In the field of ___, AI might handle the task of ___, so I'd focus on getting great at ___.",
  },
};
