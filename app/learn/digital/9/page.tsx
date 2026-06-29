"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { digitalLesson9 } from "@/lib/digitalLessons/lesson9";

export default function Page() {
  return <AILessonCanvas lesson={digitalLesson9} hubLabel="Digital Literacy Hub" />;
}
