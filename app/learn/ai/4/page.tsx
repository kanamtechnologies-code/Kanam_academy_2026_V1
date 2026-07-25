import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "ai-4",
    pathname: "/learn/ai/4",
    load: async () => {
      const { aiLesson4 } = await import("@/lib/aiLessons/lesson4");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(aiLesson4)} />;
    },
  });
}
