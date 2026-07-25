import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "dl-9",
    pathname: "/learn/digital/9",
    load: async () => {
      const { digitalLesson9 } = await import("@/lib/digitalLessons/lesson9");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(digitalLesson9)} hubLabel="Digital Literacy Hub" />;
    },
  });
}
