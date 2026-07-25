import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "cs-7",
    pathname: "/learn/cyber/7",
    load: async () => {
      const { cyberLesson7 } = await import("@/lib/cyberLessons/lesson7");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(cyberLesson7)} hubLabel="Cybersecurity Hub" />;
    },
  });
}
