"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollRiseFallback from "@/components/motion/ScrollRiseFallback";
import SmoothScroll from "@/components/motion/SmoothScroll";
import SpotlightTracker from "@/components/motion/SpotlightTracker";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPreview = pathname.startsWith("/admin/preview");
  const isAdmin = pathname.startsWith("/admin") && !isPreview;

  if (isAdmin) {
    return (
      <main id="main" className="flex-1 bg-surface">
        {children}
      </main>
    );
  }

  if (isPreview) {
    return children;
  }

  return (
    <>
      <SmoothScroll />
      <SpotlightTracker />
      <ScrollRiseFallback />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
