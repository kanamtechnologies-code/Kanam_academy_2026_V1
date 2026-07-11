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
    durationLabel: "~11–12 min lesson",
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
        id: "channel",
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
      },
      {
        id: "netiquette",
        kicker: "The unwritten rules",
        title: "Netiquette: how to behave in online spaces",
        body: `**Netiquette** is just "internet etiquette" — the basic norms of polite online behavior. Nobody hands you a rulebook, but people definitely notice when you break them.\n\nThe core ideas are simple:\n\n• **Be respectful** — treat people the way you'd want to be treated.\n• **Don't shout** — typing in ALL CAPS reads as yelling (more on that next).\n• **Stay on topic** — don't derail a group chat or thread.\n• **Don't spam** — avoid blasting the same message over and over.\n• **Respect people's time** — get to the point and reply when you say you will.\n\nA single test covers most of it: **"Would I say this to their face?"** If the answer is no, don't type it. The screen can make us braver and ruder than we'd ever be in person — netiquette is about closing that gap.`,
        callout: {
          label: "Common misconception",
          text: "Texting your teacher or boss the same way you text your best friend feels friendly, but it often reads as careless or disrespectful. Match your style to who you're talking to.",
        },
      },
      {
        id: "tone",
        kicker: "Concept",
        title: "Text strips out your tone — so people fill it in",
        body: `Here's the single most important idea in this lesson. When you speak, people hear your **tone** — your voice, speed, and warmth — and they see your face. When you type, all of that disappears. The reader has to guess your tone, and they often guess wrong.\n\nThink of a typed message like a **note with the tone of voice erased**. You wrote "fine." You meant "okay, sounds good!" But the reader fills in the blank tone with *their* mood — maybe they read "fine." as cold and annoyed.\n\nThis is why small choices change everything:\n\n• **ALL CAPS** does not read as emphasis — it reads as SHOUTING.\n• **Sarcasm and jokes** fall flat without your voice; "nice job 🙄" can really sting, and even "great" alone can sound fake.\n• **Emojis and punctuation** shift meaning. "Sure." feels cold. "Sure!" feels warm. "Sure..." feels doubtful.`,
        image: "/images/lessons/dl-5-2.png",
        imageAlt: "Two identical phone chat bubbles reading 'fine' — one with a smiling reaction, one with a flat annoyed reaction — showing how readers guess tone",
        callout: {
          label: "Common misconception",
          text: "People think typing in ALL CAPS just adds emphasis. To almost everyone, it reads as anger or yelling. Use **bold**, or just clear words, to stress a point instead.",
        },
      },
      {
        id: "warmth",
        kicker: "Everyday example",
        title: "Small touches that make you sound kind",
        body: `Since text hides your tone, you have to *add* the warmth back in on purpose. The good news: tiny touches do a lot of the work.\n\nImagine a groupmate just shared their part of a project. Look at how different these replies feel:\n\n• "k" — reads as cold, maybe even annoyed.\n• "ok" — a little better, but still flat.\n• "Sounds good, thanks! I'll add my part tonight." — warm, clear, and it tells them what happens next.\n\nSame basic message, very different feeling. A few easy habits keep you on the warm side:\n\n• **Use the person's name** sometimes — "Thanks, Maya!" feels personal.\n• **Say thanks** when someone helps; it costs nothing.\n• **Add one friendly word** — "Sure!" instead of a flat "Sure."`,
        bullets: [
          "One-word replies often read as cold — add a few warm words.",
          "Use names and a quick 'thanks' to sound friendly.",
          "A single '!' or emoji can flip 'fine' from icy to kind.",
        ],
        callout: {
          label: "Watch out",
          text: "You don't need to pile on emojis to seem nice. One friendly word or a clear next step usually does more than a row of 😄😄😄.",
        },
      },
      {
        id: "clear",
        kicker: "Concept",
        title: "Write messages people can actually act on",
        body: `Busy people skim. A clear message respects that and gets you a faster, better reply. Three habits do most of the work:\n\n**1. Write a good subject line (for email).** The subject should say what the email is about so the reader knows before opening it. "Question" is weak. "Question about Friday's history project deadline" is strong.\n\n**2. Get to the point.** Say why you're writing in the first sentence or two. Don't bury the important part under three paragraphs of warm-up.\n\n**3. Make your "ask" obvious.** What do you actually want the person to do? Spell it out. "Could you let me know by Thursday if I can turn this in late?" is a clear ask. "idk what to do lol" is not.\n\nAlso: **proofread before sending.** A quick reread catches typos, missing words, and lines that sound harsher than you meant. Thirty seconds of checking saves a lot of cleanup.`,
        bullets: [
          "Clear **subject line** — what the message is about.",
          "Get to the point in the first sentence or two.",
          "Make your **ask** obvious and specific.",
          "Proofread before you hit send.",
        ],
        callout: {
          label: "Watch out",
          text: "**Reply-all** sends your message to *everyone* on the thread, not just the sender. Use it only when the whole group truly needs your reply — otherwise you flood dozens of inboxes.",
        },
      },
      {
        id: "email-anatomy",
        kicker: "Concept",
        title: "The anatomy of a professional email",
        body: `A professional email has a simple, reliable shape. Once you know it, you can write one in two minutes.\n\n• **Greeting** — "Hi Ms. Lopez," or "Dear Coach Adams," (not "hey").\n• **Purpose** — one sentence on why you're writing.\n• **The ask** — exactly what you need, and by when.\n• **Polite sign-off** — "Thank you," or "Best," then your name.\n\nTwo more tools to use carefully:\n\n• **CC** ("carbon copy") adds people who should *see* the email but aren't the main recipient — like copying a parent on a message to a teacher. Everyone can see who's CC'd.\n• **BCC** ("blind carbon copy") copies someone *secretly* — other recipients can't see them. It's also the polite way to email a big group without exposing everyone's address to strangers.`,
        callout: {
          label: "Pro tip",
          text: "Be aware of cultural and generational differences. What reads as friendly and casual to you may read as too informal to someone older or from a different background. When unsure, lean slightly more formal.",
        },
      },
      {
        id: "audience-switch",
        kicker: "Decision framework",
        title: "Same idea, different audience: friend → adult → workplace",
        body: `Great communicators don't have one style — they **switch**. Use this quick decision tree:\n\n**1. Who is reading?** Friend / classmate → teacher / coach → college office / employer.\n**2. How lasting is this?** Disappears in chat vs. sits in an inbox forever.\n**3. What do you need?** A quick yes, a record, or a careful first impression.\n\n**Same request, three versions** (asking for a deadline extension):\n\n• **Friend/group chat:** "Hey — I'm slammed tonight. Can I send my slides by tomorrow AM?"\n• **Teacher email:** Clear subject, greeting, reason, specific ask + date, thank-you, full name + class period.\n• **College / internship / first job:** Even cleaner — no slang, no emojis, proofread twice, include any ID/student number they need, and attach files with professional names.\n\n**Habit:** Before you hit send to anyone who isn't a close friend, ask: *Would I be okay if this were forwarded?* Because sometimes it will be.`,
        bullets: [
          "Match formality to the audience — not to your mood.",
          "Important + lasting → email with subject, greeting, ask, sign-off.",
          "Applications and workplaces: no slang, clear attachments, proofread.",
          "Assume important emails can be forwarded — write accordingly.",
        ],
        callout: {
          label: "Try this week",
          text: "Rewrite one real message you'd send to a teacher, coach, or manager using the professional email shape. Keep a draft template on your phone so the next ask takes two minutes, not twenty.",
        },
      },
      {
        id: "worked",
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
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `You've got the toolkit: pick the right **channel**, follow basic **netiquette**, remember that text **strips out tone**, and write clear messages with a strong subject line and an obvious ask. For anything formal, use the professional email shape — greeting, purpose, ask, sign-off — and switch your style for teachers, colleges, and workplaces.\n\nMaster this and you'll spend less time untangling misunderstandings and more time getting things done. It's one of the most underrated skills in school *and* in any job.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then jot a quick reflection about a message you could rewrite to be clearer.`,
      },
    ],
  },
  bigIdeas: [
    "Match the **channel** to the message: chat for quick, email for important, a call for sensitive.",
    "Text **erases tone**, so readers fill it in — ALL CAPS, sarcasm, and emojis can flip your meaning.",
    "Clear messages have a strong **subject line**, get to the point, and make the **ask** obvious.",
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
        "A late-night text in all lowercase",
        "A clear, polite email with a subject line",
        "A comment on their social media post",
        "Shouting it across the classroom",
      ],
      correctIndex: 1,
      explanation:
        "Anything important or formal — especially something you want a record of — belongs in a clear email, not a casual text.",
    },
    {
      id: "q2",
      question: "In your group-project chat, a teammate types \"FINE WHATEVER.\" Why might that upset people?",
      choices: [
        "ALL CAPS reads as shouting, so it sounds angry",
        "It's a spelling mistake",
        "Caps lock breaks the chat app",
        "It uses too many emojis",
      ],
      correctIndex: 0,
      explanation:
        "Typed words carry no tone, and ALL CAPS reads as yelling. The reader fills in an angry tone even if none was meant.",
    },
    {
      id: "q3",
      question: "You're emailing a college admissions office about a missing transcript. Which subject line is strongest?",
      choices: [
        "Hi",
        "Question",
        "Missing transcript for Jordan Lee — application ID 48291",
        "(left blank)",
      ],
      correctIndex: 2,
      explanation:
        "A good subject line tells the reader exactly what the email is about before they open it, so it gets read and answered faster — especially in busy offices.",
    },
    {
      id: "q4",
      question: "You're copying a parent on an email to a teacher. What's the difference between CC and BCC?",
      choices: [
        "CC is faster than BCC",
        "BCC sends the email twice",
        "CC'd people are visible to all; BCC'd people are hidden from other recipients",
        "There is no real difference",
      ],
      correctIndex: 2,
      explanation:
        "CC ('carbon copy') is visible to everyone, while BCC ('blind carbon copy') copies someone privately so others can't see them.",
    },
    {
      id: "q5",
      question: "Before you send a heated reply to a classmate (or a manager at a first job), what's the simplest appropriateness test?",
      choices: [
        "Would it get a lot of likes?",
        "Would I say this to their face?",
        "Is it under 20 words?",
        "Does it have an emoji?",
      ],
      correctIndex: 1,
      explanation:
        "'Would I say this to their face?' catches most netiquette problems. If you wouldn't say it in person, don't type it.",
    },
  ],
  reflection: {
    prompt:
      "Think of a message you sent recently that could have been misread. How would you rewrite it so the tone and the ask are clearer?",
    placeholder: "Example: I texted 'k' to my groupmate — I'll rewrite it as 'Sounds good, thanks! I'll start the slides tonight.'",
  },
};
