"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { cyberLesson5 } from "@/lib/cyberLessons/lesson5";

export default function Page() {
  return <AILessonCanvas lesson={cyberLesson5} hubLabel="Cybersecurity Hub" />;
}
