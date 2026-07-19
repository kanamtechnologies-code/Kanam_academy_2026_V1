/**
 * Full family-account DSAR erase: kids + household + billing cancel + Auth user.
 */

import {
  eraseHouseholdChild,
  getHouseholdKidForOwner,
  type HouseholdKidRow,
} from "@/lib/coppa/childDsar";
import { listHouseholdKids } from "@/lib/households";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type Admin = ReturnType<typeof createSupabaseAdminClient>;

async function cancelStripeSubscriptionsForUser(admin: Admin, userId: string) {
  const { data: subs, error } = await admin
    .from("billing_subscriptions")
    .select("stripe_subscription_id, status")
    .eq("user_id", userId);

  if (error) {
    // Billing tables may be missing in some envs — non-fatal for account wipe.
    return { canceled: [] as string[], errors: [error.message] };
  }

  const canceled: string[] = [];
  const errors: string[] = [];

  let stripe: ReturnType<typeof getStripe> | null = null;
  try {
    stripe = getStripe();
  } catch (e: unknown) {
    if ((subs ?? []).length > 0) {
      errors.push(e instanceof Error ? e.message : "Stripe not configured.");
    }
    return { canceled, errors };
  }

  for (const row of subs ?? []) {
    const subId = String(row.stripe_subscription_id ?? "");
    const status = String(row.status ?? "").toLowerCase();
    if (!subId) continue;
    if (["canceled", "incomplete_expired"].includes(status)) continue;
    try {
      await stripe.subscriptions.cancel(subId);
      canceled.push(subId);
    } catch (e: unknown) {
      errors.push(
        e instanceof Error ? e.message : `Could not cancel subscription ${subId}.`
      );
    }
  }

  // Best-effort: remove Stripe customer so card data is not retained.
  try {
    const { data: customer } = await admin
      .from("billing_customers")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .maybeSingle();
    const customerId = customer?.stripe_customer_id
      ? String(customer.stripe_customer_id)
      : "";
    if (customerId) {
      await stripe.customers.del(customerId);
    }
  } catch (e: unknown) {
    errors.push(
      e instanceof Error ? e.message : "Could not delete Stripe customer."
    );
  }

  return { canceled, errors };
}

export async function eraseParentFamilyAccount(opts: {
  admin: Admin;
  ownerUserId: string;
  householdId: string;
  activeStudentId: string | null;
}) {
  const { admin, ownerUserId, householdId, activeStudentId } = opts;

  const kids = await listHouseholdKids(admin, householdId);
  const deletedKids: string[] = [];

  for (const summary of kids) {
    let kid: HouseholdKidRow | null = null;
    kid = await getHouseholdKidForOwner(admin, ownerUserId, householdId, summary.id);
    if (!kid) continue;

    if (kid.user_id) {
      // Detach Auth link so household erase can remove the profile row.
      const { error: detachErr } = await admin
        .from("students")
        .update({ user_id: null })
        .eq("id", kid.id)
        .eq("household_id", householdId);
      if (detachErr) throw new Error(detachErr.message);
      kid = { ...kid, user_id: null };
    }

    await eraseHouseholdChild({
      admin,
      ownerUserId,
      householdId,
      activeStudentId,
      kid,
    });
    deletedKids.push(kid.id);
  }

  const stripeResult = await cancelStripeSubscriptionsForUser(admin, ownerUserId);

  // Members cascade from households delete.
  const { error: hhErr } = await admin.from("households").delete().eq("id", householdId);
  if (hhErr) throw new Error(hhErr.message);

  const { error: authErr } = await admin.auth.admin.deleteUser(ownerUserId);
  if (authErr) throw new Error(authErr.message);

  return {
    ok: true as const,
    deletedKids,
    stripeCanceled: stripeResult.canceled,
    stripeWarnings: stripeResult.errors,
  };
}
