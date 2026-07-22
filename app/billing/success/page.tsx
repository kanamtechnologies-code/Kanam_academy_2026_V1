import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";

export default function BillingSuccessPage() {
  return (
    <WelcomeBackground>
      <main className="mx-auto flex min-h-[calc(100dvh-var(--kanam-header-height,4.75rem))] w-full max-w-lg flex-col justify-center px-4 py-10 sm:px-6">
        <Card className="border-slate-200/90 shadow-lg">
          <CardContent className="px-6 py-8 text-center sm:px-8">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <p className="mt-4 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[color:var(--brand-2)]">
              Payment received
            </p>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              You&apos;re all set
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Thanks for investing in your learner. Access usually updates within a few seconds
              after Stripe confirms. If something looks missing, refresh the billing hub or email
              us.
            </p>
            <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button asChild className="rounded-xl shadow-sm">
                <Link href="/">Go to dashboard</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/account/billing">View billing hub</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </WelcomeBackground>
  );
}
