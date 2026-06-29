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
    durationLabel: "~8 min lesson",
    sections: [
      {
        id: "privacy",
        kicker: "The big idea",
        title: "What you type into AI doesn't always stay private",
        body: `AI tools are hungry for data, and what you share can be **stored, reviewed, or even used to train future models**. Pasting a private diary entry, a friend's phone number, or a photo of your ID into a chatbot can expose information you can't take back.\n\nTreat AI chat boxes like a semi-public space: helpful, but not the place for secrets or other people's personal details.`,
        image: "/images/lessons/ai-14-privacy.png",
        imageAlt: "A shield protecting personal data from an AI chat box",
        callout: {
          label: "Before you paste",
          text: "Ask: would I be okay if this text or image showed up somewhere else? If not, don't put it into an AI tool.",
        },
      },
      {
        id: "deepfakes",
        kicker: "Seeing isn't believing",
        title: "Deepfakes: fake media that looks real",
        body: `Generative AI can create **deepfakes** — realistic but fake images, voices, and videos of real people. A deepfake can make someone appear to say or do things they never did.\n\nThis powers misinformation, bullying, and scams. The old rule "I saw it, so it's true" no longer holds. Photos and videos can be fabricated convincingly.`,
        bullets: [
          "**Deepfake** = AI-generated fake image/audio/video of a real person.",
          "Used for misinformation, harassment, and scams.",
          "Visual or audio 'proof' can now be faked — stay skeptical.",
        ],
      },
      {
        id: "scams",
        kicker: "Protect yourself",
        title: "Spot AI-powered tricks",
        body: `Scammers use AI to sound more convincing — cloning a voice to fake an emergency call, writing flawless phishing messages, or impersonating someone online.\n\nDefend yourself:\n• **Verify through another channel** — if "a friend" makes an urgent request, contact them directly.\n• **Be skeptical of urgency** — pressure to act fast is a classic scam sign.\n• **Check the source** of shocking images/videos before believing or sharing.\n• **Guard your footprint** — the less you post, the less can be used against you.`,
        callout: {
          label: "Voice-clone scam",
          text: "A cloned voice 'crying for help' is a known scam. Agree on a family code word, and always call the person back to confirm.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Think before you share — and before you believe",
        body: `Two habits keep you safe: **share less** with AI tools, and **believe less** of sensational media without checking. Your digital footprint and your skepticism are both forms of self-defense.\n\nTake the knowledge check, then make a privacy plan.`,
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
