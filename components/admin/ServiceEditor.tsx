"use client";

import { useState } from "react";
import PreviewButton from "@/components/admin/PreviewButton";
import Button from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { cn } from "@/components/ui/cn";
import { cmsPreviewPath } from "@/lib/cms/preview";
import type { ServiceDocument, ServiceFeature, ServiceProcessStep } from "@/lib/cms/types";
import { SERVICE_ICON_OPTIONS, SERVICE_VISUAL_KEY_LABELS, SERVICE_VISUAL_KEYS } from "@/lib/cms/visuals";

type Tab = "page" | "features" | "process";

function newId() {
  return crypto.randomUUID();
}

export default function ServiceEditor({ initial }: { initial: ServiceDocument }) {
  const [form, setForm] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [tab, setTab] = useState<Tab>("page");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  const tabs: { id: Tab; label: string }[] = [
    { id: "page", label: "Page" },
    { id: "features", label: "Features" },
    { id: "process", label: "Process" },
  ];

  async function persist() {
    setStatus("saving");
    setMessage("");
    try {
      const response = await fetch(`/api/cms/services/${form.slug}`, {
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
      setMessage("Service saved.");
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
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">{form.name}</h1>
          <p className="mt-1 text-sm text-muted">/services/{form.slug}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <PreviewButton
            href={cmsPreviewPath("services", form.slug)}
            disabled={status === "saving"}
            ensureSaved={ensureSaved}
          />
          <Button type="button" onClick={() => void persist()} disabled={status === "saving"}>
            {status === "saving" ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>
      {message ? (
        <p className={status === "error" ? "text-sm text-danger" : "text-sm text-success"}>{message}</p>
      ) : null}

      <div className="flex gap-1 border-b border-line">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium",
              tab === item.id ? "border-b-2 border-brand text-brand-ink" : "text-muted hover:text-ink",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "page" ? <PageFields form={form} setForm={setForm} /> : null}
      {tab === "features" ? <FeaturesFields form={form} setForm={setForm} /> : null}
      {tab === "process" ? <ProcessFields form={form} setForm={setForm} /> : null}
    </div>
  );
}

function PageFields({
  form,
  setForm,
}: {
  form: ServiceDocument;
  setForm: React.Dispatch<React.SetStateAction<ServiceDocument>>;
}) {
  return (
    <div className="space-y-6">
      <section className="space-y-4 rounded-[16px] border border-line bg-white p-6">
        <h2 className="font-display text-lg font-bold text-ink">Identity</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="name" label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Select
            id="icon"
            label="Icon"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
          >
            {SERVICE_ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </Select>
        </div>
        <Input
          id="tagline"
          label="Tagline"
          optional
          value={form.tagline}
          onChange={(e) => setForm({ ...form, tagline: e.target.value })}
        />
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={form.flagship}
            onChange={(e) => setForm({ ...form, flagship: e.target.checked })}
          />
          Flagship service
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Published on the listing page
        </label>
      </section>

      <section className="space-y-4 rounded-[16px] border border-line bg-white p-6">
        <h2 className="font-display text-lg font-bold text-ink">Listing card</h2>
        <Textarea
          id="listingDesc"
          label="Description"
          rows={3}
          value={form.listingDesc}
          onChange={(e) => setForm({ ...form, listingDesc: e.target.value })}
        />
        <Input
          id="listingCta"
          label="Card CTA"
          value={form.listingCta}
          onChange={(e) => setForm({ ...form, listingCta: e.target.value })}
        />
      </section>

      <section className="space-y-4 rounded-[16px] border border-line bg-white p-6">
        <h2 className="font-display text-lg font-bold text-ink">SEO</h2>
        <Input id="seoTitle" label="SEO title" value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
        <Textarea
          id="seoDescription"
          label="SEO description"
          rows={3}
          value={form.seoDescription}
          onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
        />
      </section>

      <section className="space-y-4 rounded-[16px] border border-line bg-white p-6">
        <h2 className="font-display text-lg font-bold text-ink">Hero</h2>
        <Input id="eyebrow" label="Eyebrow" value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} />
        <Textarea id="headline" label="Headline" rows={3} value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} />
        <Textarea id="subhead" label="Subhead" rows={2} value={form.subhead} onChange={(e) => setForm({ ...form, subhead: e.target.value })} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="primaryCtaLabel"
            label="Primary CTA label"
            value={form.primaryCtaLabel}
            onChange={(e) => setForm({ ...form, primaryCtaLabel: e.target.value })}
          />
          <Input
            id="primaryCtaHref"
            label="Primary CTA link"
            value={form.primaryCtaHref}
            onChange={(e) => setForm({ ...form, primaryCtaHref: e.target.value })}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-[16px] border border-line bg-white p-6">
        <h2 className="font-display text-lg font-bold text-ink">Process header</h2>
        <Input
          id="processEyebrow"
          label="Eyebrow"
          value={form.processEyebrow}
          onChange={(e) => setForm({ ...form, processEyebrow: e.target.value })}
        />
        <Input
          id="processHeadline"
          label="Headline"
          value={form.processHeadline}
          onChange={(e) => setForm({ ...form, processHeadline: e.target.value })}
        />
        <Textarea
          id="processSub"
          label="Subhead"
          rows={2}
          value={form.processSub}
          onChange={(e) => setForm({ ...form, processSub: e.target.value })}
        />
      </section>

      <section className="space-y-4 rounded-[16px] border border-line bg-white p-6">
        <h2 className="font-display text-lg font-bold text-ink">Bottom CTA</h2>
        <Input
          id="ctaHeadline"
          label="Headline"
          value={form.cta.headline}
          onChange={(e) => setForm({ ...form, cta: { ...form.cta, headline: e.target.value } })}
        />
        <Textarea
          id="ctaSub"
          label="Subhead"
          rows={2}
          value={form.cta.sub}
          onChange={(e) => setForm({ ...form, cta: { ...form.cta, sub: e.target.value } })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="ctaButton"
            label="Button label"
            value={form.cta.buttonLabel}
            onChange={(e) => setForm({ ...form, cta: { ...form.cta, buttonLabel: e.target.value } })}
          />
          <Input
            id="ctaHref"
            label="Button link"
            value={form.cta.href}
            onChange={(e) => setForm({ ...form, cta: { ...form.cta, href: e.target.value } })}
          />
        </div>
      </section>
    </div>
  );
}

function FeaturesFields({
  form,
  setForm,
}: {
  form: ServiceDocument;
  setForm: React.Dispatch<React.SetStateAction<ServiceDocument>>;
}) {
  function update(features: ServiceFeature[]) {
    setForm({ ...form, features: features.map((feature, index) => ({ ...feature, sortOrder: index + 1 })) });
  }

  return (
    <div className="space-y-6">
      {form.features.map((feature, index) => (
        <section key={feature.id} className="space-y-4 rounded-[16px] border border-line bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">Feature {index + 1}</h2>
            <button
              type="button"
              className="text-sm text-danger hover:underline"
              onClick={() => update(form.features.filter((item) => item.id !== feature.id))}
            >
              Remove
            </button>
          </div>
          <Input
            id={`${feature.id}-label`}
            label="Label"
            value={feature.label}
            onChange={(e) => update(form.features.map((item) => (item.id === feature.id ? { ...item, label: e.target.value } : item)))}
          />
          <Input
            id={`${feature.id}-title`}
            label="Title"
            value={feature.title}
            onChange={(e) => update(form.features.map((item) => (item.id === feature.id ? { ...item, title: e.target.value } : item)))}
          />
          <Textarea
            id={`${feature.id}-body`}
            label="Body"
            rows={4}
            value={feature.body}
            onChange={(e) => update(form.features.map((item) => (item.id === feature.id ? { ...item, body: e.target.value } : item)))}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              id={`${feature.id}-side`}
              label="Side"
              value={feature.side}
              onChange={(e) =>
                update(form.features.map((item) => (item.id === feature.id ? { ...item, side: e.target.value as "left" | "right" } : item)))
              }
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </Select>
            <Select
              id={`${feature.id}-visual`}
              label="Visual"
              value={feature.visualKey}
              onChange={(e) =>
                update(form.features.map((item) => (item.id === feature.id ? { ...item, visualKey: e.target.value } : item)))
              }
            >
              <option value="">None</option>
              {SERVICE_VISUAL_KEYS.map((key) => (
                <option key={key} value={key}>
                  {SERVICE_VISUAL_KEY_LABELS[key]}
                </option>
              ))}
            </Select>
          </div>
        </section>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          update([
            ...form.features,
            {
              id: newId(),
              label: "New feature",
              title: "Feature title",
              body: "Describe this feature.",
              side: form.features.length % 2 === 0 ? "left" : "right",
              visualKey: "",
              sortOrder: form.features.length + 1,
            },
          ])
        }
      >
        Add feature
      </Button>
    </div>
  );
}

function ProcessFields({
  form,
  setForm,
}: {
  form: ServiceDocument;
  setForm: React.Dispatch<React.SetStateAction<ServiceDocument>>;
}) {
  function update(steps: ServiceProcessStep[]) {
    setForm({ ...form, processSteps: steps.map((step, index) => ({ ...step, sortOrder: index + 1 })) });
  }

  return (
    <div className="space-y-6">
      {form.processSteps.map((step, index) => (
        <section key={step.id} className="space-y-4 rounded-[16px] border border-line bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">Step {String(index + 1).padStart(2, "0")}</h2>
            <button
              type="button"
              className="text-sm text-danger hover:underline"
              onClick={() => update(form.processSteps.filter((item) => item.id !== step.id))}
            >
              Remove
            </button>
          </div>
          <Input
            id={`${step.id}-title`}
            label="Title"
            value={step.title}
            onChange={(e) => update(form.processSteps.map((item) => (item.id === step.id ? { ...item, title: e.target.value } : item)))}
          />
          <Textarea
            id={`${step.id}-sub`}
            label="Subhead"
            rows={2}
            value={step.sub}
            onChange={(e) => update(form.processSteps.map((item) => (item.id === step.id ? { ...item, sub: e.target.value } : item)))}
          />
        </section>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          update([
            ...form.processSteps,
            {
              id: newId(),
              title: "New step",
              sub: "Describe this step.",
              sortOrder: form.processSteps.length + 1,
            },
          ])
        }
      >
        Add step
      </Button>
    </div>
  );
}
