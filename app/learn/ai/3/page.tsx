import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "ai-3",
    pathname: "/learn/ai/3",
    load: async () => {
      const { aiLesson3 } = await import("@/lib/aiLessons/lesson3");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(aiLesson3)} />;
    },
  });
}
