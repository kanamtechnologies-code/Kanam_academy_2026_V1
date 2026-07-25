import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "fl-1",
    pathname: "/learn/finance/1",
    load: async () => {
      const { financeLesson1 } = await import("@/lib/financeLessons/lesson1");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(financeLesson1)} hubLabel="Financial Literacy Hub" />;
    },
  });
}
