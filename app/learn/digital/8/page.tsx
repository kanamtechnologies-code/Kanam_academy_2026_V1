"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { digitalLesson8 } from "@/lib/digitalLessons/lesson8";

export default function Page() {
  return <AILessonCanvas lesson={digitalLesson8} hubLabel="Digital Literacy Hub" />;
}
