"use client";

import { useTheme } from "@/lib/themes";
import { Hero as MemphisHero, HeroCTA as MemphisHeroCTA } from "./memphis/Hero";
import { Hero as JapaneseHero, HeroCTA as JapaneseHeroCTA } from "./japanese/Hero";
import { Hero as OrganicHero, HeroCTA as OrganicHeroCTA } from "./organic/Hero";

export function Hero() {
  const { theme, mounted } = useTheme();

  // Show Memphis as default during SSR/hydration
  if (!mounted) {
    return <MemphisHero />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseHero />;
    case "organic":
      return <OrganicHero />;
    default:
      return <MemphisHero />;
  }
}

export function HeroCTA() {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisHeroCTA />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseHeroCTA />;
    case "organic":
      return <OrganicHeroCTA />;
    default:
      return <MemphisHeroCTA />;
  }
}
