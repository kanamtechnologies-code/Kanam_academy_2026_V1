import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "cs-10",
    pathname: "/learn/cyber/10",
    load: async () => {
      const { cyberLesson10 } = await import("@/lib/cyberLessons/lesson10");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(cyberLesson10)} hubLabel="Cybersecurity Hub" />;
    },
  });
}
