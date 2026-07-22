import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unlock access | Kanam Academy",
  description:
    "Subscribe to Kanam Academy, unlock a learning path, or add 1:1 live tutoring. Sign in required.",
};

/** Billing uses the shared AppChrome + WelcomeBackground — no separate storefront shell. */
export default function BillingLayout({ children }: { children: ReactNode }) {
  return children;
}
