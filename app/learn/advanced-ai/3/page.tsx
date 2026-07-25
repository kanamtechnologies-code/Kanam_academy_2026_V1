import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "aai-3",
    pathname: "/learn/advanced-ai/3",
    load: async () => {
      const { advancedAiLesson3 } = await import("@/lib/advancedAiLessons/lesson3");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(advancedAiLesson3)} hubLabel="Advanced AI Hub" />;
    },
  });
}
