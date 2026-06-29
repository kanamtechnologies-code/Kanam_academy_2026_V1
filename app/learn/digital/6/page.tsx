"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { digitalLesson6 } from "@/lib/digitalLessons/lesson6";

export default function Page() {
  return <AILessonCanvas lesson={digitalLesson6} hubLabel="Digital Literacy Hub" />;
}
