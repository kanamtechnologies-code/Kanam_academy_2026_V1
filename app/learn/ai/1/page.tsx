"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { aiLesson1 } from "@/lib/aiLessons/lesson1";

export default function Page() {
  return <AILessonCanvas lesson={aiLesson1} />;
}
