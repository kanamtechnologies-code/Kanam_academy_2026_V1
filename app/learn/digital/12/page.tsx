import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "dl-12",
    pathname: "/learn/digital/12",
    load: async () => {
      const { digitalLesson12 } = await import("@/lib/digitalLessons/lesson12");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(digitalLesson12)} hubLabel="Digital Literacy Hub" />;
    },
  });
}
