import { NextResponse } from "next/server";

import {
  migrateLegacyPrivilegedRole,
  userWithAppRole,
} from "@/lib/auth/privilegedRole";
import { isInstructorRole } from "@/lib/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireInstructorSession() {
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

  let effective = user;
  if (!isInstructorRole(user)) {
    try {
      const admin = createSupabaseAdminClient();
      const migrated = await migrateLegacyPrivilegedRole(admin, user);
      if (migrated) effective = userWithAppRole(user, migrated) as typeof user;
    } catch {
      // ignore
    }
  }

  if (!isInstructorRole(effective)) {
    return {
      ok: false as const,
      response: NextResponse.json({ ok: false, error: "Instructor access only." }, { status: 403 }),
    };
  }

  return { ok: true as const, supabase, user: effective };
}
