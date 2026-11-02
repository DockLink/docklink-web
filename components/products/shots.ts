import { CASE_STUDY_VISUAL_KEY_LABELS, SERVICE_VISUAL_KEY_LABELS, VISUAL_KEY_LABELS } from "@/lib/cms/visuals";

export type ShotSpec = { label: string; path: string; phone?: boolean };

const labels: Record<string, string> = { ...VISUAL_KEY_LABELS, ...SERVICE_VISUAL_KEY_LABELS };

// Visual keys that are a single phone screen
const phoneKeys = (key: string) => key.startsWith("doctor-") || key === "mobile-ui" || key === "mobile-offline";

/**
 * Screenshot slot for a CMS visual key (products and services). The page shows a
 * labelled placeholder naming this file until the real screenshot is supplied (see TODO.md).
 */
export function shotForVisual(key: string): ShotSpec {
  const label = labels[key];
  return {
    label: label ? `${label.replace(" — ", ": ")} screen` : "Product screen",
    path: `public/screens/${key || "product"}.png`,
    phone: phoneKeys(key),
  };
}

/** Main screenshot for a product or service hero, and its row on the overview page */
export function heroShotFor(slug: string, name: string): ShotSpec {
  return {
    label: `${name}, main screen`,
    path: `public/screens/${slug}-hero.png`,
    phone: slug === "doctor" || slug === "mobile",
  };
}

/** Screenshot of the system built for a case-study client, one per case study */
export function caseShotFor(slug: string, client: string): ShotSpec {
  const label = (CASE_STUDY_VISUAL_KEY_LABELS as Record<string, string>)[slug];
  return {
    label: label ? `${label.replace(" — ", ": ")} screen` : `${client}, main screen`,
    path: `public/screens/case-${slug}.png`,
  };
}
