"use client";

import { useTheme } from "@/lib/themes";
import { type AdminStat } from "@/lib/mock-data/admin-stats";
import { StatsCard as MemphisStatsCard } from "./memphis/StatsCard";
import { StatsCard as JapaneseStatsCard } from "./japanese/StatsCard";
import { StatsCard as OrganicStatsCard } from "./organic/StatsCard";

interface StatsCardProps {
  stat: AdminStat;
}

export function StatsCard({ stat }: StatsCardProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisStatsCard stat={stat} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseStatsCard stat={stat} />;
    case "organic":
      return <OrganicStatsCard stat={stat} />;
    default:
      return <MemphisStatsCard stat={stat} />;
  }
}
