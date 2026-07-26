import { NextResponse } from "next/server";

import {
  migrateLegacyPrivilegedRole,
  userWithAppRole,
} from "@/lib/auth/privilegedRole";
import { isParentRole } from "@/lib/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireParentSession() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return {
      ok: false as const,
      response: NextResponse.json({ ok: false, error: error.message }, { status: 401 }),
    };
  }
  const user = data.user;
  if (!user) {
    return {
      ok: false as const,
      response: NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 }),
    };
  }

  let admin: ReturnType<typeof createSupabaseAdminClient>;
  try {
    admin = createSupabaseAdminClient();
  } catch (e: unknown) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { ok: false, error: e instanceof Error ? e.message : "Server misconfigured." },
        { status: 500 }
      ),
    };
  }

  let effective = user;
  if (!isParentRole(user)) {
    try {
      const migrated = await migrateLegacyPrivilegedRole(admin, user);
      if (migrated) effective = userWithAppRole(user, migrated) as typeof user;
    } catch {
      // ignore
    }
  }

  if (!isParentRole(effective)) {
    return {
      ok: false as const,
      response: NextResponse.json({ ok: false, error: "Parent access only." }, { status: 403 }),
    };
  }

  return { ok: true as const, supabase, admin, user: effective };
}
