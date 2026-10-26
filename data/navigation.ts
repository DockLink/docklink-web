import { CodeXml, Globe, LayoutGrid, ScanBarcode, Smartphone, Stethoscope, type LucideIcon } from "lucide-react";

// Shared by the nav and footer so links never drift apart.

export type NavItem = {
  name: string;
  href: string;
  benefit: string;
  icon: LucideIcon;
  flagship?: boolean;
};

export const productLinks: NavItem[] = [
  { name: "ERP System", href: "/products/erp", benefit: "Run every department from one screen", icon: LayoutGrid },
  { name: "POS System", href: "/products/pos", benefit: "Faster billing, smarter inventory", icon: ScanBarcode },
  { name: "Doctor App", href: "/products/doctor", benefit: "Your practice in your pocket", icon: Stethoscope },
];

export const serviceLinks: NavItem[] = [
  { name: "Software Development", href: "/services/software", benefit: "Bespoke systems built around your workflow", icon: CodeXml, flagship: true },
  { name: "Web Development", href: "/services/web", benefit: "Sites and apps that actually convert", icon: Globe },
  { name: "Mobile App Development", href: "/services/mobile", benefit: "iOS & Android, one codebase", icon: Smartphone },
];

export const companyLinks = [
  { name: "Case studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

/** One name for the primary action, everywhere */
export const primaryCta = { label: "Book a consultation", href: "/contact" };
