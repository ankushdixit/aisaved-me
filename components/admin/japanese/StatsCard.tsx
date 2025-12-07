"use client";

import { type AdminStat } from "@/lib/mock-data/admin-stats";

interface StatsCardProps {
  stat: AdminStat;
}

function getIconStyles(icon: AdminStat["icon"]) {
  switch (icon) {
    case "pending":
      return {
        bg: "bg-[#f5f2ed]",
        text: "text-[#1a1a1a]",
        symbol: "!",
      };
    case "published":
      return {
        bg: "bg-[#f5f2ed]",
        text: "text-[#1a1a1a]",
        symbol: "✓",
      };
    case "users":
      return {
        bg: "bg-[#f5f2ed]",
        text: "text-[#1a1a1a]",
        symbol: "U",
      };
    case "views":
      return {
        bg: "bg-[#c41e3a]",
        text: "text-white",
        symbol: "V",
      };
  }
}

export function StatsCard({ stat }: StatsCardProps) {
  const iconStyles = getIconStyles(stat.icon);

  return (
    <div className="bg-[#faf8f5] border border-[#d4d0c8] p-5 hover:border-[#1a1a1a] transition-colors">
      <div
        className={`w-10 h-10 ${iconStyles.bg} border border-[#d4d0c8] flex items-center justify-center mb-4`}
      >
        <span className={`font-medium text-lg ${iconStyles.text}`}>{iconStyles.symbol}</span>
      </div>
      <p className="text-sm text-[#6b6b6b] mb-1">{stat.label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-medium text-[#1a1a1a]">{stat.value}</span>
        {stat.change && (
          <span className="text-sm text-[#6b6b6b]">
            {stat.change.trend === "up" ? "↑" : stat.change.trend === "down" ? "↓" : ""}{" "}
            {stat.change.value}
          </span>
        )}
      </div>
    </div>
  );
}
