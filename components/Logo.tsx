import Image from "next/image";

type LogoProps = {
  className?: string;
  /** Display height in pixels; width scales from logo aspect ratio */
  height?: number;
  priority?: boolean;
};

/** Full DocLink mark (icon + wordmark). Source: public/doclink-logo-trim.png (transparent, trimmed) */
export default function Logo({ className = "", height = 40, priority = false }: LogoProps) {
  // Source asset is 769×413
  const width = Math.round(height * (769 / 413));

  return (
    <Image
      src="/doclink-logo-trim.png"
      alt="DocLink Technologies"
      width={width}
      height={height}
      priority={priority}
      className={`object-contain object-left ${className}`}
    />
  );
}
