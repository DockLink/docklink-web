"use client";

import { useState } from "react";
import PreviewButton from "@/components/admin/PreviewButton";
import Button from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { cn } from "@/components/ui/cn";
import { cmsPreviewPath } from "@/lib/cms/preview";
import type { CaseStudyDocument, CaseStudySection, CaseStudyStat } from "@/lib/cms/types";
import {
  CASE_STUDY_GRADIENTS,
  CASE_STUDY_VISUAL_KEY_LABELS,
  CASE_STUDY_VISUAL_KEYS,
} from "@/lib/cms/visuals";

type Tab = "page" | "stats" | "story";

function newId() {
  return crypto.randomUUID();
}

export default function CaseStudyEditor({ initial }: { initial: CaseStudyDocument }) {
  const [form, setForm] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [tab, setTab] = useState<Tab>("page");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  const tabs: { id: Tab; label: string }[] = [
    { id: "page", label: "Page" },
    { id: "stats", label: "Stats" },
    { id: "story", label: "Story" },
  ];

  async function persist() {
    setStatus("saving");
    setMessage("");
    try {
      const response = await fetch(`/api/cms/case-studies/${form.slug}`, {
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
      setMessage("Case study saved.");
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
          <h1 className="font-display text-3xl font-bold text-ink">{form.client}</h1>
          <p className="mt-1 text-sm text-muted">/case-studies/{form.slug}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <PreviewButton
            href={cmsPreviewPath("case-studies", form.slug)}
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
      {tab === "stats" ? <StatsFields form={form} setForm={setForm} /> : null}
      {tab === "story" ? <StoryFields form={form} setForm={setForm} /> : null}
    </div>
  );
}

function PageFields({
  form,
  setForm,
}: {
  form: CaseStudyDocument;
  setForm: React.Dispatch<React.SetStateAction<CaseStudyDocument>>;
}) {
  const gradientOptions = CASE_STUDY_GRADIENTS.some((item) => item.value === form.gradient)
    ? CASE_STUDY_GRADIENTS
    : [{ value: form.gradient, label: "Custom" }, ...CASE_STUDY_GRADIENTS];

  return (
    <div className="space-y-6">
      <section className="space-y-4 rounded-[16px] border border-line bg-white p-6">
        <h2 className="font-display text-lg font-bold text-ink">Identity</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="client" label="Client" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
          <Input id="industry" label="Industry" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="location" label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <Input id="date" label="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            id="gradient"
            label="Card gradient"
            value={form.gradient}
            onChange={(e) => setForm({ ...form, gradient: e.target.value, avatarColor: e.target.value })}
          >
            {gradientOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
          <Select
            id="visualKey"
            label="Platform mockup"
            value={form.visualKey}
            onChange={(e) => setForm({ ...form, visualKey: e.target.value })}
          >
            <option value="">Placeholder</option>
            {CASE_STUDY_VISUAL_KEYS.map((key) => (
              <option key={key} value={key}>
                {CASE_STUDY_VISUAL_KEY_LABELS[key]}
              </option>
            ))}
          </Select>
        </div>
        <Input
          id="sortOrder"
          label="Sort order"
          type="number"
          value={String(form.sortOrder)}
          onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) || 0 })}
        />
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
        <Textarea id="headline" label="Headline" rows={3} value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} />
        <Textarea id="subhead" label="Subhead" rows={3} value={form.subhead} onChange={(e) => setForm({ ...form, subhead: e.target.value })} />
      </section>

      <section className="space-y-4 rounded-[16px] border border-line bg-white p-6">
        <h2 className="font-display text-lg font-bold text-ink">Quote</h2>
        <Textarea id="quoteText" label="Quote" rows={4} value={form.quoteText} onChange={(e) => setForm({ ...form, quoteText: e.target.value })} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="quoteName" label="Name" value={form.quoteName} onChange={(e) => setForm({ ...form, quoteName: e.target.value })} />
          <Input id="quoteTitle" label="Title" value={form.quoteTitle} onChange={(e) => setForm({ ...form, quoteTitle: e.target.value })} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="avatarInitials"
            label="Avatar initials"
            value={form.avatarInitials}
            onChange={(e) => setForm({ ...form, avatarInitials: e.target.value })}
          />
          <Input
            id="photoCaption"
            label="Photo caption"
            value={form.photoCaption}
            onChange={(e) => setForm({ ...form, photoCaption: e.target.value })}
          />
        </div>
      </section>
    </div>
  );
}

function StatsFields({
  form,
  setForm,
}: {
  form: CaseStudyDocument;
  setForm: React.Dispatch<React.SetStateAction<CaseStudyDocument>>;
}) {
  function update(stats: CaseStudyStat[]) {
    setForm({ ...form, stats: stats.map((stat, index) => ({ ...stat, sortOrder: index + 1 })) });
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">The listing card shows the first two stats. Drag order by adding and removing, or reorder with the list.</p>
      {form.stats.map((stat, index) => (
        <section key={stat.id} className="space-y-4 rounded-[16px] border border-line bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">Stat {index + 1}</h2>
            <button
              type="button"
              className="text-sm text-danger hover:underline"
              onClick={() => update(form.stats.filter((item) => item.id !== stat.id))}
            >
              Remove
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id={`${stat.id}-number`}
              label="Number"
              value={stat.number}
              onChange={(e) => update(form.stats.map((item) => (item.id === stat.id ? { ...item, number: e.target.value } : item)))}
            />
            <Input
              id={`${stat.id}-label`}
              label="Label"
              value={stat.label}
              onChange={(e) => update(form.stats.map((item) => (item.id === stat.id ? { ...item, label: e.target.value } : item)))}
            />
          </div>
        </section>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          update([
            ...form.stats,
            { id: newId(), number: "0", label: "New stat", sortOrder: form.stats.length + 1 },
          ])
        }
      >
        Add stat
      </Button>
    </div>
  );
}

function StoryFields({
  form,
  setForm,
}: {
  form: CaseStudyDocument;
  setForm: React.Dispatch<React.SetStateAction<CaseStudyDocument>>;
}) {
  function update(sections: CaseStudySection[]) {
    setForm({ ...form, sections: sections.map((section, index) => ({ ...section, sortOrder: index + 1 })) });
  }

  return (
    <div className="space-y-6">
      {form.sections.map((section, index) => (
        <section key={section.id} className="space-y-4 rounded-[16px] border border-line bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">Section {index + 1}</h2>
            <button
              type="button"
              className="text-sm text-danger hover:underline"
              onClick={() => update(form.sections.filter((item) => item.id !== section.id))}
            >
              Remove
            </button>
          </div>
          <Input
            id={`${section.id}-heading`}
            label="Heading"
            value={section.heading}
            onChange={(e) =>
              update(form.sections.map((item) => (item.id === section.id ? { ...item, heading: e.target.value } : item)))
            }
          />
          <Textarea
            id={`${section.id}-body`}
            label="Body"
            rows={5}
            value={section.body}
            onChange={(e) =>
              update(form.sections.map((item) => (item.id === section.id ? { ...item, body: e.target.value } : item)))
            }
          />
        </section>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          update([
            ...form.sections,
            { id: newId(), heading: "New section", body: "Tell this part of the story.", sortOrder: form.sections.length + 1 },
          ])
        }
      >
        Add section
      </Button>
    </div>
  );
}
