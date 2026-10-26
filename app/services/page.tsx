import type { Metadata } from "next";
import Services from "@/components/pages/Services";

export const metadata: Metadata = {
  title: "Services",
  description: "Custom software, web, and mobile app development from DocLink Technologies.",
};

export default function Page() {
  return <Services />;
}
