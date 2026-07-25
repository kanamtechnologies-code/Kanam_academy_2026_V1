import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "aai-6",
    pathname: "/learn/advanced-ai/6",
    load: async () => {
      const { advancedAiLesson6 } = await import("@/lib/advancedAiLessons/lesson6");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(advancedAiLesson6)} hubLabel="Advanced AI Hub" />;
    },
  });
}
