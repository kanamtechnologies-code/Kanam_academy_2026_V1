import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "fl-10",
    pathname: "/learn/finance/10",
    load: async () => {
      const { financeLesson10 } = await import("@/lib/financeLessons/lesson10");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(financeLesson10)} hubLabel="Financial Literacy Hub" />;
    },
  });
}
