import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "aai-8",
    pathname: "/learn/advanced-ai/8",
    load: async () => {
      const { advancedAiLesson8 } = await import("@/lib/advancedAiLessons/lesson8");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(advancedAiLesson8)} hubLabel="Advanced AI Hub" />;
    },
  });
}
