import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "aai-12",
    pathname: "/learn/advanced-ai/12",
    load: async () => {
      const { advancedAiLesson12 } = await import("@/lib/advancedAiLessons/lesson12");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(advancedAiLesson12)} hubLabel="Advanced AI Hub" />;
    },
  });
}
