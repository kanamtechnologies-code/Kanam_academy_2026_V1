export type ProgressRow = {
  student_id?: string;
  lesson_id: string;
  opened_at: string | null;
  last_event_at: string | null;
  success: boolean;
  success_at: string | null;
  has_run: boolean;
  cfu_total?: number;
  cfu_revealed_count?: number;
  time_spent_seconds?: number | null;
  quiz_attempts?: number | null;
  quiz_correct?: number | null;
  activities_completed?: number | null;
  activities_total?: number | null;
  exam_percent?: number | null;
  exam_correct?: number | null;
  exam_total?: number | null;
};

export type ProgressEventRow = {
  id?: string;
  student_id?: string | null;
  lesson_id: string | null;
  event_type: string;
  payload: Record<string, unknown> | null;
  created_at: string;
};

export type TrackInsight = {
  trackId: string;
  trackTitle: string;
  icon: string;
  completedCount: number;
  totalCount: number;
  percent: number;
  xp: number;
  inProgressCount: number;
  assessmentCompleted: number;
  assessmentTotal: number;
};

export type ExamInsight = {
  lessonId: string;
  title: string;
  slug: string | null;
  correct: number;
  total: number;
  percent: number;
  completedAt: string | null;
};

export type LessonActivityInsight = {
  lessonId: string;
  title: string;
  trackTitle: string;
  status: "completed" | "in_progress" | "not_started";
  openedAt: string | null;
  lastEventAt: string | null;
  successAt: string | null;
  timeSpentSeconds: number;
  hasRun: boolean;
};

export type DailyActivityPoint = {
  date: string;
  events: number;
  lessonsTouched: number;
  completions: number;
};

export type LearnerInsights = {
  studentId: string;
  displayName: string;
  grade: string | null;
  generatedAt: string;

  summary: {
    totalXp: number;
    lessonsCompleted: number;
    lessonsTotal: number;
    progressPercent: number;
    lessonsInProgress: number;
    lessonsOpened: number;
    lastActiveAt: string | null;
    firstActiveAt: string | null;
    activityStreakDays: number;
    longestStreakDays: number;
    activeDaysLast30: number;
    timeSpentSeconds: number;
    timeSpentEstimated: boolean;
    quizAttempts: number;
    quizCorrect: number;
    quizAccuracyPercent: number | null;
    activitiesCompleted: number;
    examAveragePercent: number | null;
    examsTaken: number;
  };

  tracks: TrackInsight[];
  exams: ExamInsight[];
  recentLessons: LessonActivityInsight[];
  dailyActivity: DailyActivityPoint[];
  weakTracks: TrackInsight[];
};

export type ClassLearnerSummary = {
  studentId: string;
  displayName: string;
  grade: string | null;
  progressPercent: number;
  lessonsCompleted: number;
  totalXp: number;
  lastActiveAt: string | null;
  activityStreakDays: number;
  timeSpentSeconds: number;
  quizAccuracyPercent: number | null;
  examAveragePercent: number | null;
};

export type ClassInsights = {
  classId: string;
  className: string;
  generatedAt: string;
  learnerCount: number;
  summary: {
    avgProgressPercent: number;
    avgXp: number;
    avgStreakDays: number;
    avgTimeSpentSeconds: number;
    avgQuizAccuracyPercent: number | null;
    activeLast7Days: number;
    activeLast30Days: number;
    neverActive: number;
    examsTaken: number;
    avgExamPercent: number | null;
  };
  tracks: Array<{
    trackId: string;
    trackTitle: string;
    icon: string;
    avgPercent: number;
    learnersStarted: number;
    learnersCompleted: number;
  }>;
  learners: ClassLearnerSummary[];
  dailyActivity: DailyActivityPoint[];
  /** Learner × day activity intensity (event counts) for class heatmaps. */
  heatmap: {
    days: string[];
    rows: Array<{
      studentId: string;
      displayName: string;
      byDay: Record<string, number>;
      max: number;
    }>;
    maxCell: number;
  };
  /** Learner × track completion percent for secondary heatmap. */
  trackHeatmap: {
    trackIds: string[];
    trackTitles: string[];
    rows: Array<{
      studentId: string;
      displayName: string;
      byTrack: Record<string, number>;
    }>;
  };
};
