"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { advancedAiLesson8 } from "@/lib/advancedAiLessons/lesson8";

export default function Page() {
  return <AILessonCanvas lesson={advancedAiLesson8} hubLabel="Advanced AI Hub" />;
}
