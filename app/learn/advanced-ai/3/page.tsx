"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { advancedAiLesson3 } from "@/lib/advancedAiLessons/lesson3";

export default function Page() {
  return <AILessonCanvas lesson={advancedAiLesson3} hubLabel="Advanced AI Hub" />;
}
