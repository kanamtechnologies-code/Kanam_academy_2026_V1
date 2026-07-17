/** Persist that the learner finished the slide deck (+ check-ins) for a lesson. */
export function lessonModuleUnlockKey(lessonId: string) {
  return `kanam.lessonModuleDone:${lessonId}`;
}

export function readLessonModuleUnlocked(lessonId: string): boolean {
  try {
    return window.localStorage.getItem(lessonModuleUnlockKey(lessonId)) === "1";
  } catch {
    return false;
  }
}

export function writeLessonModuleUnlocked(lessonId: string) {
  try {
    window.localStorage.setItem(lessonModuleUnlockKey(lessonId), "1");
  } catch {
    // ignore
  }
}
