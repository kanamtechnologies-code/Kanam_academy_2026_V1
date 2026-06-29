"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { digitalLesson5 } from "@/lib/digitalLessons/lesson5";

export default function Page() {
  return <AILessonCanvas lesson={digitalLesson5} hubLabel="Digital Literacy Hub" />;
}
