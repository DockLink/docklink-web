import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Section";

// The problem, then the answer. Built from the brief: SMEs moving off paper, Excel and WhatsApp.
const statement =
  "Orders on paper. Stock in Excel. Approvals on WhatsApp. DocLink brings the whole business into one system your team can work from.";

/**
 * One sentence that fills in word by word as it scrolls through the screen
 * (after codemagic.global's heading reveal). Words are plain ink by default,
 * so it reads normally without scroll-timeline support or with reduced motion.
 */
export default function Statement() {
  const words = statement.split(" ");
  return (
    <section aria-label="Why DocLink" className="statement bg-white pb-section-sm pt-section">
      <Container>
        <h2 className="max-w-[26ch] text-3xl font-semibold sm:text-4xl lg:text-5xl">
          {words.map((word, i) => (
            <span
              key={i}
              className="statement-word"
              style={{ "--i": i, "--n": words.length } as CSSProperties}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>
      </Container>
    </section>
  );
}
