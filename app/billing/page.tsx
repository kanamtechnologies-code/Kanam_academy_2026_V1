import { Suspense } from "react";

import BillingClient from "./BillingClient";

export default function BillingPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-6xl bg-[#f3efe4] px-4 py-14 text-sm text-[#5b6b64]">
          Loading billing…
        </main>
      }
    >
      <BillingClient />
    </Suspense>
  );
}
