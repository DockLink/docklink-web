"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CaseStudyCreateForm() {
  const router = useRouter();
  const [client, setClient] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");
    try {
      const response = await fetch("/api/cms/case-studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client, slug }),
      });
      const payload = await response.json();
      if (!response.ok) {
        setStatus("error");
        setMessage(payload.error || "Could not create.");
        return;
      }
      router.push(`/admin/case-studies/${payload.slug}`);
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Could not create.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink">New case study</h1>
        <p className="mt-1 text-sm text-muted">Create a draft, then fill in the story, stats, and quote.</p>
      </div>
      {message ? <p className="text-sm text-danger">{message}</p> : null}
      <section className="space-y-4 rounded-[16px] border border-line bg-white p-6">
        <Input
          id="client"
          label="Client"
          value={client}
          onChange={(e) => {
            const next = e.target.value;
            setClient(next);
            if (!slugTouched) setSlug(slugify(next));
          }}
        />
        <Input
          id="slug"
          label="Slug"
          hint="Used in /case-studies/your-slug"
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
        />
      </section>
      <Button type="submit" disabled={status === "saving" || !client.trim() || !slug.trim()}>
        {status === "saving" ? "Creating…" : "Create case study"}
      </Button>
    </form>
  );
}
