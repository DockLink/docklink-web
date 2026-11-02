export type PreviewCollection = "products" | "services" | "case-studies";

export function cmsPreviewPath(collection: PreviewCollection, slug?: string) {
  return slug ? `/admin/preview/${collection}/${slug}` : `/admin/preview/${collection}`;
}

export function cmsEditorPath(collection: PreviewCollection, slug?: string) {
  if (!slug) {
    return collection === "case-studies" ? "/admin/case-studies/listing" : `/admin/${collection}/listing`;
  }
  return `/admin/${collection}/${slug}`;
}

export function cmsLivePath(collection: PreviewCollection, slug?: string) {
  return slug ? `/${collection}/${slug}` : `/${collection}`;
}
