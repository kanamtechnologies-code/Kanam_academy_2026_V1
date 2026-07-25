export type PythonCheckRequest = {
  exerciseId: string;
  code: string;
  run: {
    stdout: string[];
    error?: string | null;
  };
  prediction?: string;
  playTurns?: number;
  /** Dev-only UI helper — ignored in production. */
  tempPass?: boolean;
};

export type PythonCheckResponse = {
  ok: boolean;
  codeOk: boolean;
  predictionOk?: boolean;
  feedback: string;
  projectChecks?: Record<string, boolean>;
  lessonComplete?: boolean;
};
