import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-practice-2",
    pathname: "/learn/ap-csp-prep/exam/practice-2",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
