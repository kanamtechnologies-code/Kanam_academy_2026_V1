import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-7",
    pathname: "/learn/ap-csp-prep/7",
    load: async () => {
      const { apCspLesson7 } = await import("@/lib/apCspLessons/lesson7");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(apCspLesson7)} hubLabel="AP CSP Prep Hub" />;
    },
  });
}
