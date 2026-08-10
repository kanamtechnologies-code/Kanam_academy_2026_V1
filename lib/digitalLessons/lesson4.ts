import type { AILessonConfig } from "@/components/ai/AILessonCanvas";
const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({ prompt, choices, correctIndex, explanation });
export const digitalLesson4: AILessonConfig = {
  id: "dl-4", title: "4. Evaluating Claims in a Computing Culture",
  goal: "Evaluate how computing shapes personal, ethical, social, economic, and cultural information practices using lateral reading and SIFT.",
  xpReward: 200, badge: "Critical Evaluator", dashboardHref: "/dashboard", prevHref: "/learn/digital/3", nextHref: "/learn/digital/5",
  instructorScript: `**Coach's note**
Today's lesson: **Evaluating Claims in a Computing Culture**.

**Goal:** Evaluate how computing shapes personal, ethical, social, economic, and cultural information practices using lateral reading and SIFT.

**How to facilitate**
1. Warm-up: ask students what they already think about "Claims travel through systems built by people".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: { durationLabel: "~25 min lesson", sections: [
    { id: "start", kicker: "Start here", title: "Claims travel through systems built by people", body: `A college rumor, a scholarship offer, and a news clip do not reach your feed by accident. Platforms rank, recommend, monetize, and make sharing easy. Those design choices influence what people notice, trust, and pass on.\n\nYour task is not to distrust everything. It is to evaluate claims and the computing systems that shape their reach.`, image: "/images/lessons/dl-4.png", imageAlt: "Multiple tabs used to evaluate a digital claim" },
    { id: "claim", kicker: "Core concept", title: "Separate the claim from the reaction", body: `A **claim** is a statement that can be investigated. “This scholarship is guaranteed” and “this college changed its deadline” are claims. Likes, confidence, a polished logo, and a strong emotional reaction are not evidence.\n\nStart by rewriting a vague post into a checkable question: Who says this? What exactly happened? When? What evidence would confirm it?` },
    { id: "systems", kicker: "Computing culture", title: "Platforms shape information practices", body: `Recommendation systems often reward attention, engagement, speed, and advertising value. That can amplify useful reporting, but it can also amplify outrage, stereotypes, sensationalism, and deceptive offers.\n\nEvaluate the system as well as the post: Who benefits from this design? Whose voices or access might be reduced? What behavior does it encourage?`, checkIn: check("Why can a highly shared post still be unreliable?", ["Viral posts are always official", "Algorithms remove all bias", "Sharing is a formal fact-check", "Platforms can reward engagement and emotion rather than accuracy"], 3, "Reach measures distribution, not the quality of evidence.") },
    { id: "stakes", kicker: "Impact", title: "The stakes are personal and social", body: `A false college rumor can cause panic. A misleading internship listing can cost time or expose personal information. A distorted news narrative can affect how communities are treated.\n\nComputing affects information practices at personal, ethical, social, economic, and cultural levels. The same share button can support community knowledge or spread harmful falsehoods.` },
    { id: "sift", kicker: "Method", title: "Use SIFT for high-stakes claims", body: `**Stop** before reacting. **Investigate the source**: who created it and what is their record? **Find better coverage**: seek independent, relevant reporting. **Trace** key claims, quotes, images, and statistics to their original context.\n\nSIFT is a routine for judgment, not a label you apply after a quick glance.`, image: "/images/lessons/dl-4-2.png", imageAlt: "Four tabs used for source investigation", checkIn: check("A screenshot claims a college canceled admissions. What should happen first?", ["Judge its font", "Share it to warn people", "Stop and investigate who created it before acting", "Trust the number of reposts"], 2, "A pause prevents an unverified claim from becoming a larger problem.") },
    { id: "lateral", kicker: "Lateral reading", title: "Leave the page to evaluate the source", body: `**Lateral reading** means opening new tabs to investigate a source from outside the source’s own page. Search the organization, look for independent reporting, and locate official records or expertise.\n\nVertical reading—staying on a page and judging its design—can be useful for details, but it is weak evidence that the publisher deserves trust.`, image: "/images/lessons/dl-4-3.png", imageAlt: "Source claim compared with independent coverage" },
    { id: "evidence", kicker: "Evidence", title: "Trace claims to context", body: `A true statistic can be used misleadingly if its population, date, method, or limitation disappears. A real image can be old or used out of context. A quote can omit the sentence that changes its meaning.\n\nTrace evidence to its original source and ask whether it actually supports the claim being made.`, checkIn: check("A post uses a real chart but gives no date or source. What is the strongest next move?", ["Trace the chart to its original source and inspect context, method, and date", "Trust it if it matches your view", "Share it with a disclaimer", "Treat the chart as proof"], 0, "Evidence needs provenance and context before it can support a conclusion.") },
    { id: "bias", kicker: "Perspective", title: "Bias is not limited to obvious falsehoods", body: `Bias can appear through selection: which sources, examples, images, or communities are included or omitted. It can also appear through framing: what a headline emphasizes, who is portrayed as responsible, and which outcomes are treated as normal.\n\nEvaluate perspective without assuming every biased source is useless. Identify its purpose, audience, evidence, and missing context.` },
    { id: "economics", kicker: "Economics", title: "Incentives shape what gets amplified", body: `Ads, subscriptions, creator payments, and data collection can fund useful services. They can also reward clickbait, urgency, and attention harvesting. A “guaranteed scholarship” ad may be designed to collect leads or payments, not help students find aid.\n\nAsk what the publisher or platform gains if you click, share, stay, or provide information.` },
    { id: "case", kicker: "Case study", title: "Evaluate a scholarship claim", body: `A post promises “$10,000 guaranteed—apply before midnight.” Stop. Investigate the organizer, domain, eligibility rules, and whether it requests money or sensitive data. Find independent coverage and official financial-aid resources. Trace the offer to its published terms.\n\nA responsible conclusion may be “unverified” rather than immediately true or false. That is evidence-based judgment.`, image: "/images/lessons/dl-4-4.png", imageAlt: "Scholarship claim checked against official sources", checkIn: check("Which response best evaluates a scholarship claim that requests a fee to unlock awards?", ["Trust it because it looks polished. That option sounds confident, but it leaves out the deciding constraint", "It can seem like forward it to friends, but that reading skips the distinction this question is testing", "Check the organization, terms, official aid sources, and independent reporting before providing information", "Picking “Pay quickly before the deadline” is a common mix-up that confuses a nearby idea with the right one"], 2, "Money, deadlines, and personal information raise the evidence standard.") },
    { id: "college", kicker: "Case study", title: "Evaluate a college rumor", body: `A group chat says a university is rejecting all out-of-state applicants. Search the university admissions site, find dated announcements, and look for independent reporting. Trace the rumor’s source rather than repeating “a friend said.”\n\nIf the claim cannot be confirmed, say so clearly. Correcting a rumor with a source is more useful than winning an argument.` },
    { id: "work", kicker: "First jobs", title: "Evaluate opportunity claims", body: `A legitimate employer can still have a poor fit. Compare a listing with the employer’s official site, job duties, pay rules, location, and application process. Be especially cautious with unsolicited messages, requests for identity information, or pay-to-start offers.\n\nComputing systems make job discovery easier; they also make impersonation and mass targeting easier.` },
    { id: "participate", kicker: "Participate responsibly", title: "Choose a response, not just a verdict", body: `Depending on evidence, you might share a verified source, correct a misleading post respectfully, report a scam, ask a question, or choose not to amplify an unverified claim. Consider harm: who could be affected if you are wrong?\n\nCritical evaluation is a participation skill. It changes what a community sees next.` },
    { id: "ready", kicker: "Synthesize", title: "Trust should be earned", body: `Use SIFT and lateral reading to evaluate claims. Consider evidence, source, context, incentives, and the social impact of platform design. For college, scholarship, news, and work decisions, slow down enough to make a defensible judgment.`, checkIn: check("What is the most complete evaluation of an online claim?", ["It appears first in search", "It matches what friends believe", "Picking “It has many likes” is a common mix-up that confuses a nearby idea with the right one", "It considers source, evidence, context, incentives, independent coverage, and potential impact"], 3, "Computing culture requires evaluating both the information and the systems that distribute it.") },
  ] },
  bigIdeas: ["Computing systems shape what information is amplified, trusted, and shared.", "**SIFT** and **lateral reading** move evaluation beyond a page’s appearance.", "Evidence needs source, context, date, and a clear connection to the claim.", "High-stakes claims about college, scholarships, news, and jobs require stronger verification."],
  keyTerms: [{ term: "Claim", definition: "A statement that can be investigated using evidence." }, { term: "Lateral reading", definition: "Leaving a source to investigate it through independent tabs and coverage." }, { term: "SIFT", definition: "Stop; Investigate the source; Find better coverage; Trace claims to original context." }, { term: "Bias", definition: "A perspective that can shape selection, framing, and interpretation." }, { term: "Incentive", definition: "A benefit that may influence a platform or publisher’s choices." }, { term: "Context", definition: "Information such as source, date, audience, method, and surrounding details needed to interpret evidence." }],
  realWorld: "A misleading scholarship post can affect money, privacy, and opportunity. A careful evaluation protects both the individual and the people who might receive a reshare.",
  quiz: [
    { id: "q1", question: "Why can viral reach be a poor measure of truth?", choices: [
            "Viral posts are official",
            "Likes are peer review",
            "Engagement and emotion can be rewarded independently of evidence quality",
            "Platforms only show false content",
          ], correctIndex: 2, explanation: "Distribution is not the same as verification." },
    { id: "q2", question: "What is the first SIFT move for a shocking college rumor?", choices: [
            "Read comments only",
            "Share immediately",
            "Trust the screenshot",
            "Stop before reacting or amplifying it",
          ], correctIndex: 3, explanation: "Pausing creates space to investigate rather than spread an unverified claim." },
    { id: "q3", question: "What does lateral reading require?", choices: [
            "Opening independent sources to investigate the publisher and claim",
            "Studying the page design longer",
            "Avoiding official sources",
            "Only reading a headline",
          ], correctIndex: 0, explanation: "The method checks a source from outside its own framing." },
    { id: "q4", question: "A real chart has no source or date. What should you do?", choices: [
            "Trust it if familiar",
            "Trace it to original context and evaluate method and date",
            "Treat it as proof",
            "Share with an emoji",
          ], correctIndex: 1, explanation: "Context determines whether evidence supports the claim." },
    { id: "q5", question: "Why evaluate incentives behind a scholarship ad?", choices: [
            "Official aid requires fees",
            "All ads are false",
            "Incentives replace evidence",
            "A publisher may profit from clicks, data, fees, or urgency",
          ], correctIndex: 3, explanation: "Incentives help explain design choices but do not alone settle truth." },
    { id: "q6", question: "What is a responsible response to an unverified high-stakes claim?", choices: [
            "Say it is unverified, seek official evidence, and avoid spreading it",
            "Assume it is true",
            "Attack the poster",
            "Amplify it with a warning",
          ], correctIndex: 0, explanation: "A careful response reduces harm while evidence is gathered." },
    { id: "q7", question: "Which evaluation includes computing culture?", choices: [
            "Picking “Ignoring who may be harmed” is a common mix-up that confuses a nearby idea with the right one",
            "Considering how platform design, incentives, and sharing practices shape the claim’s reach and effects",
            "It can seem like counting followers, but that reading skips the distinction this question is testing",
            "Some learners answer “Only checking spelling”, yet that does not match the precise idea from the lesson",
          ], correctIndex: 1, explanation: "Claims are embedded in systems that influence attention and participation." },
  ],
  reflection: { prompt: "Choose a college, scholarship, news, or work claim you might encounter. Explain how you would use SIFT and lateral reading, then name one platform incentive or cultural effect you would evaluate.", placeholder: "For a scholarship post, I would investigate the organization, find official aid coverage, trace the terms, and consider whether urgency is designed to collect information…" },
};
