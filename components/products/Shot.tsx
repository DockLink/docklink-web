import ProductShot from "@/components/ui/ProductShot";
import { cn } from "@/components/ui/cn";
import type { ShotSpec } from "./shots";

/** A product screenshot: desktop at 16:10, phone screens at phone size. */
export default function Shot({ shot, priority, className }: { shot: ShotSpec; priority?: boolean; className?: string }) {
  if (shot.phone) {
    return (
      <div className={cn("mx-auto w-full max-w-[260px]", className)}>
        <ProductShot device="phone" label={shot.label} expectedPath={shot.path} priority={priority} />
      </div>
    );
  }
  return (
    <ProductShot label={shot.label} expectedPath={shot.path} ratio="16 / 10" priority={priority} className={className} />
  );
}
