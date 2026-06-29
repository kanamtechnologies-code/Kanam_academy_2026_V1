"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { digitalLesson3 } from "@/lib/digitalLessons/lesson3";

export default function Page() {
  return <AILessonCanvas lesson={digitalLesson3} hubLabel="Digital Literacy Hub" />;
}
