import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-16",
    pathname: "/learn/ap-csp-prep/16",
    load: async () => {
      const { apCspLesson16 } = await import("@/lib/apCspLessons/lesson16");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(apCspLesson16)} hubLabel="AP CSP Prep Hub" />;
    },
  });
}
