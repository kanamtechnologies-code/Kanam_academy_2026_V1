import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson12: AILessonConfig = {
  id: "ai-12",
  title: "12. AI at School: Help vs. Cheating",
  goal: "Draw a clear line between using AI to learn and using it to cheat, navigate the gray areas honestly, and build personal rules for effective AI use in school.",
  xpReward: 600,
  badge: "Honest Scholar",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/11",
  nextHref: "/learn/ai/13",
  lessonModule: {
    durationLabel: "~20–25 min",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `AI can be the best study buddy you've ever had — or a shortcut that quietly robs you of actually learning. This lesson helps you draw a clear, confident line between the two, including the gray areas that aren't obvious.\n\nRoadmap:\n\n• The honest test for any AI use at school.\n• A side-by-side of what's usually **help** vs. usually **cheating**.\n• Three simple rules that keep you on the right side of the line.\n• The gray-area cases — grammar checkers, study groups, brainstorming — and why they're not as confusing as they seem.\n\nThis is real and immediate: you'll face these choices on homework, essays, and projects this year.`,
        image: "/images/lessons/ai-12-school.png",
        imageAlt: "A balance scale weighing 'learning with AI' against 'cheating'",
        callout: {
          label: "Why it matters",
          text: "Using AI honestly makes you learn faster and look great doing it. Using it to skip the work leaves you stuck when the test (or real life) shows up — and AI misuse is increasingly easy to detect.",
        },
      },
      {
        id: "hook-story",
        kicker: "Real moment",
        title: "Same essay, same night, opposite outcomes",
        body: `It's the night before a book report is due. Priya opens a chatbot and asks it to quiz her on the main themes, then writes her own paragraphs, then asks for feedback on her thesis sentence only. It takes her an extra 20 minutes, but she understands the book better than she did in class.\n\nAcross town, Marcus opens the same chatbot and types "write me a 5-paragraph book report on this book," changes the font, and submits it as his own. It takes him five minutes.\n\nBoth used AI. Only one of them actually learned anything — and only one of them could confidently answer a follow-up question about the book in class the next day.`,
        callout: {
          label: "Keep this in mind",
          text: "The tool was identical. The choice about how to use it wasn't.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Academic integrity words in plain English",
        body: `• **Academic integrity** — being honest in schoolwork: doing and crediting your own work.\n• **Plagiarism** — passing off someone (or something) else's work as your own.\n• **Transparency** — being open about whether and how you used AI on an assignment.\n• **AI as tutor** — using AI to explain, quiz, and give feedback so you learn, not to replace your work.\n• **Disclosure** — explicitly telling a teacher how you used AI, when it's required or expected.\n• **Gray area** — a case where the "help vs. cheating" line isn't immediately obvious and depends on context or rules.\n\nMost school AI questions come down to combinations of these six ideas.`,
        callout: {
          label: "Pro tip",
          text: "When a situation feels gray, transparency is usually your safest move: ask, or disclose, rather than guess and hope.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "AI can supercharge learning — or short-circuit it",
        body: `AI can act like a tireless tutor available 24/7: it explains, quizzes you, and gives feedback whenever you need it. The very same tool can also do your assignment *for* you — and skip the learning entirely.\n\nHere's the key: the tool isn't good or bad. The **how** is. Lifting weights builds muscle; getting a robot to lift them for you builds nothing. AI is the same — it only makes you stronger if *you* do the mental reps.\n\nThe honest test: *Does this use help me understand and do the work, or does it replace my thinking and pass someone else's work off as mine?*`,
        callout: {
          label: "The honest test",
          text: "Am I using AI to learn the material, or to avoid learning it? Your honest answer usually tells you which side of the line you're on.",
        },
        checkIn: {
          prompt: "What's the honest test for using AI on schoolwork?",
          choices: [
            "Will I get caught?",
            "Does this help me learn and do the work, or replace my thinking and pass off AI work as mine?",
            "Is the AI free?",
            "Is it faster than doing it myself?",
          ],
          correctIndex: 1,
          explanation:
            "Integrity is about whether you're learning and doing your own work — not just about getting caught.",
        },
      },
      {
        id: "concept-2",
        kicker: "Where's the line?",
        title: "Help vs. cheating, side by side",
        body: `Schools' rules vary, but most agree on the spirit. The dividing question is simple: *who is doing the thinking and the work?*\n\nIf AI helps *you* learn, or improves work *you* created, that's usually fine. If AI does the work that was meant to measure *your* skills, that's usually cheating.`,
        bullets: [
          "OK: explanations, practice quizzes, feedback on your own work.",
          "OK: brainstorming and outlining ideas you then develop yourself.",
          "Cheating: turning in AI-written work as if you wrote it.",
          "Cheating: using AI where your teacher has forbidden it.",
        ],
        table: {
          columns: ["What you do", "Usually..."],
          values: [
            ["Ask AI to explain a concept", "Help ✅"],
            ["Have AI quiz you or react to your own draft", "Help ✅"],
            ["Brainstorm ideas you then develop yourself", "Help ✅"],
            ["Submit AI-written text as your own", "Cheating ❌"],
            ["Have AI do a graded assignment for you", "Cheating ❌"],
            ["Use AI where the teacher banned it", "Cheating ❌"],
          ],
          rowCount: 6,
        },
        checkIn: {
          prompt: "Which of these is generally an OK, learning-focused use of AI?",
          choices: [
            "Submitting an AI-written essay as your own",
            "Having AI take an online quiz for you",
            "Asking AI to explain a concept and quiz you on it",
            "Using AI on a test where it's banned",
          ],
          correctIndex: 2,
          explanation:
            "Using AI to explain and quiz you helps you learn. The others replace your work or break the rules.",
        },
      },
      {
        id: "concept-3",
        kicker: "Your move",
        title: "Three rules that keep you honest",
        body: `When you're unsure, these three keep you safe and still learning:\n\n1. **Ask first** — every teacher and class has different rules. When in doubt, ask what's allowed *before* you use AI.\n2. **Be transparent** — if you used AI, be ready to say how. Some teachers want it cited, like any other source.\n3. **Do the thinking** — use AI to learn *with* you, never *for* you. The gut-check: if you couldn't redo it on your own, you didn't actually learn it.`,
        callout: {
          label: "Why it matters",
          text: "Cheating with AI mostly cheats yourself — you skip the learning, then can't perform when it counts (and AI misuse is increasingly easy to detect).",
        },
        checkIn: {
          prompt: "You're not sure if AI is allowed on an assignment. What's the best move?",
          choices: [
            "Use it anyway and hope it's fine",
            "Ask your teacher what's allowed before using it",
            "Never use AI for anything ever",
            "Use it but delete your history",
          ],
          correctIndex: 1,
          explanation:
            "Rules vary by class and teacher. Asking first keeps you honest and avoids accidental cheating.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Same assignment, two very different choices",
        body: `You have an essay due on a book you read. Two students both open an AI chatbot. Watch where the line falls.\n\n**Maya (learning):** asks the AI to "quiz me on the main themes," then writes her own draft, then asks "give me feedback on my thesis — don't rewrite it." She does every bit of the writing herself. The AI made her *better*.\n\n**Theo (cheating):** types "write me a 5-paragraph essay on this book" and turns it in as his own. The AI did the assignment that was supposed to measure *his* skills.\n\n**Same tool, opposite outcomes.** Maya learned the material and can defend her work; Theo skipped the learning and risks getting caught. The difference was never the AI — it was the choice.`,
        code: `Maya: "quiz me" → I write the draft → "feedback on MY draft"   →  ✅ learning
Theo: "write my essay" → submit it as mine                     →  ❌ cheating`,
        codeCaption: "The line is about who does the thinking",
        callout: {
          label: "Pro tip",
          text: "A quick self-check before submitting: could you explain or redo this without the AI? If yes, you learned it. If no, you leaned on it too hard.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth check",
        title: "\"If it's not explicitly banned, it's automatically fine\"",
        body: `Some students assume: if the syllabus doesn't say "no AI," anything goes. That's risky thinking — many teachers assume traditional academic honesty rules (do your own work, cite your sources) apply by default, AI included, even without a specific AI clause.\n\nThe opposite myth also exists: "any AI use at all is cheating." That's too strict — spell-check, grammar tools, and search engines are AI-powered too, and are almost universally accepted. The real skill isn't memorizing a blanket rule; it's knowing that the line depends on context, and asking when it's unclear.`,
        callout: {
          label: "Myth check",
          text: "\"No explicit rule = totally fine\" and \"any AI = cheating\" are both oversimplified. When rules aren't spelled out, ask — don't assume either extreme.",
        },
        checkIn: {
          prompt: "Your syllabus doesn't mention AI at all. What should you assume?",
          choices: [
            "That any use of AI, including having it write your essay, is automatically fine",
            "That standard academic honesty rules likely still apply, and you should ask your teacher to be sure",
            "That you can never use spell-check or grammar tools either",
            "That the assignment doesn't count toward your grade",
          ],
          correctIndex: 1,
          explanation:
            "Silence on AI usually doesn't mean 'anything goes.' Standard honesty expectations likely still apply — when in doubt, ask.",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Write your own AI-use plan for a real assignment",
        body: `Pick an assignment you actually have coming up (or a recent one). Write down, in your own words:\n\n1. What would count as **help** for this specific assignment.\n2. What would cross into **cheating** for this specific assignment.\n3. One question you'd ask your teacher if you're not sure.\n\nDoing this *before* you open an AI tool — not after — is what keeps the line clear when you're tired and just want to be done.`,
        callout: {
          label: "No assignment due right now?",
          text: "Use a past assignment and imagine redoing it with AI. Where would you have drawn the line?",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "How to disclose AI use like a pro",
        image: "/images/lessons/ai-ex-prompt.png",
        imageAlt: "A student adding a short AI-use note to the end of an assignment",
        body: `When disclosure is expected (or just good practice), a short, specific note beats a vague one. Instead of "I used AI," try something like: "I used [tool] to quiz myself on chapter themes and to get feedback on my thesis sentence. All writing is my own."\n\nThis level of detail does two things: it shows a teacher exactly what role AI played, and it forces *you* to be honest with yourself about that role while writing it. If the honest disclosure would sound bad ("I used it to write the whole thing"), that's useful information too — it's telling you something before you submit, not after.`,
        bullets: [
          "Name the tool and the specific task it helped with.",
          "State clearly what you did yourself.",
          "If writing the disclosure feels uncomfortable, that discomfort is a signal worth listening to.",
        ],
      },
      {
        id: "comparison",
        kicker: "See it side by side",
        title: "The AI-use spectrum, assignment by assignment",
        body: `The same AI action can be fine in one assignment and risky in another — the assignment's *purpose* changes the answer.`,
        table: {
          columns: ["Assignment purpose", "Using AI to brainstorm ideas", "Using AI to write final text"],
          values: [
            ["Practice worksheet (not graded)", "Fine", "Usually fine — it's practice"],
            ["Graded essay testing your writing", "Usually fine", "Usually cheating"],
            ["In-class timed test", "Not applicable (no AI access)", "Cheating if AI is used at all"],
            ["Group project brainstorm session", "Fine, if disclosed per group norms", "Depends on teacher's specific rules"],
          ],
          rowCount: 4,
        },
        checkIn: {
          prompt: "Why can the SAME action (like brainstorming with AI) be fine for one assignment and risky for another?",
          choices: [
            "It can't — the rule is always identical for every assignment",
            "Because what the assignment is actually trying to measure about your skills changes what counts as help vs. cheating",
            "Because AI works differently depending on the day of the week",
            "Because only essays have rules about AI",
          ],
          correctIndex: 1,
          explanation:
            "The purpose of the assignment (what skill it's meant to measure) determines whether a given AI use supports or undermines that goal.",
        },
      },
      {
        id: "ethics",
        kicker: "Ethics moment",
        title: "Cheating doesn't just affect you",
        body: `It's tempting to think of academic honesty as a personal risk-reward calculation — "will I get caught, and does it matter?" But integrity has a community dimension too: grades, honors, and trust are shared systems. When AI-generated work gets submitted as original, it can unfairly shift curves, rankings, or trust that affects classmates who did the work honestly.\n\nThere's also a fairness angle: not everyone has equal comfort or access to AI tools yet, and rules exist partly to keep the playing field even while schools figure out shared norms. Respecting the rules — even ones that feel outdated or unclear — is part of being a trustworthy member of a school community, not just avoiding personal punishment.`,
        callout: {
          label: "Quick gut-check",
          text: "Academic honesty isn't just 'don't get caught.' It's 'don't quietly take an unfair advantage over people who followed the same rules.'",
        },
      },
      {
        id: "habits",
        kicker: "Make it automatic",
        title: "Four habits that keep you on the right side of the line",
        body: `1. **Ask before you assume.** Different teachers, different rules — get clarity up front.\n2. **Disclose specifically** when it's expected, naming exactly what AI did and didn't do.\n3. **Self-test before submitting.** Could you redo or explain this without the AI open?\n4. **When gray, err toward transparency.** A quick honest question is always safer than a guess you have to defend later.`,
        callout: {
          label: "This week",
          text: "Before your next AI-assisted assignment, write one sentence describing exactly how you plan to use it — then check it against your teacher's actual rules.",
        },
      },
      {
        id: "standards-connect",
        kicker: "Why this counts",
        title: "Academic integrity is digital citizenship in action",
        body: `• **ISTE 1.2 — Digital Citizen:** acting safely, legally, and ethically with technology directly includes how you use AI on schoolwork — this is one of the clearest real-world applications of that standard.\n• **CSTA Impacts of Computing:** understanding how a technology (AI) changes the meaning of "doing your own work," and the social effects of that shift on trust and fairness in a classroom, is exactly what this standard is about.\n• **ISTE 1.3 — Knowledge Constructor:** using AI to build genuine understanding (quizzing, feedback) rather than to bypass the construction of knowledge altogether is the difference this whole lesson is built around.\n\nThe help-vs-cheating line isn't just a school rule — it's a live example of navigating a new technology's impact responsibly.`,
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on...",
        body: `Think of a gray-area AI use you've seen or considered — maybe grammar-checking, or having AI "just fix the wording" of something you wrote. Where do you personally think that falls, and why?\n\nHold that thought for the reflection at the end of this lesson.`,
      },
      {
        id: "mini-case",
        kicker: "Mini-case",
        title: "The study group and the shared AI summary",
        body: `A study group for a history test decides to split up the chapters: each person asks an AI to summarize their assigned chapter, then they share the summaries in a group chat so everyone can study from all of them.\n\nIs that cheating? It depends on what the *assignment* actually is. If the test measures whether each student can explain the material — and everyone still has to read, understand, and be able to discuss their own summary plus the others' — this is a reasonable, disclosed study strategy, similar to splitting up flashcards.\n\nBut if a teacher assigned each student to write their *own* original chapter summary as a graded assignment, and someone submits the AI's summary as their personal work, that crosses into submitting AI work as your own — even though the group's *intention* was collaborative studying, not cheating.\n\nSame AI action, two different contexts, two different answers — which is exactly why "ask first" and "know the assignment's purpose" matter more than any single blanket rule.`,
        checkIn: {
          prompt: "What determines whether the study group's AI-summary strategy is fine or crosses into cheating?",
          choices: [
            "Whether they used a free or paid AI tool",
            "Whether the assignment is a graded, individual writing task or a general studying/discussion activity",
            "How many people are in the study group",
            "It's always fine as long as it's a group activity",
          ],
          correctIndex: 1,
          explanation:
            "The same AI-assisted action can be fine for general studying but crosses the line if it replaces an individually graded piece of original work.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Self-check",
        title: "Judge the scenario",
        body: `One more rep before the graded knowledge check. A classmate says: "My teacher never said I couldn't use AI on the take-home essay, so I had it write the whole first draft, then I just changed a few sentences."`,
        checkIn: {
          prompt: "Using what you've learned, how should you evaluate your classmate's reasoning?",
          choices: [
            "It's fine — no explicit rule means anything goes",
            "It's risky reasoning — 'not explicitly banned' isn't the same as 'clearly allowed,' and having AI write the draft likely crosses into cheating on a writing assignment",
            "It's fine as long as they changed at least five sentences",
            "It doesn't matter because AI-written work can't be detected",
          ],
          correctIndex: 1,
          explanation:
            "Assuming silence means permission is risky. Having AI write the actual draft of a graded writing assignment usually replaces the exact skill being assessed.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Students who use AI honestly — to understand faster and get feedback — pull ahead. Students who use it to skip the learning fall behind the moment AI isn't allowed, and their choices can quietly affect classmates too.\n\nNext we'll dig into how AI picks up bias from data. First, lock in today's ideas.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict).`,
      },
    ],
  },
  bigIdeas: [
    "The same AI can **help you learn** or **help you cheat** — it's about how you use it.",
    "Using AI for explanations, practice, and feedback is usually fine; **submitting AI work as your own** is cheating.",
    "**Ask first, be transparent, and do the thinking** yourself.",
    "Academic honesty is a **shared community trust**, not just a personal risk calculation.",
  ],
  keyTerms: [
    { term: "Academic integrity", definition: "Being honest in schoolwork — doing and crediting your own work." },
    { term: "Plagiarism", definition: "Passing off someone (or something) else's work as your own." },
    { term: "Transparency", definition: "Being open about whether and how you used AI on an assignment." },
    { term: "AI as tutor", definition: "Using AI to explain, quiz, and give feedback so you learn — not to replace your work." },
    { term: "Disclosure", definition: "Explicitly telling a teacher how you used AI on an assignment, when required or expected." },
  ],
  realWorld:
    "A student who has AI explain each wrong answer on a practice quiz learns more than a classmate who has AI write the whole essay — and is ready when the closed-book test arrives.",
  quiz: [
    {
      id: "q1",
      question: "What's the honest test for using AI on schoolwork?",
      choices: [
        "Will I get caught?",
        "Does this help me learn and do the work, or replace my thinking and pass off AI work as mine?",
        "Is the AI free?",
        "Is it faster than doing it myself?",
      ],
      correctIndex: 1,
      explanation:
        "Integrity is about whether you're learning and doing your own work — not just about getting caught.",
    },
    {
      id: "q2",
      question: "Which of these is generally an OK, learning-focused use of AI?",
      choices: [
        "Submitting an AI-written essay as your own",
        "Having AI take an online quiz for you",
        "Asking AI to explain a concept and quiz you on it",
        "Using AI on a test where it's banned",
      ],
      correctIndex: 2,
      explanation:
        "Using AI to explain and quiz you helps you learn. The others replace your work or break the rules.",
    },
    {
      id: "q3",
      question: "You're not sure if AI is allowed on an assignment. What's the best move?",
      choices: [
        "Use it anyway and hope it's fine",
        "Ask your teacher what's allowed before using it",
        "Never use AI for anything ever",
        "Use it but delete your history",
      ],
      correctIndex: 1,
      explanation:
        "Rules vary by class and teacher. Asking first keeps you honest and avoids accidental cheating.",
    },
    {
      id: "q4",
      question: "Why does cheating with AI mostly hurt YOU?",
      choices: [
        "It doesn't hurt anyone",
        "You skip the learning, so you can't perform when AI isn't allowed (and misuse is detectable)",
        "It uses up your phone battery",
        "It makes the AI angry",
      ],
      correctIndex: 1,
      explanation:
        "Skipping the learning means you can't do it on your own later — and AI misuse is increasingly easy to detect.",
    },
    {
      id: "q5",
      question: "Your syllabus never mentions AI at all. What's the safest assumption?",
      choices: [
        "That anything goes, including having AI write your whole assignment",
        "That standard academic honesty rules likely still apply, and it's worth asking your teacher to confirm",
        "That you must avoid all AI tools including spell-check",
        "That the assignment is automatically optional",
      ],
      correctIndex: 1,
      explanation:
        "Silence about AI usually doesn't mean permission for anything. Standard expectations of original work likely still apply.",
    },
    {
      id: "q6",
      question: "Why can brainstorming with AI be 'fine' for one assignment but 'cheating' for another?",
      choices: [
        "It's random and depends on luck",
        "Because the purpose of the assignment (what skill it's meant to measure) changes what counts as legitimate help",
        "Because AI tools change their rules daily",
        "It's never fine to brainstorm with AI",
      ],
      correctIndex: 1,
      explanation:
        "The same AI action can support or undermine an assignment's goal depending on what that specific assignment is designed to measure.",
    },
    {
      id: "q7",
      question: "Beyond your own grade, why does academic honesty matter to your classmates too?",
      choices: [
        "It doesn't affect anyone else at all",
        "Grades, rankings, and trust are shared systems — submitting AI work as your own can unfairly affect others who did honest work",
        "Because AI tools cost money for the whole class",
        "Because teachers only grade the whole class as one group",
      ],
      correctIndex: 1,
      explanation:
        "Academic integrity has a community dimension: dishonest work can distort shared systems like grading curves and trust, affecting honest classmates.",
    },
    {
      id: "q8",
      question: "How does the help-vs-cheating question connect to being a good digital citizen (ISTE 1.2)?",
      choices: [
        "It doesn't relate to digital citizenship at all",
        "Using technology ethically, safely, and legally — including AI on schoolwork — is a direct, real-world example of digital citizenship",
        "Digital citizenship only applies to social media use",
        "Only IT teachers need to think about digital citizenship",
      ],
      correctIndex: 1,
      explanation:
        "Navigating AI's role in your schoolwork honestly and responsibly is a concrete, everyday application of the Digital Citizen standard.",
    },
  ],
  reflection: {
    prompt:
      "Write 3 personal rules for using AI on schoolwork that you'd actually follow. Make them specific.",
    placeholder: "1) I'll use AI to explain, not to write. 2) I'll ask my teacher when… 3) …",
  },
};
