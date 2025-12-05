"use client";

import { useTheme } from "@/lib/themes";
import { Features as MemphisFeatures } from "./memphis/FeatureCard";
import { Features as JapaneseFeatures } from "./japanese/FeatureCard";
import { Features as OrganicFeatures } from "./organic/FeatureCard";

export function Features() {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisFeatures />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseFeatures />;
    case "organic":
      return <OrganicFeatures />;
    default:
      return <MemphisFeatures />;
  }
}
