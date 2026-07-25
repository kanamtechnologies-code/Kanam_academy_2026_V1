import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "ai-5",
    pathname: "/learn/ai/5",
    load: async () => {
      const { aiLesson5 } = await import("@/lib/aiLessons/lesson5");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(aiLesson5)} />;
    },
  });
}
