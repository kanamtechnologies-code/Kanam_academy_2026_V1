import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-11",
    pathname: "/learn/ap-csp-prep/11",
    load: async () => {
      const { apCspLesson11 } = await import("@/lib/apCspLessons/lesson11");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(apCspLesson11)} hubLabel="AP CSP Prep Hub" />;
    },
  });
}
