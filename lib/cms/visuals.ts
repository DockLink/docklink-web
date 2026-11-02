export const VISUAL_KEYS = [
  "erp-crm-pipeline",
  "erp-crm-followups",
  "erp-invoice",
  "erp-accounting",
  "erp-inventory",
  "erp-payroll",
  "pos-sales",
  "pos-inventory",
  "pos-branches",
  "pos-eod",
  "doctor-records",
  "doctor-appointments",
  "doctor-prescriptions",
  "doctor-ward",
] as const;

export type VisualKey = (typeof VISUAL_KEYS)[number];

export const VISUAL_KEY_LABELS: Record<VisualKey, string> = {
  "erp-crm-pipeline": "ERP — CRM pipeline",
  "erp-crm-followups": "ERP — CRM follow-ups",
  "erp-invoice": "ERP — Invoice",
  "erp-accounting": "ERP — Trial balance",
  "erp-inventory": "ERP — Stock levels",
  "erp-payroll": "ERP — Payroll",
  "pos-sales": "POS — Barcode scan",
  "pos-inventory": "POS — Live stock",
  "pos-branches": "POS — Branch overview",
  "pos-eod": "POS — Z-report",
  "doctor-records": "Doctor — Patient record",
  "doctor-appointments": "Doctor — Appointments",
  "doctor-prescriptions": "Doctor — Prescription",
  "doctor-ward": "Doctor — Ward round",
};

export const SERVICE_VISUAL_KEYS = [
  "software-workflow",
  "software-rbac",
  "software-integrations",
  "software-support",
  "software-security",
  "web-seo",
  "web-cwv",
  "web-conversion",
  "web-responsive",
  "mobile-cross-platform",
  "mobile-ui",
  "mobile-offline",
  "mobile-app-stores",
] as const;

export type ServiceVisualKey = (typeof SERVICE_VISUAL_KEYS)[number];

export const SERVICE_VISUAL_KEY_LABELS: Record<ServiceVisualKey, string> = {
  "software-workflow": "Software — Workflow designer",
  "software-rbac": "Software — Permissions matrix",
  "software-integrations": "Software — Integrations",
  "software-support": "Software — Support changelog",
  "software-security": "Software — Security overview",
  "web-seo": "Web — Search console",
  "web-cwv": "Web — Core Web Vitals",
  "web-conversion": "Web — Conversion funnel",
  "web-responsive": "Web — Responsive devices",
  "mobile-cross-platform": "Mobile — iOS & Android",
  "mobile-ui": "Mobile — App UI",
  "mobile-offline": "Mobile — Offline field view",
  "mobile-app-stores": "Mobile — App stores",
};

export const SERVICE_ICON_OPTIONS = ["software", "web", "mobile"] as const;

export const CASE_STUDY_VISUAL_KEYS = ["emaar", "street82", "grid", "a-design"] as const;

export type CaseStudyVisualKey = (typeof CASE_STUDY_VISUAL_KEYS)[number];

export const CASE_STUDY_VISUAL_KEY_LABELS: Record<CaseStudyVisualKey, string> = {
  emaar: "Emaar — Payroll dashboard",
  street82: "Street82 — POS + inventory",
  grid: "GRID — CRM + projects",
  "a-design": "A-Design — Projects + invoices",
};

export const CASE_STUDY_GRADIENTS = [
  { value: "from-[#1e3a8a] to-[#1D4ED8]", label: "Navy" },
  { value: "from-[#1D4ED8] to-[#0284c7]", label: "Blue" },
] as const;

export const DEFAULT_CASE_STUDY_GRADIENT = CASE_STUDY_GRADIENTS[0].value;

export const MODULE_ICON_OPTIONS = [
  "crm",
  "estimate",
  "invoice",
  "accounting",
  "inventory",
  "stock",
  "rental",
  "hr",
  "payroll",
  "erp",
  "pos",
  "doctor",
] as const;
