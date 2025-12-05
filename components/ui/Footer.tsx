"use client";

import { useTheme } from "@/lib/themes";
import { Footer as MemphisFooter } from "./memphis/Footer";
import { Footer as JapaneseFooter } from "./japanese/Footer";
import { Footer as OrganicFooter } from "./organic/Footer";

export function Footer() {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisFooter />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseFooter />;
    case "organic":
      return <OrganicFooter />;
    default:
      return <MemphisFooter />;
  }
}
