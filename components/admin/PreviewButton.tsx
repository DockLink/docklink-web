"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import Button from "@/components/ui/Button";

export default function PreviewButton({
  href,
  disabled,
  ensureSaved,
}: {
  href: string;
  disabled?: boolean;
  ensureSaved: () => Promise<boolean>;
}) {
  const [opening, setOpening] = useState(false);

  async function onClick() {
    const tab = window.open("about:blank", "_blank");
    setOpening(true);
    try {
      const ok = await ensureSaved();
      if (!ok) {
        tab?.close();
        return;
      }
      if (tab) {
        tab.location.replace(href);
      } else {
        window.location.assign(href);
      }
    } catch {
      tab?.close();
    } finally {
      setOpening(false);
    }
  }

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={onClick}
      disabled={disabled || opening}
      iconStart={<Eye size={16} />}
    >
      {opening ? "Opening…" : "Preview"}
    </Button>
  );
}
