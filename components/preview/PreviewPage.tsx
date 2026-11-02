"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PreviewPage({
  editorHref,
  liveHref,
  published,
  children,
}: {
  editorHref: string;
  liveHref: string;
  published?: boolean;
  children: React.ReactNode;
}) {
  const showLive = published !== false;

  return (
    <div className="flex min-h-full flex-col bg-white">
      <div className="sticky top-0 z-[60] [&_header]:static [&_header]:z-auto">
        <div className="bg-navy text-on-navy" role="status">
          <div className="flex h-11 items-center justify-between gap-3 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-2">
              <Eye size={16} aria-hidden className="shrink-0" />
              <p className="truncate text-sm font-medium">Website preview</p>
              {published === false ? (
                <span className="hidden shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-on-navy-muted sm:inline">
                  Hidden from the public site
                </span>
              ) : null}
              {published === true ? (
                <span className="hidden shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-on-navy-muted sm:inline">
                  Published
                </span>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <Link href={editorHref} className="text-sm font-medium text-on-navy hover:underline">
                Back to editor
              </Link>
              {showLive ? (
                <a href={liveHref} className="text-sm font-medium text-on-navy-muted hover:text-on-navy hover:underline">
                  Open live page
                </a>
              ) : null}
            </div>
          </div>
        </div>
        <Navbar />
      </div>
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
