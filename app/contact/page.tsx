import type { Metadata } from "next";
import Contact from "@/components/pages/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a consultation with DocLink Technologies.",
};

export default function Page() {
  return <Contact />;
}
