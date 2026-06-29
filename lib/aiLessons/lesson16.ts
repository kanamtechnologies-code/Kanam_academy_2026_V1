import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson16: AILessonConfig = {
  id: "ai-16",
  title: "16. Capstone: Be an AI-Smart Citizen",
  goal: "Put it all together: review the big ideas, evaluate a real AI tool, and write your own responsible-use guidelines.",
  xpReward: 800,
  badge: "🎓 AI-Smart Citizen",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/15",
  lessonModule: {
    durationLabel: "~10 min capstone",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `This is it — the capstone that ties your whole AI literacy journey together. You've gone from "what even *is* AI?" to understanding how it learns, how to prompt it, how to verify it, and how to use it ethically and safely. Today you turn all of that into something you'll keep for life.\n\nRoadmap for your capstone:\n\n• A fast recap of everything you now know.\n• The **AI-Smart Citizen checklist** — five habits for any AI interaction.\n• A real task: evaluate an AI tool *you* actually use, the way an expert would.\n\nThis is where knowledge becomes a skill you carry into every app, classroom, and job ahead.`,
        image: "/images/lessons/ai-16-capstone.png",
        imageAlt: "A graduate surrounded by the key ideas of the AI literacy course",
        callout: {
          label: "Why it matters",
          text: "New AI tools will keep appearing your whole life. The ability to size up *any* of them — what it does, where it fails, how to use it wisely — never goes out of date.",
        },
      },
      {
        id: "recap",
        kicker: "Capstone",
        title: "Everything you now know about AI",
        body: `Look how far you've come. You can now explain what AI is, how it senses and represents the world, and how it **learns** from data. You understand how generative AI and **LLMs** work — predicting plausible text, not looking up guaranteed truth.\n\nYou can **prompt** with Task, Context, Role, and Format, then refine with follow-ups. You know to **verify** output because confident AI can still be wrong. And you can reason clearly about **bias**, **privacy**, **deepfakes**, academic **integrity**, and the **future of work**.\n\nThat's not trivia — that's a genuine mental model of one of the most important technologies of your lifetime.`,
        callout: {
          label: "You can now",
          text: "Define AI, explain how it learns, prompt it well, verify its answers, and use it ethically and safely. That's real AI literacy.",
        },
      },
      {
        id: "framework",
        kicker: "Your toolkit",
        title: "The AI-Smart Citizen checklist",
        body: `Boil the whole course down to five habits you can carry into every AI interaction:\n\n1. **Understand** — it's a pattern tool, not a mind. It predicts; it doesn't *know*.\n2. **Direct** — write clear prompts and refine with follow-ups.\n3. **Verify** — don't trust facts, quotes, or sources without checking.\n4. **Protect** — guard your privacy and stay skeptical of deepfakes.\n5. **Act ethically** — be honest at school, and think about fairness and impact.\n\nMemorize these five and you have a compass for any AI situation — even ones that don't exist yet.`,
        bullets: [
          "Understand what AI really is.",
          "Direct it with good prompts.",
          "Verify before you trust.",
          "Protect privacy; question fakes.",
          "Use it honestly and fairly.",
        ],
      },
      {
        id: "evaluate",
        kicker: "Capstone task",
        title: "Evaluate a real AI tool",
        body: `For your capstone, pick **one AI tool you actually use** — a chatbot, a recommendation feed (YouTube, TikTok, Spotify), a photo editor, or a study app — and analyze it using everything from this course:\n\n• What task is it a specialist at? What does it predict or generate?\n• What data does it likely use — and what might that leave out or bias?\n• Where could it be wrong, unfair, or risky to your privacy?\n• What are *your* personal rules for using it wisely?\n\nYou'll capture this in the reflection after the knowledge check.`,
        callout: {
          label: "Make it real",
          text: "The goal isn't a perfect essay — it's proving you can look at any AI tool and think clearly about it. That's the skill that lasts.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Size up a tool: a video recommendation feed",
        body: `Let's model the capstone with a tool you almost certainly use: the **recommendation feed** that picks your next video.\n\n**1 — What's it a specialist at?** Predicting which video will keep *you* watching, based on patterns in what you (and people like you) clicked before.\n\n**2 — What data, and what's left out?** Your watch time, likes, pauses, and searches. What it can't see: whether the content is *good for you*, true, or balanced — only whether it holds attention.\n\n**3 — Risks?** It can create a bubble (more of the same), amplify sensational or biased content because it gets clicks, and quietly track a lot about you.\n\n**4 — Your rules.** Maybe: take breaks, search on purpose instead of only scrolling, and verify shocking videos before believing them.\n\nThat's the whole course in action — and you can run this same four-step analysis on *any* AI tool.`,
        code: `Tool: video recommendation feed
1 Specialist at: predicting what keeps YOU watching
2 Data: clicks, watch time, likes  →  leaves out: is it true / good for me?
3 Risks: filter bubble, sensational content, tracking
4 My rules: search on purpose, take breaks, verify before believing`,
        codeCaption: "The four-step analysis on a tool you use daily",
        callout: {
          label: "Pro tip",
          text: "Use these same four questions — specialty, data, risks, your rules — on any new AI tool you meet. It even works for tools that haven't been invented yet.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn — finish strong",
        body: `This is the finish line of the whole AI Literacy track. You started by asking what AI is; now you can understand it, direct it, verify it, protect yourself from its risks, and use it ethically. That's real AI literacy — the kind most adults don't have yet.\n\nTake the final knowledge check (it pulls from the entire course), then complete your capstone reflection to earn your 🎓 **AI-Smart Citizen** badge.\n\nWhen you're ready, switch to the **Knowledge check**. Congratulations — you've become exactly the kind of thoughtful, AI-smart person the future needs.`,
      },
    ],
  },
  bigIdeas: [
    "AI literacy = **understand, direct, verify, protect, act ethically**.",
    "You can analyze **any** AI tool: what it does, its data, its risks, your rules.",
    "Staying the **thoughtful human in charge** is the skill that lasts.",
  ],
  keyTerms: [
    { term: "AI literacy", definition: "The ability to understand, use, evaluate, and question AI responsibly." },
    { term: "Responsible use", definition: "Using AI honestly, safely, and fairly, while staying in control." },
    { term: "Critical evaluation", definition: "Judging an AI tool's strengths, limits, biases, and risks." },
    { term: "AI-smart citizen", definition: "Someone who can navigate an AI-filled world thoughtfully and ethically." },
  ],
  realWorld:
    "Being able to look at any new AI tool — and ask what it does, where it could be wrong, and how to use it wisely — is a skill you'll use for the rest of your life, no matter your career.",
  quiz: [
    {
      id: "q1",
      question: "Which statement shows true AI literacy?",
      choices: [
        "AI is a conscious mind that's always right",
        "AI is a powerful pattern tool I should direct, verify, and use ethically",
        "AI is magic I shouldn't question",
        "AI is useless and I should avoid it",
      ],
      correctIndex: 1,
      explanation:
        "AI literacy means seeing AI clearly: a powerful pattern tool you guide, check, and use responsibly.",
    },
    {
      id: "q2",
      question: "An AI gives you a confident statistic with a source for your project. The AI-smart move is to…",
      choices: [
        "Use it right away — it sounds official",
        "Verify the statistic and confirm the source actually exists before using it",
        "Delete your project",
        "Ask the AI to promise it's true",
      ],
      correctIndex: 1,
      explanation:
        "Don't trust, verify. Facts, stats, and sources from AI can be hallucinated and must be checked.",
    },
    {
      id: "q3",
      question: "A friend shares a shocking video of a celebrity. Using this course, what should you consider first?",
      choices: [
        "It must be real because it's a video",
        "It could be a deepfake — verify with trusted sources before believing or sharing",
        "Share it instantly to warn everyone",
        "Videos can never be faked",
      ],
      correctIndex: 1,
      explanation:
        "Generative AI can fake realistic video. Seeing isn't believing — verify before trusting or spreading it.",
    },
    {
      id: "q4",
      question: "Which is the best example of using AI with academic integrity?",
      choices: [
        "Submitting an AI-written essay as your own",
        "Having AI explain feedback on a draft you wrote, then improving it yourself",
        "Using AI on a test where it's banned",
        "Copying AI answers without understanding them",
      ],
      correctIndex: 1,
      explanation:
        "Using AI to learn and improve your own work is honest; passing AI work off as yours is not.",
    },
    {
      id: "q5",
      question: "What's the most future-proof role for a human in an AI world?",
      choices: [
        "Trying to compute faster than computers",
        "Avoiding AI entirely",
        "Being the skilled, skeptical human who directs and checks the AI",
        "Letting AI make every decision",
      ],
      correctIndex: 2,
      explanation:
        "Thriving with AI means staying the thoughtful, AI-fluent human in charge — the heart of this whole course.",
    },
  ],
  reflection: {
    prompt:
      "CAPSTONE: Pick one AI tool you use. In a few sentences, describe (1) what it's a specialist at, (2) what data it likely uses and what that might leave out, (3) one risk (error, bias, or privacy), and (4) your personal rules for using it wisely.",
    placeholder: "The tool I chose is ___. It specializes in ___. It probably uses data like ___, which might leave out ___. A risk is ___. My rules for using it are…",
  },
};
