import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "aai-16",
    pathname: "/learn/advanced-ai/16",
    load: async () => {
      const { advancedAiLesson16 } = await import("@/lib/advancedAiLessons/lesson16");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(advancedAiLesson16)} hubLabel="Advanced AI Hub" />;
    },
  });
}
