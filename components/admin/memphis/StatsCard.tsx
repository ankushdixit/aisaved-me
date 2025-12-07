"use client";

import { type AdminStat } from "@/lib/mock-data/admin-stats";

interface StatsCardProps {
  stat: AdminStat;
}

function getIconStyles(icon: AdminStat["icon"]) {
  switch (icon) {
    case "pending":
      return {
        bg: "bg-[#FFD700]",
        text: "text-black",
        symbol: "!",
      };
    case "published":
      return {
        bg: "bg-[#00FF7F]",
        text: "text-black",
        symbol: "✓",
      };
    case "users":
      return {
        bg: "bg-[#0066FF]",
        text: "text-white",
        symbol: "U",
      };
    case "views":
      return {
        bg: "bg-[#FF1493]",
        text: "text-white",
        symbol: "V",
      };
  }
}

function getTrendColor(trend: "up" | "down" | "neutral") {
  switch (trend) {
    case "up":
      return "text-[#00FF7F]";
    case "down":
      return "text-[#FF6B6B]";
    default:
      return "text-gray-500";
  }
}

export function StatsCard({ stat }: StatsCardProps) {
  const iconStyles = getIconStyles(stat.icon);

  return (
    <div className="bg-white border-3 border-black p-5 shadow-memphis-md transform -rotate-1 hover:rotate-0 transition-transform">
      <div
        className={`w-10 h-10 ${iconStyles.bg} border-2 border-black flex items-center justify-center mb-4`}
      >
        <span className={`font-display font-bold text-lg ${iconStyles.text}`}>
          {iconStyles.symbol}
        </span>
      </div>
      <p className="text-sm text-gray-500 font-body mb-1">{stat.label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-display font-bold text-black">{stat.value}</span>
        {stat.change && (
          <span className={`text-sm font-body font-medium ${getTrendColor(stat.change.trend)}`}>
            {stat.change.trend === "up" ? "↑" : stat.change.trend === "down" ? "↓" : ""}{" "}
            {stat.change.value}
          </span>
        )}
      </div>
    </div>
  );
}
