import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "dl-4",
    pathname: "/learn/digital/4",
    load: async () => {
      const { digitalLesson4 } = await import("@/lib/digitalLessons/lesson4");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(digitalLesson4)} hubLabel="Digital Literacy Hub" />;
    },
  });
}
