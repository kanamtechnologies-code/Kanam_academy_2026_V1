import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-5",
    pathname: "/learn/ap-csp-prep/5",
    load: async () => {
      const { apCspLesson5 } = await import("@/lib/apCspLessons/lesson5");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(apCspLesson5)} hubLabel="AP CSP Prep Hub" />;
    },
  });
}
