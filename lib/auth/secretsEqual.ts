import { createHash, timingSafeEqual } from "crypto";

/** Constant-time compare for invite / admin secrets. Node.js runtime only. */
export function secretsEqual(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}
