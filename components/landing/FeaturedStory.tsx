"use client";

import { useTheme } from "@/lib/themes";
import { FeaturedStory as MemphisFeaturedStory } from "./memphis/FeaturedStory";
import { FeaturedStory as JapaneseFeaturedStory } from "./japanese/FeaturedStory";
import { FeaturedStory as OrganicFeaturedStory } from "./organic/FeaturedStory";

export function FeaturedStory() {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisFeaturedStory />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseFeaturedStory />;
    case "organic":
      return <OrganicFeaturedStory />;
    default:
      return <MemphisFeaturedStory />;
  }
}
