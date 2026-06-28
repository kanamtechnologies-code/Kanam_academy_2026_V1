"use client";

import { PythonLessonCanvas } from "@/components/python/PythonLessonCanvas";
import { lesson9 } from "@/lib/pythonLessons/lesson9";

export default function Lesson9Page() {
  return <PythonLessonCanvas lesson={lesson9} />;
}
