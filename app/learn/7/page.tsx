"use client";

import { PythonLessonCanvas } from "@/components/python/PythonLessonCanvas";
import { lesson7 } from "@/lib/pythonLessons/lesson7";

export default function Lesson7Page() {
  return <PythonLessonCanvas lesson={lesson7} />;
}
