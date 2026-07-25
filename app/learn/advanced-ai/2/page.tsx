import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "aai-2",
    pathname: "/learn/advanced-ai/2",
    load: async () => {
      const { advancedAiLesson2 } = await import("@/lib/advancedAiLessons/lesson2");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(advancedAiLesson2)} hubLabel="Advanced AI Hub" />;
    },
  });
}
