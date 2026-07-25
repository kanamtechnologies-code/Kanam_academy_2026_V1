import type { QueryResult } from "@/lib/sqlRunner";

export type DataCheckRequest = {
  exerciseId: string;
  sql: string;
  result: QueryResult | null;
  resultError?: string | null;
  prediction?: string;
  tempPass?: boolean;
};

export type DataCheckResponse = {
  ok: boolean;
  codeOk: boolean;
  predictionOk?: boolean;
  feedback: string;
  lessonComplete?: boolean;
};
