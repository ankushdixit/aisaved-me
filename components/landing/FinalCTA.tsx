"use client";

import { useTheme } from "@/lib/themes";
import { FinalCTA as MemphisFinalCTA } from "./memphis/FinalCTA";
import { FinalCTA as JapaneseFinalCTA } from "./japanese/FinalCTA";
import { FinalCTA as OrganicFinalCTA } from "./organic/FinalCTA";

export function FinalCTA() {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisFinalCTA />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseFinalCTA />;
    case "organic":
      return <OrganicFinalCTA />;
    default:
      return <MemphisFinalCTA />;
  }
}
