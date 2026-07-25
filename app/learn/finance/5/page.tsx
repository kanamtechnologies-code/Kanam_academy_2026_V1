import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "fl-5",
    pathname: "/learn/finance/5",
    load: async () => {
      const { financeLesson5 } = await import("@/lib/financeLessons/lesson5");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(financeLesson5)} hubLabel="Financial Literacy Hub" />;
    },
  });
}
