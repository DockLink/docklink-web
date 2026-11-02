import { revalidatePath, revalidateTag } from "next/cache";

export const CMS_PRODUCTS_TAG = "cms-products";
export const CMS_SERVICES_TAG = "cms-services";
export const CMS_CASE_STUDIES_TAG = "cms-case-studies";

export function revalidateProductPages() {
  revalidateTag(CMS_PRODUCTS_TAG, { expire: 0 });
  revalidatePath("/products");
  revalidatePath("/products/erp");
  revalidatePath("/products/pos");
  revalidatePath("/products/doctor");
}

export function revalidateServicePages() {
  revalidateTag(CMS_SERVICES_TAG, { expire: 0 });
  revalidatePath("/services");
  revalidatePath("/services/software");
  revalidatePath("/services/web");
  revalidatePath("/services/mobile");
}

export function revalidateCaseStudyPages(slug?: string) {
  revalidateTag(CMS_CASE_STUDIES_TAG, { expire: 0 });
  revalidatePath("/case-studies");
  if (slug) revalidatePath(`/case-studies/${slug}`);
}
