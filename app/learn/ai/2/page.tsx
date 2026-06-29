"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { aiLesson2 } from "@/lib/aiLessons/lesson2";

export default function Page() {
  return <AILessonCanvas lesson={aiLesson2} />;
}
