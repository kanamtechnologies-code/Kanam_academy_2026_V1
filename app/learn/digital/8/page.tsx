import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "dl-8",
    pathname: "/learn/digital/8",
    load: async () => {
      const { digitalLesson8 } = await import("@/lib/digitalLessons/lesson8");
      const { attachInteractiveActivities } = await import("@/lib/lessons/attachInteractiveActivities");
      const { default: Content } = await import("./content");
      return <Content lesson={attachInteractiveActivities(digitalLesson8)} hubLabel="Digital Literacy Hub" />;
    },
  });
}
