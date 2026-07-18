"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { advancedAiLesson13 } from "@/lib/advancedAiLessons/lesson13";

export default function Page() {
  return <AILessonCanvas lesson={advancedAiLesson13} hubLabel="Advanced AI Hub" />;
}
