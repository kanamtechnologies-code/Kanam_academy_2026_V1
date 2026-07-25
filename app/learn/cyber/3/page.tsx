import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "cs-3",
    pathname: "/learn/cyber/3",
    load: async () => {
      const { cyberLesson3 } = await import("@/lib/cyberLessons/lesson3");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(cyberLesson3)} hubLabel="Cybersecurity Hub" />;
    },
  });
}
