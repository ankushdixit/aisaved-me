"use client";

import { type AdminStat } from "@/lib/mock-data/admin-stats";

interface StatsCardProps {
  stat: AdminStat;
}

function getIconStyles(icon: AdminStat["icon"]) {
  switch (icon) {
    case "pending":
      return {
        bg: "bg-[#f2cc8f]",
        text: "text-[#3d405b]",
        symbol: "!",
      };
    case "published":
      return {
        bg: "bg-[#81b29a]",
        text: "text-white",
        symbol: "✓",
      };
    case "users":
      return {
        bg: "bg-[#e07a5f]",
        text: "text-white",
        symbol: "U",
      };
    case "views":
      return {
        bg: "bg-[#3d405b]",
        text: "text-white",
        symbol: "V",
      };
  }
}

function getTrendColor(trend: "up" | "down" | "neutral") {
  switch (trend) {
    case "up":
      return "text-[#81b29a]";
    case "down":
      return "text-[#e07a5f]";
    default:
      return "text-[#6b6b6b]";
  }
}

export function StatsCard({ stat }: StatsCardProps) {
  const iconStyles = getIconStyles(stat.icon);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-soft hover:shadow-soft-hover transition-shadow">
      <div
        className={`w-10 h-10 ${iconStyles.bg} rounded-xl flex items-center justify-center mb-4`}
      >
        <span className={`font-semibold text-lg ${iconStyles.text}`}>{iconStyles.symbol}</span>
      </div>
      <p className="text-sm text-[#6b6b6b] mb-1">{stat.label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold text-[#3d405b]">{stat.value}</span>
        {stat.change && (
          <span className={`text-sm font-medium ${getTrendColor(stat.change.trend)}`}>
            {stat.change.trend === "up" ? "↑" : stat.change.trend === "down" ? "↓" : ""}{" "}
            {stat.change.value}
          </span>
        )}
      </div>
    </div>
  );
}
