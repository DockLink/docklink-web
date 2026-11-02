"use client";

import { useMemo, useState } from "react";
import PreviewButton from "@/components/admin/PreviewButton";
import Button from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { cn } from "@/components/ui/cn";
import { cmsPreviewPath } from "@/lib/cms/preview";
import type {
  CaseStudySummary,
  ProductDocument,
  ProductFeature,
  ProductModule,
  ProductModuleGroup,
} from "@/lib/cms/types";
import { MODULE_ICON_OPTIONS, VISUAL_KEY_LABELS, VISUAL_KEYS } from "@/lib/cms/visuals";

type Tab = "page" | "modules" | "features";

function newId() {
  return crypto.randomUUID();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ProductEditor({
  initial,
  caseStudies,
}: {
  initial: ProductDocument;
  caseStudies: CaseStudySummary[];
}) {
  const [form, setForm] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [tab, setTab] = useState<Tab>("page");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  const tabs = useMemo(() => {
    const items: { id: Tab; label: string }[] = [{ id: "page", label: "Page" }];
    if (form.slug === "erp") items.push({ id: "modules", label: "Modules" });
    if (form.slug === "pos" || form.slug === "doctor") items.push({ id: "features", label: "Features" });
    return items;
  }, [form.slug]);

  async function persist() {
    setStatus("saving");
    setMessage("");
    try {
      const response = await fetch(`/api/cms/products/${form.slug}`, {
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
      setMessage("Product saved.");
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
          <p className="mt-1 text-sm text-muted">/products/{form.slug}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <PreviewButton
            href={cmsPreviewPath("products", form.slug)}
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

      {tab === "page" ? <PageFields form={form} setForm={setForm} caseStudies={caseStudies} /> : null}
      {tab === "modules" ? <ModulesFields form={form} setForm={setForm} /> : null}
      {tab === "features" ? <FeaturesFields form={form} setForm={setForm} /> : null}
    </div>
  );
}

function PageFields({
  form,
  setForm,
  caseStudies,
}: {
  form: ProductDocument;
  setForm: React.Dispatch<React.SetStateAction<ProductDocument>>;
  caseStudies: CaseStudySummary[];
}) {
  return (
    <div className="space-y-6">
      <section className="space-y-4 rounded-[16px] border border-line bg-white p-6">
        <h2 className="font-display text-lg font-bold text-ink">Identity</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="name" label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input id="icon" label="Icon" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
        </div>
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
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="listingCta"
            label="Card CTA"
            value={form.listingCta}
            onChange={(e) => setForm({ ...form, listingCta: e.target.value })}
          />
          <Input
            id="listingBg"
            label="Background class"
            value={form.listingBg}
            onChange={(e) => setForm({ ...form, listingBg: e.target.value })}
          />
        </div>
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
        <h2 className="font-display text-lg font-bold text-ink">Page settings</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            id="trustVariant"
            label="Trust strip"
            value={form.trustVariant}
            onChange={(e) => setForm({ ...form, trustVariant: e.target.value as ProductDocument["trustVariant"] })}
          >
            <option value="default">Default</option>
            <option value="security">Security (Doctor)</option>
          </Select>
          <Select
            id="caseStudy"
            label="Related case study"
            value={form.relatedCaseStudyId ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                relatedCaseStudyId: e.target.value === "" ? null : e.target.value,
              })
            }
          >
            <option value="">None</option>
            {form.relatedCaseStudyId && !caseStudies.some((study) => study.slug === form.relatedCaseStudyId) ? (
              <option value={form.relatedCaseStudyId}>{form.relatedCaseStudyId}</option>
            ) : null}
            {caseStudies.map((study) => (
              <option key={study.slug} value={study.slug}>
                {study.client}
              </option>
            ))}
          </Select>
        </div>
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

function ModulesFields({
  form,
  setForm,
}: {
  form: ProductDocument;
  setForm: React.Dispatch<React.SetStateAction<ProductDocument>>;
}) {
  function updateGroups(groups: ProductModuleGroup[]) {
    setForm({ ...form, moduleGroups: groups.map((group, index) => ({ ...group, sortOrder: index + 1 })) });
  }

  function addGroup() {
    updateGroups([
      ...form.moduleGroups,
      {
        id: newId(),
        label: "New group",
        title: "Group title",
        intro: "Describe this group.",
        columns: 2,
        sortOrder: form.moduleGroups.length + 1,
        modules: [],
      },
    ]);
  }

  return (
    <div className="space-y-6">
      {form.moduleGroups.map((group, groupIndex) => (
        <section key={group.id} className="space-y-4 rounded-[16px] border border-line bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold text-ink">Group {groupIndex + 1}</h2>
            <button
              type="button"
              className="text-sm text-danger hover:underline"
              onClick={() => updateGroups(form.moduleGroups.filter((item) => item.id !== group.id))}
            >
              Remove group
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id={`${group.id}-label`}
              label="Label"
              value={group.label}
              onChange={(e) =>
                updateGroups(form.moduleGroups.map((item) => (item.id === group.id ? { ...item, label: e.target.value } : item)))
              }
            />
            <Select
              id={`${group.id}-columns`}
              label="Columns"
              value={String(group.columns)}
              onChange={(e) =>
                updateGroups(
                  form.moduleGroups.map((item) => (item.id === group.id ? { ...item, columns: Number(e.target.value) } : item)),
                )
              }
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Select>
          </div>
          <Input
            id={`${group.id}-title`}
            label="Title"
            value={group.title}
            onChange={(e) =>
              updateGroups(form.moduleGroups.map((item) => (item.id === group.id ? { ...item, title: e.target.value } : item)))
            }
          />
          <Textarea
            id={`${group.id}-intro`}
            label="Intro"
            rows={2}
            value={group.intro}
            onChange={(e) =>
              updateGroups(form.moduleGroups.map((item) => (item.id === group.id ? { ...item, intro: e.target.value } : item)))
            }
          />

          <div className="space-y-4">
            {group.modules.map((module) => (
              <ModuleFields
                key={module.id}
                module={module}
                onChange={(next) =>
                  updateGroups(
                    form.moduleGroups.map((item) =>
                      item.id === group.id
                        ? { ...item, modules: item.modules.map((row) => (row.id === module.id ? next : row)) }
                        : item,
                    ),
                  )
                }
                onRemove={() =>
                  updateGroups(
                    form.moduleGroups.map((item) =>
                      item.id === group.id ? { ...item, modules: item.modules.filter((row) => row.id !== module.id) } : item,
                    ),
                  )
                }
              />
            ))}
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              updateGroups(
                form.moduleGroups.map((item) =>
                  item.id === group.id
                    ? {
                        ...item,
                        modules: [
                          ...item.modules,
                          {
                            id: newId(),
                            slug: "new-module",
                            icon: "crm",
                            name: "New module",
                            benefit: "Short benefit",
                            sortOrder: item.modules.length + 1,
                            detail: null,
                          },
                        ],
                      }
                    : item,
                ),
              )
            }
          >
            Add module
          </Button>
        </section>
      ))}
      <Button type="button" variant="secondary" onClick={addGroup}>
        Add group
      </Button>
    </div>
  );
}

function ModuleFields({
  module,
  onChange,
  onRemove,
}: {
  module: ProductModule;
  onChange: (module: ProductModule) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-3 rounded-[12px] border border-line bg-surface p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">{module.name || "Module"}</p>
        <button type="button" className="text-sm text-danger hover:underline" onClick={onRemove}>
          Remove
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input id={`${module.id}-name`} label="Name" value={module.name} onChange={(e) => onChange({ ...module, name: e.target.value, slug: slugify(e.target.value) || module.slug })} />
        <Select
          id={`${module.id}-icon`}
          label="Icon"
          value={module.icon}
          onChange={(e) => onChange({ ...module, icon: e.target.value })}
        >
          {MODULE_ICON_OPTIONS.map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
        </Select>
      </div>
      <Input
        id={`${module.id}-benefit`}
        label="Benefit"
        value={module.benefit}
        onChange={(e) => onChange({ ...module, benefit: e.target.value })}
      />
      {module.detail ? (
        <div className="space-y-3 rounded-[10px] border border-line bg-white p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-ink">Detail accordion</p>
            <button type="button" className="text-sm text-danger hover:underline" onClick={() => onChange({ ...module, detail: null })}>
              Remove detail
            </button>
          </div>
          <Input
            id={`${module.id}-detail-title`}
            label="Detail title"
            value={module.detail.title}
            onChange={(e) => onChange({ ...module, detail: { ...module.detail!, title: e.target.value } })}
          />
          <Textarea
            id={`${module.id}-detail-sub`}
            label="Detail subhead"
            rows={2}
            value={module.detail.sub}
            onChange={(e) => onChange({ ...module, detail: { ...module.detail!, sub: e.target.value } })}
          />
          {module.detail.blocks.map((block, index) => (
            <div key={block.id} className="space-y-2 border-t border-line pt-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Block {index + 1}</p>
                <button
                  type="button"
                  className="text-sm text-danger hover:underline"
                  onClick={() =>
                    onChange({
                      ...module,
                      detail: { ...module.detail!, blocks: module.detail!.blocks.filter((item) => item.id !== block.id) },
                    })
                  }
                >
                  Remove block
                </button>
              </div>
              <Textarea
                id={`${block.id}-caption`}
                label="Caption"
                rows={3}
                value={block.caption}
                onChange={(e) =>
                  onChange({
                    ...module,
                    detail: {
                      ...module.detail!,
                      blocks: module.detail!.blocks.map((item) => (item.id === block.id ? { ...item, caption: e.target.value } : item)),
                    },
                  })
                }
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <Select
                  id={`${block.id}-side`}
                  label="Side"
                  value={block.side}
                  onChange={(e) =>
                    onChange({
                      ...module,
                      detail: {
                        ...module.detail!,
                        blocks: module.detail!.blocks.map((item) =>
                          item.id === block.id ? { ...item, side: e.target.value as "left" | "right" } : item,
                        ),
                      },
                    })
                  }
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </Select>
                <Select
                  id={`${block.id}-visual`}
                  label="Visual"
                  value={block.visualKey}
                  onChange={(e) =>
                    onChange({
                      ...module,
                      detail: {
                        ...module.detail!,
                        blocks: module.detail!.blocks.map((item) =>
                          item.id === block.id ? { ...item, visualKey: e.target.value } : item,
                        ),
                      },
                    })
                  }
                >
                  <option value="">None</option>
                  {VISUAL_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {VISUAL_KEY_LABELS[key]}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              onChange({
                ...module,
                detail: {
                  ...module.detail!,
                  blocks: [
                    ...module.detail!.blocks,
                    { id: newId(), caption: "New caption", side: "left", visualKey: "", sortOrder: module.detail!.blocks.length + 1 },
                  ],
                },
              })
            }
          >
            Add caption block
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="ghost"
          onClick={() =>
            onChange({
              ...module,
              detail: {
                id: newId(),
                title: module.name,
                sub: "Add a short explanation.",
                blocks: [],
              },
            })
          }
        >
          Add detail accordion
        </Button>
      )}
    </div>
  );
}

function FeaturesFields({
  form,
  setForm,
}: {
  form: ProductDocument;
  setForm: React.Dispatch<React.SetStateAction<ProductDocument>>;
}) {
  function update(features: ProductFeature[]) {
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
              {VISUAL_KEYS.map((key) => (
                <option key={key} value={key}>
                  {VISUAL_KEY_LABELS[key]}
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
