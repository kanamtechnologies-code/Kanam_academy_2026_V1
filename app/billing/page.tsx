import { Suspense } from "react";

import BillingClient from "./BillingClient";

export default function BillingPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-6xl px-4 py-14 text-sm text-[var(--muted)]">
          Loading billing…
        </main>
      }
    >
      <BillingClient />
    </Suspense>
  );
}
