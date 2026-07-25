import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "dl-11",
    pathname: "/learn/digital/11",
    load: async () => {
      const { digitalLesson11 } = await import("@/lib/digitalLessons/lesson11");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(digitalLesson11)} hubLabel="Digital Literacy Hub" />;
    },
  });
}
