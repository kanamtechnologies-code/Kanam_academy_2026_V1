"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { digitalLesson2 } from "@/lib/digitalLessons/lesson2";

export default function Page() {
  return <AILessonCanvas lesson={digitalLesson2} hubLabel="Digital Literacy Hub" />;
}
