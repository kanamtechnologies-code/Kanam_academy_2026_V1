import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "da-9",
    pathname: "/learn/data/9",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
