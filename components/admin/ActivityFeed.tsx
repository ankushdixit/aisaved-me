"use client";

import { useTheme } from "@/lib/themes";
import { type ActivityItem } from "@/lib/mock-data/pending-stories";
import { ActivityFeed as MemphisActivityFeed } from "./memphis/ActivityFeed";
import { ActivityFeed as JapaneseActivityFeed } from "./japanese/ActivityFeed";
import { ActivityFeed as OrganicActivityFeed } from "./organic/ActivityFeed";

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisActivityFeed activities={activities} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseActivityFeed activities={activities} />;
    case "organic":
      return <OrganicActivityFeed activities={activities} />;
    default:
      return <MemphisActivityFeed activities={activities} />;
  }
}
