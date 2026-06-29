"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { digitalLesson10 } from "@/lib/digitalLessons/lesson10";

export default function Page() {
  return <AILessonCanvas lesson={digitalLesson10} hubLabel="Digital Literacy Hub" />;
}
