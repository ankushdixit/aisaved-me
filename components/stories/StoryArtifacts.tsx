"use client";

import { useTheme } from "@/lib/themes";
import { StoryArtifacts as MemphisStoryArtifacts } from "./memphis/StoryArtifacts";
import { StoryArtifacts as JapaneseStoryArtifacts } from "./japanese/StoryArtifacts";
import { StoryArtifacts as OrganicStoryArtifacts } from "./organic/StoryArtifacts";
import type { StoryArtifact } from "@/lib/types/story";

interface StoryArtifactsProps {
  artifacts: StoryArtifact[];
}

export function StoryArtifacts(props: StoryArtifactsProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisStoryArtifacts {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseStoryArtifacts {...props} />;
    case "organic":
      return <OrganicStoryArtifacts {...props} />;
    default:
      return <MemphisStoryArtifacts {...props} />;
  }
}
