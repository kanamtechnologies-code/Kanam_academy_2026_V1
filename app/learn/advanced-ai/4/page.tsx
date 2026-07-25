import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "aai-4",
    pathname: "/learn/advanced-ai/4",
    load: async () => {
      const { advancedAiLesson4 } = await import("@/lib/advancedAiLessons/lesson4");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(advancedAiLesson4)} hubLabel="Advanced AI Hub" />;
    },
  });
}
