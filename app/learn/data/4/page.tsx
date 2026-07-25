import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "da-4",
    pathname: "/learn/data/4",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
