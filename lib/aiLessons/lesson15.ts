import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson15: AILessonConfig = {
  id: "ai-15",
  title: "15. AI and the Future of Work",
  goal: "Explore how AI is changing jobs and creativity, why 'AI + human' beats either alone, and what skills keep you valuable.",
  xpReward: 750,
  badge: "Future Ready",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/14",
  nextHref: "/learn/ai/16",
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `"Will AI take my job?" is one of the biggest questions of your generation — and the honest answer is more hopeful and more interesting than the scary headlines. Today you'll learn how AI actually changes work, and how to stay valuable in it.\n\nRoadmap:\n\n• Why AI reshapes jobs more than it simply erases them.\n• Why **AI + human** beats AI alone or human alone.\n• The skills that keep *you* valuable — many of which you're building right now.\n\nThis is about your future: the classes you take, the hobbies you grow, and the career you'll head toward.`,
        image: "/images/lessons/ai-15-future.png",
        imageAlt: "A person and an AI assistant working together at a desk",
        callout: {
          label: "Why it matters",
          text: "The people who thrive won't be the ones who fear AI or ignore it — they'll be the ones who learn to direct it. That can absolutely be you.",
        },
      },
      {
        id: "change",
        kicker: "The big idea",
        title: "AI changes jobs more than it erases them",
        body: `Every big technology reshaped work. Tractors changed farming; ATMs changed banking; the internet created jobs nobody could have imagined. Some jobs faded, many changed, and brand-new ones appeared. AI is doing the same — just faster.\n\nThe realistic view isn't "robots take all jobs." It's that **tasks** get automated, jobs get rebuilt around AI, and people who can **work with** AI become more productive and valuable.\n\nHere's a surprising example: when ATMs arrived, many predicted bank tellers would vanish. Instead the number of tellers grew for years — their *job* shifted from counting cash to helping customers. AI is likely to reshape far more roles the same way.`,
        callout: {
          label: "Reframe it",
          text: "The question isn't 'will AI take my job?' It's 'how will my job change, and how do I stay the human who directs the AI?'",
        },
      },
      {
        id: "augment",
        kicker: "The winning combo",
        title: "AI + human beats AI alone or human alone",
        body: `In field after field, the best results come from **collaboration**: AI handles speed, drafts, and repetitive grunt work; humans bring judgment, creativity, ethics, and real-world understanding.\n\nThink of AI like a powerful calculator. The calculator didn't make math teachers useless — it freed them to teach deeper thinking. AI is a calculator for words, images, and ideas: it handles busywork so humans can focus on the parts that need a human.\n\nA doctor + AI can catch more than either alone. A writer + AI drafts faster, then the human makes it true and meaningful. The mindset to remember is **augmentation** (AI makes humans more capable), not replacement.`,
        bullets: [
          "AI is great at speed, drafts, summarizing, pattern-finding.",
          "Humans are great at judgment, ethics, creativity, and context.",
          "**Augmentation** = humans and AI doing more together.",
        ],
      },
      {
        id: "skills",
        kicker: "Future-proof yourself",
        title: "The skills that stay valuable",
        body: `As AI handles more routine tasks, deeply human skills rise in value:\n\n• **Critical thinking** — judging whether AI output is right *and* wise.\n• **Creativity** — asking new questions and imagining things AI wouldn't.\n• **Communication & collaboration** — working well with other people.\n• **Adaptability** — learning new tools fast (exactly what you're doing now!).\n• **Ethics** — deciding what *should* be done, not just what *can* be.\n\nAnd a brand-new one: knowing how to **direct AI well** — the entire point of this course.`,
        callout: {
          label: "Good news",
          text: "These skills aren't about out-computing the computer. They're about being a thoughtful, adaptable human — which you can keep growing.",
        },
      },
      {
        id: "worked",
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
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Your generation won't compete *against* AI — you'll work *alongside* it. The students who thrive will be curious, skeptical, creative, and AI-fluent.\n\nOne lesson left: your capstone, where you'll pull the whole course together. First, lock in today's ideas.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict).`,
      },
    ],
  },
  bigIdeas: [
    "AI mostly **reshapes** jobs (automating tasks) rather than simply erasing them.",
    "**AI + human** collaboration beats either working alone.",
    "Human skills — **critical thinking, creativity, ethics, adaptability** — stay valuable.",
  ],
  keyTerms: [
    { term: "Automation", definition: "Using machines/AI to do tasks that people used to do." },
    { term: "Augmentation", definition: "Using AI to make humans more capable, rather than replacing them." },
    { term: "Reskilling", definition: "Learning new skills to adapt as jobs change." },
    { term: "AI fluency", definition: "Knowing how to use and direct AI tools effectively and responsibly." },
  ],
  realWorld:
    "Graphic designers, programmers, and doctors increasingly use AI to draft, code, or scan results faster — then apply human judgment to finish the job. The role shifts from doing every step to directing and checking.",
  quiz: [
    {
      id: "q1",
      question: "What's the most realistic view of AI's effect on jobs?",
      choices: [
        "AI will take every job and humans won't work",
        "AI reshapes jobs — automating tasks and creating new roles — rewarding people who work with it",
        "AI has no effect on work at all",
        "Only robots will have jobs",
      ],
      correctIndex: 1,
      explanation:
        "Like past technologies, AI changes the mix of tasks and jobs. Working effectively with AI becomes a key advantage.",
    },
    {
      id: "q2",
      question: "Why does 'AI + human' often beat 'AI alone' or 'human alone'?",
      choices: [
        "It doesn't — one is always better",
        "AI brings speed and drafts; humans bring judgment, creativity, and ethics",
        "Because two computers are faster than one",
        "Because humans slow the AI down usefully",
      ],
      correctIndex: 1,
      explanation:
        "Augmentation combines AI's strengths (speed, pattern-finding) with human strengths (judgment, creativity, ethics).",
    },
    {
      id: "q3",
      question: "Which skill is likely to become MORE valuable as AI spreads?",
      choices: [
        "Doing repetitive calculations by hand",
        "Memorizing facts you could look up",
        "Critical thinking — judging whether AI output is correct and wise",
        "Typing as fast as possible",
      ],
      correctIndex: 2,
      explanation:
        "As AI handles routine work, human judgment, creativity, and ethics rise in value.",
    },
    {
      id: "q4",
      question: "What's the best mindset for your future with AI?",
      choices: [
        "Avoid AI completely to protect my job",
        "Let AI make all my decisions",
        "Become the skilled, skeptical human who directs and checks the AI",
        "Hope AI never improves",
      ],
      correctIndex: 2,
      explanation:
        "Thriving means being AI-fluent and staying the thoughtful human in charge — exactly this course's goal.",
    },
  ],
  reflection: {
    prompt:
      "Think of a job or hobby you care about. How might AI change it, and what human skill would make you stand out in it?",
    placeholder: "In the field of ___, AI might handle ___, so I'd focus on getting great at ___.",
  },
};
