import type { Metadata } from "next";
import Products from "@/components/pages/Products";

export const metadata: Metadata = {
  title: "Products",
  description: "ERP, POS, and Doctor App — business software built for Sri Lankan companies.",
};

export default function Page() {
  return <Products />;
}
