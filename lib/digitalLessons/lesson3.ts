import type { AILessonConfig } from "@/components/ai/AILessonCanvas";
const check = (prompt: string, choices: string[], correctIndex: number, explanation: string) => ({ prompt, choices, correctIndex, explanation });
export const digitalLesson3: AILessonConfig = {
  id: "dl-3", title: "3. Networks & Finding Information Online",
  goal: "Describe routers, servers, and addressing at literacy depth, then search strategically and evaluate results for school, scholarships, internships, and work.",
  xpReward: 150, badge: "Network Navigator", dashboardHref: "/dashboard", prevHref: "/learn/digital/2", nextHref: "/learn/digital/4",
  instructorScript: `**Coach's note**
Today's lesson: **Networks & Finding Information Online**.

**Goal:** Describe routers, servers, and addressing at literacy depth, then search strategically and evaluate results for school, scholarships, internships, and work.

**How to facilitate**
1. Warm-up: ask students what they already think about "A search has a route and a strategy".
2. Walk the Lesson slides — pause on check-ins; let students answer before revealing.
3. Knowledge check: circulate; ask "why?" after each quiz item, not just the letter.
4. Close: one-sentence takeaway + how this shows up in real life.

**Watch for:** guessing from hype or headlines without using the lesson vocabulary. Push students back to the definitions and examples on the slides.`,
  lessonModule: { durationLabel: "~25 min lesson", sections: [
    { id: "start", kicker: "Start here", title: "A search has a route and a strategy", body: `Searching for an internship is not just typing keywords. Your request travels through local and wider networks to services that return ranked information. Then you must decide which results deserve attention.\n\nNetwork literacy explains the path; search fluency helps you evaluate the information that returns.`, image: "/images/lessons/dl-3.png", imageAlt: "Browser search connected through a network" },
    { id: "network", kicker: "Network basics", title: "Networks move requests and responses", body: `A **network** connects devices so they can exchange data. Your Chromebook is often a client: it requests a page or file. A **server** is a computer or service that responds. Data moves in small packets, not as one invisible object.\n\nThe internet is a network of networks. The web is one service that uses it.` },
    { id: "router", kicker: "Route", title: "Routers choose the next hop", body: `A **router** forwards packets toward their destination. Your home or school Wi-Fi connects a device to a local router; that is not the entire internet. Routers along the way use addressing information to forward traffic.\n\nA router does not need to understand your scholarship essay. It needs enough addressing information to send packets to the next useful location.`, checkIn: check("What does a router mainly do?", ["Ranks search results", "Writes your document", "Forwards data toward its destination using addressing information", "Stores every web page"], 2, "Routers move packets between networks; applications and servers handle the content.") },
    { id: "address", kicker: "Addressing", title: "Names and addresses support different jobs", body: `A domain name such as \`studentaid.gov\` is a human-readable name. Network services translate names into numeric addresses that devices use to reach a destination. A URL also identifies a particular resource or path.\n\nA familiar name can be imitated. For important tasks, inspect the domain rather than relying on a logo, an ad, or a screenshot.`, image: "/images/lessons/dl-3-2.png", imageAlt: "Browser address bar showing a domain and path" },
    { id: "server", kicker: "Servers", title: "Servers respond, but not all sources deserve trust", body: `A server can deliver a university page, a news article, a social post, or an ad. Successful delivery does not prove the claim is accurate. Network access and information quality are separate questions.\n\nThis distinction matters: a polished page can load perfectly while still being outdated, biased, or misleading.` },
    { id: "diagnose", kicker: "Diagnose", title: "Use symptoms to locate a network issue", body: `If one site fails but other sites load, test the site or browser before blaming Wi-Fi. If all devices on one Wi-Fi fail while cellular data works, investigate the local network or its internet connection. If only one device fails, inspect that device’s settings.\n\nCompare what works before resetting anything.`, checkIn: check("Every device on school Wi-Fi cannot reach websites, but phones on cellular data can. What is the strongest hypothesis?", ["One student’s browser is broken", "The school’s local network or its connection is the likely layer to investigate", "The keyboard caused it", "Every server on the internet failed"], 1, "The pattern isolates the problem to devices using the same local network.") },
    { id: "search", kicker: "Search strategy", title: "Turn a task into a query", body: `Search engines crawl, index, and rank material before you search. A strong query uses precise concepts, context, and constraints. For example, \`high school summer internship Chicago 2026\` is more actionable than “good jobs for teens.”\n\nSearch is iterative: form a query, inspect results, revise based on what is missing or noisy.` },
    { id: "operators", kicker: "Precision", title: "Use operators and filters with a purpose", body: `Quotes target an exact phrase; \`site:\` narrows to a domain; \`filetype:pdf\` locates documents; date filters reduce stale results. These tools improve relevance, but they do not automatically make a source credible.\n\nFor a financial-aid question, \`site:studentaid.gov\` has a clear rationale. For a college’s deadline, use the college’s own domain.`, image: "/images/lessons/dl-3-3.png", imageAlt: "Search query using site and date filters", checkIn: check("You need the current application deadline from a specific college. Which query best fits?", ["college deadline -college", "free scholarship now", "college deadline", "\"application deadline\" site:college.edu"], 3, "A precise phrase plus the institution’s domain targets the authoritative source for that task.") },
    { id: "ranking", kicker: "Evaluate", title: "Ranking is not a trust score", body: `Results may include sponsored placements, optimized pages, AI summaries, official sources, and personal commentary. Top placement can reflect payment, popularity, relevance signals, or freshness—not truth.\n\nBefore using a result, ask who published it, when it was updated, what evidence it gives, and whether it directly answers the question.` },
    { id: "lateral", kicker: "Cross-check", title: "Search beyond the first result", body: `For a scholarship claim, search the claim and the organization separately. For an internship, locate the employer’s own careers page and compare it with the listing. For research, seek sources with relevant expertise and trace key claims to evidence.\n\nSearching strategically means choosing what to verify, not merely collecting links.`, checkIn: check("A sponsored result promises a guaranteed scholarship for an upfront fee. What is the best response?", ["Share it immediately. That option sounds confident, but it leaves out the deciding constraint", "Assume every ad is government-run", "Pay because it ranks first", "Treat it as a claim to verify through official aid sources and the organization’s reputation"], 3, "Sponsored placement is advertising; high-stakes claims need independent verification.") },
    { id: "case", kicker: "Case study", title: "Find an internship lead you can defend", body: `Start with a specific query and recent date filter. Scan results for employer, government, school, or established nonprofit sources. Open the organization’s official careers page, confirm eligibility and deadline, and compare contact details.\n\nThis process is slower than clicking an ad, but it reduces the chance of chasing expired, deceptive, or irrelevant listings.`, image: "/images/lessons/dl-3-4.png", imageAlt: "Search results evaluated for source and date" },
    { id: "privacy", kicker: "Network awareness", title: "Convenience has information consequences", body: `Networks make applications, search, and collaboration possible. They also create records of requests, accounts, and sharing choices. Use official domains for sensitive forms, avoid entering personal information through random links, and understand that a secure-looking connection alone does not prove a site is legitimate.` },
    { id: "routine", kicker: "Decision routine", title: "Route, query, evaluate, verify", body: `First, understand the path: device, local network, routers, server. Then search deliberately: precise terms, appropriate domain or date constraints, result evaluation, and cross-checking.\n\nIf the result is high-stakes—college, money, health, or work—raise the evidence standard.` },
    { id: "ready", kicker: "Synthesize", title: "Navigate with evidence", body: `Networks deliver information through clients, routers, addresses, and servers. Search fluency decides whether returned information is useful and credible. Use both models when a task matters.`, checkIn: check("What distinguishes strategic search from merely typing keywords?", ["It always uses the longest query", "It only searches one site", "It uses task-specific constraints, evaluates sources, and verifies high-stakes claims", "It trusts the top result"], 2, "Strategic searching combines precision with evidence-based evaluation.") },
  ] },
  bigIdeas: ["Clients request services; **routers** forward packets; **servers** respond.", "Names, addresses, and URLs help requests reach a destination, but delivery does not prove credibility.", "Use precise queries, operators, and filters to improve relevance.", "Evaluate ranking, source, date, evidence, and independent coverage before acting."],
  keyTerms: [{ term: "Router", definition: "A network device that forwards packets toward their destination." }, { term: "Server", definition: "A computer or service that responds to requests from other devices." }, { term: "Domain", definition: "A human-readable internet name, such as a school or organization’s web address." }, { term: "URL", definition: "A web address that identifies a resource and often a path within a site." }, { term: "Search operator", definition: "Syntax such as site: or quotes that narrows search results." }, { term: "Sponsored result", definition: "A paid placement in search results, not a guarantee of quality or accuracy." }],
  realWorld: "A college deadline search requires both network awareness—reaching the right service—and source evaluation—confirming the deadline on the college’s official site.",
  quiz: [
    { id: "q1", question: "What is a router’s main role?", choices: [
            "Rank every webpage",
            "Write documents",
            "Create scholarship rules",
            "Forward packets toward destinations",
          ], correctIndex: 3, explanation: "Routers move packets between networks using addressing information." },
    { id: "q2", question: "Why inspect a domain for a college application page?", choices: [
            "A domain determines screen size",
            "It guarantees a claim is true",
            "It helps confirm which organization controls the site",
            "It replaces a password",
          ], correctIndex: 2, explanation: "Domains help identify the source, though claims still need evaluation." },
    { id: "q3", question: "All school Wi-Fi devices fail while cellular devices work. What should be investigated?", choices: [
            "Every internet server",
            "The student’s keyboard",
            "One app only",
            "The local network or its wider connection",
          ], correctIndex: 3, explanation: "The shared Wi-Fi pattern narrows the likely layer." },
    { id: "q4", question: "Which search is strongest for a college’s current deadline?", choices: [
            "college deadline -college",
            "college deadline",
            "deadline free money",
            "\"application deadline\" site:college.edu",
          ], correctIndex: 3, explanation: "It targets the official source and a specific phrase." },
    { id: "q5", question: "A result is first and labeled Sponsored. What can you conclude?", choices: [
            "It is paid placement and should still be evaluated",
            "It is an official source",
            "It is false",
            "It is fact-checked",
          ], correctIndex: 0, explanation: "Advertising status alone neither proves nor disproves a claim." },
    { id: "q6", question: "What should follow a promising internship result?", choices: [
            "Confirm details on the employer’s official site and compare sources",
            "Ignore dates",
            "Submit personal information immediately",
            "Trust the snippet",
          ], correctIndex: 0, explanation: "Verification reduces risk from stale or deceptive listings." },
  ],
  reflection: { prompt: "Choose a real question about school, a scholarship, an internship, or a first job. Write a strategic query, explain one network component involved in reaching a result, and name how you will verify the best source.", placeholder: "I will search \"summer internship\" [city] 2026, then confirm a lead on the employer’s careers domain…" },
};
