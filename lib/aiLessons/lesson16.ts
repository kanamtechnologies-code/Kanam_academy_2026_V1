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
    durationLabel: "~9 min capstone",
    sections: [
      {
        id: "recap",
        kicker: "Capstone",
        title: "Everything you now know about AI",
        body: `You've come a long way. You can now explain what AI is, how it senses and represents the world, how it learns, how generative AI and LLMs work, how to prompt them, how to verify their output, and how to handle bias, privacy, and the future of work.\n\nThis final lesson ties it together and turns knowledge into a personal **action plan**.`,
        image: "/images/lessons/ai-16-capstone.png",
        imageAlt: "A graduate surrounded by the key ideas of the AI literacy course",
        callout: {
          label: "You can now",
          text: "Define AI, explain how it learns, prompt it well, verify its answers, and use it ethically and safely. That's real AI literacy.",
        },
      },
      {
        id: "framework",
        kicker: "Your toolkit",
        title: "The AI-Smart Citizen checklist",
        body: `Carry these five habits into every AI interaction:\n\n1. **Understand** — it's a pattern tool, not a mind.\n2. **Direct** — write clear prompts; refine with follow-ups.\n3. **Verify** — don't trust facts, quotes, or sources without checking.\n4. **Protect** — guard your privacy and stay skeptical of deepfakes.\n5. **Act ethically** — be honest at school, and think about fairness and impact.`,
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
        body: `For your capstone, pick **one AI tool you actually use** (a chatbot, a recommendation feed, a photo editor, a study app) and analyze it using this course:\n\n• What task is it a specialist at? What does it predict or generate?\n• What data does it likely use — and what might that leave out or bias?\n• Where could it be wrong, unfair, or risky to your privacy?\n• What are *your* rules for using it wisely?\n\nYou'll capture this in the reflection after the knowledge check.`,
        callout: {
          label: "Make it real",
          text: "The goal isn't a perfect essay — it's proving you can look at any AI tool and think clearly about it. That's the skill that lasts.",
        },
      },
      {
        id: "ready",
        kicker: "Final step",
        title: "Earn your AI-Smart Citizen badge",
        body: `Take the final knowledge check — it pulls from the whole course — then complete your capstone reflection. Finish it to earn your 🎓 AI-Smart Citizen badge.\n\nCongratulations on becoming someone who understands, directs, and questions AI. That makes you exactly the kind of person the future needs.`,
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
