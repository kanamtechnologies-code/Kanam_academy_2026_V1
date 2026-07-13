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
};

export type WeekPlan = {
  week: number;
  theme: string;
  focus: string;
};

export type Track = {
  id: "python-starter" | "data-analyst" | "ai-literacy" | "digital-literacy" | "cybersecurity" | "financial-literacy";
  title: string;
  subtitle: string;
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
  options?: { openLessonIds?: Set<string> | null }
) {
  const openLessonIds = options?.openLessonIds;
  const availableLessons =
    openLessonIds == null
      ? lessons
      : lessons.filter((l) => openLessonIds.has(l.id) || completedIds.includes(l.id));

  const completedCount = availableLessons.filter((l) => completedIds.includes(l.id)).length;
  const totalCount = availableLessons.length;
  const percent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
  const totalXp = availableLessons
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

/** True when a lesson is open for this student (not class-restricted, or explicitly assigned). */
export function isLessonOpenForStudent(
  lessonId: string,
  classRestricted: boolean,
  enabledLessonIds: string[] | null,
  completedIds: string[]
): boolean {
  if (!classRestricted || enabledLessonIds == null) return true;
  if (completedIds.includes(lessonId)) return true;
  return enabledLessonIds.includes(lessonId);
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

export const DIGITAL_LITERACY_WEEKS: WeekPlan[] = [
  { week: 1, theme: "Digital Foundations", focus: "How devices, software, and the internet actually work — and how to manage your files." },
  { week: 2, theme: "Finding & Judging Information", focus: "Search smart, then tell reliable information from misinformation." },
  { week: 3, theme: "Communicating & Collaborating", focus: "Communicate clearly and kindly online and work together in the cloud." },
  { week: 4, theme: "Digital Identity & Citizenship", focus: "Your digital footprint, reputation, and being a positive digital citizen." },
  { week: 5, theme: "Creating Digital Content", focus: "Make and edit content, and use it legally with proper credit." },
  { week: 6, theme: "Staying Safe & Secure", focus: "Strong security habits and protecting your privacy and personal data." },
  { week: 7, theme: "Wellbeing & Problem-Solving", focus: "Healthy tech habits, plus troubleshooting tech problems like a pro." },
  { week: 8, theme: "Digital Skills for the Real World", focus: "Workplace-ready digital skills and your personal digital toolkit." },
];

export const CYBERSECURITY_WEEKS: WeekPlan[] = [
  { week: 1, theme: "Foundations & Ethics", focus: "What cybersecurity is, career paths, ethics, and the CIA triad with authentication." },
  { week: 2, theme: "Threats & the Human Factor", focus: "Malware families and social engineering — especially phishing." },
  { week: 3, theme: "Identity & Access", focus: "Passwords, hashing, MFA, and least-privilege access control." },
  { week: 4, theme: "Networks & Defense", focus: "How networks work for defenders, plus firewalls, ports, and secure configs." },
  { week: 5, theme: "Cryptography & Trust", focus: "Encryption and hashing basics, then HTTPS and digital certificates." },
  { week: 6, theme: "Hardening & Response", focus: "Patching and system hardening, then logging, monitoring, and incident basics." },
  { week: 7, theme: "Attacks & Awareness", focus: "Common attack patterns from a defender’s view, plus OSINT and privacy awareness." },
  { week: 8, theme: "Risk & Capstone", focus: "Risk assessment and controls, then a capstone defense plan for a real scenario." },
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
  { id: "dl-1", title: "How Computers & the Internet Work", href: "/learn/digital/1", xp: 50, badgeName: "Tech Foundations", badgeIcon: "", week: 1, session: 1, hasLesson: true },
  { id: "dl-2", title: "Files, Folders & the Cloud", href: "/learn/digital/2", xp: 100, badgeName: "File Wrangler", badgeIcon: "", week: 1, session: 2, hasLesson: true },
  { id: "dl-3", title: "Search Like a Pro", href: "/learn/digital/3", xp: 150, badgeName: "Search Sleuth", badgeIcon: "", week: 2, session: 1, hasLesson: true },
  { id: "dl-4", title: "Is It True? Spotting Misinformation", href: "/learn/digital/4", xp: 200, badgeName: "Truth Seeker", badgeIcon: "", week: 2, session: 2, hasLesson: true },
  { id: "dl-5", title: "Communicate Clearly & Kindly Online", href: "/learn/digital/5", xp: 250, badgeName: "Clear Communicator", badgeIcon: "", week: 3, session: 1, hasLesson: true },
  { id: "dl-6", title: "Collaborate in the Cloud", href: "/learn/digital/6", xp: 300, badgeName: "Team Player", badgeIcon: "", week: 3, session: 2, hasLesson: true },
  { id: "dl-7", title: "Your Digital Footprint & Reputation", href: "/learn/digital/7", xp: 350, badgeName: "Footprint Keeper", badgeIcon: "", week: 4, session: 1, hasLesson: true },
  { id: "dl-8", title: "Being a Good Digital Citizen", href: "/learn/digital/8", xp: 400, badgeName: "Digital Citizen", badgeIcon: "", week: 4, session: 2, hasLesson: true },
  { id: "dl-9", title: "Create & Edit Digital Content", href: "/learn/digital/9", xp: 450, badgeName: "Content Creator", badgeIcon: "", week: 5, session: 1, hasLesson: true },
  { id: "dl-10", title: "Copyright, Licensing & Giving Credit", href: "/learn/digital/10", xp: 500, badgeName: "Credit Giver", badgeIcon: "", week: 5, session: 2, hasLesson: true },
  { id: "dl-11", title: "Passwords, Scams & Account Security", href: "/learn/digital/11", xp: 550, badgeName: "Security Guard", badgeIcon: "", week: 6, session: 1, hasLesson: true },
  { id: "dl-12", title: "Protect Your Privacy & Data", href: "/learn/digital/12", xp: 600, badgeName: "Privacy Protector", badgeIcon: "", week: 6, session: 2, hasLesson: true },
  { id: "dl-13", title: "Healthy Tech Habits & Digital Wellbeing", href: "/learn/digital/13", xp: 650, badgeName: "Balance Keeper", badgeIcon: "", week: 7, session: 1, hasLesson: true },
  { id: "dl-14", title: "Troubleshoot Like a Tech Pro", href: "/learn/digital/14", xp: 700, badgeName: "Problem Solver", badgeIcon: "", week: 7, session: 2, hasLesson: true },
  { id: "dl-15", title: "Digital Skills for Work & Career", href: "/learn/digital/15", xp: 750, badgeName: "Career Ready", badgeIcon: "", week: 8, session: 1, hasLesson: true },
  { id: "dl-16", title: "Capstone: Your Digital Toolkit", href: "/learn/digital/16", xp: 800, badgeName: "Digitally Fluent", badgeIcon: "", week: 8, session: 2, hasLesson: true },
];

const CYBERSECURITY_LESSONS: LessonRow[] = [
  { id: "cs-1", title: "What Is Cybersecurity?", href: "/learn/cyber/1", xp: 50, badgeName: "Cyber Rookie", badgeIcon: "", week: 1, session: 1, hasLesson: true },
  { id: "cs-2", title: "CIA Triad & Authentication", href: "/learn/cyber/2", xp: 100, badgeName: "Triad Guardian", badgeIcon: "", week: 1, session: 2, hasLesson: true },
  { id: "cs-3", title: "Malware & the Threat Landscape", href: "/learn/cyber/3", xp: 150, badgeName: "Threat Spotter", badgeIcon: "", week: 2, session: 1, hasLesson: true },
  { id: "cs-4", title: "Social Engineering & Phishing", href: "/learn/cyber/4", xp: 200, badgeName: "Phish Defender", badgeIcon: "", week: 2, session: 2, hasLesson: true },
  { id: "cs-5", title: "Passwords, Hashing & MFA", href: "/learn/cyber/5", xp: 250, badgeName: "Credential Pro", badgeIcon: "", week: 3, session: 1, hasLesson: true },
  { id: "cs-6", title: "Access Control & Least Privilege", href: "/learn/cyber/6", xp: 300, badgeName: "Gatekeeper", badgeIcon: "", week: 3, session: 2, hasLesson: true },
  { id: "cs-7", title: "Networking for Defenders", href: "/learn/cyber/7", xp: 350, badgeName: "Net Scout", badgeIcon: "", week: 4, session: 1, hasLesson: true },
  { id: "cs-8", title: "Firewalls, Ports & Secure Config", href: "/learn/cyber/8", xp: 400, badgeName: "Firewall Builder", badgeIcon: "", week: 4, session: 2, hasLesson: true },
  { id: "cs-9", title: "Cryptography Basics", href: "/learn/cyber/9", xp: 450, badgeName: "Cipher Starter", badgeIcon: "", week: 5, session: 1, hasLesson: true },
  { id: "cs-10", title: "HTTPS, Certificates & Trust", href: "/learn/cyber/10", xp: 500, badgeName: "Trust Verifier", badgeIcon: "", week: 5, session: 2, hasLesson: true },
  { id: "cs-11", title: "System Hardening & Patching", href: "/learn/cyber/11", xp: 550, badgeName: "Hardener", badgeIcon: "", week: 6, session: 1, hasLesson: true },
  { id: "cs-12", title: "Logging, Monitoring & Incidents", href: "/learn/cyber/12", xp: 600, badgeName: "Incident Ready", badgeIcon: "", week: 6, session: 2, hasLesson: true },
  { id: "cs-13", title: "Common Attacks (Defender View)", href: "/learn/cyber/13", xp: 650, badgeName: "Attack Analyst", badgeIcon: "", week: 7, session: 1, hasLesson: true },
  { id: "cs-14", title: "OSINT Awareness & Privacy", href: "/learn/cyber/14", xp: 700, badgeName: "Privacy Scout", badgeIcon: "", week: 7, session: 2, hasLesson: true },
  { id: "cs-15", title: "Risk Assessment & Controls", href: "/learn/cyber/15", xp: 750, badgeName: "Risk Analyst", badgeIcon: "", week: 8, session: 1, hasLesson: true },
  { id: "cs-16", title: "Capstone: Defend the Scenario", href: "/learn/cyber/16", xp: 800, badgeName: "Cyber Defender", badgeIcon: "", week: 8, session: 2, hasLesson: true },
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
    icon: "",
    lessons: AI_LITERACY_LESSONS,
  },
  {
    id: "digital-literacy",
    title: "Digital Literacy",
    subtitle: "Use technology safely, smartly, and ready for work",
    icon: "",
    lessons: DIGITAL_LITERACY_LESSONS,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    subtitle: "Defend systems, data, and people — high school cyber fundamentals",
    icon: "",
    lessons: CYBERSECURITY_LESSONS,
  },
  {
    id: "financial-literacy",
    title: "Financial Literacy",
    subtitle: "Budgets, credit, investing, and money decisions for real life",
    icon: "",
    lessons: FINANCIAL_LITERACY_LESSONS,
  },
  {
    id: "python-starter",
    title: "AI + Python Starter Pack",
    subtitle: "Build your first AI helper with Python",
    icon: "",
    lessons: PYTHON_LESSONS,
  },
  {
    id: "data-analyst",
    title: "Data Analyst Track",
    subtitle: "SQL, tables, and charts for real-world questions",
    icon: "",
    lessons: DATA_ANALYST_LESSONS,
  },
];

export function getTrack(id: Track["id"]): Track | undefined {
  return TRACKS.find((t) => t.id === id);
}

/** The 8-week plan for a track. */
export function weeksForTrack(id: Track["id"]): WeekPlan[] {
  if (id === "python-starter") return PYTHON_WEEKS;
  if (id === "data-analyst") return DATA_ANALYST_WEEKS;
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
