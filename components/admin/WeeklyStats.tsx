"use client";

import { useTheme } from "@/lib/themes";
import { type WeeklyStats as WeeklyStatsType } from "@/lib/mock-data/admin-stats";
import { WeeklyStats as MemphisWeeklyStats } from "./memphis/WeeklyStats";
import { WeeklyStats as JapaneseWeeklyStats } from "./japanese/WeeklyStats";
import { WeeklyStats as OrganicWeeklyStats } from "./organic/WeeklyStats";

interface WeeklyStatsProps {
  stats: WeeklyStatsType[];
}

export function WeeklyStats({ stats }: WeeklyStatsProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisWeeklyStats stats={stats} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseWeeklyStats stats={stats} />;
    case "organic":
      return <OrganicWeeklyStats stats={stats} />;
    default:
      return <MemphisWeeklyStats stats={stats} />;
  }
}
