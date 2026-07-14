import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson10: AILessonConfig = {
  id: "ai-10",
  title: "10. Better Prompts, Better Answers",
  goal: "Level up your prompting with examples, step-by-step requests, and iteration — turning a first draft answer into exactly what you need, while staying honest about how you got there.",
  xpReward: 500,
  badge: "Prompt Pro",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/9",
  nextHref: "/learn/ai/11",
  lessonModule: {
    durationLabel: "~20–25 min",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Last lesson you learned to write a clear first prompt. Now you'll learn what the pros do *after* the first answer — because the real skill isn't a perfect opening line, it's the **back-and-forth**.\n\nToday's roadmap:\n\n• Treat AI like a conversation you steer, not a vending machine.\n• **Few-shot prompting** — show an example and the AI copies the pattern.\n• Ask for **step-by-step** reasoning to make tricky answers more reliable.\n• When iteration crosses into "letting AI do your thinking for you."\n\nThese moves are how people get AI to write better essays, study guides, and project ideas — and they take seconds to learn.`,
        image: "/images/lessons/ai-10-better-prompt.png",
        imageAlt: "A back-and-forth chat refining an AI answer step by step",
        callout: {
          label: "Why it matters",
          text: "Whether you're polishing an essay, planning an event, or designing a poster, the magic is in the follow-ups. Knowing how to steer turns an okay answer into exactly what you pictured.",
        },
      },
      {
        id: "hook-story",
        kicker: "Real moment",
        title: "The list nobody could actually use",
        body: `Deshawn asks an AI for science fair ideas. It hands back ten generic topics — "study plant growth," "test water pH," the usual. He almost gives up, thinking AI just isn't that helpful.\n\nHis lab partner, watching over his shoulder, says "don't start over — just react." She types: "I like #3, the plant one. Make it doable in two weeks with materials from a grocery store. Format it as Title — Question — What I'd Measure." Then: "Now list the steps to run it, in order."\n\nThree follow-ups later, Deshawn has a personalized, doable project plan — from the exact same starting list he almost dismissed as useless.`,
        callout: {
          label: "Keep this in mind",
          text: "The first answer is rarely the ceiling. It's the starting block you push off from.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Iteration words in plain English",
        body: `• **Iteration** — improving an answer through follow-up messages instead of retyping everything.\n• **Follow-up** — a message that builds on the previous answer to steer it closer to what you want.\n• **Few-shot prompting** — giving the AI one or more examples so it copies the pattern.\n• **Zero-shot prompting** — asking directly with no example (what you mostly did last lesson).\n• **Chain-of-thought / step-by-step prompting** — asking the AI to reason through steps instead of jumping to a final answer.\n• **Context window** — the AI's short-term memory of your conversation (from Lesson 8) — this is *why* iteration even works.\n\nKeep "context window" in the back of your mind today; it's the engine behind everything else.`,
        callout: {
          label: "Pro tip",
          text: "If you ever feel like the AI 'forgot' something from way earlier in a long chat, that's the context window filling up — not the AI being careless.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "Treat it as a conversation, not a vending machine",
        body: `Beginners type one prompt, get an okay answer, and stop. Pros **iterate** — they react to what they got and ask for changes: "shorter", "add an example", "make step 2 clearer", "give me three options".\n\nThink of it like sculpting. You don't carve a statue in one swing; you rough out the shape, then refine. The first answer is your rough block of clay — the follow-ups shape it.\n\nThis works because the AI keeps the whole chat in its **context window** (its short-term memory of the conversation). Each follow-up builds on what came before, so you can zero in without re-explaining everything.`,
        callout: {
          label: "Mindset shift",
          text: "Your first prompt is a starting point, not a final order. Steer the answer with follow-ups until it's right.",
        },
        checkIn: {
          prompt: "What's the 'pro' mindset for getting great AI answers?",
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
      },
      {
        id: "concept-2",
        kicker: "Technique 1",
        title: "Show an example (few-shot prompting)",
        body: `One of the most powerful tricks is to **show, don't just tell**. Give the AI an example of the style or format you want, and it copies the pattern. This is called **few-shot prompting** ("few-shot" = you gave it a few examples first).\n\nWhy does it work? Remember, an LLM is a champion **pattern-matcher**. A clear example is a pattern it can lock onto — far more precise than trying to describe the style in words.\n\nReal example: instead of "make these titles catchy" (the AI has to guess what catchy means to you), show one title you love turned catchy. Now it matches *your* taste.`,
        code: `"Rewrite each title to be catchy. Example:
'Dogs are loyal' → 'Why Dogs Are Your Most Loyal Friend'

Now do this one:
'Plants need sunlight' →"`,
        codeCaption: "Few-shot: give one example, then the real task",
        checkIn: {
          prompt: "You give the AI one example of the style you want, then your real request. This technique is called…",
          choices: ["Overfitting", "Few-shot prompting", "Hallucination", "A context window"],
          correctIndex: 1,
          explanation:
            "Few-shot prompting means showing examples so the model matches the pattern you demonstrated.",
        },
      },
      {
        id: "concept-3",
        kicker: "Technique 2",
        title: "Ask for step-by-step thinking",
        body: `For anything that needs reasoning — math, logic puzzles, planning — asking the AI to **work step by step** often improves accuracy. Phrases like "explain your reasoning step by step" or "let's break this into steps" push it to slow down instead of blurting the first thing it predicts.\n\nThink about a hard math problem in class. If you rush to the answer, you make careless mistakes; if you show your work line by line, you catch them. The AI behaves similarly — laying out steps gives it room to "reason" instead of guessing.\n\nYou can also ask it to **double-check its own answer** afterward, which catches some errors before they reach you.`,
        bullets: [
          "Add 'think step by step' for reasoning tasks.",
          "Ask it to 'show your work' so you can spot errors.",
          "Then ask it to 'double-check the answer'.",
        ],
        checkIn: {
          prompt: "For a tricky math or logic problem, what often improves the AI's accuracy?",
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
      },
      {
        id: "worked-example",
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
        id: "second-example",
        kicker: "Second example",
        title: "Iterating a prompt three times",
        body: `Watch how iteration turns a mediocre answer into a useful one.\n\n**Draft 1:** "Explain photosynthesis." → Too long, too technical.\n\n**Draft 2:** "Explain photosynthesis for a 9th grader in 5 bullet points." → Better length, still missing the lab connection.\n\n**Draft 3:** "Same as before, but connect each step to what we'd observe in a spinach-leaf lab, and end with one study question I should be able to answer." → Now it's actually useful for *your* class.\n\nIteration isn't failure — it's normal. Professional teams prompt, review, and refine constantly. Your third prompt is usually the one that earns trust.`,
        callout: {
          label: "Notice this",
          text: "Stopping after one vague prompt and calling the AI \"useless\" skips the skill that actually makes it helpful.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth check",
        title: "'Step by step' isn't the same as 'actually correct'",
        body: `Asking for step-by-step reasoning improves *odds*, not guarantees. The AI can lay out five confident, well-organized steps and still land on a wrong final answer — because it's still predicting plausible text, just with more structure.\n\nAnother myth: iterating forever eventually gets a "perfect" answer. In reality, a handful of focused follow-ups usually gets you 90% of the way; after that, diminishing returns kick in and it's often faster to just edit the answer yourself.`,
        callout: {
          label: "Myth check",
          text: "\"If it shows its steps, the answer must be right.\" Not necessarily — always sanity-check the final answer, especially for math, science, or anything gradeable.",
        },
        checkIn: {
          prompt: "If an AI shows detailed step-by-step reasoning, does that guarantee the final answer is correct?",
          choices: [
            "Yes, showing steps always means the answer is correct",
            "No — step-by-step reasoning improves the odds but doesn't guarantee correctness",
            "Yes, but only for essays",
            "No, step-by-step prompting never helps at all",
          ],
          correctIndex: 1,
          explanation:
            "Step-by-step prompting helps the model reason more carefully, but it can still land on a wrong answer — always double-check what matters.",
        },
      },
      {
        id: "red-flags",
        kicker: "Red flags",
        title: "When better prompts still aren't enough",
        body: `Leveled-up prompting helps — but it can't fix everything. Red flags that mean you should stop relying on the AI alone:`,
        bullets: [
          "**You keep getting different factual answers** on the same question — a sign you need an independent source, not a fourth prompt.",
          "**The task requires your own lived experience** — college essays about your values, personal reflections, original art direction.",
          "**You're iterating to avoid doing the thinking** — polishing someone else's draft instead of building your own understanding.",
          "**The output sounds perfect but you can't explain it** — if you couldn't teach it to a friend, you don't own the learning yet.",
        ],
        callout: {
          label: "Honest check",
          text: "Better prompts make AI a stronger assistant — not a substitute for your judgment or your voice.",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Run a 3-step iteration on something real",
        body: `Pick a real task — a study guide, a party plan, a workout routine — and try this exact sequence:\n\n1. Ask a broad first version, on purpose (don't overthink it).\n2. React to what you get: name one thing to keep and one to change.\n3. Add a step-by-step or few-shot follow-up to sharpen it further.\n\nNotice how much less typing this takes than trying to write the "perfect" prompt from scratch.`,
        callout: {
          label: "No AI handy right now?",
          text: "Write all three prompts on paper and predict how each answer would likely change. That prediction is the actual skill.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Self-critique: ask the AI to grade its own work",
        image: "/images/lessons/ai-ex-prompt.png",
        imageAlt: "An AI answer being reviewed and critiqued through a follow-up prompt",
        body: `A more advanced iteration move: after getting an answer, ask the AI to **critique itself** before you even read it closely. "Review your answer above. What's the weakest part, and how would you improve it?"\n\nThis works because it forces a second pass over the same context, sometimes catching gaps, repetition, or a missed instruction. It's not foolproof — the AI can miss its own mistakes — but it's a fast, free second opinion before you invest time reading or using the answer.\n\nCombine it with your own judgment: if the self-critique flags something, that's worth checking; if it says "this is perfect," don't take that at face value either.`,
        bullets: [
          "Ask 'what's the weakest part of that answer?' as a fast quality check.",
          "Ask it to check the answer against your original instructions.",
          "Still verify anything factual yourself — self-critique isn't fact-checking.",
        ],
      },
      {
        id: "decision-checklist",
        kicker: "Decision checklist",
        title: "Should I iterate the prompt or step away?",
        body: `When an AI answer isn't right yet, run this quick checklist before prompting again:`,
        bullets: [
          "**Is the task clear?** If not, fix Role / Task / Context / Format first.",
          "**Is the error factual?** If yes, verify externally — don't prompt your way to a true answer.",
          "**Is the error about your voice or understanding?** If yes, rewrite yourself — iteration won't install real learning.",
          "**Am I on attempt 3+ with the same gap?** If yes, change strategy: new source, teacher question, or peer review.",
        ],
        checkIn: {
          prompt: "The AI gives you two different dates for the same historical event on repeated prompts. Best next step?",
          choices: [
            "Keep prompting until it picks one date confidently",
            "Verify the date in a trusted history source, then use that verified fact going forward",
            "Average the two dates the AI gave you",
            "Assume the longer answer must be correct",
          ],
          correctIndex: 1,
          explanation:
            "Inconsistent factual answers are a red flag for hallucination. Independent verification — not more prompting — is the right move.",
        },
      },
      {
        id: "comparison",
        kicker: "See it side by side",
        title: "Zero-shot vs. few-shot vs. step-by-step",
        body: `Each technique fits a different kind of task. Knowing which to reach for saves you a round of trial and error.`,
        table: {
          columns: ["Technique", "Best for", "Example cue"],
          values: [
            ["Zero-shot (just ask)", "Simple, well-known requests", "\"Summarize this in 3 sentences.\""],
            ["Few-shot (show an example)", "Matching a specific style or format", "\"Like this: X → Y. Now do: Z →\""],
            ["Step-by-step", "Math, logic, planning, anything with reasoning", "\"Think through this step by step.\""],
          ],
          rowCount: 3,
        },
        checkIn: {
          prompt: "You need the AI to match a very specific formatting style you have in mind. Which technique fits best?",
          choices: [
            "Zero-shot — just describe the style in words",
            "Few-shot — show one example in that exact style",
            "Step-by-step — ask it to reason slowly",
            "None of these techniques help with formatting",
          ],
          correctIndex: 1,
          explanation:
            "Few-shot prompting is ideal when you have a specific style or format in mind — showing beats describing.",
        },
      },
      {
        id: "ethics",
        kicker: "Ethics moment",
        title: "When does iterating become 'AI did my thinking'?",
        body: `Iteration is a real skill — but it has a line. Steering an AI through several rounds to *improve your own draft* is different from steering it through several rounds to *produce a finished assignment you then submit as entirely your own thinking*.\n\nA useful gut-check: after all that back-and-forth, could you explain *why* each change was made, in your own words, without the chat open? If yes, you were the one directing and learning. If the honest answer is "not really, I just kept clicking regenerate," the iteration replaced your thinking rather than sharpening it.\n\nWe'll go much deeper on the help-vs-cheating line in a later lesson — for now, just notice that "I only used follow-ups, not the first answer" isn't automatically an ethics free pass.`,
        callout: {
          label: "Quick gut-check",
          text: "Iterating on YOUR draft = usually fine. Iterating until the AI hands you a finished product to submit as-is = worth pausing on.",
        },
      },
      {
        id: "habits",
        kicker: "Make it automatic",
        title: "Four iteration habits worth keeping",
        body: `1. **React specifically.** "Make it better" is vague; "cut this to 3 bullets and add a real example" is actionable.\n2. **Show, don't just describe**, when style or format matters — few-shot beats paragraphs of explanation.\n3. **Slow down reasoning tasks** with "step by step" before trusting a final number or conclusion.\n4. **Know when to stop.** After a few rounds, if you're not improving, edit the answer yourself — that's often faster and it's real practice for you.`,
        callout: {
          label: "This week",
          text: "Next time you get an okay-but-not-great AI answer, don't retype from scratch — try one specific follow-up first.",
        },
      },
      {
        id: "transfer-to-life",
        kicker: "Use it for real",
        title: "Use iteration on your next real assignment",
        body: `Pick one upcoming homework task and plan three prompt rounds in advance:\n\n1. **Explore** — ask for an outline or explanation to see gaps in your understanding.\n2. **Focus** — tighten role, format, and constraints to match the rubric.\n3. **Own it** — close the AI, rewrite in your voice, and verify any facts before submitting.\n\nThat rhythm — explore, focus, own — keeps AI in the assistant lane where it belongs.`,
        callout: {
          label: "Transfer this",
          text: "Iteration plus verification plus your own rewrite is the difference between using AI and being used by it.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on...",
        body: `Recall a time an AI's first answer disappointed you. If you could redo that moment with today's tools — a specific follow-up, a few-shot example, a step-by-step request — what's the exact thing you'd type next?\n\nHold that thought for the reflection at the end of this lesson.`,
      },
      {
        id: "mini-case",
        kicker: "Mini-case",
        title: "Fixing a robotics club announcement",
        body: `Amara needs to write an announcement for her robotics club's bake sale. Her first prompt: "Write an announcement for our bake sale." The AI returns a stiff, overly formal paragraph that doesn't sound like her club at all.\n\n**Follow-up 1 (react specifically):** "Too formal — make it sound excited and casual, like a text to friends, not a press release."\n\n**Follow-up 2 (few-shot):** "Match this energy: 'Pizza party Friday — first 20 people get a slice!' Now write the bake sale one in that style."\n\n**Follow-up 3 (constraint from last lesson):** "Keep it under 40 words and mention it's Friday at lunch."\n\nThree rounds, no restarting, and Amara ends up with something she'd actually post — because she reacted specifically instead of regenerating blindly.`,
        checkIn: {
          prompt: "What made Amara's iteration effective rather than just 'trial and error'?",
          choices: [
            "She kept clicking regenerate until something looked okay",
            "She gave specific, actionable feedback and an example each round instead of vague retries",
            "She wrote a completely new unrelated prompt each time",
            "She asked the AI to guess what she wanted without any feedback",
          ],
          correctIndex: 1,
          explanation:
            "Effective iteration means reacting with specific, actionable feedback (and examples when useful) — not repeatedly regenerating and hoping.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Self-check",
        title: "Pick the right technique",
        body: `One more rep before the graded knowledge check. You're helping a friend write a poem in a very specific rhyme style you both love, and you have a perfect example of that style saved in your notes.`,
        checkIn: {
          prompt: "Which prompting technique fits this poem situation best?",
          choices: [
            "Zero-shot — just ask for 'a poem' with no example",
            "Few-shot — paste your saved example and ask the AI to match its style",
            "Step-by-step — ask it to reason through the poem's logic",
            "None of these — poems can't be prompted for",
          ],
          correctIndex: 1,
          explanation:
            "When you already have a concrete example of the style you want, few-shot prompting is the fastest way to get a matching result.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Great prompting = a clear first prompt + examples when helpful + step-by-step for reasoning + specific follow-ups to refine — while staying honest about when you're learning versus when you're just outsourcing your thinking.\n\nBut here's the catch: even a perfectly steered answer can be confidently *wrong*. Next lesson tackles how to verify AI output. First, lock in today's ideas.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict).`,
      },
    ],
  },
  bigIdeas: [
    "**Iterate** — refine the answer with follow-ups instead of accepting the first try.",
    "**Few-shot prompting**: show an example of what you want.",
    "Ask for **step-by-step** reasoning to improve tricky answers — but still verify the final result.",
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
      choices: ["Overfitting", "Hallucination", "A context window", "Few-shot prompting"],
      correctIndex: 3,
      explanation:
        "Few-shot prompting means showing examples so the model matches the pattern you demonstrated.",
    },
    {
      id: "q3",
      question: "For a tricky math or logic problem, what often improves the AI's accuracy?",
      choices: [
        "Asking it to work through the problem step by step and show its reasoning",
        "Telling it to answer in one word",
        "Typing in all capital letters",
        "Asking it to answer faster",
      ],
      correctIndex: 0,
      explanation:
        "Step-by-step prompting encourages the model to reason carefully rather than blurting a guess.",
    },
    {
      id: "q4",
      question: "Why does showing an example work so well?",
      choices: [
        "The AI is a strong pattern-matcher and copies the pattern you demonstrate",
        "Examples make the AI switch to a more advanced version of itself",
        "It skips the need to describe the task at all",
        "It guarantees the output will be factually accurate",
      ],
      correctIndex: 0,
      explanation:
        "LLMs excel at matching patterns. Demonstrating the format/style gives it a clear pattern to follow.",
    },
    {
      id: "q5",
      question: "Does step-by-step prompting GUARANTEE a correct final answer?",
      choices: [
        "Yes — once the model shows its steps, the conclusion is reliable",
        "Yes for schoolwork, but not for math or science questions",
        "No — it improves the odds of accuracy but the final answer can still be wrong",
        "No — asking for steps usually makes the answer less accurate",
      ],
      correctIndex: 2,
      explanation:
        "Step-by-step prompting helps the model reason more carefully, but you should still verify important final answers.",
    },
    {
      id: "q6",
      question: "What's a smart use of an AI 'self-critique' follow-up (asking it to review its own answer)?",
      choices: [
        "It replaces the need to ever check facts yourself",
        "It's a fast second opinion that can catch gaps — but you still verify anything factual",
        "It always finds every mistake with certainty",
        "It should never be used",
      ],
      correctIndex: 1,
      explanation:
        "Self-critique can surface weak spots quickly, but it isn't a substitute for actually fact-checking important claims.",
    },
    {
      id: "q7",
      question: "What's the difference between iterating on YOUR draft versus iterating until AI hands you a finished product to submit as-is?",
      choices: [
        "There's no difference — both are exactly the same",
        "The second is always faster and therefore always fine",
        "Only the first one is technically called 'iteration'",
        "The first keeps you doing the thinking and learning; the second can quietly replace your own work",
      ],
      correctIndex: 3,
      explanation:
        "Iterating on your own draft keeps you in the driver's seat. Iterating until AI produces a finished product you submit as your own can cross into letting AI do your thinking for you.",
    },
    {
      id: "q8",
      question: "How does iterating on AI answers connect to computational thinking?",
      choices: [
        "It doesn't relate to computer science at all",
        "Only writing code from scratch counts as computational thinking",
        "The try → evaluate → adjust loop mirrors the same process used in testing and debugging code",
        "Iteration is only a writing skill, not a CS skill",
      ],
      correctIndex: 2,
      explanation:
        "Refining an answer through evaluation and adjustment is the same iterative loop computational thinkers use when testing and debugging.",
    },
  ],
  reflection: {
    prompt:
      "Describe a time AI gave you an okay-but-not-great answer. What two follow-up prompts could have made it much better?",
    placeholder: "It gave me a generic list. I could have said 'make it…' and 'add an example of…'",
  },
};
