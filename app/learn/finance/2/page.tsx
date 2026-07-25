import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "fl-2",
    pathname: "/learn/finance/2",
    load: async () => {
      const { financeLesson2 } = await import("@/lib/financeLessons/lesson2");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(financeLesson2)} hubLabel="Financial Literacy Hub" />;
    },
  });
}
