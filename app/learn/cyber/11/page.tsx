import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "cs-11",
    pathname: "/learn/cyber/11",
    load: async () => {
      const { cyberLesson11 } = await import("@/lib/cyberLessons/lesson11");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(cyberLesson11)} hubLabel="Cybersecurity Hub" />;
    },
  });
}
