import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "ai-15",
    pathname: "/learn/ai/15",
    load: async () => {
      const { aiLesson15 } = await import("@/lib/aiLessons/lesson15");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(aiLesson15)} />;
    },
  });
}
