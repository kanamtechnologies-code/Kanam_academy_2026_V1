import { lessonIdsForTracks } from "@/lib/libraryPartners";
import type { createSupabaseAdminClient } from "@/lib/supabase/admin";

type DbClient = ReturnType<typeof createSupabaseAdminClient>;

export async function replaceClassLessonAssignments(
  client: DbClient,
  classId: string,
  lessonIds: string[]
) {
  const unique = Array.from(new Set(lessonIds.map((id) => String(id).trim()).filter(Boolean)));

  const { error: delErr } = await client.from("class_lesson_assignments").delete().eq("class_id", classId);
  if (delErr) throw new Error(delErr.message);

  if (unique.length === 0) return unique;

  const { error: insErr } = await client.from("class_lesson_assignments").insert(
    unique.map((lessonId) => ({
      class_id: classId,
      lesson_id: lessonId,
      enabled: true,
    }))
  );
  if (insErr) throw new Error(insErr.message);
  return unique;
}

export async function assignTracksToClass(
  client: DbClient,
  classId: string,
  trackIds: Iterable<string>
) {
  return replaceClassLessonAssignments(client, classId, lessonIdsForTracks(trackIds));
}
