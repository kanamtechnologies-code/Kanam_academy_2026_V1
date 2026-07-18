"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { advancedAiLesson11 } from "@/lib/advancedAiLessons/lesson11";

export default function Page() {
  return <AILessonCanvas lesson={advancedAiLesson11} hubLabel="Advanced AI Hub" />;
}
