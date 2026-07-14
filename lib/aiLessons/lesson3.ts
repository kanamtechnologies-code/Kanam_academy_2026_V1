import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const aiLesson3: AILessonConfig = {
  id: "ai-3",
  title: "3. How Computers See and Hear",
  goal: "Understand how AI 'perceives' the world — turning pixels and sound waves into numbers it can analyze (the Big Idea of Perception) — and why that process can be unfair to some people.",
  xpReward: 150,
  badge: "Sense Maker",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ai/2",
  nextHref: "/learn/ai/4",
  lessonModule: {
    durationLabel: "~20–25 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Start here",
        title: "What you'll learn today",
        body: `When you unlock your phone with your face or say "Hey" to a voice assistant, it can feel like the device is *looking* and *listening* like a person. It isn't — and today you'll discover the surprising trick behind the curtain.\n\nHere's the plan:\n\n• Meet the Big Idea of **Perception** — how AI takes in the world.\n• See how a **photo** becomes a grid of numbers (pixels).\n• See how **sound** becomes a wave of numbers (a waveform).\n• Learn why messy input makes AI mishear and misjudge — and why that failure isn't evenly spread across everyone.\n\nThis is the foundation under self-driving cars, photo search, face unlock, and voice assistants. Once you know AI only ever sees *numbers*, a lot of its strange behavior suddenly makes sense.`,
        image: "/images/lessons/ai-3-see-hear.png",
        imageAlt: "A photo turning into a grid of numbered pixels",
        callout: {
          label: "Why it matters",
          text: "Every time face unlock fails in the dark or a voice assistant mishears you in a loud room, you're watching perception break down. Understanding it explains those everyday glitches — and the limits of the AI you rely on.",
        },
      },
      {
        id: "hook-story",
        kicker: "True story",
        title: "The soap dispenser that only worked for some hands",
        body: `A viral video from a few years back showed an automatic soap dispenser in a public bathroom. It used an infrared sensor to detect a hand and release soap. It worked instantly for light-skinned hands — and didn't respond at all to a dark-skinned hand held in the exact same spot.\n\nThe dispenser wasn't "racist" in any way a person can be — it has no thoughts at all. Its infrared sensor simply hadn't been tested and tuned to reliably detect a wider range of skin tones, so its "perception" quietly failed for some users and not others.\n\nThat tiny, forgettable object at a sink is a perfect miniature of a much bigger idea you'll meet today: **how well an AI perceives the world depends entirely on how it was built and tested** — and when that testing is incomplete, some people get left out.`,
      },
      {
        id: "glossary",
        kicker: "Words you'll need",
        title: "Your vocabulary for this lesson",
        body: `These words describe exactly how a computer takes in the world — keep them close for the rest of the lesson.`,
        bullets: [
          "**Perception** — an AI's ability to capture and interpret data from the world (images, sound, sensors).",
          "**Pixel** — the smallest dot in a digital image, stored as red/green/blue number values.",
          "**Waveform** — sound represented as a series of numbers measuring air pressure over time.",
          "**Sensor** — a device (camera, mic, thermometer) that converts something physical into data.",
          "**Signal-to-noise** — how much useful information (signal) you have compared to messiness (noise) in your input.",
        ],
      },
      {
        id: "concept-1",
        kicker: "Big Idea: Perception",
        title: "Computers sense the world through numbers",
        body: `Humans perceive the world with eyes and ears wired to a brain. Computers don't have any of that — so AI **perception** means turning what a sensor captures into **numbers** the computer can work with.\n\nThink of it like a translator at the border between the real world and the computer's world. The real world speaks in light, sound, and motion. The computer only speaks "numbers." Perception is the translator that converts one into the other.\n\nA camera turns light into a grid of colored dots. A microphone turns sound into a wiggly line of values. So to a computer, a photo of your dog and your favorite song are both, deep down, just **big lists of numbers**.`,
        callout: {
          label: "Myth check",
          text: "AI never 'sees' a picture or 'hears' a song the way you do — with meaning and emotion. It receives a spreadsheet of numbers and looks for patterns in them. No experience, no feeling, just math.",
        },
        checkIn: {
          prompt: "What does 'perception' mean for an AI system?",
          choices: [
            "AI having an emotional reaction to what it sees",
            "Converting a real-world signal (light, sound, motion) into numbers a computer can process",
            "AI reading your mind directly",
            "A robot growing physical eyes",
          ],
          correctIndex: 1,
          explanation:
            "Perception is the translation step: turning a physical signal into data. It's the foundation every camera- or microphone-based AI relies on.",
        },
      },
      {
        id: "concept-2",
        kicker: "Seeing",
        title: "A picture is a grid of pixels (and each pixel is numbers)",
        body: `Zoom way into any digital photo — keep zooming — and you'll eventually find tiny squares called **pixels**. A picture is really a giant grid of these colored dots, like a mosaic made of millions of little tiles.\n\nEach pixel stores how much **red, green, and blue** light it has, usually as three numbers from 0 to 255. Mix those three and you can make any color: (255, 0, 0) is pure red, (0, 0, 0) is black, (255, 255, 255) is white.\n\nA small 1000×1000 photo is **a million pixels** — that's three million numbers in one little image! AI hunts for patterns in those numbers: first edges, then shapes and textures, and eventually whole objects like "eye," "wheel," or "face." It's the same step-by-step pattern-matching you learned about in Lesson 1, just on a grid of color numbers.`,
        bullets: [
          "**Pixel** = one tiny colored dot in an image.",
          "Each pixel = 3 numbers (Red, Green, Blue), each 0–255.",
          "AI finds patterns: edges → shapes → objects.",
        ],
        checkIn: {
          prompt: "A 1000×1000 pixel photo contains roughly how many individual color numbers?",
          choices: [
            "About 1,000 numbers total",
            "About 3 million numbers (a million pixels × 3 color values each)",
            "Exactly one number for the whole photo",
            "It depends only on the photo's file name",
          ],
          correctIndex: 1,
          explanation:
            "Each of the million pixels stores 3 numbers (red, green, blue), so the full photo is about 3 million numbers for the AI to search for patterns in.",
        },
      },
      {
        id: "concept-3",
        kicker: "Hearing",
        title: "Sound becomes a wave of numbers",
        body: `Sound is really just air pressure wiggling up and down really fast. A microphone measures that pressure **thousands of times per second**, saving each measurement as a number. String all those numbers together in order and you get a **waveform** — a wiggly line of values that captures the sound.\n\nPicture taking a person's temperature, but instead of once a day you do it 16,000 times a second and write down every reading. That long list of readings *is* the sound, in number form.\n\nThose are the same numbers that let a voice assistant catch its wake word, and that speech recognition matches against patterns for likely words. Notice it's the exact same recipe as images: real-world signal → numbers → pattern matching.`,
        callout: {
          label: "Same recipe",
          text: "Images, sound, even temperature or motion from a sensor — perception always means the same move: convert a real-world signal into numbers an AI can analyze for patterns.",
        },
        checkIn: {
          prompt: "What is a 'waveform' in the context of AI perception?",
          choices: [
            "A hand gesture used to control a device",
            "Sound represented as a long series of numbers measuring air pressure over time",
            "A type of Wi-Fi signal",
            "The shape of a sound wave drawn by hand on paper",
          ],
          correctIndex: 1,
          explanation:
            "A waveform is the numeric record of sound a microphone captures — thousands of pressure measurements per second, ready for pattern matching.",
        },
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "How a voice assistant catches its wake word",
        body: `Let's trace the full voice pipeline — from the moment you speak to the moment the assistant answers. The wake word is just a **filter** that tells the device "someone is talking to me now." After that, the real work begins.\n\n**Step 1 — Capture sound.** The microphone is always sampling the room, turning it into a stream of numbers (the **waveform**) — thousands of values every second.\n\n**Step 2 — Wake-word check (the filter).** A small AI constantly scans recent numbers: do they match the wake phrase it was trained on? It's not understanding words yet — it's matching number patterns. If there's no match, the rest of the pipeline stays off to save power and protect privacy.\n\n**Step 3 — Record the full request.** Once the wake word matches, the device starts recording your whole command — "What's the weather tomorrow?" — not just the trigger phrase.\n\n**Step 4 — Speech-to-text.** The recorded audio gets converted into text or command features. Now the device has something it can actually interpret, not just raw sound numbers.\n\n**Step 5 — Run the command and reply.** The assistant looks up the weather (or sets a timer, or plays music) and speaks the answer back. The whole chain — capture → wake filter → record → understand → act — breaks if the input is noisy, mumbled, or drowned out by a loud TV.`,
        callout: {
          label: "Pro tip",
          text: "When an assistant mishears you, don't just repeat louder — reduce the noise. Cleaner input means cleaner numbers, and cleaner numbers mean better pattern matching.",
        },
      },
      {
        id: "misconception",
        kicker: "Myth-busting",
        title: "\"The camera just needs to be pointed at it\"",
        body: `A lot of frustration with face unlock, photo search, or voice assistants comes from a wrong assumption about how "seeing" and "hearing" actually work.`,
        bullets: [
          "**Myth: If a camera is pointed at something, the AI 'sees' it.** Reality: it only sees whatever pixel numbers make it through — darkness, blur, or glare can erase the useful signal entirely.",
          "**Myth: Perception failures are random glitches.** Reality: they often repeat in predictable patterns — the same lighting, angle, or voice type trips up the system every time.",
          "**Myth: A perception system works equally well for everyone who uses it.** Reality: it only works as well as its training and testing covered — gaps in testing become gaps in fairness.",
        ],
        checkIn: {
          prompt: "Why might a voice assistant work great for one person and poorly for another with a different accent?",
          choices: [
            "The second person is speaking too much English",
            "The assistant's training and testing data may not have included enough examples of that accent's speech patterns",
            "Accents make sound waves invisible to microphones",
            "It's always a hardware problem with the microphone itself",
          ],
          correctIndex: 1,
          explanation:
            "Perception systems only recognize patterns they were trained and tested on. Gaps in that data create real, repeatable gaps in performance for some groups of people.",
        },
      },
      {
        id: "try-it",
        kicker: "Try it now",
        title: "Test a perception system yourself",
        body: `If you have access to a voice assistant or face unlock, try this safely and respectfully:\n\n1. Try face unlock in a very dim room, then in bright light. Notice any difference in speed or success.\n2. Say a command to a voice assistant normally, then again with background music playing. Notice what changes.\n\nYou're not trying to "break" anything — you're directly observing perception succeeding and failing based on input quality, exactly like the pipeline you just learned.`,
      },
      {
        id: "deeper-skill",
        kicker: "Level up",
        title: "Reading a confidence score like a pro",
        body: `Many perception systems don't just output "yes" or "no" — they output a **confidence score**, like "87% match" or "92% cat." Learning to read that number is a genuine skill.\n\nA high confidence score in good conditions (clear lighting, quiet room) usually means a solid match. But the *same* score in messy conditions (blurry photo, noisy audio) deserves more skepticism — the system may be confidently wrong because its input numbers were already degraded before it ever started matching patterns.`,
        bullets: [
          "**Check the conditions, not just the score.** A confident answer from messy input is less trustworthy than the number alone suggests.",
          "**Compare across repeats.** If a system gives wildly different confidence scores for near-identical inputs, that's a sign of a fragile perception pipeline.",
          "**Remember: confidence measures pattern-match strength, not truth.** It's still just describing how well the numbers lined up.",
        ],
        image: "/images/lessons/ai-3-extra1.png",
        imageAlt: "A confidence score display next to a clear photo and a blurry photo of the same object",
      },
      {
        id: "comparison",
        kicker: "Side by side",
        title: "Human senses vs. AI sensors",
        body: `Comparing the two side by side shows exactly where the similarities — and the real differences — lie.`,
        table: {
          columns: ["Trait", "Human senses", "AI sensors (camera/mic)"],
          values: [
            ["What it captures", "Light and sound, interpreted with meaning", "Light and sound, converted to raw numbers"],
            ["Handles bad conditions", "Adapts using context and experience", "Struggles unless trained on similar messy examples"],
            ["Consistency across people", "Naturally varies, but understanding still occurs", "Only as fair as its training/testing data was"],
          ],
          rowCount: 3,
        },
        checkIn: {
          prompt: "Based on the comparison, what determines whether an AI sensor performs fairly across different people?",
          choices: [
            "How expensive the camera or microphone hardware is",
            "Whether its training and testing data included a wide, representative range of conditions and people",
            "Nothing — all AI sensors perform identically for everyone by default",
            "The brand name of the device",
          ],
          correctIndex: 1,
          explanation:
            "Unlike human senses, which naturally adapt with lived context, AI perception is only as good and as fair as the range of examples it was built and tested on.",
        },
      },
      {
        id: "ethics-or-bias",
        kicker: "Ethics moment",
        title: "When facial recognition gets it wrong — for real people",
        body: `In 2020, a man in Detroit was wrongly arrested after a facial recognition system matched surveillance footage to his driver's license photo — a match that turned out to be incorrect. He spent nearly 30 hours in custody for a crime he didn't commit, based partly on a perception system's mistaken output.\n\nResearch around the same time (a widely cited study nicknamed "Gender Shades") tested several major facial recognition systems and found they were significantly less accurate at identifying darker-skinned faces, especially darker-skinned women, than lighter-skinned faces — largely because the training and testing datasets underrepresented those groups.\n\nThis connects directly to what you learned about perception: an AI's "sight" is only as good as the numbers it was trained and tested on. When testing leaves out certain groups, the system's mistakes don't land evenly — they concentrate on the people least represented in the data.`,
        callout: {
          label: "CSTA 2-IC-21 connection",
          text: "Discussing bias and accessibility in the design of existing technologies is exactly the skill this real case asks you to practice.",
        },
      },
      {
        id: "habits",
        kicker: "Build the habit",
        title: "Three habits for thinking about AI perception",
        body: `Carry these habits into every perception-based tool you use — from face unlock to photo search.`,
        bullets: [
          "**Blame the input first.** If a perception system fails, check the conditions (light, noise, angle) before assuming the AI is 'broken.'",
          "**Ask 'tested on whom?'** A perception system is only as fair as the range of people and conditions it was tested on.",
          "**Don't confuse confidence with correctness.** A high confidence score describes pattern-match strength, not guaranteed truth.",
        ],
      },
      {
        id: "standards-connect",
        kicker: "Why school cares about this",
        title: "This is exactly what CSTA wants you to notice",
        body: `The Detroit case and the soap dispenser story you read earlier are both textbook examples of **CSTA 2-IC-21**: discussing bias and accessibility in the design of existing technologies. You're not just learning "how cameras work" — you're learning to ask *who was this system tested on, and who got left out?*\n\nThis also ties to **ISTE 1.5, Computational Thinker** — breaking a system down into its real steps (capture → convert to numbers → match patterns) so you can reason about exactly where and why it fails, instead of just shrugging and saying "the AI is glitchy."`,
      },
      {
        id: "reflection-prompt",
        kicker: "Think it through",
        title: "Before you move on, sit with this",
        body: `Think about the soap dispenser story, the Detroit facial recognition case, or your own experience with face unlock or voice assistants.\n\nIf you were in charge of testing a new perception-based product before release, what conditions and what range of people would you insist on testing with — and why? You'll be asked to put this into words in your reflection at the end of the lesson.`,
      },
      {
        id: "mini-case",
        kicker: "Real-world case",
        title: "The study that changed how tech companies test AI",
        body: `The "Gender Shades" research project, published in 2018, tested commercial facial-analysis systems from several major tech companies. The results showed a clear pattern: the systems performed with over 99% accuracy for lighter-skinned men, but accuracy dropped sharply — in some cases below 70% — for darker-skinned women.\n\nThe cause traced right back to perception basics: the training and benchmark datasets used to build and evaluate these systems were overwhelmingly made up of lighter-skinned faces, mostly male. The AI hadn't "chosen" to be biased — it simply never saw enough varied examples to build reliable patterns for everyone.\n\nAfter the research went public, several companies changed how they collected training and testing data, and some paused or limited certain facial recognition products. It's a rare example of a fairness problem in AI perception leading directly to real, documented changes in industry practice — proof that noticing the gap is the first step to closing it.`,
        callout: {
          label: "Why this case matters",
          text: "This is CSTA 2-IC-21 in action: a documented technology bias, traced to its root cause, that led to real accountability and change.",
        },
      },
      {
        id: "check-yourself",
        kicker: "Check yourself",
        title: "Quick gut-check before the quiz",
        body: `Let's make sure the big ideas actually stuck before you head into the knowledge check.`,
        checkIn: {
          prompt: "What was the root cause of the accuracy gap found in the Gender Shades research?",
          choices: [
            "The cameras used were physically incapable of detecting dark colors",
            "The training and benchmark data underrepresented darker-skinned faces, especially women, so the systems learned weaker patterns for them",
            "The researchers made up the results with no real testing",
            "Facial recognition doesn't use pixels at all",
          ],
          correctIndex: 1,
          explanation:
            "Perception systems learn from their training and testing data. Underrepresentation there creates real, measurable accuracy gaps for underrepresented groups.",
        },
      },
      {
        id: "ready",
        kicker: "Ready",
        title: "Now it's your turn",
        body: `Here's what to carry forward: **Perception** means turning real-world signals into numbers a computer can process. **Images** become grids of pixels (red/green/blue numbers), and **sound** becomes a waveform sampled many times per second. Voice assistants use a pipeline: capture → wake-word filter → record full request → speech-to-text → run command and reply.\n\nWhenever that input gets messy, perception suffers — and when testing leaves out certain people or conditions, that suffering isn't spread evenly. That's a fairness issue, not just a technical glitch.\n\nWhen you're ready, switch to the **Knowledge check** (multiple choice, then Reorder · Debug · Predict), then use what you learned about pixels to explain why face unlock fails in the dark.`,
      },
    ],
  },
  bigIdeas: [
    "**Perception** = turning real-world signals into numbers a computer can process.",
    "Images are grids of **pixels**; each pixel is red/green/blue numbers.",
    "Sound becomes a **waveform** of numbers sampled many times per second.",
    "A perception system is only as fair as the range of people and conditions it was tested on.",
    "Confidence scores measure pattern-match strength, not guaranteed truth.",
  ],
  keyTerms: [
    { term: "Perception", definition: "An AI's ability to capture and interpret data from the world (images, sound, sensors)." },
    { term: "Pixel", definition: "The smallest dot in a digital image, stored as red/green/blue number values." },
    { term: "Waveform", definition: "Sound represented as a series of numbers measuring air pressure over time." },
    { term: "Sensor", definition: "A device (camera, mic, thermometer) that converts something physical into data." },
    { term: "Confidence score", definition: "A number describing how strongly an AI's input matched a learned pattern — not a guarantee of truth." },
    { term: "Signal-to-noise", definition: "How much useful information (signal) is present compared to messiness (noise) in an input." },
  ],
  realWorld:
    "Self-driving cars combine cameras, radar, and laser sensors — all converted to numbers — to 'perceive' pedestrians, lanes, and other cars dozens of times per second. Real, documented accuracy gaps in facial recognition for darker skin tones show why testing that perception fairly, across everyone, matters.",
  quiz: [
    {
      id: "q1",
      question: "When an AI 'sees' a photo, what is it actually working with?",
      choices: [
        "A mental image like a human sees",
        "A grid of numbers describing each pixel's color",
        "The photographer's intentions",
        "A printed copy of the picture",
      ],
      correctIndex: 1,
      explanation:
        "To a computer, an image is just a grid of pixel numbers (red, green, blue values). It finds patterns in those numbers.",
    },
    {
      id: "q2",
      question: "What does the Big Idea of 'Perception' mean in AI?",
      choices: [
        "AI having feelings about what it sees",
        "Turning real-world signals (light, sound) into numbers a computer can analyze",
        "AI predicting the future",
        "Robots growing eyes and ears",
      ],
      correctIndex: 1,
      explanation:
        "Perception is converting a physical signal — light, sound, motion — into data the AI can process.",
    },
    {
      id: "q3",
      question: "A voice assistant keeps mishearing you at a loud party. Why?",
      choices: [
        "It's angry at you",
        "The noisy room messes up the input numbers (the waveform), so pattern matching fails",
        "It only works outdoors",
        "It ran out of words",
      ],
      correctIndex: 1,
      explanation:
        "AI perception depends on clean input. Background noise corrupts the waveform, making the words hard to match.",
    },
    {
      id: "q4",
      question: "What do images and sound have in common from an AI's point of view?",
      choices: [
        "Both are stored as lists of numbers the AI finds patterns in",
        "Both are understood emotionally",
        "Neither can be processed by computers",
        "Both require the internet",
      ],
      correctIndex: 0,
      explanation:
        "Perception uses the same recipe for any signal: convert it to numbers, then look for patterns.",
    },
    {
      id: "q5",
      question: "Why did an automatic soap dispenser fail to detect some hands but not others?",
      choices: [
        "The dispenser was intentionally programmed to discriminate",
        "Its sensor wasn't tested and tuned across a wide enough range of skin tones",
        "Soap dispensers don't use sensors",
        "It only worked on Tuesdays",
      ],
      correctIndex: 1,
      explanation:
        "The sensor's perception gap traced back to incomplete testing across the range of real users — a pattern that shows up across many perception systems.",
    },
    {
      id: "q6",
      question: "The Gender Shades research found lower accuracy for darker-skinned faces mainly because:",
      choices: [
        "Darker skin reflects no light at all",
        "The training and benchmark datasets underrepresented darker-skinned faces, especially women",
        "The researchers were biased against the technology",
        "Facial recognition cannot use pixels",
      ],
      correctIndex: 1,
      explanation:
        "The systems learned strong patterns for the well-represented groups in their data and weaker patterns for underrepresented ones — a direct data gap, not intentional design.",
    },
    {
      id: "q7",
      question: "What should you do when a perception system gives a high-confidence answer from clearly messy input (blurry photo, noisy audio)?",
      choices: [
        "Trust it completely because the confidence score is high",
        "Be more skeptical, since messy input can produce a confidently wrong answer",
        "Assume the AI is lying on purpose",
        "Confidence scores are meaningless and should always be ignored",
      ],
      correctIndex: 1,
      explanation:
        "A confidence score reflects pattern-match strength on the input it received — if that input was already degraded, the confident answer deserves extra scrutiny.",
    },
    {
      id: "q8",
      question: "What is the best one-sentence takeaway about fairness in AI perception?",
      choices: [
        "AI perception is automatically fair to everyone because it's just math",
        "A perception system is only as fair as the range of people and conditions it was trained and tested on",
        "Fairness has nothing to do with training data",
        "Perception systems always work worse for everyone equally",
      ],
      correctIndex: 1,
      explanation:
        "This is the throughline of the whole lesson: perception quality (and fairness) is a direct reflection of what was included — and left out — during training and testing.",
    },
  ],
  reflection: {
    prompt:
      "Face unlock works great in daylight but fails in a dark room. Using what you learned about pixels, explain why in one or two sentences.",
    placeholder: "In the dark, the camera's pixel numbers change so much that…",
  },
};
