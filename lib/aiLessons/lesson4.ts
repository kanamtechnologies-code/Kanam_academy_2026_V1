import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson4: AILessonConfig = {
  id: "ai-4",
  title: "4. Turning the World Into Data",
  goal: "See how words, categories, and ideas get represented as numbers — the foundation that lets AI 'reason' about almost anything (the Big Idea of Representation) — and why what gets left out can cause real unfairness.",
  xpReward: 200,
  badge: "Data Translator",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/3",
  nextHref: "/learn/ai/5",
  instructorScript: `**Coach's note**
Today's lesson: **Turning the World Into Data**.

**Goal:** See how words, categories, and ideas get represented as numbers — the foundation that lets AI 'reason' about almost anything (the Big Idea of Representation) — and why what gets left out can cause real unfairness.

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
        body: `Last lesson you saw photos and sound turn into numbers. But how does an AI handle a *word* like "pizza," or a decision like "apple or orange?" You can't point a microphone at an idea. Today you'll learn the clever move that lets AI work with almost anything.\n\nOur roadmap:\n\n• Meet the Big Idea of **Representation** — encoding the world as data.\n• See how text becomes **tokens**, then numbers (this is step one inside every chatbot).\n• See how choices become **features** in a spreadsheet of numbers.\n• Learn why a bad representation can quietly cause unfair results — with a real, documented example.\n\nThis matters because every chatbot, recommender, and image generator starts by representing *your* input as numbers. And when AI gets something unfair or weird, the representation is often where it went wrong.`,
        image: "/images/lessons/ai-4-data.png",
        imageAlt: "Words and objects being converted into rows of numbers",
        callout: {
          label: "Why it matters",
          text: "The very first thing a chatbot does with your message is turn it into numbers. Understanding representation is like seeing the gears turn the instant before AI 'reads' anything you type.",
        },
      },
      {
        id: "hook-story",
        kicker: "True story",
        title: "The resume that got rejected by a spreadsheet",
        body: `A hiring team once built a tool to help sort hundreds of job applications faster. Instead of reading every resume by hand, the team represented each applicant as a row of numbers: years of experience, school name, keywords found in the resume.\n\nOne strong candidate — years of relevant volunteer leadership, glowing references, real skill — got auto-rejected. Why? Their resume used different words for the same experience ("organized community events" instead of "managed projects"), and their school wasn't one of the ones the system had learned to associate with "good hire."\n\nThe candidate wasn't unqualified. The *representation* of them — the specific columns of numbers the system was allowed to see — simply didn't capture what actually mattered. That gap between a real person and their data-shadow is exactly what today's lesson is about.`,
      },
      {
        id: "glossary",
        kicker: "Words you'll need",
        title: "Your vocabulary for this lesson",
        body: `These five words explain how anything — a word, a choice, a person — becomes something an AI can work with.`,
        bullets: [
          "**Representation** — how a piece of the world is encoded as data so a computer can reason about it.",
          "**Token** — a small chunk of text (word or word-part) that gets turned into a number.",
          "**Feature** — a measurable property of something (color, weight, price) used as input to AI.",
          "**Feature vector** — the final list of numbers representing one example — the input a model actually sees.",
          "**Representation loss** — the information that gets left out whenever something real is turned into data.",
        ],
      },
      {
        id: "concept-1",
        kicker: "Big Idea: Representation",
        title: "AI can only reason about things it can represent as data",
        body: `Last lesson, images and sound became numbers. But what about **words, choices, and ideas**? To work with those, AI needs a way to **represent** them as data too.\n\n**Representation** is how we encode a piece of the world so a computer can store and reason about it. Think of it like packing for a trip: you can't bring your whole bedroom, so you choose what fits in the suitcase. A representation is the "suitcase" version of something real — only the parts we chose to pack as data.\n\nChoosing a *good* representation is one of the most important parts of building AI. Pack the right details and the AI can reason brilliantly. Leave out something important and it's working with a flawed picture from the start.`,
        callout: {
          label: "Key insight",
          text: "If something can be turned into useful data, AI can work with it. If it can't be represented well, AI struggles — which is why fuzzy human ideas like 'fairness' or 'beauty' are so hard to teach a machine.",
        },
        checkIn: {
          prompt: "What is the best definition of 'representation' in AI?",
          choices: [
            "The set of rules a company writes about how its AI should behave",
            "A visual chart showing an AI's accuracy over time",
            "The amount of computing power needed to train a model",
            "How a piece of the world is encoded as data so a computer can reason about it",
          ],
          correctIndex: 3,
          explanation:
            "Representation is the encoding step — turning something real into a data 'suitcase' the model can actually work with — not a measure of compute, a chart, or a behavior policy.",
        },
      },
      {
        id: "concept-2",
        kicker: "Words → numbers",
        title: "Text gets split into tokens, then numbers",
        body: `Computers can't do math on the word "dog" — to a computer it's not even a word, just shapes. So before AI can use text, it breaks the text into small pieces called **tokens** (often whole words, but sometimes word-parts like "play" + "ing"), and gives each token a number from a giant lookup table.\n\nThink of it like a coat check at an event. You hand over your coat (a word) and get a numbered ticket back. The system doesn't care what the coat looks like — it just tracks the number. Later it can match tickets to coats perfectly.\n\nThe sentence below might become a short list of token-numbers. Once text is numbers, the AI can finally do its thing: find patterns in which tokens appear together and what usually comes next.`,
        code: `"I love pizza"  →  tokens: ["I", "love", "pizza"]  →  [40, 1842, 7405]`,
        codeCaption: "Words become tokens, tokens become numbers",
        bullets: [
          "**Token** = a small chunk of text (a word or word-part).",
          "Each token maps to a number the model can use.",
          "Patterns in token-numbers = how AI 'reads'.",
        ],
        checkIn: {
          prompt: "Before an AI can process the word 'pizza,' what has to happen first?",
          choices: [
            "It gets split into a token and converted into a number from a lookup table",
            "It gets checked against a dictionary to confirm it's spelled correctly",
            "It gets converted directly into a picture of the object it names",
            "Nothing — computers read letters exactly like humans do",
          ],
          correctIndex: 0,
          explanation:
            "Text becomes tokens, and tokens become numbers, because computers can only do math — not read words the way people do. There's no spell-check or image-conversion step involved.",
        },
      },
      {
        id: "concept-3",
        kicker: "Choices → numbers",
        title: "Categories and features become columns",
        body: `Words aren't the only thing we represent. Real decisions use **features** — measurable facts about something. To predict whether a fruit is an apple or an orange, an AI might use features like color, weight, and bumpiness, each stored as a number.\n\nPicture a spreadsheet: each **row** is one example (one fruit), and each **column** is one **feature** (one fact about it). The **feature vector** is one row turned into a list of numbers — like \`[color: 1, weight: 130, bumpy: 1]\` — the actual input a model receives.\n\nMost "decision-making" AI is really just this: finding patterns across rows and columns of numbers. It looks like judgment, but underneath it's spreadsheet math — and every representation **loses** something the numbers didn't capture.`,
        table: {
          columns: ["fruit", "color (0=green,1=orange)", "weight (g)", "bumpy? (0/1)"],
          values: [
            ["apple", 0, 150, 0],
            ["orange", 1, 130, 1],
            ["apple", 0, 160, 0],
          ],
          rowCount: 3,
        },
        callout: {
          label: "Common misconception",
          text: "When an AI 'decides' something, it isn't weighing right and wrong like a person. It's spotting patterns in columns of numbers — only as fair and complete as the features it was given.",
        },
        checkIn: {
          prompt: "In the fruit spreadsheet example, what is a 'feature vector'?",
          choices: [
            "The name of the AI model",
            "The entire spreadsheet of all fruits at once",
            "One row turned into a list of numbers — the actual input the model sees for one example",
            "A type of fruit. That option sounds confident, but it leaves out the deciding constraint",
          ],
          correctIndex: 2,
          explanation:
            "A feature vector is the numeric representation of one specific example — everything the model knows about that one row.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Representing a student as data — and what gets lost",
        body: `Imagine a school wants an AI to flag students who might "need help." First, someone has to represent each student as data. Follow the full pipeline — tokens, features, and a **feature vector** — and watch what gets lost along the way.\n\n**Step 1 — Start with raw text.** A counselor's notes about a student: "Struggling in math but asks great questions in class."\n\n**Step 2 — Split into tokens.** The text breaks into pieces the computer can count: \`["Struggling", "in", "math", "but", "asks", "great", "questions"]\`. Each token gets a number, just like in the pizza example above.\n\n**Step 3 — Choose features.** The team picks measurable signals: test scores, attendance, assignments turned in. Each becomes one number in a row.\n\n**Step 4 — Accept representation loss.** A **feature vector** is the final list of numbers the model actually sees — like \`[score: 72, attendance: 95%, turned_in: 80%]\`. Notice what's *missing*: curiosity, kindness, a tough home situation. The vector is useful, but it's a compressed map — not the whole person.\n\n**Step 5 — Feed the feature vector into the model.** The AI learns patterns across those number lists and makes predictions. It can only reason about what the vector captured. A struggling-but-bright student might look "fine," while a great student having one bad week might get flagged — not because the AI is cruel, but because the representation left out what mattered most.`,
        callout: {
          label: "Pro tip",
          text: "Whenever you see an AI judgment about people, ask the power question: *What did this data leave out?* The missing columns often matter more than the ones that made it in.",
        },
      },
      {
        id: "second-example",
        kicker: "Second example",
        title: "Turning a movie review into numbers",
        body: `Representation shows up everywhere — not just in school data.\n\nA streaming app wants to recommend films. It can't feed the AI your whole personality, so it represents each movie as a **feature vector**:\n\n\`[genre: comedy, runtime: 98 min, rating: PG-13, lead_actor_popularity: 72]\`\n\nAnd it represents *you* as:\n\n\`[watched_comedies: 14, avg_watch_time: 67%, skipped_horror: 9]\`\n\nThe model matches patterns between those vectors. Useful — but notice what's missing: whether you loved the *story*, whether a friend recommended it, whether the film handled a topic sensitively. The numbers capture behavior, not meaning.\n\nThat's representation loss again — and it explains why recommendations sometimes feel "close but wrong."`,
        callout: {
          label: "Notice this",
          text: "Whenever an AI judges or recommends, ask what got turned into numbers and what got left out.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "\"Numbers are objective, so the data must be fair\"",
        body: `This might be the single most dangerous myth in this whole course. Numbers *feel* neutral — but the choice of which numbers to collect is made by people, and that choice can bake in unfairness before the AI ever learns anything.`,
        bullets: [
          "**Myth: If it's numbers, it's objective.** Reality: someone chose *which* numbers to measure — that choice reflects human decisions and can carry human blind spots.",
          "**Myth: More features always means a fairer, more complete picture.** Reality: adding the *wrong* features (like a zip code that quietly tracks race or income) can make things worse, not better.",
          "**Myth: Representation loss is rare.** Reality: it happens every single time — the real question is always whether what's lost actually mattered for the decision being made.",
        ],
        checkIn: {
          prompt: "Why is 'the data is just numbers, so it's objective' a misleading claim?",
          choices: [
            "Numbers can never be recorded incorrectly",
            "A human chose which features to measure in the first place, and that choice can carry hidden bias",
            "Objective data doesn't exist anywhere in computing",
            "AI never uses numbers, only words",
          ],
          correctIndex: 1,
          explanation:
            "The 'neutral number' feeling hides a real decision: someone picked what to measure and what to leave out. That choice is where bias often sneaks in.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it now",
        title: "Represent yourself in five numbers",
        body: `Try this thought experiment: if a school wanted to represent "how well you're doing" using only five numbers (features), which five would you choose?\n\nWrite them down mentally, then ask: what important part of "how well you're doing" would those five numbers completely miss? Notice how even a *thoughtful* choice of features still leaves real gaps — that's representation loss in action, and it's unavoidable, not a mistake.`,
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Spotting a proxy variable",
        body: `Here's a genuinely advanced skill: recognizing a **proxy variable** — a feature that seems neutral but secretly correlates with something sensitive, like race, income, or gender, even though it was never labeled that way.\n\nZip code is the classic example. It sounds like harmless geography, but in many places zip code closely tracks income and race because of historical housing patterns. A model using zip code as a feature can end up discriminating by income or race *without that word ever appearing in the data*.`,
        bullets: [
          "**Ask what a feature correlates with**, not just what it's labeled as.",
          "**Watch for 'neighborhood,' 'school name,' and 'zip code'** — common proxy variables in real systems.",
          "**Remember: removing the obvious label doesn't remove the bias** if a proxy is still doing the same job.",
        ],
        image: "/images/lessons/ai-4-extra1.png",
        imageAlt: "A map showing how zip code data can quietly correlate with income and race",
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "A real person vs. their data representation",
        body: `Laying the real thing next to its data version makes representation loss impossible to ignore.`,
        table: {
          columns: ["Trait", "The real student", "Their feature vector"],
          values: [
            ["Personality & effort", "Rich, ever-changing, hard to measure", "Not captured at all"],
            ["Test scores", "One part of their story", "Captured directly as a number"],
            ["Home situation", "Can hugely affect performance", "Usually invisible to the model"],
          ],
          rowCount: 3,
        },
        checkIn: {
          prompt: "What does this comparison table best illustrate?",
          choices: [
            "Feature vectors capture every important detail about a person",
            "Test scores are the only thing that matters about a student",
            "Home situation is always included in student data",
            "A feature vector is always a simplified, partial version of a real person — some things are captured, many are not",
          ],
          correctIndex: 3,
          explanation:
            "This is representation loss in one table: the model sees a compressed slice of reality, never the full picture.",
        },
      },
      {
        id: "ethics-or-bias",
        kicker: "Ethics moment",
        title: "A real risk-scoring tool and its representation problem",
        body: `In 2016, journalists investigated a risk-assessment tool used in some U.S. courts to help predict whether a defendant might reoffend. The investigation found the tool was significantly more likely to incorrectly flag Black defendants as "high risk" compared to white defendants with similar actual outcomes.\n\nPart of the underlying issue was representation: the tool relied on features correlated with a person's past contact with the justice system — arrests, in a system where policing patterns themselves are not applied evenly across communities. Feeding that history back into a "risk" prediction can quietly recreate old patterns of unequal treatment, dressed up as an objective number.\n\nThis doesn't mean every data-driven tool is unfair — it means representation choices deserve real scrutiny, especially when the stakes involve someone's freedom, opportunities, or safety.`,
        callout: {
          label: "Why this matters",
          text: "This case is a widely studied example of bias in technology design — a direct application of evaluating fairness in how a system was built.",
        },
      },
      {
        id: "habits",
        kicker: "Build the habit",
        title: "Three habits for thinking about representation",
        body: `These habits apply to homework projects, apps you use, and the news stories you'll read about AI for years to come.`,
        bullets: [
          "**Ask 'what got left out?'** Every representation loses something. Naming it out loud is half the battle.",
          "**Look for proxy variables.** A feature can encode something sensitive without ever naming it directly.",
          "**Remember: numbers describe a choice, not a fact of nature.** Someone decided what to measure — and that decision can be questioned.",
        ],
      },
      {
        id: "transfer-to-life",
        kicker: "Use it for real",
        title: "Ask \"what got left out?\" at school",
        body: `When a grade, attendance alert, or app recommendation feels off, ask the representation question:\n\n**What numbers did the system see, and what important reality never made it into the data?**\n\nMaybe a bad week at home isn't in the feature vector. Maybe a zip code quietly stands in for income. Maybe a single test score stands in for months of effort.\n\nYou won't always have access to the full dataset — but asking the question keeps you from treating every number as the whole truth.`,
        callout: {
          label: "Transfer this",
          text: "Representation loss is unavoidable. The skill is noticing when what's missing actually matters for the decision being made.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Think it through",
        title: "Before you move on, sit with this",
        body: `Go back to the five features you picked for "how well you're doing" earlier in this lesson.\n\nCould any of those features act as a proxy for something else (like family income, neighborhood, or access to tutoring) without meaning to? You'll be asked to put this into words in your reflection at the end of the lesson.`,
      },
      {
        id: "mini-case",
        kicker: "Real-world case",
        title: "The risk-score investigation that sparked a national debate",
        body: `The 2016 investigation into a criminal-justice risk-assessment tool became one of the most cited case studies in AI ethics. Reporters compared the tool's risk labels against what actually happened to thousands of real defendants over the following two years.\n\nThe results: Black defendants who did *not* reoffend were nearly twice as likely to be incorrectly labeled "high risk" compared to white defendants who also did not reoffend. The company that built the tool disputed some of the analysis, and researchers have debated exactly which fairness measure matters most — but the case remains a landmark example of how representation choices in training data can produce unequal real-world outcomes, even without anyone intending it.\n\nThe case pushed many researchers and governments to start requiring "bias audits" before high-stakes AI tools get used — a direct, lasting response to a representation problem discovered in the real world.`,
        callout: {
          label: "Why this case matters",
          text: "It shows that representation isn't just a technical detail — in high-stakes settings, it can directly affect someone's freedom and future.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "Quick gut-check before the quiz",
        body: `Let's make sure the big ideas actually stuck before you head into the knowledge check.`,
        checkIn: {
          prompt: "What made the risk-assessment tool's outcomes unequal across groups, based on the investigation?",
          choices: [
            "The defendants it flagged incorrectly had all committed similar past crimes",
            "The tool's predictions were simply randomized rather than data-driven",
            "The tool was intentionally coded to target specific groups by name",
            "Its features were tied to historical arrest patterns, which reflected uneven policing — so the representation baked in that unevenness",
          ],
          correctIndex: 3,
          explanation:
            "The representation choice — using arrest history as a feature — carried forward existing unevenness in how policing happens across communities.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Lock these in: **Representation** is how the world gets encoded as data an AI can use. Text becomes **tokens**, then numbers; choices become **features** in a **feature vector** the model reads. And every representation **leaves things out** — sometimes harmlessly, sometimes in ways that cause real unfairness, especially through hidden **proxy variables**.\n\nThis is the hidden first step inside every AI you'll meet for the rest of the course.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then reflect on what numbers might miss when representing "a good student."`,
      },
    ],
  },
  bigIdeas: [
    "**Representation** = how the world gets encoded as data an AI can use.",
    "Text becomes **tokens**, then numbers, so AI can find language patterns.",
    "Every representation **leaves things out** — that can cause mistakes or unfairness.",
    "A **proxy variable** can quietly encode something sensitive without naming it directly.",
    "Numbers reflect a human choice about what to measure — they aren't automatically neutral.",
  ],
  keyTerms: [
    { term: "Representation", definition: "How a piece of the world is encoded as data so a computer can reason about it." },
    { term: "Token", definition: "A small chunk of text (word or word-part) that gets turned into a number for AI to process." },
    { term: "Feature", definition: "A measurable property of something (color, weight, price) used as input to AI." },
    { term: "Feature vector", definition: "The final list of numbers representing one example — the input a model actually sees." },
    { term: "Encoding", definition: "The act of converting information into a numeric form a computer can store." },
    { term: "Proxy variable", definition: "A feature that appears neutral but secretly correlates with something sensitive, like income or race." },
  ],
  realWorld:
    "When you type a sentence into a chatbot, the very first thing it does is split your words into **tokens** and turn them into numbers — before it 'reads' anything. In high-stakes tools like risk-assessment systems, the same representation step can carry forward real-world unfairness if the wrong features are chosen.",
  quiz: [
    {
      id: "q1",
      question: "What does 'representation' mean in AI?",
      choices: [
            "How a piece of the world is encoded as data the AI can store and reason about",
            "The final accuracy score a model gets on a test dataset",
            "The physical server hardware that stores an AI model",
            "A human spokesperson who explains an AI product to the public",
          ],
      correctIndex: 0,
      explanation:
        "Representation is about encoding things — words, images, choices — as data so an AI can work with them, not an accuracy score, a spokesperson, or hardware.",
    },
    {
      id: "q2",
      question: "Before an AI can process the sentence 'I love pizza', what happens first?",
      choices: [
        "It checks the sentence for grammar mistakes and corrects them",
        "It asks a human to confirm what the sentence means",
        "It splits the text into tokens and turns them into numbers",
        "Nothing — AI reads letters directly like we do",
      ],
      correctIndex: 2,
      explanation:
        "Text is broken into tokens, and each token becomes a number, because computers do math on numbers, not words — there's no grammar-check or human-confirmation step first.",
    },
    {
      id: "q3",
      question: "To tell apples from oranges, an AI uses color, weight, and bumpiness. What are those called?",
      choices: [
        "Tokens",
        "Pixels",
        "Sensors",
        "Features",
      ],
      correctIndex: 3,
      explanation:
        "Features are the measurable properties (stored as numbers) that an AI uses as inputs to make a prediction.",
    },
    {
      id: "q4",
      question: "Why can a bad representation lead to unfair AI decisions?",
      choices: [
            "Representations are always perfect, so this can't actually happen",
            "Because AI systems refuse to run unless the data is flawless",
            "Because numbers, once collected, can never be revised or corrected",
            "Because a representation leaves things out — it may miss or mismeasure what matters",
          ],
      correctIndex: 3,
      explanation:
        "Every representation simplifies reality and leaves something out. If it misses what's important, the AI's results suffer.",
    },
    {
      id: "q5",
      question: "What is a 'proxy variable'?",
      choices: [
            "Picking “A synonym for 'token'” is a common mix-up that confuses a nearby idea with the right one",
            "A backup server used to run AI models",
            "A feature that seems neutral but secretly correlates with something sensitive, like race or income",
            "A second copy of the same training dataset",
          ],
      correctIndex: 2,
      explanation:
        "Proxy variables (like zip code) can encode sensitive information indirectly, causing bias even without a sensitive label ever appearing in the data.",
    },
    {
      id: "q6",
      question: "In the real risk-assessment tool investigation, what was a key source of the unequal outcomes?",
      choices: [
            "The defendants themselves reported false information to the tool",
            "The company deliberately labeled defendants by race in the training data",
            "The tool's predictions were later proven to be entirely accurate for everyone",
            "Features tied to historical arrest patterns carried forward uneven policing patterns into the predictions",
          ],
      correctIndex: 3,
      explanation:
        "Representation choices — like using arrest history as a feature — can carry forward existing real-world unevenness into a model's predictions.",
    },
    {
      id: "q7",
      question: "Why is 'it's just numbers, so it's objective' a misleading claim?",
      choices: [
            "Because computers occasionally make random arithmetic errors",
            "A human decided which numbers to measure in the first place, and that decision can carry hidden bias",
            "Because numbers are always rounded, so they're technically inaccurate",
            "Objective measurement is impossible in any field, including science",
          ],
      correctIndex: 1,
      explanation:
        "The choice of what to measure is a human decision, made before any 'objective-looking' number appears — and that choice deserves scrutiny.",
    },
    {
      id: "q8",
      question: "If a school wanted to represent 'how well a student is doing' using only 5 features, what's the smartest next step after choosing them?",
      choices: [
            "Ask what important things those 5 features leave out, and whether any of them act as proxy variables",
            "Add the student's home address as a feature with no further thought",
            "Delete all other information immediately",
            "Assume the 5 features capture the whole truth and stop thinking about it",
          ],
      correctIndex: 0,
      explanation:
        "Naming what's missing — and checking for proxy variables — is the core representation-literacy skill from this lesson.",
    },
  ],
  reflection: {
    prompt:
      "If a school tried to represent 'a good student' using only data, what important things would the numbers probably leave out?",
    placeholder: "Numbers like grades and attendance might miss…",
  },
};
