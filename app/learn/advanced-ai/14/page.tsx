import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "aai-14",
    pathname: "/learn/advanced-ai/14",
    load: async () => {
      const { advancedAiLesson14 } = await import("@/lib/advancedAiLessons/lesson14");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(advancedAiLesson14)} hubLabel="Advanced AI Hub" />;
    },
  });
}
