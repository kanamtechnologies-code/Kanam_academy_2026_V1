"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { digitalLesson4 } from "@/lib/digitalLessons/lesson4";

export default function Page() {
  return <AILessonCanvas lesson={digitalLesson4} hubLabel="Digital Literacy Hub" />;
}
