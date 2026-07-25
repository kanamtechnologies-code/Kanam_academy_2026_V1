import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-9",
    pathname: "/learn/ap-csp-prep/9",
    load: async () => {
      const { apCspLesson9 } = await import("@/lib/apCspLessons/lesson9");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(apCspLesson9)} hubLabel="AP CSP Prep Hub" />;
    },
  });
}
