"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { apCspLesson15 } from "@/lib/apCspLessons/lesson15";

export default function Page() {
  return <AILessonCanvas lesson={apCspLesson15} hubLabel="AP CSP Prep Hub" />;
}
