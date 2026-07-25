import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "ai-9",
    pathname: "/learn/ai/9",
    load: async () => {
      const { aiLesson9 } = await import("@/lib/aiLessons/lesson9");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(aiLesson9)} />;
    },
  });
}
