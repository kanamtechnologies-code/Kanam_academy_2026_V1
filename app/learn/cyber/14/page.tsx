import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "cs-14",
    pathname: "/learn/cyber/14",
    load: async () => {
      const { cyberLesson14 } = await import("@/lib/cyberLessons/lesson14");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(cyberLesson14)} hubLabel="Cybersecurity Hub" />;
    },
  });
}
