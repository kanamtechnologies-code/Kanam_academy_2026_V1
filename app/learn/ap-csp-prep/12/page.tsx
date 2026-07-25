import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-12",
    pathname: "/learn/ap-csp-prep/12",
    load: async () => {
      const { apCspLesson12 } = await import("@/lib/apCspLessons/lesson12");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(apCspLesson12)} hubLabel="AP CSP Prep Hub" />;
    },
  });
}
