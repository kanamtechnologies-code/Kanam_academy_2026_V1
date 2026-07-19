/** AP CSP–style practice / final exam types (Kanam prep — not official College Board items). */

export type ApCspBigIdea = 1 | 2 | 3 | 4 | 5;

export type ApCspExamQuestion = {
  id: string;
  /** Big Idea number for score breakdown. */
  bigIdea: ApCspBigIdea;
  /** Topic tag for review filters. */
  topic: string;
  stem: string;
  choices: string[];
  /**
   * Single-select: one index.
   * Multi-select (AP “select two”): exactly two indices — both required for credit.
   */
  correctIndexes: number[];
  explanation: string;
};

export type ApCspExamConfig = {
  id: string;
  slug: "practice-1" | "practice-2" | "final";
  title: string;
  subtitle: string;
  /** Suggested minutes (not enforced). */
  suggestedMinutes: number;
  xpReward: number;
  badge: string;
  questions: ApCspExamQuestion[];
};

export function isMultiSelect(q: ApCspExamQuestion): boolean {
  return q.correctIndexes.length > 1;
}

export function scoreExam(
  exam: ApCspExamConfig,
  answers: Record<string, number[]>
): {
  correct: number;
  total: number;
  percent: number;
  byBigIdea: Record<ApCspBigIdea, { correct: number; total: number }>;
  results: Array<{
    question: ApCspExamQuestion;
    selected: number[];
    isCorrect: boolean;
  }>;
} {
  const byBigIdea: Record<ApCspBigIdea, { correct: number; total: number }> = {
    1: { correct: 0, total: 0 },
    2: { correct: 0, total: 0 },
    3: { correct: 0, total: 0 },
    4: { correct: 0, total: 0 },
    5: { correct: 0, total: 0 },
  };

  const results = exam.questions.map((question) => {
    const selected = [...(answers[question.id] ?? [])].sort((a, b) => a - b);
    const expected = [...question.correctIndexes].sort((a, b) => a - b);
    const isCorrect =
      selected.length === expected.length &&
      selected.every((v, i) => v === expected[i]);
    byBigIdea[question.bigIdea].total += 1;
    if (isCorrect) byBigIdea[question.bigIdea].correct += 1;
    return { question, selected, isCorrect };
  });

  const correct = results.filter((r) => r.isCorrect).length;
  const total = exam.questions.length;
  return {
    correct,
    total,
    percent: total ? Math.round((correct / total) * 100) : 0,
    byBigIdea,
    results,
  };
}
