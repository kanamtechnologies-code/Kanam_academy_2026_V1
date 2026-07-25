import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "fl-13",
    pathname: "/learn/finance/13",
    load: async () => {
      const { financeLesson13 } = await import("@/lib/financeLessons/lesson13");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(financeLesson13)} hubLabel="Financial Literacy Hub" />;
    },
  });
}
