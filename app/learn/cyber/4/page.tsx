import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "cs-4",
    pathname: "/learn/cyber/4",
    load: async () => {
      const { cyberLesson4 } = await import("@/lib/cyberLessons/lesson4");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(cyberLesson4)} hubLabel="Cybersecurity Hub" />;
    },
  });
}
