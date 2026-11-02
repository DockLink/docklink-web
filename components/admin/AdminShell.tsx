"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Briefcase,
  CodeXml,
  Globe,
  LayoutGrid,
  LogOut,
  PanelsTopLeft,
  ScanBarcode,
  Smartphone,
  Stethoscope,
} from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { cn } from "@/components/ui/cn";

const productNav = [
  { href: "/admin/products/listing", label: "Listing page", icon: LayoutGrid },
  { href: "/admin/products/erp", label: "ERP System", icon: LayoutGrid },
  { href: "/admin/products/pos", label: "POS System", icon: ScanBarcode },
  { href: "/admin/products/doctor", label: "Doctor App", icon: Stethoscope },
];

const serviceNav = [
  { href: "/admin/services/listing", label: "Listing page", icon: LayoutGrid },
  { href: "/admin/services/software", label: "Software", icon: CodeXml },
  { href: "/admin/services/web", label: "Web", icon: Globe },
  { href: "/admin/services/mobile", label: "Mobile", icon: Smartphone },
];

const caseStudyNav = [
  { href: "/admin/case-studies/listing", label: "Listing page", icon: LayoutGrid },
  { href: "/admin/case-studies", label: "All studies", icon: Briefcase },
];

function NavLink({ href, label, icon: Icon, active }: { href: string; label: string; icon: typeof LayoutGrid; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex shrink-0 items-center gap-2 rounded-control px-3 py-2 text-sm font-medium",
        active ? "bg-brand-soft text-brand-ink" : "text-muted hover:bg-surface hover:text-ink",
      )}
    >
      <Icon size={16} />
      {label}
    </Link>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createBrowserSupabaseClient();
    await supabase?.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-line bg-white lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-4 lg:block">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">DocLink</p>
            <p className="mt-1 font-display text-lg font-bold text-ink">DocLink CMS</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-control px-3 py-2 text-sm text-muted hover:bg-surface hover:text-ink lg:hidden"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:block lg:space-y-4 lg:overflow-visible lg:px-3 lg:pb-6">
          <div className="flex gap-1 lg:block lg:space-y-1">
            <NavLink href="/admin" label="Dashboard" icon={PanelsTopLeft} active={pathname === "/admin"} />
          </div>
          <div className="flex gap-1 lg:block lg:space-y-1">
            <p className="hidden px-3 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle lg:block">
              Products
            </p>
            {productNav.map((item) => (
              <NavLink key={item.href} {...item} active={pathname === item.href} />
            ))}
          </div>
          <div className="flex gap-1 lg:block lg:space-y-1">
            <p className="hidden px-3 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle lg:block">
              Services
            </p>
            {serviceNav.map((item) => (
              <NavLink key={item.href} {...item} active={pathname === item.href} />
            ))}
          </div>
          <div className="flex gap-1 lg:block lg:space-y-1">
            <p className="hidden px-3 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle lg:block">
              Case Studies
            </p>
            {caseStudyNav.map((item) => (
              <NavLink
                key={item.href}
                {...item}
                active={item.href === "/admin/case-studies" ? pathname === item.href || pathname.startsWith("/admin/case-studies/") && !pathname.startsWith("/admin/case-studies/listing") : pathname === item.href}
              />
            ))}
          </div>
        </nav>
        <div className="hidden px-3 pb-6 lg:block">
          <button
            type="button"
            onClick={signOut}
            className="flex w-full items-center gap-2 rounded-control px-3 py-2 text-sm text-muted hover:bg-surface hover:text-ink"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>
      <div className="min-w-0 px-4 py-6 sm:px-8">{children}</div>
    </div>
  );
}
