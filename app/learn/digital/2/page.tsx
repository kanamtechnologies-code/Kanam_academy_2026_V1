import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "dl-2",
    pathname: "/learn/digital/2",
    load: async () => {
      const { digitalLesson2 } = await import("@/lib/digitalLessons/lesson2");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(digitalLesson2)} hubLabel="Digital Literacy Hub" />;
    },
  });
}
