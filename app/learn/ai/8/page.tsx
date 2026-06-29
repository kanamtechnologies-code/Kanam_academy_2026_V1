"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { aiLesson8 } from "@/lib/aiLessons/lesson8";

export default function Page() {
  return <AILessonCanvas lesson={aiLesson8} />;
}
