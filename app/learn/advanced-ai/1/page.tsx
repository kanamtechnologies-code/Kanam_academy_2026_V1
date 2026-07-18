"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { advancedAiLesson1 } from "@/lib/advancedAiLessons/lesson1";

export default function Page() {
  return <AILessonCanvas lesson={advancedAiLesson1} hubLabel="Advanced AI Hub" />;
}
