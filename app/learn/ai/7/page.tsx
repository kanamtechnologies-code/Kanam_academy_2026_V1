import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "ai-7",
    pathname: "/learn/ai/7",
    load: async () => {
      const { aiLesson7 } = await import("@/lib/aiLessons/lesson7");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(aiLesson7)} />;
    },
  });
}
