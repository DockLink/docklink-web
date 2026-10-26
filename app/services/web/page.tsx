import type { Metadata } from "next";
import ServiceWeb from "@/components/pages/ServiceWeb";

export const metadata: Metadata = {
  title: "Web Development",
  description: "Sites and apps that actually convert — DocLink web development.",
};

export default function Page() {
  return <ServiceWeb />;
}
