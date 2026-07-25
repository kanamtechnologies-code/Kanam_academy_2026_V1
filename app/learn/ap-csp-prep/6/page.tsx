import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-6",
    pathname: "/learn/ap-csp-prep/6",
    load: async () => {
      const { apCspLesson6 } = await import("@/lib/apCspLessons/lesson6");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(apCspLesson6)} hubLabel="AP CSP Prep Hub" />;
    },
  });
}
