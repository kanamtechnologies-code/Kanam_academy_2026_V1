/**
 * COPPA age-gate helpers for learner self-signup.
 * Under-13 learners must use a parent/family account (no child Auth email).
 */

export const MIN_SELF_SIGNUP_AGE = 13;

/** sessionStorage key — short-lived attestation before student signup completes */
export const AGE_ATTESTATION_KEY = "kanam.ageAttestation";

export const PRIVACY_POLICY_URL = "https://www.kanamacademy.com/privacy";
export const TERMS_URL = "https://www.kanamacademy.com/terms";

export type AgeAttestation = {
  /** ISO date YYYY-MM-DD */
  birthdate: string;
  /** Whole years of age at attestation time */
  age: number;
  /** ISO timestamp when the learner attested */
  attestedAt: string;
  /** True when age >= MIN_SELF_SIGNUP_AGE */
  eligibleForSelfSignup: boolean;
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Parse YYYY-MM-DD into a local calendar date (no timezone shift). */
export function parseIsoDate(iso: string): Date | null {
  if (!ISO_DATE.test(iso)) return null;
  const [y, m, d] = iso.split("-").map((n) => Number(n));
  if (!y || !m || !d) return null;
  const dt = new Date(y, m - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
  return dt;
}

/** Age in whole years on `now` (local calendar). */
export function ageFromBirthdate(isoDate: string, now: Date = new Date()): number | null {
  const birth = parseIsoDate(isoDate);
  if (!birth) return null;
  if (birth.getTime() > now.getTime()) return null;

  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age -= 1;
  }
  if (age < 0 || age > 120) return null;
  return age;
}

export function isEligibleForSelfSignup(isoDate: string, now: Date = new Date()): boolean {
  const age = ageFromBirthdate(isoDate, now);
  return age !== null && age >= MIN_SELF_SIGNUP_AGE;
}

export function buildAgeAttestation(isoDate: string, now: Date = new Date()): AgeAttestation | null {
  const age = ageFromBirthdate(isoDate, now);
  if (age === null) return null;
  return {
    birthdate: isoDate,
    age,
    attestedAt: now.toISOString(),
    eligibleForSelfSignup: age >= MIN_SELF_SIGNUP_AGE,
  };
}

export function writeAgeAttestation(attestation: AgeAttestation): void {
  try {
    window.sessionStorage.setItem(AGE_ATTESTATION_KEY, JSON.stringify(attestation));
  } catch {
    // ignore
  }
}

export function readAgeAttestation(): AgeAttestation | null {
  try {
    const raw = window.sessionStorage.getItem(AGE_ATTESTATION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<AgeAttestation>;
    if (
      typeof parsed.birthdate !== "string" ||
      typeof parsed.age !== "number" ||
      typeof parsed.attestedAt !== "string" ||
      typeof parsed.eligibleForSelfSignup !== "boolean"
    ) {
      return null;
    }
    // Re-validate — do not trust a tampered session payload alone.
    const age = ageFromBirthdate(parsed.birthdate);
    if (age === null || age !== parsed.age) return null;
    return {
      birthdate: parsed.birthdate,
      age,
      attestedAt: parsed.attestedAt,
      eligibleForSelfSignup: age >= MIN_SELF_SIGNUP_AGE,
    };
  } catch {
    return null;
  }
}

export function clearAgeAttestation(): void {
  try {
    window.sessionStorage.removeItem(AGE_ATTESTATION_KEY);
  } catch {
    // ignore
  }
}

/** Valid 13+ attestation created within `maxAgeHours` (default 24h). */
export function hasValidSelfSignupAttestation(maxAgeHours = 24): boolean {
  const a = readAgeAttestation();
  if (!a?.eligibleForSelfSignup) return false;
  const t = Date.parse(a.attestedAt);
  if (!Number.isFinite(t)) return false;
  const maxMs = maxAgeHours * 60 * 60 * 1000;
  return Date.now() - t <= maxMs;
}

/** Max birthdate ISO for someone who is at least `minAge` today. */
export function maxBirthdateForMinAge(minAge: number, now: Date = new Date()): string {
  const y = now.getFullYear() - minAge;
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
