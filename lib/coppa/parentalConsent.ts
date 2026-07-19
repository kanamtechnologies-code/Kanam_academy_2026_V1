/**
 * Verifiable parental consent (COPPA) helpers for family / household accounts.
 *
 * Primary method: signed electronic consent form (name + attestations + notice version).
 * Strengthening method: Stripe Family payment instrument via Checkout.
 */

import { PRIVACY_POLICY_URL } from "@/lib/coppa/ageGate";

/** Bump when the consent notice text materially changes. */
export const PARENTAL_CONSENT_NOTICE_VERSION = "2026-07-19.v5";

export type ParentalConsentStatus = "pending" | "verified" | "revoked";

export type ParentalConsentMethod =
  | "signed_form"
  | "stripe_payment_instrument"
  | "legacy_pre_vpc";

export type HouseholdConsentFields = {
  parental_consent_status?: string | null;
  parental_consent_method?: string | null;
  parental_consent_at?: string | null;
  parental_consent_signer_name?: string | null;
  parental_consent_notice_version?: string | null;
  parental_consent_parent_email?: string | null;
  parental_consent_stripe_customer_id?: string | null;
  parental_consent_checkout_session_id?: string | null;
};

export type ConsentAttestationInput = {
  consentAccepted: boolean;
  consentIsParent: boolean;
  consentSignature: string;
  consentNoticeVersion: string;
  parentName: string;
  parentEmail?: string;
};

export const PARENTAL_CONSENT_NOTICE_LINES = [
  "I am the parent or legal guardian of each child I enroll on Kanam Academy.",
  "I consent to Kanam collecting and using my child’s information (such as name, grade, progress, and activity in lessons) to provide the educational service, as described in the Privacy Policy.",
  "Kanam will never sell my child’s personal information to third parties.",
  "I understand I can export or delete my child’s profile, or delete my entire family account, from the Parent hub — or email info@kanamacademy.com to review, correct, delete, or refuse further collection of my child’s information.",
] as const;

export { PRIVACY_POLICY_URL };

export function normalizeSignerName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

export function signaturesMatch(parentName: string, signature: string): boolean {
  const a = normalizeSignerName(parentName);
  const b = normalizeSignerName(signature);
  return Boolean(a) && a === b && a.length >= 2;
}

export function validateConsentAttestation(
  input: ConsentAttestationInput
): { ok: true } | { ok: false; error: string } {
  if (!input.consentIsParent) {
    return {
      ok: false,
      error: "Confirm that you are the parent or legal guardian.",
    };
  }
  if (!input.consentAccepted) {
    return {
      ok: false,
      error: "You must accept the parental consent notice to continue.",
    };
  }
  if (input.consentNoticeVersion !== PARENTAL_CONSENT_NOTICE_VERSION) {
    return {
      ok: false,
      error: "Consent notice is out of date. Refresh the page and try again.",
    };
  }
  if (!signaturesMatch(input.parentName, input.consentSignature)) {
    return {
      ok: false,
      error: "Type your full name exactly as entered above to sign the consent form.",
    };
  }
  return { ok: true };
}

export function isParentalConsentVerified(
  household: HouseholdConsentFields | null | undefined
): boolean {
  if (!household) return false;
  // Columns not selected / not migrated yet — do not brick learning.
  if (household.parental_consent_status == null) return true;
  return household.parental_consent_status === "verified";
}

export function consentSummary(household: HouseholdConsentFields | null | undefined) {
  const status = (household?.parental_consent_status ?? "pending") as ParentalConsentStatus;
  return {
    status,
    verified: isParentalConsentVerified(household),
    method: (household?.parental_consent_method ?? null) as ParentalConsentMethod | null,
    consentedAt: household?.parental_consent_at ?? null,
    noticeVersion: household?.parental_consent_notice_version ?? null,
    signerName: household?.parental_consent_signer_name ?? null,
  };
}

/** Row fields to persist a signed-form VPC event. */
export function signedConsentUpdate(input: {
  signerName: string;
  parentEmail: string;
  at?: Date;
}) {
  const at = (input.at ?? new Date()).toISOString();
  return {
    parental_consent_status: "verified" as const,
    parental_consent_method: "signed_form" as const,
    parental_consent_at: at,
    parental_consent_signer_name: input.signerName.trim(),
    parental_consent_notice_version: PARENTAL_CONSENT_NOTICE_VERSION,
    parental_consent_parent_email: input.parentEmail.trim().toLowerCase() || null,
  };
}

/** Row fields when Family Checkout completes (payment-instrument VPC). */
export function stripeConsentUpdate(input: {
  stripeCustomerId?: string | null;
  checkoutSessionId?: string | null;
  at?: Date;
}) {
  const at = (input.at ?? new Date()).toISOString();
  return {
    parental_consent_status: "verified" as const,
    parental_consent_method: "stripe_payment_instrument" as const,
    parental_consent_at: at,
    parental_consent_stripe_customer_id: input.stripeCustomerId ?? null,
    parental_consent_checkout_session_id: input.checkoutSessionId ?? null,
  };
}

export function looksLikeMissingConsentColumn(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes("parental_consent") ||
    m.includes("schema cache") ||
    (m.includes("column") && m.includes("does not exist"))
  );
}
