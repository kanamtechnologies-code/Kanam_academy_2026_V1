import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "fl-11",
    pathname: "/learn/finance/11",
    load: async () => {
      const { financeLesson11 } = await import("@/lib/financeLessons/lesson11");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(financeLesson11)} hubLabel="Financial Literacy Hub" />;
    },
  });
}
