import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "lesson-3",
    pathname: "/learn/3",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
