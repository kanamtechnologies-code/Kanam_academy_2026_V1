"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  Download,
  Loader2,
  Plus,
  Shield,
  Trash2,
  Users,
} from "lucide-react";

import {
  ParentalConsentFields,
  type ParentalConsentFieldValues,
} from "@/components/parent/ParentalConsentFields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Notice } from "@/components/ui/notice";
import { PARENTAL_CONSENT_NOTICE_VERSION } from "@/lib/coppa/parentalConsent";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isParentRole, safeNextPath } from "@/lib/roles";

export default function ParentHubPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center text-slate-700">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      }
    >
      <ParentHubClient />
    </React.Suspense>
  );
}

type Kid = {
  id: string;
  display_name: string;
  first_name: string | null;
  last_name: string | null;
  grade: string | null;
  has_pin: boolean;
};

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

function ParentHubClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pickChild = searchParams.get("pick") === "1";
  const forceConsent = searchParams.get("consent") === "1";
  const returnNext = safeNextPath(searchParams.get("next"));
  const [loading, setLoading] = React.useState(true);
  const [mode, setMode] = React.useState<"hub" | "convert">("hub");
  const [householdName, setHouseholdName] = React.useState("My family");
  const [kids, setKids] = React.useState<Kid[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [needsConsent, setNeedsConsent] = React.useState(false);
  const [consentMethod, setConsentMethod] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState<string | null>(null);
  const [converting, setConverting] = React.useState(false);

  const [addOpen, setAddOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [consentSaving, setConsentSaving] = React.useState(false);
  const [consentFields, setConsentFields] = React.useState<ParentalConsentFieldValues>({
    consentIsParent: false,
    consentAccepted: false,
    consentSignature: "",
  });

  const [pinKidId, setPinKidId] = React.useState<string | null>(null);
  const [pinValue, setPinValue] = React.useState("");
  const [switchKidId, setSwitchKidId] = React.useState<string | null>(null);
  const [switchPin, setSwitchPin] = React.useState("");
  const [deleteKidId, setDeleteKidId] = React.useState<string | null>(null);
  const [deleteConfirmName, setDeleteConfirmName] = React.useState("");
  const [accountDeleteOpen, setAccountDeleteOpen] = React.useState(false);
  const [accountConfirmEmail, setAccountConfirmEmail] = React.useState("");
  const [accountConfirmPhrase, setAccountConfirmPhrase] = React.useState("");
  const [parentEmail, setParentEmail] = React.useState("");

  const load = React.useCallback(async () => {
    setError(null);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      router.replace("/welcome");
      return;
    }
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      router.replace("/welcome");
      return;
    }
    if (!isParentRole(data.user)) {
      setMode("convert");
      setLoading(false);
      return;
    }

    setMode("hub");
    setParentEmail(String(data.user.email ?? ""));
    const meta = (data.user.user_metadata ?? {}) as Record<string, unknown>;
    const parentName =
      [meta.first_name, meta.last_name].filter(Boolean).join(" ").trim() ||
      String(meta.display_name ?? "");
    if (parentName) {
      setConsentFields((prev) =>
        prev.consentSignature ? prev : { ...prev, consentSignature: parentName }
      );
    }

    const res = await fetch("/api/parent/kids");
    const json = (await res.json()) as {
      ok?: boolean;
      error?: string;
      household?: { name?: string; active_student_id?: string | null };
      kids?: Kid[];
      consent?: {
        needsParentalConsent?: boolean;
        verified?: boolean;
        method?: string | null;
      };
    };
    if (!res.ok || !json.ok) {
      setError(json.error || "Could not load household.");
      setLoading(false);
      return;
    }
    setHouseholdName(String(json.household?.name ?? "My family"));
    setActiveId(json.household?.active_student_id ? String(json.household.active_student_id) : null);
    setKids(json.kids ?? []);
    setNeedsConsent(Boolean(json.consent?.needsParentalConsent));
    setConsentMethod(json.consent?.method ?? null);

    setLoading(false);
  }, [router]);

  React.useEffect(() => {
    void load();
  }, [load]);

  const submitConsent = async () => {
    setError(null);
    setMsg(null);
    if (!consentFields.consentIsParent || !consentFields.consentAccepted) {
      setError("Complete the parental consent checkboxes to continue.");
      return;
    }
    if (!consentFields.consentSignature.trim()) {
      setError("Type your full name to sign the consent form.");
      return;
    }
    setConsentSaving(true);
    try {
      const res = await fetch("/api/parent/consent", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          consentAccepted: consentFields.consentAccepted,
          consentIsParent: consentFields.consentIsParent,
          consentSignature: consentFields.consentSignature.trim(),
          consentNoticeVersion: PARENTAL_CONSENT_NOTICE_VERSION,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Could not save consent.");
      setMsg("Parental consent recorded. You can add kids and open learning.");
      setNeedsConsent(false);
      await load();
      if (returnNext) {
        router.replace(returnNext);
      } else if (forceConsent) {
        router.replace("/parent");
      }
    } catch (e: unknown) {
      setError(errorMessage(e, "Could not save consent."));
    } finally {
      setConsentSaving(false);
    }
  };

  const addChild = async () => {
    setError(null);
    setMsg(null);
    if (needsConsent) {
      setError("Complete parental consent before adding a child.");
      return;
    }
    if (!firstName.trim()) {
      setError("Enter the child’s first name.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/parent/kids", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim() || undefined,
          grade: grade.trim() || undefined,
          pin: pin.trim() || undefined,
        }),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        kids?: Kid[];
        code?: string;
      };
      if (!res.ok || !json.ok) {
        if (json.code === "PARENTAL_CONSENT_REQUIRED") {
          setNeedsConsent(true);
        }
        throw new Error(json.error || "Could not add child.");
      }
      setKids(json.kids ?? []);
      setFirstName("");
      setLastName("");
      setGrade("");
      setPin("");
      setAddOpen(false);
      setMsg("Child added.");
      await load();
    } catch (e: unknown) {
      setError(errorMessage(e, "Could not add child."));
    } finally {
      setSaving(false);
    }
  };

  const exportChild = async (kid: Kid) => {
    setError(null);
    setMsg(null);
    setSaving(true);
    try {
      const res = await fetch(`/api/parent/kids/${kid.id}/export`);
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error || "Could not export child data.");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const disposition = res.headers.get("content-disposition") || "";
      const match = /filename="([^"]+)"/.exec(disposition);
      a.href = url;
      a.download = match?.[1] || `kanam-child-export-${kid.id.slice(0, 8)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setMsg(`Exported data for ${kid.display_name}.`);
    } catch (e: unknown) {
      setError(errorMessage(e, "Could not export child data."));
    } finally {
      setSaving(false);
    }
  };

  const deleteFamilyAccount = async () => {
    setError(null);
    setMsg(null);
    if (!accountConfirmEmail.trim()) {
      setError("Type your parent account email to confirm.");
      return;
    }
    if (accountConfirmPhrase.trim().toUpperCase() !== "DELETE") {
      setError("Type DELETE in all caps to confirm.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/parent/account", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          confirmEmail: accountConfirmEmail.trim(),
          confirmPhrase: accountConfirmPhrase.trim(),
        }),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        stripeWarnings?: string[];
      };
      if (!res.ok || !json.ok) throw new Error(json.error || "Could not delete account.");

      const supabase = createSupabaseBrowserClient();
      if (supabase) await supabase.auth.signOut();
      try {
        window.localStorage.removeItem("kanam.userName");
        window.localStorage.removeItem("kanam.onboardingEmail");
      } catch {
        // ignore
      }
      router.replace("/welcome?accountDeleted=1");
    } catch (e: unknown) {
      setError(errorMessage(e, "Could not delete family account."));
      setSaving(false);
    }
  };

  const deleteChild = async (kid: Kid) => {
    setError(null);
    setMsg(null);
    if (!deleteConfirmName.trim()) {
      setError("Type the child’s display name to confirm deletion.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/parent/kids/${kid.id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ confirmName: deleteConfirmName.trim() }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Could not delete child.");
      setDeleteKidId(null);
      setDeleteConfirmName("");
      setMsg(`${kid.display_name}’s profile and learning data were deleted.`);
      await load();
    } catch (e: unknown) {
      setError(errorMessage(e, "Could not delete child data."));
    } finally {
      setSaving(false);
    }
  };

  const savePin = async (studentId: string) => {
    setError(null);
    setMsg(null);
    if (!/^\d{4,6}$/.test(pinValue.trim())) {
      setError("PIN must be 4–6 digits.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/parent/kids/${studentId}/pin`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ pin: pinValue.trim() }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Could not save PIN.");
      setPinKidId(null);
      setPinValue("");
      setMsg("PIN updated.");
      await load();
    } catch (e: unknown) {
      setError(errorMessage(e, "Could not save PIN."));
    } finally {
      setSaving(false);
    }
  };

  const clearPin = async (studentId: string) => {
    setError(null);
    setMsg(null);
    setSaving(true);
    try {
      const res = await fetch(`/api/parent/kids/${studentId}/pin`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ clear: true }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Could not clear PIN.");
      setPinKidId(null);
      setPinValue("");
      setMsg("PIN removed.");
      await load();
    } catch (e: unknown) {
      setError(errorMessage(e, "Could not clear PIN."));
    } finally {
      setSaving(false);
    }
  };

  const openLearning = async (kid: Kid) => {
    setError(null);
    setMsg(null);
    if (needsConsent) {
      setError("Complete parental consent before opening learning.");
      return;
    }
    const needsPin = kid.has_pin && kid.id !== activeId;
    if (needsPin && switchKidId !== kid.id) {
      setSwitchKidId(kid.id);
      setSwitchPin("");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/parent/switch-child", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          studentId: kid.id,
          pin: needsPin || switchKidId === kid.id ? switchPin : undefined,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; code?: string };
      if (!res.ok || !json.ok) {
        if (json.code === "PARENTAL_CONSENT_REQUIRED") setNeedsConsent(true);
        throw new Error(json.error || "Could not switch child.");
      }

      const supabase = createSupabaseBrowserClient();
      if (supabase) await supabase.auth.refreshSession();

      setSwitchKidId(null);
      setSwitchPin("");
      router.push(returnNext || "/dashboard");
    } catch (e: unknown) {
      setError(errorMessage(e, "Could not open learning."));
    } finally {
      setSaving(false);
    }
  };

  const convertToFamily = async () => {
    setError(null);
    setConverting(true);
    try {
      const res = await fetch("/api/auth/convert-to-parent", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ householdName: householdName.trim() || undefined }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Could not convert account.");
      const supabase = createSupabaseBrowserClient();
      if (supabase) await supabase.auth.refreshSession();
      setMsg("Family account ready. You can add more kids below.");
      setMode("hub");
      setLoading(true);
      await load();
    } catch (e: unknown) {
      setError(errorMessage(e, "Could not convert account."));
    } finally {
      setConverting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-slate-700">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (mode === "convert") {
    return (
      <div className="kanam-dashboard-shell min-h-dvh px-3 py-6 text-slate-900 sm:px-6 md:px-10">
        <div className="mx-auto w-full max-w-lg rounded-[22px] border border-white/40 bg-white/85 p-6 shadow-lg">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--brand-2)]">
            Upgrade
          </p>
          <h1 className="mt-2 text-2xl font-black tracking-tight">Convert to family account</h1>
          <p className="mt-2 text-sm text-slate-600">
            Keep your progress and billing. We&apos;ll turn your current learner profile into the
            first kid under a parent login so you can add siblings. Your learning stays open — you
            won&apos;t be locked behind a new consent step.
          </p>
          {error ? (
            <div className="mt-4">
              <Notice variant="danger" role="alert" title="Something went wrong">
                {error}
              </Notice>
            </div>
          ) : null}
          <div className="mt-4 space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Family name (optional)</label>
            <Input
              value={householdName}
              onChange={(e) => setHouseholdName(e.target.value)}
              placeholder="My family"
              className="h-11"
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button disabled={converting} onClick={convertToFamily}>
              {converting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Convert to family account
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Back to learning
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kanam-dashboard-shell min-h-dvh px-3 py-6 text-slate-900 sm:px-6 md:px-10">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <section className="rounded-[22px] border border-white/40 bg-white/80 p-5 shadow-lg backdrop-blur-md sm:p-7">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--brand-2)]">
            Parent hub
          </p>
          <h1 className="mt-2 flex items-center gap-2 text-2xl font-black tracking-tight sm:text-3xl">
            <Users className="h-7 w-7 text-emerald-700" />
            {householdName}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Manage kid profiles, set PINs, and open learning. Your subscription unlocks
            every child in this household.
          </p>

          {needsConsent || forceConsent ? (
            <div className="mt-4 space-y-3">
              <Notice variant="lock" title="Parental consent required">
                Complete the consent form below before adding kids or opening learning. You can
                also strengthen verification later by starting a{" "}
                <Link href="/billing" className="font-semibold underline">
                  Family plan
                </Link>{" "}
                (payment-instrument method).
              </Notice>
              <ParentalConsentFields
                values={consentFields}
                onChange={setConsentFields}
                disabled={consentSaving}
              />
              <Button disabled={consentSaving} onClick={submitConsent}>
                {consentSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Sign &amp; save parental consent
              </Button>
            </div>
          ) : null}

          {!needsConsent && consentMethod ? (
            <div className="mt-4">
              <Notice compact variant="success">
                Parental consent on file
                {consentMethod === "stripe_payment_instrument"
                  ? " (verified via Family plan payment)"
                  : consentMethod === "signed_form"
                    ? " (signed electronic consent)"
                    : ""}
                .
              </Notice>
            </div>
          ) : null}

          {pickChild && !needsConsent ? (
            <div className="mt-4">
              <Notice variant="lock" title="Choose a child to continue">
                Pick who is learning below (enter a PIN if that child has one), then tap{" "}
                <span className="font-semibold text-slate-800">Open learning</span>. Progress only
                saves after a child is selected.
              </Notice>
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/account/billing">
                <CreditCard className="h-4 w-4" />
                Billing hub
              </Link>
            </Button>
            <Button
              variant="outline"
              disabled={needsConsent}
              onClick={() => setAddOpen((v) => !v)}
            >
              <Plus className="h-4 w-4" />
              Add child
            </Button>
          </div>

          {error ? (
            <div className="mt-4">
              <Notice variant="danger" role="alert" title="Something went wrong">
                {error}
              </Notice>
            </div>
          ) : null}
          {msg ? (
            <div className="mt-4">
              <Notice variant="success" title="Updated">
                {msg}
              </Notice>
            </div>
          ) : null}

          {addOpen ? (
            <div className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-sm font-extrabold">New child</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="h-11 bg-white"
                />
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="h-11 bg-white"
                />
                <Input
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="Grade (optional)"
                  className="h-11 bg-white"
                />
                <Input
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="PIN 4–6 digits (optional)"
                  inputMode="numeric"
                  className="h-11 bg-white"
                />
              </div>
              <Button disabled={saving} onClick={addChild}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Save child
              </Button>
            </div>
          ) : null}
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black tracking-tight">Kids</h2>
          {kids.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-sm text-slate-600">
              No kids yet. Tap <strong>Add child</strong> to create the first learner profile.
            </div>
          ) : (
            kids.map((kid) => (
              <div
                key={kid.id}
                className="rounded-2xl border border-white/50 bg-white/85 p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-base font-extrabold text-slate-900">
                      {kid.display_name}
                      {activeId === kid.id ? (
                        <span className="ml-2 text-xs font-bold uppercase tracking-wide text-emerald-700">
                          Active
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {[kid.grade ? `Grade ${kid.grade}` : null, kid.has_pin ? "PIN set" : "No PIN"]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" asChild>
                      <Link href={`/parent/insights?student=${kid.id}`}>
                        <BarChart3 className="h-3.5 w-3.5" />
                        Learning report
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={saving}
                      onClick={() => void exportChild(kid)}
                    >
                      <Download className="h-3.5 w-3.5" />
                      Export data
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setDeleteKidId(kid.id);
                        setDeleteConfirmName("");
                        setPinKidId(null);
                        setSwitchKidId(null);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setPinKidId(kid.id);
                        setPinValue("");
                        setDeleteKidId(null);
                      }}
                    >
                      <Shield className="h-3.5 w-3.5" />
                      {kid.has_pin ? "Reset PIN" : "Set PIN"}
                    </Button>
                    <Button size="sm" disabled={saving || needsConsent} onClick={() => openLearning(kid)}>
                      Open learning
                    </Button>
                  </div>
                </div>

                {deleteKidId === kid.id ? (
                  <div className="mt-3 space-y-2 border-t border-rose-100 pt-3">
                    <p className="text-sm font-semibold text-rose-800">
                      Delete {kid.display_name}? This cannot be undone.
                    </p>
                    <p className="text-xs text-slate-600">
                      Removes this child’s profile, lesson progress, and activity history from
                      Kanam. Billing stays on your parent account. Type their display name to
                      confirm.
                    </p>
                    <div className="flex flex-wrap items-end gap-2">
                      <div className="min-w-[160px] flex-1 space-y-1">
                        <label className="text-xs font-semibold text-slate-600">
                          Type “{kid.display_name}”
                        </label>
                        <Input
                          value={deleteConfirmName}
                          onChange={(e) => setDeleteConfirmName(e.target.value)}
                          placeholder={kid.display_name}
                          className="h-10"
                        />
                      </div>
                      <Button
                        size="sm"
                        disabled={saving}
                        className="bg-rose-700 text-white hover:bg-rose-800"
                        onClick={() => void deleteChild(kid)}
                      >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                        Delete permanently
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setDeleteKidId(null);
                          setDeleteConfirmName("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : null}

                {pinKidId === kid.id ? (
                  <div className="mt-3 flex flex-wrap items-end gap-2 border-t border-slate-100 pt-3">
                    <div className="min-w-[140px] flex-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-600">New PIN</label>
                      <Input
                        value={pinValue}
                        onChange={(e) =>
                          setPinValue(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        inputMode="numeric"
                        placeholder="4–6 digits"
                        className="h-10"
                      />
                    </div>
                    <Button size="sm" disabled={saving} onClick={() => void savePin(kid.id)}>
                      Save PIN
                    </Button>
                    {kid.has_pin ? (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={saving}
                        onClick={() => void clearPin(kid.id)}
                      >
                        Clear PIN
                      </Button>
                    ) : null}
                    <Button size="sm" variant="ghost" onClick={() => setPinKidId(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : null}

                {switchKidId === kid.id ? (
                  <div className="mt-3 flex flex-wrap items-end gap-2 border-t border-slate-100 pt-3">
                    <div className="min-w-[140px] flex-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-600">
                        Enter PIN for {kid.display_name}
                      </label>
                      <Input
                        value={switchPin}
                        onChange={(e) =>
                          setSwitchPin(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        inputMode="numeric"
                        type="password"
                        placeholder="PIN"
                        className="h-10"
                      />
                    </div>
                    <Button size="sm" disabled={saving} onClick={() => openLearning(kid)}>
                      Continue
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setSwitchKidId(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : null}
              </div>
            ))
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-600">
          <p className="font-extrabold text-slate-900">Privacy &amp; child data</p>
          <p className="mt-1 text-xs leading-relaxed">
            Use <strong>Export data</strong> or <strong>Delete</strong> on a child card to review or
            erase that learner’s information. You can also delete your entire family account below.
            For other requests, email{" "}
            <a
              href="mailto:info@kanamacademy.com"
              className="font-semibold text-emerald-800 underline underline-offset-2"
            >
              info@kanamacademy.com
            </a>
            . See our{" "}
            <a
              href="https://www.kanamacademy.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-800 underline underline-offset-2"
            >
              Privacy Policy
            </a>
            .
          </p>

          <div className="mt-4 border-t border-slate-200 pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-rose-200 text-rose-800 hover:bg-rose-50"
              onClick={() => {
                setAccountDeleteOpen((v) => !v);
                setAccountConfirmEmail("");
                setAccountConfirmPhrase("");
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
              {accountDeleteOpen ? "Cancel account deletion" : "Delete family account"}
            </Button>

            {accountDeleteOpen ? (
              <div className="mt-3 space-y-3 rounded-xl border border-rose-200 bg-rose-50/70 p-4">
                <p className="text-sm font-semibold text-rose-900">
                  Permanently delete your family account?
                </p>
                <ul className="list-disc space-y-1 pl-5 text-xs text-slate-700">
                  <li>All kid profiles and learning progress are erased.</li>
                  <li>Your parent login is deleted.</li>
                  <li>Active Family subscriptions are canceled when possible.</li>
                  <li>This cannot be undone.</li>
                </ul>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Type your email{parentEmail ? ` (${parentEmail})` : ""}
                  </label>
                  <Input
                    value={accountConfirmEmail}
                    onChange={(e) => setAccountConfirmEmail(e.target.value)}
                    type="email"
                    placeholder={parentEmail || "you@email.com"}
                    className="h-10 bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Type DELETE to confirm
                  </label>
                  <Input
                    value={accountConfirmPhrase}
                    onChange={(e) => setAccountConfirmPhrase(e.target.value)}
                    placeholder="DELETE"
                    className="h-10 bg-white"
                  />
                </div>
                <Button
                  type="button"
                  size="sm"
                  disabled={saving}
                  className="bg-rose-700 text-white hover:bg-rose-800"
                  onClick={() => void deleteFamilyAccount()}
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Delete family account permanently
                </Button>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
