import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "aai-13",
    pathname: "/learn/advanced-ai/13",
    load: async () => {
      const { advancedAiLesson13 } = await import("@/lib/advancedAiLessons/lesson13");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(advancedAiLesson13)} hubLabel="Advanced AI Hub" />;
    },
  });
}
