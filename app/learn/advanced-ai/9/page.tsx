import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "aai-9",
    pathname: "/learn/advanced-ai/9",
    load: async () => {
      const { advancedAiLesson9 } = await import("@/lib/advancedAiLessons/lesson9");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(advancedAiLesson9)} hubLabel="Advanced AI Hub" />;
    },
  });
}
