import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "lesson-12",
    pathname: "/learn/12",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
