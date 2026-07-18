"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { advancedAiLesson12 } from "@/lib/advancedAiLessons/lesson12";

export default function Page() {
  return <AILessonCanvas lesson={advancedAiLesson12} hubLabel="Advanced AI Hub" />;
}
