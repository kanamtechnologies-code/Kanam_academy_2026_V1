"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { advancedAiLesson7 } from "@/lib/advancedAiLessons/lesson7";

export default function Page() {
  return <AILessonCanvas lesson={advancedAiLesson7} hubLabel="Advanced AI Hub" />;
}
