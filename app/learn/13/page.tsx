"use client";

import { PythonLessonCanvas } from "@/components/python/PythonLessonCanvas";
import { lesson13 } from "@/lib/pythonLessons/lesson13";

export default function Lesson13Page() {
  return <PythonLessonCanvas lesson={lesson13} />;
}
