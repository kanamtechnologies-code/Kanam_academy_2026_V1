export type StudentLessonAccess = {
  classRestricted: boolean;
  /** When classRestricted, only these lesson ids are open (plus any already completed). */
  enabledLessonIds: string[] | null;
  classIds: string[];
  /** True when the student is only in the shared self-paced / async cohort. */
  isAsyncCohort?: boolean;
};

export function unionEnabledLessonIds(
  rows: Array<{ lesson_id: string; enabled: boolean }>
): string[] {
  const ids = new Set<string>();
  for (const row of rows) {
    if (row.enabled) ids.add(row.lesson_id);
  }
  return Array.from(ids);
}
