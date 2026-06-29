"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { digitalLesson1 } from "@/lib/digitalLessons/lesson1";

export default function Page() {
  return <AILessonCanvas lesson={digitalLesson1} hubLabel="Digital Literacy Hub" />;
}
