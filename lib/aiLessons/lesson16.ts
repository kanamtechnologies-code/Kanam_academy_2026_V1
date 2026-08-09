import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson16: AILessonConfig = {
  id: "ai-16",
  title: "16. Capstone: Be an AI-Smart Citizen",
  goal: "Put it all together: review the big ideas, evaluate a real AI tool with a full adoption checklist, and write your own responsible-use guidelines.",
  xpReward: 800,
  badge: "AI-Smart Citizen",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/15",
  instructorScript: `**Coach's note**
Today's lesson: **Capstone: Be an AI-Smart Citizen**.

**Goal:** Put it all together: review the big ideas, evaluate a real AI tool with a full adoption checklist, and write your own responsible-use guidelines.

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
        body: `This is it — the capstone that ties your whole AI literacy journey together. You've gone from "what even *is* AI?" to understanding how it learns, how to prompt it, how to verify it, and how to use it ethically and safely. Today you turn all of that into something you'll keep for life.\n\nRoadmap for your capstone:\n\n• A fast recap of everything you now know.\n• The **AI-Smart Citizen checklist** — five habits for any AI interaction.\n• A real task: evaluate an AI tool *you* actually use, the way an expert would.\n• A final ethics synthesis and one last scenario to test everything at once.\n\nThis is where knowledge becomes a skill you carry into every app, classroom, and job ahead.`,
        image: "/images/lessons/ai-16-capstone.png",
        imageAlt: "A graduate surrounded by the key ideas of the AI literacy course",
        callout: {
          label: "Why it matters",
          text: "New AI tools will keep appearing your whole life. The ability to size up *any* of them — what it does, where it fails, how to use it wisely — never goes out of date.",
        },
      },
      {
        id: "hook-story",
        kicker: "Real moment",
        title: "Two students, the same AI tool, one course later",
        body: `Picture the same student, twice. Sixteen lessons ago, faced with a new AI writing tool, they'd have typed "write my essay" and turned in whatever came back, trusting a confident tone and never wondering where the content came from.\n\nToday, faced with the exact same tool, that student pauses. They write a specific prompt with role, task, context, and format. They read the draft skeptically, checking any fact or quote before using it. They notice the tool nudging them toward using its exact wording and decide instead to write the argument in their own words, only asking AI to check clarity. They think about whether their teacher expects disclosure, and they disclose.\n\nSame tool. Same assignment. Completely different relationship with AI — because of everything you've built up over this course, lesson by lesson. That transformation is what this capstone is designed to prove you can do, on your own, with a tool of your choosing.`,
        callout: {
          label: "Keep this in mind",
          text: "The tool didn't get smarter between those two moments. The student did.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Your whole-course vocabulary, in one place",
        body: `A rapid recap of the vocabulary that ties the entire course together:\n\n• **Narrow AI** — a specialist at one task (all AI today).\n• **Hallucination** — confident AI output that sounds right but is false.\n• **Prompt (Role, Task, Context, Format, Constraint)** — the ingredients of a clear instruction to AI.\n• **Bias** — systematically unfair AI results, usually learned from data.\n• **Deepfake** — realistic fake media of a real person.\n• **Augmentation** — AI making humans more capable, not replacing them.\n• **AI literacy** — the ability to understand, use, evaluate, and question AI responsibly.\n\nIf any of these feel shaky, that's your cue for which earlier lesson to skim before your capstone reflection.`,
        callout: {
          label: "Study tip",
          text: "Try explaining each term out loud to a friend or family member in one sentence. If you can teach it simply, you've truly learned it.",
        },
      },
      {
        id: "concept-1",
        kicker: "Capstone",
        title: "Everything you now know about AI",
        body: `You can **prompt** with Role, Task, Context, and Format, then refine with follow-ups. You know to **verify** output because confident AI can still be wrong. And you can reason clearly about **bias**, **privacy**, **deepfakes**, academic **integrity**, and the **future of work**.\n\nThat's not trivia — that's a genuine mental model of one of the most important technologies of your lifetime.`,
        callout: {
          label: "You can now",
          text: "Define AI, explain how it learns, prompt it well, verify its answers, and use it ethically and safely. That's real AI literacy.",
        },
        checkIn: {
          prompt: "Which statement best shows true AI literacy, as this course has built it?",
          choices: [
            "“AI is useless and should always be avoided” describes a different situation than the one in the question stem",
            "AI is a powerful pattern tool that I can direct with good prompts, verify before trusting, and use ethically",
            "“AI is magic that shouldn't be questioned” describes a different situation than the one in the question stem",
            "“AI is a conscious mind that's always right” describes a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "AI literacy means seeing AI clearly: a powerful pattern tool you direct, check, and use responsibly — the thread running through this entire course.",
        },
      },
      {
        id: "concept-2",
        kicker: "Your toolkit",
        title: "The AI-Smart Citizen checklist",
        body: `Boil the whole course down to five habits you can carry into every AI interaction:\n\n1. **Understand** — it's a pattern tool, not a mind. It predicts; it doesn't *know*.\n2. **Direct** — write clear prompts and refine with follow-ups.\n3. **Verify** — don't trust facts, quotes, or sources without checking.\n4. **Protect** — guard your privacy and stay skeptical of deepfakes.\n5. **Act ethically** — be honest at school, think about fairness and impact, and respect the people whose work trained the AI.\n\nMemorize these five and you have a compass for any AI situation — even ones that don't exist yet.`,
        bullets: [
          "Understand what AI really is.",
          "Direct it with good prompts.",
          "Verify before you trust.",
          "Protect privacy; question fakes.",
          "Use it honestly, fairly, and ethically.",
        ],
        checkIn: {
          prompt: "An AI gives you a confident statistic with a source for your project. Which checklist habit applies most directly?",
          choices: [
            "Understand — just remember it's a pattern tool and move on” belongs to a different situation than the one in the question stem",
            "Direct — rewrite your original prompt” belongs to a different situation than the one in the question stem",
            "Protect — check your privacy settings” belongs to a different situation than the one in the question stem",
            "Verify — confirm the statistic and the source actually exist before using it",
          ],
          correctIndex: 3,
          explanation:
            "Don't trust, verify. Facts, stats, and sources from AI can be hallucinated and must be checked before you use them.",
        },
      },
      {
        id: "concept-3",
        kicker: "Capstone task",
        title: "Evaluate a real AI tool",
        body: `For your capstone, pick **one AI tool you actually use** — a chatbot, a recommendation feed (YouTube, TikTok, Spotify), a photo editor, or a study app — and analyze it using everything from this course.\n\nStart with the quick four questions: specialty, data, risks, your rules. Then, if your class were **adopting** this tool, run the full **Capstone adoption checklist**:\n\n1. **Define the job** — what problem should this tool solve for you?\n2. **Test on real school examples** — not just slick demos; try your actual homework, projects, or daily use.\n3. **Check accuracy, bias, and privacy** — where could it be wrong, unfair, or leak data?\n4. **Confirm human review and disclosure rules** — who checks the output, and when do you tell a teacher you used AI?\n5. **Decide: adopt, limit, or reject** — based on evidence, not hype.\n\nYou'll capture this in the reflection after the knowledge check.`,
        callout: {
          label: "Make it real",
          text: "The goal isn't a perfect essay — it's proving you can look at any AI tool and think clearly about it. That's the skill that lasts.",
        },
        checkIn: {
          prompt: "In the capstone adoption checklist, what should come BEFORE deciding to adopt, limit, or reject a tool?",
          choices: [
            "Nothing — you should decide immediately based on the tool's reputation” belongs to a different situation than the one in the question stem",
            "Defining the job, testing on real examples, and checking accuracy/bias/privacy and human review rules",
            "“Asking the AI itself whether it's trustworthy” describes a different situation than the one in the question stem",
            "“Only checking how much the tool costs” describes a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "The adoption decision should come last, after defining the real job, testing on genuine examples, and checking risks — evidence before verdict.",
        },
      },
      {
        id: "worked-example",
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
        id: "second-example",
        kicker: "Second example",
        title: "Same checklist, different tool: a study chatbot",
        body: `Run the adoption checklist on a homework chatbot a class might adopt.\n\n**Define the job:** "Help students understand concepts — not submit graded work."\n\n**Test on real examples:** Try actual unit questions. Does it teach, or just hand over answers?\n\n**Check risks:** Hallucinated facts? Privacy of pasted essays? Unequal access for students without home internet?\n\n**Human rules:** Teachers review sample sessions; students disclose use; tutors available for students who need offline help.\n\n**Decide:** Maybe **limit** to teacher-approved practice modes instead of open-ended "write my essay" — adopt with guardrails, not blind trust.\n\nDifferent tool than a video feed — **same citizenship muscles.**`,
        callout: {
          label: "Notice this",
          text: "The checklist transfers because the questions are about impact, not brand names.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth check",
        title: "The last three myths worth retiring for good",
        body: `A final myth-busting recap, gathering the most persistent misconceptions from across the whole course:\n\n• **Myth: AI is basically a mind that understands things.** Reality: it's pattern prediction at enormous scale, with no lived understanding underneath.\n• **Myth: A confident answer is a correct answer.** Reality: hallucinations sound exactly as confident as true statements — tone proves nothing.\n• **Myth: Using AI is either "totally fine" or "always cheating," with no in-between.** Reality: the honest test is whether AI helped you learn and think, or quietly did your thinking for you — and that test applies to prompting, verifying, creating, and every other skill in this course.\n\nIf you walk away from this entire course with just these three corrections installed, you're already more AI-literate than most adults.`,
        callout: {
          label: "Final myth check",
          text: "AI literacy isn't about being anti-AI or pro-AI. It's about being accurate: a pattern tool, not a mind; a first draft, not a verified fact; a collaborator, not an autopilot.",
        },
        checkIn: {
          prompt: "What's the honest test for whether a particular use of AI crossed the line from help into problematic reliance?",
          choices: [
            "Whether anyone else found out you used it” belongs to a different situation than the one in the question stem",
            "Whether you used AI at all, with no other consideration” belongs to a different situation than the one in the question stem",
            "Whether the answer sounded confident” belongs to a different situation than the one in the question stem",
            "Whether the AI helped you learn and think, or quietly did the thinking for you instead",
          ],
          correctIndex: 3,
          explanation:
            "The test that has run through this whole course is whether AI use supported your own learning and judgment, or replaced it — not simply whether AI was involved.",
        },
      },
      {
        id: "red-flags",
        kicker: "Red flags",
        title: "Capstone red flags — walk away signals",
        body: `When evaluating any AI tool for yourself or your community, these are strong **reject or limit** signals:`,
        bullets: [
          "**No way to verify outputs** on topics where errors cause real harm.",
          "**Collects sensitive data without a clear, readable policy.**",
          "**No human appeal or override** when the system is wrong about a person.",
          "**Marketed as \"fully automatic\" for decisions that need human judgment** — grading, discipline, medical, legal.",
          "**Encourages hiding AI use** instead of disclosure and learning.",
        ],
        callout: {
          label: "Citizen move",
          text: "Naming these red flags out loud — to friends, teachers, or family — is part of being AI-smart, not just personally careful.",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Start your capstone right now",
        body: `Before the graded knowledge check, spend a few minutes starting your actual capstone:\n\n1. **Pick your tool** — something you genuinely use (chatbot, recommendation feed, photo editor, study app).\n2. **Answer the quick four questions** informally: specialist at what, what data, what risks, your rules.\n3. **Jot one sentence** for each of the five adoption-checklist steps, even roughly.\n\nYou don't need a polished final version yet — the reflection at the end of this lesson is where you'll write your full capstone answer.`,
        callout: {
          label: "Choosing a tool",
          text: "Pick something you have genuine opinions about — your analysis will be sharper and more honest than if you pick something you've barely used.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Applying the checklist to a tool that doesn't exist yet",
        body: `The real test of AI literacy isn't whether you can evaluate the tools you already know — it's whether you could size up a brand-new AI tool you've never seen before, the day it launches.\n\nTry this thought experiment: imagine a new app launches tomorrow that claims to "give personalized life advice using AI, trained on millions of real people's journal entries." Before ever opening it, you could already ask:\n\n• **What's it a specialist at?** (Giving generically plausible advice — not truly knowing your life.)\n• **What data trained it, and who consented to share their journal entries?** (A real ethics question, right from lesson 7's playbook.)\n• **What are the hallucination and bias risks?** (Advice that sounds personal but is a generic pattern match; advice shaped by whoever's journals dominated the training data.)\n• **What's your verification and disclosure plan?** (Don't treat "life advice" as fact; think about whether to tell people if you're basing real decisions on it.)\n\nNotice you didn't need to open the app to ask sharp, useful questions. That transferability — to tools that don't exist yet — is the actual finish line of AI literacy.`,
        bullets: [
          "You can ask the four quick questions about ANY AI tool, seen or unseen.",
          "Data provenance and consent questions transfer across every new AI product.",
          "This is the skill that keeps working long after this course ends.",
        ],
      },
      {
        id: "decision-checklist",
        kicker: "Decision checklist",
        title: "The five-step adoption checklist — full version",
        body: `Your capstone framework, ready to apply anywhere:`,
        bullets: [
          "**1. Define the job** — What problem are we solving? What is AI *not* allowed to decide?",
          "**2. Test on real examples** — Use actual school/life cases, not shiny demos.",
          "**3. Check accuracy, bias, and privacy** — Where could it be wrong or unfair? What data leaves your control?",
          "**4. Set human review and disclosure rules** — Who double-checks? When do users say AI helped?",
          "**5. Decide: adopt, limit, or reject** — With clear reasons, not hype or fear.",
        ],
        checkIn: {
          prompt: "Your school is excited about a new AI grading tool. Which step should come BEFORE deciding to adopt it?",
          choices: [
            "Announce adoption in the newsletter” belongs to a different situation than the one in the question stem",
            "Define the job, test on real student work, and check accuracy, bias, and privacy risks",
            "Disable all human grading immediately” belongs to a different situation than the one in the question stem",
            "Trust the vendor's marketing video” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "Evidence before verdict: define the purpose, test realistically, and examine risks — then decide. Marketing and hype skip the steps that protect students.",
        },
      },
      {
        id: "comparison",
        kicker: "See it side by side",
        title: "Naive AI user vs. AI-smart citizen",
        body: `Seeing the mindset shift side by side makes the whole course's payoff concrete.`,
        table: {
          columns: ["Situation", "Naive AI user", "AI-smart citizen (you, now)"],
          values: [
            ["Gets a confident AI fact", "Uses it immediately", "Verifies it against an independent source first"],
            ["Writes a prompt", "Types the first vague thought", "Stacks Role, Task, Context, Format, and constraints"],
            ["Sees a shocking video", "Believes and shares it instantly", "Checks the source before believing or sharing"],
            ["Uses AI on an assignment", "Submits AI output as entirely their own", "Uses AI to learn, then does and discloses their own thinking"],
          ],
          rowCount: 4,
        },
        checkIn: {
          prompt: "What's the core difference illustrated in this comparison table?",
          choices: [
            "“There's no real difference between the two approaches” describes a different situation than the one in the question stem",
            "Naive users are always right and AI-smart citizens overthink things” belongs to a different situation than the one in the question stem",
            "It can seem like aI-smart citizens never use AI at all, but that reading skips the distinction this question is testing",
            "AI-smart citizens actively direct, verify, and take responsibility, instead of passively accepting whatever AI produces",
          ],
          correctIndex: 3,
          explanation:
            "The whole course builds toward this: staying an active, verifying, responsible human in the loop, rather than a passive consumer of AI output.",
        },
      },
      {
        id: "what-good-looks-like",
        kicker: "What good looks like",
        title: "Your responsible-use guidelines — starter template",
        body: `Strong personal guidelines usually include five elements. Adapt this template for your capstone:`,
        bullets: [
          "**Understand** — I know what the tool is a specialist at, and what it is not.",
          "**Direct** — I prompt with clear role, task, context, format, and constraints.",
          "**Verify** — I check high-stakes facts before I use or share them.",
          "**Protect** — I share minimal data and respect others' consent and privacy.",
          "**Act ethically** — I disclose when it matters, credit fairly, and consider who is affected.",
        ],
        callout: {
          label: "Make it yours",
          text: "Generic rules are a start. The best guidelines name *your* actual tools, classes, and non-negotiables.",
        },
      },
      {
        id: "ethics",
        kicker: "Ethics moment",
        title: "Your responsibility doesn't end when the course does",
        body: `Every ethics idea across this course — privacy, consent, bias, disclosure, fairness in the future of work — shares one thread: AI amplifies whatever intentions and data go into it, at a scale no single person could reach alone. That means your choices about *how* you use AI ripple further than they would have with any older tool.\n\nAI will keep changing after this course ends — new tools, new capabilities, new risks nobody's named yet. The habits you've built (verify before trusting, protect others' privacy and consent, disclose when it matters, question who benefits and who's affected) are designed to transfer to whatever comes next, not just to the specific tools you used this year.\n\nBeing an AI-smart citizen isn't a badge you earn once — it's an ongoing practice of staying curious, skeptical, and honest as the technology keeps evolving around you.`,
        callout: {
          label: "Carry this forward",
          text: "The specific AI tools you know today will be outdated in a few years. The habit of asking 'who does this affect, and how do I verify it?' never will be.",
        },
      },
      {
        id: "habits",
        kicker: "Make it automatic",
        title: "The five habits that summarize the entire course",
        body: `One last time, the five habits worth carrying for life:\n\n1. **Understand** — it's a pattern tool, not a mind.\n2. **Direct** — prompt clearly, iterate deliberately.\n3. **Verify** — don't trust, check.\n4. **Protect** — your privacy and other people's consent.\n5. **Act ethically** — think about fairness, credit, and impact, every time.\n\nThese five habits are your whole AI-Smart Citizen toolkit, distilled.`,
        callout: {
          label: "Keep this list",
          text: "Screenshot or write down these five habits somewhere you'll actually see them again — that's the real takeaway of this entire course.",
        },
      },
      {
        id: "transfer-to-life",
        kicker: "Use it for real",
        title: "Take citizenship beyond this course",
        body: `AI literacy doesn't end when you earn the badge. Three ways to carry it forward:\n\n1. **Teach one habit** to a friend or family member this month (verify before sharing, privacy check, disclosure).\n2. **Ask one fairness question** when your school or a platform rolls out a new AI feature.\n3. **Re-run the adoption checklist** the next time *you* are excited about a new tool — excitement is when bad decisions happen.\n\nBeing AI-smart is contagious in a good way. You become the thoughtful person others trust when something looks too good to be true.`,
        callout: {
          label: "Transfer this",
          text: "Citizenship means your choices affect others — not just your own screen time.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on...",
        body: `Look back at everything you've learned, from Lesson 1's "what even is AI?" to today. What's the single idea from this whole course you're most likely to actually use in real life over the next year?\n\nHold that thought — it's a great note to weave into your full capstone reflection at the end of this lesson.`,
      },
      {
        id: "extra-check-in-1",
        kicker: "Skill check",
        title: "Which course skill fits this situation?",
        body: `Quick scenario practice — connect the right habit to the situation.`,
        checkIn: {
          prompt: "A classmate uses AI to write their entire lab report and says \"everyone does it.\" Which response reflects AI-smart citizenship?",
          choices: [
            "It can seem like stay silent — not your problem, but that reading skips the distinction this question is testing",
            "If the goal were something else, “Copy their approach so you don't fall behind” might work; for this check, it does not",
            "Explain how disclosure, learning goals, and verification matter, and suggest a healthier way to use AI on science work",
            "Report them immediately without any conversation — familiar wording, wrong fit for what the prompt is actually asking",
          ],
          correctIndex: 2,
          explanation:
            "Citizenship combines honesty about learning goals, ethical use, and constructive conversation — not silence, copying, or reflexive punishment without context.",
        },
      },
      {
        id: "mini-case",
        kicker: "Mini-case",
        title: "The group project that used every skill from this course",
        body: `A group of students is assigned a project on climate change. One member, Kayla, suggests using an AI tool to speed things up, and the group agrees to try it — carefully.\n\nThey **prompt** it well: role (climate science explainer), task (summarize three causes), context (9th-grade level), format (bullet points). They **verify** every statistic it gives them against a trusted science website before using it, catching one hallucinated number along the way. When the AI suggests an image, they check whether it looks like it might closely imitate a specific real photographer's style, and choose a different, more generic one to be safe.\n\nBefore submitting, they **disclose** to their teacher exactly which parts used AI assistance and which parts were entirely their own writing and analysis. Their teacher, impressed by the transparency and the caught hallucination, uses the project as a positive classroom example of AI-smart teamwork — precisely because the group treated AI as a directed, verified collaborator rather than an unsupervised author.`,
        checkIn: {
          prompt: "Which combination of skills from this course did Kayla's group demonstrate?",
          choices: [
            "“They used AI but lied to their teacher about it afterward” describes a different situation than the one in the question stem",
            "Some learners answer “They avoided AI entirely to be safe”, yet that does not match the precise idea from the lesson",
            "They prompted deliberately, verified facts, considered image-ethics questions, and disclosed their AI use honestly",
            "They submitted whatever the AI produced without any changes” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "The group combined careful prompting, fact verification, ethical caution around imitating a real artist's style, and honest disclosure — the full AI-Smart Citizen toolkit in action.",
        },
      },
      {
        id: "extra-check-in-2",
        kicker: "Skill check",
        title: "Pull three skills from the whole course",
        body: `One more integrated scenario before your final knowledge check.`,
        checkIn: {
          prompt: "You're evaluating a new AI tutor for math practice. Which combination matches the capstone approach?",
          choices: [
            "Define the learning job, test it on real homework problems, check privacy and hallucination risks, set disclosure rules, then decide whether to adopt or limit",
            "A common mix-up is to treat adopt immediately because it says AI on the homepage as enough, which confuses a nearby idea with the right one",
            "A common mix-up is to treat reject all AI tools without trying any as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "A common mix-up is to treat let the AI grade itself and skip human review as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
          ],
          correctIndex: 0,
          explanation:
            "The adoption checklist — define, test, check risks, set human rules, then decide — is the capstone skill set in one answer.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Self-check",
        title: "One last integrated check",
        body: `A final rep before the graded knowledge check, pulling together several ideas from across the whole course at once.`,
        checkIn: {
          prompt: "A friend shows you a shocking AI-generated-looking video with a caption claiming a celebrity said something outrageous, and asks if they should repost it. What's the AI-smart citizen response?",
          choices: [
            "“Ask the same AI tool if the video is real and trust whatever it says” describes a different situation than the one in the question stem",
            "It can seem like repost immediately since it's already going viral, but that reading skips the distinction this question is testing",
            "Verify it against trusted sources first, since it could be a deepfake or hallucinated claim, before deciding whether to share it at all",
            "It can seem like assume it's true because videos can't be faked, but that reading skips the distinction this question is testing",
          ],
          correctIndex: 2,
          explanation:
            "This pulls together deepfake awareness, verification habits, and responsible sharing — check before you spread, every time, regardless of how convincing the content looks.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn — finish strong",
        body: `This is the finish line of the whole AI Literacy track. You started by asking what AI is; now you can understand it, direct it, verify it, protect yourself and others from its risks, and use it ethically. That's real AI literacy — the kind most adults don't have yet.\n\nTake the final knowledge check (it pulls from the entire course), then complete your capstone reflection to earn your **AI-Smart Citizen** badge.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict). Congratulations — you've become exactly the kind of thoughtful, AI-smart person the future needs.`,
      },
    ],
  },
  bigIdeas: [
    "AI literacy = **understand, direct, verify, protect, act ethically**.",
    "You can analyze **any** AI tool: specialty, data, risks, your rules — then an adoption checklist.",
    "Before adopting: **define job → test real examples → check risks → set human rules → decide**.",
    "Staying the **thoughtful human in charge** is the skill that lasts — including caring about who else is affected.",
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
            "AI is a conscious mind that's always right” belongs to a different situation than the one in the question stem",
            "AI is a powerful pattern tool I should direct, verify, and use ethically",
            "AI is magic I shouldn't question” belongs to a different situation than the one in the question stem",
            "AI is useless and I should avoid it” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "AI literacy means seeing AI clearly: a powerful pattern tool you guide, check, and use responsibly.",
    },
    {
      id: "q2",
      question: "An AI gives you a confident statistic with a source for your project. The AI-smart move is to…",
      choices: [
            "Use it right away — it sounds official” belongs to a different situation than the one in the question stem",
            "Verify the statistic and confirm the source actually exists before using it",
            "“Delete your project” describes a different situation than the one in the question stem",
            "Ask the AI to promise it's true” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "Don't trust, verify. Facts, stats, and sources from AI can be hallucinated and must be checked.",
    },
    {
      id: "q3",
      question: "A friend shares a shocking video of a celebrity. Using this course, what should you consider first?",
      choices: [
            "It could be a deepfake or hallucinated claim — verify with trusted sources before believing or sharing",
            "“Share it instantly to warn everyone” describes a different situation than the one in the question stem",
            "“It must be real because it's a video” describes a different situation than the one in the question stem",
            "Picking “Videos can never be faked” is a common mix-up that confuses a nearby idea with the right one",
          ],
      correctIndex: 0,
      explanation:
        "Generative AI can fake realistic video and text. Seeing isn't believing — verify before trusting or spreading it.",
    },
    {
      id: "q4",
      question: "Which is the best example of using AI with academic integrity?",
      choices: [
            "“Submitting an AI-written essay as your own” describes a different situation than the one in the question stem",
            "“Using AI on a test where it's banned” describes a different situation than the one in the question stem",
            "Having AI explain feedback on a draft you wrote, then improving it yourself, and disclosing the AI use",
            "“Copying AI answers without understanding them” describes a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Using AI to learn and improve your own work, and being honest about that use, is the integrity standard this course has built toward.",
    },
    {
      id: "q5",
      question: "What's the most future-proof role for a human in an AI world?",
      choices: [
            "Being the skilled, skeptical human who directs and checks the AI",
            "Letting AI make every decision” belongs to a different situation than the one in the question stem",
            "Avoiding AI entirely” belongs to a different situation than the one in the question stem",
            "Trying to compute faster than computers” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "Thriving with AI means staying the thoughtful, AI-fluent human in charge — the heart of this whole course.",
    },
    {
      id: "q6",
      question: "In the capstone adoption checklist, what should happen BEFORE deciding to adopt, limit, or reject an AI tool?",
      choices: [
            "Define the real job, test on genuine examples, and check accuracy, bias, and privacy risks",
            "Nothing — decide immediately based on marketing claims” belongs to a different situation than the one in the question stem",
            "Only ask the AI tool itself whether it's trustworthy” belongs to a different situation than the one in the question stem",
            "Skip straight to a school-wide rollout” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "The adoption decision should come only after defining the job, testing on real examples, and checking risks — evidence before verdict.",
    },
    {
      id: "q7",
      question: "In the group-project mini-case, what made Kayla's group's use of AI a positive example?",
      choices: [
            "A common mix-up is to treat they avoided AI entirely as enough, which confuses a nearby idea with the right one when checked against the lesson definition",
            "They prompted deliberately, verified facts, considered ethical questions around imitating an artist's style, and disclosed their AI use honestly",
            "A common mix-up is to treat they used AI but didn't tell their teacher as enough, which confuses a nearby idea with the right one",
            "A common mix-up is to treat they submitted the AI's raw output unchanged as enough, which confuses a nearby idea with the right one",
          ],
      correctIndex: 1,
      explanation:
        "The group combined careful prompting, verification, ethical caution, and honest disclosure — the full AI-Smart Citizen toolkit working together.",
    },
    {
      id: "q8",
      question: "Why does this course argue that the AI-Smart Citizen habits will keep working even on AI tools that don't exist yet?",
      choices: [
            "Some learners answer “Because this course predicted exactly which tools will be invented”, yet that does not match the precise idea from the lesson",
            "Because the habits (understand, direct, verify, protect, act ethically) are general questions you can ask of any computing tool, known or unknown",
            "It can seem like because new AI tools will never need to be evaluated, but that reading skips the distinction this question is testing",
            "It can seem like because all future AI tools will be identical to today's tools, but that reading skips the distinction this question is testing",
          ],
      correctIndex: 1,
      explanation:
        "The five habits are general-purpose questions — what's it a specialist at, what data, what risks, how do I verify, who's affected — that transfer to any future AI tool, not just today's.",
    },
  ],
  reflection: {
    prompt:
      "CAPSTONE: Pick one AI tool you use. (1) Quick analysis: specialty, data, risks, your rules. (2) Adoption checklist: define the job, test on real school examples, check accuracy/bias/privacy, set human review rules, and decide adopt/limit/reject.",
    placeholder: "The tool I chose is ___. Quick analysis: it specializes in ___, uses data like ___, risk is ___, my rules are ___. Adoption: I'd define the job as ___, test with ___, check ___, set review rules ___, and decide to adopt/limit/reject because…",
  },
};
