"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { digitalLesson12 } from "@/lib/digitalLessons/lesson12";

export default function Page() {
  return <AILessonCanvas lesson={digitalLesson12} hubLabel="Digital Literacy Hub" />;
}
