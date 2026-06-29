"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { digitalLesson7 } from "@/lib/digitalLessons/lesson7";

export default function Page() {
  return <AILessonCanvas lesson={digitalLesson7} hubLabel="Digital Literacy Hub" />;
}
