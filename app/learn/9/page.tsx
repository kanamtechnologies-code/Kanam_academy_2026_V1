import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "lesson-9",
    pathname: "/learn/9",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
