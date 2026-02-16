import Link from "next/link";

import { InstructorDashboardClient } from "@/components/instructor/InstructorDashboardClient";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

function isInstructor(user: any) {
  const role =
    (user?.user_metadata as any)?.role ||
    (user?.app_metadata as any)?.role ||
    (user?.user_metadata as any)?.user_role ||
    (user?.app_metadata as any)?.user_role;
  return role === "instructor" || role === "teacher";
}

export default async function InstructorPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-10 md:px-10">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-600">
            Instructor view
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Sign in to continue
          </h1>
          <p className="mt-2 text-sm text-slate-700">
            This page is for instructors. Please sign in first.
          </p>
          <div className="mt-6">
            <Button asChild className="h-11 rounded-2xl px-6 font-extrabold">
              <Link href="/welcome">Go to Welcome</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  if (!isInstructor(user)) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-10 md:px-10">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-600">
            Instructor view
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Not enabled for this account
          </h1>
          <p className="mt-2 text-sm text-slate-700">
            To use the instructor dashboard, set your Supabase Auth user metadata role to{" "}
            <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono font-bold">instructor</span>.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild variant="outline" className="h-11 rounded-2xl px-6 font-extrabold">
              <Link href="/help">Open Help</Link>
            </Button>
            <Button asChild className="h-11 rounded-2xl px-6 font-extrabold">
              <Link href="/welcome">Back</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return <InstructorDashboardClient />;
}

