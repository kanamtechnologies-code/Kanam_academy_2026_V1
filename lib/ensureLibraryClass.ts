import { assignTracksToClass } from "@/lib/classLessonAssign";
import { resolveSharedClassOwnerId } from "@/lib/asyncClass";
import {
  getLibraryPartner,
  slugifyPartnerName,
  type LibraryPartner,
} from "@/lib/libraryPartners";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isMissingColumnError } from "@/lib/supabase/missingColumn";

type AdminClient = ReturnType<typeof createSupabaseAdminClient>;

export type EnsuredLibraryClass = {
  id: string;
  code: string;
  name: string;
  partnerSlug: string;
  trackIds: string[];
  schoolName: string | null;
};

async function upsertSchoolId(admin: AdminClient, name: string): Promise<string | null> {
  const schoolName = name.trim();
  if (!schoolName) return null;

  const { data: existing, error: findErr } = await admin
    .from("schools")
    .select("id")
    .eq("name", schoolName)
    .maybeSingle();
  if (findErr) throw new Error(findErr.message);
  if (existing?.id) return existing.id as string;

  const { data: inserted, error: insertErr } = await admin
    .from("schools")
    .insert({ name: schoolName })
    .select("id")
    .single();
  if (!insertErr && inserted?.id) return inserted.id as string;

  const { data: retry } = await admin.from("schools").select("id").eq("name", schoolName).maybeSingle();
  return retry?.id ? (retry.id as string) : null;
}

async function findExistingLibraryClass(
  admin: AdminClient,
  partner: Pick<LibraryPartner, "slug" | "classCode">
) {
  const code = partner.classCode.trim().toUpperCase();
  const { data: byCode, error: codeErr } = await admin
    .from("classes")
    .select("id, code, name, partner_slug")
    .eq("code", code)
    .maybeSingle();

  if (!codeErr && byCode?.id) return byCode;

  const slugQuery = await admin
    .from("classes")
    .select("id, code, name, partner_slug")
    .eq("partner_slug", partner.slug)
    .maybeSingle();

  if (!slugQuery.error && slugQuery.data?.id) return slugQuery.data;
  if (isMissingColumnError(slugQuery.error) || isMissingColumnError(codeErr)) {
    const fallback = await admin.from("classes").select("id, code, name").eq("code", code).maybeSingle();
    if (fallback.data?.id) return { ...fallback.data, partner_slug: partner.slug };
  }
  return null;
}

async function insertLibraryClass(
  admin: AdminClient,
  row: {
    teacher_user_id: string;
    school_id: string | null;
    name: string;
    code: string;
    kind: "library";
    partner_slug: string;
    is_async: false;
  }
) {
  const withPartner = await admin.from("classes").insert(row).select("id, code, name").single();
  if (!withPartner.error && withPartner.data?.id) return withPartner.data;

  if (isMissingColumnError(withPartner.error)) {
    const { kind: _kind, partner_slug: _slug, ...basic } = row;
    const fallback = await admin.from("classes").insert(basic).select("id, code, name").single();
    if (!fallback.error && fallback.data?.id) return fallback.data;
    if (fallback.error) throw new Error(fallback.error.message);
  }

  if (withPartner.error) throw new Error(withPartner.error.message);
  throw new Error("Could not create library class.");
}

/**
 * Create or refresh a catalog library-partner class (Henry County, etc.)
 * and enable the partner's free tracks.
 */
export async function ensureLibraryPartnerClass(
  slug: string,
  admin: AdminClient = createSupabaseAdminClient(),
  opts?: { ownerUserId?: string }
): Promise<EnsuredLibraryClass> {
  const partner = getLibraryPartner(slug);
  if (!partner) throw new Error("Unknown library partner.");

  const existing = await findExistingLibraryClass(admin, partner);
  const schoolId = await upsertSchoolId(admin, partner.name);

  let classId = existing?.id as string | undefined;
  let code = String(existing?.code ?? partner.classCode).trim().toUpperCase();
  let name = String(existing?.name ?? partner.className);

  if (!classId) {
    const ownerId = (opts?.ownerUserId ?? "").trim() || (await resolveSharedClassOwnerId(admin));
    if (!ownerId) {
      throw new Error(
        "This library class is not set up yet. Create an instructor account, then try again."
      );
    }

    const inserted = await insertLibraryClass(admin, {
      teacher_user_id: ownerId,
      school_id: schoolId,
      name: partner.className,
      code: partner.classCode,
      kind: "library",
      partner_slug: partner.slug,
      is_async: false,
    });
    classId = inserted.id as string;
    code = String(inserted.code ?? partner.classCode).trim().toUpperCase();
    name = String(inserted.name ?? partner.className);
  } else if (opts?.ownerUserId) {
    const patch: Record<string, unknown> = {
      teacher_user_id: opts.ownerUserId,
      name: partner.className,
      school_id: schoolId,
    };
    const withKind = { ...patch, kind: "library", partner_slug: partner.slug };
    const updated = await admin.from("classes").update(withKind).eq("id", classId);
    if (updated.error && isMissingColumnError(updated.error)) {
      await admin.from("classes").update(patch).eq("id", classId);
    }
    name = partner.className;
  }

  await assignTracksToClass(admin, classId, partner.trackIds);

  return {
    id: classId,
    code,
    name,
    partnerSlug: partner.slug,
    trackIds: partner.trackIds,
    schoolName: partner.name,
  };
}

export async function createCustomLibraryClass(opts: {
  admin?: AdminClient;
  ownerUserId: string;
  libraryName: string;
  className?: string;
  code: string;
  partnerSlug?: string;
}) {
  const admin = opts.admin ?? createSupabaseAdminClient();
  const libraryName = opts.libraryName.trim();
  if (!libraryName) throw new Error("Library name is required.");

  const partnerSlug = (opts.partnerSlug ?? slugifyPartnerName(libraryName)).trim().toLowerCase();
  const className =
    (opts.className ?? "").trim() || `${libraryName} — Digital & Financial Literacy`;
  const schoolId = await upsertSchoolId(admin, libraryName);

  const inserted = await insertLibraryClass(admin, {
    teacher_user_id: opts.ownerUserId,
    school_id: schoolId,
    name: className,
    code: opts.code.trim().toUpperCase(),
    kind: "library",
    partner_slug: partnerSlug,
    is_async: false,
  });

  await assignTracksToClass(admin, inserted.id as string, [
    "digital-literacy",
    "financial-literacy",
  ]);

  return {
    id: inserted.id as string,
    code: String(inserted.code ?? opts.code).trim().toUpperCase(),
    name: String(inserted.name ?? className),
    partnerSlug,
    schoolName: libraryName,
  };
}
