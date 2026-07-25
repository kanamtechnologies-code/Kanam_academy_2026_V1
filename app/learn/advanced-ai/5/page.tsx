import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "aai-5",
    pathname: "/learn/advanced-ai/5",
    load: async () => {
      const { advancedAiLesson5 } = await import("@/lib/advancedAiLessons/lesson5");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(advancedAiLesson5)} hubLabel="Advanced AI Hub" />;
    },
  });
}
