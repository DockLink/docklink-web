import type { Metadata } from "next";
import About from "@/components/pages/About";

export const metadata: Metadata = {
  title: "About",
  description: "DocLink Technologies — business software built in Sri Lanka.",
};

export default function Page() {
  return <About />;
}
