import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-4",
    pathname: "/learn/ap-csp-prep/4",
    load: async () => {
      const { apCspLesson4 } = await import("@/lib/apCspLessons/lesson4");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(apCspLesson4)} hubLabel="AP CSP Prep Hub" />;
    },
  });
}
