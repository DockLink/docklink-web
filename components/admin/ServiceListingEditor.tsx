"use client";

import { useState } from "react";
import PreviewButton from "@/components/admin/PreviewButton";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Field";
import { cmsPreviewPath } from "@/lib/cms/preview";
import type { ServiceListing, ServiceListingStat } from "@/lib/cms/types";

function newId() {
  return crypto.randomUUID();
}

export default function ServiceListingEditor({ initial }: { initial: ServiceListing }) {
  const [form, setForm] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  function patch<K extends keyof ServiceListing>(key: K, value: ServiceListing[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setStatus("idle");
  }

  function updateStats(stats: ServiceListingStat[]) {
    patch(
      "stats",
      stats.map((stat, index) => ({ ...stat, sortOrder: index + 1 })),
    );
  }

  async function persist() {
    setStatus("saving");
    setMessage("");
    try {
      const response = await fetch("/api/cms/services/listing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json();
      if (!response.ok) {
        setStatus("error");
        setMessage(payload.error || "Could not save.");
        return false;
      }
      setForm(payload);
      setSaved(payload);
      setStatus("saved");
      setMessage("Listing page saved.");
      return true;
    } catch {
      setStatus("error");
      setMessage("Could not save.");
      return false;
    }
  }

  async function ensureSaved() {
    if (JSON.stringify(form) === JSON.stringify(saved)) return true;
    return persist();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">Services listing</h1>
          <p className="mt-1 text-sm text-muted">Hero, stats, SEO, and the bottom CTA on /services.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <PreviewButton href={cmsPreviewPath("services")} disabled={status === "saving"} ensureSaved={ensureSaved} />
          <Button type="button" onClick={() => void persist()} disabled={status === "saving"}>
            {status === "saving" ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>
      {message ? (
        <p className={status === "error" ? "text-sm text-danger" : "text-sm text-success"}>{message}</p>
      ) : null}

      <section className="space-y-4 rounded-[16px] border border-line bg-white p-6">
        <h2 className="font-display text-lg font-bold text-ink">SEO</h2>
        <Input id="seoTitle" label="SEO title" value={form.seoTitle} onChange={(e) => patch("seoTitle", e.target.value)} />
        <Textarea
          id="seoDescription"
          label="SEO description"
          rows={3}
          value={form.seoDescription}
          onChange={(e) => patch("seoDescription", e.target.value)}
        />
      </section>

      <section className="space-y-4 rounded-[16px] border border-line bg-white p-6">
        <h2 className="font-display text-lg font-bold text-ink">Hero</h2>
        <Input id="eyebrow" label="Eyebrow" value={form.eyebrow} onChange={(e) => patch("eyebrow", e.target.value)} />
        <Textarea id="headline" label="Headline" rows={3} value={form.headline} onChange={(e) => patch("headline", e.target.value)} />
        <Textarea id="subhead" label="Subhead" rows={3} value={form.subhead} onChange={(e) => patch("subhead", e.target.value)} />
      </section>

      <section className="space-y-4 rounded-[16px] border border-line bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-bold text-ink">Stats strip</h2>
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              updateStats([
                ...form.stats,
                { id: newId(), value: "0", label: "New stat", sortOrder: form.stats.length + 1 },
              ])
            }
          >
            Add stat
          </Button>
        </div>
        {form.stats.map((stat) => (
          <div key={stat.id} className="grid gap-4 sm:grid-cols-[1fr_2fr_auto]">
            <Input
              id={`${stat.id}-value`}
              label="Value"
              value={stat.value}
              onChange={(e) =>
                updateStats(form.stats.map((item) => (item.id === stat.id ? { ...item, value: e.target.value } : item)))
              }
            />
            <Input
              id={`${stat.id}-label`}
              label="Label"
              value={stat.label}
              onChange={(e) =>
                updateStats(form.stats.map((item) => (item.id === stat.id ? { ...item, label: e.target.value } : item)))
              }
            />
            <button
              type="button"
              className="self-end pb-3 text-sm text-danger hover:underline"
              onClick={() => updateStats(form.stats.filter((item) => item.id !== stat.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      <section className="space-y-4 rounded-[16px] border border-line bg-white p-6">
        <h2 className="font-display text-lg font-bold text-ink">Bottom CTA</h2>
        <Input
          id="ctaHeadline"
          label="Headline"
          value={form.cta.headline}
          onChange={(e) => patch("cta", { ...form.cta, headline: e.target.value })}
        />
        <Textarea
          id="ctaSub"
          label="Subhead"
          rows={2}
          value={form.cta.sub}
          onChange={(e) => patch("cta", { ...form.cta, sub: e.target.value })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="ctaButton"
            label="Button label"
            value={form.cta.buttonLabel}
            onChange={(e) => patch("cta", { ...form.cta, buttonLabel: e.target.value })}
          />
          <Input
            id="ctaHref"
            label="Button link"
            value={form.cta.href}
            onChange={(e) => patch("cta", { ...form.cta, href: e.target.value })}
          />
        </div>
      </section>
    </div>
  );
}
