import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "lesson-10",
    pathname: "/learn/10",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
