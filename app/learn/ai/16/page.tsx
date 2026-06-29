"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { aiLesson16 } from "@/lib/aiLessons/lesson16";

export default function Page() {
  return <AILessonCanvas lesson={aiLesson16} />;
}
