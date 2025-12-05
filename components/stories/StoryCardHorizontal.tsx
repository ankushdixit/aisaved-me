"use client";

import { useTheme } from "@/lib/themes";
import { StoryCardHorizontal as MemphisStoryCardHorizontal } from "./memphis/StoryCardHorizontal";
import { StoryCardHorizontal as JapaneseStoryCardHorizontal } from "./japanese/StoryCardHorizontal";
import { StoryCardHorizontal as OrganicStoryCardHorizontal } from "./organic/StoryCardHorizontal";
import type { Story } from "@/lib/types/story";

interface StoryCardHorizontalProps {
  story: Story;
}

export function StoryCardHorizontal(props: StoryCardHorizontalProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisStoryCardHorizontal {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseStoryCardHorizontal {...props} />;
    case "organic":
      return <OrganicStoryCardHorizontal {...props} />;
    default:
      return <MemphisStoryCardHorizontal {...props} />;
  }
}
