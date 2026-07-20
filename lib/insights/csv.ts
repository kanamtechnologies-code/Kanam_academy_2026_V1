import type { ClassInsights, LearnerInsights } from "@/lib/insights/types";

function formatDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const remM = m % 60;
  return remM ? `${h}h ${remM}m` : `${h}h`;
}

function escapeCell(value: unknown): string {
  const s = value == null ? "" : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function rowsToCsv(headers: string[], rows: Array<Array<unknown>>): string {
  const lines = [
    headers.map(escapeCell).join(","),
    ...rows.map((row) => row.map(escapeCell).join(",")),
  ];
  return `${lines.join("\n")}\n`;
}

export function learnerInsightsToCsv(insights: LearnerInsights): string {
  const sections: string[] = [];

  sections.push(
    rowsToCsv(
      ["metric", "value"],
      [
        ["display_name", insights.displayName],
        ["grade", insights.grade ?? ""],
        ["generated_at", insights.generatedAt],
        ["progress_percent", insights.summary.progressPercent],
        ["lessons_completed", insights.summary.lessonsCompleted],
        ["lessons_total", insights.summary.lessonsTotal],
        ["total_xp", insights.summary.totalXp],
        ["time_spent", formatDuration(insights.summary.timeSpentSeconds)],
        ["time_spent_seconds", insights.summary.timeSpentSeconds],
        ["activity_streak_days", insights.summary.activityStreakDays],
        ["longest_streak_days", insights.summary.longestStreakDays],
        ["active_days_last_30", insights.summary.activeDaysLast30],
        ["quiz_accuracy_percent", insights.summary.quizAccuracyPercent ?? ""],
        ["quiz_attempts", insights.summary.quizAttempts],
        ["quiz_correct", insights.summary.quizCorrect],
        ["activities_completed", insights.summary.activitiesCompleted],
        ["exam_average_percent", insights.summary.examAveragePercent ?? ""],
        ["exams_taken", insights.summary.examsTaken],
        ["last_active_at", insights.summary.lastActiveAt ?? ""],
        ["first_active_at", insights.summary.firstActiveAt ?? ""],
      ]
    )
  );

  sections.push(
    rowsToCsv(
      [
        "track_id",
        "track_title",
        "completed",
        "total",
        "percent",
        "xp",
        "in_progress",
        "assessments_completed",
        "assessments_total",
      ],
      insights.tracks.map((t) => [
        t.trackId,
        t.trackTitle,
        t.completedCount,
        t.totalCount,
        t.percent,
        t.xp,
        t.inProgressCount,
        t.assessmentCompleted,
        t.assessmentTotal,
      ])
    )
  );

  if (insights.exams.length > 0) {
    sections.push(
      rowsToCsv(
        ["lesson_id", "title", "slug", "correct", "total", "percent", "completed_at"],
        insights.exams.map((e) => [
          e.lessonId,
          e.title,
          e.slug ?? "",
          e.correct,
          e.total,
          e.percent,
          e.completedAt ?? "",
        ])
      )
    );
  }

  sections.push(
    rowsToCsv(
      ["date", "events", "lessons_touched", "completions"],
      insights.dailyActivity.map((d) => [d.date, d.events, d.lessonsTouched, d.completions])
    )
  );

  return sections.join("\n");
}

export function classInsightsToCsv(insights: ClassInsights): string {
  const sections: string[] = [];

  sections.push(
    rowsToCsv(
      ["metric", "value"],
      [
        ["class_name", insights.className],
        ["class_id", insights.classId],
        ["generated_at", insights.generatedAt],
        ["learner_count", insights.learnerCount],
        ["avg_progress_percent", insights.summary.avgProgressPercent],
        ["avg_xp", insights.summary.avgXp],
        ["avg_streak_days", insights.summary.avgStreakDays],
        ["avg_time_spent_seconds", insights.summary.avgTimeSpentSeconds],
        ["avg_quiz_accuracy_percent", insights.summary.avgQuizAccuracyPercent ?? ""],
        ["active_last_7_days", insights.summary.activeLast7Days],
        ["active_last_30_days", insights.summary.activeLast30Days],
        ["never_active", insights.summary.neverActive],
        ["exams_taken", insights.summary.examsTaken],
        ["avg_exam_percent", insights.summary.avgExamPercent ?? ""],
      ]
    )
  );

  sections.push(
    rowsToCsv(
      [
        "student_id",
        "display_name",
        "grade",
        "progress_percent",
        "lessons_completed",
        "total_xp",
        "activity_streak_days",
        "time_spent_seconds",
        "quiz_accuracy_percent",
        "exam_average_percent",
        "last_active_at",
      ],
      insights.learners.map((l) => [
        l.studentId,
        l.displayName,
        l.grade ?? "",
        l.progressPercent,
        l.lessonsCompleted,
        l.totalXp,
        l.activityStreakDays,
        l.timeSpentSeconds,
        l.quizAccuracyPercent ?? "",
        l.examAveragePercent ?? "",
        l.lastActiveAt ?? "",
      ])
    )
  );

  sections.push(
    rowsToCsv(
      [
        "track_id",
        "track_title",
        "avg_percent",
        "learners_started",
        "learners_completed",
      ],
      insights.tracks.map((t) => [
        t.trackId,
        t.trackTitle,
        t.avgPercent,
        t.learnersStarted,
        t.learnersCompleted,
      ])
    )
  );

  if (insights.heatmap.days.length > 0) {
    const headers = ["learner", ...insights.heatmap.days];
    sections.push(
      rowsToCsv(
        headers,
        insights.heatmap.rows.map((row) => [
          row.displayName,
          ...insights.heatmap.days.map((day) => row.byDay[day] ?? 0),
        ])
      )
    );
  }

  return sections.join("\n");
}
