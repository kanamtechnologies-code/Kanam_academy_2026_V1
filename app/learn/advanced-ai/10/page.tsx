import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "aai-10",
    pathname: "/learn/advanced-ai/10",
    load: async () => {
      const { advancedAiLesson10 } = await import("@/lib/advancedAiLessons/lesson10");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(advancedAiLesson10)} hubLabel="Advanced AI Hub" />;
    },
  });
}
