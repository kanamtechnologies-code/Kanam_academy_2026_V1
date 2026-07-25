import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "dl-15",
    pathname: "/learn/digital/15",
    load: async () => {
      const { digitalLesson15 } = await import("@/lib/digitalLessons/lesson15");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(digitalLesson15)} hubLabel="Digital Literacy Hub" />;
    },
  });
}
