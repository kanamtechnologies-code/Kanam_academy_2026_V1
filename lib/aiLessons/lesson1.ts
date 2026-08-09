import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson1: AILessonConfig = {
  id: "ai-1",
  title: "1. What Is AI, Really?",
  goal: "Define artificial intelligence in plain language, separate real AI from sci-fi myths, and tell the difference between narrow and general AI.",
  xpReward: 50,
  badge: "AI Explorer",
  dashboardHref: "/dashboard",
  nextHref: "/learn/ai/2",
  instructorScript: `**Coach's note**
Today's lesson: **What Is AI, Really?**.

**Goal:** Define artificial intelligence in plain language, separate real AI from sci-fi myths, and tell the difference between narrow and general AI.

**How to facilitate**
1. Warm-up: ask students what they already think about "What you'll learn today".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `The word "AI" is everywhere — on your phone, in the news, maybe even in arguments at the dinner table. By the end of this lesson you'll actually know what it means, and you'll be able to tell the real thing apart from the movie version.\n\nHere's the roadmap:\n\n• **What AI really is** — in plain language, no hype.\n• **Narrow vs. general AI** — why the AI we have today is a specialist, not a robot genius.\n• **Why it *seems* so smart** — the pattern-matching trick behind the curtain.\n• **Myths, a real case study, and habits** that help you use AI wisely starting today.\n\nThis isn't just trivia. The same AI you'll learn about is choosing the next video in your feed, finishing your sentences when you text, helping with homework, and powering the face-unlock on your phone. Understanding it puts *you* in charge of it.`,
        image: "/images/lessons/ai-1-what-is-ai.png",
        imageAlt: "A friendly robot brain made of circuits and data",
        callout: {
          label: "Why it matters",
          text: "You make dozens of decisions every day with help from AI — what to watch, what to buy, which route to take. Knowing how it actually works helps you trust it when you should and question it when you shouldn't.",
        },
      },
      {
        id: "hook-story",
        kicker: "True story",
        title: "The chatbot that said it was \"tired\"",
        body: `A few years ago, students at a school science fair built a simple chatbot for their project. It answered questions about the solar system pretty well — until a judge typed, "Do you ever get tired of answering the same questions?" The bot replied, "Yes, it can be exhausting, but I love helping out!"\n\nHere's the twist: that chatbot has no body, no feelings, and never gets tired. It didn't lie on purpose — it doesn't even know what a lie is. It simply predicted that those words *sounded* like a natural, friendly response, based on patterns from thousands of human conversations it had studied.\n\nThat one moment sums up the whole mystery you're about to solve: AI can sound completely human without being anything like a human. By the end of this lesson, you'll know exactly why — and a confident-sounding reply will never fool you the same way again.`,
        callout: {
          label: "Keep this in mind",
          text: "Sounding human and being human are two very different things. This entire course is about learning to tell them apart.",
        },
      },
      {
        id: "glossary",
        kicker: "Words you'll need",
        title: "Your AI vocabulary starter pack",
        body: `Before going further, let's load a few words into memory. You'll see these terms again and again this year — get comfortable with them now and everything else gets easier.`,
        bullets: [
          "**Artificial intelligence (AI)** — software built to do tasks that normally need human thinking.",
          "**Narrow AI** — AI that's a specialist at one job. Every AI that exists today is narrow AI.",
          "**General AI (AGI)** — a hypothetical AI that could think across any topic like a human. It does not exist yet.",
          "**Pattern** — a repeated structure in data that AI uses to make predictions.",
          "**Hype** — when a headline, ad, or movie makes AI sound far more powerful than it really is.",
        ],
        callout: {
          label: "Study tip",
          text: "Keep a running list of new AI words each lesson. By the end of the course, you'll have your own AI dictionary — and you'll actually understand it.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "AI is software that does tasks that usually need human thinking",
        body: `**Artificial intelligence (AI)** is computer software built to do things we normally think of as needing human intelligence — like recognizing a face in a photo, understanding a sentence, recommending a song, or beating a world champion at chess.\n\nHere's a way to picture it. Imagine a brand-new employee who can't think for themselves but has read a *mountain* of examples. Ask them something similar to what they've seen and they'll respond impressively. Ask something totally new and they'll guess based on patterns — sometimes brilliantly, sometimes hilariously wrong. That's today's AI.\n\nThe key thing to hold onto: AI is **not magic and not alive**. It's math and code running on a computer. It looks "smart" because it has found **patterns** in huge amounts of data — not because it understands the world the way you do.`,
        callout: {
          label: "Myth check",
          text: "Today's AI does not have feelings, opinions, or a will of its own. When a chatbot says \"I think\" or \"I'm happy to help,\" it is predicting words that sound right for the situation — not actually thinking or feeling like a person.",
        },
        checkIn: {
          prompt: "A vending machine gives you a soda after you press a button and pay the right amount. Is that AI?",
          choices: [
            "No — it just follows one fixed rule every time; it never learned a pattern from data",
            "Yes — it 'decided' to give you the soda” belongs to a different situation than the one in the question stem",
            "Yes — any machine that responds automatically to input counts as AI” belongs to a different situation than the one in the question stem",
            "It depends on whether the machine tracks which sodas sell best” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "AI specifically means software that learned patterns from data to handle tasks that normally need judgment. A vending machine follows one hard-coded rule — no learning, no pattern-matching, no AI, even if it reacts automatically or logs sales data.",
        },
      },
      {
        id: "concept-2",
        kicker: "Two kinds of AI",
        title: "Narrow AI is real today. General AI is still science fiction.",
        body: `Scientists split AI into two types, and the difference matters a lot:\n\n• **Narrow AI** does **one kind of task** very well — translating text, spotting spam, suggesting videos, recognizing faces. *Every* AI that exists today is narrow AI.\n• **General AI (AGI)** would think, learn, and adapt across *any* topic the way a human can. It **does not exist yet** — it's a long-term goal some researchers are working toward.\n\nThink of narrow AI like the specialists in a hospital. A heart surgeon is incredible at heart surgery but you wouldn't ask them to fix your teeth. In the same way, the chatbot that writes a poem can't drive your car, and the AI that drives a car can't write a poem. Each is a specialist trained for one job.\n\nMovies love to show one super-AI that can do everything and decides to take over the world. That's general AI, and it's fiction for now. The real AI in your life is a collection of narrow specialists, each quietly doing its one task.`,
        bullets: [
          "**Narrow AI** = a specialist tool. Real and everywhere.",
          "**General AI** = a flexible all-rounder, like a human mind. Not real yet.",
          "The AI you use today is *always* narrow AI.",
        ],
        callout: {
          label: "Common misconception",
          text: "When an AI is amazing at one task — say, writing essays — it's tempting to assume it's amazing at everything. It isn't. Skill at one job tells you almost nothing about its skill at a different one.",
        },
        checkIn: {
          prompt: "Which of these is an example of narrow AI?",
          choices: [
            "A single AI that can drive a car, diagnose illness, write a novel, and do your taxes equally well",
            "A recommendation tool that suggests what video to watch next, and nothing else",
            "A system that reasons across any topic the way a flexible human mind can",
            "A tool that gets better at every unrelated task the more people use it",
          ],
          correctIndex: 1,
          explanation:
            "A tool that specializes in one job — like recommending videos — is narrow AI. Mastering every task at once, or improving across unrelated tasks at the same time, describes general AI, which doesn't exist.",
        },
      },
      {
        id: "concept-3",
        kicker: "Why it seems smart",
        title: "AI learns patterns from data — it doesn't 'understand'",
        body: `So how does AI get good at its one job? By studying mountains of examples. An AI that recognizes cats was shown **millions** of cat pictures until it learned the patterns that usually show up: pointy ears, whiskers, fur, a certain face shape.\n\nBut here's the subtle part — it never learns what a cat *is* the way you know. You know a cat is a warm, living animal that purrs and chases string. The AI just knows "these number patterns usually get labeled 'cat'." It's matching patterns, not understanding meaning.\n\nThat's exactly why AI can be amazingly helpful **and** confidently wrong at the same time. Show the cat-recognizer a fluffy dog from a weird angle and it might shout "cat!" with total confidence. It's a pattern machine, not a mind — and that gap is one of the most important things to remember all course long.`,
        callout: {
          label: "Common misconception",
          text: "Smart-looking output does not equal real understanding. An answer that sounds confident and polished can still be completely wrong — the AI is matching patterns, not checking facts.",
        },
        checkIn: {
          prompt: "An AI photo app confidently labels a fluffy Pomeranian dog as a 'cat.' What does this best show?",
          choices: [
            "The AI matched surface-level patterns (fur, size, face shape) that happened to overlap with its 'cat' pattern — it doesn't understand what a cat is",
            "It can seem like the training photos of dogs must have been deleted by mistake, but that reading skips the distinction this question is testing",
            "It can seem like the AI ran low on processing power and guessed to save time, but that reading skips the distinction this question is testing",
            "The app is intentionally testing users to see if they're paying attention. That option sounds confident, but it leaves out the deciding constraint",
          ],
          correctIndex: 0,
          explanation:
            "Pattern-matching can misfire on unusual or ambiguous inputs — a fluffy face can overlap with 'cat' features. It isn't a power issue, missing data by itself, or an intentional test; it's the model comparing patterns and picking the closest match, right or wrong.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "How an AI decides 'cat or dog', step by step",
        body: `Let's walk through what really happens when a photo app sorts your pictures into "cats" and "dogs." Follow all five steps and you'll see there's no magic — just pattern-matching that gets better over time.\n\n**Step 1 — Collect labeled examples.** Before you ever use it, the AI is shown millions of photos already tagged "cat" or "dog" by humans. Those labels are the answer key it learns from.\n\n**Step 2 — Extract visual patterns.** The AI turns each photo's pixel numbers into useful signals — pointy ears, fur texture, snout shape. This **feature extraction** step pulls out the clues that actually matter for telling pets apart.\n\n**Step 3 — Train the model.** Using those patterns and labels, the AI tunes itself to connect "these features usually mean cat" or "these mean dog." Nobody writes the rules by hand — the model learns them from the examples.\n\n**Step 4 — Predict on a new photo.** You snap a picture of your friend's kitten. The AI extracts the same features, compares them to what it learned, and outputs something like "92% cat, 8% dog." It doesn't *know* it's a cat — it's reporting how strongly the patterns match.\n\n**Step 5 — Check mistakes and improve.** When it mislabels a hairless Sphynx cat as a dog, that's a signal: the training set probably lacked enough unusual examples. Add more varied photos, retrain, and the classifier gets smarter. Good AI teams always loop back like this.`,
        callout: {
          label: "Pro tip",
          text: "Whenever an AI gives you an answer, picture that hidden confidence score behind it. \"92% sure\" means there's still room to be wrong — a healthy reason to double-check anything important.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "Three myths about AI, busted",
        body: `Now that you know the basics, let's clear out the myths still floating around in movies, headlines, and group chats.`,
        bullets: [
          "**Myth: AI is alive or has feelings.** Reality: it's math running on a computer. It can *sound* caring without *being* caring.",
          "**Myth: If an AI is great at one thing, it's great at everything.** Reality: narrow AI is a specialist — skill at one job says nothing about skill at another.",
          "**Myth: AI 'thinks' the way people do.** Reality: it matches patterns in data. No lived experience, no meaning, no gut feeling.",
        ],
        checkIn: {
          prompt: "A friend says, \"This AI wrote an amazing essay, so it must be smart enough to also perform surgery.\" What's the flaw in that claim?",
          choices: [
            "It wrongly assumes narrow-AI skill at writing transfers to a completely unrelated task like surgery",
            "The claim is backwards — AI that's good at surgery is usually bad at writing” belongs to a different situation than the one in the question stem",
            "It's only a problem if the essay covered a medical topic” belongs to a different situation than the one in the question stem",
            "There's no flaw — any AI that handles language well can be trusted with any complex task",
          ],
          correctIndex: 0,
          explanation:
            "This is the narrow-AI trap: assuming skill in one specialty means skill in all specialties. An essay-writing model and a surgical robot would need completely different training, regardless of the essay's topic or how good the writing was.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it now",
        title: "60-second challenge: spot the specialist",
        body: `Time to practice noticing narrow AI in your own life.\n\n1. Look at your phone's home screen.\n2. Pick any one app.\n3. Ask yourself: is there a narrow AI feature hiding inside it (a filter, a suggestion, a sort, an autocorrect)? What's the **one job** it's a specialist at?\n\nYou don't need to write anything down yet — but notice how, once you start looking, narrow AI is everywhere, quietly doing one job at a time. Hold onto your example; you'll use it in your reflection at the end of this lesson.`,
        callout: {
          label: "Notice this",
          text: "The specialist you just found can't do anything outside its one job. That limit is the whole point of narrow AI.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "The two-question hype detector",
        body: `Headlines love to oversell AI: "This AI THINKS like a human!" or "Scientists Warn AI Could Take Over!" Now that you know the difference between narrow and general AI, you have a superpower: a hype detector.\n\nHere's the skill. Whenever you meet a big AI claim — in an ad, a headline, or a group chat — ask two questions:`,
        bullets: [
          "**What specific task is this AI actually doing?** \"Recommends videos\" is narrow and believable. \"Understands everything like a human\" is a red flag — that's general AI, and it doesn't exist yet.",
          "**Who benefits if I believe the hype?** A company selling an AI product benefits when it sounds more powerful than it is. A movie trailer benefits when the robot looks scary and smart.",
        ],
        image: "/images/lessons/ai-1-extra1.png",
        imageAlt: "A magnifying glass hovering over an exaggerated AI headline, revealing the narrow task underneath",
        callout: {
          label: "Use this all year",
          text: "This two-question habit will serve you every single time you meet a new AI claim — in this course, in the news, and for the rest of your life.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Narrow AI vs. general AI vs. you",
        body: `Seeing the three side by side makes the difference click faster than any definition.`,
        table: {
          columns: ["Trait", "Narrow AI (real, today)", "General AI (hypothetical)", "You (a human)"],
          values: [
            ["Range of tasks", "One specialty", "Any topic at all", "Any topic at all"],
            ["Exists right now?", "Yes — everywhere", "No — still fiction/research", "Yes"],
            ["Understands meaning?", "No — matches patterns", "Would need to, somehow", "Yes"],
          ],
          rowCount: 3,
        },
        checkIn: {
          prompt: "Based on the comparison, which statement is accurate?",
          choices: [
            "“General AI already matches narrow AI's availability, just with broader skills” describes a different situation than the one in the question stem",
            "Narrow AI exists today and specializes in one task; general AI is still hypothetical and would need human-like range and understanding",
            "The main difference is that narrow AI runs on phones and general AI runs on computers” belongs to a different situation than the one in the question stem",
            "Narrow AI will automatically turn into general AI once it's trained on enough data” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "The table's whole point: narrow AI is real but limited to one job; general AI would match human range and understanding, but nobody has built it — and more training data alone doesn't bridge that gap or change what device it runs on.",
        },
      },
      {
        id: "ethics-or-bias",
        kicker: "Ethics moment",
        title: "Who benefits when AI sounds more powerful than it is?",
        body: `Overselling AI isn't just an annoying habit — it can cause real harm. If a company markets a narrow tool as if it "understands" your emotions, health, or safety, people may trust it with decisions it was never built to handle.\n\nThis is sometimes called **AI-washing** — dressing up an ordinary or narrow tool in impressive-sounding AI language to boost sales or hype, without being honest about its real limits.\n\nAs a critical thinker, your job isn't to be anti-AI or pro-AI — it's to ask clear questions: *What can this tool actually do? What happens if it's wrong? Who profits from me believing more than that?* Asking these questions is a form of digital literacy that protects you and the people around you.`,
        callout: {
          label: "Why this matters",
          text: "Evaluating how computing tools affect people's decisions and trust is exactly the kind of impact-thinking this lesson asks you to practice.",
        },
      },
      {
        id: "habits",
        kicker: "Build the habit",
        title: "Three habits of an AI-literate thinker",
        body: `Starting today, you can practice three simple habits that will make you sharper than most adults when it comes to AI.`,
        bullets: [
          "**Name the task.** Before reacting to any AI claim, ask: what one job is this actually doing?",
          "**Separate sound from substance.** A confident tone is not proof of correctness. Confidence and correctness are two different things entirely.",
          "**Ask who benefits.** Hype almost always benefits someone's sales pitch. Noticing that keeps you clear-headed.",
        ],
      },
      {
        id: "transfer-to-life",
        kicker: "Use it for real",
        title: "Take the hype detector into your week",
        body: `Next time a headline, ad, or classmate claims an AI tool "thinks like a human" or "can do anything," pause and run the two questions from this lesson:\n\n1. **What specific job is it actually doing?** (Recommending songs? Summarizing notes? Sorting spam?)\n2. **Who benefits if I believe it's more powerful than that?**\n\nIf you can't name the one job or the beneficiary feels like a sales pitch, you've spotted hype — not a reason to panic, just a reason to stay clear-headed.`,
        callout: {
          label: "Transfer this",
          text: "This same two-question check works for AI claims at school, in the news, and in ads for years to come — not just in this lesson.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Think it through",
        title: "Before you move on, sit with this",
        body: `Think back to the app you picked during the "try it" challenge earlier.\n\nWhat is the ONE job that AI feature is a specialist at? And what would happen if someone tried to use it for something outside that job (like asking a spam filter to drive a car)? Hold this thought — you'll be asked to put it into words in your reflection at the end of the lesson.`,
      },
      {
        id: "mini-case",
        kicker: "Real-world case",
        title: "When a Jeopardy champion said \"Toronto\"",
        body: `In 2011, an AI system famously beat two human champions on the quiz show *Jeopardy!* — an impressive feat of narrow AI, built to search and rank huge amounts of text to answer trivia clues.\n\nBut in the Final Jeopardy round of one game, the category was "U.S. Cities." The AI's answer? **"Toronto"** — a city in Canada, not the United States. Human viewers were stunned; the system had crushed nearly every other clue that game.\n\nWhat happened? The AI matched patterns across its enormous data (Toronto has an American League baseball team and other associations that fuzzily fit the clue), but it had no real understanding that "U.S. Cities" *excludes* Canadian ones the way you instantly would. It was a narrow specialist doing what it does — matching patterns — without true comprehension of the category's actual boundary.\n\nThe lesson holds up over a decade later: even the most impressive-looking AI is still pattern-matching under the hood, and it can miss things a ten-year-old would catch instantly.`,
        callout: {
          label: "Think about it",
          text: "The system got almost everything else right that game. One weird miss doesn't erase its skill — but it does prove that skill isn't the same as true understanding.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "Quick gut-check before the quiz",
        body: `Let's make sure the big ideas actually stuck before you head into the knowledge check.`,
        checkIn: {
          prompt: "Which best explains why the quiz-show AI answered 'Toronto' for a 'U.S. Cities' clue?",
          choices: [
            "It ran a live internet search mid-question and picked the wrong webpage” belongs to a different situation than the one in the question stem",
            "It matched patterns in its data without truly understanding the category's real-world boundary",
            "It autocorrected the city name to one it had seen more often in its training data” belongs to a different situation than the one in the question stem",
            "It secretly knew the answer was wrong but said it anyway” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "Classic narrow-AI behavior: strong pattern-matching, but no real comprehension of category rules a human grasps instantly.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've got the big picture: AI is **software** that does brain-like tasks by finding **patterns in data**. All of today's AI is **narrow AI** — a specialist at one job. And no matter how smart it sounds, it's matching patterns, not truly understanding.\n\nKnowing this — that it's a powerful pattern tool, not a magical brain — helps you use AI wisely, question it, and stay in control instead of being fooled by it.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then jot a quick reflection about an AI you used this week.`,
      },
    ],
  },
  bigIdeas: [
    "AI is **software** that does tasks that usually need human intelligence.",
    "All AI today is **narrow AI** — a specialist at one kind of task.",
    "AI finds **patterns in data**; it does not truly understand or feel.",
    "Skill at one narrow task tells you nothing about skill at a different one.",
    "Question AI hype with two questions: what task, and who benefits?",
  ],
  keyTerms: [
    { term: "Artificial Intelligence (AI)", definition: "Software designed to perform tasks that normally require human intelligence." },
    { term: "Narrow AI", definition: "AI that is good at one specific task (the only kind that exists today)." },
    { term: "General AI (AGI)", definition: "A hypothetical AI that could think across any topic like a human. Does not exist yet." },
    { term: "Pattern", definition: "A repeated structure in data that AI uses to make predictions." },
    { term: "Feature extraction", definition: "Pulling out useful signals (like ear shape or fur texture) from raw data before a model learns from it." },
    { term: "AI-washing", definition: "Marketing an ordinary or narrow tool with exaggerated 'AI' language to seem more powerful than it is." },
  ],
  realWorld:
    "The video app guessing what you'll watch next, the keyboard finishing your sentence, and the camera blurring your background are all **narrow AI** working behind the scenes.",
  quiz: [
    {
      id: "q1",
      question: "Which statement best describes what AI actually is?",
      choices: [
            "Hardware that must include a robot body to count as AI” belongs to a different situation than the one in the question stem",
            "Software that does tasks that usually need human intelligence by finding patterns in data",
            "Any program that follows only hard-coded if/then rules with no pattern learning",
            "Software that copies a human brain cell-for-cell so it can feel emotions” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "AI is software that performs intelligence-like tasks by learning patterns from data. It isn't a biological brain, and rule-only scripts without learning aren't what this lesson means by AI.",
    },
    {
      id: "q2",
      question: "Which kind of AI exists in the real world today?",
      choices: [
        "Narrow AI that specializes in one kind of task",
        "General AI (AGI) that can do any intellectual task a human can",
        "Conscious AI that is aware of its own goals and feelings",
        "One universal AI system that already runs every app on your phone",
      ],
      correctIndex: 0,
      explanation:
        "What we use today is narrow AI — strong at one job. AGI and conscious AI aren't available products, and your phone apps aren't one single all-purpose mind.",
    },
    {
      id: "q3",
      question: "A chatbot writes you a birthday poem. Why can't that same chatbot also safely drive a car?",
      choices: [
        "It would just need access to the car's cameras and sensors to drive",
        "Because self-driving needs GPS, and chatbots aren't built with GPS",
        "It actually can — modern AI can do anything",
        "Because each AI today is narrow — good at one task, not all tasks",
      ],
      correctIndex: 3,
      explanation:
        "Narrow AI is a specialist. A poem-writing model and a self-driving model are trained for completely different tasks.",
    },
    {
      id: "q4",
      question: "An AI image recognizer says a photo contains a cat. What does it really 'know'?",
      choices: [
            "Nothing — it guesses randomly” belongs to a different situation than the one in the question stem",
            "It understands what a cat is, like you do” belongs to a different situation than the one in the question stem",
            "It matched visual patterns (ears, whiskers, fur) it learned from many example images",
            "It asked another human to check” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "The model learned patterns from millions of labeled images. It's pattern-matching, not understanding.",
    },
    {
      id: "q5",
      question: "Which of these is the biggest red flag that a headline is overhyping AI?",
      choices: [
            "It says the tool 'was trained on millions of examples'” belongs to a different situation than the one in the question stem",
            "It says the tool 'sorts spam from real email'” belongs to a different situation than the one in the question stem",
            "It says the tool 'understands everything, like a human, across any topic'",
            "It says the tool 'recommends songs based on your listening history'",
          ],
      correctIndex: 2,
      explanation:
        "Claiming human-like understanding across any topic describes general AI — which doesn't exist. That's the tell of overhyped marketing.",
    },
    {
      id: "q6",
      question: "In the Jeopardy mini-case, why did the AI answer 'Toronto' for a 'U.S. Cities' category?",
      choices: [
            "It ran a live internet search and picked the wrong result” belongs to a different situation than the one in the question stem",
            "“The question was a trick with no correct answer” describes a different situation than the one in the question stem",
            "It autocorrected the answer to a city name it had seen more often in training” belongs to a different situation than the one in the question stem",
            "It matched data patterns loosely connected to the clue, without truly grasping the category's real boundary",
          ],
      correctIndex: 3,
      explanation:
        "Even highly skilled narrow AI can miss things a person would catch instantly, because it's matching patterns, not truly comprehending category rules.",
    },
    {
      id: "q7",
      question: "What does 'AI-washing' mean?",
      choices: [
            "Some learners answer “Cleaning a robot's hardware”, yet that does not match the precise idea from the lesson",
            "Marketing an ordinary or narrow tool using exaggerated AI language to seem more impressive than it really is",
            "Picking “Deleting an AI's training data” is a common mix-up that confuses a nearby idea with the right one",
            "A technique for removing bugs from code — familiar wording, wrong fit for what the prompt is actually asking",
          ],
      correctIndex: 1,
      explanation:
        "AI-washing is when hype language overstates what a tool can really do — exactly what the two-question hype detector helps you catch.",
    },
    {
      id: "q8",
      question: "Before trusting a big AI claim, the two-question hype detector asks you to consider what?",
      choices: [
            "How many downloads the app has” belongs to a different situation than the one in the question stem",
            "The brand name and the price only” belongs to a different situation than the one in the question stem",
            "Whether the AI has a friendly-sounding name” belongs to a different situation than the one in the question stem",
            "The specific task the AI is doing, and who benefits if you believe the hype",
          ],
      correctIndex: 3,
      explanation:
        "Naming the actual task and asking who benefits from the hype are the two questions that cut through exaggerated AI claims.",
    },
  ],
  reflection: {
    prompt:
      "Name one AI tool you used in the last week. What single task is it a 'specialist' at?",
    placeholder: "Example: My phone's photo app — it's a specialist at finding faces in pictures…",
  },
};
