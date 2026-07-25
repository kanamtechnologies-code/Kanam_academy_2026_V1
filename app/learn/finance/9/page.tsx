import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "fl-9",
    pathname: "/learn/finance/9",
    load: async () => {
      const { financeLesson9 } = await import("@/lib/financeLessons/lesson9");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(financeLesson9)} hubLabel="Financial Literacy Hub" />;
    },
  });
}
