import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "cs-13",
    pathname: "/learn/cyber/13",
    load: async () => {
      const { cyberLesson13 } = await import("@/lib/cyberLessons/lesson13");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(cyberLesson13)} hubLabel="Cybersecurity Hub" />;
    },
  });
}
