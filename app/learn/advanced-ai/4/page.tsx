"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { advancedAiLesson4 } from "@/lib/advancedAiLessons/lesson4";

export default function Page() {
  return <AILessonCanvas lesson={advancedAiLesson4} hubLabel="Advanced AI Hub" />;
}
