import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "cs-6",
    pathname: "/learn/cyber/6",
    load: async () => {
      const { cyberLesson6 } = await import("@/lib/cyberLessons/lesson6");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(cyberLesson6)} hubLabel="Cybersecurity Hub" />;
    },
  });
}
