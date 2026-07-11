/** Normalize free-text predictions for forgiving comparison. */
export function normalizePrediction(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/g, "");
}

/** True if the learner prediction matches any accepted answer (after normalize). */
export function predictionMatches(prediction: string, accepted: string[]): boolean {
  const normalized = normalizePrediction(prediction);
  if (!normalized) return false;
  return accepted.some((a) => normalizePrediction(a) === normalized);
}

/** Soft match: accepted answer is contained in prediction or vice versa (after normalize). */
export function predictionSoftMatches(prediction: string, accepted: string[]): boolean {
  const normalized = normalizePrediction(prediction);
  if (!normalized) return false;
  return accepted.some((a) => {
    const target = normalizePrediction(a);
    return normalized === target || normalized.includes(target) || target.includes(normalized);
  });
}
