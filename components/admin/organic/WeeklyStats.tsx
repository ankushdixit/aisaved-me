"use client";

import { type WeeklyStats as WeeklyStatsType } from "@/lib/mock-data/admin-stats";

interface WeeklyStatsProps {
  stats: WeeklyStatsType[];
}

export function WeeklyStats({ stats }: WeeklyStatsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-6">
      <h2 className="font-semibold text-lg text-[#3d405b] mb-6">This Week</h2>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-[#6b6b6b]">{stat.label}</span>
            <span className="font-semibold text-lg text-[#3d405b]">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
