"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { cyberLesson10 } from "@/lib/cyberLessons/lesson10";

export default function Page() {
  return <AILessonCanvas lesson={cyberLesson10} hubLabel="Cybersecurity Hub" />;
}
