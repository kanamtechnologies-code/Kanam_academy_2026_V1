"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { aiLesson10 } from "@/lib/aiLessons/lesson10";

export default function Page() {
  return <AILessonCanvas lesson={aiLesson10} />;
}
