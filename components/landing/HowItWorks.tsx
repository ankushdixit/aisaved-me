"use client";

import { useTheme } from "@/lib/themes";
import { HowItWorks as MemphisHowItWorks } from "./memphis/HowItWorks";
import { HowItWorks as JapaneseHowItWorks } from "./japanese/HowItWorks";
import { HowItWorks as OrganicHowItWorks } from "./organic/HowItWorks";

export function HowItWorks() {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisHowItWorks />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseHowItWorks />;
    case "organic":
      return <OrganicHowItWorks />;
    default:
      return <MemphisHowItWorks />;
  }
}
