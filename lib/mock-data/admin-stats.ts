/**
 * Mock data for admin dashboard statistics
 */

export interface AdminStat {
  id: string;
  label: string;
  value: string | number;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  icon: "pending" | "published" | "users" | "views";
}

export const adminStats: AdminStat[] = [
  {
    id: "pending",
    label: "Pending Review",
    value: 12,
    change: {
      value: "3 new",
      trend: "up",
    },
    icon: "pending",
  },
  {
    id: "published",
    label: "Published",
    value: 142,
    change: {
      value: "5 this week",
      trend: "up",
    },
    icon: "published",
  },
  {
    id: "users",
    label: "Total Users",
    value: "1,247",
    change: {
      value: "12%",
      trend: "up",
    },
    icon: "users",
  },
  {
    id: "views",
    label: "Page Views",
    value: "24.5K",
    change: {
      value: "8%",
      trend: "up",
    },
    icon: "views",
  },
];

export interface WeeklyStats {
  label: string;
  value: string | number;
}

export const weeklyStats: WeeklyStats[] = [
  { label: "New Submissions", value: 24 },
  { label: "Stories Published", value: 18 },
  { label: "New Users", value: 156 },
  { label: "Total Engagement", value: "2,847" },
  { label: "Avg. Time on Site", value: "4m 32s" },
];
