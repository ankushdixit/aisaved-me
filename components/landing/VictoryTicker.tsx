"use client";

import { useTheme } from "@/lib/themes";
import { VictoryTicker as MemphisVictoryTicker } from "./memphis/VictoryTicker";
import { VictoryTicker as JapaneseVictoryTicker } from "./japanese/VictoryTicker";
import { VictoryTicker as OrganicVictoryTicker } from "./organic/VictoryTicker";

export function VictoryTicker() {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisVictoryTicker />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseVictoryTicker />;
    case "organic":
      return <OrganicVictoryTicker />;
    default:
      return <MemphisVictoryTicker />;
  }
}
