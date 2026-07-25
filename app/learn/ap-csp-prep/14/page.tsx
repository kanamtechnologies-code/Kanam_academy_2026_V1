import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-14",
    pathname: "/learn/ap-csp-prep/14",
    load: async () => {
      const { apCspLesson14 } = await import("@/lib/apCspLessons/lesson14");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(apCspLesson14)} hubLabel="AP CSP Prep Hub" />;
    },
  });
}
