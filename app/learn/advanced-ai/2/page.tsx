"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { advancedAiLesson2 } from "@/lib/advancedAiLessons/lesson2";

export default function Page() {
  return <AILessonCanvas lesson={advancedAiLesson2} hubLabel="Advanced AI Hub" />;
}
