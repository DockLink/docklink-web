import type { Metadata } from "next";
import ServiceSoftware from "@/components/pages/ServiceSoftware";

export const metadata: Metadata = {
  title: "Software Development",
  description: "Bespoke systems built around your workflow — DocLink software development.",
};

export default function Page() {
  return <ServiceSoftware />;
}
