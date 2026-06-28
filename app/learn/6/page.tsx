"use client";

import { PythonLessonCanvas } from "@/components/python/PythonLessonCanvas";
import { lesson6 } from "@/lib/pythonLessons/lesson6";

export default function Lesson6Page() {
  return <PythonLessonCanvas lesson={lesson6} />;
}
