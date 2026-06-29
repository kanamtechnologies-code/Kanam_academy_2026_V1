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
  id: "python-starter" | "data-analyst" | "ai-literacy";
  title: string;
  subtitle: string;
  icon: string;
  lessons: LessonRow[];
};

/** Complete Python lessons 1–3 before the Data Analyst track unlocks. */
export const DATA_ANALYST_PREREQUISITES = ["lesson-1", "lesson-2", "lesson-3"] as const;

/**
 * Production-safe default: locked until prerequisites are complete.
 * Set NEXT_PUBLIC_DATA_ANALYST_UNLOCK_FOR_TESTING=true only for demos/testing.
 */
export const DATA_ANALYST_UNLOCK_FOR_TESTING =
  process.env.NEXT_PUBLIC_DATA_ANALYST_UNLOCK_FOR_TESTING === "true";

export function isDataAnalystTrackUnlocked(_completedIds: string[]): boolean {
  if (DATA_ANALYST_UNLOCK_FOR_TESTING) return true;
  return DATA_ANALYST_PREREQUISITES.every((id) => _completedIds.includes(id));
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

export function trackProgress(completedIds: string[], lessons: LessonRow[]) {
  const completedCount = lessons.filter((l) => completedIds.includes(l.id)).length;
  const totalCount = lessons.length;
  const percent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
  const totalXp = lessons
    .filter((l) => completedIds.includes(l.id))
    .reduce((sum, l) => sum + l.xp, 0);
  const activeIndex = lessons.findIndex((l) => !completedIds.includes(l.id));
  const nextLesson = activeIndex >= 0 ? lessons[activeIndex] : undefined;
  return { completedCount, totalCount, percent, totalXp, activeIndex, nextLesson };
}

export const PYTHON_WEEKS: WeekPlan[] = [
  { week: 1, theme: "Meet Your AI Helper", focus: "Output, variables, and input — your AI says hello and listens." },
  { week: 2, theme: "Teaching AI to Decide", focus: "Conditionals: if / else and chained if / elif / else rules." },
  { week: 3, theme: "Repeating Work", focus: "for loops and combining a loop with a rule to make patterns." },
  { week: 4, theme: "Patterns & State", focus: "Loops that build up a value (counters/accumulators) + a checkpoint review." },
  { week: 5, theme: "Giving AI a Memory", focus: "Lists and dictionaries — storing many values and looking them up by name." },
  { week: 6, theme: "Reusable Skills", focus: "Functions and parameters — package a skill once, reuse it everywhere." },
  { week: 7, theme: "Smart, Rule-Driven AI", focus: "Rules inside functions, then plan your capstone NPC." },
  { week: 8, theme: "Capstone: Build Your AI NPC", focus: "Combine everything into one project, test it, and reflect." },
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
  { id: "lesson-1", title: "My First AI Helper", href: "/learn/1", xp: 50, badgeName: "The Awakener", badgeIcon: "🤖", week: 1, session: 1, hasLesson: true },
  { id: "lesson-2", title: "My AI Helper Listens", href: "/learn/2", xp: 100, badgeName: "Listener", badgeIcon: "👂", week: 1, session: 2, hasLesson: true },
  { id: "lesson-3", title: "My AI Makes Choices", href: "/learn/3", xp: 150, badgeName: "Decision Maker", badgeIcon: "🧠", week: 2, session: 1, hasLesson: true },
  { id: "lesson-4", title: "Smarter AI Rules", href: "/learn/4", xp: 250, badgeName: "Rule Builder", badgeIcon: "🧠", week: 2, session: 2, hasLesson: true },
  { id: "lesson-5", title: "AI Repeats Tasks", href: "/learn/5", xp: 300, badgeName: "Loop Starter", badgeIcon: "🔁", week: 3, session: 1, hasLesson: true },
  { id: "lesson-6", title: "Patterns and Predictions", href: "/learn/6", xp: 350, badgeName: "Pattern Finder", badgeIcon: "🔍", week: 3, session: 2, hasLesson: true },
  { id: "lesson-7", title: "AI Notices Patterns", href: "/learn/7", xp: 400, badgeName: "Pattern Spotter", badgeIcon: "🧠", week: 4, session: 1, hasLesson: true },
  { id: "lesson-8", title: "AI Remembers Choices", href: "/learn/8", xp: 450, badgeName: "Memory Builder", badgeIcon: "🧺", week: 5, session: 1, hasLesson: true },
  { id: "lesson-9", title: "Organizing Memory", href: "/learn/9", xp: 500, badgeName: "Memory Organizer", badgeIcon: "🗂️", week: 5, session: 2, hasLesson: true },
  { id: "lesson-10", title: "Teaching the Bot Skills (Functions)", href: "/learn/10", xp: 550, badgeName: "Skill Builder", badgeIcon: "🧩", week: 6, session: 1, hasLesson: true },
  { id: "lesson-11", title: "Giving Functions Better Information (Parameters)", href: "/learn/11", xp: 600, badgeName: "Parameter Pro", badgeIcon: "🎮", week: 6, session: 2, hasLesson: true },
  { id: "lesson-12", title: "Guiding AI with Rules", href: "/learn/12", xp: 650, badgeName: "Rule Guide", badgeIcon: "🛡️", week: 7, session: 1, hasLesson: true },
  { id: "lesson-13", title: "Build Your AI NPC", href: "/learn/13", xp: 700, badgeName: "Designer", badgeIcon: "🎨", week: 8, session: 1, hasLesson: true },
];

const DATA_ANALYST_LESSONS: LessonRow[] = [
  { id: "da-1", title: "What Is Data?", href: "/learn/data/1", xp: 50, badgeName: "Data Spotter", badgeIcon: "📊", week: 1, session: 1, hasLesson: true },
  { id: "da-2", title: "Your First Query", href: "/learn/data/2", xp: 100, badgeName: "Query Starter", badgeIcon: "🔎", week: 1, session: 2, hasLesson: true },
  { id: "da-3", title: "Pick the Columns You Need", href: "/learn/data/3", xp: 150, badgeName: "Column Picker", badgeIcon: "📋", week: 2, session: 1, hasLesson: true },
  { id: "da-4", title: "Find What You're Looking For", href: "/learn/data/4", xp: 200, badgeName: "Filter Finder", badgeIcon: "🎯", week: 2, session: 2, hasLesson: true },
  { id: "da-5", title: "Sort and Rank", href: "/learn/data/5", xp: 250, badgeName: "Rank Master", badgeIcon: "🏆", week: 3, session: 1, hasLesson: true },
  { id: "da-6", title: "Count and Summarize", href: "/learn/data/6", xp: 300, badgeName: "Summary Pro", badgeIcon: "🧮", week: 3, session: 2, hasLesson: true },
  { id: "da-7", title: "Combine Tables", href: "/learn/data/7", xp: 350, badgeName: "Table Joiner", badgeIcon: "🔗", week: 4, session: 1, hasLesson: true },
  { id: "da-8", title: "Ask Better Questions", href: "/learn/data/8", xp: 400, badgeName: "Question Asker", badgeIcon: "💡", week: 4, session: 2, hasLesson: true },
  { id: "da-9", title: "Tell the Story with Charts", href: "/learn/data/9", xp: 450, badgeName: "Chart Maker", badgeIcon: "📈", week: 5, session: 1, hasLesson: true },
  { id: "da-10", title: "Parts of a Whole", href: "/learn/data/10", xp: 500, badgeName: "Slice Master", badgeIcon: "🥧", week: 5, session: 2, hasLesson: true },
  { id: "da-11", title: "Change Over Time", href: "/learn/data/11", xp: 550, badgeName: "Trend Spotter", badgeIcon: "📉", week: 6, session: 1, hasLesson: true },
  { id: "da-12", title: "Distributions", href: "/learn/data/12", xp: 600, badgeName: "Distribution Detective", badgeIcon: "📊", week: 6, session: 2, hasLesson: true },
  { id: "da-13", title: "Relationships", href: "/learn/data/13", xp: 650, badgeName: "Relationship Finder", badgeIcon: "🔬", week: 7, session: 1, hasLesson: true },
  { id: "da-14", title: "Your Data Project", href: "/learn/data/14", xp: 700, badgeName: "Data Analyst", badgeIcon: "🎓", week: 8, session: 1, hasLesson: true },
];

const AI_LITERACY_LESSONS: LessonRow[] = [
  { id: "ai-1", title: "What Is AI, Really?", href: "/learn/ai/1", xp: 50, badgeName: "AI Explorer", badgeIcon: "🤖", week: 1, session: 1, hasLesson: true },
  { id: "ai-2", title: "AI Is All Around You", href: "/learn/ai/2", xp: 100, badgeName: "AI Spotter", badgeIcon: "👀", week: 1, session: 2, hasLesson: true },
  { id: "ai-3", title: "How Computers See and Hear", href: "/learn/ai/3", xp: 150, badgeName: "Sense Maker", badgeIcon: "📷", week: 2, session: 1, hasLesson: true },
  { id: "ai-4", title: "Turning the World Into Data", href: "/learn/ai/4", xp: 200, badgeName: "Data Translator", badgeIcon: "🔢", week: 2, session: 2, hasLesson: true },
  { id: "ai-5", title: "How AI Learns From Examples", href: "/learn/ai/5", xp: 250, badgeName: "Pattern Learner", badgeIcon: "🧠", week: 3, session: 1, hasLesson: true },
  { id: "ai-6", title: "Training, Testing, and Mistakes", href: "/learn/ai/6", xp: 300, badgeName: "Model Tester", badgeIcon: "🎯", week: 3, session: 2, hasLesson: true },
  { id: "ai-7", title: "What Is Generative AI?", href: "/learn/ai/7", xp: 350, badgeName: "Creator's Apprentice", badgeIcon: "✨", week: 4, session: 1, hasLesson: true },
  { id: "ai-8", title: "Inside a Large Language Model", href: "/learn/ai/8", xp: 400, badgeName: "LLM Insider", badgeIcon: "💬", week: 4, session: 2, hasLesson: true },
  { id: "ai-9", title: "How to Talk to AI (Prompting)", href: "/learn/ai/9", xp: 450, badgeName: "Prompt Starter", badgeIcon: "🗝️", week: 5, session: 1, hasLesson: true },
  { id: "ai-10", title: "Better Prompts, Better Answers", href: "/learn/ai/10", xp: 500, badgeName: "Prompt Pro", badgeIcon: "🎨", week: 5, session: 2, hasLesson: true },
  { id: "ai-11", title: "Don't Trust — Verify", href: "/learn/ai/11", xp: 550, badgeName: "Fact Checker", badgeIcon: "🔍", week: 6, session: 1, hasLesson: true },
  { id: "ai-12", title: "AI at School: Help vs. Cheating", href: "/learn/ai/12", xp: 600, badgeName: "Honest Scholar", badgeIcon: "📚", week: 6, session: 2, hasLesson: true },
  { id: "ai-13", title: "Bias, Fairness, and Data", href: "/learn/ai/13", xp: 650, badgeName: "Fairness Guardian", badgeIcon: "⚖️", week: 7, session: 1, hasLesson: true },
  { id: "ai-14", title: "Privacy, Deepfakes, and Your Footprint", href: "/learn/ai/14", xp: 700, badgeName: "Privacy Defender", badgeIcon: "🛡️", week: 7, session: 2, hasLesson: true },
  { id: "ai-15", title: "AI and the Future of Work", href: "/learn/ai/15", xp: 750, badgeName: "Future Ready", badgeIcon: "🚀", week: 8, session: 1, hasLesson: true },
  { id: "ai-16", title: "Capstone: Be an AI-Smart Citizen", href: "/learn/ai/16", xp: 800, badgeName: "AI-Smart Citizen", badgeIcon: "🎓", week: 8, session: 2, hasLesson: true },
];

export const TRACKS: Track[] = [
  {
    id: "ai-literacy",
    title: "AI Literacy",
    subtitle: "What AI is, how it works, and how to use it wisely",
    icon: "🧠",
    lessons: AI_LITERACY_LESSONS,
  },
  {
    id: "python-starter",
    title: "AI + Python Starter Pack",
    subtitle: "Build your first AI helper with Python",
    icon: "🤖",
    lessons: PYTHON_LESSONS,
  },
  {
    id: "data-analyst",
    title: "Data Analyst Track",
    subtitle: "SQL, tables, and charts for real-world questions",
    icon: "📊",
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
