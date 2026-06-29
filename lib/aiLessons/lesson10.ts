import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson10: AILessonConfig = {
  id: "ai-10",
  title: "10. Better Prompts, Better Answers",
  goal: "Level up your prompting with examples, step-by-step requests, and iteration — turning a first draft answer into exactly what you need.",
  xpReward: 500,
  badge: "🎨 Prompt Pro",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/9",
  nextHref: "/learn/ai/11",
  lessonModule: {
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "iterate",
        kicker: "The big idea",
        title: "Treat it as a conversation, not a vending machine",
        body: `Beginners type one prompt, get an okay answer, and give up. Pros **iterate** — they refine. Don't expect perfection on the first try; instead, react to what you get: "shorter", "add an example", "make it funnier", "explain step 2 more".\n\nBecause the AI keeps the conversation in its context window, each follow-up builds on the last. Refining is where the magic happens.`,
        image: "/images/lessons/ai-10-better-prompt.png",
        imageAlt: "A back-and-forth chat refining an AI answer step by step",
        callout: {
          label: "Mindset shift",
          text: "Your first prompt is a starting point, not a final order. Steer the answer with follow-ups.",
        },
      },
      {
        id: "examples",
        kicker: "Technique 1",
        title: "Show an example (few-shot prompting)",
        body: `One of the most powerful tricks is to **show, don't just tell**. Give the AI an example of the style or format you want, and it will copy the pattern. This is called **few-shot prompting**.\n\nWant titles in a certain style? Show one. Want answers formatted a certain way? Demonstrate it once. The AI is a champion pattern-matcher — feed it the pattern.`,
        code: `"Rewrite each title to be catchy. Example:
'Dogs are loyal' → 'Why Dogs Are Your Most Loyal Friend'

Now do this one:
'Plants need sunlight' →"`,
        codeCaption: "Few-shot: give one example, then the real task",
      },
      {
        id: "stepwise",
        kicker: "Technique 2",
        title: "Ask for step-by-step thinking",
        body: `For anything with reasoning — math, planning, logic — asking the AI to **work step by step** often improves accuracy. Phrases like "explain your reasoning step by step" or "let's break this into steps" push it to slow down instead of blurting a guess.\n\nYou can also ask it to **check its own answer** afterward, which catches some mistakes.`,
        bullets: [
          "Add 'think step by step' for reasoning tasks.",
          "Ask it to 'show your work' so you can spot errors.",
          "Then ask it to 'double-check the answer'.",
        ],
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Direct the AI like a creative partner",
        body: `Great prompting = clear first prompt + examples when helpful + step-by-step for reasoning + follow-ups to refine. With practice it becomes second nature.\n\nBut even a perfect prompt can produce confident errors — so next we tackle verifying AI output. Take the knowledge check first.`,
      },
    ],
  },
  bigIdeas: [
    "**Iterate** — refine the answer with follow-ups instead of accepting the first try.",
    "**Few-shot prompting**: show an example of what you want.",
    "Ask for **step-by-step** reasoning to improve tricky answers.",
  ],
  keyTerms: [
    { term: "Iteration", definition: "Refining an AI's answer through follow-up prompts in a conversation." },
    { term: "Few-shot prompting", definition: "Giving the AI one or more examples so it matches the pattern you want." },
    { term: "Step-by-step prompting", definition: "Asking the AI to reason in steps, which often improves accuracy." },
    { term: "Follow-up", definition: "A message that builds on the previous answer to steer it closer to your goal." },
  ],
  realWorld:
    "Writers, coders, and designers rarely accept an AI's first draft. They nudge it — 'tighter', 'add a hook', 'try three options' — until it's right. The skill is in the steering.",
  quiz: [
    {
      id: "q1",
      question: "What's the 'pro' mindset for getting great AI answers?",
      choices: [
        "Type one perfect prompt and never change it",
        "Treat it as a conversation and refine the answer with follow-ups",
        "Use the shortest prompt possible every time",
        "Only ask yes/no questions",
      ],
      correctIndex: 1,
      explanation:
        "Iteration is key. Refining through follow-ups usually beats expecting a perfect one-shot answer.",
    },
    {
      id: "q2",
      question: "You give the AI one example of the style you want, then your real request. This technique is called…",
      choices: [
        "Overfitting",
        "Few-shot prompting",
        "Hallucination",
        "A context window",
      ],
      correctIndex: 1,
      explanation:
        "Few-shot prompting means showing examples so the model matches the pattern you demonstrated.",
    },
    {
      id: "q3",
      question: "For a tricky math or logic problem, what often improves the AI's accuracy?",
      choices: [
        "Telling it to answer in one word",
        "Asking it to work through the problem step by step and show its reasoning",
        "Typing in all capital letters",
        "Asking it to answer faster",
      ],
      correctIndex: 1,
      explanation:
        "Step-by-step prompting encourages the model to reason carefully rather than blurting a guess.",
    },
    {
      id: "q4",
      question: "Why does showing an example work so well?",
      choices: [
        "The AI is a strong pattern-matcher and copies the pattern you demonstrate",
        "It forces the AI to search Google",
        "Examples unlock secret features",
        "It makes the AI respond for free",
      ],
      correctIndex: 0,
      explanation:
        "LLMs excel at matching patterns. Demonstrating the format/style gives it a clear pattern to follow.",
    },
  ],
  reflection: {
    prompt:
      "Describe a time AI gave you an okay-but-not-great answer. What two follow-up prompts could have made it much better?",
    placeholder: "It gave me a generic list. I could have said 'make it…' and 'add an example of…'",
  },
};
