"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { aiLesson12 } from "@/lib/aiLessons/lesson12";

export default function Page() {
  return <AILessonCanvas lesson={aiLesson12} />;
}
