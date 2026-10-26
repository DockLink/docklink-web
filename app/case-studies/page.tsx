import type { Metadata } from "next";
import CaseStudies from "@/components/pages/CaseStudies";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Real results from DocLink deployments across Sri Lanka.",
};

export default function Page() {
  return <CaseStudies />;
}
