import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "fl-6",
    pathname: "/learn/finance/6",
    load: async () => {
      const { financeLesson6 } = await import("@/lib/financeLessons/lesson6");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(financeLesson6)} hubLabel="Financial Literacy Hub" />;
    },
  });
}
