import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "aai-15",
    pathname: "/learn/advanced-ai/15",
    load: async () => {
      const { advancedAiLesson15 } = await import("@/lib/advancedAiLessons/lesson15");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(advancedAiLesson15)} hubLabel="Advanced AI Hub" />;
    },
  });
}
