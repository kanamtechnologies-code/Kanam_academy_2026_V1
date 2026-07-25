import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "ai-16",
    pathname: "/learn/ai/16",
    load: async () => {
      const { aiLesson16 } = await import("@/lib/aiLessons/lesson16");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(aiLesson16)} />;
    },
  });
}
