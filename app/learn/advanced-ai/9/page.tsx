"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { advancedAiLesson9 } from "@/lib/advancedAiLessons/lesson9";

export default function Page() {
  return <AILessonCanvas lesson={advancedAiLesson9} hubLabel="Advanced AI Hub" />;
}
