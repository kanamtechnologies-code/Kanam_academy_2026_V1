"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { advancedAiLesson5 } from "@/lib/advancedAiLessons/lesson5";

export default function Page() {
  return <AILessonCanvas lesson={advancedAiLesson5} hubLabel="Advanced AI Hub" />;
}
