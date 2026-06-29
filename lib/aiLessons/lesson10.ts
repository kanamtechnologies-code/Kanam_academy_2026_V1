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
    durationLabel: "~9 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Last lesson you learned to write a clear first prompt. Now you'll learn what the pros do *after* the first answer — because the real skill isn't a perfect opening line, it's the **back-and-forth**.\n\nToday's roadmap:\n\n• Treat AI like a conversation you steer, not a vending machine.\n• **Few-shot prompting** — show an example and the AI copies the pattern.\n• Ask for **step-by-step** reasoning to make tricky answers more reliable.\n\nThese moves are how people get AI to write better essays, study guides, and project ideas — and they take seconds to learn.`,
        image: "/images/lessons/ai-10-better-prompt.png",
        imageAlt: "A back-and-forth chat refining an AI answer step by step",
        callout: {
          label: "Why it matters",
          text: "Whether you're polishing an essay, planning an event, or designing a poster, the magic is in the follow-ups. Knowing how to steer turns an okay answer into exactly what you pictured.",
        },
      },
      {
        id: "iterate",
        kicker: "The big idea",
        title: "Treat it as a conversation, not a vending machine",
        body: `Beginners type one prompt, get an okay answer, and stop. Pros **iterate** — they react to what they got and ask for changes: "shorter", "add an example", "make step 2 clearer", "give me three options".\n\nThink of it like sculpting. You don't carve a statue in one swing; you rough out the shape, then refine. The first answer is your rough block of clay — the follow-ups shape it.\n\nThis works because the AI keeps the whole chat in its **context window** (its short-term memory of the conversation). Each follow-up builds on what came before, so you can zero in without re-explaining everything.`,
        callout: {
          label: "Mindset shift",
          text: "Your first prompt is a starting point, not a final order. Steer the answer with follow-ups until it's right.",
        },
      },
      {
        id: "examples",
        kicker: "Technique 1",
        title: "Show an example (few-shot prompting)",
        body: `One of the most powerful tricks is to **show, don't just tell**. Give the AI an example of the style or format you want, and it copies the pattern. This is called **few-shot prompting** ("few-shot" = you gave it a few examples first).\n\nWhy does it work? Remember, an LLM is a champion **pattern-matcher**. A clear example is a pattern it can lock onto — far more precise than trying to describe the style in words.\n\nReal example: instead of "make these titles catchy" (the AI has to guess what catchy means to you), show one title you love turned catchy. Now it matches *your* taste.`,
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
        body: `For anything that needs reasoning — math, logic puzzles, planning — asking the AI to **work step by step** often improves accuracy. Phrases like "explain your reasoning step by step" or "let's break this into steps" push it to slow down instead of blurting the first thing it predicts.\n\nThink about a hard math problem in class. If you rush to the answer, you make careless mistakes; if you show your work line by line, you catch them. The AI behaves similarly — laying out steps gives it room to "reason" instead of guessing.\n\nYou can also ask it to **double-check its own answer** afterward, which catches some errors before they reach you.`,
        bullets: [
          "Add 'think step by step' for reasoning tasks.",
          "Ask it to 'show your work' so you can spot errors.",
          "Then ask it to 'double-check the answer'.",
        ],
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Refine an answer in real time",
        body: `Say you ask: "Give me ideas for a science fair project." You get a generic list. Here's how a pro steers it home.\n\n**Step 1 — React, don't restart.** Instead of a brand-new prompt, build on the answer: "I like #3, the plant one. Make it doable in two weeks with cheap materials."\n\n**Step 2 — Add a few-shot example.** "Format each idea like this: **Title** — the question it answers — what I'd measure."\n\n**Step 3 — Ask for reasoning.** "Now walk me through the steps to actually run the plant experiment, in order."\n\nThree quick follow-ups turned a vague list into a personalized, step-by-step plan — without ever retyping your whole request.`,
        code: `1) "Give me science fair ideas."                          → generic list
2) "I like #3. Make it doable in 2 weeks, cheap stuff."   → focused
3) "Format: Title — question — what I'd measure."         → few-shot
4) "Now list the steps to run it, in order."              → step-by-step`,
        codeCaption: "Each follow-up steers the answer closer",
        callout: {
          label: "Pro tip",
          text: "When an answer is close but not perfect, name *exactly* what to change ('tighter', 'add a hook', 'three options'). Specific feedback beats starting over.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Great prompting = a clear first prompt + examples when helpful + step-by-step for reasoning + follow-ups to refine. With a little practice it becomes second nature.\n\nBut here's the catch: even a perfectly steered answer can be confidently *wrong*. Next lesson tackles how to verify AI output. First, lock in today's ideas.\n\nWhen you're ready, switch to the **Knowledge check**.`,
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
