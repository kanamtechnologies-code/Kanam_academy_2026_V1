import { renderGatedLesson } from "@/lib/billing/renderGatedLesson";

export default async function Page() {
  return renderGatedLesson({
    lessonId: "csp-final",
    pathname: "/learn/ap-csp-prep/exam/final",
    load: async () => {
      const { default: Content } = await import("./content");
      return <Content />;
    },
  });
}
