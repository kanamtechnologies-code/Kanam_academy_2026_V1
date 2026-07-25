import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "aai-7",
    pathname: "/learn/advanced-ai/7",
    load: async () => {
      const { advancedAiLesson7 } = await import("@/lib/advancedAiLessons/lesson7");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(advancedAiLesson7)} hubLabel="Advanced AI Hub" />;
    },
  });
}
