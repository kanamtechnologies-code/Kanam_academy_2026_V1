import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "da-2",
    pathname: "/learn/data/2",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
