import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "cs-12",
    pathname: "/learn/cyber/12",
    load: async () => {
      const { cyberLesson12 } = await import("@/lib/cyberLessons/lesson12");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(cyberLesson12)} hubLabel="Cybersecurity Hub" />;
    },
  });
}
