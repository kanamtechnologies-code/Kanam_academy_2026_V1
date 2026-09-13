import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt, choices, correctIndex, explanation,
});

export const digitalLesson4: AILessonConfig = {
  id: "dl-4",
  title: "4. Check It Before You Share",
  goal: "Pause on a claim in your feed. Use SIFT and a new tab to check who said it before you pass it on.",
  xpReward: 200,
  badge: "Claim Checker",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/3",
  nextHref: "/learn/digital/5",
  instructorScript: `**Coach's note**
Today's lesson: **Check It Before You Share**.

**Goal:** Pause on a claim in your feed. Use SIFT and a new tab to check who said it before you pass it on.

**How to facilitate**
1. Warm-up: ask "What is the last thing you almost shared because it felt urgent?" Keep the claim, not the rant.
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway — likes are not proof; open a new tab.
5. Artifact: students must submit the SIFT writeup before they can finish. It is saved on this device for review.

**Watch for:** "it looked official" and "everyone is sharing it." Push them to name a publisher and a source they opened.`,
  lessonModule: {
    durationLabel: "~25 min lesson",
    sections: [
      {
        id: "start",
        kicker: "Start here",
        title: "Your feed is not a fact-check",
        body: `A college rumor, a scholarship offer, and a news clip do not show up by accident. Apps rank what keeps you watching. They make sharing one tap. That is good for a real warning. It is also good for a fake deadline.\n\nYou do not have to distrust everything. You do have to **pause** before you pass it on.`,
        image: "/images/lessons/dl-4.png",
        imageAlt: "Multiple tabs used to check a digital claim",
      },
      {
        id: "claim",
        kicker: "The first split",
        title: "What is the actual claim?",
        body: `A **claim** is a sentence you can check. “This scholarship is guaranteed.” “This college changed its deadline.” Likes, ALL CAPS, a shiny logo, and that gut punch are not evidence.\n\nRewrite the post as a question: Who said this? What happened? When? What would prove it?`,
      },
      {
        id: "systems",
        kicker: "Why it spreads",
        title: "Apps reward what you tap",
        body: `Feeds often push what gets clicks: speed, shock, ads. That can lift good reporting. It can also lift outrage and fake offers.\n\nAsk two extra questions: Who makes money if I stay? Who gets left out if this design wins?`,
        checkIn: check(
          "Why can a post with a million shares still be wrong?",
          ["Viral posts are always official", "Algorithms remove all bias", "Sharing is a fact-check", "Apps can reward emotion more than accuracy"],
          3,
          "Reach is how far it traveled. It is not proof.",
        ),
      },
      {
        id: "stakes",
        kicker: "Why it matters",
        title: "A rumor can cost real people",
        body: `A fake college rumor can panic a class. A fake internship can steal time or a Social Security number. A twisted news clip can change how a neighborhood gets treated.\n\nThe same share button can help a friend — or spread a lie. That is why the pause is the skill.`,
      },
      {
        id: "sift",
        kicker: "The habit",
        title: "SIFT — four moves, not a vibe",
        body: `**Stop** before you react. **Investigate the source** — who made this, and what is their record? **Find better coverage** — open another outlet or an official page. **Trace** the quote, photo, or number back to where it first appeared.\n\nSIFT is a routine. It is not a sticker you slap on after a glance.`,
        image: "/images/lessons/dl-4-2.png",
        imageAlt: "Four tabs used to check a source",
        checkIn: check(
          "A screenshot says a college canceled admissions. What first?",
          ["Judge the font", "Share it to warn people", "Stop and find who made it before you act", "Trust the repost count"],
          2,
          "A pause keeps an unchecked claim from becoming a class-wide rumor.",
        ),
      },
      {
        id: "synthetic",
        kicker: "AI-made posts",
        title: "Fluent is not the same as found",
        body: `A generated post can look finished: clean grammar, a confident tone, a realistic photo. That is not evidence. It can invent a scholarship, misquote a college, or stick a real chart on the wrong year.\n\nRun the same SIFT. If you cannot find an original you can open, say **unverified** — even when it sounds professional.\n\n“Too fluent, no source” is a yellow flag. The test is still: who published it, and where is the proof?`,
        checkIn: check(
          "A polished post explains a new college rule but names no office, date, or official page. Best move?",
          ["Share it because the writing looks professional", "Ask a chatbot to rewrite it more confidently", "Treat it as unverified until you find an official or independent page", "Trust it if the image looks real"],
          2,
          "Pretty sentences are not a publisher.",
        ),
      },
      {
        id: "lateral",
        kicker: "New tabs",
        title: "Leave the page",
        body: `**Lateral reading** means you do not stay on the pretty page. Open new tabs. Search the organization. Look for independent reporting or an official record.\n\nStaying on one page and judging the design is weak proof that the publisher deserves trust.`,
        image: "/images/lessons/dl-4-3.png",
        imageAlt: "A claim compared with coverage in other tabs",
      },
      {
        id: "evidence",
        kicker: "The number or the photo",
        title: "Trace it to the original",
        body: `A real chart can still mislead if the date, the group measured, or the method is gone. A real photo can be old. A quote can drop the sentence that changes it.\n\nFind the original. Ask whether it actually supports *this* claim.`,
        checkIn: check(
          "A post uses a real chart but gives no date or source. What next?",
          ["Find the original chart and check date, method, and context", "Trust it if you already agree", "Share it with a disclaimer", "Treat the chart as proof"],
          0,
          "A chart needs a home and a date before it proves anything.",
        ),
      },
      {
        id: "bias",
        kicker: "Perspective",
        title: "Bias is not only an obvious lie",
        body: `Bias can be what gets left out: which people, which photos, which outcomes. It can be the headline that picks a villain.\n\nA biased source can still have a useful fact. Name its job, its audience, its evidence, and what is missing.`,
      },
      {
        id: "economics",
        kicker: "Who gets paid",
        title: "Someone may want your click",
        body: `Ads, subscriptions, creator pay, and data collection can fund useful news. They can also fund clickbait and fake “apply by midnight” scholarships.\n\nAsk what the publisher gains if you click, share, stay, or type your email.`,
      },
      {
        id: "case",
        kicker: "Try it",
        title: "“$10,000 guaranteed — apply tonight”",
        body: `Stop. Who is the organizer? What is the real domain? Do they want a fee or a Social Security number? Find official aid pages and independent coverage. Read the actual terms.\n\n“Unverified” is a complete answer. You do not have to call it true or false on the first pass.`,
        image: "/images/lessons/dl-4-4.png",
        imageAlt: "A scholarship claim checked against official sources",
        checkIn: check(
          "A scholarship post asks for a fee to unlock awards. What do you do?",
          ["Trust it because it looks polished", "Forward it to friends so they do not miss out", "Check the organizer, the terms, and official aid pages before you send any information", "Pay quickly so you do not miss the deadline"],
          2,
          "Money, a clock, and your personal info raise the bar. Check first.",
        ),
      },
      {
        id: "college",
        kicker: "Try it",
        title: "The group-chat college rumor",
        body: `A chat says a university is rejecting every out-of-state applicant. Search the admissions site. Find a dated announcement. Look for reporting that is not “a friend said.”\n\nIf you cannot confirm it, say that. A source beats winning the argument.`,
      },
      {
        id: "work",
        kicker: "First jobs",
        title: "The too-good job text",
        body: `A real employer can still be a bad fit. Compare the listing with the company’s own careers page: duties, pay, location, how to apply. Be extra careful with a DM you did not ask for, a request for ID, or “pay us to start.”\n\nSearch makes jobs easier to find. It also makes fake listings easy to spray.`,
      },
      {
        id: "participate",
        kicker: "What you do next",
        title: "You do not have to share it",
        body: `After you check, you might share a verified source, correct a post without dunking, report a scam, ask a question, or just not amplify it. Ask: who gets hurt if I am wrong?\n\nChecking is how you participate. It changes what the next person sees.`,
      },
      {
        id: "ready",
        kicker: "Remember this",
        title: "Trust should be earned",
        body: `Use SIFT. Open a new tab. Check source, date, context, and who gets paid. For college, money, news, and work — slow down.\n\nLikes are not a source.`,
        checkIn: check(
          "What is the most complete check of an online claim?",
          ["It is first in search", "Friends already believe it", "It has a lot of likes", "You checked the source, the evidence, the context, who benefits, and another page"],
          3,
          "Check the claim and the machine that pushed it to you.",
        ),
      },
    ],
  },
  bigIdeas: [
    "Feeds push what you tap — that is not a fact-check.",
    "**SIFT** and a **new tab** beat judging a page by how it looks.",
    "A number or photo needs a source, a date, and a fair context.",
    "College, money, news, and jobs need a slower check.",
    "AI writing can sound finished and still have no source you can open.",
  ],
  keyTerms: [
    { term: "Claim", definition: "A sentence you can check with evidence." },
    { term: "Lateral reading", definition: "Leaving the page to check the publisher in new tabs." },
    { term: "SIFT", definition: "Stop; Investigate the source; Find better coverage; Trace claims to the original." },
    { term: "Bias", definition: "A slant in what gets included, left out, or blamed." },
    { term: "Incentive", definition: "What a publisher or app gains if you click, stay, or share." },
    { term: "Context", definition: "Source, date, audience, and surrounding details that make evidence make sense." },
  ],
  realWorld: "A fake scholarship post can cost money, privacy, and time. Checking it protects you and anyone who would have trusted your share.",
  quiz: [
    {
      id: "q1",
      question: "Why are shares a poor measure of truth?",
      choices: ["Viral posts are official", "Likes are peer review", "Apps can reward emotion even when the claim is weak", "Feeds only show false content"],
      correctIndex: 2,
      explanation: "How far it traveled is not the same as whether it is true.",
    },
    {
      id: "q2",
      question: "First SIFT move for a shocking college rumor?",
      choices: ["Read only the comments", "Share it right away", "Trust the screenshot", "Stop before you react or amplify it"],
      correctIndex: 3,
      explanation: "The pause is what makes the rest of SIFT possible.",
    },
    {
      id: "q3",
      question: "What does leaving the page (lateral reading) require?",
      choices: ["Opening other sources to check the publisher and the claim", "Staring at the design longer", "Avoiding official sites", "Reading only the headline"],
      correctIndex: 0,
      explanation: "You check a source from outside its own story.",
    },
    {
      id: "q4",
      question: "A real chart has no source or date. What do you do?",
      choices: ["Trust it if it feels familiar", "Find the original and check method and date", "Treat it as proof", "Share it with an emoji"],
      correctIndex: 1,
      explanation: "Context decides whether the chart supports the claim.",
    },
    {
      id: "q5",
      question: "Why ask who gets paid from a scholarship ad?",
      choices: ["Official aid always costs a fee", "All ads are false", "Money replaces evidence", "A publisher may profit from clicks, data, fees, or panic"],
      correctIndex: 3,
      explanation: "Incentives explain the design. They do not settle the facts by themselves.",
    },
    {
      id: "q6",
      question: "Best response to an unverified high-stakes claim?",
      choices: ["Say it is unverified, look for an official page, and do not spread it", "Assume it is true", "Attack the poster", "Share it with a warning"],
      correctIndex: 0,
      explanation: "You can wait. Spreading it “just in case” still spreads it.",
    },
    {
      id: "q7",
      question: "What else should you notice besides the words in the post?",
      choices: ["Ignore who might get hurt", "How the app’s design and pay model help the claim travel", "Only the follower count", "Only the spelling"],
      correctIndex: 1,
      explanation: "The post rides a machine built to keep you tapping.",
    },
    {
      id: "q8",
      question: "Why can a fluent AI-written post still fail SIFT?",
      choices: ["Generated writing is always false", "Fluency does not name a publisher or an original you can open", "SIFT only applies to images", "AI posts cannot be shared"],
      correctIndex: 1,
      explanation: "SIFT asks who published it and where the proof is — not how polished it sounds.",
    },
  ],
  artifact: {
    title: "SIFT writeup",
    prompt: "Pick a **live page, post, or AI-generated claim** (college, scholarship, news, or work). Write a short SIFT note: the claim in one sentence; Stop (what you almost did); Investigate (who published it); Find better coverage (one independent or official source); Trace (quote, number, or image — or say you could not find an original). End with a verdict: verified, unverified, or misleading — and why.",
    placeholder: "Claim: … Stop: I almost shared it because … Investigate: The publisher is … Find: I opened … Trace: The number/image comes from … / I could not find an original. Verdict: unverified because …",
    minChars: 150,
    rubric: [
      "States a checkable claim, not just “it looked fake.”",
      "Uses at least three SIFT moves with a named source or a clear ‘could not find’.",
      "If the text or image could be AI-generated, says how fluency did or did not count as evidence.",
    ],
  },
};
