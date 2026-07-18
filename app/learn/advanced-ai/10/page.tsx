"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { advancedAiLesson10 } from "@/lib/advancedAiLessons/lesson10";

export default function Page() {
  return <AILessonCanvas lesson={advancedAiLesson10} hubLabel="Advanced AI Hub" />;
}
