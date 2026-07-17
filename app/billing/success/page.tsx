import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function BillingSuccessPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-800">
        Payment received
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
        You’re all set.
      </h1>
      <p className="mt-3 text-zinc-600">
        Your purchase is confirmed. Access updates within a few seconds after Stripe
        notifies us. If something looks missing, refresh billing or contact support.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/billing">View billing</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/welcome">Go to lessons</Link>
        </Button>
      </div>
    </main>
  );
}
