import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "dl-3",
    pathname: "/learn/digital/3",
    load: async () => {
      const { digitalLesson3 } = await import("@/lib/digitalLessons/lesson3");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(digitalLesson3)} hubLabel="Digital Literacy Hub" />;
    },
  });
}
