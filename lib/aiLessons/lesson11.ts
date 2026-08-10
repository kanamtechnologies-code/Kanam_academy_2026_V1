import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson11: AILessonConfig = {
  id: "ai-11",
  title: "11. Don't Trust — Verify",
  goal: "Build the habit of fact-checking AI output, recognizing hallucinations, knowing which tasks are risky to trust, and understanding your responsibility not to spread unverified claims.",
  xpReward: 550,
  badge: "Fact Checker",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/10",
  nextHref: "/learn/ai/12",
  instructorScript: `**Coach's note**
Today's lesson: **Don't Trust — Verify**.

**Goal:** Build the habit of fact-checking AI output, recognizing hallucinations, knowing which tasks are risky to trust, and understanding your responsibility not to spread unverified claims.

**How to facilitate**
1. Warm-up: ask students what they already think about "What you'll learn today".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~20–25 min",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `AI chatbots are amazing writers — which is exactly why they're dangerous when they're wrong. Today you'll build the single most important habit for the AI age: **don't trust, verify.**\n\nRoadmap:\n\n• Why AI sounds just as confident when it's wrong as when it's right (**hallucinations**).\n• Which tasks are safe to trust and which are risky.\n• A quick routine to fact-check anything that matters.\n• Your responsibility once you've checked (or haven't checked) a claim before sharing it.\n\nThis protects you on homework, health questions, news, and money — places where a confident-but-fake answer can really cost you.`,
        image: "/images/lessons/ai-11-verify.png",
        imageAlt: "A student checking an AI answer against trusted sources",
        callout: {
          label: "Why it matters",
          text: "If you cite a fake fact in an essay, follow bad health advice, or share a made-up statistic, the AI doesn't pay the price — you do. Verifying keeps you in control.",
        },
      },
      {
        id: "hook-story",
        kicker: "Real moment",
        title: "The essay citation that didn't exist",
        body: `Tariq needs one more source for his research paper at 11pm. He asks a chatbot for a supporting study, and it hands back a perfect-looking citation: author, journal, year, even a specific statistic. He drops it in and submits.\n\nHis teacher can't find the study anywhere — because it never existed. The AI didn't lie on purpose; it predicted a citation that *looked* like the ones it had seen thousands of times, without any concept of whether that specific one was real.\n\nOne two-minute search would have caught it. That search is exactly what this lesson trains you to do, automatically, every time it matters.`,
        callout: {
          label: "Keep this in mind",
          text: "A confident, detailed answer is not the same thing as a checked one. Those are two different questions.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Verification words in plain English",
        body: `• **Hallucination** — confident AI output that sounds right but is false.\n• **Verify** — confirm a claim using a trusted, independent source.\n• **Cross-check** — comparing a claim against a second, separate source.\n• **Primary source** — the original document, study, or firsthand account behind a claim.\n• **Lateral reading** — checking what *other* trusted sites say about a source, instead of only reading deeper into the source itself.\n• **Human in the loop** — a person who reviews AI output before it's trusted or used.\n\nThese are the exact moves professional fact-checkers use — you're learning a real, transferable skill, not just an "AI class" rule.`,
        callout: {
          label: "Pro tip",
          text: "If a term feels abstract, picture a specific action: verify = search it, cross-check = find a second source, lateral reading = check what others say about the source itself.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "AI sounds sure even when it's wrong",
        body: `Remember how LLMs work: they predict **plausible** text, not necessarily **true** text. So they can **hallucinate** — produce confident, well-written nonsense that *looks* exactly like a correct answer.\n\nPicture a super-smooth talker who never admits "I don't know." They always have an answer, delivered with total confidence — but sometimes they're just making it up. That's an AI hallucination. The danger isn't that AI makes mistakes; it's that the mistakes wear the same polished outfit as the truth.\n\nSo the golden rule: treat AI output as a smart **first draft to check**, not a final fact.`,
        callout: {
          label: "Golden rule",
          text: "The more it matters, the more you must verify. Health, money, news, and graded facts always deserve a second source.",
        },
        checkIn: {
          prompt: "What's the biggest danger of AI hallucinations?",
          choices: [
            "They take too long to generate",
            "They always admit when they're unsure",
            "Wrong answers look just as confident and polished as correct ones",
            "They are written in a strange language",
          ],
          correctIndex: 2,
          explanation:
            "Hallucinations are dangerous precisely because they're fluent and confident, making errors hard to spot.",
        },
      },
      {
        id: "concept-2",
        kicker: "Know the danger zones",
        title: "Some tasks are far riskier than others",
        body: `AI is reliable for **language** tasks and risky for **facts**. Learning the difference tells you when to relax and when to double-check.\n\n• **Usually safe:** rephrasing your own text, brainstorming, summarizing something *you* provide, explaining a general concept.\n• **Verify carefully:** specific facts, statistics, dates, quotes, citations, current events, and any medical, legal, or financial advice.\n\nThe pattern: when the AI is *reshaping words you gave it*, risk is low. When it's *supplying facts from memory*, risk climbs fast.`,
        bullets: [
          "Safer: rewriting, brainstorming, summarizing text you give it.",
          "Risky: exact facts, numbers, quotes, sources, recent news.",
          "Highest stakes: health, money, legal — always double-check.",
        ],
        table: {
          columns: ["What you ask the AI to do", "Risk level"],
          values: [
            ["Rewrite my paragraph to sound clearer", "Low — language task"],
            ["Brainstorm topic ideas", "Low"],
            ["Summarize an article I pasted in", "Low"],
            ["Give an exact statistic or date", "High — verify"],
            ["Provide quotes and citations", "High — verify"],
            ["Summarize today's breaking news", "High — verify"],
          ],
          rowCount: 6,
        },
        checkIn: {
          prompt: "Which task is SAFEST to trust with minimal checking?",
          choices: [
            "Getting the exact population of a city in 2024",
            "Listing real scientific studies with page numbers",
            "Rewriting a paragraph you wrote to sound clearer",
            "Summarizing today's breaking news",
          ],
          correctIndex: 2,
          explanation:
            "Rephrasing your own text is a language task and low-risk. Exact facts, citations, and current news are hallucination hot spots.",
        },
      },
      {
        id: "concept-3",
        kicker: "How to verify",
        title: "A quick fact-checking routine",
        body: `When an AI gives you something important, run this 4-step check:\n\n1. **Source it** — find the claim on a trusted website, textbook, or official source.\n2. **Cross-check** — does a second, independent source agree?\n3. **Be suspicious of specifics** — exact numbers, named studies, and quotes are common hallucination spots.\n4. **Ask the AI to cite — then verify the citations are real.** It can invent sources that look perfect.\n\nIt takes a couple of minutes and saves you from confidently repeating something false.`,
        callout: {
          label: "Sneaky trap",
          text: "AI can produce fake citations that look 100% real — author, title, year, all invented. Always confirm sources actually exist.",
        },
        checkIn: {
          prompt: "An AI gives you three perfect-looking sources for your essay. What should you do?",
          choices: [
            "Check that each source actually exists before trusting or citing it",
            "Ask the AI if it's sure, then trust whatever it says",
            "Assume they're fake and ignore the whole answer",
            "Cite them immediately — they look real",
          ],
          correctIndex: 0,
          explanation:
            "AI can fabricate convincing citations. Always confirm sources are real before using them.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Decide whether to trust an AI answer",
        body: `You ask an AI for an essay fact and it replies: *"A 2019 Harvard study found that teens who sleep 9+ hours score 27% higher on tests."* Sounds perfect. Should you use it? Walk through it.\n\n**Step 1 — Spot the risky parts.** A specific year, a named institution, and an exact percentage — that's a triple hallucination hot spot.\n\n**Step 2 — Source it.** Search for the study. Can you find the actual Harvard study with that 27% figure? If it doesn't turn up on any trusted site, that's a red flag.\n\n**Step 3 — Cross-check.** Do reputable sources (a science site, a .edu, a news outlet) report the same thing? "Sleep helps learning" may be generally true, but that *exact* stat could be invented.\n\n**Step 4 — Decide.** If you can't confirm it, don't use it. Either find a real source or drop the claim. Never cite what you couldn't verify.`,
        code: `Claim: "2019 Harvard study: 9+ hrs sleep → 27% higher scores"
   ↳ specific year? ⚠️    named source? ⚠️    exact %? ⚠️
Search for it → can't find the real study → 🚩 likely hallucinated
Verdict: do NOT cite until confirmed by a real source`,
        codeCaption: "Tracing a suspicious AI 'fact'",
        callout: {
          label: "Pro tip",
          text: "If a statistic feels oddly specific and you can't find its original source in a minute or two, assume it might be hallucinated and leave it out.",
        },
      },
      {
        id: "second-example",
        kicker: "Second example",
        title: "Catching a fake citation before submission",
        body: `A student asks an AI for sources on renewable energy. It returns:\n\n*"Martinez, K. (2022). Solar grid efficiency in coastal cities. Journal of Applied Energy Studies, 14(3), 201–218."*\n\nLooks perfect — author, year, journal, page numbers. A verification pass takes 90 seconds:\n\n1. Search the journal name — does it exist?\n2. Search the author plus title — any real record?\n3. Check a library database or Google Scholar.\n\nNothing turns up. The citation was **hallucinated** — plausible formatting, fictional content. Submitting it could mean a zero and a integrity conversation.\n\nThe fix isn't "never use AI for research." It's **verify every source exists before you cite it.**`,
        callout: {
          label: "Notice this",
          text: "Hallucinated citations are one of the most common and most dangerous AI mistakes in school work.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth check",
        title: "\"It would tell me if it wasn't sure\"",
        body: `A common assumption: if an AI were guessing, it would hedge — say "I think" or "I'm not certain." In reality, hallucinations often come out in the exact same confident, matter-of-fact tone as correct answers. The model doesn't have an internal "certainty meter" it always shows you.\n\nAnother myth: "If I ask it twice and get the same answer, it must be true." Not necessarily — the model can consistently generate the same plausible-but-wrong answer every time, because it's the same flawed pattern each time, not a fresh check against reality.`,
        callout: {
          label: "Myth check",
          text: "Consistency and confidence are not proof of accuracy. The only real proof is an independent, trustworthy source.",
        },
        checkIn: {
          prompt: "If you ask an AI the same factual question twice and get the same confident answer both times, does that prove it's true?",
          choices: [
            "No, asking twice always changes the answer",
            "Yes, but only if it says 'I'm sure'",
            "Yes — repetition proves accuracy",
            "No — the model can consistently repeat the same wrong pattern; only an independent source proves it",
          ],
          correctIndex: 3,
          explanation:
            "A hallucination can be repeated consistently because it comes from the same flawed pattern each time — repetition isn't verification.",
        },
      },
      {
        id: "red-flags",
        kicker: "Red flags",
        title: "High-risk tasks — verify every time",
        body: `Some tasks deserve automatic skepticism, no matter how confident the AI sounds:`,
        bullets: [
          "**Citations, quotes, and statistics** — easy to fabricate, costly if wrong.",
          "**Medical, legal, or safety instructions** — errors can harm you or someone else.",
          "**Breaking news and fast-moving events** — training cutoffs and thin evidence.",
          "**Claims about specific people** — accusations, awards, arrests, or quotes attributed to real individuals.",
        ],
        callout: {
          label: "Rule of thumb",
          text: "Higher stakes + harder to check = lower trust by default. Verify first, act second.",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Fact-check a real AI claim right now",
        body: `Ask an AI tool for one specific fact you don't already know — a statistic, a historical date, a scientific claim. Then run the 4-step routine from earlier:\n\n1. Source it on a trusted site.\n2. Cross-check with a second source.\n3. Flag anything oddly specific.\n4. If it offered a citation, confirm that source actually exists.\n\nNotice how it feels to catch something *before* you use it, instead of finding out later that it was wrong.`,
        callout: {
          label: "No AI handy right now?",
          text: "Pick a surprising 'fact' you've seen online recently and run the same 4 steps on it. The muscle is the same.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Lateral reading: check the source, not just the claim",
        image: "/images/lessons/ai-ex-verify.png",
        imageAlt: "Comparing an AI claim against multiple independent trusted sources",
        body: `Professional fact-checkers use a technique called **lateral reading**: instead of digging deeper *into* a single suspicious page or claim, they open new tabs and search *about* the source itself — who wrote it, who published it, what other trusted outlets say about it.\n\nApplied to AI: if a chatbot names a "study" or "expert," don't just read what the AI says about them — search that study or expert's name directly. Does it show up on real, independent sites? Do multiple unrelated sources describe it the same way?\n\nThis is faster than it sounds, and it catches invented sources almost immediately — a fabricated study or expert typically has zero real footprint anywhere else.`,
        bullets: [
          "Search the source's name directly, separate from the AI's description of it.",
          "Look for the same claim on at least one independent, trusted site.",
          "Zero independent footprint = strong signal it may be invented.",
        ],
      },
      {
        id: "decision-checklist",
        kicker: "Decision checklist",
        title: "The 60-second verification pass",
        body: `Before you use or share an AI answer, run this quick pass:`,
        bullets: [
          "**Source check** — Can I find this fact in at least one independent, trusted place?",
          "**Date check** — Is the information current enough for this decision?",
          "**Logic check** — Does the claim make sense, or does it only sound polished?",
          "**Share check** — If I'm wrong, who gets hurt when I pass this along?",
        ],
        checkIn: {
          prompt: "A classmate wants to repost an AI-generated quote attributed to a famous scientist. What's the AI-smart move?",
          choices: [
            "Verify the quote in a reliable biography or official source before sharing",
            "Repost with extra emojis so people know it's informal",
            "Ask the same AI if the quote is real and trust its answer",
            "Repost it — the scientist probably said something like that",
          ],
          correctIndex: 0,
          explanation:
            "Attributed quotes are high-risk for hallucination. Independent verification before sharing is the responsible habit — asking the same AI is circular and unreliable.",
        },
      },
      {
        id: "comparison",
        kicker: "See it side by side",
        title: "Matching the check to the claim",
        body: `Different kinds of claims deserve different verification moves. Here's a quick guide.`,
        table: {
          columns: ["Type of claim", "Best way to verify"],
          values: [
            ["A statistic or study", "Search the study name directly; check it exists on an independent site"],
            ["A historical fact or date", "Check a textbook, encyclopedia, or .edu/.gov source"],
            ["A quote", "Search the exact quote in quotation marks to see where it really comes from"],
            ["Breaking news", "Check at least two independent, reputable news outlets"],
          ],
          rowCount: 4,
        },
        checkIn: {
          prompt: "An AI gives you an exact quote attributed to a famous person. What's the fastest way to check it?",
          choices: [
            "Assume it's real because it sounds like something they'd say",
            "Change a few words so it's technically your own",
            "Ask the AI to promise it's accurate",
            "Search the exact quote in quotation marks to see where it actually traces back to",
          ],
          correctIndex: 3,
          explanation:
            "Searching the exact phrase often reveals immediately whether a quote is real, misattributed, or invented.",
        },
      },
      {
        id: "ethics",
        kicker: "Ethics moment",
        title: "You're responsible for what you spread, not just what you write",
        body: `Verifying isn't only about protecting your own grade or your own decisions — it's about not becoming a link in a misinformation chain. An unverified AI "fact" that you repeat to a friend, post online, or cite in a group project can spread further than you expect, and other people may trust it *because you said it*.\n\nThis is part of digital citizenship: before sharing something surprising, ask "have I actually checked this, or am I just passing along something that sounded confident?" If you haven't checked it, say so — "I saw this somewhere, not sure it's confirmed" — instead of stating it as settled fact.\n\nThe goal isn't paranoia about everything you read. It's honesty about your own confidence level before you hand a claim to someone else.`,
        callout: {
          label: "Quick gut-check",
          text: "Before repeating a claim: have I verified it, or am I just forwarding confidence? Say which one it is.",
        },
      },
      {
        id: "habits",
        kicker: "Make it automatic",
        title: "Four verification habits worth keeping",
        body: `1. **Match effort to stakes.** A casual brainstorm doesn't need fact-checking; an essay citation or health claim does.\n2. **Search the source, not just the claim** (lateral reading) for anything named specifically.\n3. **Cross-check with one independent source** before repeating a surprising fact.\n4. **Label your confidence** when you share something — "I checked this" vs. "I haven't verified this yet."`,
        callout: {
          label: "This week",
          text: "Next time an AI hands you a specific stat, date, or quote you plan to use anywhere public, run the 4-step check before you hit send or submit.",
        },
      },
      {
        id: "transfer-to-life",
        kicker: "Use it for real",
        title: "Be the person who pauses the group chat",
        body: `When friends share shocking screenshots, "facts," or viral claims this week, practice saying:\n\n*"Wait — let's check that before we spread it."*\n\nThen run one fast verification step together: search the claim, check the original source, look for coverage from a trusted outlet.\n\nYou don't have to be annoying about it — but one person who verifies before sharing protects the whole group from becoming a rumor engine.`,
        callout: {
          label: "Transfer this",
          text: "Verification is a social skill, not just a solo study habit. It protects everyone who would have believed you.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on...",
        body: `Think of the last time you shared or repeated something you'd read or heard without fully checking it. Would running the 4-step verification routine have changed whether you shared it, or how you phrased it?\n\nHold that thought for the reflection at the end of this lesson.`,
      },
      {
        id: "mini-case",
        kicker: "Mini-case",
        title: "The viral 'fact' in the group chat",
        body: `Someone posts in a group chat: "AI said that a famous chef once said 'a recipe is just a suggestion' — wow, so true!" It's got a nice ring to it, and a few people react with quote emojis.\n\nBefore repeating it in a class project, one student decides to check. She searches the exact quote in quotation marks — nothing from that chef comes up anywhere except AI-generated content and quote-image sites that all look copy-pasted from each other. No independent, reputable source ever attributes it to that chef.\n\nShe posts back in the chat: "Couldn't verify this one anywhere real — might be an AI-invented quote. I'd skip using it." That's the entire skill from this lesson, applied in under three minutes.`,
        checkIn: {
          prompt: "What made this student's response a good example of responsible verification?",
          choices: [
            "She searched the exact quote, found no independent source, and clearly flagged it as unverified before it spread further",
            "She assumed the quote was fake without checking anything",
            "She asked the AI to confirm its own quote and trusted that answer",
            "She reposted it anyway since it sounded believable — familiar wording, wrong fit for what the prompt is actually asking",
          ],
          correctIndex: 0,
          explanation:
            "She searched for independent confirmation, found none, and was transparent that the claim was unverified — stopping a possible hallucination from spreading.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Self-check",
        title: "Spot the hallucination hot spots",
        body: `One more rep before the graded knowledge check. An AI tells you: "According to a 2021 UN report, 68% of teens worldwide use social media daily, citing researcher Dr. A. Kwan."`,
        checkIn: {
          prompt: "Which parts of that sentence are the biggest hallucination hot spots to verify first?",
          choices: [
            "Only the word 'social media' needs checking",
            "The words 'teens' and 'daily'",
            "Nothing needs checking — it sounds official",
            "The specific year, the exact percentage, and the named report/researcher",
          ],
          correctIndex: 3,
          explanation:
            "Specific years, exact statistics, and named studies or researchers are the classic hallucination hot spots — always trace these back to a real, independent source.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Using AI well doesn't mean believing it — it means staying the **human in the loop** who judges, checks, and decides — and taking responsibility for what you pass along to others. That habit is exactly what makes you more valuable, not less, in an AI world.\n\nNext we'll apply this to schoolwork specifically. First, lock in today's ideas.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict).`,
      },
    ],
  },
  bigIdeas: [
    "AI states wrong answers as confidently as right ones — so **verify**.",
    "Language tasks are safer; **facts, numbers, quotes, and news** are risky.",
    "Always confirm **citations and sources actually exist** — AI invents them.",
    "You're responsible for what you **spread**, not just what you write — verify before repeating.",
  ],
  keyTerms: [
    { term: "Verify", definition: "To confirm a claim is true using trusted, independent sources." },
    { term: "Hallucination", definition: "Confident, false AI output that sounds correct." },
    { term: "Human in the loop", definition: "A person who reviews and approves AI output before it's trusted or used." },
    { term: "Cross-check", definition: "Confirming a fact with more than one independent source." },
    { term: "Lateral reading", definition: "Checking what other trusted sources say about a source, instead of only reading deeper into it." },
  ],
  realWorld:
    "Lawyers have been penalized for filing AI-written briefs that cited court cases which never existed. The AI invented them, and no human verified — a costly 'don't trust, verify' lesson.",
  quiz: [
    {
      id: "q1",
      question: "What's the biggest danger of AI hallucinations?",
      choices: [
            "Wrong answers look just as confident and polished as correct ones",
            "They always admit when they're unsure",
            "They take too long to generate",
            "They are written in a strange language",
          ],
      correctIndex: 0,
      explanation:
        "Hallucinations are dangerous precisely because they're fluent and confident, making errors hard to spot.",
    },
    {
      id: "q2",
      question: "Which task is SAFEST to trust with minimal checking?",
      choices: [
        "Getting the exact population of a city in 2024",
        "Listing real scientific studies with page numbers",
        "Rewriting a paragraph you wrote to sound clearer",
        "Summarizing today's breaking news",
      ],
      correctIndex: 2,
      explanation:
        "Rephrasing your own text is a language task and low-risk. Exact facts, citations, and current news are hallucination hot spots.",
    },
    {
      id: "q3",
      question: "An AI gives you three perfect-looking sources for your essay. What should you do?",
      choices: [
            "Check that each source actually exists before trusting or citing it",
            "Cite them immediately — they look real",
            "Assume they're fake and ignore the whole answer",
            "Ask the AI if it's sure, then trust whatever it says",
          ],
      correctIndex: 0,
      explanation:
        "AI can fabricate convincing citations. Always confirm sources are real before using them.",
    },
    {
      id: "q4",
      question: "What does being the 'human in the loop' mean?",
      choices: [
            "Letting the AI make all final decisions",
            "Never using AI at all",
            "Only using AI on weekends",
            "Reviewing, checking, and deciding before AI output is trusted or used",
          ],
      correctIndex: 3,
      explanation:
        "The human in the loop judges and verifies AI output — the key skill for using AI responsibly.",
    },
    {
      id: "q5",
      question: "If you ask an AI the same factual question twice and get the same confident answer, does that prove it's true?",
      choices: [
            "Yes, but only if it says 'I'm sure'",
            "No — it can consistently repeat the same wrong pattern; only an independent source proves it",
            "Yes — repetition proves accuracy",
            "No, because it always changes its answer",
          ],
      correctIndex: 1,
      explanation:
        "A hallucination can repeat consistently since it comes from the same flawed pattern each time. Repetition isn't verification.",
    },
    {
      id: "q6",
      question: "What is 'lateral reading'?",
      choices: [
            "Reading two AI answers side by side for style",
            "A way to make text formatting wider",
            "Reading a page from left to right instead of top to bottom",
            "Searching about a source itself (who wrote it, what others say) instead of only reading deeper into it",
          ],
      correctIndex: 3,
      explanation:
        "Lateral reading means opening new tabs to check a source's credibility elsewhere, rather than just trusting how it describes itself.",
    },
    {
      id: "q7",
      question: "Why does it matter if you repeat an unverified AI claim to friends or online?",
      choices: [
            "It only matters if a teacher is watching",
            "Others may trust the claim because you said it, so you become part of spreading possible misinformation",
            "AI claims are always true once repeated by a person",
            "It doesn't matter once you've said it, it's not your problem anymore",
          ],
      correctIndex: 1,
      explanation:
        "Sharing an unverified claim can spread it further, and others may trust it simply because you repeated it — that's a real responsibility.",
    },
    {
      id: "q8",
      question: "How does fact-checking AI output connect to being a good digital citizen?",
      choices: [
            "Only teachers need to worry about digital citizenship, not students",
            "It can seem like it doesn't relate to digital citizenship, but that reading skips the distinction this question is testing",
            "Critically evaluating information and not spreading unverified claims are core digital citizenship and knowledge-construction skills",
            "Some learners answer “Digital citizenship is only about screen time limits”, yet that does not match the precise idea from the lesson",
          ],
      correctIndex: 2,
      explanation:
        "Evaluating sources critically and acting responsibly with information you share are exactly the verification practices this lesson builds.",
    },
  ],
  reflection: {
    prompt:
      "Think of one way you might use AI for school. Write a mini fact-check plan: what specifically would you double-check, and where?",
    placeholder: "If I use AI to study history, I'd verify the dates and names by…",
  },
};
