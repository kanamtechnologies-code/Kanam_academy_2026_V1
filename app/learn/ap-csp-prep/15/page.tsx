import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-15",
    pathname: "/learn/ap-csp-prep/15",
    load: async () => {
      const { apCspLesson15 } = await import("@/lib/apCspLessons/lesson15");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(apCspLesson15)} hubLabel="AP CSP Prep Hub" />;
    },
  });
}
