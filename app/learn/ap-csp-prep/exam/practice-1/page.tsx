import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-practice-1",
    pathname: "/learn/ap-csp-prep/exam/practice-1",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
