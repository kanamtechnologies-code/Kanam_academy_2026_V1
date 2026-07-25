import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "dl-7",
    pathname: "/learn/digital/7",
    load: async () => {
      const { digitalLesson7 } = await import("@/lib/digitalLessons/lesson7");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(digitalLesson7)} hubLabel="Digital Literacy Hub" />;
    },
  });
}
