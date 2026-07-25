import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "da-6",
    pathname: "/learn/data/6",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
