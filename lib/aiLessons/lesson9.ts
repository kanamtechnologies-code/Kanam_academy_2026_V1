import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson9: AILessonConfig = {
  id: "ai-9",
  title: "9. How to Talk to AI (Prompting)",
  goal: "Learn the building blocks of a great prompt — role, task, context, format, and constraints — so you get useful answers instead of vague ones, and prompt in a way that's honest and respectful of others' privacy.",
  xpReward: 450,
  badge: "Prompt Starter",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/8",
  nextHref: "/learn/ai/10",
  lessonModule: {
    durationLabel: "~20–25 min",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `Every time you ask a chatbot to help with homework, draft a text, brainstorm ideas, or explain something confusing, you're writing a **prompt**. This lesson teaches you how to write prompts that get genuinely useful answers instead of vague, generic ones — and how to do it ethically.\n\nHere's the roadmap:\n\n• Why the exact words you choose change the answer you get.\n• The ingredients of a strong prompt — **Role, Task, Context, Format** — plus **constraints**.\n• How to turn a weak prompt into a great one, step by step.\n• A quick ethics check on what belongs (and doesn't belong) in a prompt.\n\nPrompting well is one of the most useful real-life skills you can build right now — it's the difference between AI being a fancy autocomplete and a genuinely helpful study partner.`,
        image: "/images/lessons/ai-9-prompt.png",
        imageAlt: "A vague prompt and a detailed prompt side by side with their results",
        callout: {
          label: "Why it matters",
          text: "Whether you're using AI for an essay outline, a workout plan, or a tricky math idea, the gap between a frustrating answer and a great one is usually *how you asked* — something you fully control.",
        },
      },
      {
        id: "hook-story",
        kicker: "Real moment",
        title: "Two texts to the same AI, two totally different nights",
        body: `It's 9pm and both Maya and Priya are stuck on the same history essay. Maya types "help me write my essay" into a chatbot and gets three paragraphs of generic filler that don't even mention her actual topic. Frustrated, she copies it, tweaks a few words, and turns it in — not great, and she still doesn't understand the material.\n\nPriya types something longer: "Act as a patient history tutor. I'm writing a 9th-grade essay on the causes of World War I and I'm stuck on the alliance system. Explain it in 4 simple bullet points with one real example, then ask me a follow-up question to check I understood." Two minutes later she actually *gets it* — and writes her own essay using her own understanding.\n\nSame tool, same night, wildly different outcomes. The difference wasn't luck. It was the prompt.`,
        callout: {
          label: "Keep this in mind",
          text: "By the end of this lesson, you'll be able to write prompts like Priya's on purpose, every time — not by accident.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Prompting words in plain English",
        body: `A few words will come up again and again today. Here's the teen translation before we dig in:\n\n• **Prompt** — the text you type to tell an AI what you want.\n• **Role** — who you ask the AI to act as (a tutor, a coach, an editor).\n• **Task** — the action you want done (explain, list, rewrite, quiz me).\n• **Context** — background that narrows the answer (your grade, your goal, your situation).\n• **Format** — the shape you want the answer in (bullets, a table, a short paragraph).\n• **Constraint** — a limit or rule you add, like a word count or "don't use jargon."\n• **Iteration** — improving an answer with a follow-up instead of starting over (you'll go deeper on this next lesson).\n\nWe'll use every one of these with real examples — no need to memorize them cold.`,
        callout: {
          label: "Pro tip",
          text: "If a word feels fuzzy, swap in the plain meaning: a prompt is just an instruction, and each ingredient answers one question the AI would otherwise have to guess.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "A prompt is an instruction — and clearer instructions win",
        body: `A **prompt** is whatever you type to an AI. Remember how a language model works: it predicts text based on what you give it. So **your prompt is the raw material it builds from** — the clearer the material, the better the result.\n\nThink about ordering food. If you tell a server "just bring me something," you could get anything. If you say "a cheese pizza, no onions, cut into squares," you get exactly what you wanted. The AI is the same: it can't fill in the details you left inside your head.\n\nReal example: typing "tell me about dogs" might return random facts, breed lists, or training tips — who knows. Typing "list 5 dog breeds that are good for small apartments, with one reason each" gets you something you can actually use. Same topic, wildly different usefulness.`,
        callout: {
          label: "Common misconception",
          text: "Lots of people think the AI can sense what they *meant*. It can't read your mind — it only has your words. If a detail matters, you have to say it.",
        },
        checkIn: {
          prompt: "Why does the exact wording of a prompt matter so much?",
          choices: [
            "It doesn't — the AI ignores wording and just guesses",
            "The AI predicts its answer from your text, so clearer text produces better answers",
            "Wording only matters if you use capital letters",
            "The AI already knows what you meant before you type",
          ],
          correctIndex: 1,
          explanation:
            "An LLM generates its answer from the text you give it. Vague input tends to produce vague, generic output.",
        },
      },
      {
        id: "concept-2",
        kicker: "The recipe",
        title: "Four ingredients — in order: Role, Task, Context, Format",
        body: `Strong prompts usually mix four ingredients in a helpful order. Think of it like building a sandwich — put the pieces in a sensible sequence so the AI knows who to be before what to do.\n\n• **Role** — who the AI should act as ("act as a patient tutor for 8th graders").\n• **Task** — what you want done: \`explain\`, \`list\`, \`rewrite\`, \`compare\`.\n• **Context** — the background: who you are, what it's for ("I'm in 9th grade", "for a science-fair poster").\n• **Format** — how the answer should look ("5 bullet points", "a short paragraph", "a table").\n\n**Role → Task → Context → Format** gives the model a persona first, then the job, then the situation, then the shape of the answer. You rarely need all four, but stacking them in this order turns a vague request into a focused one.`,
        bullets: [
          "**Role:** the persona the AI should take.",
          "**Task:** the action you want.",
          "**Context:** background that narrows the answer.",
          "**Format:** the shape of the output.",
        ],
        checkIn: {
          prompt:
            "In the prompt 'Act as a patient tutor, explain fractions to a 6th grader as 3 bullet points,' which part is the FORMAT?",
          choices: [
            "Act as a patient tutor",
            "explain fractions",
            "to a 6th grader",
            "as 3 bullet points",
          ],
          correctIndex: 3,
          explanation:
            "Format describes how the answer should look. 'As 3 bullet points' is the format; 'act as a tutor' is role, 'explain fractions' is task, '6th grader' is context.",
        },
      },
      {
        id: "concept-3",
        kicker: "The fifth lever",
        title: "Constraints: tell the AI what NOT to do (and how much)",
        body: `Role, Task, Context, and Format tell the AI what you want. **Constraints** tell it the limits — what to avoid, how long to be, or what rule to follow. Without them, the AI will happily give you 12 paragraphs when you needed 3 sentences.\n\nCommon constraints:\n\n• **Length** — "in 3 sentences," "under 100 words," "just one paragraph."\n• **Exclusions** — "don't use jargon," "no spoilers," "skip the introduction, get straight to the list."\n• **Rules** — "only use examples from real history," "keep it appropriate for a 7th-grade classroom," "cite where each fact comes from."\n\nConstraints are often the difference between an answer that's technically correct and one that's actually usable. A perfect explanation of the water cycle is useless if it's 800 words long and you only had room for a 4-line caption.`,
        bullets: [
          "Add a length limit when you have limited space or time.",
          "Add exclusions to stop unwanted content or style.",
          "Add rules when accuracy or tone really matters.",
        ],
        callout: {
          label: "Try it",
          text: "Next time an answer is too long or off-tone, don't retype everything — just add one constraint: 'Same answer, but in 2 sentences.'",
        },
        checkIn: {
          prompt: "What does adding a constraint like 'in 3 bullet points, under 50 words' do?",
          choices: [
            "Nothing — the AI ignores length requests",
            "It sets a limit or rule that shapes the answer, like length or what to avoid",
            "It changes the AI's role automatically",
            "It deletes the context you already gave",
          ],
          correctIndex: 1,
          explanation:
            "Constraints are limits or rules — length caps, exclusions, or accuracy rules — layered on top of role, task, context, and format.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "From vague to valuable",
        body: `Watch a weak prompt become strong by stacking the ingredients. The first version forces the AI to guess everything; the second tells it the role, context, task, format, and a constraint — so the answer comes back ready to use.`,
        code: `❌ Weak:
"Explain photosynthesis."

✅ Strong:
"Act as a friendly biology tutor (role).
Explain photosynthesis in plain language (task).
I'm a 9th grader studying for a test (context).
Give 4 simple bullet points with one everyday example,
in under 80 words total (format + constraint)."`,
        codeCaption: "Same topic — very different results",
      },
      {
        id: "second-example",
        kicker: "Second example",
        title: "Same history question, two prompts",
        body: `**Vague prompt:** "Tell me about the Civil War."\n→ You get a generic, way-too-long summary with no connection to your actual assignment.\n\n**Strong prompt:**\n• **Role:** AP History study partner\n• **Task:** Explain three causes of the Civil War\n• **Context:** I'm preparing for a 10-minute class discussion; I already know it happened 1861–1865\n• **Format:** Three bullet points, one sentence each, plain language\n• **Constraint:** No dates unless essential; flag anything disputed by historians\n\n→ You get focused, usable notes you can actually rehearse from.\n\nSame AI. Different instruction quality. The second prompt respects the model's limits and your actual goal.`,
        callout: {
          label: "Notice this",
          text: "Prompting isn't tricking the AI — it's communicating clearly so the pattern-matcher has useful signals to work with.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth check",
        title: "There's no secret magic word",
        body: `Some people chase "magic prompts" — secret phrases they believe unlock hidden power. That's not how it works. There's no password. What actually helps is being **clear and specific**, which anyone can learn.\n\nIt's also a myth that longer is always better. A rambling prompt can bury the parts that matter. Aim for clear, not just long: include the details that count and cut the rest.`,
        callout: {
          label: "Myth check",
          text: "\"Type the right magic words and the AI gets smarter.\" False. Clarity beats secret phrases every time — the ingredients you just learned are all the 'magic' you need.",
        },
        checkIn: {
          prompt: "A classmate says a long, rambling prompt is always better than a short, clear one. Is that true?",
          choices: [
            "Yes — longer always beats shorter, no matter what",
            "No — clarity and relevant detail matter more than raw length",
            "Yes — more words help the AI 'remember' the request better",
            "No — prompts should never be longer than 5 words",
          ],
          correctIndex: 1,
          explanation:
            "A rambling prompt can bury the details that matter. The goal is clarity and useful specifics, not sheer length.",
        },
      },
      {
        id: "red-flags",
        kicker: "Red flags",
        title: "Prompting habits that cause trouble",
        body: `Avoid these common prompting mistakes — they lead to weak answers or ethical headaches:`,
        bullets: [
          "**Pasting someone else's private messages or essays** without permission — you're sharing their data, not just asking a question.",
          "**Asking the AI to impersonate a real teacher, doctor, or friend** — deceptive role-play can mislead others.",
          "**One vague sentence for a complex task** — then blaming the AI when the answer misses the point.",
          "**Skipping constraints on tone and audience** — then getting output that's too advanced, too casual, or wrong for the situation.",
        ],
        callout: {
          label: "Better move",
          text: "Clear task + honest context + respect for privacy beats any \"secret phrase\" every time.",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Upgrade a real prompt right now",
        body: `Open any AI chatbot you're allowed to use (or just plan it on paper). Pick something you actually need help with this week — a study guide, an email to a coach, a workout plan — and do this:\n\n1. Write your first, natural instinct of a prompt. Don't overthink it.\n2. Add a **Role**.\n3. Add a specific **Task**.\n4. Add **Context** about your real situation.\n5. Add a **Format** and one **Constraint** (a length limit is an easy one).\n6. Compare the before-and-after answers.\n\nYou'll feel the difference immediately — the second answer usually needs way less editing to actually use.`,
        callout: {
          label: "No AI handy right now?",
          text: "That's fine — write both versions of the prompt anyway. Predicting how the answer would change is most of the skill.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Audience and tone: the ingredient people forget",
        image: "/images/lessons/ai-ex-prompt.png",
        imageAlt: "A prompt being refined with audience and tone details added",
        body: `Once Role, Task, Context, and Format feel natural, add one more lever: **audience and tone**. Who will actually read or hear this, and how should it sound?\n\n"Explain black holes" could become "Explain black holes to my little sister who's 7, using a fun, silly tone" or "Explain black holes for a serious 11th-grade physics summary, formal tone." Same task, same topic — completely different, and both more useful than the original.\n\nAudience and tone matter most for writing you'll actually show someone else: emails, presentations, posts, essays. Naming who it's for and how it should sound often removes an entire round of "make it less formal" or "make it more serious" follow-ups.`,
        bullets: [
          "Name the audience: a teacher, a friend, a younger sibling, a stranger online.",
          "Name the tone: formal, casual, funny, encouraging, serious.",
          "This pairs naturally with Format — audience often decides the shape too.",
        ],
      },
      {
        id: "comparison",
        kicker: "See it side by side",
        title: "Vague vs. okay vs. great",
        body: `Not every weak prompt is equally weak. Seeing three levels side by side makes it easy to spot which ingredients are missing from your own prompts.`,
        table: {
          columns: ["Prompt", "What's missing", "Result"],
          values: [
            ["\"Help with my essay.\"", "Role, task, context, format — everything", "Generic, unusable"],
            ["\"Give feedback on my essay intro.\"", "Context and format", "Okay, but vague feedback"],
            [
              "\"Act as a writing coach. Give 3 specific fixes for my essay intro below, as a short numbered list. I'm in 9th grade.\"",
              "Nothing — all ingredients present",
              "Focused, usable feedback",
            ],
          ],
          rowCount: 3,
        },
        checkIn: {
          prompt: "Which prompt below is missing the FEWEST ingredients (Role, Task, Context, Format)?",
          choices: [
            "\"Help.\"",
            "\"Tell me about dogs.\"",
            "\"Act as a coach. In 5 bullets, list beginner home workouts for a small apartment.\"",
            "\"Explain stuff.\"",
          ],
          correctIndex: 2,
          explanation:
            "That prompt includes a role (coach), task (list), format (5 bullets), and enough context (beginner, small apartment) to be genuinely useful.",
        },
      },
      {
        id: "ethics",
        kicker: "Ethics moment",
        title: "Whose words, whose privacy?",
        body: `Good prompting isn't just about getting useful answers — it's also about what you put into the prompt in the first place. Two quick rules keep you on solid ground:\n\n• **Protect other people's privacy.** Don't paste a friend's private messages, a classmate's grades, or someone else's personal details into an AI tool as "context," even if it would make the answer better. That's their information, not yours to share.\n• **Be honest about AI's role.** If you use AI to help draft something and your teacher, coach, or boss expects your own words, disclose that you used it (when asked or required). Prompting well is a skill worth being proud of — not something to hide when honesty is expected.\n\nA great prompt should never depend on oversharing someone else's private information, or on pretending AI-shaped work is 100% unassisted when that matters to the person grading or trusting it.`,
        callout: {
          label: "Quick gut-check",
          text: "Before you paste something as 'context,' ask: is this mine to share, and would I be comfortable if the person it's about knew I typed it into an AI tool?",
        },
      },
      {
        id: "habits",
        kicker: "Make it automatic",
        title: "Five prompting habits worth keeping",
        body: `You don't need to consciously run through every ingredient forever — with practice it becomes a habit. Start with these five:\n\n1. **Pause before typing.** What do I actually need — and who is it for?\n2. **Stack Role → Task → Context → Format** for anything that matters.\n3. **Add one constraint** when length or tone is likely to be off.\n4. **Check before you paste** — no one else's private info as "context."\n5. **Compare the before/after.** Noticing the improvement is what makes the habit stick.\n\nFive habits, practiced a few times, and you'll write strong prompts without thinking about it.`,
        callout: {
          label: "This week",
          text: "Pick one real task — a text, an email, a study question — and run all five habits on it before you hit enter.",
        },
      },
      {
        id: "transfer-to-life",
        kicker: "Use it for real",
        title: "Build one reusable prompt template",
        body: `Save a personal template you can adapt for school projects:\n\n\`Role: [who the AI should act as]\nTask: [exactly what you need]\nContext: [what you already know + the real situation]\nFormat: [bullets / table / paragraph / step-by-step]\nConstraints: [length, tone, what to avoid]\`\n\nNext time you're stuck on homework, fill in the brackets instead of typing one vague line. You'll get better answers faster — and you'll stay in control of what the AI is actually doing for you.`,
        callout: {
          label: "Transfer this",
          text: "Good prompting is a communication skill, not a cheat code. The template works in any AI tool that accepts text instructions.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on...",
        body: `Think of the last time you used an AI tool (or imagine the next time you will). What's one detail you left out that the AI couldn't have guessed — a grade level, a purpose, a length limit, a tone?\n\nHold that thought. You'll put it into words in the reflection at the end of this lesson, after the knowledge check.`,
      },
      {
        id: "mini-case",
        kicker: "Mini-case",
        title: "Jordan's history study session",
        body: `Jordan has a World War I test on Friday and opens a chatbot Wednesday night. Let's watch the prompt evolve.\n\n**Attempt 1:** "Help me with history." → A random summary of WWI causes — too broad, not test-focused, no way to check understanding.\n\n**Attempt 2:** "Act as a history tutor. Quiz me on the causes of WWI. I'm a 9th grader with a test Friday. Ask 5 multiple-choice questions, one at a time, and wait for my answer before the next. Keep each question under 30 words." → Role, task, context, format, and two constraints (one-at-a-time, word limit) — Jordan gets an actual practice quiz.\n\nJordan also considers ethics: no pasting a friend's shared study guide that says "don't share this" into the chat, and telling his teacher he used an AI quiz generator to practice, since she'd asked students to disclose that.\n\nThe upgrade wasn't luck — it was Role, Task, Context, Format, a Constraint, and one ethical check, applied on purpose.`,
        checkIn: {
          prompt: "What made Jordan's second attempt so much more useful than his first?",
          choices: [
            "He typed it faster",
            "He stacked role, task, context, format, and constraints instead of leaving them for the AI to guess",
            "He used more exclamation points",
            "He asked the AI to lie about being an AI",
          ],
          correctIndex: 1,
          explanation:
            "Jordan's upgrade came from deliberately supplying the ingredients the AI needs — not from any trick or shortcut.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Self-check",
        title: "Can you spot all five ingredients?",
        body: `One more rep before the graded knowledge check. Read this prompt carefully: "Act as a friendly coach. In exactly 3 bullet points, under 60 words total, suggest warm-up stretches for a 14-year-old before a soccer game — nothing that needs equipment."\n\nSee if you can mentally label each ingredient — role, task, context, format, constraint — before answering below.`,
        checkIn: {
          prompt: "In that soccer prompt, what is the CONSTRAINT?",
          choices: [
            "\"Act as a friendly coach\"",
            "\"suggest warm-up stretches\"",
            "\"a 14-year-old before a soccer game\"",
            "\"under 60 words total... nothing that needs equipment\"",
          ],
          correctIndex: 3,
          explanation:
            "The word/length limit and the 'no equipment' rule are constraints — limits layered on top of the role, task, context, and format.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've learned that a prompt is an instruction, that clearer instructions win, and that **Role, Task, Context, Format**, and **Constraints** turn vague requests into useful ones — while keeping other people's privacy and honesty in mind.\n\nNext lesson covers how to *refine* answers with follow-ups and examples. But first, lock in today's ideas.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict).`,
      },
    ],
  },
  bigIdeas: [
    "A **prompt** is your instruction; clearer prompts produce better answers.",
    "Strong prompts often include **Role, Task, Context, Format**, and **Constraints** — in that order.",
    "Prompting is a **learnable skill**, not luck — and it comes with a privacy/honesty responsibility.",
  ],
  keyTerms: [
    { term: "Prompt", definition: "The text instruction you give an AI to tell it what you want." },
    { term: "Context", definition: "Background details that narrow the AI toward the answer you actually need." },
    { term: "Role (persona)", definition: "Telling the AI who to act as, e.g., 'a patient tutor'." },
    { term: "Format", definition: "The shape you want the answer in — list, paragraph, table, etc." },
    { term: "Constraint", definition: "A limit or rule added to a prompt, like a word count or an exclusion." },
  ],
  realWorld:
    "Asking 'give me ideas' returns generic fluff. Asking 'act as a coach, give me 5 beginner-friendly 20-minute workouts I can do in a small room, under 100 words' returns something you can actually use.",
  quiz: [
    {
      id: "q1",
      question: "Why does the wording of your prompt matter so much?",
      choices: [
        "It doesn't — the AI ignores your wording",
        "Longer prompts always cost money",
        "The AI predicts its answer from your text, so clearer prompts produce better answers",
        "The AI only understands one secret password",
      ],
      correctIndex: 2,
      explanation:
        "An LLM generates based on your input. The clearer and more specific the prompt, the better the output.",
    },
    {
      id: "q2",
      question: "In the prompt 'Act as a patient tutor, explain fractions to a 6th grader as 3 bullet points', which part is the FORMAT?",
      choices: [
        "as 3 bullet points",
        "Act as a patient tutor",
        "explain fractions",
        "to a 6th grader",
      ],
      correctIndex: 0,
      explanation:
        "Format describes how the answer should look. 'As 3 bullet points' is the format; 'act as a tutor' is role, 'explain fractions' is task, '6th grader' is context.",
    },
    {
      id: "q3",
      question: "Which prompt will most likely give a useful answer?",
      choices: [
        "Tell me about money.",
        "Help with saving.",
        "Explain savings accounts to me.",
        "Act as a finance coach for teens. In 5 bullets, explain how a savings account works, with one real example.",
      ],
      correctIndex: 3,
      explanation:
        "It includes role, task, format, and context — exactly the ingredients that produce focused, useful answers.",
    },
    {
      id: "q4",
      question: "What does adding 'context' to a prompt do?",
      choices: [
        "Slows the AI down for no reason",
        "Gives background that narrows the AI toward the answer you actually need",
        "Tells the AI to act as a celebrity",
        "Sets the font of the answer",
      ],
      correctIndex: 1,
      explanation:
        "Context (your grade level, purpose, audience) helps the AI tailor the response to your real situation.",
    },
    {
      id: "q5",
      question: "What is a 'constraint' in a prompt?",
      choices: [
        "A secret password that unlocks better answers",
        "Another word for the AI's role",
        "A type of hallucination",
        "A limit or rule, like a word count or an exclusion, that shapes the answer",
      ],
      correctIndex: 3,
      explanation:
        "Constraints are limits or rules — length caps, exclusions, accuracy rules — layered on top of the other ingredients.",
    },
    {
      id: "q6",
      question: "Why is naming the AUDIENCE and TONE often helpful in a prompt?",
      choices: [
        "It shapes how the answer sounds and for whom, cutting out extra rounds of 'make it more formal/casual'",
        "It isn't helpful — audience never matters",
        "It replaces the need for a task entirely",
        "It only matters for coding prompts",
      ],
      correctIndex: 0,
      explanation:
        "Naming who the answer is for and how it should sound (audience and tone) removes a common source of back-and-forth.",
    },
    {
      id: "q7",
      question: "Your friend shares private notes marked 'don't share this.' Is it okay to paste them into an AI chat as 'context' for a better answer?",
      choices: [
        "Yes, if it makes the AI's answer better",
        "No — it's not your information to share, regardless of how useful it would be",
        "Yes, but only if you delete the chat afterward",
        "It's fine as long as the AI promises not to save it",
      ],
      correctIndex: 1,
      explanation:
        "Respecting other people's privacy matters more than optimizing a prompt. Their information isn't yours to share.",
    },
    {
      id: "q8",
      question: "How does writing good prompts connect to computational thinking?",
      choices: [
        "It doesn't — prompting isn't related to computer science",
        "Only writing actual code counts as computational thinking",
        "Breaking a fuzzy goal into precise, ordered instructions is a form of decomposition and algorithmic thinking",
        "Computational thinking only applies to math class",
      ],
      correctIndex: 2,
      explanation:
        "Turning a vague goal into ordered, specific instructions (Role → Task → Context → Format → Constraints) is the same decomposition skill at the heart of computational thinking.",
    },
  ],
  reflection: {
    prompt:
      "Take a boring prompt like 'help me with my essay' and rewrite it using Role → Task → Context → Format (at least three of the four).",
    placeholder: "Act as… I'm working on… Please… in the form of…",
  },
};
