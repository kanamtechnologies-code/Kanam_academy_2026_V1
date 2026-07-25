import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "cs-1",
    pathname: "/learn/cyber/1",
    load: async () => {
      const { cyberLesson1 } = await import("@/lib/cyberLessons/lesson1");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(cyberLesson1)} hubLabel="Cybersecurity Hub" />;
    },
  });
}
