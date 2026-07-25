import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "cs-9",
    pathname: "/learn/cyber/9",
    load: async () => {
      const { cyberLesson9 } = await import("@/lib/cyberLessons/lesson9");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(cyberLesson9)} hubLabel="Cybersecurity Hub" />;
    },
  });
}
