"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { advancedAiLesson14 } from "@/lib/advancedAiLessons/lesson14";

export default function Page() {
  return <AILessonCanvas lesson={advancedAiLesson14} hubLabel="Advanced AI Hub" />;
}
