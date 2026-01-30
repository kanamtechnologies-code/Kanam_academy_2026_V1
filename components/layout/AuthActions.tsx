"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const USER_NAME_KEY = "kanam.userName";

export function AuthActions() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [signedIn, setSignedIn] = React.useState(false);
  const [label, setLabel] = React.useState<string>("");

  React.useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSignedIn(Boolean(data.session));
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session));
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    try {
      setLabel(window.localStorage.getItem(USER_NAME_KEY) ?? "");
    } catch {
      setLabel("");
    }
  }, [signedIn]);

  if (loading) return null;

  if (!signedIn) {
    return (
      <Link
        href="/welcome/returning"
        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-extrabold tracking-tight text-white hover:bg-white/15 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
      >
        <UserRound className="h-4 w-4" />
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/welcome/returning"
        className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-extrabold tracking-tight text-white hover:bg-white/15 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
        aria-label="Switch learner"
      >
        <UserRound className="h-4 w-4" />
        Switch{label ? ` (${label})` : "" }
      </Link>

      <button
        type="button"
        onClick={async () => {
          const supabase = createSupabaseBrowserClient();
          await supabase.auth.signOut();
          try {
            window.localStorage.removeItem(USER_NAME_KEY);
          } catch {
            // ignore
          }
          router.push("/welcome/returning");
        }}
        className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--accent-rgb)/0.85)] bg-[rgb(var(--accent-rgb)/0.92)] px-3 py-1.5 text-xs font-extrabold tracking-tight text-slate-950 shadow-sm hover:brightness-[1.03] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--accent-rgb)/0.35)]"
        aria-label="Log out"
      >
        <LogOut className="h-4 w-4" />
        Log out
      </button>
    </div>
  );
}

