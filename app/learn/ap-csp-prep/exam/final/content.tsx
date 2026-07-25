"use client";

import { ApCspExamCanvas } from "@/components/apCsp/ApCspExamCanvas";
import { apCspFinalExam } from "@/lib/apCspExams";

export default function Content() {
  return <ApCspExamCanvas exam={apCspFinalExam} />;
}
