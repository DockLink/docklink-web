import type { Metadata } from "next";
import ServiceMobile from "@/components/pages/ServiceMobile";

export const metadata: Metadata = {
  title: "Mobile App Development",
  description: "iOS and Android — one codebase, full native feel.",
};

export default function Page() {
  return <ServiceMobile />;
}
