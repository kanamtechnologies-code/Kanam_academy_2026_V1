import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "fl-3",
    pathname: "/learn/finance/3",
    load: async () => {
      const { financeLesson3 } = await import("@/lib/financeLessons/lesson3");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(financeLesson3)} hubLabel="Financial Literacy Hub" />;
    },
  });
}
