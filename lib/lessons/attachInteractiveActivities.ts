import type { AIBonusActivity } from "@/components/ai/AILessonCanvas";
import { AI_INTERACTIVE_BY_LESSON } from "@/lib/aiLessons/interactiveExercises";
import { ADVANCED_AI_INTERACTIVE_BY_LESSON } from "@/lib/advancedAiLessons/interactiveExercises";
import { AP_CSP_INTERACTIVE_BY_LESSON } from "@/lib/apCspLessons/interactiveExercises";
import { DIGITAL_INTERACTIVE_BY_LESSON } from "@/lib/digitalLessons/interactiveExercises";
import { CYBER_INTERACTIVE_BY_LESSON } from "@/lib/cyberLessons/interactiveExercises";
import { FINANCE_INTERACTIVE_BY_LESSON } from "@/lib/financeLessons/interactiveExercises";

type WithActivities = {
  id: string;
  activities?: AIBonusActivity[];
};

/**
 * Attach bonus interactive activities on the server so AILessonCanvas does not
 * need to import every track's exercise bank into the client bundle.
 */
export function attachInteractiveActivities<T extends WithActivities>(lesson: T): T {
  if (lesson.activities && lesson.activities.length > 0) return lesson;
  const activities =
    AI_INTERACTIVE_BY_LESSON[lesson.id] ??
    ADVANCED_AI_INTERACTIVE_BY_LESSON[lesson.id] ??
    AP_CSP_INTERACTIVE_BY_LESSON[lesson.id] ??
    DIGITAL_INTERACTIVE_BY_LESSON[lesson.id] ??
    CYBER_INTERACTIVE_BY_LESSON[lesson.id] ??
    FINANCE_INTERACTIVE_BY_LESSON[lesson.id] ??
    [];
  const dropDebug = lesson.id.startsWith("dl-") || lesson.id.startsWith("fl-");
  const usable = activities.filter((activity) => {
    if (activity.kind === "predict") return false;
    if (dropDebug && activity.kind === "debug") return false;
    return true;
  });
  if (usable.length === 0) return lesson;
  return { ...lesson, activities: usable };
}
