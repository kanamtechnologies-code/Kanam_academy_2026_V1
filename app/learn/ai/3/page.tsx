"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { aiLesson3 } from "@/lib/aiLessons/lesson3";

export default function Page() {
  return <AILessonCanvas lesson={aiLesson3} />;
}
