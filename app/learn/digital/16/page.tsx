"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { digitalLesson16 } from "@/lib/digitalLessons/lesson16";

export default function Page() {
  return <AILessonCanvas lesson={digitalLesson16} hubLabel="Digital Literacy Hub" />;
}
