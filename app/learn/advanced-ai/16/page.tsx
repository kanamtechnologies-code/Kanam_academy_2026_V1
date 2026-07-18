"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { advancedAiLesson16 } from "@/lib/advancedAiLessons/lesson16";

export default function Page() {
  return <AILessonCanvas lesson={advancedAiLesson16} hubLabel="Advanced AI Hub" />;
}
