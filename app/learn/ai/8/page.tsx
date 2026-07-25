import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "ai-8",
    pathname: "/learn/ai/8",
    load: async () => {
      const { aiLesson8 } = await import("@/lib/aiLessons/lesson8");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(aiLesson8)} />;
    },
  });
}
