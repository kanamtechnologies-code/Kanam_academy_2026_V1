import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "fl-7",
    pathname: "/learn/finance/7",
    load: async () => {
      const { financeLesson7 } = await import("@/lib/financeLessons/lesson7");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(financeLesson7)} hubLabel="Financial Literacy Hub" />;
    },
  });
}
