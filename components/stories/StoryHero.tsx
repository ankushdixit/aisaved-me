"use client";

import { useTheme } from "@/lib/themes";
import { StoryHero as MemphisStoryHero } from "./memphis/StoryHero";
import { StoryHero as JapaneseStoryHero } from "./japanese/StoryHero";
import { StoryHero as OrganicStoryHero } from "./organic/StoryHero";
import type { StoryDetail } from "@/lib/types/story";

interface StoryHeroProps {
  story: StoryDetail;
}

export function StoryHero(props: StoryHeroProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisStoryHero {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseStoryHero {...props} />;
    case "organic":
      return <OrganicStoryHero {...props} />;
    default:
      return <MemphisStoryHero {...props} />;
  }
}
