"use client";

import { type WeeklyStats as WeeklyStatsType } from "@/lib/mock-data/admin-stats";

interface WeeklyStatsProps {
  stats: WeeklyStatsType[];
}

export function WeeklyStats({ stats }: WeeklyStatsProps) {
  return (
    <div className="bg-white border-3 border-black shadow-memphis-md p-6">
      <h2 className="font-display font-bold text-lg text-black mb-6">This Week</h2>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="font-body text-gray-500">{stat.label}</span>
            <span className="font-display font-bold text-lg text-black">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
