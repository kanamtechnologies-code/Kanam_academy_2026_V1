"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { digitalLesson13 } from "@/lib/digitalLessons/lesson13";

export default function Page() {
  return <AILessonCanvas lesson={digitalLesson13} hubLabel="Digital Literacy Hub" />;
}
