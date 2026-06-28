export type LessonRow = {
  id: string;
  title: string;
  href?: string;
  xp: number;
  badgeName: string;
  badgeIcon: string;
  comingSoon?: boolean;
};

export type Track = {
  id: "python-starter" | "data-analyst";
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

const PYTHON_LESSONS: LessonRow[] = [
  { id: "lesson-1", title: "My First AI Helper", href: "/learn/1", xp: 50, badgeName: "The Awakener", badgeIcon: "🤖" },
  { id: "lesson-2", title: "My AI Helper Listens", href: "/learn/2", xp: 100, badgeName: "Listener", badgeIcon: "👂" },
  { id: "lesson-3", title: "My AI Makes Choices", href: "/learn/3", xp: 150, badgeName: "Decision Maker", badgeIcon: "🧠" },
  { id: "lesson-4", title: "Smarter AI Rules", href: "/learn/4", xp: 250, badgeName: "Rule Builder", badgeIcon: "🧠" },
  { id: "lesson-5", title: "AI Repeats Tasks", href: "/learn/5", xp: 300, badgeName: "Loop Starter", badgeIcon: "🔁" },
  { id: "lesson-6", title: "Patterns and Predictions", href: "/learn/6", xp: 350, badgeName: "Pattern Finder", badgeIcon: "🔍" },
  { id: "lesson-7", title: "AI Notices Patterns", href: "/learn/7", xp: 400, badgeName: "Pattern Spotter", badgeIcon: "🧠" },
  { id: "lesson-8", title: "AI Remembers Choices", href: "/learn/8", xp: 450, badgeName: "Memory Builder", badgeIcon: "🧺" },
  { id: "lesson-9", title: "Organizing Memory", href: "/learn/9", xp: 500, badgeName: "Memory Organizer", badgeIcon: "🗂️" },
  { id: "lesson-10", title: "Teaching the Bot Skills (Functions)", href: "/learn/10", xp: 550, badgeName: "Skill Builder", badgeIcon: "🧩" },
  { id: "lesson-11", title: "Giving Functions Better Information (Parameters)", href: "/learn/11", xp: 600, badgeName: "Parameter Pro", badgeIcon: "🎮" },
  { id: "lesson-12", title: "Guiding AI with Rules", href: "/learn/12", xp: 650, badgeName: "Rule Guide", badgeIcon: "🛡️" },
  { id: "lesson-13", title: "Build Your AI NPC", href: "/learn/13", xp: 700, badgeName: "Designer", badgeIcon: "🎨" },
];

const DATA_ANALYST_LESSONS: LessonRow[] = [
  { id: "da-1", title: "What Is Data?", href: "/learn/data/1", xp: 50, badgeName: "Data Spotter", badgeIcon: "📊" },
  { id: "da-2", title: "Your First Query", href: "/learn/data/2", xp: 100, badgeName: "Query Starter", badgeIcon: "🔎" },
  { id: "da-3", title: "Pick the Columns You Need", href: "/learn/data/3", xp: 150, badgeName: "Column Picker", badgeIcon: "📋" },
  { id: "da-4", title: "Find What You're Looking For", href: "/learn/data/4", xp: 200, badgeName: "Filter Finder", badgeIcon: "🎯" },
  { id: "da-5", title: "Sort and Rank", href: "/learn/data/5", xp: 250, badgeName: "Rank Master", badgeIcon: "🏆" },
  { id: "da-6", title: "Count and Summarize", href: "/learn/data/6", xp: 300, badgeName: "Summary Pro", badgeIcon: "🧮" },
  { id: "da-7", title: "Combine Tables", href: "/learn/data/7", xp: 350, badgeName: "Table Joiner", badgeIcon: "🔗" },
  { id: "da-8", title: "Ask Better Questions", href: "/learn/data/8", xp: 400, badgeName: "Question Asker", badgeIcon: "💡" },
  { id: "da-9", title: "Tell the Story with Charts", href: "/learn/data/9", xp: 450, badgeName: "Chart Maker", badgeIcon: "📈" },
  { id: "da-10", title: "Your Data Project", href: "/learn/data/10", xp: 500, badgeName: "Data Analyst", badgeIcon: "🎓" },
];

export const TRACKS: Track[] = [
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
