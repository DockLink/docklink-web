import type { Metadata } from "next";
import ProductERP from "@/components/pages/ProductERP";

export const metadata: Metadata = {
  title: "ERP System",
  description: "Run every department from one screen with DocLink ERP.",
};

export default function Page() {
  return <ProductERP />;
}
