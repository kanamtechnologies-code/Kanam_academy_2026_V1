"use client";

import { PythonLessonCanvas } from "@/components/python/PythonLessonCanvas";
import { lesson8 } from "@/lib/pythonLessons/lesson8";

export default function Lesson8Page() {
  return <PythonLessonCanvas lesson={lesson8} />;
}
