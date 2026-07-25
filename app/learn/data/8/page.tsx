import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "da-8",
    pathname: "/learn/data/8",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
