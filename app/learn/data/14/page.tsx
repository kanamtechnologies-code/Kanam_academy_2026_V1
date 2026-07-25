import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "da-14",
    pathname: "/learn/data/14",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
