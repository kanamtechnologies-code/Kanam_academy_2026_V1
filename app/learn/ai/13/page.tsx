"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { aiLesson13 } from "@/lib/aiLessons/lesson13";

export default function Page() {
  return <AILessonCanvas lesson={aiLesson13} />;
}
