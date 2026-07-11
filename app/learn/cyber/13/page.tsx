"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { cyberLesson13 } from "@/lib/cyberLessons/lesson13";

export default function Page() {
  return <AILessonCanvas lesson={cyberLesson13} hubLabel="Cybersecurity Hub" />;
}
