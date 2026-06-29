import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson14: AILessonConfig = {
  id: "ai-14",
  title: "14. Privacy, Deepfakes, and Your Footprint",
  goal: "Protect your privacy when using AI, recognize deepfakes and AI-driven scams, and think before you share.",
  xpReward: 700,
  badge: "🛡️ Privacy Defender",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/13",
  nextHref: "/learn/ai/15",
  lessonModule: {
    durationLabel: "~9 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `You share more with technology than you realize — and AI makes both *sharing* and *faking* more powerful than ever. This lesson protects you on two fronts: what you put *into* AI, and which AI-made content you choose to *believe*.\n\nRoadmap:\n\n• Why what you type into a chatbot doesn't always stay private.\n• **Deepfakes** — realistic fake images, voices, and video — and why "seeing isn't believing" anymore.\n• How to spot AI-powered scams and protect your digital footprint.\n\nThis is everyday safety: it affects your accounts, your reputation, and even your family.`,
        image: "/images/lessons/ai-14-privacy.png",
        imageAlt: "A shield protecting personal data from an AI chat box",
        callout: {
          label: "Why it matters",
          text: "A single screenshot, voice clip, or private detail can be copied, stored, or faked. A few smart habits keep your information — and your family — much safer.",
        },
      },
      {
        id: "privacy",
        kicker: "The big idea",
        title: "What you type into AI doesn't always stay private",
        body: `AI tools run on data, and what you type can be **stored, reviewed by humans, or even used to train future models**. Pasting a private diary entry, a friend's phone number, or a photo of your ID into a chatbot can expose information you can't take back.\n\nThink of a public chat box like a postcard, not a sealed letter. It might travel just fine — but you shouldn't write anything on it you'd hate a stranger to read.\n\nReal example: people have pasted private work documents or personal secrets into chatbots, only to learn that the conversation might be reviewed to improve the service. Once it's out, you can't un-share it.`,
        callout: {
          label: "Before you paste",
          text: "Ask: would I be okay if this text or image showed up somewhere else? If not, don't put it into an AI tool.",
        },
      },
      {
        id: "deepfakes",
        kicker: "Seeing isn't believing",
        title: "Deepfakes: fake media that looks real",
        body: `Generative AI can create **deepfakes** — realistic but fake images, voices, and videos of real people. A deepfake can make someone appear to say or do things they never did.\n\nFor most of history, a photo or video was strong proof that something really happened. That rule is breaking. Today a convincing fake can be made of a celebrity, a politician, a classmate — or you.\n\nThis powers misinformation, bullying, and scams. The old instinct "I saw it, so it's true" no longer holds — convincing fakes are now easy to make.`,
        bullets: [
          "**Deepfake** = AI-generated fake image/audio/video of a real person.",
          "Used for misinformation, harassment, and scams.",
          "Visual or audio 'proof' can now be faked — stay skeptical.",
        ],
        callout: {
          label: "Myth check",
          text: "\"A video can't be faked, so it must be real.\" Not anymore. Treat shocking images and videos as claims to verify, not automatic proof.",
        },
      },
      {
        id: "scams",
        kicker: "Protect yourself",
        title: "Spot AI-powered tricks",
        body: `Scammers use AI to sound more convincing than ever — cloning a voice to fake an emergency call, writing flawless phishing messages with no typos to give them away, or impersonating someone you trust online.\n\nDefend yourself:\n\n• **Verify through another channel** — if "a friend" makes an urgent request, contact them directly on a number you already know.\n• **Be skeptical of urgency** — pressure to act *right now* is a classic scam sign.\n• **Check the source** of shocking images or videos before believing or sharing.\n• **Guard your footprint** — the less you post publicly, the less can be used to copy or target you.`,
        callout: {
          label: "Voice-clone scam",
          text: "A cloned voice 'crying for help' is a known scam. Agree on a family code word, and always call the person back to confirm.",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "Catch a deepfake voice scam",
        body: `Late at night, your family gets a call. The voice sounds *exactly* like your older cousin: "I'm in trouble, I need money wired right now — please don't tell anyone." Walk through the safe response.\n\n**Step 1 — Notice the scam signals.** Extreme urgency + secrecy + a money request = textbook scam pattern, no matter how real the voice sounds.\n\n**Step 2 — Remember voices can be cloned.** A few seconds of someone's audio from social media is enough for AI to fake their voice. The voice is *not* proof.\n\n**Step 3 — Verify through another channel.** Hang up and call your cousin directly on their real number, or ask the family **code word** you agreed on in advance.\n\n**Step 4 — Don't act under pressure.** Real emergencies survive a 2-minute verification. Scams fall apart the moment you check.`,
        code: `Incoming: "It's me! Send money NOW. Don't tell anyone."
   ↳ urgency? ⚠️   secrecy? ⚠️   money? ⚠️   voice = proof? ❌ (cloneable)
Action: hang up → call the real number / ask the code word → verify first`,
        codeCaption: "Spotting an AI voice-clone scam",
        callout: {
          label: "Pro tip",
          text: "Set up a family 'safe word' today. If someone calls claiming to be a relative in trouble, the real person will know it — a cloned voice won't.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Two habits keep you safe: **share less** with AI tools, and **believe less** of sensational media without checking. Your digital footprint and your skepticism are both forms of self-defense.\n\nNext we'll look at AI and the future of work. First, lock in today's ideas.\n\nWhen you're ready, switch to the **Knowledge check**.`,
      },
    ],
  },
  bigIdeas: [
    "What you put into AI tools may be **stored or used** — don't share secrets or others' data.",
    "**Deepfakes** make fake images/voices/videos look real — seeing isn't believing.",
    "Beat AI scams by **verifying through another channel** and resisting urgency.",
  ],
  keyTerms: [
    { term: "Privacy", definition: "Your right to control who sees your personal information." },
    { term: "Deepfake", definition: "AI-generated fake media (image, audio, video) of a real person." },
    { term: "Digital footprint", definition: "The trail of data you leave online that others (and AI) can use." },
    { term: "Phishing", definition: "Tricking someone into sharing info or money via fake messages — now AI-enhanced." },
  ],
  realWorld:
    "Scammers have cloned a relative's voice from a few seconds of social media audio to fake an emergency and demand money. Families now use secret 'safe words' to verify who's really calling.",
  quiz: [
    {
      id: "q1",
      question: "Why should you avoid pasting private info into a chatbot?",
      choices: [
        "It makes the AI slower",
        "What you share may be stored, reviewed, or used to train future models — and you can't take it back",
        "Chatbots can't read text",
        "It uses too much data on your plan",
      ],
      correctIndex: 1,
      explanation:
        "AI tools may retain or reuse what you type. Treat them like a semi-public space, not a vault.",
    },
    {
      id: "q2",
      question: "What is a deepfake?",
      choices: [
        "A very deep philosophical question",
        "AI-generated fake media that makes a real person appear to say or do things they didn't",
        "A type of strong password",
        "A deep-sea camera",
      ],
      correctIndex: 1,
      explanation:
        "Deepfakes are realistic fake images, audio, or video created by AI — a major source of misinformation and scams.",
    },
    {
      id: "q3",
      question: "You get an urgent call that sounds like a family member begging for money fast. What's the safest response?",
      choices: [
        "Send the money immediately — the voice is proof",
        "Hang up and call that family member back directly to verify",
        "Reply to the call with your bank password",
        "Post about it online to ask strangers",
      ],
      correctIndex: 1,
      explanation:
        "Voices can be cloned. Verify through another channel and be suspicious of urgency — classic scam signs.",
    },
    {
      id: "q4",
      question: "Which habit best reduces your risk in an AI world?",
      choices: [
        "Share as much as possible so AI knows you well",
        "Believe every shocking video you see",
        "Share less personal data and verify sensational media before believing or sharing",
        "Turn off your phone forever",
      ],
      correctIndex: 2,
      explanation:
        "Sharing less and staying skeptical of unverified media are practical, everyday defenses.",
    },
  ],
  reflection: {
    prompt:
      "Write your personal privacy rule for AI tools (what you'll never paste in) and one way you'll check before believing a shocking video.",
    placeholder: "I'll never put ___ into a chatbot. Before sharing a viral video I'll…",
  },
};
