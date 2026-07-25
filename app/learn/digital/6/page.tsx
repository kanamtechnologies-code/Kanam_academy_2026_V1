import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "dl-6",
    pathname: "/learn/digital/6",
    load: async () => {
      const { digitalLesson6 } = await import("@/lib/digitalLessons/lesson6");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(digitalLesson6)} hubLabel="Digital Literacy Hub" />;
    },
  });
}
