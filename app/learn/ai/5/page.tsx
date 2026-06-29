"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { aiLesson5 } from "@/lib/aiLessons/lesson5";

export default function Page() {
  return <AILessonCanvas lesson={aiLesson5} />;
}
