import type { SVGProps, ReactElement } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function baseProps({ size = 24, className, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true as const,
    ...rest,
  };
}

export function IconERP(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function IconPOS(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M7 18v2M17 18v2M8 9h3M13 9h3M8 13h8" />
    </svg>
  );
}

export function IconDoctor(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 3v6M9 6h6" />
      <circle cx="12" cy="15" r="6" />
      <path d="M12 12v6M9 15h6" />
    </svg>
  );
}

export function IconWeb(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
    </svg>
  );
}

export function IconSoftware(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M8 7l-4 5 4 5M16 7l4 5-4 5M13 5l-2 14" />
    </svg>
  );
}

export function IconMobile(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

export function IconCRM(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="9" cy="8" r="3" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5M14 14.5c2.5.3 5 1.8 5 4.5" />
    </svg>
  );
}

export function IconEstimate(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M8 3h7l4 4v14a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <path d="M15 3v4h4M9 12h6M9 16h4" />
    </svg>
  );
}

export function IconInvoice(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M7 3h10a1 1 0 011 1v17l-3-2-3 2-3-2-3 2V4a1 1 0 011-1z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </svg>
  );
}

export function IconAccounting(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

export function IconInventory(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 3l8 4v5c0 4.5-3.5 7.5-8 9-4.5-1.5-8-4.5-8-9V7l8-4z" />
      <path d="M9 12h6M12 9v6" />
    </svg>
  );
}

export function IconStock(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 8l8-4 8 4-8 4-8-4z" />
      <path d="M4 12l8 4 8-4M4 16l8 4 8-4" />
    </svg>
  );
}

export function IconRental(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M5 17h14M7 17V9l5-4 5 4v8" />
      <circle cx="8.5" cy="17" r="1.5" />
      <circle cx="15.5" cy="17" r="1.5" />
      <path d="M9 12h6" />
    </svg>
  );
}

export function IconHR(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c0-3.5 3-6 7-6s7 2.5 7 6" />
    </svg>
  );
}

export function IconPayroll(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 14h2M12 14h5" />
    </svg>
  );
}

export function IconHosting(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 10l8-6 8 6v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9z" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export function IconPricing(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.5c.5-1 1.5-1.5 2.5-1.5 1.5 0 2.5.8 2.5 2s-1 2-2.5 2.5-2.5.8-2.5 2c0 1.2 1 2 2.5 2 1 0 2-.5 2.5-1.5" />
    </svg>
  );
}

export function IconLocal(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18M5.5 7.5c2.5 1 5.5 1.5 6.5 1.5s4-.5 6.5-1.5M5.5 16.5c2.5-1 5.5-1.5 6.5-1.5s4 .5 6.5 1.5" />
    </svg>
  );
}

export function IconLock(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </svg>
  );
}

export function IconEncrypt(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9.5 12l2 2 3.5-4" />
    </svg>
  );
}

export function IconSME(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M3 20V9l6-4 6 4v11" />
      <path d="M15 11l6-3v12H15" />
      <path d="M9 20v-5h3v5" />
    </svg>
  );
}

export function IconFast(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M13 3L5 14h6l-1 7 9-12h-6l0-6z" />
    </svg>
  );
}

export function IconTeam(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="8" cy="9" r="3" />
      <circle cx="16" cy="9" r="3" />
      <path d="M2 19c0-2.5 2.5-4.5 6-4.5s6 2 6 4.5M14 14.5c2.8.2 6 1.8 6 4.5" />
    </svg>
  );
}

export function IconMegaphone(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 10v4l12 3V7L4 10z" />
      <path d="M16 10.5c1.5.5 3 1.5 4 2.5-1 1-2.5 2-4 2.5" />
      <path d="M7 14v4a2 2 0 002 2h1" />
    </svg>
  );
}

export type DocLinkIconName =
  | "erp"
  | "pos"
  | "doctor"
  | "web"
  | "software"
  | "mobile"
  | "crm"
  | "estimate"
  | "invoice"
  | "accounting"
  | "inventory"
  | "stock"
  | "rental"
  | "hr"
  | "payroll"
  | "hosting"
  | "pricing"
  | "local"
  | "lock"
  | "encrypt"
  | "sme"
  | "fast"
  | "team"
  | "megaphone";

const iconMap: Record<DocLinkIconName, (props: IconProps) => ReactElement> = {
  erp: IconERP,
  pos: IconPOS,
  doctor: IconDoctor,
  web: IconWeb,
  software: IconSoftware,
  mobile: IconMobile,
  crm: IconCRM,
  estimate: IconEstimate,
  invoice: IconInvoice,
  accounting: IconAccounting,
  inventory: IconInventory,
  stock: IconStock,
  rental: IconRental,
  hr: IconHR,
  payroll: IconPayroll,
  hosting: IconHosting,
  pricing: IconPricing,
  local: IconLocal,
  lock: IconLock,
  encrypt: IconEncrypt,
  sme: IconSME,
  fast: IconFast,
  team: IconTeam,
  megaphone: IconMegaphone,
};

export function DocLinkIcon({
  name,
  size = 22,
  className,
  ...rest
}: IconProps & { name: DocLinkIconName }) {
  const Comp = iconMap[name];
  return <Comp size={size} className={className} {...rest} />;
}
