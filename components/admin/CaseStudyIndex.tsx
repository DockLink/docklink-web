"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { cmsPreviewPath } from "@/lib/cms/preview";
import type { CaseStudySummary } from "@/lib/cms/types";

export default function CaseStudyIndex({ initial }: { initial: CaseStudySummary[] }) {
  const router = useRouter();
  const [studies, setStudies] = useState(initial);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function onDelete(slug: string, client: string) {
    if (!window.confirm(`Delete the ${client} case study? This cannot be undone.`)) return;
    setDeleting(slug);
    setError("");
    try {
      const response = await fetch(`/api/cms/case-studies/${slug}`, { method: "DELETE" });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(payload.error || "Could not delete.");
        return;
      }
      setStudies((current) => current.filter((study) => study.slug !== slug));
      router.refresh();
    } catch {
      setError("Could not delete.");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">Case studies</h1>
          <p className="mt-1 text-sm text-muted">Add, edit, unpublish, or delete client stories.</p>
        </div>
        <Button href="/admin/case-studies/new">Add case study</Button>
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}

      <div className="overflow-hidden rounded-[16px] border border-line bg-white">
        {studies.length === 0 ? (
          <p className="p-6 text-sm text-muted">No case studies yet.</p>
        ) : (
          <ul className="divide-y divide-line">
            {studies.map((study) => (
              <li key={study.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/case-studies/${study.slug}`} className="font-display text-lg font-bold text-ink hover:text-brand">
                      {study.client}
                    </Link>
                    <span className={study.published ? "text-xs font-semibold text-success" : "text-xs font-semibold text-subtle"}>
                      {study.published ? "Published" : "Hidden"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    /case-studies/{study.slug} · order {study.sortOrder}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={cmsPreviewPath("case-studies", study.slug)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-brand hover:underline"
                  >
                    Preview
                  </Link>
                  <Link href={`/admin/case-studies/${study.slug}`} className="text-sm font-medium text-brand hover:underline">
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="text-sm text-danger hover:underline disabled:opacity-50"
                    disabled={deleting === study.slug}
                    onClick={() => onDelete(study.slug, study.client)}
                  >
                    {deleting === study.slug ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
