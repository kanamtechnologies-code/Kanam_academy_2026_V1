import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "aai-11",
    pathname: "/learn/advanced-ai/11",
    load: async () => {
      const { advancedAiLesson11 } = await import("@/lib/advancedAiLessons/lesson11");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(advancedAiLesson11)} hubLabel="Advanced AI Hub" />;
    },
  });
}
