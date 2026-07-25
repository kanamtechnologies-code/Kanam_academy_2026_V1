import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "cs-16",
    pathname: "/learn/cyber/16",
    load: async () => {
      const { cyberLesson16 } = await import("@/lib/cyberLessons/lesson16");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(cyberLesson16)} hubLabel="Cybersecurity Hub" />;
    },
  });
}
