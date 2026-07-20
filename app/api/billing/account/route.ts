import { NextResponse } from "next/server";
import type Stripe from "stripe";

import {
  formatMoney,
  priceIdLabel,
  trackLabel,
  tutoringLabel,
} from "@/lib/billing/catalogLabels";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function cardSummary(pm: Stripe.PaymentMethod | null | undefined) {
  if (!pm || pm.type !== "card" || !pm.card) return null;
  return {
    brand: pm.card.brand,
    last4: pm.card.last4,
    expMonth: pm.card.exp_month,
    expYear: pm.card.exp_year,
  };
}

function linePriceId(line: Stripe.InvoiceLineItem): string | null {
  const anyLine = line as Stripe.InvoiceLineItem & {
    price?: { id?: string } | string | null;
    pricing?: { price_details?: { price?: string } } | null;
  };
  if (anyLine.price && typeof anyLine.price === "object" && anyLine.price.id) {
    return anyLine.price.id;
  }
  if (typeof anyLine.price === "string") return anyLine.price;
  const nested = anyLine.pricing?.price_details?.price;
  return typeof nested === "string" ? nested : null;
}

function invoiceDescription(row: Stripe.Invoice): string {
  const first = row.lines?.data?.[0];
  if (first) {
    const priceId = linePriceId(first);
    if (priceId) return priceIdLabel(priceId);
    if (first.description) return first.description;
  }
  if (row.description) return row.description;
  return "Kanam purchase";
}

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: authData, error: authErr } = await supabase.auth.getUser();
    if (authErr || !authData.user) {
      return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
    }

    const admin = createSupabaseAdminClient();
    const userId = authData.user.id;
    const email = authData.user.email ?? null;

    const [{ data: customerRow }, { data: subscription }, { data: tracks }, { data: tutoring }] =
      await Promise.all([
        admin
          .from("billing_customers")
          .select("stripe_customer_id, email")
          .eq("user_id", userId)
          .maybeSingle(),
        admin
          .from("billing_subscriptions")
          .select(
            "status, cancel_at_period_end, current_period_end, current_period_start, stripe_price_id, stripe_subscription_id"
          )
          .eq("user_id", userId)
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        admin
          .from("track_entitlements")
          .select("track_slug, active, created_at")
          .eq("user_id", userId)
          .eq("active", true)
          .order("created_at", { ascending: false }),
        admin
          .from("tutoring_credits")
          .select("sku, sessions_total, sessions_remaining, created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: false }),
      ]);

    const hasActiveSubscription = Boolean(
      subscription &&
        ["active", "trialing"].includes(String(subscription.status)) &&
        (!subscription.current_period_end ||
          new Date(String(subscription.current_period_end)).getTime() > Date.now())
    );

    let paymentMethod: ReturnType<typeof cardSummary> = null;
    let invoices: Array<{
      id: string;
      number: string | null;
      status: string | null;
      createdAt: string;
      amountPaid: string;
      amountDue: string;
      currency: string;
      description: string;
      hostedInvoiceUrl: string | null;
      invoicePdf: string | null;
      receiptUrl: string | null;
    }> = [];

    const stripeCustomerId = customerRow?.stripe_customer_id as string | undefined;
    if (stripeCustomerId) {
      try {
        const stripe = getStripe();
        const customer = await stripe.customers.retrieve(stripeCustomerId, {
          expand: ["invoice_settings.default_payment_method"],
        });

        if (!("deleted" in customer && customer.deleted)) {
          const defaultPm = customer.invoice_settings?.default_payment_method;
          if (defaultPm && typeof defaultPm === "object") {
            paymentMethod = cardSummary(defaultPm as Stripe.PaymentMethod);
          } else {
            const pms = await stripe.paymentMethods.list({
              customer: stripeCustomerId,
              type: "card",
              limit: 1,
            });
            paymentMethod = cardSummary(pms.data[0]);
          }

          const inv = await stripe.invoices.list({
            customer: stripeCustomerId,
            limit: 24,
          });

          invoices = inv.data.map((row) => {
            const legacy = row as Stripe.Invoice & {
              charge?: string | Stripe.Charge | null;
            };
            let receiptUrl: string | null = null;
            if (legacy.charge && typeof legacy.charge === "object") {
              receiptUrl = legacy.charge.receipt_url ?? null;
            }

            return {
              id: row.id,
              number: row.number,
              status: row.status,
              createdAt: new Date(row.created * 1000).toISOString(),
              amountPaid: formatMoney(row.amount_paid, row.currency),
              amountDue: formatMoney(row.amount_due, row.currency),
              currency: row.currency,
              description: invoiceDescription(row),
              hostedInvoiceUrl: row.hosted_invoice_url ?? null,
              invoicePdf: row.invoice_pdf ?? null,
              receiptUrl,
            };
          });
        }
      } catch {
        // Local entitlements still render if Stripe is unavailable.
      }
    }

    const tutoringSessionsRemaining = (tutoring ?? []).reduce(
      (sum, row) => sum + Number(row.sessions_remaining ?? 0),
      0
    );

    return NextResponse.json({
      ok: true,
      account: {
        email,
        stripeEmail: customerRow?.email ?? null,
        hasStripeCustomer: Boolean(stripeCustomerId),
        paymentMethod,
      },
      subscription: subscription
        ? {
            status: subscription.status,
            planName: priceIdLabel(subscription.stripe_price_id as string),
            cancelAtPeriodEnd: Boolean(subscription.cancel_at_period_end),
            currentPeriodStart: subscription.current_period_start,
            currentPeriodEnd: subscription.current_period_end,
            active: hasActiveSubscription,
          }
        : null,
      tracks: (tracks ?? []).map((t) => ({
        slug: t.track_slug,
        name: trackLabel(String(t.track_slug)),
        unlockedAt: t.created_at,
      })),
      tutoring: {
        sessionsRemaining: tutoringSessionsRemaining,
        packs: (tutoring ?? []).map((t) => ({
          sku: t.sku,
          label: tutoringLabel(String(t.sku)),
          sessionsTotal: t.sessions_total,
          sessionsRemaining: t.sessions_remaining,
          purchasedAt: t.created_at,
        })),
      },
      invoices,
      hasPaidAccess: Boolean(
        hasActiveSubscription ||
          (tracks ?? []).length > 0 ||
          tutoringSessionsRemaining > 0
      ),
    });
  } catch (e: unknown) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "Could not load billing account.",
      },
      { status: 500 }
    );
  }
}
