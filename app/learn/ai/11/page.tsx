import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "ai-11",
    pathname: "/learn/ai/11",
    load: async () => {
      const { aiLesson11 } = await import("@/lib/aiLessons/lesson11");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(aiLesson11)} />;
    },
  });
}
