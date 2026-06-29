"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { digitalLesson15 } from "@/lib/digitalLessons/lesson15";

export default function Page() {
  return <AILessonCanvas lesson={digitalLesson15} hubLabel="Digital Literacy Hub" />;
}
