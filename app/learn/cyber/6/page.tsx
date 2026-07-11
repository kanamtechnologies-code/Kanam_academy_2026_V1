"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { cyberLesson6 } from "@/lib/cyberLessons/lesson6";

export default function Page() {
  return <AILessonCanvas lesson={cyberLesson6} hubLabel="Cybersecurity Hub" />;
}
