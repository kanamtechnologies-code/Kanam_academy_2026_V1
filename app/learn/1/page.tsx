"use client";

import { PythonLessonCanvas } from "@/components/python/PythonLessonCanvas";
import { lesson1 } from "@/lib/pythonLessons/lesson1";

export default function Page() {
  return <PythonLessonCanvas lesson={lesson1} />;
}
