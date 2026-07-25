import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "dl-13",
    pathname: "/learn/digital/13",
    load: async () => {
      const { digitalLesson13 } = await import("@/lib/digitalLessons/lesson13");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(digitalLesson13)} hubLabel="Digital Literacy Hub" />;
    },
  });
}
