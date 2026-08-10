import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({
  prompt,
  choices,
  correctIndex,
  explanation,
});

export const apCspLesson13: AILessonConfig = {
  id: "csp-13",
  title: "13. Computing Innovations & Societal Impact",
  goal: "Analyze the beneficial and harmful effects of computing innovations, including the digital divide and algorithmic bias.",
  xpReward: 650,
  badge: "Impact Analyst",
  dashboardHref: "/dashboard",
  prevHref: "/learn/ap-csp-prep/12",
  nextHref: "/learn/ap-csp-prep/14",
  instructorScript: `**Coach's note**
Today's lesson: **Computing Innovations & Societal Impact**.

**Goal:** Analyze the beneficial and harmful effects of computing innovations, including the digital divide and algorithmic bias.

**How to facilitate**
1. Warm-up: ask students what they already think about "Every innovation cuts both ways".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~35–45 min lesson",
    sections: [
      {
        id: "intro",
        kicker: "Big Idea 5",
        title: "Every innovation cuts both ways",
        body: `Big Idea 5 (Impact of Computing) is 21–26% of the AP multiple-choice exam — the second-largest slice. Its central theme: **computing innovations have both beneficial and harmful effects**, and often the *same* innovation produces both, sometimes unintentionally. The exam rewards balanced, specific analysis over one-sided praise or panic.`,
      },
      {
        id: "innovation-def",
        kicker: "Definition",
        title: "What counts as a computing innovation",
        body: `A **computing innovation** includes any innovation that uses computing as a key part of its function — physical (self-driving cars), non-physical software (a recommendation algorithm), or non-physical concepts (e-commerce). It doesn't have to be new; it has to be *powered by* computing.

For the exam's written and MCQ items, you should be able to name an innovation's **purpose**, its **beneficial** effect, and a **harmful** effect — for a real or hypothetical example.`,
        code: `INNOVATION: ride-sharing app
  PURPOSE:    match riders with nearby drivers
  BENEFIT:    cheap, quick rides; income for drivers
  HARM/RISK:  surge pricing; gig-work instability

# memorize this 3-part shape for written responses
`,
        codeCaption: "The exam answer template: purpose + benefit + harm",
      },
      {
        id: "dual-effects",
        kicker: "Core idea",
        title: "Beneficial and harmful — often together",
        body: `A single innovation frequently has effects in both directions:

| Innovation | Beneficial effect | Harmful effect |
| --- | --- | --- |
| Social media | Connection, organizing, sharing | Misinformation, addiction, harassment |
| GPS navigation | Efficient travel, safety | Location tracking, privacy loss |
| Automation | Cheaper goods, safety in dangerous jobs | Job displacement |

The exam's best answers acknowledge that effects are **context-dependent** and can be unintended — a tool built to connect people can also spread false information at scale.`,
        code: `                 BENEFIT           |  HARM
-----------------------------------+---------------------------
social media  connect, organize    |  misinfo, addiction
GPS nav       fast, safe routes    |  location tracking
automation    cheaper, safer jobs  |  job displacement
# SAME innovation, effects on BOTH sides of the line`,
        codeCaption: "T-chart: one innovation usually lands on both sides",
        checkIn: check(
          "Which statement best reflects how AP CSP frames computing innovations?",
          [
            "Innovations are either entirely good or entirely bad",
            "A single innovation often has both beneficial and harmful effects, sometimes unintended",
            "Only hardware innovations have societal effects",
            "Harmful effects are always intended by the developers",
          ],
          1,
          "The framework emphasizes dual, often unintended effects that depend on context.",
        ),
      },
      {
        id: "unintended",
        kicker: "Consequences",
        title: "Intended vs. unintended effects",
        body: `The exam draws a sharp line between two kinds of effects, and strong answers name which is which:

- **Intended effect** — what the developers *planned* the innovation to do. Email was built to send messages; that's its intended effect.
- **Unintended effect (consequence)** — an outcome the creators did *not* plan or foresee. Email also enabled spam and phishing — nobody designed it for that.

Unintended effects can be positive *or* negative: SMS was meant for network technicians, but users unexpectedly turned it into a global messaging habit (a positive surprise), while the same connectivity enabled scam texts (a negative one). Developers can't foresee every use — an innovation released for one purpose may be repurposed, or produce side effects nobody planned.

Example: a fitness app publishing aggregate exercise routes accidentally revealed the locations of secret military bases. That was purely **unintended** — the intended effect was motivating exercise. The exam expects you to recognize that **good intentions don't prevent harm**, that an effect being unintended doesn't make it any less real, and that anticipating misuse is part of responsible design (Lesson 1's scope-fencing idea).`,
        code: `GOAL:    "share workout heat-maps" (helpful!)
   |
   v
DATA:    users' running routes, aggregated
   |
   v
UNPLANNED RESULT: soldiers' routes exposed secret bases
# good intent -> real harm nobody designed for`,
        codeCaption: "Unintended consequence: good intent doesn't prevent harm",
        checkIn: check(
          "A feature released to help users accidentally exposes sensitive information. AP CSP would classify this harm as:",
          [
            "an intended effect",
            "an unintended consequence of the innovation",
            "the digital divide",
            "a compression error",
          ],
          1,
          "Harm the creators did not plan for is an unintended consequence — good intentions don't prevent it.",
        ),
      },
      {
        id: "digital-divide",
        kicker: "Equity",
        title: "The digital divide",
        body: `The **digital divide** is the unequal access to computing and the Internet across groups — by income, geography (rural vs. urban), age, disability, or country. Those without reliable access are cut off from education, jobs, healthcare portals, and civic participation that increasingly assume connectivity.

A common exam trap is to think the divide is only about **owning a device**. It's much broader — even people *with* a device can be on the wrong side of the divide:

- **Bandwidth / connection quality.** A phone on a slow or capped data plan can't join a video class, upload assignments, or stream a telehealth visit. "Has internet" isn't the same as "has *usable* internet."
- **Digital literacy.** Knowing *how* to use technology — search effectively, spot scams, fill out an online form, manage privacy — is itself unevenly distributed, often affecting older adults and those with less schooling.
- **Language.** Most software, help pages, and content are in a handful of dominant languages; speakers of other languages get worse tools, fewer resources, and more errors.
- **Accessibility.** People with disabilities are excluded when software ignores screen readers, captions, or keyboard navigation.

The divide is shaped by **decisions and resources, not just individual choice**: infrastructure investment, device cost, affordable data, literacy programs, and language support all matter. Recognizing that access is unequal along *many* dimensions — and *why* — is a frequent exam theme.`,
        code: `The digital divide is MORE than "who owns a device":
  devices     newest phone/laptop   vs   old/shared/none
  bandwidth   fast broadband        vs   slow/capped data
  literacy    knows how to use it   vs   little support
  language    tools in your language vs  only in others
  access(a11y) works with a screen reader vs  unusable
# even WITH a device you can be on the wrong side`,
        codeCaption: "Digital divide spans devices, bandwidth, literacy, language, accessibility",
        checkIn: check(
          "The 'digital divide' refers to:",
          [
            "The gap between hardware and software",
            "Unequal access to computing and the Internet across different groups",
            "The difference between the Internet and the Web",
            "The delay in data transmission",
          ],
          1,
          "The digital divide is about unequal access to technology and connectivity across populations.",
        ),
      },
      {
        id: "bias-computing",
        kicker: "Fairness",
        title: "Bias in computing systems",
        body: `Building on Lesson 4, **bias** in a computing system often reflects bias in its **data** or **design**. Many modern systems *learn* from **training data** — examples they study to make future decisions — and here the rule is blunt: **a system learns whatever patterns are in its training data, including the unfair ones.** Bias in → bias out.

How training data creates biased systems:
- **Unrepresentative samples.** A face-recognition model trained mostly on light-skinned faces performs worse on darker skin tones — not by design, but because it saw far fewer examples of them (the sampling bias of Lesson 4, now baked into a product).
- **Historical bias inherited from the past.** A résumé-screening tool trained on a company's *past* hires learns to favor whoever was hired before. If past hiring discriminated, the model faithfully **reproduces and automates that discrimination** — and at massive scale.
- **Feedback loops.** A biased system's outputs become tomorrow's data (e.g., predictive policing sends more patrols to already-over-policed areas, generating more recorded incidents there), reinforcing the bias.

The crucial exam point: **this usually happens with no malicious intent.** Well-meaning developers can ship a biased system simply because their data was skewed. Because bias is *embedded* rather than obvious, catching it requires **deliberately testing outcomes across different groups**, not just checking overall accuracy — and fixing it may mean collecting better-balanced data.`,
        code: `biased/unrepresentative DATA
        |
        v
   trained SYSTEM
        |
        v
biased OUTPUT   (worse for under-represented groups)
# fix: test outcomes ACROSS diverse groups, not just overall`,
        codeCaption: "Bias in = bias out; no malice needed - test across groups to catch it",
        callout: {
          label: "On the AP exam",
          text: "Bias in software usually traces back to biased or unrepresentative training data or design choices — not necessarily malicious intent. Mitigation means testing across diverse groups.",
        },
      },
      {
        id: "crowdsourcing",
        kicker: "Collective",
        title: "Crowdsourcing and citizen science",
        body: `Computing enables **crowdsourcing** — obtaining input, ideas, or small contributions from many people, often online. It powers collaborative maps, product reviews, open encyclopedias, disaster-response reporting, funding (crowdfunding), and citizen-science projects that classify galaxies or track wildlife.

The exam wants **both sides**, just like any innovation:

**Benefits:**
- **Scale & speed** — a task too big for one team (classify a million photos, map every road) gets done fast by dividing it among thousands.
- **Diversity & reach** — contributors from many places and backgrounds bring local knowledge and varied perspectives.
- **Low cost & participation** — it democratizes who gets to contribute, tapping volunteers rather than paid experts.

**Quality risks:**
- **Accuracy / no vetting** — contributors vary in skill and care, so answers can be wrong; open content can be edited maliciously (vandalism) or by mistake.
- **Bias & representativeness** — *who participates* skews the result. If mostly one group contributes, the "crowd's" output reflects that group, not everyone (echoing the bias theme).
- **Coordination & malice** — spam, fake reviews, and coordinated manipulation can poison results without safeguards.

Good crowdsourcing systems add quality controls — voting, moderation, cross-checking multiple contributors — precisely because raw crowd input isn't automatically trustworthy.`,
        code: `ONE TASK: classify 1,000,000 wildlife photos
        split into tiny pieces
   /     |      |      |     \\
volunteer volunteer ... thousands online
        combine their answers

BENEFIT: huge task done fast, cheaply, by a diverse crowd
RISK:    answers vary in quality; WHO participates can skew it
FIX:     vote / moderate / cross-check multiple contributors`,
        codeCaption: "Crowdsourcing scales human effort - but needs quality control to be trusted",
        checkIn: check(
          "A citizen-science app asks thousands of volunteers to classify wildlife photos. This is an example of:",
          [
            "the digital divide",
            "crowdsourcing",
            "lossy compression",
            "a single point of failure",
          ],
          1,
          "Gathering many people's contributions online to accomplish a task is crowdsourcing.",
        ),
      },
      {
        id: "data-society",
        kicker: "Scale",
        title: "Big data: power and peril",
        body: `Massive data collection (Lesson 4) drives beneficial services — disease tracking, disaster response, personalized learning — but also enables large-scale surveillance and profiling. The same dataset that improves traffic flow can track individuals' movements.

The exam wants nuanced reasoning: identify *who benefits*, *who is put at risk*, and *what safeguards* (like consent or anonymization) change the balance. This bridges directly into Lesson 14's legal and ethical rules.`,
        code: `SAME phone-location dataset:
  WHO BENEFITS: commuters (less traffic), city planners
  WHO'S AT RISK: individuals (movements tracked)
  SAFEGUARDS:  consent, anonymize, delete after use
# balanced answer names all three, not just the upside`,
        codeCaption: "Big data: ask who benefits, who's at risk, what safeguards apply",
        checkIn: check(
          "A city uses phone-location data to reduce traffic jams. What is the most balanced AP-style analysis?",
          [
            "It is purely beneficial with no downsides",
            "It benefits commuters but risks privacy through location tracking, so safeguards matter",
            "It is purely harmful and should never be used",
            "It only affects the digital divide",
          ],
          1,
          "Balanced analysis names a benefit (less traffic) and a harm (privacy/tracking) and considers safeguards.",
        ),
      },
      {
        id: "global",
        kicker: "Worldwide",
        title: "Global and economic effects",
        body: `Computing reshapes economies and cultures worldwide: it creates new industries and jobs while automating others away, enables global collaboration, and spreads culture — sometimes eroding local languages or practices.

Effects differ by region and are entangled with the digital divide: the benefits of a global digital economy flow unevenly to those with access, infrastructure, and skills.`,
      },
      {
        id: "worked-example",
        kicker: "Worked example",
        title: "Analyzing an innovation like the exam",
        body: `Take **AI-powered translation apps**:
- **Purpose:** translate speech/text between languages in real time.
- **Beneficial:** breaks language barriers for travel, education, refugees.
- **Harmful/risk:** errors in high-stakes settings (medical, legal); may reduce incentive to learn languages; unequal quality across less-common languages (bias + digital divide).

A strong response names purpose, a benefit, a harm, *and* connects to a broader theme (equity/bias). That structure is exactly what AP written responses about innovations ask for.`,
        code: `AI translation app
  PURPOSE:  translate speech/text in real time
  BENEFIT:  breaks language barriers (travel, refugees)
  HARM:     costly errors in medical/legal settings
  THEME:    weaker for rare languages -> bias + digital divide
# purpose + benefit + harm + broader theme = full credit`,
        codeCaption: "Full-credit structure: purpose, benefit, harm, and a broader theme",
      },
      {
        id: "synthesis",
        kicker: "Synthesize",
        title: "You analyze impact with balance",
        body: `You can identify computing innovations, articulate paired beneficial and harmful (often unintended) effects, and explain the digital divide, algorithmic bias, crowdsourcing, and big data's societal stakes — the balanced reasoning Big Idea 5 rewards.

Next you'll turn impact into rules: the legal and ethical frameworks around intellectual property, privacy, and responsible computing.`,
      },
      {
        id: "exit",
        kicker: "Exit ticket",
        title: "Two effects of one innovation",
        body: `Choose a computing innovation you use. State its purpose, one beneficial effect, and one harmful or unintended effect. Then name one broader theme (bias, digital divide, privacy) it touches.`,
      },
    ],
  },
  bigIdeas: [
    "Computing innovations have **both beneficial and harmful effects** — often from the same innovation, and often unintended.",
    "The **digital divide** is unequal access to computing/Internet across groups, shaped by resources and decisions.",
    "**Bias** in systems typically reflects biased or unrepresentative data/design and requires testing across groups to detect.",
    "Big data and crowdsourcing scale human capability but raise privacy, quality, and equity concerns.",
  ],
  keyTerms: [
    { term: "Computing innovation", definition: "An innovation that uses computing as a key part of its function." },
    { term: "Unintended consequence", definition: "An effect of an innovation not foreseen or planned by its creators." },
    { term: "Digital divide", definition: "Unequal access to computing and the Internet across different groups." },
    { term: "Algorithmic bias", definition: "Systematic unfairness in a computing system, often from biased data or design." },
    { term: "Crowdsourcing", definition: "Obtaining input or contributions from a large number of people, often online." },
    { term: "Big data", definition: "Very large datasets enabling insight but raising privacy and surveillance concerns." },
  ],
  realWorld:
    "Debates over social media, facial recognition, and AI hiring tools are exactly these tensions — real benefits alongside real harms, unevenly distributed across society.",
  quiz: [
    {
      id: "q1",
      question: "Which is the most AP-appropriate way to analyze a computing innovation?",
      choices: [
            "List only its benefits",
            "Assume all effects were intended",
            "Focus only on its hardware",
            "Identify both beneficial and harmful effects, including unintended ones",
          ],
      correctIndex: 3,
      explanation: "Balanced analysis weighs benefits and harms, acknowledging unintended effects.",
    },
    {
      id: "q2",
      question: "A fitness app's public route data accidentally reveals sensitive locations. This is best described as a(n):",
      choices: [
        "intended feature",
        "unintended consequence",
        "digital divide",
        "syntax error",
      ],
      correctIndex: 1,
      explanation: "The harm was not planned by the developers — an unintended consequence.",
    },
    {
      id: "q3",
      question: "Rural communities with no broadband access can't use online job portals. This illustrates:",
      choices: ["the digital divide", "algorithmic bias", "crowdsourcing", "high latency"],
      correctIndex: 0,
      explanation: "Unequal access by geography is a classic digital-divide example.",
    },
    {
      id: "q4",
      question: "A facial-recognition system performs worse on some groups. The most likely root cause is:",
      choices: [
            "Too much bandwidth",
            "Using HTTPS",
            "Biased or unrepresentative training data/design",
            "Malicious developers",
          ],
      correctIndex: 2,
      explanation: "Unrepresentative data commonly produces biased performance, often without intent.",
    },
    {
      id: "q5",
      question: "Obtaining small contributions from many online participants to build a map is:",
      choices: ["crowdsourcing", "the digital divide", "packet switching", "a heuristic"],
      correctIndex: 0,
      explanation: "Gathering input from a large crowd, often online, is crowdsourcing.",
    },
    {
      id: "q6",
      question: "Which is a balanced statement about big-data health tracking?",
      choices: [
            "It only affects bandwidth",
            "It can improve public health but risks surveillance, so safeguards matter",
            "It has no privacy implications",
            "It is always harmful",
          ],
      correctIndex: 1,
      explanation: "It names a benefit and a risk and considers safeguards — balanced reasoning.",
    },
    {
      id: "q7",
      question: "The best way to detect bias in a computing system is to:",
      choices: [
            "Make it run faster",
            "Compress its data",
            "Test its performance across diverse groups",
            "Trust the developers' intentions",
          ],
      correctIndex: 2,
      explanation: "Bias is found by deliberately evaluating outcomes across different populations.",
    },
    {
      id: "q8",
      question: "A strong AP response about a computing innovation should include:",
      choices: [
            "Only its programming language",
            "Only the innovation's name",
            "Only its price",
            "Its purpose plus at least one beneficial and one harmful effect",
          ],
      correctIndex: 3,
      explanation: "Naming purpose with a benefit and a harm is the expected structure.",
    },
  ],
  reflection: {
    prompt:
      "AP written responses ask you to weigh a computing innovation's effects. Choose one, and write a balanced paragraph naming its purpose, a benefit, a harm, and one group disproportionately affected.",
    placeholder: "Innovation, purpose, benefit, harm, and who is most affected…",
  },
};
