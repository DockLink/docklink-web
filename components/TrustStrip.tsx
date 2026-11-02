import ProductIcon from "@/components/icons/ProductIcon";
import { Container } from "@/components/ui/Section";

// [TBC] These claims are unverified (see TODO.md).
const points = [
  { icon: "hosting", label: "Local hosting and support" },
  { icon: "pricing", label: "LKR pricing" },
  { icon: "local", label: "Built for Sri Lankan businesses" },
  { icon: "lock", label: "Role-based access" },
];

const securityPoints = [
  { icon: "hosting", label: "Local hosting and support" },
  { icon: "encrypt", label: "Encrypted patient data" },
  { icon: "local", label: "Local compliance standards" },
  { icon: "lock", label: "Role-based access control" },
];

/** Four reassurances in a row, split by hairlines. */
export default function TrustStrip({ securityFocus = false }: { securityFocus?: boolean }) {
  const items = securityFocus ? securityPoints : points;
  return (
    <section aria-label="Why teams trust DocLink" className="border-y border-line bg-white">
      <Container>
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <li
              key={p.label}
              className={[
                "scroll-rise flex items-center gap-3 py-6 sm:py-8",
                i % 2 === 1 ? "border-l border-line pl-4 sm:pl-6" : "pr-4 sm:pr-6",
                i > 1 ? "border-t border-line lg:border-t-0" : "",
                i === 2 ? "lg:border-l lg:pl-6" : "",
              ].join(" ")}
              style={{ "--rise-i": i } as React.CSSProperties}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-control bg-brand-soft text-brand">
                <ProductIcon name={p.icon} className="size-5" />
              </span>
              <span className="text-sm font-medium text-ink sm:text-base">{p.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
