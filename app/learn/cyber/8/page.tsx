import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "cs-8",
    pathname: "/learn/cyber/8",
    load: async () => {
      const { cyberLesson8 } = await import("@/lib/cyberLessons/lesson8");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(cyberLesson8)} hubLabel="Cybersecurity Hub" />;
    },
  });
}
