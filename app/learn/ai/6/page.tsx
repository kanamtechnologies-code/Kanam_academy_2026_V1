import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "ai-6",
    pathname: "/learn/ai/6",
    load: async () => {
      const { aiLesson6 } = await import("@/lib/aiLessons/lesson6");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(aiLesson6)} />;
    },
  });
}
