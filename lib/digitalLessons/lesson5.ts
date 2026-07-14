import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson5: AILessonConfig = {
  id: "dl-5",
  title: "5. Communicate Clearly & Kindly Online",
  goal: "Communicate effectively and respectfully across email, chat, and posts — understanding tone, audience, netiquette, and the difference between casual and professional messages.",
  xpReward: 250,
  badge: "Clear Communicator",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/4",
  nextHref: "/learn/digital/6",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `You send messages all day — texts to friends, posts in a group chat, maybe an email to a teacher or a coach. It feels easy. But have you ever had a message blow up because someone "took it the wrong way"? That happens because typed words carry no voice, no face, and no body language.\n\nHere's our roadmap:\n\n• **Pick the right channel** — when to chat, when to email, when to just call.\n• **Netiquette** — the unwritten rules of behaving well online.\n• **Why tone gets lost** — and how ALL CAPS, sarcasm, and emojis change your meaning.\n• **Write clear messages** — good subject lines, a clear "ask," and a real professional email.\n• **Audience switch** — friend chat vs. teacher, college, or first-job email.\n\nThese are the exact skills that make group projects smoother, get faster replies from busy adults, and help you land and keep your first job or internship.`,
        image: "/images/lessons/dl-5.png",
        imageAlt: "Smartphone chat thread beside a laptop open to a professional email draft in a browser",
        callout: {
          label: "Why it matters",
          text: "In almost every job, people judge you by how you write. A clear, kind message makes you look capable and easy to work with — before anyone has even met you.",
        },
      },
      {
        id: "hook-story",
        kicker: "Real moment",
        title: "\"FINE WHATEVER.\" — one text, three ruined days",
        body: `A group project chat is running late. One teammate, exhausted and stressed about a totally unrelated test, types: **"FINE WHATEVER I'LL JUST DO IT MYSELF."** They meant it as a tired, half-joking "ugh, okay, I got it" — but that's not how it landed.\n\nThe rest of the group read it as an accusation. Two people got defensive. One stopped responding to the chat entirely. What should've been a five-minute scheduling fix turned into three awkward days of silence and a tense conversation in the hallway.\n\nNo one in that chat was a bad person. They just didn't realize how much tone disappears the moment you type instead of speak — and how loud ALL CAPS actually sounds. This lesson is about closing that gap before it costs you a friendship, a grade, or a job.`,
        callout: {
          label: "Keep this in mind",
          text: "The sender almost never intends the harshest possible reading of their message — but the reader has no way to know that unless the words make it obvious.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "The words we'll use — in plain English",
        body: `Before we dive in, here are the few terms that pop up in this lesson. Don't memorize them — just get the gist, and they'll click as we go.\n\n• **Channel** — the *tool* you use to send a message: a text, a chat app, an email, or a video call. Each one fits a different situation.\n• **Netiquette** — short for "internet etiquette." It just means good manners online, like not yelling and not being rude.\n• **Tone** — the *feeling* behind your words. Out loud you hear it in someone's voice; in text it's invisible, so the reader has to guess it.\n• **Audience** — *who* you're talking to. You'd message your best friend differently than a teacher or a future boss.\n• **Subject line** — the one-line summary at the very top of an email that tells the reader what it's about before they open it.\n\nThat's the whole vocabulary list. Now let's see each one in action.`,
        callout: {
          label: "Tip",
          text: "If a word ever feels confusing later, flip back to this list. Knowing the words is half the battle.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "Choose the right channel for the message",
        body: `Not every message belongs in the same place. Picking the right **channel** (the tool you use to communicate) is half of communicating well.\n\n• **Quick chat / text** — best for short, casual, fast back-and-forth. "Running 5 min late." "Did practice get moved?"\n• **Email** — best for anything important, formal, or that needs a record: messaging a teacher, applying for something, or sending details people will need later.\n• **Call or video** — best when something is urgent, emotional, or complicated, where typing would cause confusion or hurt feelings.\n\nA good rule: the more important, sensitive, or detailed the message, the more you should move from chat toward email or a call. Firing off "can we talk about my grade???" at 11pm in a chat app lands very differently than a calm, clear email the next morning.`,
        bullets: [
          "**Chat/text** = quick and casual.",
          "**Email** = important, formal, or needs a paper trail.",
          "**Call/video** = urgent, emotional, or easily misunderstood.",
        ],
        callout: {
          label: "Watch out",
          text: "Big or emotional topics rarely go well over text. If you feel your heart racing while typing, that's a sign to slow down — or pick up the phone instead.",
        },
        checkIn: {
          prompt: "You need a two-day extension from your teacher and want it in writing for your records. Which channel fits best?",
          choices: [
            "A comment on their social media post",
            "Shouting it across the classroom",
            "A clear, polite email with a subject line",
            "A late-night text in all lowercase",
          ],
          correctIndex: 2,
          explanation:
            "Anything important or formal — especially something you want a record of — belongs in a clear email, not a casual text.",
        },
      },
      {
        id: "concept-2",
        kicker: "The unwritten rules",
        title: "Netiquette: how to behave in online spaces",
        body: `**Netiquette** is just "internet etiquette" — the basic norms of polite online behavior. Nobody hands you a rulebook, but people definitely notice when you break them.\n\nThe core ideas are simple:\n\n• **Be respectful** — treat people the way you'd want to be treated.\n• **Don't shout** — typing in ALL CAPS reads as yelling (more on that next).\n• **Stay on topic** — don't derail a group chat or thread.\n• **Don't spam** — avoid blasting the same message over and over.\n• **Respect people's time** — get to the point and reply when you say you will.\n\nA single test covers most of it: **"Would I say this to their face?"** If the answer is no, don't type it. The screen can make us braver and ruder than we'd ever be in person — netiquette is about closing that gap.`,
        callout: {
          label: "Common misconception",
          text: "Texting your teacher or boss the same way you text your best friend feels friendly, but it often reads as careless or disrespectful. Match your style to who you're talking to.",
        },
        checkIn: {
          prompt: "Before you send a heated reply to a classmate (or a manager at a first job), what's the simplest appropriateness test?",
          choices: [
            "Does it have an emoji?",
            "Would I say this to their face?",
            "Is it under 20 words?",
            "Would it get a lot of likes?",
          ],
          correctIndex: 1,
          explanation:
            "'Would I say this to their face?' catches most netiquette problems. If you wouldn't say it in person, don't type it.",
        },
      },
      {
        id: "concept-3",
        kicker: "Concept",
        title: "Text strips out your tone — so people fill it in",
        body: `Here's the single most important idea in this lesson. When you speak, people hear your **tone** — your voice, speed, and warmth — and they see your face. When you type, all of that disappears. The reader has to guess your tone, and they often guess wrong.\n\nThink of a typed message like a **note with the tone of voice erased**. You wrote "fine." You meant "okay, sounds good!" But the reader fills in the blank tone with *their* mood — maybe they read "fine." as cold and annoyed.\n\nThis is why small choices change everything:\n\n• **ALL CAPS** does not read as emphasis — it reads as SHOUTING.\n• **Sarcasm and jokes** fall flat without your voice; "nice job 🙄" can really sting, and even "great" alone can sound fake.\n• **Emojis and punctuation** shift meaning. "Sure." feels cold. "Sure!" feels warm. "Sure..." feels doubtful.`,
        image: "/images/lessons/dl-5-2.png",
        imageAlt: "Two identical phone chat bubbles reading 'fine' — one with a smiling reaction, one with a flat annoyed reaction — showing how readers guess tone",
        callout: {
          label: "Common misconception",
          text: "People think typing in ALL CAPS just adds emphasis. To almost everyone, it reads as anger or yelling. Use **bold**, or just clear words, to stress a point instead.",
        },
        checkIn: {
          prompt: "In your group-project chat, a teammate types \"FINE WHATEVER.\" Why might that upset people?",
          choices: [
            "It uses too many emojis",
            "It's a spelling mistake",
            "Caps lock breaks the chat app",
            "ALL CAPS reads as shouting, so it sounds angry",
          ],
          correctIndex: 3,
          explanation:
            "Typed words carry no tone, and ALL CAPS reads as yelling. The reader fills in an angry tone even if none was meant.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Turning a sloppy message into a clear email",
        body: `Imagine you need to ask your teacher, Ms. Lopez, for a two-day extension on a project because you were sick. Here's the first draft a lot of people would send:\n\n*Subject: (none)*\n*"yo i cant finish the project im sick can i get more time???"*\n\nThat's vague, too casual, has no clear deadline, and reads as a bit demanding. Let's fix it step by step.\n\n**Step 1 — Add a clear subject.** "Extension request for the history project (out sick)."\n\n**Step 2 — Start with a proper greeting.** "Hi Ms. Lopez,"\n\n**Step 3 — State the purpose, then the ask.** "I've been home sick since Monday and won't be able to finish the history project by Friday. Could I please have until Tuesday to turn it in?"\n\n**Step 4 — Add a polite sign-off and proofread.** "Thank you for understanding. — Jordan Lee, Period 3."\n\nSame request, completely different result. The second version is easy to read, easy to say yes to, and makes you look responsible.`,
        image: "/images/lessons/dl-5-3.png",
        imageAlt: "Split screen: messy one-line text on a phone transforming into a structured email with subject line on a laptop",
        callout: {
          label: "Pro tip",
          text: "Read your message out loud before sending. If it would sound rude or confusing spoken aloud, it'll read that way too — and now you have a chance to fix it.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "One-word replies aren't 'neutral' — they read as cold",
        body: `A lot of people think a short reply like "k" or "fine" is just efficient — no wasted words, nothing wrong with it. In reality, the *absence* of warmth gets read as coldness or annoyance almost every time, because the reader's brain fills the silence with a negative guess by default.\n\nCompare these replies to a teammate sharing their part of a project:\n\n• "k" — reads as cold, maybe even annoyed.\n• "ok" — a little better, but still flat.\n• "Sounds good, thanks! I'll add my part tonight." — warm, clear, and it tells them what happens next.\n\nSame basic message, very different feeling. The myth is thinking brevity is neutral — in text, brevity usually reads as *negative* unless you add a small warm signal.`,
        callout: {
          label: "Myth check",
          text: "\"K\" and \"fine.\" are not neutral in text the way they can be when spoken with a relaxed tone. Without your voice to soften them, they default to reading as cold or upset.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it yourself",
        title: "Rewrite a cold reply into a warm one",
        body: `Practice adding warmth back into text. A groupmate just sent their finished slide over the group chat. Here's a cold-sounding reply: **"got it."**\n\nNow compare a few small upgrades:\n\n• "got it, thanks! looks great — I'll add mine tonight." — adds gratitude, a compliment, and a clear next step.\n• "Thanks, Maya! I'll finish my part by tomorrow morning." — uses their name and a specific time.\n\nNotice what changed: not length, not formality — just a couple of small, deliberate warm touches. That's the whole skill. You don't need to write paragraphs; you need one friendly word and, ideally, a clear next step.`,
        checkIn: {
          prompt: "Which reply to a teammate sharing their finished slide sounds the warmest while staying just as quick to type?",
          choices: [
            "Thanks, Maya! I'll finish my part tonight.",
            "(no reply at all)",
            "fine.",
            "k",
          ],
          correctIndex: 0,
          explanation:
            "Using the person's name, a quick thanks, and a clear next step takes barely longer to type than 'k' but reads as warm instead of cold.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Deeper skill",
        title: "The anatomy of a professional email",
        body: `A professional email has a simple, reliable shape. Once you know it, you can write one in two minutes.\n\n• **Greeting** — "Hi Ms. Lopez," or "Dear Coach Adams," (not "hey").\n• **Purpose** — one sentence on why you're writing.\n• **The ask** — exactly what you need, and by when.\n• **Polite sign-off** — "Thank you," or "Best," then your name.\n\nTwo more tools to use carefully:\n\n• **CC** ("carbon copy") adds people who should *see* the email but aren't the main recipient — like copying a parent on a message to a teacher. Everyone can see who's CC'd.\n• **BCC** ("blind carbon copy") copies someone *secretly* — other recipients can't see them. It's also the polite way to email a big group without exposing everyone's address to strangers.\n\nBe aware of cultural and generational differences too: what reads as friendly and casual to you may read as too informal to someone older or from a different background. When unsure, lean slightly more formal.`,
        image: "/images/lessons/dl-5-4.png",
        imageAlt: "Annotated email on a laptop screen with labels pointing to the greeting, purpose sentence, clear ask, and polite sign-off",
        callout: {
          label: "Pro tip",
          text: "Save this shape as a mental template: greeting → purpose → ask → sign-off. You can fill it in for almost any formal email in under two minutes.",
        },
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Casual message vs. professional email",
        body: `The exact same request, in two very different wrappers.`,
        table: {
          columns: ["", "Casual (friend chat)", "Professional (email)"],
          values: [
            ["Greeting", "None needed", "\"Hi Ms. Lopez,\""],
            ["Tone", "Relaxed, abbreviations okay", "Clear, polite, no slang"],
            ["The ask", "Can be implied", "Stated explicitly, with a date"],
            ["Sign-off", "None needed", "\"Thank you,\" + full name"],
            ["CC/BCC", "Not applicable", "Used deliberately when needed"],
          ],
          rowCount: 5,
        },
        callout: {
          label: "Why it matters",
          text: "Neither style is \"better\" — they're tools for different situations. The skill is choosing the right one and executing it well.",
        },
      },
      {
        id: "real-world-trap",
        kicker: "Real-world trap",
        title: "The reply-all trap",
        body: `**Reply-all** sends your message to *everyone* on the thread, not just the sender. It's an easy trap: you mean to privately tell one teacher "thanks, got it," and instead 40 people on a school-wide email thread get your message — or worse, something meant to be private.\n\nThis happens constantly in real workplaces too, sometimes with embarrassing results (an internal complaint accidentally sent to an entire company). The fix is simple but easy to forget in a rush: **before hitting send, glance at the "To" and "CC" fields** and ask whether everyone listed truly needs this specific reply.\n\nUse reply-all only when the whole group genuinely needs your response — otherwise, reply to just the sender, or start a fresh, more private message.`,
        callout: {
          label: "Watch out",
          text: "Reply-all mistakes are one of the most common, avoidable email blunders — and they're remembered for a long time by whoever gets flooded. A two-second glance at the recipient list prevents almost all of them.",
        },
      },
      {
        id: "habits",
        kicker: "Concept",
        title: "Write messages people can actually act on",
        body: `Busy people skim. A clear message respects that and gets you a faster, better reply. Three habits do most of the work:\n\n**1. Write a good subject line (for email).** The subject should say what the email is about so the reader knows before opening it. "Question" is weak. "Question about Friday's history project deadline" is strong.\n\n**2. Get to the point.** Say why you're writing in the first sentence or two. Don't bury the important part under three paragraphs of warm-up.\n\n**3. Make your "ask" obvious.** What do you actually want the person to do? Spell it out. "Could you let me know by Thursday if I can turn this in late?" is a clear ask. "idk what to do lol" is not.\n\nAlso: **proofread before sending.** A quick reread catches typos, missing words, and lines that sound harsher than you meant.`,
        bullets: [
          "Clear **subject line** — what the message is about.",
          "Get to the point in the first sentence or two.",
          "Make your **ask** obvious and specific.",
          "Proofread before you hit send.",
        ],
        callout: {
          label: "Watch out",
          text: "**Reply-all** sends your message to *everyone* on the thread, not just the sender. Use it only when the whole group truly needs your reply.",
        },
        checkIn: {
          prompt: "You're emailing a college admissions office about a missing transcript. Which subject line is strongest?",
          choices: [
            "Hi",
            "(left blank)",
            "Missing transcript for Jordan Lee — application ID 48291",
            "Question",
          ],
          correctIndex: 2,
          explanation:
            "A good subject line tells the reader exactly what the email is about before they open it, so it gets read and answered faster — especially in busy offices.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on — a quick gut-check",
        body: `Think of a message you sent this week that could have landed better.\n\n• Was it the right channel — or should it have been a call instead of a text?\n• Did it include any warmth, or could it have read as flat or cold?\n\nThere's a full reflection question waiting at the end of this lesson. For now, just notice: the "FINE WHATEVER" moment from earlier could happen to anyone — the fix isn't perfection, it's a quick, honest read-back before you hit send.`,
        callout: {
          label: "Reflect",
          text: "If you're ever unsure how a message will land, read it back and ask: \"If a stranger sent me exactly this, how would I take it?\"",
        },
      },
      {
        id: "mini-case",
        kicker: "Mini case study",
        title: "Same request, three audiences",
        body: `Great communicators don't have one style — they **switch**. Here's the exact same request — asking for a deadline extension — written three different, correct ways:\n\n**Friend / group chat:** "Hey — I'm slammed tonight. Can I send my slides by tomorrow AM?" Casual, quick, no greeting needed.\n\n**Teacher email:** Clear subject line ("Extension request for tomorrow's slides"), a greeting, the reason, a specific ask with a date, a thank-you, and a full name + class period.\n\n**College / internship / first job:** Even cleaner — no slang, no emojis, proofread twice, includes any ID or reference number they need, and attaches files with professional names (from Lesson 2's naming skills).\n\n**The decision tree behind all three:** Who is reading? How lasting is this message (disappears in chat vs. sits in an inbox forever)? What do you actually need — a quick yes, a record, or a strong first impression? One more habit ties it together: before you hit send to anyone who isn't a close friend, ask, *"Would I be okay if this were forwarded?"* — because sometimes it will be.`,
        callout: {
          label: "Try this week",
          text: "Rewrite one real message you'd send to a teacher, coach, or manager using the professional email shape. Keep a draft template on your phone so the next ask takes two minutes, not twenty.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "One more check before the full knowledge check",
        body: `Quick self-test before the graded questions — can you explain, in one sentence each?\n\n• Why picking the right channel matters?\n• Why ALL CAPS and one-word replies can backfire?\n• The four parts of a professional email?\n• Why you might switch your style for a friend vs. a teacher vs. a college office?\n\nIf all four feel solid, you're ready for the graded Knowledge Check.`,
        checkIn: {
          prompt: "You're copying a parent on an email to a teacher. What's the difference between CC and BCC?",
          choices: [
            "CC is faster than BCC",
            "BCC sends the email twice",
            "There is no real difference",
            "CC'd people are visible to all; BCC'd people are hidden from other recipients",
          ],
          correctIndex: 3,
          explanation:
            "CC ('carbon copy') is visible to everyone, while BCC ('blind carbon copy') copies someone privately so others can't see them.",
        },
      },
      {
        id: "before-after-messages",
        kicker: "Before & after",
        title: "Same message, two ways — which one gets answered?",
        body: `**Before (vague, easy to ignore):**\n\`hey can u help me with the thing for class thx\`\n\n**After (clear, respectful, easy to act on):**\n\`Hi Ms. Rivera — I'm stuck on question 4 of the lab (the graph part). Could I come by during office hours tomorrow, or would email work? Thanks, Jordan.\`\n\nWhat changed?\n\n• **Specific subject** — the reader knows exactly what "the thing" is.\n• **Clear ask** — office hours or email, not "help me somehow."\n• **Appropriate tone** — polite without being stiff or slangy.\n• **Sign-off with a name** — so the teacher knows who's asking.\n\nThis isn't about being formal for fun. Busy people (teachers, coaches, hiring managers) answer messages they can understand in five seconds. Vague messages get buried.`,
        callout: {
          label: "Try this week",
          text: "Rewrite one vague message you need to send — add the topic, the specific ask, and your name. Send the 'after' version and notice whether you get a faster reply.",
        },
        checkIn: {
          prompt: "A teacher hasn't replied to your first email about a recommendation letter. Which follow-up fits this lesson?",
          choices: [
            "??? hello??? did u see this",
            "A polite follow-up restating the deadline, what you need, and thanking them for their time",
            "Reply-all to the whole class asking if anyone else's teacher is ignoring them",
            "Send the same vague email five more times",
          ],
          correctIndex: 1,
          explanation:
            "A clear, polite follow-up with the deadline restated is professional and easy to act on — exactly the kind of message this lesson teaches.",
        },
      },
      {
        id: "send-checklist",
        kicker: "Checklist",
        title: "Five seconds before you hit Send",
        body: `Run this mini checklist on anything that matters — a teacher email, a group project update, or a message to a coach:\n\n1. **Right person?** — glance at To/CC; reply-all only if everyone truly needs it.\n2. **Right tone?** — would this sound okay if the recipient read it aloud?\n3. **Clear ask?** — can they answer in one action, or do they have to guess what you want?\n4. **Proofread once** — especially names, dates, and attachments.\n5. **Would I be okay if this were forwarded?** — screenshots and forwards happen.\n\nFive seconds. That's the difference between "got it, see you Thursday" and three days of confused back-and-forth.`,
        callout: {
          label: "Watch out",
          text: "Autocorrect, voice-to-text, and rushing are how 'I'd love to interview' becomes 'I'd love to interrogate.' One quick read catches most disasters.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've got the toolkit: pick the right **channel**, follow basic **netiquette**, remember that text **strips out tone**, and write clear messages with a strong subject line and an obvious ask. For anything formal, use the professional email shape — greeting, purpose, ask, sign-off — and switch your style for teachers, colleges, and workplaces.\n\nMaster this and you'll spend less time untangling misunderstandings and more time getting things done. It's one of the most underrated skills in school *and* in any job.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then jot a quick reflection about a message you could rewrite to be clearer.`,
      },
    ],
  },
  bigIdeas: [
    "Match the **channel** to the message: chat for quick, email for important, a call for sensitive.",
    "Text **erases tone**, so readers fill it in — ALL CAPS, sarcasm, and one-word replies can flip your meaning.",
    "Clear messages have a strong **subject line**, get to the point, and make the **ask** obvious.",
    "Great communicators **switch styles** for friends vs. teachers vs. colleges and workplaces.",
  ],
  keyTerms: [
    { term: "Netiquette", definition: "The basic norms of polite, respectful behavior online — 'internet etiquette.'" },
    { term: "Tone", definition: "The feeling behind a message. In text it's invisible, so readers guess it (often wrongly)." },
    { term: "Audience", definition: "Who you're writing to. Your style should change for a friend vs. a teacher or boss." },
    { term: "CC", definition: "'Carbon copy' — adds people who should see an email; everyone can see who's CC'd." },
    { term: "BCC", definition: "'Blind carbon copy' — copies someone privately so other recipients can't see them." },
    { term: "Reply-all", definition: "Sends your reply to everyone on the thread, not just the original sender." },
  ],
  realWorld:
    "Recruiters, admissions offices, and managers often decide whether you seem reliable from a single email. A clear subject line, a polite tone, and an obvious ask quietly mark you as someone worth hiring and easy to work with.",
  quiz: [
    {
      id: "q1",
      question: "You need a two-day extension from your teacher and want it in writing for your records. Which channel fits best?",
      choices: [
        "A clear, polite email with a subject line",
        "A late-night text in all lowercase",
        "A comment on their social media post",
        "Shouting it across the classroom",
      ],
      correctIndex: 0,
      explanation:
        "Anything important or formal — especially something you want a record of — belongs in a clear email, not a casual text.",
    },
    {
      id: "q2",
      question: "In your group-project chat, a teammate types \"FINE WHATEVER.\" Why might that upset people?",
      choices: [
        "It's a spelling mistake",
        "ALL CAPS reads as shouting, so it sounds angry",
        "Caps lock breaks the chat app",
        "It uses too many emojis",
      ],
      correctIndex: 1,
      explanation:
        "Typed words carry no tone, and ALL CAPS reads as yelling. The reader fills in an angry tone even if none was meant.",
    },
    {
      id: "q3",
      question: "You're emailing a college admissions office about a missing transcript. Which subject line is strongest?",
      choices: [
        "(left blank)",
        "Missing transcript for Jordan Lee — application ID 48291",
        "Question",
        "Hi",
      ],
      correctIndex: 1,
      explanation:
        "A good subject line tells the reader exactly what the email is about before they open it, so it gets read and answered faster — especially in busy offices.",
    },
    {
      id: "q4",
      question: "You're copying a parent on an email to a teacher. What's the difference between CC and BCC?",
      choices: [
        "CC'd people are visible to all; BCC'd people are hidden from other recipients",
        "CC is faster than BCC",
        "BCC sends the email twice",
        "There is no real difference",
      ],
      correctIndex: 0,
      explanation:
        "CC ('carbon copy') is visible to everyone, while BCC ('blind carbon copy') copies someone privately so others can't see them.",
    },
    {
      id: "q5",
      question: "Before you send a heated reply to a classmate (or a manager at a first job), what's the simplest appropriateness test?",
      choices: [
        "Is it under 20 words?",
        "Would it get a lot of likes?",
        "Would I say this to their face?",
        "Does it have an emoji?",
      ],
      correctIndex: 2,
      explanation:
        "'Would I say this to their face?' catches most netiquette problems. If you wouldn't say it in person, don't type it.",
    },
    {
      id: "q6",
      question: "A teammate replies \"k\" to your finished project section. According to this lesson, why might that feel colder than intended?",
      choices: [
        "\"k\" is technically a spelling error",
        "It means the message was never received",
        "\"k\" is against the platform's rules",
        "In text, short replies default to reading as cold or annoyed unless a warm signal is added",
      ],
      correctIndex: 3,
      explanation:
        "Because tone is invisible in text, brevity tends to read as negative by default. Adding a name, a thanks, or a next step flips it from cold to warm.",
    },
    {
      id: "q7",
      question: "You meant to privately thank one teacher, but accidentally hit reply-all on a 40-person email thread. What could have prevented this?",
      choices: [
        "Always using CC instead of BCC",
        "Writing the email in all lowercase",
        "Nothing — reply-all mistakes cannot be prevented",
        "Glancing at the To/CC fields before sending to confirm everyone listed actually needs the reply",
      ],
      correctIndex: 3,
      explanation:
        "A quick glance at who's listed before hitting send catches most reply-all mistakes — reply-all should be reserved for messages the whole group truly needs.",
    },
    {
      id: "q8",
      question: "Asking for a deadline extension, which version is BEST suited for a college admissions office (as opposed to a friend group chat)?",
      choices: [
        "A meme with the request written on it",
        "A casual one-liner with no greeting or sign-off",
        "A proofread, formal email with a clear subject line, greeting, specific ask with a date, and polite sign-off",
        "\"hey can i get more time lol\"",
      ],
      correctIndex: 2,
      explanation:
        "Formal, lasting audiences like a college office call for the full professional email shape — clear subject, greeting, specific ask, and sign-off — proofread and free of slang.",
    },
  ],
  reflection: {
    prompt:
      "Think of a message you sent recently that could have been misread. How would you rewrite it so the tone and the ask are clearer?",
    placeholder: "Example: I texted 'k' to my groupmate — I'll rewrite it as 'Sounds good, thanks! I'll start the slides tonight.'",
  },
};
