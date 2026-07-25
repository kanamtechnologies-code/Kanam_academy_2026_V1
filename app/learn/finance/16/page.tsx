import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "fl-16",
    pathname: "/learn/finance/16",
    load: async () => {
      const { financeLesson16 } = await import("@/lib/financeLessons/lesson16");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(financeLesson16)} hubLabel="Financial Literacy Hub" />;
    },
  });
}
