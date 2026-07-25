import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-1",
    pathname: "/learn/ap-csp-prep/1",
    load: async () => {
      const { apCspLesson1 } = await import("@/lib/apCspLessons/lesson1");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(apCspLesson1)} hubLabel="AP CSP Prep Hub" />;
    },
  });
}
