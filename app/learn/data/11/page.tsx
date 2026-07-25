import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "da-11",
    pathname: "/learn/data/11",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
