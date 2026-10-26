import type { Metadata } from "next";
import ProductPOS from "@/components/pages/ProductPOS";

export const metadata: Metadata = {
  title: "POS System",
  description: "Faster billing and smarter inventory with DocLink POS.",
};

export default function Page() {
  return <ProductPOS />;
}
