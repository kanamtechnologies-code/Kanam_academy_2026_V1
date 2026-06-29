"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { digitalLesson14 } from "@/lib/digitalLessons/lesson14";

export default function Page() {
  return <AILessonCanvas lesson={digitalLesson14} hubLabel="Digital Literacy Hub" />;
}
