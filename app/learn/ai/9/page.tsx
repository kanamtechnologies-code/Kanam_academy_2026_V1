"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { aiLesson9 } from "@/lib/aiLessons/lesson9";

export default function Page() {
  return <AILessonCanvas lesson={aiLesson9} />;
}
