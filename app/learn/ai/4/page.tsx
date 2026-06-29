"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { aiLesson4 } from "@/lib/aiLessons/lesson4";

export default function Page() {
  return <AILessonCanvas lesson={aiLesson4} />;
}
