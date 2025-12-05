"use client";

import { useTheme } from "@/lib/themes";
import { StoryContent as MemphisStoryContent } from "./memphis/StoryContent";
import { StoryContent as JapaneseStoryContent } from "./japanese/StoryContent";
import { StoryContent as OrganicStoryContent } from "./organic/StoryContent";
import type { StoryContent as StoryContentType } from "@/lib/types/story";

interface StoryContentProps {
  content: StoryContentType;
}

export function StoryContent(props: StoryContentProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisStoryContent {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseStoryContent {...props} />;
    case "organic":
      return <OrganicStoryContent {...props} />;
    default:
      return <MemphisStoryContent {...props} />;
  }
}
