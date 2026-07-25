import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "ai-10",
    pathname: "/learn/ai/10",
    load: async () => {
      const { aiLesson10 } = await import("@/lib/aiLessons/lesson10");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(aiLesson10)} />;
    },
  });
}
