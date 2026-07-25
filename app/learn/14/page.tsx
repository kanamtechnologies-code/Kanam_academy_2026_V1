import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "lesson-14",
    pathname: "/learn/14",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
