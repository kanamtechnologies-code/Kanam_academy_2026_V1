"use client";

import { PythonLessonCanvas } from "@/components/python/PythonLessonCanvas";
import { lesson4 } from "@/lib/pythonLessons/lesson4";

export default function Page() {
  return <PythonLessonCanvas lesson={lesson4} />;
}
