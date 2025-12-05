"use client";

import { useTheme } from "@/lib/themes";
import { EngagementBar as MemphisEngagementBar } from "./memphis/EngagementBar";
import { EngagementBar as JapaneseEngagementBar } from "./japanese/EngagementBar";
import { EngagementBar as OrganicEngagementBar } from "./organic/EngagementBar";

interface EngagementBarProps {
  likes: number;
  comments: number;
  storySlug: string;
}

export function EngagementBar(props: EngagementBarProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisEngagementBar {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseEngagementBar {...props} />;
    case "organic":
      return <OrganicEngagementBar {...props} />;
    default:
      return <MemphisEngagementBar {...props} />;
  }
}
