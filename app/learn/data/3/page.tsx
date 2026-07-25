import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "da-3",
    pathname: "/learn/data/3",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
