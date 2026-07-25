import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "ai-12",
    pathname: "/learn/ai/12",
    load: async () => {
      const { aiLesson12 } = await import("@/lib/aiLessons/lesson12");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(aiLesson12)} />;
    },
  });
}
