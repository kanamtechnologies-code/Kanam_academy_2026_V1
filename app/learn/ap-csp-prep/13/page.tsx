import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-13",
    pathname: "/learn/ap-csp-prep/13",
    load: async () => {
      const { apCspLesson13 } = await import("@/lib/apCspLessons/lesson13");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(apCspLesson13)} hubLabel="AP CSP Prep Hub" />;
    },
  });
}
