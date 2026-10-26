import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "./cn";

type ProductShotProps = {
  /** Path under /public. Leave empty until the real screenshot exists: a labelled placeholder renders instead. */
  src?: string;
  /** What the screenshot shows, e.g. "ERP inventory screen". Used as alt text and the placeholder label. */
  label: string;
  /** Where the file should go, shown on the placeholder so it's easy to supply */
  expectedPath?: string;
  /** CSS aspect ratio, e.g. "16 / 10" for desktop, "9 / 19.5" for a phone */
  ratio?: string;
  device?: "desktop" | "phone";
  caption?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * The only way product visuals appear on the site: a real screenshot from /public,
 * or an honest placeholder. Never a hand-drawn imitation of the UI.
 */
export default function ProductShot({
  src,
  label,
  expectedPath,
  ratio = "16 / 10",
  device = "desktop",
  caption,
  priority,
  sizes = "(min-width: 1200px) 1136px, 100vw",
  className,
}: ProductShotProps) {
  const phone = device === "phone";

  return (
    <figure className={cn(phone && "mx-auto w-full max-w-[300px]", className)}>
      <div
        className={cn(
          "relative overflow-hidden bg-surface-2 shadow-shot",
          // Border colour and width are set per device so the classes never compete
          phone ? "rounded-device border-[6px] border-ink" : "rounded-surface border border-line",
        )}
        style={{ aspectRatio: phone && ratio === "16 / 10" ? "9 / 19.5" : ratio }}
      >
        {src ? (
          <Image src={src} alt={label} fill priority={priority} sizes={sizes} className="object-cover object-top" />
        ) : (
          <div
            role="img"
            aria-label={`Placeholder: ${label}`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent 0 11px, rgb(11 26 51 / 0.045) 11px 12px)",
            }}
          >
            <ImageIcon aria-hidden className="size-6 text-subtle" strokeWidth={1.5} />
            <p className="text-sm font-medium text-ink">Screenshot needed</p>
            <p className="max-w-[28ch] text-sm text-muted">{label}</p>
            {expectedPath && <p className="mt-1 text-xs text-subtle">{expectedPath}</p>}
          </div>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}
