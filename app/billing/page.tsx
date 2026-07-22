import { Suspense } from "react";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import BillingClient from "./BillingClient";

export default function BillingPage() {
  return (
    <WelcomeBackground>
      <Suspense
        fallback={
          <main className="mx-auto w-full max-w-4xl px-4 py-14 text-sm text-slate-600">
            Loading unlock options…
          </main>
        }
      >
        <BillingClient />
      </Suspense>
    </WelcomeBackground>
  );
}
