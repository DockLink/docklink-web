import type { Metadata } from "next";
import ProductDoctor from "@/components/pages/ProductDoctor";

export const metadata: Metadata = {
  title: "Doctor App",
  description: "Your practice in your pocket — DocLink Doctor App.",
};

export default function Page() {
  return <ProductDoctor />;
}
