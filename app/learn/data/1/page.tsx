import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "da-1",
    pathname: "/learn/data/1",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
