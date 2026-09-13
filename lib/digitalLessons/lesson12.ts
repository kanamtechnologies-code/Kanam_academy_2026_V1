import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt, choices, correctIndex, explanation,
});

export const digitalLesson12: AILessonConfig = {
  id: "dl-12",
  title: "12. What Apps Collect About You",
  goal: "See what an app can take without you typing it, decide if that is fair, and treat an AI paste box like a share setting.",
  xpReward: 600,
  badge: "Privacy Smart",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/11",
  nextHref: "/learn/digital/13",
  instructorScript: `**Coach's note**
Today's lesson: **What Apps Collect About You**.

**Goal:** See what an app can take without you typing it, decide if that is fair, and treat an AI paste box like a share setting.

**How to facilitate**
1. Warm-up: ask "What is the last app that asked for your location — and did you actually need to share it?" Keep it concrete. Do not start with hidden-collection vocabulary.
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway — if you would not email it to a stranger, do not paste it.
5. Watch the AI paste slide: students should treat the box like a share setting, not a scratch pad.

**Watch for:** "I have nothing to hide" and "it is free, so it is fine." Push them to name one thing an app can take without a typed profile, and whether that is a real choice.`,
  lessonModule: {
    durationLabel: "~25 min lesson",
    sections: [
      {
        id: "start",
        kicker: "Start here",
        title: "You never typed a profile. The app still knows you.",
        body: `A phone app can take location, a device ID, who you call, and how you tap — even when you never fill out a form.\n\nSome of that helps: a maps app needs to know where you are. Some of it is just the app (or the ads inside it) building a file on you.\n\nToday you learn what can be taken without you typing it, decide if that is fair, and treat an AI paste box like a share setting.`,
        image: "/images/lessons/dl-12.png",
        imageAlt: "Phone permissions and data flows shown around a user",
        callout: { label: "The first question", text: "Did you type this, or did the app take it while you were doing something else?" },
      },
      {
        id: "metadata",
        kicker: "The extra layer",
        title: "The photo is not the only thing in the photo",
        body: `**Metadata** is data about data. A picture can carry the time, the place, and what phone took it. A message can carry who you sent it to and when — even if nobody reads the words.\n\nA single piece can look harmless. Time plus location plus a device ID can show where you sleep, who you hang out with, or when you are never home.`,
      },
      {
        id: "hidden",
        kicker: "Collection you do not see",
        title: "A lot of it happens in the background",
        body: `You may never notice cookies, extra code sitting inside an app, a fingerprint of your device, or a "Sign in with…" button that ties two accounts together.\n\nA privacy page may exist and still be too long, too vague, or timed so you tap Agree just to get in.\n\nThat is why "I clicked yes" is not always a real choice.`,
      },
      {
        id: "combine",
        kicker: "Why it adds up",
        title: "Pieces together make a profile",
        body: `Location by itself is one fact. Location plus browsing plus a device ID can look like a schedule, a friend group, or a health guess.\n\nThe guess can be wrong and still get used — for an ad, a price, or a school decision.\n\nPeople with fewer options often cannot opt out. The "free" app may be the only one they can use.`,
        checkIn: check(
          "Why can location, a device ID, and browsing together be more sensitive than any one item?",
          [
            "It makes an app smaller",
            "Together they can show routines and identity that each piece alone may not",
            "It stops targeted ads",
            "The data deletes itself",
          ],
          1,
          "Linked records can build a detailed file even without a name field.",
        ),
      },
      {
        id: "free",
        kicker: "Who pays",
        title: "A free app is often paid with data",
        body: `Many free tools run on ads, data sharing, or both. You get the app. They get a file they can sell, target, or keep.\n\nA paid app is not automatically private. Ask what is collected, who gets it, and whether you have a real other option.\n\nIf the only way to use a school tool is to share extra data, that is not a free choice. That is a squeeze.`,
      },
      {
        id: "consent",
        kicker: "A real yes",
        title: "Consent has to be a real choice",
        body: `A permission pop-up can help. A real choice needs clear words, a real alternative, and a way to change your mind later.\n\n"Share location always or lose the whole app" pushes people to overshare. A better design asks for the smallest access that still does the job — and asks at the moment you need the feature, not on first open.`,
        image: "/images/lessons/dl-12-2.png",
        imageAlt: "An app requesting only the permissions needed for its feature",
      },
      {
        id: "minimize",
        kicker: "Ask for less",
        title: "Only the data the feature needs",
        body: `A maps app can ask for location while it is giving directions — not all day in the background. A flashlight does not need your contacts.\n\n**Collect less. Keep it for less time. Let fewer people see it.** That is the habit for a school, a job, or your own phone.\n\nIf you cannot explain why a field is needed, cut it.`,
      },
      {
        id: "case",
        kicker: "Try it",
        title: "The school wellness app",
        body: `A school wants an app where students log mood, sleep, location, and contacts. Mood and sleep might help a counselor reach someone. Precise location and a contact list may not be needed — and they can expose a lot.\n\nA fairer plan: say the support goal, take only the fields that serve it, make it optional when you can, lock the data, delete it on a short schedule, explain who gets a referral, and let students see and fix their own notes.`,
        image: "/images/lessons/dl-12-3.png",
        imageAlt: "Students evaluating a privacy-focused wellness app proposal",
      },
      {
        id: "safety",
        kicker: "Safety too",
        title: "Safety does not have to mean watching everyone",
        body: `Schools and apps may want data for emergencies, fraud, or a legal rule. Those can be real needs.\n\nKeeping every student's location forever, for any future use, is not the same as an emergency check-in that gets deleted.\n\nA fair plan names the purpose, takes less, limits who can open it, and lets someone ask questions. The law is a floor. Fair is a higher bar.`,
        checkIn: check(
          "Which school safety plan is fairest?",
          [
            "Collect only emergency check-in data, limit who sees it and how long it stays, and say why",
            "Keep every student's location forever for any future use",
            "Post student records where anyone can search them",
            "Ignore safety and collect nothing, even in an emergency",
          ],
          0,
          "A real need can still use a small, time-limited ask — not a forever file.",
        ),
      },
      {
        id: "ai-paste",
        kicker: "AI and collection",
        title: "What you paste can leave the room",
        body: `An AI chat is another collection path. Pasting a classmate's essay, a family medical note, a workplace spreadsheet, or a school login into a tool can send that text to a company that stores, reviews, or uses it to improve models — unless the product and your school clearly say otherwise.\n\nTreat the paste box like a share setting: **if you would not email this to a stranger, do not paste it.** Use a dummy example, strip names, or do the work in a school-approved tool. How models train is the AI Literacy track. Here the privacy question is simpler: collection includes what *you* volunteer to a generator.`,
        checkIn: check(
          "You want help rewriting a recommendation letter that includes a student's full name, GPA, and home address. What is the most privacy-aware move?",
          [
            "Paste the whole letter so the tool has full context",
            "Paste only a dummy version with names and numbers removed, or use a school-approved tool",
            "Paste it, then ask the tool to 'forget' the address",
            "Share the original file link with 'anyone can edit'",
          ],
          1,
          "A paste box is a collection event. Minimize what leaves the room, or use a tool your school actually approved.",
        ),
      },
      {
        id: "access",
        kicker: "After it is collected",
        title: "Who can see it — and for how long?",
        body: `Collection is step one. Then someone stores it, shares it, or guesses from it.\n\nAsk: who can open this? Can I see my own file and fix a mistake? When does it get deleted?\n\nA system with no way to challenge a wrong guess is a problem — especially when that guess affects a grade, a job, or who gets help.`,
      },
      {
        id: "personal",
        kicker: "On your phone",
        title: "Turn off what the feature does not need",
        body: `Open one app. Check permissions, the privacy label, ad settings, and account recovery. Keep access that the feature you use actually needs. Revoke the rest.\n\nOn a shared device, sign out. Do not leave a school login or a health note sitting in a shared profile.\n\nYour settings will not fix every company. They still cut what you give away for free.`,
      },
      {
        id: "ask",
        kicker: "A short list",
        title: "Six questions before you say yes",
        body: `What is collected? What job actually needs it? Who benefits, and who takes the risk? Is there a smaller ask? Who can see, share, fix, or delete it? How long does it stay?\n\nThen pick a move: keep the feature, cut the extra field, use a dummy paste, or say no. "I do not like tracking" is a start. A stronger answer names the extra data and a smaller option.`,
      },
      {
        id: "ready",
        kicker: "Remember this",
        title: "If you would not email it, do not paste it",
        body: `Apps can take data you never typed. Metadata and background collection add up. Free often means paid with a file on you.\n\nAsk for less. Make yes a real choice. Treat an AI box like a share setting.\n\nThe wellness-app test: take only what the support goal needs — not location and contacts "just in case."`,
        checkIn: check(
          "What is the most complete way to judge an app's collection?",
          [
            "It is free, so it must be fine",
            "You already tapped Agree",
            "The logo looks official",
            "You checked what it takes, why, who sees it, how long it stays, and whether you had a real choice",
          ],
          3,
          "A tap is not the whole story. Purpose, size of the ask, and a real alternative matter.",
        ),
      },
    ],
  },
  bigIdeas: [
    "Apps can take location, IDs, and patterns even when you never type a profile.",
    "**Metadata** and background collection can add up to a detailed file.",
    "A free app is often paid with data. A real yes needs a real alternative.",
    "Take only what the feature needs. Treat an AI paste box like a share setting.",
  ],
  keyTerms: [
    { term: "Automated collection", definition: "Software taking data through an app, site, or device — not a person asking you out loud." },
    { term: "Hidden collection", definition: "Data gathering that is hard to notice at the time — cookies, extra app code, device fingerprints, linked logins." },
    { term: "Metadata", definition: "Data about other data, such as the time and location attached to a photo." },
    { term: "Data minimization", definition: "Collecting only the information needed for a specific job." },
    { term: "Meaningful consent", definition: "A clear, voluntary choice with a real way to say no or change it later." },
    { term: "Retention", definition: "How long an organization keeps the data it collected." },
  ],
  realWorld: "A school wellness app, a free social app, and an AI paste box can all take more than you meant to give. Ask for less, and do not paste a real name or address into a public chat.",
  quiz: [
    {
      id: "q1",
      question: "Why is collection you do not see a privacy problem?",
      choices: [
        "It is always illegal",
        "It blocks every useful feature",
        "People may not see how software links their activity across apps",
        "It only happens on paper",
      ],
      correctIndex: 2,
      explanation: "If you cannot see the take, you cannot make a real choice.",
    },
    {
      id: "q2",
      question: "What is metadata?",
      choices: [
        "The caption you typed under a photo",
        "Data about data — like time, place, and device on a photo",
        "A password manager",
        "Only the pixels in the picture",
      ],
      correctIndex: 1,
      explanation: "The extra layer can reveal a routine even if the picture looks ordinary.",
    },
    {
      id: "q3",
      question: "Which is an example of collecting only what the feature needs?",
      choices: [
        "Keeping all student data forever",
        "Sharing every record with advertisers",
        "A maps app asking for location only while it is giving directions",
        "A flashlight app collecting contacts forever",
      ],
      correctIndex: 2,
      explanation: "The ask matches the job and the moment.",
    },
    {
      id: "q4",
      question: "What money question should you ask about a free app?",
      choices: [
        "What data or attention pays for it, and do you have a real other option?",
        "Can it delete every ad?",
        "Does it use any code?",
        "What color is its logo?",
      ],
      correctIndex: 0,
      explanation: "Free often means you pay with a file on you.",
    },
    {
      id: "q5",
      question: "Which wellness-app plan is fairest to students?",
      choices: [
        "Collect location and contacts by default",
        "Collect only needed data, explain the use, lock it, delete it on a schedule, and let students fix it",
        "Sell records to cover costs with no notice",
        "Make every mood entry public",
      ],
      correctIndex: 1,
      explanation: "Take less, say why, lock it, and let people correct it.",
    },
    {
      id: "q6",
      question: "When is \"I clicked Agree\" not a real choice?",
      choices: [
        "When the words are clear and you can change your mind",
        "When the only other option is lose the whole app or the school tool",
        "When you read the short explanation",
        "When the feature asks at the moment you need it",
      ],
      correctIndex: 1,
      explanation: "A squeeze is not consent. You need a real alternative.",
    },
    {
      id: "q7",
      question: "Why is pasting a real recommendation letter with a home address into a public AI chat a privacy problem?",
      choices: [
        "AI tools cannot read addresses",
        "The paste can send personal data to a service that stores or reuses it",
        "Recommendation letters are never sensitive",
        "Only photos count as collection",
      ],
      correctIndex: 1,
      explanation: "What you volunteer to a generator is still collection. Cut names or use an approved tool.",
    },
  ],
};
