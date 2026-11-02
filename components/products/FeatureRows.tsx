import { Container } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import { cn } from "@/components/ui/cn";
import type { ProductFeature, ServiceFeature } from "@/lib/cms/types";
import Shot from "./Shot";
import { shotForVisual } from "./shots";

/**
 * Feature rows: text beside its screenshot, alternating sides as set in the CMS.
 * Text fades up and the screenshot rises and settles as each row scrolls in.
 */
export default function FeatureRows({ features }: { features: (ProductFeature | ServiceFeature)[] }) {
  return (
    <section aria-label="Features" className="bg-white">
      <Container>
        {features.map((f) => {
          const shot = shotForVisual(f.visualKey);
          // CMS `side` is where the text sits on wide screens
          const textRight = f.side === "right";
          return (
            <div
              key={f.id}
              className="grid items-center gap-10 border-t border-line py-section-sm first:border-t-0 lg:grid-cols-12 lg:gap-16 lg:py-section"
            >
              <div className={cn("scroll-rise lg:col-span-5", textRight && "lg:order-2")}>
                {f.label && <p className="text-sm font-medium text-brand">{f.label}</p>}
                <Heading level={2} size="2" className="mt-3">
                  {f.title}
                </Heading>
                <p className="mt-4 max-w-prose text-base text-ink-2 sm:text-lg">{f.body}</p>
              </div>
              <div className={cn("scroll-zoom lg:col-span-7", textRight && "lg:order-1")}>
                {shot.phone ? (
                  <div className="rounded-surface border border-line bg-surface px-6 py-10">
                    <Shot shot={shot} />
                  </div>
                ) : (
                  <Shot shot={shot} />
                )}
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
