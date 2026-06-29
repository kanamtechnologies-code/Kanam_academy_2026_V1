"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { digitalLesson11 } from "@/lib/digitalLessons/lesson11";

export default function Page() {
  return <AILessonCanvas lesson={digitalLesson11} hubLabel="Digital Literacy Hub" />;
}
