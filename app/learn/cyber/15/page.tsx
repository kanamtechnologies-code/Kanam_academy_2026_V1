import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "cs-15",
    pathname: "/learn/cyber/15",
    load: async () => {
      const { cyberLesson15 } = await import("@/lib/cyberLessons/lesson15");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(cyberLesson15)} hubLabel="Cybersecurity Hub" />;
    },
  });
}
