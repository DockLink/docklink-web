import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/company";
import { getPublishedCaseStudySummaries } from "@/lib/cms/caseStudies";

const routes = [
  { path: "", priority: 1 },
  { path: "/products", priority: 0.9 },
  { path: "/products/erp", priority: 0.9 },
  { path: "/products/pos", priority: 0.9 },
  { path: "/products/doctor", priority: 0.8 },
  { path: "/services", priority: 0.9 },
  { path: "/services/software", priority: 0.9 },
  { path: "/services/web", priority: 0.8 },
  { path: "/services/mobile", priority: 0.8 },
  { path: "/case-studies", priority: 0.8 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const studies = await getPublishedCaseStudySummaries();
  return [
    ...routes.map((r) => ({ url: `${SITE_URL}${r.path}`, lastModified, priority: r.priority })),
    ...studies.map((study) => ({
      url: `${SITE_URL}/case-studies/${study.slug}`,
      lastModified,
      priority: 0.7,
    })),
  ];
}
