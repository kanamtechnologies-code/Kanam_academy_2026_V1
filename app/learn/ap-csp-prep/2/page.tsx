import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-2",
    pathname: "/learn/ap-csp-prep/2",
    load: async () => {
      const { apCspLesson2 } = await import("@/lib/apCspLessons/lesson2");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(apCspLesson2)} hubLabel="AP CSP Prep Hub" />;
    },
  });
}
