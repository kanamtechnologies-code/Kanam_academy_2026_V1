"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import {
  PARENTAL_CONSENT_NOTICE_LINES,
  PARENTAL_CONSENT_NOTICE_VERSION,
  PRIVACY_POLICY_URL,
} from "@/lib/coppa/parentalConsent";

export type ParentalConsentFieldValues = {
  consentIsParent: boolean;
  consentAccepted: boolean;
  consentSignature: string;
};

export function ParentalConsentFields({
  values,
  onChange,
  disabled,
}: {
  values: ParentalConsentFieldValues;
  onChange: (next: ParentalConsentFieldValues) => void;
  disabled?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-4">
      <p className="text-sm font-extrabold text-slate-900">Parental consent (required)</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">
        U.S. COPPA rules require verifiable parental consent before we create kid profiles or
        collect a child’s information for learning. We will never sell your child’s data. Read
        our{" "}
        <a
          href={PRIVACY_POLICY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-emerald-800 underline underline-offset-2"
        >
          Privacy Policy
        </a>
        . Completing a Family plan later also records consent via payment instrument.
      </p>

      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-slate-700">
        {PARENTAL_CONSENT_NOTICE_LINES.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm text-slate-800">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-300"
          checked={values.consentIsParent}
          disabled={disabled}
          onChange={(e) => onChange({ ...values, consentIsParent: e.target.checked })}
        />
        <span>I am the parent or legal guardian of the child(ren) I enroll.</span>
      </label>

      <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-sm text-slate-800">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-300"
          checked={values.consentAccepted}
          disabled={disabled}
          onChange={(e) => onChange({ ...values, consentAccepted: e.target.checked })}
        />
        <span>
          I have read the notice above and consent to Kanam collecting and using my child’s
          information to provide the educational service (notice {PARENTAL_CONSENT_NOTICE_VERSION}
          ).
        </span>
      </label>

      <div className="mt-4 space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">
          Electronic signature <span className="text-emerald-700">*</span>
        </label>
        <Input
          value={values.consentSignature}
          disabled={disabled}
          onChange={(e) => onChange({ ...values, consentSignature: e.target.value })}
          placeholder="Type your full legal name"
          className="h-11 bg-white"
          autoComplete="name"
        />
        <p className="text-xs text-slate-500">
          Type your name exactly as entered in “Your name” — this is your signed consent.
        </p>
      </div>
    </div>
  );
}
