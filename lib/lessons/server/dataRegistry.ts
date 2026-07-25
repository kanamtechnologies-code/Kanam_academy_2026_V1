import "server-only";

import type { DataLessonConfig } from "@/components/data/DataLessonCanvas";

export async function loadDataLesson(lessonId: string): Promise<DataLessonConfig | null> {
  switch (lessonId) {
    case "da-1":
      return (await import("@/lib/dataLessons/lesson1")).daLesson1;
    case "da-2":
      return (await import("@/lib/dataLessons/lesson2")).daLesson2;
    case "da-3":
      return (await import("@/lib/dataLessons/lesson3")).daLesson3;
    case "da-4":
      return (await import("@/lib/dataLessons/lesson4")).daLesson4;
    case "da-5":
      return (await import("@/lib/dataLessons/lesson5")).daLesson5;
    case "da-6":
      return (await import("@/lib/dataLessons/lesson6")).daLesson6;
    case "da-7":
      return (await import("@/lib/dataLessons/lesson7")).daLesson7;
    case "da-8":
      return (await import("@/lib/dataLessons/lesson8")).daLesson8;
    case "da-9":
      return (await import("@/lib/dataLessons/lesson9")).daLesson9;
    case "da-10":
      return (await import("@/lib/dataLessons/lesson10")).daLesson10;
    case "da-11":
      return (await import("@/lib/dataLessons/lesson11")).daLesson11;
    case "da-12":
      return (await import("@/lib/dataLessons/lesson12")).daLesson12;
    case "da-13":
      return (await import("@/lib/dataLessons/lesson13")).daLesson13;
    case "da-14":
      return (await import("@/lib/dataLessons/lesson14")).daLesson14;
    default:
      return null;
  }
}

export function isDataLessonId(lessonId: string): boolean {
  return /^da-(?:[1-9]|1[0-4])$/.test(lessonId);
}
