import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "fl-8",
    pathname: "/learn/finance/8",
    load: async () => {
      const { financeLesson8 } = await import("@/lib/financeLessons/lesson8");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(financeLesson8)} hubLabel="Financial Literacy Hub" />;
    },
  });
}
