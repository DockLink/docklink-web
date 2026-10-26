// Single source of truth for company facts shown across the site.
// Update numbers here — every page reads from this file, so they stay consistent.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://doclink.lk";

export const company = {
  name: "DocLink Technologies",
  legalName: "DocLink Technologies (Pvt) Ltd",
  founded: 2019,
  email: "hello@doclink.lk",
  // TODO: replace with the real phone number before launch
  phone: "+94 11 234 5678",
  phoneHref: "tel:+94112345678",
  address: {
    street: "42 Bauddhaloka Mawatha",
    city: "Colombo 07",
    country: "Sri Lanka",
  },
  mapsUrl: "https://maps.google.com/?q=Bauddhaloka+Mawatha+Colombo+7",
  // [TBC] Links render only once a real URL is filled in (see TODO.md)
  social: [
    { name: "LinkedIn", href: "" },
    { name: "Facebook", href: "" },
    { name: "X", href: "" },
  ],
  legal: [
    { name: "Privacy policy", href: "" },
    { name: "Terms of service", href: "" },
  ],
  description:
    "ERP, POS, and custom software that replaces the spreadsheets — built in Sri Lanka for growing businesses.",
} as const;

export const companyStats = {
  projects: { value: "20+", label: "Projects delivered" },
  clients: { value: "15+", label: "Clients" },
  countries: { value: "5", label: "Countries" },
  years: { value: `${new Date().getFullYear() - company.founded}+`, label: "Years building software" },
  uptime: { value: "99.9%", label: "Uptime on hosted platforms" },
} as const;
