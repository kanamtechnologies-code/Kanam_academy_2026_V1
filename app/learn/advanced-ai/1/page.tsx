import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "aai-1",
    pathname: "/learn/advanced-ai/1",
    load: async () => {
      const { advancedAiLesson1 } = await import("@/lib/advancedAiLessons/lesson1");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(advancedAiLesson1)} hubLabel="Advanced AI Hub" />;
    },
  });
}
