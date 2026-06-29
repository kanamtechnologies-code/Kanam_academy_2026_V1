"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { aiLesson7 } from "@/lib/aiLessons/lesson7";

export default function Page() {
  return <AILessonCanvas lesson={aiLesson7} />;
}
