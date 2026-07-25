import "server-only";

import type { PythonLessonConfig } from "@/components/python/PythonLessonCanvas";

/**
 * Server-only loader for full Python lessons (includes validators / solutions).
 * Never import this from client components.
 */
export async function loadPythonLesson(
  lessonId: string
): Promise<PythonLessonConfig | null> {
  switch (lessonId) {
    case "demo-lesson-1":
      return (await import("@/lib/pythonLessons/demoLesson")).demoLesson;
    case "lesson-1":
      return (await import("@/lib/pythonLessons/lesson1")).lesson1;
    case "lesson-2":
      return (await import("@/lib/pythonLessons/lesson2")).lesson2;
    case "lesson-3":
      return (await import("@/lib/pythonLessons/lesson3")).lesson3;
    case "lesson-4":
      return (await import("@/lib/pythonLessons/lesson4")).lesson4;
    case "lesson-5":
      return (await import("@/lib/pythonLessons/lesson5")).lesson5;
    case "lesson-6":
      return (await import("@/lib/pythonLessons/lesson6")).lesson6;
    case "lesson-7":
      return (await import("@/lib/pythonLessons/lesson7")).lesson7;
    case "lesson-8":
      return (await import("@/lib/pythonLessons/lesson8")).lesson8;
    case "lesson-9":
      return (await import("@/lib/pythonLessons/lesson9")).lesson9;
    case "lesson-10":
      return (await import("@/lib/pythonLessons/lesson10")).lesson10;
    case "lesson-11":
      return (await import("@/lib/pythonLessons/lesson11")).lesson11;
    case "lesson-12":
      return (await import("@/lib/pythonLessons/lesson12")).lesson12;
    case "lesson-13":
      return (await import("@/lib/pythonLessons/lesson13")).lesson13;
    case "lesson-14":
      return (await import("@/lib/pythonLessons/lesson14")).lesson14;
    default:
      return null;
  }
}

export function isPythonLessonId(lessonId: string): boolean {
  return (
    lessonId === "demo-lesson-1" ||
    /^lesson-(?:[1-9]|1[0-4])$/.test(lessonId)
  );
}
