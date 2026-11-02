"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { cn } from "@/components/ui/cn";
import { getLenis } from "@/lib/smoothScroll";
import { companyLinks, primaryCta, productLinks, serviceLinks, type NavItem } from "@/data/navigation";

type MenuKey = "products" | "services";

const menus: { key: MenuKey; label: string; items: NavItem[]; all: { label: string; href: string } }[] = [
  { key: "products", label: "Products", items: productLinks, all: { label: "All products", href: "/products" } },
  { key: "services", label: "Services", items: serviceLinks, all: { label: "All services", href: "/services" } },
];

const topLink =
  "inline-flex h-9 items-center gap-1 rounded-control px-3 text-sm font-medium transition-colors duration-(--dur-fast) ease-standard";

function MenuItem({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="flex items-start gap-3 rounded-control p-2.5 transition-colors duration-(--dur-fast) hover:bg-surface"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-control bg-brand-soft text-brand">
        <Icon aria-hidden className="size-[18px]" strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-sm font-medium text-ink">
          {item.name}
          {item.flagship && (
            <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand-ink">Flagship</span>
          )}
        </span>
        <span className="mt-0.5 block text-sm text-muted">{item.benefit}</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close everything after navigating
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  // Hide on the way down, return on the way up (ramp.com): more page, same reach
  const [tucked, setTucked] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const dy = y - last;
      setScrolled(y > 4);
      if (y < 96) setTucked(false);
      else if (dy > 6) setTucked(true);
      else if (dy < -6) setTucked(false);
      if (Math.abs(dy) > 6 || y < 96) last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  const [focusInside, setFocusInside] = useState(false);
  const hidden = tucked && !openMenu && !mobileOpen && !focusInside;

  // Escape and outside click close the desktop menus
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const key = openMenu;
        setOpenMenu(null);
        document.getElementById(`nav-trigger-${key}`)?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openMenu]);

  // Mobile sheet: lock page scroll, Escape closes
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      getLenis()?.start();
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  // Mouse users get hover-open with a short grace period; touch and keyboard use click
  const hoverOpen = (key: MenuKey) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpenMenu(key);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    hoverTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
    <header
      onFocusCapture={() => setFocusInside(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusInside(false);
      }}
      className={cn(
        "sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md",
        "transition-[transform,border-color] duration-(--dur-slow) ease-standard",
        scrolled || mobileOpen ? "border-line" : "border-transparent",
        hidden && "-translate-y-full",
      )}
    >
      <Container>
        <div ref={navRef} className="flex h-16 items-center gap-6">
          <Link href="/" aria-label="DocLink Technologies home" className="-ml-1 flex shrink-0 items-center rounded-control p-1">
            <Logo height={36} priority />
          </Link>

          <nav aria-label="Main" className="hidden flex-1 lg:block">
            <ul className="flex items-center gap-1">
              {menus.map((menu) => {
                const open = openMenu === menu.key;
                const active = isActive(menu.all.href);
                return (
                  <li key={menu.key} className="relative" onPointerEnter={hoverOpen(menu.key)} onPointerLeave={hoverClose}>
                    <button
                      id={`nav-trigger-${menu.key}`}
                      type="button"
                      aria-expanded={open}
                      aria-controls={`nav-menu-${menu.key}`}
                      onClick={() => setOpenMenu(open ? null : menu.key)}
                      className={cn(topLink, active || open ? "text-ink" : "text-muted hover:text-ink", open && "bg-surface")}
                    >
                      {menu.label}
                      <ChevronDown
                        aria-hidden
                        className={cn("size-4 transition-transform duration-(--dur-base)", open && "rotate-180")}
                        strokeWidth={1.75}
                      />
                    </button>
                    <div
                      id={`nav-menu-${menu.key}`}
                      hidden={!open}
                      className="absolute left-0 top-full w-[380px] pt-2"
                    >
                      <div className="rounded-surface border border-line bg-white p-2 shadow-pop">
                        <ul>
                          {menu.items.map((item) => (
                            <li key={item.href}>
                              <MenuItem item={item} />
                            </li>
                          ))}
                        </ul>
                        <div className="mt-1 border-t border-line px-2.5 pb-1 pt-2.5">
                          <Link href={menu.all.href} className="text-sm font-medium text-brand hover:text-brand-hover">
                            {menu.all.label}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
              {companyLinks
                .filter((l) => l.href !== "/contact")
                .map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      className={cn(topLink, isActive(l.href) ? "text-ink" : "text-muted hover:text-ink")}
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {/* Visibility lives on wrappers: the links' own inline-flex would override `hidden` */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                aria-current={isActive("/contact") ? "page" : undefined}
                className={cn(topLink, isActive("/contact") ? "text-ink" : "text-muted hover:text-ink")}
              >
                Contact
              </Link>
            </div>
            <div className="hidden sm:block">
              <Button href={primaryCta.href} size="md">
                {primaryCta.label}
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="-mr-2 flex size-11 items-center justify-center rounded-control text-ink hover:bg-surface lg:hidden"
            >
              {mobileOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </button>
          </div>
        </div>
      </Container>
    </header>

      {/* Mobile sheet: everything visible at once, no nested accordions.
          Sits outside <header> because the header's backdrop blur would trap position: fixed. */}
      <div
        id="mobile-menu"
        data-lenis-prevent
        hidden={!mobileOpen}
        className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-white lg:hidden"
      >
        <Container className="space-y-8 py-6">
          {menus.map((menu) => (
            <div key={menu.key}>
              <h2 className="px-2.5 text-sm font-medium text-muted">{menu.label}</h2>
              <ul className="mt-2">
                {menu.items.map((item) => (
                  <li key={item.href}>
                    <MenuItem item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul className="border-t border-line pt-4">
            {[{ name: "All products", href: "/products" }, { name: "All services", href: "/services" }, ...companyLinks].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn(
                    "flex h-11 items-center rounded-control px-2.5 text-base font-medium",
                    isActive(l.href) ? "text-brand" : "text-ink hover:bg-surface",
                  )}
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button href={primaryCta.href} size="lg" className="w-full">
            {primaryCta.label}
          </Button>
        </Container>
      </div>
    </>
  );
}
