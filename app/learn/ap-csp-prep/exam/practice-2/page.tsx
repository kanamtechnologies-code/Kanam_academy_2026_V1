"use client";

import { ApCspExamCanvas } from "@/components/apCsp/ApCspExamCanvas";
import { apCspPracticeExam2 } from "@/lib/apCspExams";

export default function Page() {
  return <ApCspExamCanvas exam={apCspPracticeExam2} />;
}
