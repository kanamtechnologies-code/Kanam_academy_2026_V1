import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "dl-14",
    pathname: "/learn/digital/14",
    load: async () => {
      const { digitalLesson14 } = await import("@/lib/digitalLessons/lesson14");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(digitalLesson14)} hubLabel="Digital Literacy Hub" />;
    },
  });
}
