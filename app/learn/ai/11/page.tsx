"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { aiLesson11 } from "@/lib/aiLessons/lesson11";

export default function Page() {
  return <AILessonCanvas lesson={aiLesson11} />;
}
