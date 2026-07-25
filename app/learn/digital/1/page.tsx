import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "dl-1",
    pathname: "/learn/digital/1",
    load: async () => {
      const { digitalLesson1 } = await import("@/lib/digitalLessons/lesson1");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(digitalLesson1)} hubLabel="Digital Literacy Hub" />;
    },
  });
}
