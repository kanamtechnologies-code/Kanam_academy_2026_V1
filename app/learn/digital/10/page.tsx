import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "dl-10",
    pathname: "/learn/digital/10",
    load: async () => {
      const { digitalLesson10 } = await import("@/lib/digitalLessons/lesson10");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(digitalLesson10)} hubLabel="Digital Literacy Hub" />;
    },
  });
}
