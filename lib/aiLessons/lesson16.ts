import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson16: AILessonConfig = {
  id: "ai-16",
  title: "16. Capstone: Be an AI-Smart Citizen",
  goal: "Put it all together: review the big ideas, evaluate a real AI tool, and write your own responsible-use guidelines.",
  xpReward: 800,
  badge: "AI-Smart Citizen",
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
        body: `You can **prompt** with Role, Task, Context, and Format, then refine with follow-ups. You know to **verify** output because confident AI can still be wrong. And you can reason clearly about **bias**, **privacy**, **deepfakes**, academic **integrity**, and the **future of work**.\n\nThat's not trivia — that's a genuine mental model of one of the most important technologies of your lifetime.`,
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
        body: `For your capstone, pick **one AI tool you actually use** — a chatbot, a recommendation feed (YouTube, TikTok, Spotify), a photo editor, or a study app — and analyze it using everything from this course.\n\nStart with the quick four questions: specialty, data, risks, your rules. Then, if your class were **adopting** this tool, run the full **Capstone adoption checklist**:\n\n1. **Define the job** — what problem should this tool solve for you?\n2. **Test on real school examples** — not just slick demos; try your actual homework, projects, or daily use.\n3. **Check accuracy, bias, and privacy** — where could it be wrong, unfair, or leak data?\n4. **Confirm human review and disclosure rules** — who checks the output, and when do you tell a teacher you used AI?\n5. **Decide: adopt, limit, or reject** — based on evidence, not hype.\n\nYou'll capture this in the reflection after the knowledge check.`,
        callout: {
          label: "Make it real",
          text: "The goal isn't a perfect essay — it's proving you can look at any AI tool and think clearly about it. That's the skill that lasts.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Size up a tool: a video recommendation feed",
        body: `Let's model the capstone with a tool you almost certainly use: the **recommendation feed** that picks your next video.\n\n**Quick analysis (four questions):**\n\n**1 — What's it a specialist at?** Predicting which video will keep *you* watching, based on patterns in what you clicked before.\n\n**2 — What data, and what's left out?** Your watch time, likes, pauses, and searches. What it can't see: whether the content is *good for you*, true, or balanced — only whether it holds attention.\n\n**3 — Risks?** Filter bubbles, sensational content, and quiet tracking of your habits.\n\n**4 — Your rules.** Take breaks, search on purpose, verify shocking videos before believing them.\n\n**Adoption checklist — if your school considered this tool:**\n\n**Step 1 — Define the job.** "Help students discover educational videos during research time" — not "replace all learning."\n\n**Step 2 — Test on real school examples.** Try actual history or science topics from class. Do the top results include reliable sources, or only clickbait?\n\n**Step 3 — Check accuracy, bias, and privacy.** Could the feed push one-sided politics? Does it track students more than families expect?\n\n**Step 4 — Human review and disclosure rules.** Teachers spot-check recommendations; students log when they used the feed for research.\n\n**Step 5 — Decide.** Maybe **limit use** to teacher-curated playlists rather than full autoplay — adopt the helpful parts, reject the risky ones.\n\nThat's the whole course in action — quick analysis plus a careful adoption decision.`,
        code: `Tool: video recommendation feed
Quick: specialist → data → risks → my rules
Adoption: define job → test real examples → check accuracy/bias/privacy
         → human review rules → adopt / limit / reject`,
        codeCaption: "The four-step analysis on a tool you use daily",
        callout: {
          label: "Pro tip",
          text: "Run the four quick questions on any tool, then the five-step adoption checklist before your class trusts it. It even works for tools that haven't been invented yet.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn — finish strong",
        body: `This is the finish line of the whole AI Literacy track. You started by asking what AI is; now you can understand it, direct it, verify it, protect yourself from its risks, and use it ethically. That's real AI literacy — the kind most adults don't have yet.\n\nTake the final knowledge check (it pulls from the entire course), then complete your capstone reflection to earn your **AI-Smart Citizen** badge.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict). Congratulations — you've become exactly the kind of thoughtful, AI-smart person the future needs.`,
      },
    ],
  },
  bigIdeas: [
    "AI literacy = **understand, direct, verify, protect, act ethically**.",
    "You can analyze **any** AI tool: specialty, data, risks, your rules — then an adoption checklist.",
    "Before adopting: **define job → test real examples → check risks → set human rules → decide**.",
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
      "CAPSTONE: Pick one AI tool you use. (1) Quick analysis: specialty, data, risks, your rules. (2) Adoption checklist: define the job, test on real school examples, check accuracy/bias/privacy, set human review rules, and decide adopt/limit/reject.",
    placeholder: "The tool I chose is ___. Quick analysis: it specializes in ___, uses data like ___, risk is ___, my rules are ___. Adoption: I'd define the job as ___, test with ___, check ___, set review rules ___, and decide to adopt/limit/reject because…",
  },
};
