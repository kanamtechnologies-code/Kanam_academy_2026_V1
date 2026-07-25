import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-10",
    pathname: "/learn/ap-csp-prep/10",
    load: async () => {
      const { apCspLesson10 } = await import("@/lib/apCspLessons/lesson10");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(apCspLesson10)} hubLabel="AP CSP Prep Hub" />;
    },
  });
}
