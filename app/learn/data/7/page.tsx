import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "da-7",
    pathname: "/learn/data/7",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
