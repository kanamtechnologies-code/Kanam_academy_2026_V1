import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "ai-1",
    pathname: "/learn/ai/1",
    load: async () => {
      const { aiLesson1 } = await import("@/lib/aiLessons/lesson1");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(aiLesson1)} />;
    },
  });
}
