"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { aiLesson15 } from "@/lib/aiLessons/lesson15";

export default function Page() {
  return <AILessonCanvas lesson={aiLesson15} />;
}
