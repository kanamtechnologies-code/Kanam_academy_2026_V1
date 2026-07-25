import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "da-13",
    pathname: "/learn/data/13",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
