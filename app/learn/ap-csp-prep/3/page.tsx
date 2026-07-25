import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-3",
    pathname: "/learn/ap-csp-prep/3",
    load: async () => {
      const { apCspLesson3 } = await import("@/lib/apCspLessons/lesson3");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(apCspLesson3)} hubLabel="AP CSP Prep Hub" />;
    },
  });
}
