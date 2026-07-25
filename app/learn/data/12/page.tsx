import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "da-12",
    pathname: "/learn/data/12",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
