import type { AILessonConfig } from "@/components/ai/AILessonCanvas";

export const digitalLesson10: AILessonConfig = {
  id: "dl-10",
  title: "10. Intellectual Property: Innovation Tradeoffs & Credit",
  goal: "Explain beneficial and harmful effects of intellectual-property laws on innovation; evaluate copyright, Creative Commons, fair use, plagiarism, and crediting AI-assisted work.",
  xpReward: 500,
  badge: "IP Analyst",
  dashboardHref: "/dashboard",
  prevHref: "/learn/digital/9",
  nextHref: "/learn/digital/11",
  instructorScript: `**Coach's note**
Today's lesson: **Intellectual Property: Innovation Tradeoffs & Credit**.

**Goal:** Explain beneficial and harmful effects of intellectual-property laws on innovation; evaluate copyright, Creative Commons, fair use, plagiarism, and crediting AI-assisted work.

**How to facilitate**
1. Warm-up: ask students what they already think about "Who gets to build on an idea?".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: {
    durationLabel: "~25 min lesson",
    sections: [
      { id: "intro", kicker: "Start here", title: "Who gets to build on an idea?", body: `A song, an image, a game, a research paper, and an AI-assisted poster all raise the same question: who controls creative work, and what does society gain or lose from that control? Today you will analyze intellectual property as a set of tradeoffs—not a rule that always helps or always hurts.`, image: "/images/lessons/dl-10.png", imageAlt: "Creative works, licenses, and credit notes arranged around a scale", callout: { label: "Goal", text: "Use sources honestly while evaluating how rules affect creators, learners, and innovation." } },
      { id: "terms", kicker: "Vocabulary", title: "The basic distinctions", body: `**Copyright** gives creators legal control over original expression. A **license** gives others permission under stated conditions. **Creative Commons** provides standardized licenses. **Public domain** work is free for anyone to use. **Plagiarism** is presenting someone else's work or ideas as your own. It is an honesty issue; copyright infringement is a legal issue. They can overlap, but they are not identical.` },
      { id: "benefits", kicker: "Benefits", title: "Why IP protections can support innovation", body: `Copyright and related protections can reward people for investing time, skill, and money in music, books, software, film, and inventions. Control can help a creator earn income, choose how their work is used, and build a sustainable career. Clear licenses also make collaboration more predictable: a team knows what it can reuse and under what terms.\n\nWithout any protections, a large platform could copy a small creator's work immediately and capture the benefit.` },
      { id: "harms", kicker: "Costs", title: "How IP protections can also limit innovation", body: `Strong or complicated restrictions can make it expensive to learn from, remix, preserve, translate, or improve existing culture. Students, libraries, small creators, and researchers may lack time or money to locate rights holders. Rules can also lock communities out of materials they need, especially when access depends on expensive licenses.\n\nThe question is not “copyright good or bad?” It is whether a rule balances creator control with public learning, competition, and future creativity.` },
      { id: "tradeoff", kicker: "Evaluate", title: "Analyze the tradeoff, not just the rule", body: `Consider a photographer whose work is copied into an advertising campaign without permission. Protection can help them seek payment and control. Now consider a teacher who wants to quote a short excerpt to critique that campaign in class. A system with no exceptions could block learning and discussion.\n\nA defensible analysis names stakeholders, benefits, harms, alternatives, and who bears the cost.`, checkIn: { prompt: "Which statement best evaluates an IP tradeoff?", choices: [
            "“Credit is the only issue that matters” describes a different situation than the one in the question stem",
            "All sharing is always innovation — familiar wording, wrong fit for what the prompt is actually asking",
            "Protection can fund creators, but overly restrictive rules can limit education and follow-on creation",
            "All copying is always harmful. That option sounds confident, but it leaves out the deciding constraint",
          ], correctIndex: 2, explanation: "Tradeoff analysis considers both the incentive to create and access for later users." } },
      { id: "licenses", kicker: "Permission", title: "Read the license, not the vibe", body: `“Online” and “free download” do not automatically mean reusable. Check the specific terms. CC BY requires attribution. NC limits commercial use. ND limits adaptations. SA requires certain reuse under the same license. Public domain has different rules.\n\nA license can expand access while preserving conditions that matter to a creator. It is a practical middle ground between “all rights reserved” and “anything goes.”`, image: "/images/lessons/dl-10-2.png", imageAlt: "Creative Commons license conditions shown as permission choices" },
      { id: "fair-use", kicker: "Limited exception", title: "Fair use requires judgment", body: `Fair use can sometimes permit unlicensed use for purposes such as criticism, commentary, teaching, or parody. It is context-specific, not an automatic “school project” pass. Consider purpose, the kind of original work, how much is used, and whether the use substitutes for the original market.\n\nWhen uncertainty is high, choose a licensed alternative or ask a teacher, librarian, or rights holder. This lesson is not legal advice; it is a decision framework.`, checkIn: { prompt: "Which use is more likely to support a fair-use argument?", choices: ["Uploading a full movie as background entertainment", "Quoting a short passage while analyzing its argument", "Using a full song because the video is nonprofit", "Removing a watermark from a stock photo"], correctIndex: 1, explanation: "Focused quotation for analysis differs from using a full work as a substitute." } },
      { id: "plagiarism", kicker: "Academic integrity", title: "Credit documents your contribution", body: `Credit lets a reader distinguish your analysis from a source's language, evidence, image, code, or idea. Quote when exact wording matters; paraphrase in your own structure and cite the source; keep a source log while researching.\n\nAttribution does not automatically create permission, and permission does not excuse pretending someone else's work is yours. Responsible work handles both questions.` },
      { id: "ai", kicker: "AI-assisted work", title: "Disclose AI assistance honestly", body: `AI tools may generate text, images, code, or edits, but their output can be inaccurate, stereotyped, or derived from patterns in training data. Follow your school or organization's rules, check tool terms, and disclose meaningful assistance. Name what you used the tool for—brainstorming, outline feedback, image generation, or editing—and what you personally verified or created.\n\nDo not label an AI-generated image as a photograph you took. Transparency lets evaluators judge your process fairly.` },
      { id: "case", kicker: "Case study", title: "A student video has competing goals", body: `Jordan wants a recognizable song in a public scholarship video. The song makes the video emotionally effective, but a full unlicensed track risks removal and gives no payment or control to its creator. Jordan can license music, choose a CC or platform library track, create original audio, or revise the concept.\n\nThe best choice is not merely “add credit.” Jordan must evaluate permission, audience, cost, risk, and the creative impact of alternatives.`, image: "/images/lessons/dl-10-3.png", imageAlt: "A video editor comparing licensed music with a copyrighted song" },
      { id: "innovation", kicker: "Recommend", title: "Recommend a balanced policy", body: `Imagine your school publishes student art online. A balanced guideline might let students retain ownership, require permission before commercial reuse, make an opt-in showcase license clear, and allow classmates to quote or display small excerpts for critique with credit. This protects creators while preserving feedback and learning.\n\nA useful recommendation says whose interests it protects and what problem it avoids.` },
      { id: "workflow", kicker: "Workflow", title: "Use a source decision record", body: `For each outside asset, record: creator/source, license or permission, planned use, required credit, modifications, and where the credit appears. For AI assistance, record the tool, purpose, and verification. This small record makes collaboration, portfolio review, and revision far easier.` },
      { id: "stakeholders", kicker: "Stakeholders", title: "Name who is affected", body: `A licensing decision affects creators, audiences, classmates, platforms, libraries, and future innovators. Naming these groups makes a recommendation more rigorous than deciding only from the user's convenience.` },
      { id: "alternatives", kicker: "Compare options", title: "Alternatives can protect both goals", body: `Original work, licensed media, public-domain sources, or a smaller critical excerpt may each support a project differently. Compare quality, permission, cost, credit requirements, and effect on the original creator before choosing.` },
      { id: "ready", kicker: "Ready", title: "Analyze before you reuse", body: `Intellectual-property rules can support creators and investment while also creating barriers to access, remix, and future innovation. Responsible creators evaluate the tradeoff, read licenses, use fair use cautiously, credit accurately, and disclose AI assistance. That is stronger than treating credit as a final footnote.` },
    ],
  },
  bigIdeas: ["IP protections can reward creators and investment, but can also restrict access and follow-on innovation.", "Licenses, public domain, and narrow fair-use analysis determine whether reuse is appropriate.", "Crediting sources and disclosing AI assistance support honesty but do not replace permission."],
  keyTerms: [{ term: "Copyright", definition: "Legal control over original creative expression." }, { term: "License", definition: "Permission to use work under stated conditions." }, { term: "Creative Commons", definition: "Standard licenses that let creators share work with specific conditions." }, { term: "Fair use", definition: "A context-specific legal exception evaluated through several factors." }, { term: "Plagiarism", definition: "Presenting someone else's work or ideas as your own." }, { term: "Attribution", definition: "Clear credit identifying a source, creator, and relevant license." }, { term: "AI disclosure", definition: "A transparent note explaining meaningful use of an AI tool in creating or revising work." }],
  realWorld: "Whether you publish a video, build a portfolio, or launch a business, IP decisions affect your credibility, costs, ability to innovate, and relationships with other creators.",
  quiz: [
    { id: "q1", question: "How can copyright benefit innovation?", choices: [
            "It prevents all copying forever” belongs to a different situation than the one in the question stem",
            "It guarantees every work is free” belongs to a different situation than the one in the question stem",
            "It removes the need for licenses” belongs to a different situation than the one in the question stem",
            "It can help creators earn from work and invest in future creation",
          ], correctIndex: 3, explanation: "Control and potential income can support sustained creative work." },
    { id: "q2", question: "What is a possible cost of strict IP restrictions?", choices: [
            "They eliminate every creator's income” belongs to a different situation than the one in the question stem",
            "They make attribution impossible” belongs to a different situation than the one in the question stem",
            "They turn all work public domain” belongs to a different situation than the one in the question stem",
            "They can make learning, preservation, or remixing harder",
          ], correctIndex: 3, explanation: "Restrictions can reduce access and follow-on creation, especially for smaller institutions and creators." },
    { id: "q3", question: "What does CC BY require?", choices: [
            "No adaptations” belongs to a different situation than the one in the question stem",
            "Attribution to the creator",
            "No credit” belongs to a different situation than the one in the question stem",
            "Only noncommercial use",
          ], correctIndex: 1, explanation: "BY means attribution; other terms may add further limits." },
    { id: "q4", question: "Why is 'it's for school' not enough to prove fair use?", choices: [
            "Fair use is evaluated in context, including amount and market effect",
            "Credit always makes use fair” belongs to a different situation than the one in the question stem",
            "School work cannot cite sources” belongs to a different situation than the one in the question stem",
            "Students cannot make videos” belongs to a different situation than the one in the question stem",
          ], correctIndex: 0, explanation: "Purpose matters, but it is only one part of a contextual analysis." },
    { id: "q5", question: "Which action is most honest when AI generates a draft image for a project?", choices: [
            "Remove all credits” belongs to a different situation than the one in the question stem",
            "Assume tools have no terms” belongs to a different situation than the one in the question stem",
            "Claim you photographed it” belongs to a different situation than the one in the question stem",
            "Disclose the tool and your role in editing or verifying it",
          ], correctIndex: 3, explanation: "Transparent disclosure lets an audience understand the work's process." },
    { id: "q6", question: "Which recommendation best balances student-art ownership and learning?", choices: [
            "Students retain ownership, reuse terms are clear, and critique can quote small credited excerpts",
            "You might defend “All work must be hidden” in casual talk, but it fails the definition used here",
            "“No one may discuss or critique art” describes a different situation than the one in the question stem",
            "Anyone can commercialize student work without asking” belongs to a different situation than the one in the question stem",
          ], correctIndex: 0, explanation: "The guideline protects creators while allowing legitimate educational use." },
  ],
  reflection: { prompt: "Choose a media asset or AI tool you might use in a future project. What benefit does the relevant IP rule provide, what cost might it create, and what responsible choice would you make?", placeholder: "Example: A CC photo saves time and gives the artist credit, but I must follow its conditions and record the attribution..." },
};
