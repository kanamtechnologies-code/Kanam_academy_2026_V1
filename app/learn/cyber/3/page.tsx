"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { cyberLesson3 } from "@/lib/cyberLessons/lesson3";

export default function Page() {
  return <AILessonCanvas lesson={cyberLesson3} hubLabel="Cybersecurity Hub" />;
}
