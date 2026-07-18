"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { advancedAiLesson15 } from "@/lib/advancedAiLessons/lesson15";

export default function Page() {
  return <AILessonCanvas lesson={advancedAiLesson15} hubLabel="Advanced AI Hub" />;
}
