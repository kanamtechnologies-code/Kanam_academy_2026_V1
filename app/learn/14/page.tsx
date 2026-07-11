"use client";

import { PythonLessonCanvas } from "@/components/python/PythonLessonCanvas";
import { lesson14 } from "@/lib/pythonLessons/lesson14";

export default function Page() {
  return <PythonLessonCanvas lesson={lesson14} />;
}
