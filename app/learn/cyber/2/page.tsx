import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "cs-2",
    pathname: "/learn/cyber/2",
    load: async () => {
      const { cyberLesson2 } = await import("@/lib/cyberLessons/lesson2");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(cyberLesson2)} hubLabel="Cybersecurity Hub" />;
    },
  });
}
