import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson15: AILessonConfig = {
  id: "ai-15",
  title: "15. AI and the Future of Work",
  goal: "Explore how AI is changing jobs and creativity, why 'AI + human' beats either alone, and what skills keep you valuable.",
  xpReward: 750,
  badge: "🚀 Future Ready",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/14",
  nextHref: "/learn/ai/16",
  lessonModule: {
    durationLabel: "~7 min lesson",
    sections: [
      {
        id: "change",
        kicker: "The big idea",
        title: "AI changes jobs more than it erases them",
        body: `Every big technology — tractors, computers, the internet — reshaped work. Some jobs faded, many changed, and brand-new ones appeared. AI is doing the same, faster.\n\nThe realistic view isn't "robots take all jobs." It's that **tasks** get automated, jobs get rebuilt around AI, and people who can **work with** AI become more productive and valuable.`,
        image: "/images/lessons/ai-15-future.png",
        imageAlt: "A person and an AI assistant working together at a desk",
        callout: {
          label: "Reframe it",
          text: "The question isn't 'will AI take my job?' It's 'how will my job change, and how do I stay the human who directs the AI?'",
        },
      },
      {
        id: "augment",
        kicker: "The winning combo",
        title: "AI + human beats AI alone or human alone",
        body: `In field after field, the best results come from **collaboration**: AI handles speed, drafts, and grunt work; humans bring judgment, creativity, ethics, and real-world understanding.\n\nA doctor + AI catches more than either alone. A writer + AI drafts faster, then the human makes it true and meaningful. Think **augmentation**, not replacement.`,
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
        body: `As AI handles more routine tasks, deeply human skills rise in value:\n\n• **Critical thinking** — judging if AI output is right and wise.\n• **Creativity** — asking new questions AI wouldn't.\n• **Communication & collaboration** — working with people.\n• **Adaptability** — learning new tools fast (like you're doing now!).\n• **Ethics** — deciding what *should* be done, not just what *can* be.\n\nAnd a brand-new one: knowing how to **direct AI well** — exactly this course.`,
        callout: {
          label: "Good news",
          text: "These skills aren't about out-computing the computer. They're about being a thoughtful, adaptable human — which you can keep growing.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Be the human who directs the AI",
        body: `Your generation won't compete *against* AI — you'll work *alongside* it. The students who thrive will be curious, skeptical, creative, and AI-fluent.\n\nOne lesson left: your capstone. Take this knowledge check, then reflect on your future.`,
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
