"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { advancedAiLesson6 } from "@/lib/advancedAiLessons/lesson6";

export default function Page() {
  return <AILessonCanvas lesson={advancedAiLesson6} hubLabel="Advanced AI Hub" />;
}
