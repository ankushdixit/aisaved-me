"use client";

import { useTheme } from "@/lib/themes";
import { RelatedStories as MemphisRelatedStories } from "./memphis/RelatedStories";
import { RelatedStories as JapaneseRelatedStories } from "./japanese/RelatedStories";
import { RelatedStories as OrganicRelatedStories } from "./organic/RelatedStories";
import type { Story } from "@/lib/types/story";

interface RelatedStoriesProps {
  stories: Story[];
}

export function RelatedStories(props: RelatedStoriesProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisRelatedStories {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseRelatedStories {...props} />;
    case "organic":
      return <OrganicRelatedStories {...props} />;
    default:
      return <MemphisRelatedStories {...props} />;
  }
}
