"use client";

import { AILessonCanvas } from "@/components/ai/AILessonCanvas";
import { cyberLesson15 } from "@/lib/cyberLessons/lesson15";

export default function Page() {
  return <AILessonCanvas lesson={cyberLesson15} hubLabel="Cybersecurity Hub" />;
}
