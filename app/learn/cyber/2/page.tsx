"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { cyberLesson2 } from "@/lib/cyberLessons/lesson2";

export default function Page() {
  return <AILessonCanvas lesson={cyberLesson2} hubLabel="Cybersecurity Hub" />;
}
