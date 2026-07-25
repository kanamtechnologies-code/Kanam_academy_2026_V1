import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-8",
    pathname: "/learn/ap-csp-prep/8",
    load: async () => {
      const { apCspLesson8 } = await import("@/lib/apCspLessons/lesson8");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(apCspLesson8)} hubLabel="AP CSP Prep Hub" />;
    },
  });
}
