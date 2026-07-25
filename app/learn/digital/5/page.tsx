import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "dl-5",
    pathname: "/learn/digital/5",
    load: async () => {
      const { digitalLesson5 } = await import("@/lib/digitalLessons/lesson5");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(digitalLesson5)} hubLabel="Digital Literacy Hub" />;
    },
  });
}
