import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "dl-16",
    pathname: "/learn/digital/16",
    load: async () => {
      const { digitalLesson16 } = await import("@/lib/digitalLessons/lesson16");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(digitalLesson16)} hubLabel="Digital Literacy Hub" />;
    },
  });
}
