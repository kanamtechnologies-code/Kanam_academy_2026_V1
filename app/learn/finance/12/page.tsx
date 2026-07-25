import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "fl-12",
    pathname: "/learn/finance/12",
    load: async () => {
      const { financeLesson12 } = await import("@/lib/financeLessons/lesson12");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(financeLesson12)} hubLabel="Financial Literacy Hub" />;
    },
  });
}
