import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "cs-5",
    pathname: "/learn/cyber/5",
    load: async () => {
      const { cyberLesson5 } = await import("@/lib/cyberLessons/lesson5");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(cyberLesson5)} hubLabel="Cybersecurity Hub" />;
    },
  });
}
