import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "fl-15",
    pathname: "/learn/finance/15",
    load: async () => {
      const { financeLesson15 } = await import("@/lib/financeLessons/lesson15");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(financeLesson15)} hubLabel="Financial Literacy Hub" />;
    },
  });
}
