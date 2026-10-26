import type { Metadata } from "next";
import Home from "@/components/pages/Home";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description:
    "ERP, POS, and custom software that replaces the spreadsheets — built in Sri Lanka for growing businesses.",
};

export default function Page() {
  return <Home />;
}
