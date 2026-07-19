/**
 * Kanam Academy — AP CSP Prep exam banks.
 * Original prep items only; these are NOT official College Board questions.
 */

export type {
  ApCspBigIdea,
  ApCspExamQuestion,
  ApCspExamConfig,
} from "./types";
export { isMultiSelect, scoreExam } from "./types";

export { apCspPracticeExam1 } from "./practice1";
export { apCspPracticeExam2 } from "./practice2";
export { apCspFinalExam } from "./final";

import type { ApCspExamConfig } from "./types";
import { apCspPracticeExam1 } from "./practice1";
import { apCspPracticeExam2 } from "./practice2";
import { apCspFinalExam } from "./final";

/** All AP CSP Prep exams in intended order (two practice tests, then the final). */
export const apCspExams: ApCspExamConfig[] = [
  apCspPracticeExam1,
  apCspPracticeExam2,
  apCspFinalExam,
];

/** Look up an exam by its slug ("practice-1" | "practice-2" | "final"). */
export function getApCspExamBySlug(
  slug: ApCspExamConfig["slug"]
): ApCspExamConfig | undefined {
  return apCspExams.find((exam) => exam.slug === slug);
}

/** Look up an exam by its id ("csp-practice-1" | "csp-practice-2" | "csp-final"). */
export function getApCspExamById(id: string): ApCspExamConfig | undefined {
  return apCspExams.find((exam) => exam.id === id);
}
