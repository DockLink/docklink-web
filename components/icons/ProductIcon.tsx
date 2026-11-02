import { createElement } from "react";
import {
  Banknote,
  Boxes,
  Calculator,
  CalendarClock,
  CodeXml,
  FileText,
  Globe,
  Handshake,
  IdCard,
  KeyRound,
  LayoutGrid,
  LockKeyhole,
  MapPin,
  Megaphone,
  Package,
  Receipt,
  ScanBarcode,
  Server,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  UsersRound,
  Wallet,
  Zap,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

/**
 * The CMS stores icon names (from the original DocLink icon set). This maps each
 * one to Lucide so the whole site uses a single icon family.
 */
const map: Record<string, LucideIcon> = {
  erp: LayoutGrid,
  pos: ScanBarcode,
  doctor: Stethoscope,
  web: Globe,
  software: CodeXml,
  mobile: Smartphone,
  crm: Handshake,
  estimate: FileText,
  invoice: Receipt,
  accounting: Calculator,
  inventory: Package,
  stock: Boxes,
  rental: KeyRound,
  hr: IdCard,
  payroll: Wallet,
  hosting: Server,
  pricing: Banknote,
  local: MapPin,
  lock: LockKeyhole,
  encrypt: ShieldCheck,
  sme: UsersRound,
  fast: Zap,
  team: UsersRound,
  megaphone: Megaphone,
  appointments: CalendarClock,
};

export function productIcon(name: string): LucideIcon {
  return map[name] ?? LayoutGrid;
}

export default function ProductIcon({ name, ...props }: { name: string } & LucideProps) {
  // Picks from a fixed map, so no component is created during render
  return createElement(productIcon(name), { "aria-hidden": true, strokeWidth: 1.75, ...props });
}
