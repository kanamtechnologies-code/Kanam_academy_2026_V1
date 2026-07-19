"use client";

import { ApCspExamCanvas } from "@/components/apCsp/ApCspExamCanvas";
import { apCspPracticeExam1 } from "@/lib/apCspExams";

export default function Page() {
  return <ApCspExamCanvas exam={apCspPracticeExam1} />;
}
