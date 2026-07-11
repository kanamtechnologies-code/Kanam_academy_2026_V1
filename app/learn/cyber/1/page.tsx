"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { cyberLesson1 } from "@/lib/cyberLessons/lesson1";

export default function Page() {
  return <AILessonCanvas lesson={cyberLesson1} hubLabel="Cybersecurity Hub" />;
}
