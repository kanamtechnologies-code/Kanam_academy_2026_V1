import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson14: AILessonConfig = {
  id: "ai-14",
  title: "14. Privacy, Deepfakes, and Your Footprint",
  goal: "Protect your privacy when using AI, recognize deepfakes and AI-driven scams, think before you share, and respect other people's consent when AI-generated media is involved.",
  xpReward: 700,
  badge: "Privacy Defender",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/13",
  nextHref: "/learn/ai/15",
  lessonModule: {
    durationLabel: "~20–25 min",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `You share more with technology than you realize — and AI makes both *sharing* and *faking* more powerful than ever. This lesson protects you on three fronts: what you put *into* AI, which AI-made content you choose to *believe*, and how you treat *other people's* likeness and privacy.\n\nRoadmap:\n\n• Why what you type into a chatbot doesn't always stay private.\n• **Deepfakes** — realistic fake images, voices, and video — and why "seeing isn't believing" anymore.\n• How to spot AI-powered scams and protect your digital footprint.\n• Why making a deepfake of someone else — even "as a joke" — can cause real harm.\n\nThis is everyday safety: it affects your accounts, your reputation, and even your family.`,
        image: "/images/lessons/ai-14-privacy.png",
        imageAlt: "A shield protecting personal data from an AI chat box",
        callout: {
          label: "Why it matters",
          text: "A single screenshot, voice clip, or private detail can be copied, stored, or faked. A few smart habits keep your information — and your family — much safer.",
        },
      },
      {
        id: "hook-story",
        kicker: "Real moment",
        title: "The call that sounded exactly like her cousin",
        body: `Lena's phone rings at 10pm. It's her cousin's voice — panicked, saying he's in trouble and needs money sent immediately, and begging her not to tell anyone. Her stomach drops. She almost sends it right then.\n\nBut something nags at her: he's asking her to keep it secret from the rest of the family, which isn't like him at all. She hangs up and calls him back on the number already saved in her phone. He picks up, confused — he never called her.\n\nA few seconds of his voice from a public video was apparently enough for someone to clone it. The "family emergency" was a scam built entirely on AI-generated audio — and the only thing that stopped it was Lena's habit of verifying through a channel she already trusted.`,
        callout: {
          label: "Keep this in mind",
          text: "Urgency plus secrecy plus a money request is one of the oldest scam patterns — AI just made the voice sound real.",
        },
      },
      {
        id: "glossary",
        kicker: "Let's break down the words",
        title: "Privacy and safety words in plain English",
        body: `• **Privacy** — your right to control who sees your personal information.\n• **Deepfake** — AI-generated fake media (image, audio, video) of a real person.\n• **Digital footprint** — the trail of data you leave online that others (and AI) can use.\n• **Phishing** — tricking someone into sharing info or money via fake messages — now AI-enhanced.\n• **Consent** — someone's clear permission for their likeness, voice, or data to be used, including in AI-generated content.\n• **Out-of-band verification** — confirming something through a completely different channel (like calling a real number) than the one making the request.\n\nAlmost every scam or privacy mistake in this lesson can be prevented by one of these six ideas, applied on time.`,
        callout: {
          label: "Pro tip",
          text: "'Out-of-band verification' sounds technical, but it's just: don't trust the channel that's asking — check through a channel you already know is real.",
        },
      },
      {
        id: "concept-1",
        kicker: "The big idea",
        title: "What you type into AI doesn't always stay private",
        body: `AI tools run on data, and what you type can be **stored, reviewed by humans, or even used to train future models**. Pasting a private diary entry, a friend's phone number, or a photo of your ID into a chatbot can expose information you can't take back.\n\nThink of a public chat box like a postcard, not a sealed letter. It might travel just fine — but you shouldn't write anything on it you'd hate a stranger to read.\n\nReal example: people have pasted private work documents or personal secrets into chatbots, only to learn that the conversation might be reviewed to improve the service. Once it's out, you can't un-share it.`,
        callout: {
          label: "Before you paste",
          text: "Ask: would I be okay if this text or image showed up somewhere else? If not, don't put it into an AI tool.",
        },
        checkIn: {
          prompt: "Why should you avoid pasting private info into a chatbot?",
          choices: [
            "“It uses too much data on your plan” describes a different situation than the one in the question stem",
            "If the goal were something else, “Chatbots can't read text” might work; for this check, it does not",
            "Picking “It makes the AI slower” is a common mix-up that confuses a nearby idea with the right one",
            "What you share may be stored, reviewed, or used to train future models — and you can't take it back",
          ],
          correctIndex: 3,
          explanation:
            "AI tools may retain or reuse what you type. Treat them like a semi-public space, not a vault.",
        },
      },
      {
        id: "concept-2",
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
        checkIn: {
          prompt: "What is a deepfake?",
          choices: [
            "Any video edited with normal filters or editing apps, nothing AI-specific” belongs to a different situation than the one in the question stem",
            "AI-generated fake media that makes a real person appear to say or do things they didn't",
            "Grainy, low-quality footage that's just hard to see clearly” belongs to a different situation than the one in the question stem",
            "A video that's simply been slowed down or sped up” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 1,
          explanation:
            "Deepfakes are realistic fake images, audio, or video created by AI — a major source of misinformation and scams.",
        },
      },
      {
        id: "concept-3",
        kicker: "Protect yourself",
        title: "Spot AI-powered tricks",
        body: `Scammers use AI to sound more convincing than ever — cloning a voice to fake an emergency call, writing flawless phishing messages with no typos to give them away, or impersonating someone you trust online.\n\nDefend yourself:\n\n• **Never paste passwords, student IDs, or 2FA codes** into chatbots, random forms, or "verification" chats — not even to "summarize" or "check" something. AI tools aren't private vaults.\n• **Verify through another channel** — if "a friend" makes an urgent request, contact them directly on a number you already know.\n• **Be skeptical of urgency** — pressure to act *right now* is a classic scam sign.\n• **Check the source** of shocking images or videos before believing or sharing.\n• **Report and delete** suspicious messages once you've handled them safely — don't leave the bait on your phone for a classmate to tap.\n• **Guard your footprint** — the less you post publicly, the less can be used to copy or target you.`,
        callout: {
          label: "Voice-clone scam",
          text: "A cloned voice 'crying for help' is a known scam. Agree on a family code word, and always call the person back to confirm.",
        },
        checkIn: {
          prompt: "You get an urgent call that sounds like a family member begging for money fast. What's the safest response?",
          choices: [
            "Hang up and call that family member back directly to verify",
            "Send the money immediately — the voice is proof",
            "Reply to the call with your bank password” belongs to a different situation than the one in the question stem",
            "Post about it online to ask strangers” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Voices can be cloned. Verify through another channel and be suspicious of urgency — classic scam signs.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Catch a deepfake voice scam",
        body: `Late at night, your family gets a call. The voice sounds *exactly* like your older cousin: "I'm in trouble, I need money wired right now — please don't tell anyone." Walk through the safe response.\n\n**Step 1 — Pause. Don't panic-send codes or money.** Extreme urgency + secrecy + a money request = textbook scam pattern, no matter how real the voice sounds.\n\n**Step 2 — Never paste passwords, IDs, or 2FA codes.** If anyone — or any chatbot — asks you to share a login code "to verify," that's a trap. Real help never needs your secret codes.\n\n**Step 3 — Verify through another channel.** Hang up and call your cousin directly on their real number, or ask the family **code word** you agreed on in advance.\n\n**Step 4 — Remember voices can be cloned.** A few seconds of someone's audio from social media is enough for AI to fake their voice. The voice is *not* proof.\n\n**Step 5 — Report and delete suspicious messages.** Once you've verified safely, report the scam to a trusted adult or platform, then delete the message so no one else in your family taps the bait.`,
        code: `Incoming: "It's me! Send money NOW. Don't tell anyone."
   ↳ urgency? ⚠️   secrecy? ⚠️   money? ⚠️   voice = proof? ❌ (cloneable)
Action: pause → never share codes → call real number / safe word → report & delete`,
        codeCaption: "Spotting an AI voice-clone scam",
        callout: {
          label: "Pro tip",
          text: "Set up a family 'safe word' today. If someone calls claiming to be a relative in trouble, the real person will know it — a cloned voice won't.",
        },
      },
      {
        id: "second-example",
        kicker: "Second example",
        title: "The group chat image that wasn't real",
        body: `Someone drops a photo in a group chat: a classmate "caught" doing something embarrassing. It looks real — lighting, background, facial expression all check out.\n\nBut the classmate swears they weren't there. A closer look: weird ear blending, inconsistent shadows, fingers that don't quite line up. It was **AI-generated or heavily AI-edited** — shared without consent.\n\nThe harm landed immediately: rumors, drama, a student afraid to come to school. The technology wasn't exotic; the **privacy and consent failure** was.\n\nDefense isn't only technical detection — it's a culture of **ask before you share, especially when a real person's dignity is on the line.**`,
        callout: {
          label: "Notice this",
          text: "Deepfakes don't only target celebrities. Ordinary students can be victims when sharing outruns verification.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth check",
        title: "\"I'd definitely recognize a deepfake\" and \"only celebrities get targeted\"",
        body: `Two comforting myths worth busting. First: "I'd definitely be able to tell." Modern deepfakes have gotten good enough that confident spotting-by-eye alone is unreliable, especially in short clips or low-quality video — trained researchers use tools and context checks, not just their eyes.\n\nSecond: "only celebrities and politicians get deepfaked." In reality, ordinary teens have been targeted with fake images and audio for bullying, harassment, and scams. A public social media account with photos and voice clips (even short ones from videos) is enough raw material.\n\nStaying humble about your own detection skills — and staying private about how much raw footage of yourself is public — are both more useful than confidence in "I'd just know."`,
        callout: {
          label: "Myth check",
          text: "\"I'd definitely spot a fake\" and \"that only happens to famous people\" are both overconfident. Verify through trusted channels, and limit how much raw audio/video of yourself is public.",
        },
        checkIn: {
          prompt: "Is it true that only celebrities and politicians need to worry about being deepfaked?",
          choices: [
            "False — ordinary teens have been targeted with fake images or audio, especially from public social media content",
            "True — attackers only bother with celebrities and politicians” belongs to a different situation than the one in the question stem",
            "False — but only if your account is set to private (then risk is zero)” belongs to a different situation than the one in the question stem",
            "True — school accounts are technically impossible to spoof” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Deepfake harassment and scams have hit everyday people, not just public figures. Private accounts reduce risk but don't make spoofing \"impossible.\"",
        },
      },
      {
        id: "red-flags",
        kicker: "Red flags",
        title: "Privacy and scam red flags",
        body: `Pause when you see any of these — online, in DMs, or on a phone call:`,
        bullets: [
          "**Urgent money request + voice or video \"proof\"** — classic deepfake scam pattern.",
          "**App asks for more data than the task needs** — especially photos, contacts, or microphone access.",
          "**\"We'll delete your data\" with no clear policy** — deletion promises without specifics.",
          "**Pressure to share someone's image or voice \"as a joke\"** — consent still matters.",
        ],
        callout: {
          label: "First move",
          text: "Pause, verify through a separate channel, and protect data before you click, share, or send money.",
        },
      },
      {
        id: "try-it",
        kicker: "Your turn",
        title: "Set up your own safety net this week",
        body: `Two concrete actions, right now:\n\n1. **Pick a family code word** (or confirm one already exists) for emergency phone calls — something you'd never post publicly.\n2. **Review your own public posts** for one platform: how much video or audio of your voice is publicly visible? You don't need to delete everything, but know the number.\n\nThese two habits directly counter the two biggest risks in this lesson: voice-clone scams and being used as deepfake "raw material."`,
        callout: {
          label: "Talk to your family",
          text: "A code word only works if more than one person knows it. Bring it up at dinner this week.",
        },
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "A quick media-verification checklist",
        image: "/images/lessons/ai-ex-verify.png",
        imageAlt: "A checklist for verifying whether an image or video might be AI-generated",
        body: `When a shocking image, video, or audio clip crosses your feed, run a fast check before believing or sharing it:\n\n• **Search for it elsewhere.** Has a reputable news outlet or fact-checking site covered it? If something this shocking were real, credible sources usually report it too.\n• **Check the account that posted it.** New, anonymous, or history of misleading posts? That's a red flag.\n• **Look for small glitches.** Odd blinking, warped hands, inconsistent lighting, or audio that doesn't quite match lip movement can hint at AI generation (though this gets harder as tools improve).\n• **Consider the motive.** Does spreading this benefit someone — political, financial, or personal? Ask who gains if you believe and share it.\n\nNo single check is perfect, but stacking a few of them catches most fakes before you become part of spreading one.`,
        bullets: [
          "Cross-check with a reputable source before believing something shocking.",
          "Investigate the poster's account, not just the content.",
          "Ask 'who benefits if I believe and share this?'",
        ],
      },
      {
        id: "decision-checklist",
        kicker: "Decision checklist",
        title: "Before you paste into an AI tool",
        body: `Use this checklist whenever you're about to share text, images, or audio with an AI service:`,
        bullets: [
          "**Is it mine to share?** (My work, my photo — or someone else's private material?)",
          "**Could this identify me or someone else?** (Names, locations, medical info, passwords?)",
          "**Does this tool need this much data for the task?** (If not, trim it.)",
          "**Would I be okay if this sat on a server I don't control?** (Assume copies are possible.)",
        ],
        checkIn: {
          prompt: "You want AI help editing a friend's private journal entry they sent you. Best move?",
          choices: [
            "“Paste the whole entry — they sent it to you, so it's fine” describes a different situation than the one in the question stem",
            "It can seem like use AI silently — they'll never know, but that reading skips the distinction this question is testing",
            "Ask your friend if they're okay with you putting their private writing into an AI tool; if not, help without uploading it",
            "A rushed pass can land on paste it but delete their name, so it's anonymous”; careful readers reject it for this problem",
          ],
          correctIndex: 2,
          explanation:
            "Receiving a message isn't the same as consent to upload it to a third-party AI service. Ask first — or help without exposing their private words to another platform.",
        },
      },
      {
        id: "comparison",
        kicker: "See it side by side",
        title: "Matching the risk to the defense",
        body: `Different AI-powered risks call for different specific defenses.`,
        table: {
          columns: ["Risk", "Best defense"],
          values: [
            ["Voice-clone emergency call", "Hang up, verify via a number/code word you already trust"],
            ["Phishing message with no typos", "Don't click links; go to the real site/app directly instead"],
            ["Shocking deepfake image/video", "Search elsewhere for confirmation before believing or sharing"],
            ["Private info pasted into a chatbot", "Don't paste it in the first place — treat chat boxes as semi-public"],
          ],
          rowCount: 4,
        },
        checkIn: {
          prompt: "You get a flawless, well-written message claiming to be your school urgently asking you to 'verify your login' through a link. What's the smartest move?",
          choices: [
            "Click the link immediately since it looks professional” belongs to a different situation than the one in the question stem",
            "Reply with your password to be safe” belongs to a different situation than the one in the question stem",
            "Don't click the link — go directly to the school's real site or app to check instead",
            "Forward it to friends so they can click it too” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "AI-written phishing can look flawless. The safe move is always navigating directly to the real, known site instead of trusting an embedded link.",
        },
      },
      {
        id: "what-good-looks-like",
        kicker: "What good looks like",
        title: "A healthy AI privacy setup",
        body: `You don't need paranoia — you need habits. Good practice looks like:`,
        bullets: [
          "**Minimal sharing** — only the data the task actually requires.",
          "**Separate accounts** for school vs. personal experiments when possible.",
          "**Permission hygiene** — review app access a few times a year.",
          "**Verify-before-share** on surprising media — especially of real people.",
        ],
        callout: {
          label: "Realistic goal",
          text: "Perfect privacy is rare. Thoughtful defaults plus quick verification beats ignoring the risks.",
        },
      },
      {
        id: "ethics",
        kicker: "Ethics moment",
        title: "Making a deepfake of someone without consent is not a harmless joke",
        body: `So far this lesson has focused on protecting *yourself*. But AI tools also make it easy to create fake images, audio, or video *of other people* — and doing that without their consent can cause real harm, even when it's meant as a joke or a prank.\n\nA fake image or clip of a classmate, teammate, or friend — even a "funny" one — can spread beyond your control, damage their reputation, or be deeply upsetting to them, especially if it's embarrassing, sexual, or puts them in a false light. Many schools and increasingly the law treat this as a serious form of harassment, not a prank.\n\nThe consent test: would this person be genuinely fine seeing this made and shared, before you make it — not just "would they eventually laugh it off." If you're not sure, or if the honest answer is no, don't make it.`,
        callout: {
          label: "Quick gut-check",
          text: "The same generative AI skills that protect you from deepfakes can be used to hurt someone else. Consent isn't optional just because a joke was intended.",
        },
      },
      {
        id: "habits",
        kicker: "Make it automatic",
        title: "Five privacy and safety habits worth keeping",
        body: `1. **Never paste** passwords, IDs, or 2FA codes anywhere, including chatbots.\n2. **Verify out-of-band** — a different channel than the one asking — for anything urgent or money-related.\n3. **Search before you believe** shocking media, especially before sharing it.\n4. **Mind your own footprint** — know how much voice/video of you is public.\n5. **Get consent** before creating or sharing any AI-generated content that features someone else.`,
        callout: {
          label: "This week",
          text: "Pick one habit from this list you're weakest on and practice it deliberately the next time it comes up.",
        },
      },
      {
        id: "transfer-to-life",
        kicker: "Use it for real",
        title: "Protect your footprint this week",
        body: `Three concrete actions you can do in under 15 minutes total:\n\n1. **Review permissions** on one app you use with AI features.\n2. **Remove one old post** with location or personal details you wouldn't share today.\n3. **Agree with friends** on a no-sharing rule for AI-made images of each other without explicit okay.\n\nSmall steps compound. Your future self — and your friends — benefit when you treat digital footprints as real-world reputation.`,
        callout: {
          label: "Transfer this",
          text: "Privacy and consent habits protect you in AI chats, social feeds, and group chats alike.",
        },
      },
      {
        id: "reflection-prompt",
        kicker: "Pause and think",
        title: "Before you move on...",
        body: `Think about how much video or audio of your own voice and face is publicly available online right now — old posts, tagged videos, public accounts. Are you comfortable with that amount, or is there something you'd want to change?\n\nHold that thought for the reflection at the end of this lesson.`,
      },
      {
        id: "mini-case",
        kicker: "Mini-case",
        title: "The fake photo in the group chat",
        body: `A student named Owen finds an AI-edited photo circulating in a group chat that makes it look like a classmate said something embarrassing, using a fake screenshot-style image. Several people have already reacted and forwarded it.\n\nOwen recognizes a few things: the "screenshot" font looks slightly off, no one can point to where it originally came from, and the classmate it targets clearly never consented to being portrayed this way. Instead of forwarding it further, Owen doesn't share it, tells the classmate what's circulating so they're not blindsided, and reports it to a trusted adult at school as the harassment policy describes.\n\nOwen also thinks back to the ethics idea from this lesson: even if the original creator meant it as a joke, the classmate never got a say — and that's the real problem, regardless of how convincing or "harmless" it was meant to look.`,
        checkIn: {
          prompt: "What did Owen do right in this situation?",
          choices: [
            "Assumed it must be true since it looked like a real screenshot” belongs to a different situation than the one in the question stem",
            "Ignored it completely and did nothing” belongs to a different situation than the one in the question stem",
            "Didn't share it further, warned the affected classmate, and reported it to a trusted adult",
            "Forwarded it to more people so everyone could see how funny it was” belongs to a different situation than the one in the question stem",
          ],
          correctIndex: 2,
          explanation:
            "Not spreading unverified or harmful content further, informing the person affected, and reporting it are exactly the responsible steps — consent matters even for 'jokes.'",
        },
      },
      {
        id: "check-yourself",
        kicker: "Self-check",
        title: "Spot the safest move",
        body: `One more rep before the graded knowledge check. Your phone buzzes with a text from an unfamiliar number, perfectly written, claiming to be a "school administrator" asking you to confirm your student ID and password "to fix an account issue" through a link.`,
        checkIn: {
          prompt: "What's the safest response to this message?",
          choices: [
            "Don't click the link or reply with credentials — contact the school directly through a known, official channel to check",
            "It can seem like click the link and see what happens, but that reading skips the distinction this question is testing",
            "Reply with your student ID and password since it sounds official” belongs to a different situation than the one in the question stem",
            "“Forward it to friends to warn them, including the link” describes a different situation than the one in the question stem",
          ],
          correctIndex: 0,
          explanation:
            "Well-written, urgent requests for credentials are classic phishing, AI-enhanced or not. Always verify through a channel you already know is legitimate.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Three habits keep you and others safe: **share less** with AI tools, **believe less** of sensational media without checking, and **get consent** before creating AI content about someone else. Your digital footprint, your skepticism, and your respect for others are all forms of self-defense and good citizenship.\n\nNext we'll look at AI and the future of work. First, lock in today's ideas.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict).`,
      },
    ],
  },
  bigIdeas: [
    "What you put into AI tools may be **stored or used** — never share passwords, IDs, or 2FA codes.",
    "**Deepfakes** make fake images/voices/videos look real — seeing isn't believing.",
    "Beat AI scams by **verifying out-of-band**, resisting urgency, and **reporting suspicious messages**.",
    "Creating AI content of someone else **without consent** can cause real harm, even 'as a joke.'",
  ],
  keyTerms: [
    { term: "Privacy", definition: "Your right to control who sees your personal information." },
    { term: "Deepfake", definition: "AI-generated fake media (image, audio, video) of a real person." },
    { term: "Digital footprint", definition: "The trail of data you leave online that others (and AI) can use." },
    { term: "Phishing", definition: "Tricking someone into sharing info or money via fake messages — now AI-enhanced." },
    { term: "Consent", definition: "Someone's clear permission for their likeness, voice, or data to be used, including in AI content." },
  ],
  realWorld:
    "Scammers have cloned a relative's voice from a few seconds of social media audio to fake an emergency and demand money. Families now use secret 'safe words' to verify who's really calling.",
  quiz: [
    {
      id: "q1",
      question: "Why should you avoid pasting private info into a chatbot?",
      choices: [
            "Picking “It makes the AI slower” is a common mix-up that confuses a nearby idea with the right one",
            "What you share may be stored, reviewed, or used to train future models — and you can't take it back",
            "“It uses too much data on your plan” describes a different situation than the one in the question stem",
            "If the goal were something else, “Chatbots can't read text” might work; for this check, it does not",
          ],
      correctIndex: 1,
      explanation:
        "AI tools may retain or reuse what you type. Treat them like a semi-public space, not a vault.",
    },
    {
      id: "q2",
      question: "What is a deepfake?",
      choices: [
            "A video that's simply been slowed down or sped up” belongs to a different situation than the one in the question stem",
            "Grainy, low-quality footage that's just hard to see clearly” belongs to a different situation than the one in the question stem",
            "AI-generated fake media that makes a real person appear to say or do things they didn't",
            "Any video edited with normal filters or editing apps, nothing AI-specific” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 2,
      explanation:
        "Deepfakes are realistic fake images, audio, or video created by AI — a major source of misinformation and scams.",
    },
    {
      id: "q3",
      question: "You get an urgent call that sounds like a family member begging for money fast. What's the safest response?",
      choices: [
            "Reply to the call with your bank password” belongs to a different situation than the one in the question stem",
            "Hang up and call that family member back directly to verify",
            "Post about it online to ask strangers” belongs to a different situation than the one in the question stem",
            "Send the money immediately — the voice is proof",
          ],
      correctIndex: 1,
      explanation:
        "Voices can be cloned. Verify through another channel and be suspicious of urgency — classic scam signs.",
    },
    {
      id: "q4",
      question: "Which habit best reduces your risk in an AI world?",
      choices: [
            "Believe every shocking video you see” belongs to a different situation than the one in the question stem",
            "Share less personal data and verify sensational media before believing or sharing",
            "Turn off your phone forever” belongs to a different situation than the one in the question stem",
            "Share as much as possible so AI knows you well” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 1,
      explanation:
        "Sharing less and staying skeptical of unverified media are practical, everyday defenses.",
    },
    {
      id: "q5",
      question: "Is it true that only celebrities and politicians need to worry about being deepfaked?",
      choices: [
            "False — ordinary teens have been targeted with fake images or audio, especially from public content",
            "True — attackers only bother with celebrities and politicians” belongs to a different situation than the one in the question stem",
            "False — but only people with huge followings face any real risk” belongs to a different situation than the one in the question stem",
            "True — school accounts are technically impossible to spoof” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "Deepfake harassment and scams have targeted everyday people, not just public figures. Follower count isn't a shield.",
    },
    {
      id: "q6",
      question: "You receive a flawless, urgent message asking you to 'verify your login' through a link. What's the smartest move?",
      choices: [
            "Don't click the link — go directly to the real site or app to check instead",
            "Forward it to friends so they can click it too” belongs to a different situation than the one in the question stem",
            "Click the link immediately since it looks professional” belongs to a different situation than the one in the question stem",
            "Reply with your password to be safe” belongs to a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "AI-written phishing can look flawless. Always navigate directly to the known, real site instead of trusting an embedded link.",
    },
    {
      id: "q7",
      question: "A classmate makes an AI-edited fake image of another student 'as a joke,' without asking them. Is this okay?",
      choices: [
            "“Yes, as long as it was meant to be funny” describes a different situation than the one in the question stem",
            "“It's only a problem if the person finds out” describes a different situation than the one in the question stem",
            "Yes, but only if fewer than 10 people see it” belongs to a different situation than the one in the question stem",
            "No — creating AI content of someone without their consent can cause real harm, regardless of intent",
          ],
      correctIndex: 3,
      explanation:
        "Consent matters regardless of intent. A 'joke' can still cause real reputational or emotional harm to the person portrayed.",
    },
    {
      id: "q8",
      question: "How does this lesson's content connect to being a responsible digital citizen?",
      choices: [
            "Managing your digital footprint, verifying media, and respecting others' consent online are core parts of responsible digital citizenship",
            "“Digital citizenship only applies when you're using a school-issued device” describes a different situation than the one in the question stem",
            "A rushed pass can land on digital citizenship mainly means posting politely and nothing else”; careful readers reject it for this problem",
            "“It doesn't relate — privacy is a separate topic from digital citizenship” describes a different situation than the one in the question stem",
          ],
      correctIndex: 0,
      explanation:
        "Protecting your own data, critically evaluating media, and respecting other people's privacy and consent are core digital citizenship habits.",
    },
  ],
  reflection: {
    prompt:
      "Write your personal privacy rule for AI tools (what you'll never paste in) and one way you'll check before believing a shocking video.",
    placeholder: "I'll never put ___ into a chatbot. Before sharing a viral video I'll…",
  },
};
