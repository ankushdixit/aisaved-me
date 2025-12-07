"use client";

import { type WeeklyStats as WeeklyStatsType } from "@/lib/mock-data/admin-stats";

interface WeeklyStatsProps {
  stats: WeeklyStatsType[];
}

export function WeeklyStats({ stats }: WeeklyStatsProps) {
  return (
    <div className="bg-[#faf8f5] border border-[#d4d0c8] p-6">
      <h2 className="font-medium text-lg text-[#1a1a1a] mb-6">This Week</h2>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-[#6b6b6b]">{stat.label}</span>
            <span className="font-medium text-lg text-[#1a1a1a]">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
