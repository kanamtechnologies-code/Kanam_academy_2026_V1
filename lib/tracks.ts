export type LessonRow = {
  id: string;
  title: string;
  href?: string;
  xp: number;
  badgeName: string;
  badgeIcon: string;
  comingSoon?: boolean;
  /** 1–8: which week of the 8-week program this lesson belongs to. */
  week: number;
  /** Session number within the week (1 = first session, 2 = second). */
  session: number;
  /**
   * When true, this lesson opens with a guided teaching module ("Lesson") before
   * the hands-on activity. The dashboard surfaces a separate Lesson + Activity entry.
   */
  hasLesson?: boolean;
  /** End-of-track practice tests / finals (gated separately from weekly lessons). */
  kind?: "lesson" | "assessment";
};

export type WeekPlan = {
  week: number;
  theme: string;
  focus: string;
};

export type Track = {
  id:
    | "ai-python"
    | "data-analyst"
    | "ai-literacy"
    | "advanced-ai"
    | "ap-csp-prep"
    | "digital-literacy"
    | "cybersecurity"
    | "financial-literacy";
  title: string;
  subtitle: string;
  /** Short learner-facing promise — used to distinguish paths without color. */
  outcome: string;
  icon: string;
  lessons: LessonRow[];
};

/** Previously required before Data Analyst unlocked; kept for docs/reference only. */
export const DATA_ANALYST_PREREQUISITES = ["lesson-1", "lesson-2", "lesson-3"] as const;

/**
 * Data Analyst is open to everyone (no Python prerequisite gate).
 * @deprecated Env flag no longer gates the track; always treated as unlocked.
 */
export const DATA_ANALYST_UNLOCK_FOR_TESTING =
  process.env.NEXT_PUBLIC_DATA_ANALYST_UNLOCK_FOR_TESTING === "true";

/** Data Analyst track is always available. */
export function isDataAnalystTrackUnlocked(): boolean {
  return true;
}

/** Human label for a lesson's place in the 8-week program. */
export function weekSessionLabel(lesson: Pick<LessonRow, "week" | "session">) {
  return `Week ${lesson.week} · Session ${lesson.session}`;
}

/** @deprecated Use {@link weekSessionLabel} with the lesson's explicit week/session. */
export function weekSessionLabelFromIndex(idx: number) {
  const week = Math.floor(idx / 2) + 1;
  const session = (idx % 2) + 1;
  return `Week ${week} · Session ${session}`;
}

export function trackProgress(
  completedIds: string[],
  lessons: LessonRow[],
  options?: { openLessonIds?: Set<string> | null; includeAssessments?: boolean }
) {
  const openLessonIds = options?.openLessonIds;
  const includeAssessments = options?.includeAssessments ?? false;
  const scoped = includeAssessments
    ? lessons
    : lessons.filter((l) => l.kind !== "assessment");
  const availableLessons =
    openLessonIds == null
      ? scoped
      : scoped.filter((l) => openLessonIds.has(l.id) || completedIds.includes(l.id));

  const completedCount = availableLessons.filter((l) => completedIds.includes(l.id)).length;
  const totalCount = availableLessons.length;
  const percent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
  const totalXp = lessons
    .filter((l) => completedIds.includes(l.id))
    .reduce((sum, l) => sum + l.xp, 0);
  const activeIndex = availableLessons.findIndex(
    (l) => !completedIds.includes(l.id) && !l.comingSoon
  );
  const nextLesson = activeIndex >= 0 ? availableLessons[activeIndex] : undefined;
  return { completedCount, totalCount, percent, totalXp, activeIndex, nextLesson };
}

/** Flat catalog of every lesson across all tracks. */
export function allCatalogLessons(): Array<LessonRow & { trackId: Track["id"]; trackTitle: string }> {
  return TRACKS.flatMap((track) =>
    track.lessons.map((lesson) => ({
      ...lesson,
      trackId: track.id,
      trackTitle: track.title,
    }))
  );
}

/**
 * True when a lesson is open for this student.
 * Restricted by instructor assignments and/or billing entitlements.
 */
export function isLessonOpenForStudent(
  lessonId: string,
  classRestricted: boolean,
  enabledLessonIds: string[] | null,
  completedIds: string[],
  entitlementRestricted = false
): boolean {
  const restricted = classRestricted || entitlementRestricted;
  if (!restricted) return true;
  if (completedIds.includes(lessonId)) return true;
  return (enabledLessonIds ?? []).includes(lessonId);
}

export const PYTHON_WEEKS: WeekPlan[] = [
  { week: 1, theme: "Meet Your AI Helper", focus: "Output, variables, and input — your AI says hello and listens." },
  { week: 2, theme: "Teaching AI to Decide", focus: "Conditionals: if / else and chained if / elif / else rules." },
  { week: 3, theme: "Repeating Work", focus: "for loops and combining a loop with a rule to make patterns." },
  { week: 4, theme: "Patterns & State", focus: "Loops that build up a value (counters/accumulators) + a checkpoint review." },
  { week: 5, theme: "Giving AI a Memory", focus: "Lists and dictionaries — storing many values and looking them up by name." },
  { week: 6, theme: "Reusable Skills", focus: "Functions and parameters — package a skill once, reuse it everywhere." },
  { week: 7, theme: "Smart, Rule-Driven AI", focus: "Rules inside functions, then plan your capstone NPC." },
  { week: 8, theme: "Capstone: Build & Ship Your AI", focus: "Session 1: craft an NPC brain. Session 2: ship a full Quest Adventure Bot that combines the whole track." },
];

export const AI_LITERACY_WEEKS: WeekPlan[] = [
  { week: 1, theme: "What AI Really Is", focus: "Define artificial intelligence and spot where it already shapes your day." },
  { week: 2, theme: "How Machines Sense & Represent", focus: "Perception (seeing/hearing) and turning the messy world into data." },
  { week: 3, theme: "How AI Learns", focus: "Machine learning from examples, training vs. testing, and why AI gets things wrong." },
  { week: 4, theme: "Generative AI & LLMs", focus: "How tools like ChatGPT and image generators create new text and pictures." },
  { week: 5, theme: "Talking to AI: Prompting", focus: "Write clear prompts, add context, and refine answers like a pro." },
  { week: 6, theme: "Using AI Well", focus: "Fact-check AI output and use it honestly for schoolwork." },
  { week: 7, theme: "AI, Society & Ethics", focus: "Bias and fairness, then privacy, deepfakes, and misinformation." },
  { week: 8, theme: "Your Future With AI", focus: "Jobs and creativity, plus a capstone to become an AI-smart citizen." },
];

export const ADVANCED_AI_WEEKS: WeekPlan[] = [
  { week: 1, theme: "Frame & Data", focus: "Problem framing, task types, features/labels, leakage, and dataset bias." },
  { week: 2, theme: "Classical ML You Can See", focus: "Train classifiers, read confusion matrices, precision/recall, and baselines." },
  { week: 3, theme: "Neural Nets & Vision", focus: "Layers, overfitting, and computer-vision pipelines with privacy checks." },
  { week: 4, theme: "LLMs Beyond Prompts", focus: "Tokens, embeddings, evaluation, and retrieval-augmented generation (RAG)." },
  { week: 5, theme: "Agents & Evaluation", focus: "Tool-using agents, budgets, human gates, and evaluation harnesses." },
  { week: 6, theme: "Stack Choices & Audits", focus: "Prompt vs RAG vs fine-tune, fairness audits, and AI security." },
  { week: 7, theme: "Ship & Integrate", focus: "MLOps lite — deploy, monitor, drift — plus multimodal system design." },
  { week: 8, theme: "Capstone", focus: "Build a thin AI system, then demo, audit, and defend it." },
];

export const AP_CSP_PREP_WEEKS: WeekPlan[] = [
  { week: 1, theme: "Creative Development", focus: "Purpose, collaboration, iteration, testing, and documentation (Big Idea 1)." },
  { week: 2, theme: "Data", focus: "Bits/binary, abstraction, compression, metadata, bias, and insight from data (Big Idea 2)." },
  { week: 3, theme: "Programming I", focus: "Variables, expressions, strings, conditionals, and Boolean logic (Big Idea 3)." },
  { week: 4, theme: "Programming II", focus: "Iteration, lists, and traversal — build patterns you’ll need on the Create PT." },
  { week: 5, theme: "Programming III", focus: "Procedures, parameters, abstraction, algorithms, and efficiency tradeoffs." },
  { week: 6, theme: "Systems & Networks", focus: "Hardware/software, fault tolerance, packets, protocols, DNS, and HTTPS (Big Idea 4)." },
  { week: 7, theme: "Impact of Computing", focus: "Innovations, equity, legal/ethical issues, IP, and privacy (Big Idea 5)." },
  { week: 8, theme: "Create PT & Exams", focus: "Create Performance Task studio, then gated Practice Tests (30 Q) and Final Exam (40 Q) after all lessons." },
];

export const DIGITAL_LITERACY_WEEKS: WeekPlan[] = [
  { week: 1, theme: "Computing Systems Foundations", focus: "Abstraction layers, hardware/software/OS, and data storage tradeoffs (CSTA 3A CS + DA)." },
  { week: 2, theme: "Networks & Information Integrity", focus: "How networks move data, search fluently, and evaluate claims in a computing culture." },
  { week: 3, theme: "Connected Communication & Work", focus: "Professional digital communication and collaboration across teams, cultures, and careers." },
  { week: 4, theme: "Identity, Culture & Equity", focus: "Reputation and footprint — then evaluate computing’s cultural impacts and equity deficits." },
  { week: 5, theme: "Creation, Accessibility & IP", focus: "Build more accessible artifacts and explain IP law’s benefits and harms for innovation." },
  { week: 6, theme: "Privacy, Security & Tradeoffs", focus: "Everyday threats, recommend controls, and evaluate automated data collection and privacy ethics." },
  { week: 7, theme: "Agency: Wellbeing & Troubleshooting", focus: "Personal impacts of computing, plus systematic troubleshooting guidelines others can reuse." },
  { week: 8, theme: "Futures & Capstone", focus: "Connected workplaces and careers — then evaluate impacts and ship a personal action plan." },
];

export const CYBERSECURITY_WEEKS: WeekPlan[] = [
  { week: 1, theme: "Principles & Ethics", focus: "Define cybersecurity goals, evaluate ethical constraints, and apply the CIA triad with authentication." },
  { week: 2, theme: "Threats & Human Risk", focus: "Analyze how malware and social engineering affect sensitive data — and recommend first responses." },
  { week: 3, theme: "Identity & Access Control", focus: "Compare credential protections (hashing, MFA) and design least-privilege access with usability tradeoffs." },
  { week: 4, theme: "Networks & Defense Architecture", focus: "Evaluate network reliability (routers, switches, topology, addressing) and recommend firewall/config controls." },
  { week: 5, theme: "Cryptography & Trust Models", focus: "Compare encryption and hashing approaches, then evaluate HTTPS/certificate trust and its limits." },
  { week: 6, theme: "Hardening & Incident Response", focus: "Recommend hardening/patching priorities, then design logging, monitoring, and incident workflows." },
  { week: 7, theme: "Attacks, Privacy & Tradeoffs", focus: "Map attack patterns and program-security issues, then evaluate OSINT/privacy risks and legal-ethical tradeoffs." },
  { week: 8, theme: "Risk Analysis & Capstone", focus: "Select and justify controls by feasibility, ethics, and usability — then defend a full scenario plan." },
];

export const FINANCIAL_LITERACY_WEEKS: WeekPlan[] = [
  { week: 1, theme: "Money Foundations", focus: "What money is for, goals, values, and smart needs-vs-wants decisions." },
  { week: 2, theme: "Earning & Banking", focus: "Paychecks and taxes basics, then checking, savings, and debit vs credit cards." },
  { week: 3, theme: "Budgeting & Cash Flow", focus: "Build a real budget, track spending, and start an emergency fund." },
  { week: 4, theme: "Credit & Debt", focus: "Credit scores and reports, then interest, loans, and avoiding debt traps." },
  { week: 5, theme: "Saving & Investing", focus: "Compound growth, saving strategies, and investing basics with risk in mind." },
  { week: 6, theme: "Protection & Consumer Power", focus: "Insurance basics, then scams, fraud, and consumer rights." },
  { week: 7, theme: "Taxes, Jobs & Big Costs", focus: "First-job taxes and pay stubs, then college costs, aid, and student loan awareness." },
  { week: 8, theme: "Plan & Capstone", focus: "Big money tradeoffs, then ship your First-Year Money Plan." },
];

export const DATA_ANALYST_WEEKS: WeekPlan[] = [
  { week: 1, theme: "What Data Is", focus: "Rows, columns, and your first SELECT queries." },
  { week: 2, theme: "Choosing & Filtering", focus: "Pick the columns you need and filter rows with WHERE." },
  { week: 3, theme: "Sorting & Summarizing", focus: "ORDER BY for ranking, then COUNT / SUM / AVG with GROUP BY." },
  { week: 4, theme: "Connecting & Sharpening", focus: "JOIN two tables, then layer WHERE + GROUP BY + HAVING." },
  { week: 5, theme: "Comparing with Charts", focus: "Bar charts (compare categories) and pie charts (parts of a whole)." },
  { week: 6, theme: "Trends & Spread", focus: "Line charts (change over time) and histograms (distributions)." },
  { week: 7, theme: "Relationships & Planning", focus: "Scatter plots (are two numbers related?) + plan your capstone." },
  { week: 8, theme: "Capstone: Your Data Project", focus: "Run a full investigation: explore → join → summarize → visualize → conclude." },
];

const PYTHON_LESSONS: LessonRow[] = [
  { id: "lesson-1", title: "My First AI Helper", href: "/learn/1", xp: 50, badgeName: "The Awakener", badgeIcon: "", week: 1, session: 1, hasLesson: true },
  { id: "lesson-2", title: "My AI Helper Listens", href: "/learn/2", xp: 100, badgeName: "Listener", badgeIcon: "", week: 1, session: 2, hasLesson: true },
  { id: "lesson-3", title: "My AI Makes Choices", href: "/learn/3", xp: 150, badgeName: "Decision Maker", badgeIcon: "", week: 2, session: 1, hasLesson: true },
  { id: "lesson-4", title: "Smarter AI Rules", href: "/learn/4", xp: 250, badgeName: "Rule Builder", badgeIcon: "", week: 2, session: 2, hasLesson: true },
  { id: "lesson-5", title: "AI Repeats Tasks", href: "/learn/5", xp: 300, badgeName: "Loop Starter", badgeIcon: "", week: 3, session: 1, hasLesson: true },
  { id: "lesson-6", title: "Patterns and Predictions", href: "/learn/6", xp: 350, badgeName: "Pattern Finder", badgeIcon: "", week: 3, session: 2, hasLesson: true },
  { id: "lesson-7", title: "AI Notices Patterns", href: "/learn/7", xp: 400, badgeName: "Pattern Spotter", badgeIcon: "", week: 4, session: 1, hasLesson: true },
  { id: "lesson-8", title: "AI Remembers Choices", href: "/learn/8", xp: 450, badgeName: "Memory Builder", badgeIcon: "", week: 5, session: 1, hasLesson: true },
  { id: "lesson-9", title: "Organizing Memory", href: "/learn/9", xp: 500, badgeName: "Memory Organizer", badgeIcon: "", week: 5, session: 2, hasLesson: true },
  { id: "lesson-10", title: "Teaching the Bot Skills (Functions)", href: "/learn/10", xp: 550, badgeName: "Skill Builder", badgeIcon: "", week: 6, session: 1, hasLesson: true },
  { id: "lesson-11", title: "Giving Functions Better Information (Parameters)", href: "/learn/11", xp: 600, badgeName: "Parameter Pro", badgeIcon: "", week: 6, session: 2, hasLesson: true },
  { id: "lesson-12", title: "Guiding AI with Rules", href: "/learn/12", xp: 650, badgeName: "Rule Guide", badgeIcon: "", week: 7, session: 1, hasLesson: true },
  { id: "lesson-13", title: "Build Your AI NPC", href: "/learn/13", xp: 700, badgeName: "Designer", badgeIcon: "", week: 8, session: 1, hasLesson: true },
  { id: "lesson-14", title: "Capstone: Quest Adventure Bot", href: "/learn/14", xp: 800, badgeName: "Quest Builder", badgeIcon: "", week: 8, session: 2, hasLesson: true },
];

const DATA_ANALYST_LESSONS: LessonRow[] = [
  { id: "da-1", title: "What Is Data?", href: "/learn/data/1", xp: 50, badgeName: "Data Spotter", badgeIcon: "", week: 1, session: 1, hasLesson: true },
  { id: "da-2", title: "Your First Query", href: "/learn/data/2", xp: 100, badgeName: "Query Starter", badgeIcon: "", week: 1, session: 2, hasLesson: true },
  { id: "da-3", title: "Pick the Columns You Need", href: "/learn/data/3", xp: 150, badgeName: "Column Picker", badgeIcon: "", week: 2, session: 1, hasLesson: true },
  { id: "da-4", title: "Find What You're Looking For", href: "/learn/data/4", xp: 200, badgeName: "Filter Finder", badgeIcon: "", week: 2, session: 2, hasLesson: true },
  { id: "da-5", title: "Sort and Rank", href: "/learn/data/5", xp: 250, badgeName: "Rank Master", badgeIcon: "", week: 3, session: 1, hasLesson: true },
  { id: "da-6", title: "Count and Summarize", href: "/learn/data/6", xp: 300, badgeName: "Summary Pro", badgeIcon: "", week: 3, session: 2, hasLesson: true },
  { id: "da-7", title: "Combine Tables", href: "/learn/data/7", xp: 350, badgeName: "Table Joiner", badgeIcon: "", week: 4, session: 1, hasLesson: true },
  { id: "da-8", title: "Ask Better Questions", href: "/learn/data/8", xp: 400, badgeName: "Question Asker", badgeIcon: "", week: 4, session: 2, hasLesson: true },
  { id: "da-9", title: "Tell the Story with Charts", href: "/learn/data/9", xp: 450, badgeName: "Chart Maker", badgeIcon: "", week: 5, session: 1, hasLesson: true },
  { id: "da-10", title: "Parts of a Whole", href: "/learn/data/10", xp: 500, badgeName: "Slice Master", badgeIcon: "", week: 5, session: 2, hasLesson: true },
  { id: "da-11", title: "Change Over Time", href: "/learn/data/11", xp: 550, badgeName: "Trend Spotter", badgeIcon: "", week: 6, session: 1, hasLesson: true },
  { id: "da-12", title: "Distributions", href: "/learn/data/12", xp: 600, badgeName: "Distribution Detective", badgeIcon: "", week: 6, session: 2, hasLesson: true },
  { id: "da-13", title: "Relationships", href: "/learn/data/13", xp: 650, badgeName: "Relationship Finder", badgeIcon: "", week: 7, session: 1, hasLesson: true },
  { id: "da-14", title: "Your Data Project", href: "/learn/data/14", xp: 700, badgeName: "Data Analyst", badgeIcon: "", week: 8, session: 1, hasLesson: true },
];

const AP_CSP_PREP_LESSONS: LessonRow[] = [
  { id: "csp-1", title: "Creative Development: Purpose, Collaboration & Iteration", href: "/learn/ap-csp-prep/1", xp: 50, badgeName: "Design Collaborator", badgeIcon: "", week: 1, session: 1, hasLesson: true },
  { id: "csp-2", title: "Development Process, Testing & Documentation", href: "/learn/ap-csp-prep/2", xp: 100, badgeName: "Process Pro", badgeIcon: "", week: 1, session: 2, hasLesson: true },
  { id: "csp-3", title: "Bits, Binary & Data Abstraction", href: "/learn/ap-csp-prep/3", xp: 150, badgeName: "Bit Builder", badgeIcon: "", week: 2, session: 1, hasLesson: true },
  { id: "csp-4", title: "Compression, Metadata, Bias & Insight from Data", href: "/learn/ap-csp-prep/4", xp: 200, badgeName: "Data Decoder", badgeIcon: "", week: 2, session: 2, hasLesson: true },
  { id: "csp-5", title: "Variables, Expressions & Strings", href: "/learn/ap-csp-prep/5", xp: 250, badgeName: "Code Starter", badgeIcon: "", week: 3, session: 1, hasLesson: true },
  { id: "csp-6", title: "Conditionals & Boolean Logic", href: "/learn/ap-csp-prep/6", xp: 300, badgeName: "Logic Guard", badgeIcon: "", week: 3, session: 2, hasLesson: true },
  { id: "csp-7", title: "Iteration & Loops", href: "/learn/ap-csp-prep/7", xp: 350, badgeName: "Loop Master", badgeIcon: "", week: 4, session: 1, hasLesson: true },
  { id: "csp-8", title: "Lists & Traversal", href: "/learn/ap-csp-prep/8", xp: 400, badgeName: "List Navigator", badgeIcon: "", week: 4, session: 2, hasLesson: true },
  { id: "csp-9", title: "Procedures, Parameters & Abstraction", href: "/learn/ap-csp-prep/9", xp: 450, badgeName: "Procedure Architect", badgeIcon: "", week: 5, session: 1, hasLesson: true },
  { id: "csp-10", title: "Algorithms, Efficiency, Searching & Sorting", href: "/learn/ap-csp-prep/10", xp: 500, badgeName: "Algorithm Analyst", badgeIcon: "", week: 5, session: 2, hasLesson: true },
  { id: "csp-11", title: "Computing Systems & Fault Tolerance", href: "/learn/ap-csp-prep/11", xp: 550, badgeName: "Systems Scout", badgeIcon: "", week: 6, session: 1, hasLesson: true },
  { id: "csp-12", title: "The Internet: Packets, Protocols & Trust", href: "/learn/ap-csp-prep/12", xp: 600, badgeName: "Network Navigator", badgeIcon: "", week: 6, session: 2, hasLesson: true },
  { id: "csp-13", title: "Computing Innovations, Society & Equity", href: "/learn/ap-csp-prep/13", xp: 650, badgeName: "Impact Analyst", badgeIcon: "", week: 7, session: 1, hasLesson: true },
  { id: "csp-14", title: "Legal & Ethical Issues: IP, Privacy & Open Source", href: "/learn/ap-csp-prep/14", xp: 700, badgeName: "Ethics Sentinel", badgeIcon: "", week: 7, session: 2, hasLesson: true },
  { id: "csp-15", title: "Create Performance Task Studio", href: "/learn/ap-csp-prep/15", xp: 750, badgeName: "Create PT Coach", badgeIcon: "", week: 8, session: 1, hasLesson: true },
  { id: "csp-16", title: "AP-Style Practice Gauntlet & Exam Readiness", href: "/learn/ap-csp-prep/16", xp: 800, badgeName: "CSP Exam Ready", badgeIcon: "", week: 8, session: 2, hasLesson: true },
  {
    id: "csp-practice-1",
    title: "Practice Test 1 · 30 AP-Style Questions",
    href: "/learn/ap-csp-prep/exam/practice-1",
    xp: 250,
    badgeName: "Practice Ace I",
    badgeIcon: "",
    week: 8,
    session: 3,
    kind: "assessment",
  },
  {
    id: "csp-practice-2",
    title: "Practice Test 2 · 30 AP-Style Questions",
    href: "/learn/ap-csp-prep/exam/practice-2",
    xp: 250,
    badgeName: "Practice Ace II",
    badgeIcon: "",
    week: 8,
    session: 4,
    kind: "assessment",
  },
  {
    id: "csp-final",
    title: "Final Exam · 40 AP-Style Questions",
    href: "/learn/ap-csp-prep/exam/final",
    xp: 400,
    badgeName: "CSP Finalist",
    badgeIcon: "",
    week: 8,
    session: 5,
    kind: "assessment",
  },
];

const ADVANCED_AI_LESSONS: LessonRow[] = [
  { id: "aai-1", title: "AI Systems: Framing Problems Worth Solving", href: "/learn/advanced-ai/1", xp: 50, badgeName: "Problem Framer", badgeIcon: "", week: 1, session: 1, hasLesson: true },
  { id: "aai-2", title: "Data for Machine Learning", href: "/learn/advanced-ai/2", xp: 100, badgeName: "Data Steward", badgeIcon: "", week: 1, session: 2, hasLesson: true },
  { id: "aai-3", title: "Train Your First Classifier", href: "/learn/advanced-ai/3", xp: 150, badgeName: "Model Trainer", badgeIcon: "", week: 2, session: 1, hasLesson: true },
  { id: "aai-4", title: "Neural Networks: From Neurons to Overfitting", href: "/learn/advanced-ai/4", xp: 200, badgeName: "Net Navigator", badgeIcon: "", week: 2, session: 2, hasLesson: true },
  { id: "aai-5", title: "Computer Vision Pipelines", href: "/learn/advanced-ai/5", xp: 250, badgeName: "Vision Builder", badgeIcon: "", week: 3, session: 1, hasLesson: true },
  { id: "aai-6", title: "Language Models Beyond Prompting", href: "/learn/advanced-ai/6", xp: 300, badgeName: "LLM Engineer", badgeIcon: "", week: 3, session: 2, hasLesson: true },
  { id: "aai-7", title: "Retrieval-Augmented Generation (RAG)", href: "/learn/advanced-ai/7", xp: 350, badgeName: "Retrieval Pro", badgeIcon: "", week: 4, session: 1, hasLesson: true },
  { id: "aai-8", title: "Agents, Tools & Workflows", href: "/learn/advanced-ai/8", xp: 400, badgeName: "Agent Architect", badgeIcon: "", week: 4, session: 2, hasLesson: true },
  { id: "aai-9", title: "Evaluation Harnesses & Experiment Tracking", href: "/learn/advanced-ai/9", xp: 450, badgeName: "Eval Engineer", badgeIcon: "", week: 5, session: 1, hasLesson: true },
  { id: "aai-10", title: "Fine-Tuning vs Prompting vs RAG", href: "/learn/advanced-ai/10", xp: 500, badgeName: "Stack Chooser", badgeIcon: "", week: 5, session: 2, hasLesson: true },
  { id: "aai-11", title: "Bias Audits & Fairness Metrics", href: "/learn/advanced-ai/11", xp: 550, badgeName: "Fairness Auditor", badgeIcon: "", week: 6, session: 1, hasLesson: true },
  { id: "aai-12", title: "Privacy, Security & Model Abuse", href: "/learn/advanced-ai/12", xp: 600, badgeName: "AI Defender", badgeIcon: "", week: 6, session: 2, hasLesson: true },
  { id: "aai-13", title: "MLOps Lite: Deploy, Monitor, Drift", href: "/learn/advanced-ai/13", xp: 650, badgeName: "Ship Watcher", badgeIcon: "", week: 7, session: 1, hasLesson: true },
  { id: "aai-14", title: "Multimodal & Tool-Using Systems", href: "/learn/advanced-ai/14", xp: 700, badgeName: "Systems Integrator", badgeIcon: "", week: 7, session: 2, hasLesson: true },
  { id: "aai-15", title: "Capstone Studio: Build Your AI System", href: "/learn/advanced-ai/15", xp: 750, badgeName: "Capstone Builder", badgeIcon: "", week: 8, session: 1, hasLesson: true },
  { id: "aai-16", title: "Capstone: Demo, Audit & Defend", href: "/learn/advanced-ai/16", xp: 800, badgeName: "AI Systems Graduate", badgeIcon: "", week: 8, session: 2, hasLesson: true },
];

const AI_LITERACY_LESSONS: LessonRow[] = [
  { id: "ai-1", title: "What Is AI, Really?", href: "/learn/ai/1", xp: 50, badgeName: "AI Explorer", badgeIcon: "", week: 1, session: 1, hasLesson: true },
  { id: "ai-2", title: "AI Is All Around You", href: "/learn/ai/2", xp: 100, badgeName: "AI Spotter", badgeIcon: "", week: 1, session: 2, hasLesson: true },
  { id: "ai-3", title: "How Computers See and Hear", href: "/learn/ai/3", xp: 150, badgeName: "Sense Maker", badgeIcon: "", week: 2, session: 1, hasLesson: true },
  { id: "ai-4", title: "Turning the World Into Data", href: "/learn/ai/4", xp: 200, badgeName: "Data Translator", badgeIcon: "", week: 2, session: 2, hasLesson: true },
  { id: "ai-5", title: "How AI Learns From Examples", href: "/learn/ai/5", xp: 250, badgeName: "Pattern Learner", badgeIcon: "", week: 3, session: 1, hasLesson: true },
  { id: "ai-6", title: "Training, Testing, and Mistakes", href: "/learn/ai/6", xp: 300, badgeName: "Model Tester", badgeIcon: "", week: 3, session: 2, hasLesson: true },
  { id: "ai-7", title: "What Is Generative AI?", href: "/learn/ai/7", xp: 350, badgeName: "Creator's Apprentice", badgeIcon: "", week: 4, session: 1, hasLesson: true },
  { id: "ai-8", title: "Inside a Large Language Model", href: "/learn/ai/8", xp: 400, badgeName: "LLM Insider", badgeIcon: "", week: 4, session: 2, hasLesson: true },
  { id: "ai-9", title: "How to Talk to AI (Prompting)", href: "/learn/ai/9", xp: 450, badgeName: "Prompt Starter", badgeIcon: "", week: 5, session: 1, hasLesson: true },
  { id: "ai-10", title: "Better Prompts, Better Answers", href: "/learn/ai/10", xp: 500, badgeName: "Prompt Pro", badgeIcon: "", week: 5, session: 2, hasLesson: true },
  { id: "ai-11", title: "Don't Trust — Verify", href: "/learn/ai/11", xp: 550, badgeName: "Fact Checker", badgeIcon: "", week: 6, session: 1, hasLesson: true },
  { id: "ai-12", title: "AI at School: Help vs. Cheating", href: "/learn/ai/12", xp: 600, badgeName: "Honest Scholar", badgeIcon: "", week: 6, session: 2, hasLesson: true },
  { id: "ai-13", title: "Bias, Fairness, and Data", href: "/learn/ai/13", xp: 650, badgeName: "Fairness Guardian", badgeIcon: "", week: 7, session: 1, hasLesson: true },
  { id: "ai-14", title: "Privacy, Deepfakes, and Your Footprint", href: "/learn/ai/14", xp: 700, badgeName: "Privacy Defender", badgeIcon: "", week: 7, session: 2, hasLesson: true },
  { id: "ai-15", title: "AI and the Future of Work", href: "/learn/ai/15", xp: 750, badgeName: "Future Ready", badgeIcon: "", week: 8, session: 1, hasLesson: true },
  { id: "ai-16", title: "Capstone: Be an AI-Smart Citizen", href: "/learn/ai/16", xp: 800, badgeName: "AI-Smart Citizen", badgeIcon: "", week: 8, session: 2, hasLesson: true },
];

const DIGITAL_LITERACY_LESSONS: LessonRow[] = [
  { id: "dl-1", title: "Computing Systems: Layers & Abstraction", href: "/learn/digital/1", xp: 50, badgeName: "Systems Thinker", badgeIcon: "", week: 1, session: 1, hasLesson: true },
  { id: "dl-2", title: "Data Storage Tradeoffs: Local, Cloud & Organization", href: "/learn/digital/2", xp: 100, badgeName: "Storage Strategist", badgeIcon: "", week: 1, session: 2, hasLesson: true },
  { id: "dl-3", title: "Networks & Finding Information Online", href: "/learn/digital/3", xp: 150, badgeName: "Network Navigator", badgeIcon: "", week: 2, session: 1, hasLesson: true },
  { id: "dl-4", title: "Evaluating Claims in a Computing Culture", href: "/learn/digital/4", xp: 200, badgeName: "Critical Evaluator", badgeIcon: "", week: 2, session: 2, hasLesson: true },
  { id: "dl-5", title: "Digital Communication for School & Work", href: "/learn/digital/5", xp: 250, badgeName: "Pro Communicator", badgeIcon: "", week: 3, session: 1, hasLesson: true },
  { id: "dl-6", title: "Collaboration Across Teams, Cultures & Careers", href: "/learn/digital/6", xp: 300, badgeName: "Connected Collaborator", badgeIcon: "", week: 3, session: 2, hasLesson: true },
  { id: "dl-7", title: "Digital Identity, Reputation & Social Practice", href: "/learn/digital/7", xp: 350, badgeName: "Identity Steward", badgeIcon: "", week: 4, session: 1, hasLesson: true },
  { id: "dl-8", title: "Equity, Access & Harm Reduction Online", href: "/learn/digital/8", xp: 400, badgeName: "Equity Advocate", badgeIcon: "", week: 4, session: 2, hasLesson: true },
  { id: "dl-9", title: "Accessible Creation & Bias in Digital Artifacts", href: "/learn/digital/9", xp: 450, badgeName: "Inclusive Creator", badgeIcon: "", week: 5, session: 1, hasLesson: true },
  { id: "dl-10", title: "Intellectual Property: Innovation Tradeoffs & Credit", href: "/learn/digital/10", xp: 500, badgeName: "IP Analyst", badgeIcon: "", week: 5, session: 2, hasLesson: true },
  { id: "dl-11", title: "Everyday Threats & Security Recommendations", href: "/learn/digital/11", xp: 550, badgeName: "Security Recommender", badgeIcon: "", week: 6, session: 1, hasLesson: true },
  { id: "dl-12", title: "Privacy, Automated Collection & Ethical Tradeoffs", href: "/learn/digital/12", xp: 600, badgeName: "Privacy Evaluator", badgeIcon: "", week: 6, session: 2, hasLesson: true },
  { id: "dl-13", title: "Computing Impacts on Wellbeing & Personal Agency", href: "/learn/digital/13", xp: 650, badgeName: "Agency Builder", badgeIcon: "", week: 7, session: 1, hasLesson: true },
  { id: "dl-14", title: "Systematic Troubleshooting Others Can Reuse", href: "/learn/digital/14", xp: 700, badgeName: "Troubleshoot Designer", badgeIcon: "", week: 7, session: 2, hasLesson: true },
  { id: "dl-15", title: "Computing, Careers & Connected Workplaces", href: "/learn/digital/15", xp: 750, badgeName: "Workplace Ready", badgeIcon: "", week: 8, session: 1, hasLesson: true },
  { id: "dl-16", title: "Capstone: Evaluate Impacts & Act", href: "/learn/digital/16", xp: 800, badgeName: "Impact Evaluator", badgeIcon: "", week: 8, session: 2, hasLesson: true },
];

const CYBERSECURITY_LESSONS: LessonRow[] = [
  { id: "cs-1", title: "Cybersecurity Principles & Ethics", href: "/learn/cyber/1", xp: 50, badgeName: "Cyber Rookie", badgeIcon: "", week: 1, session: 1, hasLesson: true },
  { id: "cs-2", title: "CIA Triad, Auth & Tradeoffs", href: "/learn/cyber/2", xp: 100, badgeName: "Triad Guardian", badgeIcon: "", week: 1, session: 2, hasLesson: true },
  { id: "cs-3", title: "Malware Impact on Sensitive Data", href: "/learn/cyber/3", xp: 150, badgeName: "Threat Spotter", badgeIcon: "", week: 2, session: 1, hasLesson: true },
  { id: "cs-4", title: "Social Engineering Defense", href: "/learn/cyber/4", xp: 200, badgeName: "Phish Defender", badgeIcon: "", week: 2, session: 2, hasLesson: true },
  { id: "cs-5", title: "Credentials, Hashing & MFA", href: "/learn/cyber/5", xp: 250, badgeName: "Credential Pro", badgeIcon: "", week: 3, session: 1, hasLesson: true },
  { id: "cs-6", title: "Access Control & Least Privilege", href: "/learn/cyber/6", xp: 300, badgeName: "Gatekeeper", badgeIcon: "", week: 3, session: 2, hasLesson: true },
  { id: "cs-7", title: "Network Architecture for Defenders", href: "/learn/cyber/7", xp: 350, badgeName: "Net Scout", badgeIcon: "", week: 4, session: 1, hasLesson: true },
  { id: "cs-8", title: "Firewalls, Ports & Secure Config", href: "/learn/cyber/8", xp: 400, badgeName: "Firewall Builder", badgeIcon: "", week: 4, session: 2, hasLesson: true },
  { id: "cs-9", title: "Cryptography & Secure Transmission", href: "/learn/cyber/9", xp: 450, badgeName: "Cipher Starter", badgeIcon: "", week: 5, session: 1, hasLesson: true },
  { id: "cs-10", title: "HTTPS, Certificates & Trust", href: "/learn/cyber/10", xp: 500, badgeName: "Trust Verifier", badgeIcon: "", week: 5, session: 2, hasLesson: true },
  { id: "cs-11", title: "System Hardening & Patching", href: "/learn/cyber/11", xp: 550, badgeName: "Hardener", badgeIcon: "", week: 6, session: 1, hasLesson: true },
  { id: "cs-12", title: "Logging, Monitoring & Incidents", href: "/learn/cyber/12", xp: 600, badgeName: "Incident Ready", badgeIcon: "", week: 6, session: 2, hasLesson: true },
  { id: "cs-13", title: "Attack Patterns & Program Security", href: "/learn/cyber/13", xp: 650, badgeName: "Attack Analyst", badgeIcon: "", week: 7, session: 1, hasLesson: true },
  { id: "cs-14", title: "OSINT, Privacy & Ethics", href: "/learn/cyber/14", xp: 700, badgeName: "Privacy Scout", badgeIcon: "", week: 7, session: 2, hasLesson: true },
  { id: "cs-15", title: "Risk Analysis & Control Selection", href: "/learn/cyber/15", xp: 750, badgeName: "Risk Analyst", badgeIcon: "", week: 8, session: 1, hasLesson: true },
  { id: "cs-16", title: "Capstone: Defend & Justify", href: "/learn/cyber/16", xp: 800, badgeName: "Cyber Defender", badgeIcon: "", week: 8, session: 2, hasLesson: true },
];

const FINANCIAL_LITERACY_LESSONS: LessonRow[] = [
  { id: "fl-1", title: "Money, Goals & You", href: "/learn/finance/1", xp: 50, badgeName: "Money Starter", badgeIcon: "", week: 1, session: 1, hasLesson: true },
  { id: "fl-2", title: "Needs, Wants & Tradeoffs", href: "/learn/finance/2", xp: 100, badgeName: "Tradeoff Thinker", badgeIcon: "", week: 1, session: 2, hasLesson: true },
  { id: "fl-3", title: "Paychecks, Income & Taxes", href: "/learn/finance/3", xp: 150, badgeName: "Paycheck Pro", badgeIcon: "", week: 2, session: 1, hasLesson: true },
  { id: "fl-4", title: "Banks, Accounts & Cards", href: "/learn/finance/4", xp: 200, badgeName: "Banking Basics", badgeIcon: "", week: 2, session: 2, hasLesson: true },
  { id: "fl-5", title: "Build a Budget That Works", href: "/learn/finance/5", xp: 250, badgeName: "Budget Builder", badgeIcon: "", week: 3, session: 1, hasLesson: true },
  { id: "fl-6", title: "Spending Tracking & Emergency Funds", href: "/learn/finance/6", xp: 300, badgeName: "Cash Flow Keeper", badgeIcon: "", week: 3, session: 2, hasLesson: true },
  { id: "fl-7", title: "Credit Scores & Reports", href: "/learn/finance/7", xp: 350, badgeName: "Credit Reader", badgeIcon: "", week: 4, session: 1, hasLesson: true },
  { id: "fl-8", title: "Interest, Loans & Debt Traps", href: "/learn/finance/8", xp: 400, badgeName: "Debt Defender", badgeIcon: "", week: 4, session: 2, hasLesson: true },
  { id: "fl-9", title: "Saving & Compound Growth", href: "/learn/finance/9", xp: 450, badgeName: "Growth Saver", badgeIcon: "", week: 5, session: 1, hasLesson: true },
  { id: "fl-10", title: "Investing Basics & Risk", href: "/learn/finance/10", xp: 500, badgeName: "Investor Apprentice", badgeIcon: "", week: 5, session: 2, hasLesson: true },
  { id: "fl-11", title: "Insurance: Protecting What Matters", href: "/learn/finance/11", xp: 550, badgeName: "Coverage Checker", badgeIcon: "", week: 6, session: 1, hasLesson: true },
  { id: "fl-12", title: "Scams, Fraud & Consumer Rights", href: "/learn/finance/12", xp: 600, badgeName: "Consumer Guardian", badgeIcon: "", week: 6, session: 2, hasLesson: true },
  { id: "fl-13", title: "Taxes & Your First Job", href: "/learn/finance/13", xp: 650, badgeName: "Tax Rookie", badgeIcon: "", week: 7, session: 1, hasLesson: true },
  { id: "fl-14", title: "College Costs, Aid & Loans", href: "/learn/finance/14", xp: 700, badgeName: "Aid Navigator", badgeIcon: "", week: 7, session: 2, hasLesson: true },
  { id: "fl-15", title: "Big Money Decisions", href: "/learn/finance/15", xp: 750, badgeName: "Decision Pro", badgeIcon: "", week: 8, session: 1, hasLesson: true },
  { id: "fl-16", title: "Capstone: Your First-Year Money Plan", href: "/learn/finance/16", xp: 800, badgeName: "Money Planner", badgeIcon: "", week: 8, session: 2, hasLesson: true },
];

export const TRACKS: Track[] = [
  {
    id: "ai-literacy",
    title: "AI Literacy",
    subtitle: "What AI is, how it works, and how to use it wisely",
    outcome: "Know what AI is — and use it wisely",
    icon: "",
    lessons: AI_LITERACY_LESSONS,
  },
  {
    id: "advanced-ai",
    title: "Advanced AI",
    subtitle: "Build, evaluate, and audit AI systems — beyond prompting (CSTA AI specialty)",
    outcome: "Build and audit real AI systems",
    icon: "",
    lessons: ADVANCED_AI_LESSONS,
  },
  {
    id: "ap-csp-prep",
    title: "AP CSP Prep",
    subtitle: "College Board–aligned exam prep: Big Ideas, Create PT studio, and AP-style practice (not an official AP course)",
    outcome: "Pass the AP CSP exam",
    icon: "",
    lessons: AP_CSP_PREP_LESSONS,
  },
  {
    id: "digital-literacy",
    title: "Digital Literacy",
    subtitle: "Evaluate systems, information, privacy, and digital citizenship — CSTA Level 3A",
    outcome: "Judge online info and protect your identity",
    icon: "",
    lessons: DIGITAL_LITERACY_LESSONS,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    subtitle: "Evaluate threats, recommend controls, and justify tradeoffs — CSTA Level 3A/3B",
    outcome: "Protect accounts and spot threats",
    icon: "",
    lessons: CYBERSECURITY_LESSONS,
  },
  {
    id: "financial-literacy",
    title: "Financial Literacy",
    subtitle: "Budgets, credit, investing, and money decisions for real life",
    outcome: "Budget, credit, and invest with a plan",
    icon: "",
    lessons: FINANCIAL_LITERACY_LESSONS,
  },
  {
    id: "ai-python",
    title: "AI + Python Starter Pack",
    subtitle: "Build your first AI helper with Python",
    outcome: "Build a chatbot adventure in Python",
    icon: "",
    lessons: PYTHON_LESSONS,
  },
  {
    id: "data-analyst",
    title: "Data Analyst Track",
    subtitle: "SQL, tables, and charts for real-world questions",
    outcome: "Turn tables into clear answers",
    icon: "",
    lessons: DATA_ANALYST_LESSONS,
  },
];

export function getTrack(id: Track["id"]): Track | undefined {
  return TRACKS.find((t) => t.id === id);
}

/** The 8-week plan for a track. */
export function weeksForTrack(id: Track["id"]): WeekPlan[] {
  if (id === "ai-python") return PYTHON_WEEKS;
  if (id === "data-analyst") return DATA_ANALYST_WEEKS;
  if (id === "advanced-ai") return ADVANCED_AI_WEEKS;
  if (id === "ap-csp-prep") return AP_CSP_PREP_WEEKS;
  if (id === "digital-literacy") return DIGITAL_LITERACY_WEEKS;
  if (id === "cybersecurity") return CYBERSECURITY_WEEKS;
  if (id === "financial-literacy") return FINANCIAL_LITERACY_WEEKS;
  return AI_LITERACY_WEEKS;
}

export function totalXpAcrossTracks(completedIds: string[]): number {
  return TRACKS.reduce((sum, track) => {
    return (
      sum +
      track.lessons
        .filter((l) => completedIds.includes(l.id))
        .reduce((s, l) => s + l.xp, 0)
    );
  }, 0);
}
