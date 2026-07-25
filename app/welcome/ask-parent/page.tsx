"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Users } from "lucide-react";

import { WelcomeBackground } from "@/components/welcome/WelcomeBackground";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { MIN_SELF_SIGNUP_AGE, PRIVACY_POLICY_URL } from "@/lib/coppa/ageGate";

export default function WelcomeAskParentPage() {
  const router = useRouter();
  const [classCode, setClassCode] = React.useState("");

  React.useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const qp = (sp.get("classCode") ?? "").trim();
      if (qp) {
        setClassCode(qp);
        return;
      }
      setClassCode(window.localStorage.getItem("kanam.classCode") ?? "");
    } catch {
      // ignore
    }
  }, []);

  const parentHref = React.useMemo(() => {
    const params = new URLSearchParams({ reason: "under13" });
    if (classCode.trim()) params.set("classCode", classCode.trim());
    return `/welcome/parent?${params.toString()}`;
  }, [classCode]);

  return (
    <WelcomeBackground>
      <div className="mx-auto flex min-h-[calc(100dvh-var(--kanam-header-height,4.75rem))] w-full max-w-lg flex-col justify-center px-4 py-10">
        <div className="rounded-3xl border border-white/50 bg-white/85 p-6 shadow-xl backdrop-blur-md dark:border-white/15 dark:bg-slate-900/90 sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--brand-2)]">
            Almost there
          </p>
          <h1 className="mt-3 flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900">
            <Users className="h-6 w-6 text-emerald-700" />
            You need a parent for this next step
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Because you&apos;re under {MIN_SELF_SIGNUP_AGE}, you can&apos;t make your own email
            login yet. That&apos;s okay — a parent or guardian can set things up for you in about
            a minute.
          </p>

          <div className="mt-5">
            <Notice compact variant="info" role="status">
              Please hand this device to a parent or guardian. They should use{" "}
              <span className="font-semibold">their</span> email — not yours — to create the
              account.
            </Notice>
          </div>

          <ul className="mt-5 list-disc space-y-1.5 pl-5 text-sm text-slate-600">
            <li>Your parent makes one family login with their email</li>
            <li>They add a profile for you (you can use an optional PIN)</li>
            <li>Your learning stays under their account, and they handle billing</li>
          </ul>

          {classCode ? (
            <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-600">
              Class code saved:{" "}
              <span className="font-semibold text-slate-800">{classCode}</span>
            </p>
          ) : null}

          <div className="mt-6 flex flex-col gap-2">
            <Button asChild className="h-12 w-full text-base font-semibold">
              <Link href={parentHref}>
                I&apos;m a parent — create our family account
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-12 w-full font-semibold"
              onClick={() => router.push("/welcome/returning?as=parent")}
            >
              My parent already has an account — sign in
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="h-11 w-full font-semibold text-slate-600"
              onClick={() => router.push("/welcome")}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to welcome
            </Button>
          </div>

          <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">
            We do this to keep you safer online. Parents can read our{" "}
            <a
              href={PRIVACY_POLICY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-800 underline underline-offset-2"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </WelcomeBackground>
  );
}
