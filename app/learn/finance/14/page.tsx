import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "fl-14",
    pathname: "/learn/finance/14",
    load: async () => {
      const { financeLesson14 } = await import("@/lib/financeLessons/lesson14");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(financeLesson14)} hubLabel="Financial Literacy Hub" />;
    },
  });
}
