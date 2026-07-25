import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "fl-4",
    pathname: "/learn/finance/4",
    load: async () => {
      const { financeLesson4 } = await import("@/lib/financeLessons/lesson4");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(financeLesson4)} hubLabel="Financial Literacy Hub" />;
    },
  });
}
