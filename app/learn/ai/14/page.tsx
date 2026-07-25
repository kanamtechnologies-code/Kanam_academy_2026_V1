import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "ai-14",
    pathname: "/learn/ai/14",
    load: async () => {
      const { aiLesson14 } = await import("@/lib/aiLessons/lesson14");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(aiLesson14)} />;
    },
  });
}
