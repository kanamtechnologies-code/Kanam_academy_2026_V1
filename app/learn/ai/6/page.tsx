"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { aiLesson6 } from "@/lib/aiLessons/lesson6";

export default function Page() {
  return <AILessonCanvas lesson={aiLesson6} />;
}
